# Fact-Check — Logging with OSLog (Step 6)

Run 2026-11-09. Topic: `logging-oslog` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/logging-oslog/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/logging-oslog/questions.json`.
- **Official Documentation**:
  - Verified against [Logging (os)](https://developer.apple.com/documentation/os/logging) and [Logger (os)](https://developer.apple.com/documentation/os/logger).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `os.Logger` Framework | `Logger` is imported from `os` and initialized with `subsystem` and `category` | Confirmed |
| Deferred String Interpolation | String interpolation in OSLog is skipped if the log level is disabled | Confirmed |
| Privacy by Default | Dynamic strings/objects are masked as `<private>` in release builds; scalars are public | Confirmed |
| Privacy Annotations | `privacy: .public` and `privacy: .private(mask: .hash)` explicitly control redaction | Confirmed |
| Five Log Levels | `debug`, `info`, `notice`, `error`, `fault` represent increasing severity | Confirmed |
| Fault Stack Capture | `logger.fault()` automatically captures call stack frames for diagnostic reports | Confirmed |
| `print()` vs `Logger` | `print()` performs synchronous I/O and leaks plaintext PII in release builds | Confirmed |
| OSLogStore API | `OSLogStore` provides programmatic access to recent unified logs in code | Confirmed |
| Sendable Conformance | `Logger` conforms to `Sendable` in Swift 6, allowing safe cross-actor usage | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `debugging-lldb` is confirmed as published prerequisite.
2. **Progression in Batch 2F**: Fifth topic in Batch 2F (Architecture & Testing).
