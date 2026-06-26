/**
 * Bloomie House - Cloudflare Worker
 * Multi-page website with routing
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Route handling
    switch (pathname) {
      case '/':
      case '':
        return htmlResponse(homepage);

      case '/sitemap.xml':
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://bloomiehouse.com.au/</loc><priority>1.0</priority></url>
  <url><loc>https://bloomiehouse.com.au/website-design</loc><priority>0.8</priority></url>
  <url><loc>https://bloomiehouse.com.au/digital-templates</loc><priority>0.8</priority></url>
  <url><loc>https://bloomiehouse.com.au/contact</loc><priority>0.6</priority></url>
  <url><loc>https://bloomiehouse.com.au/full-custom</loc><priority>0.7</priority></url>
</urlset>`, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' } });

      case '/api/chat':
        return handleChat(request, env);

      case '/website-design':
        return htmlResponse(websiteDesignPage);

      case '/digital-templates':
        return htmlResponse(digitalTemplatesPage);

      case '/contact':
        return htmlResponse(contactPage);

      case '/full-custom':
        return htmlResponse(fullCustomPage);

      case '/templates':
        return htmlResponse(templatesPage);

      case '/favicon.ico':
      case '/favicon.png':
        return Response.redirect('https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png', 301);

      case '/logo-long-house-green-background-transparent.png':
        try {
          const logoResponse = await fetch(new URL('/logo-long-house-green-background-transparent.png', request.url).href);
          return new Response(logoResponse.body, {
            headers: {
              'Content-Type': 'image/png',
              'Cache-Control': 'public, max-age=31536000',
            },
          });
        } catch (error) {
          return new Response('Logo not found', { status: 404 });
        }

      default: {
        if (pathname.startsWith('/templates/')) {
          const slug = pathname.slice('/templates/'.length);
          const tpl = templateData.find(t => t.slug === slug);
          if (tpl) return htmlResponse(templateDetailPage(tpl));
        }
        return new Response('Not Found', { status: 404 });
      }
    }
  },
};

function htmlResponse(html) {
  // Inject the chat widget right before the closing body tag on every page
  const withWidget = html.includes('</body>')
    ? html.replace('</body>', chatWidget + '</body>')
    : html + chatWidget;
  return new Response(withWidget, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  });
}

// ── CHATBOT (Groq) ──
// System prompt gives the assistant its persona + business knowledge.
const CHAT_SYSTEM_PROMPT = `You are "Bloomie", the friendly AI assistant for Bloomie House — a studio based in Hobart, Australia that sells premium Wix Studio & Shopify website templates and offers full custom web design for small businesses (cafes, beauty studios, tradies, boutiques and more).

Your job:
- Help visitors understand Bloomie House's products and services.
- Recommend whether a ready-made template or a full custom build suits their needs.
- Answer questions about pricing, timelines, and the process in a warm, concise, on-brand voice.
- Encourage visitors to browse templates (/templates), book a website-design discovery call (/website-design), or use the contact form (/contact).

Style: warm, modern, encouraging, never pushy. Keep replies short (2-4 sentences) unless asked for detail. Use plain language. If you don't know a specific detail (exact price, availability), say so honestly and point them to the contact form. Never invent prices or promises you're unsure about. You only discuss Bloomie House and web design topics.`;

async function handleChat(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }
  if (!env || !env.GROQ_API_KEY) {
    return jsonResponse({ error: 'The assistant is not configured yet.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  // Sanitise the conversation: only keep valid user/assistant turns, cap length & count.
  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const history = incoming
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (history.length === 0) {
    return jsonResponse({ error: 'No message provided.' }, 400);
  }

  const messages = [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...history];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.6,
        max_tokens: 600,
      }),
    });

    if (!groqRes.ok) {
      return jsonResponse({ error: 'The assistant is unavailable right now. Please try again shortly.' }, 502);
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    return jsonResponse({ reply: reply || "Sorry, I didn't quite catch that — could you rephrase?" });
  } catch {
    return jsonResponse({ error: 'Something went wrong reaching the assistant.' }, 500);
  }
}

// ── CHAT WIDGET (injected into every page) ──
const chatWidget = `
<style>
  #bloomie-chat-btn {
    position: fixed; bottom: 20px; right: 20px; z-index: 9998;
    width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
    background: #D67D9A; color: #fff; font-size: 26px; line-height: 60px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18); transition: transform .2s ease;
    display: flex; align-items: center; justify-content: center;
  }
  #bloomie-chat-btn:hover { transform: scale(1.06); }
  #bloomie-chat-panel {
    position: fixed; bottom: 92px; right: 20px; z-index: 9999;
    width: 360px; max-width: calc(100vw - 40px); height: 520px; max-height: calc(100vh - 120px);
    background: #FAFAF8; border-radius: 18px; box-shadow: 0 16px 48px rgba(0,0,0,0.22);
    display: none; flex-direction: column; overflow: hidden;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  #bloomie-chat-panel.open { display: flex; }
  .bloomie-chat-header {
    background: #C8D5B0; color: #111; padding: 16px 18px;
    font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 17px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .bloomie-chat-header small { display: block; font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 12px; opacity: .7; margin-top: 2px; }
  .bloomie-chat-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #111; line-height: 1; }
  .bloomie-chat-log { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .bloomie-msg { max-width: 82%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
  .bloomie-msg.user { align-self: flex-end; background: #D67D9A; color: #fff; border-bottom-right-radius: 4px; }
  .bloomie-msg.bot { align-self: flex-start; background: #F0EBE3; color: #111; border-bottom-left-radius: 4px; }
  .bloomie-msg.typing { font-style: italic; opacity: .7; }
  .bloomie-chat-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid rgba(0,0,0,.08); background: #FAFAF8; }
  .bloomie-chat-input input {
    flex: 1; border: 1px solid rgba(0,0,0,.15); border-radius: 22px; padding: 10px 14px;
    font-size: 14px; font-family: inherit; outline: none;
  }
  .bloomie-chat-input input:focus { border-color: #D67D9A; }
  .bloomie-chat-input button {
    border: none; background: #111; color: #fff; border-radius: 22px; padding: 0 16px;
    font-size: 14px; cursor: pointer; font-family: inherit;
  }
  .bloomie-chat-input button:disabled { opacity: .5; cursor: default; }
</style>
<button id="bloomie-chat-btn" aria-label="Open chat">\u{1F4AC}</button>
<div id="bloomie-chat-panel" role="dialog" aria-label="Chat with Bloomie">
  <div class="bloomie-chat-header">
    <div>Chat with Bloomie<small>AI assistant · usually replies instantly</small></div>
    <button class="bloomie-chat-close" aria-label="Close chat">&times;</button>
  </div>
  <div class="bloomie-chat-log" id="bloomie-chat-log"></div>
  <form class="bloomie-chat-input" id="bloomie-chat-form">
    <input id="bloomie-chat-text" type="text" placeholder="Ask about templates, pricing..." autocomplete="off" />
    <button type="submit" id="bloomie-chat-send">Send</button>
  </form>
</div>
<script>
(function () {
  var btn = document.getElementById('bloomie-chat-btn');
  var panel = document.getElementById('bloomie-chat-panel');
  var closeBtn = panel.querySelector('.bloomie-chat-close');
  var log = document.getElementById('bloomie-chat-log');
  var form = document.getElementById('bloomie-chat-form');
  var input = document.getElementById('bloomie-chat-text');
  var sendBtn = document.getElementById('bloomie-chat-send');
  var messages = [];
  var greeted = false;

  function addBubble(role, text) {
    var div = document.createElement('div');
    div.className = 'bloomie-msg ' + (role === 'user' ? 'user' : 'bot');
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  function openPanel() {
    panel.classList.add('open');
    if (!greeted) {
      addBubble('bot', "Hi! I'm Bloomie \u{1F33C} Ask me anything about our website templates, custom design, pricing or how to get started.");
      greeted = true;
    }
    input.focus();
  }
  function closePanel() { panel.classList.remove('open'); }

  btn.addEventListener('click', function () {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    addBubble('user', text);
    messages.push({ role: 'user', content: text });
    input.value = '';
    sendBtn.disabled = true;

    var typing = addBubble('bot', 'Bloomie is typing…');
    typing.classList.add('typing');

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        typing.remove();
        if (res.ok && res.d.reply) {
          addBubble('bot', res.d.reply);
          messages.push({ role: 'assistant', content: res.d.reply });
        } else {
          addBubble('bot', (res.d && res.d.error) || 'Sorry, something went wrong.');
        }
      })
      .catch(function () {
        typing.remove();
        addBubble('bot', "I couldn't connect just now. Please try again or use our contact form.");
      })
      .finally(function () {
        sendBtn.disabled = false;
        input.focus();
      });
  });
})();
</script>
`;

// ── HOMEPAGE ──
const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloomie House — Website Templates for Brands That Mean Business</title>
  <meta name="description" content="Premium Wix Studio & Shopify website templates for cafes, beauty studios, tradies, boutiques & more. Buy, personalise, launch — this week. Based in Hobart, Australia.">
  <meta name="keywords" content="website templates, Wix templates, Shopify themes, small business website, cafe website template, beauty salon website, Australian web design">
  <meta property="og:title" content="Bloomie House — Website Templates for Brands That Mean Business">
  <meta property="og:description" content="Premium Wix Studio & Shopify templates for Australian small businesses. Ready to launch in 24 hours.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="apple-touch-icon" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="canonical" href="https://bloomiehouse.com.au">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,300;1,700&family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #111111;
      --white: #FAFAF8;
      --cream: #F5F0E8;
      --sage: #C8D5B0;
      --pink: #D67D9A;
      --sand: #E8DDD0;
      --charcoal: #2C2C2C;
      --muted: #7A7570;
      --border: rgba(0,0,0,0.08);
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--white);
      color: var(--black);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }

    /* ── DUAL TICKER BLOCK ── */
    .ticker-block { display: flex; flex-direction: column; }
    .ticker-bar { overflow: hidden; white-space: nowrap; padding: 8px 0; }
    .ticker-dark { background: var(--black); }
    .ticker-sage { background: var(--sage); }

    .ticker-track { display: inline-flex; animation: tickFwd 32s linear infinite; }
    .ticker-reverse { animation: tickRev 32s linear infinite; }
    .ticker-item {
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 0 28px;
      display: inline-flex;
      align-items: center;
      gap: 28px;
    }
    .ticker-dark .ticker-item { color: var(--sand); }
    .ticker-sage .ticker-item { color: var(--black); font-weight: 500; }
    .ticker-item::after { content: '✦'; font-size: 7px; opacity: 0.5; }

    @keyframes tickFwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes tickRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }

    /* ── NAV ── */
    nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--white);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      height: 64px;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .nav-logo img {
      height: 40px;
      width: auto;
      display: block;
    }
    .nav-center {
      display: flex;
      gap: 32px;
      list-style: none;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .nav-center a {
      font-size: 13px;
      color: var(--charcoal);
      text-decoration: none;
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }
    .nav-center a:hover { color: var(--pink); }
    .nav-right { display: flex; align-items: center; gap: 20px; }
    .nav-cart {
      width: 36px;
      height: 36px;
      background: var(--black);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 14px;
      text-decoration: none;
      cursor: pointer;
    }
    .btn-nav {
      background: var(--pink);
      color: var(--white);
      padding: 9px 20px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 100px;
      transition: opacity 0.2s;
    }
    .btn-nav:hover { opacity: 0.85; }

    /* ── HERO ── */
    .hero {
      background: var(--cream);
      padding: 52px 40px 56px;
      text-align: left;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,213,176,0.4) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pink);
      margin-bottom: 20px;
    }
    .hero-eyebrow::before {
      content: '';
      display: block;
      width: 28px;
      height: 1px;
      background: var(--pink);
    }
    .hero-title {
      font-family: 'Fraunces', serif;
      font-size: clamp(52px, 10vw, 110px);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
    }
    .hero-title em { font-style: italic; font-weight: 300; color: var(--pink); display: block; }
    .hero-title strong { display: block; }
    .hero-sub {
      font-size: 16px;
      line-height: 1.7;
      color: var(--muted);
      max-width: 520px;
      margin: 0 0 36px;
    }
    .hero-sub strong { color: var(--black); font-weight: 500; }
    .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn-primary {
      background: var(--black);
      color: var(--white);
      padding: 16px 32px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      min-width: 240px;
      transition: opacity 0.2s;
    }
    .btn-primary:hover { opacity: 0.8; }
    .btn-ghost-link {
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
      transition: color 0.2s;
    }
    .btn-ghost-link:hover { color: var(--black); }

    /* Stat bar */
    .hero-stats {
      display: flex;
      align-items: center;
      gap: 0;
      border-top: 1px solid var(--border);
      padding-top: 28px;
    }
    .hero-stat {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding-right: 32px;
      margin-right: 32px;
      border-right: 1px solid var(--border);
    }
    .hero-stat:last-child { border-right: none; }
    .stat-num {
      font-family: 'Fraunces', serif;
      font-size: 30px;
      font-weight: 900;
      line-height: 1;
      color: var(--black);
    }
    .stat-label {
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── CATEGORY GRID ── */
    .categories { padding: 60px 40px; background: var(--white); }
    .section-label {
      text-align: center;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .section-title {
      font-family: 'Fraunces', serif;
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
      letter-spacing: -0.02em;
    }
    .section-title em { font-style: italic; font-weight: 300; color: var(--pink); }

    .cat-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .cat-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 0 0 16px;
      text-align: center;
      text-decoration: none;
      color: var(--black);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
    .cat-img {
      width: 100%;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      line-height: 1;
    }
    .cat-img.wix { background: #EEF0FF; }
    .cat-img.shopify { background: #E8F5E9; }
    .cat-img.canva { background: #FFF8E8; }
    .cat-img.etsy { background: #FDE8E8; }
    .cat-btn {
      display: inline-block;
      background: var(--black);
      color: var(--white);
      padding: 10px 28px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transition: background 0.2s;
    }
    .cat-card:hover .cat-btn { background: var(--pink); }

    /* ── TEMPLATE SHOP ── */
    .shop { padding: 20px 40px 80px; background: var(--white); }
    .shop-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
    .filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
    .filter-tab {
      padding: 8px 18px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.04em;
      border: 1.5px solid var(--border);
      cursor: pointer;
      background: transparent;
      transition: all 0.2s;
      color: var(--charcoal);
    }
    .filter-tab.active, .filter-tab:hover {
      background: var(--black);
      color: var(--white);
      border-color: var(--black);
    }
    .shop-sort { font-size: 13px; color: var(--muted); border: none; background: none; cursor: pointer; }

    /* ── PRODUCT GRID ── */
    .product-grid {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 16px;
      cursor: grab;
    }
    .product-grid:active { cursor: grabbing; }
    .product-grid::-webkit-scrollbar { height: 4px; }
    .product-grid::-webkit-scrollbar-track { background: var(--sand); border-radius: 2px; }
    .product-grid::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 2px; }

    .product-card {
      background: var(--white);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
      transition: transform 0.25s, box-shadow 0.25s;
      flex: 0 0 260px;
      scroll-snap-align: start;
    }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }

    .product-thumb {
      width: 100%;
      aspect-ratio: 1/1;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mock-cafe { background: linear-gradient(135deg, #E8D5B0 0%, #C8B890 100%); }
    .mock-beauty { background: linear-gradient(135deg, #F0D5D5 0%, #D4B0B0 100%); }
    .mock-tradie { background: linear-gradient(135deg, #C8D5B0 0%, #A0B888 100%); }
    .mock-yoga { background: linear-gradient(135deg, #D5C8E8 0%, #B8A0D4 100%); }
    .mock-boutique { background: linear-gradient(135deg, #F5E0C8 0%, #E0C0A0 100%); }

    .product-thumb-label {
      font-family: 'Fraunces', serif;
      font-size: clamp(14px, 3vw, 20px);
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      letter-spacing: 0.04em;
      text-align: center;
      padding: 16px;
    }
    .platform-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: var(--white);
      border-radius: 100px;
      padding: 4px 10px;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--charcoal);
      border: 1px solid var(--border);
    }
    .sale-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--pink);
      color: var(--white);
      border-radius: 100px;
      padding: 4px 10px;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .product-info { padding: 14px 16px 18px; }
    .product-niche { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
    .product-name { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.01em; line-height: 1.2; }
    .product-price { display: flex; align-items: baseline; gap: 7px; margin-bottom: 12px; }
    .price-current { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--black); }
    .price-original { font-size: 13px; color: var(--muted); text-decoration: line-through; }
    .btn-find-more {
      display: block;
      width: 100%;
      text-align: center;
      background: var(--black);
      color: var(--white);
      padding: 11px 16px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 100px;
      transition: background 0.2s;
    }
    .btn-find-more:hover { background: var(--pink); }

    .view-all-wrap { text-align: center; margin-top: 48px; }

    /* ── FEATURES ── */
    .features-section { background: var(--cream); padding: 80px 40px; }
    .features-header { text-align: center; margin-bottom: 56px; }
    .features-header .section-label { color: var(--pink); }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
      max-width: 640px;
      margin: 0 auto;
    }
    .feature-card {
      padding: 40px 28px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--border);
      border-right: 1px solid var(--border);
      background: transparent;
      transition: background 0.25s;
    }
    .feature-card:nth-child(even) { border-right: none; }
    .feature-card:nth-last-child(-n+2) { border-bottom: none; }
    .feature-card:hover { background: rgba(255,255,255,0.6); }
    .feature-icon { font-size: 40px; line-height: 1; display: block; margin-bottom: 4px; }
    .feature-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--black); line-height: 1.3; }
    .feature-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

    /* ── SERVICES ── */
    .services { background: var(--black); padding: 80px 40px; }
    .services .section-label { color: var(--sage); }
    .services .section-title { color: var(--white); }
    .services .section-title em { color: var(--sage); }

    .service-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

    .service-card {
      background: #1C1C1C;
      border-radius: 20px;
      padding: 36px 32px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
      transition: border-color 0.3s;
    }
    .service-card:hover { border-color: rgba(200,213,176,0.3); }
    .service-card.featured {
      background: var(--pink);
      border-color: transparent;
    }
    .service-card.featured .service-num,
    .service-card.featured .service-name,
    .service-card.featured .service-desc,
    .service-card.featured .service-price,
    .service-card.featured .service-includes li { color: var(--white) !important; }
    .service-popular {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--white);
      color: var(--pink);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 100px;
    }

    .service-num { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sage); margin-bottom: 20px; }
    .service-name { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: var(--white); margin-bottom: 10px; line-height: 1.1; }
    .service-tagline { font-size: 13px; color: rgba(200,213,176,0.8); font-style: italic; margin-bottom: 16px; }
    .service-card.featured .service-tagline { color: rgba(255,255,255,0.8); }
    .service-desc { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; margin-bottom: 24px; }
    .service-includes { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
    .service-includes li { font-size: 12px; color: rgba(255,255,255,0.65); display: flex; align-items: flex-start; gap: 8px; }
    .service-includes li::before { content: '✓'; color: var(--sage); flex-shrink: 0; font-size: 13px; }
    .service-card.featured .service-includes li::before { color: var(--white); }

    .service-price { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 900; color: var(--white); margin-bottom: 16px; line-height: 1; }
    .service-price span { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300; opacity: 0.6; }
    .service-price .orig { font-size: 16px; text-decoration: line-through; opacity: 0.4; margin-left: 8px; }
    .btn-service {
      width: 100%;
      padding: 13px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
      display: block;
      transition: opacity 0.2s;
    }
    .btn-service:hover { opacity: 0.85; }
    .btn-service.dark { background: var(--white); color: var(--black); }
    .btn-service.outline { background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.3); }
    .btn-service.light { background: var(--black); color: var(--white); }

    /* ── HOW IT WORKS ── */
    .how { background: var(--cream); padding: 80px 40px; }
    .steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2px;
      margin-top: 48px;
      border-radius: 16px;
      overflow: hidden;
    }
    .step { background: var(--white); padding: 36px 28px; position: relative; }
    .step:not(:last-child)::after {
      content: '→';
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: var(--muted);
      z-index: 1;
    }
    .step-num { font-family: 'Fraunces', serif; font-size: 48px; font-weight: 900; color: var(--sand); line-height: 1; margin-bottom: 16px; }
    .step-title { font-size: 14px; font-weight: 500; margin-bottom: 8px; }
    .step-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

    /* ── TESTIMONIALS ── */
    .testimonials { background: var(--charcoal); padding: 80px 40px; text-align: center; }
    .testimonials .section-title { color: var(--white); margin-bottom: 48px; }

    .testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left; }
    .testimonial-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 28px;
    }
    .t-stars { color: #F5A623; font-size: 13px; margin-bottom: 14px; }
    .t-quote { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.65; font-style: italic; margin-bottom: 18px; font-family: 'Instrument Serif', serif; }
    .t-author { font-size: 12px; color: var(--sage); font-weight: 500; letter-spacing: 0.04em; }
    .t-biz { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }

    /* ── FAQ ── */
    .faq { background: var(--white); padding: 80px 40px; max-width: 760px; margin: 0 auto; }
    .faq .section-title { text-align: left; }
    .faq-list { margin-top: 40px; display: flex; flex-direction: column; gap: 0; }
    .faq-item { border-bottom: 1px solid var(--border); padding: 20px 0; }
    .faq-q { font-size: 15px; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }
    .faq-q::after { content: '+'; font-size: 20px; color: var(--muted); font-weight: 300; }
    .faq-item.open .faq-q::after { content: '−'; }
    .faq-a { font-size: 13px; color: var(--muted); line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
    .faq-item.open .faq-a { max-height: 200px; padding-top: 12px; }

    /* ── CTA ── */
    .cta { background: var(--sage); padding: 80px 40px; text-align: center; }
    .cta-title { font-family: 'Fraunces', serif; font-size: clamp(36px, 5vw, 64px); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 16px; color: var(--black); }
    .cta-title em { font-style: italic; font-weight: 300; }
    .cta-sub { font-size: 15px; color: var(--charcoal); margin-bottom: 32px; max-width: 440px; margin-left: auto; margin-right: auto; line-height: 1.6; }
    .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-cta-dark { background: var(--black); color: var(--white); padding: 14px 28px; border-radius: 100px; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; }
    .btn-cta-light { background: var(--white); color: var(--black); padding: 14px 28px; border-radius: 100px; font-size: 13px; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border: 1.5px solid var(--black); }

    /* ── FOOTER ── */
    footer { background: var(--black); padding: 60px 40px 32px; }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 32px;
    }
    .footer-brand-name { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: var(--white); margin-bottom: 12px; }
    .footer-brand-name span { color: var(--pink); }
    .footer-about { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 20px; max-width: 280px; }
    .footer-email { font-size: 13px; color: var(--sage); text-decoration: none; }
    .footer-col h4 { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 16px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col a { font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
    .footer-col a:hover { color: var(--white); }
    .footer-bottom { display: flex; justify-content: space-between; align-items: center; }
    .footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); }
    .footer-loc { font-size: 12px; color: rgba(255,255,255,0.2); }

    /* REVEAL */
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    @media (max-width: 768px) {
      nav { padding: 0 20px; }
      .nav-center { display: none; }
      .hero, .categories, .shop, .features-section, .services, .how, .testimonials, .faq, .cta { padding-left: 20px; padding-right: 20px; }
      .hero-title { font-size: 44px; }
      .cat-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
      .product-grid { gap: 12px; }
      .product-card { flex: 0 0 220px; }
      .service-cards { grid-template-columns: 1fr; }
      .features-grid { grid-template-columns: 1fr; }
      .feature-card { border-right: none !important; }
      .steps { grid-template-columns: 1fr 1fr; }
      .step:not(:last-child)::after { display: none; }
      .testimonial-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
      .shop-header { flex-direction: column; align-items: flex-start; gap: 12px; }
    }
  </style>
</head>
<body>

<!-- TICKER -->
<div class="ticker-bar ticker-dark">
  <div class="ticker-track">
    <span class="ticker-item">🌿 Australian Made</span>
    <span class="ticker-item">Wix Studio Templates</span>
    <span class="ticker-item">Shopify Themes</span>
    <span class="ticker-item">Canva Kits</span>
    <span class="ticker-item">Branding Kits</span>
    <span class="ticker-item">Based in Australia</span>
    <span class="ticker-item">Built for the World</span>
    <span class="ticker-item">Ready in 24 Hours</span>
    <span class="ticker-item">No Code Needed</span>
    <span class="ticker-item">Free Setup Guide</span>
    <span class="ticker-item">🌿 Australian Made</span>
    <span class="ticker-item">Wix Studio Templates</span>
    <span class="ticker-item">Shopify Themes</span>
    <span class="ticker-item">Canva Kits</span>
    <span class="ticker-item">Branding Kits</span>
    <span class="ticker-item">Based in Australia</span>
    <span class="ticker-item">Built for the World</span>
    <span class="ticker-item">Ready in 24 Hours</span>
    <span class="ticker-item">No Code Needed</span>
    <span class="ticker-item">Free Setup Guide</span>
  </div>
</div>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <img src="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png" alt="Bloomie House">
  </a>
  <ul class="nav-center">
    <li><a href="#shop">Templates</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
  <div class="nav-right">
    <a href="mailto:hello@bloomiehouse.com.au" class="btn-nav">Let's Chat</a>
    <div class="nav-cart">🛒</div>
  </div>
</nav>

<!-- HERO -->
<div class="hero">
  <div class="hero-eyebrow">Template Shop — Est. 2025</div>
  <h1 class="hero-title">
    Your partner<br>
    <em>for online</em>
    <strong>success.</strong>
  </h1>
  <p class="hero-sub">
    Digital Bloom — your brand's digital support.<br>
    Premium Wix Studio &amp; Shopify templates for cafes, beauty studios, tradies, boutiques &amp; beyond. Buy, personalise, launch — this week.
  </p>
  <div class="hero-btns">
    <a href="#shop" class="btn-primary">Browse Templates <span>→</span></a>
    <a href="#services" class="btn-ghost-link">Need us to set it up? →</a>
  </div>
  <div class="hero-stats">
    <div class="hero-stat">
      <span class="stat-num">14+</span>
      <span class="stat-label">Templates</span>
    </div>
    <div class="hero-stat">
      <span class="stat-num">2</span>
      <span class="stat-label">Platforms</span>
    </div>
    <div class="hero-stat">
      <span class="stat-num">24h</span>
      <span class="stat-label">To Launch</span>
    </div>
    <div class="hero-stat">
      <span class="stat-num">🇦🇺</span>
      <span class="stat-label">Based in Hobart</span>
    </div>
  </div>
</div>

<!-- CATEGORIES -->
<div class="categories" id="shop">
  <p class="section-label">Browse by category</p>
  <h2 class="section-title">Find your <em>perfect</em> template</h2>
  <div class="cat-grid">
    <a href="https://bloomlashbar.etsy.com" target="_blank" class="cat-card reveal">
      <div class="cat-img wix">🖥️</div>
      <span class="cat-btn">Wix Studio</span>
    </a>
    <a href="https://bloomlashbar.etsy.com" target="_blank" class="cat-card reveal">
      <div class="cat-img shopify">🛍️</div>
      <span class="cat-btn">Shopify</span>
    </a>
    <a href="https://bloomlashbar.etsy.com" target="_blank" class="cat-card reveal">
      <div class="cat-img canva">🎨</div>
      <span class="cat-btn">Canva Kits</span>
    </a>
    <a href="https://bloomlashbar.etsy.com" target="_blank" class="cat-card reveal">
      <div class="cat-img etsy">🏪</div>
      <span class="cat-btn">Branding Kits</span>
    </a>
  </div>
</div>

<!-- PRODUCT GRID -->
<div class="shop" style="padding-top:0;">
  <div class="shop-header">
    <div class="filter-tabs">
      <button class="filter-tab active">All</button>
      <button class="filter-tab">Wix Studio</button>
      <button class="filter-tab">Shopify</button>
      <button class="filter-tab">Cafe &amp; Food</button>
      <button class="filter-tab">Beauty</button>
      <button class="filter-tab">Trades</button>
    </div>
    <select class="shop-sort">
      <option>Sort: Newest</option>
      <option>Price: Low–High</option>
      <option>Best Selling</option>
    </select>
  </div>
  <div class="product-grid">
    <!-- Card 1 -->
    <div class="product-card reveal">
      <div class="product-thumb mock-cafe">
        <span class="platform-badge">Wix Studio</span>
        <span class="sale-badge">20% OFF</span>
        <div class="product-thumb-label">The Brew</div>
      </div>
      <div class="product-info">
        <div class="product-niche">Cafe &amp; Coffee Shop</div>
        <div class="product-name">The Brew</div>
        <div class="product-price">
          <span class="price-current">$79</span>
          <span class="price-original">$97</span>
        </div>
        <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-find-more">Find Out More</a>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="product-card reveal">
      <div class="product-thumb mock-beauty">
        <span class="platform-badge">Wix Studio</span>
        <span class="sale-badge">Bestseller</span>
        <div class="product-thumb-label">The Studio</div>
      </div>
      <div class="product-info">
        <div class="product-niche">Beauty &amp; Lash Studio</div>
        <div class="product-name">The Studio</div>
        <div class="product-price">
          <span class="price-current">$79</span>
          <span class="price-original">$97</span>
        </div>
        <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-find-more">Find Out More</a>
      </div>
    </div>
    <!-- Card 3 -->
    <div class="product-card reveal">
      <div class="product-thumb mock-tradie">
        <span class="platform-badge">Shopify</span>
        <span class="sale-badge">New</span>
        <div class="product-thumb-label">The Tradie</div>
      </div>
      <div class="product-info">
        <div class="product-niche">Trades &amp; Services</div>
        <div class="product-name">The Tradie</div>
        <div class="product-price">
          <span class="price-current">$97</span>
        </div>
        <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-find-more">Find Out More</a>
      </div>
    </div>
    <!-- Card 4 -->
    <div class="product-card reveal">
      <div class="product-thumb mock-yoga">
        <span class="platform-badge">Wix Studio</span>
        <span class="sale-badge">20% OFF</span>
        <div class="product-thumb-label">The Flow</div>
      </div>
      <div class="product-info">
        <div class="product-niche">Wellness &amp; Yoga</div>
        <div class="product-name">The Flow</div>
        <div class="product-price">
          <span class="price-current">$79</span>
          <span class="price-original">$97</span>
        </div>
        <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-find-more">Find Out More</a>
      </div>
    </div>
    <!-- Card 5 -->
    <div class="product-card reveal">
      <div class="product-thumb mock-boutique">
        <span class="platform-badge">Shopify</span>
        <span class="sale-badge">20% OFF</span>
        <div class="product-thumb-label">The Boutique</div>
      </div>
      <div class="product-info">
        <div class="product-niche">Boutique &amp; Retail</div>
        <div class="product-name">The Boutique</div>
        <div class="product-price">
          <span class="price-current">$97</span>
          <span class="price-original">$127</span>
        </div>
        <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-find-more">Find Out More</a>
      </div>
    </div>
  </div>
  <div class="view-all-wrap">
    <a href="https://bloomlashbar.etsy.com" target="_blank" rel="noopener" class="btn-primary">View All Templates →</a>
  </div>
</div>

<!-- SALE TICKER -->
<div class="ticker-bar ticker-sage">
  <div class="ticker-track ticker-reverse">
    <span class="ticker-item">✦ 20% OFF All Templates</span>
    <span class="ticker-item">Use Code: BLOOM20</span>
    <span class="ticker-item">Launch Sale On Now</span>
    <span class="ticker-item">Templates from $79 AUD</span>
    <span class="ticker-item">One Day Website — $397</span>
    <span class="ticker-item">Ships Worldwide</span>
    <span class="ticker-item">✦ 20% OFF All Templates</span>
    <span class="ticker-item">Use Code: BLOOM20</span>
    <span class="ticker-item">Launch Sale On Now</span>
    <span class="ticker-item">Templates from $79 AUD</span>
    <span class="ticker-item">One Day Website — $397</span>
    <span class="ticker-item">Ships Worldwide</span>
  </div>
</div>

<!-- FEATURES -->
<div class="features-section">
  <div class="features-header">
    <p class="section-label">Why Bloomie House</p>
    <h2 class="section-title">Designed for brands<br><em>that mean business</em></h2>
  </div>
  <div class="features-grid">
    <div class="feature-card reveal">
      <span class="feature-icon">⚡</span>
      <h3 class="feature-title">Conversion-Optimised Layouts</h3>
      <p class="feature-desc">Strategic page structures that turn browsers into buyers.</p>
    </div>
    <div class="feature-card reveal">
      <span class="feature-icon">🔍</span>
      <h3 class="feature-title">SEO-Ready Structure</h3>
      <p class="feature-desc">Built-in best practices to help your store rank on Google Australia.</p>
    </div>
    <div class="feature-card reveal">
      <span class="feature-icon">🎨</span>
      <h3 class="feature-title">Customisable Branding</h3>
      <p class="feature-desc">Swap colours, fonts, and imagery to match your brand in minutes.</p>
    </div>
    <div class="feature-card reveal">
      <span class="feature-icon">💳</span>
      <h3 class="feature-title">AfterPay &amp; Zip Ready</h3>
      <p class="feature-desc">Pre-configured for Australia's most popular BNPL platforms.</p>
    </div>
    <div class="feature-card reveal">
      <span class="feature-icon">📖</span>
      <h3 class="feature-title">Full Documentation</h3>
      <p class="feature-desc">Step-by-step setup guides and video tutorials with every template.</p>
    </div>
    <div class="feature-card reveal">
      <span class="feature-icon">🔄</span>
      <h3 class="feature-title">Ongoing Updates</h3>
      <p class="feature-desc">Free updates as Shopify &amp; Wix evolve — always future-proof.</p>
    </div>
  </div>
</div>

<!-- SERVICES -->
<div class="services" id="services">
  <p class="section-label">Need a hand?</p>
  <h2 class="section-title" style="margin-bottom:48px;">We've got <em>you covered</em></h2>
  <div class="service-cards">
    <div class="service-card reveal">
      <div class="service-num">01 — Template Only</div>
      <div class="service-name">DIY Template</div>
      <div class="service-tagline">You've got this.</div>
      <p class="service-desc">Download your template, follow the setup guide, and customise it yourself. Full walkthrough included.</p>
      <ul class="service-includes">
        <li>Wix or Shopify template file</li>
        <li>Step-by-step setup PDF guide</li>
        <li>Font &amp; colour guide</li>
        <li>Email support (3 days)</li>
      </ul>
      <div class="service-price">From $79 <span>AUD</span></div>
      <a href="#shop" class="btn-service outline">Browse Templates</a>
    </div>
    <div class="service-card featured reveal">
      <div class="service-popular">Most Popular</div>
      <div class="service-num">02 — Template + Setup</div>
      <div class="service-name">One Day Website</div>
      <div class="service-tagline">Done in 24 hours.</div>
      <p class="service-desc">We take your template and do everything — install, brand it with your colours, add your content. You wake up with a live website.</p>
      <ul class="service-includes">
        <li>Template of your choice included</li>
        <li>Full installation &amp; customisation</li>
        <li>Your branding, fonts &amp; copy added</li>
        <li>Mobile optimised &amp; ready to launch</li>
        <li>14 days post-launch support</li>
      </ul>
      <div class="service-price">$397 <span class="orig">$497</span></div>
      <a href="https://form.jotform.com/haiyen0304/website-design-discovery" target="_blank" rel="noopener noreferrer" class="btn-service dark">Book Now →</a>
    </div>
    <div class="service-card reveal">
      <div class="service-num">03 — Custom Build</div>
      <div class="service-name">Full Custom</div>
      <div class="service-tagline">Built from scratch for you.</div>
      <p class="service-desc">Need something unique? We design and build a fully custom website from scratch — your brand, your vision, no template limits.</p>
      <ul class="service-includes">
        <li>Custom design &amp; development</li>
        <li>Up to 6 pages</li>
        <li>Brand strategy session included</li>
        <li>SEO foundation setup</li>
        <li>30 days post-launch support</li>
      </ul>
      <div class="service-price">From $897 <span>AUD</span></div>
      <a href="/full-custom" class="btn-service outline">Let's Chat</a>
    </div>
  </div>
</div>

<!-- HOW IT WORKS -->
<div class="how" id="how">
  <p class="section-label">Simple process</p>
  <h2 class="section-title">From purchase to <em>live</em> — fast</h2>
  <div class="steps">
    <div class="step reveal">
      <div class="step-num">01</div>
      <div class="step-title">Pick Your Template</div>
      <p class="step-desc">Browse the shop, find your industry, choose your vibe. One-time purchase, no subscription.</p>
    </div>
    <div class="step reveal">
      <div class="step-num">02</div>
      <div class="step-title">Instant Download</div>
      <p class="step-desc">Get instant access. DIY with our guide or add Setup Service and we'll handle it for you.</p>
    </div>
    <div class="step reveal">
      <div class="step-num">03</div>
      <div class="step-title">Make It Yours</div>
      <p class="step-desc">Swap in your logo, brand colours, photos and copy. Everything is clearly labelled and easy to edit.</p>
    </div>
    <div class="step reveal">
      <div class="step-num">04</div>
      <div class="step-title">Go Live 🎉</div>
      <p class="step-desc">Hit publish. Your business is online. We're here if you need us — just reply to your purchase email.</p>
    </div>
  </div>
</div>

<!-- TESTIMONIALS -->
<div class="testimonials">
  <h2 class="section-title" style="color:var(--white);">What our customers <em>say</em></h2>
  <div class="testimonial-grid">
    <div class="testimonial-card reveal">
      <div class="t-stars">★★★★★</div>
      <p class="t-quote">"I had my website live within a day. The template was so easy to use and the setup guide explained everything perfectly. Honestly wish I'd found this sooner!"</p>
      <div class="t-author">Sarah M.</div>
      <div class="t-biz">The Lash Lounge, Melbourne</div>
    </div>
    <div class="testimonial-card reveal">
      <div class="t-stars">★★★★★</div>
      <p class="t-quote">"I added the One Day Website service and woke up the next morning to a fully built site. Yen was amazing — responsive, professional and the result was beyond what I expected."</p>
      <div class="t-author">Mark T.</div>
      <div class="t-biz">MT Landscapes, Hobart</div>
    </div>
    <div class="testimonial-card reveal">
      <div class="t-stars">★★★★★</div>
      <p class="t-quote">"The Shopify template for my cafe was exactly what I was looking for. Clean design, easy to update myself, and my customers love it. Worth every cent."</p>
      <div class="t-author">Jessica L.</div>
      <div class="t-biz">Sunrise Brew Co., Brisbane</div>
    </div>
  </div>
</div>

<!-- FAQ -->
<div class="faq" id="faq">
  <h2 class="section-title">Got questions?</h2>
  <div class="faq-list">
    <div class="faq-item">
      <div class="faq-q">Do I need to know how to code?</div>
      <div class="faq-a">Not at all. All templates are built for Wix Studio or Shopify — both drag-and-drop platforms. Our setup guide walks you through every step. If you still want help, add the One Day Website service.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">What's included in a template purchase?</div>
      <div class="faq-a">You get instant access to the full template, a step-by-step PDF setup guide, font and colour recommendations, and 3 days of email support to help you get started.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">What's the One Day Website service?</div>
      <div class="faq-a">It's our done-for-you setup service. You pick the template, fill in a brief, send us your logo and photos — and we install, brand, and launch your site within 24 hours. 14 days of support included.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I customise the template to match my brand?</div>
      <div class="faq-a">Yes — fully. Every template is 100% customisable. Swap colours, fonts, images, text, layout. It's your site, you own it completely.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Do you offer refunds?</div>
      <div class="faq-a">Because these are digital products, we don't offer refunds once a template is downloaded. However, if you have any issues, reach out and we'll do our best to help.</div>
    </div>
  </div>
</div>

<!-- CTA -->
<div class="cta">
  <h2 class="cta-title">Every brand deserves<br>to <em>show up.</em></h2>
  <p class="cta-sub">Pick a template and launch this week. Based in Australia — working with founders worldwide. No brand is too new. No vision is too bold.</p>
  <div class="cta-btns">
    <a href="#shop" class="btn-cta-dark">Shop Templates</a>
    <a href="mailto:hello@bloomiehouse.com.au" class="btn-cta-light">Book a Free Chat</a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div>
      <img src="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png" alt="Bloomie House" style="height:56px;width:auto;margin-bottom:12px;display:block;">
      <p class="footer-about">Bloomie House is a boutique web design studio based in Hobart, Australia. No brand is too new. No business is too small. We build for founders ready to show up — and ship worldwide.</p>
      <a href="mailto:hello@bloomiehouse.com.au" class="footer-email">hello@bloomiehouse.com.au</a>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="#">Wix Templates</a></li>
        <li><a href="#">Shopify Templates</a></li>
        <li><a href="#">Canva Kits</a></li>
        <li><a href="#">Branding Kits</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="#">One Day Website</a></li>
        <li><a href="#">Custom Build</a></li>
        <li><a href="#">Template Setup</a></li>
        <li><a href="#">Free Chat</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Studio</h4>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Bloomie Lash</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2025 Bloomie House · Hobart, Australia 🇦🇺 · Serving founders worldwide</span>
    <span class="footer-loc">hello@bloomiehouse.com.au</span>
  </div>
</footer>

<script>
  // Drag to scroll product grid
  const grid = document.querySelector('.product-grid');
  let isDown = false, startX, scrollLeft;
  grid.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - grid.offsetLeft; scrollLeft = grid.scrollLeft; });
  grid.addEventListener('mouseleave', () => { isDown = false; });
  grid.addEventListener('mouseup', () => { isDown = false; });
  grid.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    grid.scrollLeft = scrollLeft - (e.pageX - grid.offsetLeft - startX) * 1.5;
  });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
