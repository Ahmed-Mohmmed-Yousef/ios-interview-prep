# Audit: functions (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `The simple idea`, `In code` | `Void` / `()`, tuple return `(min: Int, max: Int)`, variadic parameters (`Int...`), nested functions, function types omitting labels, copy-in copy-out `inout`, higher-order functions, multi-statement `return` rule | UNTAUGHT | Functions.md; swiftc | Taught all of them in `## The simple idea` and added a verified `<CodeExample>` covering `Void`, tuples, variadic `...`, and nested functions |
| `meta` | `baseline: { swift: "6.4", xcode: "27", ios: "27" }`, `lastVerified: "2026-11-09"`, missing trailing slash | OUTDATED / RULES | developer.apple.com/support/xcode | Updated to `27.2`, `lastVerified: "2026-11-14"`, canonical trailing slash |
| Layout (`<TryIt>`) | `<TryIt>` placed before `## Interview traps` | RULES | docs/lesson-format.md | Moved `<TryIt>` to the end after `## Recap` |
| Prose throughout | Hard words (`self-contained`, `expressive`, `conversational`, `backwards compatibility`, `illustrates`, `consists of`, `mandatory`) | HARD-ENGLISH | .claude/rules/plain-english.md | Rewrote in B1 English |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q3`, `q7`, `q8`, `q13` | Weak/joke distractors (`remote thread registers`, `sandbox containers`, `decrypts secure user input`, `JSON files in disk cache`, `upon app termination`) | RULES | .claude/rules/questions.md | Replaced with believable function mistakes |
| `q10`, `q13`, `q21`, `q22`, `q26` | `lessonSection` pointed to "How to answer" or mismatched section | RULES | lesson.mdx headings | Updated `q10`, `q13`, `q26` -> `"The simple idea"`; `q21`, `q22` -> `"In code"` |
| `q24`–`q28` prompts | Asked for "2–4 sentences" | RULES | .claude/rules/questions.md | Updated all five prompts to "Answer in 2–5 sentences." |
| `q2`, `q5`, `q12`, `q24`–`q28` | Hard words (`terminates`, `recursively`, `consists of`, `mandatory`, `indicates`, `explicitly`, `dedicated`) | HARD-ENGLISH | .claude/rules/plain-english.md | Simplified to B1 English |
| Difficulty mix | 0/31 (0%) hard questions | RULES | .claude/rules/questions.md (~20% hard) | Re-leveled `q3`, `q25` to medium (2) and `q10`, `q11`, `q13`, `q22`, `q26`, `q27`, `q31` to hard (3) for 31 live questions (42% easy / 35% medium / 23% hard) |
| Versions and `lastVerified` | `topic.json` v1 (`2026-10-22`), `questions.json` v1 (`2026-11-09`) | RULES | docs/audit/README.md | Bumped `topic.json` to v2 with `changes` note, `questions.json` to v2, canonical trailing-slash URLs, aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `validate-curriculum`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs functions` — all passed.
