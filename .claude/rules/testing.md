---
paths:
  - "app/**"
  - "src/**"
  - "components/**"
  - "lib/**"
  - "tests/**"
  - "e2e/**"
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "playwright.config.*"
  - "vitest.config.*"
---

# Testing rules (Phase 5)

Tools (current on npm 2026-11-09, check again when you install): **Vitest** for unit tests, **Playwright** for end-to-end tests, **@axe-core/playwright** for accessibility scans. Agents drive the browser with **Playwright CLI** (`playwright-cli`) and its skills.

## Every product rule has a unit test
Grading, scoring and unlocks are plain TypeScript functions with no React, so Vitest can test them. Each rule in the "Product rules" section of `AGENTS.md` has at least one test, with values read from `content/rules.json`:
- A topic passes at the pass mark (70%): test just below, exactly at, and above it.
- Skip tests pass at 80% and exist only for stages below the learner's level. Skipped topics count with the skip-test score.
- Topic score = best exam score. Progress = done ÷ main topics. Path score = average of done main topics. Bonus topics count in neither.
- Locked topics stay locked until the topic before is passed or skipped. Bonus topics never block.
- Answer options are shuffled in every exam, and the correct answer still grades as correct after the shuffle.
- Retakes draw new questions when the bank has enough.

## Progress store
Test every case listed in `.claude/rules/progress-store.md` (new version, moved, retired, added, level change, old or broken save). This is the Phase 5 item "progress keeps working when a topic is edited, moved, retired or gets a new version".

## End-to-end tests
- One Playwright test per main flow in `docs/ux/flows.md`.
- Run each flow at **375px** wide and at desktop width, in light and dark mode.
- Run an axe scan on each screen. Any WCAG A or AA violation fails the test.
- Test keyboard use: Tab order, visible focus, focus moves to the new heading after a step change, and focus goes to the question in an exam (`.claude/rules/design.md`).
- Test with reduced motion on: every diagram still shows its static version.
- Test offline after load: lessons, MCQ and code-reading exams still work.

## Before you call a step done
1. The unit tests pass.
2. The end-to-end tests for the screens you touched pass.
3. `next build` passes.
Never skip, weaken or delete a failing test to make it pass. Fix the cause, or tell the user why it cannot pass.
