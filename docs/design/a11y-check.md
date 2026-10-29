# Usability and Accessibility Check (Step 3.8)

Checked 2026-10-24 on all 5 Phase 3 prototypes: design system, path map, lesson, exam, and start and progress. The links are in [PROGRESS.md](../../PROGRESS.md).

## How it was checked

| Check | Tool or method |
|---|---|
| WCAG 2.2 AA rules and best practice | **axe-core 4.14.0** (npm, latest on 2026-10-24), run in the browser on every screen, in light and dark mode. Rule tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice` |
| Brand contrast | `node scripts/check-brand.mjs`, now with **17 color pairs** per mode (it had 5) |
| Keyboard | Focus order, visible focus, where focus goes after each action, Escape on sheets and dialogs, focus trapped in modals, unique ids |
| Screen reader | Accessibility names, headings, landmarks, live regions. A person test with VoiceOver is below (waiting for you) |
| Reduced motion | Every animation and transition, and smooth scrolling |
| 375px width | Page width on every screen, step and dialog, also with the "Larger" text size |

Testing tip: a hidden browser pane freezes CSS transitions, so a contrast check can read a color halfway through a change. Run checks with transitions turned off.

## Results

**Before:** 13 kinds of problems. **After:** axe finds **0 problems** on every screen in light and dark mode, and every page fits 375px.

| # | Problem | Where | Fix |
|---|---|---|---|
| 1 | Green and amber text on their soft backgrounds was 4.23:1 and 4.43:1 (needs 4.5:1) | "Right" / "Wrong" marks, "Suggested" tag | Light `success` `#0f7f63` → `#0c765c` (4.77:1); light `warn` `#9c6210` → `#915b0e` (4.98:1). `check-brand.mjs` now checks these pairs, so it cannot happen again |
| 2 | White text on bright level colors in dark mode (2.02:1) | Path stage signs | New tokens `--level-<id>-foreground` (white or near-black, whichever is stronger), built from the config |
| 3 | The "fold" button had a see-through white background (3.53:1) | Path stage signs | Clear background with a border in the text color |
| 4 | **The lesson and the diagram both had a button with id `next`.** The lesson code could take the diagram's button | Lesson page | Lesson buttons renamed `lessonPrev` / `lessonNext`. Both now work on their own |
| 5 | The page behind the path stop card could still be reached with Tab | Path map | The header and main area become `inert` while the card is open |
| 6 | After a screen change, focus stayed on a removed button (it fell back to the page) | Start page | Focus moves to the new screen's heading |
| 7 | In the exam, focus went to the first option, so a screen reader skipped the question | Exam | Focus moves to the question first |
| 8 | No page language | All pages | `lang="en"` set on every page |
| 9 | No level-one heading | Path map, exam questions, results, path complete | Added headings (hidden on the path map; the topic title in the exam) |
| 10 | Text outside landmarks | Exam, start, design system | Prototype controls in an `aside`, the exam bar in a `header`, the action bars as named sections, the design system in `main` |
| 11 | Scrolling boxes could not be reached by keyboard | Code boxes, contrast tables, the export file | `tabindex="0"` (and a name for the tables) |
| 12 | Empty table header | Design system | Hidden header text "Result" |
| 13 | Smooth scrolling ignored reduced motion | Start page | Uses normal scrolling when reduced motion is on |

Small improvement: the diagram's step dots now say "Diagram step 2 of 4" instead of "Go to step 2".

## What already worked

- All tap targets are at least 24×24px, and the main buttons are 44px tall.
- Every button and field has a name. No clickable element is missing from the keyboard. No positive `tabindex`.
- Sheets and dialogs close with Escape and give focus back to the button that opened them.
- Lesson steps move focus to the new section heading. Exam feedback is in a live region.
- Reduced motion: design tokens set every duration to 0. The diagram animates only with `prefers-reduced-motion: no-preference` and shows all steps as a list otherwise. The celebration and loading blocks stand still.
- The diagram's arrow keys work only when focus is inside the diagram.

## Tests moved to Phase 5

### 1. Reading time of the pilot lesson — moved to Phase 5
On 2026-10-29 you chose to skip this test. Three ways to get the result to me (copy, download, send) did not work, so the reading time is measured later with real learners in the app. Until then, the lesson keeps its estimate of about 10 minutes (1,996 words).

Open the [Lesson Page Prototype](https://claude.ai/artifact/PVy3so2N1oD2SrhoSVSLwz) and read it from step 1 to the end in one go, as a learner would. Do the quick checks and look at the diagram. A **Reading timer** box at the bottom of each step shows the time per section on the last step. Press "Copy the result" and paste it to me.

- The timer pauses when you leave the tab or do nothing for 2 minutes.
- "Start again from step 1" resets it.
- The lesson has **1,996 words** (all text, with code). The lesson says "about 10 minutes", which means about 200 words per minute.

### 2. One VoiceOver test (about 5 minutes) — moved to Phase 5
On 2026-10-29 you chose to skip this test for now. It moves to Phase 5, on the real app.

Use Safari on your Mac. Open the [Exam and Results Prototype](https://claude.ai/artifact/P41sZga3jfPNXuz6ZVQNLw).

1. Turn on VoiceOver with **Command-F5** (on some keyboards, Command-Fn-F5).
2. Press **Tab** to "Start the exam", then press **Return**. VoiceOver should read the question.
3. Press **Tab** to an answer and press **Space**, then Tab to "Check answer" and press **Return**. VoiceOver should read whether you were right.
4. Press **Control-Option-U** to open the rotor. Use the Left and Right arrows to see the headings and landmarks lists. Press **Escape** to close it.
5. Turn VoiceOver off with **Command-F5**.

Tell me anything that was confusing, silent or read twice.

Sources: [Turn VoiceOver on or off on Mac](https://support.apple.com/guide/voiceover/turn-voiceover-on-or-off-vo2682/mac), [VoiceOver general commands on Mac](https://support.apple.com/guide/voiceover/general-commands-cpvokys01/mac), [Get started with VoiceOver on Mac (rotor)](https://support.apple.com/en-euro/guide/voiceover/vo4be8816d70/mac). Checked 2026-10-24.

## Notes for Phase 5

- Run axe in automated tests on every screen, in light and dark mode, with transitions turned off.
- Run `check-brand.mjs` in CI so a color change cannot break contrast.
- Keep ids unique when components are put together (the lesson and the diagram collided).
