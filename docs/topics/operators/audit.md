# Audit: operators (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `How to answer` (junior) | "The compiler prevents integer overflow crashes by default" | WRONG | BasicOperators.md "Arithmetic Operators"; swiftc | Fixed to state standard math operators stop with a runtime crash on overflow instead of wrapping silently like C |
| `The simple idea`, `In code` | `%` remainder (`-9 % 4 == -1`), `+=` returning `Void`, `&+`/`&-`/`&*` overflow operators, `==` vs `===` prose, array `.count` context | UNTAUGHT | BasicOperators.md; AdvancedOperators.md; swiftc | Added clear explanation and verified `<CodeExample>` for `%`, `+=`, and `&+`; added `names.count` array example and prose for `==` vs `===` |
| `meta` | `baseline: { swift: "6.4", xcode: "27", ios: "27" }`; missing `advancedoperators/` source; `lastVerified: "2026-11-09"` | OUTDATED / RULES | developer.apple.com/support/xcode | Updated baseline to `xcode: "27.2", ios: "27.2"`, added `advancedoperators/` URL with trailing slash, set `lastVerified: "2026-11-14"` |
| Layout (`<TryIt>`) | `<TryIt>` placed before `## Interview traps` | RULES | docs/lesson-format.md | Moved `<TryIt>` to the end after `## Recap` |
| `Hook`, `Analogy`, `Simple idea`, `In code`, `Traps`, `Answers`, `Recap` | Hard words (`categorizes`, `eliminate`, `precede`, `expressive clarity`, `corrupt`, `identical`, `object` vs `instance`) and weird option c in Hook | HARD-ENGLISH / RULES | .claude/rules/plain-english.md | Rewrote in B1 English, standardized on "class instance", and replaced Hook option c with a realistic mistake |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q15` option c explanation | "Structs are value types generally stored inline on the stack." | WRONG (imprecise) | swiftc / Swift language semantics | Replaced with "Structs are value types; each variable holds its own value rather than a shared reference." |
| `q5` explanation, `q25` rubric/modelAnswer | Required `Equatable` (not taught in this Fresh lesson or its prerequisites) | UNTAUGHT | lesson.mdx | Changed to "equal data" so rubric matches what the lesson teaches |
| `q24`–`q28` prompts | Asked for "2–4 sentences" | RULES | .claude/rules/questions.md | Updated all five prompts to "Answer in 2–5 sentences." |
| `q1`, `q3`, `q10`, `q11` | Weak/unfamiliar distractors (`strict concurrency`, `private in conditions`, `bitwise exclusive OR`, `background thread`) | RULES | .claude/rules/questions.md | Replaced with believable Fresh-level mistakes |
| `q2`, `q4`, `q5`, `q10`, `q13`, `q24`–`q28` | Hard words (`operands`, `modulo`, `dividend`, `vulnerabilities`, `exhibits undefined behavior`, `dedicated`, `iterating`) | HARD-ENGLISH | .claude/rules/plain-english.md | Simplified to B1 English |
| Difficulty mix | Only 1/31 (3%) hard questions | RULES | .claude/rules/questions.md (~20% hard) | Re-leveled `q13`, `q15`, `q20`, `q21`, `q25` to hard (3) and added `operators-q32` (`&+` overflow, verified with `swift`) for 32 live questions (44% easy / 34% medium / 22% hard) |
| Versions and `lastVerified` | `topic.json` v1 (`2026-10-22`), `questions.json` v1 (`2026-11-09`) | RULES | docs/audit/README.md | Bumped `topic.json` to v2 with `changes` note, `questions.json` to v2, updated source URLs to canonical trailing slashes, aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `validate-curriculum`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs operators` — all passed.
