# Research: Auto Layout (UIKit)

## 1. Core Concepts & Technical Facts

### The Auto Layout Equation
- Auto Layout models layout as a system of linear equations and inequalities solved by the Cassowary solver:
  `item1.attribute1 = multiplier * item2.attribute2 + constant`
- Handled programmatically via `NSLayoutAnchor` (iOS 9+) for type-safe constraint construction.

### Programmatic Constraint Setup
1. **`translatesAutoresizingMaskIntoConstraints = false`**:
   - By default, views instantiated in code have this flag set to `true`, which generates automatic constraints from legacy autoresizing masks.
   - For any view positioned using Auto Layout, this flag must be set to `false`. Otherwise, conflicting constraints will collide and throw layout errors in the console.
2. **View Hierarchy Precondition**:
   - You MUST add views to a superview (`parent.addSubview(child)`) *before* activating constraints between them. Activating constraints between views without a common ancestor crashes with `No common ancestor for views`.
3. **Batch Activation**:
   - Use `NSLayoutConstraint.activate([...])` to activate an array of constraints in a single pass. This minimizes layout recalculations.

### Anchor Types & Localization
- **`NSLayoutXAxisAnchor`**: `leadingAnchor`, `trailingAnchor`, `centerXAnchor`, `leftAnchor`, `rightAnchor`.
  - Always prefer `leadingAnchor` / `trailingAnchor` over `leftAnchor` / `rightAnchor`. Leading and trailing flip automatically for Right-to-Left (RTL) languages (e.g. Arabic, Hebrew).
- **`NSLayoutYAxisAnchor`**: `topAnchor`, `bottomAnchor`, `centerYAnchor`, `firstBaselineAnchor`, `lastBaselineAnchor`.
- **`NSLayoutDimension`**: `widthAnchor`, `heightAnchor`. Can constrain to constants or to other dimension anchors with multipliers.

### Safe Area Layout Guide (`safeAreaLayoutGuide`)
- Introduced in iOS 11 to protect UI content from being obscured by hardware notches, the Dynamic Island, status bars, and the home indicator bar.
- Always pin interactive controls or scroll views to `view.safeAreaLayoutGuide.topAnchor` / `bottomAnchor`. Background colors can bleed to `view.topAnchor` for full-bleed effects.

### Intrinsic Content Size & Priority Rules
- Many UIKit views (`UILabel`, `UIButton`, `UIImageView`) have an `intrinsicContentSize` computed from their content.
- When two views compete for horizontal or vertical space:
  1. **Content Hugging Priority (CHP)**:
     - Resistance against being pulled larger than its intrinsic content size.
     - Default priority: 250 (`.defaultLow`).
     - The view with the **lower** hugging priority will stretch to fill extra space.
  2. **Content Compression Resistance Priority (CCRP)**:
     - Resistance against being squeezed smaller than its intrinsic content size (prevents text truncation).
     - Default priority: 750 (`.defaultHigh`).
     - The view with the **higher** compression resistance retains its text; the lower one truncates with ellipses.
3. **Constraint Priorities**:
   - Range from 1 to 1000 (`.required` = 1000, `.defaultHigh` = 750, `.defaultLow` = 250).
   - If constraints conflict, the constraint solver satisfies the higher priority constraint and breaks the lower priority one.

---

## 2. Common Misconceptions & Interview Traps

1. **"Activating constraints before calling `addSubview`"**:
   - *Trap*: Calling `NSLayoutConstraint.activate([viewA.topAnchor.constraint(equalTo: viewB.topAnchor)])` before `parent.addSubview(viewA)` throws a fatal crash: `Unable to activate constraint with no common ancestor`.
   - *Correction*: Always add views to the view hierarchy first.
2. **"Forgetting `translatesAutoresizingMaskIntoConstraints = false`"**:
   - *Trap*: Setting anchors without setting this flag to false produces `Unable to simultaneously satisfy constraints` console dumps as autoresizing masks fight constraints.
   - *Correction*: Set `view.translatesAutoresizingMaskIntoConstraints = false` immediately after creating each programmatic view.
3. **"Using left and right anchors instead of leading and trailing"**:
   - *Trap*: Using `leftAnchor` and `rightAnchor` causes English and Arabic layouts to align identically, breaking localization guidelines.
   - *Correction*: Always use `leadingAnchor` and `trailingAnchor`.
4. **"Confusing Content Hugging with Compression Resistance"**:
   - *Trap*: In a horizontal row of Name and Age labels, developer increases Name's compression resistance hoping it won't stretch.
   - *Correction*: Stretching is governed by Content Hugging (lower stretches). Shrinking/clipping is governed by Compression Resistance (higher resists truncation).

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: Auto Layout allows views to adapt dynamically to different screen sizes and orientations. We create constraints using anchors like `leadingAnchor` and `topAnchor`. In code, we must set `translatesAutoresizingMaskIntoConstraints = false` and add the view before activating constraints.
- **Junior**:
  - Focus: Explaining `NSLayoutAnchor` and batch activation via `NSLayoutConstraint.activate`. Distinguishing `leading`/`trailing` for RTL localization. Utilizing `safeAreaLayoutGuide` for notch/island margins. Explaining Content Hugging (resists stretching, lower stretches) and Compression Resistance (resists clipping, higher prevents truncation).
- **Senior**:
  - Focus: Deep understanding of the Cassowary linear programming solver algorithm. Managing layout performance and avoiding constraint churn in dynamic cells (`prepareForReuse`). Debugging unsatisfiable constraints using symbolic breakpoints (`UIViewAlertForUnsatisfiableConstraints`) and visual debugging. Combining `UIStackView` with layout guides for clean, composable UI architectures.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: NSLayoutConstraint**:
   - https://developer.apple.com/documentation/uikit/nslayoutconstraint
2. **Apple Developer Documentation: View layout (UIKit)**:
   - https://developer.apple.com/documentation/uikit/view-layout
3. **Apple Developer Documentation: NSLayoutAnchor**:
   - https://developer.apple.com/documentation/uikit/nslayoutanchor
