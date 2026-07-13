/**
 * Bloomie House — Cloudflare Worker
 * Ecommerce-style multi-page site (templates shop + services)
 * + member portal & staff CMS (see src/portal/)
 */

import { handlePortal } from './portal/router.js';
import {
  createPolarCheckout,
  handlePolarWebhook,
  polarConfigured,
} from './polar.js';

const LOGO =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-square-house-pink-background-transparent.png';
const LOGO_LONG =
  'https://pub-2edc5bff11ae4320afcd629f83ef44ee.r2.dev/Logo/logo-long-house-green-background-transparent.png';
const ETSY_SHOP = 'https://bloomlashbar.etsy.com';
const ETSY_ALT = 'https://bloomlashbar.etsy.com';
const ETSY_KOREAN_LASH_MANUAL = 'https://bloomlashbar.etsy.com';
const JOTFORM_DISCOVERY = 'https://form.jotform.com/haiyen0304/website-design-discovery';
const JOTFORM_CUSTOM = 'https://form.jotform.com/jsform/253192865445869';
const SITE = 'https://bloomiehouse.com.au';

const MOCK = '/mockups';
const AVATARS = `${MOCK}/avatars`;

const templateData = [
  {
    slug: 'korean-lash-lift-training-manual',
    collection: 'beauty',
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
      'Instant digital delivery',
    ],
    etsy: ETSY_KOREAN_LASH_MANUAL,
    polarProductId: '019b8f4c-75c7-41c8-b5e3-59d28a0320c1',
  },
  {
    slug: 'wedding-rsvp',
    collection: 'wedding',
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
    collection: 'beauty',
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
    collection: 'beauty',
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
    collection: 'beauty',
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
    collection: 'beauty',
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
    collection: 'others',
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
    collection: 'beauty',
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
    collection: 'others',
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
        pain: 'You want to launch a Korean lash lift course — but have no lash training curriculum ready',
        painHl: 'Korean lash lift course',
        fix: '200+ page lash lift & tint training manual — professional content, fully editable in Canva',
        fixHl: 'lash lift & tint training manual',
      },
      {
        pain: 'Students keep asking the same lash lift theory & aftercare questions',
        painHl: 'lash lift theory & aftercare',
        fix: 'Structured lash educator manual covers technique, tinting, troubleshooting & client care',
        fixHl: 'lash educator manual',
      },
      {
        pain: 'Bigger lash academies look more credible than your solo training business',
        painHl: 'lash academies',
        fix: 'Polished, branded Canva curriculum you can resell with your academy logo',
        fixHl: 'Canva curriculum',
      },
      {
        pain: 'Writing a lash lift training manual from scratch takes months you don’t have',
        painHl: 'lash lift training manual',
        fix: 'Instant digital download — customise your course material and start enrolling students this week',
        fixHl: 'start enrolling students',
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
      a: 'Pay securely on Bloomie House checkout (powered by Polar). You’ll receive an instant digital download link by email — usually within minutes.',
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
      a: `Yes. Pay once ($${t.price} AUD), keep the template forever. No monthly template fee from Bloomie House.`,
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
      { name: 'Mia T.', city: 'Melbourne', avatar: `${AVATARS}/avatar-mia.jpg`, text: 'Finally have a manual I can brand and hand to students. Saved me weeks of writing.', highlight: 'Saved me weeks' },
      { name: 'Jess L.', city: 'Sydney', avatar: `${AVATARS}/avatar-jess.jpg`, text: 'My 1:1 training feels so much more professional now — students love the layout.', highlight: 'so much more professional' },
      { name: 'Naomi W.', city: 'Brisbane', avatar: `${AVATARS}/avatar-naomi.jpg`, text: 'Worth every dollar. Edited in Canva in one afternoon and started teaching next week.', highlight: 'started teaching next week' },
      { name: 'Ella R.', city: 'Perth', avatar: `${AVATARS}/avatar-ella.jpg`, text: 'Exactly what my academy needed. The curriculum structure is spot-on for Korean lash lift.', highlight: 'spot-on for Korean lash lift' },
      { name: 'Amara J.', city: 'Hobart', avatar: `${AVATARS}/avatar-amara.jpg`, text: 'Best purchase for my training business. Students ask where I got the manual!', highlight: 'Best purchase' },
      { name: 'Sophie W.', city: 'Adelaide', avatar: `${AVATARS}/avatar-sophie.jpg`, text: 'Clean, aesthetic, easy to customise. I added my logo and launched my course the same week.', highlight: 'launched my course' },
    ];
  }
  return [
    { name: 'Chloe M.', city: 'Melbourne', avatar: `${AVATARS}/avatar-chloe.jpg`, text: `Exactly what my ${t.niche.toLowerCase()} business needed — live in a weekend, not months.`, highlight: 'live in a weekend' },
    { name: 'Amy N.', city: 'Sydney', avatar: `${AVATARS}/avatar-amy.jpg`, text: 'Clean, aesthetic, and easy to customise. Clients keep complimenting the site.', highlight: 'easy to customise' },
    { name: 'Kate B.', city: 'Brisbane', avatar: `${AVATARS}/avatar-kate.jpg`, text: 'Best template purchase I have made. The layout just converts — more enquiries straight away.', highlight: 'more enquiries' },
    { name: 'Zara H.', city: 'Hobart', avatar: `${AVATARS}/avatar-zara.jpg`, text: 'Your templates are beyond my expectations — bought so many before but nothing comes close.', highlight: 'beyond my expectations' },
    { name: 'Sarah D.', city: 'Perth', avatar: `${AVATARS}/avatar-sarah.jpg`, text: 'Just joined and wow… everything is so aesthetic and easy to work with. You thought of everything!', highlight: 'so aesthetic' },
    { name: 'Jade K.', city: 'Canberra', avatar: `${AVATARS}/avatar-jade.jpg`, text: 'Feeling ready to start my business properly. Professional look without the agency price tag.', highlight: 'ready to start my business' },
  ];
}

function productBeforeAfter(t) {
  const pains = productPainPoints(t);
  return pains.map((p) => ({
    before: p.pain,
    beforeHl: p.painHl || null,
    after: p.fix,
    afterHl: p.fixHl || null,
  }));
}

function productBeforeAfterIntro(t) {
  if (t.slug === 'korean-lash-lift-training-manual') {
    return 'Lash educators and academy owners use this <strong>Canva lash lift training manual</strong> to go from zero curriculum to a branded, resell-ready course — without months of writing.';
  }
  if (t.category === 'canva') {
    return `Small ${t.niche.toLowerCase()} businesses swap DIY website stress for a <strong>${t.platform} website template</strong> built for your industry — publish faster, look professional, win more enquiries.`;
  }
  if (t.category === 'wix') {
    return `Beauty & service businesses replace clunky booking flows with a <strong>${t.niche} Wix Studio template</strong> — luxury look, mobile-ready, live in days not months.`;
  }
  return `Tradies and local service businesses launch a <strong>${t.niche} website template</strong> that builds trust — quote forms, reviews, and portfolio sections included.`;
}

