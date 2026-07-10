/**
 * Bloomie House — Cloudflare Worker
 * Ecommerce-style multi-page site (templates shop + services)
 */

const LOGO =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png';
const LOGO_LONG =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-long-house-green-background-transparent.png';
const ETSY_SHOP = 'https://www.etsy.com/shop/bloomiehouse';
const ETSY_ALT = 'https://bloomlashbar.etsy.com';
const JOTFORM_DISCOVERY = 'https://form.jotform.com/haiyen0304/website-design-discovery';
const JOTFORM_CUSTOM = 'https://form.jotform.com/jsform/253192865445869';
const SITE = 'https://bloomiehouse.com.au';

const templateData = [
  {
    slug: 'coaching-service',
    name: 'Coaching Service',
    niche: 'Coaching & Consulting',
    platform: 'Canva',
    category: 'canva',
    badge: 'New',
    price: 37,
    originalPrice: null,
    mockClass: 'mock-coaching',
    images: [
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-1.png',
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-2.png',
      'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Templates/landing-page-coaching-service-canva/template-service-landing-3.png',
    ],
    description:
      'A clean, high-converting landing page template for coaches, consultants, and service providers. Built in Canva — fully editable, no design skills needed. Ready to publish in under an hour.',
    features: [
      'Fully editable in Canva',
      'High-converting layout',
      'Service & pricing sections',
      'Testimonials block',
      'Call-to-action sections',
      'Mobile-friendly design',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'the-brew',
    name: 'The Brew',
    niche: 'Cafe & Coffee Shop',
    platform: 'Wix Studio',
    category: 'wix',
    badge: '20% OFF',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-cafe',
    description:
      'A warm, editorial template built for cafes, coffee roasters, and food-forward brands. Showcases your menu, story, and atmosphere with rich typography and a full-bleed hero.',
    features: [
      'Full menu section',
      'Online booking integration',
      'Instagram feed',
      'Google Maps embed',
      'Mobile-optimised',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'the-studio',
    name: 'The Studio',
    niche: 'Beauty & Lash Studio',
    platform: 'Wix Studio',
    category: 'wix',
    badge: 'Bestseller',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-beauty',
    description:
      'Our most-loved template — designed for beauty studios, lash techs, brow bars, and skin clinics. Elegant, feminine, and conversion-focused with a built-in booking flow.',
    features: [
      'Service & pricing cards',
      'Online booking section',
      'Before & after gallery',
      'Testimonials slider',
      'Contact form',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'the-tradie',
    name: 'The Tradie',
    niche: 'Trades & Services',
    platform: 'Shopify',
    category: 'shopify',
    badge: 'New',
    price: 97,
    originalPrice: null,
    mockClass: 'mock-tradie',
    description:
      'A bold, trust-building template for tradies, builders, electricians, and service businesses. Lead-gen focused with a prominent quote request form and project gallery.',
    features: [
      'Quote request form',
      'Services & pricing section',
      'Project portfolio grid',
      'Google Reviews widget',
      'Click-to-call button',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'the-flow',
    name: 'The Flow',
    niche: 'Wellness & Yoga',
    platform: 'Wix Studio',
    category: 'wix',
    badge: '20% OFF',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-yoga',
    description:
      'A soft, serene template for yoga studios, wellness coaches, pilates, and holistic practitioners. Calming palette, class schedule section, and a gentle booking experience.',
    features: [
      'Class schedule & timetable',
      'Teacher profiles',
      'Membership / pricing plans',
      'Blog / journal section',
      'Newsletter opt-in',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'the-boutique',
    name: 'The Boutique',
    niche: 'Boutique & Retail',
    platform: 'Shopify',
    category: 'shopify',
    badge: '20% OFF',
    price: 97,
    originalPrice: 127,
    mockClass: 'mock-boutique',
    description:
      'A luxe, scroll-stopping Shopify theme for fashion boutiques, homewares, and lifestyle brands. Full ecommerce ready with editorial lookbook sections and a minimal cart experience.',
    features: [
      'Full Shopify ecommerce',
      'Lookbook / editorial section',
      'Announcement bar',
      'Product quick-view',
      'Size guide popup',
    ],
    etsy: ETSY_SHOP,
  },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '') || '/';

    switch (pathname) {
      case '/':
        return htmlResponse(homePage());

      case '/shop':
      case '/templates':
      case '/digital-templates':
        return htmlResponse(shopPage(url.searchParams.get('platform') || 'all'));

      case '/cart':
        return htmlResponse(cartPage(), 200, 'no-store');

      case '/services':
      case '/website-design':
        return htmlResponse(servicesPage());

      case '/full-custom':
        return htmlResponse(fullCustomPage());

      case '/contact':
        return htmlResponse(contactPage());

      case '/about':
        return htmlResponse(aboutPage());

      case '/sitemap.xml':
        return sitemapResponse();

      case '/api/chat':
        return handleChat(request, env);

      case '/favicon.ico':
      case '/favicon.png':
        return Response.redirect(LOGO, 301);

      default: {
        if (pathname.startsWith('/templates/') || pathname.startsWith('/shop/')) {
          const slug = pathname.split('/').pop();
          const tpl = templateData.find((t) => t.slug === slug);
          if (tpl) return htmlResponse(productPage(tpl));
        }
        return htmlResponse(notFoundPage(), 404);
      }
    }
  },
};

function htmlResponse(html, status = 200, cacheControl) {
  const withWidget = html.includes('</body>')
    ? html.replace('</body>', chatWidget + '</body>')
    : html + chatWidget;
  return new Response(withWidget, {
    status,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control':
        cacheControl ||
        (status === 404 ? 'no-store' : 'public, max-age=600'),
    },
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  });
}

function sitemapResponse() {
  const urls = [
    ['/', '1.0'],
    ['/shop', '0.9'],
    ['/services', '0.8'],
    ['/full-custom', '0.7'],
    ['/contact', '0.6'],
    ['/about', '0.5'],
    ['/cart', '0.3'],
    ...templateData.map((t) => [`/templates/${t.slug}`, '0.8']),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, p]) => `  <url><loc>${SITE}${path}</loc><priority>${p}</priority></url>`).join('\n')}
