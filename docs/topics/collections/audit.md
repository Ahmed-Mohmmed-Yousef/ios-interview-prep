# Audit: collections (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `How to answer` (junior) | "ensuring thread safety" for value-type collections with COW | WRONG | Swift Concurrency / Value Semantics | Removed false "thread safety" claim; clarified copies stay independent without extra copying until changed |
| `The simple idea` | `let` collection "is completely immutable" | WRONG (imprecise) | CollectionTypes.md ("Mutability of Collections") | Clarified you cannot add, remove, or replace items in a `let` collection |
| `The simple idea`, `In code` | `insert(_:at:)`, Set operations (`intersection`, `union`, `subtracting`, `symmetricDifference`), `Hashable` building on `Equatable` (`==`) | UNTAUGHT | CollectionTypes.md; Array/Set docs; swiftc | Added `insert(_:at:)` and `intersection(_:)` to verified `<CodeExample>`, explained Set operations and `Hashable` + `Equatable` |
| `In code`, `Traps`, `Answers`, `Recap` | Raw LaTeX `$O(1)$` / `$O(n)$` and untaught `Element?` | RULES / UNTAUGHT | plain-english.md | Replaced with `` `O(1)` `` / `` `O(n)` `` and "an optional value" |
| `meta` | `baseline: { swift: "6.4", xcode: "27", ios: "27" }`, `lastVerified: "2026-11-09"`, missing trailing slash & Set source | OUTDATED / RULES | developer.apple.com/support/xcode | Updated to `27.2`, `lastVerified: "2026-11-14"`, added Set doc and trailing slash |
| Layout (`<TryIt>`) | `<TryIt>` placed before `## Interview traps` | RULES | docs/lesson-format.md | Moved `<TryIt>` to the end after `## Recap` |
| Prose throughout | Hard words (`arbitrary`, `deduplication`, `amortized`, `bucketing`, `terminating`) | HARD-ENGLISH | .claude/rules/plain-english.md | Rewrote in B1 English |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q5` option d, `q14` options a/b | Unbelievable distractors (`remote network caches`, `encrypt their memory`, `slower clocks`) | RULES | .claude/rules/questions.md | Replaced with realistic collection mistakes |
| `q7`, `q13`, `q21`, `q28` | `lessonSection` pointed to "How to answer" or "The simple idea" instead of where taught | RULES | lesson.mdx headings | Updated `q7`, `q28` -> `"The simple idea"`; `q13`, `q21` -> `"In code"` |
| `q24`–`q28` prompts | Asked for "2–4 sentences" | RULES | .claude/rules/questions.md | Updated all five prompts to "Answer in 2–5 sentences." |
| `q2`, `q4`, `q24`–`q28` | Hard words (`prohibits`, `contiguous memory slots`, `cumbersome`, `aggregation algorithms`, `terminating`, `occurrences`) | HARD-ENGLISH | .claude/rules/plain-english.md | Simplified to B1 English and aligned `q25` rubric wording |
| Difficulty mix | Only 1/31 (3%) hard questions | RULES | .claude/rules/questions.md (~20% hard) | Re-leveled `q6`, `q7`, `q8`, `q9`, `q14`, `q26` to hard (3) alongside `q28` for 31 live questions (42% easy / 35% medium / 23% hard) |
| Versions and `lastVerified` | `topic.json` v1 (`2026-10-22`), `questions.json` v1 (`2026-11-09`) | RULES | docs/audit/README.md | Bumped `topic.json` to v2 with `changes` note, `questions.json` to v2, canonical trailing-slash URLs, aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `validate-curriculum`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs collections` — all passed.
