// Checks that a topic's exam matches its lesson and the question-bank rules (.claude/rules/questions.md).
// Errors (exit 1):
//   - lessonSection is not a real "## " heading of the lesson, or points at "Go deeper"
//   - a written prompt asks for a sentence range other than 2–5
//   - a question has no lessonSection
// Warnings (printed, exit 0 unless --strict):
//   - possibly untaught: a `code term` or Swift keyword in a question that never appears in the lesson's
//     taught text (everything except the meta export and <DeepDive> blocks). A person or the fact checker
//     confirms each one: teach it, change the question, or accept it in docs/topics/<id>/audit.json
//     ("coverageAccepted": ["term", ...]) when it is a false positive.
//   - type or difficulty mix far from the targets
//   - lastVerified differs between topic.json, lesson meta and questions.json
// Usage: node scripts/check-coverage.mjs <topic-id> [...] | all  [--strict] [--quiet]
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const topicsDir = join(root, "content/topics");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const quiet = args.includes("--quiet");
let ids = args.filter((a) => !a.startsWith("--"));
if (ids.length === 0) { console.error("Usage: node scripts/check-coverage.mjs <topic-id> [...] | all [--strict] [--quiet]"); process.exit(2); }
if (ids.includes("all")) ids = readdirSync(topicsDir).filter((d) => existsSync(join(topicsDir, d, "questions.json"))).sort();

// Swift words that often show up in questions about ideas a lesson forgot to teach.
const KEYWORDS = [
  "continue", "break", "fallthrough", "defer", "guard", "inout", "mutating", "nonmutating", "convenience",
  "required", "static", "lazy", "weak", "unowned", "throws", "rethrows", "try?", "try!", "async", "await",
  "actor", "nonisolated", "isolated", "Sendable", "sending", "consuming", "borrowing", "some", "any", "where",
  "typealias", "associatedtype", "indirect", "final", "override", "subscript", "deinit", "willSet", "didSet",
  "open", "fileprivate", "private", "package", "internal", "@escaping", "@autoclosure", "@discardableResult",
  "@MainActor", "@Observable", "@State", "@Binding", "@Bindable", "@Environment", "@StateObject",
  "@ObservedObject", "@Published", "@frozen", "@unknown", "@available", "#available", "Result", "get()",
  "repeat", "while", "switch", "case let", "if let", "guard let", "init?", "init!", "class func", "class var",
];

const PCT_TYPES = { mcq: 50, "code-reading": 25, written: 15, "code-write": 10 };
const PCT_DIFF = { 1: 40, 2: 40, 3: 20 };
const MIX_TOLERANCE = 15; // percentage points

const norm = (s) => s.replace(/\s+/g, " ").trim();

function taughtText(mdx) {
  return mdx
    .replace(/^export const meta = \{[\s\S]*?^\}\s*$/m, "")
    .replace(/<DeepDive[\s\S]*?<\/DeepDive>/g, "");
}

function hasWord(text, term) {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const startsWord = /^\w/.test(term), endsWord = /\w$/.test(term);
  return new RegExp(`${startsWord ? "(?<![\\w@#])" : ""}${esc}${endsWord ? "(?!\\w)" : ""}`).test(text);
}

