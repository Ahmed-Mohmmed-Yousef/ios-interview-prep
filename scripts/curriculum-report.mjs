// Writes docs/topics.md: every stage, its units and topics, built from content/.
// Usage: node scripts/curriculum-report.mjs   (run again after any curriculum change)
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const levels = read("content/levels.json").levels;
const units = read("content/units.json").units;
const topic = (id) => read(`content/topics/${id}/topic.json`);

const lines = [
  "# Topics by Level",
  "",
  "Generated from `content/` by `node scripts/curriculum-report.mjs`. Do not edit by hand.",
  "",
  "★ = bonus topic (side branch, not in the score). Order inside each unit is a draft until step 1.6.",
  "",
];

const counts = [];
for (const level of levels) {
  let main = 0, bonus = 0;
  const body = [];
  for (const u of units) {
    const rows = [];
    for (const id of u.topics ?? []) {
      const t = topic(id);
      if (t.level !== level.id) continue;
      rows.push(`| ${t.title} | ${t.goal} |`);
      main++;
      for (const b of (u.bonus ?? []).filter((b) => b.after === id)) {
        const bt = topic(b.topic);
        rows.push(`| ★ ${bt.title} | ${bt.goal} |`);
        bonus++;
      }
    }
    if (rows.length) body.push(`### ${u.title}`, "", "| Topic | Goal |", "|---|---|", ...rows, "");
  }
  counts.push(`| ${level.title} | ${main} | ${bonus} |`);
  lines.push(`## ${level.title} — ${main} topics + ${bonus} bonus`, "", `_${level.summary}_`, "", ...body);
}

lines.splice(6, 0, "| Level | Main | Bonus |", "|---|---|---|", ...counts, "");
writeFileSync("docs/topics.md", lines.join("\n"));
console.log(counts.join("\n"));
