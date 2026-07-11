/**
 * Member portal pages + APIs.
 */

import {
  createMagicLink,
  createSession,
  findOrCreateMember,
  isSecureRequest,
  json,
  redirect,
  sendMagicLinkEmail,
  sessionCookieHeader,
  verifyPassword,
} from './auth.js';
import {
  escapeHtml,
  getOrder,
  getOrderItems,
  listMemberDownloads,
  listMemberGuidelines,
  listOrdersForUser,
  listTemplateRequests,
  orderIsPaid,
} from './db.js';
import { htmlResponse, money, portalLayout, statusBadge } from './ui.js';

const MEMBER_NAV = [
  ['/member', 'Dashboard', 'dashboard'],
  ['/member/orders', 'Orders', 'orders'],
  ['/member/downloads', 'Downloads', 'downloads'],
  ['/member/guidelines', 'Guidelines', 'guidelines'],
  ['/member/requests', 'Template ideas', 'requests'],
  ['/member/profile', 'Profile', 'profile'],
  ['/member/support', 'Support', 'support'],
];

function memberPage(user, active, title, body, flash, flashError) {
  return htmlResponse(
    portalLayout({
      title,
      user,
      nav: MEMBER_NAV,
      active,
      body,
      flash,
      flashError,
    })
  );
}

export function loginPage({ flash, flashError, mode = 'member', magicLink } = {}) {
  const isStaff = mode === 'staff';
  const body = `
<div class="auth-card">
  <h1>${isStaff ? 'Staff login' : 'Member login'}</h1>
  <p class="lead">${
    isStaff
      ? 'Sign in with your staff email and password.'
      : 'Enter your email and we will send a one-time login link.'
  }</p>
  ${
    magicLink
      ? `<div class="flash">Dev mode — email not configured. <a href="${escapeHtml(magicLink)}">Open login link</a></div>`
      : ''
  }
  <form class="form-grid" method="POST" action="${isStaff ? '/api/auth/staff-login' : '/api/auth/magic-link'}">
    <div class="form-row">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required autocomplete="email" placeholder="you@example.com">
    </div>
    ${
      isStaff
        ? `<div class="form-row">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required autocomplete="current-password">
    </div>`
        : ''
    }
    <button class="btn btn-pink" type="submit">${isStaff ? 'Sign in' : 'Email me a link'}</button>
  </form>
  <p class="muted" style="margin-top:1.25rem">
    ${
      isStaff
        ? `<a href="/login">Member login</a>`
        : `<a href="/login/staff">Staff login</a>`
    }
    · <a href="/">Back to site</a>
  </p>
</div>`;
  return htmlResponse(
    portalLayout({
      title: isStaff ? 'Staff login' : 'Member login',
      bare: true,
      body,
      flash,
      flashError,
    })
  );
}

export async function handleAuthApi(request, env, pathname) {
  if (pathname === '/api/auth/magic-link' && request.method === 'POST') {
    const form = await request.formData();
    const email = String(form.get('email') || '')
      .trim()
      .toLowerCase();
    if (!email || !email.includes('@')) {
      return redirect('/login?error=' + encodeURIComponent('Enter a valid email.'));
    }
    await findOrCreateMember(env, email);
    const token = await createMagicLink(env, email);
    // Relative path so local (localhost) and production both work.
    const linkPath = `/auth/verify?token=${token}`;
    const url = new URL(request.url);
    const host = request.headers.get('Host') || url.host;
    const isLocal = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);
    const absoluteLink = `${isLocal ? 'http' : 'https'}://${host}${linkPath}`;
    const mail = await sendMagicLinkEmail(env, email, absoluteLink);
    if (!mail.sent) {
      return redirect(
        '/login?dev_link=' +
          encodeURIComponent(linkPath) +
          '&ok=' +
          encodeURIComponent('Check the link below to continue.')
      );
    }
    return redirect(
      '/login?ok=' + encodeURIComponent('Check your email for a login link.')
    );
  }

  if (pathname === '/api/auth/staff-login' && request.method === 'POST') {
    const form = await request.formData();
    const email = String(form.get('email') || '')
      .trim()
      .toLowerCase();
    const password = String(form.get('password') || '');
    const user = await env.DB.prepare(
      `SELECT * FROM users WHERE email = ? AND role = 'staff'`
    )
      .bind(email)
      .first();
    if (!user || !(await verifyPassword(password, user.password_hash, user.password_salt))) {
      return redirect(
        '/login/staff?error=' + encodeURIComponent('Invalid email or password.')
      );
    }
    const session = await createSession(env, user.id);
    return redirect('/admin', {
      'Set-Cookie': sessionCookieHeader(session, undefined, isSecureRequest(request)),
    });
  }

  return json({ error: 'Not found' }, 404);
}

