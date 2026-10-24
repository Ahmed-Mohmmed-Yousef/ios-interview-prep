// Phase 3 prototype: the lesson page, one section at a time, built from a real lesson.mdx with the design tokens.
// Usage (from prototype/): node build-lesson.mjs <topic-id>   → ../docs/design/lesson-prototype.html
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { createElement as h, Children } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const id = process.argv[2];
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => readFileSync(root + p, "utf8");
const json = (p) => JSON.parse(read(p));
const brand = json("config/brand.json");
const topic = json(`content/topics/${id}/topic.json`);
const levels = json("content/levels.json").levels;
const unit = json("content/units.json").units.find((u) => u.topics.includes(id) || (u.bonus ?? []).some((b) => b.topic === id));
const tokensCss = read("config/generated/tokens.css").replace(/@theme inline \{[\s\S]*?\n\}\n/, "");
const levelTitle = (l) => levels.find((x) => x.id === l)?.title ?? l;

// --- Lesson components (contract: docs/lesson-format.md) ---
const components = {
  InterviewHook: ({ children }) => h("section", { className: "hook" }, h("p", { className: "eyebrow" }, "Interview question"), children),
  Question: ({ children }) => h("p", { className: "q-text" }, children),
  Guess: ({ children }) => h("div", { className: "guess", "data-guess": "" },
    h("p", { className: "small" }, "Guess first. It is not scored. Research shows that guessing first helps you learn. We come back to it in the recap."),
    h("div", { className: "opts" }, children), h("p", { className: "guess-msg", "aria-live": "polite" })),
  Option: ({ id: oid, correct, children }) => h("button", { type: "button", className: "opt", "data-id": oid, ...(correct ? { "data-correct": "" } : {}) },
    h("span", { className: "id" }, oid.toUpperCase()), h("span", null, children), h("span", { className: "mark" })),
  QuickCheck: ({ children }) => h("div", { className: "callout c-quick", "data-qc": "" }, h("p", { className: "eyebrow" }, "Quick check (not scored)"), children),
  Explanation: ({ children }) => h("p", { className: "qc-explain", hidden: true }, children),
  Analogy: ({ children }) => h("aside", { className: "callout c-analogy" }, h("p", { className: "eyebrow" }, "Think of it like this"), children),
  Diagram: ({ id: did, caption }) => h("div", { className: "diagram-slot", "data-diagram": did, "aria-label": caption }),
  CodeExample: ({ title, children }) => h("figure", { className: "code-example" }, h("figcaption", null, title), children),
  Trap: ({ title, children }) => h("div", { className: "callout c-trap" }, h("p", { className: "eyebrow trap-eyebrow" }, "Trap"), h("p", { className: "trap-title" }, title), children),
  VersionNote: ({ since, children }) => h("aside", { className: "callout c-version" }, h("p", { className: "eyebrow" }, `New in ${since}`), children),
  DeepDive: ({ title, children }) => h("details", { className: "deep-dive" }, h("summary", null, `Go deeper: ${title}`), h("div", null, h("p", { className: "small" }, "Extra detail. Not in the exam."), children)),
  RealWorld: ({ children }) => h("aside", { className: "callout c-version" }, h("p", { className: "eyebrow" }, "In a real app"), children),
  InterviewAnswer: ({ level, children }) => h("details", { className: "answer", ...(level === topic.level ? { open: true } : {}) }, h("summary", null, `${levelTitle(level)} answer`), h("div", null, children)),
  Recap: ({ children }) => h("div", { className: "recap" }, h("p", { className: "guess-result", "aria-live": "polite" }), children),
  TryIt: ({ children }) => h("p", { className: "try-it" }, children, " ",
    h("a", { href: "https://developer.apple.com/swift-playground/", target: "_blank", rel: "noopener" }, "Get Swift Playground")),
  pre: ({ children }) => {
    const code = Children.only(children);
    const lang = (code.props.className ?? "").replace("language-", "");
    if (lang === "output") return h("pre", { className: "out" }, code);
    return h("div", { className: "code-wrap" }, h("pre", { className: "code" }, code),
      h("button", { type: "button", className: "copy", "aria-label": "Copy code" }, "Copy"));
  },
  table: (props) => h("div", { className: "table-wrap", tabIndex: 0, role: "region", "aria-label": "Comparison table" }, h("table", props)),
};

