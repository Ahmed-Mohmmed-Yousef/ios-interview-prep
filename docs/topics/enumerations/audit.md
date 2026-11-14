# Audit: enumerations (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Findings and fixes (2026-11-14)

| Location | Claim / Issue | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| Lesson `In code` (line 146) | "`Planet` conforms to `Int`" | WRONG | TSPL Enumerations; `Int` is a struct, not a protocol | Changed to "`Planet` uses `Int` as its raw-value type" and listed valid raw types (`Int`, `Double`, `String`, `Character`) |
| Lesson `meta.baseline` | `xcode: "27"` | OUTDATED | `developer.apple.com/support/xcode/` (Xcode 27.2, Swift 6.4.2) | Updated `xcode` to `"27.2"` |
| Lesson `In code` (`q15`, `q22`) | `CaseIterable` and `allCases` tested without being taught | UNTAUGHT | TSPL Enumerations "Iterating over Enumeration Cases"; `swiftc` | Added `CaseIterable` conformance and `allCases.count` to `In code` and updated `q15`, `q22` `lessonSection` to `"In code"` |
| Lesson `In code` (`q9`, `q17`) | Implicit `String` raw values defaulting to case names not taught | UNTAUGHT | TSPL Enumerations "Implicitly Assigned Raw Values"; `swiftc` | Added `Theme: String` example and explanation in `In code`, updated `q9` `lessonSection` to `"In code"` |
| Lesson `In code` (`q21`, `q27`) | Computed properties, instance methods, and `mutating` methods on enums not taught in main sections | UNTAUGHT | TSPL Enumerations; `swiftc` | Added `TrafficLight` computed property and `mutating func advance()` example in `In code`, updated `q21` `lessonSection` to `"In code"` |
| Lesson `The simple idea`, `In code` (`q16`) | Automatic `==` (`Equatable`) on simple enums used without explanation | UNTAUGHT | Apple `Equatable` / TSPL Enumerations; `swiftc` | Explained `==` support on enums without associated values (and with `Equatable` associated values) |
| `q26` `modelAnswer` | Mentions `optional chaining` (taught in a later topic) | UNTAUGHT | `units.json` order (`optional-chaining` comes later) | Replaced with `if let` or `guard let` |
| Lesson `The simple idea`, `How to answer` | Book-like phrasing ("first-class value in its own right", "common type for a group of related values") | COPIED | TSPL Enumerations comparison | Rewrote in original plain English |
| Lesson & questions | Complex words ("prepopulate", "arbitrary", "payload", "algebraic data modeling", "strictly mandatory") and long sentences | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewrote in B1 English with sentences of 25 words or fewer |
| Lesson structure | `<TryIt>` placed before `## Interview traps` | RULES | `docs/lesson-format.md` | Moved `<TryIt>` to after `## Recap` |
| `q24`–`q28` prompts | Asked for `2–4 sentences` instead of `2–5 sentences` | RULES | `.claude/rules/questions.md` | Updated all five written prompts to `2–5 sentences` |
| `q24`, `q27` prompt & rubric | `q24` rubric scored "first-class values" not asked; `q27` rubric scored "associated values instead" not asked | RULES | `.claude/rules/questions.md` | Updated prompts and `q24` rubric so every scored criterion is explicitly asked |
| `q1`, `q2`, `q4`–`q7`, `q11`, `q13`–`q15` | Joke or off-topic distractors (e.g. thread locks, binary file, max 2 cases, lazy class property, Identifiable) | RULES | `.claude/rules/questions.md` | Replaced with believable Swift enum mistakes |
| Dates / versions | `lastVerified` was `2026-11-09`; `topic.json` v1 | RULES | `docs/audit/README.md` | Aligned `lastVerified` to `2026-11-14`; bumped `topic.json` to v2 with `changes` note and `questions.json` to v2 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `check-coverage --strict`, `run-swift-examples` (lesson 2/2, questions 11/11), `check-publish-gate --code`, and `prototype/build.mjs enumerations` — all passed.