export async function handleVerify(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) return redirect('/login?error=' + encodeURIComponent('Missing token.'));

  const { consumeMagicLink } = await import('./auth.js');
  const email = await consumeMagicLink(env, token);
  if (!email) {
    return redirect(
      '/login?error=' + encodeURIComponent('This login link is invalid or expired.')
    );
  }
  const user = await findOrCreateMember(env, email);
  const session = await createSession(env, user.id);
  const dest = user.role === 'staff' ? '/admin' : '/member';
  return redirect(dest, {
    'Set-Cookie': sessionCookieHeader(session, undefined, isSecureRequest(request)),
  });
}

export async function memberDashboard(env, user) {
  const orders = await listOrdersForUser(env, user.id);
  const downloads = await listMemberDownloads(env, user.id);
  const guidelines = await listMemberGuidelines(env, user.id);
  const openOrders = orders.filter((o) =>
    ['pending', 'paid', 'processing'].includes(o.status)
  );

  const body = `
<h1>Welcome${user.name ? `, ${escapeHtml(user.name.split(' ')[0])}` : ''}</h1>
<p class="lead">Your Bloomie House account — orders, downloads, and guidelines in one place.</p>
<div class="card-grid">
  <div class="stat-card"><strong>${orders.length}</strong><span>Orders</span></div>
  <div class="stat-card"><strong>${openOrders.length}</strong><span>In progress</span></div>
  <div class="stat-card"><strong>${downloads.length}</strong><span>Downloads</span></div>
  <div class="stat-card"><strong>${guidelines.length}</strong><span>Guidelines</span></div>
</div>
<div class="panel">
  <h2>Recent orders</h2>
  ${
    orders.length === 0
      ? `<p class="empty">No orders yet. When you purchase on Bloomie House, they will show up here.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Order</th><th>Status</th><th>Total</th><th>Date</th></tr></thead>
        <tbody>
          ${orders
            .slice(0, 5)
            .map(
              (o) => `<tr>
            <td><a href="/member/orders/${o.id}">${escapeHtml(o.order_number)}</a></td>
            <td>${statusBadge(o.status)}</td>
            <td>${money(o.total, o.currency)}</td>
            <td>${escapeHtml((o.created_at || '').slice(0, 10))}</td>
          </tr>`
            )
            .join('')}
        </tbody></table></div>`
  }
  <div class="actions">
    <a class="btn btn-ghost btn-sm" href="/member/orders">All orders</a>
    <a class="btn btn-pink btn-sm" href="/member/requests">Suggest a template</a>
  </div>
</div>`;
  return memberPage(user, 'dashboard', 'Member', body);
}

export async function memberOrders(env, user) {
  const orders = await listOrdersForUser(env, user.id);
  const body = `
<h1>Orders</h1>
<p class="lead">Orders placed or managed through Bloomie House (not Etsy).</p>
<div class="panel">
  ${
    orders.length === 0
      ? `<p class="empty">No orders yet.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Order</th><th>Status</th><th>Total</th><th>Updated</th></tr></thead>
        <tbody>
          ${orders
            .map(
              (o) => `<tr>
            <td><a href="/member/orders/${o.id}">${escapeHtml(o.order_number)}</a></td>
            <td>${statusBadge(o.status)}</td>
            <td>${money(o.total, o.currency)}</td>
            <td>${escapeHtml((o.updated_at || o.created_at || '').slice(0, 10))}</td>
          </tr>`
            )
            .join('')}
        </tbody></table></div>`
  }
</div>`;
  return memberPage(user, 'orders', 'Orders', body);
}

