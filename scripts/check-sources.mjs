// HISTORY ONLY — step 1.7 (2026-10-22): checks every candidate URL in scripts/data/sources-1.7.mjs
// and saves the results (status + real page title) to the path given as the first argument.
// Usage: node scripts/check-sources.mjs <results.json>
import { writeFileSync } from "node:fs";
import { candidates } from "./data/sources-1.7.mjs";

const out = process.argv[2];
const urls = [...new Set(Object.values(candidates).flat())];

// Apple and Swift docs are JavaScript pages; their JSON data endpoint gives a real 404 and the title.
function dataUrl(u) {
  // Swift DocC sites: docs.swift.org/<book>/documentation/... and www.swift.org/migration/documentation/...
  const docc = u.match(/^(https:\/\/(?:docs\.swift\.org\/[^/]+|www\.swift\.org\/migration))\/documentation\/(.+?)\/?$/);
  if (docc) return `${docc[1]}/data/documentation/${docc[2]}.json`;
  const m = u.match(/^https:\/\/developer\.apple\.com\/(documentation|design\/human-interface-guidelines)\/(.+)$/);
  if (m) return `https://developer.apple.com/tutorials/data/${m[1]}/${m[2]}.json`.replace(/[()]/g, encodeURIComponent);
  return null;
}

async function check(u) {
  const api = dataUrl(u);
  try {
    const res = await fetch(api ?? u, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (source check)" } });
    const body = await res.text();
    let title = null, module = null;
    if (api && res.ok) {
      const j = JSON.parse(body);
      title = j.metadata?.title ?? null;
      module = j.metadata?.modules?.[0]?.name ?? null;
    } else if (res.ok) {
      title = body.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
    }
    // Pages that load but show a generic title (a removed video, a redirect stub) do not count.
    const generic = /^(WWDC\d\d - Videos - Apple Developer|Redirecting|Apple Developer Documentation)/;
    const finalUrl = api ? u : res.url;
    return { url: u, finalUrl, status: res.status, ok: res.ok && !!title && !generic.test(title), title, module };
  } catch (e) {
    return { url: u, status: 0, ok: false, error: String(e) };
  }
}

const results = {};
const queue = [...urls];
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const u = queue.shift();
    results[u] = await check(u);
  }
}));
writeFileSync(out, JSON.stringify(results, null, 2));
const bad = Object.values(results).filter((r) => !r.ok);
console.log(`${urls.length} urls, ${urls.length - bad.length} ok, ${bad.length} failed`);
for (const r of bad) console.log(`FAIL ${r.status} ${r.url}`);
