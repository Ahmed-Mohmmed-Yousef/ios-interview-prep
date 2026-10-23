# Project Progress

Last updated: **2026-10-23**

**Status marks:** ✅ done · 🟡 done, waiting for your review · 🔄 in progress · ⬜ not started · ⏸️ paused · ❌ dropped

---

## Phase 0 — Claude Code setup ✅

- ✅ Check the tech stack with web search → [docs/stack.md](docs/stack.md)
- ✅ Project guide → [CLAUDE.md](CLAUDE.md)
- ✅ Rules → [.claude/rules/](.claude/rules/)
  - ✅ Always search the web → [research.md](.claude/rules/research.md)
  - ✅ Simple English → [plain-english.md](.claude/rules/plain-english.md)
  - ✅ Ask, don't guess → [ask-dont-guess.md](.claude/rules/ask-dont-guess.md)
  - ✅ Lesson content → [content.md](.claude/rules/content.md)
  - ✅ Questions → [questions.md](.claude/rules/questions.md)
  - ✅ Design → [design.md](.claude/rules/design.md)
- ✅ Skills → [.claude/skills/](.claude/skills/)
  - ✅ lesson-writer (+ lesson template)
  - ✅ exam-writer (+ question format)
  - ✅ content-fact-checker
  - ✅ diagram-animator
- ✅ Automatic content checks (hook): lesson sections, question rules, simple English

## Phase 1 — Curriculum map ✅

Plan: [docs/phase-1-plan.md](docs/phase-1-plan.md)

- ✅ **1.1 Data model** — file format, starter files, validator → [docs/curriculum-schema.md](docs/curriculum-schema.md)
  - ✅ Your OK on skip-test sizes in [content/rules.json](content/rules.json)
- ✅ **1.2 Level definitions** — what each level (fresh → staff) must know → [docs/levels.md](docs/levels.md), [content/levels.json](content/levels.json)
- ✅ **1.3 Research topics** — from official sources and real interviews → [docs/research/](docs/research/README.md) (164 candidate topics)
- ✅ **1.4 Units** — group topics into subjects → [docs/units.md](docs/units.md), [content/units.json](content/units.json) (14 units)
- ✅ **1.5 Topics per level** — level and learning goal for each topic → [docs/topics.md](docs/topics.md) (164 topics: 149 main, 15 bonus)
- ✅ **1.6 Order and prerequisites** — the path, with a visual page per level → [docs/path-order.md](docs/path-order.md), [Path Map page](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM) (221 prerequisite links, 0 conflicts)
- ✅ **1.7 Sources** — checked official links for every topic → [docs/sources.md](docs/sources.md) (164 of 164 topics, 264 official + 61 community links)
- ✅ **1.8 Final check** — validate and save everything → [docs/phase-1-summary.md](docs/phase-1-summary.md) (all checks pass; saved with Git)

## Phase 2 — Pilot topic ✅

One topic built end to end (lesson, diagram, exam) to test the format before we write many.
Plan: [docs/phase-2-plan.md](docs/phase-2-plan.md) · Pilot topic: **Structs vs Classes**

