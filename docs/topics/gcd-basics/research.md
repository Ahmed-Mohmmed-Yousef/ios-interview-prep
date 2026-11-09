# Research: GCD Basics

## 1. Core Concepts & Technical Facts

### What is Grand Central Dispatch (GCD)?
- **Grand Central Dispatch (GCD)** is Apple's system-level C library (`libdispatch`), bridged to Swift via the `Dispatch` framework.
- GCD abstracts low-level thread management (POSIX threads / pthreads) by providing **dispatch queues** (`DispatchQueue`) backed by a system-managed thread pool.
- Developers submit blocks of code (closures) to queues, and GCD manages scheduling, thread allocation, core balancing, and CPU priority.

### Queue Types: Serial vs Concurrent
1. **Serial Queues**:
   - Executes tasks strictly one at a time in FIFO (First-In, First-Out) order.
   - A subsequent task does not start until the preceding task has completely finished.
   - Guarantees execution order and prevents race conditions on shared data. Often used as an alternative to mutual exclusion locks.
   - Default creation: `DispatchQueue(label: "com.example.serial")`.
   - `DispatchQueue.main` is a globally available serial queue bound to the main thread.
2. **Concurrent Queues**:
   - Starts tasks in FIFO order, but dispatches them to multiple worker threads simultaneously.
   - Multiple tasks execute at the same time. The order of completion is non-deterministic and depends on task duration.
   - Creation: `DispatchQueue(label: "com.example.concurrent", attributes: .concurrent)`.
   - Global queues: `DispatchQueue.global(qos:)`.

### Dispatch Modes: Synchronous vs Asynchronous
- **`async` (Asynchronous)**:
  - Submits the closure to the queue and **returns immediately** to the calling code without waiting.
  - The caller continues execution on its current thread while the task runs independently.
- **`sync` (Synchronous)**:
  - Submits the closure to the queue and **blocks the current thread** until the closure finishes execution.
  - The caller cannot proceed until the submitted work is complete.
- **The Deadlock Rule**:
  - Calling `queue.sync { ... }` from within the execution context of the same serial `queue` creates a fatal deadlock. The thread waits for the block to finish, but the block cannot start because the queue is blocked by the waiting thread.

### Quality of Service (QoS) Classes
GCD classifies tasks by user intent to optimize priority, scheduling, and CPU power consumption:
1. **`userInteractive`**: Work that directly affects the user interface (animations, interactive gestures). Highest priority.
2. **`userInitiated`**: User-requested actions where the user is actively waiting (e.g. opening a file or pulling down to refresh).
3. **`default`**: Priority assigned when no explicit QoS is specified.
4. **`utility`**: Long-running computation with a visible progress indicator (e.g. file export or data synchronization).
5. **`background`**: Maintenance tasks with no time sensitivity (e.g. prefetching, database indexing, background syncing). Lowest energy and CPU priority.

### What Replaced GCD in Modern Swift?
- Starting in Swift 5.5 (iOS 15), Apple introduced **Swift Concurrency** (`async`/`await`, `Task`, `TaskGroup`, `actors`, and `@MainActor`).
- Why Swift Concurrency is preferred over GCD:
  1. **Thread Explosion Elimination**: In GCD, blocking worker threads causes the system to spawn additional threads (up to 64+ threads), consuming 512KB-1MB of stack memory each and degrading performance with CPU context-switch thrashing. Swift Concurrency uses a fixed-size cooperative thread pool (matching CPU core count) where tasks suspend (`await`) and yield their thread instead of blocking.
  2. **Compile-Time Data Race Safety**: GCD cannot verify thread safety at compile time. Swift 6 strict concurrency uses `Sendable` checking and actor isolation to prevent data races before code is compiled.
  3. **Readability & Error Handling**: `async/await` eliminates deeply nested "callback hell" and integrates directly with Swift `throws` and `try`.

---

## 2. Common Misconceptions & Interview Traps

1. **"Calling `sync` turns a concurrent queue into a serial queue"**:
   - *Correction*: `sync` only determines whether the *calling thread waits*. The queue's nature (serial vs concurrent) determines whether *multiple tasks on that queue run simultaneously*.
2. **"DispatchQueue.main.sync is fine if called inside a background queue"**:
   - *Correction*: While calling `main.sync` from a background queue does not deadlock with itself, it blocks that background worker thread and risks deadlock if the main thread is waiting on the background thread (inversion/deadlock).
3. **"Creating multiple serial queues is lightweight and free"**:
   - *Correction*: Each serial queue can schedule work on different threads. Creating dozens of active serial queues can cause thread explosion.
4. **"GCD automatically cancels tasks when objects deallocate"**:
   - *Correction*: GCD closures are held by the queue until executed. They do not cancel automatically unless managed with `DispatchWorkItem.cancel()`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: What GCD stands for, difference between serial queues (one by one) and concurrent queues (multiple at once), async (does not wait) vs sync (waits), and using `DispatchQueue.main.async` to update the screen.
- **Junior**:
  - Focus: Quality of Service (QoS) priorities, preventing deadlocks (avoiding `sync` on the current serial queue), memory leaks in closures capturing `self`, and knowing that Swift `async/await` replaced GCD for modern concurrency.
- **Senior**:
  - Focus: Thread explosion in GCD, cooperative thread pool in Swift Concurrency, `DispatchWorkItem` cancellation flags, priority inversion, comparing GCD barrier blocks (`.barrier`) with Swift actors for atomic state protection, and migration strategies from dispatch queues to actors.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Dispatch**:
   - https://developer.apple.com/documentation/dispatch
2. **Apple Developer Documentation: DispatchQueue**:
   - https://developer.apple.com/documentation/dispatch/dispatchqueue
3. **WWDC21: Swift concurrency: Behind the scenes**:
   - https://developer.apple.com/videos/play/wwdc2021/10254/
