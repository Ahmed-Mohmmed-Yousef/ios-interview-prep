# Fact-Check — Strong, Weak and Unowned (Step 6)

Run 2026-11-09. Topic: `strong-weak-unowned` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/strong-weak-unowned/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/strong-weak-unowned/questions.json`.
- **Official Documentation**:
  - Verified against [The Swift Programming Language: Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting) and [WWDC21: ARC in Swift: Basics and beyond](https://developer.apple.com/videos/play/wwdc2021/10216/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Strong reference count mutation | Strong references increment strong count by 1; weak and unowned do not increment strong count | Confirmed |
| Weak variable constraints | `weak let` causes a compile-time error; weak references must be mutable variables (`var`) and optionals (`?`) | Confirmed |
| Automatic nil zeroing | When the target of a weak reference deallocates, ARC automatically zeroes the pointer to `nil` | Confirmed |
| Unowned deallocated access trap | Unowned references are not zeroed on deallocation; accessing an unowned reference after target deallocation crashes with a runtime trap | Confirmed |
| Unowned as constant | Unowned references can be declared as constants using `unowned let` | Confirmed |
| Class-bound protocol constraint | Weak delegate properties require class-bound protocols conforming to `AnyObject` | Confirmed |
| Runtime side tables | Swift allocates side tables to manage weak reference counts and zeroing safely | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `arc-basics` and `optionals` are published and verified.
2. **Progression in Batch 2C**: Second topic in Unit 3 (Memory), leading directly to `retain-cycles`.
