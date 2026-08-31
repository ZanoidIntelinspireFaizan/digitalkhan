# Build: Digital Khan — Personal Brand & Software Products Website

You are a senior product designer, frontend engineer, technical SEO specialist, and GEO/AEO strategist building a real, production static website. This must read as **built by a real developer maintaining their own site** — not a generated template. The design anchors in Section 1 exist specifically to prevent that; treat them as requirements, not suggestions.

**Brand:** Digital Khan — a software developer's personal brand for independent software products.
**First product:** Launch Kit for Laravel — "Launch Real Projects. Not Boilerplate."
**Positioning:** NOT an agency, NOT a generic SaaS company. A real developer who ships real software.
**Architecture requirement:** Must scale to multiple future products without redesign.

---

## 1. Design System & Anti-AI Anchors (read first, applies to every section below)

**Two-tier color system — this is the key structural decision:**
- **Digital Khan (site-wide identity):** Deep charcoal (~#111113) + warm off-white (~#FAFAF8) + muted gray text. Pick ONE neutral accent for the brand itself (not red — red belongs to Launch Kit specifically) — e.g. a restrained ink-blue or just monochrome with red reserved as noted below.
- **Launch Kit (nested product identity):** Inherits the Digital Khan neutrals, but uses Laravel red (~#FF2D20) as ITS OWN accent, scoped to `/products/launch-kit-for-laravel/` and its card on `/products/`. Do not bleed Launch Kit's red into the homepage, about, articles, or contact pages — those stay neutral. This is what lets future products each have their own accent color later without a redesign.

**Typography:** One distinctive sans-serif for headings/body (something with character, not default Inter/system-ui at default weight — e.g. General Sans, Geist, or similar). One monospace for code/CLI/metadata (JetBrains Mono style). Real type scale: 14/16/20/28/40/56px — define once, reuse via Tailwind config, don't leave to defaults.

**Spacing:** 8pt spacing system. Max content width ~1200px. Define in Tailwind config, not ad hoc.

**Signature element:** One recurring visual device tying pages together — e.g. a thin left-margin rule with section index numbers, or a consistent code-panel treatment that appears (in varied form) on home, product, and articles pages. Don't let each page invent its own decorative language.

**Reference class:** Restrained, editorial, technical — think Linear, Laravel Forge/Filament, a solo developer's well-kept portfolio. Not a generic startup template.

**Icons:** No decorative default icon-pack look (no default Heroicons/Lucide used as filler). Small, monochrome, functional only, or skip icons where text works better.

**Hard bans (state once, don't repeat elsewhere):** gradient blobs, glassmorphism, floating decorative cards, generic 3D illustrations, AI-generated portraits, stock photography, fake testimonials/logos/stats/GitHub stars/download counts, huge glowing text, purple gradients, neon effects, excessive rounded corners, identical repeated card-grid sections, excessive animation/parallax.

**Voice:** Confident, technical, direct, understated — a developer explaining something to another developer. Banned phrases: "empower," "unlock your potential," "revolutionize," "next-generation," "seamless experience," "cutting-edge," "transform your ideas," "take it to the next level."

**No fake information — ever:** no invented customers, testimonials, stars, download counts, revenue, years of experience, credentials, Laravel version claims, license terms, or support policies. Unknown = editable placeholder/config value or omit entirely.

---

## 2. Site Architecture

```
/                                          Home
/about/                                    About Digital Khan
/products/                                 Products listing
/products/launch-kit-for-laravel/          Launch Kit product page
/projects/                                 Projects / selected work
/articles/                                 Technical articles
/contact/                                  Contact
```
Built so `/products/[future-product]/` can be added via data only — no homepage or nav redesign required.

---

## 3. Page-by-Page Content

**Home:** Digital Khan introduced as a person/builder first — Launch Kit does not dominate. Hero: eyebrow "SOFTWARE DEVELOPER · PRODUCT BUILDER", headline "I build software that solves real problems," supporting line, CTA "Explore Products" / "About Me". Right side: a real technical visual (terminal, code editor, project structure) — not a portrait or illustration. Then a **Featured Product** section for Launch Kit (name, tagline, one-line description, "Explore Launch Kit" / "View Demo" using `DEMO_URL_PLACEHOLDER`).

**Products (`/products/`):** "Software Products" heading. Card system driven by a `products` data array (name, slug, description, category, status, url). Launch Kit is the only real entry — do not invent future products.

**Launch Kit product page:** Full commercial product page, visually connected to Digital Khan but carrying its own red accent (per Section 1). Hero (two-column, realistic Laravel admin UI preview — sidebar, dashboard, users, roles, activity, settings), Problem section (build-everything-from-scratch sequence → Launch Kit as starting point), Value section (no invented % savings claims), Features (Authentication, User Management, Roles & Permissions, Admin Dashboard, CMS, Common Modules, Developer Foundation — only real, known capabilities), Architecture (realistic file-tree code panel, clearly labeled as illustrative if the exact structure isn't confirmed), Screenshots (varied compositions, illustrative fictional data, no lorem ipsum), Who It's For (Freelancers/Agencies/SaaS Builders/Startup Teams/Laravel Developers), Use Cases, Demo section (CTA disabled or hidden until `DEMO_URL_PLACEHOLDER` is set — never fake a URL), Pricing (`PRICE_PLACEHOLDER`, CTA → `https://pathan0faizan.gumroad.com/l/LaunchKitforLaravel`, `rel="noopener noreferrer"`, clearly states purchase completes via Gumroad, no fake checkout), FAQ (editable content fields where answers aren't confirmed).

**About:** "Software Developer & Product Builder." Philosophy-driven (practical software, real problems, reusable systems) — no invented experience/clients/awards/metrics. Links to Products, Projects, Articles, Contact.

**Projects:** Data-driven, empty state "Projects will be added here." if none configured — never filled with fake portfolio items.

**Articles:** Listing page structured for Laravel/PHP/architecture/dev-tooling content, ready for future posts. No fake articles.

**Contact:** Configurable email/GitHub/verified profiles only. No invented social accounts.

---

## 4. SEO, AEO, GEO

- Centralized SEO config object (title/description/canonical/OG/Twitter per page) — no scattered metadata.
- Natural (not stuffed) targeting: homepage around "Digital Khan," "software developer," "developer tools"; Launch Kit page around "Laravel starter kit," "production-ready Laravel starter kit," "Laravel authentication and RBAC starter kit."
- Direct-answer content structure for AEO: e.g. an explicit "## What is Launch Kit for Laravel?" followed immediately by a concise defining paragraph, not buried in decorative UI.
- Consistent entity naming everywhere (page content, titles, meta, JSON-LD, OG, nav) — always "Launch Kit for Laravel," never a varying alias.
- JSON-LD: Person (Digital Khan), WebSite, SoftwareApplication + Product (Launch Kit), BreadcrumbList, Article (future), FAQPage (only where matching visible content). All centralized and kept in sync with visible content — no mismatched schema.
- Descriptive internal link anchor text (no "click here" / "learn more").

---

## 5. Technical Requirements

- **Stack:** Static HTML + Tailwind (proper build, not CDN) + vanilla JS (mobile nav, FAQ accordion, menu state, demo-URL config check — nothing more than needed).
- **Hosting:** Fully static — GitHub Actions → GitHub Pages. No server runtime, no DB, no SSR, no backend routing. Configurable base path so it survives a future move to a custom domain.
- **Structure:**
```
/
├── index.html, about/, products/ (incl. launch-kit-for-laravel/), projects/, articles/, contact/
├── assets/{css,js,images,icons}/
├── data/{products.js, seo.js, content.js}
├── robots.txt, sitemap.xml, site.webmanifest
├── .github/workflows/deploy.yml
├── package.json, README.md
```
- **Central config values:** `SITE_URL`, `GUMROAD_LAUNCH_KIT_URL`, `LAUNCH_KIT_DEMO_URL` (= `DEMO_URL_PLACEHOLDER` until set), `CONTACT_EMAIL`, `GITHUB_URL`, `PRICE`, `PRODUCT_STATUS` — never scattered inline.
- **Performance:** minimal JS/deps, responsive/lazy images, small compiled CSS, no animation libraries.
- **Accessibility:** semantic HTML, correct heading order, keyboard nav, visible focus states, alt text, reduced-motion respected.
- **README** covering local dev, build, GitHub Pages config, custom domain setup, and where to update product/demo URLs.

---

## 6. Before Finishing — Self-Check

- Does the homepage read as "a developer's site" first, "Launch Kit's landing page" second?
- Is Launch Kit's red accent contained to its own product surfaces, not bleeding across the whole site?
- Could a new product be added by editing data only — no visual redesign?
- Any invented stats, testimonials, or unconfirmed claims anywhere?
- Does every page have unique, accurate metadata matching its visible content?
- Would this be mistaken for a generic AI-generated template in the first few seconds?

Deliver the complete working project (real HTML pages, Tailwind build, JS, data/config files, JSON-LD, robots.txt, sitemap.xml, manifest, favicon concept, GitHub Actions workflow, README) — not a mockup, not snippets, not a design description.

---

## 7. Development & Deployment

### Requirements
- Node.js 20+ (22 recommended)
- ImageMagick (`convert`) for favicon / OG images
- npm

### Local development

```bash
npm install          # installs tailwindcss + self-hosted font packages
npm run build        # builds CSS, images, fonts and assembles dist/
npm run serve        # serves dist/ at http://localhost:4173
```

Watch mode for CSS (rebuilds `assets/css/main.css` on change):

```bash
npm run build:css:watch
```

### Site structure

```
├── src/
│   ├── pages/        one template per route (home, about, products, …)
│   ├── partials/     shared head / header / footer
│   └── styles/       Tailwind input.css (design tokens live in tailwind.config.js)
├── data/
│   ├── config.js     SITE_URL, Gumroad URL, demo URL, contact, price
│   ├── products.js   product catalog → /products/ listing
│   ├── content.js    FAQ text, projects & articles lists (editable)
│   └── seo.js        per-page titles, descriptions, canonical paths
├── assets/
│   ├── css/          compiled Tailwind output
│   ├── js/           vanilla JS (menu, FAQ accordion, demo-URL check)
│   ├── fonts/        self-hosted woff2 (generated)
│   └── images/       favicon + OG images (generated)
├── scripts/
│   ├── build.mjs     page assembly, JSON-LD, sitemap, static copy
│   ├── copy-fonts.mjs
│   └── generate-images.mjs
└── .github/workflows/deploy.yml   → GitHub Pages
```

### Editing config values

All site-critical values live in `data/config.js`:

| Key | Purpose |
|---|---|
| `SITE_URL` | Canonical origin (change when moving to a custom domain) |
| `GUMROAD_LAUNCH_KIT_URL` | Launch Kit checkout link |
| `LAUNCH_KIT_DEMO_URL` | Set to a real URL to enable the demo CTA; empty = disabled |
| `CONTACT_EMAIL` / `GITHUB_URL` | Contact page rows; empty = honest "pending" state |
| `PRICE` | Shown in pricing section; empty = deferred to Gumroad |
| `PRODUCT_STATUS` | Badge on the product hero |

Adding a product = add one object to `data/products.js` (and a page under
`src/pages/`). No nav or design changes required.

### GitHub Pages deployment

1. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The site is published under `https://<user>.github.io/<repo>/`. Links
   are relative, so no rebuild is needed if the repo is renamed.

### Custom domain

1. Add a `CNAME` file (e.g. [`digitalkhan.dev`](http://digitalkhan.dev))
   in the repo root — the build copies it into `dist/` automatically.
2. Update `SITE_URL` in `data/config.js`, then rebuild and push.

### No fake content policy

Every claim on the site must be true. Values that are not yet known
(demo URL, price, contact email, version support) render an honest
"pending" state in production — placeholders are never displayed as
real data.
