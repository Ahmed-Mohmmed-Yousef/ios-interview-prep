// HISTORY ONLY — this was the one-time input for step 1.6 (2026-10-22). Do not run it again:
// it would overwrite later edits. From now on, edit content/units.json and topic.json directly.
// Applies scripts/data/prerequisites-1.6.mjs: sets the main-topic order in units.json and writes
// prerequisites into each topic.json. A prerequisite that is not earlier on the road is left out
// and listed as a conflict (printed as JSON) for the user to decide. Conflicts the user accepted
// (`briefIntro` in the data file) are written to topic.json `briefIntro` instead.
// Usage: node scripts/apply-order-prereqs.mjs [--dry-run]
import { readFileSync, writeFileSync } from "node:fs";
import { order, prerequisites, briefIntro } from "./data/prerequisites-1.6.mjs";

const dry = process.argv.includes("--dry-run");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const levels = read("content/levels.json").levels.map((l) => l.id);
const unitsFile = read("content/units.json");
const topicPath = (id) => `content/topics/${id}/topic.json`;

// 1. Main-topic order: must be the same set of ids, just reordered.
for (const u of unitsFile.units) {
  const next = order[u.id];
  if (!next) throw new Error(`no order for unit ${u.id}`);
  const same = [...u.topics].sort().join() === [...next].sort().join();
  if (!same) throw new Error(`order for ${u.id} does not match its current topics`);
  u.topics = next;
}

// 2. Road position of every topic: [stage, unit, index]; bonus sits just after its main topic.
const pos = new Map();
const meta = new Map();
unitsFile.units.forEach((u, ui) => {
  const place = (id, index) => {
    const t = read(topicPath(id));
    meta.set(id, { title: t.title, level: t.level, unit: u.title });
    pos.set(id, [levels.indexOf(t.level), ui, index]);
  };
  u.topics.forEach((id, i) => place(id, i));
  for (const b of u.bonus ?? []) place(b.topic, u.topics.indexOf(b.after) + 0.5);
});
const bonusIds = new Set(unitsFile.units.flatMap((u) => (u.bonus ?? []).map((b) => b.topic)));
const before = (a, b) => {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] < b[i];
  return false;
};

// 3. Prerequisites.
const conflicts = [];
for (const id of pos.keys()) {
  const wanted = prerequisites[id];
  if (!wanted) throw new Error(`no prerequisites entry for ${id}`);
  const kept = [];
  const intro = [];
  for (const pre of wanted) {
    if (!pos.has(pre)) throw new Error(`${id}: unknown prerequisite ${pre}`);
    if (bonusIds.has(pre)) throw new Error(`${id}: prerequisite ${pre} is a bonus topic`);
    if (before(pos.get(pre), pos.get(id))) kept.push(pre);
    else if (briefIntro[id]?.includes(pre)) intro.push(pre);
    else conflicts.push({ topic: id, needs: pre, topicInfo: meta.get(id), needsInfo: meta.get(pre) });
  }
  if (!dry) {
    const t = read(topicPath(id));
    t.prerequisites = kept;
    if (intro.length) t.briefIntro = intro;
    else delete t.briefIntro;
    writeFileSync(topicPath(id), JSON.stringify(t, null, 2) + "\n");
  }
}
if (!dry) {
  unitsFile.version += 1;
  writeFileSync("content/units.json", JSON.stringify(unitsFile, null, 2) + "\n");
}
console.log(JSON.stringify(conflicts, null, 2));
