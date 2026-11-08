# Phase 3 Summary — Design System and UX

Finished 2026-11-08. All 9 steps were reviewed and approved one by one. Every decision, with its date, is in [PROGRESS.md](../PROGRESS.md).

## What we built

| Component / Prototype | Source & Output | Description |
|---|---|---|
| **Brand & Direction** | `config/brand.json` → [Brand Board](https://claude.ai/artifact/Ai3rDph8YXX39ycWy7qZdv) | **Prep Stops**, direction Calm Trail. Checked against Apple trademark rules and App Store names. Tagline: "Interview prep for iOS developers". |
| **Design Tokens** | `config/design-tokens.json` + `brand.json` → `config/generated/tokens.css` | Light and dark tokens matching shadcn/ui and Tailwind v4. 17 color pairs verified for WCAG 2.2 AA contrast. |
| **Screens and Flows** | [docs/ux/flows.md](ux/flows.md) → [Flow Map page](https://claude.ai/artifact/5cQDao3KDygBCQ7dGYWmv6) | 12 screens (S1–S12) and 8 flows (F1–F8) defining the complete learner experience. |
| **Design System** | `scripts/build-design-system.mjs` → [design-system.html](design/design-system.html) | Interactive catalog of all 11 component groups (buttons, cards, tags, alerts, option rows, code blocks) in light & dark modes. |
| **Path Map** | `scripts/build-path-prototype.mjs` → [path-map-prototype.html](design/path-map-prototype.html) | The winding road with 164 topics, 14 units, 5 stages, stop states (current, passed, locked, skipped, bonus), and skip tests. |
| **Lesson Page** | `prototype/build-lesson.mjs` → [lesson-prototype.html](design/lesson-prototype.html) | Research-based 8-step reading experience for Structs vs Classes with interactive illustrated diagram and text size controls. |
| **Exam & Results** | `scripts/build-exam-prototype.mjs` → [exam-prototype.html](design/exam-prototype.html) | 10-question exam with shuffled options, instant explanations, topic score (70% pass), skip tests (80% pass), and path complete readiness. |
| **Start & Progress** | `scripts/build-start-prototype.mjs` → [start-prototype.html](design/start-prototype.html) | Welcome screen, level picker with self-check suggestions, progress and settings, JSON export / import / reset, and edge states. |
| **Interactive Walk-through** | `scripts/build-walkthrough.mjs` → [walkthrough.html](design/walkthrough.html) | Connected hub embedding all 5 prototypes with a guided step bar, 375px/720px/full responsive switch, and theme toggle. |

## Key product & UX rules locked in Phase 3

| Rule | Decision | Where it lives |
|---|---|---|
| Topic pass mark | **70%**; unlocks the next topic stop on the path | `content/rules.json`, [docs/ux/flows.md](ux/flows.md) |
| Skip test pass mark | **80%**; topics in that stage/unit count as done with the skip-test score | `content/rules.json`, [docs/ux/flows.md](ux/flows.md) |
| Exam option shuffling | Options are shuffled on every attempt; right answer never stands out by position | `scripts/build-exam-prototype.mjs` |
| Updated topics | Retain pass; display an "Updated" badge on the path and note in the lesson | [docs/ux/flows.md](ux/flows.md) |
| Locked topics | Fully locked until the preceding topic is passed or skipped | [docs/ux/flows.md](ux/flows.md) |
| Level changes | Any time; all earned progress is kept across cumulative stages | [docs/ux/flows.md](ux/flows.md) |
| Progress backup | Stored in browser; JSON export and import with validation | `scripts/build-start-prototype.mjs` |

## Accessibility & Usability (Step 3.8)

Tested with **axe-core 4.14.0** across all prototypes in light and dark modes:
- **0 axe violations**: 13 initial contrast, landmark, focus, and id collision issues resolved.
- **17 brand color pairs** verified for WCAG 2.2 AA contrast (≥ 4.5:1) via `scripts/check-brand.mjs`.
- **Keyboard navigation**: visible focus rings, logical tab order, Escape sheet dismissal, trap handling in modal dialogs.
- **Responsive design**: full layout and typography tested down to 375px width (iPhone standard).
- **Reduced motion**: full support via `prefers-reduced-motion` token overrides.

## New tools created in Phase 3

- **`scripts/build-design-system.mjs`** — compiles design tokens into CSS and generates the design system catalog.
- **`scripts/check-brand.mjs`** — checks Apple trademark rules, validates 17 WCAG AA contrast pairs, and forbids hardcoded app names.
- **`scripts/build-path-prototype.mjs`** — renders the SVG winding road with interactive stop cards.
- **`prototype/build-lesson.mjs`** — builds the 8-step lesson prototype with interactive diagram integration.
- **`scripts/build-exam-prototype.mjs`** — builds the exam simulator with rubric grading and path score computation.
- **`scripts/build-start-prototype.mjs`** — builds the onboarding, level self-check, settings, and edge state simulators.
- **`scripts/build-walkthrough.mjs`** — generates the unified walk-through viewer.

## Items deferred to later phases

| Item | Reason | Deferred To |
|---|---|---|
| VoiceOver testing with real users | Best evaluated in the live production browser application | Phase 5 (Web app MVP) |
| Reading time measurements with real learners | Accurate metric collection in the real app | Phase 5 (Web app MVP) |
| context7 documentation MCP | Live documentation for Next.js, Tailwind, shadcn, Motion | Phase 5 scaffolding |
| Setup recommender re-run | Recommender tool needs real application code to suggest further plugins | Phase 6 |
