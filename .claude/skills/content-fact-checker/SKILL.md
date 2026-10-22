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
3. **Check currency:** compare against the current Swift/Xcode/iOS release (check developer.apple.com/support/xcode). Flag deprecated APIs presented as current, and behavior that changed in recent versions.
4. **Check code:** Swift 6 language mode compatibility; `code-reading` outputs traced step by step.
5. **Check copyright:** flag passages that look copied from Apple documentation.
6. **Check plain English** (`.claude/rules/plain-english.md`): sentences over 25 words, hard words, idioms, unexplained terms. Verdict `HARD-ENGLISH` with a simpler rewrite.
7. **Check questions against rules** in `.claude/rules/questions.md` (one correct option, believable distractors, explanations, rubric sums to 100, pool size and mix).

## Output

A table per file: `location | claim | verdict (OK / WRONG / OUTDATED / UNVERIFIED / COPIED / HARD-ENGLISH) | evidence URL | suggested fix`.

Don't edit files unless the user asks. When asked to fix, update `lastVerified` and bump the bank `version`.
