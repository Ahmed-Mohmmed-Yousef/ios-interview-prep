# Fact Check Report: iPad and Adaptive Layout

**Topic ID:** `ipad-adaptive-layout`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Layout (Human Interface Guidelines)  
   URL: https://developer.apple.com/design/human-interface-guidelines/layout
2. UITraitCollection (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uitraitcollection
3. NavigationSplitView (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/navigationsplitview
4. UISplitViewController (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uisplitviewcontroller
5. ViewThatFits (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/viewthatfits

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Size classes categorize horizontal and vertical space into compact and regular | Apple Developer Documentation | Verified | Foundation of responsive layout in UIKit and SwiftUI. |
| iPhone portrait width is compact; full-screen iPad width is regular | HIG Layout Guidelines | Verified | Standard default size class configurations. |
| iPad in Slide Over or 1/3 Split View receives a compact horizontal size class | HIG Layout Guidelines | Verified | iPadOS dynamically adapts size class to window viewport. |
| UIDevice userInterfaceIdiom is an anti-pattern for layout choices | HIG Layout Guidelines | Verified | Fails when iPad apps run in narrow multitasking windows. |
| UIScreen.main.bounds is deprecated in modern iOS | UIKit Documentation | Verified | Multitasking windows occupy only a portion of screen bounds. |
| NavigationSplitView collapses multi-column views into stacks on compact width | SwiftUI Documentation | Verified | Built-in responsive navigation container. |
| ViewThatFits selects the first child view that fits without clipping | SwiftUI Documentation | Verified | Responsive container introduced in iOS 16. |
| traitCollectionDidChange is deprecated; registerForTraitChanges is current | UIKit Documentation | Verified | iOS 17 introduced decoupled trait registration. |
| Stage Manager provides resizable floating windows on iPadOS | Apple Developer Documentation | Verified | Requires flexible view architectures without fixed frames. |
| Multi-window support uses UISceneConfiguration | UIKit Documentation | Verified | Configures multiple concurrent app window sessions. |

---

## Code Verification
- `content/topics/ipad-adaptive-layout/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/ipad-adaptive-layout/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, size class multitasking dynamics, SwiftUI / UIKit adaptive layout container mechanics, and Swift 6 compiler test blocks for `ipad-adaptive-layout` are verified, accurate, and consistent with official Apple documentation.
