# Fact-Check — Closures Basics (Step 6)

Run 2026-11-09. Topic: `closures-basics` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/closures-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/closures-basics/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Function vs closure identity | Functions are named closures; functions and closures share function types | Confirmed |
| Reference type semantics | Assigning closure to multiple variables shares instance and captured state | Confirmed |
| `in` keyword purpose | Delimits parameter/return signature from closure body statements | Confirmed |
| Type inference from context | `names.sorted(by:)` infers `(String, String) -> Bool` without explicit types | Confirmed |
| Single-expression implicit return | Evaluates and returns expression without explicit `return` keyword | Confirmed |
| Shorthand arguments `$0`, `$1` | References positional arguments; parameter list and `in` keyword omitted | Confirmed |
| Shorthand and named collision | `{ name in print($0) }` fails compile time (`anonymous closure arguments cannot be used inside a closure with an explicit signature`) | Confirmed |
| Trailing closure syntax | Closure passed outside call parentheses when final argument | Confirmed |
| Parentheses omission | Empty parentheses `()` omitted when trailing closure is sole argument | Confirmed |
| Value capturing lifetime | Captured local `var count = 0` survives function scope exit and increments across calls | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `functions`, which was verified and published.
2. **Start of Batch 1B**: `closures-basics` opens Batch 1B (Intermediate Types & Logic), paving the way for `enumerations`, `properties`, and `methods-and-initialization`.
