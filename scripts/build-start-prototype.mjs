// Phase 3 prototype: welcome (S1), level picker with self-check (S2), progress and settings (S11),
// export / import / reset of the progress file, about (S12) and the empty, loading and error states.
// Uses content/levels.json, units.json, rules.json, config/brand.json and the design tokens.
// Writes docs/design/start-prototype.html. Usage: node scripts/build-start-prototype.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const brand = read("config/brand.json");
const rules = read("content/rules.json");
const levels = read("content/levels.json").levels;
const units = read("content/units.json").units.map(({ id, title, topics }) => ({ id, title, topics }));
const titles = {}, levelOf = {}, versions = {};
for (const id of readdirSync("content/topics")) {
  const t = read(`content/topics/${id}/topic.json`);
  titles[id] = t.title; levelOf[id] = t.level; versions[id] = t.version;
}
const tokensCss = readFileSync("config/generated/tokens.css", "utf8").replace(/@theme inline \{[\s\S]*?\n\}\n/, "");

const data = JSON.stringify({
  brand: { name: brand.name, tagline: brand.tagline, fileSlug: brand.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
  levels, units, titles, levelOf, versions,
  rules: { pass: rules.topicPassMark, skip: rules.skipPassMark },
  // The file id stays the same when the app name changes, so old files still import.
  file: { app: "ios-interview-prep", kind: "progress", schema: 1, maxBytes: 1024 * 1024 },
  // A level counts as "you can do this" when at least this share of its self-check is ticked.
  selfCheckShare: 0.5,
  links: { path: "https://claude.ai/artifact/KnAK3X8Tj4FxQopL1Mnrx6", exam: "https://claude.ai/artifact/P41sZga3jfPNXuz6ZVQNLw" },
}).replace(/</g, "\\u003c");

const page = `<title>Start and Progress Prototype</title>
<script>document.documentElement.lang = "en";</script>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${brand.fonts.body.replace(/ /g, "+")}:wght@400;600;700&family=${brand.fonts.code.replace(/ /g, "+")}:wght@400;600&display=swap">
<style>
${tokensCss}
/* Layout: a prototype screen switcher on top, an optional "storage blocked" banner, then one screen in a centered column. Dialogs are native <dialog> sheets. */
* { box-sizing: border-box; }
body { margin: 0; background: var(--background); color: var(--foreground); font: 400 1rem/1.625rem var(--font-body); }
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--card); }
.wrap { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.inner { max-width: 720px; margin: 0 auto; display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }
.inner > * { min-width: 0; }
[hidden] { display: none !important; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
a { color: var(--primary); }
h1 { font-size: 1.875rem; line-height: 2.375rem; margin: 0; text-wrap: balance; }
h2 { font-size: 1.3125rem; line-height: 1.875rem; margin: 0; text-wrap: balance; }
h3 { font-size: 1.0625rem; line-height: 1.5rem; margin: 0; }
p { margin: 0; max-width: var(--reading-width); }
ul, ol { margin: 0; padding-left: 1.25em; }
.small { font-size: .875rem; line-height: 1.375rem; color: var(--muted-foreground); }
.eyebrow { font-size: .75rem; line-height: 1.25rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted-foreground); }
.num { font-variant-numeric: tabular-nums; }
code { font-family: var(--font-code); font-size: .9em; background: var(--code); padding: 1px 5px; border-radius: 6px; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr); box-shadow: var(--shadow-card); }
.card > * { min-width: 0; }
.btn { font: 600 1rem var(--font-body); border-radius: 999px; padding: 0 20px; min-height: var(--touch-target); border: 1.5px solid transparent; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; text-align: center; }
.btn-primary { background: var(--primary); color: var(--primary-foreground); }
.btn-ghost { background: transparent; color: var(--foreground); border-color: var(--border); }
.btn-danger { background: var(--destructive); color: var(--destructive-foreground); }
.btn-link { background: none; border: 0; padding: 0 2px; min-height: var(--touch-target); color: var(--primary); font: 600 1rem var(--font-body); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.badge { display: inline-flex; gap: 6px; align-items: center; font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; border-radius: 999px; padding: 3px 10px; border: 1.5px solid currentColor; }

.switcher { background: var(--secondary); padding-block: 10px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 600 .8125rem var(--font-body); color: var(--foreground); background: var(--card); border: 1.5px solid var(--border); border-radius: 999px; padding: 5px 11px; min-height: 34px; cursor: pointer; }
.chip[aria-pressed="true"] { background: var(--foreground); color: var(--background); border-color: var(--foreground); }
.sim { display: flex; gap: 8px; align-items: center; font-size: .8125rem; font-weight: 600; min-height: 34px; }
.sim input { width: 18px; height: 18px; accent-color: var(--primary); }

main { padding-block: 20px 120px; }
.notice { border-radius: var(--radius); padding: 12px 14px; display: grid; gap: 8px; border: 1.5px solid; }
.notice-warn { background: var(--warn-soft); border-color: var(--warn); }
.notice-info { background: var(--secondary); border-color: var(--border); }
.notice-ok { background: var(--success-soft); border-color: var(--success); }
.notice b.t { display: block; }
.blocked { padding-top: 12px; }

/* S1 Welcome */
.hero { display: grid; gap: 12px; padding-top: 8px; }
.brandmark { display: flex; gap: 10px; align-items: center; font-weight: 700; font-size: 1.125rem; }
.brandmark svg { width: 36px; height: 36px; flex: none; }
.steps3 { list-style: none; padding: 0; display: grid; gap: 10px; counter-reset: s; }
.steps3 li { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 12px; align-items: start; }
.steps3 li::before { counter-increment: s; content: counter(s); width: 40px; height: 40px; border-radius: 50%; background: var(--secondary); color: var(--primary); font-weight: 700; display: grid; place-items: center; }
.facts { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; }
.facts li { font-size: .875rem; font-weight: 600; background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px; }

/* S2 Level picker */
.levels { display: grid; gap: 10px; border: 0; padding: 0; margin: 0; min-width: 0; }
.lvl { position: relative; display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 4px 12px; align-items: start; background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 14px 14px 14px 18px; cursor: pointer; overflow: hidden; }
.lvl::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 6px; background: var(--lc); }
.lvl:has(input:checked) { border-color: var(--primary); box-shadow: 0 0 0 1.5px var(--primary); }
.lvl:has(input:focus-visible) { outline: 3px solid var(--ring); outline-offset: 2px; }
.lvl input { width: 20px; height: 20px; margin: 3px 0 0; accent-color: var(--primary); }
.lvl .body { display: grid; gap: 4px; min-width: 0; }
.lvl .top { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: baseline; }
.lvl .name { font-weight: 700; font-size: 1.125rem; }
.tag { font-size: .75rem; font-weight: 700; border-radius: 999px; padding: 2px 9px; }
.tag-now { background: var(--primary); color: var(--primary-foreground); }
.tag-sug { background: var(--success-soft); color: var(--success); border: 1.5px solid var(--success); }
details.can { grid-column: 2; }
details.can summary { cursor: pointer; font-weight: 600; font-size: .9375rem; color: var(--primary); min-height: 36px; display: flex; align-items: center; }
details.can ul { font-size: .9375rem; display: grid; gap: 4px; padding-top: 4px; }
.selfcheck fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 6px; min-width: 0; }
.selfcheck legend { font-weight: 700; padding: 0; margin-bottom: 4px; }
.tick { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 10px; align-items: start; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--border); background: var(--background); cursor: pointer; min-height: var(--touch-target); }
.tick input { width: 20px; height: 20px; margin: 2px 0 0; accent-color: var(--primary); }
.suggest { position: sticky; bottom: 76px; }
.actionbar { position: fixed; inset: auto 0 0; z-index: 5; background: var(--card); border-top: 1px solid var(--border); padding-block: 10px calc(10px + env(safe-area-inset-bottom, 0px)); }
.actionbar .inner { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; }
.actionbar .btn-primary { flex: 1 1 200px; max-width: 360px; }

/* S11 Progress and settings */
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.stat { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 12px; display: grid; gap: 2px; }
.stat b { font-size: 1.5rem; line-height: 2rem; }
.bar { height: 8px; background: var(--muted); border-radius: 999px; overflow: hidden; }
.bar > span { display: block; height: 100%; background: var(--primary); }
details.stage { border-top: 1px solid var(--border); padding-top: 10px; }
details.stage:first-of-type { border-top: 0; padding-top: 0; }
details.stage > summary { cursor: pointer; list-style: none; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; align-items: center; min-height: var(--touch-target); }
details.stage > summary::-webkit-details-marker { display: none; }
details.stage > summary .bar { grid-column: 1 / -1; }
.stage-name { font-weight: 700; display: flex; gap: 8px; align-items: center; }
.stage-name::before { content: ""; width: 12px; height: 12px; border-radius: 3px; background: var(--lc); flex: none; }
details.stage[open] .chev { transform: rotate(180deg); }
.chev { transition: transform var(--duration-fast); display: inline-block; }
.urow { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 10px; padding: 8px 0 0 20px; font-size: .9375rem; }
.urow .bar { grid-column: 1 / -1; height: 6px; }
.seg { display: inline-grid; grid-auto-flow: column; border: 1.5px solid var(--border); border-radius: 999px; padding: 3px; gap: 3px; border-style: solid; margin: 0; min-width: 0; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.seg label { position: relative; font-weight: 600; font-size: .9375rem; border-radius: 999px; padding: 0 14px; min-height: 38px; display: grid; place-items: center; cursor: pointer; }
.seg input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: pointer; }
.seg label:has(input:checked) { background: var(--foreground); color: var(--background); }
.seg label:has(input:focus-visible) { outline: 3px solid var(--ring); outline-offset: 2px; }
.danger-zone { border-color: var(--destructive); }

/* Dialogs */
dialog { width: min(520px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; background: var(--card); color: var(--foreground); box-shadow: var(--shadow-raised); }
dialog::backdrop { background: rgb(0 0 0 / .45); }
dialog .inner { gap: 14px; }
.compare { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.compare > div { border: 1px solid var(--border); border-radius: 10px; padding: 10px; display: grid; gap: 2px; }
.compare > div.new { border: 1.5px solid var(--primary); }
input[type="text"] { font: 600 1rem var(--font-code); color: var(--foreground); background: var(--background); border: 1.5px solid var(--border); border-radius: 10px; padding: 0 12px; min-height: var(--touch-target); width: 100%; }
pre.file { margin: 0; font: .8125rem/1.25rem var(--font-code); background: var(--code); border-radius: 10px; padding: 10px 12px; overflow: auto; max-height: 220px; }
.toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 20; background: var(--foreground); color: var(--background); border-radius: 999px; padding: 10px 18px; font-weight: 600; max-width: calc(100vw - 32px); }

/* States */
.skel { background: var(--muted); border-radius: 10px; animation: pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .55; } }
@media (prefers-reduced-motion: reduce) { .skel { animation: none; } .chev { transition: none; } }
.state-h { margin-top: 8px; }
.big-icon { width: 56px; height: 56px; }
</style>

<aside class="switcher wrap" aria-label="Prototype controls"><div class="inner">
  <span class="small"><b>Prototype.</b> Pick a screen. Progress uses example data for a junior learner. Everything is saved in this browser.</span>
  <div class="chips" id="screens"></div>
  <label class="sim"><input type="checkbox" id="simBlocked"> Pretend the browser blocks saving</label>
</div></aside>
<div class="wrap blocked" id="blockedBar" hidden><div class="inner"><div class="notice notice-warn" role="status">
  <b class="t">Your progress is not being saved</b>
  <p>This browser blocks saving. This often happens in a private window. When you close this page, your progress is lost. Export a file to keep it.</p>
  <div class="row"><button class="btn btn-ghost" type="button" data-act="export">Export progress</button></div>
</div></div></div>
<main class="wrap"><div class="inner" id="screen"></div></main>
<section class="actionbar wrap" id="actionbar" aria-label="Next step" hidden><div class="inner" id="actions"></div></section>

<dialog id="dlg" aria-labelledby="dlgTitle"><div class="inner" id="dlgBody"></div></dialog>
<input type="file" id="filePick" accept=".json,application/json" hidden>

<script>
const D = ${data};
const $ = (id) => document.getElementById(id);
const smooth = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LVL = Object.fromEntries(D.levels.map((l, i) => [l.id, { ...l, i }]));

// ---------- saving (one versioned store; falls back to memory when the browser blocks saving) ----------
const KEY = "progress", mem = {};
let simBlocked = false;
function storageWorks() {
  if (simBlocked) return false;
  try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return true; } catch { return false; }
}
function load() {
  if (!storageWorks()) return mem[KEY] ?? null;
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return { damaged: true }; }
}
function save(p) { mem[KEY] = p; if (storageWorks()) try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
function wipe() { delete mem[KEY]; try { localStorage.removeItem(KEY); } catch {} }
const blank = () => ({ schema: D.file.schema, level: null, topics: {}, settings: { theme: "device" } });
let P = load();
if (!P || P.damaged) P = blank();

// ---------- curriculum maths (product rules) ----------
const mainIn = (lvl) => D.units.flatMap((u) => u.topics.filter((t) => D.levelOf[t] === lvl).map((t) => ({ t, u })));
const stagesFor = (lvl) => D.levels.slice(0, LVL[lvl].i + 1);
const pathTopics = (lvl) => stagesFor(lvl).flatMap((s) => mainIn(s.id).map((x) => x.t));
function summary(p, lvl = p.level) {
  if (!lvl) return { total: 0, done: 0, pct: 0, score: null };
  const ids = pathTopics(lvl), done = ids.filter((t) => p.topics[t]);
  const score = done.length ? Math.round(done.reduce((a, t) => a + p.topics[t].best, 0) / done.length) : null;
  return { total: ids.length, done: done.length, pct: Math.round(done.length / ids.length * 100), score };
}
function exampleProgress() {
  // Example data: a junior learner who skipped the fresh "Swift language" unit, passed the rest of fresh, and is in the middle of junior.
  const p = blank(); p.level = "junior"; p.settings = P.settings;
  const sc = (id) => 72 + ([...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 27);
  for (const { t, u } of mainIn("fresh")) p.topics[t] = u.id === "swift-language" ? { status: "skipped", best: 86, version: D.versions[t] } : { status: "passed", best: sc(t), version: D.versions[t] };
  for (const { t } of mainIn("junior").slice(0, 12)) p.topics[t] = { status: "passed", best: sc(t), version: D.versions[t] };
  return p;
}

// ---------- theme ----------
function applyTheme() {
  const t = P.settings?.theme ?? "device";
  if (t === "device") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t);
}

// ---------- shell ----------
let booted = false;
function chrome(bar) {
  // After a screen change, move focus to its heading so keyboard and screen reader users start at the top.
  if (booted) queueMicrotask(() => { const h = $("screen").querySelector("h1"); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } });
  $("blockedBar").hidden = storageWorks();
  $("actionbar").hidden = !bar;
  if (bar) $("actions").innerHTML = bar;
  window.scrollTo(0, 0);
}
function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.append(t); setTimeout(() => t.remove(), 3200);
}
const logo = '<svg viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="10" fill="var(--primary)"/><path d="M9 26 C 14 26, 13 12, 18 12 S 22 22, 27 10" fill="none" stroke="var(--primary-foreground)" stroke-width="3" stroke-linecap="round"/><circle cx="9" cy="26" r="3" fill="var(--primary-foreground)"/><circle cx="27" cy="10" r="3" fill="var(--primary-foreground)"/></svg>';

// ---------- S1 Welcome ----------
function welcome() {
  chrome('<span class="small">Takes about 1 minute</span><button class="btn btn-primary" type="button" id="go">Choose my level</button>');
  $("screen").innerHTML =
    '<div class="hero"><div class="brandmark">' + logo + '<span>' + esc(D.brand.name) + '</span></div>' +
    '<h1>Get ready for your iOS interview, one stop at a time.</h1>' +
    '<p>' + esc(D.brand.tagline) + '. Pick your level and follow a path of topics, from the basics to the hard questions interviewers ask.</p></div>' +
    '<ul class="facts"><li>Free</li><li>No account</li><li>Progress stays in this browser</li></ul>' +
    '<div class="card"><h2>How it works</h2><ol class="steps3">' +
    '<li><div><b>Read a short lesson</b><p class="small">Simple words, pictures and real code. About 10 minutes.</p></div></li>' +
    '<li><div><b>Take the exam</b><p class="small">10 questions. You see the right answer after each one. Pass with ' + D.rules.pass + '%.</p></div></li>' +
    '<li><div><b>Go to the next stop</b><p class="small">Passing opens the next topic. At the end you get your total result.</p></div></li></ol></div>' +
    '<p class="small">Have a progress file from another browser? <button class="btn-link" type="button" data-act="import">Import it</button></p>';
  $("go").addEventListener("click", () => picker());
}

// ---------- S2 Level picker (+ self-check) ----------
let suggested = null;
function picker(fromSettings) {
  const cur = P.level, chosen = cur ?? suggested ?? null;
  chrome('<span class="small" id="pickNote">' + (cur ? "Your progress is kept." : "You can change it any time.") + '</span><button class="btn btn-primary" type="button" id="usePick"' + (chosen ? "" : " disabled") + '>' + (cur ? "Save my level" : "Start my path") + '</button>');
  $("screen").innerHTML =
    (fromSettings ? '<p><button class="btn-link" type="button" id="back">Back to progress</button></p>' : '') +
    '<div class="hero"><p class="eyebrow">' + (cur ? "Change level" : "Step 1 of 1") + '</p><h1>Which level fits you now?</h1>' +
    '<p>Each level includes the topics of the levels before it. If you already know them, you can skip them with a short test.</p></div>' +
    '<div class="notice notice-info"><b class="t">Not sure?</b><p>Tick the things you can do, and we suggest a level.</p><div class="row"><button class="btn btn-ghost" type="button" id="openCheck">Check what I can do</button></div></div>' +
    '<section class="card selfcheck" id="selfcheck" hidden aria-labelledby="scTitle"><h2 id="scTitle">What can you do?</h2><p class="small">Be honest. Nobody sees this but you.</p>' +
    D.levels.map((l) => '<fieldset><legend>' + esc(l.title) + '</legend>' + l.selfCheck.map((s, i) => '<label class="tick"><input type="checkbox" data-l="' + l.id + '" data-i="' + i + '"><span>' + esc(s) + '</span></label>').join("") + '</fieldset>').join("") +
    '<div class="notice notice-ok suggest" id="sugBox" aria-live="polite"></div></section>' +
    '<fieldset class="levels"><legend class="eyebrow" style="margin-bottom:6px">Levels</legend>' +
    D.levels.map((l, li) => {
      const n = pathTopics(l.id).length, inc = li ? " Includes " + D.levels.slice(0, li).map((x) => x.title).join(", ") + "." : "";
      return '<label class="lvl" style="--lc:var(--level-' + l.id + ')"><input type="radio" name="lvl" value="' + l.id + '"' + (chosen === l.id ? " checked" : "") + '>' +
        '<span class="body"><span class="top"><span class="name">' + esc(l.title) + '</span>' + (cur === l.id ? '<span class="tag tag-now">Your level</span>' : '') +
        '<span class="tag tag-sug" data-sug="' + l.id + '"' + (suggested === l.id ? "" : " hidden") + '>Suggested</span></span>' +
        '<b>' + esc(l.summary) + '</b><span>' + esc(l.description) + '</span><span class="small num">' + n + ' topics.' + inc + '</span></span>' +
        '<details class="can"><summary>You are here if you can…</summary><ul>' + l.selfCheck.map((s) => '<li>' + esc(s) + '</li>').join("") + '</ul></details></label>';
    }).join("") + '</fieldset>';
  $("back")?.addEventListener("click", () => progress());
  $("openCheck").addEventListener("click", () => { $("selfcheck").hidden = false; updateSuggestion(); $("scTitle").scrollIntoView({ behavior: smooth(), block: "start" }); });
  $("selfcheck").addEventListener("change", updateSuggestion);
  document.querySelectorAll('input[name="lvl"]').forEach((r) => r.addEventListener("change", () => {
    $("usePick").disabled = false;
    if (cur && r.value !== cur) $("pickNote").textContent = "Your progress is kept. " + summary(P, r.value).done + " topics done on this path.";
  }));
  $("usePick").addEventListener("click", () => {
    const v = document.querySelector('input[name="lvl"]:checked')?.value; if (!v) return;
    const changed = cur && cur !== v; P.level = v; save(P);
    if (changed) { toast("Your level is now " + LVL[v].title + ". Your progress is kept."); progress(); } else ready();
  });
}
function updateSuggestion() {
  // Go up the levels; a level counts when at least half of its self-check is ticked. Suggest the highest level in an unbroken run.
  let s = "fresh", lines = [];
  for (const [li, l] of D.levels.entries()) {
    const boxes = [...document.querySelectorAll('[data-l="' + l.id + '"]')], on = boxes.filter((b) => b.checked).length;
    lines.push(l.title + ": " + on + " of " + boxes.length);
    if (on / boxes.length >= D.selfCheckShare && (li === 0 || s === D.levels[li - 1].id)) s = l.id;
  }
  const any = document.querySelectorAll('#selfcheck input:checked').length;
  suggested = any ? s : null;
  document.querySelectorAll("[data-sug]").forEach((t) => t.hidden = t.dataset.sug !== suggested);
  $("sugBox").innerHTML = suggested
    ? '<b class="t">Suggested level: ' + esc(LVL[s].title) + '</b><p class="small">' + lines.join(" · ") + '</p><div class="row"><button class="btn btn-primary" type="button" id="useSug">Use ' + esc(LVL[s].title) + '</button></div>'
    : '<p>Tick at least one thing to see a suggestion.</p>';
  $("useSug")?.addEventListener("click", () => {
    const r = document.querySelector('input[name="lvl"][value="' + s + '"]'); r.checked = true; r.dispatchEvent(new Event("change"));
    r.closest(".lvl").scrollIntoView({ behavior: smooth(), block: "center" }); r.focus({ preventScroll: true });
  });
}

// ---------- after picking: the path is ready (the real path map is the step 3.4 prototype) ----------
function ready() {
  const l = LVL[P.level], s = summary(P);
  chrome('<button class="btn btn-ghost" type="button" id="toSettings">Progress and settings</button><a class="btn btn-primary" href="' + D.links.path + '" target="_blank" rel="noopener">Open my path</a>');
  $("screen").innerHTML =
    '<div class="hero"><p class="eyebrow">Your path</p><h1>Your ' + esc(l.title.toLowerCase()) + ' path is ready.</h1>' +
    '<p>' + s.total + ' topics in ' + stagesFor(l.id).length + (stagesFor(l.id).length === 1 ? " stage" : " stages") + ': ' + stagesFor(l.id).map((x) => x.title).join(", ") + '. Your first stop is open.</p></div>' +
    (l.i ? '<div class="notice notice-info"><b class="t">Already know the basics?</b><p>Skip a stage with a short test. Pass with ' + D.rules.skip + '% and its topics count as done.</p></div>' : '') +
    '<p class="small">In the app, this goes straight to the path map. In this prototype, the path map is a separate page.</p>';
  $("toSettings").addEventListener("click", () => progress());
}

// ---------- S11 Progress and settings ----------
function progress() {
  if (!P.level) { P = exampleProgress(); save(P); }
  const s = summary(P), lvl = LVL[P.level];
  chrome(null);
  const stageBlock = (st) => {
    const items = mainIn(st.id), done = items.filter((x) => P.topics[x.t]), pct = Math.round(done.length / items.length * 100);
    const us = D.units.map((u) => ({ u, ids: items.filter((x) => x.u.id === u.id).map((x) => x.t) })).filter((x) => x.ids.length);
    return '<details class="stage" style="--lc:var(--level-' + st.id + ')"><summary><span class="stage-name">' + esc(st.title) + '</span><span class="small num">' + done.length + ' of ' + items.length + ' <span class="chev" aria-hidden="true">▾</span></span><span class="bar" aria-hidden="true"><span style="width:' + pct + '%"></span></span></summary>' +
      us.map(({ u, ids }) => {
        const d = ids.filter((t) => P.topics[t]), avg = d.length ? Math.round(d.reduce((a, t) => a + P.topics[t].best, 0) / d.length) : null;
        const skipped = d.length && d.every((t) => P.topics[t].status === "skipped");
        return '<div class="urow"><span>' + esc(u.title) + (skipped ? ' <span class="small">· skipped</span>' : '') + '</span><span class="small num">' + d.length + '/' + ids.length + (avg != null ? ' · ' + avg + '%' : '') + '</span><span class="bar" aria-hidden="true"><span style="width:' + Math.round(d.length / ids.length * 100) + '%"></span></span></div>';
      }).join("") + '</details>';
  };
  $("screen").innerHTML =
    '<div class="hero"><p class="eyebrow">Progress and settings</p><h1>Your progress</h1></div>' +
    '<div class="card"><div class="row" style="justify-content:space-between"><span><span class="small">Level</span><br><b style="font-size:1.25rem">' + esc(lvl.title) + '</b></span><button class="btn btn-ghost" type="button" id="chg">Change level</button></div></div>' +
    (s.done === 0
      ? '<div class="card" style="text-align:center;justify-items:center"><svg class="big-icon" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="var(--secondary)"/><path d="M16 38 C 22 38, 22 20, 28 20 S 34 32, 40 18" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"/><circle cx="16" cy="38" r="4" fill="var(--primary)"/></svg><h2>No topics done yet</h2><p>Your first stop is waiting. Read the lesson, then take the exam.</p><a class="btn btn-primary" href="' + D.links.path + '" target="_blank" rel="noopener">Go to my path</a></div>'
      : '<div class="stats"><div class="stat"><span class="small">Progress</span><b class="num">' + s.pct + '%</b></div><div class="stat"><span class="small">Path score</span><b class="num">' + s.score + '%</b></div><div class="stat"><span class="small">Topics done</span><b class="num">' + s.done + '<span class="small">/' + s.total + '</span></b></div></div>' +
        '<p class="small">Progress = topics done ÷ all main topics. Path score = the average of your done topics. Bonus topics count in neither.</p>' +
        '<div class="card"><h2>By stage</h2>' + stagesFor(P.level).map(stageBlock).join("") + '</div>') +
    '<div class="card"><h2>Keep your progress safe</h2><p>Your progress is saved in this browser only. To use another browser or device, export a file here and import it there.</p>' +
    '<div class="row"><button class="btn btn-primary" type="button" data-act="export">Export progress</button><button class="btn btn-ghost" type="button" data-act="import">Import progress</button></div></div>' +
    '<div class="card"><h2>Appearance</h2><fieldset class="seg" id="theme"><legend>Theme</legend>' +
    [["light", "Light"], ["dark", "Dark"], ["device", "Device"]].map(([v, t]) => '<label><input type="radio" name="theme" value="' + v + '"' + ((P.settings?.theme ?? "device") === v ? " checked" : "") + '>' + t + '</label>').join("") +
    '</fieldset><p class="small">"Device" follows the light or dark setting of your phone or computer.</p></div>' +
    '<div class="card danger-zone"><h2>Reset progress</h2><p>Delete all your progress in this browser and start again. Your theme stays.</p><div class="row"><button class="btn btn-ghost" type="button" id="reset">Reset progress…</button></div></div>' +
    '<p><button class="btn-link" type="button" id="about">About this app and your privacy</button></p>' +
    '<p class="small">Prototype tools: <button class="btn-link" type="button" id="demoEmpty">Show with no progress</button> · <button class="btn-link" type="button" id="demoFull">Show example progress</button></p>';
  $("chg").addEventListener("click", () => picker(true));
  $("reset").addEventListener("click", resetDialog);
  $("about").addEventListener("click", () => select("About"));
  $("theme").addEventListener("change", (e) => { P.settings = { ...P.settings, theme: e.target.value }; save(P); applyTheme(); });
  $("demoEmpty").addEventListener("click", () => { P = { ...blank(), level: P.level, settings: P.settings }; save(P); progress(); });
  $("demoFull").addEventListener("click", () => { P = exampleProgress(); save(P); progress(); });
}

// ---------- export ----------
function fileFor(p) {
  return { app: D.file.app, kind: D.file.kind, schema: D.file.schema, exportedAt: new Date().toISOString(), level: p.level, topics: p.topics, settings: p.settings };
}
// The artifact viewer only allows downloads through its "downloads" capability; a normal page uses a link.
async function exportProgress() {
  const f = fileFor(P), name = D.brand.fileSlug + "-progress-" + f.exportedAt.slice(0, 10) + ".json";
  const text = JSON.stringify(f, null, 2);
  const downloads = window.claude?.use ? await window.claude.use("downloads").catch(() => null) : null;
  let saved = true;
  if (downloads) {
    try { await downloads.save({ filename: name, data: text }); } catch (e) { saved = false; if (e?.code === "declined") { toast("Nothing was saved."); return; } }
  } else {
    try {
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name; a.hidden = true; a.hidden = true;
      document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    } catch { saved = false; }
  }
  const s = summary(P);
  openDialog('<h2 id="dlgTitle">' + (saved ? "Your progress file is ready" : "We could not save the file") + '</h2>' +
    '<p>' + (saved ? 'We saved <b>' + esc(name) + '</b> to your downloads. ' : 'Copy the file below instead. ') + 'It has ' + s.done + ' topics done' + (P.level ? ' on the ' + esc(LVL[P.level].title.toLowerCase()) + ' path' : '') + '.</p>' +
    '<p class="small">To use it in another browser: open this app there, go to Progress and settings, and choose Import progress.</p>' +
    '<details><summary class="small" style="cursor:pointer;min-height:36px;display:flex;align-items:center">Did the download not start? Show the file</summary><pre class="file" tabindex="0">' + esc(text) + '</pre><p class="small">Copy all of this into a file named ' + esc(name) + '.</p></details>' +
    '<div class="row"><button class="btn btn-primary" type="button" data-close>Done</button></div>');
}

// ---------- import ----------
function checkFile(text, bytes) {
  // Returns { error } or { file, dropped }. Messages are learner text (plain English).
  if (bytes > D.file.maxBytes) return { error: ["This file is too big", "A progress file is small. Choose the .json file you exported from this app."] };
  let f; try { f = JSON.parse(text); } catch { return { error: ["We could not read this file", "Choose the .json file you exported from this app. Do not change the file before you import it."] }; }
  if (!f || f.app !== D.file.app || f.kind !== D.file.kind) return { error: ["This is not a progress file", "This file did not come from this app. Choose the file you got from Export progress."] };
  if (!(f.schema >= 1)) return { error: ["This file is damaged", "Some parts of the file are missing. Export a new file and try again."] };
  if (f.schema > D.file.schema) return { error: ["This file is from a newer version", "Reload this page to get the newest version of the app, then try again."] };
  if (f.level != null && !LVL[f.level]) return { error: ["This file is damaged", "The level in this file is not known. Export a new file and try again."] };
  const topics = {}, dropped = [];
  for (const [t, r] of Object.entries(f.topics ?? {})) {
    if (!D.titles[t]) { dropped.push(t); continue; }
    if (!r || !(r.best >= 0 && r.best <= 100) || !["passed", "skipped"].includes(r.status)) { dropped.push(t); continue; }
    topics[t] = { status: r.status, best: Math.round(r.best), version: r.version ?? 1 };
  }
  return { file: { schema: D.file.schema, level: f.level ?? null, topics, settings: { theme: ["light", "dark", "device"].includes(f.settings?.theme) ? f.settings.theme : "device" } }, dropped, exportedAt: f.exportedAt };
}
function importStart() { $("filePick").value = ""; $("filePick").click(); }
$("filePick").addEventListener("change", async (e) => {
  const file = e.target.files[0]; if (!file) return;
  const text = file.size > D.file.maxBytes ? "" : await file.text();
  importPreview(checkFile(text, file.size));
});
function importPreview(res) {
  if (res.error) {
    openDialog('<div class="notice notice-warn" role="alert"><b class="t" id="dlgTitle">' + esc(res.error[0]) + '</b><p>' + esc(res.error[1]) + '</p></div><p class="small">Nothing changed. Your progress is the same as before.</p>' +
      '<div class="row"><button class="btn btn-primary" type="button" data-act="import">Choose another file</button><button class="btn btn-ghost" type="button" data-close>Cancel</button></div>');
    return;
  }
  const nf = res.file, a = summary(P), b = summary(nf), when = res.exportedAt ? new Date(res.exportedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : "an unknown date";
  const box = (h, p, s, cls) => '<div class="' + cls + '"><span class="eyebrow">' + h + '</span><b>' + (p.level ? esc(LVL[p.level].title) : "No level") + '</b><span class="num">' + s.done + ' topics done</span><span class="small num">' + (s.score != null ? "Path score " + s.score + "%" : "No scores yet") + '</span></div>';
  openDialog('<h2 id="dlgTitle">Replace your progress?</h2><p>This file was exported on ' + esc(when) + '.</p>' +
    '<div class="compare">' + box("Now in this browser", P, a, "") + box("In the file", nf, b, "new") + '</div>' +
    (res.dropped.length ? '<p class="small">' + res.dropped.length + (res.dropped.length === 1 ? " topic" : " topics") + ' in the file no longer exist or are damaged. We will leave them out.</p>' : '') +
    '<p><b>Your progress in this browser will be replaced by the file.</b> This cannot be undone.</p>' +
    (summary(P).done ? '<p class="small">Want a copy of your current progress first? <button class="btn-link" type="button" data-act="export">Export it</button></p>' : '') +
    '<div class="row"><button class="btn btn-primary" type="button" id="doImport">Replace my progress</button><button class="btn btn-ghost" type="button" data-close>Cancel</button></div>');
  $("doImport").addEventListener("click", () => { P = nf; save(P); applyTheme(); closeDialog(); toast("Progress imported: " + b.done + " topics done."); progress(); });
}

// ---------- reset ----------
function resetDialog() {
  const s = summary(P);
  openDialog('<h2 id="dlgTitle">Delete all your progress?</h2>' +
    '<p>This deletes <b>' + s.done + ' topics done</b>, your scores and your level in this browser. <b>It cannot be undone.</b></p>' +
    '<div class="notice notice-info"><p>Keep a copy first, so you can import it later.</p><div class="row"><button class="btn btn-ghost" type="button" data-act="export">Export progress</button></div></div>' +
    '<label for="confirm" style="font-weight:600">Type RESET to confirm</label><input type="text" id="confirm" autocomplete="off" autocapitalize="characters" spellcheck="false">' +
    '<div class="row"><button class="btn btn-danger" type="button" id="doReset" disabled>Delete my progress</button><button class="btn btn-ghost" type="button" data-close>Cancel</button></div>');
  $("confirm").addEventListener("input", (e) => { $("doReset").disabled = e.target.value.trim().toUpperCase() !== "RESET"; });
  $("doReset").addEventListener("click", () => { const theme = P.settings?.theme; wipe(); suggested = null; P = blank(); P.settings.theme = theme ?? "device"; save(P); closeDialog(); select("First visit"); toast("Your progress was deleted."); });
}

// ---------- dialogs ----------
let opener = null;
function openDialog(html) {
  const d = $("dlg"); if (!d.open) opener = document.activeElement;
  $("dlgBody").innerHTML = html;
  if (!d.open) d.showModal();
  d.querySelector("h2, b.t, button")?.setAttribute("tabindex", "-1");
  d.querySelector("h2, b.t")?.focus();
}
function closeDialog() { $("dlg").close(); }
$("dlg").addEventListener("close", () => opener?.focus?.());
$("dlg").addEventListener("click", (e) => { if (e.target.closest("[data-close]") || e.target === $("dlg")) closeDialog(); });
document.addEventListener("click", (e) => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "export") exportProgress();
  if (act === "import") { if ($("dlg").open) closeDialog(); importStart(); }
});

// ---------- S12 About ----------
function about() {
  chrome(null);
  $("screen").innerHTML =
    '<div class="hero"><p class="eyebrow">About</p><h1>About ' + esc(D.brand.name) + '</h1><p>' + esc(D.brand.tagline) + '. It is free and open to everyone.</p></div>' +
    '<div class="card"><h2>What it is</h2><p>A path of topics for iOS interviews at five levels: ' + D.levels.map((l) => l.title).join(", ") + '. Each topic has a short lesson and an exam. You get a result for each topic and a total result for your path.</p></div>' +
    '<div class="card"><h2>Where the content comes from</h2><p>Every lesson lists its sources at the end. Most sources are official: Apple Developer documentation, the Swift documentation and the Swift project. For some topics, like coding interviews and system design, we also use trusted community sources. Each source is marked "official" or "community".</p><p>We check the facts on every topic. When a topic changes, it shows an "Updated" note, and your pass stays.</p></div>' +
    '<div class="card"><h2>Your privacy</h2><ul><li>There is no account. We do not ask for your name or email.</li><li>Your progress is saved only in this browser, on this device.</li><li>If you clear your browser data, your progress is deleted. Export a file to keep a copy.</li></ul></div>' +
    '<div class="card"><h2>Not made by Apple</h2><p class="small">This app is not made, supported or approved by Apple. iOS, Swift, Xcode, iPhone and iPad are trademarks of Apple Inc.</p></div>';
}

// ---------- States ----------
function states() {
  chrome(null);
  $("screen").innerHTML =
    '<div class="hero"><p class="eyebrow">States</p><h1>Empty, loading and error states</h1><p class="small">Each card shows how the app looks in that state.</p></div>' +
    '<h2 class="state-h">Loading the path</h2><div class="card" aria-busy="true"><p role="status" class="small">Loading your path…</p><div class="skel" style="height:22px;width:55%"></div><div class="skel" style="height:64px"></div><div class="skel" style="height:64px;width:85%;justify-self:end"></div><div class="skel" style="height:64px;width:85%"></div></div>' +
    '<p class="small">Shown only if loading takes more than half a second. With reduced motion, the gray blocks do not pulse.</p>' +
    '<h2 class="state-h">No progress yet</h2><p class="small">On the progress page, before the first exam. Open "Progress and settings", then "Show with no progress".</p>' +
    '<h2 class="state-h">The browser blocks saving</h2><p class="small">Tick "Pretend the browser blocks saving" above. A banner shows on every screen, and Export still works.</p>' +
    '<div class="notice notice-warn"><b class="t">Your progress is not being saved</b><p>This browser blocks saving. This often happens in a private window. When you close this page, your progress is lost. Export a file to keep it.</p></div>' +
    '<h2 class="state-h">Saved progress cannot be read</h2><div class="notice notice-warn" role="alert"><b class="t">We could not read your saved progress</b><p>Something changed your saved data. If you have a progress file, import it. If not, you can start again.</p><div class="row"><button class="btn btn-primary" type="button" data-act="import">Import a file</button><button class="btn btn-ghost" type="button">Start again</button></div></div>' +
    '<h2 class="state-h">Import errors</h2><p class="small">Try a sample file. Each one opens the real import check.</p><div class="row">' +
    '<button class="btn btn-ghost" type="button" data-sample="good">A good file</button><button class="btn btn-ghost" type="button" data-sample="broken">A broken file</button><button class="btn btn-ghost" type="button" data-sample="other">A file from another app</button><button class="btn btn-ghost" type="button" data-sample="newer">A file from a newer version</button><button class="btn btn-ghost" type="button" data-sample="old">A file with removed topics</button></div>' +
    '<h2 class="state-h">Page not found</h2><div class="card" style="text-align:center;justify-items:center"><svg class="big-icon" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="var(--secondary)"/><path d="M14 36 C 20 36, 20 22, 26 22" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round"/><path d="M32 22 h10" stroke="var(--muted-foreground)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 5"/><circle cx="14" cy="36" r="4" fill="var(--primary)"/></svg><h2>This page is not on the path</h2><p>The link may be old, or the topic may have moved. Your progress is safe.</p><a class="btn btn-primary" href="' + D.links.path + '" target="_blank" rel="noopener">Go to my path</a></div>';
  document.querySelectorAll("[data-sample]").forEach((b) => b.addEventListener("click", () => {
    const ex = exampleProgress(), f = fileFor(ex), k = b.dataset.sample;
    let text = JSON.stringify(f);
    if (k === "broken") text = text.slice(0, 120);
    if (k === "other") text = JSON.stringify({ name: "My notes", items: [1, 2, 3] });
    if (k === "newer") text = JSON.stringify({ ...f, schema: D.file.schema + 1 });
    if (k === "old") text = JSON.stringify({ ...f, topics: { ...f.topics, "objective-c-basics": { status: "passed", best: 90 }, "old-topic": { status: "passed", best: 80 } } });
    importPreview(checkFile(text, text.length));
  }));
}

// ---------- prototype screen switcher ----------
const SCREENS = [["First visit", welcome], ["Level picker", () => picker(false)], ["Progress and settings", progress], ["About", about], ["States", states]];
function select(name) {
  [...$("screens").children].forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === name)));
  SCREENS.find(([n]) => n === name)[1]();
}
SCREENS.forEach(([name]) => {
  const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = name;
  b.addEventListener("click", () => select(name));
  $("screens").append(b);
});
$("simBlocked").addEventListener("change", (e) => { simBlocked = e.target.checked; $("blockedBar").hidden = storageWorks(); });
applyTheme();
select(P.level ? "Progress and settings" : "First visit");
booted = true;
</script>
`;
writeFileSync("docs/design/start-prototype.html", page);
console.log(`docs/design/start-prototype.html: ${(page.length / 1024).toFixed(0)} KB, ${levels.length} levels`);
