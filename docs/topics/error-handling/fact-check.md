# Fact-Check — Error Handling (Step 6)

Run 2026-11-09. Topic: `error-handling` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/error-handling/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/error-handling/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Error Handling](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling) and [Result (Swift)](https://developer.apple.com/documentation/swift/result).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Error protocol conformance | Types conforming to `Error` can be thrown with `throw` | Confirmed |
| Missing `try` compiler check | Calling throwing function without `try` fails compile time (`call can throw but is not marked with 'try'`) | Confirmed |
| `do-catch` pattern matching | Specific enum cases matched; general catch provides implicit `error` constant | Confirmed |
| `try?` conversion to optional | Thrown error converted to `nil` (`Type?`); no crash | Confirmed |
| `try!` assertion | Asserts success; unwraps value or crashes on error | Confirmed |
| `defer` execution timing | Executes upon scope exit regardless of normal return or error throw | Confirmed |
| `defer` reverse execution order | Multiple `defer` statements execute in reverse order (LIFO) | Confirmed |
| `Result` enum | Provides `.success(Value)` and `.failure(Error)` cases | Confirmed |
| `Result.get()` | Returns value on success or throws error on failure | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `enumerations` and `functions`, which were verified and published.
2. **Progression in Batch 1B**: `error-handling` completes the error flow, setting up the final topic in Batch 1B: `optional-chaining`.
