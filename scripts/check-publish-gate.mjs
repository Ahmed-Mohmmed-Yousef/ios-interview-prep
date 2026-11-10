// The publish gate: a topic may be published only when this passes (decided 2026-11-10, after a spot check
// found wrong facts and untaught exam questions in published topics).
// Passes when:
//   1. scripts/check-coverage.mjs has no errors and no "possibly untaught" warnings for the topic
//      (false positives are accepted by name in audit.json → coverageAccepted)
//   2. docs/topics/<id>/audit.json exists and says the independent fact check passed:
//        result "pass", every open count 0, date not older than lastVerified in topic.json, lesson and questions.json
//   3. with --code: scripts/run-swift-examples.mjs passes on lesson.mdx and questions.json (slow; needs swiftc)
// Usage: node scripts/check-publish-gate.mjs <topic-id> [...] | published  [--code]
// `published` checks every published topic that is not in docs/audit/legacy-unaudited.json.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const topicsDir = join(root, "content/topics");
const args = process.argv.slice(2);
const runCode = args.includes("--code");
let ids = args.filter((a) => !a.startsWith("--"));
if (ids.length === 0) { console.error("Usage: node scripts/check-publish-gate.mjs <topic-id> [...] | published [--code]"); process.exit(2); }

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const legacyPath = join(root, "docs/audit/legacy-unaudited.json");
const legacy = new Set(existsSync(legacyPath) ? readJson(legacyPath).topics : []);
if (ids.includes("published")) {
  ids = readdirSync(topicsDir).filter((d) => {
    const t = join(topicsDir, d, "topic.json");
    return existsSync(t) && readJson(t).status === "published" && !legacy.has(d);
  }).sort();
}

const OPEN_KEYS = ["wrong", "outdated", "untaught", "unverified", "copied", "hardEnglish"];
let failedTopics = 0;

for (const id of ids) {
  const problems = [];
  const dir = join(topicsDir, id);
  if (!existsSync(join(dir, "topic.json"))) { console.log(`FAIL ${id}: no such topic`); failedTopics++; continue; }
  const topic = readJson(join(dir, "topic.json"));

  // 1. coverage
  let cov = "";
  try {
    cov = execFileSync("node", [join(root, "scripts/check-coverage.mjs"), id], { encoding: "utf8" });
  } catch (e) {
    cov = String(e.stdout ?? "");
  }
  for (const line of cov.split("\n")) {
    if (/^\s+error\s/.test(line) || /^\s+warn\s.*possibly untaught/.test(line)) problems.push(`coverage: ${line.trim().replace(/^(error|warn)\s+/, "")}`);
  }

  // 2. independent fact check
  const auditPath = join(root, "docs/topics", id, "audit.json");
  if (!existsSync(auditPath)) problems.push("no docs/topics/<id>/audit.json: run the independent fact check (content-fact-checker in fix mode)");
  else {
    const audit = readJson(auditPath);
    if (audit.result !== "pass") problems.push(`audit.json result is "${audit.result}", not "pass"`);
    if (audit.independent !== true) problems.push("audit.json: the fact check must be independent (a fresh agent, not the one that wrote the topic)");
    for (const k of OPEN_KEYS) if ((audit.open?.[k] ?? 0) !== 0) problems.push(`audit.json: ${audit.open[k]} open "${k}" findings`);
    const lesson = existsSync(join(dir, "lesson.mdx")) ? readFileSync(join(dir, "lesson.mdx"), "utf8") : "";
    const bank = existsSync(join(dir, "questions.json")) ? readJson(join(dir, "questions.json")) : {};
    const dates = [topic.lastVerified, lesson.match(/lastVerified:\s*"([\d-]+)"/)?.[1], bank.lastVerified].filter(Boolean);
    const newest = dates.sort().at(-1);
    if (!audit.date || (newest && audit.date < newest)) problems.push(`audit.json date ${audit.date ?? "none"} is older than the content (lastVerified ${newest}): check again after changes`);
    if (new Set(dates).size > 1) problems.push(`lastVerified differs between topic.json, lesson and questions.json (${dates.join(", ")})`);
  }

  // 3. code
  if (runCode) {
    for (const f of ["lesson.mdx", "questions.json"]) {
      try {
        execFileSync("node", [join(root, "scripts/run-swift-examples.mjs"), join(dir, f)], { encoding: "utf8", stdio: "pipe" });
      } catch (e) {
        const fails = String(e.stdout ?? "").split("\n").filter((l) => l.startsWith("FAIL")).slice(0, 5);
        problems.push(`code: ${f} fails\n      ${fails.join("\n      ")}`);
      }
    }
  }

  if (problems.length) {
    failedTopics++;
    console.log(`FAIL ${id} (${topic.status})`);
    for (const p of problems) console.log(`  - ${p}`);
  } else console.log(`ok   ${id}`);
}

if (ids.length > 1) console.log(`\n${ids.length} topics: ${failedTopics} fail the publish gate.`);
process.exit(failedTopics ? 1 : 0);
