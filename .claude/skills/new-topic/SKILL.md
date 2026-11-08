---
name: new-topic
description: Run the full topic workflow for one topic, from research to a review page, following docs/topic-workflow.md, and finish with a short report. Never publishes.
when_to_use: '"make the topic X", "build topic X end to end", "start the next topic", Phase 4 topic production'
argument-hint: "[topic-id]"
disable-model-invocation: true
---

# New topic: $ARGUMENTS

Take one topic from `planned` to `review`. The steps and their "done when" checks are in `docs/topic-workflow.md`; follow them in order. Stop and ask the user when a step needs their choice (see `.claude/rules/ask-dont-guess.md`).

## Before you start

1. Read `content/topics/$ARGUMENTS/topic.json`. Stop if the folder does not exist, or if the status is `published`. Changing a published topic follows "Improving a published topic later" in `docs/topic-workflow.md`.
2. Check the prerequisites in `topic.json`. If a prerequisite is not at least `review`, tell the user and ask whether to continue.
3. Mark the topic as started in `PROGRESS.md` (🔄), with a change-log line.

## Steps

| # | Step | How | Done when |
|---|---|---|---|
| 1 | Research | Web search and official pages (`.claude/rules/research.md`). Check key facts with `swiftc -swift-version 6` | Facts listed with sources; common wrong ideas and interview questions per level noted |
| 2 | Lesson | Follow `.claude/skills/lesson-writer/SKILL.md` | The content hook passes. `node scripts/run-swift-examples.mjs content/topics/$ARGUMENTS/lesson.mdx` passes. Status `draft` |
| 3 | Plain-English review | Delegate to the `plain-english-reviewer` subagent with the lesson path | Every finding fixed or explained |
| 4 | Diagram | Follow `.claude/skills/diagram-animator/SKILL.md` for each `<Diagram>` | Works at 375px, has a reduced-motion list, shows the code line on each step |
| 5 | Exam | Follow `.claude/skills/exam-writer/SKILL.md` | 30+ questions, the right mix, every `verify` passes, each rubric tested with 3 sample answers |
| 6 | Fact-check | Follow `.claude/skills/content-fact-checker/SKILL.md` | Every finding fixed or explained |
| 7 | Checks | `node scripts/validate-curriculum.mjs`, `node scripts/curriculum-report.mjs`, `node scripts/run-swift-examples.mjs` on the lesson and the questions | All pass |
| 8 | Review page | Build the topic's prototype page and publish it as an artifact. Write its link into files only after the publish returns it | Page works at 375px in light and dark mode. Status `review` |

## Rules

- **Never set the status to `published`.** Only the user approves publishing (step 8 of `docs/topic-workflow.md`).
- Do not skip a failing check. Fix the cause, or tell the user why it cannot pass.
- Keep `PROGRESS.md` current after each step: 🟡 when the review page is ready.

## Report

End with a short report in simple English:
- The review page link.
- Counts: sources (official / community), code examples, questions by type.
- Anything not verified, marked `UNVERIFIED`.
- Fact-check and plain-English findings, and what changed.
- The one question for the user: approve the topic, or what to change.
