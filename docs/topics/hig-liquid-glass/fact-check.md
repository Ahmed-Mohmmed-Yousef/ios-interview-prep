# Fact-Check — Apple Design and Liquid Glass (Step 6)

Run 2026-11-09. Topic: `hig-liquid-glass` (junior bonus). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/hig-liquid-glass/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/hig-liquid-glass/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Human Interface Guidelines: Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [What’s New - iOS - Apple Developer](https://developer.apple.com/ios/whats-new/), and [Liquid Glass (Technology Overviews)](https://developer.apple.com/documentation/technologyoverviews/liquid-glass).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| HIG core themes | Clarity, Deference, and Depth form the foundational pillars of Apple HIG | Confirmed |
| Translucent material placement | Belongs on floating chrome (toolbars, tab bars, sheets), never on body content | Confirmed |
| Glass-on-glass prohibition | Stacking translucent layers destroys contrast and degrades legibility | Confirmed |
| UIKit material views | `UIVisualEffectView(effect: UIBlurEffect(style:))` configures material rendering | Confirmed |
| Vibrancy effects | `UIVibrancyEffect(blurEffect:style:)` adjusts foreground contrast over materials | Confirmed |
| Reduce Transparency setting | Checked via `UIAccessibility.isReduceTransparencyEnabled` in UIKit | Confirmed |
| SwiftUI material modifiers | `.background(.regularMaterial)` and `.thinMaterial` provide native blur styles | Confirmed |
| Main actor isolation | UIKit factory methods and visual effect views operate on `@MainActor` under Swift 6 | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `swiftui-views-modifiers` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Second topic in Batch 2E (and the dedicated bonus topic for the Design and System unit), providing foundational HIG design and material principles.
