# Audit: strings-and-characters (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `Trap 3` | "A single emoji can take up to 25 bytes of UTF-8 memory" | WRONG | `swiftc` (`"👩🏽‍❤️‍💋‍👨🏿".utf8.count == 35`) | Changed to "25 bytes or more in UTF-8 memory" |
| `How to answer` (junior) | "prevent memory leaks from retained parent buffers" | WRONG (imprecise) | StringsAndCharacters.md ("Substrings") | Clarified it avoids keeping the large parent buffer in memory |
| `The simple idea`, `In code` | Canonical equivalence (`"cafe\u{301}" == "café"`), `endIndex` past-the-end crash + `index(before:)`, `isEmpty` (`O(1)` vs `count`), multi-line `"""` indentation + `\`, `\(...)` interpolation, Copy-on-Write (COW), `nextIndex...` slice | UNTAUGHT | StringsAndCharacters.md; swiftc | Taught all of them in `## The simple idea` and verified `<CodeExample>` blocks |
| `The simple idea`, `How to answer` | Raw LaTeX `$n$-th` and `$O(n)$` | RULES / HARD-ENGLISH | plain-english.md | Replaced with plain `nth` and `` `O(n)` `` |
| `meta` | `baseline: { swift: "6.4", xcode: "27", ios: "27" }`, `lastVerified: "2026-11-09"`, missing trailing slash & String doc source | OUTDATED / RULES | developer.apple.com/support/xcode | Updated to `27.2`, `lastVerified: "2026-11-14"`, added String reference link and trailing slash |
| Layout (`<TryIt>`) | `<TryIt>` placed before `## Interview traps` | RULES | docs/lesson-format.md | Moved `<TryIt>` to the end after `## Recap` |
| Prose throughout | Hard words (`fragmented memory sectors`, `prioritize`, `naive`, `deceptive`, `conceptually`) | HARD-ENGLISH | .claude/rules/plain-english.md | Rewrote in B1 English |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q1` option c explanation | Mentioned untaught "collection protocols" | UNTAUGHT | lesson.mdx | Changed to "struct (a value type) holding Character values in order" |
| `q6` option d, `q7` option d | Weak distractors (`asynchronous Swift tasks`, `Apple Silicon devices`) | RULES | .claude/rules/questions.md | Replaced with believable String mistakes |
| `q15` | `lessonSection: "How to answer in the interview"` | RULES | lesson.mdx | Changed `lessonSection` to `"The simple idea"` where COW is taught |
| `q24`–`q28` prompts | Asked for "2–4 sentences" | RULES | .claude/rules/questions.md | Updated all five prompts to "Answer in 2–5 sentences."; aligned `q24` prompt with `String.Index` rubric criterion |
| `q3`, `q14`, `q24`–`q28` | Hard words (`iterating`, `deallocated`, `sacrificing`, `underlying`, `past-the-end boundary`, `object` vs `property`) | HARD-ENGLISH | .claude/rules/plain-english.md | Simplified to B1 English |
| Difficulty mix | Only 1/31 (3%) hard questions | RULES | .claude/rules/questions.md (~20% hard) | Re-leveled `q3`, `q5`, `q16` to medium (2) and `q7`, `q10`, `q11`, `q15`, `q23`, `q27` to hard (3) for 31 live questions (42% easy / 35% medium / 23% hard) |
| Versions and `lastVerified` | `topic.json` v1 (`2026-10-22`), `questions.json` v1 (`2026-11-09`) | RULES | docs/audit/README.md | Bumped `topic.json` to v2 with `changes` note, `questions.json` to v2, canonical trailing-slash URLs, aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `validate-curriculum`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs strings-and-characters` — all passed.
