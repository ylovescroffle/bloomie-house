/**
 * D1 helpers for portal / CMS.
 */

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function parseJsonArray(raw) {
  try {
    const v = JSON.parse(raw || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function nextOrderNumber() {
  const d = new Date();
  const y = d.getUTCFullYear().toString().slice(-2);
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const r = Math.floor(Math.random() * 9000) + 1000;
  return `BH${y}${m}${day}-${r}`;
}

export async function listProducts(env, { publishedOnly = false } = {}) {
  const sql = publishedOnly
    ? `SELECT * FROM products WHERE published = 1 ORDER BY sort_order ASC, id ASC`
    : `SELECT * FROM products ORDER BY sort_order ASC, id ASC`;
  const { results } = await env.DB.prepare(sql).all();
  return (results || []).map(normalizeProduct);
}

export function normalizeProduct(row) {
  if (!row) return null;
  return {
    ...row,
    features: parseJsonArray(row.features_json),
    images: parseJsonArray(row.images_json),
    published: !!row.published,
  };
}

export async function getProductById(env, id) {
  const row = await env.DB.prepare(`SELECT * FROM products WHERE id = ?`)
    .bind(id)
    .first();
  return normalizeProduct(row);
}

export async function getProductBySlug(env, slug) {
  const row = await env.DB.prepare(`SELECT * FROM products WHERE slug = ?`)
    .bind(slug)
    .first();
  return normalizeProduct(row);
}

export async function listMembers(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, email, name, phone, business_name, role, created_at
     FROM users WHERE role = 'member' ORDER BY created_at DESC`
  ).all();
  return results || [];
}

export async function getUserById(env, id) {
  return env.DB.prepare(
    `SELECT id, email, name, phone, business_name, role, created_at, updated_at
     FROM users WHERE id = ?`
  )
    .bind(id)
    .first();
}

export async function listOrdersForUser(env, userId) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`
  )
    .bind(userId)
    .all();
  return results || [];
}

export async function listAllOrders(env) {
  const { results } = await env.DB.prepare(
    `SELECT o.*, u.email AS member_email, u.name AS member_name
     FROM orders o
     JOIN users u ON u.id = o.user_id
     ORDER BY o.created_at DESC`
  ).all();
  return results || [];
}

export async function getOrder(env, orderId) {
  return env.DB.prepare(
    `SELECT o.*, u.email AS member_email, u.name AS member_name
     FROM orders o
     JOIN users u ON u.id = o.user_id
     WHERE o.id = ?`
  )
    .bind(orderId)
    .first();
}

export async function getOrderItems(env, orderId) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC`
  )
    .bind(orderId)
    .all();
  return results || [];
}

export async function getDownloadsForOrder(env, orderId) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM downloads WHERE order_id = ? ORDER BY sort_order ASC, id ASC`
  )
    .bind(orderId)
    .all();
  return results || [];
}

export async function getGuidelinesForOrder(env, orderId) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM guidelines WHERE order_id = ? ORDER BY sort_order ASC, id ASC`
  )
    .bind(orderId)
    .all();
  return results || [];
}

/** Paid-access helper: paid | processing | completed */
export function orderIsPaid(status) {
  return status === 'paid' || status === 'processing' || status === 'completed';
}

export async function listMemberDownloads(env, userId) {
  const { results } = await env.DB.prepare(
    `SELECT d.*, o.order_number, o.status
     FROM downloads d
     JOIN orders o ON o.id = d.order_id
     WHERE o.user_id = ? AND o.status IN ('paid', 'processing', 'completed')
     ORDER BY d.created_at DESC`
  )
    .bind(userId)
    .all();
  return results || [];
}

export async function listMemberGuidelines(env, userId) {
  const { results } = await env.DB.prepare(
    `SELECT g.*, o.order_number, o.status
     FROM guidelines g
     JOIN orders o ON o.id = g.order_id
     WHERE o.user_id = ? AND o.status IN ('paid', 'processing', 'completed')
     ORDER BY g.created_at DESC`
  )
    .bind(userId)
    .all();
  return results || [];
}

export async function listTemplateRequests(env, userId = null) {
  const { results } = await env.DB.prepare(
    `SELECT r.*, u.name AS author_name, u.email AS author_email,
      (SELECT COUNT(*) FROM template_request_votes v WHERE v.request_id = r.id) AS votes
     FROM template_requests r
     JOIN users u ON u.id = r.user_id
     ORDER BY votes DESC, r.created_at DESC`
  ).all();
  const rows = results || [];
  if (!userId) return rows;
  const { results: votes } = await env.DB.prepare(
    `SELECT request_id FROM template_request_votes WHERE user_id = ?`
  )
    .bind(userId)
    .all();
  const voted = new Set((votes || []).map((v) => v.request_id));
  return rows.map((r) => ({ ...r, voted: voted.has(r.id) }));
}

export async function dashboardStats(env) {
  const members = await env.DB.prepare(
    `SELECT COUNT(*) AS c FROM users WHERE role = 'member'`
  ).first();
  const orders = await env.DB.prepare(`SELECT COUNT(*) AS c FROM orders`).first();
  const openOrders = await env.DB.prepare(
    `SELECT COUNT(*) AS c FROM orders WHERE status IN ('pending', 'paid', 'processing')`
  ).first();
  const products = await env.DB.prepare(`SELECT COUNT(*) AS c FROM products`).first();
  const requests = await env.DB.prepare(
    `SELECT COUNT(*) AS c FROM template_requests WHERE status = 'open'`
  ).first();
  return {
    members: members?.c || 0,
    orders: orders?.c || 0,
    openOrders: openOrders?.c || 0,
    products: products?.c || 0,
    openRequests: requests?.c || 0,
  };
}

/** Seed catalog products from the static templateData once. */
export async function ensureProductSeed(env, templateData) {
  if (!env.DB || !templateData?.length) return;
  const count = await env.DB.prepare(`SELECT COUNT(*) AS c FROM products`).first();
  if (count && count.c > 0) return;

  let order = 0;
  for (const t of templateData) {
    await env.DB.prepare(
      `INSERT INTO products (
        slug, name, niche, platform, category, badge, price, original_price,
        description, features_json, images_json, published, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`
    )
      .bind(
        t.slug,
        t.name,
        t.niche || '',
        t.platform || '',
        t.category || 'canva',
        t.badge || '',
        t.price || 0,
        t.originalPrice ?? null,
        t.description || '',
        JSON.stringify(t.features || []),
        JSON.stringify(t.images || []),
        order++
      )
      .run();
  }
}
