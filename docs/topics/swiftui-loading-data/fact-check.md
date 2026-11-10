# Fact Check Report: Loading Data in SwiftUI

**Topic ID:** `swiftui-loading-data`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. AsyncImage (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/asyncimage
2. WWDC21: *Discover concurrency in SwiftUI*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10019/
3. View.task(priority:_:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view/task(priority:_:)
4. View.task(id:priority:_:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view/task(id:priority:_:)
5. View.refreshable(action:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view/refreshable(action:)

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| `.task` starts an asynchronous task when the view appears | Apple Developer Documentation | Verified | Tied directly to view appearance lifecycle. |
| `.task` automatically cancels running task on view disappearance | WWDC21 Session 10019 | Verified | SwiftUI triggers cooperative cancellation. |
| `.task(id:)` cancels in-flight work and restarts when id changes | Apple Developer Documentation | Verified | Prevents out-of-order race conditions on search queries. |
| `.task` closure runs on `@MainActor` by default | Apple Developer Documentation | Verified | Views and modifier closures run on the main actor domain. |
| `AsyncImage` provides empty, success, and failure phases | Apple Developer Documentation | Verified | Defined in `AsyncImagePhase` enumeration. |
| `.resizable()` must be applied to the loaded `Image`, not `AsyncImage` | Apple Developer Documentation | Verified | Modifier belongs to concrete `Image` view. |
| `AsyncImage` relies on Foundation's `URLCache` for caching | Apple Developer Documentation | Verified | Uses standard HTTP URLCache configuration. |
| Unstructured `Task` inside `.onAppear` does not auto-cancel | WWDC21 Session 10019 | Verified | Unmanaged tasks outlive view dismissal unless cancelled manually. |
| `.refreshable` holds spinner visible until async closure completes | Apple Developer Documentation | Verified | Awaits the async action closure before dismissing. |

---

## Code Verification
- `content/topics/swiftui-loading-data/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/swiftui-loading-data/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, lifecycle cancellation semantics, `AsyncImage` phase patterns, and compiler verification blocks for `swiftui-loading-data` are verified, accurate, and consistent with official Apple documentation.
