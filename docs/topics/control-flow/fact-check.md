# Fact-Check — Control Flow (Step 6)

Run 2026-11-09. Topic: `control-flow` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/control-flow/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/control-flow/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Control Flow](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Conditionals require Bool | `if 1 { }` fails compile time (`type Int cannot be used as boolean`) | Confirmed |
| Non-exhaustive switch | Fails compile time (`switch must be exhaustive; add default`) | Confirmed |
| No empty switch cases | Fails compile time (`case label must have at least one statement`) | Confirmed |
| No automatic fallthrough | Execution terminates at end of matching case without `break` | Confirmed |
| Explicit `fallthrough` | Directly transfers control to subsequent case body | Confirmed |
| `guard else` control transfer | Fails compile time if else body falls through | Confirmed |
| `guard let` scoping | Bound constants remain accessible in enclosing scope | Confirmed |
| `repeat-while` guaranteed run | Body executes once even if initial condition is false | Confirmed |
| Labeled loop statements | `break labelName` successfully terminates outer loop | Confirmed |
| Pattern matching with `where` | Evaluates secondary boolean condition on bound tuple/values | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `collections`, which was verified and published.
2. **Readiness for Next Topics**: Directly prepares candidate for `functions`, the final topic in Batch 1A!
