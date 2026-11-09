---
name: build-screen
description: Build one screen of the web app (Phase 5) in Next.js from its approved Phase 3 design — the flow in docs/ux/flows.md, the design doc and prototype in docs/design/, and the design tokens — then verify it with /ui-check.
when_to_use: '"build the path screen", "make the exam screen", "implement the lesson page", "start the level picker", any new Phase 5 screen'
argument-hint: "[screen name]"
disable-model-invocation: true
---

# Build screen: $ARGUMENTS

Build the screen to match the approved design. Do not redesign it. If the design does not cover a case, stop and ask the user (`.claude/rules/ask-dont-guess.md`).

## Before you start

1. Read the rules for app code: `.claude/rules/nextjs.md`, `design.md`, `plain-english.md`, `testing.md`, and `progress-store.md` if the screen reads or writes progress.
2. Find the screen in `docs/ux/flows.md`: where learners come from, where they go next, and every state (empty, loading, locked, passed, error, offline).
3. Read the matching design doc and prototype:

   | Screen | Design doc | Prototype |
   |---|---|---|
   | Start, level picker, progress | `docs/design/start-progress.md` | `docs/design/start-prototype.html` |
   | Path map | `docs/design/path-map.md` | `docs/design/path-map-prototype.html` |
   | Lesson | `docs/design/lesson-page.md` | `docs/design/lesson-prototype.html` |
   | Exam and results | `docs/design/exam-results.md` | `docs/design/exam-prototype.html` |
   | Accessibility checks | `docs/design/a11y-check.md` | — |

   Prototypes are generated files: read them, never edit them.
4. Read the Next.js guide for each API you plan to use in `node_modules/next/dist/docs/`.
5. Mark the step 🔄 in `PROGRESS.md`, with a change-log line.

## Steps

| # | Step | Done when |
|---|---|---|
| 1 | List the parts: Server Components, the small client parts, data from `content/`, and store reads and writes | Every state from `flows.md` has a place |
| 2 | Add shadcn/ui components through the shadcn skill or MCP when they are installed. Style them with tokens from `config/generated/tokens.css` only | No hard-coded colors, sizes or shadows |
| 3 | Build the screen. Text comes from the prototype, or is new text in simple English | The brand name comes from `config/brand.json` only |
| 4 | Put rule logic (scores, locks, grading) in plain functions in `lib/` and write Vitest tests for them | The unit tests pass |
| 5 | Write or extend the Playwright test for this flow | The test runs at 375px and desktop, light and dark, with an axe scan |
| 6 | Run `/ui-check` on the screen | Every finding is fixed or explained |
| 7 | Delegate to the `a11y-reviewer` agent with the changed files. If you touched rule logic, also delegate to `rules-tester` | Every finding is fixed or explained |
| 8 | Delegate UI text to the `plain-english-reviewer` agent | Every finding is fixed or explained |

## Report

End with a short report in simple English:
- What you built, and the routes and files.
- Test results (unit, end-to-end, axe) and `next build`.
- Screenshots at 375px and desktop, light and dark.
- Any difference from the prototype, and why.
- The one question for the user: approve the screen, or what to change.

Mark the step 🟡 in `PROGRESS.md`. Never mark it ✅; only the user approves.
