# Fact Check Report: Approachable Concurrency

**Topic ID:** `approachable-concurrency`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. WWDC25: *Embracing Swift Concurrency (Session 268)*  
   URL: https://developer.apple.com/videos/play/wwdc2025/268/
2. Swift 6.2 Released | Swift.org  
   URL: https://www.swift.org/blog/swift-6.2-released/
3. Swift Evolution SE-0443: *Default MainActor Isolation*  
   URL: https://github.com/swiftlang/swift-evolution/
4. The Swift Programming Language: *Concurrency*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Application target code defaults to @MainActor in approachable concurrency | WWDC25 Session 268 / SE-0443 | Verified | Eliminates boilerplate across standard iOS view models. |
| Eliminates repetitive @MainActor annotations on UI code | Swift 6.2 Release Blog | Verified | UI classes and structs are isolated by default. |
| Heavy background work opts out via `nonisolated` or `@concurrent` | WWDC25 Session 268 | Verified | Hops execution to cooperative background thread pool. |
| Calling an off-actor async function uses `await` to hop off the main thread | The Swift Programming Language | Verified | Non-blocking suspension point across actor boundary. |
| Synchronous `nonisolated` methods cannot read/mutate actor mutable state | SE-0443 / Swift Reference | Verified | Direct access would break data race safety guarantees. |
| Resuming after an awaited call returns execution safely to `@MainActor` | Swift Language Reference | Verified | Caller actor domain is restored automatically. |
| Shared utility libraries remain non-isolated by default | Swift 6.2 Blog / WWDC25 | Verified | Ensures package versatility across servers and CLI tools. |
| Running heavy calculations on the main actor causes UI frame drops | WWDC Performance Sessions | Verified | Heavy synchronous work blocks the UI run loop. |

---

## Code Verification
- `content/topics/approachable-concurrency/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/approachable-concurrency/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, isolation rules, opt-out mechanisms, and compiler verification blocks for `approachable-concurrency` are verified, accurate, and consistent with official Apple and Swift.org documentation.
