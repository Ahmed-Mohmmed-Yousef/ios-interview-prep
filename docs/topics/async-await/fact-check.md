# Fact-Check — async/await (Step 6)

Run 2026-11-09. Topic: `async-await` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/async-await/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/async-await/questions.json`.
- **Official Documentation**:
  - Verified against [The Swift Programming Language: Concurrency](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency), [Apple Developer Documentation: Task](https://developer.apple.com/documentation/swift/task), and [WWDC21: Swift concurrency: Behind the scenes](https://developer.apple.com/videos/play/wwdc2021/10254/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Non-blocking suspension | `await` yields thread to cooperative pool; thread remains free to execute other tasks | Confirmed |
| Thread hops across awaits | Function may resume on a different thread in the cooperative pool unless isolated to an actor | Confirmed |
| Cooperative thread pool sizing | Thread count matches active CPU core count, eliminating GCD-style thread explosion | Confirmed |
| Compiler-guaranteed return | Async functions cannot forget completion callbacks; compiler enforces return or throw on every path | Confirmed |
| Sync to async bridging | Sync code must wrap async calls inside `Task { await ... }`; cannot call `await` directly in sync context | Confirmed |
| Blocking hazard in cooperative pool | Calling `Thread.sleep` or synchronous semaphores deprives pool of threads, starving tasks | Confirmed |
| Keyword ordering | Function signatures require `async throws -> ReturnType`; placing `throws` before `async` is a syntax error | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `gcd-basics`, `closures-escaping-capture`, and `error-handling` are published and verified.
2. **Progression in Batch 2C**: Sixth and final topic in Batch 2C (Memory & Concurrency), concluding the Junior Level Wave 2 concurrency foundations.
