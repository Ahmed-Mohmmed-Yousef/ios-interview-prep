# Phase 3 Plan — Design System and UX

**Goal:** design how the whole app looks and works, before any app code: the screens, the flows between them, a design system (colors, type, components), and the key screens as clickable prototypes. Every step ends with something you review and approve.

Live status is in [PROGRESS.md](../PROGRESS.md).

## Decisions (from the user, 2026-10-23)

| Question | Decision |
|---|---|
| App name | I suggest a few names and check each one; you pick. **It must stay easy to change**: the name lives in one file and is never written into designs or code by hand |
| Where designs live | **Clickable web prototypes** (private artifact links), like the pilot |
| Overall feel | **Calm and friendly**: soft colors, illustrated diagrams, clear reading |
| Path map | **A winding road**: topics are stops on a road with stage signs and bonus side roads |

## Steps

| Step | What we do | You get | You decide |
|---|---|---|---|
| **3.1 Screens and flows** | List every screen and how learners move between them: first visit, picking a level, the path, a lesson, an exam, results, the total result, skip tests, saving progress | A flow diagram + screen list (`docs/ux/flows.md`) | The 4 open questions from Phase 2 (below) |
| **3.2 Name and brand** | Suggest 5–8 names, checked against app stores and the web. Set the voice, the logo idea and 2–3 color and type directions | A brand page with the options | The name and one direction |
| **3.3 Design system** | Design tokens (colors for light and dark, type scale, spacing, corner radius, shadows) and the core components (buttons, cards, answer options, code blocks, progress, tags). Built so the name and colors change in one place | A design-system page + a tokens file ready for Tailwind v4 | Approve the system |
| **3.4 Path map** | The winding road for each level: stages, units, topic stops (locked, current, passed, skipped), bonus side roads, skip-test points | Clickable path prototype | Approve the road |
| **3.5 Lesson page** | Improve the pilot lesson layout with the design system: reading width, sections, quick checks, diagram, code, mobile | Lesson page prototype | Approve |
| **3.6 Exam and results** | Exam screens, feedback, topic result, the total result and percentage for a path, the "This topic was updated" message, retakes | Exam and results prototypes | Approve |
| **3.7 Start and progress** | First visit, the level picker with its self-check, skip tests, saving progress in the browser, plus export and import of a progress file. Empty, loading and error states | Prototypes for these screens | Approve |
| **3.8 Usability and accessibility check** | Check contrast (WCAG AA), keyboard use, screen readers, reduced motion and 375px width. Measure the real reading time of the pilot lesson with you | A check report with fixes | Approve |
| **3.9 Final check** | Connect all prototypes into one clickable walk-through, write the design summary, save with Git | Walk-through link + `docs/phase-3-summary.md` | Approve Phase 3 |

## Open questions from Phase 2 (answered in step 3.1)

- How skipped topics count in the total percentage.
- Should the exam shuffle the answer options?
- The final "This topic was updated" message (a draft is on the pilot prototype).
- How the real reading time is measured (step 3.8).

## Rules for every step

- Web-search every fact. Simple English for all screen text. Ask, don't guess.
- Accessibility from the start: WCAG AA contrast, keyboard, screen reader labels, reduced motion, 375px wide.
- **The app name and brand colors come from one config file.** No screen hard-codes them.
- Prototypes are for deciding, not the real app. The app is built in Phase 5.
