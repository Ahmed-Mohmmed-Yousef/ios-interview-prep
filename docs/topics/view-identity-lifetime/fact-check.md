# Fact Check Report: View Identity and Lifetime

**Topic ID:** `view-identity-lifetime`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. WWDC21: *Demystify SwiftUI (Session 10022)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10022/
2. State (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/state
3. View.id(_:) (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view/id(_:)

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Explicit identity uses custom keys like `.id()` or `Identifiable` | WWDC21 Session 10022 | Verified | Assigned explicitly by developer. |
| Structural identity is inferred from view position in the code hierarchy | WWDC21 Session 10022 | Verified | Based on `ViewBuilder` structural branching. |
| `if/else` creates two distinct structural identities | WWDC21 Session 10022 | Verified | Modeled via `_ConditionalContent<TrueContent, FalseContent>`. |
| Toggling `if/else` branches resets view `@State` and restarts tasks | WWDC21 Session 10022 | Verified | Terminating identity ends view lifetime. |
| Ternary operators maintain a single structural identity | WWDC21 Session 10022 | Verified | Keeps same view node, preserving state and animations. |
| `AnyView` erases static structural identity | WWDC21 Session 10022 | Verified | Type erasure destroys diffing optimizations. |
| Calling `.id(UUID())` in `body` destroys state on every render pass | WWDC21 Session 10022 | Verified | Generates fresh identity on every body evaluation. |
| View lifetime is duration SwiftUI links identity to state storage | Apple Documentation / WWDC21 | Verified | View structs are recreated while identity persists state. |
| Transitions execute only on identity changes | WWDC21 Session 10022 | Verified | Property animations interpolate stable identities. |

---

## Code Verification
- `content/topics/view-identity-lifetime/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/view-identity-lifetime/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, identity taxonomy, structural branching rules, and compiler verification blocks for `view-identity-lifetime` are verified, accurate, and consistent with official Apple documentation.
