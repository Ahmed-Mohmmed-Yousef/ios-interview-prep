# Fact-Check — Methods and Initialization (Step 6)

Run 2026-11-09. Topic: `methods-and-initialization` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/methods-and-initialization/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/methods-and-initialization/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Methods](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/methods) and [The Swift Programming Language: Initialization](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Mutating method on struct | Modifying struct property in method requires `mutating func` | Confirmed |
| Non-mutating error | Non-mutating method mutating property fails compile time (`left side of mutating operator isn't mutable: 'self' is immutable`) | Confirmed |
| Mutating call on `let` struct | Calling mutating method on `let` struct constant fails compile time (`cannot use mutating member on immutable value`) | Confirmed |
| Classes do not need mutating | Methods on classes mutate properties without `mutating` keyword | Confirmed |
| Reassigning self in mutating method | `self = Point(x: 0, y: 0)` works cleanly in mutating method | Confirmed |
| Synthesized memberwise initializer | Structs synthesize `init(props...)` when no custom initializers exist in primary definition | Confirmed |
| Custom init in struct body | Suppresses automatic memberwise initializer | Confirmed |
| Custom init in extension | Preserves automatic memberwise initializer alongside custom initializer | Confirmed |
| Failable initializers | `init?` returns Optional (`Type?`) and evaluates to `nil` when `return nil` executes | Confirmed |
| Initializer delegation | Value types delegate across initializers using `self.init(...)` | Confirmed |
| Type methods | `static func` invoked directly on type without instance; `self` refers to type | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `properties`, which was verified and published.
2. **Progression in Batch 1B**: `methods-and-initialization` completes the core object construction concepts, providing the prerequisite foundation for `error-handling` and `optional-chaining`.
