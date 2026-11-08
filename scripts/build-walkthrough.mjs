// Phase 3 walk-through: connects all 5 Phase 3 prototypes into one clickable experience.
// Uses config/brand.json and config/generated/tokens.css.
// Writes docs/design/walkthrough.html.
// Usage: node scripts/build-walkthrough.mjs
import { readFileSync, writeFileSync } from "node:fs";

const brand = JSON.parse(readFileSync("config/brand.json", "utf8"));
const tokensCss = readFileSync("config/generated/tokens.css", "utf8").replace(/@theme inline \{[\s\S]*?\n\}\n/, "");

const flows = [
  {
    id: "start",
    title: "1. Start & Level Picker",
    src: "start-prototype.html",
    screens: "S1 Welcome · S2 Level picker · S11 Settings · S12 About · Error states",
    summary: "First visit onboarding, self-check level suggestion (recommends level when ≥50% ticked), theme switch (Light/Dark/Device), browser storage banner, and progress JSON file export / import / reset.",
    tryThis: [
      "Click through the self-check checkboxes to see suggested levels update in real time.",
      "Pick a level and click 'Open my path' (leads to the Path Map).",
      "Switch to 'Progress and settings' to see unit breakdown, or test the simulated storage block & import errors."
    ]
  },
  {
    id: "path",
    title: "2. Path Map (Winding Road)",
    src: "path-map-prototype.html",
    screens: "S3 Path map · S4 Locked stop card",
    summary: "The winding road path showing all 164 curriculum topics arranged across stages and 14 subject units. Features folding finished stages, unit signposts, stop cards with 6 visual states, and skip-test entry points.",
    tryThis: [
      "Tap any topic stop to inspect its card: locked stops guide you to prerequisites, current stops offer 'Start lesson'.",
      "Tap 'Structs vs Classes' to open the pilot lesson.",
      "Try 'Skip this stage' or 'Skip this unit' buttons to preview skip test requirements (80% pass mark)."
    ]
  },
  {
    id: "lesson",
    title: "3. Lesson Experience",
    src: "lesson-prototype.html",
    screens: "S5 Lesson page (Structs vs Classes)",
    summary: "Research-based 8-step lesson layout in simple English (CEFR B1). Includes guess first, copy vs shared concept, illustrated interactive diagram, code examples verified with Swift 6.4, interview traps, sample answers, and recap.",
    tryThis: [
      "Step through using Back / Continue buttons, or use the top stepbar.",
      "Interact with the diagram on step 3 (Next / Back / Replay) and test keyboard arrow keys.",
      "Test the font size switcher (Normal / Large / Larger) in the top bar.",
      "Click 'Start the exam' on the final step to launch the exam."
    ]
  },
  {
    id: "exam",
    title: "4. Exam & Results",
    src: "exam-prototype.html",
    screens: "S6 Exam · S7 Topic result · S8 Skip test · S9 Skip result · S10 Path complete",
    summary: "Topic exam drawn from the 31-question bank (shuffled options every run). Features instant feedback, rubric scoring with half points and key-point caps, 70% topic pass mark, mistake review, and overall path readiness scoring.",
    tryThis: [
      "Answer questions and click 'Check answer' to view instant explanations.",
      "Finish the exam to view the result screen (passed vs not passed, mistake review, best score).",
      "Use the prototype switcher at the top to preview Skip Test (80% pass mark) and Path Complete screens."
    ]
  },
  {
    id: "design",
    title: "5. Design System",
    src: "design-system.html",
    screens: "Tokens · WCAG AA Contrast · 11 UI Component Groups",
    summary: "The single source of truth for UI components and tokens. Verified 17 color pairs in both Light and Dark modes with 0 contrast failures (>4.5:1 ratio). All sizes built to be accessible at 375px mobile width.",
    tryThis: [
      "Review the WCAG contrast test matrix for light and dark themes.",
      "Check interactive states for buttons, cards, tags, alerts, option rows, and code blocks.",
      "Toggle dark mode to verify token harmony."
    ]
  }
];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${brand.name} — Interactive Walk-through (Phase 3)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${brand.fonts.body.replace(/ /g, "+")}:wght@400;600;700&family=${brand.fonts.code.replace(/ /g, "+")}:wght@400;600&display=swap">
  <style>
${tokensCss}
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--background);
      color: var(--foreground);
      font: 400 0.9375rem/1.5 var(--font-body);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    header.hub-header {
      background: var(--card);
      border-bottom: 1px solid var(--border);
      padding: 10px 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 20;
    }
    .brand-block {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-pill {
      background: var(--primary);
      color: var(--primary-foreground);
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      letter-spacing: 0.02em;
    }
    .brand-tagline {
      font-size: 0.8125rem;
      color: var(--muted-foreground);
    }
    .flow-nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .flow-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--foreground);
      padding: 6px 12px;
      border-radius: var(--radius-md);
      cursor: pointer;
      font: 600 0.8125rem var(--font-body);
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .flow-btn:hover {
      background: var(--secondary);
    }
    .flow-btn.active {
      background: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .device-picker {
      display: flex;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .device-btn {
      background: var(--card);
      border: none;
      border-right: 1px solid var(--border);
      padding: 6px 10px;
      font: 500 0.75rem var(--font-body);
      color: var(--muted-foreground);
      cursor: pointer;
    }
    .device-btn:last-child {
      border-right: none;
    }
    .device-btn.active {
      background: var(--secondary);
      color: var(--foreground);
      font-weight: 700;
    }
    .tool-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--foreground);
      padding: 6px 10px;
      border-radius: var(--radius-md);
      cursor: pointer;
      font: 500 0.75rem var(--font-body);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tool-btn:hover {
      background: var(--secondary);
    }
    .guide-bar {
      background: var(--secondary);
      border-bottom: 1px solid var(--border);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      z-index: 10;
    }
    .guide-text {
      flex: 1;
      font-size: 0.875rem;
      line-height: 1.4;
    }
    .guide-text b {
      color: var(--primary);
    }
    .guide-screens {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      margin-top: 2px;
    }
    .guide-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .viewport-container {
      flex: 1;
      background: var(--muted);
      display: flex;
      justify-content: center;
      align-items: stretch;
      overflow: hidden;
      position: relative;
    }
    .frame-wrapper {
      width: 100%;
      height: 100%;
      transition: max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      background: var(--background);
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      position: relative;
    }
    .frame-wrapper.mobile {
      max-width: 375px;
      border-left: 1px solid var(--border);
      border-right: 1px solid var(--border);
    }
    .frame-wrapper.tablet {
      max-width: 720px;
      border-left: 1px solid var(--border);
      border-right: 1px solid var(--border);
    }
    .frame-wrapper.full {
      max-width: 100%;
      border-left: none;
      border-right: none;
    }
    iframe#viewer {
      width: 100%;
      height: 100%;
      border: none;
      background: var(--background);
    }
  </style>
