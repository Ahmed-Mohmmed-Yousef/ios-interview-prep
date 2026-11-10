# Fact Check Report: SwiftUI and UIKit Together

**Topic ID:** `swiftui-uikit-interop`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. UIViewRepresentable (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/uiviewrepresentable
2. UIHostingController (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/uihostingcontroller
3. UIHostingConfiguration (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uihostingconfiguration
4. WWDC22: *Use SwiftUI with UIKit (Session 10072)*  
   URL: https://developer.apple.com/videos/play/wwdc2022/10072/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| UIViewRepresentable bridges UIKit UIView into SwiftUI | Apple Developer Documentation | Verified | Conforming structs create and manage native UIKit views. |
| UIHostingController embeds SwiftUI view hierarchies in UIKit | Apple Developer Documentation | Verified | UIViewController subclass that hosts SwiftUI rootView. |
| makeCoordinator creates Coordinator instance before makeUIView | Apple Developer Documentation | Verified | Enables coordinator to act as delegate or target for UIKit. |
| updateUIView runs on state changes to update properties | Apple Developer Documentation | Verified | View instance is preserved; avoid re-creating views inside it. |
| Mutating SwiftUI state inside updateUIView causes infinite loop | Apple Developer Documentation | Verified | State mutation triggers render pass, leading to recursion. |
| Embedding UIHostingController requires addChild, addSubview, didMove | Apple Developer Documentation | Verified | Proper containment ceremony ensures lifecycle propagation. |
| UIHostingConfiguration configures collection/table cells with SwiftUI | WWDC22 Session 10072 | Verified | Introduced in iOS 16; avoids manual hosting controller overhead. |
| UIViewControllerRepresentable wraps full UIKit view controllers | Apple Developer Documentation | Verified | Handles view controller lifecycle within SwiftUI hierarchy. |

---

## Code Verification
- `content/topics/swiftui-uikit-interop/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/swiftui-uikit-interop/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical claims, bridging protocols, view controller containment rules, and Swift 6 compiler test blocks for `swiftui-uikit-interop` are verified, accurate, and consistent with official Apple documentation.
