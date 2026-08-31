/*
 * Minimal site JavaScript — three things and nothing more:
 *   1. mobile menu state
 *   2. FAQ accordion (product page)
 *   3. demo CTA enabled/disabled from central config
 *
 * No animation libraries, no trackers, no framework.
 */
import { config } from "../../data/config.js";

const $ = (selector, scope = document) => scope.querySelector(selector);

/* 1. Mobile menu ------------------------------------------------------ */
const menuToggle = $("#menu-toggle");
const mobileMenu = $("#mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
    menuToggle.textContent = open ? "Menu" : "Close";
  });
}

/* 2. Active nav state --------------------------------------------------- */
/* Product pages sit under the Products nav entry. */
const navTarget = { "product-launch-kit": "products" };
const page = navTarget[document.body.dataset.page] || document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) {
    link.setAttribute("aria-current", "page");
  }
});

/* 3. Footer year -------------------------------------------------------- */
const year = $("#footer-year");
if (year) year.textContent = String(new Date().getFullYear());

/* 4. FAQ accordion -------------------------------------------------------- */
document.querySelectorAll("[data-faq]").forEach((button) => {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  if (!panel) return;

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

/* 5. Demo CTA — no fake links -------------------------------------------- */
const demoUrl = config.LAUNCH_KIT_DEMO_URL && config.LAUNCH_KIT_DEMO_URL.trim();
document.querySelectorAll("[data-demo-cta]").forEach((link) => {
  if (demoUrl) {
    link.href = demoUrl;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-disabled");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Open the live demo";
  } else {
    link.addEventListener("click", (event) => event.preventDefault());
  }
});
