/**
 * Staff CMS — products, orders, downloads, guidelines, members, requests.
 */

import { json, readForm, redirect } from './auth.js';
import {
  dashboardStats,
  escapeHtml,
  getOrder,
  getOrderItems,
  getDownloadsForOrder,
  getGuidelinesForOrder,
  getProductById,
  listAllOrders,
  listMembers,
  listProducts,
  listTemplateRequests,
  nextOrderNumber,
} from './db.js';
import { htmlResponse, money, portalLayout, statusBadge } from './ui.js';
import { handleProductImageUpload } from './media.js';

const ADMIN_NAV = [
  ['/admin', 'Dashboard', 'dashboard'],
  ['/admin/products', 'Products', 'products'],
  ['/admin/orders', 'Orders', 'orders'],
  ['/admin/members', 'Members', 'members'],
  ['/admin/requests', 'Template votes', 'requests'],
];

const PLATFORM_PRESETS = ['Canva', 'Wix Studio', 'Shopify', 'Squarespace', 'WordPress'];
const CATEGORY_PRESETS = ['canva', 'wix', 'shopify'];
const COLLECTION_PRESETS = [
  ['beauty', 'Beauty · Lash & Brow'],
  ['wedding', 'Wedding'],
  ['others', 'Others'],
];

function adminPage(user, active, title, body, flash, flashError) {
  return htmlResponse(
    portalLayout({
      title: `CMS · ${title}`,
      user,
      nav: ADMIN_NAV,
      active,
      body,
      flash,
      flashError,
    })
  );
}

export async function adminDashboard(env, user) {
  const stats = await dashboardStats(env);
  const orders = (await listAllOrders(env)).slice(0, 8);
  const body = `
<h1>Staff CMS</h1>
<p class="lead">Manage products, member orders, downloads, and template votes. Two staff accounts are supported.</p>
<div class="card-grid">
  <a class="stat-card" href="/admin/members"><strong>${stats.members}</strong><span>Members</span></a>
  <a class="stat-card" href="/admin/orders"><strong>${stats.orders}</strong><span>Orders</span></a>
  <a class="stat-card" href="/admin/orders?filter=open"><strong>${stats.openOrders}</strong><span>Open orders</span></a>
  <a class="stat-card" href="/admin/products"><strong>${stats.products}</strong><span>Products</span></a>
  <a class="stat-card" href="/admin/requests?filter=open"><strong>${stats.openRequests}</strong><span>Open ideas</span></a>
</div>
<div class="panel">
  <h2>Recent orders</h2>
  ${
    orders.length === 0
      ? `<p class="empty">No orders yet. Create one when a customer pays on Bloomie House.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Order</th><th>Member</th><th>Status</th><th>Total</th></tr></thead>
        <tbody>${orders
          .map(
            (o) => `<tr>
          <td><a href="/admin/orders/${o.id}">${escapeHtml(o.order_number)}</a></td>
          <td>${escapeHtml(o.member_name || o.member_email)}</td>
          <td>${statusBadge(o.status)}</td>
          <td>${money(o.total, o.currency)}</td>
        </tr>`
          )
          .join('')}</tbody></table></div>`
  }
  <div class="actions">
    <a class="btn btn-pink btn-sm" href="/admin/orders/new">New order</a>
    <a class="btn btn-ghost btn-sm" href="/admin/products/new">New product</a>
  </div>
</div>`;
  return adminPage(user, 'dashboard', 'Dashboard', body);
}

export async function adminProducts(env, user, flash, flashError) {
  const products = await listProducts(env);
  const body = `
<h1>Products</h1>
<p class="lead">Edit descriptions, pricing, images, and video. Published products can be attached to orders.</p>
<div class="actions" style="margin-top:0;margin-bottom:1rem">
  <a class="btn btn-pink" href="/admin/products/new">Add product</a>
</div>
<div class="panel">
  ${
    products.length === 0
      ? `<p class="empty">No products yet.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Name</th><th>Price</th><th>Status</th><th></th></tr></thead>
        <tbody>${products
          .map(
            (p) => `<tr>
          <td>
            <strong>${escapeHtml(p.name)}</strong>
            <p class="muted">${escapeHtml(p.slug)} · ${escapeHtml(p.platform || p.category)} · ${escapeHtml(p.collection || 'others')}</p>
          </td>
          <td>${money(p.price)}</td>
          <td><span class="badge ${p.published ? 'badge-completed' : 'badge-closed'}">${p.published ? 'published' : 'draft'}</span></td>
          <td><a class="btn btn-ghost btn-sm" href="/admin/products/${p.id}">Edit</a></td>
        </tr>`
          )
          .join('')}</tbody></table></div>`
  }
</div>`;
  return adminPage(user, 'products', 'Products', body, flash, flashError);
}

