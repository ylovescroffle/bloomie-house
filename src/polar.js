/**
 * Polar.sh checkout + webhook helpers (no SDK — fetch + Web Crypto).
 */

import { findOrCreateMember } from './portal/auth.js';
import { ensureSchema } from './portal/schema.js';
import { getProductBySlug, nextOrderNumber } from './portal/db.js';

const POLAR_API = {
  sandbox: 'https://sandbox-api.polar.sh',
  production: 'https://api.polar.sh',
};

export function polarConfigured(env) {
  return Boolean(env.POLAR_ACCESS_TOKEN);
}

function polarTokenIssue(token) {
  const t = String(token || '').trim();
  if (!t) return null;
  if (t.startsWith('whsec_')) {
    return 'POLAR_ACCESS_TOKEN is set to a webhook secret (whsec_…). Create an Organization Access Token in Polar and use that instead.';
  }
  if (!t.startsWith('polar_')) {
    return 'POLAR_ACCESS_TOKEN does not look like a Polar access token (expected polar_oat_… or similar).';
  }
  return null;
}

export function parsePolarProductMap(env) {
  if (!env.POLAR_PRODUCTS) return {};
  try {
    const map = JSON.parse(env.POLAR_PRODUCTS);
    return map && typeof map === 'object' ? map : {};
  } catch {
    return {};
  }
}

export function polarApiBase(env) {
  const mode = (env.POLAR_MODE || 'sandbox').toLowerCase();
  return mode === 'production' ? POLAR_API.production : POLAR_API.sandbox;
}

function customerIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    undefined
  );
}

export function resolveCartPolarProducts(items, templateData, env) {
  const map = parsePolarProductMap(env);
  const bySlug = Object.fromEntries(templateData.map((t) => [t.slug, t]));
  const missing = [];
  const products = [];
  const prices = {};
  const lineMeta = [];

  for (const item of items) {
    const tpl = bySlug[item.slug];
    if (!tpl) continue;
    const qty = Math.max(1, parseInt(item.qty, 10) || 1);
    const polarId = map[item.slug] || tpl.polarProductId;
    if (!polarId) {
      missing.push(tpl.name);
      continue;
    }
    for (let i = 0; i < qty; i++) {
      products.push(polarId);
    }
    const cents = Math.round(tpl.price * 100);
    if (!prices[polarId]) prices[polarId] = [];
    const existing = prices[polarId].find((p) => p.priceAmount === cents);
    if (!existing) {
      prices[polarId].push({
        amount_type: 'fixed',
        price_amount: cents,
        price_currency: 'aud',
      });
    }
    lineMeta.push({ slug: item.slug, qty, name: tpl.name, price: tpl.price });
  }

  return { products, prices, lineMeta, missing };
}