</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
  });
}

// ── CHATBOT ──
const CHAT_SYSTEM_PROMPT = `You are "Bloomie", the friendly AI assistant for Bloomie House — a Hobart, Australia studio that sells premium Wix Studio, Shopify & Canva website templates and offers done-for-you web design for small businesses (cafes, beauty studios, tradies, boutiques and more).

Your job:
- Help visitors understand products and services.
- Recommend a ready-made template (/shop) or a custom build (/services, /full-custom).
- Answer pricing, timelines, and process questions warmly and briefly.
- Point people to /shop, /cart (wishlist before Etsy checkout), /contact, or the discovery form on /services.

Style: warm, modern, encouraging, never pushy. Keep replies short (2–4 sentences) unless asked for detail. Never invent prices. Only discuss Bloomie House and web design.`;

async function handleChat(request, env) {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);
  if (!env || !env.GROQ_API_KEY) {
    return jsonResponse({ error: 'The assistant is not configured yet.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  if (!messages.length) return jsonResponse({ error: 'No messages provided.' }, 400);

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!groqRes.ok) {
      return jsonResponse({ error: 'The assistant is unavailable right now. Please try again shortly.' }, 502);
    }
    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry — I could not generate a reply.';
    return jsonResponse({ reply });
  } catch {
    return jsonResponse({ error: 'The assistant is unavailable right now. Please try again shortly.' }, 502);
  }
}

const chatWidget = `
<style>
  #bloomie-chat-btn {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
    background: #D67D9A; color: #fff; font-size: 26px; line-height: 60px;
    box-shadow: 0 8px 24px rgba(214,125,154,.35); transition: transform .2s;
  }
  #bloomie-chat-btn:hover { transform: scale(1.06); }
  #bloomie-chat-panel {
    position: fixed; bottom: 96px; right: 24px; z-index: 9999;
    width: min(380px, calc(100vw - 32px)); height: 480px;
    background: #fff; border-radius: 18px; display: none; flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,.18); overflow: hidden; border: 1px solid rgba(0,0,0,.06);
  }
  #bloomie-chat-panel.open { display: flex; }
  .bloomie-chat-header {
    padding: 16px 18px; background: #FAFAF8; border-bottom: 1px solid rgba(0,0,0,.06);
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 17px;
  }
  .bloomie-chat-header small { display: block; font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 12px; opacity: .7; margin-top: 2px; }
  .bloomie-chat-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #111; line-height: 1; }
  .bloomie-chat-log { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .bloomie-msg { max-width: 82%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; font-family: 'DM Sans', sans-serif; }
  .bloomie-msg.user { align-self: flex-end; background: #D67D9A; color: #fff; border-bottom-right-radius: 4px; }
  .bloomie-msg.bot { align-self: flex-start; background: #F0EBE3; color: #111; border-bottom-left-radius: 4px; }
  .bloomie-msg.typing { font-style: italic; opacity: .7; }
  .bloomie-chat-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid rgba(0,0,0,.08); background: #FAFAF8; }
  .bloomie-chat-input input {
    flex: 1; border: 1px solid rgba(0,0,0,.12); border-radius: 999px; padding: 10px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
  }
  .bloomie-chat-input input:focus { border-color: #D67D9A; }
  .bloomie-chat-input button {
    border: none; background: #111; color: #fff; border-radius: 999px; padding: 0 16px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
  }
  .bloomie-chat-input button:disabled { opacity: .5; cursor: default; }
</style>
<button id="bloomie-chat-btn" aria-label="Open chat">💬</button>
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
  var history = [];

  function addMsg(role, text) {
    var div = document.createElement('div');
    div.className = 'bloomie-msg ' + (role === 'user' ? 'user' : 'bot');
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  btn.addEventListener('click', function () {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && !history.length) {
      addMsg('bot', "Hi! I'm Bloomie. Looking for a template, a one-day setup, or a full custom build?");
    }
    if (panel.classList.contains('open')) input.focus();
  });
  closeBtn.addEventListener('click', function () { panel.classList.remove('open'); });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    var typing = addMsg('bot', 'Thinking…');
    typing.classList.add('typing');
    sendBtn.disabled = true;
    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      var data = await res.json();
      typing.remove();
      var reply = data.reply || data.error || 'Something went wrong.';
      addMsg('bot', reply);
      if (data.reply) history.push({ role: 'assistant', content: reply });
    } catch (err) {
      typing.remove();
      addMsg('bot', 'Could not reach the assistant. Please try again.');
    }
    sendBtn.disabled = false;
  });
})();
</script>
`;

