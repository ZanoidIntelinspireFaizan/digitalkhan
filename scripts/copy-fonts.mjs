/*
 * Copies the latin woff2 subsets (normal + italic) of Geist and
 * JetBrains Mono from @fontsource into assets/fonts/, and the same into
 * dist/ so the compiled site is self-contained.
 */
import { cpSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const files = [
  ["@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", "geist-latin-wght-normal.woff2"],
  ["@fontsource-variable/geist/files/geist-latin-wght-italic.woff2", "geist-latin-wght-italic.woff2"],
  ["@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", "jetbrains-mono-latin-wght-normal.woff2"],
  ["@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-italic.woff2", "jetbrains-mono-latin-wght-italic.woff2"],
];

mkdirSync(join(ROOT, "assets/fonts"), { recursive: true });

for (const [source, target] of files) {
  const src = join(ROOT, "node_modules", source);
  if (!existsSync(src)) {
    console.warn(`skip (not found): ${source}`);
    continue;
  }
  cpSync(src, join(ROOT, "assets/fonts", target));
}

console.log("Fonts copied → assets/fonts/");