</script>
</body>
</html>`;

// ── WEBSITE DESIGN PAGE ──
const sharedStyles = `
:root {
    --primary: #1a1a1a;
    --accent: #d4a89f;
    --sage: #8b9d7f;
    --light: #faf9f7;
    --mid: #e8e6e3;
    --text: #2c2c2c;
    --text-light: #666;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Work Sans', sans-serif;
    background: var(--light);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

.header {
    position: fixed;
    top: 0; left: 0; right: 0;
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background: linear-gradient(to bottom, var(--light) 0%, var(--light) 70%, transparent 100%);
}

.logo { height: 50px; display: flex; align-items: center; }
.logo img { height: 100%; width: auto; }

nav { display: flex; gap: 2rem; }
nav a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    position: relative;
    transition: color 0.3s ease;
}
nav a:hover { color: var(--sage); }

.section { padding: 8rem 4rem; position: relative; min-height: 100vh; }

.section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem;
    font-weight: 300;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--primary);
    letter-spacing: -0.5px;
    padding-top: 4rem;
}

.section-subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto 4rem;
    line-height: 1.8;
}

.cta-button {
    display: inline-block;
    padding: 1rem 3rem;
    background: var(--primary);
    color: var(--light);
    text-decoration: none;
    font-size: 0.95rem;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 1px solid var(--primary);
}
.cta-button:hover { background: transparent; color: var(--primary); }

