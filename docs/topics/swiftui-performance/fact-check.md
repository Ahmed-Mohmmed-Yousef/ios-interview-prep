# Fact Check Report: SwiftUI Performance

**Topic ID:** `swiftui-performance`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. WWDC23: *Demystify SwiftUI performance (Session 10160)*  
   URL: https://developer.apple.com/videos/play/wwdc2023/10160/
2. WWDC21: *Demystify SwiftUI (Session 10022)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10022/
3. WWDC20: *Data Essentials in SwiftUI (Session 10040)*  
   URL: https://developer.apple.com/videos/play/wwdc2020/10040/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| View body evaluates synchronously on the main thread | WWDC23 Session 10160 | Verified | Heavy work in body blocks main thread run loop. |
| Pre-computing derived data keeps body fast and lightweight | WWDC23 Session 10160 | Verified | Sorting, filtering, and formatting belong in models/caches. |
| Equatable subviews skip body evaluation when properties match | WWDC23 Session 10160 | Verified | .equatable() lets SwiftUI compare old and new inputs. |
| Unstable IDs (like UUID() in body) destroy view identity | WWDC21 Session 10022 | Verified | Forces view deallocation and reconstruction. |
| @Observable scopes invalidation to properties read in body | WWDC23 Session 10160 | Verified | Solves broad invalidation of ObservableObject/Published. |
| Self._printChanges() logs the dependency that triggered body | WWDC21 Session 10022 | Verified | Built-in debug tool for diagnosing invalidation storms. |
| DateFormatter allocation in body degrades scrolling performance | WWDC23 Session 10160 | Verified | Expensive setup must be cached or pre-formatted. |
| Xcode Instruments SwiftUI template profiles view body evaluations | WWDC23 Session 10160 | Verified | Identifies view invalidation counts and duration. |

---

## Code Verification
- `content/topics/swiftui-performance/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/swiftui-performance/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, dependency graph semantics, identity preservation principles, and Swift 6 compiler test blocks for `swiftui-performance` are verified, accurate, and consistent with official Apple documentation.
