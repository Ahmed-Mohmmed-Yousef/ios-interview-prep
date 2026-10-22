# questions.json schema

This is the contract between content and the app. In Phase 5 it becomes a Zod schema in code; until then this file is the source of truth. Change it only with the user's approval.

```jsonc
{
  "topicId": "arc-memory",          // matches the folder name and lesson meta.id
  "version": 1,                      // bump on every change to the bank
  "lastVerified": "YYYY-MM-DD",
  "questions": [ /* Question[] */ ]
}
```

## Common fields (every question)

| Field | Type | Notes |
|---|---|---|
| `id` | string | `<topicId>-q<number>`, never reused or renumbered |
| `type` | `"mcq" \| "code-reading" \| "written" \| "code-write"` | |
| `difficulty` | `1 \| 2 \| 3` | easy / medium / hard |
| `prompt` | string | Markdown allowed |
| `lessonSection` | string | Lesson heading this question tests |
| `sources` | `{ title, url }[]` | at least one official URL |
| `needsReview` | boolean, optional | set when an answer couldn't be fully verified |
| `retired` | boolean, optional | `true` removes the question from new exams but keeps it for old results. Never delete a question or reuse its id |

## `mcq` and `code-reading`

Graded in the browser. `code-reading` adds a `code` field ("what prints?", "find the bug", "what's the retain cycle?").

```jsonc
{
  "id": "arc-memory-q1",
  "type": "code-reading",
  "difficulty": 2,
  "prompt": "What does this print?",
  "code": "class A { deinit { print(\"bye\") } }\nvar a: A? = A()\na = nil",
  "options": [
    { "id": "a", "text": "bye", "explanation": "Setting the only strong reference to nil frees the object, so deinit runs." },
    { "id": "b", "text": "Nothing", "explanation": "..." },
    { "id": "c", "text": "A compile error", "explanation": "..." },
    { "id": "d", "text": "A crash", "explanation": "..." }
  ],
  "answer": "a",
  "lessonSection": "In code",
  "sources": [{ "title": "Automatic Reference Counting", "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/" }]
}
```

Rules: exactly 4 options, `answer` is one option id.

## `written` and `code-write`

Graded by AI against the rubric. `code-write` adds an optional `starterCode`.

```jsonc
{
  "id": "arc-memory-q20",
  "type": "written",
  "difficulty": 2,
  "prompt": "Explain the difference between `weak` and `unowned`, and when you'd choose each.",
  "rubric": [
    { "criterion": "States that both don't increase the retain count", "weight": 30 },
    { "criterion": "weak is optional and becomes nil when the object is freed", "weight": 30 },
    { "criterion": "unowned assumes the object outlives the reference; accessing it after deallocation crashes", "weight": 25 },
    { "criterion": "Gives a correct example of when to use each", "weight": 15 }
  ],
  "modelAnswer": "...",
  "lessonSection": "Interview traps",
  "sources": [{ "title": "...", "url": "https://..." }]
}
```

Rules: rubric weights sum to 100; each criterion is concrete enough for an AI to check yes/no or partial.