footer {
    text-align: center;
    padding: 3rem;
    background: var(--primary);
    color: var(--mid);
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .header { padding: 1.5rem 2rem; flex-direction: column; gap: 1rem; }
    nav { gap: 1rem; flex-wrap: wrap; justify-content: center; }
    .section { padding: 5rem 2rem; }
    .section-title { font-size: 2.5rem; }
}
`;

const sharedHeader = `
<header class="header">
  <div class="logo">
    <a href="/">
      <img src="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-long-house-green-background-transparent.png" alt="Bloomie House">
    </a>
  </div>
  <nav>
    <a href="/">Home</a>
    <a href="/website-design">Website Design</a>
    <a href="/digital-templates">Digital Templates</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
`;

const sharedFooter = `<footer><p>&copy; 2025 Bloomie House. Web Design &amp; Digital Products.</p></footer>`;

const websiteDesignPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Design — Bloomie House</title>
  <meta name="description" content="Custom website design services for Australian small businesses. One Day Website setup from $397. Wix Studio & Shopify specialists based in Hobart, Tasmania.">
  <meta name="keywords" content="website design Australia, custom website Hobart, Wix Studio designer, Shopify designer, small business website design, one day website, web design Tasmania">
  <meta property="og:title" content="Website Design — Bloomie House">
  <meta property="og:description" content="Custom website design for Australian small businesses. Done-for-you Wix Studio & Shopify setup. Live in 24 hours from $397.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/website-design">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Website Design — Bloomie House">
  <meta name="twitter:description" content="Custom website design for Australian small businesses. Done-for-you Wix Studio & Shopify setup. Live in 24 hours from $397.">
  <link rel="canonical" href="https://bloomiehouse.com.au/website-design">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="apple-touch-icon" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .jotform-wrapper { background: white; border: 1px solid var(--mid); padding: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto; }
    iframe { width: 100%; border: none; min-height: 800px; }
    .features-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 900px; margin: 3rem auto; padding: 0 2rem; }
    .feature-item { text-align: center; padding: 1.5rem; }
    .feature-icon { font-size: 2rem; color: var(--sage); margin-bottom: 1rem; }
    .feature-item h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: var(--primary); margin-bottom: 0.5rem; }
    .feature-item p { color: var(--text-light); font-size: 0.95rem; }
  </style>
</head>
<body>
  ${sharedHeader}
  <section class="section">
    <h1 class="section-title">Website Design Discovery</h1>
    <p class="section-subtitle">Let's bring your vision to life. Fill out our discovery form to get started on your custom website design project.</p>
    <div class="features-list">
      <div class="feature-item"><div class="feature-icon">✦</div><h4>Custom Design</h4><p>Tailored to your brand identity</p></div>
      <div class="feature-item"><div class="feature-icon">◆</div><h4>Responsive</h4><p>Beautiful on all devices</p></div>
      <div class="feature-item"><div class="feature-icon">✧</div><h4>Strategic</h4><p>Built for your business goals</p></div>
    </div>
    <div class="jotform-wrapper">
      <iframe
        id="JotFormIFrame-243655997068176"
        title="Website Design Discovery Form"
        onload="window.parent.scrollTo(0,0)"
        allowtransparency="true"
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/haiyen0304/website-design-discovery"
        frameborder="0"
        style="min-width:100%;max-width:100%;height:539px;border:none;"
        scrolling="no"
      ></iframe>
      <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'><\/script>
      <script>window.jotformEmbedHandler("iframe[id='JotFormIFrame-243655997068176']", "https://form.jotform.com/")<\/script>
    </div>
  </section>
  ${sharedFooter}
</body>
</html>`;

