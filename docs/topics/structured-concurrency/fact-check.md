# Fact Check Report: Tasks and Task Groups

**Topic ID:** `structured-concurrency`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. The Swift Programming Language: *Concurrency*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
2. WWDC21: *Explore structured concurrency in Swift (Session 10134)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10134/
3. Apple Developer Documentation: *TaskGroup*  
   URL: https://developer.apple.com/documentation/swift/taskgroup

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Parent task cannot complete until all child tasks finish | Swift Programming Language & WWDC21 | Verified | Fundamental rule of structured concurrency trees. |
| `async let` spawns concurrent child tasks bound to scope | Swift Programming Language | Verified | Evaluates in parallel; implicitly cancelled/awaited on exit. |
| `withTaskGroup` spawns dynamic child tasks | Apple Developer Documentation | Verified | Manages group of child tasks returning when all finish. |
| `for await in group` consumes child results | Apple Developer Documentation | Verified | `TaskGroup` conforms to `AsyncSequence`. |
| Parent cancellation propagates down to all children | WWDC21 Session 10134 | Verified | Automatic tree-wide cancellation flow. |
| Cancellation is cooperative | Swift Programming Language | Verified | Requires checking `Task.isCancelled` or `checkCancellation()`. |
| `Task { }` is unstructured concurrency | WWDC21 Session 10134 | Verified | Inherits context, but outlives calling lexical scope. |
| `Task.detached` does not inherit priority or actor isolation | Swift Programming Language | Verified | Executes independently on global concurrent executor. |
| `group.addTaskUnlessCancelled` prevents scheduling into cancelled group | Apple Developer Documentation | Verified | Guards against unnecessary work in cancelled task groups. |
| `withDiscardingTaskGroup` prevents memory accumulation | Apple Developer Documentation (Swift 5.9+) | Verified | Discards child results immediately upon task completion. |

---

## Code Verification
- `content/topics/structured-concurrency/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/structured-concurrency/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All technical assertions, concurrency hierarchy mechanics, and Swift 6 code examples for `structured-concurrency` are verified, accurate, and aligned with official Swift language specifications.
