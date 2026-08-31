/*
 * Central configuration — every editable value lives here.
 * Templates pull from this file at build time; the browser imports the
 * same file for the few runtime behaviors (demo URL state, year, etc.).
 *
 * No values are invented. Anything not yet known stays empty and the
 * pages render an honest "pending" state instead of a fake one.
 */

export const config = {
  siteName: "Digital Khan",
  siteTagline: "Software Developer · Product Builder",

  /* Full canonical origin, including base path. */
  SITE_URL: "https://zanoidintelinspirefaizan.github.io/digitalkhan",

  /*
   * Launch Kit.
   * Set LAUNCH_KIT_DEMO_URL to a real URL to enable the demo CTA.
   * (placeholder: DEMO_URL_PLACEHOLDER)
   */
  GUMROAD_LAUNCH_KIT_URL: "https://pathan0faizan.gumroad.com/l/LaunchKitforLaravel",
  LAUNCH_KIT_DEMO_URL: "",

  /* Contact — leave empty to show the "pending" state. */
  CONTACT_EMAIL: "",
  GITHUB_URL: "",

  /* Product pricing — leave empty to defer price display to Gumroad. */
  PRICE: "",

  PRODUCT_STATUS: "Available",
};
