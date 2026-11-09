# Fact-Check — Auto Layout (Step 6)

Run 2026-11-09. Topic: `auto-layout` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/auto-layout/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/auto-layout/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: NSLayoutConstraint](https://developer.apple.com/documentation/uikit/nslayoutconstraint), [Apple Developer Documentation: View layout](https://developer.apple.com/documentation/uikit/view-layout), and [Apple Developer Documentation: NSLayoutAnchor](https://developer.apple.com/documentation/uikit/nslayoutanchor).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `translatesAutoresizingMaskIntoConstraints` | Default is true in code; must be set to false to prevent conflicting mask constraints | Confirmed |
| Batch constraint activation | `NSLayoutConstraint.activate([...])` evaluates constraints efficiently in a single pass | Confirmed |
| View hierarchy prerequisite | Views must share a common ancestor (`addSubview`) before activating constraints | Confirmed |
| Leading / Trailing localization | Flips automatically for right-to-left language locales (Arabic, Hebrew) | Confirmed |
| Safe area layout guide | `safeAreaLayoutGuide` protects content from notches, Dynamic Island, and home indicator | Confirmed |
| Content Hugging Priority (CHP) | Default 250 (`.defaultLow`); lower priority stretches when extra space is available | Confirmed |
| Content Compression Resistance Priority (CCRP) | Default 750 (`.defaultHigh`); higher priority resists truncation when space is constrained | Confirmed |
| Constraint Priorities | Range from 1 to 1000 (`.required` = 1000, `.defaultHigh` = 750, `.defaultLow` = 250) | Confirmed |
| Cassowary linear solver | Auto Layout resolves linear equations and inequalities via the Cassowary algorithm | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `uiviews-and-view-controllers` is confirmed in prerequisites list.
2. **Progression in Batch 2D**: Seventh topic in Batch 2D (SwiftUI & UIKit), establishing adaptive constraint layouts before exploring navigation controllers and table/collection views.