// digitalTemplatesPage is defined after templateData below

const contactPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us — Bloomie House</title>
  <meta name="description" content="Get in touch with Bloomie House. Chat with us about custom website design, template setup, or any project. Based in Hobart, Australia — serving founders worldwide.">
  <meta name="keywords" content="contact Bloomie House, web design enquiry, website design Hobart, book website designer, Australian web design studio">
  <meta property="og:title" content="Contact Us — Bloomie House">
  <meta property="og:description" content="Chat with the Bloomie House team about your website project. Custom design, template setup & more. Based in Hobart, Australia.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/contact">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Contact Us — Bloomie House">
  <meta name="twitter:description" content="Chat with the Bloomie House team about your website project. Based in Hobart, Australia.">
  <link rel="canonical" href="https://bloomiehouse.com.au/contact">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="apple-touch-icon" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .contact-hero { text-align: center; padding: 10rem 2rem 3rem; }
    .contact-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 300; color: var(--primary); margin-bottom: 1.5rem; }
    .contact-hero p { font-size: 1.2rem; color: var(--text-light); max-width: 700px; margin: 0 auto; line-height: 1.8; }
    .contact-form-container { max-width: 700px; margin: 4rem auto; padding: 3rem; background: white; border: 1px solid var(--mid); box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
    .form-group { margin-bottom: 2rem; }
    .form-group label { display: block; font-size: 0.95rem; color: var(--text); margin-bottom: 0.5rem; font-weight: 500; }
    .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 1rem; border: 1px solid var(--mid); background: var(--light); font-family: 'Work Sans', sans-serif; font-size: 1rem; color: var(--text); transition: border-color 0.3s ease; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--sage); }
    .form-group textarea { min-height: 150px; resize: vertical; }
    .submit-button { width: 100%; padding: 1.2rem; background: var(--primary); color: var(--light); border: none; font-size: 1rem; letter-spacing: 1px; cursor: pointer; transition: all 0.3s ease; font-family: 'Work Sans', sans-serif; font-weight: 500; }
    .submit-button:hover { background: var(--sage); }
    .contact-info { max-width: 700px; margin: 3rem auto; padding: 2rem; text-align: center; }
    .contact-info h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--primary); margin-bottom: 1rem; }
    .contact-info p { color: var(--text-light); line-height: 1.8; margin-bottom: 1rem; }
    .contact-info a { color: var(--sage); text-decoration: none; font-weight: 500; }
    .form-message { padding: 1rem; margin-bottom: 1.5rem; border-radius: 4px; display: none; }
    .form-message.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; display: block; }
    .form-message.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; display: block; }
  </style>
