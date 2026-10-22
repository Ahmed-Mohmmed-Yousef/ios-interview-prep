// Phase 2 prototype: builds one self-contained HTML page from a real topic
// (topic.json + lesson.mdx compiled with MDX + questions.json + the diagram prototype).
// Usage (from prototype/): node build.mjs <topic-id>   → ../docs/pilot/prototype-<topic-id>.html
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { createElement as h, Children } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const id = process.argv[2];
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => readFileSync(root + p, "utf8");
const topic = JSON.parse(read(`content/topics/${id}/topic.json`));
const bank = JSON.parse(read(`content/topics/${id}/questions.json`));
const rules = JSON.parse(read("content/rules.json"));
const levels = JSON.parse(read("content/levels.json")).levels;
const units = JSON.parse(read("content/units.json")).units;
const unit = units.find((u) => u.topics.includes(id));
const diagramHtml = read(`docs/pilot/diagram-${id}.html`);

// --- Lesson components (the contract from docs/lesson-format.md) ---
const levelTitle = (l) => levels.find((x) => x.id === l)?.title ?? l;
const components = {
  InterviewHook: ({ children }) => h("section", { className: "hook" }, h("p", { className: "label" }, "Interview question"), children),
  Question: ({ children }) => h("p", { className: "q-text" }, children),
  Guess: ({ children }) => h("div", { className: "guess", "data-guess": "" },
    h("p", { className: "label" }, "Your guess first (not scored). We come back to it in the recap."),
    h("div", { className: "opts" }, children), h("p", { className: "guess-msg", "aria-live": "polite" })),
  Option: ({ id: oid, correct, children }) => h("button", { type: "button", className: "opt", "data-id": oid, ...(correct ? { "data-correct": "" } : {}) },
    h("span", { className: "opt-id" }, oid.toUpperCase()), h("span", { className: "opt-text" }, children)),
  QuickCheck: ({ children }) => h("div", { className: "quick-check", "data-qc": "" }, h("p", { className: "label" }, "Quick check (not scored)"), children),
  Explanation: ({ children }) => h("p", { className: "qc-explain", hidden: true }, children),
  Analogy: ({ children }) => h("aside", { className: "analogy" }, h("p", { className: "label" }, "Think of it like this"), children),
  Diagram: ({ id: did, caption }) => h("div", { className: "diagram-slot", "data-diagram": did, "aria-label": caption }),
  CodeExample: ({ title, children }) => h("figure", { className: "code-example" }, h("figcaption", null, title), children),
  Trap: ({ title, children }) => h("div", { className: "trap" }, h("p", { className: "trap-title" }, h("span", { className: "label" }, "Trap"), " ", title), children),
  VersionNote: ({ since, children }) => h("aside", { className: "version-note" }, h("p", { className: "label" }, `New in ${since}`), children),
  DeepDive: ({ title, children }) => h("details", { className: "deep-dive" }, h("summary", null, `Go deeper: ${title}`), h("div", null, children)),
  RealWorld: ({ children }) => h("aside", { className: "real-world" }, h("p", { className: "label" }, "In a real app"), children),
  InterviewAnswer: ({ level, children }) => h("div", { className: "answer" }, h("p", { className: "label" }, `${levelTitle(level)} answer`), children),
  Recap: ({ children }) => h("div", { className: "recap" }, h("p", { className: "guess-result", "aria-live": "polite" }), children),
  TryIt: ({ children }) => h("p", { className: "try-it" }, children, " ",
    h("a", { href: "https://developer.apple.com/swift-playground/", target: "_blank", rel: "noopener" }, "Get Swift Playground")),
  pre: ({ children }) => {
    const code = Children.only(children);
    const lang = (code.props.className ?? "").replace("language-", "");
    return h("pre", { className: `block ${lang === "output" ? "output" : "swift"}` },
      lang === "output" ? h("span", { className: "out-label" }, "Output") : null, code);
  },
};

const { default: Lesson, meta } = await evaluate(read(`content/topics/${id}/lesson.mdx`), { ...runtime, remarkPlugins: [remarkGfm] });
let lessonHtml = renderToStaticMarkup(h(Lesson, { components }));

