# Fact-Check — Dark Mode and Dynamic Type (Step 6)

Run 2026-11-09. Topic: `dark-mode-dynamic-type` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/dark-mode-dynamic-type/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/dark-mode-dynamic-type/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Human Interface Guidelines: Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), [Apple Human Interface Guidelines: Typography](https://developer.apple.com/design/human-interface-guidelines/typography), and [Apple Developer Documentation: Supporting Dark Mode in your interface](https://developer.apple.com/documentation/uikit/supporting-dark-mode-in-your-interface).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Semantic color resolution | `UIColor(dynamicProvider:)` resolves dynamically via `resolvedColor(with:)` | Confirmed |
| `UILabel` Dynamic Type | Requires `adjustsFontForContentSizeCategory = true` and `numberOfLines = 0` | Confirmed |
| System text styles | `UIFont.preferredFont(forTextStyle:)` sets descriptor with `.textStyle` attribute | Confirmed |
| Custom font scaling | `UIFontMetrics(forTextStyle:).scaledFont(for:)` scales custom base fonts | Confirmed |
| Trait change registration | `registerForTraitChanges` replaces deprecated `traitCollectionDidChange` in iOS 17+ | Confirmed |
| SwiftUI `@ScaledMetric` | Scales numeric metrics relative to text style for non-text UI balance | Confirmed |
| Dynamic Type clamping | `.dynamicTypeSize(...)` restricts scaling range to prevent layout overflow | Confirmed |
| Main actor isolation | UIKit factory methods and label properties execute on `@MainActor` under Swift 6 | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `swiftui-views-modifiers` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: First topic in Batch 2E (Design, System & Data), establishing foundational adaptive design principles before exploring HIG Liquid Glass and system lifecycles.
