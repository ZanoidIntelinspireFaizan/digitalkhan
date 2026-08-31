/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./assets/js/**/*.js"],
  theme: {
    /*
     * Digital Khan design system.
     * Two-tier color system: site-wide neutrals + one ink-blue accent.
     * Laravel red is scoped to Launch Kit surfaces only (defined here so
     * it is never re-invented, but only used in product templates).
     */
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      ink: "#111113",
      panel: "#161619",
      panelLine: "#26262A",
      paper: "#FAFAF8",
      muted: "#6B6B66",
      line: "#E5E3DC",
      accent: "#27496D",
      "accent-deep": "#1D3957",
      red: {
        500: "#FF2D20", // Laravel red — product accents only
        600: "#C81E12", // accessible red for links/buttons
      },
    },

    /*
     * 8pt spacing system — every spacing utility is a multiple of 8px
     * (plus a single 4px half-step for hairlines and icon gaps).
     */
    spacing: {
      0: "0",
      px: "1px",
      0.5: "4px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      11: "88px",
      12: "96px",
      14: "112px",
      16: "128px",
      20: "160px",
      24: "192px",
      28: "224px",
      32: "256px",
    },

    /* Real type scale: 14 / 16 / 20 / 28 / 40 / 56 */
    fontSize: {
      "14": ["0.875rem", { lineHeight: "1.5" }],
      "16": ["1rem", { lineHeight: "1.6" }],
      "20": ["1.25rem", { lineHeight: "1.5" }],
      "28": ["1.75rem", { lineHeight: "1.3" }],
      "40": ["2.5rem", { lineHeight: "1.15" }],
      "56": ["3.5rem", { lineHeight: "1.1" }],
    },

    fontFamily: {
      sans: [
        '"Geist Variable"',
        "Geist",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "sans-serif",
      ],
      mono: [
        '"JetBrains Mono Variable"',
        "JetBrains Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "monospace",
      ],
    },

    /* Max content width ~1200px, centered, breathes on small screens. */
    container: {
      center: true,
      padding: "24px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },

    /* Restrained corners only — no pill/rounded-card look. */
    borderRadius: {
      none: "0",
      sm: "4px",
      md: "6px",
      full: "9999px",
    },

    extend: {},
  },
  plugins: [],
};
