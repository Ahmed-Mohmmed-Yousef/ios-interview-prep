# Audit: swiftui-layout (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2, `iPhoneOS27.2.sdk`). **Result: pass.**

## Lesson fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"` | OUTDATED | `developer.apple.com/support/xcode`, `swiftc` 6.4.2 | Updated to `xcode: "27.2"` and `lastVerified: "2026-11-14"` |
| `In code` | `.cornerRadius(20)` and `.cornerRadius(12)` | OUTDATED | Apple SwiftUI docs (`cornerRadius` deprecated) | Replaced with `.clipShape(Circle())` and `.clipShape(.rect(cornerRadius: 12))`, verified with `swiftc` |
| `In code` | `.foregroundColor(...)` (4 uses) | OUTDATED | Apple SwiftUI docs (`foregroundColor` deprecated in favor of `foregroundStyle`) | Replaced with `.foregroundStyle(...)`, verified with `swiftc` |
| `The simple idea`, `In code` | `Divider`, `.frame(maxWidth: .infinity)`, `.firstTextBaseline`, `.layoutPriority(_:)`, and tight-space sharing missing from main teaching sections | UNTAUGHT | `questions.json` (`q6`, `q7`, `q8`, `q9`, `q11`, `q15`, `q27`) | Taught `Divider` in `The simple idea` and `.frame(maxWidth: .infinity)`, `.firstTextBaseline`, and `.layoutPriority(_:)` in `In code` |
| `InterviewAnswer senior` | `$O(n)$` LaTeX math syntax in MDX | RULES | MDX does not render `$...$` math | Changed to "linear time" |
| Lesson prose & answers | "fundamental", "consume", "translucent", "synchronization", "linear equality and inequality equations" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English |

## Question bank and metadata fixes

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q20` option `d` explanation | "HStack accepts any number of child views from one to ten in ViewBuilder." | WRONG / OUTDATED | Swift 5.9 parameter packs removed the 10-view limit (`swiftc -swift-version 6` verified with 12 children) | Replaced with "HStack works with two child views without needing a third view." |
| `q30` `modelAnswer` | `.foregroundColor(.white)` | OUTDATED | Apple SwiftUI docs (`foregroundColor` deprecated) | Replaced with `.foregroundStyle(.white)` |
| `q19` option `d` explanation | Named internal `_FrameLayout` | RULES | Public SwiftUI API scope | Replaced with "ModifiedContent wrapper" |
| `q4` option `b` explanation | Referenced untaught `minimumScaleFactor` | RULES | `lesson.mdx` | Simplified to "extra scaling modifiers" |
| `q27` prompt & `lessonSection` | Rubric scored `.layoutPriority(_:)` without asking for it in prompt; `lessonSection` pointed to `How to answer` | RULES | `.claude/rules/questions.md` | Updated prompt to ask how to give one view priority; updated `q7`, `q8`, `q15`, `q27` `lessonSection` to `In code` |
| Bank difficulty mix | 14 easy / 17 medium / 0 hard (0% hard) | RULES | `questions.md` (~20% hard) | Re-leveled `q7`, `q8`, `q12`, `q14`, `q27`, `q28` to hard (3) and `q17`, `q18`, `q25` to medium (2): 13 easy (42%) / 12 medium (39%) / 6 hard (19%) |
| `questions.json` prose | "typographic baseline", "glyphs", "chronologically", "monochrome", "accommodate", "exceeds" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewritten in B1 English across all options, explanations, rubrics, and model answers |
| Metadata & versions | `lastVerified` `2026-11-09`, `version: 1` | RULES | `docs/audit/README.md` | Aligned `lastVerified` to `2026-11-14`; bumped `topic.json` to v2 with `changes` note and `questions.json` to v2 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs swiftui-layout` — all passed.