// ── SHARED LAYOUT ──
function baseStyles() {
  return `
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
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--white);
  color: var(--black);
  line-height: 1.6;
  overflow-x: hidden;
}
a { color: inherit; }
img { max-width: 100%; display: block; }
.site-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 1rem 4vw;
  background: rgba(250,250,248,.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { display: flex; align-items: center; gap: .75rem; text-decoration: none; }
.nav-logo img { height: 44px; width: auto; }
.nav-logo span {
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.15rem; letter-spacing: -.02em;
}
.nav-links { display: flex; gap: 1.5rem; list-style: none; align-items: center; }
.nav-links a {
  text-decoration: none; font-size: .92rem; color: var(--charcoal);
  transition: color .2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--pink); }
.nav-actions { display: flex; align-items: center; gap: .75rem; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  padding: .85rem 1.4rem; border-radius: 999px; text-decoration: none;
  font-size: .88rem; font-weight: 500; border: 1.5px solid transparent;
  transition: transform .2s, background .2s, color .2s, border-color .2s; cursor: pointer;
}
.btn:hover { transform: translateY(-1px); }
.btn-dark { background: var(--black); color: var(--white); }
.btn-dark:hover { background: #2a2a2a; }
.btn-pink { background: var(--pink); color: #fff; }
.btn-pink:hover { background: #c96b88; }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--black); }
.btn-ghost:hover { border-color: var(--black); }
.btn-outline-light { background: transparent; border-color: rgba(255,255,255,.5); color: #fff; }
.cart-link {
  position: relative; width: 44px; height: 44px; border-radius: 50%;
  display: grid; place-items: center; text-decoration: none;
  border: 1px solid var(--border); background: var(--white); font-size: 1.1rem;
}
.cart-count {
  position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px;
  padding: 0 5px; border-radius: 999px; background: var(--pink); color: #fff;
  font-size: 11px; font-weight: 600; display: grid; place-items: center;
}
.page-hero {
  padding: 4.5rem 4vw 2.5rem;
  background:
    radial-gradient(ellipse 80% 60% at 10% 0%, rgba(214,125,154,.18), transparent 55%),
    radial-gradient(ellipse 70% 50% at 90% 20%, rgba(200,213,176,.25), transparent 50%),
    linear-gradient(180deg, var(--cream), var(--white));
}
.page-hero h1 {
  font-family: 'Fraunces', serif; font-weight: 900; letter-spacing: -.03em;
  font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1.05; margin-bottom: .75rem;
}
.page-hero h1 em { font-style: italic; font-weight: 300; color: var(--pink); }
.page-hero p { color: var(--muted); max-width: 36rem; font-size: 1.05rem; }
.section { padding: 4rem 4vw; }
.section-label {
  font-size: .75rem; letter-spacing: .16em; text-transform: uppercase;
  color: var(--muted); margin-bottom: .6rem;
}
.section-title {
  font-family: 'Fraunces', serif; font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700; letter-spacing: -.02em; margin-bottom: 1.5rem;
}
.section-title em { font-style: italic; font-weight: 300; color: var(--pink); }
.product-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background: #fff; border: 1px solid var(--border); border-radius: 18px;
  overflow: hidden; text-decoration: none; color: inherit;
  transition: transform .25s, box-shadow .25s; display: flex; flex-direction: column;
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.08); }
.product-thumb {
  aspect-ratio: 4/3; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.product-thumb img { width: 100%; height: 100%; object-fit: cover; }
.product-thumb-label {
  font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 300;
  color: rgba(255,255,255,.92); letter-spacing: .04em; text-shadow: 0 2px 12px rgba(0,0,0,.25);
}
.mock-cafe { background: linear-gradient(135deg, #6B4226, #C8A07A); }
.mock-beauty { background: linear-gradient(135deg, #C8A09A, #F5EAE8); }
.mock-tradie { background: linear-gradient(135deg, #2C3E2D, #7A8F7A); }
.mock-yoga { background: linear-gradient(135deg, #8B9D7F, #E0EAD8); }
.mock-boutique { background: linear-gradient(135deg, #BFA080, #EDE0D0); }
.mock-coaching { background: linear-gradient(135deg, #D4A8BE, #F5EAF0); }
.badge {
  position: absolute; top: .85rem; font-size: .68rem; font-weight: 600;
  letter-spacing: .08em; text-transform: uppercase; padding: .3rem .65rem; border-radius: 999px;
}
.badge-platform { left: .85rem; background: rgba(255,255,255,.92); color: var(--black); }
.badge-sale { right: .85rem; background: var(--black); color: #fff; }
.product-info { padding: 1.1rem 1.15rem 1.35rem; display: flex; flex-direction: column; gap: .35rem; flex: 1; }
.product-niche { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.product-name { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 700; }
.product-price { display: flex; align-items: baseline; gap: .5rem; margin: .35rem 0 .7rem; }
.price-current { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 700; }
.price-original { font-size: .9rem; color: var(--muted); text-decoration: line-through; }
.filters {
  display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.5rem 0 2rem;
}
.filter-btn {
  border: 1px solid var(--border); background: #fff; border-radius: 999px;
  padding: .55rem 1rem; font-family: inherit; font-size: .82rem; cursor: pointer;
  color: var(--muted); transition: .2s;
}
.filter-btn:hover, .filter-btn.active { background: var(--black); color: #fff; border-color: var(--black); }
.site-footer {
  margin-top: 3rem; padding: 3.5rem 4vw 2rem;
  background: var(--black); color: rgba(255,255,255,.78);
}
.footer-grid {
  display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 2rem;
  max-width: 1200px; margin: 0 auto 2.5rem;
}
.footer-brand img { height: 52px; margin-bottom: .8rem; }
.footer-brand strong {
  display: block; font-family: 'Fraunces', serif; font-size: 1.4rem; color: #fff; margin-bottom: .4rem;
}
.footer-col h4 {
  color: #fff; font-size: .78rem; letter-spacing: .14em; text-transform: uppercase;
  margin-bottom: 1rem;
}
.footer-col ul { list-style: none; display: grid; gap: .55rem; }
.footer-col a { color: rgba(255,255,255,.7); text-decoration: none; font-size: .92rem; }
.footer-col a:hover { color: var(--pink); }
.footer-bottom {
  max-width: 1200px; margin: 0 auto; padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,.1);
  display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  font-size: .85rem; color: rgba(255,255,255,.5);
}
.toast {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(20px);
  background: var(--black); color: #fff; padding: .85rem 1.25rem; border-radius: 999px;
  font-size: .88rem; opacity: 0; pointer-events: none; transition: .3s; z-index: 2000;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.nav-toggle { display: none; background: none; border: 1px solid var(--border); border-radius: 10px; width: 42px; height: 42px; font-size: 1.2rem; }
@media (max-width: 860px) {
  .nav-toggle { display: grid; place-items: center; }
  .nav-links {
    display: none; position: absolute; top: 100%; left: 0; right: 0;
    background: var(--white); flex-direction: column; padding: 1rem 4vw 1.25rem;
    border-bottom: 1px solid var(--border); align-items: flex-start;
  }
  .nav-links.open { display: flex; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
}
`;
}

