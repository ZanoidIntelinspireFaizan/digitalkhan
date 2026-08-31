/*
 * Per-page SEO, AEO and social metadata — one central object, no
 * scattered <title>/<meta> tags in the markup.
 *
 * Entity naming is consistent everywhere: "Launch Kit for Laravel".
 */

export const seo = {
  home: {
    title: "Digital Khan — Software Developer & Product Builder",
    description:
      "Independent software developer building small, focused tools for developers. Creator of Launch Kit for Laravel, a production-ready Laravel starter kit.",
    path: "/",
    ogType: "website",
  },
  about: {
    title: "About — Digital Khan",
    description:
      "Digital Khan is a software developer and product builder. Practical software, real problems, reusable systems — no agency, no noise.",
    path: "/about/",
    ogType: "website",
  },
  products: {
    title: "Software Products — Digital Khan",
    description:
      "Software products built and maintained by Digital Khan. Current product: Launch Kit for Laravel — a production-ready Laravel starter kit.",
    path: "/products/",
    ogType: "website",
  },
  "product-launch-kit": {
    title:
      "Launch Kit for Laravel — Production-Ready Laravel Starter Kit | Digital Khan",
    description:
      "Launch Kit for Laravel is a production-ready Laravel starter kit with authentication, user management, roles & permissions, admin dashboard, CMS and common modules. Launch real projects, not boilerplate.",
    path: "/products/launch-kit-for-laravel/",
    ogType: "product",
  },
  projects: {
    title: "Projects — Digital Khan",
    description:
      "Selected projects and work by Digital Khan. Nothing here is invented — projects appear as they ship.",
    path: "/projects/",
    ogType: "website",
  },
  articles: {
    title: "Articles — Digital Khan",
    description:
      "Technical articles on Laravel, PHP, architecture and developer tooling by Digital Khan. New writing is added as it's published.",
    path: "/articles/",
    ogType: "website",
  },
  contact: {
    title: "Contact — Digital Khan",
    description:
      "Get in touch with Digital Khan. Contact options are verified before they're listed — nothing invented.",
    path: "/contact/",
    ogType: "website",
  },
  notFound: {
    title: "Page not found — Digital Khan",
    description: "That page does not exist. Head back to the home page.",
    path: "/404.html",
    ogType: "website",
  },
};
