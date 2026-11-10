# Accessibility Research

**Topic ID:** `accessibility`  
**Level:** Mid  
**Date:** 2026-11-10  
**Author:** Curriculum Production Agent  

---

## 1. Official Documentation & Authoritative Sources

1. **Accessibility (Apple Developer Documentation)**  
   https://developer.apple.com/documentation/accessibility  
   *Core framework providing programmatic accessibility across iOS, iPadOS, macOS, tvOS, and watchOS.*

2. **Human Interface Guidelines: Accessibility**  
   https://developer.apple.com/design/human-interface-guidelines/accessibility  
   *Design principles: perceive, operate, understand. Touch targets minimum 44x44 points. Color independence. Assistive technologies.*

3. **SwiftUI Accessibility Documentation**  
   https://developer.apple.com/documentation/swiftui/view-accessibility  
   *Modifiers: `accessibilityLabel(_:)`, `accessibilityValue(_:)`, `accessibilityHint(_:)`, `accessibilityAddTraits(_:)`, `accessibilityElement(children:)`, `accessibilityAction(named:_:)`, `accessibilityHidden(_:)`.*

4. **UIAccessibility (UIKit)**  
   https://developer.apple.com/documentation/uikit/uiaccessibility  
   *Properties: `isAccessibilityElement`, `accessibilityLabel`, `accessibilityValue`, `accessibilityHint`, `accessibilityTraits`. Notifications: `UIAccessibility.post(notification:argument:)` with `.screenChanged`, `.layoutChanged`, `.announcement`.*

5. **WWDC Sessions on Accessibility**  
   - WWDC21 Session 10119: *Craft search experiences in SwiftUI with accessibility*  
   - WWDC21 Session 10121: *Tailor the VoiceOver experience in your data-rich apps*  
   - WWDC23 Session 10034: *Perform accessibility audits in Xcode*  

---

## 2. Key Technical Concepts

### Accessibility Elements and the Accessibility Tree
- Assistive technologies like VoiceOver do not render visual pixels. They walk the **accessibility tree**, a hierarchy of accessible nodes provided by UIKit and SwiftUI.
- Standard controls (`Button`, `Text`, `Toggle`, `UIButton`, `UILabel`) are accessible by default.
- Custom views or container views with multiple child views need explicit configuration. In SwiftUI, `accessibilityElement(children: .combine)` merges children into a single spoken unit, whereas `.ignore` creates a blank slate to supply custom labels and values. In UIKit, container views set `isAccessibilityElement = true` (or leave it false to let subviews speak individually).

### Spoken Attributes
1. **Label (`accessibilityLabel`)**: Concise name of the element (e.g., "Play", "Profile photo", "Close"). Never includes the control type (e.g. do not say "Play button").
2. **Value (`accessibilityValue`)**: The current state or quantity of the element (e.g., "50%", "Page 2 of 4", "Selected").
3. **Traits (`accessibilityTraits` / `.accessibilityAddTraits`)**: The type, state, or behavior of the control (e.g., `.isButton`, `.isSelected`, `.header`, `.playsSound`, `.updatesFrequently`). VoiceOver uses traits to announce the element type (e.g., "Button").
4. **Hint (`accessibilityHint`)**: Brief explanation of what happens when the action is triggered (e.g., "Plays the selected song"). Only needed when the action is not obvious from the label.

### Custom Actions and Rotor
- Complex gestures (drag-to-delete, swipe-to-reorder, double-tap options) must be exposed to VoiceOver via custom actions (`accessibilityAction(named:action:)` in SwiftUI or `UIAccessibilityCustomAction` in UIKit).
- VoiceOver users navigate these via the Rotor (two-finger twisting gesture).

### Focus and Screen Notifications
- When a view appears modally or changes dynamically without a navigation push, VoiceOver must be notified.
- UIKit uses `UIAccessibility.post(notification: .screenChanged, argument: newFocusElement)`.
- `.layoutChanged` is used when a part of the screen changes; `.announcement` announces a string without shifting focus.
- SwiftUI uses `@AccessibilityFocusState` to move focus programmatically.

### Touch Targets and Visual Accommodations
- Touch targets must be at least 44x44 points.
- Never convey state using color alone; pair colors with icons, labels, or traits.
- Support Dynamic Type with `@ScaledMetric` or `UIFontMetrics` so text grows without breaking layout.

---

## 3. Common Interview Questions by Level

### Fresh / Junior Level
- What is VoiceOver and how do you test it in the Simulator or on a device?
- What is the difference between `accessibilityLabel`, `accessibilityValue`, and `accessibilityHint`?
- Why should you never include the word "button" in an accessibility label for a button?
- How do you hide a decorative image from VoiceOver?

### Mid Level
- How does `accessibilityElement(children: .combine)` differ from `accessibilityElement(children: .ignore)` in SwiftUI?
- How do you expose swipe or multi-gesture interactions to VoiceOver users?
- How do you notify VoiceOver when dynamic content changes or a custom modal appears?
- How do you use the Accessibility Inspector in Xcode to run automated audits?

### Senior / Staff Level
- How do you architect an app so accessibility is built into design systems rather than patched on later?
- What are the performance and UX implications of large accessibility trees with deeply nested views?
- How do you test accessibility in continuous integration pipelines using `XCUIApplication` and accessibility audits in XCTest?
