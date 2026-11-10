# Fact Check Report: Task Cancellation

**Topic ID:** `task-cancellation`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Apple Developer Documentation: *Task*  
   URL: https://developer.apple.com/documentation/swift/task
2. The Swift Programming Language: *Concurrency*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
3. WWDC21: *Explore structured concurrency in Swift (Session 10134)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10134/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Cancellation in Swift is cooperative | Swift Programming Language & WWDC21 | Verified | Threads are not killed; code must check cancellation. |
| `task.cancel()` sets `Task.isCancelled == true` | Apple Developer Documentation | Verified | Cancellation flag cascades down child tasks. |
| `Task.isCancelled` returns Boolean | Apple Developer Documentation | Verified | Non-throwing check ideal for early loop exits. |
| `try Task.checkCancellation()` throws `CancellationError` | Apple Developer Documentation | Verified | Throws error immediately when task is cancelled. |
| `Task.sleep` throws `CancellationError` when cancelled | Apple Developer Documentation | Verified | Standard library APIs are cancellation-aware. |
| SwiftUI `.task` cancels on view disappearance | Apple Developer Documentation | Verified | Manages task lifecycle tied to view visibility. |
| SwiftUI `.task(id:)` cancels on value changes | Apple Developer Documentation | Verified | Restarts new task when identity changes. |
| `defer` blocks run when `CancellationError` is thrown | Swift Programming Language | Verified | Ensures file handles, sockets, and memory are cleaned up. |
| `withTaskCancellationHandler` runs `onCancel` on canceling thread | Apple Developer Documentation | Verified | Enables bridging legacy async cancellation handlers. |

---

## Code Verification
- `content/topics/task-cancellation/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/task-cancellation/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All factual claims, cancellation lifecycle mechanics, and Swift 6 code examples for `task-cancellation` are verified, accurate, and aligned with Apple's official documentation.