function platformFieldValues(platform) {
  const raw = platform || '';
  if (PLATFORM_PRESETS.includes(raw)) {
    return { select: raw, custom: '' };
  }
  if (!raw) return { select: '', custom: '' };
  return { select: '__other__', custom: raw };
}

function categoryFieldValues(category) {
  const raw = category || 'canva';
  if (CATEGORY_PRESETS.includes(raw)) {
    return { select: raw, custom: '' };
  }
  if (raw === 'other') {
    return { select: 'other', custom: '' };
  }
  return { select: 'other', custom: raw };
}

function resolvePlatform(form) {
  const sel = String(form.get('platform') || '').trim();
  if (sel === '__other__') {
    return String(form.get('platform_custom') || '').trim();
  }
  return sel;
}

function resolveCategory(form) {
  const sel = String(form.get('category') || 'canva').trim();
  if (sel === 'other') {
    const custom = String(form.get('category_custom') || '').trim();
    return custom || 'other';
  }
  return sel;
}

function productImageField(images) {
  const urls = images || [];
  const previewHtml = urls
    .map(
      (url) => `<div class="image-preview-item" data-url="${escapeHtml(url)}">
      <img src="${escapeHtml(url)}" alt="">
      <button type="button" aria-label="Remove image" title="Remove">&times;</button>
    </div>`
    )
    .join('');
  const imagesText = urls.join('\n');
  return `
  <div class="form-row">
    <label>Product images</label>
    <div class="image-upload-panel">
      <div class="image-preview-grid" id="image-preview-grid">${previewHtml}</div>
      <div class="actions" style="margin-top:0">
        <button class="btn btn-ghost btn-sm" type="button" id="image-upload-btn">Upload images</button>
        <input type="file" id="image-file-input" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden>
      </div>
      <p class="muted">Uploaded images are saved when you upload. You can also paste URLs below (one per line).</p>
      <textarea id="images" name="images" placeholder="https://… or /media/products/…">${escapeHtml(imagesText)}</textarea>
    </div>
  </div>
  <script>
  (function(){
    var grid = document.getElementById('image-preview-grid');
    var textarea = document.getElementById('images');
    var fileInput = document.getElementById('image-file-input');
    var uploadBtn = document.getElementById('image-upload-btn');
    if (!grid || !textarea) return;

    function linesFromTextarea() {
      return textarea.value.split('\\n').map(function(s){ return s.trim(); }).filter(Boolean);
    }

    function syncTextarea(urls) {
      textarea.value = urls.join('\\n');
    }

    function addPreview(url) {
      var item = document.createElement('div');
      item.className = 'image-preview-item';
      item.dataset.url = url;
      item.innerHTML = '<img src="' + url.replace(/"/g, '&quot;') + '" alt=""><button type="button" aria-label="Remove image" title="Remove">&times;</button>';
      grid.appendChild(item);
    }

    function rebuildFromTextarea() {
      grid.innerHTML = '';
      linesFromTextarea().forEach(addPreview);
    }

    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var item = btn.closest('.image-preview-item');
      if (!item) return;
      var urls = linesFromTextarea().filter(function(u){ return u !== item.dataset.url; });
      syncTextarea(urls);
      item.remove();
    });

    uploadBtn.addEventListener('click', function(){ fileInput.click(); });

    fileInput.addEventListener('change', async function() {
      var files = Array.from(fileInput.files || []);
      fileInput.value = '';
      if (!files.length) return;
      uploadBtn.disabled = true;
      uploadBtn.textContent = 'Uploading…';
      try {
        for (var i = 0; i < files.length; i++) {
          var fd = new FormData();
          fd.append('file', files[i]);
          var res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
          var data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Upload failed');
          var urls = linesFromTextarea();
          urls.push(data.url);
          syncTextarea(urls);
          addPreview(data.url);
        }
      } catch (err) {
        alert(err.message || 'Could not upload image.');
      } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload images';
      }
    });
  })();
  </script>`;
}

