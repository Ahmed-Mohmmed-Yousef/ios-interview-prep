# Fact-Check — Generics: The Basics (Step 6)

Run 2026-11-09. Topic: `generics-basics` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/generics-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/generics-basics/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Generics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/generics) and [Swift Standard Library: Equatable](https://developer.apple.com/documentation/swift/equatable).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Generic function inference | `swapValues(&a, &b)` infers concrete type from call arguments | Confirmed |
| Generic custom types | `struct Stack<Element>` manages items of arbitrary types | Confirmed |
| Extension syntax rule | `extension Stack` reuses `Element` without repeating angle brackets | Confirmed |
| Protocol type constraint | `<T: Equatable>` is required to compare elements with `==` | Confirmed |
| Monomorphization performance | Specialized machine code emitted for concrete types without boxing overhead | Confirmed |
| Generics vs `Any` | Generics enforce static compile-time type matching without runtime casting | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `protocols`, which was verified and published.
2. **Progression**: Sets up Topic 7: `access-control` (open, public, package, internal, fileprivate, private).
