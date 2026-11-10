# Fact Check Report: Custom Views and the Layout Pass

**Topic ID:** `custom-views-layout-pass`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. layoutSubviews() (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uiview/layoutsubviews()
2. setNeedsLayout() (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uiview/setneedslayout()
3. layoutIfNeeded() (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uiview/layoutifneeded()
4. High Performance Auto Layout (WWDC18 Session 220)  
   URL: https://developer.apple.com/videos/play/wwdc2018/220/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| setNeedsLayout() flags view dirty and returns immediately | Apple Developer Documentation | Verified | Coalesces layout requests for the next run loop pass. |
| layoutIfNeeded() executes immediate layout if view is dirty | Apple Developer Documentation | Verified | Synchronous pass; crucial for UIView.animate. |
| layoutSubviews() is a system callback; never call directly | Apple Developer Documentation | Verified | Direct invocation bypasses run loop and ancestor updates. |
| super.layoutSubviews() runs the Auto Layout positioning engine | Apple Developer Documentation | Verified | Required when overriding to position subviews properly. |
| Mutating constraints in layoutSubviews causes infinite recursion | Apple Developer Documentation | Verified | Triggers re-entrant layout passes. |
| intrinsicContentSize communicates natural size to Auto Layout | Apple Developer Documentation | Verified | Invalidated via invalidateIntrinsicContentSize(). |
| Animating constraints requires layoutIfNeeded inside animation block | WWDC18 Session 220 | Verified | Interpolates frame geometries across animation duration. |
| Update cycle sequence: constraints, layout, draw | Apple Developer Documentation | Verified | updateConstraints -> layoutSubviews -> draw(_:). |

---

## Code Verification
- `content/topics/custom-views-layout-pass/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/custom-views-layout-pass/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, run loop layout cycle mechanics, Auto Layout coordination principles, and Swift 6 compiler test blocks for `custom-views-layout-pass` are verified, accurate, and consistent with official Apple documentation.
