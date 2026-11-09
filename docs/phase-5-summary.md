# Phase 5 Summary — Web App MVP

Completed: **2026-11-09**
Brand: **Prep Stops** (`config/brand.json`)
Tech Stack: **Next.js 16.4.5 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Shiki · Motion · Zustand persist · Vitest · Playwright · @axe-core/playwright**

---

## Deliverables & Results

### 1. Application Architecture & Foundation
- **Next.js 16 App Router**: Configured with TypeScript, Turbopack, and static pre-rendering (`generateStaticParams`).
- **Tailwind CSS v4 & Design Tokens**: Direct token binding via `@theme` mapping CSS variables from `config/generated/tokens.css` and `config/brand.json`.
- **Zero Hardcoded Brand Names**: All screens consume the brand name and tagline dynamically from `src/lib/brand.ts` (enforced by `scripts/check-brand.mjs`).
- **Content & Scoring Layer**: Zod schemas strictly enforcing the data contracts in `docs/curriculum-schema.md` for levels, units, rules, topics, and questions. Isolated pure scoring and road builder functions (`src/lib/curriculum/scoring.ts`) to prevent server `node:fs` leakage into browser chunks.
- **Versioned Progress Store (`src/lib/store/progress.ts`)**:
  - Keyed by immutable topic `id` only (never positions or unit indexes).
  - Versioned persisted state with sequential migrations (`migrate(state, version)`).
  - Client-safe hydration (`useHydratedProgress()`) preventing SSR mismatches with neutral loading state.
  - Privacy guarantee: 0 tracking, 0 names or emails; all progress stored strictly in client `localStorage`.

---

### 2. Implemented Screens (All 12 Screens from `docs/ux/flows.md`)

| Screen ID | Screen Name | Key Features Implemented |
|---|---|---|
| **S1** | **Welcome** | First visit intro, 3 value badges (100% Free, No account, Stays on device), 3-step explanation, "Choose my level" action, and progress import link. |
| **S2** | **Level Picker** | 5 level cards (Fresh $\rightarrow$ Staff), cumulative topic counts ("Includes Fresh, Junior..."), expandable self-check details, and interactive checklist with unbroken run suggestion algorithm. |
| **S3** | **Winding Path Map** | Responsive zig-zag road with alternating left/right nodes, stage markers, unit signposts, 6 stop states (passed, updated with amber badge, current with glow ring, locked, skipped with dashed outline, bonus branch), completed stage folding, and floating "Go to my stop" jump button. |
| **S4** | **Locked Notice** | Bottom sheet dialog guiding the learner to the blocking prerequisite with a one-tap "Go to that topic" button. |
| **S5** | **Lesson Reader** | Heading-based section stepper, interactive guess-first hook with recap reveal, interactive QuickCheck with explanation toggles, animated 4-step diagram stepper (Back/Next/Replay), A/A+/A++ text size switcher, copyable Swift code figures, keyboard focus management on step headings, and official sources drawer. |
| **S6** | **Exam Runner** | 10-question drawing engine with option shuffling, Tap-then-Check interaction loop, browser grading for MCQ and code-reading, rubric self-check for written and code-write with key criterion 50% capping, no timer pressure (duration recorded for review), and "Save and leave" support. |
| **S7** | **Topic Result** | Score percentage, pass/fail status (70% mark), best score tracker, calm celebration on pass, mistakes-first review list with option explanations, and action buttons ("Next topic", "Retake exam", "Back to lesson"). |
| **S8 / S9** | **Skip Tests & Skip Results** | Stage and unit skip exams drawing questions across topics; 80% pass threshold. On pass, marks all covered stops as skipped with the earned skip score. If failed, progress remains untouched. |
| **S10** | **Path Complete** | Total path score percentage, readiness badge (85% Interview ready, 70% Almost ready), strongest and weakest units, and next step links. |
| **S11** | **Progress & Settings** | Stage and unit performance breakdown bars, Device/Light/Dark appearance switcher applied to document, JSON progress file export (`prep-stops-progress-YYYY-MM-DD.json`), file import with schema preview comparison, and typed `RESET` progress confirmation modal. |
| **S12** | **About** | Mission statement, curriculum source policy (official Apple/Swift sources first), privacy guarantee, and Apple trademark disclaimer. |

---

### 3. Verification & Test Metrics

- **Vitest Unit Tests**:
  - `src/lib/__tests__/brand.test.ts`: Brand config validation.
  - `src/lib/curriculum/__tests__/rules.test.ts`: 100% of product rules tested (70% topic pass mark at 69/70/71%, 80% skip mark at 79/80/85%, best score calculation, progress calculation, path score average, option shuffling).
  - `src/lib/curriculum/__tests__/self-check.test.ts`: Unbroken run suggestion algorithm tested with user's example cases.
  - `src/lib/store/__tests__/progress.test.ts`: Store versioning, migrations, topic version bumps, topic moves, retired topics, level switches, corrupt JSON handling, and skip scoring.
  - **Result: 26 of 26 tests passing (100%)**.
- **Playwright E2E Tests**:
  - User flows tested at mobile 375px and desktop Chrome:
    - Flow F1: Welcome $\rightarrow$ Level Picker $\rightarrow$ Path Map.
    - Flow F2: Path Map $\rightarrow$ Stop Sheet $\rightarrow$ Lesson Reader $\rightarrow$ Exam.
    - Flow F5: Settings $\rightarrow$ Theme Switcher $\rightarrow$ Reset Confirmation safety.
- **Axe-core Accessibility Scans**:
  - Automated `AxeBuilder` audit run across `/`, `/path`, `/settings`, and `/about`.
  - **Result: 0 WCAG 2.1 A and AA violations**.
- **Production Build**:
  - `next build`: 51 static pages compiled with zero errors in Turbopack.
- **Brand Compliance**:
  - `node scripts/check-brand.mjs`: Zero hard-coded brand names in `src/`.
- **Curriculum Validation**:
  - `node scripts/validate-curriculum.mjs`: All 5 levels, 14 units, 164 topics validated.