// --- Diagram: reuse the step 2.4 prototype (figure, step bar, list, script, styles) ---
const between = (s, a, b) => s.slice(s.indexOf(a), s.indexOf(b) + b.length);
const diagramMarkup = between(diagramHtml, '<figure class="panels"', "</details>");
const diagramScript = diagramHtml.slice(diagramHtml.indexOf("<script>") + 8, diagramHtml.indexOf("</script>"))
  .replace('document.addEventListener("keydown", (e) => {', 'document.addEventListener("keydown", (e) => {\n  if (!e.target.closest || !e.target.closest(".diagram-host")) return;');
const diagramStyle = diagramHtml.slice(diagramHtml.indexOf("<style>") + 7, diagramHtml.indexOf("</style>"));
lessonHtml = lessonHtml.replace(/<div class="diagram-slot"[^>]*><\/div>/, `<div class="diagram-host">${diagramMarkup}</div>`);

const exam = {
  passMark: rules.topicPassMark, size: rules.topicExamSize, scoring: rules.rubricScoring,
  mix: { mcq: 5, "code-reading": 3, written: 1, "code-write": 1 },
  questions: bank.questions.filter((q) => !q.retired).map(({ sources, verify, verifyStarter, lessonSection, ...q }) => q),
};
// Place in this unit's part of the topic's stage (for example "Topic 10 of 13" in the fresh stage).
const stageTopics = unit.topics.filter((t) => JSON.parse(read(`content/topics/${t}/topic.json`)).level === topic.level);
const position = stageTopics.indexOf(id) + 1;
const data = JSON.stringify({ topicId: id, exam }).replace(/</g, "\\u003c");

