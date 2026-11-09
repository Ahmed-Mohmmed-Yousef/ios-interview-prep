# Fact-Check — Copy-on-Write and Value Semantics (Step 6)

Run 2026-11-09. Topic: `copy-on-write` (mid). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/copy-on-write/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/copy-on-write/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Structures and Classes](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures), [Swift Optimization Tips](https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst), and [Apple Developer Documentation: isKnownUniquelyReferenced](https://developer.apple.com/documentation/swift/isknownuniquelyreferenced(_:)).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| COW collection behavior | `Array`, `Dictionary`, `Set`, `String` share memory buffers until mutation occurs | Confirmed |
| Custom structs default | Custom structs copy stored properties immediately; they do NOT have COW by default | Confirmed |
| `isKnownUniquelyReferenced` | Returns true when reference count of an object is 1, false when shared | Confirmed |
| In-place mutation | When reference count is 1, mutations execute in place without allocation | Confirmed |
| Value semantics preserved | Mutating one variable never affects another, even when buffers were previously shared | Confirmed |
| `inout` parameters | Passing collections with `inout` avoids duplicating references, keeping COW checks unique | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `structs-vs-classes` and `collections`, both published in Wave 1.
2. **Progression**: Unlocks bonus topic `key-paths` (Topic 5 in this batch).
