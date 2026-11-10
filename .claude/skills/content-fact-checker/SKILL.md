---
name: content-fact-checker
description: Fact-check a topic's lesson and question bank against current official Apple/Swift sources via web search, and report or fix errors, outdated APIs, unverifiable claims and copied text.
when_to_use: '"fact-check X", "verify this lesson", "is this content still correct", "review the questions", before marking a topic done, or after a new Swift/iOS release'
argument-hint: "[topic-id | all]"
context: fork
---

# Content fact-checker

Check topic `$ARGUMENTS` (`content/topics/<topic-id>/lesson.mdx` and `questions.json`). For `all`, check every topic whose `lastVerified` is older than the latest Swift/Xcode release listed in `docs/stack.md`.

## Steps

1. **List every factual claim** in the lesson and every answer/explanation/rubric item in the bank.
2. **Verify each one now on the web** — official sources only (`.claude/rules/research.md`). Fetch the pages in `meta.sources` and question `sources` to confirm they still exist and still say this.
3. **Check currency:** compare against the current Swift/Xcode/iOS release (check developer.apple.com/support/xcode). Flag deprecated APIs presented as current, and behavior that changed in recent versions. **Check new Xcode project defaults too** (for example default main-actor isolation): a rule can be true in a Swift package and false in a new app project. Confirm such cases with the compiler (`swiftc -swift-version 6`, with and without `-default-isolation MainActor`).
4. **Check code:** Swift 6 language mode compatibility; `code-reading` outputs traced step by step.
5. **Check copyright:** flag passages that look copied from Apple documentation.
6. **Check plain English** (`.claude/rules/plain-english.md`): sentences over 25 words, hard words, idioms, unexplained terms. Verdict `HARD-ENGLISH` with a simpler rewrite.
7. **Check exam fairness:** run `node scripts/check-coverage.mjs <topic-id>` first, then read every question yourself. Every tested idea is taught in a main lesson section of this topic or of a prerequisite (not only "Go deeper"). This includes ideas the code uses without naming them (labels, ranges, `continue`). Every prompt asks for what its rubric scores, and no rubric key criterion scores an idea the lesson does not teach. Option lengths are balanced.
8. **Check questions against rules** in `.claude/rules/questions.md` (one correct option, believable distractors, explanations, rubric sums to 100, pool size and mix).

## Output

A table per file: `location | claim | verdict (OK / WRONG / OUTDATED / UNVERIFIED / COPIED / HARD-ENGLISH) | evidence URL | suggested fix`.

Don't edit files unless the user asks.

## Fix mode (the content audit and the publish gate)

When asked to fix (for example `<topic-id> fix`), follow "How a topic is audited and fixed" in `docs/audit/README.md`:
- Fix every finding: wrong facts first, then untaught questions (teach the idea in a main section, or retire the question and add a new one with a new id), then missing current features, then plain English and question rules.
- Never change or reuse a question id. Keep at least 30 live questions and the type and difficulty mix.
- Confirm each changed fact with the compiler or an official page. Run the content hooks, `node scripts/validate-curriculum.mjs`, `node scripts/run-swift-examples.mjs` on both files and `node scripts/check-coverage.mjs <topic-id>`.
- Set the same `lastVerified` (today) in `topic.json`, the lesson `meta` and `questions.json`. Bump the bank `version`. Bump the topic `version` with a simple-English `changes` note when a learner who passed should know.
- Write `docs/topics/<topic-id>/audit.md` (the findings table, with what changed) and `audit.json` (format in `docs/audit/README.md`, `"independent": true`). Then run `node scripts/check-publish-gate.mjs <topic-id> --code`. Write `"result": "pass"` only when it passes.
- You are independent only when you did not write this topic. If you wrote it in this session, say so and leave `audit.json` to a fresh agent.
