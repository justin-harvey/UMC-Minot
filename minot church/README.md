# United Methodist Church of Minot — Website

The official website for the **United Methodist Church of Minot, Maine**.
*Open Hearts, Open Minds, Open Doors.*

🌐 **Live site:** [umcminot.org](https://umcminot.org)

A fast, accessible, mobile-first static site — no build step, no framework. Built with
plain HTML, CSS, and JavaScript, and deployed on Netlify.

---

## Features

- 📱 **Responsive & mobile-first** — works on phones, tablets, and desktop
- ♿ **Accessible** — skip links, ARIA labels, keyboard navigation, semantic HTML
- ⚡ **PWA** — installable, offline-capable via service worker (`sw.js`)
- 🔎 **SEO + GEO optimized** — structured data, FAQ schema, `llms.txt`, sitemap, canonical URLs
- 🗓️ **Google Calendar & Padlet integrations** — events calendar and community prayer wall
- 🎨 **Design tokens** — centralized brand colors/spacing in `brand-tokens.css`

---

## Project structure

```
.
├── index.html              # Homepage (hero, about, worship, connect, resources, FAQ)
├── calendar.html           # Events calendar (Google Calendar embed + ICS download)
├── bible-study.html        # Bible study programs and resources
├── pastoral-care.html      # Pastoral care + Padlet prayer wall
├── thank-you.html          # Form submission confirmation
├── styles.css              # Main stylesheet
├── brand-tokens.css        # Design tokens (colors, spacing, typography)
├── script.js               # Nav, carousel, scroll animations
├── sw.js                   # Service worker (PWA / offline)
├── manifest.json           # PWA manifest
├── images/                 # Photos, logos, icons
│
├── robots.txt              # Crawler rules (incl. AI crawlers)
├── sitemap.xml             # XML sitemap
├── llms.txt                # AI-assistant content guide
├── favicon.svg             # Favicon
├── invite.ics              # Downloadable calendar file
│
├── netlify.toml            # Netlify build, redirects, headers, plugins
├── _headers                # Security + cache headers
├── _redirects              # URL redirects (clean URLs, domain consolidation)
│
├── GEO-SEO-REPORT.md/.pdf                 # SEO/GEO audit + remaining task checklist
└── Google-Business-Profile-Setup.md/.pdf  # Step-by-step GBP setup guide
```

## Church info

| | |
|---|---|
| **Address** | 142 Minot Ave, Minot, ME 04258 |
| **Phone** | (207) 783-9097 |
| **Email** | minotumc@gmail.com |
| **Sunday Worship** | 10:00 AM – 11:15 AM |

---

## Local development

No build tooling required — it's a static site. Just serve the folder:

```bash
# Python (built in)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

> **Note:** the Content-Security-Policy in `netlify.toml` and PWA/service-worker behavior
> only apply on the deployed site (or via HTTPS), so the Padlet prayer wall and Google
> Calendar embeds are best verified on the live/Netlify URL rather than a local file preview.

## Deployment

Hosted on **Netlify**, deployed automatically from this repository.

- Build command: none (static site)
- Publish directory: repository root
- Config: `netlify.toml` (redirects, security headers, caching, sitemap + Lighthouse plugins)

Pushing to the default branch triggers a new deploy.

---

## SEO / GEO

This site is optimized for both traditional search and AI answer engines (ChatGPT,
Perplexity, Google AI Overviews). See **`GEO-SEO-REPORT.md`** for the full audit, what's
been done, and the remaining off-site checklist (Google Business Profile, Search Console,
Bing Webmaster Tools).

## License / usage

© United Methodist Church of Minot, Maine. Content and imagery are property of the church.
Code may be adapted for other congregations; please replace church-specific content, images,
and contact details with your own.
