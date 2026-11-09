# Fact-Check — Unit Tests (Step 6)

Run 2026-11-09. Topic: `unit-testing` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/unit-testing/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/unit-testing/questions.json`.
- **Official Documentation**:
  - Verified against [Swift Testing Documentation](https://developer.apple.com/documentation/testing), [Migrating a test from XCTest](https://developer.apple.com/documentation/testing/migratingfromxctest), and [Testing Your Code in Practice (WWDC24)](https://developer.apple.com/videos/play/wwdc2024/10179).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler & official docs

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Swift Testing Architecture | `@Test` and `@Suite` macros attach to structs, classes, or actors without subclassing | Confirmed |
| Non-Halting Assertions | `#expect(...)` records failure without halting execution | Confirmed |
| Halting Assertions | `try #require(...)` records failure and throws to stop the current test immediately | Confirmed |
| Optional Unwrapping Hazard | Using `#expect` before force-unwrapping optionals crashes test runner on nil; `try #require` safely halts | Confirmed |
| Parallel by Default | Swift Testing runs independent tests in parallel by default to surface race conditions | Confirmed |
| Lifecycle Management | Swift Testing uses standard Swift `init()` and `deinit` for per-test setup and teardown | Confirmed |
| Test Doubles | Protocols with Dependency Injection isolate tests from network and database dependencies | Confirmed |
| Stub vs Spy vs Mock | Stubs provide canned data; spies record calls/args; mocks enforce strict behavioral expectations | Confirmed |
| Parameterized Tests | `@Test(arguments: [...])` evaluates collections of inputs declaratively | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `logging-oslog` is confirmed as published prerequisite.
2. **Progression in Batch 2F**: Final topic in Batch 2F (Architecture & Testing) and final topic of Junior Level Wave 2 (45 topics total).