export async function memberOrderDetail(env, user, orderId) {
  const order = await getOrder(env, orderId);
  if (!order || order.user_id !== user.id) {
    return memberPage(
      user,
      'orders',
      'Order',
      `<h1>Order not found</h1><p class="lead"><a href="/member/orders">Back to orders</a></p>`,
      null,
      'We could not find that order.'
    );
  }
  const items = await getOrderItems(env, order.id);
  const paid = orderIsPaid(order.status);
  const { getDownloadsForOrder, getGuidelinesForOrder } = await import('./db.js');
  const downloads = paid ? await getDownloadsForOrder(env, order.id) : [];
  const guidelines = paid ? await getGuidelinesForOrder(env, order.id) : [];

  const body = `
<h1>Order ${escapeHtml(order.order_number)}</h1>
<p class="lead">${statusBadge(order.status)} · ${money(order.total, order.currency)} · ${escapeHtml((order.created_at || '').slice(0, 10))}</p>
<div class="panel">
  <h2>Items</h2>
  ${
    items.length
      ? `<div class="table-wrap"><table>
        <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
        <tbody>${items
          .map(
            (i) => `<tr>
          <td>${escapeHtml(i.product_name)}</td>
          <td>${i.quantity}</td>
          <td>${money(i.price)}</td>
        </tr>`
          )
          .join('')}</tbody></table></div>`
      : `<p class="empty">No line items.</p>`
  }
  ${order.notes ? `<p class="muted" style="margin-top:1rem">${escapeHtml(order.notes)}</p>` : ''}
</div>
${
  paid
    ? `<div class="panel">
  <h2>Downloads</h2>
  ${
    downloads.length
      ? downloads
          .map(
            (d) => `<div class="list-item">
        <div><strong>${escapeHtml(d.title)}</strong></div>
        <a class="btn btn-pink btn-sm" href="${escapeHtml(d.file_url)}" target="_blank" rel="noopener">Download</a>
      </div>`
          )
          .join('')
      : `<p class="empty">Files will appear here once staff attach them.</p>`
  }
</div>
<div class="panel">
  <h2>Guidelines</h2>
  ${
    guidelines.length
      ? guidelines
          .map(
            (g) => `<div class="list-item" style="flex-direction:column;align-items:stretch">
        <strong>${escapeHtml(g.title)}</strong>
        ${g.body ? `<p style="margin-top:.5rem;white-space:pre-wrap">${escapeHtml(g.body)}</p>` : ''}
        ${g.file_url ? `<p style="margin-top:.5rem"><a href="${escapeHtml(g.file_url)}" target="_blank" rel="noopener">Open guideline file</a></p>` : ''}
      </div>`
          )
          .join('')
      : `<p class="empty">Guidelines unlock after payment is confirmed.</p>`
  }
</div>`
    : `<div class="panel"><p class="muted">Downloads and guidelines unlock once this order is marked paid.</p></div>`
}
<p><a href="/member/orders">← All orders</a></p>`;
  return memberPage(user, 'orders', order.order_number, body);
}

export async function memberDownloads(env, user) {
  const downloads = await listMemberDownloads(env, user.id);
  const body = `
<h1>Downloads</h1>
<p class="lead">Digital files from your paid Bloomie House orders.</p>
<div class="panel">
  ${
    downloads.length === 0
      ? `<p class="empty">No downloads yet. They appear after an order is paid and files are attached.</p>`
      : downloads
          .map(
            (d) => `<div class="list-item">
      <div>
        <strong>${escapeHtml(d.title)}</strong>
        <p class="muted">Order ${escapeHtml(d.order_number)}</p>
      </div>
      <a class="btn btn-pink btn-sm" href="${escapeHtml(d.file_url)}" target="_blank" rel="noopener">Download</a>
    </div>`
          )
          .join('')
  }
</div>`;
  return memberPage(user, 'downloads', 'Downloads', body);
}

export async function memberGuidelines(env, user) {
  const guidelines = await listMemberGuidelines(env, user.id);
  const body = `
<h1>Guidelines</h1>
<p class="lead">Setup guides and how-tos for products you have paid for.</p>
<div class="panel">
  ${
    guidelines.length === 0
      ? `<p class="empty">No guidelines yet.</p>`
      : guidelines
          .map(
            (g) => `<div class="list-item" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
        <strong>${escapeHtml(g.title)}</strong>
        <span class="muted">Order ${escapeHtml(g.order_number)}</span>
      </div>
      ${g.body ? `<p style="margin-top:.65rem;white-space:pre-wrap">${escapeHtml(g.body)}</p>` : ''}
      ${g.file_url ? `<p style="margin-top:.5rem"><a class="btn btn-ghost btn-sm" href="${escapeHtml(g.file_url)}" target="_blank" rel="noopener">Open file</a></p>` : ''}
    </div>`
          )
          .join('')
  }
</div>`;
  return memberPage(user, 'guidelines', 'Guidelines', body);
}

