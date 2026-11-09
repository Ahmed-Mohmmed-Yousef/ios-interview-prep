# Fact-Check — Optional Chaining (Step 6)

Run 2026-11-09. Topic: `optional-chaining` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/optional-chaining/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/optional-chaining/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Optional Chaining](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/optionalchaining) and [Swift Standard Library: Optional](https://developer.apple.com/documentation/swift/optional).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Safe evaluation on nil | `person.residence?.address?.street` returns nil if any link is nil | Confirmed |
| Return type wrapping | Querying non-optional `String` via `?` produces `String?` | Confirmed |
| Optional flattening | Querying optional `String?` produces `String?`, not `String??` | Confirmed |
| Void method returns `Void?` | Calling Void method via `?` produces `Void?` (`()?`) | Confirmed |
| Dictionary subscript syntax | `dict?["key"]` places `?` before brackets | Confirmed |
| Assignment short-circuiting | Right-hand side expression skipped if left target is nil | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `optionals` and `structs-vs-classes`, both of which are completed.
2. **Progression**: Forms the first topic in Junior Wave 2 Batch 2A, bridging fundamental optionals with object models and advanced language features.
