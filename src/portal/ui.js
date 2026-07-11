/**
 * Shared portal UI shell (member + staff) — matches Bloomie House brand.
 */

import { escapeHtml } from './db.js';

const LOGO =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png';

export function portalStyles() {
  return `
:root {
  --black: #111; --charcoal: #2a2a2a; --muted: #666;
  --cream: #FAFAF8; --pink: #D67D9A; --sage: #C8D5B0;
  --border: rgba(0,0,0,0.08); --white: #fff;
  --shadow: 0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(214,125,154,.12), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 0%, rgba(200,213,176,.18), transparent 50%),
    var(--cream);
  color: var(--black); min-height: 100vh; line-height: 1.5;
}
a { color: var(--pink); text-decoration: none; }
a:hover { text-decoration: underline; }
.portal-top {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: .85rem 4vw; background: rgba(255,255,255,.82); backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 20;
}
.portal-brand { display: flex; align-items: center; gap: .65rem; color: var(--black); text-decoration: none; font-weight: 600; }
.portal-brand img { height: 36px; width: auto; }
.portal-brand:hover { text-decoration: none; }
.portal-user { font-size: .88rem; color: var(--muted); display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.portal-shell {
  display: grid; grid-template-columns: 220px 1fr; gap: 0; min-height: calc(100vh - 64px);
}
@media (max-width: 860px) {
  .portal-shell { grid-template-columns: 1fr; }
  .portal-side { border-right: none; border-bottom: 1px solid var(--border); }
  .portal-side nav { display: flex; flex-wrap: wrap; gap: .35rem; }
  .portal-side a { padding: .55rem .85rem; }
}
.portal-side {
  padding: 1.25rem 1rem; background: rgba(255,255,255,.55);
  border-right: 1px solid var(--border);
}
.portal-side a {
  display: block; padding: .7rem 1rem; border-radius: 12px; color: var(--charcoal);
  font-size: .92rem; font-weight: 500; text-decoration: none;
  transition: background 150ms ease;
}
.portal-side a:hover, .portal-side a.active { background: #fff; color: var(--black); box-shadow: var(--shadow); text-decoration: none; }
.portal-main { padding: 1.75rem 4vw 3rem; max-width: 1100px; }
.portal-main h1 {
  font-family: Fraunces, Georgia, serif; font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 900; margin-bottom: .35rem; text-wrap: balance;
}
.portal-main .lead { color: var(--muted); margin-bottom: 1.5rem; max-width: 40rem; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.75rem; }
.stat-card, .panel {
  background: #fff; border-radius: 16px; padding: 1.15rem 1.25rem; box-shadow: var(--shadow);
}
.stat-card strong { display: block; font-family: Fraunces, serif; font-size: 1.75rem; margin-bottom: .15rem; }
.stat-card span { font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.panel { margin-bottom: 1.25rem; }
.panel h2 { font-family: Fraunces, serif; font-size: 1.25rem; margin-bottom: .85rem; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: .92rem; }
th, td { text-align: left; padding: .7rem .5rem; border-bottom: 1px solid var(--border); vertical-align: top; }
th { font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); font-weight: 600; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  padding: .7rem 1.15rem; border-radius: 999px; border: 1.5px solid transparent;
  font: inherit; font-size: .88rem; font-weight: 500; cursor: pointer;
  text-decoration: none; transition: transform 150ms ease, box-shadow 150ms ease;
}
.btn:hover { text-decoration: none; transform: translateY(-1px); }
.btn-pink { background: var(--pink); color: #fff; }
.btn-dark { background: var(--black); color: #fff; }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--black); }
.btn-sm { padding: .45rem .85rem; font-size: .82rem; }
.badge {
  display: inline-block; padding: .2rem .55rem; border-radius: 999px; font-size: .72rem;
  letter-spacing: .04em; text-transform: uppercase; background: var(--cream); color: var(--muted);
}
.badge-paid, .badge-completed { background: rgba(45,106,79,.12); color: #2d6a4f; }
.badge-pending { background: rgba(214,125,154,.15); color: #9b4d66; }
.badge-processing { background: rgba(200,213,176,.45); color: #3d5a2e; }
.badge-cancelled, .badge-closed { background: rgba(0,0,0,.06); color: #666; }
.form-grid { display: grid; gap: .9rem; }
.form-row { display: grid; gap: .35rem; }
.form-row.two { grid-template-columns: 1fr 1fr; gap: .9rem; }
@media (max-width: 640px) { .form-row.two { grid-template-columns: 1fr; } }
label { font-size: .8rem; font-weight: 600; color: var(--muted); }
input, textarea, select {
  width: 100%; padding: .7rem .85rem; border: 1px solid var(--border); border-radius: 12px;
  font: inherit; background: #fff; box-shadow: var(--shadow);
}
textarea { min-height: 110px; resize: vertical; }
.flash {
  padding: .85rem 1rem; border-radius: 12px; margin-bottom: 1rem; font-size: .92rem;
  background: rgba(200,213,176,.35); color: #2a3d1f;
}
.flash-error { background: rgba(214,125,154,.18); color: #7a3048; }
.auth-wrap {
  max-width: 420px; margin: 4rem auto; padding: 0 4vw 3rem;
}
.auth-card {
  background: #fff; border-radius: 20px; padding: 2rem 1.75rem; box-shadow: var(--shadow);
}
.auth-card h1 { font-family: Fraunces, serif; font-size: 1.85rem; margin-bottom: .35rem; }
.auth-card p.lead { color: var(--muted); margin-bottom: 1.25rem; font-size: .95rem; }
.muted { color: var(--muted); font-size: .9rem; }
.stack { display: grid; gap: .75rem; }
.list-item {
  display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start;
  padding: .85rem 0; border-bottom: 1px solid var(--border);
}
.list-item:last-child { border-bottom: none; }
.empty { color: var(--muted); padding: 1rem 0; }
.actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
.vote-count { font-family: Fraunces, serif; font-weight: 700; font-size: 1.15rem; }
`;
}

