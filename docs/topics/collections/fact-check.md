# Fact-Check — Arrays, Sets and Dictionaries (Step 6)

Run 2026-11-09. Topic: `collections` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/collections/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/collections/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Collection Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/collectiontypes), [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array), and [Apple Developer Documentation: Dictionary](https://developer.apple.com/documentation/swift/dictionary).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Array out of bounds subscript | `[10, 20][2]` traps with `Fatal error: Index out of range` | Confirmed |
| Safe boundary access on Array | `[].first` evaluates to `nil` (`Element?`) safely | Confirmed |
| Set uniqueness | `Set([1, 1, 2]).count == 2` | Confirmed |
| Set Hashable requirement | Non-Hashable element causes compile-time error | Confirmed |
| Set membership time complexity | Amortized $O(1)$ via hash table lookup | Confirmed |
| Dictionary missing key lookup | `["a": 1]["b"]` returns `nil` (`Int?`) | Confirmed |
| Dictionary default subscript | `dict[key, default: 0] += 1` updates in-place | Confirmed |
| Dictionary key removal via `nil` | `dict[key] = nil` removes key-value pair | Confirmed |
| Copy-on-Write (COW) | Storage buffer shared until mutation occurs | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `optionals`, which was verified and published.
2. **Readiness for Next Topics**: Prepares candidate for looping and iteration in `control-flow` and argument passing in `functions`.
