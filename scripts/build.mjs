/*
 * Site build — assembles the static pages from src/ + data/ into dist/.
 *
 * - Shallow template assembly (partials + tokens) — no framework needed.
 * - All metadata/JSON-LD comes from data/seo.js + data/content.js so the
 *   schema always matches the visible content.
 * - Relative asset paths are computed per route depth, so the site works
 *   at /, /digitalkhan/, or any custom domain without a rebuild.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { isAbsolute } from "node:path";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "../data/config.js";
import { seo } from "../data/seo.js";
import { products } from "../data/products.js";
import { projectList, articleList, faq } from "../data/content.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const SITE = config.SITE_URL.replace(/\/$/, "");

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */
const routes = [
  { id: "home", src: "src/pages/home.html", out: "", file: "index.html" },
  { id: "about", src: "src/pages/about.html", out: "about", file: "index.html" },
  { id: "products", src: "src/pages/products.html", out: "products", file: "index.html" },
  {
    id: "product-launch-kit",
    src: "src/pages/product-launch-kit.html",
    out: "products/launch-kit-for-laravel",
    file: "index.html",
  },
  { id: "projects", src: "src/pages/projects.html", out: "projects", file: "index.html" },
  { id: "articles", src: "src/pages/articles.html", out: "articles", file: "index.html" },
  { id: "contact", src: "src/pages/contact.html", out: "contact", file: "index.html" },
  { id: "notFound", src: "src/pages/404.html", out: "", file: "404.html" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const write = (p, content) => {
  const file = isAbsolute(p) ? p : join(ROOT, p);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};
const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const depthPrefix = (out) => {
  const depth = out ? out.split("/").filter(Boolean).length : 0;
  return depth === 0 ? "./" : "../".repeat(depth);
};

/* ------------------------------------------------------------------ */
/* List builders (data-driven)                                         */
/* ------------------------------------------------------------------ */
function productsListHTML() {
  if (!products.length) {
    return `<div class="empty-note"><p class="font-mono text-14 text-ink">No products listed yet.</p><p class="mt-1 text-16 text-muted">New releases will appear here when they're real.</p></div>`;
  }
  return products
    .map((p) => {
      const red = p.accent === "red";
      const border = red ? "border-l-2 border-l-red-600" : "border-l-2 border-l-accent";
      return `
      <a href="@root${p.url}" class="${border} block border-t border-line py-4 pl-3 hover:bg-paper">
        <div class="flex flex-wrap items-baseline gap-2">
          <h2 class="text-28 font-semibold tracking-tight text-ink">${esc(p.name)}</h2>
          <span class="font-mono text-14 ${red ? "text-red-600" : "text-accent"}">${esc(p.category)}</span>
          <span class="font-mono text-14 text-muted">${esc(p.status)}</span>
        </div>
        <p class="mt-1 max-w-2xl font-mono text-14 text-muted">${esc(p.tagline)}</p>
        <p class="mt-2 max-w-2xl text-16 text-muted">${esc(p.description)}</p>
        <p class="mt-2 font-mono text-14 text-ink">View product →</p>
      </a>`;
    })
    .join("");
}

function listOrEmpty(list, label, id) {
  if (list.length) return `<ul>${list.map((i) => `<li>${esc(i.title)}</li>`).join("")}</ul>`;
  return `<div class="empty-note" id="${id}">
    <p class="font-mono text-14 text-ink">// ${label} — none yet</p>
    <p class="mt-1 text-16 text-muted">Projects will be added here when they ship. Nothing on this site is placeholder filler.</p>
  </div>`;
}

function faqListHTML() {
  return faq
    .map((item, i) => {
      const id = `faq-${i}`;
      const qId = `faq-q-${i}`;
      return `
      <div class="faq-item">
        <h3>
          <button class="faq-question" id="${qId}" aria-expanded="false" aria-controls="${id}" data-faq>
            ${esc(item.q)}
          </button>
        </h3>
        <div class="faq-answer" id="${id}" role="region" aria-labelledby="${qId}" hidden>
          <p class="text-16 text-muted">${esc(item.a)}</p>
        </div>
      </div>`;
    })
    .join("");
}

function contactRowsHTML() {
  const rows = [];
  if (config.CONTACT_EMAIL) {
    rows.push(`
      <a class="link-row" href="mailto:${esc(config.CONTACT_EMAIL)}">
        <span class="row-title">Email</span>
        <span class="row-desc font-mono">${esc(config.CONTACT_EMAIL)}</span>
      </a>`);
  } else {
    rows.push(`
      <div class="link-row">
        <span class="row-title">Email</span>
        <span class="row-desc font-mono text-muted">pending — set CONTACT_EMAIL in data/config.js</span>
      </div>`);
  }
  if (config.GITHUB_URL) {
    rows.push(`
      <a class="link-row" href="${esc(config.GITHUB_URL)}" rel="me noopener noreferrer" target="_blank">
        <span class="row-title">GitHub</span>
        <span class="row-desc font-mono">${esc(config.GITHUB_URL)}</span>
      </a>`);
  } else {
    rows.push(`
      <div class="link-row">
        <span class="row-title">GitHub</span>
        <span class="row-desc font-mono text-muted">pending — set GITHUB_URL in data/config.js</span>
      </div>`);
  }
  rows.push(`
    <a class="link-row" href="${esc(config.GUMROAD_LAUNCH_KIT_URL)}" target="_blank" rel="noopener noreferrer">
      <span class="row-title">Gumroad</span>
      <span class="row-desc font-mono">Launch Kit for Laravel listing</span>
    </a>`);
  return rows.join("\n");
}

/* ------------------------------------------------------------------ */
/* JSON-LD (kept in sync with visible content)                         */
/* ------------------------------------------------------------------ */
function jsonLd(page, meta) {
  const scripts = [];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Digital Khan",
    jobTitle: "Software Developer & Product Builder",
    url: SITE + "/",
  };
  if (config.GITHUB_URL) person.sameAs = [config.GITHUB_URL];
  scripts.push(JSON.stringify(person));

  scripts.push(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Digital Khan",
      url: SITE + "/",
    })
  );

  if (page === "product-launch-kit") {
    const product = products[0];
    const software = {
      "@context": "https://schema.org",
      "@type": ["SoftwareApplication", "Product"],
      name: product.name,
      description: product.description,
      url: SITE + product.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
    };
    if (config.PRICE) {
      software.offers = {
        "@type": "Offer",
        price: config.PRICE.replace(/[^\d.]/g, ""),
        priceCurrency: config.PRICE.replace(/[^\p{L}]/gu, "").toUpperCase() || "INR",
        url: config.GUMROAD_LAUNCH_KIT_URL,
      };
    }
    scripts.push(JSON.stringify(software));

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    scripts.push(JSON.stringify(faqSchema));
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: SITE + "/products/" },
    ],
  };
  if (page === "product-launch-kit") {
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: "Launch Kit for Laravel",
      item: SITE + "/products/launch-kit-for-laravel/",
    });
  }
  if (page !== "home" && page !== "product-launch-kit") {
    breadcrumb.itemListElement = [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    ];
  }
  if (page === "products") scripts.push(JSON.stringify(breadcrumb));
  if (page === "product-launch-kit") scripts.push(JSON.stringify(breadcrumb));

  return scripts
    .map((s) => `<script type="application/ld+json">${s}</script>`)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/* Page assembly                                                       */