</head>
<body>
  <header class="hub-header">
    <div class="brand-block">
      <span class="brand-pill">${brand.name}</span>
      <span class="brand-tagline">Phase 3 Interactive Walk-through · Calm Trail</span>
    </div>

    <nav class="flow-nav" role="tablist" aria-label="Walk-through flows">
      ${flows.map((f, i) => `<button type="button" class="flow-btn \${i === 0 ? "active" : ""}" data-idx="\${i}" role="tab" aria-selected="\${i === 0 ? "true" : "false"}">\${f.title}</button>`).join("")}
    </nav>

    <div class="controls">
      <div class="device-picker" role="group" aria-label="Preview width">
        <button type="button" class="device-btn" data-width="mobile" title="375px phone screen">375px</button>
        <button type="button" class="device-btn" data-width="tablet" title="720px tablet width">720px</button>
        <button type="button" class="device-btn active" data-width="full" title="100% desktop width">Full</button>
      </div>

      <button type="button" class="tool-btn" id="themeToggle" aria-label="Toggle theme">🌓 Theme</button>
      <a class="tool-btn" id="openExternal" href="start-prototype.html" target="_blank" rel="noopener">Open standalone ↗</a>
    </div>
  </header>

  <aside class="guide-bar" aria-label="Flow guide">
    <div class="guide-text">
      <div id="guideTitle"><b>1. Start & Level Picker</b> — First visit onboarding and settings</div>
      <div class="guide-screens" id="guideScreens">S1 Welcome · S2 Level picker · S11 Settings · S12 About · Error states</div>
    </div>
    <div class="guide-actions">
      <button type="button" class="flow-btn" id="prevFlow" disabled>← Previous</button>
      <button type="button" class="flow-btn" id="nextFlow">Next Flow →</button>
    </div>
  </aside>

  <main class="viewport-container">
    <div class="frame-wrapper full" id="frameWrapper">
      <iframe id="viewer" src="start-prototype.html" title="Interactive prototype viewer"></iframe>
    </div>
  </main>

  <script>
    const flows = ${JSON.stringify(flows)};
    let currentIdx = 0;
    let currentWidth = "full";
    let isDark = false;

    const viewer = document.getElementById("viewer");
    const frameWrapper = document.getElementById("frameWrapper");
    const guideTitle = document.getElementById("guideTitle");
    const guideScreens = document.getElementById("guideScreens");
    const openExternal = document.getElementById("openExternal");
    const flowButtons = document.querySelectorAll(".flow-btn[data-idx]");
    const deviceButtons = document.querySelectorAll(".device-btn");
    const prevBtn = document.getElementById("prevFlow");
    const nextBtn = document.getElementById("nextFlow");
    const themeToggle = document.getElementById("themeToggle");

    function updateFlow(idx) {
      currentIdx = Math.max(0, Math.min(flows.length - 1, idx));
      const f = flows[currentIdx];
      viewer.src = f.src;
      openExternal.href = f.src;
      guideTitle.innerHTML = '<b>' + f.title + '</b> — ' + f.summary;
      guideScreens.textContent = f.screens;

      flowButtons.forEach((b, i) => {
        const active = i === currentIdx;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });

      prevBtn.disabled = currentIdx === 0;
      nextBtn.disabled = currentIdx === flows.length - 1;
    }

    flowButtons.forEach((b) => b.addEventListener("click", () => updateFlow(Number(b.dataset.idx))));
    prevBtn.addEventListener("click", () => updateFlow(currentIdx - 1));
    nextBtn.addEventListener("click", () => updateFlow(currentIdx + 1));

    deviceButtons.forEach((b) => {
      b.addEventListener("click", () => {
        deviceButtons.forEach((btn) => btn.classList.remove("active"));
        b.classList.add("active");
        currentWidth = b.dataset.width;
        frameWrapper.className = 'frame-wrapper ' + currentWidth;
      });
    });

    themeToggle.addEventListener("click", () => {
      isDark = !isDark;
      document.documentElement.classList.toggle("dark", isDark);
      try {
        viewer.contentDocument.documentElement.classList.toggle("dark", isDark);
      } catch {}
    });

    // Keyboard navigation: Option + Left/Right arrows switch flows
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "ArrowRight") updateFlow(currentIdx + 1);
      if (e.altKey && e.key === "ArrowLeft") updateFlow(currentIdx - 1);
    });
  </script>
</body>
</html>
`;

writeFileSync("docs/design/walkthrough.html", html);
console.log(`docs/design/walkthrough.html: built with ${flows.length} flows`);
