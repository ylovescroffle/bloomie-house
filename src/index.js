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
];

function productPainPoints(t) {
  if (t.slug === 'korean-lash-lift-training-manual') {
    return [
      {
        pain: 'You want to teach Korean lash lift — but have no curriculum ready',
        fix: '200+ pages of professional training content, editable in Canva',
      },
      {
        pain: 'Students keep asking the same theory questions',
        fix: 'Structured manual covers technique, aftercare & troubleshooting',
      },
      {
        pain: 'Bigger academies look more credible than your solo training',
        fix: 'Polished, branded manual you can resell with your logo',
      },
      {
        pain: 'Building a manual from scratch takes months you don’t have',
        fix: 'Instant download — customise and start teaching this week',
      },
    ];
  }
  if (t.category === 'canva') {
    return [
      { pain: 'Your site still isn’t live — and DIY design is eating your weekends', fix: 'Editable Canva template you can publish in under an hour' },
      { pain: 'You’re losing enquiries to competitors who look more polished online', fix: 'Conversion-focused layout built for real small businesses' },
      { pain: 'Agency quotes of $2k–$5k aren’t in the budget right now', fix: `Professional design from $${t.price} AUD — own it forever` },
      { pain: 'You’re not a designer — and it shows on your current page', fix: 'Drag-and-drop editing, no code or design degree needed' },
    ];
  }
  if (t.category === 'wix') {
    return [
      { pain: 'Your booking flow is clunky — clients drop off before they enquire', fix: 'Built-in booking & CTA sections ready to connect' },
      { pain: 'Your brand deserves luxury, but custom Wix builds cost thousands', fix: 'Soft-luxury Wix Studio layout at a fraction of the price' },
      { pain: 'You’ve been “working on the website” for months', fix: 'Install, personalise, and go live this week' },
      { pain: 'Mobile visitors bounce because the site feels dated', fix: 'Fully responsive, multi-device-ready design' },
    ];
  }
  return [
    { pain: 'You need to look trustworthy online before you can win the job', fix: 'Lead-gen layout with quote forms, reviews & portfolio sections' },
    { pain: 'Shopify themes are overwhelming — and the wrong pick wastes money', fix: 'Curated theme matched to your niche, ready to sell' },
    { pain: 'Every week without a proper site is lost revenue', fix: 'Instant download — start customising today' },
    { pain: 'You want it done right, but not a $10k custom build', fix: `From $${t.price} AUD with setup guide & email support` },
  ];
}

function productFaqs(t) {
  const platformNote =
    t.category === 'canva'
      ? 'Everything is fully editable in Canva — colours, fonts, images, and copy.'
      : t.category === 'wix'
        ? 'Built for Wix Studio. Duplicate to your account, swap branding, connect your domain.'
        : 'Built for Shopify. Upload the theme, add products, and connect payments.';
  const base = [
    {
      q: 'How do I get the template after purchase?',
      a: 'Checkout on Etsy for secure payment. You’ll receive an instant digital download link by email — usually within minutes.',
    },
    {
      q: 'Can I customise it for my brand?',
      a: platformNote,
    },
    {
      q: 'Do I need technical skills?',
      a: 'No coding required. Each template includes a setup guide. If you get stuck, email us — 30-day support is included.',
    },
    {
      q: 'What if I want you to set it up for me?',
      a: 'Book our One Day Website service ($397 AUD) and we’ll install, personalise, and launch it for you — usually within 24 hours.',
    },
    {
      q: 'Is this a one-time purchase?',
      a: `Yes. Pay once ($${t.price} AUD on Etsy), keep the template forever. No monthly template fee from Bloomie House.`,
    },
  ];
  if (t.slug === 'korean-lash-lift-training-manual') {
    base.unshift({
      q: 'Can I resell this manual to my own students?',
      a: 'Yes — this is designed for lash educators and academies. Edit in Canva, add your logo, and use it as your training curriculum or sell it as part of your course.',
    });
  }
  return base;
}