const { default: Lesson, meta } = await evaluate(read(`content/topics/${id}/lesson.mdx`), { ...runtime, remarkPlugins: [remarkGfm] });
let html = renderToStaticMarkup(h(Lesson, { components }));

// --- Diagram: the step 2.4 prototype, re-skinned with the design tokens ---
const diagramPath = `docs/pilot/diagram-${id}.html`;
let diagramCss = "", diagramScript = "", diagramMarkup = "";
if (existsSync(root + diagramPath)) {
  const d = read(diagramPath);
  diagramMarkup = d.slice(d.indexOf('<figure class="panels"'), d.indexOf("</details>") + 10);
  diagramScript = d.slice(d.indexOf("<script>") + 8, d.indexOf("</script>"))
    .replace('document.addEventListener("keydown", (e) => {', 'document.addEventListener("keydown", (e) => {\n  if (!e.target.closest || !e.target.closest(".diagram-host")) return;');
  diagramCss = d.slice(d.indexOf("<style>") + 7, d.indexOf("</style>"))
    .replace(/:root\s*\{[\s\S]*?\n\}\n/, "").replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\} \}\n/, "").replace(/:root\[data-theme="dark"\]\s*\{[\s\S]*?\n\}\n/, "")
    .replace(/body\s*\{[\s\S]*?\n\}\n/, "").replace(/\.wrap\s*\{[^}]*\}\n/, "").replace(/h1\s*\{[^}]*\}\n/, "").replace(/\.eyebrow\s*\{[^}]*\}\n/, "").replace(/\.lede\s*\{[^}]*\}\n/, "");
}

// --- Split into steps: before the first h2 = the guess; then every h2 and h3 starts a new step ---
const parts = html.split(/(?=<h[23]>)/);
const steps = parts.map((p, i) => {
  const t = p.match(/^<h[23]>(.*?)<\/h[23]>/)?.[1]?.replace(/<[^>]+>/g, "") ?? "Guess first";
  return { title: t, html: p.replace(/^<h([23])>/, "<h2 class=\"step-title\">").replace(/^(<h2 class="step-title">.*?)<\/h3>/, "$1</h2>") };
});
// Sources go on the last step, after the recap.
const sourcesHtml = `<section class="sources"><h3>Where this comes from</h3><ul>${meta.sources.map((s) =>
  `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>${s.kind === "community" ? ' <span class="badge b-bonus">Community</span>' : ""}</li>`).join("")}</ul>
  <p class="small">Checked on ${meta.lastVerified}. Official Apple and Swift pages first.</p></section>`;
steps.at(-1).html += sourcesHtml;
// Add the diagram only after splitting, so its own panel headings do not become steps.
for (const s of steps) s.html = s.html.replace(/<div class="diagram-slot"[^>]*><\/div>/, diagramMarkup ? `<div class="diagram-host">${diagramMarkup}</div>` : "");

const data = JSON.stringify({ id, title: topic.title, steps: steps.map((s) => s.title), change: topic.changes?.at(-1) ?? null, version: topic.version }).replace(/</g, "\\u003c");
const stepsHtml = steps.map((s, i) => `<section class="step" data-step="${i}" ${i ? "hidden" : ""} aria-label="${s.title}">${s.html}</section>`).join("\n");

