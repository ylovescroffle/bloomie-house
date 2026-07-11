/**
 * Auth helpers — staff password login + member magic-link sessions.
 */

const SESSION_COOKIE = 'bloomie_session';
const SESSION_DAYS = 30;
const MAGIC_LINK_MINUTES = 30;

export { SESSION_COOKIE };

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
  });
}

export function redirect(location, headers = {}) {
  return new Response(null, {
    status: 302,
    headers: { Location: location, ...headers },
  });
}

export function parseCookies(request) {
  const header = request.headers.get('Cookie') || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  }
  return out;
}

export function sessionCookieHeader(token, maxAgeSeconds = SESSION_DAYS * 86400, secure = true) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure ? '; Secure' : ''}`;
}

export function clearSessionCookieHeader(secure = true) {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
}

export function isSecureRequest(request) {
  const url = new URL(request.url);
  return url.protocol === 'https:';
}

function bytesToBase64(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function base64ToBytes(b64) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

export function randomToken(bytes = 32) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return [...arr].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPassword(password, saltB64) {
  const salt = saltB64 ? base64ToBytes(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return {
    hash: bytesToBase64(new Uint8Array(bits)),
    salt: bytesToBase64(salt),
  };
}

export async function verifyPassword(password, hash, salt) {
  if (!hash || !salt) return false;
  const result = await hashPassword(password, salt);
  return result.hash === hash;
}

export async function getSessionUser(env, request) {
  if (!env.DB) return null;
  const cookies = parseCookies(request);
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  const row = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, u.phone, u.business_name, u.role
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > datetime('now')`
  )
    .bind(token)
    .first();
  return row || null;
}

export async function createSession(env, userId) {
  const token = randomToken(32);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400 * 1000)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);
  await env.DB.prepare(
    `INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)`
  )
    .bind(token, userId, expires)
    .run();
  return token;
}

export async function destroySession(env, request) {
  const cookies = parseCookies(request);
  const token = cookies[SESSION_COOKIE];
  if (token && env.DB) {
    await env.DB.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
  }
}

export async function createMagicLink(env, email) {
  const token = randomToken(24);
  const expires = new Date(Date.now() + MAGIC_LINK_MINUTES * 60 * 1000)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);
  await env.DB.prepare(
    `INSERT INTO magic_links (token, email, expires_at) VALUES (?, ?, ?)`
  )
    .bind(token, email.trim().toLowerCase(), expires)
    .run();
  return token;
}

export async function consumeMagicLink(env, token) {
  const row = await env.DB.prepare(
    `SELECT * FROM magic_links
     WHERE token = ? AND used_at IS NULL AND expires_at > datetime('now')`
  )
    .bind(token)
    .first();
  if (!row) return null;
  await env.DB.prepare(
    `UPDATE magic_links SET used_at = datetime('now') WHERE token = ?`
  )
    .bind(token)
    .run();
  return row.email;
}

export async function findOrCreateMember(env, email, name = '') {
  const normalized = email.trim().toLowerCase();
  let user = await env.DB.prepare(`SELECT * FROM users WHERE email = ?`)
    .bind(normalized)
    .first();
  if (user) return user;
  const result = await env.DB.prepare(
    `INSERT INTO users (email, name, role) VALUES (?, ?, 'member')`
  )
    .bind(normalized, name || '')
    .run();
  user = await env.DB.prepare(`SELECT * FROM users WHERE id = ?`)
    .bind(result.meta.last_row_id)
    .first();
  return user;
}

export async function sendMagicLinkEmail(env, email, link) {
  if (!env.RESEND_API_KEY) return { sent: false, reason: 'not_configured' };
  const from = env.EMAIL_FROM || 'Bloomie House <hello@bloomiehouse.com.au>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Your Bloomie House login link',
      html: `<p>Hi,</p><p>Click to sign in to your member page:</p><p><a href="${link}">${link}</a></p><p>This link expires in ${MAGIC_LINK_MINUTES} minutes.</p><p>— Bloomie House</p>`,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { sent: false, reason: text };
  }
  return { sent: true };
}

/** Seed two staff accounts if none exist (local + first deploy). */
export async function ensureStaffSeed(env) {
  if (!env.DB) return;
  const existing = await env.DB.prepare(
    `SELECT COUNT(*) AS c FROM users WHERE role = 'staff'`
  ).first();
  if (existing && existing.c > 0) return;

  const staff = [
    {
      email: (env.STAFF1_EMAIL || 'staff1@bloomiehouse.com.au').toLowerCase(),
      name: env.STAFF1_NAME || 'Staff One',
      password: env.STAFF1_PASSWORD || 'BloomieStaff1!',
    },
    {
      email: (env.STAFF2_EMAIL || 'staff2@bloomiehouse.com.au').toLowerCase(),
      name: env.STAFF2_NAME || 'Staff Two',
      password: env.STAFF2_PASSWORD || 'BloomieStaff2!',
    },
  ];

  for (const s of staff) {
    const { hash, salt } = await hashPassword(s.password);
    await env.DB.prepare(
      `INSERT OR IGNORE INTO users (email, name, role, password_hash, password_salt)
       VALUES (?, ?, 'staff', ?, ?)`
    )
      .bind(s.email, s.name, hash, salt)
      .run();
  }
}
