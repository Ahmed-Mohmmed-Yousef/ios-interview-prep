# Fact-Check — Constants, Variables and Types (Step 6)

Run 2026-11-08. Topic: `swift-basics` (fresh).

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swift-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swift-basics/questions.json` (including compile-error assertions).
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: The Basics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics) and [Apple Developer Documentation](https://developer.apple.com/documentation/swift).
  - No Apple documentation prose copied.
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 5 `c`, 6 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Reassigning `let` produces compile-time error | Verified with `swiftc -swift-version 6` | Confirmed |
| Floating point literal infers `Double`, not `Float` | Verified with `type(of: 3.14159)` | Confirmed |
| Single-character quotes infer `String`, not `Character` | Verified with `type(of: "c")` | Confirmed |
| Explicit `Character` requires `: Character` annotation | Verified with `let ch: Character = "c"` | Confirmed |
| Mixed numeric arithmetic (`Int` + `Double`) disallowed | Verified with compiler error: `binary operator '+' cannot be applied` | Confirmed |
| Literal numeric addition (`3 + 0.14159`) allowed | Compiles because raw literals have no explicit type until resolved | Confirmed |
| Delayed initialization with `let` | Allowed with type annotation if proven initialized before read | Confirmed |
| Reading uninitialized `let` | Fails at compile-time: `constant 'x' used before being initialized` | Confirmed |
| Integer literal overflow | Fails at compile-time: `integer literal overflows when stored into 'Int8'` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: As the first topic on the path, `swift-basics` has no prerequisites (`[]`), allowing any learner to start immediately.
2. **Readiness for Next Topic**: Prepares the learner for `optionals`, which introduces optional types (`Int?`) and nil handling on top of the base types taught here.