function cartScript(catalogJson) {
  const catalogLiteral = catalogJson || 'null';
  return `
(function(){
  var KEY='bloomie_cart_v1';
  function read(){ try { return JSON.parse(localStorage.getItem(KEY)||'[]'); } catch(e){ return []; } }
  function write(items){ localStorage.setItem(KEY, JSON.stringify(items)); updateBadge(); }
  function updateBadge(){
    var n = read().reduce(function(s,i){ return s+(i.qty||1); },0);
    document.querySelectorAll('#cartCount').forEach(function(el){ el.textContent=String(n); });
  }
  function toast(msg){
    var t=document.getElementById('toast'); if(!t) return;
    t.textContent=msg; t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, 2200);
  }
  window.BloomieCart = {
    add: function(slug){
      var items=read();
      var found=items.find(function(i){ return i.slug===slug; });
      if(found) found.qty=(found.qty||1)+1; else items.push({slug:slug, qty:1});
      write(items); toast('Added to cart');
    },
    remove: function(slug){ write(read().filter(function(i){ return i.slug!==slug; })); },
    setQty: function(slug, qty){
      qty=Math.max(1, parseInt(qty,10)||1);
      write(read().map(function(i){ return i.slug===slug ? Object.assign({},i,{qty:qty}) : i; }));
    },
    clear: function(){ write([]); },
    items: function(){ return read(); }
  };
  updateBadge();
  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('[data-add-cart]');
    if(!btn) return;
    e.preventDefault();
    window.BloomieCart.add(btn.getAttribute('data-add-cart'));
  });

  var catalog = ${catalogLiteral};
  function bySlug(slug){
    if(!catalog) return null;
    return catalog.find(function(t){ return t.slug===slug; });
  }
  function renderCart(){
    var root=document.getElementById('cartRoot');
    if(!root || !catalog) return;
    var items=window.BloomieCart.items();
    if(!items.length){
      root.innerHTML='<div class="cart-empty"><h2 style="font-family:Fraunces,serif;margin-bottom:.5rem;">Your cart is empty</h2><p style="color:var(--muted);margin-bottom:1.25rem;">Browse the shop and add a template to get started.</p><a class="btn btn-pink" href="/shop">Continue shopping</a></div>';
      return;
    }
    var total=0;
    var rows=items.map(function(item){
      var t=bySlug(item.slug); if(!t) return '';
      var line=t.price*(item.qty||1); total+=line;
      var thumb=t.image
        ? '<div class="cart-thumb"><img src="'+t.image+'" alt="'+t.name+'"></div>'
        : '<div class="cart-thumb product-thumb '+t.mockClass+'"></div>';
      return '<div class="cart-row" data-slug="'+t.slug+'">'+
        thumb+
        '<div class="cart-meta"><h3><a href="/templates/'+t.slug+'" style="text-decoration:none;">'+t.name+'</a></h3><p>'+t.platform+' · '+t.niche+'</p>'+
        '<div style="margin-top:.55rem;"><input class="qty" type="number" min="1" value="'+(item.qty||1)+'" data-qty="'+t.slug+'">'+
        '<button class="btn btn-ghost" type="button" data-remove="'+t.slug+'" style="padding:.45rem .8rem;font-size:.8rem;">Remove</button></div></div>'+
        '<div style="font-family:Fraunces,serif;font-weight:700;">$'+line+' AUD</div></div>';
    }).join('');
    root.innerHTML = rows +
      '<div class="cart-summary"><div><div style="font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">Estimated total</div>'+
      '<div style="font-family:Fraunces,serif;font-size:2rem;font-weight:900;">$'+total+' AUD</div></div>'+
      '<div style="display:flex;gap:.6rem;flex-wrap:wrap;">'+
      '<a class="btn btn-ghost" href="/shop">Keep shopping</a>'+
      '<a class="btn btn-pink" href="${ETSY_SHOP}" target="_blank" rel="noopener">Checkout on Etsy →</a>'+
      '</div></div>'+
      '<p class="cart-note">Bloomie House uses Etsy for payment &amp; delivery. Your cart here is a shopping list — open Etsy to complete purchase for each template (or browse the full shop).</p>';

    root.querySelectorAll('[data-remove]').forEach(function(btn){
      btn.addEventListener('click', function(){ window.BloomieCart.remove(btn.dataset.remove); renderCart(); });
    });
    root.querySelectorAll('[data-qty]').forEach(function(input){
      input.addEventListener('change', function(){ window.BloomieCart.setQty(input.dataset.qty, input.value); renderCart(); });
    });
  }

  function onReady(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  onReady(function(){
    updateBadge();
    var toggle=document.getElementById('navToggle');
    var links=document.getElementById('navLinks');
    if(toggle && links) toggle.addEventListener('click', function(){ links.classList.toggle('open'); });
    renderCart();
  });
})();`;
}

