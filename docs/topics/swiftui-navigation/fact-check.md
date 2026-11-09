# Fact-Check — Navigation (Step 6)

Run 2026-11-09. Topic: `swiftui-navigation` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-navigation/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-navigation/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack), [Apple Developer Documentation: NavigationLink](https://developer.apple.com/documentation/swiftui/navigationlink), and [Apple Developer Documentation: NavigationPath](https://developer.apple.com/documentation/swiftui/navigationpath).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Lazy destination instantiation | `NavigationLink(value:)` defers view builder closure until tapped | Confirmed |
| NavigationPath initialization | Newly created `NavigationPath()` is empty (`isEmpty == true`, `count == 0`) | Confirmed |
| NavigationPath append and pop | `.append(_:)` increments count; `.removeLast()` pops top screen cleanly | Confirmed |
| Pop to root | Reassigning `path = NavigationPath()` resets stack to root | Confirmed |
| Title placement rule | `.navigationTitle` must be placed on child content view inside stack | Confirmed |
| Hashable requirement | Values passed to `NavigationLink(value:)` must conform to `Hashable` | Confirmed |
| Heterogeneous navigation | `NavigationPath` is type-erased and stores multiple different `Hashable` types | Confirmed |
| NavigationView deprecation | `NavigationView` deprecated starting in iOS 16; `NavigationStack` is the standard | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `swiftui-lists`, which is verified and published.
2. **Progression in Batch 1D**: `swiftui-navigation` completes the SwiftUI Basics batch (`swiftui-views-modifiers` → `swiftui-layout` → `state-and-binding` → `swiftui-lists` → `swiftui-navigation`). All 5 topics in Batch 1D are now fully verified and published.
