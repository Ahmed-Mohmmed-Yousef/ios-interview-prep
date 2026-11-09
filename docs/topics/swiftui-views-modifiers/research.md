# Research — Views and Modifiers (Step 1)

Researched 2026-11-09. Topic: `swiftui-views-modifiers` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27.

Facts are written in our own words. Apple documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [View](https://developer.apple.com/documentation/swiftui/view)**
- **Protocol definition**: `protocol View` requires `associatedtype Body: View` and `@ViewBuilder @MainActor var body: Self.Body { get }`.
- **Value type design**: Views are structs, not classes. They represent descriptions of user interfaces, not persistent canvas objects like UIKit's `UIView`.
- **Efficiency**: Structs are stack-allocated and lightweight. Creating and destroying view structs is cheap. SwiftUI rebuilds view descriptions frequently to compute diffs against previous states.
- **Opaque return type (`some View`)**: Swift uses `some View` to conceal deeply nested generic types (such as `ModifiedContent<ModifiedContent<Text, _PaddingLayout>, _BackgroundStyleModifier<Color>>`) while preserving compile-time type safety.

**Apple Developer Documentation — [Configuring Views](https://developer.apple.com/documentation/swiftui/configuring-views)**
- **Modifiers wrap views**: Modifiers do not mutate an existing view instance in place. Each modifier returns a new view wrapped inside `ModifiedContent`.
- **Order matters**: Because each modifier wraps the previous view, modifier chaining order directly changes visual rendering and layout bounds.
  - Calling `.padding().background(.blue)` expands the view frame first, then paints the entire padded area blue.
  - Calling `.background(.blue).padding()` paints only the tight text frame blue, then adds transparent padding outside.

**Apple Developer Documentation — [ViewModifier](https://developer.apple.com/documentation/swiftui/viewmodifier)**
- **Protocol**: Requires `func body(content: Content) -> some View`.
- **Packaging reusable styling**: Custom modifiers bundle repeated appearance traits, layout modifiers, and environmental adjustments into a single reusable struct.

**Apple Developer Documentation — [#Preview](https://developer.apple.com/documentation/swiftui/building-layouts-with-stack-views)**
- `#Preview` macro provides instant, interactive canvas rendering in Xcode.
- Replaced the older `PreviewProvider` protocol boilerplate starting in Xcode 15 and Swift 5.9.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| View protocol requirement | Struct conforming to `View` with `var body: some View` | Compiles under Swift 6 strict concurrency |
| Modifier returns new type | `Text("Hello").padding()` produces `ModifiedContent<Text, _PaddingLayout>` | Confirmed via Swift type inspection |
| Modifier order differentiation | `.padding().background(...)` vs `.background(...).padding()` | Compiles; produces distinct wrapped generic hierarchies |
| Custom ViewModifier | Struct conforming to `ViewModifier` with `body(content:)` | Packages reusable styling cleanly |
| View extension helper | `extension View { func customStyle() -> some View }` | Enables standard dot-syntax chaining |

## 3. Common wrong ideas (traps)

1. **"Modifiers mutate the view instance in place."** False. Views are immutable value types. Modifiers wrap the current view into a new `ModifiedContent` view struct.
2. **"Modifier order does not matter in SwiftUI."** False. Wrapping is hierarchical. Applying `.padding()` before `.background()` produces a vastly different visual layout than applying it after.
3. **"SwiftUI views are long-lived UI objects like `UIView`."** False. SwiftUI views are transient descriptions of UI that are created and discarded cheaply whenever state changes.
4. **"You can run network requests or heavy calculations inside `var body`."** False. `body` is called repeatedly whenever state changes; expensive work blocks the main thread and ruins frame rates.
5. **"Custom modifiers must be classes to retain state."** False. `ViewModifier` structs can manage `@State` or environment properties, benefiting from value-type performance.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between a SwiftUI `View` and a UIKit `UIView`?
  - Why are SwiftUI views structs instead of classes?
  - What does `some View` mean in the `body` property?
  - Why does the order of view modifiers matter?
  - How do you preview a SwiftUI view in Xcode?
- **Junior**:
  - How does SwiftUI avoid performance degradation when view structs are constantly recreated?
  - How do you create a reusable custom `ViewModifier` in SwiftUI?
  - What type does a modifier actually return under the hood (`ModifiedContent`)?
  - Why should you avoid doing heavy computations inside `var body`?
- **Senior**:
  - How does SwiftUI's view graph diffing mechanism work (structural identity vs explicit identity)?
  - How does `@ViewBuilder` construct tuple views and conditional branches at compile time?
  - When should you use a custom `ViewModifier` versus creating a custom container `View`?
