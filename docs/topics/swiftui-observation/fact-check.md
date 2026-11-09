# Fact-Check — Data Flow with @Observable (Step 6)

Run 2026-11-09. Topic: `swiftui-observation` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-observation/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-observation/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Managing model data in your app](https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app), [Apple Developer Documentation: Observation](https://developer.apple.com/documentation/observation), and [WWDC23: Discover Observation in SwiftUI](https://developer.apple.com/videos/play/wwdc2023/10149/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Property-level tracking | SwiftUI registers access during body evaluation; only views reading changed properties redraw | Confirmed |
| Stored properties observable by default | No `@Published` wrapper needed on stored properties in `@Observable` classes | Confirmed |
| `@ObservationIgnored` | Excludes stored properties from change tracking and view invalidation | Confirmed |
| View model ownership | `@State` manages and preserves reference type lifecycle for `@Observable` in iOS 17+ | Confirmed |
| Two-way bindings with `@Bindable` | `@Bindable` produces `$model.property` bindings without owning lifecycle | Confirmed |
| Type-based environment injection | `.environment(model)` and `@Environment(Model.self)` work directly without custom keys | Confirmed |
| Class restriction | `@Observable` can only be applied to reference types (`class`); rejects `struct` | Confirmed |
| `withObservationTracking` behavior | Executes read closure and triggers `onChange` once before property mutation occurs | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `state-and-binding` is published and verified.
2. **Progression in Batch 2D**: First topic in Batch 2D (SwiftUI & UIKit), establishing modern data flow before introducing legacy `ObservableObject` and UIKit architectures.
