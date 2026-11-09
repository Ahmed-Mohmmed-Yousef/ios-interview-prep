# Fact-Check — Lists and ForEach (Step 6)

Run 2026-11-09. Topic: `swiftui-lists` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-lists/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-lists/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: List](https://developer.apple.com/documentation/swiftui/list), [Apple Developer Documentation: ForEach](https://developer.apple.com/documentation/swiftui/foreach), and [Apple Developer Documentation: Identifiable](https://developer.apple.com/documentation/swift/identifiable).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Lazy loading and recycling | List recycles cell views behind the scenes using UICollectionView | Confirmed |
| Identifiable conformance | Model requires `id: Hashable`; standard type is `UUID` or `Int` | Confirmed |
| Key path identity `\.self` | Requires elements conform to `Hashable`; duplicate elements cause glitches | Confirmed |
| DynamicViewContent | `.onDelete` and `.onMove` belong to `DynamicViewContent`, conformed to by `ForEach`, not `List` | Confirmed |
| List selection binding | Multi-selection binds to `Set<SelectionValue>` in `List(selection:)` | Confirmed |
| List row separators | Separators controlled via `.listRowSeparator(.hidden)` modifier | Confirmed |
| Inset grouped style | Default style on iOS is `.insetGrouped`; customizable with `.listStyle()` | Confirmed |
| ScrollView + LazyVStack difference | `LazyVStack` does not recycle offscreen views or include built-in table styling | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `collections` and `swiftui-views-modifiers`, both of which are verified and published.
2. **Progression in Batch 1D**: `swiftui-lists` introduces dynamic collections and row identity, which feeds directly into `swiftui-navigation` where list items trigger navigation pushes via `NavigationLink(value:)`.