</head>
<body>
  ${sharedHeader}
  <section class="contact-hero">
    <h1>Get In Touch</h1>
    <p>Looking for custom services or have a unique project in mind? We'd love to hear from you.</p>
  </section>
  <section class="section" style="min-height:auto;">
    <div class="contact-form-container">
      <div id="formMessage" class="form-message"></div>
      <form id="contactForm" onsubmit="handleSubmit(event)">
        <div class="form-group"><label for="name">Name *</label><input type="text" id="name" name="name" required></div>
        <div class="form-group"><label for="email">Email *</label><input type="email" id="email" name="email" required></div>
        <div class="form-group"><label for="phone">Phone</label><input type="tel" id="phone" name="phone"></div>
        <div class="form-group">
          <label for="service">Service Interest</label>
          <select id="service" name="service">
            <option value="">Select a service...</option>
            <option value="template">Template Purchase</option>
            <option value="one-day">One Day Website</option>
            <option value="custom">Custom Build</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group"><label for="message">Message *</label><textarea id="message" name="message" required placeholder="Tell us about your project..."></textarea></div>
        <button type="submit" class="submit-button">SEND MESSAGE</button>
      </form>
    </div>
    <div class="contact-info">
      <h3>Other Ways to Connect</h3>
      <p>Email us directly at <a href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a></p>
      <p>We offer services in English &amp; Vietnamese</p>
    </div>
  </section>
  ${sharedFooter}
  <script>
    function handleSubmit(event) {
      event.preventDefault();
      const formMessage = document.getElementById('formMessage');
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      document.getElementById('contactForm').reset();
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    }
  <\/script>