const page = `<title>${topic.title} Lesson</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
${diagramStyle}
/* --- Lesson page (prototype) --- */
.page { max-width: 760px; margin: 0 auto; display: grid; gap: 22px; }
.lesson { display: grid; gap: 16px; }
.lesson > * { margin: 0; }
.lesson h2 { font-size: 24px; margin-top: 18px; text-wrap: balance; }
.lesson h3 { font-size: 19px; margin-top: 6px; }
.lesson p, .lesson li { max-width: 66ch; }
.lesson code, .exam code { font-family: var(--font-code); font-size: .9em; background: var(--code-bg); padding: 1px 5px; border-radius: 6px; }
.label { font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--muted); margin: 0 0 6px; }
.meta-line { display: flex; flex-wrap: wrap; gap: 6px 18px; color: var(--muted); font-size: 14px; margin: 0; }
.goal { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; margin: 0; }
.hook { background: var(--surface); border: 2px solid var(--ink); border-radius: 18px; padding: 18px; display: grid; gap: 10px; }
.q-text { font-size: 21px; font-weight: 600; margin: 0; text-wrap: balance; }
.opts { display: grid; gap: 8px; }
.opt { display: grid; grid-template-columns: 2em 1fr; gap: 8px; align-items: start; text-align: left; font: 15px/1.45 var(--font-body);
  color: var(--ink); background: var(--bg); border: 1.5px solid var(--line); border-radius: 12px; padding: 10px 12px; cursor: pointer; min-height: 44px; }
.opt:hover:not(:disabled) { border-color: var(--ink); }
.opt:disabled { cursor: default; }
.opt-id { font-weight: 700; color: var(--muted); }
.opt.picked { border-color: var(--shared); background: var(--shared-soft); }
.opt.right { border-color: var(--value); background: var(--value-soft); }
.opt.wrong { border-color: var(--changed); background: var(--changed-soft); }
.opt p, .answer p, .trap p { margin: 0; }
.guess-msg, .guess-result { margin: 0; font-weight: 500; }
.quick-check { border: 1.5px dashed var(--shared); border-radius: 16px; padding: 14px; display: grid; gap: 10px; background: var(--surface); }
.quick-check .q-text { font-size: 17px; }
.qc-explain { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--bg); }
.analogy { background: var(--value-soft); border-radius: 16px; padding: 14px 16px; }
.analogy p { margin: 0; }
.diagram-host { display: grid; gap: 14px; }
.code-example { margin: 0; display: grid; gap: 0; }
.code-example figcaption { font-size: 14px; font-weight: 600; color: var(--muted); margin-bottom: 6px; }
pre.block { margin: 0; font: 14px/1.55 var(--font-code); background: var(--code-bg); padding: 12px 14px; border-radius: 12px; overflow-x: auto; }
pre.block code { background: none; padding: 0; }
pre.block.swift + pre.block.output { margin-top: -6px; border-top-left-radius: 0; border-top-right-radius: 0; }
pre.block.swift:has(+ pre.block.output) { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
pre.block.output { background: var(--surface); border: 1px solid var(--line); }
.out-label { display: block; font: 600 11px var(--font-body); letter-spacing: .05em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
.table-wrap { overflow-x: auto; }
.lesson table { border-collapse: collapse; width: 100%; font-size: 14px; background: var(--surface); border-radius: 12px; overflow: hidden; }
.lesson th, .lesson td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }
.lesson th { font-weight: 600; }
.trap { border-left: 4px solid var(--changed); background: var(--surface); padding: 12px 14px; border-radius: 0 12px 12px 0; display: grid; gap: 8px; }
.trap-title { font-weight: 600; }
.trap-title .label { display: inline; color: var(--changed); }
.version-note, .real-world { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; display: grid; gap: 6px; }
.version-note p, .real-world p { margin: 0; }
.deep-dive > div { display: grid; gap: 8px; margin-top: 8px; }
.deep-dive p { margin: 0; }
.answer { background: var(--surface); border-radius: 14px; padding: 12px 16px; border: 1px solid var(--line); }
.recap { background: var(--surface); border: 2px solid var(--value); border-radius: 16px; padding: 14px 16px; }
.recap ul { margin: 6px 0 0; padding-left: 20px; display: grid; gap: 4px; }
.try-it { color: var(--muted); }
.try-it a, .lesson a { color: var(--shared); }
.cta { display: grid; gap: 10px; justify-items: start; background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 18px; }
.btn { font: 600 16px var(--font-body); color: var(--surface); background: var(--ink); border: 0; border-radius: 999px; padding: 12px 22px; cursor: pointer; min-height: 44px; }
.btn.secondary { color: var(--ink); background: var(--surface); border: 1px solid var(--line); }
.btn:focus-visible, .opt:focus-visible, textarea:focus-visible, input:focus-visible { outline: 3px solid var(--shared); outline-offset: 2px; }
.exam { display: grid; gap: 14px; }
.exam[hidden], .results[hidden], .lesson-view[hidden] { display: none; }
.progress { height: 8px; background: var(--line); border-radius: 999px; overflow: hidden; }
.progress > span { display: block; height: 100%; background: var(--shared); width: 0; }
.q-head { display: flex; justify-content: space-between; gap: 10px; color: var(--muted); font-size: 14px; font-variant-numeric: tabular-nums; }
.feedback { border-radius: 14px; padding: 12px 14px; display: grid; gap: 6px; }
.feedback.ok { background: var(--value-soft); } .feedback.no { background: var(--changed-soft); }
.feedback p { margin: 0; }
textarea { width: 100%; min-height: 9em; font: 15px/1.5 var(--font-body); color: var(--ink); background: var(--surface); border: 1.5px solid var(--line); border-radius: 12px; padding: 10px 12px; }
textarea.code-input { font-family: var(--font-code); font-size: 14px; }
.rubric { display: grid; gap: 8px; }
.crit { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 8px 12px 10px; margin: 0; display: flex; flex-wrap: wrap; gap: 6px 16px; }
.crit legend { display: flex; gap: 10px; justify-content: space-between; width: 100%; padding: 0; float: left; margin-bottom: 4px; }
.crit label { display: inline-flex; gap: 6px; align-items: center; cursor: pointer; min-height: 32px; }
.rubric .w { color: var(--muted); font-variant-numeric: tabular-nums; }
.key { color: var(--shared); font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
.self-score { margin: 0; }
.score { font-size: 48px; font-weight: 700; margin: 0; font-variant-numeric: tabular-nums; }
.pass { color: var(--value); } .fail { color: var(--changed); }
.review { display: grid; gap: 8px; padding: 0; list-style: none; margin: 0; }
.review li { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; display: grid; gap: 4px; }
.review .tag { font-size: 12px; font-weight: 600; }
.note { font-size: 13px; color: var(--muted); margin: 0; }
</style>

<div class="page">
  <header>
    <p class="eyebrow">${levelTitle(topic.level)} · ${unit.title} · Topic ${position} of ${stageTopics.length} · Prototype</p>
    <h1>${topic.title}</h1>
    <p class="meta-line"><span>About ${meta.estimatedMinutes} minutes</span><span>Then a ${rules.topicExamSize}-question exam</span><span>Pass mark ${rules.topicPassMark}%</span><span>Version ${topic.version}</span></p>
  </header>
  ${topic.changes?.length ? `<aside class="version-note"><p class="label">Updated ${topic.changes.at(-1).date}</p><p>${topic.changes.at(-1).note}</p></aside>` : ""}
  <div class="lesson-view" id="lessonView">
    <p class="goal"><span class="label">Goal</span><br>${topic.goal}</p>
    <article class="lesson">${lessonHtml}</article>
    <section class="cta">
      <h2 style="margin:0">Ready for the exam?</h2>
      <p style="margin:0">${rules.topicExamSize} questions: ${exam.mix.mcq} multiple choice, ${exam.mix["code-reading"]} code reading, 1 written answer and 1 code answer. You see the answer after each question.</p>
      <button class="btn" type="button" id="startExam">Start the exam</button>
    </section>
  </div>
  <section class="exam" id="exam" hidden aria-live="polite"></section>
  <section class="results" id="results" hidden></section>
  <p class="note">Prototype for review (Phase 2, step 2.7). Built from the real lesson.mdx and questions.json. Written and code answers use a self-check here; AI grading comes in Phase 6. Your best result is saved only in this browser.</p>
</div>

<script>
{ // block scope: the diagram script keeps its own helpers
${diagramScript}
}
</script>
<script>
const DATA = ${data};
const $ = (s, el = document) => el.querySelector(s);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const started = Date.now();
let guess = null;

// Wrap tables so they scroll on small screens.
document.querySelectorAll(".lesson table").forEach((t) => { const w = document.createElement("div"); w.className = "table-wrap"; t.replaceWith(w); w.append(t); });

// Guess first: save the pick, no feedback until the recap.
const guessBox = $("[data-guess]");
guessBox?.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
  guessBox.querySelectorAll(".opt").forEach((o) => o.classList.toggle("picked", o === b));
  guess = { id: b.dataset.id, correct: b.hasAttribute("data-correct") };
  $(".guess-msg", guessBox).textContent = "Saved. Read on, and check your guess in the recap.";
  const r = $(".guess-result");
  if (r) r.textContent = guess.correct
    ? "Your guess (" + guess.id.toUpperCase() + ") was right. Well done."
    : "Your guess was " + guess.id.toUpperCase() + ". The right answer was " + $("[data-correct]", guessBox).dataset.id.toUpperCase() + ". Now you know why.";
}));

// Quick checks: instant feedback, not scored.
document.querySelectorAll("[data-qc]").forEach((qc) => {
  qc.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
    qc.querySelectorAll(".opt").forEach((o) => {
      o.disabled = true;
      if (o.hasAttribute("data-correct")) o.classList.add("right");
      else if (o === b) o.classList.add("wrong");
    });
    const ex = $(".qc-explain", qc);
    ex.hidden = false;
    ex.prepend(document.createTextNode(b.hasAttribute("data-correct") ? "Right. " : "Not quite. "));
  }));
});

// ---------- Exam ----------
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let lastExamIds = null; // kept in memory too, so retakes avoid repeats even when storage is blocked
function pickQuestions() {
  const last = new Set(lastExamIds ?? store.get("lastExam:" + DATA.topicId) ?? []);
  const picked = [];
  for (const [type, n] of Object.entries(DATA.exam.mix)) {
    const pool = shuffle(DATA.exam.questions.filter((q) => q.type === type));
    const fresh = pool.filter((q) => !last.has(q.id)), seen = pool.filter((q) => last.has(q.id));
    picked.push(...[...fresh, ...seen].slice(0, n));
  }
  const auto = shuffle(picked.filter((q) => q.options)), open = picked.filter((q) => !q.options);
  const list = [...auto, ...open];
  lastExamIds = list.map((q) => q.id);
  store.set("lastExam:" + DATA.topicId, lastExamIds);
  return list;
}

let run;
function startExam() {
  run = { questions: pickQuestions(), i: 0, answers: [], lessonMinutes: Math.max(1, Math.round((Date.now() - started) / 60000)) };
  $("#lessonView").hidden = true; $("#results").hidden = true; $("#exam").hidden = false;
  showQuestion(); window.scrollTo(0, 0);
}
$("#startExam").addEventListener("click", startExam);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const md = (s) => esc(s).replace(/\`([^\`]+)\`/g, "<code>$1</code>");

function showQuestion() {
  const q = run.questions[run.i], n = run.questions.length;
  const kind = { mcq: "Multiple choice", "code-reading": "Read the code", written: "Written answer", "code-write": "Write code" }[q.type];
  const ex = $("#exam");
  ex.innerHTML =
    '<div class="progress" aria-hidden="true"><span style="width:' + (run.i / n * 100) + '%"></span></div>' +
    '<div class="q-head"><span>Question ' + (run.i + 1) + ' of ' + n + '</span><span>' + kind + '</span></div>' +
    '<p class="q-text">' + md(q.prompt) + '</p>' +
    (q.code ? '<pre class="block swift"><code>' + esc(q.code) + '</code></pre>' : '') +
    (q.options
      ? '<div class="opts">' + q.options.map((o) => '<button type="button" class="opt" data-id="' + o.id + '"><span class="opt-id">' + o.id.toUpperCase() + '</span><span class="opt-text">' + md(o.text) + '</span></button>').join("") + '</div>'
      : '<label for="answer" class="label">' + (q.type === "written" ? "Your answer (2–5 sentences)" : "Your code") + '</label>' +
        '<textarea id="answer" class="' + (q.type === "code-write" ? "code-input" : "") + '" spellcheck="' + (q.type === "written") + '">' + esc(q.starterCode ?? "") + '</textarea>' +
        '<button class="btn" type="button" id="submitOpen">Check my answer</button>') +
    '<div id="fb"></div>';
  if (q.options) ex.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => answerChoice(q, b.dataset.id)));
  else $("#submitOpen").addEventListener("click", () => answerOpen(q));
  (ex.querySelector(".opt") || ex.querySelector("textarea"))?.focus({ preventScroll: true });
}

function nextButton() {
  const last = run.i === run.questions.length - 1;
  const b = document.createElement("button");
  b.className = "btn"; b.type = "button"; b.textContent = last ? "See my results" : "Next question";
  b.addEventListener("click", () => { if (last) showResults(); else { run.i++; showQuestion(); window.scrollTo(0, 0); } });
  return b;
}

function answerChoice(q, picked) {
  const right = picked === q.answer;
  run.answers.push({ q, picked, right });
  $("#exam").querySelectorAll(".opt").forEach((o) => {
    o.disabled = true;
    if (o.dataset.id === q.answer) o.classList.add("right"); else if (o.dataset.id === picked) o.classList.add("wrong");
  });
  const chosen = q.options.find((o) => o.id === picked), correct = q.options.find((o) => o.id === q.answer);
  const fb = $("#fb");
  fb.className = "feedback " + (right ? "ok" : "no");
  fb.innerHTML = '<p><b>' + (right ? "Right." : "Not quite.") + '</b> ' + md(chosen.explanation) + '</p>' +
    (right ? "" : '<p><b>The right answer is ' + q.answer.toUpperCase() + '.</b> ' + md(correct.explanation.replace(/^Right\.\s*/, "")) + '</p>');
  fb.append(nextButton()); fb.lastChild.focus({ preventScroll: true });
}

// Rubric scoring (rules.json → rubricScoring): met = full weight, partly = half, not met = 0.
// If any key criterion is not met, the total is capped below the pass mark.
function rubricScore(rubric, marks) {
  const s = DATA.exam.scoring;
  let total = 0, keyMissed = false;
  rubric.forEach((r, i) => {
    const m = marks[i] === 1 ? s.met : marks[i] === 0.5 ? s.partlyMet : s.notMet;
    total += r.weight * m;
    if (r.key && m === s.notMet) keyMissed = true;
  });
  total = Math.round(total);
  return { self: keyMissed ? Math.min(total, s.keyMissedCap) : total, capped: keyMissed && total > s.keyMissedCap };
}

function answerOpen(q) {
  const text = $("#answer").value;
  $("#answer").readOnly = true; $("#submitOpen").remove();
  const fb = $("#fb");
  fb.className = "feedback";
  fb.innerHTML = '<p class="label">Model answer</p>' +
    (q.type === "code-write" ? '<pre class="block swift"><code>' + esc(q.modelAnswer) + '</code></pre>' : '<p>' + md(q.modelAnswer) + '</p>') +
    '<p class="label" style="margin-top:8px">Self-check: how well does your answer cover each point? In the app, AI does this.</p>' +
    '<div class="rubric">' + q.rubric.map((r, i) =>
      '<fieldset class="crit"><legend><span>' + (r.key ? '<b class="key">Key point</b> ' : '') + md(r.criterion) + '</span><span class="w">' + r.weight + '</span></legend>' +
      [["1", "Yes"], ["0.5", "Partly"], ["0", "No"]].map(([v, t]) => '<label><input type="radio" name="r' + i + '" value="' + v + '"' + (v === "0" ? " checked" : "") + '> ' + t + '</label>').join("") +
      '</fieldset>').join("") + '</div>' +
    '<p class="self-score" aria-live="polite"></p>';
  const entry = { q, text, self: 0, capped: false };
  run.answers.push(entry);
  const update = () => {
    const marks = q.rubric.map((r, i) => Number(fb.querySelector('input[name="r' + i + '"]:checked').value));
    Object.assign(entry, rubricScore(q.rubric, marks));
    fb.querySelector(".self-score").innerHTML = "Self-check score: <b>" + entry.self + "/100</b>" + (entry.capped ? " (capped at " + DATA.exam.scoring.keyMissedCap + ": a key point is missing)" : "");
  };
  fb.querySelectorAll("input").forEach((c) => c.addEventListener("change", update));
  update();
  fb.append(nextButton());
}

function showResults() {
  const auto = run.answers.filter((a) => a.q.options), open = run.answers.filter((a) => !a.q.options);
  const correct = auto.filter((a) => a.right).length, pct = Math.round(correct / auto.length * 100);
  const passed = pct >= DATA.exam.passMark;
  const best = Math.max(pct, store.get("best:" + DATA.topicId) ?? 0);
  store.set("best:" + DATA.topicId, best);
  const r = $("#results");
  r.innerHTML =
    '<p class="label">Your result</p>' +
    '<p class="score ' + (passed ? "pass" : "fail") + '">' + pct + '%</p>' +
    '<p style="margin:0"><b>' + (passed ? "Passed." : "Not passed yet.") + '</b> ' + correct + ' of ' + auto.length + ' scored questions right. You need ' + DATA.exam.passMark + '% to unlock the next topic. Best so far: ' + best + '%.</p>' +
    open.map((a) => '<p style="margin:0">Self-check, ' + (a.q.type === "written" ? "written answer" : "code answer") + ': <b>' + a.self + '/100</b> (not in the score in this prototype).</p>').join("") +
    '<p class="note">Time on the lesson: about ' + run.lessonMinutes + ' min.</p>' +
    '<h2 style="margin:8px 0 0;font-size:20px">Review</h2>' +
    '<ol class="review">' + run.answers.map((a, i) => '<li><span class="tag ' + (a.q.options ? (a.right ? "pass" : "fail") : "") + '">' + (i + 1) + '. ' + (a.q.options ? (a.right ? "Right" : "Wrong") : "Self-check " + a.self + "/100") + '</span><span>' + md(a.q.prompt) + '</span>' +
      (a.q.options && !a.right ? '<span class="note">Right answer: ' + md(a.q.options.find((o) => o.id === a.q.answer).text) + '</span>' : '') + '</li>').join("") + '</ol>' +
    '<div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn" type="button" id="retake">Retake with new questions</button><button class="btn secondary" type="button" id="back">Back to the lesson</button></div>';
  $("#exam").hidden = true; r.hidden = false; window.scrollTo(0, 0);
  $("#retake").addEventListener("click", startExam);
  $("#back").addEventListener("click", () => { r.hidden = true; $("#lessonView").hidden = false; window.scrollTo(0, 0); });
}
</script>
`;

const out = root + `docs/pilot/prototype-${id}.html`;
writeFileSync(out, page);
console.log(`${out}: ${(page.length / 1024).toFixed(0)} KB, lesson HTML ${(lessonHtml.length / 1024).toFixed(0)} KB, ${exam.questions.length} questions`);
