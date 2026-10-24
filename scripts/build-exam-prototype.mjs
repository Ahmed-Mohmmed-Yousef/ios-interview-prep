// Phase 3 prototype: exam (S6), topic result (S7), skip test + result (S8, S9) and path complete (S10).
// Uses the real pilot question bank, content/rules.json, the curriculum and the design tokens.
// Writes docs/design/exam-prototype.html. Usage: node scripts/build-exam-prototype.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const brand = read("config/brand.json");
const rules = read("content/rules.json");
const pilotId = "structs-vs-classes";
const pilot = read(`content/topics/${pilotId}/topic.json`);
const bank = read(`content/topics/${pilotId}/questions.json`);
const levels = read("content/levels.json").levels.map(({ id, title }) => ({ id, title }));
const units = read("content/units.json").units.map(({ id, title, topics }) => ({ id, title, topics }));
const titles = {}, levelOf = {};
for (const id of readdirSync("content/topics")) { const t = read(`content/topics/${id}/topic.json`); titles[id] = t.title; levelOf[id] = t.level; }
const tokensCss = readFileSync("config/generated/tokens.css", "utf8").replace(/@theme inline \{[\s\S]*?\n\}\n/, "");

const data = JSON.stringify({
  topic: { id: pilotId, title: pilot.title, next: "properties", nextTitle: titles.properties },
  questions: bank.questions.filter((q) => !q.retired).map(({ sources, verify, verifyStarter, lessonSection, ...q }) => q),
  rules: { pass: rules.topicPassMark, skip: rules.skipPassMark, size: rules.topicExamSize, scoring: rules.rubricScoring, readiness: rules.readiness },
  mix: { mcq: 5, "code-reading": 3, written: 1, "code-write": 1 },
  levels, units, titles, levelOf,
  links: { path: "https://claude.ai/artifact/KnAK3X8Tj4FxQopL1Mnrx6", lesson: "https://claude.ai/artifact/PVy3so2N1oD2SrhoSVSLwz" },
}).replace(/</g, "\\u003c");

