# Fact-Check — Operators (Step 6)

Run 2026-11-09. Topic: `operators` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/operators/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/operators/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Basic Operators](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/basicoperators).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Assignment inside boolean condition | `if x = y` fails compile time: `use of '=' in a boolean context, did you mean '=='?` | Confirmed |
| Compound assignment return value | `let b = (a += 2)` infers type `()` (Void) | Confirmed |
| Negative integer remainder | `-9 % 4 == -1` and `9 % -4 == 1` | Confirmed |
| String concatenation with `+` | `"Hello, " + "Swift"` yields `"Hello, Swift"` | Confirmed |
| Closed range requires `lowerBound <= upperBound` | `5...1` causes fatal runtime crash | Confirmed |
| Half-open range excludes upper bound | `(0..<3).contains(3)` is `false` | Confirmed |
| Nil-coalescing short-circuiting | Fallback function is not called when optional is non-nil | Confirmed |
| Identity comparison `===` on classes | Returns `false` for distinct instances, `true` for shared reference | Confirmed |
| Identity comparison `===` on structs | Fails at compile time (value types cannot use `===`) | Confirmed |
| Standard arithmetic overflow | Traps with runtime crash by default | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `optionals`, which was verified and published.
2. **Readiness for Next Topics**: Establishes foundation for `strings-and-characters`, `collections`, `control-flow`, and `functions`.
