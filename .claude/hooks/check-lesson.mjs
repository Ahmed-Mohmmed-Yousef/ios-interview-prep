// Structure checks for lesson.mdx (rules in docs/lesson-format.md).
// Usage: node check-lesson.mjs <lesson.mdx>   Prints one problem per line; nothing when it passes.
import { readFileSync } from "node:fs";
import { basename, dirname } from "node:path";

const file = process.argv[2];
const src = readFileSync(file, "utf8");
const problems = [];
const fail = (m) => problems.push(m);
const count = (re) => (src.match(re) ?? []).length;

// meta
const meta = src.match(/^export const meta = \{[\s\S]*?^\}\s*$/m)?.[0];
if (!meta) fail("missing 'export const meta = { ... }'");
else {
  for (const key of ["id", "summary", "estimatedMinutes", "lastVerified", "sources"]) {
    if (!new RegExp(`^\\s*${key}:`, "m").test(meta)) fail(`meta is missing '${key}'`);
  }
  const id = basename(dirname(file));
  if (!new RegExp(`^\\s*id: "${id}"`, "m").test(meta)) fail(`meta.id must be "${id}" (the folder name)`);
  const minutes = Number(meta.match(/estimatedMinutes:\s*(\d+)/)?.[1]);
  if (!(minutes >= 8 && minutes <= 12)) fail("meta.estimatedMinutes must be from 8 to 12");
  if (!/https:\/\//.test(meta)) fail("meta.sources has no URLs");
}

// Text outside code blocks and comments, for structure checks.
const body = src.replace(/```[\s\S]*?```/g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

// Lesson from the pilot: a "//" line outside code and the meta export is NOT a comment in MDX; it shows as text.
const prose = body.replace(/^export const meta[\s\S]*?^\}\s*$/m, "");
for (const l of prose.split("\n")) {
  if (/^\s*\/\//.test(l)) fail(`"//" line outside code shows as text in MDX — use {/* ... */}: ${l.trim().slice(0, 60)}`);
}

// Core sections, in order.
const order = [
  ["<InterviewHook>", /<InterviewHook>/],
  ["## The simple idea", /^## The simple idea\s*$/m],
  ["## See it", /^## See it\s*$/m],
  ["## In code or ## In practice", /^## (In code|In practice)\s*$/m],
  ["## Interview traps", /^## Interview traps\s*$/m],
  ["## How to answer in the interview", /^## How to answer in the interview\s*$/m],
  ["## Recap", /^## Recap\s*$/m],
];
let last = -1;
for (const [name, re] of order) {
  const at = body.search(re);
  if (at === -1) fail(`missing core section: ${name}`);
  else if (at < last) fail(`section out of order: ${name}`);
  else last = at;
}

// Guess first: 3–4 options, exactly 1 correct.
const guess = body.match(/<Guess>([\s\S]*?)<\/Guess>/)?.[1];
if (!guess) fail("<InterviewHook> needs a <Guess> with options");
else {
  const n = (guess.match(/<Option\b/g) ?? []).length;
  const right = (guess.match(/<Option\b[^>]*\bcorrect\b/g) ?? []).length;
  if (n < 3 || n > 4) fail(`<Guess> needs 3–4 options (has ${n})`);
  if (right !== 1) fail(`<Guess> needs exactly 1 correct option (has ${right})`);
}
if (!/<InterviewHook>[\s\S]*?<Question>[\s\S]+?<\/Question>/.test(body)) fail("<InterviewHook> needs a <Question>");

// Quick checks: 2–3, each with a question, 1 correct option and an explanation.
const checks = [...body.matchAll(/<QuickCheck>([\s\S]*?)<\/QuickCheck>/g)].map((m) => m[1]);
if (checks.length < 2 || checks.length > 3) fail(`needs 2–3 <QuickCheck> (has ${checks.length})`);
checks.forEach((c, i) => {
  if (!/<Question>[\s\S]+?<\/Question>/.test(c)) fail(`QuickCheck ${i + 1} needs a <Question>`);
  if ((c.match(/<Option\b[^>]*\bcorrect\b/g) ?? []).length !== 1) fail(`QuickCheck ${i + 1} needs exactly 1 correct option`);
  if ((c.match(/<Option\b/g) ?? []).length < 2) fail(`QuickCheck ${i + 1} needs at least 2 options`);
  if (!/<Explanation>[\s\S]+?<\/Explanation>/.test(c)) fail(`QuickCheck ${i + 1} needs an <Explanation>`);
});

// Other required parts.
if (!/<Analogy>/.test(body)) fail("missing <Analogy>");
if (!/<Diagram\b/.test(body)) fail("missing <Diagram>");
if (count(/<Trap\b/g) < 2) fail("needs 2 or more <Trap>");
if ((body.match(/<InterviewAnswer level="(fresh|junior|mid|senior|staff)">/g) ?? []).length < 2) {
  fail('needs 2 or more <InterviewAnswer level="..."> (topic level + one higher)');
}
if (count(/<Recap>/g) !== 1) fail("needs exactly 1 <Recap>");

// Code: every swift block is followed by an output block, unless marked no-output.
const fences = [...src.matchAll(/^```(\S*)([^\n]*)\n[\s\S]*?^```\s*$/gm)];
fences.forEach((f, i) => {
  if (f[1] !== "swift" || /\bno-output\b/.test(f[2])) return;
  const next = fences[i + 1];
  const between = next ? src.slice(f.index + f[0].length, next.index) : "x";
  if (!next || next[1] !== "output" || between.trim() !== "") fail(`swift block ${i + 1} needs an output block right after it (or mark it no-output)`);
});
if (/^## In code\s*$/m.test(body) && !fences.some((f) => f[1] === "swift")) fail("## In code needs at least one swift block");
if (/^## In code\s*$/m.test(body) && !/<TryIt>/.test(body)) fail("lessons with code need a <TryIt> link");

console.log(problems.join("\n"));