function productAudience(t) {
  if (t.slug === 'korean-lash-lift-training-manual') {
    return {
      intro: 'Built for lash educators who want a credible, ready-to-teach curriculum — without spending months writing it.',
      fits: [
        { icon: '🎓', title: 'Lash trainers & academies', desc: 'Running or launching 1:1 or group Korean lash lift courses' },
        { icon: '✨', title: 'Solo lash artists going pro', desc: 'Adding training income alongside your treatment menu' },
        { icon: '📖', title: 'Educators who resell manuals', desc: 'Canva-editable with your logo — teach under your brand' },
        { icon: '🇰🇷', title: 'Korean lash lift specialists', desc: 'Technique-focused curriculum your students actually need' },
      ],
      notFor: 'Not ideal if you need a live website template — this is a training manual, not a site design.',
    };
  }
  const byCategory = {
    canva: {
      intro: `A ${t.niche.toLowerCase()} template for founders who want a polished online presence fast — without hiring an agency.`,
      fits: [
        { icon: '🚀', title: 'New business owners', desc: 'Launching your first site and need it live this week' },
        { icon: '💅', title: `${t.niche} professionals`, desc: 'Your work is premium — your website should look the part' },
        { icon: '🎨', title: 'Non-designers', desc: 'Comfortable editing in Canva, not code or Figma' },
        { icon: '💰', title: 'Budget-conscious brands', desc: `Professional look from $${t.price} AUD, not $3k+ custom` },
      ],
      notFor: 'Not ideal if you need a fully coded custom build or complex ecommerce logic.',
    },
    wix: {
      intro: `Designed for ${t.niche.toLowerCase()} businesses that book clients online and need a soft-luxury, conversion-ready site.`,
      fits: [
        { icon: '📅', title: 'Service businesses', desc: 'Salons, studios & clinics that rely on online booking' },
        { icon: '✨', title: 'Beauty & wellness brands', desc: 'Elegant layout that matches a premium in-person experience' },
        { icon: '📱', title: 'Mobile-first businesses', desc: 'Most clients find you on Instagram — this converts on phone' },
        { icon: '⏱️', title: 'Busy owners', desc: 'Install in Wix Studio, swap branding, publish in days' },
      ],
      notFor: 'Not ideal if you are not on Wix Studio or need deep custom development.',
    },
    shopify: {
      intro: `For ${t.niche.toLowerCase()} brands ready to sell online with a trust-building, lead-gen focused layout.`,
      fits: [
        { icon: '🔧', title: 'Tradies & service pros', desc: 'Quote requests, reviews & portfolio — built to win jobs' },
        { icon: '🛒', title: 'Small product sellers', desc: 'Shopify-ready structure when you are ready to add products' },
        { icon: '📈', title: 'Growing local businesses', desc: 'Look established before you have a big marketing budget' },
        { icon: '⚡', title: 'Fast movers', desc: 'Skip months of theme research — start with a proven layout' },
      ],
      notFor: 'Not ideal if you need a non-Shopify platform or enterprise-scale catalog.',
    },
  };
  return byCategory[t.category] || byCategory.canva;
}

function productTestimonials(t) {
  if (t.slug === 'korean-lash-lift-training-manual') {
    return [
      { text: 'Finally have a manual I can brand and hand to students. Saved me weeks of writing.', who: 'Lash educator, Melbourne' },
      { text: 'My 1:1 training feels so much more professional now — students love the layout.', who: 'Korean lash lift trainer' },
      { text: 'Worth every dollar. Edited in Canva in one afternoon and started teaching next week.', who: 'Academy owner, Sydney' },
    ];
  }
  return [
    { text: `Exactly what my ${t.niche.toLowerCase()} business needed — live in a weekend, not months.`, who: 'Small business owner, Hobart' },
    { text: 'Clean, aesthetic, and easy to customise. Clients keep complimenting the site.', who: `${t.platform} user, Australia` },
    { text: 'Best template purchase I have made. The layout just converts — more enquiries straight away.', who: 'Bloomie House customer' },
  ];
}

function productBeforeAfter(t) {
  const pains = productPainPoints(t).slice(0, 3);
  return pains.map((p) => ({
    before: p.pain,
    after: p.fix,
  }));
}

