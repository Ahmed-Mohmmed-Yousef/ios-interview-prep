# Research: Custom Views and the Layout Pass

**Topic ID:** `custom-views-layout-pass`  
**Level:** Mid  
**Goal:** After this topic, you can build custom views and explain how UIKit lays out views.  
**Prerequisites:** `auto-layout`

---

## 1. Official Sources & Key Documentation

1. **Apple Developer Documentation: `layoutSubviews()`**  
   - URL: https://developer.apple.com/documentation/uikit/uiview/layoutsubviews()  
   - Subclasses override this method to perform precise layout of their subviews.
   - Called by the system when the view's bounds change or layout is flagged dirty.
   - **Never call `layoutSubviews()` directly.** To trigger a layout update, call `setNeedsLayout()` for an asynchronous pass or `layoutIfNeeded()` for an immediate synchronous pass.
   - Always call `super.layoutSubviews()` in custom implementations.

2. **Apple Developer Documentation: `setNeedsLayout()`**  
   - URL: https://developer.apple.com/documentation/uikit/uiview/setneedslayout()  
   - Flags the view's layout as invalid and schedules a layout pass on the main thread during the next update cycle.
   - Coalesces multiple layout requests into a single pass to optimize CPU usage.

3. **Apple Developer Documentation: `layoutIfNeeded()`**  
   - URL: https://developer.apple.com/documentation/uikit/uiview/layoutifneeded()  
   - Forces an immediate layout pass if the view has been marked dirty.
   - Key mechanism for animating Auto Layout changes inside `UIView.animate`: update constraints first, then call `view.layoutIfNeeded()` inside the animation closure.

4. **Apple Developer Documentation: Intrinsic Content Size & Sizing**  
   - `intrinsicContentSize`: defines natural dimensions based on content (e.g., text, image).
   - `invalidateIntrinsicContentSize()`: notifies Auto Layout that intrinsic dimensions changed.
   - `sizeThatFits(_:)`: asks the view to calculate and return the size that best fits specified dimensions.

---

## 2. Core Phases of the UIKit RunLoop Update Cycle

1. **Constraints Pass (Update phase):**
   - Resolves Auto Layout constraint relationships.
   - Methods: `setNeedsUpdateConstraints()`, `updateConstraintsIfNeeded()`, `updateConstraints()`.
2. **Layout Pass (Arrangement phase):**
   - Calculates frames and positions subviews within allocated bounds.
   - Methods: `setNeedsLayout()`, `layoutIfNeeded()`, `layoutSubviews()`.
3. **Display Pass (Render phase):**
   - Draws vector graphics and commits pixel buffers to Core Animation / GPU.
   - Methods: `setNeedsDisplay()`, `draw(_ rect:)`.

---

## 3. Interview Traps & Best Practices

- **Direct invocation trap:** Calling `layoutSubviews()` directly in client code instead of `setNeedsLayout()` or `layoutIfNeeded()`.
- **Infinite layout recursion:** Modifying constraints or adding subviews inside `layoutSubviews()` without conditional guards triggers re-entrant layout passes.
- **Missing super call:** Omitting `super.layoutSubviews()` breaks Auto Layout engine positioning of subviews.
- **Animation timing trap:** Forgetting to call `layoutIfNeeded()` inside `UIView.animate` when animating constraint changes (causes instant jump instead of smooth animation).
- **Dual Initializers:** Failing to implement `init?(coder:)` when creating programmatic custom views.