function layout(title, description, canonical, bodyHtml, active = '', cartCatalogJson = null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${LOGO}">
  <meta property="og:url" content="${SITE}${canonical}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${SITE}${canonical}">
  <link rel="icon" type="image/png" href="${LOGO}">
  <link rel="apple-touch-icon" href="${LOGO}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,300;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>${baseStyles()}</style>
</head>
<body>
  ${siteNav(active)}
  ${bodyHtml}
  ${siteFooter()}
  <div class="toast" id="toast" role="status"></div>
  <script>${cartScript(cartCatalogJson)}</script>
</body>
</html>`;
}

function siteNav(active) {
  const link = (href, label, key) =>
    `<li><a href="${href}" class="${active === key ? 'active' : ''}">${label}</a></li>`;
  return `
<nav class="site-nav" aria-label="Primary">
  <a class="nav-logo" href="/">
    <img src="${LOGO}" alt="Bloomie House">
    <span>Bloomie House</span>
  </a>
  <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
  <ul class="nav-links" id="navLinks">
    ${link('/shop', 'Shop', 'shop')}
    ${link('/services', 'Services', 'services')}
    ${link('/about', 'About', 'about')}
    ${link('/contact', 'Contact', 'contact')}
  </ul>
  <div class="nav-actions">
    <a class="btn btn-ghost" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Book Now</a>
    <a class="cart-link" href="/cart" aria-label="Cart">
      🛒<span class="cart-count" id="cartCount">0</span>
    </a>
  </div>
</nav>`;
}

function siteFooter() {
  return `
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="${LOGO}" alt="Bloomie House">
      <strong>Bloomie House</strong>
      <p>Premium website templates &amp; done-for-you design for Australian small businesses. Based in Hobart.</p>
      <p style="margin-top:1rem"><a href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a></p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="/shop">All Templates</a></li>
        <li><a href="/shop?platform=wix">Wix Studio</a></li>
        <li><a href="/shop?platform=shopify">Shopify</a></li>
        <li><a href="/shop?platform=canva">Canva</a></li>
        <li><a href="${ETSY_SHOP}" target="_blank" rel="noopener">Etsy Store</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="/services">One Day Website</a></li>
        <li><a href="/full-custom">Full Custom Build</a></li>
        <li><a href="/contact">Free Chat</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="${ETSY_ALT}" target="_blank" rel="noopener">Bloomie Lash</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Bloomie House</span>
    <span>Hobart, Australia · English &amp; Vietnamese</span>
  </div>
</footer>`;
}

function productCard(t) {
  const thumb = t.images?.[0]
    ? `<img src="${t.images[0]}" alt="${t.name}">`
    : `<div class="product-thumb-label">${t.name}</div>`;
  return `
<a class="product-card" href="/templates/${t.slug}" data-platform="${t.category}">
  <div class="product-thumb ${t.mockClass}" style="${t.images ? 'background:none;' : ''}">
    ${thumb}
    <span class="badge badge-platform">${t.platform}</span>
    <span class="badge badge-sale">${t.badge}</span>
  </div>
  <div class="product-info">
    <div class="product-niche">${t.niche}</div>
    <div class="product-name">${t.name}</div>
    <div class="product-price">
      <span class="price-current">$${t.price} AUD</span>
      ${t.originalPrice ? `<span class="price-original">$${t.originalPrice}</span>` : ''}
    </div>
    <span class="btn btn-dark" style="margin-top:auto;width:100%;border-radius:12px;">View details</span>
  </div>
</a>`;
}

// ── PAGES ──
function homePage() {
  const featured = templateData.slice(0, 6).map(productCard).join('');
  const body = `
<section class="page-hero" style="min-height:78vh;display:flex;flex-direction:column;justify-content:center;">
  <p class="section-label">Template shop · Est. 2025</p>
  <h1>Bloomie House<br><em>for online</em> success.</h1>
  <p>Premium Wix Studio, Shopify &amp; Canva templates for cafes, beauty studios, tradies, boutiques &amp; beyond. Buy, personalise, launch — this week.</p>
  <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem;">
    <a class="btn btn-pink" href="/shop">Browse Templates →</a>
    <a class="btn btn-ghost" href="/services">Need us to set it up?</a>
  </div>
</section>

<section class="section">
  <p class="section-label">Shop the collection</p>
  <h2 class="section-title">Find your <em>perfect</em> template</h2>
  <div class="product-grid">${featured}</div>
  <div style="text-align:center;margin-top:2rem;">
    <a class="btn btn-dark" href="/shop">View all templates →</a>
  </div>
</section>

<section class="section" style="background:var(--cream);">
  <p class="section-label">Done-for-you</p>
  <h2 class="section-title">Services that <em>ship</em> fast</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;">
    <article style="background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.6rem;">
      <h3 style="font-family:Fraunces,serif;font-size:1.4rem;margin-bottom:.4rem;">DIY Template</h3>
      <p style="color:var(--muted);margin-bottom:1rem;">From $37 AUD · Instant download</p>
      <a class="btn btn-ghost" href="/shop">Shop templates</a>
    </article>
    <article style="background:var(--black);color:#fff;border-radius:18px;padding:1.6rem;">
      <h3 style="font-family:Fraunces,serif;font-size:1.4rem;margin-bottom:.4rem;">One Day Website</h3>
      <p style="opacity:.75;margin-bottom:1rem;">$397 AUD · Live in 24 hours</p>
      <a class="btn btn-pink" href="/services">Book now →</a>
    </article>
    <article style="background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.6rem;">
      <h3 style="font-family:Fraunces,serif;font-size:1.4rem;margin-bottom:.4rem;">Full Custom</h3>
      <p style="color:var(--muted);margin-bottom:1rem;">From $897 AUD · Built from scratch</p>
      <a class="btn btn-ghost" href="/full-custom">Let's chat</a>
    </article>
  </div>
</section>

<section class="section" style="text-align:center;">
  <h2 class="section-title">Ready when <em>you</em> are</h2>
  <p style="color:var(--muted);max-width:32rem;margin:0 auto 1.5rem;">Add templates to your cart, then checkout securely on Etsy — or book a discovery call for done-for-you setup.</p>
  <div style="display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/shop">Shop templates</a>
    <a class="btn btn-ghost" href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a>
  </div>
</section>`;
  return layout(
    'Bloomie House — Website Templates for Brands That Mean Business',
    'Premium Wix Studio & Shopify website templates for cafes, beauty studios, tradies, boutiques & more. Buy, personalise, launch — this week. Based in Hobart, Australia.',
    '/',
    body,
    'home'
  );
}

function shopPage(platform) {
  const active = (platform || 'all').toLowerCase();
  const cards = templateData.map(productCard).join('');
  const body = `
<section class="page-hero">
  <p class="section-label">Template shop</p>
  <h1>Shop <em>templates</em></h1>
  <p>Premium website templates for Australian small businesses. Filter by platform, open a product page, add to cart, then checkout on Etsy.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="filters" id="shopFilters">
    <button class="filter-btn ${active === 'all' ? 'active' : ''}" data-filter="all">All</button>
    <button class="filter-btn ${active === 'wix' ? 'active' : ''}" data-filter="wix">Wix Studio</button>
    <button class="filter-btn ${active === 'shopify' ? 'active' : ''}" data-filter="shopify">Shopify</button>
    <button class="filter-btn ${active === 'canva' ? 'active' : ''}" data-filter="canva">Canva</button>
  </div>
  <div class="product-grid" id="shopGrid">${cards}</div>
</section>
<script>
(function(){
  var buttons=document.querySelectorAll('#shopFilters .filter-btn');
  var cards=document.querySelectorAll('#shopGrid .product-card');
  function apply(f){
    buttons.forEach(function(b){ b.classList.toggle('active', b.dataset.filter===f); });
    cards.forEach(function(c){
      c.style.display = (f==='all' || c.dataset.platform===f) ? '' : 'none';
    });
    var url=new URL(window.location.href);
    if(f==='all') url.searchParams.delete('platform'); else url.searchParams.set('platform', f);
    history.replaceState(null,'',url);
  }
  buttons.forEach(function(b){ b.addEventListener('click', function(){ apply(b.dataset.filter); }); });
  apply('${active}');
})();
</script>`;
  return layout(
    'Shop Templates — Bloomie House',
    'Browse premium Wix Studio, Shopify & Canva website templates from $37 AUD. Instant download via Etsy.',
    '/shop',
    body,
    'shop'
  );
}

function productPage(t) {
  const galleryMain = t.images?.[0]
    ? `<img id="mainImg" src="${t.images[0]}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<span class="product-thumb-label" style="font-size:2.4rem;">${t.name}</span>`;
  const thumbs = t.images
    ? t.images
        .map(
          (src, i) =>
            `<button type="button" class="thumb-btn" data-src="${src}" style="border:none;padding:0;border-radius:12px;overflow:hidden;cursor:pointer;opacity:${i === 0 ? 1 : 0.65};"><img src="${src}" alt="${t.name} ${i + 1}" style="width:100%;aspect-ratio:4/3;object-fit:cover;"></button>`
        )
        .join('')
    : '';
  const related = templateData
    .filter((x) => x.slug !== t.slug)
    .slice(0, 3)
    .map(productCard)
    .join('');

  const body = `
<style>
  .pdp { display:grid; grid-template-columns:1.05fr .95fr; gap:3rem; padding:3rem 4vw 4rem; max-width:1200px; margin:0 auto; align-items:start; }
  .pdp-main { aspect-ratio:4/3; border-radius:20px; overflow:hidden; border:1px solid var(--border); }
  .pdp-thumbs { display:grid; grid-template-columns:repeat(3,1fr); gap:.6rem; margin-top:.75rem; }
  .breadcrumb { font-size:.85rem; color:var(--muted); margin-bottom:1rem; }
  .breadcrumb a { color:var(--muted); text-decoration:none; }
  .breadcrumb a:hover { color:var(--pink); }
  .pdp-actions { display:flex; flex-wrap:wrap; gap:.7rem; margin:1.5rem 0 1rem; }
  .pdp-features { margin-top:1.75rem; }
  .pdp-features h3 { font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; margin-bottom:.8rem; }
  .pdp-features ul { list-style:none; display:grid; gap:.55rem; }
  .pdp-features li { display:flex; gap:.55rem; align-items:flex-start; color:var(--charcoal); }
  .pdp-features li::before { content:'✦'; color:var(--pink); font-size:.7rem; margin-top:.35rem; }
  @media (max-width:900px){ .pdp { grid-template-columns:1fr; gap:1.75rem; padding-top:1.5rem; } }
</style>
<div class="pdp">
  <div>
    <div class="pdp-main product-thumb ${t.mockClass}" style="${t.images ? 'background:none;display:block;' : ''}">${galleryMain}</div>
    ${thumbs ? `<div class="pdp-thumbs">${thumbs}</div>` : ''}
  </div>
  <div>
    <div class="breadcrumb"><a href="/shop">Shop</a> / ${t.name}</div>
    <p class="product-niche">${t.niche}</p>
    <h1 style="font-family:Fraunces,serif;font-size:clamp(2.2rem,4vw,3.4rem);font-weight:900;letter-spacing:-.03em;line-height:1.05;margin:.4rem 0 1rem;">${t.name}</h1>
    <span class="badge badge-platform" style="position:static;display:inline-block;margin-bottom:1rem;">${t.platform}</span>
    <div class="product-price">
      <span class="price-current" style="font-size:1.8rem;">$${t.price} AUD</span>
      ${t.originalPrice ? `<span class="price-original">$${t.originalPrice}</span>` : ''}
      <span class="badge badge-sale" style="position:static;">${t.badge}</span>
    </div>
    <p style="color:var(--muted);line-height:1.8;margin-top:.5rem;">${t.description}</p>
    <div class="pdp-actions">
      <button class="btn btn-pink" data-add-cart="${t.slug}">Add to cart</button>
      <a class="btn btn-dark" href="${t.etsy}" target="_blank" rel="noopener">Buy now on Etsy →</a>
      <a class="btn btn-ghost" href="/cart">View cart</a>
    </div>
    <p style="font-size:.85rem;color:var(--muted);">Instant delivery via Etsy · setup guide included · 30-day email support</p>
    <div class="pdp-features">
      <h3>What's included</h3>
      <ul>${t.features.map((f) => `<li>${f}</li>`).join('')}</ul>
    </div>
  </div>
</div>
<section class="section" style="padding-top:0;">
  <h2 class="section-title">You may also <em>like</em></h2>
  <div class="product-grid">${related}</div>
</section>
<script>
document.querySelectorAll('.thumb-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var img=document.getElementById('mainImg');
    if(img) img.src=btn.dataset.src;
    document.querySelectorAll('.thumb-btn').forEach(function(b){ b.style.opacity='0.65'; });
    btn.style.opacity='1';
  });
});
</script>`;
  return layout(
    `${t.name} — Bloomie House`,
    t.description,
    `/templates/${t.slug}`,
    body,
    'shop'
  );
}