function productPostPurchaseSteps(t) {
  const editStep =
    t.category === 'canva'
      ? {
          time: '15–60 min',
          title: 'Open & personalise in Canva',
          detail:
            'Click the Canva link from your download. Swap your logo, brand colours, photos, and business name. No design skills needed — everything is drag-and-drop.',
        }
      : t.category === 'wix'
        ? {
            time: '1–3 hours',
            title: 'Duplicate into Wix Studio',
            detail:
              'Follow the setup guide to add the template to your Wix account. Replace placeholder text and images, connect your booking tool, and preview on mobile.',
          }
        : {
            time: '1–3 hours',
            title: 'Install on Shopify',
            detail:
              'Upload the theme files to your Shopify store. Configure your homepage sections, add services or products, and connect your domain.',
          };

  const extra =
    t.slug === 'korean-lash-lift-training-manual'
      ? {
          time: 'Same day',
          title: 'Brand your training manual',
          detail:
            'Add your academy logo and name in Canva. Export as PDF for students or share the Canva link for digital access.',
        }
      : {
          time: '30 min',
          title: 'Connect your essentials',
          detail:
            'Link your contact form, booking button, Instagram, and Google Maps. Test on your phone before sharing the URL.',
        };

  return [
    {
      time: 'Instant',
      title: 'Checkout on Etsy',
      detail:
        'Click Buy on Etsy, complete secure payment, and wait for your Etsy confirmation email — usually within minutes.',
    },
    {
      time: '1–5 min',
      title: 'Download your files',
      detail:
        'Open the Etsy email → Downloads → save the template link, setup guide PDF, and any bonus files to your device.',
    },
    editStep,
    extra,
    {
      time: 'This week',
      title: 'Publish & start converting',
      detail:
        t.slug === 'korean-lash-lift-training-manual'
          ? 'Start enrolling students with a professional manual you own — or bundle it into your course price.'
          : 'Share your new URL on Instagram, Google Business Profile, and email signature. Start taking bookings or enquiries.',
    },
    {
      time: '30 days',
      title: 'Email support included',
      detail:
        'Stuck on setup? Email hello@bloomiehouse.com.au — we help with template questions for 30 days after purchase.',
    },
  ];
}

function productAudienceHtml(t) {
  const a = productAudience(t);
  const cards = a.fits
    .map(
      (f, i) =>
        `<article class="audience-card pdp-reveal" style="--reveal-delay:${i * 70}ms">
          <span class="audience-icon" aria-hidden="true">${f.icon}</span>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </article>`
    )
    .join('');
  return `
<section class="pdp-audience section" style="background:var(--cream);">
  <p class="section-label pdp-reveal">Who it's for</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">Is this template <em>right for you</em>?</h2>
  <p class="audience-intro pdp-reveal" style="--reveal-delay:100ms">${a.intro}</p>
  <div class="audience-grid">${cards}</div>
  <p class="audience-not pdp-reveal" style="--reveal-delay:200ms"><strong>Not the best fit?</strong> ${a.notFor}</p>
</section>`;
}

