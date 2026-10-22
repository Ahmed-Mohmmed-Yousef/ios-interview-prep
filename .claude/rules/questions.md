---
paths:
  - "content/**/questions.json"
---

# Question bank rules

Schema: `.claude/skills/exam-writer/schema.md`. Every file must match it exactly.

## Pool size
- An exam draws **10 questions**. A bank holds **at least 30** non-retired questions, so retakes can show new questions.
- Banks grow and improve over time: add questions with new ids, fix questions in place, and set `"retired": true` instead of deleting. Never reuse or renumber an id.
- Mix per bank: about 50% `mcq`, 25% `code-reading`, 15% `written`, 10% `code-write`.
- Mix difficulty: about 40% easy (1), 40% medium (2), 20% hard (3).

## Quality
- One concept per question. Each question maps to a section of the lesson — don't test what the lesson doesn't teach.
- Phrase questions the way real interviewers ask them.
- `mcq` / `code-reading`: 4 options, exactly one correct. Wrong options must be believable mistakes, not jokes. Every option has an `explanation` saying why it's right or wrong.
- No "all of the above" / "none of the above". Avoid trick wording.
- **Plain English** (`.claude/rules/plain-english.md`) for prompts, options, explanations and model answers. A question must test iOS knowledge, not English skill — no double negatives, no "Which is NOT…" unless the word NOT is bold and there is no simpler way.
- The AI grader must judge ideas, not English quality. Every rubric criterion is about technical content; grammar and spelling never cost points.
- `code-reading` code must be verified: reason about the output step by step; if unsure, say so and flag the question `needsReview: true`.
- `written` and `code-write` need a `rubric` (weighted criteria that sum to 100) and a `modelAnswer`. The rubric is what the AI grader uses — make criteria concrete and checkable.
- Every question lists at least one official `sources` URL.
