// Plain-English checks for learner-facing text (see .claude/rules/plain-english.md).
// Usage: node check-plain-english.mjs <lesson.mdx | questions.json>
// Prints one problem per line; prints nothing when the text passes.
import { readFileSync } from "node:fs";

const MAX_WORDS = 25;
const HARD_WORDS = {
  utilize: "use", utilise: "use", facilitate: "help", demonstrate: "show",
  initiate: "start", commence: "start", subsequently: "then",
  "in order to": "to", "prior to": "before", leverage: "use",
  mitigate: "reduce", ensure: "make sure",
};
const IDIOMS = ["under the hood", "piece of cake", "out of the box", "rule of thumb", "ballpark"];
const CONTRACTION = /\b[A-Za-z]+(?:n['’]t|['’](?:re|ll|ve|m|d))\b/g;

const file = process.argv[2];
const raw = readFileSync(file, "utf8");
const problems = [];

function check(text, where) {
  const plain = text
    .replace(/`[^`]*`/g, "code")                   // inline code counts as one word
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");      // keep link text, drop URL
  for (const sentence of plain.split(/(?<=[.!?])\s+|\n+/)) {
    const words = sentence.match(/[A-Za-z0-9][\w'’-]*/g) ?? [];
    if (words.length > MAX_WORDS) {
      problems.push(`${where}: sentence has ${words.length} words (max ${MAX_WORDS}): "${sentence.trim().slice(0, 80)}…"`);
    }
  }
  const lower = plain.toLowerCase();
  for (const [word, better] of Object.entries(HARD_WORDS)) {
    if (new RegExp(`\\b${word}\\b`).test(lower)) problems.push(`${where}: "${word}" → use "${better}"`);
  }
  for (const idiom of IDIOMS) {
    if (lower.includes(idiom)) problems.push(`${where}: idiom "${idiom}" — say it directly`);
  }
  for (const c of new Set(plain.match(CONTRACTION) ?? [])) {
    problems.push(`${where}: contraction "${c}" — write it in full`);
  }
}

if (file.endsWith("levels.json")) {
  for (const l of JSON.parse(raw).levels ?? []) {
    check(l.summary ?? "", `level ${l.id} summary`);
    check(l.description ?? "", `level ${l.id} description`);
    (l.selfCheck ?? []).forEach((s, i) => check(s, `level ${l.id} selfCheck ${i + 1}`));
  }
} else if (file.endsWith("topic.json")) {
  const t = JSON.parse(raw);
  check(t.title ?? "", `${t.id} title`);
  check(t.goal ?? "", `${t.id} goal`);
} else if (file.endsWith("units.json")) {
  for (const u of JSON.parse(raw).units ?? []) {
    check(u.title ?? "", `unit ${u.id} title`);
    check(u.goal ?? "", `unit ${u.id} goal`);
  }
} else if (file.endsWith(".json")) {
  const bank = JSON.parse(raw);
  for (const q of bank.questions ?? []) {
    check(q.prompt ?? "", `${q.id} prompt`);
    for (const o of q.options ?? []) {
      check(o.text ?? "", `${q.id} option ${o.id}`);
      check(o.explanation ?? "", `${q.id} option ${o.id} explanation`);
    }
    for (const r of q.rubric ?? []) check(r.criterion ?? "", `${q.id} rubric`);
    check(q.modelAnswer ?? "", `${q.id} modelAnswer`);
  }
} else {
  const prose = raw
    .replace(/^export const meta[\s\S]*?^\}\s*$/m, "")  // meta block
    .replace(/```[\s\S]*?```/g, "")                      // code blocks
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")                // MDX comments
    .replace(/<[^>]+>/g, "\n")                           // JSX tags
    .replace(/^#+\s.*$/gm, "");                          // headings
  check(prose, "lesson");
}

console.log(problems.join("\n"));