</body>
</html>`;

const fullCustomPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Full Custom Website Build — Bloomie House</title>
  <meta name="description" content="Get a fully custom website built from scratch by Bloomie House. Up to 6 pages, brand strategy session, SEO foundation & 30 days support. From $897 AUD.">
  <meta name="keywords" content="custom website build Australia, bespoke web design, custom Wix website, custom Shopify store, web design Hobart, full custom website">
  <meta property="og:title" content="Full Custom Website Build — Bloomie House">
  <meta property="og:description" content="A fully custom website built from scratch for your brand. Up to 6 pages, brand strategy session, SEO setup & 30 days support. From $897 AUD.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/full-custom">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Full Custom Website Build — Bloomie House">
  <meta name="twitter:description" content="A fully custom website built from scratch for your brand. From $897 AUD.">
  <link rel="canonical" href="https://bloomiehouse.com.au/full-custom">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="apple-touch-icon" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .page-hero { text-align: center; padding: 10rem 2rem 3rem; }
    .page-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: 4rem; font-weight: 300; color: var(--primary); margin-bottom: 1.5rem; }
    .page-hero p { font-size: 1.2rem; color: var(--text-light); max-width: 700px; margin: 0 auto; line-height: 1.8; }
    .includes-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 900px; margin: 3rem auto; padding: 0 2rem; }
    .include-item { text-align: center; padding: 1.5rem; }
    .include-icon { font-size: 2rem; color: var(--sage); margin-bottom: 1rem; }
    .include-item h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: var(--primary); margin-bottom: 0.5rem; }
    .include-item p { color: var(--text-light); font-size: 0.95rem; }
    .form-wrapper { background: white; border: 1px solid var(--mid); padding: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.05); max-width: 900px; margin: 0 auto; }
  </style>
</head>
<body>
  ${sharedHeader}
  <section class="page-hero">
    <h1>Full Custom Build</h1>
    <p>Built from scratch for your brand — your vision, your voice, no template limits. Tell us about your project below and we'll be in touch.</p>
  </section>
  <section class="section" style="min-height:auto; padding-top: 0;">
    <div class="includes-list">
      <div class="include-item"><div class="include-icon">🎨</div><h4>Custom Design</h4><p>Unique layouts tailored to your brand identity</p></div>
      <div class="include-item"><div class="include-icon">📄</div><h4>Up to 6 Pages</h4><p>Home, About, Services, Portfolio, Blog & more</p></div>
      <div class="include-item"><div class="include-icon">🔍</div><h4>SEO Foundation</h4><p>Built-in structure to help you rank on Google</p></div>
      <div class="include-item"><div class="include-icon">💬</div><h4>30 Days Support</h4><p>Post-launch help so you're never left stranded</p></div>
    </div>
    <div class="form-wrapper">
      <script type="text/javascript" src="https://form.jotform.com/jsform/253192865445869"><\/script>
    </div>
  </section>
  ${sharedFooter}
</body>
</html>`;

