# Research: Tasks and Task Groups

Topic ID: `structured-concurrency`
Level: Mid
Goal: After this topic, you can create tasks and task groups, and explain structured concurrency.

## 1. Official Sources & Concurrency Mechanics

### Sources
- **The Swift Programming Language: Concurrency**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
- **WWDC21: Explore structured concurrency in Swift (Session 10134)**
  https://developer.apple.com/videos/play/wwdc2021/10134/
- **Apple Developer Documentation: TaskGroup**
  https://developer.apple.com/documentation/swift/taskgroup

### Core Technical Concepts

1. **Structured Concurrency Tree**:
   - Structured concurrency organizes asynchronous work into a clear parent-child tree hierarchy, matching the lexical scope of the code (analogous to how `if` blocks and `for` loops structure sequential code).
   - In structured concurrency:
     - A parent task cannot complete until all of its child tasks have finished.
     - Cancellation automatically propagates down the tree from parent to children.
     - Priority and task-local values propagate automatically from parent to children.
     - Errors thrown by child tasks propagate back to the parent.

2. **Structured Child Tasks**:
   - `async let`: Spawns a child task concurrently within the current lexical scope. The parent awaits its value later. If the parent exits or throws before the child completes, Swift cancels and awaits the child task.
   - `withTaskGroup(of:returning:body:)` / `withThrowingTaskGroup(of:returning:body:)`: Spawns a dynamic number of concurrent child tasks.
     - `group.addTask { ... }` adds a new child task.
     - `group.addTaskUnlessCancelled { ... }` avoids adding work if the group has already been cancelled.
     - Results are gathered as an `AsyncSequence` via `for await result in group`.
     - The closure cannot return until all child tasks complete; any unfinished child tasks are implicitly cancelled and awaited upon exiting the group block.

3. **Unstructured Tasks vs Detached Tasks**:
   - `Task { ... }`: Creates an **unstructured task**. It inherits the caller's priority, actor context, and task-local values, but its lifetime is NOT bound to the calling scope. It outlives the calling function unless cancelled manually via `task.cancel()`.
   - `Task.detached { ... }`: Creates a **detached task**. It does NOT inherit the caller's priority, actor context, or task-local values. It runs completely independently on the global concurrent executor.

4. **Task Cancellation & Error Propagation**:
   - When a child task in `withThrowingTaskGroup` throws an error, the error is re-thrown by `try await group.next()` or when exiting the group.
   - Throwing does NOT automatically terminate sibling tasks instantly; cancellation is cooperative. You should call `group.cancelAll()` to signal remaining child tasks to stop working.

## 2. Interview Questions by Level

### Fresh / Junior
- What is a `Task` in Swift?
- How does `async let` differ from writing sequential `await` calls?
- What is the difference between `Task` and `Task.detached`?

### Mid
- What makes structured concurrency "structured" compared to Grand Central Dispatch?
- How do you use `withTaskGroup` to download multiple items in parallel?
- What happens if a child task is still running when a `withTaskGroup` closure returns?

### Senior
- How does cancellation propagate down a task group tree, and why must child tasks cooperate?
- What are the concurrency and thread pool hazards of spawning unbounded tasks using `Task { ... }` versus a controlled `TaskGroup`?
- How do `withDiscardingTaskGroup` and `withThrowingDiscardingTaskGroup` (introduced in Swift 5.9) optimize memory for producer-consumer background loops?

## 3. Common Traps and Misconceptions

- **Trap 1: Assuming `Task { ... }` is structured**:
  Many developers believe `Task { }` is structured concurrency because it uses `async/await`. In reality, `Task { }` is unstructured concurrency. Its lifecycle escapes the enclosing function, and it will not automatically be cancelled when the function returns.
- **Trap 2: Forgetting cooperative cancellation in child tasks**:
  Cancelling a parent or calling `group.cancelAll()` only marks tasks as cancelled (`Task.isCancelled == true`). It does not kill threads. Long-running loops inside child tasks must check `Task.checkCancellation()` or `Task.isCancelled`.
- **Trap 3: Mutating shared state inside `group.addTask`**:
  Child task closures run concurrently and must be `@Sendable`. Mutating variables outside the task group closure causes data races and Swift 6 compiler errors.
