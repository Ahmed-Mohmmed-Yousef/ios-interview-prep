# Research: Actors and @MainActor

Topic ID: `actors-and-main-actor`
Level: Mid
Goal: After this topic, you can protect shared state with actors and run UI code on the main actor.

## 1. Official Sources & Actor Mechanics

### Sources
- **The Swift Programming Language: Concurrency**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
- **WWDC21: Protect mutable state with Swift actors (Session 10133)**
  https://developer.apple.com/videos/play/wwdc2021/10133/
- **Apple Developer Documentation: MainActor**
  https://developer.apple.com/documentation/swift/mainactor

### Core Technical Concepts

1. **The Actor Protocol & State Isolation**:
   - Actors are reference types declared with the `actor` keyword.
   - Like classes, actors have identity and support properties, methods, and initializers, but they do NOT support inheritance.
   - Actors guarantee **mutual exclusion**: only one task can execute code on an actor instance at any given time.
   - External callers must use `await` when reading actor properties or invoking methods (known as actor-hopping).
   - Inside the actor's own methods, access to its mutable state is synchronous and direct.

2. **The `nonisolated` Keyword**:
   - Methods, computed properties, or protocol conformances can be marked `nonisolated`.
   - `nonisolated` code can be called synchronously from outside the actor.
   - It cannot touch mutable actor properties; it can only read immutable `let` constants or call other non-isolated APIs.
   - Standard use cases: conforming to `CustomStringConvertible`, `Hashable`, or accessing immutable identifiers.

3. **Actor Reentrancy**:
   - Swift actors are **reentrant**. When an actor method hits an `await` suspension point, the actor gives up its turn, allowing other tasks to run on that actor.
   - Critical consequence: mutable state might change while the method is suspended!
   - Developers cannot assume state remains identical across suspension points. State invariants must be verified or re-checked after returning from an `await`.

4. **The `@MainActor` Global Actor**:
   - A global actor backed by the main thread run loop.
   - UI frameworks (UIKit view controllers, SwiftUI view bodies, UI state models) must execute on `@MainActor` to prevent main-thread violation crashes.
   - Applied to classes, structs, functions, or properties:
     - `@MainActor class ViewModel { ... }` ensures all properties and methods run on the main thread.
     - `MainActor.run { ... }` executes a synchronous closure directly on the main actor from a background task.
     - `MainActor.assumeIsolated { ... }` executes a closure synchronously when the caller already knows it runs on the main thread.

5. **Sendable Boundaries**:
   - Data passed into or returned from an actor must conform to `Sendable` (value types, immutable classes, other actors, or `@Sendable` closures).
   - Passing non-Sendable mutable reference types across actor boundaries triggers compile-time errors in Swift 6.

## 2. Interview Questions by Level

### Fresh / Junior
- What is an `actor` in Swift?
- Why do you need to write `await` when calling an actor method from outside?
- What does the `@MainActor` attribute do?

### Mid
- How do actors prevent data races compared to manual locks or serial dispatch queues?
- What is actor reentrancy, and why can it introduce subtle bugs?
- When should you mark an actor property or method as `nonisolated`?

### Senior
- How does actor reentrancy prevent deadlocks, and how does that compare to recursive mutexes in Objective-C?
- How do you design an image download cache actor to avoid duplicate in-flight network requests during reentrancy?
- How does Swift 6 strict concurrency enforce Sendable checking at actor boundaries?

## 3. Common Traps and Misconceptions

- **Trap 1: Assuming state cannot change across an `await` inside an actor**:
  Because actors are reentrant, another task can modify actor state while an async call suspends. Always check or re-evaluate assumptions after an `await`.
- **Trap 2: Overusing `@MainActor` on background workers**:
  Marking an entire network or database service with `@MainActor` forces serialization onto the main thread, causing UI stutters and frame drops. Only isolate UI state and view models to `@MainActor`.
- **Trap 3: Mutating state inside `nonisolated` methods**:
  `nonisolated` code cannot mutate actor properties; attempting to do so causes compiler errors.
