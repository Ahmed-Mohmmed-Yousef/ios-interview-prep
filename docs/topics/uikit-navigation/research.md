# Research: Navigation in UIKit

## 1. Core Concepts & Technical Facts

### Hierarchical Navigation: `UINavigationController`
- A container view controller that manages a stack of child view controllers in a Last-In, First-Out (LIFO) order.
- The stack is stored in `viewControllers: [UIViewController]`. The bottom item is the root view controller; the top item is `topViewController`.
- Methods:
  - `pushViewController(_:animated:)` — pushes a view controller onto the stack.
  - `popViewController(animated:)` — pops the top controller off the stack, releasing it from memory unless retained elsewhere.
  - `popToRootViewController(animated:)` — pops all controllers except the root.
  - `popToViewController(_:animated:)` — pops back to an existing controller in the stack.
  - `setViewControllers(_:animated:)` — replaces the entire navigation stack programmatically.

### Navigation Item & Bar
- Each child controller configures its own `navigationItem`:
  - `title`, `largeTitleDisplayMode`, `backBarButtonItem`.
  - `leftBarButtonItem`, `rightBarButtonItem`, `leftBarButtonItems`, `rightBarButtonItems`.
- Navigation bar appearance (iOS 13+):
  - `UINavigationBarAppearance` configured via `standardAppearance`, `compactAppearance`, `scrollEdgeAppearance`.

### Modal Presentations: `present(_:animated:completion:)`
- Used to interrupt current workflow for focused tasks, warnings, or secondary flows.
- Invoked on any view controller:
  `present(modalVC, animated: true, completion: nil)`
  `dismiss(animated: true, completion: nil)`
- Presentation Styles (`modalPresentationStyle`):
  1. `.pageSheet` / `.formSheet`:
     - Default on iPhone in iOS 13+.
     - Appears as a floating card sliding up from bottom.
     - Presenting view stays in the view hierarchy; therefore, the presenting controller **does NOT** call `viewWillDisappear` or `viewDidDisappear`.
     - Users can dismiss by swiping down unless `isModalInPresentation = true`.
  2. `.fullScreen`:
     - Covers the entire screen. The presenting controller **does** receive `viewWillDisappear` and `viewDidDisappear`.
  3. `.overFullScreen`:
     - Covers the screen, but leaves transparent backgrounds visible. Presenting view controller remains visible beneath.
  4. `.popover`:
     - Anchors to a bar button or view on iPad; adapts to pageSheet on iPhone.

### Data Passing Patterns
- **Forward**: Inject data properties directly into the child view controller before calling `pushViewController` or `present`.
- **Backward**:
  - Delegate pattern (with `weak` reference to prevent retain cycles).
  - Closures / completion handlers (with `[weak self]` capture list).
  - NotificationCenter (for broadcast events).

---

## 2. Common Misconceptions & Interview Traps

1. **"Calling `pushViewController` when `self.navigationController` is nil"**:
   - *Trap*: Calling `navigationController?.pushViewController(...)` does nothing if the controller was not embedded inside a `UINavigationController`.
   - *Correction*: Wrap root view controller in `UINavigationController(rootViewController: vc)` at app or coordinator startup.
2. **"`viewWillAppear` always runs when a modal is dismissed"**:
   - *Trap*: Relying on `viewWillAppear` to refresh data after presenting a `.pageSheet` modal. Because `.pageSheet` leaves the presenting view in the hierarchy, `viewWillAppear` does NOT execute upon dismissal.
   - *Correction*: Use delegate callbacks or presentation completion handlers, or set `.fullScreen` presentation style.
3. **"Retain cycles in delegate navigation"**:
   - *Trap*: Declaring `var delegate: DetailDelegate?` strongly retains the presenting controller, causing memory leaks on pop.
   - *Correction*: Always declare delegates as `weak var delegate: DetailDelegate?` conforming to `AnyObject`.
4. **"Attempt to present on a controller whose view is not in the window hierarchy"**:
   - *Trap*: Calling `present()` inside `viewDidLoad()` before the presenting controller is attached to the active window.
   - *Correction*: Call `present()` inside `viewDidAppear()` or after the controller is on screen.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: In UIKit, we push and pop screens using `UINavigationController` for drill-down lists. For separate tasks, we present screens modally using `present`. We pass data forward by setting properties on the next view controller before pushing.
- **Junior**:
  - Focus: Differentiating push navigation (hierarchical drill-down) versus modal presentation (interruptive focused task). Explaining `.pageSheet` versus `.fullScreen` presentation styles, including the fact that `.pageSheet` does not trigger `viewWillDisappear` on the presenting view. Using weak delegates to pass data back safely without retain cycles.
- **Senior**:
  - Focus: Decoupling navigation from view controllers using the Coordinator pattern. Managing complex navigation stacks programmatically with `setViewControllers`. Building custom transition animations with `UIViewControllerAnimatedTransitioning` and interactive transition controllers (`UIPercentDrivenInteractiveTransition`).

---

## 4. Official Sources & References

1. **Apple Developer Documentation: UINavigationController**:
   - https://developer.apple.com/documentation/uikit/uinavigationcontroller
2. **Apple Developer Documentation: present(_:animated:completion:)**:
   - https://developer.apple.com/documentation/uikit/uiviewcontroller/present(_:animated:completion:)
