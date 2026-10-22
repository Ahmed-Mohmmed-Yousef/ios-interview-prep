---
name: exam-writer
description: Generate or extend a topic's question bank (content/topics/<topic-id>/questions.json) for the iOS interview prep app — mcq, code-reading, written and code-write questions with explanations, rubrics and sources, matching the schema.
when_to_use: '"write questions for X", "create the exam", "add more questions", "generate question bank", any new or changed questions.json'
argument-hint: "[topic-id]"
---

# Exam writer

Build the question bank for topic `$ARGUMENTS`.

## Steps

1. **Read the lesson** `content/topics/<topic-id>/lesson.mdx`. Questions test only what the lesson teaches. If there's no lesson yet, stop and suggest `/lesson-writer` first.
2. **Read the rules** in `.claude/rules/questions.md` (pool size, type mix, difficulty mix, quality bar) and the schema in `schema.md` next to this file.
3. **Research** interview phrasing for this topic at this level, and verify every answer against an official source (`.claude/rules/research.md`). Don't rely on memory for API behavior.
4. **Write the bank.** If `questions.json` exists, improve it: keep existing ids, fix questions in place, add new ones with new ids, and set `"retired": true` on questions that should no longer appear. Never delete or renumber. Bump the bank `version`. If the exam changed in a way a learner should know, also bump the topic `version` and add a `changes` entry (see `docs/curriculum-schema.md`).
5. **Verify code questions** by tracing execution step by step. If an output depends on scheduling or is ambiguous, rewrite the question or set `needsReview: true`.
6. **Self-check:** count by type and difficulty against the target mix, ensure ids are unique, every option has an explanation, every rubric sums to 100, and all text passes the plain-English rule (`.claude/rules/plain-english.md`).
7. **Report** the counts (by type and difficulty) and any question flagged `needsReview`.
