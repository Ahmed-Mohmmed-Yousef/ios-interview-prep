// Builds docs/path-map.html: an interactive view of the road for each level, from content/.
// Usage: node scripts/build-path-page.mjs   (run again after any curriculum change, then republish)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const levels = read("content/levels.json").levels.map(({ id, title, summary }) => ({ id, title, summary }));
const units = read("content/units.json").units.map(({ id, title, goal, topics, bonus }) => ({
  id, title, goal, topics, bonus: bonus ?? [],
}));
const topics = {};
for (const id of readdirSync("content/topics")) {
  const t = read(`content/topics/${id}/topic.json`);
  if (t.status === "retired") continue;
  topics[id] = {
    title: t.title, level: t.level, goal: t.goal, status: t.status,
    prerequisites: t.prerequisites ?? [], briefIntro: t.briefIntro ?? [],
    sources: (t.sources ?? []).map(({ title, url, kind }) => ({ title, url, kind })),
  };
}
const data = JSON.stringify({ levels, units, topics, built: new Date().toISOString().slice(0, 10) })
  .replace(/</g, "\\u003c");

const html = `<title>iOS Interview Path Map</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: one vertical road. Stages are coloured sections on the road; units are labelled groups of numbered stops; bonus stops branch off to the side. */
:root {
  --bg: #f4f6f9; --surface: #ffffff; --fg: #15202b; --muted: #586674; --line: #d3dae2; --accent: #0062cc;
  --l-fresh: #248a3d; --l-junior: #0c7b8a; --l-mid: #0062cc; --l-senior: #3634a3; --l-staff: #8944ab;
  --font-display: "IBM Plex Sans Condensed", "Arial Narrow", system-ui, sans-serif;
  --font-body: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #0e1217; --surface: #171c23; --fg: #e7ecf1; --muted: #95a2af; --line: #2b333d; --accent: #0a84ff;
  --l-fresh: #30d158; --l-junior: #40c8e0; --l-mid: #0a84ff; --l-senior: #7d7aff; --l-staff: #bf5af2;
  color-scheme: dark;
} }
:root[data-theme="dark"] {
  --bg: #0e1217; --surface: #171c23; --fg: #e7ecf1; --muted: #95a2af; --line: #2b333d; --accent: #0a84ff;
  --l-fresh: #30d158; --l-junior: #40c8e0; --l-mid: #0a84ff; --l-senior: #7d7aff; --l-staff: #bf5af2;
  color-scheme: dark;
}
* { box-sizing: border-box; }
body {
  background: var(--bg); color: var(--fg); font: 15px/1.55 var(--font-body);
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px));
  padding-block: 28px 56px;
}
.wrap { max-width: 860px; margin: 0 auto; display: grid; gap: 28px; }
h1, h2, h3 { font-family: var(--font-display); text-wrap: balance; margin: 0; }
h1 { font-size: clamp(28px, 5vw, 40px); line-height: 1.1; letter-spacing: -0.01em; }
.lede { color: var(--muted); margin: 6px 0 0; max-width: 62ch; }
.picker { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; width: fit-content; max-width: 100%; }
.picker button {
  font: 600 14px var(--font-body); color: var(--muted); background: transparent; border: 0; border-radius: 9px;
  padding: 8px 14px; cursor: pointer;
}
.picker button[aria-pressed="true"] { background: var(--lc); color: var(--surface); }
.picker button:focus-visible, .stop-btn:focus-visible, .chip:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.stats { display: flex; flex-wrap: wrap; gap: 6px 20px; color: var(--muted); font-size: 14px; font-variant-numeric: tabular-nums; }
.stats b { color: var(--fg); font-weight: 600; }
.road { display: grid; gap: 36px; }
.stage { --c: var(--accent); display: grid; gap: 18px; }
.stage-head { display: grid; gap: 2px; padding-left: 18px; border-left: 4px solid var(--c); }
.stage-tag { font: 500 12px var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--c); }
.stage-head h2 { font-size: 26px; }
.stage-head p { margin: 0; color: var(--muted); }
.unit { display: grid; gap: 8px; padding-left: 22px; position: relative; }
.unit::before { content: ""; position: absolute; left: 7px; top: 4px; bottom: 4px; width: 2px; background: var(--line); }
.unit h3 { font-size: 17px; display: flex; gap: 8px; align-items: baseline; }
.unit h3 span { font: 400 13px var(--font-mono); color: var(--muted); }
ol.stops { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.stop { position: relative; }
.stop::before {
  content: ""; position: absolute; left: -20px; top: 15px; width: 10px; height: 10px; border-radius: 50%;
  background: var(--surface); border: 2px solid var(--c);
}
.stop.bonus { margin-left: 26px; }
.stop.bonus::before { left: -46px; width: 8px; height: 8px; top: 16px; border-style: dashed; }
.stop.bonus::after { content: ""; position: absolute; left: -36px; top: 20px; width: 30px; border-top: 2px dashed var(--line); }
.stop-btn {
  width: 100%; text-align: left; display: grid; grid-template-columns: 3.2em 1fr auto; gap: 10px; align-items: center;
  font: inherit; color: inherit; background: var(--surface); border: 1px solid var(--line); border-radius: 10px;
  padding: 8px 12px; cursor: pointer;
}
.stop-btn:hover { border-color: var(--c); }
.num { font: 500 13px var(--font-mono); color: var(--c); font-variant-numeric: tabular-nums; }
.ttl { min-width: 0; font-weight: 500; }
.tag { font: 500 11px var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 1px 8px; white-space: nowrap; }
.stop.is-prereq .stop-btn { border-color: var(--c); box-shadow: inset 4px 0 0 var(--c); }
.stop.is-open .stop-btn { border-color: var(--c); border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.detail {
  border: 1px solid var(--c); border-top: 0; border-radius: 0 0 10px 10px; background: var(--surface);
  padding: 10px 14px 14px calc(3.2em + 22px); display: grid; gap: 8px; font-size: 14px;
}
.detail p { margin: 0; max-width: 62ch; }
.detail .label { font: 500 11px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 500 13px var(--font-body); color: var(--fg); background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 2px 10px; cursor: pointer; }
.chip.later { border-style: dashed; }
code.id { font: 12px var(--font-mono); color: var(--muted); }
ul.sources { margin: 4px 0 0; padding-left: 18px; display: grid; gap: 4px; }
ul.sources li { overflow-wrap: anywhere; }
ul.sources a { color: var(--accent); }
ul.sources .tag { margin-left: 8px; }
.legend { display: grid; gap: 6px; color: var(--muted); font-size: 13px; border-top: 1px solid var(--line); padding-top: 16px; }
.legend p { margin: 0; }
@media (max-width: 520px) {
  .stop-btn { grid-template-columns: 2.6em 1fr; }
  .stop-btn .tag { grid-column: 2; justify-self: start; }
  .detail { padding-left: 14px; }
}
@media (prefers-reduced-motion: no-preference) { .stop-btn { transition: border-color .15s, box-shadow .15s; } }
</style>

<div class="wrap">
  <header style="display:grid;gap:14px">
    <div>
      <h1>iOS Interview Path Map</h1>
      <p class="lede">The draft road for each level, from fresh to staff. Levels add up: a senior learner walks the fresh, junior, mid and senior stages in order. Tap a topic to see its goal and what it needs.</p>
    </div>
    <div class="picker" id="picker" role="group" aria-label="Choose a level"></div>
    <div class="stats" id="stats" aria-live="polite"></div>
  </header>
  <main class="road" id="road"></main>
  <footer class="legend">
    <p><b>Numbers</b> show the order on the main road. A topic opens when the one before it is passed.</p>
    <p><b>Bonus</b> topics sit on a side branch. They are optional and do not count in the score.</p>
    <p><b>Needs</b> lists the topics a lesson builds on. A dashed chip means the lesson gives a short intro to a topic that comes later.</p>
    <p><b>Sources</b> are checked links. Most are official Apple or Swift pages; <b>Community</b> marks trusted non-Apple sources, allowed only where Apple has no page.</p>
    <p id="built"></p>
  </footer>
</div>

<script>
const DATA = ${data};
const T = DATA.topics;
const picker = document.getElementById("picker");
const road = document.getElementById("road");
const stats = document.getElementById("stats");
document.getElementById("built").textContent = "Draft from steps 1.6–1.7. Built " + DATA.built + " from the project's content files. All topics are still planned, not written.";

const levelIndex = Object.fromEntries(DATA.levels.map((l, i) => [l.id, i]));
const color = (id) => "var(--l-" + id + ")";
let open = null;

function el(tag, attrs, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "class") n.className = v;
    else if (k === "style") n.style.cssText = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const kid of kids) if (kid != null) n.append(kid);
  return n;
}

function render(levelId) {
  const last = levelIndex[levelId];
  open = null;
  road.replaceChildren();
  for (const b of picker.children) b.setAttribute("aria-pressed", String(b.dataset.level === levelId));
  let n = 0, main = 0, bonus = 0;
  DATA.levels.slice(0, last + 1).forEach((stage, si) => {
    const sec = el("section", { class: "stage", style: "--c:" + color(stage.id), "aria-label": stage.title + " stage" });
    let stageCount = 0;
    const groups = [];
    for (const u of DATA.units) {
      const items = [];
      for (const id of u.topics) {
        if (!T[id] || T[id].level !== stage.id) continue;
        n++; main++; stageCount++;
        items.push(stop(id, String(n).padStart(3, "0"), false));
        for (const b of u.bonus.filter((b) => b.after === id && T[b.topic])) { bonus++; items.push(stop(b.topic, "★", true)); }
      }
      if (items.length) groups.push(el("div", { class: "unit" },
        el("h3", {}, u.title, el("span", {}, String(items.length))),
        el("ol", { class: "stops" }, ...items)));
    }
    sec.append(el("div", { class: "stage-head" },
      el("span", { class: "stage-tag" }, "Stage " + (si + 1) + " · " + stageCount + " topics"),
      el("h2", {}, stage.title),
      el("p", {}, stage.summary)), ...groups);
    road.append(sec);
  });
  stats.replaceChildren(
    el("span", {}, el("b", {}, String(last + 1)), " stages"),
    el("span", {}, el("b", {}, String(main)), " main topics"),
    el("span", {}, el("b", {}, String(bonus)), " bonus topics"));
  try { history.replaceState(null, "", "#" + levelId); } catch (e) {}
}

function stop(id, num, isBonus) {
  const t = T[id];
  const li = el("li", { class: "stop" + (isBonus ? " bonus" : ""), id: "t-" + id, "data-id": id });
  const btn = el("button", { class: "stop-btn", type: "button", "aria-expanded": "false", onclick: () => toggle(li) },
    el("span", { class: "num", "aria-hidden": "true" }, num),
    el("span", { class: "ttl" }, t.title),
    isBonus ? el("span", { class: "tag" }, "Bonus") : null);
  li.append(btn);
  return li;
}

function chip(id, later) {
  return el("button", { class: "chip" + (later ? " later" : ""), type: "button", onclick: () => jump(id) }, T[id] ? T[id].title : id);
}

function toggle(li) {
  const wasOpen = open === li;
  if (open) close(open);
  if (wasOpen) return;
  const t = T[li.dataset.id];
  const d = el("div", { class: "detail" },
    el("p", {}, t.goal),
    t.prerequisites.length ? el("div", {}, el("div", { class: "label" }, "Needs"), el("div", { class: "chips" }, ...t.prerequisites.map((p) => chip(p, false)))) : el("p", { class: "label" }, "Needs nothing before it"),
    t.briefIntro.length ? el("div", {}, el("div", { class: "label" }, "Short intro to (comes later)"), el("div", { class: "chips" }, ...t.briefIntro.map((p) => chip(p, true)))) : null,
    t.sources.length ? el("div", {}, el("div", { class: "label" }, "Sources"),
      el("ul", { class: "sources" }, ...t.sources.map((s) => el("li", {},
        el("a", { href: s.url, target: "_blank", rel: "noopener" }, s.title),
        s.kind === "community" ? el("span", { class: "tag" }, "Community") : null)))) : null,
    el("code", { class: "id" }, li.dataset.id + " · " + t.level + " · " + t.status));
  li.append(d);
  li.classList.add("is-open");
  li.querySelector(".stop-btn").setAttribute("aria-expanded", "true");
  for (const p of t.prerequisites) document.getElementById("t-" + p)?.classList.add("is-prereq");
  open = li;
}

function close(li) {
  li.querySelector(".detail")?.remove();
  li.classList.remove("is-open");
  li.querySelector(".stop-btn").setAttribute("aria-expanded", "false");
  document.querySelectorAll(".is-prereq").forEach((n) => n.classList.remove("is-prereq"));
  open = null;
}

function jump(id) {
  const target = document.getElementById("t-" + id);
  if (!target) return;
  if (open) close(open);
  toggle(target);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  target.querySelector(".stop-btn").focus({ preventScroll: true });
}

for (const l of DATA.levels) {
  picker.append(el("button", { type: "button", "data-level": l.id, "aria-pressed": "false", style: "--lc:" + color(l.id), onclick: () => render(l.id) }, l.title));
}
const fromHash = location.hash.slice(1);
render(levelIndex[fromHash] != null ? fromHash : "senior");
</script>
`;

writeFileSync("docs/path-map.html", html);
console.log(`docs/path-map.html: ${Object.keys(topics).length} topics`);
