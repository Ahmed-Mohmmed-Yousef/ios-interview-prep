# Research: Sendable and Data Races

Topic ID: `sendable-data-races`
Level: Mid
Goal: After this topic, you can explain data races and how Sendable helps stop them.

## 1. Official Sources & Technical Mechanics

### Sources
- **Apple Developer Documentation: Sendable**
  https://developer.apple.com/documentation/swift/sendable
- **WWDC22: Eliminate data races using Swift Concurrency (Session 110351)**
  https://developer.apple.com/videos/play/wwdc2022/110351/
- **Swift Evolution SE-0302: Sendable and @Sendable closures**
  https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-sendable.md
- **Swift Evolution SE-0414: Region-based Isolation**
  https://github.com/swiftlang/swift-evolution/blob/main/proposals/0414-region-based-isolation.md

### Core Technical Concepts

1. **What is a Data Race?**:
   - A data race happens when two or more concurrent execution contexts (threads or tasks) access the same memory location simultaneously, at least one access is a write, and there is no synchronization (locks, queues, or actor isolation).
   - Data races cause silent memory corruption, inconsistent app state, undefined behavior, and crashes that are notoriously difficult to reproduce.
   - A data race is different from a general race condition. A race condition is a logical flaw in timing or ordering (such as two requests completing in unexpected order). A data race is unsynchronized low-level memory access.

2. **The `Sendable` Marker Protocol**:
   - `Sendable` is a marker protocol in the Swift standard library. It has no required properties, methods, or runtime witness tables.
   - It signals to the compiler that values of the type can be safely transferred across concurrency boundaries (between tasks, threads, and actors).
   - Value types (`struct`, `enum`):
     - Implicitly conform to `Sendable` if non-public and all stored properties conform to `Sendable`.
     - For public types, the conformance must be explicitly declared: `public struct User: Sendable { ... }`.
   - Standard library value types (`Int`, `String`, `Double`, `Bool`, tuples of Sendable types, `Optional`, `Array`, `Dictionary`, `Set`) conform to `Sendable` when their element types do.
   - Actors conform to `Sendable` inherently because actor isolation ensures only one task can mutate actor state at a time.

3. **Classes and `Sendable`**:
   - Reference types are not Sendable by default because multiple tasks holding references can mutate the underlying object concurrently.
   - A class can safely conform to `Sendable` only under strict conditions:
     1. It must be `final` (prevents subclasses adding mutable state).
     2. All stored properties must be immutable (`let`).
     3. All stored properties must themselves conform to `Sendable`.
     4. The class cannot inherit from any class other than `NSObject` (or must have no superclass).

4. **`@Sendable` Function and Closure Types**:
   - Closures passed across concurrency boundaries (e.g., `Task.detached { ... }` or actor method parameters) must be `@Sendable`.
   - Restrictions on `@Sendable` closures:
     - Cannot capture mutable local variables (`var`).
     - Any captured values must conform to `Sendable`.
     - Top-level variables captured must be immutable.

5. **`@unchecked Sendable`**:
   - Opt-out attribute for types where safety cannot be proven by the compiler, but is guaranteed manually by the developer (for example, wrapping state with `os_unfair_lock`, `NSLock`, or a dedicated serial dispatch queue).
   - Disables compiler safety checks for that type.
   - High risk: if the manual locking implementation has bugs, data races will still occur at runtime without compiler warnings.

6. **Region-Based Isolation (Swift 6)**:
   - Swift 6 introduces flow-sensitive transfer analysis.
   - If a non-Sendable instance is created locally and transferred into another task or actor, and the compiler can prove the local scope never references it again, the transfer is permitted because no concurrent access is possible.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What is a data race, and why is it dangerous?
- Why are Swift structs naturally safer in multithreaded code than classes?
- What does the `Sendable` protocol do in Swift?

### Mid Level
- What conditions must a class satisfy to conform to `Sendable` safely?
- What is the difference between `Sendable` and `@Sendable`?
- When would you use `@unchecked Sendable`, and what dangers does it introduce?
- How do actors interact with `Sendable` types?

### Senior / Staff Level
- How does Swift 6 region-based isolation (SE-0414) change the rules for passing non-Sendable values between tasks?
- How do you migrate an existing codebase with custom thread-safe reference types protected by `os_unfair_lock` to Swift 6 strict concurrency?
- Compare compile-time data race safety in Swift Concurrency with runtime detection using Thread Sanitizer (TSan).