function cartPage() {
  const catalogJson = JSON.stringify(
    templateData.map((t) => ({
      slug: t.slug,
      name: t.name,
      price: t.price,
      niche: t.niche,
      platform: t.platform,
      etsy: t.etsy,
      image: t.images?.[0] || null,
      mockClass: t.mockClass,
    }))
  );
  const body = `
<style>
  .cart-wrap { max-width: 980px; margin: 0 auto; padding: 2rem 4vw 4rem; }
  .cart-empty { text-align:center; padding: 3rem 1rem; background: var(--cream); border-radius: 20px; }
  .cart-row {
    display:grid; grid-template-columns: 96px 1fr auto; gap: 1rem; align-items:center;
    padding: 1rem 0; border-bottom: 1px solid var(--border);
  }
  .cart-thumb { width:96px; height:72px; border-radius:12px; overflow:hidden; }
  .cart-thumb img { width:100%; height:100%; object-fit:cover; }
  .cart-meta h3 { font-family:Fraunces,serif; font-size:1.15rem; }
  .cart-meta p { color:var(--muted); font-size:.85rem; }
  .qty {
    width: 64px; padding: .45rem .5rem; border:1px solid var(--border); border-radius:10px;
    font-family:inherit; margin-right:.5rem;
  }
  .cart-summary {
    margin-top: 1.75rem; padding: 1.5rem; border-radius: 18px; background: var(--cream);
    display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; align-items:center;
  }
  .cart-note { font-size:.9rem; color:var(--muted); max-width: 34rem; margin-top:1rem; }
</style>
<section class="page-hero">
  <p class="section-label">Your bag</p>
  <h1>Cart</h1>
  <p>Save templates here, then checkout on Etsy for secure payment and instant download.</p>
</section>
<div class="cart-wrap">
  <div id="cartRoot"><p style="color:var(--muted);">Loading cart…</p></div>
</div>`;
  return layout(
    'Cart — Bloomie House',
    'Review your Bloomie House templates before checking out on Etsy.',
    '/cart',
    body,
    'shop',
    catalogJson
  );
}

