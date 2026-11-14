# Audit: optionals (2026-11-14)

Independent check by `content-fact-checker` (fix mode). Baseline Swift 6.4, Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Fixes made (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| Lesson `In code`, q12 d | `guard` `else` must exit "using `return` or `throw`" | WRONG (incomplete) | TSPL ControlFlow "Early Exit"; `swiftc` | Updated to list `return`, `break`, `continue`, `throw`, or `fatalError` |
| Lesson Trap 1 | `!` "tells the compiler to bypass safety checks" | WRONG | TSPL Basics "Force Unwrapping" | Clarified that compiler stops making you handle `nil`, Swift checks at runtime and crashes on `nil` |
| Lesson Trap 2, q8 d | IUO is "force-unwrapped automatically whenever you access it" | WRONG (partly) | TSPL "Implicitly Unwrapped Optionals"; `swift` test (`Optional<String>`) | Clarified Swift treats it as a normal optional first and force-unwraps only when a non-optional value is needed |
| q15 b | `x != nil` then `x!` is risky because of "multithreading" | WRONG (weak reason) | TSPL Optional Binding | Retired q15; taught one-step check-and-unwrap trap in lesson and added q34 |
| q24 modelAnswer, lesson `InterviewAnswer` | Optionals "eliminate null pointer crashes" | WRONG (overstated) | `!` on `nil` still crashes | Changed to "help prevent null pointer crashes" |
| q3, q28 | `Optional` is an enum `.none` / `.some`; `Type?` is sugar for `Optional<Type>` | UNTAUGHT | Apple `Optional` docs | Taught both in "The simple idea"; updated q3 `lessonSection` and added q32 |
| q10 | IUO is common for `@IBOutlet` | UNTAUGHT / weak source | UIKit not taught at fresh prerequisite level | Retired q10; added q33 (IUO inferred as `String?`) |
| q13, q21 | Optional `==` (`Equatable`) | UNTAUGHT | Apple `Optional` `==` docs | Taught in "In code" and updated `lessonSection` |
| q14, q23 | `Int(String)` returns `Int?` | UNTAUGHT | TSPL Basics "Optionals" | Taught in "In code"; set q14 difficulty 3 -> 1 |
| q18, q31 | Comma-separated bindings in `if let` / `guard let` | UNTAUGHT | TSPL "Optional Binding" | Taught in "In code" |
| q9 | Short form `if let name` makes a constant with the same name | UNTAUGHT / HARD-ENGLISH | TSPL "Optional Binding" | Explained "same name" in lesson and replaced "shadows" |
| q27, q28 | Prompts did not ask everything their rubrics scored | RULES | questions.md | Updated q27 prompt to ask what to use instead; updated q28 prompt to ask what `Type?` is short for |
| Recap | 6 points | RULES | docs/lesson-format.md (3–5) | Condensed to 5 points |
| Bank | Difficulty 29% easy / 45% / 26% hard | RULES | questions.md (40/40/20) | Re-leveled q6, q9, q14, q20 to easy; added q32 (easy), q33 (medium), q34 (hard) for 32 live questions (41% easy / 38% medium / 22% hard) |
| q1 d, q7 d, q6 b, q9, q11, q27 | Weak distractors and hard English ("fails violently", "shadows", "non-null safety", "anti-pattern") | RULES / HARD-ENGLISH | plain-english.md | Rewrote in B1 English with believable distractors |
| Metadata | `lastVerified` `2026-11-08`; `topic.json` v1 | RULES | docs/audit/README.md | Bumped `topic.json` and `questions.json` to v2; aligned `lastVerified` to `2026-11-14` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs optionals` — all passed.
