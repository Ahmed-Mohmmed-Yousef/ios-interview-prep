# Fact-Check — View Controller Lifecycle (Step 6)

Run 2026-11-09. Topic: `view-controller-lifecycle` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/view-controller-lifecycle/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/view-controller-lifecycle/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: UIViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller) and [Apple Developer Documentation: Displaying and managing views with a view controller](https://developer.apple.com/documentation/uikit/displaying-and-managing-views-with-a-view-controller).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `viewDidLoad()` execution | Called exactly once when the root view hierarchy is loaded into memory | Confirmed |
| `viewWillAppear(_:)` execution | Called repeatedly every time the view is about to appear on screen | Confirmed |
| Geometry finalization | Subview frames, dimensions, and safe areas are final in `viewDidLayoutSubviews()` | Confirmed |
| `viewDidAppear(_:)` execution | Called after transition finishes; ideal for video playback and screen analytics | Confirmed |
| `viewWillDisappear(_:)` teardown | Ideal location for dismissing virtual keyboard and pausing active timers | Confirmed |
| Calling `super` requirement | Calling super in lifecycle methods coordinates UIKit transitions and accessibility | Confirmed |
| `loadView()` override | Called lazily on first access to instantiate programmatic root views | Confirmed |
| `deinit` leak diagnostics | Failure of deinit to run on dismissal indicates a memory retain cycle | Confirmed |
| Main actor isolation | UIKit lifecycle methods execute on `@MainActor` under Swift 6 language mode | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `uiviews-and-view-controllers` is confirmed in prerequisites list.
2. **Progression in Batch 2D**: Sixth topic in Batch 2D (SwiftUI & UIKit), preparing learners for Auto Layout, UIKit navigation, and table/collection views.