/* ------------------------------------------------------------------ */
const partials = {
  head: read("src/partials/head.html"),
  header: read("src/partials/header.html"),
  footer: read("src/partials/footer.html"),
};

const priceDisplay = config.PRICE ? config.PRICE : "See current price on Gumroad";
const priceBlock = config.PRICE
  ? `<p class="text-56 font-semibold tracking-tight text-ink">${esc(priceDisplay)}</p>`
  : `<p class="text-28 font-semibold tracking-tight text-ink">${esc(priceDisplay)}</p>`;

function buildPage(route) {
  const meta = seo[route.id];
  const depth = depthPrefix(route.out);
  const ogImage =
    route.id === "product-launch-kit"
      ? `${SITE}/assets/images/og-launch-kit.png`
      : `${SITE}/assets/images/og-default.png`;

  let html = read(route.src);
  html = html.replaceAll("{{> head }}", partials.head);
  html = html.replaceAll("{{> header }}", partials.header);
  html = html.replaceAll("{{> footer }}", partials.footer);

  const tokens = {
    META_TITLE: meta.title,
    META_DESC: meta.description,
    CANONICAL: SITE + meta.path,
    OG_TYPE: meta.ogType,
    OG_IMAGE: ogImage,
    SITE_NAME: config.siteName,
    SITE_TAGLINE: config.siteTagline,
    GUMROAD_URL: config.GUMROAD_LAUNCH_KIT_URL,
    PRICE_DISPLAY: priceDisplay,
    PRICE_BLOCK: priceBlock,
    PRODUCT_STATUS: config.PRODUCT_STATUS,
    PRODUCTS_LIST: productsListHTML(),
    PROJECTS_LIST: listOrEmpty(projectList, "projects", "projects-list"),
    ARTICLES_LIST: listOrEmpty(articleList, "articles", "articles-list"),
    FAQ_LIST: faqListHTML(),
    CONTACT_ROWS: contactRowsHTML(),
    JSONLD: jsonLd(route.id, meta),
  };

  html = html.replace(/\{\{([A-Z_0-9]+)\}\}/g, (_, key) => tokens[key] ?? "");
  /* @root must resolve after token injection (e.g. product cards). */
  html = html.replaceAll("@root/", depth);
  write(`${DIST}/${route.out === "" ? "" : route.out + "/"}${route.file}`, html);
}

/* ------------------------------------------------------------------ */
/* Static files                                                        */
/* ------------------------------------------------------------------ */
function buildStatic() {
  const manifest = read("src/static/site.webmanifest")
    .replaceAll("{{SITE_URL}}", SITE)
    .replaceAll("{{BASE_PATH}}", new URL(SITE).pathname);
  write("dist/site.webmanifest", manifest);
  write("dist/robots.txt", read("src/static/robots.txt").replaceAll("{{SITE_URL}}", SITE));
  write("dist/.nojekyll", "");

  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter((r) => r.id !== "notFound")
    .map((r) => `  <url><loc>${SITE}${seo[r.id].path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  write(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

/* ------------------------------------------------------------------ */
/* Copy the rest                                                       */
/* ------------------------------------------------------------------ */
function copyAssets() {
  cpSync(join(ROOT, "assets"), join(DIST, "assets"), { recursive: true });
  cpSync(join(ROOT, "data"), join(DIST, "data"), { recursive: true });
  /* Custom-domain CNAME, if the owner adds one in the repo root. */
  try {
    cpSync(join(ROOT, "CNAME"), join(DIST, "CNAME"));
  } catch {
    /* no CNAME configured */
  }
  for (const f of ["favicon.svg", "favicon-32.png", "apple-touch-icon.png", "site.webmanifest", "robots.txt"]) {
    if (f === "site.webmanifest" || f === "robots.txt") continue;
    const src = join(ROOT, f);
    try {
      cpSync(src, join(DIST, f));
    } catch {
      /* generated by scripts/generate-images.mjs before build */
    }
  }
}

/* ------------------------------------------------------------------ */
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
routes.forEach(buildPage);
buildStatic();
copyAssets();
console.log(`Built ${routes.length} pages → dist/`);
