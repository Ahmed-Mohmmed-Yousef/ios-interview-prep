# Rubric Test — Views and View Controllers (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** Difference between `frame` and `bounds` | **Good:** Explains frame describes position and size in superview coordinates for layout relative to parent, while bounds describes position and size in local coordinates with default origin (0, 0). | 100 | Yes | Pass (100%) |
| | **Average:** "Frame is where the view is inside the parent view, and bounds is the view's own width and height starting at zero." | 80 | Yes | Pass (80%) |
| | **Weak:** "Frame is measured in pixels on retina screens and bounds is measured in points." | 0 | No | Fail (0%) |
| **q25** Lazy view loading and `self.view` in `init` | **Good:** Explains view controller loads its root view on demand when accessed or presented; accessing self.view in init forces premature loading before models and dependencies are set. | 100 | Yes | Pass (100%) |
| | **Average:** "Views load lazily when accessed. If you read self.view in init it loads too early before setup is finished." | 85 | Yes | Pass (85%) |
| | **Weak:** "Reading self.view in init causes an ARC retain cycle that leaks memory." | 0 | No | Fail (0%) |
| **q26** Overriding `loadView()` and `super.loadView()` | **Good:** Explains loadView creates programmatic root views without storyboards; calling super.loadView() unnecessarily allocates a default blank UIView before replacing it. | 100 | Yes | Pass (100%) |
| | **Average:** "loadView is where you assign a custom view. Calling super creates an unused blank view first." | 85 | Yes | Pass (85%) |
| | **Weak:** "You must call super.loadView() or the view controller will fail to render." | 0 | No | Fail (0%) |
| **q27** 3 steps for child view controller containment | **Good:** Lists addChild(child), view.addSubview(child.view), and child.didMove(toParent: self) in order; explains these steps ensure appearance and lifecycle events forward to the child. | 100 | Yes | Pass (100%) |
| | **Average:** "You call addChild, add the subview, and call didMove to make sure child receives lifecycle calls." | 85 | Yes | Pass (85%) |
| | **Weak:** "You only need to call addSubview on the parent view." | 0 | No | Fail (0%) |
| **q28** `UIView` vs SwiftUI `View` comparison | **Good:** Explains UIView is a mutable reference type class instance persisted on the heap; SwiftUI View is an immutable lightweight struct recreated and diffed on state updates. | 100 | Yes | Pass (100%) |
| | **Average:** "UIView is a class that stays in memory, while SwiftUI View is a struct that gets recreated when state changes." | 85 | Yes | Pass (85%) |
| | **Weak:** "UIView is for iPad screens and SwiftUI View is for iPhone screens." | 0 | No | Fail (0%) |
| **q29** `ContainerVC` embed method | **Good:** Declares `class ContainerVC: UIViewController` with `@MainActor func embed(child: UIViewController)` executing `addChild`, `view.addSubview`, and `child.didMove(toParent: self)`. | 100 | Yes | Pass (100%) |
| | **Average:** Correct class and method, but misses `child.didMove(toParent: self)` step. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not inherit from UIViewController or fails to add subview. | 30 | No | Fail (30%) |
| **q30** `centerOf(view:)` function | **Good:** Implements `@MainActor func centerOf(view: UIView) -> CGPoint` returning `CGPoint(x: view.bounds.midX, y: view.bounds.midY)`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `view.frame.midX` instead of `view.bounds.midX`. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns empty CGPoint or hardcoded values. | 25 | No | Fail (25%) |
| **q31** `SubviewManager` struct with `addViews` | **Good:** Declares `struct SubviewManager` with `subviewCount: Int` and `@MainActor mutating func addViews(to parent: UIView, count: Int)` adding views in a loop and setting count. | 100 | Yes | Pass (100%) |
| | **Average:** Correct struct and loop, but omits `mutating` keyword or does not update `subviewCount`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing stored property or does not add subviews to parent. | 35 | No | Fail (35%) |

---

## Verdict

The rubrics successfully:
1. Differentiate `frame` (superview space) from `bounds` (local space).
2. Assess understanding of lazy view loading and initializer hazards.
3. Validate programmatic view creation via `loadView()` without redundant `super` calls.
4. Verify complete 3-step child view controller containment protocol.
5. Check memory model contrasts between UIKit classes and SwiftUI structs.
