# Research: Swift 6 Strict Concurrency

Topic ID: `swift-6-strict-concurrency`
Level: Mid
Goal: After this topic, you can fix common Swift 6 concurrency errors.

## 1. Official Sources & Technical Mechanics

### Sources
- **Migrating to Swift 6 (Swift.org)**
  https://www.swift.org/migration/documentation/migrationguide/
- **WWDC24: Migrate your app to Swift 6 (Session 10169)**
  https://developer.apple.com/videos/play/wwdc2024/10169/
- **The Swift Programming Language: Concurrency**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
- **Swift Evolution SE-0412: Strict Concurrency Checking for Global Variables**
  https://github.com/swiftlang/swift-evolution/blob/main/proposals/0412-strict-concurrency-for-global-variables.md

### Core Technical Concepts

1. **Swift 6 Concurrency Model**:
   - In Swift 5, concurrency checking was opt-in using `-strict-concurrency=complete`. Warnings were emitted, but code still compiled.
   - In Swift 6 language mode (`-swift-version 6`), complete concurrency checking is enabled by default. Warnings become hard compiler errors.
   - Swift 6 eliminates data races statically at compile time.

2. **Common Compiler Error Patterns and Fixes**:
   - **Error A: Passing non-Sendable type across concurrency boundaries**:
     - *Diagnostic:* `Type 'MyClass' does not conform to the 'Sendable' protocol`.
     - *Remedies:*
       1. Change reference type (`class`) to value type (`struct` or `enum`).
       2. Make class `final` and make all stored properties immutable `let` Sendable constants.
       3. Isolate the type to an actor or `@MainActor`.
       4. Rely on Region-Based Isolation (SE-0414) if the value is never referenced again after transfer.
   - **Error B: Main actor-isolated method called from non-isolated context**:
     - *Diagnostic:* `Call to main actor-isolated initializer/method in a synchronous nonisolated context`.
     - *Remedies:*
       1. Mark the calling function or class with `@MainActor`.
       2. Use `await` to hop onto the main actor asynchronously.
       3. Wrap synchronous UI updates in `await MainActor.run { ... }`.
       4. Use `MainActor.assumeIsolated { ... }` when the caller is guaranteed to run on the main thread (e.g., delegate callbacks known to be on main).
   - **Error C: Non-thread-safe global or static variables**:
     - *Diagnostic:* `Reference to var 'globalState' is not concurrency-safe because it involves shared mutable state`.
     - *Remedies:*
       1. Change `var` to `let` constant if value never changes.
       2. Isolate global/static state with `@MainActor` or a custom actor.
       3. If manual thread safety exists, use `nonisolated(unsafe)`.
   - **Error D: Mutating captured `var` in `@Sendable` closure**:
     - *Diagnostic:* `Mutation of captured var 'counter' in concurrently-executing code`.
     - *Remedies:*
       1. Return values from `Task` (`let result = await task.value`) instead of mutating captured outer state.
       2. Accumulate mutations inside an actor or `TaskGroup`.

3. **Migration Pragmatism**:
   - `@preconcurrency import`: Silences Sendable warnings originating from older external libraries that have not yet updated to Swift 6.
   - `nonisolated(unsafe)`: Opt-out keyword introduced in Swift 6 to selectively silence isolation checks on properties or variables managed by external thread safety (e.g. locks).
   - Incremental migration: Swift packages and app modules can migrate independently. A Swift 5 module can depend on a Swift 6 module and vice-versa.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What is the difference between Swift 5 concurrency warnings and Swift 6 concurrency errors?
- How do you fix a compiler error about a mutable global variable in Swift 6?
- Why does Swift 6 stop you from mutating a captured variable inside a Task closure?

### Mid Level
- You see an error: "Call to main actor-isolated method in a synchronous nonisolated context". What are three distinct ways to fix this?
- What does the `nonisolated(unsafe)` keyword do, and when should you use it?
- How does `@preconcurrency import` assist during migration of large existing iOS apps?

### Senior / Staff Level
- Describe an end-to-end strategy for migrating an enterprise codebase (100k+ LOC, multiple framework modules) to Swift 6 strict concurrency without halting feature delivery.
- How does Swift 6 region-based isolation reduce the burden of declaring types as `Sendable`?
- When is `MainActor.assumeIsolated` preferred over `MainActor.run`, and what crash risk does it carry?