function productShowcaseCarouselHtml(t) {
  const rollImgs = (() => {
    let imgs = t.images?.length ? [...t.images] : [`${MOCK}/studio-hero.jpg`, `${MOCK}/luxspa-devices.jpg`];
    while (imgs.length < 8) imgs = imgs.concat(t.images || imgs);
    return imgs.slice(0, 10);
  })();
  const colA = rollImgs.filter((_, i) => i % 2 === 0);
  const colB = rollImgs.filter((_, i) => i % 2 === 1);
  const rollCell = (src, h) =>
    `<div class="roll-cell" style="height:${h}px"><img src="${src}" alt="" loading="lazy"></div>`;
  const colHtml = (imgs, cls) => {
    const cells = imgs.map((src, i) => rollCell(src, 120 + (i % 3) * 36)).join('');
    return `<div class="roll-col ${cls}"><div class="roll-track">${cells}${cells}</div></div>`;
  };
  const testis = productTestimonials(t);
  const bubbles = testis
    .map(
      (x, i) =>
        `<div class="testi-bubble pdp-reveal" style="--reveal-delay:${i * 100}ms">
          <p>"${x.text}"</p>
          <span>— ${x.who}</span>
        </div>`
    )
    .join('');
  const ba = productBeforeAfter(t);
  const baRows = ba
    .map(
      (row, i) =>
        `<div class="ba-row pdp-reveal" style="--reveal-delay:${i * 80}ms">
          <div class="ba-before"><span class="ba-tag">Before</span><p>${row.before}</p></div>
          <div class="ba-arrow" aria-hidden="true">→</div>
          <div class="ba-after"><span class="ba-tag ba-tag-after">After</span><p>${row.after}</p></div>
        </div>`
    )
    .join('');

  return `
<section class="pdp-showcase section">
  <p class="section-label pdp-reveal">See it in action</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">Preview · proof · <em>results</em></h2>
  <div class="showcase-carousel pdp-reveal" style="--reveal-delay:120ms" id="showcaseCarousel">
    <div class="showcase-tabs" role="tablist">
      <button type="button" class="showcase-tab active" data-slide="0" role="tab" aria-selected="true">Template preview</button>
      <button type="button" class="showcase-tab" data-slide="1" role="tab" aria-selected="false">Testimonials</button>
      <button type="button" class="showcase-tab" data-slide="2" role="tab" aria-selected="false">Before &amp; after</button>
    </div>
    <div class="showcase-viewport">
      <div class="showcase-track" id="showcaseTrack">
        <div class="showcase-slide showcase-slide-roll" role="tabpanel">
          <p class="showcase-slide-label">Roll through the template</p>
          <div class="roll-board">${colHtml(colA, 'roll-col-up')}${colHtml(colB, 'roll-col-down')}</div>
        </div>
        <div class="showcase-slide showcase-slide-testi" role="tabpanel">
          <div class="testi-head">
            <h3>What <em>creators</em> say</h3>
            <p>Real feedback from beauty &amp; small business owners.</p>
            <div class="testi-stats">
              <div><strong class="tabular-nums">500+</strong><span>downloads</span></div>
              <div><strong>★ 5.0</strong><span>avg. rating</span></div>
              <div><strong class="tabular-nums">30</strong><span>day support</span></div>
            </div>
          </div>
          <div class="testi-bubbles">${bubbles}</div>
        </div>
        <div class="showcase-slide showcase-slide-ba" role="tabpanel">
          <h3 class="ba-title">Before vs <em>after</em> you buy</h3>
          <p class="ba-sub">The shift our customers describe — from stuck to launched.</p>
          <div class="ba-rows">${baRows}</div>
        </div>
      </div>
      <button type="button" class="showcase-nav showcase-prev" id="showcasePrev" aria-label="Previous slide">‹</button>
      <button type="button" class="showcase-nav showcase-next" id="showcaseNext" aria-label="Next slide">›</button>
    </div>
    <div class="showcase-dots" id="showcaseDots">
      <button type="button" class="showcase-dot active" data-slide="0" aria-label="Slide 1"></button>
      <button type="button" class="showcase-dot" data-slide="1" aria-label="Slide 2"></button>
      <button type="button" class="showcase-dot" data-slide="2" aria-label="Slide 3"></button>
    </div>
  </div>
</section>`;
}

function productProcessHtml(t) {
  const steps = productPostPurchaseSteps(t);
  const rows = steps
    .map(
      (s, i) =>
        `<li class="process-step pdp-reveal" style="--reveal-delay:${i * 70}ms">
          <div class="process-marker"><span class="process-num tabular-nums">${i + 1}</span></div>
          <div class="process-body">
            <span class="process-time">${s.time}</span>
            <strong>${s.title}</strong>
            <p>${s.detail}</p>
          </div>
        </li>`
    )
    .join('');
  const buyLabel = t.slug === 'korean-lash-lift-training-manual' ? 'Buy on Etsy →' : 'Buy now on Etsy →';
  return `
<section class="pdp-process section" style="background:var(--cream);">
  <p class="section-label pdp-reveal">After you buy</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">Your path from <em>purchase</em> to launch</h2>
  <p class="process-intro pdp-reveal" style="--reveal-delay:100ms">No guesswork — here is exactly what happens after you checkout on Etsy, step by step.</p>
  <ol class="process-timeline">${rows}</ol>
  <div class="process-cta pdp-reveal" style="--reveal-delay:200ms">
    <a class="btn btn-pink" href="${t.etsy}" target="_blank" rel="noopener">${buyLabel}</a>
    <a class="btn btn-ghost" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Prefer we set it up? Book now</a>
  </div>
</section>`;
}

