# Fact-Check — Type Casting and Any (Step 6)

Run 2026-11-09. Topic: `type-casting` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/type-casting/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/type-casting/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Type Casting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/typecasting) and [Swift Standard Library: Any and AnyObject](https://developer.apple.com/documentation/swift/anyobject).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `is` type check | `pet is Dog` evaluates dynamically and returns `Bool` | Confirmed |
| Safe `as?` downcasting | `v as? Car` returns `nil` when target type does not match | Confirmed |
| Forced `as!` crash | Mismatched forced downcast triggers fatal runtime error | Confirmed |
| `as` guaranteed upcast | `movie as MediaItem` compiles and runs cleanly | Confirmed |
| `Any` holds all types | Can store Int, Double, String, tuples, structs, and classes | Confirmed |
| `AnyObject` holds classes only | Rejecting value types like structs or Int at compile time | Confirmed |
| Pattern matching with `case let ... as` | Extracts and downcasts in a single switch case | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `inheritance`, which was verified and published.
2. **Progression**: Forms the bridge between object-oriented class hierarchies and upcoming protocol-oriented programming in Topic 4: `protocols`.