const page = `<title>Lesson Page Prototype</title>
<script>document.documentElement.lang = "en";</script>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${brand.fonts.body.replace(/ /g, "+")}:wght@400;600;700&family=${brand.fonts.code.replace(/ /g, "+")}:wght@400;600&display=swap">
<style>
${tokensCss}
/* The pilot diagram's own names, mapped to the design tokens (only inside the diagram: "--muted" means something else in the design system) */
.diagram-host { --bg: var(--background); --surface: var(--card); --ink: var(--foreground); --muted: var(--muted-foreground); --line: var(--border);
  --value: var(--success); --value-soft: var(--success-soft); --shared: var(--primary); --shared-soft: var(--secondary);
  --changed: var(--warn); --changed-soft: var(--warn-soft); --code-bg: var(--code); }
${diagramCss}
/* Layout: a sticky lesson header (back, title, step bar, text size) and one step at a time below it, with Back / Continue at the bottom. */
:root { --scale: 1; }
* { box-sizing: border-box; }
html { font-size: calc(16px * var(--scale)); }
body { margin: 0; background: var(--background); color: var(--foreground); font: 400 1rem/1.625rem var(--font-body); }
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--card); }
.wrap { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.inner { max-width: 720px; margin: 0 auto; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
a { color: var(--primary); }
.small { font-size: .875rem; line-height: 1.375rem; color: var(--muted-foreground); }
.eyebrow { font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted-foreground); margin: 0; }
code { font-family: var(--font-code); font-size: .9em; background: var(--code); padding: 1px 5px; border-radius: 6px; }

.top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--card); border-bottom: 1px solid var(--border); padding-block: 8px 10px; }
/* The lesson header keeps a fixed size, so it still fits when the learner picks larger text. */
.top .inner { display: grid; gap: 8px; grid-template-columns: minmax(0, 1fr); font-size: 16px; line-height: 22px; }
.top .small { font-size: 14px; line-height: 20px; }
.toprow { display: flex; gap: 10px; align-items: center; justify-content: space-between; min-width: 0; }
.back { font: 600 14px var(--font-body); color: var(--foreground); text-decoration: none; display: inline-flex; gap: 6px; align-items: center; min-height: 40px; }
.title { font-weight: 700; font-size: 16px; line-height: 1.3; min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sizes { display: inline-flex; background: var(--muted); border-radius: 999px; padding: 3px; gap: 2px; flex: none; }
.sizes button { font: 700 13px var(--font-body); color: var(--muted-foreground); background: transparent; border: 0; border-radius: 999px; min-width: 34px; min-height: 32px; cursor: pointer; }
.sizes button:nth-child(2) { font-size: 15px; } .sizes button:nth-child(3) { font-size: 17px; }
.sizes button[aria-pressed="true"] { background: var(--card); color: var(--foreground); box-shadow: var(--shadow-card); }
.stepbar { display: flex; gap: 4px; }
.stepbar span { flex: 1; height: 6px; border-radius: 999px; background: var(--muted); transition: background var(--duration-normal) var(--ease-calm); }
.stepbar span.done { background: var(--primary); } .stepbar span.now { background: var(--primary); opacity: .55; }
.stepinfo { display: flex; justify-content: space-between; gap: 10px; }

main { padding-block: 18px 120px; }
.meta { display: grid; gap: 8px; margin-bottom: 16px; }
.meta h1 { margin: 0; font-size: 1.875rem; line-height: 2.375rem; text-wrap: balance; }
.goal { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 14px; margin: 0; }
.updated { background: var(--warn-soft); border-radius: var(--radius); padding: 10px 14px; margin: 0; }
.step { display: grid; gap: 16px; }
.step[hidden], .meta[hidden], .updated[hidden] { display: none; }
.step > * { margin: 0; min-width: 0; }
.step p, .step li { max-width: var(--reading-width); }
.step-title { font-size: 1.5rem; line-height: 2rem; margin: 0; text-wrap: balance; }
.hook { background: var(--card); border: 2px solid var(--foreground); border-radius: calc(var(--radius) * 1.4); padding: 16px; display: grid; gap: 12px; }
.q-text { font-size: 1.3125rem; line-height: 1.875rem; font-weight: 600; margin: 0; text-wrap: balance; }
.callout .q-text { font-size: 1.0625rem; line-height: 1.5rem; }
.opts { display: grid; gap: 8px; }
.opt { display: grid; grid-template-columns: 2em 1fr auto; gap: 8px; align-items: center; text-align: left; font: 400 1rem/1.5rem var(--font-body); color: var(--foreground);
  background: var(--background); border: 1.5px solid var(--border); border-radius: calc(var(--radius) * .9); padding: 10px 12px; min-height: var(--touch-target); cursor: pointer; }
.opt:hover:not(:disabled) { border-color: var(--foreground); }
.opt:disabled { cursor: default; }
.opt .id { font-weight: 700; color: var(--muted-foreground); }
.opt .mark { font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.opt p { margin: 0; }
.opt.picked { border-color: var(--primary); background: var(--secondary); }
.opt.right { border-color: var(--success); background: var(--success-soft); } .opt.right .mark { color: var(--success); }
.opt.wrong { border-color: var(--warn); background: var(--warn-soft); } .opt.wrong .mark { color: var(--warn); }
.guess-msg, .guess-result { margin: 0; font-weight: 500; }
.callout { border-radius: var(--radius); padding: 14px 16px; display: grid; gap: 8px; }
.callout p { margin: 0; }
.c-analogy { background: var(--success-soft); }
.c-trap { background: var(--card); border-left: 4px solid var(--warn); border-radius: 0 var(--radius) var(--radius) 0; }
.trap-eyebrow { color: var(--warn); } .trap-title { font-weight: 700; }
.c-version { background: var(--card); border: 1px solid var(--border); }
.c-quick { background: var(--card); border: 1.5px dashed var(--primary); }
.qc-explain { padding: 10px 12px; border-radius: calc(var(--radius) * .8); background: var(--background); }
.code-example { margin: 0; display: grid; grid-template-columns: minmax(0, 1fr); min-width: 0; }
.code-example figcaption { font-size: .875rem; font-weight: 600; color: var(--muted-foreground); margin-bottom: 6px; padding-right: 76px; }
.code-wrap { position: relative; min-width: 0; }
.callout { grid-template-columns: minmax(0, 1fr); }
.callout > *, .step > * { min-width: 0; }
pre.code { margin: 0; font: .875rem/1.5rem var(--font-code); background: var(--code); border-radius: calc(var(--radius) * .9) calc(var(--radius) * .9) 0 0; padding: 12px 14px; overflow-x: auto; }
.code-wrap:last-child pre.code { border-radius: calc(var(--radius) * .9); }
pre.code code, pre.out code { background: none; padding: 0; }
.copy { position: absolute; top: -36px; right: 0; font: 600 .75rem var(--font-body); color: var(--foreground); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; min-height: 30px; cursor: pointer; }
pre.out { margin: 0; font: .875rem/1.5rem var(--font-code); background: var(--card); border: 1px solid var(--border); border-top: 0; border-radius: 0 0 calc(var(--radius) * .9) calc(var(--radius) * .9); padding: 8px 14px; }
pre.out::before { content: "Output"; display: block; font: 600 .6875rem var(--font-body); letter-spacing: .05em; text-transform: uppercase; color: var(--muted-foreground); }
.table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); }
table { border-collapse: collapse; width: 100%; font-size: .875rem; line-height: 1.375rem; }
th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; min-width: 7em; }
details.deep-dive, details.answer { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 16px; }
details summary { cursor: pointer; font-weight: 600; min-height: 28px; }
details > div { display: grid; gap: 8px; margin-top: 10px; }
details p { margin: 0; }
.recap { background: var(--card); border: 2px solid var(--success); border-radius: var(--radius); padding: 14px 16px; }
.recap ul { margin: 8px 0 0; padding-left: 20px; display: grid; gap: 6px; }
.sources { display: grid; gap: 8px; }
.sources h3 { margin: 0; font-size: 1.125rem; }
.sources ul { margin: 0; padding-left: 20px; display: grid; gap: 6px; overflow-wrap: anywhere; }
.badge { display: inline-flex; font-size: .6875rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; border-radius: 999px; padding: 1px 8px; border: 1.5px solid currentColor; }
.b-bonus { color: var(--primary); border-style: dashed; }
.try-it { color: var(--muted-foreground); }
.diagram-host { display: grid; gap: 14px; }
.diagram-host .panels { grid-template-columns: 1fr; }
@media (min-width: 700px) { .diagram-host .panels { grid-template-columns: 1fr 1fr; } }

.nav { position: fixed; inset: auto 0 0 0; z-index: 5; background: var(--card); border-top: 1px solid var(--border); padding-block: 10px calc(10px + env(safe-area-inset-bottom, 0px)); }
.nav .inner { display: flex; gap: 10px; justify-content: space-between; align-items: center; }
.btn { font: 600 1rem var(--font-body); border-radius: 999px; padding: 0 20px; min-height: var(--touch-target); border: 1.5px solid transparent; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; }
.btn-primary { background: var(--primary); color: var(--primary-foreground); }
.btn-ghost { background: transparent; color: var(--foreground); border-color: var(--border); }
.btn:disabled { opacity: .4; cursor: default; }
.demo { margin-top: 26px; background: var(--secondary); border-radius: var(--radius); padding: 10px 12px; display: grid; gap: 6px; }
.demo button { justify-self: start; font: 600 .8125rem var(--font-body); color: var(--foreground); background: var(--card); border: 1.5px solid var(--border); border-radius: 999px; padding: 6px 12px; min-height: 34px; cursor: pointer; }
.timer { display: grid; gap: 6px; border-top: 1px solid var(--border); padding-top: 8px; }
.timer > div { display: grid; gap: 6px; }
.timer > div[hidden] { display: none; }
.timer-out { margin: 0; font: .8125rem/1.25rem var(--font-code); background: var(--card); border-radius: 10px; padding: 10px 12px; white-space: pre-wrap; overflow-wrap: anywhere; }
</style>

<header class="top wrap">
  <div class="inner">
    <div class="toprow">
      <a class="back" href="https://claude.ai/artifact/KnAK3X8Tj4FxQopL1Mnrx6" target="_blank" rel="noopener" aria-label="Back to the path">← Path</a>
      <span class="title">${topic.title}</span>
      <div class="sizes" role="group" aria-label="Text size">
        <button type="button" data-scale="1" aria-label="Normal text">A</button><button type="button" data-scale="1.15" aria-label="Large text">A</button><button type="button" data-scale="1.3" aria-label="Larger text">A</button>
      </div>
    </div>
    <div class="stepbar" id="stepbar" aria-hidden="true"></div>
    <div class="stepinfo small"><span id="stepName"></span><span id="stepCount" class="num"></span></div>
  </div>
</header>

<main class="wrap"><div class="inner">
  <div class="meta" id="meta">
    <p class="eyebrow">${levelTitle(topic.level)} · ${unit.title} · about ${meta.estimatedMinutes} minutes</p>
    <h1>${topic.title}</h1>
    <p class="goal"><b>Goal.</b> ${topic.goal}</p>
    <p class="updated" id="updatedNote" hidden></p>
  </div>
  ${stepsHtml}
  <section class="demo" aria-label="Prototype controls">
    <span class="small"><b>Prototype.</b> Example states for review only.</span>
    <button type="button" id="demoUpdated">Example: I passed an older version (show the Updated note)</button>
    <div class="timer" id="timer">
      <p class="small"><b>Reading timer (step 3.8).</b> It counts the time on each step. It pauses when you leave this tab or do nothing for 2 minutes. For a fair result, read from step 1 to the end in one go.</p>
      <button type="button" id="timerRestart">Start again from step 1</button>
      <div id="timerResult" hidden>
        <pre class="timer-out" id="timerOut" tabindex="0"></pre>
        <button type="button" id="timerCopy">Copy the result</button>
      </div>
    </div>
  </section>
</div></main>

<nav class="nav wrap" aria-label="Lesson steps">
  <div class="inner">
    <button class="btn btn-ghost" type="button" id="lessonPrev">Back</button>
    <button class="btn btn-primary" type="button" id="lessonNext">Continue</button>
  </div>
</nav>

<script>
{ // the diagram keeps its own helpers
${diagramScript}
}
</script>
<script>
const L = ${data};
const q = (s, el = document) => el.querySelector(s);
const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const steps = [...document.querySelectorAll(".step")];
let at = Math.min(store.get("lesson:" + L.id + ":step") ?? 0, steps.length - 1);

// Step bar
const bar = q("#stepbar");
steps.forEach(() => bar.append(document.createElement("span")));
function show(i, focus) {
  at = Math.max(0, Math.min(steps.length - 1, i));
  steps.forEach((s, k) => (s.hidden = k !== at));
  q("#meta").hidden = at !== 0;
  [...bar.children].forEach((b, k) => { b.className = k < at ? "done" : k === at ? "now" : ""; });
  q("#stepName").textContent = L.steps[at];
  q("#stepCount").textContent = "Step " + (at + 1) + " of " + steps.length;
  q("#lessonPrev").disabled = at === 0;
  const last = at === steps.length - 1;
  q("#lessonNext").textContent = last ? "Start the exam" : "Continue";
  store.set("lesson:" + L.id + ":step", at);
  if (last) showTimer();
  window.scrollTo(0, 0);
  if (focus) (steps[at].querySelector(".step-title") || steps[at]).focus?.();
}
steps.forEach((s) => { const t = s.querySelector(".step-title"); if (t) t.tabIndex = -1; });
q("#lessonPrev").addEventListener("click", () => show(at - 1, true));
q("#lessonNext").addEventListener("click", () => {
  if (at === steps.length - 1) { window.open("https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J", "_blank", "noopener"); return; }
  show(at + 1, true);
});

// Text size (remembered)
const sizeBtns = document.querySelectorAll(".sizes button");
function setScale(v) { document.documentElement.style.setProperty("--scale", v); sizeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.scale === String(v)))); store.set("textScale", v); requestAnimationFrame(() => dispatchEvent(new Event("resize"))); }
sizeBtns.forEach((b) => b.addEventListener("click", () => setScale(b.dataset.scale)));
setScale(store.get("textScale") ?? "1");

// Guess first: saved, answered in the recap
const guessBox = q("[data-guess]");
guessBox?.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
  guessBox.querySelectorAll(".opt").forEach((o) => o.classList.toggle("picked", o === b));
  const right = b.hasAttribute("data-correct"), correct = q("[data-correct]", guessBox).dataset.id.toUpperCase();
  q(".guess-msg", guessBox).textContent = "Saved. Continue to learn, and check your guess in the recap.";
  const r = q(".guess-result");
  if (r) r.textContent = right ? "Your guess (" + b.dataset.id.toUpperCase() + ") was right. Well done." : "You guessed " + b.dataset.id.toUpperCase() + ". The right answer was " + correct + ". Now you know why.";
}));

// Quick checks: instant feedback, not scored
document.querySelectorAll("[data-qc]").forEach((qc) => qc.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
  qc.querySelectorAll(".opt").forEach((o) => {
    o.disabled = true;
    if (o.hasAttribute("data-correct")) { o.classList.add("right"); q(".mark", o).textContent = "Right"; }
    else if (o === b) { o.classList.add("wrong"); q(".mark", o).textContent = "Your answer"; }
  });
  const ex = q(".qc-explain", qc); ex.hidden = false;
  if (!ex.dataset.done) { ex.prepend(document.createTextNode(b.hasAttribute("data-correct") ? "Right. " : "Not quite. ")); ex.dataset.done = "1"; }
})));

// Copy code
document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", async () => {
  const text = b.previousElementSibling.textContent;
  try { await navigator.clipboard.writeText(text); b.textContent = "Copied"; }
  catch { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = "Selected"; }
  setTimeout(() => (b.textContent = "Copy"), 1600);
}));

// Updated note (shown when the learner passed an older version)
q("#demoUpdated").addEventListener("click", () => {
  const n = q("#updatedNote");
  n.hidden = !n.hidden;
  if (L.change) n.innerHTML = "<b>Updated " + L.change.date + ".</b> " + L.change.note + " Your pass stays. Taking the exam again is optional.";
  show(0);
});
// Reading timer (prototype only, step 3.8): one tick per second on the visible step, while the learner is active.
const IDLE_MS = 120000, timeOn = steps.map(() => 0);
let lastActive = Date.now();
["pointerdown", "keydown", "scroll", "wheel", "touchstart"].forEach((t) => addEventListener(t, () => (lastActive = Date.now()), { passive: true }));
setInterval(() => { if (document.visibilityState === "visible" && Date.now() - lastActive < IDLE_MS) timeOn[at] += 1; if (!q("#timerResult").hidden) showTimer(); }, 1000);
const words = steps.map((s) => (s.textContent.match(/[A-Za-z0-9'’]+/g) || []).length);
const mmss = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
function showTimer() {
  const total = timeOn.reduce((a, b) => a + b, 0), w = words.reduce((a, b) => a + b, 0);
  const size = { "1": "Normal", "1.15": "Large", "1.3": "Larger" }[String(store.get("textScale") ?? "1")] + " text";
  q("#timerOut").textContent = "Reading time: " + L.title + " (" + size + ")\\n" +
    L.steps.map((n, i) => (i + 1) + ". " + n + ": " + mmss(timeOn[i]) + " (" + words[i] + " words)").join("\\n") +
    "\\nTotal: " + mmss(total) + " · " + w + " words · " + (total ? Math.round(w / (total / 60)) : 0) + " words per minute";
  q("#timerResult").hidden = false;
}
q("#timerRestart").addEventListener("click", () => { timeOn.fill(0); lastActive = Date.now(); q("#timerResult").hidden = true; show(0, true); });
q("#timerCopy").addEventListener("click", async () => {
  const b = q("#timerCopy");
  try { await navigator.clipboard.writeText(q("#timerOut").textContent); b.textContent = "Copied"; }
  catch { const r = document.createRange(); r.selectNodeContents(q("#timerOut")); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = "Selected. Copy it now."; }
});
show(at);
</script>
`;
writeFileSync(root + "docs/design/lesson-prototype.html", page);
console.log(`lesson-prototype.html: ${(page.length / 1024).toFixed(0)} KB, ${steps.length} steps: ${steps.map((s) => s.title).join(" | ")}`);
