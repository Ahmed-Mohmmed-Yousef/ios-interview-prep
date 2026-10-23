// Checks config/brand.json (the ONLY place the app name and brand colors live) and makes sure
// app code never hard-codes the name. Rules: docs/brand/brand.md.
// Usage: node scripts/check-brand.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const problems = [];
const brand = JSON.parse(readFileSync("config/brand.json", "utf8"));

for (const key of ["name", "shortName", "tagline", "direction"]) if (!brand[key]) problems.push(`brand.json: missing ${key}`);

// Apple's trademark guidelines: no Apple trademarks in the product name.
const appleMarks = ["ios", "swift", "swiftui", "xcode", "iphone", "ipad", "apple", "testflight", "wwdc"];
for (const word of brand.name.toLowerCase().split(/[^a-z]+/)) {
  if (appleMarks.includes(word)) problems.push(`brand.json: the name may not contain the Apple trademark "${word}"`);
}

// WCAG AA: text and button colors must have at least 4.5:1 contrast.
const lum = (hex) => hex.match(/\w\w/g).map((x) => parseInt(x, 16) / 255)
  .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
for (const mode of ["light", "dark"]) {
  const c = brand.colors?.[mode];
  if (!c) { problems.push(`brand.json: missing colors.${mode}`); continue; }
  for (const [fg, bg] of [["ink", "bg"], ["ink", "surface"], ["muted", "surface"], ["onPrimary", "primary"], ["primary", "surface"]]) {
    const r = ratio(c[fg], c[bg]);
    if (r < 4.5) problems.push(`brand.json: ${mode} ${fg} on ${bg} is ${r.toFixed(2)}:1, below WCAG AA 4.5:1`);
  }
}

// App code must read the name from config/brand.json, never write it by hand.
const codeDirs = ["src", "app", "components", "lib", "prototype"].filter(existsSync);
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  if (f === "node_modules" || f.startsWith(".")) return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});
for (const file of codeDirs.flatMap(walk).filter((f) => /\.(ts|tsx|js|jsx|mjs|css|html|mdx)$/.test(f))) {
  if (readFileSync(file, "utf8").includes(brand.name)) problems.push(`${file}: hard-codes the app name "${brand.name}" — read it from config/brand.json`);
}

if (problems.length) { console.log(problems.join("\n")); process.exit(1); }
console.log(`OK: brand "${brand.name}" (${brand.direction}); no hard-coded names in ${codeDirs.join(", ") || "app code"}`);
