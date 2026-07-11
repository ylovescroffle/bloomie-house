/**
 * Product image upload (R2) and public serving.
 */

import { json } from './auth.js';

const MAX_BYTES = 5 * 1024 * 1024;
const EXT_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export async function serveProductMedia(env, pathname) {
  if (!pathname.startsWith('/media/products/')) return null;
  if (!env.PRODUCT_IMAGES) {
    return new Response('Image storage is not configured.', { status: 503 });
  }
  const name = pathname.slice('/media/products/'.length);
  if (!name || name.includes('..') || name.includes('/')) {
    return new Response('Not found', { status: 404 });
  }
  const obj = await env.PRODUCT_IMAGES.get(`products/${name}`);
  if (!obj) return new Response('Not found', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export async function handleProductImageUpload(request, env) {
  if (!env.PRODUCT_IMAGES) {
    return json({ error: 'Image storage is not configured yet.' }, 503);
  }
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return json({ error: 'No image file provided.' }, 400);
  }
  const type = file.type || '';
  if (!type.startsWith('image/')) {
    return json({ error: 'Only image files are allowed.' }, 400);
  }
  if (file.size > MAX_BYTES) {
    return json({ error: 'Image must be 5 MB or smaller.' }, 400);
  }
  const ext = EXT_BY_TYPE[type] || 'bin';
  const name = `${crypto.randomUUID()}.${ext}`;
  await env.PRODUCT_IMAGES.put(`products/${name}`, await file.arrayBuffer(), {
    httpMetadata: { contentType: type },
  });
  return json({ url: `/media/products/${name}` });
}
