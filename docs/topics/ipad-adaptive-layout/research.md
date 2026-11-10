# iPad and Adaptive Layout Research

**Topic ID:** `ipad-adaptive-layout`  
**Level:** Mid  
**Date:** 2026-11-10  
**Author:** Curriculum Production Agent  

---

## 1. Official Documentation & Authoritative Sources

1. **Human Interface Guidelines: Layout**  
   https://developer.apple.com/design/human-interface-guidelines/layout  
   *Adaptive layout design: designing for variable screen sizes, orientations, multitasking modes, safe areas, and dynamic content scaling.*

2. **UITraitCollection (UIKit)**  
   https://developer.apple.com/documentation/uikit/uitraitcollection  
   *Size classes: `UIUserInterfaceSizeClass.compact` and `.regular`. Trait hierarchies, trait environments, and modern iOS 17+ trait change registration via `registerForTraitChanges(_:handler:)`.*

3. **NavigationSplitView (SwiftUI)**  
   https://developer.apple.com/documentation/swiftui/navigationsplitview  
   *Multi-column navigation interface: two-column and three-column styles that automatically collapse into a single-column stack in compact horizontal size classes.*

4. **UISplitViewController (UIKit)**  
   https://developer.apple.com/documentation/uikit/uisplitviewcontroller  
   *Column-based container controller supporting `.doubleColumn` and `.tripleColumn` styles, column show/hide behaviors, and compact adaptation.*

5. **ViewThatFits (SwiftUI)**  
   https://developer.apple.com/documentation/swiftui/viewthatfits  
   *Adaptive container view that evaluates its child views in order and renders the first one that fits within the available layout space.*

6. **WWDC Sessions**  
   - WWDC23 Session 10057: *Unleash the UIKit trait system*  
   - WWDC22 Session 10054: *The SwiftUI cookbook for navigation*  
   - WWDC22 Session 10113: *Support multiple windows on iPad*  

---

## 2. Key Technical Concepts

### Size Classes
- Introduced to abstract hardware screen sizes into logical categories:
  - **Horizontal Size Class (`horizontalSizeClass`)**: `.compact` or `.regular`.
  - **Vertical Size Class (`verticalSizeClass`)**: `.compact` or `.regular`.
- **iPhone**:
  - Portrait: compact width, regular height.
  - Landscape: compact width, compact height (except large iPhone Plus/Max/Pro Max models which provide regular width in landscape).
- **iPad**:
  - Full screen (both portrait and landscape): regular width, regular height.
  - **Multitasking (Split View & Slide Over)**: When an app runs in Slide Over or 1/3 Split View, its window width becomes **compact**! An iPad app can change from regular to compact width in real time as the user drags the multitasking divider.

### Trait System Changes in Modern iOS
- `traitCollectionDidChange(_:)` was **deprecated in iOS 17**.
- In modern UIKit, views and view controllers observe trait changes using:
  ```swift
  registerForTraitChanges([UITraitHorizontalSizeClass.self]) { (self: Self, previousTraitCollection: UITraitCollection) in
      self.updateAdaptiveLayout()
  }
  ```
- Traits are now decoupled and extensible, allowing custom traits via `UITraitDefinition`.

### SwiftUI Adaptive Layout
- Query horizontal size class:
  ```swift
  @Environment(\.horizontalSizeClass) private var horizontalSizeClass
  ```
- **`NavigationSplitView`**: Standard multi-column navigation for iPad and Mac.
  - In regular width: shows 2 or 3 columns (Sidebar, Content, Detail).
  - In compact width: collapses automatically into a single navigation stack hierarchy.
- **`AnyLayout`**: Conditionally switch between `HStackLayout` and `VStackLayout` without recreating view state:
  ```swift
  let layout = horizontalSizeClass == .regular ? AnyLayout(HStackLayout()) : AnyLayout(VStackLayout())
  layout { ... }
  ```
- **`ViewThatFits`**: Automatically picks between a full horizontal row and a wrapped vertical list based on available space.

### Multitasking, Stage Manager & Multi-Window
- **Stage Manager**: Resizable floating windows on iPadOS and macOS. Window bounds can be resized dynamically to arbitrary aspect ratios.
- **`UIScreen.main.bounds` is deprecated**: Apps must never rely on screen hardware size. Frame layout must always derive from the window, view controller view, or `GeometryReader`.

---

## 3. Common Interview Questions by Level

### Fresh / Junior Level
- What are horizontal and vertical size classes in iOS?
- What are the size classes of an iPhone in portrait orientation?
- Why should you avoid checking `UIDevice.current.userInterfaceIdiom == .pad` for layouts?
- How do you conditionally display an `HStack` or `VStack` in SwiftUI?

### Mid Level
- What happens to an iPad app size class when running in Slide Over or 1/3 Split View?
- How does `NavigationSplitView` adapt when an iPad window shrinks from regular to compact width?
- How does `ViewThatFits` work in SwiftUI, and when would you use it?
- Why is `UIScreen.main.bounds` deprecated, and how should you calculate available dimensions instead?

### Senior / Staff Level
- How did trait change handling change in iOS 17 with `registerForTraitChanges` versus the deprecated `traitCollectionDidChange`?
- How do you architect view hierarchies to support Stage Manager and freeform window resizing without layout stutter or visual glitches?
- How do you design multi-scene architectures with `UISceneConfiguration` and state restoration for iPad multitasking?