- ✅ **2.1 Lesson format** — final sections, components and the "code + output" block → [docs/lesson-format.md](docs/lesson-format.md)
- ✅ **2.2 Topic research** — official sources and interview questions for Structs vs Classes → [docs/pilot/research.md](docs/pilot/research.md)
- ✅ **2.3 Write the lesson** — `lesson.mdx` in simple English, every code example run → [lesson.mdx](content/topics/structs-vs-classes/lesson.mdx)
- ✅ **2.4 Build the animation** — "copy vs shared" animation with step controls → [prototype](https://claude.ai/artifact/4tptMqRDWzod93nSudGRts), [source](docs/pilot/diagram-structs-vs-classes.html)
- ✅ **2.5 Write the exam** — 30+ questions of all 4 types, every code question run → [questions.json](content/topics/structs-vs-classes/questions.json) (31 questions)
- ✅ **2.6 Fact-check** — official sources, simple English, copyright → [docs/pilot/fact-check.md](docs/pilot/fact-check.md)
- ✅ **2.7 Prototype page** — lesson + animation + exam + result screen; rubrics tested with sample answers → [prototype](https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J), [rubric test](docs/pilot/rubric-test.md)
- ✅ **2.8 Improve once** — your feedback as version 2 with a `changes` entry (proves the edit workflow) → topic version 2, bank version 3, [rubric test: after](docs/pilot/rubric-test.md)
- ✅ **2.9 Lessons learned** — update template, rules and skills; all checks; Git commit → [docs/phase-2-summary.md](docs/phase-2-summary.md), [docs/topic-workflow.md](docs/topic-workflow.md)

## Phase 3 — Design system and UX 🔄

Plan: [docs/phase-3-plan.md](docs/phase-3-plan.md)

- ✅ **3.1 Screens and flows** — every screen and how learners move between them → [docs/ux/flows.md](docs/ux/flows.md), [Flow Map page](https://claude.ai/artifact/5cQDao3KDygBCQ7dGYWmv6)
- ✅ **3.2 Name and brand** — name options (checked), voice, logo idea, color and type directions → **Prep Stops**, Calm Trail · [docs/brand/brand.md](docs/brand/brand.md), [Brand Board](https://claude.ai/artifact/Ai3rDph8YXX39ycWy7qZdv), `config/brand.json`
- 🟡 **3.3 Design system** — tokens (light and dark) and core components; name and colors in one place → [Design System page](https://claude.ai/artifact/9uwRqVKPFEt5qTVsjbV2Ao), [docs/design/design-system.md](docs/design/design-system.md), `config/generated/tokens.css`
- ⬜ **3.4 Path map** — the winding road with stages, stops, bonus side roads, skip-test points
- ⬜ **3.5 Lesson page** — the pilot lesson layout improved with the design system
- ⬜ **3.6 Exam and results** — exam, feedback, topic result, path total, "topic updated" message
- ⬜ **3.7 Start and progress** — first visit, level picker, skip tests, saving, export and import
- ⬜ **3.8 Usability and accessibility check** — contrast, keyboard, screen reader, motion, 375px, reading time
- ⬜ **3.9 Final check** — one clickable walk-through, design summary, Git commit

Open choices from Phase 2 — all decided in step 3.1 (see the requirements table).

## Phase 4 — Content production ⬜

Write all lessons and question banks, level by level, with fact checks.
- ✅ A repeatable "improve a topic" workflow → [docs/topic-workflow.md](docs/topic-workflow.md)
- ⬜ Generalize the prototype builder for every topic (before Phase 4 starts)
- ⬜ Decide where per-topic notes live (research, fact-check, rubric test)

## Phase 5 — Web app MVP ⬜

Level picker, path, lessons, browser-graded exams, saved progress, results.
- ⬜ Progress keeps working when a topic is edited, moved, retired or gets a new version (tested)

## Phase 6 — AI grading ⬜

Written answers and code answers graded by AI, with limits against abuse.
- ⬜ **Before Phase 6 starts:** run the Claude Code setup recommender (`claude-code-setup` plugin, read-only) on the Phase 5 app code. Review its suggested hooks, skills, subagents, MCP servers and rules with you, and add only the ones you approve

## Phase 7 — Launch ⬜

Search engine setup, privacy-friendly analytics, deploy, feedback button.

## Phase 8 — Later ⬜

Login and sync, running real Swift code, review reminders, mock interviews.

---

## Your rules and requirements

New rules and changes you ask for are added here, with the date.

| Date | Requirement | Where it lives |
|---|---|---|
| 2026-10-22 | Always check facts with a web search, never from old knowledge | [research.md](.claude/rules/research.md) |
| 2026-10-22 | All learner text in simple English for a worldwide audience | [plain-english.md](.claude/rules/plain-english.md) |
| 2026-10-22 | Ask simple questions before you continue, never guess | [ask-dont-guess.md](.claude/rules/ask-dont-guess.md) |
| 2026-10-22 | Plan each phase first, split it into steps, do one step at a time | [docs/phase-1-plan.md](docs/phase-1-plan.md) |
| 2026-10-22 | The curriculum must be easy to add to and update | [docs/curriculum-schema.md](docs/curriculum-schema.md) |
| 2026-10-22 | Show progress in this file, with check marks, updated after every change | this file |
| 2026-10-22 | Levels match a mix of companies (big tech, startups, normal companies) | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | Non-coding skills (system design, leadership, behavior) are required from senior up | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | Learners pick a level with a description and a self-check list, not years | [content/levels.json](content/levels.json) |
| 2026-10-22 | Teach coding-interview algorithms as a Swift unit that counts in the score | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | No Objective-C; Swift only | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | Teach Apple tools only; mention popular libraries briefly | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | Cover iPhone and iPad only | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | 14 small units, one per subject | [docs/units.md](docs/units.md) |
| 2026-10-22 | Coding Interview unit comes right after Swift Language in every stage | [docs/units.md](docs/units.md) |
| 2026-10-22 | Map all ~164 topics now; write and publish them in waves | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Keep "Xcode, Projects and Git" in App and System (not first) | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Older tools (GCD, ObservableObject, Core Data, Combine) are required topics | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Prerequisite conflicts are shown to the user one by one, never fixed silently | [docs/path-order.md](docs/path-order.md) |
| 2026-10-22 | Path is shown on an interactive web page | [Path Map page](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM) |
| 2026-10-22 | async/await moves to junior; "Loading Data in SwiftUI" moves to mid; two lessons give short intros to later topics | [docs/path-order.md](docs/path-order.md) |
| 2026-10-22 | 1–3 key sources per topic now; more are added when lessons are written | [docs/sources.md](docs/sources.md) |
| 2026-10-22 | Community sources are allowed and marked only in Coding Interview, Mobile System Design, Behavior and Leadership, plus 9 named Architecture/Testing topics | [content/rules.json](content/rules.json) → `sources` |
| 2026-10-22 | WWDC videos count as sources when they explain the "why" | [docs/sources.md](docs/sources.md) |
| 2026-10-22 | Every topic must be easy to edit and improve in the future | [docs/curriculum-schema.md](docs/curriculum-schema.md) → "Editing and improving topics" |
| 2026-10-22 | Save the project with local Git; commits use ahmed.moyousef98@gmail.com (this project only) | `.git/config` |
| 2026-10-22 | Pilot topic is Structs vs Classes, shown as a clickable prototype page | [docs/phase-2-plan.md](docs/phase-2-plan.md) |
| 2026-10-22 | Lesson code examples are shown with their output, plus a link to Swift Playground | [docs/phase-2-plan.md](docs/phase-2-plan.md) |
| 2026-10-22 | Lessons have the same core sections plus optional extras; 8–12 minutes long | [docs/lesson-format.md](docs/lesson-format.md) |
| 2026-10-22 | Every lesson starts with a guess and has 2–3 quick checks (not scored) | [docs/lesson-format.md](docs/lesson-format.md) |
| 2026-10-22 | Pilot lesson: photocopy vs shared document analogy; sample answers for fresh, junior and senior; all four extras | [lesson.mdx](content/topics/structs-vs-classes/lesson.mdx) |
| 2026-10-22 | Diagrams use a friendly illustrated style; every step shows the code line that causes it | [diagram-animator skill](.claude/skills/diagram-animator/SKILL.md) |
| 2026-10-22 | About 20% hard questions may test traps, version notes and higher-level answers; "Go deeper" is never tested | [.claude/rules/questions.md](.claude/rules/questions.md) |
| 2026-10-22 | Written answers are 2–5 sentences | [.claude/rules/questions.md](.claude/rules/questions.md) |
| 2026-10-22 | Copy-on-write is taught as a trap in the main lesson (so q15 stays); the Sendable note explains both the Xcode main-actor default and Swift packages | [docs/pilot/fact-check.md](docs/pilot/fact-check.md) |
| 2026-10-22 | Exam feedback right after each question; 10-question exam mix: 5 multiple choice, 3 code reading, 1 written, 1 write-code; written answers use a self-check until AI grading | [prototype](https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J) |
| 2026-10-22 | Rubric scoring: met = full weight, partly met = half, not met = 0; key points cap a missed answer at 50 | [content/rules.json](content/rules.json) → `rubricScoring` |
| 2026-10-22 | You review every topic on its own prototype page before it is published | [docs/topic-workflow.md](docs/topic-workflow.md) |
| 2026-10-23 | App name: Claude suggests checked options, you pick; the name must stay easy to change (one config file) | [docs/phase-3-plan.md](docs/phase-3-plan.md) |
| 2026-10-23 | Designs are clickable web prototypes; calm and friendly feel; the path is a winding road | [docs/phase-3-plan.md](docs/phase-3-plan.md) |
| 2026-10-23 | Skipped topics count with the skip-test score; skip tests only for stages below your level | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Answer options are shuffled in every exam | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | An updated topic shows a badge and a note; the pass stays | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Locked topics are fully locked | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Level can change any time; progress is kept | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | First visit: a short welcome, then the level picker | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Name style: journey words; tagline "Interview prep for iOS developers" under the name; voice: friendly coach | [docs/brand/brand.md](docs/brand/brand.md) |
| 2026-10-23 | App name **Prep Stops**, direction **A · Calm Trail**; both live only in `config/brand.json` | [config/brand.json](config/brand.json) |
| 2026-10-23 | Before Phase 6, run the claude-code-setup recommender on the app code and add only approved hooks, skills and rules | [PROGRESS.md](PROGRESS.md) → Phase 6 |
| 2026-10-23 | Design system page is built from our token files (one source of truth) | [docs/design/design-system.md](docs/design/design-system.md) |
| 2026-10-23 | Theme follows the device, with a Light / Dark / Device switch | [docs/design/design-system.md](docs/design/design-system.md) |
| 2026-10-23 | Passing a topic gets a small, calm celebration (no confetti, no sound) | [docs/design/design-system.md](docs/design/design-system.md) |

## Change log

Newest first.

- **2026-10-23** — Step 3.3 done, waiting for review: design tokens and 11 component groups, built from `config/brand.json` + `config/design-tokens.json` into `config/generated/tokens.css` (Tailwind v4 + shadcn/ui names) and the Design System page. The contrast check found and fixed 4 AA failures (light amber now `#9c6210`). Checked at 375px and in dark mode.
- **2026-10-23** — Step 3.2 approved. Step 3.3 started.
- **2026-10-23** — Added a step before Phase 6: run the claude-code-setup recommender on the app code (your request).
- **2026-10-23** — Step 3.2 done, waiting for review: Apple trademark rules checked; 16 names checked on the App Store, domains and the web; 7 shown; you picked Prep Stops and Calm Trail. Brand saved in `config/brand.json` with a check script.
- **2026-10-23** — Step 3.1 approved. Step 3.2 started.
- **2026-10-23** — Step 3.1 done, waiting for review: 12 screens, 8 flows, and clear definitions of topic score, progress and path score. The 3 open choices from Phase 2 are decided. Flow Map page published.
- **2026-10-23** — Phase 3 plan approved. Step 3.1 started.
- **2026-10-23** — Phase 3 planned: 9 steps, from screens and flows to one clickable walk-through.
- **2026-10-23** — Phase 2 approved. Phase 3 planning started.
- **2026-10-22** — Step 2.9 done, Phase 2 waiting for review: lessons learned turned into rules, skills and 3 new automatic checks (MDX `//` lines, option length, answer spread — the length check found and fixed 3 more pilot questions). Topic workflow and Phase 2 summary written. All checks pass.
- **2026-10-22** — Step 2.8 approved. Step 2.9 started.
- **2026-10-22** — Step 2.8 done, waiting for review: rubric scoring rules added to rules.json, schema, hook and validator; key points marked in all 8 rubrics; 2 borderline rubrics fixed; topic bumped to version 2 with a changes entry (edit workflow proven); prototype self-check now uses Yes/Partly/No and shows the update note.
- **2026-10-22** — Step 2.7 approved, with both rubric proposals (half credit for "partly met"; key points cap the score). Step 2.8 started.
- **2026-10-22** — Step 2.7 done, waiting for review: prototype page built from the real lesson.mdx with the official MDX compiler, plus the diagram and a 10-question exam with feedback, results, retakes and self-check. Tested in the browser at phone width. Fixed 5 bugs found while testing (MDX comment line, script clash, topic position, repeat questions without storage, double "Right"). Rubric test: 24 sample answers graded; 2 proposals for your decision.
- **2026-10-22** — Step 2.6 approved. Step 2.7 started.
- **2026-10-22** — Step 2.6 done, waiting for review: fact-check found 4 wrong or outdated facts, 1 rule issue, unclear terms and 4 weak questions or rubrics. All fixed and confirmed with Swift 6.4. Bank version 2. 4 lessons for future topics written down.
- **2026-10-22** — Step 2.5 approved. Step 2.6 started.
- **2026-10-22** — Step 2.5 done, waiting for review: 31 questions (15 multiple choice, 8 read-the-code, 5 written, 3 write-code; 12 easy, 12 medium, 7 hard). All 12 code checks pass with Swift 6.4. Fixed a starter code bug found while checking. New: `verify` field, the runner checks questions, the hook requires `verify`, publishing needs 30+ questions.
- **2026-10-22** — Step 2.4 approved. Step 2.5 started.
- **2026-10-22** — Step 2.4 done, waiting for review: illustrated "copy vs shared" diagram prototype with 4 steps, code line per step, Back/Next/Replay, keyboard keys, screen reader text and a reduced-motion list. Checked at phone width (384px).
- **2026-10-22** — Step 2.3 approved, including the "Which one should you choose?" heading (now an allowed extra). Step 2.4 started.
- **2026-10-22** — Step 2.3 done, waiting for review: pilot lesson written (status draft). 4 code examples pass with Swift 6.4; lesson checks and simple-English check pass. New tool: `scripts/run-swift-examples.mjs`.
- **2026-10-22** — Step 2.2 approved. Step 2.3 started.
- **2026-10-22** — Step 2.2 done, waiting for review: Structs vs Classes researched from the Swift book, Apple docs, WWDC16 and Swift Optimization Tips; 14 facts checked by running code with Swift 6.4; 6 common wrong ideas; interview questions by level.
- **2026-10-22** — Step 2.1 approved. Step 2.2 started.
- **2026-10-22** — Step 2.1 done, waiting for review: lesson format based on learning research (guess first, quick checks, diagram, code with output, traps, interview answers, recap, Swift Playground link); new template; new lesson checker in the content hook. Fixed the app name: it is "Swift Playground" now.
- **2026-10-22** — Phase 2 plan approved. Step 2.1 started.
- **2026-10-22** — Phase 2 planned: 9 steps, pilot topic Structs vs Classes. Code examples will be run with Swift 6.4 on this Mac.
- **2026-10-22** — Phase 1 approved. Phase 2 planning started.
- **2026-10-22** — Step 1.8 done, waiting for review: all checks pass on every file, every level self-check item is covered, stale docs fixed, Phase 1 summary written, project saved as the first Git commit.
- **2026-10-22** — Step 1.7 approved. Step 1.8 started.
- **2026-10-22** — Step 1.7 done, waiting for review: 325 checked links (264 official, 61 community) on all 164 topics; source policy added to `rules.json` and enforced by the validator; sources shown on the Path Map page.
- **2026-10-22** — Step 1.6 approved. Step 1.7 started.
- **2026-10-22** — Step 1.6 done, waiting for review: topic order inside each unit, 221 prerequisite links, 4 conflicts decided by the user, new `briefIntro` field, interactive Path Map page (`scripts/build-path-page.mjs`).
- **2026-10-22** — Step 1.5 approved. Step 1.6 started.
- **2026-10-22** — Made topics easy to edit and improve: added an editing guide (what can change, when to bump version, split, merge, retire), an optional `changes` history in `topic.json` checked by the validator, `retired` for questions, and edit checks in Phases 2, 3, 4 and 5.
- **2026-10-22** — Step 1.5 done, waiting for review: 164 `topic.json` files (status "planned"), placed in units, each with a level and a goal in simple English. Changed: "Dynamic Programming" and "Bits, Math and Geometry" moved from senior to mid bonus, because a bonus topic must sit next to a main topic of the same level, and the Coding Interview unit has no senior main topics. New report script: `scripts/curriculum-report.mjs`.
- **2026-10-22** — Step 1.4 approved. Step 1.5 started.
- **2026-10-22** — Step 1.4 done, waiting for review: 14 units in order, each with a goal. Topics are added in step 1.5.
- **2026-10-22** — Step 1.3 approved. Step 1.4 started.

- **2026-10-22** — Step 1.3 done, waiting for review: official sources, interview topics and 164 candidate topics in 14 draft areas.
- **2026-10-22** — Step 1.2 approved. Step 1.3 started.
- **2026-10-22** — Step 1.2 done, waiting for review: 5 level definitions with self-check lists, based on the Dropbox career framework. Levels file now has summary, description and self-check, all checked for simple English.
- **2026-10-22** — Step 1.1 approved (with skip-test sizes). Step 1.2 started.
- **2026-10-22** — Added this progress file.
- **2026-10-22** — Step 1.1 done: curriculum data model, validator, starter files.
- **2026-10-22** — Phase 1 split into 8 steps.
- **2026-10-22** — Added the simple English rule and its automatic check; fixed skill headers.
- **2026-10-22** — Phase 0 done: stack checked, rules, skills, content hook.
