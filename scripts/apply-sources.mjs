// HISTORY ONLY — step 1.7 (2026-10-22): writes checked sources into each topic.json.
// Takes up to 3 working sources per topic, in the order listed in scripts/data/sources-1.7.mjs.
// Community sources go only into the units where the user allowed them; other community sources
// are printed under "needsDecision" and not written.
// Usage: node scripts/apply-sources.mjs <results.json> [--dry-run]
import { readFileSync, writeFileSync } from "node:fs";
import { candidates } from "./data/sources-1.7.mjs";
const policy = JSON.parse(readFileSync("content/rules.json", "utf8")).sources;
const { officialHosts, officialRepoPrefixes } = policy;

const results = JSON.parse(readFileSync(process.argv[2], "utf8"));
const dry = process.argv.includes("--dry-run");
const units = JSON.parse(readFileSync("content/units.json", "utf8")).units;
const unitOf = {};
for (const u of units) for (const id of [...u.topics, ...(u.bonus ?? []).map((b) => b.topic)]) unitOf[id] = u.id;

const isOfficial = (url) =>
  officialHosts.includes(new URL(url).host) || officialRepoPrefixes.some((p) => url.startsWith(p));

const OVERRIDES = {
  "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html": "The Clean Architecture (Clean Coder Blog)",
  "https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html": "Solid Relevance (Clean Coder Blog)",
  "https://google.github.io/eng-practices/review/": "Google Engineering Practices: Code Review",
  "https://github.com/swiftlang/swift-evolution/blob/main/proposals/0390-noncopyable-structs-and-enums.md": "SE-0390: Noncopyable structs and enums",
  "https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst": "Swift Optimization Tips (swiftlang/swift)",
  "https://docs.swift.org/latest/documentation/packagemanagerdocs/": "Swift Package Manager (Swift.org)",
  "https://www.swift.org/migration/documentation/migrationguide/": "Migrating to Swift 6 (Swift.org)",
  "https://lldb.llvm.org/use/tutorial.html": "LLDB Tutorial (LLVM)",
};

function title(r) {
  const url = r.finalUrl ?? r.url;
  if (OVERRIDES[r.url]) return OVERRIDES[r.url];
  const t = r.title.replace(/\s+/g, " ").trim();
  let m;
  if (url.startsWith("https://docs.swift.org/swift-book/")) return `The Swift Programming Language: ${t}`;
  if ((m = t.match(/^(.*) - (WWDC\d\d) - Videos - Apple Developer$/))) return `${m[2]}: ${m[1]}`;
  if (url.includes("/design/human-interface-guidelines/")) return `Human Interface Guidelines: ${t}`;
  if ((m = url.match(/dropbox\.github\.io\/dbx-career-framework\/(ic\d)_(.+)\.html/))) {
    const role = m[2].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `Dropbox Career Framework: ${m[1].toUpperCase()} ${role}`;
  }
  if ((m = t.match(/^GitHub - ([^:]+?)(:.*)? · GitHub$/))) return `${m[1]} (GitHub)`;
  if (url.startsWith("https://developer.apple.com/documentation/")) {
    const module = r.module ?? (url.includes("/documentation/xcode/") ? "Xcode" : null);
    return module && module !== t ? `${t} (${module})` : t;
  }
  return t;
}

const needsDecision = [];
const empty = [];
const counts = { official: 0, community: 0 };
for (const [id, urls] of Object.entries(candidates)) {
  const allowCommunity = policy.communityAllowed.units.includes(unitOf[id]) || policy.communityAllowed.topics.includes(id);
  const seen = new Set();
  const sources = [];
  for (const u of urls) {
    const r = results[u];
    if (!r?.ok) continue;
    const url = r.finalUrl ?? u;
    if (seen.has(url)) continue;
    seen.add(url);
    const kind = isOfficial(url) ? "official" : "community";
    if (kind === "community" && !allowCommunity) {
      needsDecision.push({ topic: id, unit: unitOf[id], url, title: title(r) });
      continue;
    }
    if (sources.length < 3) sources.push({ title: title(r), url, kind });
  }
  if (!sources.length) empty.push(id);
  for (const s of sources) counts[s.kind]++;
  if (!dry) {
    const path = `content/topics/${id}/topic.json`;
    const t = JSON.parse(readFileSync(path, "utf8"));
    t.sources = sources;
    t.lastVerified = "2026-10-22";
    writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
  }
}
console.log(JSON.stringify({ counts, empty, needsDecision }, null, 2));
