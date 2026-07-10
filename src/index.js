/**
 * Bloomie House — Cloudflare Worker
 * Ecommerce-style multi-page site (templates shop + services)
 */

const LOGO =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-lash-pink-background-transparent.png';
const LOGO_LONG =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-long-house-green-background-transparent.png';
const ETSY_SHOP = 'https://bloomlashbar.etsy.com';
const ETSY_ALT = 'https://bloomlashbar.etsy.com';
const ETSY_KOREAN_LASH_MANUAL = 'https://bloomlashbar.etsy.com';
const JOTFORM_DISCOVERY = 'https://form.jotform.com/haiyen0304/website-design-discovery';
const JOTFORM_CUSTOM = 'https://form.jotform.com/jsform/253192865445869';
const SITE = 'https://bloomiehouse.com.au';

const MOCK = '/mockups';

const templateData = [
  {
    slug: 'korean-lash-lift-training-manual',
    name: 'Korean Lash Lift & Tint Training Manual',
    niche: 'Lash Training',
    platform: 'Canva',
    category: 'canva',
    badge: 'Bestseller',
    price: 10.48,
    originalPrice: 52.4,
    mockClass: 'mock-beauty',
    images: [
      `${MOCK}/korean-lash-lift-hero.jpg`,
      `${MOCK}/korean-lash-lift-pages.jpg`,
      `${MOCK}/korean-lash-lift-inside.jpg`,
      `${MOCK}/korean-lash-lift-features.jpg`,
    ],
    description:
      'A professional 200+ page Canva training manual for Korean lash lift & tint educators. Fully editable — add your logo, brand your academy, and start teaching with resell-ready curriculum.',
    features: [
      '200+ page editable Canva manual',
      'Korean lash lift & tint curriculum',
      'Resell rights for trainers & academies',
      'Theory, technique & aftercare sections',
      'Instant digital delivery via Etsy',
    ],
    etsy: ETSY_KOREAN_LASH_MANUAL,
  },
  {
    slug: 'wedding-rsvp',
    name: 'Wedding Invitation RSVP',
    niche: 'Wedding & Events',
    platform: 'Canva',
    category: 'canva',
    badge: 'New',
    price: 47,
    originalPrice: 67,
    mockClass: 'mock-boutique',
    images: [
      `${MOCK}/wedding-rsvp-promo.jpg`,
      `${MOCK}/wedding-rsvp-burgundy.jpg`,
      `${MOCK}/wedding-gift-tracker.jpg`,
    ],
    description:
      'An aesthetic Canva website template for wedding invitation RSVPs — elegant device mockups, mobile-friendly RSVP pages, and a bonus customisable gift registry tracker. Fully editable in Canva.',
    features: [
      '4–6 page Canva website',
      'Mobile RSVP flow',
      'Bonus gift registry tracker',
      'Elegant serif typography',
      'Fully customisable colours & text',
      'Instant Canva access',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'luxspa-beauty-nails',
    name: 'LuxSpa Beauty & Nails',
    niche: 'Spa & Nail Salon',
    platform: 'Wix Studio',
    category: 'wix',
    badge: 'Bestseller',
    price: 97,
    originalPrice: 127,
    mockClass: 'mock-beauty',
    images: [
      `${MOCK}/luxspa-devices.jpg`,
      `${MOCK}/luxspa-services.jpg`,
      `${MOCK}/luxspa-booking.jpg`,
      `${MOCK}/luxspa-faq.jpg`,
    ],
    description:
      'A soft-luxury spa & nails website with multi-device mockups — service showcase, online booking flow, FAQ, and testimonials. Built for beauty salons that want an elegant booking experience.',
    features: [
      'Online appointment booking',
      'Service showcase & pricing',
      'FAQ accordion section',
      'Testimonials & gallery',
      'Responsive multi-device layout',
      'Book Now CTAs throughout',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'lumina-lash-training',
    name: 'Lumina Lash Training',
    niche: 'Lash Lift Training',
    platform: 'Wix Studio',
    category: 'wix',
    badge: 'New',
    price: 89,
    originalPrice: 119,
    mockClass: 'mock-beauty',
    images: [`${MOCK}/lumina-lash-training.jpg`, `${MOCK}/lumina-courses.jpg`],
    description:
      'A soft-luxury academy template for lash lift training schools. Course curriculum, enrolment CTAs, and trainer-ready layouts — branded as Lumina Lash (not Bloom).',
    features: [
      'Course curriculum pages',
      'Enrolment / training CTAs',
      'Service & pricing blocks',
      'Mobile-optimised layouts',
      'Aesthetic device mockups included',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'seoul-soft-korean-lash',
    name: 'Seoul Soft Korean Lash Lift',
    niche: 'Korean Lash Lift',
    platform: 'Canva',
    category: 'canva',
    badge: 'New',
    price: 49,
    originalPrice: 69,
    mockClass: 'mock-coaching',
    images: [`${MOCK}/seoul-soft-korean.jpg`],
    description:
      'A minimal K-beauty Canva website template for Korean lash lift clinics and freelancers. Soft beige UI, before/after friendly layout, and booking-ready sections under the Seoul Soft brand.',
    features: [
      'Canva website template',
      'K-beauty soft aesthetic',
      'Service menu layout',
      'Booking CTA sections',
      'Fully editable in Canva',
    ],
    etsy: ETSY_SHOP,
  },
  {
    slug: 'lash-brows-academy',
    name: 'Lash & Brows Academy',
    niche: 'Lash & Brows Training',
    platform: 'Wix Studio',
    category: 'wix',
    badge: 'New',
    price: 89,
    originalPrice: 119,
    mockClass: 'mock-beauty',
    images: [
      `${MOCK}/lash-academy-hero.jpg`,
      `${MOCK}/lash-academy-services.jpg`,
      `${MOCK}/lash-academy-courses.jpg`,
      `${MOCK}/lash-academy-about.jpg`,
    ],
    description:
      'A soft-luxury website template for lash & brows academies and beauty educators. Hero, services, course enrolment, and trainer story — ready to personalise and launch this week.',
    features: [
      'Hero with academy branding',
      'Services & treatment menu',
      'Course / training enrolment',
      'Trainer story & credentials',
      'Mobile-optimised layouts',
    ],
    etsy: ETSY_SHOP,
  },
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
    slug: 'the-studio',
    name: 'The Studio',
    niche: 'Beauty & Lash Studio',
    platform: 'Wix Studio',
    category: 'wix',
    badge: 'Bestseller',
    price: 79,
    originalPrice: 97,
    mockClass: 'mock-beauty',
    images: [`${MOCK}/studio-hero.jpg`, `${MOCK}/studio-services.jpg`],
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
    images: [`${MOCK}/tradie-hero.jpg`],
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
  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  --shadow-border-hover:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  --shadow-lift:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 10px 28px -6px rgba(0, 0, 0, 0.12);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--white);
  color: var(--black);
  line-height: 1.6;
  overflow-x: hidden;
}
a { color: inherit; }
img {
  max-width: 100%;
  display: block;
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px;
}
h1, h2, h3, .section-title, .page-hero h1 { text-wrap: balance; }
p, li, .product-info, .page-hero p { text-wrap: pretty; }
.tabular-nums { font-variant-numeric: tabular-nums; }
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes navEnter {
  from { opacity: 0; transform: translateY(-14px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes glassyFloat {
  0%, 100% { transform: rotateY(-2deg) rotateX(2deg) translateZ(4px); }
  50% { transform: rotateY(2deg) rotateX(-2deg) translateZ(6px); }
}
@keyframes glassySheen {
  0% { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%) skewX(-12deg); }
}
@media (prefers-reduced-motion: no-preference) {
  .product-grid .product-card {
    animation: cardEnter 450ms cubic-bezier(0.2, 0, 0, 1) backwards;
  }
  .product-grid .product-card:nth-child(1) { animation-delay: 0ms; }
  .product-grid .product-card:nth-child(2) { animation-delay: 80ms; }
  .product-grid .product-card:nth-child(3) { animation-delay: 160ms; }
  .product-grid .product-card:nth-child(4) { animation-delay: 240ms; }
  .product-grid .product-card:nth-child(5) { animation-delay: 320ms; }
  .product-grid .product-card:nth-child(6) { animation-delay: 400ms; }
  .product-grid .product-card:nth-child(7) { animation-delay: 480ms; }
  .product-grid .product-card:nth-child(8) { animation-delay: 560ms; }
  .product-grid .product-card:nth-child(9) { animation-delay: 640ms; }
  .product-grid .product-card:nth-child(10) { animation-delay: 720ms; }
  .product-grid .product-card:nth-child(11) { animation-delay: 800ms; }
  .product-grid .product-card:nth-child(12) { animation-delay: 880ms; }
  .page-hero-enter > * {
    animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) backwards;
  }
  .page-hero-enter > *:nth-child(1) { animation-delay: 0ms; }
  .page-hero-enter > *:nth-child(2) { animation-delay: 100ms; }
  .page-hero-enter > *:nth-child(3) { animation-delay: 200ms; }
  .page-hero-enter > *:nth-child(4) { animation-delay: 300ms; }
  .site-nav {
    animation: navEnter 520ms cubic-bezier(0.2, 0, 0, 1) backwards;
  }
  .site-nav .nav-logo { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 60ms backwards; }
  .site-nav .nav-links li:nth-child(1) { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 120ms backwards; }
  .site-nav .nav-links li:nth-child(2) { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 180ms backwards; }
  .site-nav .nav-links li:nth-child(3) { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 240ms backwards; }
  .site-nav .nav-links li:nth-child(4) { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 300ms backwards; }
  .site-nav .nav-actions .btn { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 360ms backwards; }
  .site-nav .nav-actions .cart-link { animation: heroEnter 450ms cubic-bezier(0.2, 0, 0, 1) 420ms backwards; }
  .glassy-3d-inner.is-idle { animation: glassyFloat 7s ease-in-out infinite; }
}
.site-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 1rem 4vw;
  background: rgba(250,250,248,.72);
  backdrop-filter: blur(14px) saturate(1.25);
  -webkit-backdrop-filter: blur(14px) saturate(1.25);
  box-shadow: var(--shadow-border);
  transition-property: padding, background-color, box-shadow, backdrop-filter, transform;
  transition-duration: 280ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.site-nav.is-scrolled {
  padding: .62rem 4vw;
  background: rgba(250,250,248,.86);
  backdrop-filter: blur(22px) saturate(1.45);
  -webkit-backdrop-filter: blur(22px) saturate(1.45);
  box-shadow: var(--shadow-lift);
  transform: translateZ(0);
}
.nav-logo { display: flex; align-items: center; gap: .75rem; text-decoration: none; }
.nav-logo img {
  height: 44px; width: auto;
  transition-property: height, transform;
  transition-duration: 280ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.site-nav.is-scrolled .nav-logo img { height: 38px; }
.nav-logo span {
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.15rem; letter-spacing: -.02em;
  transition-property: font-size, opacity;
  transition-duration: 280ms;
}
.site-nav.is-scrolled .nav-logo span { font-size: 1.05rem; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; align-items: center; }
.nav-links a {
  position: relative; text-decoration: none; font-size: .92rem; color: var(--charcoal);
  transition-property: color, transform;
  transition-duration: 150ms; transition-timing-function: ease-out;
}
.nav-links a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -5px; height: 2px;
  background: var(--pink); border-radius: 999px;
  transform: scaleX(0); transform-origin: left;
  transition-property: transform;
  transition-duration: 200ms; transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.nav-links a:hover, .nav-links a.active { color: var(--pink); }
.nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }
.glassy-3d {
  position: relative; perspective: 1000px; transform-style: preserve-3d;
  width: 100%; height: 100%;
}
.glassy-3d-inner {
  position: relative; width: 100%; height: 100%; transform-style: preserve-3d;
  border-radius: inherit;
  transition-property: transform;
  transition-duration: 320ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.glassy-3d-shine {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 2;
  background: linear-gradient(
    125deg,
    rgba(255,255,255,.55) 0%,
    rgba(255,255,255,.12) 28%,
    transparent 48%,
    rgba(255,255,255,.18) 72%,
    rgba(255,255,255,.4) 100%
  );
  mix-blend-mode: soft-light; opacity: .85;
}
.glassy-3d-sheen {
  position: absolute; inset: -20% -40%; pointer-events: none; z-index: 3;
  background: linear-gradient(105deg, transparent 42%, rgba(255,255,255,.45) 50%, transparent 58%);
  opacity: 0;
}
.glassy-3d:hover .glassy-3d-sheen { opacity: 1; animation: glassySheen 1.1s ease-out; }
.glassy-3d-edge {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 4;
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,.75),
    inset 0 -1px 2px rgba(0,0,0,.06);
}
.glassy-3d img {
  width: 100%; height: 100%; object-fit: cover; border-radius: inherit;
  box-shadow:
    0 22px 44px -14px rgba(0,0,0,.28),
    0 10px 20px -10px rgba(0,0,0,.16);
  transform: translateZ(12px);
}
.glassy-3d-pdp { width: 100%; height: 100%; border-radius: 20px; }
.glassy-3d-pdp .glassy-3d-inner { border-radius: 20px; }
.glassy-3d-pdp img { object-fit: contain; background: var(--cream); }
.glassy-3d-thumb { border-radius: 12px; aspect-ratio: 1/1; }
.glassy-3d-thumb img { object-fit: contain; background: var(--cream); transform: translateZ(6px); }
.nav-actions { display: flex; align-items: center; gap: .75rem; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  padding: .85rem 1.4rem; border-radius: 999px; text-decoration: none;
  font-size: .88rem; font-weight: 500; border: 1.5px solid transparent;
  transition-property: transform, background-color, color, border-color, box-shadow;
  transition-duration: 150ms; transition-timing-function: ease-out; cursor: pointer;
}
.btn:hover { box-shadow: var(--shadow-border-hover); }
.btn:active:not(:disabled) { transform: scale(0.96); }
.btn-dark { background: var(--black); color: var(--white); box-shadow: var(--shadow-border); }
.btn-dark:hover { background: #2a2a2a; }
.btn-pink { background: var(--pink); color: #fff; box-shadow: 0 8px 20px -6px rgba(214,125,154,.45); }
.btn-pink:hover { background: #c96b88; }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--black); box-shadow: var(--shadow-border); }
.btn-ghost:hover { border-color: rgba(0,0,0,.14); }
.btn-outline-light { background: transparent; border-color: rgba(255,255,255,.5); color: #fff; }
.cart-link {
  position: relative; width: 44px; height: 44px; border-radius: 50%;
  display: grid; place-items: center; text-decoration: none;
  box-shadow: var(--shadow-border); background: var(--white); font-size: 1.1rem;
  transition-property: transform, box-shadow;
  transition-duration: 150ms; transition-timing-function: ease-out;
}
.cart-link:active { transform: scale(0.96); }
.cart-count {
  position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px;
  padding: 0 5px; border-radius: 999px; background: var(--pink); color: #fff;
  font-size: 11px; font-weight: 600; display: grid; place-items: center;
  font-variant-numeric: tabular-nums;
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
  background: #fff; border: none; border-radius: 20px;
  overflow: visible; text-decoration: none; color: inherit;
  box-shadow: var(--shadow-border);
  transition-property: transform, box-shadow;
  transition-duration: 200ms; transition-timing-function: ease-out;
  display: flex; flex-direction: column;
}
.product-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); }
.product-card:active { transform: scale(0.985); }
.product-thumb {
  aspect-ratio: 1/1; position: relative; overflow: visible;
  display: flex; align-items: center; justify-content: center;
  background: var(--cream); perspective: 1000px;
  border-radius: 20px 20px 0 0;
}
.product-thumb .glassy-3d { position: absolute; inset: 0; border-radius: 20px 20px 0 0; overflow: hidden; }
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
.product-info {
  padding: 1.1rem 1.15rem 1.35rem; display: flex; flex-direction: column; gap: .35rem; flex: 1;
  background: #fff; border-radius: 0 0 20px 20px;
}
.product-niche { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.product-name { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 700; }
.product-price { display: flex; align-items: baseline; gap: .5rem; margin: .35rem 0 .7rem; }
.price-current {
  font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.price-original { font-size: .9rem; color: var(--muted); text-decoration: line-through; font-variant-numeric: tabular-nums; }
.filters {
  display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.5rem 0 2rem;
}
.filter-btn {
  border: none; background: #fff; border-radius: 999px;
  padding: .55rem 1rem; font-family: inherit; font-size: .82rem; cursor: pointer;
  color: var(--muted); box-shadow: var(--shadow-border);
  transition-property: background-color, color, box-shadow, transform;
  transition-duration: 150ms; transition-timing-function: ease-out;
}
.filter-btn:hover, .filter-btn.active { background: var(--black); color: #fff; box-shadow: none; }
.filter-btn:active { transform: scale(0.96); }
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
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(12px);
  background: var(--black); color: #fff; padding: .85rem 1.25rem; border-radius: 999px;
  font-size: .88rem; opacity: 0; pointer-events: none; z-index: 2000;
  transition-property: opacity, transform;
  transition-duration: 200ms; transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.nav-toggle {
  display: none; background: none; border: none; border-radius: 10px; width: 42px; height: 42px;
  font-size: 1.2rem; box-shadow: var(--shadow-border); cursor: pointer;
  transition-property: transform, box-shadow; transition-duration: 150ms;
}
.nav-toggle:active { transform: scale(0.96); }
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
        '<button class="btn btn-ghost" type="button" data-remove="'+t.slug+'" style="padding:.45rem .8rem;font-size:.8rem;">Remove</button>'+
        (t.etsy ? '<a class="btn btn-ghost" href="'+t.etsy+'" target="_blank" rel="noopener" style="padding:.45rem .8rem;font-size:.8rem;margin-left:.35rem;">Buy on Etsy →</a>' : '')+
        '</div></div>'+
        '<div class="cart-line-price">$'+line+' AUD</div></div>';
    }).join('');
    var checkoutUrl = '${ETSY_SHOP}';
    if(items.length === 1){
      var one = bySlug(items[0].slug);
      if(one && one.etsy) checkoutUrl = one.etsy;
    }
    root.innerHTML = rows +
      '<div class="cart-summary"><div><div style="font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">Estimated total</div>'+
      '<div class="cart-total">$'+total+' AUD</div></div>'+
      '<div style="display:flex;gap:.6rem;flex-wrap:wrap;">'+
      '<a class="btn btn-ghost" href="/shop">Keep shopping</a>'+
      '<a class="btn btn-pink" href="'+checkoutUrl+'" target="_blank" rel="noopener">Checkout on Etsy →</a>'+
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

function glassyImage(innerHtml, extraClass = '') {
  return `<div class="glassy-3d ${extraClass}">
    <div class="glassy-3d-inner">
      ${innerHtml}
      <span class="glassy-3d-shine" aria-hidden="true"></span>
      <span class="glassy-3d-sheen" aria-hidden="true"></span>
      <span class="glassy-3d-edge" aria-hidden="true"></span>
    </div>
  </div>`;
}

function layoutScript() {
  return `
(function(){
  var nav = document.getElementById('siteNav');
  function onScroll(){
    if(nav) nav.classList.toggle('is-scrolled', window.scrollY > 16);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  document.querySelectorAll('.glassy-3d').forEach(function(el){
    var inner = el.querySelector('.glassy-3d-inner');
    if(!inner) return;
    if(reduced) return;
    if(!canHover){
      inner.classList.add('is-idle');
      return;
    }
    el.addEventListener('mousemove', function(e){
      inner.classList.remove('is-idle');
      var rect = el.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var tilt = el.classList.contains('glassy-3d-pdp') ? 10 : (el.classList.contains('glassy-3d-thumb') ? 8 : 12);
      inner.style.transform =
        'rotateY(' + (x * tilt) + 'deg) rotateX(' + (-y * tilt) + 'deg) translateZ(10px)';
    });
    el.addEventListener('mouseleave', function(){
      inner.style.transform = '';
      inner.classList.add('is-idle');
    });
    inner.classList.add('is-idle');
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
  <script>${layoutScript()}</script>
  <script>${cartScript(cartCatalogJson)}</script>
</body>
</html>`;
}

function siteNav(active) {
  const link = (href, label, key) =>
    `<li><a href="${href}" class="${active === key ? 'active' : ''}">${label}</a></li>`;
  return `
<nav class="site-nav" id="siteNav" aria-label="Primary">
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
    ? glassyImage(`<img src="${t.images[0]}" alt="${t.name}">`)
    : `<div class="product-thumb-label">${t.name}</div>`;
  return `
<a class="product-card" href="/templates/${t.slug}" data-platform="${t.category}">
  <div class="product-thumb ${t.mockClass}" style="${t.images ? 'background:var(--cream);' : ''}">
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
<section class="page-hero page-hero-enter" style="min-height:78vh;display:flex;flex-direction:column;justify-content:center;">
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
<section class="page-hero page-hero-enter">
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
  const hasGallery = Boolean(t.images?.length);
  const galleryMain = hasGallery
    ? `<div class="pdp-gallery" id="pdpGallery">
         <div class="pdp-main product-thumb ${t.mockClass}" style="background:var(--cream);">
           <button type="button" class="pdp-nav pdp-prev" id="pdpPrev" aria-label="Previous image">‹</button>
           <button type="button" class="pdp-zoom" id="pdpZoom" data-lightbox="${t.images[0]}" aria-label="Enlarge image">
             ${glassyImage(`<img id="mainImg" src="${t.images[0]}" alt="${t.name}">`, 'glassy-3d-pdp')}
             <span class="zoom-hint">Click to enlarge</span>
           </button>
           <button type="button" class="pdp-nav pdp-next" id="pdpNext" aria-label="Next image">›</button>
           <span class="pdp-counter" id="pdpCounter">1 / ${t.images.length}</span>
         </div>
         ${t.images.length > 1 ? `<div class="pdp-dots" id="pdpDots">${t.images.map((_, i) => `<button type="button" class="pdp-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Image ${i + 1}"></button>`).join('')}</div>` : ''}
         <div class="pdp-thumbs">${t.images
           .map(
             (src, i) =>
               `<button type="button" class="thumb-btn${i === 0 ? ' is-active' : ''}" data-src="${src}" data-idx="${i}">${glassyImage(`<img src="${src}" alt="${t.name} ${i + 1}">`, 'glassy-3d-thumb')}</button>`
           )
           .join('')}</div>
       </div>`
    : `<div class="pdp-main product-thumb ${t.mockClass}"><span class="product-thumb-label" style="font-size:2.4rem;">${t.name}</span></div>`;
  const related = templateData
    .filter((x) => x.slug !== t.slug)
    .slice(0, 3)
    .map(productCard)
    .join('');

  const body = `
<style>
  .pdp { display:grid; grid-template-columns:1.05fr .95fr; gap:3rem; padding:3rem 4vw 4rem; max-width:1200px; margin:0 auto; align-items:start; }
  .pdp-main {
    aspect-ratio:1/1; border-radius:20px; overflow:visible; background:var(--cream); position:relative;
    box-shadow: var(--shadow-border);
  }
  .pdp-gallery { display:flex; flex-direction:column; gap:.75rem; }
  .pdp-zoom { display:block; width:100%; height:100%; border:none; padding:0; background:transparent; cursor:zoom-in; position:relative; overflow:hidden; border-radius:20px; }
  .pdp-nav {
    position:absolute; top:50%; transform:translateY(-50%); width:40px; height:40px; border-radius:50%;
    border:none; background:rgba(255,255,255,.92); font-size:1.25rem; cursor:pointer; z-index:2;
    box-shadow: var(--shadow-border-hover); display:grid; place-items:center; line-height:1;
    transition-property: transform, box-shadow; transition-duration: 150ms; transition-timing-function: ease-out;
  }
  .pdp-nav:active { transform: translateY(-50%) scale(0.96); }
  .pdp-prev { left:10px; }
  .pdp-next { right:10px; padding-left:11px; }
  .pdp-counter {
    position:absolute; bottom:12px; left:12px; background:rgba(17,17,17,.72); color:#fff;
    font-size:.72rem; letter-spacing:.06em; padding:.35rem .65rem; border-radius:999px; pointer-events:none;
    font-variant-numeric: tabular-nums;
  }
  .pdp-dots { display:flex; justify-content:center; gap:.45rem; flex-wrap:wrap; }
  .pdp-dot {
    position:relative; width:8px; height:8px; border-radius:50%; border:none; padding:0;
    background:rgba(0,0,0,.12); cursor:pointer;
    transition-property: transform, background-color; transition-duration: 150ms;
  }
  .pdp-dot::after {
    content:""; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:40px; height:40px;
  }
  .pdp-dot.active { background:var(--pink); transform:scale(1.15); }
  .zoom-hint {
    position:absolute; bottom:12px; right:12px; background:rgba(17,17,17,.72); color:#fff;
    font-size:.72rem; letter-spacing:.06em; text-transform:uppercase; padding:.4rem .7rem; border-radius:999px;
    pointer-events:none; opacity:.9;
  }
  .pdp-thumbs { display:grid; grid-template-columns:repeat(auto-fill,minmax(72px,1fr)); gap:.6rem; }
  .thumb-btn {
    border:none; padding:0; border-radius:12px; overflow:visible; cursor:pointer;
    background:transparent; opacity:.65; box-shadow: var(--shadow-border);
    transition-property: opacity, box-shadow, transform;
    transition-duration: 200ms; transition-timing-function: ease-out;
  }
  .thumb-btn .glassy-3d { border-radius: 12px; }
  .thumb-btn.is-active { opacity:1; box-shadow: var(--shadow-border-hover); }
  .thumb-btn:active { transform: scale(0.96); }
  .pdp-zoom img {
    transition-property: opacity, transform;
    transition-duration: 220ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }
  .thumb-btn img { width:100%; aspect-ratio:1/1; object-fit:contain; border-radius:12px; }
  .thumb-btn .glassy-3d img { aspect-ratio: 1/1; }
  .breadcrumb { font-size:.85rem; color:var(--muted); margin-bottom:1rem; }
  .breadcrumb a { color:var(--muted); text-decoration:none; }
  .breadcrumb a:hover { color:var(--pink); }
  .pdp-actions { display:flex; flex-wrap:wrap; gap:.7rem; margin:1.5rem 0 1rem; }
  .pdp-features { margin-top:1.75rem; }
  .pdp-features h3 { font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; margin-bottom:.8rem; }
  .pdp-features ul { list-style:none; display:grid; gap:.55rem; }
  .pdp-features li { display:flex; gap:.55rem; align-items:flex-start; color:var(--charcoal); }
  .pdp-features li::before { content:'✦'; color:var(--pink); font-size:.7rem; margin-top:.35rem; }
  .lightbox {
    position:fixed; inset:0; z-index:3000; background:rgba(17,17,17,.88);
    display:none; align-items:center; justify-content:center; padding:1.5rem; cursor:zoom-out;
  }
  .lightbox.open { display:flex; }
  .lightbox img {
    max-width:min(960px,96vw); max-height:90vh; border-radius:12px;
    box-shadow:
      0 28px 80px -12px rgba(0,0,0,.5),
      inset 0 1px 1px rgba(255,255,255,.35);
    background:#fff; object-fit:contain; cursor:default;
    transform: perspective(900px) rotateX(2deg) translateZ(0);
  }
  .lightbox-close {
    position:fixed; top:1rem; right:1rem; width:44px; height:44px; border-radius:50%;
    border:none; background:#fff; font-size:1.4rem; cursor:pointer; z-index:3001;
    box-shadow: var(--shadow-border-hover);
    transition-property: transform; transition-duration: 150ms;
  }
  .lightbox-close:active { transform: scale(0.96); }
  .lightbox-nav {
    position:fixed; top:50%; transform:translateY(-50%); width:44px; height:44px; border-radius:50%;
    border:none; background:rgba(255,255,255,.92); font-size:1.3rem; cursor:pointer; z-index:3001;
    box-shadow: var(--shadow-border-hover);
    transition-property: transform; transition-duration: 150ms;
  }
  .lightbox-nav:active { transform: translateY(-50%) scale(0.96); }
  .lightbox-prev { left:1rem; }
  .lightbox-next { right:1rem; padding-left:2px; }
  .lightbox-counter {
    position:fixed; bottom:1.25rem; left:50%; transform:translateX(-50%);
    background:rgba(255,255,255,.92); color:var(--charcoal); font-size:.8rem;
    padding:.45rem .85rem; border-radius:999px; z-index:3001; pointer-events:none;
    font-variant-numeric: tabular-nums; box-shadow: var(--shadow-border);
  }
  @media (max-width:900px){ .pdp { grid-template-columns:1fr; gap:1.75rem; padding-top:1.5rem; } }
</style>
<div class="pdp">
  <div>
    ${galleryMain}
    ${hasGallery ? '<p style="font-size:.8rem;color:var(--muted);margin-top:.25rem;">Tip: swipe or use arrows · click to view full size</p>' : ''}
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
      <a class="btn btn-dark" href="${t.etsy}" target="_blank" rel="noopener">${t.slug === 'korean-lash-lift-training-manual' ? 'Buy on Etsy →' : 'Buy now on Etsy →'}</a>
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
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
  <button class="lightbox-close" id="lightboxClose" aria-label="Close">&times;</button>
  <button class="lightbox-nav lightbox-prev" id="lightboxPrev" aria-label="Previous">‹</button>
  <img id="lightboxImg" src="" alt="">
  <button class="lightbox-nav lightbox-next" id="lightboxNext" aria-label="Next">›</button>
  <span class="lightbox-counter" id="lightboxCounter"></span>
</div>
<script>
(function(){
  var gallery = ${JSON.stringify(t.images || [])};
  var idx = 0;
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightboxImg');
  var boxCounter = document.getElementById('lightboxCounter');
  var mainImg = document.getElementById('mainImg');
  var zoomBtn = document.getElementById('pdpZoom');
  var pdpCounter = document.getElementById('pdpCounter');
  var pdpGallery = document.getElementById('pdpGallery');

  function syncUI(){
    if(!gallery.length) return;
    var src = gallery[idx];
    if(mainImg) mainImg.src = src;
    if(zoomBtn) zoomBtn.setAttribute('data-lightbox', src);
    if(pdpCounter) pdpCounter.textContent = (idx + 1) + ' / ' + gallery.length;
    if(boxCounter) boxCounter.textContent = (idx + 1) + ' / ' + gallery.length;
    document.querySelectorAll('.thumb-btn').forEach(function(btn, i){
      btn.classList.toggle('is-active', i === idx);
    });
    document.querySelectorAll('.pdp-dot').forEach(function(dot, i){
      dot.classList.toggle('active', i === idx);
    });
  }
  function showAt(i){
    if(!gallery.length) return;
    idx = (i + gallery.length) % gallery.length;
    syncUI();
  }
  function openAt(i){
    if(!gallery.length) return;
    showAt(i);
    boxImg.src = gallery[idx];
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    box.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.thumb-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      showAt(parseInt(btn.dataset.idx, 10) || 0);
    });
  });
  document.querySelectorAll('.pdp-dot').forEach(function(dot){
    dot.addEventListener('click', function(){
      showAt(parseInt(dot.dataset.idx, 10) || 0);
    });
  });
  var prev = document.getElementById('pdpPrev');
  var next = document.getElementById('pdpNext');
  if(prev) prev.addEventListener('click', function(e){ e.stopPropagation(); showAt(idx - 1); });
  if(next) next.addEventListener('click', function(e){ e.stopPropagation(); showAt(idx + 1); });
  document.querySelectorAll('[data-lightbox]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      openAt(idx);
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', function(e){ e.stopPropagation(); close(); });
  document.getElementById('lightboxPrev').addEventListener('click', function(e){ e.stopPropagation(); openAt(idx - 1); });
  document.getElementById('lightboxNext').addEventListener('click', function(e){ e.stopPropagation(); openAt(idx + 1); });
  box.addEventListener('click', function(e){ if(e.target===box) close(); });
  document.addEventListener('keydown', function(e){
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') openAt(idx - 1);
    if(e.key==='ArrowRight') openAt(idx + 1);
  });

  function bindSwipe(el, onLeft, onRight){
    if(!el) return;
    var startX = 0;
    var tracking = false;
    el.addEventListener('touchstart', function(e){
      if(!e.touches.length) return;
      startX = e.touches[0].clientX;
      tracking = true;
    }, { passive: true });
    el.addEventListener('touchend', function(e){
      if(!tracking) return;
      tracking = false;
      var dx = (e.changedTouches[0].clientX - startX);
      if(Math.abs(dx) < 40) return;
      if(dx < 0) onLeft(); else onRight();
    }, { passive: true });
  }
  bindSwipe(pdpGallery, function(){ showAt(idx + 1); }, function(){ showAt(idx - 1); });
  bindSwipe(box, function(){ openAt(idx + 1); }, function(){ openAt(idx - 1); });
  syncUI();
})();
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
  .cart-empty {
    text-align:center; padding: 3rem 1rem; background: var(--cream); border-radius: 20px;
    box-shadow: var(--shadow-border);
  }
  .cart-row {
    display:grid; grid-template-columns: 96px 1fr auto; gap: 1rem; align-items:center;
    padding: 1rem 0; border-bottom: 1px solid var(--border);
    transition-property: opacity, transform;
    transition-duration: 150ms; transition-timing-function: ease-in;
  }
  .cart-thumb {
    width:96px; height:72px; border-radius:12px; overflow:hidden;
    box-shadow: var(--shadow-border);
  }
  .cart-thumb img { width:100%; height:100%; object-fit:cover; border-radius:12px; }
  .cart-meta h3 { font-family:Fraunces,serif; font-size:1.15rem; text-wrap: balance; }
  .cart-meta p { color:var(--muted); font-size:.85rem; text-wrap: pretty; }
  .cart-line-price { font-family:Fraunces,serif; font-weight:700; font-variant-numeric: tabular-nums; }
  .qty {
    width: 64px; padding: .45rem .5rem; border:1px solid var(--border); border-radius:10px;
    font-family:inherit; margin-right:.5rem; font-variant-numeric: tabular-nums;
    box-shadow: var(--shadow-border);
  }
  .cart-summary {
    margin-top: 1.75rem; padding: 1.5rem; border-radius: 18px; background: var(--cream);
    display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; align-items:center;
    box-shadow: var(--shadow-border);
  }
  .cart-total { font-family:Fraunces,serif; font-size:2rem; font-weight:900; font-variant-numeric: tabular-nums; }
  .cart-note { font-size:.9rem; color:var(--muted); max-width: 34rem; margin-top:1rem; text-wrap: pretty; }
</style>
<section class="page-hero page-hero-enter">
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