function productForm(product = null) {
  const p = product || {
    slug: '',
    name: '',
    niche: '',
    platform: '',
    category: 'canva',
    collection: 'others',
    badge: '',
    price: 0,
    original_price: '',
    description: '',
    features: [],
    images: [],
    video_url: '',
    published: true,
    sort_order: 0,
  };
  const featuresText = (p.features || []).join('\n');
  const platformFields = platformFieldValues(p.platform);
  const categoryFields = categoryFieldValues(p.category);
  const collection = p.collection || 'others';
  return `
<form class="form-grid" method="POST" action="${product ? `/api/admin/products/${product.id}` : '/api/admin/products'}">
  <div class="form-row two">
    <div class="form-row">
      <label for="name">Name</label>
      <input id="name" name="name" required value="${escapeHtml(p.name)}">
    </div>
    <div class="form-row">
      <label for="slug">Slug</label>
      <input id="slug" name="slug" required value="${escapeHtml(p.slug)}" pattern="[a-z0-9\\-]+" title="lowercase letters, numbers, hyphens">
    </div>
  </div>
  <div class="form-row two">
    <div class="form-row">
      <label for="niche">Niche</label>
      <input id="niche" name="niche" value="${escapeHtml(p.niche || '')}">
    </div>
    <div class="form-row">
      <label for="platform">Platform</label>
      <select id="platform" name="platform">
        <option value="" ${!platformFields.select ? 'selected' : ''}>— Select —</option>
        ${PLATFORM_PRESETS.map(
          (opt) =>
            `<option value="${escapeHtml(opt)}" ${platformFields.select === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>`
        ).join('')}
        <option value="__other__" ${platformFields.select === '__other__' ? 'selected' : ''}>Other…</option>
      </select>
      <input class="field-other" id="platform_custom" name="platform_custom" value="${escapeHtml(platformFields.custom)}" placeholder="Custom platform name" style="${platformFields.select === '__other__' ? '' : 'display:none'}">
    </div>
  </div>
  <div class="form-row two">
    <div class="form-row">
      <label for="category">Category</label>
      <select id="category" name="category">
        ${CATEGORY_PRESETS.map(
          (c) =>
            `<option value="${c}" ${categoryFields.select === c ? 'selected' : ''}>${c}</option>`
        ).join('')}
        <option value="other" ${categoryFields.select === 'other' ? 'selected' : ''}>other</option>
      </select>
      <input class="field-other" id="category_custom" name="category_custom" value="${escapeHtml(categoryFields.custom)}" placeholder="Custom category" style="${categoryFields.select === 'other' ? '' : 'display:none'}">
    </div>
    <div class="form-row">
      <label for="collection">Shop collection</label>
      <select id="collection" name="collection">
        ${COLLECTION_PRESETS.map(
          ([value, label]) =>
            `<option value="${value}" ${collection === value ? 'selected' : ''}>${escapeHtml(label)}</option>`
        ).join('')}
      </select>
    </div>
  </div>
  <div class="form-row two">
    <div class="form-row">
      <label for="badge">Badge</label>
      <input id="badge" name="badge" value="${escapeHtml(p.badge || '')}" placeholder="New, Bestseller…">
    </div>
    <div class="form-row">
      <label for="sort_order">Sort order</label>
      <input id="sort_order" name="sort_order" type="number" value="${escapeHtml(p.sort_order || 0)}">
    </div>
  </div>
  <div class="form-row two">
    <div class="form-row">
      <label for="price">Price (AUD)</label>
      <input id="price" name="price" type="number" step="0.01" min="0" value="${escapeHtml(p.price)}">
    </div>
    <div class="form-row">
      <label for="original_price">Original price</label>
      <input id="original_price" name="original_price" type="number" step="0.01" min="0" value="${escapeHtml(p.original_price ?? '')}">
    </div>
  </div>
  <div class="form-row">
    <label for="description">Description</label>
    <textarea id="description" name="description">${escapeHtml(p.description || '')}</textarea>
  </div>
  <div class="form-row">
    <label for="features">Features (one per line)</label>
    <textarea id="features" name="features">${escapeHtml(featuresText)}</textarea>
  </div>
  ${productImageField(p.images || [])}
  <div class="form-row">
    <label for="video_url">Video URL</label>
    <input id="video_url" name="video_url" value="${escapeHtml(p.video_url || '')}" placeholder="https://…">
  </div>
  <div class="form-row">
    <label for="published">Visibility</label>
    <select id="published" name="published">
      <option value="1" ${p.published ? 'selected' : ''}>Published</option>
      <option value="0" ${!p.published ? 'selected' : ''}>Draft</option>
    </select>
  </div>
  <div class="actions">
    <button class="btn btn-pink" type="submit">${product ? 'Save product' : 'Create product'}</button>
    <a class="btn btn-ghost" href="/admin/products">Cancel</a>
  </div>
</form>
${
  product
    ? `<form method="POST" action="/api/admin/products/${product.id}/delete" onsubmit="return confirm('Delete this product? Orders keep the product name, but the catalog entry is removed.');" style="margin-top:1rem">
  <button class="btn btn-ghost btn-sm" type="submit" style="color:#a33">Delete product</button>
</form>`
    : ''
}
<script>
(function(){
  function toggleOther(selectId, inputId, otherValue) {
    var sel = document.getElementById(selectId);
    var input = document.getElementById(inputId);
    if (!sel || !input) return;
    function sync() {
      input.style.display = sel.value === otherValue ? '' : 'none';
    }
    sel.addEventListener('change', sync);
    sync();
  }
  toggleOther('platform', 'platform_custom', '__other__');
  toggleOther('category', 'category_custom', 'other');
})();
</script>`;
}

export async function adminProductEdit(env, user, id, flash, flashError) {
  const isNew = id === 'new';
  const product = isNew ? null : await getProductById(env, id);
  if (!isNew && !product) {
    return adminPage(user, 'products', 'Products', `<h1>Not found</h1>`, null, 'Product not found.');
  }
  const body = `
<h1>${isNew ? 'New product' : 'Edit product'}</h1>
<p class="lead">${isNew ? 'Add a product staff can attach to member orders.' : escapeHtml(product.name)}</p>
<div class="panel">${productForm(product)}</div>`;
  return adminPage(user, 'products', isNew ? 'New product' : 'Edit product', body, flash, flashError);
}

export async function adminOrders(env, user, flash, flashError, filter) {
  let orders = await listAllOrders(env);
  if (filter === 'open') {
    orders = orders.filter((o) =>
      ['pending', 'paid', 'processing'].includes(o.status)
    );
  }
  const filterNote =
    filter === 'open'
      ? '<p class="muted" style="margin-bottom:1rem">Showing open orders only. <a href="/admin/orders">View all</a></p>'
      : '';
  const body = `
<h1>Orders</h1>
<p class="lead">Site orders only (not Etsy). Attach downloads and guidelines after payment.</p>
${filterNote}
<div class="actions" style="margin-top:0;margin-bottom:1rem">
  <a class="btn btn-pink" href="/admin/orders/new">Create order</a>
</div>
<div class="panel">
  ${
    orders.length === 0
      ? `<p class="empty">No orders yet.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Order</th><th>Member</th><th>Status</th><th>Total</th><th>Date</th></tr></thead>
        <tbody>${orders
          .map(
            (o) => `<tr>
          <td><a href="/admin/orders/${o.id}">${escapeHtml(o.order_number)}</a></td>
          <td>${escapeHtml(o.member_email)}<br><span class="muted">${escapeHtml(o.member_name || '')}</span></td>
          <td>${statusBadge(o.status)}</td>
          <td>${money(o.total, o.currency)}</td>
          <td>${escapeHtml((o.created_at || '').slice(0, 10))}</td>
        </tr>`
          )
          .join('')}</tbody></table></div>`
  }
</div>`;
  return adminPage(user, 'orders', 'Orders', body, flash, flashError);
}

export async function adminOrderNew(env, user, flash, flashError) {
  const members = await listMembers(env);
  const products = await listProducts(env);
  const body = `
<h1>New order</h1>
<p class="lead">Create an order for a member. Use their email — a member account is created if needed.</p>
<div class="panel">
  <form class="form-grid" method="POST" action="/api/admin/orders">
    <div class="form-row two">
      <div class="form-row">
        <label for="email">Member email</label>
        <input id="email" name="email" type="email" required list="member-emails" placeholder="customer@email.com">
        <datalist id="member-emails">
          ${members.map((m) => `<option value="${escapeHtml(m.email)}">${escapeHtml(m.name || m.email)}</option>`).join('')}
        </datalist>
      </div>
      <div class="form-row">
        <label for="name">Member name (optional)</label>
        <input id="name" name="name" maxlength="120">
      </div>
    </div>
    <div class="form-row two">
      <div class="form-row">
        <label for="status">Status</label>
        <select id="status" name="status">
          ${['pending', 'paid', 'processing', 'completed', 'cancelled']
            .map((s) => `<option value="${s}" ${s === 'paid' ? 'selected' : ''}>${s}</option>`)
            .join('')}
        </select>
      </div>
      <div class="form-row">
        <label for="product_id">Product</label>
        <select id="product_id" name="product_id">
          <option value="">Custom / no catalog product</option>
          ${products
            .map(
              (p) =>
                `<option value="${p.id}">${escapeHtml(p.name)} — ${money(p.price)}</option>`
            )
            .join('')}
        </select>
      </div>
    </div>
    <div class="form-row two">
      <div class="form-row">
        <label for="product_name">Line item name</label>
        <input id="product_name" name="product_name" placeholder="Filled from product if selected">
      </div>
      <div class="form-row">
        <label for="price">Line price</label>
        <input id="price" name="price" type="number" step="0.01" min="0" value="0">
      </div>
    </div>
    <div class="form-row">
      <label for="notes">Internal notes</label>
      <textarea id="notes" name="notes"></textarea>
    </div>
    <button class="btn btn-pink" type="submit">Create order</button>
  </form>
</div>
<script>
(function(){
  var products = ${JSON.stringify(
    products.map((p) => ({ id: p.id, name: p.name, price: p.price }))
  )};
  var sel = document.getElementById('product_id');
  var name = document.getElementById('product_name');
  var price = document.getElementById('price');
  sel.addEventListener('change', function(){
    var p = products.find(function(x){ return String(x.id) === sel.value; });
    if(p){ name.value = p.name; price.value = p.price; }
  });
})();
</script>`;
  return adminPage(user, 'orders', 'New order', body, flash, flashError);
}

export async function adminOrderDetail(env, user, orderId, flash, flashError) {
  const order = await getOrder(env, orderId);
  if (!order) {
    return adminPage(user, 'orders', 'Orders', `<h1>Not found</h1>`, null, 'Order not found.');
  }
  const items = await getOrderItems(env, order.id);
  const downloads = await getDownloadsForOrder(env, order.id);
  const guidelines = await getGuidelinesForOrder(env, order.id);

  const body = `
<h1>Order ${escapeHtml(order.order_number)}</h1>
<p class="lead">${escapeHtml(order.member_email)} · ${money(order.total, order.currency)}</p>

<div class="panel">
  <h2>Status</h2>
  <form class="form-grid" method="POST" action="/api/admin/orders/${order.id}">
    <div class="form-row two">
      <div class="form-row">
        <label for="status">Status</label>
        <select id="status" name="status">
          ${['pending', 'paid', 'processing', 'completed', 'cancelled']
            .map(
              (s) =>
                `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`
            )
            .join('')}
        </select>
      </div>
      <div class="form-row">
        <label for="total">Total</label>
        <input id="total" name="total" type="number" step="0.01" value="${escapeHtml(order.total)}">
      </div>
    </div>
    <div class="form-row">
      <label for="notes">Notes</label>
      <textarea id="notes" name="notes">${escapeHtml(order.notes || '')}</textarea>
    </div>
    <button class="btn btn-pink" type="submit">Save order</button>
  </form>
</div>

<div class="panel">
  <h2>Items</h2>
  ${
    items.length
      ? `<div class="table-wrap"><table><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
        <tbody>${items
          .map(
            (i) =>
              `<tr><td>${escapeHtml(i.product_name)}</td><td>${i.quantity}</td><td>${money(i.price)}</td></tr>`
          )
          .join('')}</tbody></table></div>`
      : `<p class="empty">No items.</p>`
  }
</div>

<div class="panel">
  <h2>Downloads</h2>
  ${
    downloads.length
      ? downloads
          .map(
            (d) => `<div class="list-item">
        <div><strong>${escapeHtml(d.title)}</strong><p class="muted">${escapeHtml(d.file_url)}</p></div>
        <form method="POST" action="/api/admin/downloads/${d.id}/delete"><button class="btn btn-ghost btn-sm" type="submit">Remove</button></form>
      </div>`
          )
          .join('')
      : `<p class="empty">No files yet.</p>`
  }
  <form class="form-grid" method="POST" action="/api/admin/orders/${order.id}/downloads" style="margin-top:1rem">
    <div class="form-row two">
      <div class="form-row">
        <label for="dl_title">Title</label>
        <input id="dl_title" name="title" required placeholder="Canva template link">
      </div>
      <div class="form-row">
        <label for="dl_url">File URL</label>
        <input id="dl_url" name="file_url" required placeholder="https://…">
      </div>
    </div>
    <button class="btn btn-dark btn-sm" type="submit">Add download</button>
  </form>
</div>

<div class="panel">
  <h2>Guidelines</h2>
  ${
    guidelines.length
      ? guidelines
          .map(
            (g) => `<div class="list-item" style="flex-direction:column;align-items:stretch">
        <div style="display:flex;justify-content:space-between;gap:1rem">
          <strong>${escapeHtml(g.title)}</strong>
          <form method="POST" action="/api/admin/guidelines/${g.id}/delete"><button class="btn btn-ghost btn-sm" type="submit">Remove</button></form>
        </div>
        ${g.body ? `<p style="white-space:pre-wrap;margin-top:.5rem">${escapeHtml(g.body)}</p>` : ''}
        ${g.file_url ? `<p class="muted">${escapeHtml(g.file_url)}</p>` : ''}
      </div>`
          )
          .join('')
      : `<p class="empty">No guidelines yet.</p>`
  }
  <form class="form-grid" method="POST" action="/api/admin/orders/${order.id}/guidelines" style="margin-top:1rem">
    <div class="form-row">
      <label for="g_title">Title</label>
      <input id="g_title" name="title" required placeholder="Setup guide">
    </div>
    <div class="form-row">
      <label for="g_body">Guideline text</label>
      <textarea id="g_body" name="body" placeholder="Steps for the customer…"></textarea>
    </div>
    <div class="form-row">
      <label for="g_url">Optional file URL</label>
      <input id="g_url" name="file_url" placeholder="https://…">
    </div>
    <button class="btn btn-dark btn-sm" type="submit">Add guideline</button>
  </form>
</div>
<p><a href="/admin/orders">← All orders</a></p>`;
  return adminPage(user, 'orders', order.order_number, body, flash, flashError);
}

export async function adminProfile(env, user, flash, flashError) {
  const fresh = await env.DB.prepare(
    `SELECT id, email, name, phone, business_name, role FROM users WHERE id = ?`
  )
    .bind(user.id)
    .first();
  const u = fresh || user;
  const body = `
<h1>Profile</h1>
<p class="lead">Your staff account details.</p>
<div class="panel">
  <form class="form-grid" method="POST" action="/api/admin/profile">
    <div class="form-row">
      <label for="email">Email</label>
      <input id="email" value="${escapeHtml(u.email)}" disabled>
    </div>
    <div class="form-row two">
      <div class="form-row">
        <label for="name">Name</label>
        <input id="name" name="name" value="${escapeHtml(u.name || '')}" maxlength="120" required>
      </div>
      <div class="form-row">
        <label for="phone">Phone</label>
        <input id="phone" name="phone" value="${escapeHtml(u.phone || '')}" maxlength="40">
      </div>
    </div>
    <button class="btn btn-pink" type="submit">Save profile</button>
  </form>
</div>`;
  return adminPage(user, 'profile', 'Profile', body, flash, flashError);
}

export async function adminMembers(env, user) {
  const members = await listMembers(env);
  const body = `
<h1>Members</h1>
<p class="lead">Customers who have logged in or been added via an order.</p>
<div class="panel">
  ${
    members.length === 0
      ? `<p class="empty">No members yet.</p>`
      : `<div class="table-wrap"><table>
        <thead><tr><th>Name</th><th>Email</th><th>Business</th><th>Joined</th></tr></thead>
        <tbody>${members
          .map(
            (m) => `<tr>
          <td>${escapeHtml(m.name || '—')}</td>
          <td>${escapeHtml(m.email)}</td>
          <td>${escapeHtml(m.business_name || '—')}</td>
          <td>${escapeHtml((m.created_at || '').slice(0, 10))}</td>
        </tr>`
          )
          .join('')}</tbody></table></div>`
  }
</div>`;
  return adminPage(user, 'members', 'Members', body);
}

export async function adminRequests(env, user, flash, flashError, filter) {
  let requests = await listTemplateRequests(env);
  if (filter === 'open') {
    requests = requests.filter((r) => r.status === 'open');
  }
  const filterNote =
    filter === 'open'
      ? '<p class="muted" style="margin-bottom:1rem">Showing open ideas only. <a href="/admin/requests">View all</a></p>'
      : '';
  const body = `
<h1>Template votes</h1>
<p class="lead">Member requests ranked by votes. Update status as you plan or ship ideas.</p>
${filterNote}
<div class="panel">
  ${
    requests.length === 0
      ? `<p class="empty">No requests yet.</p>`
      : requests
          .map(
            (r) => `<div class="list-item" style="flex-wrap:wrap">
      <div style="flex:1;min-width:200px">
        <strong>${escapeHtml(r.title)}</strong>
        <p class="muted">${escapeHtml(r.author_email)} · ${r.votes || r.vote_count || 0} votes</p>
        ${r.niche ? `<p class="muted">${escapeHtml(r.niche)}</p>` : ''}
        ${r.description ? `<p style="margin-top:.35rem">${escapeHtml(r.description)}</p>` : ''}
      </div>
      <form method="POST" action="/api/admin/requests/${r.id}" style="display:flex;gap:.5rem;align-items:center">
        <select name="status">
          ${['open', 'planned', 'done', 'closed']
            .map(
              (s) =>
                `<option value="${s}" ${r.status === s ? 'selected' : ''}>${s}</option>`
            )
            .join('')}
        </select>
        <button class="btn btn-ghost btn-sm" type="submit">Update</button>
      </form>
    </div>`
          )
          .join('')
  }
</div>`;
  return adminPage(user, 'requests', 'Template votes', body, flash, flashError);
}

function linesToArray(text) {
  return String(text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function resolveCollection(form) {
  const value = String(form.get('collection') || 'others').trim();
  if (COLLECTION_PRESETS.some(([v]) => v === value)) return value;
  return 'others';
}

export async function handleAdminApi(request, env, user, pathname) {
  if (pathname === '/api/admin/upload-image' && request.method === 'POST') {
    return handleProductImageUpload(request, env);
  }

  if (pathname === '/api/admin/profile' && request.method === 'POST') {
    const form = await readForm(request);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    if (!name) {
      return redirect('/admin/profile?error=' + encodeURIComponent('Name is required.'));
    }
    await env.DB.prepare(
      `UPDATE users SET name = ?, phone = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(name, phone, user.id)
      .run();
    return redirect('/admin/profile?ok=' + encodeURIComponent('Profile saved.'));
  }

  // Create product
  if (pathname === '/api/admin/products' && request.method === 'POST') {
    const form = await readForm(request);
    const name = String(form.get('name') || '').trim();
    let slug = String(form.get('slug') || '').trim() || slugify(name);
    const features = linesToArray(form.get('features'));
    const images = linesToArray(form.get('images'));
    const original = form.get('original_price');
    try {
      await env.DB.prepare(
        `INSERT INTO products (
          slug, name, niche, platform, category, collection, badge, price, original_price,
          description, features_json, images_json, video_url, published, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          slug,
          name,
          String(form.get('niche') || '').trim(),
          resolvePlatform(form),
          resolveCategory(form),
          resolveCollection(form),
          String(form.get('badge') || '').trim(),
          Number(form.get('price') || 0),
          original === '' || original == null ? null : Number(original),
          String(form.get('description') || '').trim(),
          JSON.stringify(features),
          JSON.stringify(images),
          String(form.get('video_url') || '').trim(),
          String(form.get('published') || '1') === '1' ? 1 : 0,
          Number(form.get('sort_order') || 0)
        )
        .run();
    } catch (e) {
      return redirect(
        '/admin/products/new?error=' +
          encodeURIComponent('Could not create product (slug may already exist).')
      );
    }
    return redirect('/admin/products?ok=' + encodeURIComponent('Product created.'));
  }

  const productDelete = pathname.match(/^\/api\/admin\/products\/(\d+)\/delete$/);
  if (productDelete && request.method === 'POST') {
    const id = Number(productDelete[1]);
    await env.DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();
    return redirect('/admin/products?ok=' + encodeURIComponent('Product deleted.'));
  }

  const productMatch = pathname.match(/^\/api\/admin\/products\/(\d+)$/);
  if (productMatch && request.method === 'POST') {
    const id = Number(productMatch[1]);
    const form = await readForm(request);
    const features = linesToArray(form.get('features'));
    const images = linesToArray(form.get('images'));
    const original = form.get('original_price');
    await env.DB.prepare(
      `UPDATE products SET
        slug = ?, name = ?, niche = ?, platform = ?, category = ?, collection = ?, badge = ?,
        price = ?, original_price = ?, description = ?, features_json = ?,
        images_json = ?, video_url = ?, published = ?, sort_order = ?,
        updated_at = datetime('now')
       WHERE id = ?`
    )
      .bind(
        String(form.get('slug') || '').trim(),
        String(form.get('name') || '').trim(),
        String(form.get('niche') || '').trim(),
        resolvePlatform(form),
        resolveCategory(form),
        resolveCollection(form),
        String(form.get('badge') || '').trim(),
        Number(form.get('price') || 0),
        original === '' || original == null ? null : Number(original),
        String(form.get('description') || '').trim(),
        JSON.stringify(features),
        JSON.stringify(images),
        String(form.get('video_url') || '').trim(),
        String(form.get('published') || '1') === '1' ? 1 : 0,
        Number(form.get('sort_order') || 0),
        id
      )
      .run();
    return redirect(
      `/admin/products/${id}?ok=` + encodeURIComponent('Product saved.')
    );
  }

  // Create order
  if (pathname === '/api/admin/orders' && request.method === 'POST') {
    const { findOrCreateMember } = await import('./auth.js');
    const form = await readForm(request);
    const email = String(form.get('email') || '')
      .trim()
      .toLowerCase();
    const name = String(form.get('name') || '').trim();
    if (!email) {
      return redirect('/admin/orders/new?error=' + encodeURIComponent('Email required.'));
    }
    const member = await findOrCreateMember(env, email, name);
    if (name && !member.name) {
      await env.DB.prepare(`UPDATE users SET name = ? WHERE id = ?`)
        .bind(name, member.id)
        .run();
    }
    const productId = form.get('product_id') ? Number(form.get('product_id')) : null;
    let productName = String(form.get('product_name') || '').trim();
    let price = Number(form.get('price') || 0);
    if (productId) {
      const product = await getProductById(env, productId);
      if (product) {
        if (!productName) productName = product.name;
        if (!price) price = product.price;
      }
    }
    if (!productName) productName = 'Custom order';
    const orderNumber = nextOrderNumber();
    const status = String(form.get('status') || 'paid');
    const notes = String(form.get('notes') || '').trim();
    const result = await env.DB.prepare(
      `INSERT INTO orders (order_number, user_id, status, total, notes)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(orderNumber, member.id, status, price, notes)
      .run();
    const orderId = result.meta.last_row_id;
    await env.DB.prepare(
      `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
       VALUES (?, ?, ?, ?, 1)`
    )
      .bind(orderId, productId, productName, price)
      .run();
    return redirect(`/admin/orders/${orderId}?ok=` + encodeURIComponent('Order created.'));
  }

  const orderMatch = pathname.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && request.method === 'POST') {
    const id = Number(orderMatch[1]);
    const form = await readForm(request);
    await env.DB.prepare(
      `UPDATE orders SET status = ?, total = ?, notes = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(
        String(form.get('status') || 'pending'),
        Number(form.get('total') || 0),
        String(form.get('notes') || '').trim(),
        id
      )
      .run();
    return redirect(`/admin/orders/${id}?ok=` + encodeURIComponent('Order updated.'));
  }

  const dlAdd = pathname.match(/^\/api\/admin\/orders\/(\d+)\/downloads$/);
  if (dlAdd && request.method === 'POST') {
    const orderId = Number(dlAdd[1]);
    const form = await readForm(request);
    await env.DB.prepare(
      `INSERT INTO downloads (order_id, title, file_url) VALUES (?, ?, ?)`
    )
      .bind(
        orderId,
        String(form.get('title') || '').trim(),
        String(form.get('file_url') || '').trim()
      )
      .run();
    return redirect(`/admin/orders/${orderId}?ok=` + encodeURIComponent('Download added.'));
  }

  const gAdd = pathname.match(/^\/api\/admin\/orders\/(\d+)\/guidelines$/);
  if (gAdd && request.method === 'POST') {
    const orderId = Number(gAdd[1]);
    const form = await readForm(request);
    await env.DB.prepare(
      `INSERT INTO guidelines (order_id, title, body, file_url) VALUES (?, ?, ?, ?)`
    )
      .bind(
        orderId,
        String(form.get('title') || '').trim(),
        String(form.get('body') || '').trim(),
        String(form.get('file_url') || '').trim()
      )
      .run();
    return redirect(`/admin/orders/${orderId}?ok=` + encodeURIComponent('Guideline added.'));
  }

  const dlDel = pathname.match(/^\/api\/admin\/downloads\/(\d+)\/delete$/);
  if (dlDel && request.method === 'POST') {
    const id = Number(dlDel[1]);
    const row = await env.DB.prepare(`SELECT order_id FROM downloads WHERE id = ?`)
      .bind(id)
      .first();
    await env.DB.prepare(`DELETE FROM downloads WHERE id = ?`).bind(id).run();
    return redirect(
      `/admin/orders/${row?.order_id || ''}?ok=` + encodeURIComponent('Download removed.')
    );
  }

  const gDel = pathname.match(/^\/api\/admin\/guidelines\/(\d+)\/delete$/);
  if (gDel && request.method === 'POST') {
    const id = Number(gDel[1]);
    const row = await env.DB.prepare(`SELECT order_id FROM guidelines WHERE id = ?`)
      .bind(id)
      .first();
    await env.DB.prepare(`DELETE FROM guidelines WHERE id = ?`).bind(id).run();
    return redirect(
      `/admin/orders/${row?.order_id || ''}?ok=` + encodeURIComponent('Guideline removed.')
    );
  }

  const reqMatch = pathname.match(/^\/api\/admin\/requests\/(\d+)$/);
  if (reqMatch && request.method === 'POST') {
    const id = Number(reqMatch[1]);
    const form = await readForm(request);
    await env.DB.prepare(
      `UPDATE template_requests SET status = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(String(form.get('status') || 'open'), id)
      .run();
    return redirect('/admin/requests?ok=' + encodeURIComponent('Request updated.'));
  }

  void user;
  return json({ error: 'Not found' }, 404);
}
