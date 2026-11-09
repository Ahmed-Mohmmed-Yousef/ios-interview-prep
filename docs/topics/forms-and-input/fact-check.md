# Fact-Check — Forms and User Input (Step 6)

Run 2026-11-09. Topic: `forms-and-input` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/forms-and-input/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/forms-and-input/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Form](https://developer.apple.com/documentation/swiftui/form), [Apple Developer Documentation: TextField](https://developer.apple.com/documentation/swiftui/textfield), and [Apple Developer Documentation: FocusState](https://developer.apple.com/documentation/swiftui/focusstate).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `Form` styling on iOS | Automatically provides inset grouped table styling with rounded row backgrounds | Confirmed |
| `Section` division | Groups controls into discrete cards with optional header and footer text | Confirmed |
| `SecureField` security | Obscures characters with dots and disables keyboard autocorrect caching | Confirmed |
| `@FocusState` management | Binds focus state; setting to `false` or `nil` dismisses the virtual keyboard | Confirmed |
| `Picker` tag matching | Options require matching `.tag()` types to update the selection binding | Confirmed |
| `.disabled(!isFormValid)` | Prevents user interaction on submission buttons when validation fails | Confirmed |
| Keyboard autofill integration | `.textContentType(.emailAddress)` assists system password managers | Confirmed |
| `TextField` numerical formatting | `format: .number` parses strings directly into numeric state variables | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `state-and-binding` is published and verified.
2. **Progression in Batch 2D**: Third topic in Batch 2D (SwiftUI & UIKit), equipping learners with production-grade data entry patterns before sheets and navigation.
