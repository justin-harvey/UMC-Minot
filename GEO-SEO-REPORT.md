# GEO + SEO Report — United Methodist Church of Minot

**Site:** https://umc-minot-maine.netlify.app (confirmed live)
**Date:** 2026-07-26
**Scope:** GEO (AI-search visibility) + traditional SEO for the static Netlify site

---

## ✅ COMPLETED (already applied to the files)

### Critical fixes — were actively hurting the site
- [x] **Broken carousel + footer images fixed** across all 4 pages. References used wrong
      capitalization (`IMG_0469.jpeg`, `Screenshot…PM.png`) and 404'd on Netlify's
      case-sensitive hosting. Now match the real lowercase filenames.
- [x] **Broken social-preview image fixed** — `og:image` pointed to a nonexistent
      `church-hero.jpg`; now uses the real `minot+umc.jpg`.
- [x] **Domain standardized to `umc-minot-maine.netlify.app`** (the actual live URL) across
      canonical tags, Open Graph, sitemap, and robots.txt. Removed the earlier cross-domain
      redirects that pointed at an unconfigured custom domain (would have broken the site).
- [x] **Broken asset references fixed** — footer logo (hidden U+202F space in filename) renamed
      to `footer-logo.png`; dead `favicon.ico` links removed (SVG favicon remains).
- [x] **Schema data errors corrected** — `email` was literally `"PENDING"`; `foundingDate`
      was `1870` (contradicting the site's own 1835 history); event date was a stale 2024.
- [x] **Invalid `netlify.toml` fixed** — had a duplicate `[build]` table that can break
      deploys; merged into one.

### GEO (AI-search) additions
- [x] **FAQ section + FAQPage schema** — 5 answer-shaped Q&As (service time, location,
      who's welcome, what to expect, history) that ChatGPT / Google AI Overviews / voice
      assistants can quote directly. Added a "FAQ" nav link and matching CSS.
- [x] **`llms.txt` created** — AI-crawler guide with clean key facts.
- [x] **`robots.txt` welcomes AI crawlers** — GPTBot, ClaudeBot, PerplexityBot,
      OAI-SearchBot, Google-Extended, Applebot-Extended, etc.
- [x] **Enriched Church schema** — added geo coordinates, openingHoursSpecification,
      areaServed (Minot/Auburn/Mechanic Falls/Poland), accessibility features,
      isAccessibleForFree, logo/image, free-offer pricing.

### Traditional SEO
- [x] **Canonical + Open Graph tags added to 3 subpages** (calendar, bible-study,
      pastoral-care) — they previously had none.
- [x] **Sitemap rebuilt** with real page URLs (was anchor fragments), current dates.
- [x] **Geo meta tags** (geo.region, geo.position, ICBM) + font preconnect +
      `loading="lazy"` on images.
- [x] **Placeholder social links removed** from footer + schema (no real profiles yet).

**Validation:** Both JSON-LD blocks parse valid; no broken image references remain.

---

## ⬜ REMAINING — prioritized, chip away top to bottom

### 🥇 Priority 1 — Off-site (biggest discovery impact, do these first)
- [ ] **Claim/verify Google Business Profile** for the church.
      *Why:* #1 driver of "church near me" + Google Maps discovery for a local church.
      *Effort:* ~30 min. https://business.google.com — search the address, claim it,
      add hours (Sun 10:00–11:15), photos, phone, and the umc-minot-maine.netlify.app link.
- [ ] **Set up Google Search Console** and verify `umc-minot-maine.netlify.app`.
      *Then:* submit `https://umc-minot-maine.netlify.app/sitemap.xml` and use "Request Indexing" on the
      homepage. *Why:* turns passive/slow discovery into days, and shows what queries you
      appear for. https://search.google.com/search-console
- [ ] **Set up Bing Webmaster Tools** (feeds ChatGPT + Copilot search).
      Can import directly from Google Search Console. https://www.bing.com/webmasters

### 🥈 Priority 2 — Verify my automated changes render correctly
- [ ] **Deploy and eyeball the live homepage** — confirm the carousel images and footer
      logo now load (they were broken), and the new FAQ section looks right.
- [x] **Exact map coordinates applied** — `44.0851445, -70.3191671` set in the two
      `geo.position`/`ICBM` meta tags and the JSON-LD `geo` block in `index.html`.
- [ ] **Test the structured data** at https://search.google.com/test/rich-results —
      paste the live umc-minot-maine.netlify.app URL; should show Church + FAQ with no errors.
- [ ] **Test the social preview** at https://www.opengraph.xyz — confirm the image shows.

### 🥉 Priority 3 — Content & authority (steady, ongoing)
- [ ] **Get listed in the Maine UMC conference / New England Conference church directory**
      with a link to umc-minot-maine.netlify.app. *Why:* a trusted, topical backlink — strong AI + SEO signal.
- [ ] **Community listings:** town of Minot site, local Facebook community groups,
      church-finder sites (e.g., UMC.org "Find-A-Church", church directories).
      Keep the name, address, phone **identical** everywhere (NAP consistency).
- [ ] **Add real social profiles when they exist** — then I'll re-add them to the footer
      and the schema `sameAs` (accurate links boost AI entity recognition).
- [ ] **Publish a little fresh content periodically** (a sermon post, event recap, or
      seasonal note). Even monthly signals the site is active and gives AI more to cite.

### 🔧 Priority 4 — Optional technical polish
- [x] **CSP fix for embeds applied** — added
      `frame-src https://padlet.com https://calendar.google.com;` (and `https:` to
      `img-src`) in `netlify.toml` so the Padlet prayer wall and Google Calendar iframes
      render. *Verify on the live site after deploy.*
- [x] **PWA icons + screenshots generated** — `icon-192.png`, `icon-512.png`,
      `screenshot-desktop.png`, `screenshot-mobile.png` created and added to `images/`
      (were declared in `manifest.json` but missing). Enables "install app" and clears
      console errors.
- [ ] **Fix dead in-page links** — a few "Learn More" / "Listen Now" buttons on the
      homepage point to `href="#"` (Small Groups, Online Sermons). Point them at real
      destinations or remove.
- [ ] **`#serve` nav link** points to a section that doesn't exist on the page. Either add
      a Serve section or remove the link from nav/footer.

---

## Quick reference — what changed, by file
| File | Change |
|------|--------|
| `index.html` | OG image, geo meta, preconnect, image case fixes, enriched Church schema, new FAQ schema + section, removed social links |
| `calendar.html` / `bible-study.html` / `pastoral-care.html` | Canonical + OG tags, footer logo image fix |
| `sitemap.xml` | Real page URLs, umc-minot-maine.netlify.app, current dates |
| `robots.txt` | umc-minot-maine.netlify.app, explicit AI-crawler allows |
| `llms.txt` | **New file** — AI content guide |
| `netlify.toml` | Duplicate `[build]` table fix, CSP `frame-src` for embeds, removed dead cross-domain redirects |
| `_redirects` | Removed dead cross-domain redirects (kept clean-URL + SPA rules) |
| `styles.css` | FAQ section styling appended |
