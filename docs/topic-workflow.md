# Topic Workflow

How one topic goes from `planned` to `published`. It is based on the pilot (Phase 2, Structs vs Classes). Phase 4 uses it for every topic. You review every topic on its own prototype page before it is published (user decision, 2026-10-22).

Run all the steps for one topic with `/new-topic <topic-id>` (Claude Code), or follow `.claude/skills/new-topic/SKILL.md` with any other agent.

## The steps

| # | Step | Tool | Done when |
|---|---|---|---|
| 1 | **Research** | Web search + official pages; run key facts with `swiftc -swift-version 6` | Facts listed with sources. Common wrong ideas and the interview questions for each level are noted |
| 2 | **Lesson** | `/lesson-writer <id>` | `lesson.mdx` passes the hook. `node scripts/run-swift-examples.mjs …/lesson.mdx` passes. Status `draft` |
| 3 | **Diagram** | `/diagram-animator <diagram-id>` | Friendly illustrated style, the code line on each step, reduced-motion list, works at 375px |
| 4 | **Exam** | `/exam-writer <id>` | 30+ questions, the right mix, every `verify` passes, each rubric tested with 3 sample answers |
| 5 | **Independent fact-check** | `/content-fact-checker <id> fix` (a fresh agent, never the writer) | `docs/topics/<id>/audit.json` says `"result": "pass"`; `node scripts/check-coverage.mjs <id>` shows no untaught questions |
| 6 | **Prototype page** | `prototype/build.mjs <id>` → publish | Page works at phone width. Status `review` |
| 7 | **Your review** | You try the page | You approve, or send feedback. Feedback goes back to step 2, 3 or 4 |
| 8 | **Publish** | Set status `published` | `node scripts/check-publish-gate.mjs <id> --code` passes, then the validator passes (needs `lesson.mdx`, 30+ questions, sources, published prerequisites, a passing `audit.json`) |

Every step updates `PROGRESS.md` when Phase 4 tracks topics there.

## Automatic checks that run on their own

- **Content hook** (after every edit in `content/`):
  - lesson structure, plain English, and the MDX `//` line trap
  - question rules: 4 options, explanations, `verify` on code questions, key rubric points, right answers spread over a–d, balanced option lengths
- **Validator** (`node scripts/validate-curriculum.mjs`): curriculum structure, prerequisites, sources policy, version history, publish rules, scoring rules.
- **Code runner** (`node scripts/run-swift-examples.mjs`): every lesson example and code question, compiled in Swift 6 mode.
- **Coverage check** (`node scripts/check-coverage.mjs <id>`): every question points at a real lesson heading, flags questions that may test ideas the lesson never teaches, the 2–5 sentence rule, the type and difficulty mix, and matching `lastVerified` dates.
- **Publish gate** (`node scripts/check-publish-gate.mjs <id> --code`): coverage + a passing independent `audit.json` + the code runner. Details: `docs/audit/README.md`.

## Improving a published topic later

1. Make the change in the lesson or the questions (never reuse question ids; retire instead of deleting).
2. Run the checks and the fact-checker on the changed parts.
3. If a learner who passed should know: bump `version` in `topic.json` and add a `changes` entry with the date and a simple-English note. Small fixes do not bump the version.
4. Rebuild the prototype page for your review.

After every new Swift or iOS release: run `/content-fact-checker all` (it checks topics whose `lastVerified` is older than the release), then follow the steps above for each finding.

## Known work before Phase 4 starts

- **The prototype builder only handles the pilot topic.** It expects a diagram at `docs/pilot/diagram-<id>.html` and writes to `docs/pilot/`. It needs to handle any topic, topics without a diagram yet, and a per-topic output folder.
- **Where per-topic notes live** (research, fact-check report, rubric test): to decide when Phase 4 is planned. One option is a folder per topic under `docs/topics/<id>/`.
