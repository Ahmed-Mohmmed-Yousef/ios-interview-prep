# Fact-Check — Optionals (Step 6)

Run 2026-11-08. Topic: `optionals` (fresh).

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/optionals/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/optionals/questions.json` (including compile-error assertions).
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: The Basics (Optionals)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics) and [Apple Developer Documentation: Optional](https://developer.apple.com/documentation/swift/optional).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Non-optional types cannot hold `nil` | `let s: String = nil` fails compile time | Confirmed |
| Converting invalid string to Int returns `nil` | `Int("abc")` produces `nil` of type `Int?` | Confirmed |
| Passing `String?` into `String` parameter | Fails compile time: `must be unwrapped` | Confirmed |
| Shorthand `if let x` syntax | Works seamlessly in Swift 6.4 | Confirmed |
| `guard else` must exit scope | `guard let x else { print(x) }` fails compile time: `must not fall through` | Confirmed |
| Nil-coalescing with `??` | Safely evaluates fallback expression | Confirmed |
| Forced unwrapping of `nil` | Triggers runtime fatal error | Confirmed |
| `Optional<Wrapped>` enum structure | Conforms to `.none` and `.some(Wrapped)` | Confirmed |
| Direct equality comparison `==` | Works when wrapped type conforms to `Equatable` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `swift-basics`, which was verified and published.
2. **Readiness for Next Topics**: Prepares the learner for `operators` (arithmetic, comparison, range) and later `optional-chaining`.
