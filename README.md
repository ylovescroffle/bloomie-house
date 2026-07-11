# Bloomie House Website

A multi-page Cloudflare Workers website for Bloomie House - Web Design & Digital Products.

## Features

- **Homepage**: Beautiful landing page with service overview
- **Website Design Page**: Embedded Jotform discovery form for website design inquiries
- **Digital Templates Page**: Links to Etsy shop for digital products
- **Contact Page**: Contact form for other services and inquiries
- Logo integration across all pages
- Responsive design that works on all devices
- Fast and efficient routing via Cloudflare Workers

## Pages

1. **/** - Homepage with hero section and service cards
2. **/website-design** - Website design discovery form (Jotform integration)
3. **/digital-templates** - Digital templates showcase with Etsy shop link
4. **/contact** - Contact form for other services

## Setup

### Prerequisites

- Node.js installed
- Cloudflare account
- Wrangler CLI installed

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your logo:
   - Place your logo file `logo-long-house-green-background-transparent.png` in the `public` directory
   - Or update the logo reference in `src/index.js` to match your logo filename

### Development

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:8787` to see your site.

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## AI Chatbot (Groq)

The site includes a floating AI chat widget ("Bloomie") on every page, powered by
[Groq](https://groq.com). The Groq API key stays **server-side** in the Worker — the
browser only talks to the `/api/chat` route, never to Groq directly.

### How it works

- `src/index.js` exposes a `POST /api/chat` route (`handleChat`) that forwards the
  conversation to Groq's OpenAI-compatible Chat Completions API and returns the reply.
- The chat UI (`chatWidget`) is injected into every HTML page automatically by
  `htmlResponse()`, so there's nothing to add per page.
- The assistant's persona and business knowledge live in `CHAT_SYSTEM_PROMPT`.

### Setup

1. Create a free Groq API key at https://console.groq.com/keys

2. Add it as a Cloudflare Worker **secret** (production):

   ```bash
   npx wrangler secret put GROQ_API_KEY
   # paste your key when prompted
   ```

3. For **local development**, create a `.dev.vars` file in the project root
   (already gitignored — never commit it):

   ```
   GROQ_API_KEY=your_key_here
   ```

4. (Optional) Change the model in `wrangler.toml` via the `GROQ_MODEL` var.
   Defaults to `llama-3.3-70b-versatile`.

5. Run `npm run dev` and click the 💬 button in the bottom-right corner to test.

If `GROQ_API_KEY` is missing, the widget still appears but replies with a friendly
"not configured yet" message instead of crashing.

## Customization

### Update Etsy Shop URL

Edit the Etsy shop link in `src/index.js`:

```javascript
<a href="https://bloomlashbar.etsy.com" ...>
```

Replace `bloomiehouse` with your actual Etsy shop name.

### Update Jotform

The Jotform is already configured with the URL:
`https://form.jotform.com/haiyen0304/website-design-discovery`

To use a different form, update the `src` attribute in the iframe in the `websiteDesignPage` constant.

### Update Colors

The color scheme is defined in CSS variables at the top of each page:

```css
:root {
    --primary: #1a1a1a;
    --accent: #d4a89f;
    --sage: #8b9d7f;
    --light: #faf9f7;
    --mid: #e8e6e3;
    --text: #2c2c2c;
    --text-light: #666;
}
```

### Update Contact Email

Update the email address in the contact page footer:

```javascript
<a href="mailto:hello@bloomiehouse.com">hello@bloomiehouse.com</a>
```

## File Structure

```
bloomie-house/
├── src/
│   └── index.js          # Main worker file with all pages
├── public/               # Static assets (logo, images)
│   └── logo-long-house-green-background-transparent.png
├── package.json          # Node dependencies
├── wrangler.toml         # Cloudflare Workers config
└── README.md            # This file
```

## Technologies Used

- Cloudflare Workers
- Cloudflare D1 (member portal + staff CMS)
- HTML5
- CSS3 (Custom styling with animations)
- JavaScript (Vanilla JS)
- Google Fonts (Cormorant Garamond & Work Sans / Fraunces & DM Sans)
- Jotform (Form integration)

## Member portal & staff CMS

Site-managed customer accounts (not Etsy):

| Area | URL | Who |
|------|-----|-----|
| Member login | `/login` | Customers (email magic link) |
| Member home | `/member` | Orders, downloads, guidelines, profile, template votes |
| Staff login | `/login/staff` | Two staff accounts |
| Staff CMS | `/admin` | Products, orders, downloads/guidelines, members, votes |

### Local setup

```bash
npm run db:migrate:local
npm run dev
```

Default staff (change via `.dev.vars` before first run):

- `staff1@bloomiehouse.com.au` / `BloomieStaff1!`
- `staff2@bloomiehouse.com.au` / `BloomieStaff2!`

Optional `.dev.vars`:

```
RESEND_API_KEY=re_xxx          # real magic-link emails
STAFF1_EMAIL=...
STAFF1_PASSWORD=...
STAFF2_EMAIL=...
STAFF2_PASSWORD=...
```

Without Resend, the login page shows a one-time link for local testing.

### Production D1

```bash
npx wrangler d1 create bloomie-house
# paste database_id into wrangler.toml
npm run db:migrate:remote
```

## License

MIT
