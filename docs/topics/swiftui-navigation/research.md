# Research — Navigation (`swiftui-navigation`)

Researched 2026-11-09. Baseline: Swift 6.4, iOS 18 / macOS 15 SDK, Xcode 26+.

## 1. Official Sources

- **Apple Developer Documentation: NavigationStack**:
  https://developer.apple.com/documentation/swiftui/navigationstack
  Introduced in iOS 16. A view that displays a root view and enables presenting additional views over the root view.
- **Apple Developer Documentation: NavigationLink**:
  https://developer.apple.com/documentation/swiftui/navigationlink
  Controls that initiate navigation presentations when pressed. Modern usage pairs `NavigationLink(value:)` with `.navigationDestination(for:destination:)`.
- **Apple Developer Documentation: NavigationPath**:
  https://developer.apple.com/documentation/swiftui/navigationpath
  A type-erased list of data representing the navigation state inside a `NavigationStack`.
- **WWDC22: The SwiftUI cookbook for navigation**:
  https://developer.apple.com/videos/play/wwdc2022/10054/
  Explains the transition from view-based `NavigationView` to state-driven `NavigationStack`, separating data identity from destination view construction.

---

## 2. Core Concepts & Technical Facts

### 1. NavigationStack Architecture
- `NavigationStack` manages a stack of views where learners push child screens onto the top and pop them off to return.
- Root view is rendered as the base.
- When bound to a path (e.g. `NavigationStack(path: $path)`), the navigation stack is entirely data-driven:
  - Appending a value to the path pushes a destination view onto the stack.
  - Removing a value (or calling `path.removeLast()`) pops views back to earlier screens.
  - Resetting `path = NavigationPath()` (or `path.removeAll()`) instantly pops all the way back to the root screen.

### 2. Value-Based Navigation vs View-Based Navigation
- In iOS 13–15, `NavigationView` used `NavigationLink(destination: DetailView())`. This had a major flaw: **eager instantiation**. When a list of 100 rows rendered, 100 `DetailView()` structs were instantiated upfront even if the user never clicked any row.
- In iOS 16+, Apple introduced `NavigationLink(value: item)` paired with `.navigationDestination(for: ItemType.self) { item in DetailView(item: item) }`.
  - The destination view is only created **when the user taps the link** (lazy instantiation).
  - Navigation state is decoupled from view presentation.
  - Values must conform to `Hashable`.

### 3. NavigationPath vs Homogeneous Collection
- For a stack where every destination is of the same type (e.g., browsing a hierarchy of `Folder` items), a typed array `[Folder]` can be bound directly to `NavigationStack(path: $folders)`.
- For a heterogeneous stack where destinations have varying types (e.g., `String`, `User`, `SettingsRoute`), `NavigationPath` provides a type-erased collection that can store any `Hashable` value while maintaining type-safe destination mapping.

### 4. Navigation Modifiers Placement
- `.navigationTitle("Title")`: Must be placed on the **content view inside the navigation stack**, NOT on the `NavigationStack` itself. Placing it on the stack has no effect because navigation bars are configured by the active top view on the stack.
- `.navigationBarTitleDisplayMode(.inline | .large | .automatic)`: Configures the size and behavior of the title bar.
- `.toolbar { ... }`: Attaches interactive bar button items to the active screen.

---

## 3. Common Interview Traps

1. **Deprecated NavigationView**:
   Candidates still writing `NavigationView { ... }` in modern Swift interviews. `NavigationView` was deprecated in iOS 16. Modern SwiftUI code uses `NavigationStack` for single-column stacks or `NavigationSplitView` for multi-column iPad/macOS layouts.
2. **Eager Instantiation with `NavigationLink(destination:)`**:
   Passing view instances directly into `NavigationLink` causes performance bottlenecks and unwanted side-effects. Interviewers expect `NavigationLink(value:)` and `.navigationDestination(for:)`.
3. **Missing `Hashable` conformance**:
   When using `NavigationLink(value: customStruct)`, the struct must conform to `Hashable`. Forgetting `Hashable` triggers compiler errors.
4. **Putting `.navigationTitle` on `NavigationStack`**:
   Attaching `.navigationTitle` to `NavigationStack` instead of its child view results in an empty navigation bar.
5. **Nesting NavigationStacks**:
   Embedding a `NavigationStack` inside another `NavigationStack` produces duplicate navigation bars, broken back gestures, and unexpected navigation behavior.

---

## 4. Interview Questions by Level

### Fresh
- What is `NavigationStack` and what is its purpose?
- Where should `.navigationTitle()` be placed in your code?
- How do you pass data to a detail screen using `NavigationLink`?

### Junior
- Why did Apple deprecate `NavigationView` in favor of `NavigationStack` in iOS 16?
- How does `NavigationLink(value:)` improve performance compared to `NavigationLink(destination:)`?
- How do you implement programmatic "pop to root" using `NavigationPath`?

### Senior
- How does data-driven navigation support deep-linking, state restoration, and routing architectures?
- How does SwiftUI resolve multiple `.navigationDestination` modifiers registered in child views?
- When would you choose `NavigationSplitView` over `NavigationStack`?
