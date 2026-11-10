# Fact Check Report: Custom Layouts

**Topic ID:** `custom-layouts`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Layout (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/layout
2. WWDC22: *Compose custom layouts with SwiftUI (Session 10056)*  
   URL: https://developer.apple.com/videos/play/wwdc2022/10056/
3. ProposedViewSize (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/proposedviewsize
4. LayoutValueKey (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/layoutvaluekey
5. AnyLayout (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/anylayout

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Layout protocol introduced in iOS 16 | Apple Developer Documentation | Verified | Replaces heavy GeometryReader/PreferenceKey workarounds. |
| Two core required methods: sizeThatFits and placeSubviews | Apple Developer Documentation | Verified | Protocol requires these two methods; cache methods are optional. |
| ProposedViewSize width/height of nil indicates ideal size request | Apple Developer Documentation | Verified | Proposal of zero is minimum; infinity is maximum. |
| placeSubviews receives final container bounds and places children | WWDC22 Session 10056 | Verified | Calls `subview.place(at:anchor:proposal:)`. |
| LayoutCache shares calculations between measurement and placement | WWDC22 Session 10056 | Verified | makeCache and updateCache manage lifecycle. |
| LayoutValueKey attaches custom metadata to individual subviews | Apple Developer Documentation | Verified | Read in layout methods via `subview[Key.self]`. |
| AnyLayout enables animated dynamic layout type switching | Apple Developer Documentation | Verified | Seamlessly transitions between e.g. HStack and VStack arrangements. |
| Layout container preserves child view identity during updates | Apple Developer Documentation | Verified | Does not re-create view bodies during layout calculations. |

---

## Code Verification
- `content/topics/custom-layouts/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/custom-layouts/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, layout negotiation protocols, cache invalidation semantics, and Swift 6 compiler test blocks for `custom-layouts` are verified, accurate, and consistent with official Apple documentation.
