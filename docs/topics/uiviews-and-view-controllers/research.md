# Research: Views and View Controllers (UIKit)

## 1. Core Concepts & Technical Facts

### What is a `UIView`?
- An object that manages the content for a rectangular area on the screen.
- Inherits from `UIResponder` -> `NSObject`. It handles touch events, renders content (via Core Animation layer `CALayer`), and manages layout for its subviews.
- Unlike SwiftUI `View` (which is a lightweight, immutable struct describing UI), a `UIView` is a mutable class instance that persists in memory.

### The View Hierarchy
- Views are organized in a tree hierarchy:
  - Each view can have one `superview` and multiple `subviews`.
  - Adding a child view: `parentView.addSubview(childView)` increments the child's reference count.
  - Removing a child view: `childView.removeFromSuperview()`.
- Coordinate Systems:
  - **`frame`**: Specifies the view's location and size in its **superview's** coordinate system (`CGRect(origin: CGPoint, size: CGSize)`).
  - **`bounds`**: Specifies the view's location and size in its **own** coordinate system. The origin is typically `(0, 0)` unless adjusted (e.g., inside a scroll view during scrolling).
  - **`center`**: The midpoint of the frame rectangle in the superview's coordinate system.
  - When applying affine transforms (scaling, rotation), `frame` changes to the enclosing bounding box; `bounds` and `center` should be used to position or query the view dimensions.

### What is a `UIViewController`?
- Manages a view hierarchy for a UIKit application.
- Stores a reference to its root view via the `view` property (`var view: UIView!`).
- Responsibilities:
  1. Updating the contents of the views in response to underlying data changes.
  2. Responding to user interactions with views.
  3. Resizing views and managing the layout of the overall interface.
  4. Coordinating with other objects, including other view controllers.
  5. Handling system events such as memory warnings and device orientation changes.

### Lazy View Loading
- A view controller's root view is loaded lazily:
  - When `vc.view` is accessed for the first time, UIKit invokes `loadView()`.
  - In code-only apps: override `loadView()` to assign a custom root view (`self.view = CustomView()`), without calling `super.loadView()`.
  - Once the view is loaded into memory, UIKit calls `viewDidLoad()`.

### Custom View Controller Containment
- View controllers can embed other view controllers as children (e.g., `UINavigationController`, `UITabBarController`, or custom containers).
- Strict 3-step containment protocol:
  1. `addChild(childVC)` — notifies child it is joining parent.
  2. `view.addSubview(childVC.view)` — adds child's view into parent view hierarchy and configures constraints/frame.
  3. `childVC.didMove(toParent: self)` — signals child that transition is complete.
- Removal protocol:
  1. `childVC.willMove(toParent: nil)`
  2. `childVC.view.removeFromSuperview()`
  3. `childVC.removeFromParent()`

---

## 2. Common Misconceptions & Interview Traps

1. **"Accessing `vc.view` during `init` to configure properties"**:
   - *Trap*: Accessing `vc.view` before the view controller is presented forces early view loading before dependencies or models are passed.
   - *Correction*: Configure view subviews and styling inside `viewDidLoad()`, or inject dependencies via the initializer and assign to views in `viewDidLoad()`.
2. **"Confusing `frame` and `bounds`"**:
   - *Trap*: Modifying `frame` after applying a `transform` (such as rotation) yields unexpected layout bugs because `frame` represents the smallest non-rotated bounding box containing the view.
   - *Correction*: Use `center` and `bounds` when working with transformed views.
3. **"Calling `super.loadView()` when setting a custom view"**:
   - *Trap*: If you assign `self.view = MyView()` inside `loadView()`, calling `super.loadView()` unnecessarily allocates the default blank UIView before replacing it.
   - *Correction*: In `loadView()`, assign your custom view directly to `self.view` and do not call `super.loadView()`.
4. **"Embedding child view controllers using only `addSubview`"**:
   - *Trap*: Simply writing `view.addSubview(childVC.view)` without `addChild()` prevents the child controller from receiving lifecycle events (`viewWillAppear`, `viewDidAppear`) and rotation/trait updates.
   - *Correction*: Always invoke the complete containment sequence (`addChild`, `addSubview`, `didMove(toParent:)`).

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: In UIKit, `UIView` represents a rectangular screen element that draws content and handles taps. `UIViewController` manages that view and its lifecycle. Views can contain subviews in a tree structure. We set up buttons, labels, and layouts in `viewDidLoad`.
- **Junior**:
  - Focus: Differentiating `frame` (superview coordinates) and `bounds` (own coordinates). Understanding lazy view loading and the role of `loadView()` versus `viewDidLoad()`. Explaining the difference between reference-based UIKit views and value-based SwiftUI structs. Implementing clean child view controller containment using `addChild` and `didMove(toParent:)`.
- **Senior**:
  - Focus: Architecture of view controller decoupling, coordinator patterns, and containment hierarchies. Memory optimization (avoiding retain cycles in delegate protocols and closures). Offloading custom drawing and layout pass logic to custom `UIView` subclasses (`layoutSubviews`, `draw(_:)`, `intrinsicContentSize`). Bridging UIKit and SwiftUI via `UIViewRepresentable` and `UIHostingController`.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: UIView**:
   - https://developer.apple.com/documentation/uikit/uiview
2. **Apple Developer Documentation: UIViewController**:
   - https://developer.apple.com/documentation/uikit/uiviewcontroller
3. **Apple Developer Documentation: Implementing a Container View Controller**:
   - https://developer.apple.com/documentation/uikit/view_controllers/creating_a_custom_container_view_controller
