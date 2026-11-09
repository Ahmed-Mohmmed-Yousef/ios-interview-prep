# Fact-Check — The Main Thread (Step 6)

Run 2026-11-09. Topic: `main-thread` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/main-thread/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/main-thread/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: MainActor](https://developer.apple.com/documentation/swift/mainactor), [Apple Developer Documentation: DispatchQueue.main](https://developer.apple.com/documentation/dispatch/dispatchqueue/main), and [Apple Developer Documentation: Diagnosing memory, thread, and crash issues early](https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Main thread handles UI | Run loop on thread 0 executes touches, layout passes, animations, and Core Animation commits | Confirmed |
| Non-thread-safe UIKit | UIKit views lack internal locking for performance; background mutations trigger data races | Confirmed |
| Display frame budget | 60Hz displays have a 16.6ms frame budget; 120Hz ProMotion displays have an 8.3ms frame budget | Confirmed |
| iOS watchdog crash | Watchdog kills processes blocking main thread for ~10s with exception code `0x8badf00d` | Confirmed |
| `DispatchQueue.main.sync` deadlock | Calling `sync` on main queue from main thread results in an instant deadlock | Confirmed |
| `@MainActor` compile-time safety | `@MainActor` enforces compile-time actor isolation, requiring `await` from non-main contexts | Confirmed |
| Main Thread Checker (MTC) | Xcode runtime diagnostic tool intercepting background UIKit calls with purple warnings | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `closures-basics` is published and verified.
2. **Progression in Batch 2C**: Fourth topic in Batch 2C, initiating Unit 4 (Concurrency) before `gcd-basics` and `async-await`.
