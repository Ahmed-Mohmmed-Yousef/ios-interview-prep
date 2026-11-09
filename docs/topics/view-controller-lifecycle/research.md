# Research: View Controller Lifecycle (UIKit)

## 1. Core Concepts & Technical Facts

### The Lifecycle Methods in Chronological Order

1. **`init(coder:)` / `init(nibName:bundle:)`**:
   - Controller object is allocated in heap memory.
   - `isViewLoaded` is `false`. Do not access `self.view` here.
2. **`loadView()`**:
   - Invoked lazily when `self.view` is first accessed.
   - Responsible for creating or unarchiving the root view hierarchy.
   - Only override when constructing views programmatically in code (`self.view = CustomView()`).
   - Do NOT call `super.loadView()` if you provide a custom view.
3. **`viewDidLoad()`**:
   - Called once after the root view is loaded into memory.
   - Ideal for: one-time setup, adding subviews, setting up Auto Layout constraints, configuring delegates, initial data bindings.
   - Important: subview geometry and frames are NOT final here.
4. **`viewWillAppear(_ animated: Bool)`**:
   - Called immediately before the view appears on screen (every time: initial presentation, navigation pop back, modal dismissal).
   - Ideal for: reloading fresh data, updating dynamic UI state, toggling navigation bar visibility, registering keyboard notifications.
   - Must call `super.viewWillAppear(animated)`.
5. **`viewWillLayoutSubviews()` / `viewDidLayoutSubviews()`**:
   - Called whenever the root view's bounds change or Auto Layout runs (e.g., orientation change, split view resizing).
   - Can be called multiple times per screen presentation.
   - In `viewDidLayoutSubviews()`, all subviews have their final frames and safe area insets applied. Ideal for adjusting layer masks, gradients, or corner radii.
6. **`viewDidAppear(_ animated: Bool)`**:
   - Called immediately after the view transition animation finishes and the view is fully visible on screen.
   - Ideal for: starting animations, initiating video/audio playback, screen view analytics, presenting alerts or onboarding prompts.
   - Must call `super.viewDidAppear(animated)`.
7. **`viewWillDisappear(_ animated: Bool)`**:
   - Called immediately before the view is dismissed, covered, or popped from the navigation stack.
   - Ideal for: resigning first responder (hiding keyboard), pausing playback, stopping timers, saving unsaved user drafts.
   - Must call `super.viewWillDisappear(animated)`.
8. **`viewDidDisappear(_ animated: Bool)`**:
   - Called immediately after the view transition animation finishes and the view is completely off-screen.
   - Ideal for: stopping sensor monitoring, tearing down resource-heavy background tasks.
   - Must call `super.viewDidDisappear(animated)`.
9. **`deinit`**:
   - Invoked by ARC when the view controller instance is freed from memory.
   - Failure to execute indicates a retain cycle (e.g., strong delegate, escaping closure capturing `self`).

---

## 2. Common Misconceptions & Interview Traps

1. **"Doing repeated work in `viewDidLoad`"**:
   - *Trap*: Fetching updated data or refreshing screen badges in `viewDidLoad`. If a user navigates to a child screen and pops back, `viewDidLoad` does not run again!
   - *Correction*: Put repeat updates in `viewWillAppear`.
2. **"Adding subviews in `viewWillAppear`"**:
   - *Trap*: Calling `view.addSubview()` inside `viewWillAppear`. Each time the screen appears, duplicate subviews are layered on top of each other, leaking memory and degrading render performance.
   - *Correction*: Add subviews once in `viewDidLoad`.
3. **"Setting layer corner radii or gradients in `viewDidLoad`"**:
   - *Trap*: Using `button.bounds` to set `cornerRadius = button.bounds.height / 2` or configuring a `CAGradientLayer.frame = view.bounds` inside `viewDidLoad`. The bounds are zero or default storyboard size at this stage!
   - *Correction*: Configure geometry-dependent layers in `viewDidLayoutSubviews`.
4. **"Forgetting to call `super`"**:
   - *Trap*: Overriding `viewWillAppear`, `viewDidAppear`, `viewWillDisappear`, or `viewDidDisappear` without calling `super`. UIKit relies on these calls to coordinate system transitions and accessibility announcements.
   - *Correction*: Always invoke `super.viewWillAppear(animated)`, etc.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: The sequence starts with `viewDidLoad` which runs once when the screen loads into memory. `viewWillAppear` runs every time the screen is about to appear, and `viewDidAppear` runs when it is fully visible. When leaving, `viewWillDisappear` and `viewDidDisappear` run. Always call `super` in these methods.
- **Junior**:
  - Focus: Differentiating one-time setup (`viewDidLoad`) versus repeatable refresh (`viewWillAppear`). Explaining when frames are finalized (`viewDidLayoutSubviews`) for gradients and corner radii. Handling teardown (dismissing keyboard, stopping timers) in `viewWillDisappear`. Using `deinit` to diagnose retain cycles.
- **Senior**:
  - Focus: Layout engine interaction (the layout pass cycle: `setNeedsLayout()`, `layoutIfNeeded()`, `viewWillLayoutSubviews`, `layoutSubviews`, `viewDidLayoutSubviews`). Presentation lifecycle in navigation stacks versus modal presentation styles (e.g. `UIModalPresentationPageSheet` where presenting controller does not call `viewWillDisappear`). Memory pressure handling with `didReceiveMemoryWarning()`.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: UIViewController**:
   - https://developer.apple.com/documentation/uikit/uiviewcontroller
2. **Apple Developer Documentation: Displaying and managing views with a view controller**:
   - https://developer.apple.com/documentation/uikit/displaying-and-managing-views-with-a-view-controller
