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

      case '/website-design':
        return htmlResponse(websiteDesignPage);

      case '/digital-templates':
        return htmlResponse(digitalTemplatesPage);

      case '/contact':
        return htmlResponse(contactPage);

      case '/logo-long-house-green-background-transparent.png':
        // Serve logo from assets
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

      default:
        return new Response('Not Found', { status: 404 });
    }
  },
};

// Helper function to return HTML responses
function htmlResponse(html) {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// Shared styles and header
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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Work Sans', sans-serif;
    background: var(--light);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background: linear-gradient(to bottom, var(--light) 0%, var(--light) 70%, transparent 100%);
    animation: slideDown 0.8s ease-out;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.logo {
    height: 50px;
    display: flex;
    align-items: center;
}

.logo img {
    height: 100%;
    width: auto;
}

nav {
    display: flex;
    gap: 2rem;
}

nav a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    position: relative;
    transition: color 0.3s ease;
}

nav a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--sage);
    transition: width 0.3s ease;
}

nav a:hover {
    color: var(--sage);
}

nav a:hover::after {
    width: 100%;
}

nav a.active {
    color: var(--sage);
}

.section {
    padding: 8rem 4rem;
    position: relative;
    min-height: 100vh;
}

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

.cta-button:hover {
    background: transparent;
    color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.content-card {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem;
    background: white;
    border: 1px solid var(--mid);
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
}

footer {
    text-align: center;
    padding: 3rem;
    background: var(--primary);
    color: var(--mid);
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .header {
        padding: 1.5rem 2rem;
        flex-direction: column;
        gap: 1rem;
    }

    nav {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .section {
        padding: 5rem 2rem;
    }

    .section-title {
        font-size: 2.5rem;
    }

    .content-card {
        padding: 2rem;
    }
}
`;

const sharedHeader = `
<header class="header">
    <div class="logo">
        <a href="/">
            <img src="/logo-long-house-green-background-transparent.png" alt="Bloomie House">
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

const sharedFooter = `
<footer>
    <p>&copy; 2024 Bloomie House. Web Design & Digital Products.</p>
</footer>
`;

// Homepage HTML
const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bloomie House — Web Design & Digital Products</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        ${sharedStyles}

        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 0 4rem;
        }

        .hero-content {
            max-width: 900px;
            text-align: center;
            animation: fadeInUp 1s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 5.5rem;
            font-weight: 300;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: var(--primary);
            letter-spacing: -1px;
        }

        .hero h1 strong {
            font-weight: 600;
            color: var(--accent);
            display: block;
            font-style: italic;
        }

        .hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 600px;
            margin: 0 auto 3rem;
            font-weight: 300;
            letter-spacing: 0.3px;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1000px;
            margin: 4rem auto;
            padding: 0 2rem;
        }

        .service-card {
            padding: 2.5rem;
            background: white;
            border: 1px solid var(--mid);
            transition: all 0.4s ease;
            text-align: center;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.08);
            border-color: var(--sage);
        }

        .service-icon {
            width: 60px;
            height: 60px;
            background: var(--sage);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
            color: white;
        }

        .service-card h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--primary);
        }

        .service-card p {
            color: var(--text-light);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 3.5rem;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    ${sharedHeader}

    <section class="hero">
        <div class="hero-content">
            <h1>Web Design &<br><strong>Digital Excellence</strong></h1>
            <p>Crafting sophisticated digital experiences and strategic web solutions that elevate your brand and connect with your audience.</p>
            <a href="/website-design" class="cta-button">START YOUR PROJECT</a>
        </div>
    </section>

    <div class="services-grid">
        <div class="service-card">
            <div class="service-icon">✦</div>
            <h3>Website Design</h3>
            <p>Custom websites that combine beauty with strategic functionality.</p>
            <a href="/website-design" class="cta-button">Get Started</a>
        </div>

        <div class="service-card">
            <div class="service-icon">◆</div>
            <h3>Digital Templates</h3>
            <p>Ready-to-use templates to streamline your business operations.</p>
            <a href="/digital-templates" class="cta-button">Shop Now</a>
        </div>

        <div class="service-card">
            <div class="service-icon">✧</div>
            <h3>Other Services</h3>
            <p>Looking for something else? We'd love to hear from you.</p>
            <a href="/contact" class="cta-button">Contact Us</a>
        </div>
    </div>

    ${sharedFooter}

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>`;

// Website Design Page
const websiteDesignPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Design — Bloomie House</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        ${sharedStyles}

        .jotform-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }

        .jotform-wrapper {
            background: white;
            border: 1px solid var(--mid);
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        iframe {
            width: 100%;
            border: none;
            min-height: 800px;
        }

        .intro-text {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 3rem;
        }

        .intro-text h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 1rem;
        }

        .intro-text p {
            font-size: 1.1rem;
            color: var(--text-light);
            line-height: 1.8;
        }

        .features-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .feature-item {
            text-align: center;
            padding: 1.5rem;
        }

        .feature-icon {
            font-size: 2rem;
            color: var(--sage);
            margin-bottom: 1rem;
        }

        .feature-item h4 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.3rem;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }

        .feature-item p {
            color: var(--text-light);
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    ${sharedHeader}

    <section class="section">
        <h1 class="section-title">Website Design Discovery</h1>
        <p class="section-subtitle">Let's bring your vision to life. Fill out our discovery form to get started on your custom website design project.</p>

        <div class="intro-text">
            <h2>What to Expect</h2>
            <p>Our discovery process helps us understand your brand, goals, and vision. This ensures we create a website that truly reflects your business and connects with your audience.</p>
        </div>

        <div class="features-list">
            <div class="feature-item">
                <div class="feature-icon">✦</div>
                <h4>Custom Design</h4>
                <p>Tailored to your brand identity</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">◆</div>
                <h4>Responsive</h4>
                <p>Beautiful on all devices</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">✧</div>
                <h4>Strategic</h4>
                <p>Built for your business goals</p>
            </div>
        </div>

        <div class="jotform-container">
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
                >
                </iframe>
                <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
                <script>window.jotformEmbedHandler("iframe[id='JotFormIFrame-243655997068176']", "https://form.jotform.com/")</script>
            </div>
        </div>
    </section>

    ${sharedFooter}
</body>
</html>`;

// Digital Templates Page
const digitalTemplatesPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Templates — Bloomie House</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        ${sharedStyles}

        .templates-hero {
            text-align: center;
            padding: 10rem 2rem 5rem;
        }

        .templates-hero h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 4rem;
            font-weight: 300;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }

        .templates-hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto 3rem;
            line-height: 1.8;
        }

        .etsy-cta {
            max-width: 800px;
            margin: 4rem auto;
            padding: 4rem;
            background: white;
            border: 1px solid var(--mid);
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .etsy-cta h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }

        .etsy-cta p {
            font-size: 1.1rem;
            color: var(--text-light);
            margin-bottom: 2.5rem;
            line-height: 1.8;
        }

        .etsy-button {
            display: inline-block;
            padding: 1.2rem 3.5rem;
            background: var(--sage);
            color: white;
            text-decoration: none;
            font-size: 1rem;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            border: 2px solid var(--sage);
            font-weight: 500;
        }

        .etsy-button:hover {
            background: transparent;
            color: var(--sage);
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .template-types {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            max-width: 1000px;
            margin: 4rem auto;
            padding: 0 2rem;
        }

        .template-type {
            padding: 2.5rem;
            background: white;
            border: 1px solid var(--mid);
            text-align: center;
            transition: all 0.3s ease;
        }

        .template-type:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            border-color: var(--sage);
        }

        .template-type h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }

        .template-type p {
            color: var(--text-light);
            line-height: 1.7;
        }

        .template-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    ${sharedHeader}

    <section class="templates-hero">
        <h1>Digital Templates</h1>
        <p>Ready-to-use digital resources designed to streamline your business operations and enhance your online presence. Professional templates you can customize to fit your needs.</p>
    </section>

    <section class="section">
        <div class="template-types">
            <div class="template-type">
                <div class="template-icon">📋</div>
                <h3>Business Templates</h3>
                <p>Professional templates for proposals, invoices, contracts, and more.</p>
            </div>
            <div class="template-type">
                <div class="template-icon">🎨</div>
                <h3>Marketing Materials</h3>
                <p>Social media templates, email designs, and brand assets.</p>
            </div>
            <div class="template-type">
                <div class="template-icon">📚</div>
                <h3>Digital Products</h3>
                <p>PLR/MRR content, guides, workbooks, and educational resources.</p>
            </div>
        </div>

        <div class="etsy-cta">
            <h2>Shop Our Collection</h2>
            <p>Browse our full collection of digital templates and resources on Etsy. Each template is professionally designed and ready to download instantly.</p>
            <a href="https://www.etsy.com/shop/bloomiehouse" class="etsy-button" target="_blank" rel="noopener noreferrer">VISIT OUR ETSY SHOP</a>
        </div>
    </section>

    ${sharedFooter}
