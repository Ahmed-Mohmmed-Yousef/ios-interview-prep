# Rubric Test — Navigation in UIKit (Step 5)

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
| **q24** Push navigation vs modal presentation | **Good:** Explains push navigation via UINavigationController is for hierarchical drill-down workflows with automatic back buttons; modal presentation via present is for focused temporary interruptions. | 100 | Yes | Pass (100%) |
| | **Average:** "Push is for drill-down stacks with back buttons, and modal is for popup tasks like settings." | 85 | Yes | Pass (85%) |
| | **Weak:** "Push is used in SwiftUI and modal presentation is used in UIKit." | 0 | No | Fail (0%) |
| **q25** `viewWillAppear` under `.pageSheet` modals | **Good:** Explains .pageSheet keeps presenting view controller attached and visible in window hierarchy; because it never leaves the tree, viewWillAppear does not fire on dismissal. | 100 | Yes | Pass (100%) |
| | **Average:** "Because pageSheet keeps the parent view visible underneath, it does not call viewWillAppear when dismissed." | 85 | Yes | Pass (85%) |
| | **Weak:** "The operating system disables viewWillAppear to conserve battery power." | 0 | No | Fail (0%) |
| **q26** Weak delegates and retain cycles | **Good:** Explains parent retaining child and child strongly retaining parent creates a retain cycle; declaring delegate weak breaks the reference cycle, preventing memory leaks. | 100 | Yes | Pass (100%) |
| | **Average:** "If the delegate is strong you get a retain cycle and the view controller leaks in memory." | 85 | Yes | Pass (85%) |
| | **Weak:** "Delegates must be weak because structs cannot be passed as delegates." | 0 | No | Fail (0%) |
| **q27** `navigationItem` vs `navigationBar` | **Good:** Describes navigationBar as container toolbar view shared across the stack; describes navigationItem as per-controller configuration for title and bar buttons. | 100 | Yes | Pass (100%) |
| | **Average:** "navigationBar is the top bar of the navigation controller, and navigationItem sets the title and buttons for that screen." | 85 | Yes | Pass (85%) |
| | **Weak:** "navigationItem is for iPads and navigationBar is for iPhones." | 0 | No | Fail (0%) |
| **q28** Window hierarchy presentation warning | **Good:** Explains warning occurs when calling present before controller view is in active window (like in viewDidLoad); moving call to viewDidAppear or user tap resolves it. | 100 | Yes | Pass (100%) |
| | **Average:** "It happens when you present before the view is on screen in viewDidLoad. Move it to viewDidAppear." | 85 | Yes | Pass (85%) |
| | **Weak:** "It happens when your modal view controller is missing Auto Layout constraints." | 0 | No | Fail (0%) |
| **q29** `PushNavigator` pushDetail method | **Good:** Declares `class PushNavigator` with `@MainActor static func pushDetail(onto:title:)` creating controller, setting `navigationItem.title`, and calling `pushViewController`. | 100 | Yes | Pass (100%) |
| | **Average:** Pushes controller onto nav, but forgets to set `navigationItem.title`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not push onto navigation controller or fails to compile. | 25 | No | Fail (25%) |
| **q30** `ModalPresenter` presentSheet method | **Good:** Declares `class ModalPresenter` with `@MainActor static func presentSheet(from:modal:)` setting `modalPresentationStyle = .pageSheet` and calling `parent.present`. | 100 | Yes | Pass (100%) |
| | **Average:** Presents modal, but forgets to set `modalPresentationStyle = .pageSheet`. | 70 | Yes | Pass (70%) |
| | **Weak:** Fails to call present or uses pushViewController instead. | 30 | No | Fail (30%) |
| **q31** `DismissNotifier` protocol and `ModalController` | **Good:** Declares `@MainActor protocol DismissNotifier: AnyObject` and `ModalController` with `weak var delegate: DismissNotifier?` and `func close()` invoking `delegate?.didDismiss()`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements protocol and controller, but omits `weak` on delegate property. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing protocol declaration or close method fails to call delegate. | 35 | No | Fail (35%) |

---

## Verdict

The rubrics successfully:
1. Distinguish push navigation (hierarchical drill-down) from modal presentation (interruption).
2. Assess understanding of modern iOS `.pageSheet` lifecycle nuances.
3. Validate memory management safety via weak delegates to prevent retain cycles.
4. Clarify `navigationItem` versus `navigationBar` roles and presentation timing rules.
5. Verify code implementation of push navigation, modal presentation, and delegate patterns.
