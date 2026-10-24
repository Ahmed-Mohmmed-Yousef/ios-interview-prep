// Phase 3 prototype: the winding-road path map, built from the real curriculum and the design tokens.
// Reads content/ (levels, units, topics, rules), config/brand.json and config/generated/tokens.css.
// Writes docs/design/path-map-prototype.html. Usage: node scripts/build-path-prototype.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const brand = read("config/brand.json");
const rules = read("content/rules.json");
const levels = read("content/levels.json").levels.map(({ id, title, summary }) => ({ id, title, summary }));
const units = read("content/units.json").units.map(({ id, title, topics, bonus }) => ({ id, title, topics, bonus: bonus ?? [] }));
const topics = {};
for (const id of readdirSync("content/topics")) {
  const t = read(`content/topics/${id}/topic.json`);
  if (t.status === "retired") continue;
  topics[id] = { title: t.title, level: t.level, goal: t.goal, version: t.version, change: t.changes?.at(-1)?.note ?? null };
}
const tokensCss = readFileSync("config/generated/tokens.css", "utf8").replace(/@theme inline \{[\s\S]*?\n\}\n/, "");
const data = JSON.stringify({
  brand: { name: brand.name, tagline: brand.tagline }, levels, units, topics,
  rules: { pass: rules.topicPassMark, skip: rules.skipPassMark, unitSkip: rules.unitSkipTest, levelSkip: rules.levelSkipTest },
  pilot: { id: "structs-vs-classes", url: "https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J" },
}).replace(/</g, "\\u003c");