export async function memberRequests(env, user, flash, flashError) {
  const requests = await listTemplateRequests(env, user.id);
  const body = `
<h1>Template ideas</h1>
<p class="lead">Request a template niche or vote for ideas other members want. Highest votes help us prioritise.</p>
<div class="panel">
  <h2>Submit a request</h2>
  <form class="form-grid" method="POST" action="/api/member/requests">
    <div class="form-row">
      <label for="title">What template do you want?</label>
      <input id="title" name="title" required maxlength="120" placeholder="e.g. Nail salon booking site">
    </div>
    <div class="form-row two">
      <div class="form-row">
        <label for="niche">Niche</label>
        <input id="niche" name="niche" maxlength="80" placeholder="Beauty, wedding, tradie…">
      </div>
    </div>
    <div class="form-row">
      <label for="description">Details (optional)</label>
      <textarea id="description" name="description" maxlength="2000" placeholder="Platform, pages, must-have features…"></textarea>
    </div>
    <button class="btn btn-pink" type="submit">Submit idea</button>
  </form>
</div>
<div class="panel">
  <h2>Community votes</h2>
  ${
    requests.length === 0
      ? `<p class="empty">No requests yet — be the first.</p>`
      : requests
          .map(
            (r) => `<div class="list-item">
      <div>
        <strong>${escapeHtml(r.title)}</strong>
        ${r.niche ? `<p class="muted">${escapeHtml(r.niche)} · ${statusBadge(r.status)}</p>` : `<p class="muted">${statusBadge(r.status)}</p>`}
        ${r.description ? `<p style="margin-top:.35rem">${escapeHtml(r.description)}</p>` : ''}
      </div>
      <div style="text-align:right">
        <div class="vote-count">${r.votes || r.vote_count || 0}</div>
        ${
          r.voted
            ? `<span class="muted">Voted</span>`
            : r.status === 'open'
              ? `<form method="POST" action="/api/member/requests/${r.id}/vote"><button class="btn btn-ghost btn-sm" type="submit">Vote</button></form>`
              : ''
        }
      </div>
    </div>`
          )
          .join('')
  }
</div>`;
  return memberPage(user, 'requests', 'Template ideas', body, flash, flashError);
}

export async function memberProfile(env, user, flash, flashError) {
  const body = `
<h1>Profile</h1>
<p class="lead">Your account details for Bloomie House orders and downloads.</p>
<div class="panel">
  <form class="form-grid" method="POST" action="/api/member/profile">
    <div class="form-row">
      <label for="email">Email</label>
      <input id="email" value="${escapeHtml(user.email)}" disabled>
    </div>
    <div class="form-row two">
      <div class="form-row">
        <label for="name">Name</label>
        <input id="name" name="name" value="${escapeHtml(user.name || '')}" maxlength="120">
      </div>
      <div class="form-row">
        <label for="phone">Phone</label>
        <input id="phone" name="phone" value="${escapeHtml(user.phone || '')}" maxlength="40">
      </div>
    </div>
    <div class="form-row">
      <label for="business_name">Business name</label>
      <input id="business_name" name="business_name" value="${escapeHtml(user.business_name || '')}" maxlength="160">
    </div>
    <button class="btn btn-pink" type="submit">Save profile</button>
  </form>
</div>`;
  return memberPage(user, 'profile', 'Profile', body, flash, flashError);
}

export function memberSupport(user) {
  const body = `
<h1>Support</h1>
<p class="lead">Need help with an order, download, or template?</p>
<div class="panel stack">
  <p>Email us at <a href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a> and include your order number if you have one.</p>
  <p><a class="btn btn-ghost" href="/contact">Contact page</a>
  <a class="btn btn-pink" href="/services">Book a discovery call</a></p>
</div>`;
  return memberPage(user, 'support', 'Support', body);
}

export async function handleMemberApi(request, env, user, pathname) {
  if (pathname === '/api/member/profile' && request.method === 'POST') {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const business_name = String(form.get('business_name') || '').trim();
    await env.DB.prepare(
      `UPDATE users SET name = ?, phone = ?, business_name = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(name, phone, business_name, user.id)
      .run();
    return redirect('/member/profile?ok=' + encodeURIComponent('Profile saved.'));
  }

  if (pathname === '/api/member/requests' && request.method === 'POST') {
    const form = await request.formData();
    const title = String(form.get('title') || '').trim();
    const description = String(form.get('description') || '').trim();
    const niche = String(form.get('niche') || '').trim();
    if (!title) {
      return redirect(
        '/member/requests?error=' + encodeURIComponent('Please add a title.')
      );
    }
    await env.DB.prepare(
      `INSERT INTO template_requests (user_id, title, description, niche) VALUES (?, ?, ?, ?)`
    )
      .bind(user.id, title, description, niche)
      .run();
    return redirect(
      '/member/requests?ok=' + encodeURIComponent('Thanks — your idea was submitted.')
    );
  }

  const voteMatch = pathname.match(/^\/api\/member\/requests\/(\d+)\/vote$/);
  if (voteMatch && request.method === 'POST') {
    const requestId = Number(voteMatch[1]);
    try {
      await env.DB.prepare(
        `INSERT INTO template_request_votes (request_id, user_id) VALUES (?, ?)`
      )
        .bind(requestId, user.id)
        .run();
      await env.DB.prepare(
        `UPDATE template_requests SET vote_count = (
           SELECT COUNT(*) FROM template_request_votes WHERE request_id = ?
         ), updated_at = datetime('now') WHERE id = ?`
      )
        .bind(requestId, requestId)
        .run();
    } catch {
      // already voted
    }
    return redirect('/member/requests?ok=' + encodeURIComponent('Vote recorded.'));
  }

  return json({ error: 'Not found' }, 404);
}
