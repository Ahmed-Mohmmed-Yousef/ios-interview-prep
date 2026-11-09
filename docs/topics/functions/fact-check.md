# Fact-Check — Functions (Step 6)

Run 2026-11-09. Topic: `functions` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/functions/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/functions/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Functions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Parameter reassignment | `param += 1` fails compile time (`is a let constant`) | Confirmed |
| In-out with let constant | `modify(&constant)` fails compile time (`cannot pass immutable value as inout`) | Confirmed |
| In-out with mutable var | Modifies caller variable via copy-in copy-out | Confirmed |
| Single-expression implicit return | Evaluates and returns expression without `return` keyword | Confirmed |
| Omitted argument label | `_ name: String` allows calling without label | Confirmed |
| Custom argument label | `for name: String` requires label at call site | Confirmed |
| First-class function types | Can assign `(Int, Int) -> Int` to variables and invoke | Confirmed |
| Variadic parameters | `items: String...` accessible as `[String]` inside body | Confirmed |
| Compound tuple return | Returns multiple named values via tuple `(min: Int, max: Int)` | Confirmed |
| Nested function scoping | Inner functions capture outer scope and execute cleanly | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `control-flow`, which was verified and published.
2. **Completion of Batch 1A**: Concludes the 7 core language topics in Fresh Batch 1A (`swift-basics` through `functions`).
3. **Readiness for Batch 1B**: Functions provide the prerequisite foundation for `closures-basics` in Batch 1B!
