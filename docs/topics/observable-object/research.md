# Research: ObservableObject and @StateObject

## 1. Core Concepts & Technical Facts

### ObservableObject Architecture (Combine)
- Introduced in iOS 13 / Swift 5.1 with Combine.
- `ObservableObject` is a protocol requiring an `objectWillChange` publisher.
- When an object conforms to `ObservableObject`, the compiler synthesizes an `ObservableObjectPublisher` for `objectWillChange`.
- `@Published` property wrappers automatically send an event through `objectWillChange` *before* the wrapped value changes (`willSet`).
- Any SwiftUI view observing the object is invalidated whenever *any* `@Published` property sends an event.

### Property Wrappers in Views
1. **`@StateObject`** (Introduced in iOS 14):
   - Establishes **ownership** of the `ObservableObject` lifecycle inside a view.
   - Instantiated once; SwiftUI retains the instance across view recalculations, parent re-renders, and identity refreshes.
   - Should only be used where the model is created:
     ```swift
     @StateObject private var viewModel = ProfileViewModel()
     ```
2. **`@ObservedObject`** (Introduced in iOS 13):
   - Receives an existing `ObservableObject` created elsewhere (e.g., passed in from a parent view).
   - Does **not** own the lifecycle.
   - **Critical Trap**: Initializing an `@ObservedObject` directly inside a view (`@ObservedObject var vm = ProfileViewModel()`) causes the object to be recreated whenever the parent view redraws, discarding state and restarting network tasks.
3. **`@EnvironmentObject`**:
   - Injects an `ObservableObject` into the environment for a view subtree using `.environmentObject(viewModel)`.
   - Read in descendant views using `@EnvironmentObject var viewModel: ProfileViewModel`.
   - **Fatal Trap**: If a descendant view reads `@EnvironmentObject` and the ancestor forgot to inject it, the application crashes at runtime.

### Coarse-Grained Invalidation
- Unlike the Observation framework (`@Observable` in iOS 17), `ObservableObject` invalidates views at the object level rather than property level.
- If an `ObservableObject` has 10 `@Published` properties, changing property A invalidates every view reading property B, C, or D.

### Migration Path to Modern `@Observable` (iOS 17+)
| Combine / Legacy (iOS 13–16) | Observation (iOS 17+) |
|---|---|
| `class Model: ObservableObject` | `@Observable class Model` |
| `@Published var name: String` | `var name: String` |
| `@StateObject private var model = Model()` | `@State private var model = Model()` |
| `@ObservedObject var model: Model` | `let model: Model` or `@Bindable var model: Model` |
| `.environmentObject(model)` | `.environment(model)` |
| `@EnvironmentObject var model: Model` | `@Environment(Model.self) var model` |

---

## 2. Common Misconceptions & Interview Traps

1. **"Using `@ObservedObject var vm = ViewModel()` is safe if initialized inline"**:
   - *Correction*: SwiftUI views are transient structs. Whenever the parent view evaluates its body, a new struct is created. If initialized as `@ObservedObject`, a new `ViewModel` is created on every parent redraw, resetting state. Always use `@StateObject` for ownership.
2. **"`objectWillChange` fires after the property updates"**:
   - *Correction*: `objectWillChange` fires in the `willSet` phase *before* the change happens. At the moment the publisher sends its signal, the property still holds its old value.
3. **"`@Published` works inside structs"**:
   - *Correction*: `@Published` is designed only for class types conforming to `ObservableObject`. Using it in a struct produces a compiler error.
4. **"`@StateObject` can be used interchangeably with `@ObservedObject`"**:
   - *Correction*: `@StateObject` guarantees persistent lifecycle. `@ObservedObject` expects external lifecycle management.
5. **"`@EnvironmentObject` returns nil if missing"**:
   - *Correction*: `@EnvironmentObject` expects the object to exist and forcefully unboxes it; if missing, SwiftUI throws a fatal runtime exception.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: `ObservableObject` is a protocol for classes that hold app data. We mark properties with `@Published` to trigger screen updates. In views, we use `@StateObject` when the view creates the object, and `@ObservedObject` when a parent passes it in.
- **Junior**:
  - Focus: Difference between `@StateObject` and `@ObservedObject` lifecycle. Explain why creating a model with `@ObservedObject` causes state loss on parent redraws. Describe object-level invalidation via `objectWillChange` versus property-level invalidation in iOS 17 `@Observable`, and explain how to migrate to the new macro.
- **Senior**:
  - Focus: Combine architecture behind `ObservableObjectPublisher`. The performance impact of coarse-grained `objectWillChange` on complex view trees and diffing overhead. Thread safety: ensuring `@Published` mutations occur on the main actor (`@MainActor`). Safe dependency injection patterns avoiding fatal `@EnvironmentObject` crashes.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Migrating from ObservableObject to @Observable**:
   - https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro
2. **Apple Developer Documentation: ObservableObject (Combine)**:
   - https://developer.apple.com/documentation/combine/observableobject
3. **Apple Developer Documentation: StateObject (SwiftUI)**:
   - https://developer.apple.com/documentation/swiftui/stateobject
