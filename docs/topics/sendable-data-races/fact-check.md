# Fact Check Report: Sendable and Data Races

**Topic ID:** `sendable-data-races`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Apple Developer Documentation: *Sendable*  
   URL: https://developer.apple.com/documentation/swift/sendable
2. WWDC22: *Eliminate data races using Swift Concurrency (Session 110351)*  
   URL: https://developer.apple.com/videos/play/wwdc2022/110351/
3. Swift Evolution SE-0302: *Sendable and @Sendable closures*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-sendable.md
4. Swift Evolution SE-0414: *Region-based Isolation*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0414-region-based-isolation.md

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Data race requires concurrent access to same memory, at least one write, no synchronization | WWDC22 Session 110351 | Verified | Fundamental definition in computer science and Swift concurrency. |
| Sendable is a marker protocol with no runtime requirements | Apple Documentation (Sendable) | Verified | Empty protocol used by the compiler for compile-time safety. |
| Value types (structs, enums) are Sendable when stored properties are Sendable | Apple Documentation (Sendable) | Verified | Independent value copies eliminate shared mutable memory. |
| Classes are reference types and not Sendable by default | Apple Documentation (Sendable) | Verified | Unsynchronized shared references risk simultaneous read/write. |
| A class can be Sendable only if final with only immutable Sendable properties | SE-0302 / Apple Documentation | Verified | Prevents subclasses and prevents mutation after init. |
| Actors conform to Sendable inherently | Swift Concurrency Documentation | Verified | Actor isolation guarantees mutual exclusion on internal state. |
| @Sendable closures cannot capture mutable local variables | SE-0302 | Verified | Compiler prevents capturing local vars by reference. |
| Captured values in @Sendable closures must conform to Sendable | SE-0302 | Verified | Guarantees data crossing the task boundary is thread-safe. |
| @unchecked Sendable bypasses compiler checks for manual thread safety | Apple Documentation (Sendable) | Verified | Intended for types using os_unfair_lock, NSLock, or queues. |
| Region-based isolation allows transfer when no remaining references exist | SE-0414 (Swift 6) | Verified | Flow-sensitive transfer analysis proves safe disconnection. |

---

## Code Verification
- `content/topics/sendable-data-races/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/sendable-data-races/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical claims, Sendable requirements, closure capture restrictions, and Swift 6 code examples for `sendable-data-races` are verified, accurate, and aligned with Apple's official documentation.
