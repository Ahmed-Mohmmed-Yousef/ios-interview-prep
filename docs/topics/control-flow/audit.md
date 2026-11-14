# Audit: control-flow (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-10)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| Simple idea, QuickCheck 1 | guard else exits with "return, throw, or break" | WRONG (incomplete) | Statements.md "Guard Statement"; ControlFlow.md "Early Exit"; swiftc | Now lists return, break, continue, throw, or a function that never returns (`fatalError`); new trap "Thinking guard can only use return" |
| Simple idea | guard values live "for the rest of the function scope" | WRONG (imprecise) | ControlFlow.md "Early Exit" ("rest of the code block"); swiftc | "rest of the code block that contains the guard" |
| Simple idea | "When a matching case finishes, execution ends immediately" | WRONG (misleading) | ControlFlow.md "No Implicit Fallthrough"; Statements.md | "the whole switch ends. The program goes on after the switch" |
| Trap 2 | "In C-based languages, non-zero integers evaluate as true" | WRONG (overgeneralized; Java needs boolean) | cppreference C if; TheBasics.md Booleans | Now "In C ..." only |
| Hook | "different from C or Java" | WRONG-ish (Java switch rules differ by version) | ControlFlow.md compares with C and Objective-C | Hook now asks about C; joke option c replaced with a believable mistake |
| In code | if/switch expressions missing | OUTDATED (missing Swift 5.9 feature) | SE-0380 (Implemented Swift 5.9); ControlFlow.md "If" | New example and paragraph |
| In code | continue, break, labeled loops, compound cases, range cases tested but not taught | UNTAUGHT | ControlFlow.md "Control Transfer Statements", "Compound Cases", "Interval Matching" | New code examples with checked output |
| In code | `while` not shown | UNTAUGHT (weak) | ControlFlow.md "While" | Added `while` and "condition before / after" bullets |
| Simple idea | exhaustive with no default needed when all values are covered | OK, added | ControlFlow.md "Switch" | One sentence with Bool example |
| Trap 1 | fallthrough does not check the next case's pattern | OK, added | ControlFlow.md "Fallthrough" note | Added |
| Junior answer, analogy, prose | "pyramid of doom", "Furthermore", "fine-grained", "eliminating", "cargo", "diverts" | HARD-ENGLISH | plain-english.md | Rewritten in B1 English |
| Layout | `<TryIt>` in the middle of the lesson | RULES | lesson-format.md | Moved to the end |
| meta | one source; baseline xcode "27" | RULES | — | Four official sources; xcode "27.2" |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| q8 option d, q26 modelAnswer | guard exits "return, throw, or break" | WRONG | Statements.md "Guard Statement"; swiftc | Updated to list `return`, `break`, `continue`, `throw`, or `fatalError` |
| q11 option b | compound case "on one line" | WRONG | ControlFlow.md "Compound Cases" | Changed to "Separate the patterns with commas inside one case." |
| q24 | "C or Java"; rubric scores pattern matching not asked | WRONG / RULES | ControlFlow.md | Changed to C; prompt now asks what patterns a Swift case can match |
| q28 | rubric scores avoiding Bool flag; prompt did not ask | RULES | questions.md | Prompt now asks what extra variable labeled statements help you avoid |
| q1, q2, q4, q7, q12, q14, q15 | Joke distractors | RULES | questions.md | Replaced with believable control-flow mistakes in simple English |
| q6, q11, q15, q23 | `lessonSection` mismatch | RULES | lesson.mdx headings | Updated `lessonSection` (`q6`, `q11`, `q15` -> "In code", `q23` -> "Interview traps") |
| q19 | Correct option 5 chars vs max distractor 3 chars | RULES | validate-content.sh | Changed distractor "nil" to "Nothing" (7 chars) |
| Bank | Difficulty 14/16/1; missing `if`/`switch` expressions and `guard` + `continue` | RULES | questions.md (~20% hard) | Re-leveled q21–q23 to hard (3); added q32 (`guard` + `continue`, verified with `swift`) and q33 (`if`/`switch` expressions) for 33 live questions (42% easy / 39% medium / 18% hard) |
| Explanations, model answers | "Furthermore", "fine-grained", "eliminating", "in contrast", "arbitrary" | HARD-ENGLISH | plain-english.md | Rewritten in B1 English across q1–q28 |
| Dates / versions | `lastVerified` differed; `topic.json` v1 | RULES | docs/audit/README.md | Aligned `lastVerified` to `2026-11-14`; bumped `topic.json` to v2 with `changes` note and `questions.json` to v3 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs control-flow` — all passed.
