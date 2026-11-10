# Fact Check Report: Animations and Transitions

**Topic ID:** `swiftui-animations`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Animations (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/animations
2. WWDC23: *Explore SwiftUI animation (Session 10156)*  
   URL: https://developer.apple.com/videos/play/wwdc2023/10156/
3. View.animation(_:value:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view/animation(_:value:)
4. withAnimation(_:_:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/withanimation(_:_:)
5. Transition (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/transition

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Implicit animations scope to view via `.animation(_:value:)` | Apple Developer Documentation | Verified | Triggers only when the bound value changes. |
| Single-parameter `.animation(_:)` deprecated in iOS 15 | Apple Developer Documentation | Verified | Deprecated due to uncontrolled ancestor invalidations. |
| Explicit animations wrap state mutation in `withAnimation` | Apple Developer Documentation | Verified | Propagates animation transaction across view graph. |
| Transitions require animated context (e.g. `withAnimation`) | WWDC23 Session 10156 | Verified | Unanimated state changes insert/remove instantly. |
| Spring animations preserve momentum when interrupted | WWDC23 Session 10156 | Verified | Physics-based velocity prevents visual snapping. |
| Modifiers after `.animation(_:value:)` are not animated | Apple Developer Documentation | Verified | Modifier ordering strictly governs animation scope. |
| `.asymmetric(insertion:removal:)` configures distinct transitions | Apple Developer Documentation | Verified | Allows separate entrance and exit effects. |
| `matchedGeometryEffect` interpolates frame size and position | Apple Developer Documentation | Verified | Requires matching identifier and Namespace token. |

---

## Code Verification
- `content/topics/swiftui-animations/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/swiftui-animations/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, animation transaction rules, spring physics properties, and compiler verification blocks for `swiftui-animations` are verified, accurate, and consistent with official Apple documentation.
