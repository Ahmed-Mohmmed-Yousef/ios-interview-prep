# Phase 2 Summary — Pilot Topic

Finished 2026-10-22. All 9 steps were reviewed and approved one by one. Every decision with its date is in [PROGRESS.md](../PROGRESS.md).

## What we built

| | |
|---|---|
| Pilot topic | **Structs vs Classes** (fresh, Swift Language) — topic version 2 |
| Lesson | [lesson.mdx](../content/topics/structs-vs-classes/lesson.mdx): guess first, analogy, diagram, 4 code examples with output, 3 quick checks, 4 traps, 3 sample answers, 4 extras, 10 official sources |
| Diagram | [Copy or Share Diagram](https://claude.ai/artifact/4tptMqRDWzod93nSudGRts) — friendly illustrated, code line on each step |
| Exam | [questions.json](../content/topics/structs-vs-classes/questions.json): 31 questions (15 / 8 / 5 / 3 by type; 12 / 12 / 7 by difficulty), bank version 4 |
| Prototype page | [Structs vs Classes Lesson](https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J) — built from the real `lesson.mdx` with the official MDX compiler |
| Format | [lesson-format.md](lesson-format.md), research-based |
| Workflow | [topic-workflow.md](topic-workflow.md) — the 8 steps every topic follows |

## New tools

- **`scripts/run-swift-examples.mjs`** — compiles every lesson example and code question with Swift 6.4 and compares the output.
- **`.claude/hooks/check-lesson.mjs`** — checks the lesson structure.
- **`prototype/build.mjs`** — builds the review page: MDX 3.1.1, React 19.3.1.
- **Rubric scoring** in `content/rules.json`: full / half / 0 points, and a key-point cap at 50.

## What the pilot taught us (all now in rules, skills or automatic checks)

| Lesson | Now enforced by |
|---|---|
| Running code catches real bugs (a starter code that did not compile, a "does not compile" option that did) | `verify` fields + code runner + hook |
| A `//` line in MDX shows as text | Lesson checker + template |
| Xcode project defaults can change a rule (main-actor default → `Sendable`) | Content rule + fact-checker skill |
| Tested ideas must be in the main lesson, not only in "Go deeper" | Question rules + lesson-writer and fact-checker skills |
| Prompts must ask for what rubrics score | Question rules + exam-writer and fact-checker skills |
| The right option must not stand out by length or position | Hook: length ≤ 1.5× and a–d spread (it found 3 more questions in the pilot) |
| Rubrics need half points and key points | `rubricScoring` + hook + schema |
| Every term needs an explanation, even in traps and notes | Lesson-writer skill |
| Edits must keep progress safe | Version + `changes` entry, proven in step 2.8 |

## Open items

| Item | When |
|---|---|
| Real reading time of a lesson (the estimate is 10 minutes; not yet measured with a learner) | Phase 3 user testing, or your own try of the prototype |
| Shuffle answer options in exams? | Phase 3 |
| How skipped topics count in the final percentage | Phase 3 |
| Final design of the "This topic was updated" message (a draft is on the prototype) | Phase 3 |
| Generalize the prototype builder for every topic | Before Phase 4 |
| Where per-topic notes live | Phase 4 planning |
