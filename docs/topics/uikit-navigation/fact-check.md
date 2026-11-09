# Fact-Check — Navigation in UIKit (Step 6)

Run 2026-11-09. Topic: `uikit-navigation` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/uikit-navigation/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/uikit-navigation/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: UINavigationController](https://developer.apple.com/documentation/uikit/uinavigationcontroller) and [Apple Developer Documentation: present(_:animated:completion:)](https://developer.apple.com/documentation/uikit/uiviewcontroller/present(_:animated:completion:)).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `UINavigationController` stack | Manages a LIFO stack via `pushViewController` and `popViewController` | Confirmed |
| `popToRootViewController` | Pops all controllers off stack except the root controller | Confirmed |
| `navigationItem` vs `navigationBar` | `navigationBar` is container toolbar; `navigationItem` configures title and bar buttons per screen | Confirmed |
| `.pageSheet` presentation | Default on iOS 13+ on iPhone; presenting view remains in hierarchy without calling `viewWillAppear` on dismiss | Confirmed |
| `.fullScreen` presentation | Completely covers screen; triggers `viewWillDisappear` and `viewDidDisappear` on presenting controller | Confirmed |
| Window hierarchy timing | Calling `present()` requires presenting view to be attached to window (viewDidAppear or button actions) | Confirmed |
| Weak delegate protocol | Custom delegates must be declared `weak` with `AnyObject` conformance to avoid retain cycles | Confirmed |
| Main actor isolation | UIKit navigation controllers and methods execute on `@MainActor` under Swift 6 | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `view-controller-lifecycle` is confirmed in prerequisites list.
2. **Progression in Batch 2D**: Eighth topic in Batch 2D (SwiftUI & UIKit), bridging navigation before table and collection views.