export async function createPolarCheckout(env, request, { items, origin, templateData }) {
  if (!polarConfigured(env)) {
    return { ok: false, status: 503, error: 'Checkout is not configured yet.' };
  }

  const tokenIssue = polarTokenIssue(env.POLAR_ACCESS_TOKEN);
  if (tokenIssue) {
    return { ok: false, status: 503, error: tokenIssue };
  }

  const resolved = resolveCartPolarProducts(items, templateData || [], env);

  if (!resolved.products.length) {
    const hint = resolved.missing.length
      ? `Missing Polar product IDs for: ${resolved.missing.join(', ')}.`
      : 'Your cart is empty.';
    return { ok: false, status: 400, error: hint };
  }

  const site = origin || new URL(request.url).origin;
  const body = {
    products: resolved.products,
    prices: resolved.prices,
    success_url: `${site}/checkout/success?checkout_id={CHECKOUT_ID}`,
    return_url: `${site}/cart`,
    embed_origin: site,
    locale: 'en',
    allow_discount_codes: true,
    customer_ip_address: customerIp(request),
    metadata: {
      bloomie_items: JSON.stringify(resolved.lineMeta).slice(0, 500),
      bloomie_source: 'cart',
    },
  };

  const res = await fetch(`${polarApiBase(env)}/v1/checkouts/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      data?.detail ||
      (Array.isArray(data?.detail) ? data.detail.map((d) => d.msg).join('; ') : null) ||
      data?.error ||
      'Could not start checkout.';
    const errText = String(detail);
    const friendly =
      errText === 'invalid_token'
        ? 'Polar access token is invalid. In sandbox.polar.sh go to Organization Settings → Access Tokens, create a new token, then run: npx wrangler secret put POLAR_ACCESS_TOKEN'
        : errText;
    return { ok: false, status: res.status, error: friendly };
  }

  return { ok: true, url: data.url, id: data.id };
}

function decodeWebhookSecret(secret) {
  const raw = String(secret || '').trim();
  if (!raw) return new Uint8Array();
  if (raw.startsWith('whsec_')) {
    const payload = raw.slice(6);
    try {
      const bin = atob(payload);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    } catch {
      return new TextEncoder().encode(payload);
    }
  }
  try {
    const bin = atob(raw);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return new TextEncoder().encode(raw);
  }
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyPolarWebhook(request, secret) {
  const id = request.headers.get('webhook-id');
  const timestamp = request.headers.get('webhook-timestamp');
  const signatureHeader = request.headers.get('webhook-signature');
  if (!id || !timestamp || !signatureHeader) {
    return { ok: false, error: 'Missing webhook headers.' };
  }

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) {
    return { ok: false, error: 'Webhook timestamp out of range.' };
  }

  const body = await request.text();
  const signed = `${id}.${timestamp}.${body}`;
  const key = decodeWebhookSecret(secret);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(signed));
  const expected = btoa(String.fromCharCode(...new Uint8Array(sig)));

  const provided = signatureHeader
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.startsWith('v1,'))
    .map((part) => part.slice(3));

  const valid = provided.some((sigPart) => timingSafeEqual(sigPart, expected));
  if (!valid) return { ok: false, error: 'Invalid signature.' };

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return { ok: false, error: 'Invalid JSON payload.' };
  }
  return { ok: true, payload, body };
}

async function orderExistsForPolar(env, polarOrderId) {
  const row = await env.DB.prepare(
    `SELECT id FROM orders WHERE notes LIKE ? LIMIT 1`
  )
    .bind(`%polar:${polarOrderId}%`)
    .first();
  return !!row;
}

export async function fulfillPolarOrderPaid(env, orderData, templateData) {
  if (!env.DB) return { ok: false, error: 'Database not configured.' };
  await ensureSchema(env);

  const polarOrderId = orderData?.id;
  if (!polarOrderId) return { ok: false, error: 'Missing order id.' };
  if (await orderExistsForPolar(env, polarOrderId)) {
    return { ok: true, duplicate: true };
  }

  const email = (
    orderData?.customer?.email ||
    orderData?.customer_email ||
    orderData?.billing?.email ||
    ''
  )
    .trim()
    .toLowerCase();
  if (!email) return { ok: false, error: 'Missing customer email.' };

  const customerName = orderData?.customer?.name || orderData?.customer_name || '';
  const member = await findOrCreateMember(env, email, customerName);

  let lineMeta = [];
  const metaRaw =
    orderData?.checkout?.metadata?.bloomie_items ||
    orderData?.metadata?.bloomie_items ||
    orderData?.checkout_metadata?.bloomie_items;
  if (metaRaw) {
    try {
      lineMeta = JSON.parse(metaRaw);
    } catch {
      lineMeta = [];
    }
  }

  const bySlug = Object.fromEntries((templateData || []).map((t) => [t.slug, t]));
  const productMap = parsePolarProductMap(env);
  const slugByPolar = {};
  for (const [slug, pid] of Object.entries(productMap)) slugByPolar[pid] = slug;
  for (const t of templateData || []) {
    if (t.polarProductId) slugByPolar[t.polarProductId] = t.slug;
  }

  const polarProductId = orderData?.product?.id || orderData?.product_id;
  if (!lineMeta.length && polarProductId && slugByPolar[polarProductId]) {
    const slug = slugByPolar[polarProductId];
    const tpl = bySlug[slug];
    lineMeta = [{ slug, qty: 1, name: tpl?.name || slug, price: tpl?.price || 0 }];
  }

  if (!lineMeta.length) {
    const name = orderData?.product?.name || orderData?.product_name || 'Bloomie House purchase';
    const amount = Number(orderData?.total_amount || orderData?.amount || 0) / 100;
    lineMeta = [{ slug: null, qty: 1, name, price: amount || 0 }];
  }

  let total = 0;
  const orderNumber = nextOrderNumber();
  const currency = (orderData?.currency || 'aud').toUpperCase();
  const notes = `polar:${polarOrderId}`;

  const result = await env.DB.prepare(
    `INSERT INTO orders (order_number, user_id, status, total, currency, notes)
     VALUES (?, ?, 'paid', ?, ?, ?)`
  )
    .bind(orderNumber, member.id, 0, currency, notes)
    .run();
  const orderId = result.meta.last_row_id;

  for (const line of lineMeta) {
    const qty = Math.max(1, parseInt(line.qty, 10) || 1);
    const price = Number(line.price) || 0;
    total += price * qty;
    let productId = null;
    if (line.slug) {
      const product = await getProductBySlug(env, line.slug);
      productId = product?.id || null;
    }
    await env.DB.prepare(
      `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(orderId, productId, line.name || line.slug || 'Item', price, qty)
      .run();
  }

  await env.DB.prepare(
    `UPDATE orders SET total = ?, updated_at = datetime('now') WHERE id = ?`
  )
    .bind(total, orderId)
    .run();

  return { ok: true, orderId, orderNumber, email };
}

export async function handlePolarWebhook(request, env, templateData) {
  if (!env.POLAR_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Webhook secret not configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const verified = await verifyPolarWebhook(request, env.POLAR_WEBHOOK_SECRET);
  if (!verified.ok) {
    return new Response(JSON.stringify({ error: verified.error }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { type, data } = verified.payload || {};
  if (type === 'order.paid' && data) {
    await fulfillPolarOrderPaid(env, data, templateData);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 202,
    headers: { 'Content-Type': 'application/json' },
  });
}
