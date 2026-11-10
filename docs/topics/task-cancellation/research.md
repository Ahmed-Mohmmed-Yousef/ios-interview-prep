# Research: Task Cancellation

Topic ID: `task-cancellation`
Level: Mid
Goal: After this topic, you can cancel tasks and write code that stops when you cancel it.

## 1. Official Sources & Cancellation Mechanics

### Sources
- **Apple Developer Documentation: Task**
  https://developer.apple.com/documentation/swift/task
- **The Swift Programming Language: Concurrency**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
- **WWDC21: Explore structured concurrency in Swift (Session 10134)**
  https://developer.apple.com/videos/play/wwdc2021/10134/

### Core Technical Concepts

1. **Cooperative Cancellation**:
   - Calling `task.cancel()` or `group.cancelAll()` sets a cancellation flag on the target task and propagates it down through the structured task tree.
   - Cancellation is strictly cooperative: Swift does NOT kill running threads or halt execution pointers forcibly.
   - Long-running loops or CPU-intensive algorithms will keep executing unless the developer checks the cancellation state.

2. **Checking Cancellation in Code**:
   - `Task.isCancelled`: A synchronous Boolean check returning `true` if the current task has received a cancellation request. Ideal for non-throwing methods or returning partial results.
   - `try Task.checkCancellation()`: Throws a `CancellationError` immediately if the current task is cancelled. Ideal for throwing pipelines.
   - Standard library APIs (such as `Task.sleep(for:)`, `URLSession.shared.data(from:)`) already check cancellation and throw `CancellationError` immediately if cancelled before or during suspension.

3. **Handling Cancellation with Handlers**:
   - `withTaskCancellationHandler(operation:onCancel:)`:
     - Executes `operation`.
     - If the task is cancelled while `operation` is executing (or was cancelled before it started), `onCancel` runs immediately.
     - Crucial: `onCancel` runs synchronously on whatever thread called `cancel()`. This means `onCancel` may execute concurrently with `operation`. Shared state must be thread-safe (for example, wrapped in an actor, protected by a lock, or using atomic types).

4. **Resource Cleanup with `defer`**:
   - When `Task.checkCancellation()` throws `CancellationError`, execution unwinds immediately.
   - Using `defer` blocks ensures open files, network streams, or temporary allocations are released even if a task terminates early due to cancellation.

5. **SwiftUI Integration**:
   - The `.task` view modifier automatically launches a task when the view appears and cancels it when the view disappears.
   - `.task(id: value)` automatically cancels the previous task and restarts a new one when `value` changes (ideal for search-as-you-type).

## 2. Interview Questions by Level

### Fresh / Junior
- How do you cancel a `Task` in Swift?
- What does `Task.isCancelled` do?
- Does calling `cancel()` stop a task immediately?

### Mid
- What is the difference between `Task.isCancelled` and `try Task.checkCancellation()`?
- How does cancellation propagate in a structured task hierarchy?
- How does the SwiftUI `.task` modifier handle cancellation automatically?

### Senior
- How does `withTaskCancellationHandler` bridge legacy asynchronous APIs (like GCD or delegate callbacks) to Swift concurrency?
- What race conditions can occur between `operation` and `onCancel` in `withTaskCancellationHandler`, and how do you resolve them safely in Swift 6?
- How do you perform asynchronous cleanup operations after a task has been cancelled?

## 3. Common Traps and Misconceptions

- **Trap 1: Assuming `task.cancel()` stops execution instantly**:
  Many developers believe `task.cancel()` halts a running loop. Without `Task.isCancelled` or `Task.checkCancellation()`, the loop runs to completion, wasting CPU and battery.
- **Trap 2: Catching `CancellationError` as a normal failure**:
  Catching all errors with generic `catch` blocks and displaying an alert can show misleading "Request cancelled" alerts to users who simply navigated away. `CancellationError` should usually be rethrown or ignored.
- **Trap 3: Data races in `withTaskCancellationHandler`**:
  `onCancel` runs on the canceling thread while `operation` runs on its own executor. Accessing shared variables without synchronization triggers data races and Swift 6 compiler errors.
