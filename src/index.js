/**
 * Bloomie House - Cloudflare Worker
 * Ecommerce-style multi-page site (templates shop + services)
 *
 * Design read: redesign of a premium template shop for small businesses
 * worldwide, soft-luxury pink-logo language, asymmetric sans layout,
 * restrained motion. Dials: VARIANCE 6 / MOTION 5 / DENSITY 3.
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
const CONTACT_EMAIL = 'hello@bloomiehouse.com.au';

const MOCK = '/mockups';

const templateData = [
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
      'An aesthetic Canva website template for wedding invitation RSVPs. Elegant device mockups, mobile-friendly RSVP pages, and a bonus customisable gift registry tracker. Fully editable in Canva.',
    features: [
      '4-6 page Canva website',
      'Mobile RSVP flow',
      'Bonus gift registry tracker',
      'Elegant typography',
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
      'A soft-luxury spa and nails website with multi-device mockups, service showcase, online booking flow, FAQ, and testimonials. Built for beauty salons that want an elegant booking experience.',
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
      'A soft-luxury academy template for lash lift training schools. Course curriculum, enrolment CTAs, and trainer-ready layouts, branded as Lumina Lash (not Bloom).',
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
      'A soft-luxury website template for lash and brows academies and beauty educators. Hero, services, course enrolment, and trainer story, ready to personalise and launch this week.',
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
      'A clean, high-converting landing page template for coaches, consultants, and service providers. Built in Canva, fully editable, no design skills needed. Ready to publish in under an hour.',
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
      'Our most-loved template, designed for beauty studios, lash techs, brow bars, and skin clinics. Elegant, feminine, and conversion-focused with a built-in booking flow.',
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
    images: [`${MOCK}/flow-hero.jpg`],
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
    images: [`${MOCK}/boutique-hero.jpg`],
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
const CHAT_SYSTEM_PROMPT = `You are "Bloomie", the friendly AI assistant for Bloomie House, an Australia-based studio serving clients worldwide. Bloomie House sells premium Wix Studio, Shopify and Canva website templates and offers done-for-you web design for small businesses (cafes, beauty studios, tradies, boutiques and more).

Your job:
- Help visitors understand products and services.
- Recommend a ready-made template (/shop) or a custom build (/services, /full-custom).
- Answer pricing, timelines, and process questions warmly and briefly.
- Point people to /shop, /cart (wishlist before Etsy checkout), /contact, or the discovery form on /services.

Style: warm, modern, encouraging, never pushy. Keep replies short (2-4 sentences) unless asked for detail. Never invent prices. Only discuss Bloomie House and web design. Frame the business as Australia-based and worldwide, never as a single-city studio.`;

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
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.';
    return jsonResponse({ reply });
  } catch {
    return jsonResponse({ error: 'The assistant is unavailable right now. Please try again shortly.' }, 502);
  }
}

const chatWidget = `
<style>
  #bloomie-chat-btn {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
    background: var(--pink, #D67D9A); color: #fff; font-size: 1.15rem; font-weight: 700;
    font-family: 'Syne', system-ui, sans-serif; letter-spacing: -.02em;
    box-shadow: 0 10px 28px rgba(214,125,154,.32); transition: transform .25s ease;
  }
  #bloomie-chat-btn:hover { transform: translateY(-2px) scale(1.04); }
  #bloomie-chat-panel {
    position: fixed; bottom: 96px; right: 24px; z-index: 9999;
    width: min(380px, calc(100vw - 32px)); height: 480px;
    background: #fff; border-radius: 20px; display: none; flex-direction: column;
    box-shadow: 0 24px 64px rgba(44,35,38,.16); overflow: hidden;
  }
  #bloomie-chat-panel.open { display: flex; }
  .bloomie-chat-header {
    padding: 16px 18px; background: #F9F4F6; border-bottom: 1px solid rgba(44,35,38,.06);
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Syne', system-ui, sans-serif; font-weight: 700; font-size: 17px;
  }
  .bloomie-chat-header small { display: block; font-family: 'Outfit', system-ui, sans-serif; font-weight: 400; font-size: 12px; opacity: .7; margin-top: 2px; }
  .bloomie-chat-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #2C2326; line-height: 1; }
  .bloomie-chat-log { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .bloomie-msg { max-width: 82%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; font-family: 'Outfit', system-ui, sans-serif; }
  .bloomie-msg.user { align-self: flex-end; background: #D67D9A; color: #fff; border-bottom-right-radius: 4px; }
  .bloomie-msg.bot { align-self: flex-start; background: #F3E8EC; color: #2C2326; border-bottom-left-radius: 4px; }
  .bloomie-msg.typing { font-style: italic; opacity: .7; }
  .bloomie-chat-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid rgba(44,35,38,.08); background: #F9F4F6; }
  .bloomie-chat-input input {
    flex: 1; border: 1px solid rgba(44,35,38,.12); border-radius: 999px; padding: 10px 14px;
    font-family: 'Outfit', system-ui, sans-serif; font-size: 14px; outline: none; background: #fff;
  }
  .bloomie-chat-input input:focus { border-color: #D67D9A; }
  .bloomie-chat-input button {
    border: none; background: #2C2326; color: #fff; border-radius: 999px; padding: 0 16px;
    font-family: 'Outfit', system-ui, sans-serif; font-size: 13px; cursor: pointer;
  }
  .bloomie-chat-input button:disabled { opacity: .5; cursor: default; }
</style>
<button id="bloomie-chat-btn" aria-label="Open chat">B</button>
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
  --ink: #2C2326;
  --white: #FFFBFC;
  --blush: #F9F4F6;
  --blush-deep: #F3E8EC;
  --pink: #D67D9A;
  --pink-deep: #C45F82;
  --sage: #B8C9A8;
  --muted: #7A6B70;
  --border: rgba(44,35,38,0.08);
  --radius: 4px;
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'Outfit', system-ui, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--white);
  color: var(--ink);
  line-height: 1.65;
  overflow-x: hidden;
  font-weight: 400;
}
a { color: inherit; }
img { max-width: 100%; display: block; }

.site-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 1rem 4vw;
  background: rgba(255,251,252,.9); backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { display: flex; align-items: center; gap: .75rem; text-decoration: none; }
.nav-logo img { height: 44px; width: auto; }
.nav-logo span {
  font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; letter-spacing: -.03em;
}
.nav-links { display: flex; gap: 1.6rem; list-style: none; align-items: center; }
.nav-links a {
  text-decoration: none; font-size: .92rem; color: var(--ink); font-weight: 450;
  transition: color .2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--pink); }
.nav-actions { display: flex; align-items: center; gap: .75rem; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  padding: .85rem 1.45rem; border-radius: 999px; text-decoration: none;
  font-size: .88rem; font-weight: 500; border: 1.5px solid transparent;
  font-family: var(--font-body);
  transition: transform .25s ease, background .2s, color .2s, border-color .2s; cursor: pointer;
  white-space: nowrap;
}
.btn:hover { transform: translateY(-2px); }
.btn-dark { background: var(--ink); color: var(--white); }
.btn-dark:hover { background: #3d3336; }
.btn-pink { background: var(--pink); color: #fff; }
.btn-pink:hover { background: var(--pink-deep); }
.btn-ghost { background: transparent; border-color: var(--border); color: var(--ink); }
.btn-ghost:hover { border-color: var(--ink); }

.cart-link {
  position: relative; width: 44px; height: 44px; border-radius: 50%;
  display: grid; place-items: center; text-decoration: none;
  border: 1px solid var(--border); background: var(--white); font-size: .85rem;
  font-family: var(--font-display); font-weight: 700;
}
.cart-count {
  position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px;
  padding: 0 5px; border-radius: 999px; background: var(--pink); color: #fff;
  font-size: 11px; font-weight: 600; display: grid; place-items: center;
  font-family: var(--font-body);
}

.page-hero {
  position: relative;
  padding: clamp(3.5rem, 8vw, 6.5rem) 4vw clamp(2.5rem, 5vw, 4rem);
  background:
    radial-gradient(ellipse 70% 55% at 0% 0%, rgba(214,125,154,.22), transparent 58%),
    radial-gradient(ellipse 50% 45% at 100% 10%, rgba(184,201,168,.2), transparent 52%),
    linear-gradient(165deg, var(--blush) 0%, var(--white) 72%);
  overflow: hidden;
}
.page-hero::after {
  content: '';
  position: absolute; right: -8%; top: 12%; width: min(42vw, 420px); height: min(42vw, 420px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(214,125,154,.12), transparent 68%);
  pointer-events: none;
}
.page-hero > * { position: relative; z-index: 1; max-width: 38rem; }
.page-hero.hero-home > * { max-width: 42rem; }
.page-hero h1 {
  font-family: var(--font-display); font-weight: 700; letter-spacing: -.04em;
  font-size: clamp(2.6rem, 6.2vw, 4.6rem); line-height: 1.08; margin-bottom: .9rem;
  padding-bottom: .15rem;
}
.page-hero h1 em {
  font-style: italic; font-weight: 600; color: var(--pink);
  display: inline-block; padding-bottom: .12em;
}
.page-hero .brand-mark {
  font-family: var(--font-display); font-weight: 800; letter-spacing: -.045em;
  font-size: clamp(2.8rem, 7vw, 5.2rem); line-height: 1.05; display: block;
  margin-bottom: .35rem;
}
.page-hero p { color: var(--muted); font-size: 1.08rem; max-width: 34rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.85rem; }

.section { padding: clamp(3.5rem, 7vw, 5.5rem) 4vw; }
.section-label {
  font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted); margin-bottom: .55rem; font-weight: 500;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(1.85rem, 3.8vw, 2.75rem);
  font-weight: 700; letter-spacing: -.03em; margin-bottom: 1.6rem; line-height: 1.12;
}
.section-title em { font-style: italic; font-weight: 600; color: var(--pink); }

.product-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem 1.5rem;
}
.product-card {
  background: transparent; border: none; border-radius: 0;
  overflow: visible; text-decoration: none; color: inherit;
  transition: transform .3s ease; display: flex; flex-direction: column;
}
.product-card:hover { transform: translateY(-6px); }
.product-thumb {
  aspect-ratio: 1/1; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: var(--blush); border-radius: 2px;
}
.product-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.product-card:hover .product-thumb img { transform: scale(1.04); }
.product-thumb-label {
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 600;
  color: rgba(255,255,255,.92); letter-spacing: -.02em; text-shadow: 0 2px 12px rgba(0,0,0,.25);
  padding: 1rem; text-align: center;
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
.badge-platform { left: .85rem; background: rgba(255,251,252,.94); color: var(--ink); }
.badge-sale { right: .85rem; background: var(--ink); color: #fff; }
.product-info { padding: 1rem 0 0; display: flex; flex-direction: column; gap: .3rem; flex: 1; }
.product-niche { font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.product-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; letter-spacing: -.02em; }
.product-price { display: flex; align-items: baseline; gap: .5rem; margin: .3rem 0 .55rem; }
.price-current { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; }
.price-original { font-size: .9rem; color: var(--muted); text-decoration: line-through; }
.product-link {
  font-size: .85rem; font-weight: 500; color: var(--pink); text-decoration: none;
  margin-top: auto;
}
.product-card:hover .product-link { color: var(--pink-deep); }

.filters { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.25rem 0 2rem; }
.filter-btn {
  border: 1px solid var(--border); background: transparent; border-radius: 999px;
  padding: .55rem 1rem; font-family: inherit; font-size: .82rem; cursor: pointer;
  color: var(--muted); transition: .2s;
}
.filter-btn:hover, .filter-btn.active { background: var(--ink); color: #fff; border-color: var(--ink); }

.ladder {
  display: grid; grid-template-columns: 1.15fr .95fr .9fr; gap: 1.25rem; align-items: stretch;
}
.ladder-item {
  padding: 1.75rem 1.5rem; background: var(--blush); border-radius: 2px;
  display: flex; flex-direction: column;
}
.ladder-item.featured {
  background: var(--ink); color: #fff;
  transform: translateY(-8px);
}
.ladder-item h3 {
  font-family: var(--font-display); font-size: 1.45rem; font-weight: 700;
  letter-spacing: -.02em; margin-bottom: .4rem;
}
.ladder-item p { color: var(--muted); margin-bottom: 1.15rem; flex: 1; }
.ladder-item.featured p { color: rgba(255,255,255,.72); }
.ladder-price {
  font-family: var(--font-display); font-size: 1.05rem; font-weight: 600;
  margin-bottom: .85rem; color: var(--ink);
}
.ladder-item.featured .ladder-price { color: #fff; }

.site-footer {
  margin-top: 2rem; padding: 3.5rem 4vw 2rem;
  background: var(--ink); color: rgba(255,255,255,.78);
}
.footer-grid {
  display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 2rem;
  max-width: 1200px; margin: 0 auto 2.5rem;
}
.footer-brand img { height: 52px; margin-bottom: .8rem; }
.footer-brand strong {
  display: block; font-family: var(--font-display); font-size: 1.35rem; color: #fff;
  margin-bottom: .4rem; letter-spacing: -.02em;
}
.footer-col h4 {
  color: #fff; font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
  margin-bottom: 1rem; font-weight: 600;
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
  background: var(--ink); color: #fff; padding: .85rem 1.25rem; border-radius: 999px;
  font-size: .88rem; opacity: 0; pointer-events: none; transition: .3s; z-index: 2000;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.nav-toggle { display: none; background: none; border: 1px solid var(--border); border-radius: 10px; width: 42px; height: 42px; font-size: 1.2rem; }

.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.in { opacity: 1; transform: none; }

@media (max-width: 900px) {
  .ladder { grid-template-columns: 1fr; }
  .ladder-item.featured { transform: none; }
}
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
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .btn, .product-card, .product-thumb img, #bloomie-chat-btn, .reveal {
    transition: none !important; animation: none !important;
  }
  .reveal { opacity: 1; transform: none; }
  .btn:hover, .product-card:hover { transform: none; }
}
`;
}

function motionScript() {
  return `
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el){ io.observe(el); });
})();`;
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
      root.innerHTML='<div class="cart-empty"><h2 style="font-family:var(--font-display);margin-bottom:.5rem;letter-spacing:-.02em;">Your cart is empty</h2><p style="color:var(--muted);margin-bottom:1.25rem;">Browse the shop and add a template to get started.</p><a class="btn btn-pink" href="/shop">Continue shopping</a></div>';
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
        '<div style="font-family:var(--font-display);font-weight:700;">$'+line+' AUD</div></div>';
    }).join('');
    root.innerHTML = rows +
      '<div class="cart-summary"><div><div style="font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">Estimated total</div>'+
      '<div style="font-family:var(--font-display);font-size:2rem;font-weight:700;letter-spacing:-.03em;">$'+total+' AUD</div></div>'+
      '<div style="display:flex;gap:.6rem;flex-wrap:wrap;">'+
      '<a class="btn btn-ghost" href="/shop">Keep shopping</a>'+
      '<a class="btn btn-pink" href="${ETSY_SHOP}" target="_blank" rel="noopener">Checkout on Etsy</a>'+
      '</div></div>'+
      '<p class="cart-note">Bloomie House uses Etsy for payment and delivery. Your cart here is a shopping list. Open Etsy to complete purchase for each template, or browse the full shop.</p>';

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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <style>${baseStyles()}</style>
</head>
<body>
  ${siteNav(active)}
  ${bodyHtml}
  ${siteFooter()}
  <div class="toast" id="toast" role="status"></div>
  <script>${cartScript(cartCatalogJson)}</script>
  <script>${motionScript()}</script>
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
      Bag<span class="cart-count" id="cartCount">0</span>
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
      <p>Premium website templates and done-for-you design for small businesses across Australia and worldwide.</p>
      <p style="margin-top:1rem"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
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
    <span>Australia · Worldwide · English &amp; Vietnamese</span>
  </div>
</footer>`;
}

function productCard(t) {
  const thumb = t.images?.[0]
    ? `<img src="${t.images[0]}" alt="${t.name}">`
    : `<div class="product-thumb-label">${t.name}</div>`;
  return `
<a class="product-card reveal" href="/templates/${t.slug}" data-platform="${t.category}">
  <div class="product-thumb ${t.mockClass}" style="${t.images ? 'background:var(--blush);' : ''}">
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
    <span class="product-link">View details</span>
  </div>
</a>`;
}

// ── PAGES ──
function homePage() {
  const featured = templateData.slice(0, 6).map(productCard).join('');
  const body = `
<section class="page-hero hero-home" style="min-height:min(88dvh, 820px);display:flex;flex-direction:column;justify-content:center;">
  <p class="section-label">Template shop · Est. 2025</p>
  <h1><span class="brand-mark">Bloomie House</span>Templates that look like you meant it.</h1>
  <p>Premium Wix Studio, Shopify and Canva templates for cafes, beauty studios, tradies, boutiques and beyond. Buy, personalise, launch this week. Serving Australia and clients worldwide.</p>
  <div class="hero-cta">
    <a class="btn btn-pink" href="/shop">Browse Templates</a>
    <a class="btn btn-ghost" href="/services">Need us to set it up?</a>
  </div>
</section>

<section class="section">
  <p class="section-label reveal">Shop the collection</p>
  <h2 class="section-title reveal">Find your <em>perfect</em> template</h2>
  <div class="product-grid">${featured}</div>
  <div style="margin-top:2.25rem;">
    <a class="btn btn-dark" href="/shop">View all templates</a>
  </div>
</section>

<section class="section" style="background:var(--blush);">
  <p class="section-label reveal">Done-for-you</p>
  <h2 class="section-title reveal">Pick your <em>pace</em></h2>
  <div class="ladder reveal">
    <article class="ladder-item">
      <h3>DIY Template</h3>
      <div class="ladder-price">From $37 AUD</div>
      <p>Instant download. Personalise yourself and launch on your timeline.</p>
      <a class="btn btn-ghost" href="/shop">Shop templates</a>
    </article>
    <article class="ladder-item featured">
      <h3>One Day Website</h3>
      <div class="ladder-price">$397 AUD</div>
      <p>We install and personalise a template for your brand. Live in about 24 hours.</p>
      <a class="btn btn-pink" href="/services">Book now</a>
    </article>
    <article class="ladder-item">
      <h3>Full Custom</h3>
      <div class="ladder-price">From $897 AUD</div>
      <p>Built from scratch when you need strategy, uniqueness, and room to grow.</p>
      <a class="btn btn-ghost" href="/full-custom">View details</a>
    </article>
  </div>
</section>

<section class="section">
  <h2 class="section-title reveal">Ready when <em>you</em> are</h2>
  <p class="reveal" style="color:var(--muted);max-width:32rem;margin:0 0 1.5rem;">Add templates to your cart, then checkout securely on Etsy. Or book a discovery call for done-for-you setup.</p>
  <div class="reveal" style="display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/shop">Shop templates</a>
    <a class="btn btn-ghost" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
  </div>
</section>`;
  return layout(
    'Bloomie House - Website Templates for Brands That Mean Business',
    'Premium Wix Studio and Shopify website templates for cafes, beauty studios, tradies, boutiques and more. Buy, personalise, launch this week. Australia and worldwide.',
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
  <p>Premium website templates for small businesses. Filter by platform, open a product page, add to cart, then checkout on Etsy.</p>
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
    'Shop Templates - Bloomie House',
    'Browse premium Wix Studio, Shopify and Canva website templates from $37 AUD. Instant download via Etsy.',
    '/shop',
    body,
    'shop'
  );
}

function productPage(t) {
  const galleryMain = t.images?.[0]
    ? `<button type="button" class="pdp-zoom" data-lightbox="${t.images[0]}" aria-label="Enlarge image">
         <img id="mainImg" src="${t.images[0]}" alt="${t.name}" style="width:100%;height:100%;object-fit:contain;">
         <span class="zoom-hint">Click to enlarge</span>
       </button>`
    : `<span class="product-thumb-label" style="font-size:2.4rem;">${t.name}</span>`;
  const thumbs = t.images
    ? t.images
        .map(
          (src, i) =>
            `<button type="button" class="thumb-btn" data-src="${src}" style="border:none;padding:0;border-radius:2px;overflow:hidden;cursor:pointer;opacity:${i === 0 ? 1 : 0.65};background:var(--blush);"><img src="${src}" alt="${t.name} ${i + 1}" style="width:100%;aspect-ratio:1/1;object-fit:contain;"></button>`
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
  .pdp-main { aspect-ratio:1/1; border-radius:2px; overflow:hidden; background:var(--blush); position:relative; }
  .pdp-zoom { display:block; width:100%; height:100%; border:none; padding:0; background:transparent; cursor:zoom-in; position:relative; }
  .zoom-hint {
    position:absolute; bottom:12px; right:12px; background:rgba(44,35,38,.72); color:#fff;
    font-size:.72rem; letter-spacing:.06em; text-transform:uppercase; padding:.4rem .7rem; border-radius:999px;
    pointer-events:none; opacity:.9;
  }
  .pdp-thumbs { display:grid; grid-template-columns:repeat(auto-fill,minmax(72px,1fr)); gap:.6rem; margin-top:.75rem; }
  .breadcrumb { font-size:.85rem; color:var(--muted); margin-bottom:1rem; }
  .breadcrumb a { color:var(--muted); text-decoration:none; }
  .breadcrumb a:hover { color:var(--pink); }
  .pdp-actions { display:flex; flex-wrap:wrap; gap:.7rem; margin:1.5rem 0 1rem; }
  .pdp-features { margin-top:1.75rem; }
  .pdp-features h3 { font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; margin-bottom:.8rem; color:var(--muted); }
  .pdp-features ul { list-style:none; display:grid; gap:.55rem; }
  .pdp-features li { display:flex; gap:.55rem; align-items:flex-start; color:var(--ink); }
  .pdp-features li::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--pink); margin-top:.55rem; flex-shrink:0; }
  .lightbox {
    position:fixed; inset:0; z-index:3000; background:rgba(44,35,38,.88);
    display:none; align-items:center; justify-content:center; padding:1.5rem; cursor:zoom-out;
  }
  .lightbox.open { display:flex; }
  .lightbox img {
    max-width:min(960px,96vw); max-height:90vh; border-radius:4px; box-shadow:0 24px 80px rgba(0,0,0,.45);
    background:#fff; object-fit:contain; cursor:default;
  }
  .lightbox-close {
    position:fixed; top:1rem; right:1rem; width:44px; height:44px; border-radius:50%;
    border:none; background:#fff; font-size:1.4rem; cursor:pointer; z-index:3001;
  }
  .lightbox-nav {
    position:fixed; top:50%; transform:translateY(-50%); width:44px; height:44px; border-radius:50%;
    border:none; background:rgba(255,255,255,.92); font-size:1.3rem; cursor:pointer; z-index:3001;
  }
  .lightbox-prev { left:1rem; }
  .lightbox-next { right:1rem; }
  @media (max-width:900px){ .pdp { grid-template-columns:1fr; gap:1.75rem; padding-top:1.5rem; } }
</style>
<div class="pdp">
  <div>
    <div class="pdp-main product-thumb ${t.mockClass}" style="${t.images ? 'background:var(--blush);display:block;' : ''}">${galleryMain}</div>
    ${thumbs ? `<div class="pdp-thumbs">${thumbs}</div>` : ''}
    <p style="font-size:.8rem;color:var(--muted);margin-top:.6rem;">Tip: click the image to view full size</p>
  </div>
  <div>
    <div class="breadcrumb"><a href="/shop">Shop</a> / ${t.name}</div>
    <p class="product-niche">${t.niche}</p>
    <h1 style="font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.4rem);font-weight:700;letter-spacing:-.035em;line-height:1.08;margin:.4rem 0 1rem;padding-bottom:.1rem;">${t.name}</h1>
    <span class="badge badge-platform" style="position:static;display:inline-block;margin-bottom:1rem;">${t.platform}</span>
    <div class="product-price">
      <span class="price-current" style="font-size:1.8rem;">$${t.price} AUD</span>
      ${t.originalPrice ? `<span class="price-original">$${t.originalPrice}</span>` : ''}
      <span class="badge badge-sale" style="position:static;">${t.badge}</span>
    </div>
    <p style="color:var(--muted);line-height:1.8;margin-top:.5rem;">${t.description}</p>
    <div class="pdp-actions">
      <button class="btn btn-pink" data-add-cart="${t.slug}">Add to cart</button>
      <a class="btn btn-dark" href="${t.etsy}" target="_blank" rel="noopener">Buy on Etsy</a>
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
</div>
<script>
(function(){
  var gallery = ${JSON.stringify(t.images || [])};
  var idx = 0;
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightboxImg');
  function openAt(i){
    if(!gallery.length) return;
    idx = (i + gallery.length) % gallery.length;
    boxImg.src = gallery[idx];
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    box.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.thumb-btn').forEach(function(btn, i){
    btn.addEventListener('click', function(){
      var img=document.getElementById('mainImg');
      if(img) img.src=btn.dataset.src;
      var zoom=document.querySelector('.pdp-zoom');
      if(zoom) zoom.setAttribute('data-lightbox', btn.dataset.src);
      document.querySelectorAll('.thumb-btn').forEach(function(b){ b.style.opacity='0.65'; });
      btn.style.opacity='1';
      idx = i;
    });
  });
  document.querySelectorAll('[data-lightbox]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      var src = el.getAttribute('data-lightbox');
      var i = gallery.indexOf(src);
      openAt(i >= 0 ? i : 0);
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', function(e){ e.stopPropagation(); close(); });
  document.getElementById('lightboxPrev').addEventListener('click', function(e){ e.stopPropagation(); openAt(idx-1); });
  document.getElementById('lightboxNext').addEventListener('click', function(e){ e.stopPropagation(); openAt(idx+1); });
  box.addEventListener('click', function(e){ if(e.target===box) close(); });
  document.addEventListener('keydown', function(e){
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') openAt(idx-1);
    if(e.key==='ArrowRight') openAt(idx+1);
  });
})();
</script>`;
  return layout(
    `${t.name} - Bloomie House`,
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
  .cart-empty { text-align:left; padding: 3rem 1.5rem; background: var(--blush); border-radius: 2px; }
  .cart-row {
    display:grid; grid-template-columns: 96px 1fr auto; gap: 1rem; align-items:center;
    padding: 1.15rem 0; border-bottom: 1px solid var(--border);
  }
  .cart-thumb { width:96px; height:72px; border-radius:2px; overflow:hidden; }
  .cart-thumb img { width:100%; height:100%; object-fit:cover; }
  .cart-meta h3 { font-family:var(--font-display); font-size:1.1rem; letter-spacing:-.02em; }
  .cart-meta p { color:var(--muted); font-size:.85rem; }
  .qty {
    width: 64px; padding: .45rem .5rem; border:1px solid var(--border); border-radius:8px;
    font-family:inherit; margin-right:.5rem; background:var(--blush);
  }
  .cart-summary {
    margin-top: 1.75rem; padding: 1.5rem; border-radius: 2px; background: var(--blush);
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
    'Cart - Bloomie House',
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
  <div class="ladder reveal" style="margin-bottom:3.5rem;">
    <article class="ladder-item">
      <h3>DIY Templates</h3>
      <div class="ladder-price">From $37</div>
      <p>Buy a template, personalise it yourself, launch this week.</p>
      <a class="btn btn-ghost" href="/shop">Browse shop</a>
    </article>
    <article class="ladder-item featured">
      <h3>One Day Website</h3>
      <div class="ladder-price">$397 <span style="font-size:.9rem;opacity:.55;text-decoration:line-through;font-weight:400;">$497</span></div>
      <p>We install and personalise a template for your brand. Live in about 24 hours.</p>
      <a class="btn btn-pink" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Book now</a>
    </article>
    <article class="ladder-item">
      <h3>Full Custom</h3>
      <div class="ladder-price">From $897</div>
      <p>Built from scratch. Up to 6 pages, strategy session, SEO foundation, 30 days support.</p>
      <a class="btn btn-ghost" href="/full-custom">View details</a>
    </article>
  </div>
  <h2 class="section-title reveal">Discovery <em>form</em></h2>
  <p class="reveal" style="color:var(--muted);max-width:36rem;margin:0 0 1.5rem;">Tell us about your business and we will recommend the right path.</p>
  <div class="reveal" style="max-width:900px;background:var(--blush);border-radius:2px;padding:1rem;overflow:hidden;">
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
    'Website Design Services - Bloomie House',
    'One Day Website from $397 and full custom builds from $897. Wix Studio and Shopify specialists serving Australia and worldwide.',
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
  <p>Built from scratch for your brand. Your vision, your voice, no template limits. From $897 AUD.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2.5rem;">
    ${[
      ['Custom design', 'Unique layouts tailored to your brand'],
      ['Up to 6 pages', 'Home, About, Services, Portfolio and more'],
      ['SEO foundation', 'Structure that helps you get found'],
      ['30 days support', 'Post-launch help when you need it'],
    ]
      .map(
        ([h, p]) =>
          `<div class="reveal" style="background:var(--blush);border-radius:2px;padding:1.35rem;"><h3 style="font-family:var(--font-display);margin-bottom:.35rem;letter-spacing:-.02em;">${h}</h3><p style="color:var(--muted);font-size:.95rem;">${p}</p></div>`
      )
      .join('')}
  </div>
  <div style="max-width:900px;background:var(--blush);border-radius:2px;padding:1rem;">
    <script type="text/javascript" src="${JOTFORM_CUSTOM}"><\/script>
  </div>
</section>`;
  return layout(
    'Full Custom Website Build - Bloomie House',
    'Get a fully custom website built from scratch. Up to 6 pages, brand strategy, SEO foundation and 30 days support. From $897 AUD.',
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
  <p>Questions about a template, One Day Website, or a custom project? We would love to hear from you.</p>
</section>
<section class="section" style="padding-top:1rem;max-width:720px;margin:0 auto;">
  <div style="background:var(--blush);border-radius:2px;padding:1.75rem;">
    <p style="color:var(--muted);margin-bottom:1.25rem;font-size:.95rem;">
      This form opens your email app with a draft to <strong style="color:var(--ink);">${CONTACT_EMAIL}</strong>. Nothing is stored on this site.
    </p>
    <div id="formMessage" style="display:none;padding:.9rem 1rem;border-radius:8px;margin-bottom:1rem;"></div>
    <form id="contactForm">
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Name *
        <input required name="name" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:8px;font:inherit;background:#fff;">
      </label>
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Email *
        <input required type="email" name="email" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:8px;font:inherit;background:#fff;">
      </label>
      <label style="display:block;margin-bottom:1rem;font-size:.9rem;">Service interest
        <select name="service" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:8px;font:inherit;background:#fff;">
          <option value="">Select…</option>
          <option value="template">Template purchase</option>
          <option value="one-day">One Day Website</option>
          <option value="custom">Custom build</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label style="display:block;margin-bottom:1.25rem;font-size:.9rem;">Message *
        <textarea required name="message" rows="5" style="display:block;width:100%;margin-top:.4rem;padding:.9rem 1rem;border:1px solid var(--border);border-radius:8px;font:inherit;background:#fff;resize:vertical;"></textarea>
      </label>
      <button class="btn btn-pink" type="submit" style="width:100%;">Open email draft</button>
    </form>
  </div>
  <p style="margin-top:1.5rem;color:var(--muted);">
    Or email <a href="mailto:${CONTACT_EMAIL}" style="color:var(--pink);">${CONTACT_EMAIL}</a> · English &amp; Vietnamese
  </p>
</section>
<script>
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  var fd = new FormData(e.target);
  var name = (fd.get('name') || '').toString().trim();
  var email = (fd.get('email') || '').toString().trim();
  var service = (fd.get('service') || '').toString().trim() || 'general';
  var message = (fd.get('message') || '').toString().trim();
  var subject = encodeURIComponent('Bloomie House enquiry - ' + service);
  var body = encodeURIComponent(
    'Name: ' + name + '\\nEmail: ' + email + '\\nService: ' + service + '\\n\\n' + message
  );
  var msg = document.getElementById('formMessage');
  msg.style.display = 'block';
  msg.style.background = '#fff';
  msg.style.color = 'var(--ink)';
  msg.textContent = 'Opening your email app. If nothing opens, email ${CONTACT_EMAIL} directly.';
  window.location.href = 'mailto:${CONTACT_EMAIL}?subject=' + subject + '&body=' + body;
});
</script>`;
  return layout(
    'Contact - Bloomie House',
    'Contact Bloomie House about templates, One Day Website, or custom web design. Australia and worldwide.',
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
  <p>We help small businesses look polished online, without the agency price tag or endless timelines. Based in Australia, working with clients worldwide.</p>
</section>
<section class="section" style="max-width:760px;margin:0 auto;">
  <p class="reveal" style="font-size:1.1rem;color:var(--ink);line-height:1.85;margin-bottom:1.25rem;">
    Bloomie House started from a simple idea: beautiful websites should not take months or cost a fortune. We design premium templates for real businesses (cafes, beauty studios, tradies, boutiques) and offer done-for-you setup when you want us to handle the details.
  </p>
  <p class="reveal" style="color:var(--muted);line-height:1.85;margin-bottom:2rem;">
    Shop templates for instant download, book a One Day Website, or start a full custom build. Either way, you will launch looking like you meant it.
  </p>
  <div class="reveal" style="display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/shop">Shop templates</a>
    <a class="btn btn-ghost" href="/services">View services</a>
  </div>
</section>`;
  return layout(
    'About - Bloomie House',
    'Bloomie House sells premium website templates and done-for-you web design for small businesses across Australia and worldwide.',
    '/about',
    body,
    'about'
  );
}

function notFoundPage() {
  const body = `
<section class="page-hero" style="min-height:60vh;display:flex;flex-direction:column;justify-content:center;">
  <h1>Page not <em>found</em></h1>
  <p style="margin-bottom:1.5rem;">That link does not exist. Try the shop or head home.</p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/shop">Go to shop</a>
    <a class="btn btn-ghost" href="/">Home</a>
  </div>
</section>`;
  return layout('Not Found - Bloomie House', 'Page not found.', '/404', body, '');
}
