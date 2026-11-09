# Fact-Check — Key Paths (Step 6)

Run 2026-11-09. Topic: `key-paths` (mid bonus). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/key-paths/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/key-paths/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: KeyPath](https://developer.apple.com/documentation/swift/keypath), [The Swift Programming Language: Expressions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions), and [Apple Developer Documentation: WritableKeyPath](https://developer.apple.com/documentation/swift/writablekeypath).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Key path literal syntax | Backslash prefix `\Type.property` or `\.property` refers to properties as values | Confirmed |
| Subscript evaluation | Evaluated via `instance[keyPath: path]` for reading and writing | Confirmed |
| KeyPath type hierarchy | `KeyPath` (read-only), `WritableKeyPath` (value types), `ReferenceWritableKeyPath` (classes) | Confirmed |
| Key paths as functions | Swift 5.2+ allows passing key paths to closures like `map(\.name)` and `filter(\.isCompleted)` | Confirmed |
| Nested chaining | Key paths chain through nested structs and optional chaining like `\A.b?.c` | Confirmed |
| `@dynamicMemberLookup` | Enables type-safe member forwarding using key paths in subscripts | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `properties`, which was published in Wave 1.
2. **Progression**: Sits on the side bonus branch after `copy-on-write`. Does not block main progression.
