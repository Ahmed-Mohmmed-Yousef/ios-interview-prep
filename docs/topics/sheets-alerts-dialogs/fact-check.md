# Fact-Check — Sheets, Alerts and Dialogs (Step 6)

Run 2026-11-09. Topic: `sheets-alerts-dialogs` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/sheets-alerts-dialogs/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/sheets-alerts-dialogs/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Modal presentations](https://developer.apple.com/documentation/swiftui/modal-presentations), [Apple Developer Documentation: presentationDetents](https://developer.apple.com/documentation/swiftui/view/presentationdetents(_:)), and [Apple Developer Documentation: alert](https://developer.apple.com/documentation/swiftui/view/alert(_:ispresented:actions:message:)-2j1p1).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `.sheet` presentation style | Overlays interactive card sliding up from bottom with dimming background | Confirmed |
| `.fullScreenCover` appearance | Covers entire display without card margins or swipe-to-dismiss gesture | Confirmed |
| `.presentationDetents` (iOS 16+) | Controls resting heights (`.medium`, `.large`, `.fraction(0.4)`, `.height(250)`) | Confirmed |
| `@Environment(\.dismiss)` (iOS 15+) | Programmatically dismisses presented sheet, cover, or alert | Confirmed |
| `.sheet(item:)` data safety | Guarantees non-optional unwrapped payload and prevents nil crashes during dismiss | Confirmed |
| Multiple `.sheet` conflict | Attaching multiple `.sheet(isPresented:)` modifiers to one view causes collisions | Confirmed |
| Navigation hierarchy in sheets | Modals require nested `NavigationStack` to display independent navigation bars | Confirmed |
| `.interactiveDismissDisabled` | Disables downward swipe-to-dismiss gesture when unsaved changes exist | Confirmed |
| `Button(role: .destructive)` | System renders destructive actions with native red styling in alerts/dialogs | Confirmed |
| `confirmationDialog` cancel button | iOS automatically includes a standard cancel button at the bottom | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `swiftui-navigation` is confirmed in prerequisites list.
2. **Progression in Batch 2D**: Fourth topic in Batch 2D (SwiftUI & UIKit), bridging SwiftUI state/presentation concepts before diving into UIKit view controllers and layout.