function productFunnelHtml(t) {
  const pains = productPainPoints(t);
  const painCards = pains
    .map(
      (p, i) =>
        `<article class="pain-card pdp-reveal" style="--reveal-delay:${i * 80}ms">
          <p class="pain-label">The problem</p>
          <p class="pain-text">${p.pain}</p>
          <p class="pain-fix">→ ${p.fix}</p>
        </article>`
    )
    .join('');
  const buyLabel = t.slug === 'korean-lash-lift-training-manual' ? 'Buy on Etsy →' : 'Buy now on Etsy →';
  return `
<section class="pdp-funnel section">
  <p class="section-label pdp-reveal">Why this template</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:80ms">Stop losing time.<br>Start <em>launching</em>.</h2>
  <p class="pdp-funnel-intro pdp-reveal" style="--reveal-delay:140ms">Most small businesses stall because the website never ships. This template removes the guesswork — so you can focus on clients, not late-night DIY.</p>
  <div class="pain-grid">${painCards}</div>
  <div class="pdp-funnel-cta pdp-reveal" style="--reveal-delay:260ms">
    <div>
      <p class="funnel-cta-price"><span class="price-current tabular-nums">$${t.price} AUD</span>${t.originalPrice ? `<span class="price-original tabular-nums">$${t.originalPrice}</span>` : ''}</p>
      <p style="color:var(--muted);font-size:.9rem;">One-time purchase · instant download</p>
    </div>
    <div style="display:flex;gap:.65rem;flex-wrap:wrap;">
      <button class="btn btn-pink" data-add-cart="${t.slug}">Add to cart</button>
      <a class="btn btn-dark" href="${t.etsy}" target="_blank" rel="noopener">${buyLabel}</a>
    </div>
  </div>
</section>`;
}

