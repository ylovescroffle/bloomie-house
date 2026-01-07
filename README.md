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

## Customization

### Update Etsy Shop URL

Edit the Etsy shop link in `src/index.js`:

```javascript
<a href="https://www.etsy.com/shop/bloomiehouse" ...>
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
- HTML5
- CSS3 (Custom styling with animations)
- JavaScript (Vanilla JS)
- Google Fonts (Cormorant Garamond & Work Sans)
- Jotform (Form integration)

## License

MIT