</body>
</html>`;

// Contact Page
const contactPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us — Bloomie House</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        ${sharedStyles}

        .contact-hero {
            text-align: center;
            padding: 10rem 2rem 3rem;
        }

        .contact-hero h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 4rem;
            font-weight: 300;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }

        .contact-hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.8;
        }

        .contact-form-container {
            max-width: 700px;
            margin: 4rem auto;
            padding: 3rem;
            background: white;
            border: 1px solid var(--mid);
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-group label {
            display: block;
            font-size: 0.95rem;
            color: var(--text);
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 1rem;
            border: 1px solid var(--mid);
            background: var(--light);
            font-family: 'Work Sans', sans-serif;
            font-size: 1rem;
            color: var(--text);
            transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--sage);
        }

        .form-group textarea {
            min-height: 150px;
            resize: vertical;
        }

        .submit-button {
            width: 100%;
            padding: 1.2rem;
            background: var(--primary);
            color: var(--light);
            border: none;
            font-size: 1rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Work Sans', sans-serif;
            font-weight: 500;
        }

        .submit-button:hover {
            background: var(--sage);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .contact-info {
            max-width: 700px;
            margin: 3rem auto;
            padding: 2rem;
            text-align: center;
        }

        .contact-info h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }

        .contact-info p {
            color: var(--text-light);
            line-height: 1.8;
            margin-bottom: 1rem;
        }

        .contact-info a {
            color: var(--sage);
            text-decoration: none;
            font-weight: 500;
        }

        .contact-info a:hover {
            text-decoration: underline;
        }

        .form-message {
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 4px;
            display: none;
        }

        .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }

        .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }
    </style>
</head>
<body>
    ${sharedHeader}

    <section class="contact-hero">
        <h1>Get In Touch</h1>
        <p>Looking for custom services or have a unique project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
    </section>

    <section class="section">
        <div class="contact-form-container">
            <div id="formMessage" class="form-message"></div>

            <form id="contactForm" onsubmit="handleSubmit(event)">
                <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone">
                </div>

                <div class="form-group">
                    <label for="service">Service Interest</label>
                    <select id="service" name="service">
                        <option value="">Select a service...</option>
                        <option value="consulting">Strategic Consulting</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="custom-development">Custom Development</option>
                        <option value="maintenance">Website Maintenance</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" required placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="submit" class="submit-button">SEND MESSAGE</button>
            </form>
        </div>

        <div class="contact-info">
            <h3>Other Ways to Connect</h3>
            <p>Email us directly at <a href="mailto:hello@bloomiehouse.com">hello@bloomiehouse.com</a></p>
            <p>We offer services in English & Vietnamese</p>
        </div>
    </section>

    ${sharedFooter}

    <script>
        function handleSubmit(event) {
            event.preventDefault();

            const formMessage = document.getElementById('formMessage');
            const form = document.getElementById('contactForm');

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to your backend
            // For now, we'll just show a success message

            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            // Reset form
            form.reset();

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    </script>
</body>
</html>`;
