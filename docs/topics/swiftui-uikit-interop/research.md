# Research: SwiftUI and UIKit Together (`swiftui-uikit-interop`)

## Core Concepts & Mechanics

### 1. UIKit into SwiftUI: `UIViewRepresentable` & `UIViewControllerRepresentable`
- **Protocol**: `UIViewRepresentable` wraps a `UIView` into a SwiftUI `View` value type.
- **Key Methods**:
  - `makeUIView(context:) -> UIViewType`: Called exactly once when creating the underlying UIKit view. Must configure initial properties and setup subviews.
  - `updateUIView(_ uiView: UIViewType, context: Context)`: Called whenever SwiftUI state or environment dependencies change. Updates the UIKit view with new values. Must NOT mutate SwiftUI `@State` or `@Binding` synchronously here, or layout loops occur.
  - `makeCoordinator() -> Coordinator`: Optional factory for an instance that bridges UIKit delegates, target-action selectors, and gesture recognizers back into SwiftUI bindings.
  - `dismantleUIView(_ uiView: UIViewType, coordinator: Coordinator)`: Clean-up hook before view removal (e.g. invalidate timers, tear down observers).
  - `sizeThatFits(_ proposal: ProposedViewSize, uiView: UIViewType, context: Context) -> CGSize?`: iOS 16+ customization of SwiftUI layout sizing proposal.
- **UIViewControllerRepresentable**:
  - Parallels `UIViewRepresentable` but manages full view controllers (e.g., `UIImagePickerController`, `MFMailComposeViewController`, `QLPreviewController`, `UIActivityViewController`).
  - Methods: `makeUIViewController(context:)`, `updateUIViewController(_:context:)`, `dismantleUIViewController(_:coordinator:)`.

### 2. SwiftUI into UIKit: `UIHostingController` & `UIHostingConfiguration`
- **`UIHostingController(rootView: MySwiftUIView())`**:
  - A standard `UIViewController` subclass whose `view` displays a SwiftUI view hierarchy.
  - Sizing: respects SwiftUI intrinsic content size or auto layout constraints.
  - Proper View Controller Containment:
    ```swift
    addChild(hostingController)
    view.addSubview(hostingController.view)
    hostingController.view.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([...])
    hostingController.didMove(toParent: self)
    ```
    Omitting containment calls causes broken safe areas and lost lifecycle events (`viewWillAppear`, `viewDidDisappear`).
- **`UIHostingConfiguration` (iOS 16+)**:
  - Modern API for `UITableViewCell` and `UICollectionViewCell`:
    ```swift
    cell.contentConfiguration = UIHostingConfiguration {
        HStack {
            Image(systemName: "star")
            Text(item.title)
        }
    }
    ```
  - Automatically manages sizing and cell reuse without maintaining manual `UIHostingController` instances per cell.

### 3. Bidirectional Data Flow & The Coordinator Pattern
- **SwiftUI to UIKit**: State changes in SwiftUI trigger `updateUIView(_:context:)`. Properties on the UIKit view are updated (e.g. `uiView.text = text`).
- **UIKit to SwiftUI**: The `Coordinator` serves as the delegate or target for UIKit controls. When the user interacts (e.g. typing or picking a date), the coordinator assigns new values to the bound SwiftUI `@Binding` property.
- **Preventing Feedback Loops**:
  - When updating a UIKit control (e.g. `uiView.text = text`), guard against unnecessary assignments if values already match (`if uiView.text != text { uiView.text = text }`) to avoid cursor jumping or trigger loops.

### 4. Common Pitfalls & Traps
1. **Instantiating in updateUIView**: Creating new views inside `updateUIView` destroys existing state and degrades performance. Only mutate properties on the passed `uiView`.
2. **Synchronous State Mutation**: Calling a binding setter or mutating `@Binding` inside `updateUIView` results in "Modifying state during view update will cause undefined behavior".
3. **Missing View Controller Containment**: Adding `hostingController.view` as a subview without `addChild()` and `didMove(toParent:)` breaks view controller lifecycle forwarding and navigation bars.
4. **Cell Reuse Leaks**: Embedding hosting controllers manually into table view or collection view cells leads to memory leaks and broken cell recycling; use `UIHostingConfiguration` on iOS 16+.

## Sources
1. `UIViewRepresentable` (Apple Developer Documentation): https://developer.apple.com/documentation/swiftui/uiviewrepresentable
2. `UIHostingController` (Apple Developer Documentation): https://developer.apple.com/documentation/swiftui/uihostingcontroller
3. `UIHostingConfiguration` (Apple Developer Documentation): https://developer.apple.com/documentation/uikit/uihostingconfiguration
4. WWDC22: *Use SwiftUI with UIKit (Session 10072)*: https://developer.apple.com/videos/play/wwdc2022/10072/
