# Research: View Identity and Lifetime

Topic ID: `view-identity-lifetime`  
Level: Mid  
Goal: After this topic, you can explain view identity and when SwiftUI updates a view.

## 1. Official Sources & Technical Mechanics

### Sources
- **WWDC21: Demystify SwiftUI (Session 10022)**: https://developer.apple.com/videos/play/wwdc2021/10022/
- **State (SwiftUI)**: https://developer.apple.com/documentation/swiftui/state
- **View.id(_:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/view/id(_:)

### Core Technical Concepts

1. **Identity in SwiftUI**:
   - SwiftUI views are lightweight, immutable structs that are created and discarded constantly.
   - However, SwiftUI maintains persistent UI nodes and state across time using **Identity**.
   - There are two forms of identity:
     - **Explicit Identity**: Assigned via `.id(uniqueIdentifier)` or when using `ForEach(items, id: \.id)` / `Identifiable`. You assign a custom key that uniquely identifies a specific item or view.
     - **Structural Identity**: Inferred by SwiftUI based on the view's static position within the view hierarchy tree. The compiler uses `ViewBuilder` types (such as `_ConditionalContent<TrueContent, FalseContent>`) to recognize distinct branches.

2. **Branching and Identity Destabilization**:
   - `if isExpanded { ViewA } else { ViewB }`:
     - SwiftUI creates two separate structural identities.
     - Toggling `isExpanded` terminates the lifetime of the previous view: its `@State` is deallocated, animations reset, and fresh state is initialized for the newly inserted branch.
   - Property changes or ternary operators (`view.foregroundStyle(isExpanded ? .blue : .gray)`):
     - Keeps a SINGLE structural identity.
     - The view identity persists. `@State` is preserved, and SwiftUI animates transitions smoothly between states.

3. **View Lifetime and State Persistence**:
   - A view's **lifetime** is the period over which SwiftUI links a stable identity to allocated state storage.
   - `@State` properties exist for the lifetime of the view's identity, NOT the lifetime of the struct value.
   - When identity changes:
     - Old `@State` storage is destroyed.
     - Running `.task` modifiers are cancelled.
     - OnAppear and OnDisappear callbacks fire.
   - If a view's identity remains stable, recreating the struct during body evaluation does not reset its `@State`.

4. **Performance & Pitfalls**:
   - **`AnyView` (Type Erasure)**: Destroys compile-time structural identity. SwiftUI cannot see the static layout tree, impairing diffing and preventing optimal view reuse.
   - **Dynamic Identifiers in Body (`.id(UUID())`)**: Generates a new identity on every single evaluation of `body`. This constantly destroys and recreates `@State`, triggers memory thrashing, and breaks fluid animations.
   - **Identity Transitions (`.transition`)**: Transitions only execute when a view's identity appears or disappears from the hierarchy. If identity is unchanged, standard property animations apply instead.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What is the difference between explicit identity and structural identity?
- Why does a `@State` variable keep its value even when a view struct is recreated?
- What happens if you use `if/else` to show two variations of the same view?

### Mid Level
- Explain how `_ConditionalContent` models structural identity in SwiftUI.
- Compare using an `if/else` statement versus a ternary modifier for view styling in terms of state and animations.
- When should you intentionally change a view's explicit identity using `.id(_:)`?
- Why should you avoid returning `AnyView` in complex view hierarchies?

### Senior / Staff Level
- How does SwiftUI diff view hierarchies between body evaluation passes using graph dependencies?
- How do identity changes affect `.task` lifecycles, gesture recognizers, and scroll positions in lazy containers?
- How would you debug an issue where a child view's state unexpectedly resets during parent view re-evaluations?