function servicesPage() {
  const body = `
<section class="page-hero">
  <p class="section-label">Done-for-you</p>
  <h1>Website <em>design</em> services</h1>
  <p>Prefer we handle the setup? Book a discovery call for One Day Website ($397) or chat about a full custom build.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin-bottom:3rem;">
    <article style="border:1px solid var(--border);border-radius:18px;padding:1.6rem;background:#fff;">
      <h2 style="font-family:Fraunces,serif;font-size:1.5rem;">One Day Website</h2>
      <p style="font-family:Fraunces,serif;font-size:2rem;font-weight:900;margin:.5rem 0;">$397 <span style="font-size:1rem;color:var(--muted);text-decoration:line-through;font-weight:400;">$497</span></p>
      <p style="color:var(--muted);margin-bottom:1rem;">We install &amp; personalise a template for your brand — live in ~24 hours.</p>
      <a class="btn btn-pink" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Book now →</a>
    </article>
    <article style="border:1px solid var(--border);border-radius:18px;padding:1.6rem;background:var(--black);color:#fff;">
      <h2 style="font-family:Fraunces,serif;font-size:1.5rem;">Full Custom</h2>
      <p style="font-family:Fraunces,serif;font-size:2rem;font-weight:900;margin:.5rem 0;">From $897</p>
      <p style="opacity:.75;margin-bottom:1rem;">Built from scratch — up to 6 pages, strategy session, SEO foundation, 30 days support.</p>
      <a class="btn btn-pink" href="/full-custom">View details →</a>
    </article>
    <article style="border:1px solid var(--border);border-radius:18px;padding:1.6rem;background:#fff;">
      <h2 style="font-family:Fraunces,serif;font-size:1.5rem;">DIY Templates</h2>
      <p style="font-family:Fraunces,serif;font-size:2rem;font-weight:900;margin:.5rem 0;">From $37</p>
      <p style="color:var(--muted);margin-bottom:1rem;">Buy a template, personalise it yourself, launch this week.</p>
      <a class="btn btn-ghost" href="/shop">Browse shop</a>
    </article>
  </div>
  <h2 class="section-title" style="text-align:center;">Discovery <em>form</em></h2>
  <p style="text-align:center;color:var(--muted);max-width:36rem;margin:0 auto 1.5rem;">Tell us about your business and we’ll recommend the right path.</p>
  <div style="max-width:900px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:18px;padding:1rem;overflow:hidden;">
    <iframe
      id="JotFormIFrame-243655997068176"
      title="Website Design Discovery Form"
      allow="geolocation; microphone; camera; fullscreen"
      src="${JOTFORM_DISCOVERY}"
      style="min-width:100%;max-width:100%;height:640px;border:none;"
    ></iframe>
  </div>
</section>`;
  return layout(
    'Website Design Services — Bloomie House',
    'One Day Website from $397 and full custom builds from $897. Wix Studio & Shopify specialists in Hobart, Australia.',
    '/services',
    body,
    'services'
  );
}

