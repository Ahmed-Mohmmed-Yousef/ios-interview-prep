# Fact Check Report: Actors and @MainActor

**Topic ID:** `actors-and-main-actor`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. The Swift Programming Language: *Concurrency*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency
2. WWDC21: *Protect mutable state with Swift actors (Session 10133)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10133/
3. Apple Developer Documentation: *MainActor*  
   URL: https://developer.apple.com/documentation/swift/mainactor

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Actors enforce mutual exclusion for mutable state | Swift Programming Language | Verified | Only one task accesses mutable properties at a time. |
| External callers must use `await` | Swift Programming Language | Verified | Potential suspension point while waiting for access. |
| Inside actor methods, state access is direct and synchronous | Swift Programming Language | Verified | Calling code is already isolated on the actor. |
| `nonisolated` allows synchronous access without `await` | Swift Programming Language | Verified | Permitted only for reading immutable `let` constants. |
| Actors do not support class or actor inheritance | Swift Programming Language | Verified | Reference types with identity, but no subclassing. |
| Swift actors are reentrant across `await` points | WWDC21 Session 10133 | Verified | Actor releases execution lock while suspended. |
| `@MainActor` executes all isolated code on main thread | Apple Developer Documentation | Verified | Global actor guaranteeing UI thread safety. |
| `MainActor.run { }` executes closures on main actor | Apple Developer Documentation | Verified | Used from background tasks to dispatch UI updates. |
| Data crossing actor boundaries must be `Sendable` | Swift Programming Language | Verified | Compiler-enforced in Swift 6 to prevent data races. |

---

## Code Verification
- `content/topics/actors-and-main-actor/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/actors-and-main-actor/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All technical assertions, actor isolation guarantees, reentrancy behaviors, and Swift 6 code examples for `actors-and-main-actor` are verified, accurate, and aligned with Apple's official documentation.
