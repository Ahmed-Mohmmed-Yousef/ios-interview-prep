# Research: Approachable Concurrency

Topic ID: `approachable-concurrency`
Level: Mid
Goal: After this topic, you can explain default main actor isolation, @concurrent and nonisolated.

## 1. Official Sources & Technical Mechanics

### Sources
- **WWDC25: Embracing Swift Concurrency (Session 268)**
  https://developer.apple.com/videos/play/wwdc2025/268/
- **Swift 6.2 Released | Swift.org**
  https://www.swift.org/blog/swift-6.2-released/
- **Swift Evolution SE-0443: Default MainActor Isolation**
  https://github.com/swiftlang/swift-evolution/
- **The Swift Programming Language: Concurrency**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency

### Core Technical Concepts

1. **The Problem with Early Concurrency Defaults**:
   - In Swift 5.5 through 6.0, the default isolation for all code was non-isolated (unbound to any actor).
   - In iOS and macOS app development, the overwhelming majority (90%+) of code touches the user interface, view models, navigation, and presentation state.
   - Requiring explicit `@MainActor` annotations on every class, struct, function, and closure created substantial boilerplate, confusion for beginners, and frequent accidental actor-hop friction.

2. **Default MainActor Isolation (Approachable Concurrency)**:
   - Swift 6.2 introduces approachable concurrency, where app target code is isolated to `@MainActor` by default.
   - Classes, structs, view models, global state, and synchronous callbacks run on the main thread automatically without needing `@MainActor` annotations everywhere.
   - UI updates, state binding, and standard application flows become naturally safe against threading violations.

3. **Opting Out to Background Execution with `@concurrent` and `nonisolated`**:
   - Because code defaults to the main actor, developers must explicitly opt out when performing heavy or blocking background work to keep the UI smooth (60/120 fps).
   - **`@concurrent` attribute**:
     - Applied to async functions or closures that perform intensive CPU or background work.
     - `@concurrent func computeHash(data: Data) async -> String { ... }` runs on the cooperative background thread pool.
     - When called from UI code, calling `await computeHash(data)` hops off the main thread to a background worker, and resumes seamlessly back on `@MainActor`.
   - **`nonisolated` keyword**:
     - Used on synchronous or asynchronous declarations to detach them completely from `@MainActor` isolation.
     - Useful for utility functions, math helpers, or types that should not be tied to the UI run loop.

4. **Mental Model Comparison**:
   - *Traditional Swift Concurrency (5.5 - 6.0):* Default to non-isolated background context; opt into main thread with `@MainActor`.
   - *Approachable Concurrency (Swift 6.2+):* Default to `@MainActor` UI context; opt out to background thread pool with `@concurrent` and `nonisolated`.

## 2. Interview Questions by Level

### Fresh / Junior Level
- Why is defaulting to `@MainActor` helpful for iOS developers?
- What happens if you run heavy data processing directly on the main actor?
- How do you move a function off the main thread in approachable concurrency?

### Mid Level
- Compare the isolation default in Swift 5.5 versus approachable concurrency in Swift 6.2.
- How does the `@concurrent` attribute work when calling an async function from a view model?
- When would you mark a method or property `nonisolated` in an app using default main actor isolation?

### Senior / Staff Level
- How does default main actor isolation affect library authors versus application authors?
- How do compiler optimizations and thread hops behave when calling `@concurrent` functions from SwiftUI views?
- Discuss architectural best practices for structuring background pipeline services in an approachable concurrency architecture.