function fullCustomPage() {
  const body = `
<section class="page-hero">
  <p class="section-label">Bespoke</p>
  <h1>Full <em>custom</em> build</h1>
  <p>Built from scratch for your brand — your vision, your voice, no template limits. From $897 AUD.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2.5rem;">
    ${[
      ['Custom design', 'Unique layouts tailored to your brand'],
      ['Up to 6 pages', 'Home, About, Services, Portfolio & more'],
      ['SEO foundation', 'Structure that helps you get found'],
      ['30 days support', 'Post-launch help when you need it'],
    ]
      .map(
        ([h, p]) =>
          `<div style="background:var(--cream);border-radius:16px;padding:1.25rem;"><h3 style="font-family:Fraunces,serif;margin-bottom:.35rem;">${h}</h3><p style="color:var(--muted);font-size:.95rem;">${p}</p></div>`
      )
      .join('')}
  </div>
  <div style="max-width:900px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:18px;padding:1rem;">
    <script type="text/javascript" src="${JOTFORM_CUSTOM}"><\/script>
  </div>
</section>`;
  return layout(
    'Full Custom Website Build — Bloomie House',
    'Get a fully custom website built from scratch. Up to 6 pages, brand strategy, SEO foundation & 30 days support. From $897 AUD.',
    '/full-custom',
    body,
    'services'
  );
}

function contactPage() {
  const body = `
<section class="page-hero">
  <p class="section-label">Say hello</p>
  <h1>Get in <em>touch</em></h1>
  <p>Questions about a template, One Day Website, or a custom project? We’d love to hear from you.</p>
</section>
<section class="section" style="padding-top:1rem;max-width:720px;margin:0 auto;">
  <div style="background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.75rem;">
    <div id="formMessage" style="display:none;padding:.9rem 1rem;border-radius:12px;margin-bottom:1rem;"></div>
    <form id="contactForm">
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Name *
        <input required name="name" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:12px;font:inherit;background:var(--cream);">
      </label>
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Email *
        <input required type="email" name="email" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:12px;font:inherit;background:var(--cream);">
      </label>
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Service interest
        <select name="service" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:12px;font:inherit;background:var(--cream);">
          <option value="">Select…</option>
          <option value="template">Template purchase</option>
          <option value="one-day">One Day Website</option>
          <option value="custom">Custom build</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label style="display:block;margin-bottom:1.25rem;font-size:.9rem;">Message *
        <textarea required name="message" rows="5" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:12px;font:inherit;background:var(--cream);resize:vertical;"></textarea>
      </label>
      <button class="btn btn-pink" type="submit" style="width:100%;">Send message</button>
    </form>
  </div>
  <p style="text-align:center;margin-top:1.5rem;color:var(--muted);">
    Or email <a href="mailto:hello@bloomiehouse.com.au" style="color:var(--pink);">hello@bloomiehouse.com.au</a> · English &amp; Vietnamese
  </p>
</section>
<script>
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  var msg=document.getElementById('formMessage');
  msg.style.display='block';
  msg.style.background='#e8f5e9';
  msg.style.color='#1b5e20';
  msg.textContent='Thanks! We will get back to you soon. For faster replies, email hello@bloomiehouse.com.au.';
  e.target.reset();
});
</script>`;
  return layout(
    'Contact — Bloomie House',
    'Contact Bloomie House about templates, One Day Website, or custom web design. Based in Hobart, Australia.',
    '/contact',
    body,
    'contact'
  );
}

function aboutPage() {
  const body = `
<section class="page-hero">
  <p class="section-label">Our story</p>
  <h1>About <em>Bloomie</em> House</h1>
  <p>We’re a Hobart-based studio helping small businesses look polished online — without the agency price tag or endless timelines.</p>
</section>
<section class="section" style="max-width:760px;margin:0 auto;">
  <p style="font-size:1.1rem;color:var(--charcoal);line-height:1.85;margin-bottom:1.25rem;">
    Bloomie House started from a simple idea: beautiful websites shouldn’t take months or cost a fortune. We design premium templates for real Australian businesses — cafes, beauty studios, tradies, boutiques — and offer done-for-you setup when you want us to handle the details.
  </p>
  <p style="color:var(--muted);line-height:1.85;margin-bottom:2rem;">
    Shop templates for instant download, book a One Day Website, or start a full custom build. Either way, you’ll launch looking like you meant it.
  </p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/shop">Shop templates</a>
    <a class="btn btn-ghost" href="/services">View services</a>
  </div>
</section>`;
  return layout(
    'About — Bloomie House',
    'Bloomie House is a Hobart studio selling premium website templates and done-for-you web design for Australian small businesses.',
    '/about',
    body,
    'about'
  );
}

function notFoundPage() {
  const body = `
<section class="page-hero" style="text-align:center;min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <h1>Page not <em>found</em></h1>
  <p style="margin-bottom:1.5rem;">That link doesn’t exist — try the shop or head home.</p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center;">
    <a class="btn btn-pink" href="/shop">Go to shop</a>
    <a class="btn btn-ghost" href="/">Home</a>
  </div>
</section>`;
  return layout('Not Found — Bloomie House', 'Page not found.', '/404', body, '');
}
