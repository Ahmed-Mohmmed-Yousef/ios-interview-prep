# Research — @State and @Binding (Step 1)

Researched 2026-11-09. Topic: `state-and-binding` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27.

Facts are written in our own words. Apple documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [State](https://developer.apple.com/documentation/swiftui/state)**
- **Source of truth**: `@State` is a property wrapper that establishes a local source of truth owned by a specific view.
- **External persistent storage**: Even though view structs are transient value types recreated frequently, SwiftUI stores `@State` data in dedicated persistent memory associated with the view's structural identity.
- **Access control recommendation**: Apple guidelines state `@State` properties should always be marked `private` to avoid accidental mutation from outside the owning view.
- **Projected value (`$`)**: Prefixing an `@State` property with `$` accesses its projected value, which returns a `Binding<Value>` reference.

**Apple Developer Documentation — [Binding](https://developer.apple.com/documentation/swiftui/binding)**
- **Two-way connection**: `@Binding` provides a two-way reference to data owned by another source of truth (such as an `@State` property on a parent view).
- **No local storage**: A binding does not store or own data. Modifying a binding directly updates the underlying source of truth, triggering view invalidation and re-rendering across both child and parent views.
- **Programmatic creation**: Can be created manually using `Binding.constant(_:)` (ideal for canvas `#Preview` blocks) or custom closures via `Binding(get:set:)`.

**Apple Developer Documentation — [Managing user interface state](https://developer.apple.com/documentation/swiftui/managing-user-interface-state)**
- **Reactivity loop**:
  1. User interacts with UI (e.g., taps a toggle or button).
  2. Interaction mutates the state property (directly or via binding).
  3. SwiftUI detects the mutation and invalidates views that depend on that property.
  4. SwiftUI re-evaluates `var body` on the main thread and applies minimal render updates.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| @State declaration | `@State private var count: Int = 0` | Compiles under Swift 6 strict concurrency |
| Projected value binding | `$isOn` yields `Binding<Bool>` | Compiles and binds cleanly to Toggle / Child views |
| Binding modification | Child view writing to `@Binding var isOn: Bool` | Mutates parent `@State` and updates view hierarchy |
| Constant binding for previews | `Binding.constant(true)` | Compiles and provides static preview state |
| State property wrapper inspection | Accessing `_count` yields `State<Int>` struct | Confirmed via runtime type inspection |

## 3. Common wrong ideas (traps)

1. **"Initializing `@State` in `init` dynamically responds to parent changes."** False. SwiftUI initializes `@State` storage only once when the view is first attached to the graph. Subsequent calls to `init` with updated parameters will be ignored by SwiftUI's persistent state container.
2. **"Views should declare `@State` as public."** False. Exposing `@State` publicly breaks encapsulation; child views should receive a `@Binding` or value parameter instead.
3. **"Mutating `@State` inside `var body` is allowed."** False. Mutating state during the body evaluation pass triggers infinite invalidation cycles and compiler runtime warnings.
4. **"Binding owns a duplicate copy of the state."** False. `@Binding` owns no data; it is an active two-way pointer to the original source of truth.
5. **"@State can manage global app-wide database models."** False. `@State` is intended for view-local value-type UI states (e.g., toggles, text input, navigation triggers). Larger models belong in `@Observable` or `@Environment`.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between `@State` and `@Binding` in SwiftUI?
  - Why should `@State` properties always be marked `private`?
  - What does the dollar sign (`$`) mean when passing an `@State` property to a child view?
  - How does changing an `@State` property cause the screen to update?
  - How do you provide sample binding data inside a `#Preview` block?
- **Junior**:
  - Why is initializing an `@State` property inside a view's `init` from a parameter an anti-pattern?
  - How does SwiftUI preserve `@State` data when the parent view struct is recreated?
  - How do custom getter and setter bindings (`Binding(get:set:)`) work?
  - What is unidirectional data flow and how do `@State` and `@Binding` enforce it?
- **Senior**:
  - How does SwiftUI manage state storage in the attribute graph relative to structural identity?
  - How does SwiftUI's observation system compare between `@State` with value types versus `@Observable` with reference types in Swift 5.9+?
  - How do you prevent excessive body invalidation cascades when passing bindings down deep view hierarchies?
