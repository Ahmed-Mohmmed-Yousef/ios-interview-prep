# Fact-Check — Views and View Controllers (Step 6)

Run 2026-11-09. Topic: `uiviews-and-view-controllers` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/uiviews-and-view-controllers/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/uiviews-and-view-controllers/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: UIView](https://developer.apple.com/documentation/uikit/uiview), [Apple Developer Documentation: UIViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller), and [Apple Developer Documentation: Creating a Custom Container View Controller](https://developer.apple.com/documentation/uikit/view_controllers/creating_a_custom_container_view_controller).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `UIView` coordinate spaces | `frame` uses superview coordinates; `bounds` uses local coordinates starting at `(0, 0)` | Confirmed |
| Lazy view loading | `UIViewController.view` loads lazily on first access via `loadView()` | Confirmed |
| `loadView()` override | Programmatic views set `self.view = CustomView()`; calling `super.loadView()` is redundant | Confirmed |
| Initializer anti-pattern | Accessing `self.view` inside `init` triggers view loading prematurely | Confirmed |
| Rotation transform effect | Rotating a view causes its `frame` to expand to the bounding box enclosing it | Confirmed |
| 3-step containment | Container controllers require `addChild()`, `addSubview()`, and `didMove(toParent:)` | Confirmed |
| View hierarchy methods | `parent.addSubview(child)` attaches view; `child.removeFromSuperview()` detaches view | Confirmed |
| UIKit vs SwiftUI semantics | `UIView` is a persistent mutable reference type class; SwiftUI `View` is an immutable struct | Confirmed |
| Main actor isolation | UIKit UI classes are `@MainActor`-isolated under Swift 6 language mode | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `inheritance` is confirmed in prerequisites list.
2. **Progression in Batch 2D**: Fifth topic in Batch 2D (SwiftUI & UIKit), establishing the foundational UIKit architecture before exploring view controller lifecycle, Auto Layout, navigation, and collection views.
