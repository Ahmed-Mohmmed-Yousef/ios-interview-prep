# Research: Sheets, Alerts and Dialogs

## 1. Core Concepts & Technical Facts

### Modal Presentations in SwiftUI
- A modal view interrupts current navigation flow to prompt for focused user action, confirmation, or information display.
- Unlike navigation push (which maintains a chronological drill-down stack), a modal slides or pops over the existing view hierarchy.

### The Four Main Modal Styles
1. **`.sheet(isPresented:content:)` & `.sheet(item:content:)`**:
   - Slides up as an interactive card overlay from the bottom of the screen.
   - On iOS, the background view scales down and dims slightly.
   - Users can swipe down to dismiss unless disabled via `.interactiveDismissDisabled()`.
   - Supports **presentation detents** (iOS 16+):
     ```swift
     .presentationDetents([.medium, .large, .fraction(0.3)])
     .presentationDragIndicator(.visible)
     ```
   - Preferred syntax when passing model data: `.sheet(item: $selectedItem)` ensures non-optional unwrapped payload and prevents race-condition crashes.
2. **`.fullScreenCover(isPresented:content:)`**:
   - Covers the entire screen without card scaling or swipe-to-dismiss gestures.
   - Suitable for full modal tasks (e.g., camera capture, onboarding wizards, checkout flows).
   - Must provide an explicit Close/Done button inside the presented view.
3. **`.alert(title, isPresented:actions:message:)`**:
   - Small centered dialogue overlay that blocks all other interactions.
   - Used for critical information, errors, or simple confirmations.
   - Action buttons configure system roles: `Button("Delete", role: .destructive)` (red text) and `Button("Cancel", role: .cancel)` (bold text).
4. **`.confirmationDialog(title, isPresented:titleVisibility:actions:message:)`**:
   - Replaces the legacy UIKit `UIActionSheet`.
   - Slides up from the bottom on iPhone with multiple choices.
   - Displays destructive actions in red, normal actions in system tint, and a default Cancel button.

### Dismissal & State Control
- **`@Environment(\.dismiss)`** (iOS 15+):
  - Injected into any view presented as a sheet or cover.
  - Calling `dismiss()` closes the modal cleanly.
  - Replaces legacy `@Environment(\.presentationMode)`.
- **Item-based vs Boolean-based Presentation**:
  - `isPresented: $showSheet` requires separate state variables for each modal.
  - `item: $optionalModel` relies on an `Identifiable` object. Presenting is triggered by setting `item = object`, and dismissing sets `item = nil`.

---

## 2. Common Misconceptions & Interview Traps

1. **"Attaching multiple `.sheet` modifiers to the same view"**:
   - *Correction*: Placing two `.sheet(isPresented:)` modifiers on the same `VStack` or `View` causes conflicts where only one sheet can ever open. Use a single `.sheet(item:)` driven by an enum or place `.sheet` on separate child buttons.
2. **"Accessing model data inside `sheet(isPresented:)`"**:
   - *Correction*: If state becomes `nil` when the sheet begins dismissal animation, a view reading the optional model inside `sheet(isPresented:)` crashes. Use `sheet(item:)` where SwiftUI passes the non-optional unwrapped item into the content closure.
3. **"Sheets and covers push onto the navigation stack"**:
   - *Correction*: Modals are presented above the view tree in their own window context. If you want navigation bars or push transitions inside a sheet, embed a `NavigationStack` *inside* the sheet content.
4. **"Cancel button required in confirmationDialog"**:
   - *Correction*: SwiftUI automatically includes a standard Cancel button on iOS confirmation dialogs unless overridden.

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: Sheets slide up from the bottom of the screen for tasks like forms or settings. Alerts show popups in the middle of the screen with buttons. We trigger them using `@State` boolean or item variables, and dismiss them with `@Environment(\.dismiss)`.
- **Junior**:
  - Focus: Differentiating `.sheet`, `.fullScreenCover`, `.alert`, and `.confirmationDialog`. Explaining `.sheet(item:)` versus `.sheet(isPresented:)` to avoid race conditions with optional data. Using presentation detents (`.medium`, `.large`) and setting button roles (`.destructive`, `.cancel`). Embedding a `NavigationStack` inside a sheet for multi-step modal flows.
- **Senior**:
  - Focus: Modal presentation architecture across platforms (macOS popovers vs iPad form sheets vs iPhone cards). Managing modal navigation stacks with coordinator patterns and typed presentation routers. Handling background sheet dismissal gestures with `.interactiveDismissDisabled` when unsaved user changes exist. Accessibility focus management for VoiceOver users when modal dialogs appear.

---

## 4. Official Sources & References

1. **Apple Developer Documentation: Modal presentations (SwiftUI)**:
   - https://developer.apple.com/documentation/swiftui/modal-presentations
2. **Apple Developer Documentation: sheet(isPresented:onDismiss:content:)**:
   - https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:)
3. **Apple Developer Documentation: alert(_:isPresented:actions:message:)**:
   - https://developer.apple.com/documentation/swiftui/view/alert(_:ispresented:actions:message:)-2j1p1
