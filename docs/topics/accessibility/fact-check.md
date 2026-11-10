# Fact Check Report: Accessibility

**Topic ID:** `accessibility`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Accessibility (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/accessibility
2. Human Interface Guidelines: Accessibility  
   URL: https://developer.apple.com/design/human-interface-guidelines/accessibility
3. View Accessibility (SwiftUI)  
   URL: https://developer.apple.com/documentation/swiftui/view-accessibility
4. UIAccessibility (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uiaccessibility
5. Perform accessibility audits in Xcode (WWDC23)  
   URL: https://developer.apple.com/videos/play/wwdc2023/10034/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| VoiceOver reads accessibility tree rather than raw screen pixels | Apple Developer Documentation | Verified | Core architecture of iOS assistive technology. |
| accessibilityLabel provides concise element name | Apple Developer Documentation | Verified | Used by VoiceOver as primary element identifier. |
| accessibilityTraits describes control type (button, header, etc.) | Apple Developer Documentation | Verified | VoiceOver appends trait announcement automatically. |
| Do not include control type in accessibility label | HIG Accessibility Guidelines | Verified | Prevents redundant speech ("Play button, button"). |
| accessibilityValue describes state or numerical amount | Apple Developer Documentation | Verified | Expresses percentages, slider values, or active states. |
| accessibilityElement(children: .combine) groups child elements | SwiftUI Documentation | Verified | Simplifies VoiceOver navigation through cards and rows. |
| accessibilityHidden(true) hides decorative items from VoiceOver | SwiftUI Documentation | Verified | Reduces clutter in the accessibility tree. |
| UIAccessibility.post(notification: .screenChanged) resets focus | UIKit Documentation | Verified | Informs VoiceOver of full screen or modal changes. |
| Minimum recommended touch target size is 44x44 points | HIG Accessibility Guidelines | Verified | Standard iOS hit target requirement. |
| Custom Rotor actions expose swipe or multi-touch gestures | UIKit & SwiftUI Documentation | Verified | Accessible via two-finger twist gesture in VoiceOver. |

---

## Code Verification
- `content/topics/accessibility/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/accessibility/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, accessibility tree navigation mechanics, SwiftUI / UIKit modifier behaviors, and Swift 6 compiler test blocks for `accessibility` are verified, accurate, and consistent with official Apple documentation.