// ── TEMPLATES DATA ──
const templateData = [
  {
    slug: 'coaching-service',
    name: 'Coaching Service',
    niche: 'Coaching & Consulting',
    platform: 'Canva',
    badge: 'New',
    price: 37,
    originalPrice: null,
    mockClass: 'mock-coaching',
    images: [
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-1.png',
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-2.png',
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-3.png',
    ],
    description: 'A clean, high-converting landing page template for coaches, consultants, and service providers. Built in Canva — fully editable, no design skills needed. Ready to publish in under an hour.',
    features: ['Fully editable in Canva', 'High-converting layout', 'Service & pricing sections', 'Testimonials block', 'Call-to-action sections', 'Mobile-friendly design'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
  {
    slug: 'the-brew',
    name: 'The Brew',
    niche: 'Cafe & Coffee Shop',
    platform: 'Wix Studio',
    badge: '20% OFF',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-cafe',
    description: 'A warm, editorial template built for cafes, coffee roasters, and food-forward brands. Showcases your menu, story, and atmosphere with rich typography and a full-bleed hero.',
    features: ['Full menu section', 'Online booking integration', 'Instagram feed', 'Google Maps embed', 'Mobile-optimised'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
  {
    slug: 'the-studio',
    name: 'The Studio',
    niche: 'Beauty & Lash Studio',
    platform: 'Wix Studio',
    badge: 'Bestseller',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-beauty',
    description: 'Our most-loved template — designed for beauty studios, lash techs, brow bars, and skin clinics. Elegant, feminine, and conversion-focused with a built-in booking flow.',
    features: ['Service & pricing cards', 'Online booking section', 'Before & after gallery', 'Testimonials slider', 'Contact form'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
  {
    slug: 'the-tradie',
    name: 'The Tradie',
    niche: 'Trades & Services',
    platform: 'Shopify',
    badge: 'New',
    price: 97,
    originalPrice: null,
    mockClass: 'mock-tradie',
    description: 'A bold, trust-building template for tradies, builders, electricians, and service businesses. Lead-gen focused with a prominent quote request form and project gallery.',
    features: ['Quote request form', 'Services & pricing section', 'Project portfolio grid', 'Google Reviews widget', 'Click-to-call button'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
  {
    slug: 'the-flow',
    name: 'The Flow',
    niche: 'Wellness & Yoga',
    platform: 'Wix Studio',
    badge: '20% OFF',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-yoga',
    description: 'A soft, serene template for yoga studios, wellness coaches, pilates, and holistic practitioners. Calming palette, class schedule section, and a gentle booking experience.',
    features: ['Class schedule & timetable', 'Teacher profiles', 'Membership / pricing plans', 'Blog / journal section', 'Newsletter opt-in'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
  {
    slug: 'the-boutique',
    name: 'The Boutique',
    niche: 'Boutique & Retail',
    platform: 'Shopify',
    badge: '20% OFF',
    price: 97,
    originalPrice: 127,
    mockClass: 'mock-boutique',
    description: 'A luxe, scroll-stopping Shopify theme for fashion boutiques, homewares, and lifestyle brands. Full ecommerce ready with editorial lookbook sections and a minimal cart experience.',
    features: ['Full Shopify ecommerce', 'Lookbook / editorial section', 'Announcement bar', 'Product quick-view', 'Size guide popup'],
    etsy: 'https://www.etsy.com/shop/bloomiehouse',
  },
];

// ── DIGITAL TEMPLATES PAGE ──
const digitalTemplatesPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Templates — Bloomie House</title>
  <meta name="description" content="Premium Wix Studio, Shopify & Canva templates for Australian small businesses. Buy, personalise, and launch your website this week. From $37 AUD.">
  <meta name="keywords" content="digital templates Australia, Wix templates, Shopify themes, Canva templates, branding kit, small business templates, website templates download, Australian digital products">
  <meta property="og:title" content="Digital Templates — Bloomie House">
  <meta property="og:description" content="Premium Wix Studio, Shopify & Canva templates for Australian small businesses. Buy, personalise, launch — this week. From $37 AUD.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/digital-templates">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Digital Templates — Bloomie House">
  <meta name="twitter:description" content="Premium Wix Studio, Shopify & Canva templates for Australian small businesses. From $37 AUD.">
  <link rel="canonical" href="https://bloomiehouse.com.au/digital-templates">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link rel="apple-touch-icon" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .dt-hero { text-align: center; padding: 12rem 2rem 5rem; background: var(--light); }
    .dt-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 300; color: var(--primary); margin-bottom: 1.5rem; letter-spacing: -1px; }
    .dt-hero p { font-size: 1.15rem; color: var(--text-light); max-width: 580px; margin: 0 auto 3rem; line-height: 1.8; }
    .dt-hero-badges { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; }
    .dt-badge { font-size: 0.75rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-light); display: flex; align-items: center; gap: 0.5rem; }
    .dt-badge::before { content: '—'; color: var(--sage); }
    .dt-filters { display: flex; gap: 0; justify-content: center; padding: 3rem 2rem 0; flex-wrap: wrap; }
    .dt-filter-btn { padding: 0.7rem 2rem; border: 1px solid var(--mid); background: transparent; font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-light); cursor: pointer; transition: all 0.25s ease; margin: 0 -1px 0 0; }
    .dt-filter-btn:hover { background: var(--light); color: var(--primary); }
    .dt-filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); z-index: 1; position: relative; }
    .dt-grid-section { padding: 3rem 4rem 8rem; max-width: 1300px; margin: 0 auto; }
    .dt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2.5rem; }
    .tpl-card { background: white; border: 1px solid var(--mid); overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease; text-decoration: none; color: inherit; display: block; }
    .tpl-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.10); }
    .tpl-card.hidden { display: none; }
    .tpl-thumb { aspect-ratio: 4/3; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .mock-cafe { background: linear-gradient(135deg, #6B4226 0%, #9E6B47 50%, #C8A07A 100%); }
    .mock-beauty { background: linear-gradient(135deg, #C8A09A 0%, #E8C8C2 50%, #F5EAE8 100%); }
    .mock-tradie { background: linear-gradient(135deg, #2C3E2D 0%, #4A5D4A 50%, #7A8F7A 100%); }
    .mock-yoga { background: linear-gradient(135deg, #8B9D7F 0%, #B8C8AC 50%, #E0EAD8 100%); }
    .mock-boutique { background: linear-gradient(135deg, #BFA080 0%, #D4B898 50%, #EDE0D0 100%); }
    .mock-coaching { background: linear-gradient(135deg, #D4A8BE 0%, #E8C8D8 50%, #F5EAF0 100%); }
    .tpl-thumb-label { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: rgba(255,255,255,0.9); letter-spacing: 2px; text-shadow: 0 2px 12px rgba(0,0,0,0.3); }
    .tpl-platform-badge { position: absolute; top: 1rem; left: 1rem; background: rgba(255,255,255,0.92); color: var(--primary); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; padding: 0.3rem 0.7rem; }
    .tpl-sale-badge { position: absolute; top: 1rem; right: 1rem; background: var(--primary); color: white; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; padding: 0.3rem 0.7rem; }
    .tpl-info { padding: 1.5rem; }
    .tpl-niche { font-size: 0.75rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-light); margin-bottom: 0.4rem; }
    .tpl-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; color: var(--primary); margin-bottom: 0.75rem; }
    .tpl-price { display: flex; align-items: baseline; gap: 0.5rem; }
    .tpl-price-current { font-size: 1.2rem; font-weight: 500; color: var(--primary); }
    .tpl-price-original { font-size: 0.95rem; color: var(--text-light); text-decoration: line-through; }
    .tpl-cta { display: block; margin-top: 1.2rem; padding: 0.75rem 1.5rem; background: var(--primary); color: white; text-align: center; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; border: 1px solid var(--primary); transition: all 0.25s ease; text-decoration: none; }
    .tpl-cta:hover { background: transparent; color: var(--primary); }
    .dt-platforms { background: var(--cream, #F5F0E8); padding: 6rem 4rem; }
    .dt-platforms h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300; color: var(--primary); text-align: center; margin-bottom: 0.75rem; }
    .dt-platforms-sub { text-align: center; color: var(--text-light); font-size: 1.05rem; margin-bottom: 3.5rem; }
    .dt-platform-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto; }
    .dt-platform-card { background: white; border: 1px solid var(--mid); padding: 2.5rem; text-align: center; transition: box-shadow 0.25s ease; }
    .dt-platform-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.07); }
    .dt-platform-icon { font-size: 1.5rem; margin-bottom: 1rem; color: var(--sage); }
    .dt-platform-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; color: var(--primary); margin-bottom: 0.75rem; }
    .dt-platform-card p { font-size: 0.95rem; color: var(--text-light); line-height: 1.75; }
    .dt-bottom-cta { text-align: center; padding: 6rem 2rem; background: var(--primary); }
    .dt-bottom-cta h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: white; margin-bottom: 1rem; }
    .dt-bottom-cta p { color: rgba(255,255,255,0.72); font-size: 1.05rem; max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.8; }
    .dt-etsy-btn { display: inline-block; padding: 1rem 3rem; border: 2px solid white; color: white; text-decoration: none; font-size: 0.82rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; transition: all 0.3s ease; }
    .dt-etsy-btn:hover { background: white; color: var(--primary); }
    @media (max-width: 768px) {
      .dt-hero { padding: 9rem 2rem 3rem; }
      .dt-filters { padding: 2rem 1.5rem 0; gap: 0.5rem; }
      .dt-filter-btn { margin: 0; }
      .dt-grid-section { padding: 2rem 1.5rem 5rem; }
      .dt-platforms { padding: 4rem 2rem; }
    }
  </style>
</head>
<body>
  ${sharedHeader}
  <section class="dt-hero">
    <h1>Digital Templates</h1>
    <p>Premium website templates for Australian small businesses. Buy, personalise, and launch your site — this week.</p>
    <div class="dt-hero-badges">
      <span class="dt-badge">From $37 AUD</span>
      <span class="dt-badge">Instant Download</span>
      <span class="dt-badge">No Design Skills Needed</span>
    </div>
  </section>
  <div class="dt-filters">
    <button class="dt-filter-btn active" onclick="filterTemplates(this, 'all')">All Templates</button>
    <button class="dt-filter-btn" onclick="filterTemplates(this, 'Wix Studio')">Wix Studio</button>
    <button class="dt-filter-btn" onclick="filterTemplates(this, 'Shopify')">Shopify</button>
    <button class="dt-filter-btn" onclick="filterTemplates(this, 'Canva')">Canva</button>
  </div>
  <div class="dt-grid-section">
    <div class="dt-grid" id="templatesGrid">
      ${templateData.map(t => `
      <a href="/templates/${t.slug}" class="tpl-card" data-platform="${t.platform}">
        <div class="tpl-thumb ${t.mockClass}" style="${t.images ? 'background:none;' : ''}">
          ${t.images ? `<img src="${t.images[0]}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;display:block;">` : `<div class="tpl-thumb-label">${t.name}</div>`}
          <span class="tpl-platform-badge">${t.platform}</span>
          <span class="tpl-sale-badge">${t.badge}</span>
        </div>
        <div class="tpl-info">
          <div class="tpl-niche">${t.niche}</div>
          <div class="tpl-name">${t.name}</div>
          <div class="tpl-price">
            <span class="tpl-price-current">$${t.price} AUD</span>
            ${t.originalPrice ? `<span class="tpl-price-original">$${t.originalPrice}</span>` : ''}
          </div>
          <span class="tpl-cta">View Template →</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
  <section class="dt-platforms">
    <h2>Choose Your Platform</h2>
    <p class="dt-platforms-sub">Every template is built for one platform — pick the one that fits your business.</p>
    <div class="dt-platform-grid">
      <div class="dt-platform-card">
        <div class="dt-platform-icon">◆</div>
        <h3>Wix Studio</h3>
        <p>Drag-and-drop simplicity with professional results. Perfect for service-based businesses, studios, and creatives who want full control — no code required.</p>
      </div>
      <div class="dt-platform-card">
        <div class="dt-platform-icon">◈</div>
        <h3>Shopify</h3>
        <p>Built for selling online. Ideal for product-based businesses, boutiques, and tradies who need a powerful ecommerce or lead-gen engine.</p>
      </div>
      <div class="dt-platform-card">
        <div class="dt-platform-icon">✦</div>
        <h3>Canva</h3>
        <p>Accessible and instant. Great for landing pages, lead magnets, and digital products — editable by anyone in minutes, no design experience needed.</p>
      </div>
    </div>
  </section>
  <section class="dt-bottom-cta">
    <h2>Browse the Full Collection</h2>
    <p>All templates are available on our Etsy shop — instant download, every time.</p>
    <a href="https://www.etsy.com/shop/bloomiehouse" class="dt-etsy-btn" target="_blank" rel="noopener noreferrer">Shop on Etsy</a>
  </section>
  ${sharedFooter}
  <script>
    function filterTemplates(btn, platform) {
      document.querySelectorAll('.dt-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tpl-card').forEach(card => {
        if (platform === 'all' || card.dataset.platform === platform) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }
  <\/script>
</body>
</html>`;

// ── TEMPLATES LISTING PAGE ──
const templatesPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Templates — Bloomie House</title>
  <meta name="description" content="Browse premium Wix Studio & Shopify website templates for Australian small businesses. Cafes, beauty studios, tradies, boutiques & more from $79 AUD.">
  <meta property="og:title" content="Templates — Bloomie House">
  <meta property="og:description" content="Premium website templates from $79 AUD. Buy, personalise, launch this week.">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/templates">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="https://bloomiehouse.com.au/templates">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .templates-hero {
      padding: 12rem 4rem 5rem;
      text-align: center;
      background: var(--light);
    }
    .templates-hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 4rem;
      font-weight: 300;
      color: var(--primary);
      margin-bottom: 1rem;
      letter-spacing: -1px;
    }
    .templates-hero p {
      font-size: 1.15rem;
      color: var(--text-light);
      max-width: 560px;
      margin: 0 auto;
      line-height: 1.8;
    }
    .templates-grid-section {
      padding: 4rem 4rem 8rem;
      max-width: 1300px;
      margin: 0 auto;
    }
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2.5rem;
    }
    .tpl-card {
      background: white;
      border: 1px solid var(--mid);
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    .tpl-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.10); }
    .tpl-thumb {
      aspect-ratio: 4/3;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mock-cafe    { background: linear-gradient(135deg, #6B4226 0%, #9E6B47 50%, #C8A07A 100%); }
    .mock-beauty  { background: linear-gradient(135deg, #C8A09A 0%, #E8C8C2 50%, #F5EAE8 100%); }
    .mock-tradie  { background: linear-gradient(135deg, #2C3E2D 0%, #4A5D4A 50%, #7A8F7A 100%); }
    .mock-yoga    { background: linear-gradient(135deg, #8B9D7F 0%, #B8C8AC 50%, #E0EAD8 100%); }
    .mock-boutique{ background: linear-gradient(135deg, #BFA080 0%, #D4B898 50%, #EDE0D0 100%); }
    .tpl-thumb-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 300;
      color: rgba(255,255,255,0.9);
      letter-spacing: 2px;
      text-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }
    .tpl-platform-badge {
      position: absolute;
      top: 1rem; left: 1rem;
      background: rgba(255,255,255,0.92);
      color: var(--primary);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 0.3rem 0.7rem;
    }
    .tpl-sale-badge {
      position: absolute;
      top: 1rem; right: 1rem;
      background: var(--primary);
      color: white;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 0.3rem 0.7rem;
    }
    .tpl-info { padding: 1.5rem; }
    .tpl-niche {
      font-size: 0.75rem; font-weight: 500; letter-spacing: 1.5px;
      text-transform: uppercase; color: var(--text-light); margin-bottom: 0.4rem;
    }
    .tpl-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; font-weight: 400; color: var(--primary); margin-bottom: 0.75rem;
    }
    .tpl-price { display: flex; align-items: baseline; gap: 0.5rem; }
    .tpl-price-current { font-size: 1.2rem; font-weight: 500; color: var(--primary); }
    .tpl-price-original { font-size: 0.95rem; color: var(--text-light); text-decoration: line-through; }
    .tpl-cta {
      display: block; margin-top: 1.2rem; padding: 0.75rem 1.5rem;
      background: var(--primary); color: white; text-align: center;
      font-size: 0.85rem; font-weight: 500; letter-spacing: 0.8px;
      text-transform: uppercase; border: 1px solid var(--primary);
      transition: all 0.25s ease; text-decoration: none;
    }
    .tpl-cta:hover { background: transparent; color: var(--primary); }
    @media (max-width: 768px) {
      .templates-hero { padding: 9rem 2rem 3rem; }
      .templates-hero h1 { font-size: 2.8rem; }
      .templates-grid-section { padding: 2rem 1.5rem 5rem; }
    }
  </style>
</head>
<body>
  ${sharedHeader}
  <div class="templates-hero">
    <h1>Our Templates</h1>
    <p>Designed for Australian small businesses. Buy, personalise, and launch your website this week.</p>
  </div>
  <div class="templates-grid-section">
    <div class="templates-grid">
      ${templateData.map(t => `
      <a href="/templates/${t.slug}" class="tpl-card">
        <div class="tpl-thumb ${t.mockClass}" style="${t.images ? 'background:none;' : ''}">
          ${t.images ? `<img src="${t.images[0]}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;display:block;">` : `<div class="tpl-thumb-label">${t.name}</div>`}
          <span class="tpl-platform-badge">${t.platform}</span>
          <span class="tpl-sale-badge">${t.badge}</span>
        </div>
        <div class="tpl-info">
          <div class="tpl-niche">${t.niche}</div>
          <div class="tpl-name">${t.name}</div>
          <div class="tpl-price">
            <span class="tpl-price-current">$${t.price} AUD</span>
            ${t.originalPrice ? `<span class="tpl-price-original">$${t.originalPrice}</span>` : ''}
          </div>
          <span class="tpl-cta">View Template →</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
  ${sharedFooter}
</body>
</html>`;

// ── TEMPLATE DETAIL PAGE ──
function templateDetailPage(t) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name} — Bloomie House</title>
  <meta name="description" content="${t.description}">
  <meta property="og:title" content="${t.name} — Bloomie House">
  <meta property="og:description" content="${t.description}">
  <meta property="og:image" content="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <meta property="og:url" content="https://bloomiehouse.com.au/templates/${t.slug}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="https://bloomiehouse.com.au/templates/${t.slug}">
  <link rel="icon" type="image/png" href="https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    .detail-layout {
      padding: 10rem 4rem 6rem;
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: start;
    }
    .detail-images { position: sticky; top: 8rem; }
    .detail-main-img {
      aspect-ratio: 4/3;
      border-radius: 2px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .mock-cafe    { background: linear-gradient(135deg, #6B4226 0%, #9E6B47 50%, #C8A07A 100%); }
    .mock-beauty  { background: linear-gradient(135deg, #C8A09A 0%, #E8C8C2 50%, #F5EAE8 100%); }
    .mock-tradie  { background: linear-gradient(135deg, #2C3E2D 0%, #4A5D4A 50%, #7A8F7A 100%); }
    .mock-yoga    { background: linear-gradient(135deg, #8B9D7F 0%, #B8C8AC 50%, #E0EAD8 100%); }
    .mock-boutique{ background: linear-gradient(135deg, #BFA080 0%, #D4B898 50%, #EDE0D0 100%); }
    .detail-main-img-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3rem;
      font-weight: 300;
      color: rgba(255,255,255,0.9);
      letter-spacing: 4px;
      text-shadow: 0 2px 16px rgba(0,0,0,0.3);
    }
    .detail-thumbs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }
    .detail-thumb {
      aspect-ratio: 4/3;
      border-radius: 2px;
      opacity: 0.7;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .detail-thumb:hover { opacity: 1; }
    .detail-thumb.mock-cafe    { background: linear-gradient(160deg, #6B4226, #C8A07A); }
    .detail-thumb.mock-beauty  { background: linear-gradient(160deg, #C8A09A, #F5EAE8); }
    .detail-thumb.mock-tradie  { background: linear-gradient(160deg, #2C3E2D, #7A8F7A); }
    .detail-thumb.mock-yoga    { background: linear-gradient(160deg, #8B9D7F, #E0EAD8); }
    .detail-thumb.mock-boutique{ background: linear-gradient(160deg, #BFA080, #EDE0D0); }
    .breadcrumb {
      font-size: 0.8rem; color: var(--text-light);
      letter-spacing: 0.5px; margin-bottom: 1.5rem;
    }
    .breadcrumb a { color: var(--text-light); text-decoration: none; }
    .breadcrumb a:hover { color: var(--primary); }
    .detail-niche {
      font-size: 0.75rem; font-weight: 500; letter-spacing: 2px;
      text-transform: uppercase; color: var(--text-light); margin-bottom: 0.75rem;
    }
    .detail-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem; font-weight: 300; color: var(--primary);
      line-height: 1.1; margin-bottom: 1.25rem; letter-spacing: -1px;
    }
    .detail-platform {
      display: inline-block; font-size: 0.75rem; font-weight: 500;
      letter-spacing: 1px; text-transform: uppercase;
      background: var(--mid); color: var(--primary);
      padding: 0.3rem 0.8rem; margin-bottom: 1.5rem;
    }
    .detail-price-row {
      display: flex; align-items: baseline;
      gap: 0.75rem; margin-bottom: 1.75rem;
    }
    .detail-price { font-size: 2rem; font-weight: 500; color: var(--primary); }
    .detail-price-original { font-size: 1.2rem; color: var(--text-light); text-decoration: line-through; }
    .detail-badge {
      font-size: 0.7rem; font-weight: 600; letter-spacing: 1px;
      text-transform: uppercase; background: var(--primary);
      color: white; padding: 0.25rem 0.65rem;
    }
    .detail-description {
      font-size: 1rem; color: var(--text); line-height: 1.9;
      margin-bottom: 2rem; border-top: 1px solid var(--mid); padding-top: 2rem;
    }
    .detail-features { margin-bottom: 2.5rem; }
    .detail-features h4 {
      font-size: 0.75rem; font-weight: 600; letter-spacing: 2px;
      text-transform: uppercase; color: var(--primary); margin-bottom: 1rem;
    }
    .detail-features ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
    .detail-features li {
      font-size: 0.95rem; color: var(--text);
      display: flex; align-items: center; gap: 0.6rem;
    }
    .detail-features li::before { content: '❆'; color: var(--sage); font-size: 0.65rem; }
    .btn-buy {
      display: block; width: 100%; padding: 1.1rem 2rem;
      background: var(--primary); color: white; text-align: center;
      text-decoration: none; font-size: 0.9rem; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      border: 2px solid var(--primary); transition: all 0.25s ease; margin-bottom: 1rem;
    }
    .btn-buy:hover { background: transparent; color: var(--primary); }
    .btn-back {
      display: block; width: 100%; padding: 0.9rem 2rem;
      background: transparent; color: var(--text-light); text-align: center;
      text-decoration: none; font-size: 0.85rem; letter-spacing: 0.5px;
      border: 1px solid var(--mid); transition: all 0.25s ease;
    }
    .btn-back:hover { border-color: var(--primary); color: var(--primary); }
    .detail-note {
      font-size: 0.8rem; color: var(--text-light);
      margin-top: 1.25rem; line-height: 1.6;
    }
    @media (max-width: 900px) {
      .detail-layout { grid-template-columns: 1fr; padding: 9rem 2rem 4rem; gap: 3rem; }
      .detail-images { position: static; }
      .detail-name { font-size: 2.5rem; }
    }
  </style>
</head>
<body>
  ${sharedHeader}
  <div class="detail-layout">
    <div class="detail-images">
      <div class="detail-main-img ${t.mockClass}" style="${t.images ? 'background:none;display:block;' : ''}">
        ${t.images
          ? `<img id="main-img" src="${t.images[0]}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;display:block;">`
          : `<span class="detail-main-img-label">${t.name}</span>`}
      </div>
      <div class="detail-thumbs">
        ${t.images
          ? t.images.map((src, i) => `<img src="${src}" alt="${t.name} screenshot ${i+1}" class="detail-thumb" style="width:100%;height:100%;object-fit:cover;cursor:pointer;opacity:${i===0?'1':'0.65'};" onclick="document.getElementById('main-img').src=this.src;document.querySelectorAll('.detail-thumbs img').forEach(x=>x.style.opacity='0.65');this.style.opacity='1';">`).join('')
          : `<div class="detail-thumb ${t.mockClass}"></div><div class="detail-thumb ${t.mockClass}" style="opacity:0.5;filter:saturate(0.6)"></div><div class="detail-thumb ${t.mockClass}" style="opacity:0.4;filter:saturate(0.4)"></div>`}
      </div>
    </div>
    <div class="detail-info">
      <div class="breadcrumb"><a href="/templates">Templates</a> / ${t.name}</div>
      <div class="detail-niche">${t.niche}</div>
      <h1 class="detail-name">${t.name}</h1>
      <span class="detail-platform">${t.platform}</span>
      <div class="detail-price-row">
        <span class="detail-price">$${t.price} AUD</span>
        ${t.originalPrice ? `<span class="detail-price-original">$${t.originalPrice}</span>` : ''}
        <span class="detail-badge">${t.badge}</span>
      </div>
      <div class="detail-description">${t.description}</div>
      <div class="detail-features">
        <h4>What's Included</h4>
        <ul>${t.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
      <a href="${t.etsy}" target="_blank" rel="noopener" class="btn-buy">Buy Now on Etsy →</a>
      <a href="/templates" class="btn-back">← Back to Templates</a>
      <p class="detail-note">Delivered instantly via Etsy. Includes setup guide and 30-day email support.</p>
    </div>
  </div>
  ${sharedFooter}
</body>
</html>`;
}
