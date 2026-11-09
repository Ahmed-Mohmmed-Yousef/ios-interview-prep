# Research: async/await

## 1. Core Concepts & Technical Facts

### What is async/await in Swift?
- Introduced in Swift 5.5, `async`/`await` provides structured language-level support for asynchronous programming.
- An **asynchronous function** (`async`) can suspend its execution while waiting for a long-running operation (like network responses, disk reads, or timers) to complete.
- The `await` keyword indicates a **potential suspension point**. It marks where the function gives up its thread so other work can proceed.

### Suspension vs Blocking
- **Blocking (Legacy Threading / GCD)**:
  - Calling a synchronous blocking function (e.g., `semaphore.wait()` or `Data(contentsOf: url)`) halts the physical OS thread.
  - The thread cannot run other tasks, which forces the operating system to allocate new threads, leading to thread explosion.
- **Suspension (Swift Concurrency)**:
  - When reaching `await`, the function suspends.
  - Swift packages the function's local state into an asynchronous frame on the heap and yields the underlying thread back to the cooperative thread pool.
  - The thread immediately picks up other queued work.
  - When the awaited operation completes, the runtime resumes the suspended function. The function may resume on a different thread within the cooperative pool (unless isolated to `@MainActor` or a specific actor).

### Syntax Rules
1. **Function Signature**:
   - `func fetchProfile() async -> Profile`
   - If throwing: `async` always precedes `throws`:
     `func fetchProfile() async throws -> Profile`
2. **Calling Async Functions**:
   - `let profile = await fetchProfile()`
   - With error handling: `let profile = try await fetchProfile()`
3. **Async Properties**:
   - Read-only computed properties can be async:
     ```swift
     var avatar: Image {
         get async throws { ... }
     }
     ```
4. **Bridging from Synchronous Code**:
   - Synchronous functions cannot directly call `await`.
   - Bridge using an asynchronous task context:
     ```swift
     Task {
         let data = await fetchProfile()
         updateUI(with: data)
     }
     ```

### Advantages over Completion Handlers
1. **Linear Control Flow**: Async code reads top-to-bottom like synchronous code, eliminating deeply nested callback blocks ("pyramid of doom").
2. **Compiler-Enforced Returns**: In callback closures, if a developer forgets to invoke `completion(result)` in an early return branch, the caller hangs indefinitely. An `async` function must either return a value or throw an error; the compiler prevents early exit omissions.
3. **Standard Swift Control Structures**: Developers can use native `for-in` loops, `guard`, `defer`, and `do-catch` blocks directly with async operations.

---

## 2. Common Misconceptions & Interview Traps

1. **"`await` blocks the thread until work finishes"**:
   - *Correction*: `await` suspends the task and frees the thread so other tasks can run. It does not block the thread.
2. **"`throws async` is valid syntax"**:
   - *Correction*: The order is strictly `async throws`. Writing `throws async` causes a compile error.
3. **"Code after `await` always runs on the same thread as before `await`"**:
   - *Correction*: Unless the function or enclosing type is pinned to an actor (like `@MainActor`), the runtime may resume execution on any thread in the cooperative pool.
4. **"`async` makes code run in parallel automatically"**:
   - *Correction*: Calling two `await` functions sequentially executes them in series: the second awaits the first. Parallel asynchronous execution requires `async let` or `TaskGroup`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: What `async` and `await` mean, why they are better than nested completion closures, and how `await` marks where code pauses while waiting for data.
- **Junior**:
  - Focus: Difference between thread blocking and task suspension, the cooperative thread pool, `async throws` syntax ordering, bridging with `Task { ... }`, and compiler-enforced return guarantees.
- **Senior**:
  - Focus: Runtime continuations and heap-allocated async frames, thread hops and actor re-entrancy across suspension points, comparing cooperative pool sizing (matching CPU cores) with GCD thread explosion, and structuring migration from completion blocks with `withCheckedContinuation`.

---

## 4. Official Sources & References

1. **The Swift Programming Language: Concurrency**:
   - https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
2. **WWDC21: Meet async/await in Swift**:
   - https://developer.apple.com/videos/play/wwdc2021/10132/
3. **WWDC21: Swift concurrency: Behind the scenes**:
   - https://developer.apple.com/videos/play/wwdc2021/10254/
