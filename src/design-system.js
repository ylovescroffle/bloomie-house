/**
 * Bloomie House design system — Candor Templates-inspired, with Bloomie pink/sage.
 *
 * Candor reference (candortemplates.com):
 * - Display: Editors Note (serif) → Cormorant Garamond
 * - Body/UI: Poppins + Neuzeit Grotesk → Poppins
 * - Accent italic in headings: Editors Note italic → Cormorant Garamond italic
 * - Meta/mono: Fragment Mono
 * - Icons: Material Symbols Outlined
 * - Palette: warm near-black, cream, sage green, earthy browns
 *
 * Bloomie keeps: pink (#D67D9A), sage (#C8D5B0), glassy 3D + motion.
 */

export const FONT_LINKS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Fragment+Mono:ital@0;1&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_forward,chat,check,close,email,menu,rocket_launch,shopping_bag,star&display=swap" rel="stylesheet">
`;

export function designTokens() {
  return `
:root {
  /* Typography */
  --font-display: 'Poppins', system-ui, sans-serif;
  --font-body: 'Poppins', system-ui, sans-serif;
  --font-accent: 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'Fragment Mono', ui-monospace, monospace;

  /* Warm neutrals (Candor-inspired) */
  --black: #211F1E;
  --white: #FEFEF9;
  --cream: #F1F0EA;
  --sand: #C7C3BE;
  --warm: #F6F8F9;
  --charcoal: #483C2A;
  --brown: #413829;
  --muted: #6E6860;

  /* Bloomie accents — preserved */
  --pink: #D67D9A;
  --pink-soft: #FBE5E8;
  --pink-hover: #C96B88;
  --sage: #C8D5B0;
  --sage-deep: #29692D;
  --sage-soft: rgba(200, 213, 176, 0.35);

  /* Semantic */
  --accent: #F1F0EA;
  --border: rgba(33, 31, 30, 0.08);
  --radius-sm: 0.4rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-pill: 999px;

  --shadow-border:
    0 0 0 1px rgba(33, 31, 30, 0.06),
    0 1px 2px -1px rgba(33, 31, 30, 0.06),
    0 2px 4px 0 rgba(33, 31, 30, 0.04);
  --shadow-border-hover:
    0 0 0 1px rgba(33, 31, 30, 0.08),
    0 1px 2px -1px rgba(33, 31, 30, 0.08),
    0 2px 4px 0 rgba(33, 31, 30, 0.06);
  --shadow-lift:
    0 0 0 1px rgba(33, 31, 30, 0.06),
    0 10px 28px -6px rgba(33, 31, 30, 0.12);
  --shadow-pink: 0 8px 20px -6px rgba(214, 125, 154, 0.45);

  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --dur-fast: 150ms;
  --dur-med: 280ms;
}
`;
}

export function iconStyles() {
  return `
.icon {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 1.15em;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  -webkit-font-smoothing: antialiased;
  vertical-align: -0.12em;
}
.icon-fill { font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24; }
.icon-sm { font-size: 1em; }
.icon-lg { font-size: 1.35em; }
.section-stars {
  display: flex;
  gap: 0.35rem;
  justify-content: center;
  color: var(--pink);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.85rem;
  opacity: 0.85;
}
`;
}

export function motionStyles() {
  return `
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes heroEnter {
  from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
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
`;
}

/** Material Symbol span — pass ligature name e.g. icon('shopping_bag') */
export function icon(name, className = '') {
  return `<span class="icon ${className}" aria-hidden="true">${name}</span>`;
}
