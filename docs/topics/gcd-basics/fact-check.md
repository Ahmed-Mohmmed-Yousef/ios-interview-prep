# Fact-Check — GCD Basics (Step 6)

Run 2026-11-09. Topic: `gcd-basics` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/gcd-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/gcd-basics/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Dispatch](https://developer.apple.com/documentation/dispatch), [Apple Developer Documentation: DispatchQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue), and [WWDC21: Swift concurrency: Behind the scenes](https://developer.apple.com/videos/play/wwdc2021/10254/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Serial queue FIFO execution | Tasks run one by one in submission order; next task starts only after previous completes | Confirmed |
| Concurrent queue parallel execution | Tasks start in FIFO order but execute simultaneously on multiple threads | Confirmed |
| Async non-blocking return | `async` schedules work and returns immediately without halting calling thread | Confirmed |
| Sync blocking wait | `sync` pauses calling thread until the submitted closure completes execution | Confirmed |
| Self-sync serial deadlock | Calling `sync` on the current serial queue halts thread indefinitely, deadlocking | Confirmed |
| QoS prioritization | `userInteractive`, `userInitiated`, `utility`, and `background` guide CPU priority | Confirmed |
| Thread explosion vs cooperative pool | GCD spawns excess threads when blocked; Swift Concurrency uses fixed cooperative pool | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `main-thread` and `closures-escaping-capture` are published and verified.
2. **Progression in Batch 2C**: Fifth topic in Batch 2C, setting up the direct transition to modern `async-await`.
