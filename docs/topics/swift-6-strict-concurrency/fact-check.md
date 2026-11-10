# Fact Check Report: Swift 6 Strict Concurrency

**Topic ID:** `swift-6-strict-concurrency`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Migrating to Swift 6 (Swift.org)  
   URL: https://www.swift.org/migration/documentation/migrationguide/
2. WWDC24: *Migrate your app to Swift 6 (Session 10169)*  
   URL: https://developer.apple.com/videos/play/wwdc2024/10169/
3. Swift Evolution SE-0412: *Strict Concurrency Checking for Global Variables*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0412-strict-concurrency-for-global-variables.md
4. Swift Evolution SE-0414: *Region-based Isolation*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0414-region-based-isolation.md

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Swift 6 enables complete strict concurrency checking by default | Swift.org Migration Guide | Verified | Warnings in Swift 5 become hard errors in Swift 6 mode. |
| Swift 6 guarantees compile-time data race freedom when clean | WWDC24 Session 10169 | Verified | Statically verified data race safety across all code. |
| Calling @MainActor from non-isolated context requires `await` | Swift Language Reference | Verified | Initiates an asynchronous actor hop to the main actor. |
| Mutable global variables are banned by default in Swift 6 | SE-0412 | Verified | Flagged as error due to unsynchronized simultaneous access. |
| Static variables can be isolated using `@MainActor` | SE-0412 | Verified | Eliminates global mutable state data races. |
| `@preconcurrency import` silences warnings for legacy dependencies | Swift.org Migration Guide | Verified | Used during migration while third-party libraries update. |
| `nonisolated(unsafe)` opts specific variables out of checks | SE-0412 / Swift 6 Notes | Verified | For types with manual locks (os_unfair_lock, NSLock, queues). |
| Region-based isolation allows transferring unshared non-Sendable values | SE-0414 | Verified | Compiler proves no remaining local references exist. |
| Swift 5 and Swift 6 modules interoperate seamlessly | Swift.org Migration Guide | Verified | Supports module-by-module incremental migration. |
| `MainActor.assumeIsolated` executes synchronously on main thread | Swift Language Reference | Verified | Traps at runtime if invoked off the main thread. |

---

## Code Verification
- `content/topics/swift-6-strict-concurrency/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/swift-6-strict-concurrency/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, migration techniques, Swift 6 compiler diagnostic rules, and code verification blocks for `swift-6-strict-concurrency` are verified, accurate, and aligned with Apple and Swift.org official documentation.