export function portalLayout({
  title,
  user,
  nav,
  active,
  body,
  flash,
  flashError,
  bare = false,
}) {
  const flashHtml = flash
    ? `<div class="flash">${escapeHtml(flash)}</div>`
    : flashError
      ? `<div class="flash flash-error">${escapeHtml(flashError)}</div>`
      : '';

  if (bare) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — Bloomie House</title>
  <link rel="icon" type="image/png" href="${LOGO}">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${portalStyles()}</style>
</head>
<body>
  <div class="portal-top">
    <a class="portal-brand" href="/"><img src="${LOGO}" alt=""> Bloomie House</a>
    <a class="muted" href="/">← Back to site</a>
  </div>
  <div class="auth-wrap">${flashHtml}${body}</div>
</body>
</html>`;
  }

  const navHtml = nav
    .map(
      ([href, label, key]) =>
        `<a href="${href}" class="${active === key ? 'active' : ''}">${escapeHtml(label)}</a>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — Bloomie House</title>
  <link rel="icon" type="image/png" href="${LOGO}">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${portalStyles()}</style>
</head>
<body>
  <div class="portal-top">
    <a class="portal-brand" href="/"><img src="${LOGO}" alt=""> Bloomie House</a>
    <div class="portal-user">
      <span>${escapeHtml(user?.name || user?.email || '')}</span>
      <a class="btn btn-ghost btn-sm" href="/auth/logout">Log out</a>
    </div>
  </div>
  <div class="portal-shell">
    <aside class="portal-side"><nav>${navHtml}</nav></aside>
    <main class="portal-main">${flashHtml}${body}</main>
  </div>
</body>
</html>`;
}

export function statusBadge(status) {
  return `<span class="badge badge-${escapeHtml(status)}">${escapeHtml(status)}</span>`;
}

export function money(amount, currency = 'AUD') {
  const n = Number(amount) || 0;
  return `${currency} $${n.toFixed(2)}`;
}

export function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store',
    },
  });
}