const page = `<title>Path Map Prototype</title>
<script>document.documentElement.lang = "en";</script>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${brand.fonts.body.replace(/ /g, "+")}:wght@400;600;700&display=swap">
<style>
${tokensCss}
/* Layout: sticky top bar; then the road, one stage after another. Each unit is a block of zig-zag rows with an SVG road drawn behind the stops. */
* { box-sizing: border-box; }
body { margin: 0; background: var(--background); color: var(--foreground); font: 400 1rem/1.625rem var(--font-body); }
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--card); }
.wrap { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.inner { max-width: 640px; margin: 0 auto; }
button { font-family: inherit; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
.small { font-size: .875rem; line-height: 1.375rem; color: var(--muted-foreground); }
.num { font-variant-numeric: tabular-nums; }

/* Top bar */
.top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--card); border-bottom: 1px solid var(--border); padding-block: 10px; }
.top .inner { display: grid; gap: 8px; }
.brandrow { display: flex; gap: 10px; align-items: center; justify-content: space-between; }
.brand { display: flex; gap: 8px; align-items: center; font-weight: 700; }
.levelsel { font: 600 .875rem var(--font-body); color: var(--foreground); background: var(--muted); border: 1px solid var(--border); border-radius: 999px; padding: 6px 12px; min-height: 36px; }
.stats { display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; align-items: center; font-size: .875rem; }
.bar { height: 8px; background: var(--muted); border-radius: 999px; overflow: hidden; grid-column: 1 / -1; }
.bar > span { display: block; height: 100%; background: var(--primary); width: 0; transition: width var(--duration-slow) var(--ease-calm); }

/* Demo controls (clearly example data) */
.demo { margin: 14px 0 6px; background: var(--secondary); border-radius: var(--radius); padding: 10px 12px; display: grid; gap: 8px; }
.demo .chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 600 .8125rem var(--font-body); color: var(--foreground); background: var(--card); border: 1.5px solid var(--border); border-radius: 999px; padding: 5px 11px; min-height: 34px; cursor: pointer; }
.chip[aria-pressed="true"] { background: var(--foreground); color: var(--background); border-color: var(--foreground); }

.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
/* Road */
.road { padding-block: 10px 120px; display: grid; gap: 8px; }
.stage { display: grid; gap: 6px; }
.sign { border-radius: calc(var(--radius) * 1.4); padding: 14px 16px; display: grid; gap: 6px; position: relative; }
.sign h2 { margin: 0; font-size: 1.3125rem; line-height: 1.75rem; }
.sign p { margin: 0; color: inherit; opacity: .95; font-size: .875rem; line-height: 1.375rem; }
.sign .row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; }
.sign-btn { font: 700 .875rem var(--font-body); color: var(--foreground); background: var(--card); border: 0; border-radius: 999px; padding: 8px 14px; min-height: 40px; cursor: pointer; }
.unit { position: relative; display: grid; gap: 0; padding-top: 6px; }
.post { justify-self: center; display: inline-flex; gap: 8px; align-items: center; background: var(--card); border: 1.5px solid var(--border); border-radius: 999px; padding: 4px 6px 4px 12px; font-weight: 600; font-size: .875rem; position: relative; z-index: 1; margin: 8px 0 4px; }
.post .skip { font: 600 .75rem var(--font-body); color: var(--primary); background: var(--secondary); border: 0; border-radius: 999px; padding: 5px 10px; min-height: 30px; cursor: pointer; }
.post.nobtn { padding-right: 12px; }
.roadsvg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
.roadsvg .base { fill: none; stroke: var(--border); stroke-width: 16; stroke-linecap: round; }
.roadsvg .done { fill: none; stroke: var(--success); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 1 10; }
.roadsvg .side { fill: none; stroke: var(--border); stroke-width: 4; stroke-dasharray: 6 6; }
ol.rows { list-style: none; margin: 0; padding: 0; display: grid; position: relative; z-index: 1; }
.rowx { height: 92px; display: flex; align-items: center; }
.rowx.bonusrow { height: 70px; }
.stopwrap { display: flex; align-items: center; gap: 12px; width: 50%; }
.left .stopwrap { margin-left: 8%; }
.right .stopwrap { margin-left: 42%; flex-direction: row-reverse; text-align: right; }
.bonusrow.left .stopwrap { margin-left: 22%; } .bonusrow.right .stopwrap { margin-left: 28%; }
.stop { width: 58px; height: 58px; flex: none; border-radius: 50%; border: 3px solid var(--card); display: grid; place-items: center; cursor: pointer; padding: 0; position: relative;
  transition: transform var(--duration-fast) var(--ease-calm); box-shadow: var(--shadow-card); }
.stop:hover { transform: scale(1.05); }
.stop.passed, .stop.updated { background: var(--success); color: var(--success-foreground); }
.stop.current { background: var(--primary); color: var(--primary-foreground); width: 68px; height: 68px; box-shadow: 0 0 0 6px var(--secondary), var(--shadow-raised); }
.stop.locked { background: var(--card); color: var(--muted-foreground); border-color: var(--border); }
.stop.skipped { background: var(--card); color: var(--foreground); border: 3px dashed var(--foreground); }
.stop.bonus { width: 44px; height: 44px; background: var(--card); color: var(--primary); border: 3px dashed var(--primary); }
.stop.bonus.locked { color: var(--muted-foreground); border-color: var(--border); }
.stop .dot { position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-radius: 50%; background: var(--warn); border: 3px solid var(--card); }
.lab { min-width: 0; display: grid; gap: 2px; }
.lab .t { font-weight: 600; line-height: 1.3; overflow-wrap: anywhere; }
.lab .m { font-size: .8125rem; color: var(--muted-foreground); }
.current-lab .t { font-weight: 700; }
.fold { justify-self: start; font: 600 .875rem var(--font-body); color: inherit; background: transparent; border: 1.5px solid currentColor; border-radius: 999px; padding: 6px 12px; min-height: 36px; cursor: pointer; }
.end { text-align: center; background: var(--card); border: 2px solid var(--success); border-radius: calc(var(--radius) * 1.4); padding: 18px; display: grid; gap: 6px; justify-items: center; }
.tip { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 14px; }

/* Card (bottom sheet) */
.scrim { position: fixed; inset: 0; background: rgb(0 0 0 / .4); z-index: 20; display: grid; align-items: end; justify-items: center; }
.scrim[hidden] { display: none; }
.sheet { width: min(640px, 100%); background: var(--card); border-radius: calc(var(--radius) * 1.8) calc(var(--radius) * 1.8) 0 0; padding: 18px max(18px, env(safe-area-inset-left, 0px)) calc(18px + env(safe-area-inset-bottom, 0px)); display: grid; gap: 10px; box-shadow: var(--shadow-raised); }
.sheet h3 { margin: 0; font-size: 1.3125rem; line-height: 1.75rem; }
.sheet p { margin: 0; }
.badges { display: flex; flex-wrap: wrap; gap: 6px; }
.badge { display: inline-flex; gap: 6px; align-items: center; font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; border-radius: 999px; padding: 3px 10px; border: 1.5px solid currentColor; }
.b-passed { color: var(--success); } .b-current { color: var(--primary); } .b-locked { color: var(--muted-foreground); } .b-skipped { color: var(--foreground); border-style: dashed; }
.b-updated { color: var(--warn); } .b-bonus { color: var(--primary); border-style: dashed; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.btn { font: 600 1rem var(--font-body); border-radius: 999px; padding: 0 18px; min-height: var(--touch-target); border: 1.5px solid transparent; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; }
.btn-primary { background: var(--primary); color: var(--primary-foreground); }
.btn-ghost { background: transparent; color: var(--foreground); border-color: var(--border); }
.btn-demo { background: var(--secondary); color: var(--secondary-foreground); }
.updated-note { background: var(--warn-soft); border-radius: var(--radius); padding: 10px 12px; }
.go-me { position: fixed; right: max(16px, env(safe-area-inset-right, 0px)); bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 6; box-shadow: var(--shadow-raised); }
.celebrate { animation: pop var(--duration-slow) var(--ease-calm); }
@keyframes pop { 0% { transform: scale(.6); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
.toast { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(80px + env(safe-area-inset-bottom, 0px)); background: var(--foreground); color: var(--background); padding: 10px 16px; border-radius: 999px; font-weight: 600; z-index: 30; max-width: calc(100% - 32px); text-align: center; }
.toast[hidden] { display: none; }
@media (max-width: 420px) { .right .stopwrap { margin-left: 36%; width: 56%; } .left .stopwrap { margin-left: 4%; width: 60%; } }
</style>

<header class="top wrap">
  <div class="inner">
    <div class="brandrow">
      <div class="brand"><svg width="30" height="30" viewBox="0 0 44 44" aria-hidden="true"><rect x="1" y="1" width="42" height="42" rx="12" fill="var(--primary)"/><path d="M12 35 C 12 25, 32 27, 32 18 S 20 9, 22 7" fill="none" stroke="var(--primary-foreground)" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="0.1 6.5"/><circle cx="12" cy="35" r="3.2" fill="var(--primary-foreground)"/><circle cx="32" cy="19" r="3.2" fill="var(--primary-foreground)"/></svg><span id="appName"></span></div>
      <label class="small" style="display:flex;gap:6px;align-items:center">Level <select class="levelsel" id="level" aria-label="Your level"></select></label>
    </div>
    <div class="stats">
      <span><b class="num" id="doneCount">0</b> of <span class="num" id="totalCount">0</span> topics done</span>
      <span>Path score <b class="num" id="pathScore">–</b></span>
      <div class="bar" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" id="progressbar"><span id="barFill"></span></div>
    </div>
  </div>
</header>

<main class="wrap"><div class="inner">
  <h1 class="sr-only">Your path</h1>
  <section class="demo" aria-label="Example progress">
    <span class="small"><b>Prototype.</b> Switch the example progress to see every state of the road. These are example results, not real ones.</span>
    <div class="chips" id="presets"></div>
  </section>
  <div class="road" id="road"></div>
</div></main>

<button class="btn btn-primary go-me" type="button" id="goMe">Go to my stop</button>
<div class="scrim" id="scrim" hidden><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle" id="sheet"></div></div>
<div class="toast" id="toast" role="status" hidden></div>

<script>
const D = ${data};
const T = D.topics;
const $ = (id) => document.getElementById(id);
const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
let state = store.get("pathProto") ?? { level: "junior", done: {}, open: {} };
const save = () => store.set("pathProto", state);
const levelIdx = (id) => D.levels.findIndex((l) => l.id === id);
$("appName").textContent = D.brand.name;
document.title = "Path Map Prototype";

// ---------- road order for a level ----------
function road(levelId) {
  const stages = [];
  for (const L of D.levels.slice(0, levelIdx(levelId) + 1)) {
    const us = [];
    for (const u of D.units) {
      const items = [];
      for (const id of u.topics) {
        if (T[id]?.level !== L.id) continue;
        items.push({ id, bonus: false });
        for (const b of u.bonus.filter((b) => b.after === id && T[b.topic])) items.push({ id: b.topic, bonus: true, after: id });
      }
      if (items.length) us.push({ unit: u, items });
    }
    stages.push({ level: L, units: us });
  }
  return stages;
}
const mains = (stages) => stages.flatMap((s) => s.units.flatMap((u) => u.items.filter((i) => !i.bonus).map((i) => i.id)));

// ---------- example presets ----------
const score = (id) => 72 + ([...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 29);
const PRESETS = [
  ["New learner", () => ({})],
  ["Halfway", () => {
    const st = road(state.level), list = mains(st), done = {};
    const half = Math.floor(list.length * 0.45);
    list.slice(0, half).forEach((id) => (done[id] = { status: "passed", score: score(id), version: T[id].version }));
    if (levelIdx(state.level) > 0) { // a unit skipped in the first stage
      const u = st[0].units.find((x) => x.unit.id === "coding-interview");
      u?.items.filter((i) => !i.bonus).forEach((i) => (done[i.id] = { status: "skipped", score: 85 }));
    }
    if (done[D.pilot.id]?.status === "passed") done[D.pilot.id].version = 1; // passed before the update, so it shows "Updated"
    return done;
  }],
  ["Path complete", () => { const done = {}; mains(road(state.level)).forEach((id) => (done[id] = { status: "passed", score: score(id), version: T[id].version })); return done; }],
];

// ---------- status ----------
function statusOf(item, list) {
  const d = state.done[item.id];
  if (item.bonus) {
    if (d) return "passed";
    return state.done[item.after] ? "bonus" : "bonus-locked";
  }
  if (d) return d.status === "skipped" ? "skipped" : (d.version < T[item.id].version ? "updated" : "passed");
  const firstOpen = list.find((id) => !state.done[id]);
  return item.id === firstOpen ? "current" : "locked";
}
const icon = (s) => ({
  passed: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  updated: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="dot"></span>',
  current: '<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="currentColor"/></svg>',
  locked: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  skipped: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6l6 6-6 6M12 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bonus: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.7-4.4 4 1.2 5.9L12 16.6l-5.3 2.9 1.2-5.9-4.4-4 5.9-.7z" fill="currentColor"/></svg>',
})[s === "bonus-locked" ? "bonus" : s];
const statusText = (s, d) => ({
  passed: "Passed " + d?.score + "%", updated: "Passed " + d?.score + "% · Updated", current: "You are here", locked: "Locked",
  skipped: "Skipped " + d?.score + "%", bonus: "Bonus, optional", "bonus-locked": "Bonus, opens later",
})[s];

// ---------- render ----------
function render(celebrateId) {
  const stages = road(state.level), list = mains(stages);
  const doneIds = list.filter((id) => state.done[id]);
  const avg = doneIds.length ? Math.round(doneIds.reduce((s, id) => s + state.done[id].score, 0) / doneIds.length) : null;
  $("doneCount").textContent = doneIds.length; $("totalCount").textContent = list.length;
  $("pathScore").textContent = avg == null ? "–" : avg + "%";
  const pct = Math.round(doneIds.length / list.length * 100);
  $("barFill").style.width = pct + "%"; $("progressbar").setAttribute("aria-valuenow", pct);
  const lvlSel = $("level");
  if (!lvlSel.options.length) D.levels.forEach((l) => lvlSel.append(new Option(l.title, l.id)));
  lvlSel.value = state.level;

  const roadEl = $("road");
  roadEl.innerHTML = "";
  if (levelIdx(state.level) > 0 && !doneIds.length) {
    roadEl.insertAdjacentHTML("beforeend", '<p class="tip">Already know the basics? Skip a stage or a unit with a short test. You need ' + D.rules.skip + '% to pass.</p>');
  }
  let rowCount = 0;
  stages.forEach((st, si) => {
    const below = levelIdx(st.level.id) < levelIdx(state.level);
    const stIds = st.units.flatMap((u) => u.items.filter((i) => !i.bonus).map((i) => i.id));
    const stDone = stIds.filter((id) => state.done[id]);
    const finished = stDone.length === stIds.length;
    const stAvg = stDone.length ? Math.round(stDone.reduce((s, id) => s + state.done[id].score, 0) / stDone.length) : 0;
    const folded = finished && !state.open[st.level.id];
    const stage = document.createElement("section");
    stage.className = "stage"; stage.setAttribute("aria-label", st.level.title + " stage");
    const sign = document.createElement("div");
    sign.className = "sign"; sign.style.background = "var(--level-" + st.level.id + ")"; sign.style.color = "var(--level-" + st.level.id + "-foreground)";
    const updatedHere = stIds.filter((id) => state.done[id]?.status === "passed" && state.done[id].version < T[id].version).length;
    sign.innerHTML = '<div class="row"><h2>Stage ' + (si + 1) + ': ' + st.level.title + '</h2><span class="num">' + stDone.length + ' / ' + stIds.length + (stDone.length ? ' · ' + stAvg + '%' : '') + '</span></div>' +
      '<p>' + (finished ? "Done. Average score " + stAvg + "%." : st.level.summary) + '</p>' +
      (updatedHere ? '<p><span class="badge" style="color:inherit;border-color:currentColor">' + updatedHere + ' topic' + (updatedHere > 1 ? 's' : '') + ' updated</span></p>' : '');
    const btnRow = document.createElement("div"); btnRow.className = "row";
    if (finished) {
      const f = document.createElement("button"); f.type = "button"; f.className = "fold"; f.textContent = folded ? "Show the stops" : "Fold this stage";
      f.addEventListener("click", () => { state.open[st.level.id] = folded; save(); render(); }); btnRow.append(f);
    } else if (below) {
      const b = document.createElement("button"); b.type = "button"; b.className = "sign-btn"; b.textContent = "Skip this stage";
      b.addEventListener("click", () => openSkip("stage", st.level.title, stIds)); btnRow.append(b);
    }
    if (btnRow.children.length) sign.append(btnRow);
    stage.append(sign);
    if (!folded) {
      for (const ub of st.units) {
        const unitEl = document.createElement("div"); unitEl.className = "unit";
        const uIds = ub.items.filter((i) => !i.bonus).map((i) => i.id);
        const uDone = uIds.every((id) => state.done[id]);
        const post = document.createElement("div"); post.className = "post";
        post.innerHTML = '<span>' + ub.unit.title + '</span>';
        if (below && !uDone) {
          const s = document.createElement("button"); s.type = "button"; s.className = "skip"; s.textContent = "Skip this unit";
          s.addEventListener("click", () => openSkip("unit", ub.unit.title + " (" + st.level.title + ")", uIds)); post.append(s);
        } else post.classList.add("nobtn");
        unitEl.append(post);
        const ol = document.createElement("ol"); ol.className = "rows";
        ub.items.forEach((it) => {
          const s = statusOf(it, list), d = state.done[it.id];
          const side = it.bonus ? (rowCount % 2 ? "left" : "right") : (rowCount++ % 2 ? "right" : "left");
          const li = document.createElement("li"); li.className = "rowx " + side + (it.bonus ? " bonusrow" : "");
          li.innerHTML = '<div class="stopwrap"><button type="button" class="stop ' + (it.bonus ? "bonus " + (s === "bonus-locked" ? "locked" : "") : s) + '" data-id="' + it.id + '" aria-label="' + T[it.id].title + ', ' + statusText(s, d) + '">' + icon(s) + '</button>' +
            '<div class="lab' + (s === "current" ? " current-lab" : "") + '"><span class="t">' + T[it.id].title + '</span><span class="m">' + statusText(s, d) + '</span></div></div>';
          li.querySelector(".stop").addEventListener("click", () => openCard(it, s));
          if (celebrateId === it.id) li.querySelector(".stop").classList.add("celebrate");
          ol.append(li);
        });
        unitEl.append(ol);
        stage.append(unitEl);
      }
    }
    roadEl.append(stage);
  });
  if (list.every((id) => state.done[id])) {
    roadEl.insertAdjacentHTML("beforeend", '<div class="end"><b style="font-size:1.3rem">Path complete</b><span>Your total result: <b class="num">' + avg + '%</b></span><span class="small">The full result screen comes in step 3.6.</span></div>');
  }
  requestAnimationFrame(drawRoads);
}

// Draw the road behind each unit block, through the centers of its stops.
function drawRoads() {
  document.querySelectorAll(".unit").forEach((u) => {
    u.querySelector(".roadsvg")?.remove();
    const box = u.getBoundingClientRect();
    const pts = [...u.querySelectorAll(".rowx:not(.bonusrow) .stop")].map((b) => { const r = b.getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top, b.classList.contains("passed") || b.classList.contains("updated") || b.classList.contains("skipped")]; });
    if (!pts.length) return;
    const post = u.querySelector(".post").getBoundingClientRect();
    const start = [box.width / 2, post.bottom - box.top];
    let d = "M" + start[0] + " " + start[1], done = "M" + start[0] + " " + start[1], prev = start, doneOpen = true;
    for (const [x, y, isDone] of pts) {
      const seg = " C " + prev[0] + " " + (prev[1] + (y - prev[1]) * .55) + ", " + x + " " + (y - (y - prev[1]) * .55) + ", " + x + " " + y;
      d += seg; if (doneOpen && isDone) done += seg; else doneOpen = false; prev = [x, y];
    }
    const sides = [...u.querySelectorAll(".bonusrow .stop")].map((b) => {
      const r = b.getBoundingClientRect(), main = u.querySelector('.stop[data-id="' + b.closest(".rowx").previousElementSibling?.querySelector(".stop")?.dataset.id + '"]');
      if (!main) return "";
      const m = main.getBoundingClientRect();
      return '<path class="side" d="M' + (m.left + m.width / 2 - box.left) + ' ' + (m.top + m.height / 2 - box.top) + ' L ' + (r.left + r.width / 2 - box.left) + ' ' + (r.top + r.height / 2 - box.top) + '"/>';
    }).join("");
    u.insertAdjacentHTML("afterbegin", '<svg class="roadsvg" aria-hidden="true"><path class="base" d="' + d + '"/>' + sides + '<path class="done" d="' + done + '"/></svg>');
  });
}

// ---------- the stop card (bottom sheet) ----------
let lastFocus = null;
function openSheet(html) {
  lastFocus = document.activeElement;
  $("sheet").innerHTML = html; $("scrim").hidden = false; setBehind(true);
  ($("sheet").querySelector("button, a") || $("sheet")).focus();
}
// While the card is open, the page behind it cannot be reached with Tab or a screen reader.
const setBehind = (on) => document.querySelectorAll("body > header, body > main").forEach((el) => el.inert = on);
function closeSheet() { $("scrim").hidden = true; setBehind(false); lastFocus?.focus?.(); }
$("scrim").addEventListener("click", (e) => { if (e.target === $("scrim")) closeSheet(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("scrim").hidden) closeSheet(); });

function openCard(it, s) {
  const t = T[it.id], d = state.done[it.id], list = mains(road(state.level));
  const unit = D.units.find((u) => u.topics.includes(it.id) || u.bonus.some((b) => b.topic === it.id));
  const badge = { passed: '<span class="badge b-passed">Passed ' + d?.score + '%</span>', updated: '<span class="badge b-passed">Passed ' + d?.score + '%</span><span class="badge b-updated">Updated</span>',
    current: '<span class="badge b-current">You are here</span>', locked: '<span class="badge b-locked">Locked</span>', skipped: '<span class="badge b-skipped">Skipped ' + d?.score + '%</span>',
    bonus: '<span class="badge b-bonus">Bonus</span>', "bonus-locked": '<span class="badge b-bonus">Bonus</span><span class="badge b-locked">Opens later</span>' }[s];
  const lessonBtn = it.id === D.pilot.id ? '<a class="btn btn-primary" href="' + D.pilot.url + '" target="_blank" rel="noopener">Open the pilot lesson</a>' : '<button class="btn btn-primary" type="button" data-act="lesson">Start lesson</button>';
  let actions = "";
  if (s === "locked") {
    const before = list[list.indexOf(it.id) - 1] ?? list.find((id) => !state.done[id]);
    actions = '<p>Pass <b>' + T[before].title + '</b> first.</p><button class="btn btn-primary" type="button" data-act="goto" data-id="' + before + '">Go to that topic</button>';
  } else if (s === "bonus-locked") {
    actions = '<p>Opens when you pass <b>' + T[it.after].title + '</b>.</p>';
  } else {
    actions = lessonBtn + (s === "current" || s === "bonus" ? '<button class="btn btn-demo" type="button" data-act="pass">Example: pretend I passed</button>' : "") +
      (s === "passed" || s === "updated" || s === "skipped" ? '<button class="btn btn-ghost" type="button" data-act="lesson">Take the exam again</button>' : "");
  }
  openSheet('<div class="badges">' + badge + '</div><h3 id="sheetTitle">' + t.title + '</h3>' +
    '<p class="small">' + (unit?.title ?? "") + ' · ' + D.levels[levelIdx(t.level)].title + ' · about 10 minutes, then a 10-question exam</p>' +
    '<p>' + t.goal + '</p>' +
    (s === "updated" ? '<div class="updated-note"><b>Updated.</b> ' + (t.change ?? "This topic changed after you passed it.") + ' Your pass stays. Taking the exam again is optional.</div>' : "") +
    '<div class="actions">' + actions + '<button class="btn btn-ghost" type="button" data-act="close">Close</button></div>');
  $("sheet").querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
    const a = b.dataset.act;
    if (a === "close") return closeSheet();
    if (a === "goto") { closeSheet(); scrollToStop(b.dataset.id); return; }
    if (a === "lesson") { closeSheet(); toast("In the app, this opens the lesson. Only the pilot lesson exists so far."); return; }
    if (a === "pass") {
      state.done[it.id] = { status: "passed", score: score(it.id), version: t.version }; save(); closeSheet();
      render(it.id); toast("You passed! The next stop is open."); setTimeout(() => scrollToStop(it.id), 50);
    }
  }));
}

function openSkip(kind, name, ids) {
  const cfg = kind === "unit" ? D.rules.unitSkip : D.rules.levelSkip;
  const n = Math.min(cfg.max, Math.max(cfg.min, ids.length * cfg.questionsPerTopic));
  openSheet('<div class="badges"><span class="badge b-skipped">Skip test</span></div><h3 id="sheetTitle">Skip ' + name + '</h3>' +
    '<p>' + n + ' questions from the ' + ids.length + ' topics in this ' + kind + '. Pass with ' + D.rules.skip + '% and these topics count as done, with your test score.</p>' +
    '<p class="small">If you do not pass, nothing changes. You can try again, or take the topics one by one.</p>' +
    '<div class="actions"><button class="btn btn-primary" type="button" data-act="start">Start the skip test</button><button class="btn btn-demo" type="button" data-act="pass">Example: pretend I scored 85%</button><button class="btn btn-ghost" type="button" data-act="close">Close</button></div>');
  $("sheet").querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.act === "close") return closeSheet();
    if (b.dataset.act === "start") { closeSheet(); toast("In the app, this starts the skip test."); return; }
    ids.forEach((id) => { if (!state.done[id]) state.done[id] = { status: "skipped", score: 85 }; }); save(); closeSheet(); render(); toast("Skipped with 85%. Those topics now count as done.");
  }));
}

function scrollToStop(id) {
  let el = document.querySelector('.stop[data-id="' + id + '"]');
  if (!el) { const lvl = T[id].level; state.open[lvl] = true; save(); render(); el = document.querySelector('.stop[data-id="' + id + '"]'); }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); el?.focus({ preventScroll: true });
}
let toastTimer;
function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2600); }

$("goMe").addEventListener("click", () => { const list = mains(road(state.level)); const id = list.find((x) => !state.done[x]); if (id) scrollToStop(id); else toast("You finished this path."); });
$("level").addEventListener("change", (e) => { state.level = e.target.value; save(); render(); toast("Level changed. Your progress is kept."); });
PRESETS.forEach(([name, fn], i) => {
  const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = name;
  b.addEventListener("click", () => { state.done = fn(); state.open = {}; save(); [...$("presets").children].forEach((c) => c.setAttribute("aria-pressed", String(c === b))); render(); });
  $("presets").append(b);
});
addEventListener("resize", () => requestAnimationFrame(drawRoads));
render();
</script>
`;
writeFileSync("docs/design/path-map-prototype.html", page);
console.log(`docs/design/path-map-prototype.html: ${(page.length / 1024).toFixed(0)} KB, ${Object.keys(topics).length} topics`);
