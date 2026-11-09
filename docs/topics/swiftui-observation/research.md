# Research: Data Flow with @Observable

## 1. Core Concepts & Technical Facts

### What is the Observation Framework?
- Introduced in iOS 17, iPadOS 17, macOS 14, and Swift 5.9 (`import Observation`).
- Uses Swift macros via the `@Observable` macro attached to class declarations.
- Replaces the Combine-based `ObservableObject` protocol, `@Published`, `@StateObject`, `@ObservedObject`, and `@EnvironmentObject` with a simpler and faster observation model.

### Key Capabilities and Mechanisms
1. **Property-Level Tracking**:
   - `ObservableObject` triggers `objectWillChange` whenever *any* `@Published` property changes. This causes every view reading *any* part of the object to redraw.
   - `@Observable` tracks property access at runtime using an internal tracking registrar. SwiftUI observes which specific properties are read during a view's `body` execution.
   - A view only redraws when a property that it actually read in `body` changes. If a view reads `model.title`, and `model.score` changes, that view does not redraw.

2. **No `@Published` Required**:
   - All stored properties in an `@Observable` class are automatically tracked.
   - To opt out of tracking for a property, mark it with `@ObservationIgnored`.

3. **Property Wrappers Used in Views**:
   - **`@State`**: Used to create and own the model lifecycle within a view:
     ```swift
     @State private var user = UserModel()
     ```
     `@State` maintains reference identity across view invalidations.
   - **Plain Property**: When passing an `@Observable` instance to a child view for display or invocation:
     ```swift
     struct ProfileView: View {
         let user: UserModel
         var body: some View {
             Text(user.name)
         }
     }
     ```
     No property wrapper is needed if only reading or mutating values.
   - **`@Bindable`**: Used when a view needs to create two-way bindings (like `$user.name` for a `TextField`) to an `@Observable` object it does not own:
     ```swift
     struct EditView: View {
         @Bindable var user: UserModel
         var body: some View {
             TextField("Name", text: $user.name)
         }
     }
     ```
     You can also create a bindable binding inline: `@Bindable var user = user`.
   - **`@Environment`**: Injecting and reading from the view hierarchy:
     - Injection: `.environment(userModel)`
     - Reading: `@Environment(UserModel.self) private var userModel`
     - No need for custom `EnvironmentKey` boilerplate or `@EnvironmentObject`. Optional models default to `nil` if not present in the environment.

---

## 2. Common Misconceptions & Interview Traps

1. **"You must mark properties with `@Published` in `@Observable` classes"**:
   - *Correction*: `@Observable` automatically tracks all stored properties. `@Published` is from Combine and is not used with `@Observable`.
2. **"You still need `@ObservedObject` or `@StateObject` in child views"**:
   - *Correction*: `@Observable` does not conform to `ObservableObject`. Passing it to `@ObservedObject` produces a compiler error. Use plain `let model: MyModel` or `@Bindable var model: MyModel`.
3. **"`@Observable` works on structs"**:
   - *Correction*: `@Observable` can only be applied to reference types (`class`). Applying it to a `struct` or `actor` results in a compilation error.
4. **"All views reading any property redraw on change"**:
   - *Correction*: SwiftUI only registers dependencies for properties accessed during the body execution. Unused properties do not trigger redraws.
5. **"`@Bindable` owns the object"**:
   - *Correction*: `@Bindable` does not manage object lifecycle or store state. It only produces bindings (`Binding<T>`) for mutable properties of an `@Observable` object. Use `@State` for ownership.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: `@Observable` is a macro introduced in iOS 17 that lets SwiftUI views watch class properties for changes. You create an instance with `@State` in the parent view, and any view that displays a property automatically updates when that property changes.
- **Junior**:
  - Focus: Explain property-level observation versus `ObservableObject`'s whole-object invalidation. Describe how `@Bindable` creates bindings without owning lifecycle, how `@Environment(Model.self)` works without `@EnvironmentObject`, and why `@Published` is no longer needed.
- **Senior**:
  - Focus: The Observation runtime architecture (the `ObservationRegistrar` macro expansion, `withObservationTracking`, and thread safety). Performance benefits over Combine publishers by eliminating publisher overhead and reducing SwiftUI view graph diffing. Discussing migration strategies from `ObservableObject`, handling computed properties, and `@ObservationIgnored` for non-UI state or heavy caches.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Managing model data in your app**:
   - https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app
2. **Apple Developer Documentation: Observation**:
   - https://developer.apple.com/documentation/observation
3. **WWDC23: Discover Observation in SwiftUI**:
   - https://developer.apple.com/videos/play/wwdc2023/10149/