function baHighlight(text, phrase, cls) {
  if (!phrase || !text.includes(phrase)) return text;
  return text.replace(phrase, `<em class="${cls}">${phrase}</em>`);
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
      title: 'Secure checkout',
      detail:
        'Complete payment at checkout. As soon as your order is confirmed, you will receive an instant email with everything you need to access your purchase.',
    },
    {
      time: '1–5 min',
      title: 'Open your access email',
      detail:
        'Check your inbox (and spam folder) for your order confirmation. Follow the link inside to download your template files, setup guide, and any bonus materials.',
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

function productValueBonuses(t) {
  const industry = t.niche.toLowerCase();
  return [
    { icon: '⚡', label: `${t.platform} template — saves weeks of design`, value: t.originalPrice ? `$${t.originalPrice}` : '$127' },
    { icon: '🎯', label: `Built accurately for ${industry} businesses`, value: 'Included' },
    { icon: '📱', label: 'Free Instagram story template bonus', value: '$29' },
    { icon: '📧', label: 'Updated versions — email notifications', value: 'Included' },
    { icon: '🆕', label: 'Early access to new course & template drops', value: 'Included' },
    { icon: '📖', label: 'Step-by-step setup guide + 30-day support', value: '$49' },
  ];
}

function productTestimonialsHtml(t) {
  const items = productTestimonials(t);
  const bubble = (x) => {
    const text = x.highlight
      ? x.text.replace(x.highlight, `<em class="testi-hl">${x.highlight}</em>`)
      : x.text;
    return `<div class="testi-card">
      <div class="testi-avatar">
        <img src="${x.avatar}" alt="" width="40" height="40" loading="lazy" decoding="async">
      </div>
      <div class="testi-card-body">
        <p>"${text}"</p>
        <span>${x.name} · ${x.city}</span>
      </div>
    </div>`;
  };
  const track = items.map(bubble).join('') + items.map(bubble).join('');
  return `
<section class="pdp-testimonials section">
  <p class="section-label pdp-reveal">Social proof</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">What <em>customers</em> say</h2>
  <p class="testi-sub pdp-reveal" style="--reveal-delay:100ms">Real creators sharing their experience.</p>
  <div class="testi-stats pdp-reveal" style="--reveal-delay:140ms">
    <div><strong class="tabular-nums">500+</strong><span>creators worldwide</span></div>
    <div><strong class="tabular-nums">80+</strong><span>countries</span></div>
    <div><strong>★ 5.0</strong><span>average rating</span></div>
    <div><strong class="tabular-nums">30</strong><span>day support</span></div>
  </div>
  <div class="testi-marquee-mask pdp-reveal" style="--reveal-delay:180ms">
    <div class="testi-marquee-track">${track}</div>
  </div>
</section>`;
}

function productBeforeAfterHtml(t) {
  const ba = productBeforeAfter(t);
  const isTraining = t.slug === 'korean-lash-lift-training-manual';
  const seoTitle = isTraining
    ? 'From blank page to <em>lash lift curriculum</em>'
    : 'Before vs <em>after</em> you buy';
  const baPairs = ba
    .map((row, i) => {
      const num = String(i + 1).padStart(2, '0');
      const beforeText = baHighlight(row.before, row.beforeHl, 'ba-hl-before');
      const afterText = baHighlight(row.after, row.afterHl, 'ba-hl-after');
      return `<article class="ba-pair pdp-reveal" style="--reveal-delay:${i * 120}ms" aria-label="Transformation step ${i + 1}">
        <div class="ba-step" aria-hidden="true"><span class="ba-step-num tabular-nums">${num}</span></div>
        <div class="ba-pair-body">
          <div class="ba-card ba-before">
            <span class="ba-tag"><span class="ba-tag-dot ba-tag-dot-before"></span>Before</span>
            <p>${beforeText}</p>
          </div>
          <div class="ba-connector" aria-hidden="true">
            <span class="ba-connector-line"></span>
            <span class="ba-connector-pulse"></span>
            <span class="ba-connector-icon">↓</span>
          </div>
          <div class="ba-card ba-after">
            <span class="ba-tag ba-tag-after"><span class="ba-tag-dot ba-tag-dot-after"></span>After</span>
            <p>${afterText}</p>
          </div>
        </div>
      </article>`;
    })
    .join('');
  return `
<section class="pdp-before-after section" aria-labelledby="ba-heading">
  <div class="ba-bg-glow" aria-hidden="true"></div>
  <p class="section-label pdp-reveal">The transformation</p>
  <h2 class="section-title pdp-reveal" id="ba-heading" style="--reveal-delay:60ms">${seoTitle}</h2>
  <p class="ba-sub pdp-reveal" style="--reveal-delay:100ms">${productBeforeAfterIntro(t)}</p>
  <div class="ba-timeline">${baPairs}</div>
</section>`;
}

function productCalculatorHtml(t) {
  const isTraining =
    t.slug === 'korean-lash-lift-training-manual' || /training|academy|educat/i.test(t.niche);
  const minStudents = 1;
  const maxStudents = isTraining ? 40 : 24;
  const minPrice = isTraining ? 297 : 79;
  const maxPrice = isTraining ? 1997 : 497;
  const defaultStudents = isTraining ? 8 : 5;
  const defaultPrice = isTraining ? 697 : 189;
  const investLabel = isTraining ? 'Template investment (one-time)' : 'Template cost (one-time)';
  const countLabel = isTraining ? 'Students you enrol' : 'New clients per month';
  const priceLabel = isTraining ? 'Course price per student' : 'Average booking / sale value';
  return `
<section class="pdp-calculator section">
  <p class="section-label pdp-reveal">ROI calculator</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">See your <em>profit</em> potential</h2>
  <p class="calc-intro pdp-reveal" style="--reveal-delay:100ms">Drag the sliders — watch your profit per ${isTraining ? 'student' : 'client'} and total return grow.</p>
  <div class="calc-card pdp-reveal" style="--reveal-delay:140ms" id="profitCalc" data-invest="${t.price}" data-training="${isTraining ? '1' : '0'}">
    <div class="calc-row">
      <label for="calcStudents">${countLabel}: <strong id="calcStudentsVal" class="tabular-nums">${defaultStudents}</strong></label>
      <input type="range" id="calcStudents" min="${minStudents}" max="${maxStudents}" value="${defaultStudents}" class="calc-slider">
    </div>
    <div class="calc-row">
      <label for="calcPrice">${priceLabel}: <strong id="calcPriceVal" class="tabular-nums">$${defaultPrice}</strong></label>
      <input type="range" id="calcPrice" min="${minPrice}" max="${maxPrice}" step="${isTraining ? 50 : 10}" value="${defaultPrice}" class="calc-slider">
    </div>
    <div class="calc-results">
      <div class="calc-result">
        <span class="calc-result-label">${investLabel}</span>
        <span class="calc-result-val tabular-nums" id="calcInvest">$${t.price}</span>
      </div>
      <div class="calc-result calc-result-highlight">
        <span class="calc-result-label">Profit per ${isTraining ? 'student' : 'client'}</span>
        <span class="calc-result-val tabular-nums" id="calcPerUnit">$${defaultPrice}</span>
      </div>
      <div class="calc-result calc-result-total">
        <span class="calc-result-label">Total ${isTraining ? 'profit' : 'monthly revenue'}</span>
        <span class="calc-result-val tabular-nums" id="calcTotal">$${(defaultStudents * defaultPrice - t.price).toFixed(0)}</span>
      </div>
    </div>
    <p class="calc-note">*Estimates only. Your results depend on pricing, demand &amp; how you market.</p>
  </div>
</section>`;
}

function productValueStackHtml(t) {
  const bonuses = productValueBonuses(t);
  const rows = bonuses
    .map(
      (b) =>
        `<li><span class="value-icon" aria-hidden="true">${b.icon}</span><span class="value-label">${b.label}</span><span class="value-amt">${b.value}</span></li>`
    )
    .join('');
  const totalValue = t.originalPrice
    ? t.originalPrice + 127
    : Math.round(t.price * 8);
  const buyLabel = t.slug === 'korean-lash-lift-training-manual' ? 'Get Instant Access →' : 'Get Instant Access →';
  return `
<section class="pdp-value section" style="background:var(--cream);">
  <div class="value-card pdp-reveal">
    <span class="value-badge">Everything you get</span>
    <h2 class="value-title">${t.name}</h2>
    <div class="star-seller-badge">
      <span class="star-seller-icon">★</span>
      <span><strong>Star Seller</strong> · 5.0 average rating · trusted by 500+ creators</span>
    </div>
    <ul class="value-list">${rows}</ul>
    <div class="value-total-row">
      <span>Total value</span>
      <span class="value-strike tabular-nums">$${totalValue} AUD</span>
    </div>
    <div class="value-price tabular-nums">$${t.price} AUD</div>
    <p class="value-terms">ONE-TIME PAYMENT · INSTANT DIGITAL ACCESS</p>
    <p class="value-script">Pay once — have it for life. Keep it forever ✨</p>
    <button type="button" class="btn btn-dark value-cta" data-add-cart="${t.slug}">${buyLabel}</button>
  </div>
</section>`;
}

function productSocialProofBuyers(t) {
  const others = templateData.filter((x) => x.slug !== t.slug);
  const pick = (slug) => others.find((x) => x.slug === slug) || others[0];
  const luxspa = pick('luxspa-beauty-nails');
  const studio = pick('the-studio');
  const wedding = pick('wedding-rsvp');
  const seoul = pick('seoul-soft-korean-lash');
  return [
    {
      name: 'Talia R.',
      product: t.name,
      city: 'Gold Coast',
      ago: '3 min',
      thumb: { kind: 'photo', src: `${AVATARS}/popup-talia.jpg` },
    },
    {
      name: 'Monique B.',
      product: luxspa?.name || 'LuxSpa Beauty & Nails',
      city: 'Sydney',
      ago: '7 min',
      thumb: { kind: 'photo', src: `${AVATARS}/popup-monique.jpg` },
    },
    {
      name: 'Lash Academy AU',
      product: 'Korean Lash Lift Manual',
      city: 'Brisbane',
      ago: '12 min',
      thumb: { kind: 'logo', src: `${MOCK}/korean-lash-lift-hero.jpg`, brand: false },
    },
    {
      name: 'Hannah C.',
      product: t.name,
      city: 'Perth',
      ago: '16 min',
      thumb: { kind: 'photo', src: `${AVATARS}/popup-hannah.jpg` },
    },
    {
      name: 'Studio Nine',
      product: studio?.name || 'The Studio',
      city: 'Melbourne',
      ago: '21 min',
      thumb: { kind: 'initial', text: 'S9', tone: 'pink' },
    },
    {
      name: 'Danielle P.',
      product: wedding?.name || 'Wedding Invitation RSVP',
      city: 'Hobart',
      ago: '28 min',
      thumb: { kind: 'photo', src: `${AVATARS}/popup-danielle.jpg` },
    },
    {
      name: 'Bloomie House',
      product: t.name,
      city: 'Australia',
      ago: '5 min',
      thumb: { kind: 'logo', src: LOGO, brand: true },
    },
    {
      name: 'Luxe Wellness',
      product: luxspa?.name || 'LuxSpa Beauty & Nails',
      city: 'Canberra',
      ago: '14 min',
      thumb: { kind: 'initial', text: 'LW', tone: 'sage' },
    },
    {
      name: 'Ruby F.',
      product: t.name,
      city: 'Darwin',
      ago: '19 min',
      thumb: { kind: 'photo', src: `${AVATARS}/popup-ruby.jpg` },
    },
    {
      name: 'Seoul Lash Bar',
      product: seoul?.name || 'Seoul Soft Korean Lash Lift',
      city: 'Adelaide',
      ago: '25 min',
      thumb: { kind: 'logo', src: seoul?.images?.[0] || `${MOCK}/seoul-soft-korean.jpg`, brand: false },
    },
  ];
}

function productSocialProofPopupHtml(t) {
  const buyers = productSocialProofBuyers(t);
  const first = buyers[0];
  return `
<div class="social-proof-popup" id="socialProofPopup" role="status" aria-live="polite" hidden>
  <div class="social-proof-avatar social-proof-thumb-photo" id="socialProofAvatar"></div>
  <div class="social-proof-text">
    <strong id="socialProofName">${first.name}</strong>
    <span id="socialProofAction">purchased ${first.product}</span>
    <small id="socialProofMeta">${first.city} · just now</small>
  </div>
  <button type="button" class="social-proof-close" id="socialProofClose" aria-label="Dismiss">×</button>
</div>
<script>
(function(){
  var buyers = ${JSON.stringify(buyers)};
  var popup = document.getElementById('socialProofPopup');
  if(!popup || !buyers.length) return;
  var lastIdx = -1;
  var dismissed = false;
  var avatarEl = document.getElementById('socialProofAvatar');
  var nameEl = document.getElementById('socialProofName');
  var actionEl = document.getElementById('socialProofAction');
  var metaEl = document.getElementById('socialProofMeta');
  var closeBtn = document.getElementById('socialProofClose');
  function setThumb(el, thumb){
    if(!el || !thumb) return;
    el.innerHTML = '';
    el.className = 'social-proof-avatar social-proof-thumb-' + thumb.kind + (thumb.tone ? ' is-' + thumb.tone : '') + (thumb.brand ? ' is-brand' : '');
    if(thumb.kind === 'photo' || thumb.kind === 'logo'){
      var img = document.createElement('img');
      img.src = thumb.src;
      img.alt = '';
      img.width = 44;
      img.height = 44;
      img.loading = 'lazy';
      img.decoding = 'async';
      el.appendChild(img);
    } else if(thumb.kind === 'initial'){
      var span = document.createElement('span');
      span.className = 'social-proof-initial';
      span.textContent = thumb.text || '?';
      el.appendChild(span);
    }
  }
  function pickBuyer(){
    if(buyers.length === 1) return 0;
    var i;
    do { i = Math.floor(Math.random() * buyers.length); } while(i === lastIdx);
    lastIdx = i;
    return i;
  }
  function show(){
    if(dismissed) return;
    var b = buyers[pickBuyer()];
    setThumb(avatarEl, b.thumb);
    if(nameEl) nameEl.textContent = b.name;
    if(actionEl) actionEl.textContent = 'purchased ' + b.product;
    if(metaEl) metaEl.textContent = b.city + ' · ' + b.ago + ' ago';
    popup.hidden = false;
    popup.classList.remove('is-leaving');
    popup.classList.add('is-visible');
    setTimeout(function(){
      popup.classList.add('is-leaving');
      setTimeout(function(){
        popup.classList.remove('is-visible');
        popup.hidden = true;
      }, 400);
    }, 5000);
  }
  if(closeBtn) closeBtn.addEventListener('click', function(){ dismissed = true; popup.hidden = true; });
  setTimeout(show, 8000);
  setInterval(function(){ if(!dismissed) show(); }, 22000);
})();
</script>`;
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
  return `
<section class="pdp-process section" style="background:var(--cream);">
  <p class="section-label pdp-reveal">After you buy</p>
  <h2 class="section-title pdp-reveal" style="--reveal-delay:60ms">Your path from <em>purchase</em> to launch</h2>
  <p class="process-intro pdp-reveal" style="--reveal-delay:100ms">No guesswork — here is exactly what happens once payment is confirmed, step by step.</p>
  <ol class="process-timeline">${rows}</ol>
  <div class="process-notice pdp-reveal" style="--reveal-delay:180ms">
    <p class="process-warning"><strong>Please note:</strong> Digital template purchases are <strong>non-refundable</strong> because access is delivered instantly. Read every section on this page, check what is included, and make sure this template is right for you before you buy.</p>
    <p class="process-support">Still unsure? Email <a href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a> — our dedicated support team is happy to answer questions before you purchase.</p>
  </div>
  <div class="process-cta pdp-reveal" style="--reveal-delay:240ms">
    <button type="button" class="btn btn-pink" data-add-cart="${t.slug}">Add to cart</button>
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
  const buyLabel = 'Checkout now →';
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
      <button type="button" class="btn btn-dark" data-buy-now="${t.slug}">${buyLabel}</button>
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

    // Member portal + staff CMS (auth, /member, /admin, related APIs)
    if (
      pathname.startsWith('/member') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/api/member') ||
      pathname.startsWith('/api/admin') ||
      pathname.startsWith('/media/products/')
    ) {
      const portalRes = await handlePortal(request, env, pathname, templateData);
      if (portalRes) return portalRes;
    }

    switch (pathname) {
      case '/':
        return htmlResponse(homePage());

      case '/shop':
      case '/templates':
      case '/digital-templates':
        return htmlResponse(shopPage(url.searchParams.get('platform') || 'all'));

      case '/cart':
        return htmlResponse(cartPage(), 200, 'no-store');

      case '/checkout':
        return htmlResponse(checkoutPage(), 200, 'no-store');

      case '/checkout/success':
        return htmlResponse(checkoutSuccessPage(url), 200, 'no-store');

      case '/services':
      case '/website-design':
        return htmlResponse(servicesPage());

      case '/full-custom':
      case '/bespoke':
        return htmlResponse(fullCustomPage());

      case '/one-day-website':
        return htmlResponse(oneDayWebsitePage());

      case '/start-a-project':
        return htmlResponse(startProjectPage());

      case '/beauty':
        return htmlResponse(collectionPage('beauty'));

      case '/wedding':
        return htmlResponse(collectionPage('wedding'));

      case '/others':
        return htmlResponse(collectionPage('others'));

      case '/blog':
        return htmlResponse(blogPage());

      case '/contact':
        return htmlResponse(contactPage());

      case '/about':
        return htmlResponse(aboutPage());

      case '/sitemap.xml':
        return sitemapResponse();

      case '/api/chat':
        return handleChat(request, env);

      case '/api/checkout':
        if (request.method !== 'POST') {
          return jsonResponse({ error: 'Method not allowed.' }, 405);
        }
        return handleCheckoutApi(request, env);

      case '/api/webhooks/polar':
        if (request.method !== 'POST') {
          return jsonResponse({ error: 'Method not allowed.' }, 405);
        }
        return handlePolarWebhook(request, env, templateData);

      case '/favicon.ico':
      case '/favicon.png':
        return Response.redirect(LOGO, 301);

      default: {
        if (pathname.startsWith('/blog/')) {
          const slug = pathname.split('/').pop();
          const article = blogArticlePage(slug);
          if (article) return htmlResponse(article);
        }
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

async function handleCheckoutApi(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }
  const items = Array.isArray(body?.items) ? body.items : [];
  if (!items.length) {
    return jsonResponse({ error: 'Cart is empty.' }, 400);
  }
  const origin = body?.origin || new URL(request.url).origin;
  const result = await createPolarCheckout(env, request, {
    items,
    origin,
    templateData,
  });
  if (!result.ok) {
    return jsonResponse(
      { error: result.error, configured: polarConfigured(env) },
      result.status || 500
    );
  }
  return jsonResponse({ url: result.url, id: result.id, configured: true });
}

function sitemapResponse() {
  const urls = [
    ['/', '1.0'],
    ['/shop', '0.9'],
    ['/beauty', '0.85'],
    ['/wedding', '0.85'],
    ['/others', '0.85'],
    ['/services', '0.8'],
    ['/one-day-website', '0.75'],
    ['/start-a-project', '0.8'],
    ['/full-custom', '0.7'],
    ['/blog', '0.6'],
    ['/blog/build-a-website-with-claude-ai', '0.5'],
    ['/blog/ai-tools-for-lash-artists', '0.5'],
    ['/blog/template-vs-custom-website', '0.5'],
    ['/contact', '0.6'],
    ['/about', '0.5'],
    ['/cart', '0.3'],
    ['/checkout', '0.3'],
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
- Point people to /shop, /cart, /checkout (secure Polar checkout), /contact, or the discovery form on /services.

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
  --black: #0E0E0E;
  --white: #FFFBF9;
  --cream: #F8EDE8;
  --sage: #9DB082;
  --sage-soft: #E4ECD8;
  --sage-deep: #6B7A52;
  --pink: #E8A0A8;
  --pink-soft: #F7D9DC;
  --pink-deep: #C97B84;
  --rose: #7E6363;
  --mint: #C8D9C4;
  --sand: #EADFD6;
  --charcoal: #2A2624;
  --muted: #7A706C;
  --border: rgba(126, 99, 99, 0.16);
  --shadow-border:
    0px 0px 0px 1px rgba(126, 99, 99, 0.08),
    0px 1px 2px -1px rgba(14, 14, 14, 0.06),
    0px 2px 4px 0px rgba(14, 14, 14, 0.04);
  --shadow-border-hover:
    0px 0px 0px 1px rgba(126, 99, 99, 0.14),
    0px 1px 2px -1px rgba(14, 14, 14, 0.08),
    0px 2px 4px 0px rgba(14, 14, 14, 0.06);
  --shadow-lift:
    0px 0px 0px 1px rgba(126, 99, 99, 0.1),
    0px 12px 32px -8px rgba(126, 99, 99, 0.18);
  --shadow-chunky: 4px 4px 0 var(--sage-deep);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  font-family: 'Outfit', sans-serif;
  background:
    radial-gradient(ellipse 70% 45% at 0% 0%, rgba(232,160,168,.18), transparent 55%),
    radial-gradient(ellipse 55% 40% at 100% 8%, rgba(157,176,130,.16), transparent 50%),
    linear-gradient(180deg, #FFFBF9 0%, #FBF4F0 48%, #FFFBF9 100%);
  color: var(--black);
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
}
.script {
  font-family: 'Great Vibes', cursive;
  font-weight: 400;
  color: var(--sage-deep);
  letter-spacing: .01em;
  line-height: 1.1;
}
.announce-bar { overflow: hidden; }
.announce-top {
  background: var(--black);
  color: #fff;
  padding: .48rem 0;
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.announce-mid {
  background: linear-gradient(90deg, rgba(200,213,176,.55), rgba(214,125,154,.22), rgba(200,213,176,.55));
  padding: .72rem 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(.92rem, 2.2vw, 1.12rem);
  font-style: italic;
  font-weight: 300;
  color: var(--charcoal);
  letter-spacing: .01em;
  text-transform: none;
  border-block: 1px solid var(--border);
}
.announce-marquee-mask {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.announce-marquee-track {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: max-content;
  white-space: nowrap;
}
.announce-item { flex-shrink: 0; }
.announce-sep {
  flex-shrink: 0;
  opacity: .4;
  font-size: .55rem;
  margin-left: .15rem;
}
.announce-top .announce-sep { color: var(--pink); opacity: .65; }
.announce-marquee-fast {
  animation: announceScroll 26s linear infinite;
}
.announce-marquee-slow {
  animation: announceScroll 88s linear infinite;
}
@keyframes announceScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.home-funnel {
  background: linear-gradient(165deg, var(--cream) 0%, var(--white) 55%, rgba(200,213,176,.18) 100%);
}
.home-funnel-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 2.5rem;
  align-items: center;
  max-width: 1080px;
  margin: 0 auto;
}
.home-funnel-intro {
  color: var(--muted);
  max-width: 34rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}
.home-funnel-card {
  background: #fff;
  border-radius: 22px;
  padding: 1.75rem 1.65rem;
  box-shadow: var(--shadow-lift);
  border: 1px solid rgba(214,125,154,.18);
}
.home-funnel-list {
  list-style: none;
  display: grid;
  gap: 0;
}
.home-funnel-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .75rem;
  align-items: center;
  padding: .72rem 0;
  border-bottom: 1px solid var(--border);
  font-size: .92rem;
}
.home-funnel-list li:last-child { border-bottom: none; }
.funnel-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(214,125,154,.14);
  color: var(--pink);
  font-size: .72rem;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.funnel-label { color: var(--charcoal); text-wrap: pretty; }
.home-funnel-footnote {
  font-size: .72rem;
  color: var(--muted);
  margin-top: 1rem;
  padding-top: .75rem;
  border-top: 1px dashed var(--border);
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
.nav-logo { display: flex; align-items: center; gap: .7rem; text-decoration: none; color: var(--black); }
.nav-logo .logo-mark {
  height: 48px; width: 48px; border-radius: 8px; overflow: hidden;
  border: 1px solid rgba(126,99,99,.22); background: #fff;
  box-shadow: var(--shadow-border);
  transition-property: height, width, transform;
  transition-duration: 280ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
.nav-logo .logo-mark img {
  height: 100%; width: 100%; object-fit: cover; outline: none;
}
.site-nav.is-scrolled .nav-logo .logo-mark { height: 40px; width: 40px; }
.nav-logo span {
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.2rem; letter-spacing: -.03em;
  transition-property: font-size, opacity;
  transition-duration: 280ms;
}
.site-nav.is-scrolled .nav-logo span { font-size: 1.05rem; }
img.logo-img { outline: none; }
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
.btn-pink { background: var(--pink); color: #fff; box-shadow: 3px 3px 0 var(--sage-deep); border-radius: 999px; }
.btn-pink:hover { background: var(--pink-deep); }
.btn-ghost { background: transparent; border-color: rgba(126,99,99,.28); color: var(--black); box-shadow: var(--shadow-border); }
.btn-ghost:hover { border-color: var(--pink); color: var(--pink-deep); }
.btn-outline { background: transparent; border-color: var(--black); color: var(--black); }
.btn-outline:hover { background: var(--black); color: #fff; }
.btn-sm { padding: .55rem 1rem; font-size: .8rem; }
.btn-primary { background: var(--black); color: #fff; box-shadow: 3px 3px 0 var(--pink); }
.btn-primary:hover { background: #2a2424; }
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
  margin-top: 4rem; padding: 3.5rem 4vw 2rem;
  background: #fff;
  color: var(--charcoal);
  border-top: 1px solid var(--border);
}
.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 3rem;
  max-width: 1180px;
  margin: 0 auto 2.5rem;
  align-items: start;
}
.footer-cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}
.footer-col h4 {
  color: var(--black); font-size: .72rem; letter-spacing: .16em; text-transform: uppercase;
  margin-bottom: 1rem; font-weight: 700;
}
.footer-col ul { list-style: none; display: grid; gap: .55rem; }
.footer-col a { color: var(--muted); text-decoration: none; font-size: .95rem; }
.footer-col a:hover { color: var(--pink-deep); }
.footer-newsletter {
  background: var(--black);
  color: rgba(255,255,255,.88);
  padding: 1.6rem 1.5rem;
  border-radius: 4px;
}
.footer-newsletter p {
  font-size: .95rem;
  line-height: 1.55;
  margin-bottom: 1rem;
  max-width: 28rem;
}
.footer-newsletter .btn {
  background: #fff;
  color: var(--black);
  border-radius: 8px;
  padding: .55rem 1.1rem;
  font-size: .82rem;
  box-shadow: none;
}
.footer-newsletter .btn:hover { background: var(--pink-soft); }
.footer-brandmark {
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.5rem 0 0.75rem;
  border-top: 1px solid var(--border);
  text-align: center;
}
.footer-brandmark .mark {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2.4rem, 8vw, 5.2rem);
  color: rgba(126, 99, 99, 0.22);
  letter-spacing: -.03em;
  line-height: 1;
}
.footer-logo-strip {
  max-width: 1180px;
  margin: 0 auto 1.5rem;
  background: #0E0E0E;
  border-radius: 12px;
  padding: 1.4rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.footer-logo-strip img {
  height: clamp(72px, 14vw, 110px);
  width: auto;
  outline: none;
}
.footer-bottom {
  max-width: 1180px; margin: 0 auto; padding-top: 1rem;
  display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  font-size: .85rem; color: var(--muted);
}
.footer-bottom a { color: var(--muted); text-decoration: none; }
.footer-bottom a:hover { color: var(--pink-deep); }
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
  .has-dropdown .dropdown {
    position: static; opacity: 1; pointer-events: auto; transform: none;
    box-shadow: none; border: none; padding: .35rem 0 .35rem 1rem; margin: 0;
    background: transparent;
  }
  .footer-top { grid-template-columns: 1fr; gap: 2rem; }
  .footer-cols { grid-template-columns: 1fr 1fr; }
  .home-funnel-grid { grid-template-columns: 1fr; gap: 1.75rem; }
  .cat-tiles { grid-template-columns: 1fr 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .footer-cols { grid-template-columns: 1fr; }
  .cat-tiles { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .announce-marquee-fast,
  .announce-marquee-slow { animation: none; }
}
.has-dropdown { position: relative; }
.has-dropdown > a { cursor: pointer; }
.has-dropdown .dropdown {
  position: absolute; top: calc(100% + 10px); left: 0; min-width: 210px;
  background: #fff; border: 1px solid var(--border); border-radius: 14px;
  padding: .55rem; list-style: none; box-shadow: var(--shadow-lift);
  opacity: 0; pointer-events: none; transform: translateY(6px);
  transition: opacity 160ms ease, transform 160ms ease; z-index: 40;
}
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown {
  opacity: 1; pointer-events: auto; transform: translateY(0);
}
.has-dropdown .dropdown a {
  display: block; padding: .55rem .7rem; border-radius: 10px; font-size: .9rem;
  text-decoration: none; color: var(--charcoal);
}
.has-dropdown .dropdown a::after { display: none; }
.has-dropdown .dropdown a:hover { background: var(--pink-soft); color: var(--pink-deep); }
.cat-tiles {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem;
}
.cat-tile {
  display: flex; flex-direction: column; justify-content: flex-end; gap: .65rem;
  min-height: 140px; padding: 1.1rem; border-radius: 18px; text-decoration: none;
  color: var(--black); box-shadow: var(--shadow-border);
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.cat-tile:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); }
.cat-tile .pill {
  align-self: flex-start; background: rgba(255,255,255,.85); padding: .35rem .7rem;
  border-radius: 999px; font-size: .82rem; font-weight: 600;
}
.cat-tile .emoji { font-size: 1.6rem; }
.section-center { text-align: center; }
.section-center .lead { margin: 0 auto 1rem; color: var(--muted); max-width: 36rem; }
.pricing-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem;
}
.price-card {
  background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 1.6rem 1.4rem;
  box-shadow: var(--shadow-border); display: flex; flex-direction: column; gap: .75rem;
}
.price-card.featured {
  background: var(--black); color: #fff; border-color: transparent;
  box-shadow: 5px 5px 0 var(--pink);
}
.price-card.featured p, .price-card.featured li { color: rgba(255,255,255,.78); }
.price-card h3 { font-family: 'Fraunces', serif; font-size: 1.35rem; }
.price-card .amount {
  font-family: 'Fraunces', serif; font-size: 1.55rem; font-weight: 700;
}
.price-card ul { list-style: none; display: grid; gap: .45rem; margin: .35rem 0 1rem; }
.price-card li { font-size: .92rem; color: var(--muted); padding-left: 1.1rem; position: relative; }
.price-card li::before { content: '✿'; position: absolute; left: 0; color: var(--pink); font-size: .7rem; top: .2rem; }
.price-card .badge {
  position: static; align-self: flex-start; background: var(--pink); color: #fff;
}
.form-card {
  max-width: 820px; margin: 0 auto; background: #fff; border: 1px solid var(--border);
  border-radius: 22px; padding: 1.75rem; box-shadow: var(--shadow-lift);
}
.form-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.1rem;
}
.form-field { display: flex; flex-direction: column; gap: .4rem; }
.form-field.full { grid-column: 1 / -1; }
.form-field label { font-size: .88rem; font-weight: 500; }
.form-field input, .form-field select, .form-field textarea {
  width: 100%; padding: .85rem 1rem; border: 1px solid var(--border); border-radius: 12px;
  font: inherit; background: var(--cream);
}
.form-field textarea { min-height: 140px; resize: vertical; }
.form-success {
  display: none; margin-top: 1rem; padding: 1rem 1.1rem; border-radius: 14px;
  background: var(--sage-soft); color: var(--sage-deep);
}
.form-success.show { display: block; }
.blog-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;
}
.blog-card {
  background: #fff; border-radius: 18px; overflow: hidden; text-decoration: none; color: inherit;
  box-shadow: var(--shadow-border); transition: transform 180ms ease, box-shadow 180ms ease;
}
.blog-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); }
.blog-card .cover {
  min-height: 120px; display: grid; place-items: center; font-size: 2rem;
}
.blog-card .body { padding: 1.1rem 1.15rem 1.35rem; }
.blog-card .meta { font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: .45rem; }
.blog-card h3 { font-family: 'Fraunces', serif; font-size: 1.15rem; margin-bottom: .4rem; }
.blog-card p { color: var(--muted); font-size: .92rem; }
.article { max-width: 720px; margin: 0 auto; padding: 2rem 4vw 3rem; }
.article .meta { color: var(--muted); font-size: .85rem; margin-bottom: 1rem; }
.article h1 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1.25rem; }
.article h2 { font-family: 'Fraunces', serif; font-size: 1.4rem; margin: 2rem 0 .75rem; }
.article p { color: var(--charcoal); margin-bottom: 1rem; line-height: 1.8; }
.article-cta {
  margin: 1.75rem 0; padding: 1.25rem; border-radius: 16px; background: var(--pink-soft);
}
.cta-band {
  text-align: center; background: var(--black); color: #fff; border-radius: 24px;
  padding: 2.5rem 1.5rem; box-shadow: 6px 6px 0 var(--sage);
}
.cta-band .script { color: var(--pink); font-size: 1.6rem; }
.cta-band h2 { font-family: 'Fraunces', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); margin: .5rem 0 0.75rem; }
.cta-band p { color: rgba(255,255,255,.75); max-width: 34rem; margin: 0 auto 1.25rem; }
.collection-block { margin-bottom: 3rem; }
.collection-block .section-label { margin-bottom: .35rem; }
@media (max-width: 720px) {
  .form-grid { grid-template-columns: 1fr; }
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
    buyNow: function(slug){
      write([{slug:slug, qty:1}]);
      window.location.href='/checkout';
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
    if(btn){
      e.preventDefault();
      window.BloomieCart.add(btn.getAttribute('data-add-cart'));
      return;
    }
    var buy = e.target.closest && e.target.closest('[data-buy-now]');
    if(buy){
      e.preventDefault();
      window.BloomieCart.buyNow(buy.getAttribute('data-buy-now'));
    }
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
        '</div></div>'+
        '<div class="cart-line-price">$'+line+' AUD</div></div>';
    }).join('');
    root.innerHTML = rows +
      '<div class="cart-summary"><div><div style="font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">Estimated total</div>'+
      '<div class="cart-total">$'+total+' AUD</div></div>'+
      '<div style="display:flex;gap:.6rem;flex-wrap:wrap;">'+
      '<a class="btn btn-ghost" href="/shop">Keep shopping</a>'+
      '<a class="btn btn-pink" href="/checkout">Proceed to checkout →</a>'+
      '</div></div>'+
      '<p class="cart-note">Secure checkout powered by Polar. Add templates here, then complete payment on the checkout page for instant digital delivery.</p>';

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

const TOP_ANNOUNCE_SEGMENTS = [
  'Australia &amp; worldwide',
  '10% off templates — code LAUNCH10',
  'Premium Wix, Shopify &amp; Canva templates',
  'From $37 AUD · Instant download',
  'Hobart-made · Trusted by 500+ creators',
];

const MID_ANNOUNCE_SEGMENTS = [
  'Get it ready this week',
  'Go from someday to live in record time and on budget.',
  'Designer-made · Drag &amp; drop · Fully customisable',
];

const HOME_FUNNEL_ITEMS = [
  'Designer-Made Template',
  'Drag + Drop Editor',
  'Fully Customizable',
  'Friendly Support',
  'Mobile responsive',
  'Launch Checklist + Scorecard',
  'Launch Lounge Access',
  '25% off new annual subscription*',
  'Template Video Tutorials',
  'And So Much More!',
];

function announceMarqueeHtml(segments, variant = 'fast') {
  const item = (text) =>
    `<span class="announce-item">${text}</span><span class="announce-sep" aria-hidden="true">✦</span>`;
  const track = segments.map(item).join('') + segments.map(item).join('');
  const barClass = variant === 'slow' ? 'announce-mid' : 'announce-top';
  return `
<div class="announce-bar ${barClass}" role="marquee" aria-live="off">
  <div class="announce-marquee-mask">
    <div class="announce-marquee-track announce-marquee-${variant}">${track}</div>
  </div>
</div>`;
}

function homeSellFunnelHtml() {
  const items = HOME_FUNNEL_ITEMS.map(
    (label) =>
      `<li><span class="funnel-check" aria-hidden="true">✓</span><span class="funnel-label">${label}</span></li>`
  ).join('');
  return `
<section class="home-funnel section">
  <div class="home-funnel-grid">
    <div class="home-funnel-copy">
      <p class="section-label">Everything included</p>
      <h2 class="section-title">Launch with <em>confidence</em></h2>
      <p class="home-funnel-intro">Not just a template — you get the full toolkit, support, and resources to go from someday to live in record time and on budget.</p>
      <a class="btn btn-pink" href="/shop">Get your template →</a>
    </div>
    <div class="home-funnel-card">
      <ul class="home-funnel-list">${items}</ul>
      <p class="home-funnel-footnote">*Wix Studio annual plans only. See checkout for details.</p>
    </div>
  </div>
</section>`;
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
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=Outfit:wght@300;400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet">
  <style>${baseStyles()}</style>
</head>
<body>
  ${announceMarqueeHtml(TOP_ANNOUNCE_SEGMENTS, 'fast')}
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
  const shopActive = ['shop', 'beauty', 'wedding', 'others'].includes(active);
  return `
<nav class="site-nav" id="siteNav" aria-label="Primary">
  <a class="nav-logo" href="/">
    <span class="logo-mark"><img class="logo-img" src="${LOGO}" alt=""></span>
    <span>Bloomie House</span>
  </a>
  <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
  <ul class="nav-links" id="navLinks">
    ${link('/', 'Home', 'home')}
    <li class="has-dropdown">
      <a href="/shop" class="${shopActive ? 'active' : ''}" aria-haspopup="true">Templates ▾</a>
      <ul class="dropdown">
        <li><a href="/shop">All Templates</a></li>
        <li><a href="/beauty">Beauty · Lash &amp; Brow</a></li>
        <li><a href="/wedding">Wedding</a></li>
        <li><a href="/others">Others</a></li>
      </ul>
    </li>
    ${link('/services', 'Services &amp; Pricing', 'services')}
    ${link('/blog', 'Blog', 'blog')}
    ${link('/about', 'About', 'about')}
  </ul>
  <div class="nav-actions">
    <a class="btn btn-pink btn-sm" href="/start-a-project">Start a Project</a>
    <a class="cart-link" href="/cart" aria-label="Cart">
      🛒<span class="cart-count" id="cartCount">0</span>
    </a>
  </div>
</nav>`;
}

function siteFooter() {
  return `
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Sitemap</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/shop">Shop all</a></li>
          <li><a href="/beauty">Beauty · Lash &amp; Brow</a></li>
          <li><a href="/wedding">Wedding</a></li>
          <li><a href="/others">Others</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/start-a-project">Start a Project</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Accounts</h4>
        <ul>
          <li><a href="/login">Member login</a></li>
          <li><a href="/login/staff">Staff account</a></li>
          <li><a href="${ETSY_SHOP}" target="_blank" rel="noopener">Etsy store</a></li>
          <li><a href="mailto:hello@bloomiehouse.com.au">hello@bloomiehouse.com.au</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-newsletter">
      <p>Keep up to date with our latest templates, launches and studio notes. Sign up to the newsletter today.</p>
      <a class="btn" href="mailto:hello@bloomiehouse.com.au?subject=Newsletter%20signup">Sign Up</a>
    </div>
  </div>
  <div class="footer-logo-strip">
    <img class="logo-img" src="${LOGO_LONG}" alt="Bloomie House">
  </div>
  <div class="footer-brandmark" aria-hidden="true">
    <div class="mark">Bloomie House</div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Bloomie House · <span class="script" style="font-size:1.15rem;color:var(--pink-deep);">grow something lovely</span></span>
    <span>Australia · worldwide delivery · <a href="/login/staff">Staff account</a></span>
  </div>
</footer>`;
}

function productCard(t) {
  const thumb = t.images?.[0]
    ? glassyImage(`<img src="${t.images[0]}" alt="${t.name}">`)
    : `<div class="product-thumb-label">${t.name}</div>`;
  return `
<a class="product-card" href="/templates/${t.slug}" data-platform="${t.category}" data-collection="${t.collection || 'others'}">
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

const COLLECTIONS = {
  beauty: {
    slug: 'beauty',
    label: 'Beauty · Lash & Brow',
    script: 'lashes, brows & beauty —',
    title: 'Beauty & Lash Templates',
    description:
      'Booking websites, academy templates and Canva kits for lash artists, brow techs and beauty educators.',
  },
  wedding: {
    slug: 'wedding',
    label: 'Wedding',
    script: 'happily ever after —',
    title: 'Wedding Templates',
    description:
      'Romantic invitation and RSVP website templates that keep guests informed and your day beautifully organised.',
  },
  others: {
    slug: 'others',
    label: 'Others',
    script: 'good honest work —',
    title: 'Templates for Every Other Business',
    description:
      'Lead-gen sites and landing pages for coaches, tradies and small businesses beyond beauty and weddings.',
  },
};

function productsByCollection(key) {
  return templateData.filter((t) => (t.collection || 'others') === key);
}

function collectionSectionHtml(key) {
  const meta = COLLECTIONS[key];
  const cards = productsByCollection(key).map(productCard).join('');
  if (!cards) return '';
  return `
<div class="collection-block" id="${key}">
  <p class="section-label">${meta.label}</p>
  <h2 class="section-title" style="margin-bottom:1rem;">${meta.title}</h2>
  <div class="product-grid">${cards}</div>
  <div style="margin-top:1.25rem;">
    <a class="btn btn-ghost" href="/${key}">View ${meta.label} →</a>
  </div>
</div>`;
}

// ── PAGES ──
function homePage() {
  const featuredBeauty = productsByCollection('beauty').slice(0, 3).map(productCard).join('');
  const body = `
<section class="page-hero page-hero-enter" style="min-height:78vh;display:flex;flex-direction:column;justify-content:center;">
  <p class="script" style="font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:.35rem;">hello, lovely —</p>
  <h1>Bloomie House<br><em>websites that bloom</em></h1>
  <p>Aesthetic, ready-to-launch website templates and bespoke design for <strong>lash artists</strong>, <strong>weddings</strong> and <strong>trade businesses</strong>. Buy a template today, customise it in one day, or let us design something entirely yours.</p>
  <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.75rem;">
    <a class="btn btn-pink" href="/shop">Shop Templates</a>
    <a class="btn btn-outline" href="/services">See Pricing &amp; Packages</a>
  </div>
  <p style="margin-top:1.1rem;font-size:.9rem;color:var(--muted);">✿ Shopify Partners · Canva, Shopify, Wix &amp; custom builds · Based in Australia</p>
</section>

${announceMarqueeHtml(MID_ANNOUNCE_SEGMENTS, 'slow')}

<section class="section">
  <div class="section-center">
    <p class="section-label" style="color:var(--pink-deep);">Browse by category</p>
    <h2 class="section-title">Find your <em>perfect</em> template</h2>
  </div>
  <div class="cat-tiles">
    <a class="cat-tile" href="/beauty" style="background:var(--pink-soft);"><span class="emoji">🌸</span><span class="pill">Beauty &amp; Lash</span></a>
    <a class="cat-tile" href="/wedding" style="background:var(--sage-soft);"><span class="emoji">💍</span><span class="pill">Wedding</span></a>
    <a class="cat-tile" href="/others" style="background:linear-gradient(145deg,var(--mint),var(--sage-soft));"><span class="emoji">🔧</span><span class="pill">Others</span></a>
    <a class="cat-tile" href="/shop" style="background:linear-gradient(145deg,var(--cream),var(--pink-soft));"><span class="emoji">🛍️</span><span class="pill">All Templates</span></a>
  </div>
  <div class="product-grid">${featuredBeauty}</div>
  <div style="text-align:center;margin-top:2rem;">
    <a class="btn btn-dark" href="/shop">View all templates →</a>
  </div>
</section>

${homeSellFunnelHtml()}

<section class="section" style="background:rgba(255,255,255,.55);">
  <div class="section-center">
    <p class="section-label">Ways to work with us</p>
    <h2 class="section-title">From template to <em>totally bespoke</em></h2>
  </div>
  <div class="pricing-grid">
    <article class="price-card">
      <h3>Ready-Made Template</h3>
      <div class="amount">From $37</div>
      <p>Buy a template and make it yours with our guides.</p>
      <a class="btn btn-outline" href="/shop">Browse Templates</a>
    </article>
    <article class="price-card featured">
      <span class="badge">Most Loved</span>
      <h3>1-Day Customisation</h3>
      <div class="amount">Live in 1 day</div>
      <p>Pick any template — we tailor it to your brand within one business day.</p>
      <a class="btn btn-pink" href="/start-a-project?package=custom">Start a Project</a>
    </article>
    <article class="price-card">
      <h3>Bespoke Website Design</h3>
      <div class="amount">By quote</div>
      <p>Custom design &amp; build, priced on design scope and backend complexity.</p>
      <a class="btn btn-outline" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Request a Quote</a>
    </article>
  </div>
</section>

<section class="section">
  <div class="cta-band">
    <span class="script">ready when you are —</span>
    <h2>Start your project today</h2>
    <p>Tell us about your business in about five minutes. We'll reply within 3 business days to book your discovery call.</p>
    <a class="btn btn-pink" href="/start-a-project">Start a Project</a>
  </div>
</section>`;
  return layout(
    'Bloomie House — Aesthetic Website & Template Studio',
    'Ready-made website templates, 1-day customisation and bespoke website design for lash artists, weddings and trade businesses. Based in Australia, delivered worldwide.',
    '/',
    body,
    'home'
  );
}

function shopPage(platform) {
  const active = (platform || 'all').toLowerCase();
  const body = `
<section class="page-hero page-hero-enter">
  <p class="script" style="font-size:1.6rem;">the template shop</p>
  <h1>Every template, <em>one lovely place</em></h1>
  <p>Ready-made designs for Canva, Shopify and Wix. Buy today and launch this week — or have any template customised in one business day.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="filters" id="shopFilters">
    <button class="filter-btn ${active === 'all' ? 'active' : ''}" data-filter="all">All</button>
    <button class="filter-btn ${active === 'beauty' ? 'active' : ''}" data-filter="beauty">Beauty · Lash</button>
    <button class="filter-btn ${active === 'wedding' ? 'active' : ''}" data-filter="wedding">Wedding</button>
    <button class="filter-btn ${active === 'others' ? 'active' : ''}" data-filter="others">Others</button>
    <button class="filter-btn ${active === 'wix' ? 'active' : ''}" data-filter="wix">Wix Studio</button>
    <button class="filter-btn ${active === 'shopify' ? 'active' : ''}" data-filter="shopify">Shopify</button>
    <button class="filter-btn ${active === 'canva' ? 'active' : ''}" data-filter="canva">Canva</button>
  </div>
  ${collectionSectionHtml('beauty')}
  ${collectionSectionHtml('wedding')}
  ${collectionSectionHtml('others')}
</section>
<script>
(function(){
  var buttons=document.querySelectorAll('#shopFilters .filter-btn');
  var cards=document.querySelectorAll('.product-grid .product-card');
  var blocks=document.querySelectorAll('.collection-block');
  var collectionFilters={beauty:1,wedding:1,others:1};
  function apply(f){
    buttons.forEach(function(b){ b.classList.toggle('active', b.dataset.filter===f); });
    cards.forEach(function(c){
      var show = f==='all'
        || c.dataset.platform===f
        || c.dataset.collection===f;
      c.style.display = show ? '' : 'none';
    });
    blocks.forEach(function(block){
      if(collectionFilters[f]){
        block.style.display = block.id===f ? '' : 'none';
      } else if(f==='all'){
        block.style.display = '';
      } else {
        var visible = Array.prototype.some.call(block.querySelectorAll('.product-card'), function(c){ return c.style.display !== 'none'; });
        block.style.display = visible ? '' : 'none';
      }
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
    'Browse premium Wix Studio, Shopify & Canva website templates by beauty, wedding and other categories.',
    '/shop',
    body,
    'shop'
  );
}

function collectionPage(key) {
  const meta = COLLECTIONS[key];
  const cards = productsByCollection(key).map(productCard).join('');
  const body = `
<section class="page-hero page-hero-enter">
  <p class="script" style="font-size:1.6rem;">${meta.script}</p>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="product-grid">${cards || '<p style="color:var(--muted);">Templates coming soon.</p>'}</div>
</section>
<section class="section">
  <div class="cta-band">
    <span class="script">want it done for you?</span>
    <h2>Any template, customised in 1 business day</h2>
    <p>Choose a template, fill in the project form with your brand details, and we'll deliver it tailored to your business within one business day.</p>
    <a class="btn btn-pink" href="/start-a-project">Start a Project</a>
  </div>
</section>`;
  return layout(
    `${meta.title} — Bloomie House`,
    meta.description,
    `/${key}`,
    body,
    key
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
  .testi-sub, .calc-intro { color:var(--muted); max-width:36rem; line-height:1.7; margin-bottom:1.25rem; }
  .pdp-testimonials .testi-stats {
    display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.75rem; max-width:640px;
  }
  .pdp-testimonials .testi-stats div { text-align:center; background:#fff; border-radius:14px; padding:1rem .75rem; box-shadow:var(--shadow-border); }
  .pdp-testimonials .testi-stats strong { display:block; font-family:Fraunces,serif; font-size:1.5rem; margin-bottom:.2rem; }
  .pdp-testimonials .testi-stats span { font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
  .testi-marquee-mask {
    overflow:hidden; position:relative;
    mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }
  .testi-marquee-track {
    display:flex; gap:1rem; width:max-content;
    animation:testiMarquee 55s ease-in-out infinite alternate;
  }
  @keyframes testiMarquee {
    from { transform:translateX(0); }
    to { transform:translateX(-50%); }
  }
  .testi-card {
    flex-shrink:0; width:min(300px,78vw); display:flex; gap:.75rem; align-items:flex-start;
    background:#fff; border-radius:18px; padding:1rem 1.1rem; box-shadow:var(--shadow-border);
  }
  .testi-avatar {
    width:40px; height:40px; border-radius:50%; flex-shrink:0; overflow:hidden;
    box-shadow:0 0 0 2px #fff, var(--shadow-border);
  }
  .testi-avatar img {
    width:100%; height:100%; object-fit:cover; display:block;
  }
  .testi-card-body p { font-size:.88rem; line-height:1.55; margin-bottom:.35rem; text-wrap:pretty; }
  .testi-hl { font-style:normal; color:#9b7ec8; font-weight:500; }
  .testi-card-body span { font-size:.75rem; color:var(--muted); }
  .pdp-before-after {
    position:relative; overflow:hidden;
    background:linear-gradient(165deg, #fff8f6 0%, var(--cream) 45%, #f4faf6 100%);
  }
  .ba-bg-glow {
    position:absolute; inset:-20% -10% auto; height:55%; pointer-events:none;
    background:radial-gradient(ellipse 70% 80% at 50% 0%, rgba(214,125,154,.14), transparent 70%);
    animation:baGlow 8s ease-in-out infinite alternate;
  }
  @keyframes baGlow {
    from { opacity:.6; transform:translateY(0); }
    to { opacity:1; transform:translateY(12px); }
  }
  .ba-sub { color:var(--muted); max-width:40rem; line-height:1.75; margin-bottom:2rem; text-wrap:pretty; }
  .ba-sub strong { color:var(--charcoal); font-weight:600; }
  .ba-timeline {
    display:grid; gap:0; max-width:640px; margin:0 auto; position:relative;
  }
  .ba-timeline::before {
    content:''; position:absolute; left:19px; top:24px; bottom:24px; width:2px;
    background:linear-gradient(180deg, rgba(196,68,68,.35), var(--pink) 30%, rgba(45,106,79,.45) 70%, rgba(45,106,79,.2));
    transform-origin:top; transform:scaleY(0);
    transition: transform 1.2s cubic-bezier(0.2,0,0,1) 0.2s;
  }
  .ba-timeline.is-drawn::before { transform:scaleY(1); }
  .ba-pair {
    display:grid; grid-template-columns:40px 1fr; gap:1rem; padding-bottom:1.75rem; position:relative;
  }
  .ba-pair:last-child { padding-bottom:0; }
  .ba-step { display:flex; justify-content:center; padding-top:.35rem; z-index:1; }
  .ba-step-num {
    width:40px; height:40px; border-radius:50%; background:#fff; color:var(--pink);
    font-family:Fraunces,serif; font-weight:700; font-size:.95rem;
    display:grid; place-items:center; box-shadow:0 0 0 3px var(--cream), var(--shadow-border);
    transition: transform 500ms cubic-bezier(0.2,0,0,1), box-shadow 500ms cubic-bezier(0.2,0,0,1);
  }
  .ba-pair.is-visible .ba-step-num {
    transform:scale(1.08); box-shadow:0 0 0 3px var(--cream), 0 8px 24px rgba(214,125,154,.25);
  }
  .ba-pair-body { display:grid; gap:.65rem; }
  .ba-card {
    border-radius:18px; padding:1.1rem 1.2rem; font-size:.9rem; line-height:1.6; text-wrap:pretty;
    opacity:0; transform:translateY(16px);
    transition: opacity 550ms cubic-bezier(0.2,0,0,1), transform 550ms cubic-bezier(0.2,0,0,1), box-shadow 550ms cubic-bezier(0.2,0,0,1);
  }
  .ba-before {
    background:linear-gradient(135deg, #fff5f5, #fff);
    border:1px solid rgba(196,68,68,.12);
    box-shadow:var(--shadow-border);
  }
  .ba-after {
    background:linear-gradient(135deg, #f0faf4, #fff);
    border:1px solid rgba(45,106,79,.15);
    box-shadow:var(--shadow-border);
  }
  .ba-pair.is-visible .ba-before {
    opacity:1; transform:translateX(0) translateY(0);
    transition-delay:.15s;
  }
  .ba-pair.is-visible .ba-after {
    opacity:1; transform:translateX(0) translateY(0);
    transition-delay:.45s;
    box-shadow:0 12px 32px -8px rgba(45,106,79,.18), var(--shadow-border);
  }
  .ba-before { transform:translateX(-18px) translateY(8px); }
  .ba-after { transform:translateX(14px) translateY(8px); }
  .ba-tag {
    display:inline-flex; align-items:center; gap:.4rem;
    font-size:.65rem; letter-spacing:.14em; text-transform:uppercase;
    font-weight:700; color:#b33; margin-bottom:.5rem;
  }
  .ba-tag-after { color:#2d6a4f; }
  .ba-tag-dot {
    width:7px; height:7px; border-radius:50%; flex-shrink:0;
  }
  .ba-tag-dot-before { background:#e88; box-shadow:0 0 0 3px rgba(232,136,136,.25); }
  .ba-tag-dot-after { background:#3d9a6a; box-shadow:0 0 0 3px rgba(61,154,106,.2); }
  .ba-hl-before { font-style:normal; color:#c44; font-weight:600; }
  .ba-hl-after { font-style:normal; color:#2d6a4f; font-weight:600; }
  .ba-card p { color:var(--charcoal); margin:0; }
  .ba-connector {
    display:flex; flex-direction:column; align-items:center; gap:0; height:28px; position:relative;
    opacity:0; transform:scaleY(0.4);
    transition: opacity 400ms ease, transform 500ms cubic-bezier(0.2,0,0,1);
  }
  .ba-pair.is-visible .ba-connector {
    opacity:1; transform:scaleY(1); transition-delay:.32s;
  }
  .ba-connector-line {
    width:2px; flex:1; background:linear-gradient(180deg, #e8a0a0, var(--pink), #7bc49a);
    border-radius:2px;
  }
  .ba-connector-pulse {
    position:absolute; top:50%; left:50%; width:10px; height:10px; margin:-5px 0 0 -5px;
    border-radius:50%; background:var(--pink); opacity:0;
    animation:baPulse 2.2s ease-in-out infinite;
  }
  .ba-pair.is-visible .ba-connector-pulse { opacity:.85; animation-delay:.5s; }
  @keyframes baPulse {
    0%, 100% { transform:scale(.6); opacity:.4; }
    50% { transform:scale(1.4); opacity:.9; box-shadow:0 0 12px rgba(214,125,154,.5); }
  }
  .ba-connector-icon {
    font-size:.85rem; color:var(--pink); font-weight:700; line-height:1;
    animation:baBounce 2s ease-in-out infinite;
  }
  @keyframes baBounce {
    0%, 100% { transform:translateY(0); }
    50% { transform:translateY(3px); }
  }
  .calc-card {
    max-width:560px; background:#fff; border-radius:20px; padding:1.75rem;
    box-shadow:var(--shadow-border); border:1px solid rgba(214,125,154,.15);
  }
  .calc-row { margin-bottom:1.5rem; }
  .calc-row label { display:block; font-size:.9rem; margin-bottom:.65rem; color:var(--charcoal); }
  .calc-row label strong { color:var(--pink); font-family:Fraunces,serif; font-size:1.1rem; }
  .calc-slider {
    width:100%; height:6px; border-radius:999px; appearance:none; -webkit-appearance:none;
    background:linear-gradient(90deg, var(--pink), var(--sage)); cursor:pointer;
  }
  .calc-slider::-webkit-slider-thumb {
    appearance:none; -webkit-appearance:none; width:22px; height:22px; border-radius:50%;
    background:#fff; border:2px solid var(--pink); box-shadow:var(--shadow-border-hover); cursor:grab;
  }
  .calc-slider::-moz-range-thumb {
    width:22px; height:22px; border-radius:50%; background:#fff; border:2px solid var(--pink); cursor:grab;
  }
  .calc-results { display:grid; gap:.65rem; margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid var(--border); }
  .calc-result {
    display:flex; justify-content:space-between; align-items:center; font-size:.9rem;
  }
  .calc-result-label { color:var(--muted); }
  .calc-result-val { font-family:Fraunces,serif; font-weight:700; font-size:1.1rem; }
  .calc-result-highlight .calc-result-val { color:var(--pink); font-size:1.35rem; }
  .calc-result-total {
    background:var(--cream); border-radius:12px; padding:.85rem 1rem; margin-top:.25rem;
  }
  .calc-result-total .calc-result-val { font-size:1.6rem; color:var(--black); }
  .calc-note { font-size:.78rem; color:var(--muted); margin-top:1rem; }
  .value-card {
    max-width:520px; margin:0 auto; background:#fff; border-radius:22px; padding:2rem 1.75rem;
    box-shadow:var(--shadow-lift); border:2px solid rgba(214,125,154,.25); text-align:center;
  }
  .value-badge {
    display:inline-block; font-size:.68rem; letter-spacing:.14em; text-transform:uppercase;
    color:var(--pink); background:rgba(214,125,154,.12); padding:.35rem .85rem; border-radius:999px; margin-bottom:1rem;
  }
  .value-title { font-family:Fraunces,serif; font-size:1.75rem; font-weight:900; margin-bottom:.75rem; text-wrap:balance; }
  .star-seller-badge {
    display:inline-flex; align-items:center; gap:.45rem; font-size:.82rem; color:var(--charcoal);
    background:linear-gradient(135deg, #fff8e6, #fff); border-radius:999px; padding:.45rem .9rem;
    margin-bottom:1.25rem; box-shadow:var(--shadow-border);
  }
  .star-seller-icon { color:#f5a623; font-size:1rem; }
  .value-list { list-style:none; text-align:left; margin-bottom:1rem; }
  .value-list li {
    display:grid; grid-template-columns:auto 1fr auto; gap:.65rem; align-items:center;
    padding:.75rem 0; border-bottom:1px solid var(--border); font-size:.88rem;
  }
  .value-icon { font-size:1.1rem; }
  .value-label { text-wrap:pretty; color:var(--charcoal); }
  .value-amt { font-size:.8rem; color:var(--muted); white-space:nowrap; }
  .value-total-row {
    display:flex; justify-content:space-between; padding:.75rem 0; font-size:.9rem; color:var(--muted);
  }
  .value-strike { text-decoration:line-through; }
  .value-price { font-family:Fraunces,serif; font-size:2.8rem; font-weight:900; margin:.25rem 0; }
  .value-terms { font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:.5rem; }
  .value-script { font-family:Fraunces,serif; font-style:italic; color:var(--pink); font-weight:300; margin-bottom:1.25rem; }
  .value-cta { width:100%; border-radius:999px; padding:1rem; font-size:.95rem; font-family:inherit; }
  .social-proof-popup {
    position:fixed; left:16px; bottom:100px; z-index:2500; max-width:min(320px,calc(100vw - 32px));
    display:flex; align-items:center; gap:.75rem; background:#fff; border-radius:14px;
    padding:.75rem 2.25rem .75rem .75rem; box-shadow:0 12px 40px rgba(0,0,0,.15);
    transform:translateX(-120%); opacity:0;
    transition: transform 450ms cubic-bezier(0.2,0,0,1), opacity 450ms cubic-bezier(0.2,0,0,1);
  }
  .social-proof-popup.is-visible { transform:translateX(0); opacity:1; }
  .social-proof-popup.is-leaving { transform:translateX(-120%); opacity:0; }
  .social-proof-avatar {
    width:44px; height:44px; border-radius:50%; flex-shrink:0; overflow:hidden;
    box-shadow:0 0 0 2px #fff, var(--shadow-border);
  }
  .social-proof-avatar img {
    width:100%; height:100%; object-fit:cover; display:block;
  }
  .social-proof-thumb-logo.is-brand img { object-fit:contain; background:var(--cream); padding:5px; }
  .social-proof-initial {
    width:100%; height:100%; display:grid; place-items:center;
    font-weight:700; font-size:.78rem; letter-spacing:.05em; color:#fff;
    background:linear-gradient(135deg, var(--pink), #e8b4c4);
  }
  .social-proof-thumb-initial.is-sage .social-proof-initial {
    background:linear-gradient(135deg, var(--sage), #9bb5a8);
  }
  .social-proof-text { display:grid; gap:.1rem; min-width:0; }
  .social-proof-text strong { font-size:.88rem; }
  .social-proof-text span { font-size:.8rem; color:var(--charcoal); line-height:1.35; }
  .social-proof-text small { font-size:.72rem; color:var(--muted); }
  .social-proof-close {
    position:absolute; top:6px; right:8px; border:none; background:none; font-size:1.1rem;
    color:var(--muted); cursor:pointer; width:28px; height:28px; border-radius:50%;
  }
  .social-proof-close:hover { background:var(--cream); }
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
  .process-notice {
    max-width:720px; margin:0 auto 1.75rem; padding:1.15rem 1.25rem;
    background:rgba(255,255,255,.75); border-radius:14px; border:1px solid rgba(214,125,154,.2);
    box-shadow:var(--shadow-border);
  }
  .process-warning {
    font-size:.88rem; color:var(--charcoal); line-height:1.7; text-wrap:pretty; margin-bottom:.75rem;
  }
  .process-support {
    font-size:.88rem; color:var(--muted); line-height:1.7; text-wrap:pretty; margin:0;
  }
  .process-support a { color:var(--pink); font-weight:500; }
  .process-cta { display:flex; gap:.65rem; flex-wrap:wrap; justify-content:center; }
  @media (max-width:640px) {
    .ba-timeline::before { left:19px; }
    .ba-pair { grid-template-columns:40px 1fr; gap:.75rem; }
    .pdp-testimonials .testi-stats { grid-template-columns:repeat(2,1fr); }
    .social-proof-popup { left:12px; bottom:88px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pdp-reveal { opacity:1; transform:none; filter:none; transition:none; }
    .faq-item p { animation:none; }
    .testi-marquee-track { animation:none; }
    .ba-bg-glow { animation:none; }
    .ba-timeline::before { transform:scaleY(1); }
    .ba-card, .ba-connector { opacity:1; transform:none; transition:none; }
    .ba-connector-pulse, .ba-connector-icon { animation:none; }
    .ba-pair.is-visible .ba-step-num { transform:none; }
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
        <button type="button" class="btn btn-dark" data-buy-now="${t.slug}">Checkout now →</button>
        <a class="btn btn-ghost" href="/cart">View cart</a>
      </div>
      <p style="font-size:.85rem;color:var(--muted);">Instant digital delivery · setup guide included · 30-day email support</p>
      <div class="pdp-features">
        <h3>What's included</h3>
        <ul>${t.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</div>
${productAudienceHtml(t)}
${productTestimonialsHtml(t)}
${productBeforeAfterHtml(t)}
${productCalculatorHtml(t)}
${productValueStackHtml(t)}
${productFunnelHtml(t)}
${productProcessHtml(t)}
${productFaqHtml(t)}
${productSocialProofPopupHtml(t)}
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
    var baTimeline = document.querySelector('.ba-timeline');
    if(baTimeline && 'IntersectionObserver' in window){
      var baIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            baTimeline.classList.add('is-drawn');
            baIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      baIo.observe(baTimeline);
    } else if(baTimeline) {
      baTimeline.classList.add('is-drawn');
    }
  } else {
    document.querySelectorAll('.pdp-reveal').forEach(function(el){ el.classList.add('is-visible'); });
    var baTimelineReduced = document.querySelector('.ba-timeline');
    if(baTimelineReduced) baTimelineReduced.classList.add('is-drawn');
  }

  var calc = document.getElementById('profitCalc');
  if(calc){
    var invest = parseFloat(calc.dataset.invest) || 0;
    var students = document.getElementById('calcStudents');
    var price = document.getElementById('calcPrice');
    var studentsVal = document.getElementById('calcStudentsVal');
    var priceVal = document.getElementById('calcPriceVal');
    var perUnit = document.getElementById('calcPerUnit');
    var total = document.getElementById('calcTotal');
    function fmt(n){ return '$' + Math.round(n).toLocaleString(); }
    function update(){
      var n = parseInt(students.value, 10) || 1;
      var p = parseInt(price.value, 10) || 0;
      if(studentsVal) studentsVal.textContent = String(n);
      if(priceVal) priceVal.textContent = fmt(p);
      if(perUnit) perUnit.textContent = fmt(p);
      if(total) total.textContent = fmt(Math.max(0, n * p - invest));
    }
    if(students) students.addEventListener('input', update);
    if(price) price.addEventListener('input', update);
    update();
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

function checkoutPage() {
  const catalogJson = JSON.stringify(
    templateData.map((t) => ({
      slug: t.slug,
      name: t.name,
      price: t.price,
      niche: t.niche,
      platform: t.platform,
      image: t.images?.[0] || null,
      mockClass: t.mockClass,
    }))
  );
  const body = `
<style>
  .checkout-wrap { max-width: 1100px; margin: 0 auto; padding: 2rem 4vw 4rem; }
  .checkout-grid {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 1.5rem; align-items: start;
  }
  .checkout-panel {
    background: var(--cream); border-radius: 20px; padding: 1.5rem;
    box-shadow: var(--shadow-border);
  }
  .checkout-steps {
    list-style: none; display: grid; gap: .85rem; margin: 1.25rem 0 1.5rem;
  }
  .checkout-step {
    display: grid; grid-template-columns: 36px 1fr; gap: .75rem; align-items: start;
  }
  .checkout-step-num {
    width: 36px; height: 36px; border-radius: 50%; background: var(--black); color: #fff;
    display: grid; place-items: center; font-size: .8rem; font-weight: 600;
  }
  .checkout-step.is-active .checkout-step-num { background: var(--pink); }
  .checkout-step strong { display: block; font-family: Fraunces, serif; font-size: 1rem; }
  .checkout-step p { color: var(--muted); font-size: .85rem; line-height: 1.55; text-wrap: pretty; }
  .checkout-trust {
    display: grid; gap: .55rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);
    font-size: .85rem; color: var(--charcoal);
  }
  .checkout-trust li { display: flex; gap: .5rem; align-items: flex-start; }
  .checkout-trust li::before { content: '✦'; color: var(--pink); font-size: .65rem; margin-top: .35rem; }
  .checkout-summary-title {
    font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem;
  }
  .checkout-line {
    display: grid; grid-template-columns: 64px 1fr auto; gap: .75rem; align-items: center;
    padding: .75rem 0; border-bottom: 1px solid var(--border);
  }
  .checkout-line:last-of-type { border-bottom: none; }
  .checkout-thumb {
    width: 64px; height: 48px; border-radius: 10px; overflow: hidden; box-shadow: var(--shadow-border);
  }
  .checkout-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .checkout-line h3 { font-family: Fraunces, serif; font-size: .95rem; text-wrap: balance; }
  .checkout-line p { color: var(--muted); font-size: .78rem; }
  .checkout-line-price { font-family: Fraunces, serif; font-weight: 700; font-variant-numeric: tabular-nums; }
  .checkout-total {
    display: flex; justify-content: space-between; align-items: baseline; margin-top: 1rem; padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
  .checkout-total strong { font-family: Fraunces, serif; font-size: 1.75rem; font-variant-numeric: tabular-nums; }
  .checkout-pay-panel { min-height: 420px; }
  .checkout-status {
    text-align: center; padding: 2.5rem 1rem; color: var(--muted);
  }
  .checkout-status h2 { font-family: Fraunces, serif; color: var(--black); margin-bottom: .5rem; }
  .checkout-loader {
    width: 36px; height: 36px; border: 3px solid var(--border); border-top-color: var(--pink);
    border-radius: 50%; animation: spin 800ms linear infinite; margin: 0 auto 1rem;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .checkout-embed { min-height: 520px; }
  @media (max-width: 900px) {
    .checkout-grid { grid-template-columns: 1fr; }
    .checkout-pay-panel { order: -1; }
  }
</style>
<section class="page-hero page-hero-enter">
  <p class="section-label">Secure checkout</p>
  <h1>Complete your <em>purchase</em></h1>
  <p>Review your order, pay securely, and get instant access to your templates.</p>
</section>
<div class="checkout-wrap">
  <div class="checkout-grid">
    <div class="checkout-panel">
      <p class="checkout-summary-title">Your sale journey</p>
      <ol class="checkout-steps">
        <li class="checkout-step is-active">
          <span class="checkout-step-num">1</span>
          <div><strong>Review your cart</strong><p>Confirm templates and pricing before you pay.</p></div>
        </li>
        <li class="checkout-step is-active">
          <span class="checkout-step-num">2</span>
          <div><strong>Secure payment</strong><p>Pay with card, Apple Pay, or Google Pay via Polar.</p></div>
        </li>
        <li class="checkout-step">
          <span class="checkout-step-num">3</span>
          <div><strong>Instant delivery</strong><p>Download links arrive by email — usually within minutes.</p></div>
        </li>
      </ol>
      <ul class="checkout-trust">
        <li>One-time purchase — no subscription</li>
        <li>30-day email support included</li>
        <li>Orders also appear in your <a href="/login" style="color:var(--pink);">member portal</a></li>
      </ul>
      <div style="margin-top:1.5rem;">
        <p class="checkout-summary-title">Order summary</p>
        <div id="checkoutSummary"><p style="color:var(--muted);">Loading…</p></div>
      </div>
    </div>
    <div class="checkout-panel checkout-pay-panel">
      <p class="checkout-summary-title">Payment</p>
      <div id="checkoutPay">
        <div class="checkout-status">
          <div class="checkout-loader" aria-hidden="true"></div>
          <h2>Preparing secure checkout</h2>
          <p>Hang tight — we are loading your payment form.</p>
        </div>
      </div>
      <div id="checkoutEmbed" class="checkout-embed"></div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@polar-sh/checkout@latest/dist/embed.global.js" defer></script>
<script>${checkoutScript(catalogJson)}</script>`;
  return layout(
    'Checkout — Bloomie House',
    'Secure checkout for Bloomie House digital templates.',
    '/checkout',
    body,
    'shop',
    catalogJson
  );
}

function checkoutSuccessPage(url) {
  const checkoutId = url.searchParams.get('checkout_id') || '';
  const body = `
<style>
  .success-wrap {
    max-width: 640px; margin: 0 auto; padding: 2rem 4vw 4rem; text-align: center;
  }
  .success-card {
    background: var(--cream); border-radius: 22px; padding: 2.5rem 2rem;
    box-shadow: var(--shadow-lift); border: 2px solid rgba(214,125,154,.2);
  }
  .success-icon {
    width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 1.25rem;
    display: grid; place-items: center; font-size: 1.75rem;
    background: linear-gradient(135deg, var(--pink), #e8b4c4); color: #fff;
  }
</style>
<section class="page-hero page-hero-enter">
  <p class="section-label">Thank you</p>
  <h1>Payment <em>confirmed</em></h1>
</section>
<div class="success-wrap">
  <div class="success-card">
    <div class="success-icon" aria-hidden="true">✓</div>
    <h2 style="font-family:Fraunces,serif;font-size:1.75rem;margin-bottom:.75rem;">You are all set!</h2>
    <p style="color:var(--muted);line-height:1.75;margin-bottom:1.5rem;text-wrap:pretty;">
      Your order is confirmed. Check your email for download instructions — and sign in to the member portal to access orders, downloads, and setup guides.
    </p>
    ${checkoutId ? `<p style="font-size:.8rem;color:var(--muted);margin-bottom:1.25rem;">Reference: ${checkoutId}</p>` : ''}
    <div style="display:flex;gap:.65rem;flex-wrap:wrap;justify-content:center;">
      <a class="btn btn-pink" href="/login">Sign in to member portal</a>
      <a class="btn btn-ghost" href="/shop">Continue shopping</a>
    </div>
  </div>
</div>
<script>
(function(){
  try { localStorage.removeItem('bloomie_cart_v1'); } catch(e) {}
  var badge = document.getElementById('cartCount');
  if(badge) badge.textContent = '0';
})();
</script>`;
  return layout(
    'Order confirmed — Bloomie House',
    'Your Bloomie House order is confirmed.',
    '/checkout/success',
    body,
    'shop'
  );
}

function checkoutScript(catalogJson) {
  const catalogLiteral = catalogJson || 'null';
  return `
(function(){
  var catalog = ${catalogLiteral};
  function readCart(){
    try { return JSON.parse(localStorage.getItem('bloomie_cart_v1')||'[]'); }
    catch(e){ return []; }
  }
  function bySlug(slug){
    if(!catalog) return null;
    return catalog.find(function(t){ return t.slug===slug; });
  }
  function renderSummary(){
    var root = document.getElementById('checkoutSummary');
    if(!root) return;
    var items = readCart();
    if(!items.length){
      root.innerHTML = '<p style="color:var(--muted);">Your cart is empty. <a href="/shop" style="color:var(--pink);">Browse the shop</a></p>';
      return;
    }
    var total = 0;
    var rows = items.map(function(item){
      var t = bySlug(item.slug);
      if(!t) return '';
      var line = t.price * (item.qty||1);
      total += line;
      var thumb = t.image
        ? '<div class="checkout-thumb"><img src="'+t.image+'" alt=""></div>'
        : '<div class="checkout-thumb product-thumb '+t.mockClass+'"></div>';
      return '<div class="checkout-line">'+thumb+
        '<div><h3>'+t.name+'</h3><p>'+t.platform+' · Qty '+(item.qty||1)+'</p></div>'+
        '<div class="checkout-line-price">$'+line+' AUD</div></div>';
    }).join('');
    root.innerHTML = rows +
      '<div class="checkout-total"><span style="color:var(--muted);">Total</span><strong>$'+total+' AUD</strong></div>'+
      '<p style="font-size:.82rem;color:var(--muted);margin-top:.75rem;"><a href="/cart" style="color:var(--pink);">← Edit cart</a></p>';
  }
  function showPayMessage(title, body, cta){
    var pay = document.getElementById('checkoutPay');
    if(!pay) return;
    pay.innerHTML = '<div class="checkout-status"><h2>'+title+'</h2><p>'+body+'</p>'+(cta||'')+'</div>';
  }
  async function startCheckout(){
    var items = readCart();
    if(!items.length){
      showPayMessage('Cart is empty', 'Add a template from the shop before checking out.', '<a class="btn btn-pink" href="/shop" style="margin-top:1rem;">Browse shop</a>');
      return;
    }
    try {
      var res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items, origin: window.location.origin })
      });
      var data = await res.json();
      if(!res.ok){
        var msg = data.error || 'Checkout is not available right now.';
        var extra = !data.configured
          ? '<p style="margin-top:.75rem;font-size:.85rem;">Payment is not set up on the server yet. Please try again shortly or email <a href="mailto:hello@bloomiehouse.com.au" style="color:var(--pink);">hello@bloomiehouse.com.au</a>.</p>'
          : '';
        showPayMessage('Checkout unavailable', msg, extra + '<a class="btn btn-ghost" href="/cart" style="margin-top:1rem;">Back to cart</a>');
        return;
      }
      var embedRoot = document.getElementById('checkoutEmbed');
      var pay = document.getElementById('checkoutPay');
      if(pay) pay.innerHTML = '<p style="font-size:.85rem;color:var(--muted);margin-bottom:.75rem;">Secure payment by Polar</p>';
      function openEmbed(){
        if(!window.PolarEmbedCheckout){
          showPayMessage('Open secure checkout', 'Continue in Polar to complete your purchase.', '<a class="btn btn-pink" href="'+data.url+'" style="margin-top:1rem;">Pay now →</a>');
          return;
        }
        window.PolarEmbedCheckout.create(data.url, { theme: 'light' }).then(function(checkout){
          checkout.addEventListener('success', function(){
            try { localStorage.removeItem('bloomie_cart_v1'); } catch(e) {}
          });
          if(embedRoot && checkout.iframe){
            embedRoot.appendChild(checkout.iframe);
          }
        }).catch(function(){
          showPayMessage('Open secure checkout', 'Continue to complete your purchase.', '<a class="btn btn-pink" href="'+data.url+'" style="margin-top:1rem;">Pay now →</a>');
        });
      }
      if(window.PolarEmbedCheckout) openEmbed();
      else {
        var tries = 0;
        var wait = setInterval(function(){
          tries++;
          if(window.PolarEmbedCheckout){
            clearInterval(wait);
            openEmbed();
          } else if(tries > 25){
            clearInterval(wait);
            openEmbed();
          }
        }, 120);
      }
    } catch(err){
      showPayMessage('Connection error', 'Please try again in a moment.', '<a class="btn btn-ghost" href="/checkout" style="margin-top:1rem;">Retry</a>');
    }
  }
  function onReady(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  onReady(function(){
    renderSummary();
    startCheckout();
  });
})();`;
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
  <p>Save templates here, then complete secure checkout for instant digital download.</p>
</section>
<div class="cart-wrap">
  <div id="cartRoot"><p style="color:var(--muted);">Loading cart…</p></div>
</div>`;
  return layout(
    'Cart — Bloomie House',
    'Review your Bloomie House templates before secure checkout.',
    '/cart',
    body,
    'shop',
    catalogJson
  );
}

function servicesPage() {
  const body = `
<section class="page-hero">
  <p class="script" style="font-size:1.6rem;">simple, honest pricing —</p>
  <h1>Services &amp; <em>Pricing</em></h1>
  <p>Start with a template, add a 1-day customisation, or go fully bespoke. Every path is designed to get you online beautifully — without agency price tags or agency timelines.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="pricing-grid">
    <article class="price-card">
      <h3>Ready-Made Template</h3>
      <div class="amount">From $37</div>
      <p>Buy a template and make it yours with our step-by-step guides.</p>
      <ul>
        <li>Instant delivery, worldwide</li>
        <li>Canva, Shopify, Wix &amp; spreadsheet formats</li>
        <li>Fully editable colours, fonts &amp; content</li>
        <li>Setup guide included</li>
      </ul>
      <a class="btn btn-outline" href="/shop">Browse Templates</a>
    </article>
    <article class="price-card featured">
      <span class="badge">Most Loved</span>
      <h3>1-Day Customisation</h3>
      <div class="amount">Template + setup</div>
      <p>Pick any template — we tailor it to your brand and deliver within one business day.</p>
      <ul>
        <li>Your logo, colours, fonts &amp; content applied</li>
        <li>Set up on your platform, ready to publish</li>
        <li>One round of refinements included</li>
        <li>Handover walkthrough so you can self-edit</li>
      </ul>
      <a class="btn btn-pink" href="/start-a-project?package=custom">Start My Customisation</a>
    </article>
    <article class="price-card">
      <h3>Bespoke Website Design</h3>
      <div class="amount">By quote</div>
      <p>Custom design &amp; build, priced on design scope and backend complexity.</p>
      <ul>
        <li>Original design — no template</li>
        <li>Shopify, Wix or fully custom development</li>
        <li>Booking systems, e-commerce, integrations</li>
        <li>Discovery call to scope your project</li>
      </ul>
      <a class="btn btn-outline" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Request a Quote</a>
    </article>
  </div>
  <p style="text-align:center;margin-top:1.5rem;color:var(--muted);font-size:.92rem;">All prices in AUD. Website pricing covers design and build — hosting, domains and platform subscriptions are billed separately.</p>
</section>
<section class="section" style="background:var(--sage-soft);">
  <div class="section-center">
    <p class="section-label" style="color:var(--pink-deep);">The process</p>
    <h2 class="section-title">From project form to <em>launch</em></h2>
  </div>
  <div class="pricing-grid">
    <article class="price-card"><h3>1. Project form</h3><p>Tell us about your business, style and goals in about 5 minutes.</p></article>
    <article class="price-card"><h3>2. Discovery call</h3><p>We contact you within 3 business days to confirm scope &amp; quote.</p></article>
    <article class="price-card"><h3>3. Design &amp; build</h3><p>1-day customisations return in one business day; bespoke follows an agreed timeline.</p></article>
  </div>
</section>
<section class="section">
  <div class="cta-band">
    <span class="script">ready when you are —</span>
    <h2>Let's find the right fit for your project</h2>
    <p>Fill in the project form and we'll come back within 3 business days to book your discovery call.</p>
    <a class="btn btn-pink" href="/start-a-project">Start a Project</a>
  </div>
</section>`;
  return layout(
    'Services & Pricing — Bloomie House',
    'Three ways to work with Bloomie House: ready-made templates, 1-day customisation, or bespoke website design.',
    '/services',
    body,
    'services'
  );
}

function fullCustomPage() {
  const body = `
<section class="page-hero">
  <p class="script" style="font-size:1.6rem;">bespoke —</p>
  <h1>Bespoke <em>Website</em> Design</h1>
  <p>Built from scratch for your brand — your vision, your voice, no template limits. Priced on design scope and backend complexity.</p>
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
  <div style="text-align:center;margin-bottom:2rem;">
    <a class="btn btn-pink" href="${JOTFORM_DISCOVERY}" target="_blank" rel="noopener">Request a Quote</a>
    <a class="btn btn-ghost" href="/start-a-project?package=bespoke" style="margin-left:.6rem;">Or start a project form</a>
  </div>
  <div style="max-width:900px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:18px;padding:1rem;">
    <script type="text/javascript" src="${JOTFORM_CUSTOM}"><\/script>
  </div>
</section>`;
  return layout(
    'Bespoke Website Design — Bloomie House',
    'Get a fully custom website built from scratch. Up to 6 pages, brand strategy, SEO foundation & 30 days support.',
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
  <p class="script" style="font-size:1.6rem;">nice to meet you —</p>
  <h1>The studio behind the <em>blooms</em></h1>
  <p>Bloomie House is a small Australian design studio with one big belief: beautiful, effective websites shouldn't be reserved for businesses with agency budgets.</p>
</section>
<section class="section" style="max-width:900px;margin:0 auto;">
  <p style="font-size:1.1rem;color:var(--charcoal);line-height:1.85;margin-bottom:1.25rem;">
    We started Bloomie House after watching brilliant small businesses lose clients to mediocre competitors with better websites. So we built a studio around three things we know deeply: <strong>beauty businesses</strong>, <strong>weddings</strong> and <strong>trades</strong>.
  </p>
  <p style="color:var(--muted);line-height:1.85;margin-bottom:2rem;">
    Templates when you need speed, one-day customisation when you need it done for you, and bespoke design when you're ready to grow. Based in Australia, delivering worldwide.
  </p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-pink" href="/start-a-project">Start a Project</a>
    <a class="btn btn-ghost" href="/shop">Shop templates</a>
  </div>
</section>`;
  return layout(
    'About — Bloomie House',
    'Bloomie House is an Australian website & template studio helping lash artists, couples and trade businesses bloom online.',
    '/about',
    body,
    'about'
  );
}

function startProjectPage() {
  const options = templateData
    .map((t) => `<option value="${t.slug}">${t.name}</option>`)
    .join('');
  const body = `
<section class="page-hero">
  <p class="script" style="font-size:1.6rem;">let's begin —</p>
  <h1>Start your <em>project</em></h1>
  <p>Tell us about your business and what you need — it takes about 5 minutes. We'll review everything and contact you <strong>within 3 business days</strong> to book your discovery call.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="form-card">
    <form id="projectForm">
      <div class="form-grid">
        <div class="form-field"><label for="name">Your name *</label><input id="name" name="name" required></div>
        <div class="form-field"><label for="email">Email *</label><input id="email" name="email" type="email" required></div>
        <div class="form-field"><label for="business">Business / wedding name</label><input id="business" name="business" placeholder="e.g. Lashed by Luna"></div>
        <div class="form-field"><label for="location">Where are you based?</label><input id="location" name="location" placeholder="City, country"></div>
        <div class="form-field">
          <label for="type">Project type *</label>
          <select id="type" name="type" required>
            <option value="">Please choose…</option>
            <option>Beauty · Lash &amp; Brow</option>
            <option>Wedding</option>
            <option>Others (trades &amp; more)</option>
            <option>Something else</option>
          </select>
        </div>
        <div class="form-field">
          <label for="package">Which service? *</label>
          <select id="package" name="package" required>
            <option value="">Please choose…</option>
            <option value="template">Ready-made template (DIY)</option>
            <option value="custom">1-day template customisation</option>
            <option value="bespoke">Bespoke website design</option>
            <option value="unsure">Not sure yet — advise me</option>
          </select>
        </div>
        <div class="form-field">
          <label for="template">Template you're interested in</label>
          <select id="template" name="template">
            <option value="">Optional</option>
            ${options}
          </select>
        </div>
        <div class="form-field">
          <label for="platform">Preferred platform</label>
          <select id="platform" name="platform">
            <option value="">No preference — recommend one</option>
            <option>Canva</option>
            <option>Shopify</option>
            <option>Wix</option>
            <option>Custom build</option>
          </select>
        </div>
        <div class="form-field">
          <label for="budget">Budget range (AUD)</label>
          <select id="budget" name="budget">
            <option value="">Prefer to discuss</option>
            <option>Under $250</option>
            <option>$250 – $750</option>
            <option>$750 – $2,000</option>
            <option>$2,000+</option>
          </select>
        </div>
        <div class="form-field">
          <label for="timeline">When do you need it?</label>
          <select id="timeline" name="timeline">
            <option value="">Flexible</option>
            <option>ASAP — this week</option>
            <option>Within a month</option>
            <option>1–3 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div class="form-field full">
          <label for="details">Tell us about your project *</label>
          <textarea id="details" name="details" required placeholder="What does your business do? What pages or features do you need?"></textarea>
        </div>
        <div class="form-field full">
          <label for="inspo">Websites or styles you love</label>
          <input id="inspo" name="inspo" placeholder="Paste links, separated by commas (optional)">
        </div>
      </div>
      <div style="margin-top:1.5rem;text-align:center;">
        <button class="btn btn-primary" type="submit">Send My Project Form</button>
        <p style="font-size:.85rem;color:var(--muted);margin-top:14px;">We'll reply within 3 business days. Hosting &amp; domains not included.</p>
      </div>
    </form>
    <div class="form-success" id="projectSuccess">🌸 <strong>Thank you — your project form is in!</strong> We'll be in touch within 3 business days.</div>
  </div>
</section>
<script>
(function(){
  var q = new URLSearchParams(location.search);
  if (q.get('package')) {
    var pkg = document.getElementById('package');
    if (pkg) pkg.value = q.get('package');
  }
  if (q.get('template')) {
    var tpl = document.getElementById('template');
    if (tpl) tpl.value = q.get('template');
  }
  var form = document.getElementById('projectForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var lines = [];
    data.forEach(function(v,k){ if(v) lines.push(k + ': ' + v); });
    var subject = encodeURIComponent('Bloomie House project form');
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:hello@bloomiehouse.com.au?subject=' + subject + '&body=' + body;
    document.getElementById('projectSuccess').classList.add('show');
    form.reset();
  });
})();
</script>`;
  return layout(
    'Start a Project — Bloomie House',
    'Fill in the Bloomie House project form for template customisation or bespoke website design.',
    '/start-a-project',
    body,
    'services'
  );
}

function oneDayWebsitePage() {
  const body = `
<section class="page-hero">
  <p class="script" style="font-size:1.6rem;">everything done for you —</p>
  <h1>Your website, live in <em>1 day</em></h1>
  <p>Love a Bloomie House template but no time to DIY? We customise and launch your website in just one business day.</p>
  <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap;">
    <a class="btn btn-primary" href="/start-a-project?package=custom">I'm Ready To Launch</a>
    <a class="btn btn-outline" href="/services">See The Pricing</a>
  </div>
</section>
<section class="section">
  <div class="section-center">
    <p class="section-label" style="color:var(--pink-deep);">Is this you?</p>
    <h2 class="section-title">Who this is <em>perfect</em> for</h2>
  </div>
  <div class="pricing-grid">
    <article class="price-card"><h3>You need a polished website — fast</h3><p>You're ready to look more professional online, without spending weeks building it yourself.</p></article>
    <article class="price-card"><h3>You want to sell or take bookings</h3><p>Products, kits, courses or appointments — sold from your site, not your DMs.</p></article>
    <article class="price-card"><h3>You want to elevate your brand</h3><p>Your work is high-quality, but your online presence doesn't match it yet.</p></article>
  </div>
</section>
<section class="section">
  <div class="cta-band">
    <span class="script">ready when you are —</span>
    <h2>Let's launch your website tomorrow</h2>
    <p>Fill in the project form, tell us which template you love, and we'll get your website live within one business day.</p>
    <a class="btn btn-pink" href="/start-a-project?package=custom">Start My 1-Day Website</a>
  </div>
</section>`;
  return layout(
    'Website in 1 Day — Bloomie House',
    'We customise and launch your Bloomie House template in one business day.',
    '/one-day-website',
    body,
    'services'
  );
}

function blogPage() {
  const posts = [
    { href: '/blog/build-a-website-with-claude-ai', cover: '🤖', bg: 'var(--sage-soft)', meta: 'AI · Tutorial', title: 'How to Build a Website with Claude AI', excerpt: 'Plan, write and build a small business website — even with zero code experience.' },
    { href: '/blog/ai-tools-for-lash-artists', cover: '🌸', bg: 'var(--pink-soft)', meta: 'Beauty · AI Tips', title: '7 Ways Lash Artists Can Use AI to Get More Bookings', excerpt: 'From caption writing to aftercare automation — practical AI workflows.' },
    { href: '/blog/template-vs-custom-website', cover: '🌿', bg: 'var(--sage-soft)', meta: 'Guides', title: 'Template vs Custom Website', excerpt: 'An honest breakdown of cost, speed and results for small businesses.' },
  ].map((p) => `
    <a class="blog-card" href="${p.href}">
      <div class="cover" style="background:${p.bg};">${p.cover}</div>
      <div class="body">
        <div class="meta">${p.meta}</div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </div>
    </a>`).join('');
  const body = `
<section class="page-hero">
  <p class="script" style="font-size:1.6rem;">the bloomie blog —</p>
  <h1>Learn, launch &amp; <em>grow</em></h1>
  <p>Practical guides on building websites, growing your beauty business and getting more out of your templates.</p>
</section>
<section class="section" style="padding-top:1rem;">
  <div class="blog-grid">${posts}</div>
</section>`;
  return layout('Blog — Bloomie House', 'Website tips, AI workflows and small business guides from Bloomie House.', '/blog', body, 'blog');
}

function blogArticlePage(slug) {
  const articles = {
    'build-a-website-with-claude-ai': {
      meta: 'AI · Tutorial · 12 min read',
      title: 'How to Build a Website with Claude AI (Beginner Guide)',
      html: `<p>AI can help you plan structure, draft copy and even generate layout ideas for a small business site. Start with your offer, audience and one clear call-to-action — then let Claude help you turn that brief into pages.</p>
      <h2>1. Write a clear brief</h2>
      <p>Tell the AI who you serve, what you sell, and what action you want visitors to take (book, buy, enquire).</p>
      <h2>2. Outline pages</h2>
      <p>Ask for a homepage, services, about and contact outline with section-by-section goals.</p>
      <h2>3. Draft conversion copy</h2>
      <p>Generate headlines and body text, then edit in your voice. Pretty words still need your expertise.</p>
      <div class="article-cta"><h3>Prefer a head start?</h3><p>Browse Bloomie House templates and customise one in a day.</p><a class="btn btn-primary btn-sm" href="/shop">Shop Templates</a></div>`,
    },
    'ai-tools-for-lash-artists': {
      meta: 'Beauty · AI Tips · 8 min read',
      title: '7 Ways Lash Artists Can Use AI to Get More Bookings',
      html: `<p>You became a lash artist to do lashes — not to be a full-time copywriter and admin assistant. AI can handle the boring 80%.</p>
      <h2>1. Captions on demand</h2>
      <p>Feed a photo description and vibe, then save your favourite captions as templates.</p>
      <h2>2. DM quick replies</h2>
      <p>Draft polished answers to pricing, infills and aftercare questions once, then reuse them.</p>
      <h2>3. Clear policies clients actually read</h2>
      <p>Turn messy notes into a friendly-but-firm policies page that protects your calendar.</p>
      <div class="article-cta"><h3>Want the website that converts?</h3><p>Explore beauty &amp; lash templates built for bookings.</p><a class="btn btn-primary btn-sm" href="/beauty">Browse Beauty Templates</a></div>`,
    },
    'template-vs-custom-website': {
      meta: 'Guides · 6 min read',
      title: 'Template vs Custom Website: What Your Small Business Actually Needs',
      html: `<p>Templates win on speed and budget. Custom wins when your offer, brand or integrations are too specific for a ready-made layout.</p>
      <h2>Choose a template when…</h2>
      <p>You need to launch this week, your offer is clear, and you can work within a proven structure.</p>
      <h2>Choose custom when…</h2>
      <p>You're scaling, selling online at volume, or need unique flows that templates can't stretch into.</p>
      <div class="article-cta"><h3>Still unsure?</h3><p>Start a project and we'll recommend the right path.</p><a class="btn btn-primary btn-sm" href="/start-a-project">Start a Project</a></div>`,
    },
  };
  const a = articles[slug];
  if (!a) return null;
  const body = `
<article class="article">
  <div class="meta">${a.meta}</div>
  <h1>${a.title}</h1>
  ${a.html}
</article>`;
  return layout(`${a.title} — Bloomie House`, a.title, `/blog/${slug}`, body, 'blog');
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
