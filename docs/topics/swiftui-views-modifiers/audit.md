# Audit: swiftui-views-modifiers (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2, `iPhoneOS27.2.sdk`). **Result: pass.**

## Lesson fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"` | OUTDATED | `developer.apple.com/support/xcode`, `swiftc` 6.4.2 | Updated to `xcode: "27.2"` and `lastVerified: "2026-11-14"` |
| `The simple idea`, `QuickCheck 1`, `InterviewAnswer senior` | Structs "live on the stack" / "stack-allocated structs" | WRONG (overgeneralized) | Swift value semantics (structs can be stored inline or captured on heap) | Changed to "lightweight value types without reference counting overhead" |
| `In code` (`CardStyle`) | `.cornerRadius(8)` | OUTDATED | Apple SwiftUI docs (`cornerRadius` deprecated in favor of `clipShape`) | Replaced with `.clipShape(.rect(cornerRadius: 8))`, verified with `swiftc` |
| `Interview traps` | Missing `AnyView` explanation while `q14` tests it | UNTAUGHT | `questions.json` `q14` | Added `<Trap title="Using AnyView instead of some View">` |
| `The simple idea` | Missing brief view tree diffing explanation | UNTAUGHT | `questions.json` `q15` | Added sentence explaining that SwiftUI compares (diffs) the new view tree with the old one |
| `Interview traps` (`#Preview`) | "introduced in Swift 5.9" | OK (clarified) | Apple Developer Documentation (`Preview`) | Added "introduced in Xcode 15 and iOS 17 alongside Swift 5.9" |
| Lesson prose & answers | "hierarchical", "transient", "encapsulate", "constantly", "repeatedly" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English |

## Question bank and metadata fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q2`, `q24` | "Structs allocate on the stack" / "stack-allocated" | WRONG (overgeneralized) | Swift value semantics | Replaced with "lightweight value types without reference counting overhead" |
| `q12` option `c` | Distractor uses untaught `StateObject` / `ObservableObject` | RULES | `questions.md` | Replaced distractor with `ViewModifier` |
| `q14`, `q15` | Tested `AnyView` and diffing not taught in main sections | UNTAUGHT | `lesson.mdx` | Taught both in `lesson.mdx`; updated `q14` `lessonSection` to `Interview traps` and `q15` to `The simple idea` |
| `q20` | Tested `Button<Text>` not taught in lesson | UNTAUGHT | `lesson.mdx` | Rewrote `q20` in place to test plain `Text` vs wrapped view types (`verify`: `"true"`) |
| `q23` | Tested internal `_PaddingLayout` and claimed `in tests` | WRONG / UNTAUGHT | SwiftUI public API vs internal SPI | Rewrote `q23` in place using `BadgeStyle` (`ViewModifier`) + `.background(Color.green)` (`verify`: `"false"`) |
| `q26` rubric | Scored "introduced in Swift 5.1" (not asked, not taught) | UNTAUGHT / RULES | `questions.md` | Removed Swift 5.1 requirement from rubric |
| `q28` rubric | Scored `.task or view models` (not asked, not taught) | UNTAUGHT / RULES | `questions.md` | Replaced criterion with keeping `var body` fast and pure |
| Bank difficulty mix | 13 easy / 18 medium / 0 hard (0% hard) | RULES | `questions.md` (~20% hard) | Re-leveled `q14`, `q15`, `q18`, `q23`, `q26`, `q30` to hard (3): 13 easy (42%) / 12 medium (39%) / 6 hard (19%) |
| `questions.json` prose | "typography", "rasterization", "monochrome", "brittle", "unresponsive", "executing" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English across all options, explanations, rubrics, and model answers |
| Metadata & versions | `lastVerified` `2026-11-09`, `version: 1` | RULES | `docs/audit/README.md` | Aligned `lastVerified` to `2026-11-14`; bumped `topic.json` to v2 with `changes` note and `questions.json` to v2 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs swiftui-views-modifiers` — all passed.