function codeTerms(s) {
  const prose = String(s ?? "").replace(/```[\s\S]*?```/g, " ");
  return [...prose.matchAll(/`([^`\n]{1,40})`/g)].map((m) => norm(m[1]))
    .filter((t) => t.length > 1 && !/^[\d\s.,"'+\-*/=<>()]+$/.test(t) && !/^[.,;:]|\. /.test(t));
}

// The part of a code term to look for in the lesson: `DispatchQueue.global(qos:)` -> `DispatchQueue.global`.
const lookupForm = (t) => t.replace(/\(.*$/, "").replace(/^\./, "") || t;

// Code-like text only: fenced blocks, inline `code`, and "the X statement/keyword" phrases.
// Plain English words such as "any", "while" or "final" in prose never count.
function codeText(s) {
  s = String(s ?? "");
  const fenced = [...s.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1]);
  const inline = [...s.matchAll(/`([^`\n]+)`/g)].map((m) => m[1]);
  const named = [...s.matchAll(/\b(?:the\s+)?([@#]?\w+[?!]?)\s+(?:statement|keyword|modifier|clause|attribute|macro)s?\b/gi)].map((m) => m[1]);
  return [...fenced, ...inline, ...named].join("\n");
}

// Syntax ideas a question can use without naming them. inQ runs on question code, inLesson on lesson code + text.
const CONCEPTS = [
  { name: "labeled statement", inQ: /^\s*\w+:\s*(for|while|repeat)\b|\b(break|continue)\s+\w+\s*$|labeled statement/m, inLesson: /^\s*\w+:\s*(for|while|repeat)\b|labell?ed (statement|loop)|statement label/im },
  { name: "range pattern in a case", inQ: /case\s+[^:\n]*(\.\.\.|\.\.<)/, inLesson: /case\s+[^:\n]*(\.\.\.|\.\.<)|range/i },
  { name: "compound case (case a, b:)", inQ: /case\s+[^:\n(]+,[^:\n]+:|compound case/i, inLesson: /case\s+[^:\n(]+,[^:\n]+:|compound case|several values|multiple values/i },
  { name: "where clause", inQ: /\bwhere\b/, inLesson: /\bwhere\b/ },
  { name: "defer", inQ: /\bdefer\b/, inLesson: /\bdefer\b/ },
  { name: "typed throws", inQ: /throws\s*\(/, inLesson: /throws\s*\(/ },
  { name: "if/switch expression", inQ: /=\s*(if|switch)\b/, inLesson: /=\s*(if|switch)\b|as an expression|expressions/i },
];

let errorCount = 0, warnCount = 0;
const summary = [];

for (const id of ids) {
  const dir = join(topicsDir, id);
  const lessonPath = join(dir, "lesson.mdx"), qPath = join(dir, "questions.json"), tPath = join(dir, "topic.json");
  if (!existsSync(lessonPath) || !existsSync(qPath)) { if (!quiet) console.log(`skip ${id}: no lesson.mdx or questions.json`); continue; }
  const lesson = readFileSync(lessonPath, "utf8");
  const bank = JSON.parse(readFileSync(qPath, "utf8"));
  const topic = existsSync(tPath) ? JSON.parse(readFileSync(tPath, "utf8")) : {};
  const auditPath = join(root, "docs/topics", id, "audit.json");
  const accepted = new Set(existsSync(auditPath) ? JSON.parse(readFileSync(auditPath, "utf8")).coverageAccepted ?? [] : []);

  const headings = [...lesson.matchAll(/^## (.+)$/gm)].map((m) => norm(m[1]));
  // Taught text = this lesson plus the lessons of all its prerequisites (learners have passed those).
  const prereqLessons = [];
  const seen = new Set([id]);
  const queue = [...(topic.prerequisites ?? [])];
  while (queue.length) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    const pl = join(topicsDir, p, "lesson.mdx"), pt = join(topicsDir, p, "topic.json");
    if (existsSync(pl)) prereqLessons.push(readFileSync(pl, "utf8"));
    if (existsSync(pt)) queue.push(...(JSON.parse(readFileSync(pt, "utf8")).prerequisites ?? []));
  }
  const taught = [lesson, ...prereqLessons].map(taughtText).join("\n");
  const taughtCode = codeText(taught);
  const errors = [], warnings = [];
  const live = (bank.questions ?? []).filter((q) => !q.retired);

  for (const q of live) {
    // 1. lessonSection points at a real, tested heading
    if (!q.lessonSection) errors.push(`${q.id}: no lessonSection`);
    else if (/go deeper/i.test(q.lessonSection)) errors.push(`${q.id}: tests "Go deeper", which is never tested`);
    else if (!headings.includes(norm(q.lessonSection))) errors.push(`${q.id}: lessonSection "${q.lessonSection}" is not a lesson heading (${headings.join(" | ")})`);

    // 2. written prompts ask for 2–5 sentences
    if (q.type === "written") {
      const m = q.prompt.match(/(\d+)\s*(?:–|-|to)\s*(\d+)\s*sentences/i);
      if (m && !(m[1] === "2" && m[2] === "5")) errors.push(`${q.id}: asks for ${m[1]}–${m[2]} sentences; the rule is 2–5`);
    }

    // 3. possibly untaught ideas
    const right = (q.options ?? []).find((o) => o.id === q.answer);
    const keyCriteria = (q.rubric ?? []).filter((r) => r.key).map((r) => r.criterion).join(" ");
    const asked = [q.prompt, right?.text, right?.explanation, keyCriteria].filter(Boolean).join("\n");
    const askedCode = [codeText(asked), q.code, q.type === "code-write" ? q.modelAnswer : ""].filter(Boolean).join("\n");
    // Names a question defines itself (types and functions the learner must write) are not lesson ideas.
    const ownCode = [q.code, q.starterCode, q.modelAnswer].filter(Boolean).join("\n");
    const defined = new Set([...ownCode.matchAll(/\b(?:class|struct|enum|actor|protocol|func|let|var|case)\s+(\w+)/g)].map((m) => m[1]));
    const missingTerms = q.type === "code-write" ? [] : codeTerms(asked).filter((t) => {
      const form = lookupForm(t), head = form.match(/^\w+/)?.[0];
      return !(head && defined.has(head)) && !taught.includes(form) && !hasWord(taught, form);
    });
    const terms = new Set(missingTerms);
    // Plain-word keywords count only in code; distinctive ones ("class func", "get()", "@State") count in prose too.
    for (const k of KEYWORDS) {
      const distinctive = /[^A-Za-z]/.test(k);
      if ((hasWord(askedCode, k) || (distinctive && hasWord(asked, k))) && !hasWord(taughtCode, k) && !(distinctive && hasWord(taught, k))) terms.add(k);
    }
    for (const c of CONCEPTS) if (c.inQ.test(askedCode) || (c.name.includes(" ") && asked.toLowerCase().includes(c.name))) {
      if (!c.inLesson.test(taughtCode) && !c.inLesson.test(taught)) terms.add(c.name);
    }
    const missing = [...terms].filter((t) => !accepted.has(t));
    if (missing.length) warnings.push(`${q.id}: possibly untaught: ${missing.map((t) => `\`${t}\``).join(", ")}`);
  }

  // 4. mix
  const n = live.length || 1;
  const pct = (count) => Math.round((100 * count) / n);
  for (const [type, target] of Object.entries(PCT_TYPES)) {
    const p = pct(live.filter((q) => q.type === type).length);
    if (Math.abs(p - target) > MIX_TOLERANCE) warnings.push(`mix: ${type} is ${p}% (target about ${target}%)`);
  }
  for (const [d, target] of Object.entries(PCT_DIFF)) {
    const p = pct(live.filter((q) => String(q.difficulty) === d).length);
    if (Math.abs(p - target) > MIX_TOLERANCE) warnings.push(`mix: difficulty ${d} is ${p}% (target about ${target}%)`);
  }

  // 5. dates agree
  const lessonDate = lesson.match(/lastVerified:\s*"([\d-]+)"/)?.[1];
  const dates = { "topic.json": topic.lastVerified, lesson: lessonDate, "questions.json": bank.lastVerified };
  if (new Set(Object.values(dates).filter(Boolean)).size > 1) {
    warnings.push(`lastVerified differs: ${Object.entries(dates).map(([k, v]) => `${k} ${v ?? "none"}`).join(", ")}`);
  }

  errorCount += errors.length; warnCount += warnings.length;
  const untaught = warnings.filter((w) => w.includes("possibly untaught")).length;
  summary.push({ id, level: topic.level, status: topic.status, errors: errors.length, untaught, warnings: warnings.length });
  if (!quiet || errors.length) {
    console.log(`${errors.length ? "FAIL" : warnings.length ? "warn" : "ok  "} ${id} — ${errors.length} errors, ${warnings.length} warnings (${untaught} questions with possibly untaught terms)`);
    for (const e of errors) console.log(`  error  ${e}`);
    if (!quiet) for (const w of warnings) console.log(`  warn   ${w}`);
  }
}

if (ids.length > 1) {
  const bad = summary.filter((s) => s.errors).length;
  console.log(`\n${summary.length} topics: ${bad} with errors, ${errorCount} errors, ${warnCount} warnings.`);
}
process.exit(errorCount || (strict && warnCount) ? 1 : 0);
