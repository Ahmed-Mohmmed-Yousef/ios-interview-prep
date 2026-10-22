// Validates the curriculum: levels.json, units.json, rules.json and every topics/<id>/topic.json.
// Rules are documented in docs/curriculum-schema.md.
// Usage: node scripts/validate-curriculum.mjs [contentDir]   (default: ./content)
// Prints one problem per line and exits 1 when there are problems.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(process.argv[2] ?? "content");
const problems = [];
const fail = (msg) => problems.push(msg);

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const STATUSES = ["planned", "draft", "review", "published", "retired"];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${path}: ${e.code === "ENOENT" ? "file is missing" : `invalid JSON (${e.message})`}`);
    return null;
  }
}

// --- levels.json
const levelsFile = readJson(join(dir, "levels.json"));
const levelIds = (levelsFile?.levels ?? []).map((l) => l.id);
const levelOrder = new Map(levelIds.map((id, i) => [id, i]));
if (levelsFile && levelIds.length === 0) fail("levels.json: no levels");
if (new Set(levelIds).size !== levelIds.length) fail("levels.json: duplicate level id");
for (const l of levelsFile?.levels ?? []) {
  if (!ID.test(l.id ?? "")) fail(`levels.json: bad level id "${l.id}"`);
  for (const key of ["title", "summary", "description"]) {
    if (!l[key]) fail(`levels.json: level "${l.id}" has no ${key}`);
  }
  if (!Array.isArray(l.selfCheck) || l.selfCheck.length === 0) {
    fail(`levels.json: level "${l.id}" needs a selfCheck list`);
  }
}

// --- rules.json
const rules = readJson(join(dir, "rules.json"));
if (rules) {
  for (const key of ["topicPassMark", "skipPassMark"]) {
    if (!(rules[key] > 0 && rules[key] <= 100)) fail(`rules.json: ${key} must be 1–100`);
  }
  if (!(rules.topicExamSize > 0)) fail("rules.json: topicExamSize must be above 0");
  for (const key of ["unitSkipTest", "levelSkipTest"]) {
    const t = rules[key];
    if (!t || !(t.questionsPerTopic > 0) || !(t.min > 0) || !(t.max >= t.min)) {
      fail(`rules.json: ${key} needs questionsPerTopic > 0 and 0 < min <= max`);
    }
  }
}

// --- topics/<id>/topic.json
const topicsDir = join(dir, "topics");
const topics = new Map();
for (const entry of existsSync(topicsDir) ? readdirSync(topicsDir, { withFileTypes: true }) : []) {
  if (!entry.isDirectory()) continue;
  const path = join(topicsDir, entry.name, "topic.json");
  const t = readJson(path);
  if (!t) continue;
  const where = `topics/${entry.name}/topic.json`;
  if (t.id !== entry.name) fail(`${where}: id "${t.id}" must match folder name "${entry.name}"`);
  if (!ID.test(t.id ?? "")) fail(`${where}: id must be kebab-case`);
  for (const key of ["title", "goal"]) if (!t[key]) fail(`${where}: missing ${key}`);
  if (!levelOrder.has(t.level)) fail(`${where}: unknown level "${t.level}"`);
  if (!STATUSES.includes(t.status)) fail(`${where}: status must be one of ${STATUSES.join(", ")}`);
  if (!Number.isInteger(t.version) || t.version < 1) fail(`${where}: version must be an integer >= 1`);
  if (!Array.isArray(t.prerequisites)) fail(`${where}: prerequisites must be a list`);
  if (!Array.isArray(t.sources)) fail(`${where}: sources must be a list`);
  for (const s of t.sources ?? []) {
    if (!s.title || !/^https:\/\//.test(s.url ?? "")) fail(`${where}: each source needs a title and an https url`);
  }
  if (t.lastVerified != null && !/^\d{4}-\d{2}-\d{2}$/.test(t.lastVerified)) {
    fail(`${where}: lastVerified must be YYYY-MM-DD or null`);
  }
  if (t.changes != null) {
    if (!Array.isArray(t.changes)) {
      fail(`${where}: changes must be a list`);
    } else {
      let last = 1;
      for (const c of t.changes) {
        if (!Number.isInteger(c.version) || c.version <= last) fail(`${where}: changes versions must go up, starting above 1`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(c.date ?? "")) fail(`${where}: each change needs a YYYY-MM-DD date`);
        if (!c.note) fail(`${where}: each change needs a note`);
        last = c.version;
      }
      if (t.changes.length && last !== t.version) fail(`${where}: last change version (${last}) must equal version (${t.version})`);
    }
  } else if (t.version > 1) {
    fail(`${where}: version ${t.version} needs a changes entry explaining what changed`);
  }
  topics.set(entry.name, { ...t, folder: join(topicsDir, entry.name) });
}

// --- units.json: membership and road order
const unitsFile = readJson(join(dir, "units.json"));
const units = unitsFile?.units ?? [];
const placement = new Map(); // topicId -> { unit, unitIndex, index, bonusAfter? }
const unitIds = new Set();

units.forEach((u, unitIndex) => {
  const where = `units.json: unit "${u.id}"`;
  if (!ID.test(u.id ?? "")) fail(`units.json: bad unit id "${u.id}"`);
  if (unitIds.has(u.id)) fail(`${where}: duplicate unit id`);
  unitIds.add(u.id);
  if (!u.title) fail(`${where}: missing title`);
  if (!u.goal) fail(`${where}: missing goal`);

  const place = (id, info) => {
    if (placement.has(id)) return fail(`units.json: topic "${id}" appears more than once`);
    if (!topics.has(id)) return fail(`${where}: topic "${id}" has no folder topics/${id}/topic.json`);
    placement.set(id, { unit: u.id, unitIndex, ...info });
  };
  (u.topics ?? []).forEach((id, index) => place(id, { index }));
  for (const b of u.bonus ?? []) {
    const after = (u.topics ?? []).indexOf(b.after);
    if (after === -1) {
      fail(`${where}: bonus "${b.topic}" must come after a main topic of this unit (got "${b.after}")`);
      continue;
    }
    place(b.topic, { index: after + 0.5, bonusAfter: b.after });
  }
});

// Road position: stage (level), then unit, then place in unit. Bonus sits just after its main topic.
const position = (id) => {
  const p = placement.get(id);
  return [levelOrder.get(topics.get(id).level), p.unitIndex, p.index];
};
const before = (a, b) => {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] < b[i];
  return false;
};

for (const [id, t] of topics) {
  const where = `topics/${id}/topic.json`;
  const p = placement.get(id);

  if (t.status === "retired") {
    if (p) fail(`${where}: retired topics must be removed from units.json`);
    if (t.replacedBy != null && !topics.has(t.replacedBy)) fail(`${where}: replacedBy "${t.replacedBy}" does not exist`);
    continue;
  }
  if (!p) {
    fail(`${where}: not in any unit in units.json`);
    continue;
  }
  if (!levelOrder.has(t.level)) continue;

  if (p.bonusAfter && topics.get(p.bonusAfter)?.level !== t.level) {
    fail(`${where}: a bonus topic must have the same level as its "after" topic "${p.bonusAfter}"`);
  }

  for (const pre of t.prerequisites ?? []) {
    const pt = topics.get(pre);
    if (!pt) {
      fail(`${where}: prerequisite "${pre}" does not exist`);
    } else if (pt.status === "retired") {
      fail(`${where}: prerequisite "${pre}" is retired${pt.replacedBy ? ` — use "${pt.replacedBy}"` : ""}`);
    } else if (placement.get(pre)?.bonusAfter) {
      fail(`${where}: prerequisite "${pre}" is a bonus topic; prerequisites must be main topics`);
    } else if (placement.has(pre) && levelOrder.has(pt.level) && !before(position(pre), position(id))) {
      fail(`${where}: prerequisite "${pre}" must come earlier on the road`);
    } else if (t.status === "published" && pt.status !== "published") {
      fail(`${where}: published topic needs published prerequisite "${pre}" (it is ${pt.status})`);
    }
  }

  // Sources: official vs community, following the policy in rules.json.
  const policy = rules?.sources;
  for (const s of t.sources ?? []) {
    if (!["official", "community"].includes(s.kind)) {
      fail(`${where}: source "${s.url}" needs kind "official" or "community"`);
      continue;
    }
    if (!policy || !/^https:\/\//.test(s.url ?? "")) continue;
    const official = policy.officialHosts.includes(new URL(s.url).host) ||
      policy.officialRepoPrefixes.some((p) => s.url.startsWith(p));
    if (s.kind === "official" && !official) fail(`${where}: "${s.url}" is marked official but its site is not in rules.json officialHosts`);
    if (s.kind === "community" && official) fail(`${where}: "${s.url}" is an official site; mark it official`);
    if (s.kind === "community" && !policy.communityAllowed.units.includes(p.unit) && !policy.communityAllowed.topics.includes(id)) {
      fail(`${where}: community source "${s.url}" is not allowed here (see rules.json sources.communityAllowed)`);
    }
  }

  for (const later of t.briefIntro ?? []) {
    if (!topics.has(later)) fail(`${where}: briefIntro "${later}" does not exist`);
    else if ((t.prerequisites ?? []).includes(later)) fail(`${where}: "${later}" cannot be both a prerequisite and a briefIntro`);
  }

  if (t.status === "published") {
    for (const file of ["lesson.mdx", "questions.json"]) {
      if (!existsSync(join(t.folder, file))) fail(`${where}: published topic needs ${file}`);
    }
    const bank = existsSync(join(t.folder, "questions.json")) ? readJson(join(t.folder, "questions.json")) : null;
    const active = (bank?.questions ?? []).filter((q) => !q.retired).length;
    if (bank && active < 30) fail(`${where}: published topic needs at least 30 non-retired questions (has ${active})`);
    if ((t.sources ?? []).length === 0) fail(`${where}: published topic needs at least one source`);
  }
}

if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
console.log(`OK: ${levelIds.length} levels, ${units.length} units, ${topics.size} topics`);
