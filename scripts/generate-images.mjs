/*
 * Generates the flat, monochrome brand images with ImageMagick:
 *   - favicon-32.png / apple-touch-icon.png (DK mark)
 *   - assets/images/og-default.png       (site-wide social card)
 *   - assets/images/og-launch-kit.png    (Launch Kit social card)
 *
 * No stock photos, no AI art, no gradients — just type on a dark panel,
 * which is exactly how the site looks anyway.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMG = join(ROOT, "assets/images");
mkdirSync(IMG, { recursive: true });

const run = (args) => execFileSync("convert", args, { stdio: "inherit" });
const SANS = "DejaVu-Sans-Bold";
const MONO = "DejaVu-Sans-Mono";

/* Favicon: "k" glyph + solid cursor block (site-wide ink-blue). */
function favicon(size, out) {
  const scale = size / 64;
  const fs = Math.round(34 * scale);
  run([
    "-size", `${size}x${size}`, "xc:#111113",
    "-font", MONO, "-pointsize", fs, "-fill", "#FAFAF8",
    "-gravity", "center", "-annotate", `+0+${Math.round(6 * scale)}`, "k",
    "-fill", "#27496D",
    "-draw", `rectangle ${Math.round(33 * scale)},${Math.round(26 * scale)} ${Math.round(41 * scale)},${Math.round(42 * scale)}`,
    out,
  ]);
}

favicon(32, join(ROOT, "favicon-32.png"));
favicon(180, join(ROOT, "apple-touch-icon.png"));

/* Generic site og card. */
run([
  "-size", "1200x630", "xc:#111113",
  "-fill", "#27496D",
  "-draw", "rectangle 0,0 12,630",
  "-font", MONO, "-pointsize", "26", "-fill", "#7C7C76",
  "-gravity", "NorthWest", "-annotate", "+104+150", "SOFTWARE DEVELOPER  \u00b7  PRODUCT BUILDER",
  "-font", SANS, "-pointsize", "76", "-fill", "#FAFAF8",
  "-annotate", "+104+210", "Digital Khan",
  "-font", MONO, "-pointsize", "24", "-fill", "#8FB8E8",
  "-annotate", "+104+320", "https://github.com/ZanoidIntelinspireFaizan",
  join(IMG, "og-default.png"),
]);

/* Launch Kit og card — red accent scoped to the product. */
run([
  "-size", "1200x630", "xc:#111113",
  "-fill", "#FF2D20",
  "-draw", "rectangle 0,0 12,630",
  "-font", MONO, "-pointsize", "26", "-fill", "#E07064",
  "-gravity", "NorthWest", "-annotate", "+104+150", "LAUNCH KIT FOR LARAVEL",
  "-font", SANS, "-pointsize", "68", "-fill", "#FAFAF8",
  "-annotate", "+104+210", "Launch Real Projects.",
  "-font", SANS, "-pointsize", "68", "-fill", "#FAFAF8",
  "-annotate", "+104+296", "Not Boilerplate.",
  "-font", MONO, "-pointsize", "24", "-fill", "#8FB8E8",
  "-annotate", "+104+400", "production-ready Laravel starter kit",
  join(IMG, "og-launch-kit.png"),
]);

console.log("Images generated → assets/images/ + root favicons");