const page = `<title>Exam and Results Prototype</title>
<script>document.documentElement.lang = "en";</script>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${brand.fonts.body.replace(/ /g, "+")}:wght@400;600;700&family=${brand.fonts.code.replace(/ /g, "+")}:wght@400;600&display=swap">
<style>
${tokensCss}
/* Layout: a prototype screen switcher on top, then one screen at a time in a centered column. Exam screens have a sticky header and a sticky action bar. */
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
p { margin: 0; max-width: var(--reading-width); }
.small { font-size: .875rem; line-height: 1.375rem; color: var(--muted-foreground); }
.eyebrow { font-size: .75rem; line-height: 1.25rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted-foreground); }
.num { font-variant-numeric: tabular-nums; }
code { font-family: var(--font-code); font-size: .9em; background: var(--code); padding: 1px 5px; border-radius: 6px; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr); box-shadow: var(--shadow-card); }
.btn { font: 600 1rem var(--font-body); border-radius: 999px; padding: 0 20px; min-height: var(--touch-target); border: 1.5px solid transparent; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
.btn-primary { background: var(--primary); color: var(--primary-foreground); }
.btn-secondary { background: var(--secondary); color: var(--secondary-foreground); }
.btn-ghost { background: transparent; color: var(--foreground); border-color: var(--border); }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.badge { display: inline-flex; gap: 6px; align-items: center; font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; border-radius: 999px; padding: 3px 10px; border: 1.5px solid currentColor; }
.b-pass { color: var(--success); } .b-notyet { color: var(--warn); } .b-type { color: var(--muted-foreground); }

.switcher { background: var(--secondary); padding-block: 10px; }
.switcher .chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 600 .8125rem var(--font-body); color: var(--foreground); background: var(--card); border: 1.5px solid var(--border); border-radius: 999px; padding: 5px 11px; min-height: 34px; cursor: pointer; }
.chip[aria-pressed="true"] { background: var(--foreground); color: var(--background); border-color: var(--foreground); }

.ex-top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 4; background: var(--card); border-bottom: 1px solid var(--border); padding-block: 8px 10px; }
.ex-top .inner { gap: 8px; }
.ex-head { display: flex; gap: 10px; align-items: center; justify-content: space-between; }
.ex-title { font-size: 1rem; line-height: 1.5rem; margin: 0; font-weight: 700; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.leave { font: 600 .875rem var(--font-body); color: var(--foreground); background: transparent; border: 1.5px solid var(--border); border-radius: 999px; padding: 6px 12px; min-height: 36px; cursor: pointer; flex: none; }
.bar { height: 8px; background: var(--muted); border-radius: 999px; overflow: hidden; }
.bar > span { display: block; height: 100%; background: var(--primary); transition: width var(--duration-normal) var(--ease-calm); }
.ex-meta { display: flex; justify-content: space-between; gap: 8px; }
main { padding-block: 18px 130px; }
.q-text { font-size: 1.3125rem; line-height: 1.875rem; font-weight: 600; text-wrap: balance; }
pre.code { margin: 0; font: .875rem/1.5rem var(--font-code); background: var(--code); border-radius: calc(var(--radius) * .9); padding: 12px 14px; overflow-x: auto; }
pre.code.model { background: var(--card); border: 1px solid var(--border); }
.opts { display: grid; gap: 8px; }
.opt { display: grid; grid-template-columns: 2em minmax(0, 1fr) auto; gap: 8px; align-items: center; text-align: left; font: 400 1rem/1.5rem var(--font-body); color: var(--foreground);
  background: var(--card); border: 1.5px solid var(--border); border-radius: calc(var(--radius) * .9); padding: 10px 12px; min-height: var(--touch-target); cursor: pointer; }
.opt:hover:not(:disabled) { border-color: var(--foreground); }
.opt:disabled { cursor: default; }
.opt .id { font-weight: 700; color: var(--muted-foreground); }
.opt .mark { font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.opt.picked { border-color: var(--primary); background: var(--secondary); }
.opt.right { border-color: var(--success); background: var(--success-soft); } .opt.right .mark { color: var(--success); }
.opt.wrong { border-color: var(--warn); background: var(--warn-soft); } .opt.wrong .mark { color: var(--warn); }
textarea { width: 100%; min-height: 9em; font: 1rem/1.5rem var(--font-body); color: var(--foreground); background: var(--card); border: 1.5px solid var(--input); border-radius: calc(var(--radius) * .9); padding: 10px 12px; }
textarea.code-in { font-family: var(--font-code); font-size: .875rem; }
.fb { border-radius: var(--radius); padding: 14px 16px; display: grid; gap: 8px; }
.fb.ok { background: var(--success-soft); } .fb.no { background: var(--warn-soft); } .fb.neutral { background: var(--card); border: 1px solid var(--border); }
.crit { border: 1px solid var(--border); border-radius: calc(var(--radius) * .8); padding: 8px 12px; margin: 0; display: flex; flex-wrap: wrap; gap: 4px 16px; background: var(--card); }
.crit legend { display: flex; justify-content: space-between; gap: 10px; width: 100%; padding: 0; float: left; margin-bottom: 4px; }
.crit label { display: inline-flex; gap: 6px; align-items: center; min-height: 36px; cursor: pointer; }
.key { color: var(--primary); font-size: .6875rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.actionbar { position: fixed; inset: auto 0 0 0; z-index: 4; background: var(--card); border-top: 1px solid var(--border); padding-block: 10px calc(10px + env(safe-area-inset-bottom, 0px)); }
.actionbar .inner { display: flex; gap: 10px; justify-content: flex-end; }
.actionbar .btn { flex: 1; max-width: 340px; }

.score { font-size: 3.5rem; line-height: 1; font-weight: 700; margin: 0; }
.score.pass { color: var(--success); } .score.notyet { color: var(--warn); }
.resulthead { display: grid; gap: 8px; justify-items: start; }
.celebrate { width: 64px; height: 64px; }
.celebrate .ring { fill: var(--success); }
.celebrate .tick { fill: none; stroke: var(--success-foreground); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw var(--duration-slow) var(--ease-calm) var(--duration-normal) forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .celebrate .tick { animation: none; stroke-dashoffset: 0; } }
.review { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.review li { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--border); border-radius: 0 var(--radius) var(--radius) 0; padding: 12px 14px; display: grid; gap: 6px; }
.review li.r-wrong { border-left-color: var(--warn); } .review li.r-right { border-left-color: var(--success); } .review li.r-self { border-left-color: var(--primary); }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
.stat { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 12px; display: grid; gap: 2px; }
.stat b { font-size: 1.3125rem; }
.ready { border-radius: var(--radius); padding: 14px 16px; display: grid; gap: 6px; }
.ready.r1 { background: var(--success-soft); } .ready.r2 { background: var(--secondary); }
.breakdown { display: grid; gap: 8px; }
.brow { display: grid; grid-template-columns: minmax(0, 1fr) 3.5em; gap: 4px 10px; align-items: center; }
.brow .bar { grid-column: 1 / -1; height: 6px; }
.stage-h { font-weight: 700; margin-top: 8px; }
.banner { background: var(--secondary); border-radius: var(--radius); padding: 12px 14px; display: grid; gap: 8px; }
</style>

<aside class="switcher wrap" aria-label="Prototype controls"><div class="inner">
  <span class="small"><b>Prototype.</b> Pick a screen. Exams use the real pilot questions. Path results use example scores.</span>
  <div class="chips" id="screens"></div>
</div></aside>

<!-- S6 Exam (start, questions) -->
<header id="examTop" class="ex-top wrap" hidden><div class="inner">
  <div class="ex-head"><h1 class="ex-title" id="exTitle"></h1><button class="leave" type="button" id="leave">Save and leave</button></div>
  <div class="bar" aria-hidden="true"><span id="exBar" style="width:0"></span></div>
  <div class="ex-meta small"><span id="exCount" class="num"></span><span id="exType"></span></div>
</div></header>
<main class="wrap"><div class="inner" id="screen"></div></main>
<section class="actionbar wrap" id="actionbar" aria-label="Next step" hidden><div class="inner" id="actions"></div></section>

<script>
const D = ${data};
const $ = (id) => document.getElementById(id);
const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }, del(k) { try { localStorage.removeItem(k); } catch {} } };
const mem = {}; // fallback when storage is blocked
const saved = (k) => store.get(k) ?? mem[k] ?? null;
const keep = (k, v) => { mem[k] = v; store.set(k, v); };
const drop = (k) => { delete mem[k]; store.del(k); };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const md = (s) => esc(s).replace(/\\x60([^\\x60]+)\\x60/g, "<code>$1</code>");
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const KIND = { mcq: "Multiple choice", "code-reading": "Read the code", written: "Written answer", "code-write": "Write code" };

// ---------- scoring (rules.json) ----------
function rubricScore(rubric, marks) {
  const s = D.rules.scoring; let total = 0, keyMissed = false;
  rubric.forEach((r, i) => { const m = marks[i] === 1 ? s.met : marks[i] === 0.5 ? s.partlyMet : s.notMet; total += r.weight * m; if (r.key && m === s.notMet) keyMissed = true; });
  total = Math.round(total);
  return { self: keyMissed ? Math.min(total, s.keyMissedCap) : total, capped: keyMissed && total > s.keyMissedCap };
}

// ---------- exam engine (used by the topic exam and the skip test) ----------
let run = null;
function pick(mix, avoid) {
  const out = [];
  for (const [type, n] of Object.entries(mix)) {
    const pool = shuffle(D.questions.filter((q) => q.type === type));
    out.push(...[...pool.filter((q) => !avoid.has(q.id)), ...pool.filter((q) => avoid.has(q.id))].slice(0, n));
  }
  const auto = shuffle(out.filter((q) => q.options)), open = out.filter((q) => !q.options);
  // Shuffle the options of every question (user decision); letters follow the new order.
  return [...auto, ...open].map((q) => q.options ? { ...q, shown: shuffle(q.options) } : q);
}
function startRun(kind) {
  const last = new Set(saved("lastExam") ?? []);
  const mix = kind === "skip" ? { mcq: 6, "code-reading": 4 } : D.mix;
  run = { kind, questions: pick(mix, last), i: 0, answers: [], started: Date.now(), checked: false };
  keep("lastExam", run.questions.map((q) => q.id));
  saveRun(); showQuestion();
}
function saveRun() { keep("run:" + run.kind, { ...run }); }
function resumeRun(kind) { run = saved("run:" + kind); run.checked = false; showQuestion(); }

function examChrome(on) {
  $("examTop").hidden = !on; $("actionbar").hidden = !on;
}
function setActions(html) { $("actions").innerHTML = html; }

function showQuestion() {
  const q = run.questions[run.i], n = run.questions.length;
  examChrome(true);
  $("exTitle").textContent = run.kind === "skip" ? "Skip test: Swift Language (Fresh)" : D.topic.title;
  $("exBar").style.width = (run.i / n * 100) + "%";
  $("exCount").textContent = "Question " + (run.i + 1) + " of " + n;
  $("exType").textContent = KIND[q.type];
  const s = $("screen");
  s.innerHTML = '<h2 class="q-text">' + md(q.prompt) + '</h2>' + (q.code ? '<pre class="code" tabindex="0">' + esc(q.code) + '</pre>' : '') +
    (q.options
      ? '<div class="opts" role="radiogroup" aria-label="Answer options">' + q.shown.map((o, k) => '<button type="button" class="opt" role="radio" aria-checked="false" data-id="' + o.id + '"><span class="id">' + "ABCD"[k] + '</span><span>' + md(o.text) + '</span><span class="mark"></span></button>').join("") + '</div>'
      : '<label class="small" for="answer">' + (q.type === "written" ? "Your answer, in 2 to 5 sentences. Simple English is fine; grammar does not cost points." : "Your code") + '</label>' +
        '<textarea id="answer" class="' + (q.type === "code-write" ? "code-in" : "") + '" spellcheck="' + (q.type === "written") + '">' + esc(run.draft?.[q.id] ?? q.starterCode ?? "") + '</textarea>') +
    '<div id="fb"></div>';
  if (q.options) {
    s.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
      if (run.checked) return;
      s.querySelectorAll(".opt").forEach((o) => { o.classList.toggle("picked", o === b); o.setAttribute("aria-checked", String(o === b)); });
      $("check").disabled = false;
    }));
    setActions('<button class="btn btn-primary" type="button" id="check" disabled>Check answer</button>');
    $("check").addEventListener("click", checkChoice);
  } else {
    $("answer").addEventListener("input", (e) => { run.draft = { ...(run.draft ?? {}), [q.id]: e.target.value }; saveRun(); });
    setActions('<button class="btn btn-primary" type="button" id="check">Check my answer</button>');
    $("check").addEventListener("click", checkOpen);
  }
  window.scrollTo(0, 0);
  // Focus the question, so a screen reader reads it before the options.
  const qh = s.querySelector(".q-text"); qh.tabIndex = -1; qh.focus({ preventScroll: true });
}
function nextBtn() {
  const last = run.i === run.questions.length - 1;
  setActions('<button class="btn btn-primary" type="button" id="nx">' + (last ? "See my result" : "Next question") + '</button>');
  $("nx").addEventListener("click", () => { if (last) finish(); else { run.i++; run.checked = false; saveRun(); showQuestion(); } });
  $("nx").focus({ preventScroll: true });
}
function checkChoice() {
  const q = run.questions[run.i], s = $("screen");
  const picked = s.querySelector(".opt.picked").dataset.id, right = picked === q.answer;
  run.checked = true; run.answers.push({ id: q.id, picked, right }); saveRun();
  s.querySelectorAll(".opt").forEach((o) => {
    o.disabled = true;
    if (o.dataset.id === q.answer) { o.classList.add("right"); o.querySelector(".mark").textContent = "Right"; }
    else if (o.dataset.id === picked) { o.classList.add("wrong"); o.querySelector(".mark").textContent = "Your answer"; }
  });
  const chosen = q.options.find((o) => o.id === picked), correct = q.options.find((o) => o.id === q.answer);
  const letter = "ABCD"[q.shown.findIndex((o) => o.id === q.answer)];
  $("fb").innerHTML = '<div class="fb ' + (right ? "ok" : "no") + '" role="status"><p><b>' + (right ? "Right." : "Not quite.") + '</b> ' + md(chosen.explanation.replace(/^Right\\.\\s*/, "")) + '</p>' +
    (right ? "" : '<p><b>The right answer is ' + letter + '.</b> ' + md(correct.explanation.replace(/^Right\\.\\s*/, "")) + '</p>') + '</div>';
  nextBtn();
}
function checkOpen() {
  const q = run.questions[run.i];
  $("answer").readOnly = true; run.checked = true;
  const entry = { id: q.id, self: 0, capped: false, text: $("answer").value };
  run.answers.push(entry); saveRun();
  $("fb").innerHTML = '<div class="fb neutral"><p class="eyebrow">Model answer</p>' + (q.type === "code-write" ? '<pre class="code model" tabindex="0">' + esc(q.modelAnswer) + '</pre>' : '<p>' + md(q.modelAnswer) + '</p>') +
    '<p class="eyebrow" style="margin-top:6px">Check yourself: how well does your answer cover each point?</p>' +
    q.rubric.map((r, i) => '<fieldset class="crit"><legend><span>' + (r.key ? '<span class="key">Key point</span> ' : '') + md(r.criterion) + '</span><span class="small num">' + r.weight + '</span></legend>' +
      [["1", "Yes"], ["0.5", "Partly"], ["0", "No"]].map(([v, t]) => '<label><input type="radio" name="c' + i + '" value="' + v + '"' + (v === "0" ? " checked" : "") + '> ' + t + '</label>').join("") + '</fieldset>').join("") +
    '<p id="selfScore" aria-live="polite"></p><p class="small">In the app, AI checks written and code answers (Phase 6). Until then, this self-check is shown but not counted in your score.</p></div>';
  const upd = () => { const marks = q.rubric.map((r, i) => Number(document.querySelector('input[name="c' + i + '"]:checked').value)); Object.assign(entry, rubricScore(q.rubric, marks)); saveRun();
    $("selfScore").innerHTML = "Your self-check: <b>" + entry.self + "/100</b>" + (entry.capped ? " (capped at " + D.rules.scoring.keyMissedCap + ": a key point is missing)" : ""); };
  $("fb").querySelectorAll("input").forEach((x) => x.addEventListener("change", upd)); upd();
  nextBtn();
}
$("leave").addEventListener("click", () => { saveRun(); examChrome(false); showStart(run.kind, "Saved. You can continue from question " + (run.i + 1) + " later."); });

// ---------- results ----------
function finish() {
  examChrome(false); drop("run:" + run.kind);
  const auto = run.answers.filter((a) => a.picked !== undefined), open = run.answers.filter((a) => a.picked === undefined);
  const right = auto.filter((a) => a.right).length, pct = Math.round(right / auto.length * 100);
  const minutes = Math.max(1, Math.round((Date.now() - run.started) / 60000));
  if (run.kind === "skip") return skipResult(pct, auto.length, right, minutes);
  const pass = pct >= D.rules.pass, best = Math.max(pct, saved("best") ?? 0); keep("best", best);
  const byId = Object.fromEntries(D.questions.map((q) => [q.id, q]));
  const item = (a) => { const q = byId[a.id];
    if (a.picked === undefined) return '<li class="r-self"><span class="badge b-type">' + KIND[q.type] + ' · self-check ' + a.self + '/100</span><span>' + md(q.prompt) + '</span></li>';
    const yours = q.options.find((o) => o.id === a.picked), corr = q.options.find((o) => o.id === q.answer);
    return '<li class="' + (a.right ? "r-right" : "r-wrong") + '"><span class="badge ' + (a.right ? "b-pass" : "b-notyet") + '">' + (a.right ? "Right" : "Not quite") + '</span><span>' + md(q.prompt) + '</span>' +
      (a.right ? '' : '<span class="small">Your answer: ' + md(yours.text) + '</span><span><b>Right answer:</b> ' + md(corr.text) + '</span><span class="small">' + md(corr.explanation.replace(/^Right\\.\\s*/, "")) + '</span>') + '</li>'; };
  const wrong = auto.filter((a) => !a.right), rest = run.answers.filter((a) => a.picked === undefined || a.right);
  $("screen").innerHTML =
    '<div class="resulthead">' + (pass ? '<svg class="celebrate" viewBox="0 0 64 64" aria-hidden="true"><circle class="ring" cx="32" cy="32" r="28"/><path class="tick" d="M20 33 l8 8 l16 -18"/></svg>' : '') +
    '<h1 class="eyebrow">Your result · ' + esc(D.topic.title) + '</h1><p class="score ' + (pass ? "pass" : "notyet") + ' num">' + pct + '%</p>' +
    '<p role="status"><b>' + (pass ? "You passed! The next stop is open." : "Not passed yet. You need " + D.rules.pass + "%. You can try again with new questions.") + '</b></p></div>' +
    '<div class="stats"><div class="stat"><span class="small">Right answers</span><b class="num">' + right + ' of ' + auto.length + '</b></div><div class="stat"><span class="small">Best score</span><b class="num">' + best + '%</b></div><div class="stat"><span class="small">Time</span><b class="num">' + minutes + ' min</b></div></div>' +
    open.map((a) => '<p class="small">Self-check on your ' + (byId[a.id].type === "written" ? "written" : "code") + ' answer: <b>' + a.self + '/100</b>. Not counted yet; AI grading comes in Phase 6.</p>').join("") +
    (wrong.length ? '<h2>Your mistakes</h2><ol class="review">' + wrong.map(item).join("") + '</ol>' : '<p><b>No mistakes. Well done.</b></p>') +
    '<details><summary class="btn btn-ghost" style="display:inline-flex">Show all questions</summary><ol class="review" style="margin-top:10px">' + rest.map(item).join("") + '</ol></details>' +
    '<div class="row">' + (pass ? '<a class="btn btn-primary" href="' + D.links.path + '" target="_blank" rel="noopener">Next topic: ' + esc(D.topic.nextTitle) + '</a>' : '<button class="btn btn-primary" type="button" id="again">Try again with new questions</button>') +
    (pass ? '<button class="btn btn-ghost" type="button" id="again">Take it again</button>' : '') + '<a class="btn btn-ghost" href="' + D.links.lesson + '" target="_blank" rel="noopener">Read the lesson again</a></div>';
  $("again").addEventListener("click", () => startRun("topic"));
  window.scrollTo(0, 0);
}
function skipResult(pct, n, right, minutes) {
  const pass = pct >= D.rules.skip;
  const count = D.units.find((u) => u.id === "swift-language").topics.filter((t) => D.levelOf[t] === "fresh").length;
  $("screen").innerHTML = '<div class="resulthead"><p class="eyebrow">Skip test result · Swift Language (Fresh)</p><p class="score ' + (pass ? "pass" : "notyet") + ' num">' + pct + '%</p>' +
    '<p role="status"><b>' + (pass ? "Skipped! These " + count + " topics now count as done, each with " + pct + "%." : "Not passed. You need " + D.rules.skip + "%. Nothing changed.") + '</b></p>' +
    '<p class="small">' + right + ' of ' + n + ' right · ' + minutes + ' min. ' + (pass ? "You can still open any of these lessons." : "Try again later, or take the topics one by one.") + '</p></div>' +
    '<div class="row"><a class="btn btn-primary" href="' + D.links.path + '" target="_blank" rel="noopener">Back to the path</a>' + (pass ? '' : '<button class="btn btn-ghost" type="button" id="again">Try the skip test again</button>') + '</div>';
  $("again")?.addEventListener("click", () => startRun("skip"));
  window.scrollTo(0, 0);
}

// ---------- start screens ----------
function showStart(kind, note) {
  examChrome(false);
  const r = saved("run:" + kind);
  const isSkip = kind === "skip";
  $("screen").innerHTML = (note ? '<div class="banner" role="status"><b>' + esc(note) + '</b></div>' : '') +
    '<p class="eyebrow">' + (isSkip ? "Skip test" : "Exam") + '</p><h1>' + (isSkip ? "Skip Swift Language (Fresh)" : esc(D.topic.title)) + '</h1>' +
    '<div class="card"><p><b>' + (isSkip ? "10 questions from the 13 fresh Swift Language topics. In the app the test has " + D.rules.skip + "% to pass and covers every topic." : D.rules.size + " questions: 5 multiple choice, 3 read-the-code, 1 written answer and 1 code answer.") + '</b></p>' +
    '<p>You see the right answer after each question. There is no timer. You need <b>' + (isSkip ? D.rules.skip : D.rules.pass) + '%</b> to pass' + (isSkip ? ', and then these topics count as done with your score.' : '. You can try again as often as you like, with new questions.') + '</p>' +
    '<p class="small">If you leave, your answers are saved and you can continue later.</p></div>' +
    (r ? '<div class="banner"><b>Continue your ' + (isSkip ? "skip test" : "exam") + ' (question ' + (r.i + 1) + ' of ' + r.questions.length + ')</b><div class="row"><button class="btn btn-primary" type="button" id="resume">Continue</button><button class="btn btn-ghost" type="button" id="restart">Start again</button></div></div>'
       : '<div class="row"><button class="btn btn-primary" type="button" id="begin">' + (isSkip ? "Start the skip test" : "Start the exam") + '</button></div>');
  $("begin")?.addEventListener("click", () => startRun(kind));
  $("resume")?.addEventListener("click", () => resumeRun(kind));
  $("restart")?.addEventListener("click", () => { drop("run:" + kind); startRun(kind); });
  window.scrollTo(0, 0);
}

// ---------- S10 path complete (example scores) ----------
function pathComplete() {
  examChrome(false);
  const lvl = "junior", stages = D.levels.slice(0, D.levels.findIndex((l) => l.id === lvl) + 1);
  const sc = (id) => 72 + ([...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 29);
  const rows = []; let all = [];
  for (const st of stages) {
    const us = D.units.map((u) => ({ u, ids: u.topics.filter((t) => D.levelOf[t] === st.id) })).filter((x) => x.ids.length);
    rows.push({ st, us: us.map(({ u, ids }) => { const scores = ids.map(sc); all.push(...scores); return { title: u.title, avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length), n: ids.length }; }) });
  }
  const total = Math.round(all.reduce((a, b) => a + b, 0) / all.length);
  const flat = rows.flatMap((r) => r.us.map((u) => ({ ...u, stage: r.st.title })));
  const sorted = [...flat].sort((a, b) => b.avg - a.avg), strong = sorted.slice(0, 2), weak = sorted.slice(-2).reverse();
  const R = D.rules.readiness, label = total >= R.ready ? ["r1", "Interview ready", "Great work. You know the " + stages.at(-1).title.toLowerCase() + " topics well."] : ["r2", "Almost ready", "Review your weakest units, then take their exams again to raise your score."];
  $("screen").innerHTML = '<p class="small"><b>Example.</b> Scores below are example data for a junior path.</p>' +
    '<div class="resulthead"><h1 class="eyebrow">Path complete · Junior</h1><p class="score pass num">' + total + '%</p><p><b>Your total result for ' + all.length + ' topics.</b></p></div>' +
    '<div class="ready ' + label[0] + '"><p class="eyebrow">Readiness</p><p style="font-size:1.3rem;font-weight:700">' + label[1] + '</p><p>' + label[2] + '</p><p class="small">' + R.ready + '% or more: Interview ready. ' + R.almost + '–' + (R.ready - 1) + '%: Almost ready.</p></div>' +
    '<div class="stats"><div class="stat"><span class="small">Strongest</span><b>' + strong.map((s) => esc(s.title)).join(", ") + '</b></div><div class="stat"><span class="small">To review</span><b>' + weak.map((s) => esc(s.title) + " (" + s.stage + ")").join(", ") + '</b></div></div>' +
    '<h2>By stage and unit</h2><div class="card breakdown">' + rows.map((r) => '<p class="stage-h">' + r.st.title + '</p>' + r.us.map((u) => '<div class="brow"><span>' + esc(u.title) + ' <span class="small">· ' + u.n + ' topics</span></span><b class="num" style="text-align:right">' + u.avg + '%</b><div class="bar"><span style="width:' + u.avg + '%"></span></div></div>').join("")).join("") + '</div>' +
    '<h2>What next?</h2><div class="row"><button class="btn btn-primary" type="button">Try the mid level</button><button class="btn btn-ghost" type="button">See bonus topics</button><button class="btn btn-ghost" type="button">Export my progress</button></div>';
  window.scrollTo(0, 0);
}

// ---------- prototype screen switcher ----------
const SCREENS = [["Exam", () => showStart("topic")], ["Skip test", () => showStart("skip")], ["Path complete", pathComplete]];
SCREENS.forEach(([name, fn], i) => {
  const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = name; b.setAttribute("aria-pressed", String(i === 0));
  b.addEventListener("click", () => { [...$("screens").children].forEach((c) => c.setAttribute("aria-pressed", String(c === b))); fn(); });
  $("screens").append(b);
});
showStart("topic");
</script>
`;
writeFileSync("docs/design/exam-prototype.html", page);
console.log(`docs/design/exam-prototype.html: ${(page.length / 1024).toFixed(0)} KB, ${bank.questions.length} questions`);
