# Fact-Check — Protocol-Oriented Programming (Step 6)

Run 2026-11-09. Topic: `protocol-oriented-programming` (mid). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/protocol-oriented-programming/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/protocol-oriented-programming/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols), [WWDC22: Design protocol interfaces in Swift](https://developer.apple.com/videos/play/wwdc2022/110353/), and [WWDC15: Protocol-Oriented Programming in Swift](https://developer.apple.com/videos/play/wwdc2015/408/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Protocol extension defaults | Declaring method bodies in protocol extensions provides default implementations for conforming types | Confirmed |
| Dynamic dispatch on requirements | Methods declared in protocol headers use witness table dynamic dispatch when invoked through protocol references | Confirmed |
| Static dispatch on extension-only methods | Methods declared ONLY in protocol extensions use compile-time static dispatch based on variable type | Confirmed |
| Protocol composition | The ampersand operator `&` combines multiple protocols into a composite type | Confirmed |
| Value type support | Structs and enums adopt protocols and protocol extensions with value semantics | Confirmed |
| No stored properties in extensions | Extensions can add computed properties and methods, but cannot add stored properties | Confirmed |
| Constrained extensions | Protocol extensions support `where` clauses (e.g., `where Element: Equatable`) | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `protocols` and `extensions`, both published in Wave 2.
2. **Progression**: Forms the foundational topic for Unit 1 Mid Level (Batch 3A).
