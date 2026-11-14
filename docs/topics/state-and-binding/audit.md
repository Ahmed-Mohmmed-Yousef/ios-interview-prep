# Audit: state-and-binding (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2, `iPhoneOS27.2.sdk`). **Result: pass.**

## Lesson fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"` | OUTDATED | `developer.apple.com/support/xcode`, `swiftc` 6.4.2 | Updated to `xcode: "27.2"` and `lastVerified: "2026-11-14"` |
| `The simple idea` | "redraws the screen" | WRONG (imprecise) | Apple `@State` docs | Changed to "updates the views that read it on the main thread" |
| `Interview traps` (Trap 2) | "crashes your app or triggers runtime warnings" | WRONG (imprecise) | SwiftUI runtime behavior | Changed to "triggers runtime warnings and repeated redraw loops that can freeze your app" |
| `Interview traps` (Trap 4) | `@State` only for value-type data | OUTDATED (incomplete since Observation) | Apple `@State` docs (`@Observable` classes can live in `@State`) | Clarified `@State` is for view-local UI state (and can own a view-local `@Observable` instance), while shared data uses passed `@Observable` models or environment |
| `The simple idea`, `In code` | `Binding.constant(_:)`, `Binding(get:set:)`, `.wrappedValue`, `TextField`, `inout` vs `@Binding`, and unidirectional data flow missing from main sections | UNTAUGHT | `questions.json` (`q9`, `q12`, `q13`, `q15`, `q21`, `q28`, `q31`) | Taught unidirectional data flow and `@Binding` vs `inout` in `The simple idea`; taught `Binding.constant`, `Binding(get:set:)`, `.wrappedValue`, and `TextField` in `In code` |
| Lesson prose & answers | "encapsulation", "invalidates", "semantics", "transient", "merely", "constantly" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English |

## Question bank and metadata fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q15` option `c` | "`@Binding` is a long-lived reference type wrapper" | WRONG | Apple `Binding` docs (`public struct Binding<Value>`) | Corrected to "`@Binding` works across view redraws, while `inout` lasts for one call." |
| `q4` option `c` explanation | Referenced untaught `ARC` | RULES | Fresh-level scope | Simplified to "Swift manages memory automatically without garbage collection." |
| `q5` option `a` & explanation | "heap memory" / "heap nodes" | WRONG / HARD-ENGLISH | SwiftUI internal storage abstraction | Changed to "persistent memory managed outside the short-lived view struct" |
| `q9`, `q12`, `q13`, `q21`, `q28` | `lessonSection` pointed to `How to answer` for ideas now taught earlier | RULES | `lesson.mdx` | Updated `q9`, `q13`, `q21` to `In code`; `q12`, `q28` to `The simple idea` |
| `q27` prompt | Rubric scored recommending `let` or `@Binding`, prompt did not ask what to do instead | RULES | `.claude/rules/questions.md` | Added "and what should you do instead?" to prompt |
| Bank difficulty mix | 18 easy / 13 medium / 0 hard (58% easy, 0% hard) | RULES | `questions.md` (~40/40/20) | Re-leveled `q7`, `q8`, `q13`, `q15`, `q21`, `q27` to hard (3) and `q17`, `q30`, `q31` to medium (2): 13 easy (42%) / 12 medium (39%) / 6 hard (19%) |
| `questions.json` prose | "anti-pattern", "encapsulation", "hexadecimal", "serialized", "transient", "duplicates" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English across all options, explanations, rubrics, and model answers |
| Metadata & versions | `lastVerified` `2026-11-09`, `version: 1` | RULES | `docs/audit/README.md` | Aligned `lastVerified` to `2026-11-14`; bumped `topic.json` to v2 with `changes` note and `questions.json` to v2 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs state-and-binding` — all passed.