function productFaqHtml(t) {
  const items = productFaqs(t)
    .map(
      (f, i) =>
        `<details class="faq-item pdp-reveal" style="--reveal-delay:${i * 60}ms">
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`
    )
    .join('');
  return `
<section class="pdp-faq section" style="background:var(--cream);">
  <p class="section-label pdp-reveal">FAQ</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">Questions before <em>you buy</em></h2>
  <div class="faq-list">${items}</div>
  <p class="pdp-faq-footer pdp-reveal" style="--reveal-delay:120ms">Still unsure? <a href="/contact" style="color:var(--pink);">Message us</a> or <a href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener" style="color:var(--pink);">book a free discovery call</a>.</p>
</section>`;
}

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
  .pdp { display:grid; grid-template-columns:1.05fr .95fr; gap:3rem; padding:0 0 3rem; max-width:none; margin:0; align-items:start; }
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
  .breadcrumb { font-size:.85rem; color:var(--muted); }
  .breadcrumb a { color:var(--muted); text-decoration:none; }
  .breadcrumb a:hover { color:var(--pink); }
  .pdp-page { max-width:1200px; margin:0 auto; padding:1.25rem 4vw 0; }
  .pdp-breadcrumb {
    margin-bottom:1.25rem; padding-bottom:.85rem;
    border-bottom:1px solid var(--border);
  }
  .pdp-breadcrumb span { color:var(--charcoal); }
  .pdp-reveal {
    opacity:0; transform:translateY(14px); filter:blur(3px);
    transition: opacity 500ms cubic-bezier(0.2,0,0,1), transform 500ms cubic-bezier(0.2,0,0,1), filter 500ms cubic-bezier(0.2,0,0,1);
    transition-delay: var(--reveal-delay, 0ms);
  }
  .pdp-reveal.is-visible { opacity:1; transform:translateY(0); filter:blur(0); }
  .pain-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1rem; margin:2rem 0;
  }
  .pain-card {
    background:#fff; border-radius:16px; padding:1.25rem 1.35rem;
    box-shadow:var(--shadow-border);
    transition-property: transform, box-shadow;
    transition-duration:200ms;
  }
  .pain-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-lift); }
  .pain-label { font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--pink); margin-bottom:.45rem; }
  .pain-text { font-family:Fraunces,serif; font-size:1.05rem; font-weight:700; line-height:1.35; margin-bottom:.55rem; text-wrap:pretty; }
  .pain-fix { font-size:.88rem; color:var(--muted); line-height:1.6; text-wrap:pretty; }
  .pdp-funnel-intro { color:var(--muted); max-width:38rem; line-height:1.75; margin-bottom:.5rem; }
  .funnel-steps {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; margin:1.5rem 0 2rem;
  }
  .funnel-step {
    display:flex; gap:.85rem; align-items:flex-start; background:var(--cream);
    border-radius:14px; padding:1.1rem 1.2rem; box-shadow:var(--shadow-border);
  }
  .funnel-num {
    flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--black); color:#fff;
    display:grid; place-items:center; font-size:.82rem; font-weight:600; font-variant-numeric:tabular-nums;
  }
  .funnel-step strong { display:block; font-family:Fraunces,serif; margin-bottom:.2rem; }
  .funnel-step p { font-size:.85rem; color:var(--muted); text-wrap:pretty; }
  .pdp-funnel-cta {
    display:flex; justify-content:space-between; align-items:center; gap:1.25rem; flex-wrap:wrap;
    background:linear-gradient(135deg, rgba(214,125,154,.12), rgba(200,213,176,.18));
    border-radius:18px; padding:1.5rem 1.75rem; box-shadow:var(--shadow-border);
  }
  .funnel-cta-price { display:flex; align-items:baseline; gap:.55rem; margin-bottom:.25rem; }
  .funnel-cta-price .price-current { font-family:Fraunces,serif; font-size:1.75rem; font-weight:900; }
  .faq-list { display:grid; gap:.65rem; max-width:760px; margin-top:1.5rem; }
  .faq-item {
    background:#fff; border-radius:14px; padding:0 1.15rem;
    box-shadow:var(--shadow-border); overflow:hidden;
  }
  .faq-item summary {
    cursor:pointer; padding:1rem 0; font-family:Fraunces,serif; font-weight:700;
    list-style:none; display:flex; justify-content:space-between; align-items:center; gap:1rem;
    transition: color 150ms ease-out;
  }
  .faq-item summary::-webkit-details-marker { display:none; }
  .faq-item summary::after {
    content:'+'; font-size:1.2rem; color:var(--pink); flex-shrink:0;
    transition: transform 200ms cubic-bezier(0.2,0,0,1);
  }
  .faq-item[open] summary::after { transform:rotate(45deg); }
  .faq-item[open] summary { color:var(--pink); }
  .faq-item p {
    padding:0 0 1rem; color:var(--muted); font-size:.92rem; line-height:1.75; text-wrap:pretty;
    animation: faqOpen 280ms cubic-bezier(0.2,0,0,1);
  }
  @keyframes faqOpen {
    from { opacity:0; transform:translateY(-6px); }
    to { opacity:1; transform:translateY(0); }
  }
  .pdp-faq-footer { margin-top:1.75rem; color:var(--muted); font-size:.92rem; }
  .audience-intro { color:var(--muted); max-width:40rem; line-height:1.75; margin-bottom:1.5rem; }
  .audience-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-bottom:1.25rem;
  }
  .audience-card {
    background:#fff; border-radius:16px; padding:1.25rem; box-shadow:var(--shadow-border);
    transition-property: transform, box-shadow; transition-duration:200ms;
  }
  .audience-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-lift); }
  .audience-icon { font-size:1.5rem; display:block; margin-bottom:.5rem; }
  .audience-card h3 { font-family:Fraunces,serif; font-size:1.05rem; margin-bottom:.35rem; }
  .audience-card p { font-size:.88rem; color:var(--muted); line-height:1.6; text-wrap:pretty; }
  .audience-not { font-size:.9rem; color:var(--muted); padding:1rem 1.15rem; background:rgba(255,255,255,.65); border-radius:12px; text-wrap:pretty; }
  .showcase-carousel { max-width:900px; margin:0 auto; }
  .showcase-tabs { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:1rem; }
  .showcase-tab {
    border:none; background:#fff; border-radius:999px; padding:.55rem 1rem; font-family:inherit;
    font-size:.8rem; cursor:pointer; box-shadow:var(--shadow-border); color:var(--muted);
    transition-property: background-color, color, box-shadow, transform;
    transition-duration:150ms;
  }
  .showcase-tab.active { background:var(--black); color:#fff; box-shadow:none; }
  .showcase-tab:active { transform:scale(0.96); }
  .showcase-viewport {
    position:relative; overflow:hidden; border-radius:20px; background:#fff;
    box-shadow:var(--shadow-border); min-height:380px;
  }
  .showcase-track {
    display:flex; width:300%; transition: transform 450ms cubic-bezier(0.2,0,0,1);
  }
  .showcase-slide {
    width:33.333%; flex-shrink:0; padding:1.5rem 1.75rem 1.75rem; box-sizing:border-box;
  }
  .showcase-slide-label { font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:.75rem; }
  .roll-board {
    display:grid; grid-template-columns:1fr 1fr; gap:.65rem; height:300px; overflow:hidden;
    border-radius:14px; background:var(--cream); padding:.5rem;
  }
  .roll-col { overflow:hidden; border-radius:10px; }
  .roll-track { display:flex; flex-direction:column; gap:.5rem; }
  .roll-col-up .roll-track { animation: rollUp 22s linear infinite; }
  .roll-col-down .roll-track { animation: rollDown 26s linear infinite; }
  @keyframes rollUp {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
  @keyframes rollDown {
    from { transform: translateY(-50%); }
    to { transform: translateY(0); }
  }
  .roll-cell { border-radius:10px; overflow:hidden; flex-shrink:0; box-shadow:var(--shadow-border); }
  .roll-cell img { width:100%; height:100%; object-fit:cover; }
  .testi-head h3 { font-family:Fraunces,serif; font-size:1.5rem; margin-bottom:.25rem; }
  .testi-head h3 em { font-style:italic; color:var(--pink); font-weight:300; }
  .testi-head p { color:var(--muted); font-size:.9rem; margin-bottom:1rem; }
  .testi-stats {
    display:flex; gap:1.25rem; flex-wrap:wrap; margin-bottom:1.25rem;
  }
  .testi-stats div { text-align:center; }
  .testi-stats strong { display:block; font-family:Fraunces,serif; font-size:1.35rem; }
  .testi-stats span { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
  .testi-bubbles { display:grid; gap:.65rem; }
  .testi-bubble {
    background:var(--cream); border-radius:16px 16px 16px 4px; padding:.9rem 1.1rem;
    box-shadow:var(--shadow-border); max-width:95%;
  }
  .testi-bubble:nth-child(even) { border-radius:16px 16px 4px 16px; margin-left:auto; }
  .testi-bubble p { font-size:.9rem; line-height:1.55; margin-bottom:.35rem; text-wrap:pretty; }
  .testi-bubble span { font-size:.78rem; color:var(--muted); }
  .ba-title { font-family:Fraunces,serif; font-size:1.4rem; margin-bottom:.25rem; }
  .ba-title em { font-style:italic; color:var(--pink); font-weight:300; }
  .ba-sub { color:var(--muted); font-size:.9rem; margin-bottom:1.25rem; }
  .ba-rows { display:grid; gap:.75rem; }
  .ba-row {
    display:grid; grid-template-columns:1fr auto 1fr; gap:.5rem; align-items:stretch;
  }
  .ba-before, .ba-after {
    border-radius:14px; padding:1rem; font-size:.88rem; line-height:1.55; text-wrap:pretty;
  }
  .ba-before { background:#fff5f5; box-shadow:var(--shadow-border); }
  .ba-after { background:#f0faf0; box-shadow:var(--shadow-border); }
  .ba-tag {
    display:inline-block; font-size:.65rem; letter-spacing:.12em; text-transform:uppercase;
    font-weight:600; color:#c44; margin-bottom:.4rem;
  }
  .ba-tag-after { color:#2d6a4f; }
  .ba-arrow { display:grid; place-items:center; color:var(--pink); font-size:1.2rem; font-weight:700; }
  .ba-before p, .ba-after p { color:var(--charcoal); }
  .showcase-nav {
    position:absolute; top:50%; transform:translateY(-50%); width:36px; height:36px; border-radius:50%;
    border:none; background:rgba(255,255,255,.95); font-size:1.1rem; cursor:pointer; z-index:2;
    box-shadow:var(--shadow-border-hover);
    transition-property: transform; transition-duration:150ms;
  }
  .showcase-nav:active { transform:translateY(-50%) scale(0.96); }
  .showcase-prev { left:8px; }
  .showcase-next { right:8px; padding-left:2px; }
  .showcase-dots { display:flex; justify-content:center; gap:.45rem; margin-top:1rem; }
  .showcase-dot {
    width:8px; height:8px; border-radius:50%; border:none; padding:0; background:rgba(0,0,0,.15); cursor:pointer;
    transition-property: transform, background-color; transition-duration:150ms;
  }
  .showcase-dot.active { background:var(--pink); transform:scale(1.2); }
  .process-intro { color:var(--muted); max-width:38rem; line-height:1.75; margin-bottom:1.75rem; }
  .process-timeline {
    list-style:none; display:grid; gap:0; max-width:720px; margin:0 auto 2rem;
    position:relative;
  }
  .process-timeline::before {
    content:''; position:absolute; left:19px; top:12px; bottom:12px; width:2px;
    background:linear-gradient(180deg, var(--pink), rgba(214,125,154,.2));
  }
  .process-step {
    display:flex; gap:1.15rem; padding:0 0 1.5rem; position:relative;
  }
  .process-marker { flex-shrink:0; z-index:1; }
  .process-num {
    width:40px; height:40px; border-radius:50%; background:var(--black); color:#fff;
    display:grid; place-items:center; font-size:.85rem; font-weight:600;
    box-shadow:0 0 0 4px var(--cream);
  }
  .process-time {
    display:inline-block; font-size:.68rem; letter-spacing:.12em; text-transform:uppercase;
    color:var(--pink); margin-bottom:.2rem;
  }
  .process-body strong { display:block; font-family:Fraunces,serif; font-size:1.1rem; margin-bottom:.35rem; }
  .process-body p { font-size:.9rem; color:var(--muted); line-height:1.7; text-wrap:pretty; }
  .process-cta { display:flex; gap:.65rem; flex-wrap:wrap; justify-content:center; }
  @media (max-width:640px) {
    .ba-row { grid-template-columns:1fr; }
    .ba-arrow { transform:rotate(90deg); justify-self:center; }
    .showcase-slide { padding:1.15rem; }
    .roll-board { height:260px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pdp-reveal { opacity:1; transform:none; filter:none; transition:none; }
    .faq-item p { animation:none; }
    .roll-col-up .roll-track, .roll-col-down .roll-track { animation:none; }
    .showcase-track { transition:none; }
  }
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
  @media (max-width:900px){ .pdp { grid-template-columns:1fr; gap:1.75rem; padding-top:0; } }
</style>
<div class="pdp-page">
  <nav class="breadcrumb pdp-breadcrumb" aria-label="Breadcrumb">
    <a href="/shop">Shop</a> <span aria-hidden="true">/</span> <span>${t.name}</span>
  </nav>
  <div class="pdp">
    <div class="pdp-reveal is-visible">${galleryMain}</div>
    <div class="pdp-info pdp-reveal" style="--reveal-delay:100ms">
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
</div>
${productAudienceHtml(t)}
${productShowcaseCarouselHtml(t)}
${productFunnelHtml(t)}
${productProcessHtml(t)}
${productFaqHtml(t)}
<section class="section" style="padding-top:0;">
  <h2 class="section-title pdp-reveal">You may also <em>like</em></h2>
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

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var reveals = document.querySelectorAll('.pdp-reveal:not(.is-visible)');
    if(reveals.length && 'IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function(el){ io.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('is-visible'); });
    }
  } else {
    document.querySelectorAll('.pdp-reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }

  var showcase = document.getElementById('showcaseCarousel');
  if(showcase){
    var track = document.getElementById('showcaseTrack');
    var slide = 0;
    var total = 3;
    var timer;
    function goTo(n){
      slide = (n + total) % total;
      if(track) track.style.transform = 'translateX(-' + (slide * (100 / total)) + '%)';
      showcase.querySelectorAll('.showcase-dot').forEach(function(d, i){
        d.classList.toggle('active', i === slide);
      });
      showcase.querySelectorAll('.showcase-tab').forEach(function(tab, i){
        tab.classList.toggle('active', i === slide);
        tab.setAttribute('aria-selected', i === slide ? 'true' : 'false');
      });
    }
    function next(){ goTo(slide + 1); }
    function startAuto(){
      clearInterval(timer);
      if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        timer = setInterval(next, 5500);
      }
    }
    showcase.querySelectorAll('[data-slide]').forEach(function(btn){
      btn.addEventListener('click', function(){
        goTo(parseInt(btn.getAttribute('data-slide'), 10) || 0);
        startAuto();
      });
    });
    var sp = document.getElementById('showcasePrev');
    var sn = document.getElementById('showcaseNext');
    if(sp) sp.addEventListener('click', function(){ goTo(slide - 1); startAuto(); });
    if(sn) sn.addEventListener('click', function(){ goTo(slide + 1); startAuto(); });
    showcase.addEventListener('mouseenter', function(){ clearInterval(timer); });
    showcase.addEventListener('mouseleave', startAuto);
    var sx = 0;
    showcase.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, { passive:true });
    showcase.addEventListener('touchend', function(e){
      var dx = e.changedTouches[0].clientX - sx;
      if(Math.abs(dx) < 40) return;
      goTo(dx < 0 ? slide + 1 : slide - 1);
      startAuto();
    }, { passive:true });
    goTo(0);
    startAuto();
  }
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
