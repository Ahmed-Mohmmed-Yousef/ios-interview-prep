# Fact-Check — Communication Patterns (Step 6)

Run 2026-11-09. Topic: `communication-patterns` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/communication-patterns/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/communication-patterns/questions.json`.
- **Official Documentation**:
  - Verified against [The Swift Programming Language: Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols), [NotificationCenter (Foundation)](https://developer.apple.com/documentation/foundation/notificationcenter), and [The Swift Programming Language: Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Delegate Protocol AnyObject Constraint | Protocols must inherit from `AnyObject` for a `weak` reference property to compile in Swift | Confirmed |
| Strong Delegate Retain Cycle | Two objects holding strong references to each other will not deallocate under ARC | Confirmed |
| Escaping Closure Capture List | Escaping closures stored on an instance capture `self` strongly unless `[weak self]` is specified | Confirmed |
| NotificationCenter Synchronous Post | `NotificationCenter.default.post` delivers events synchronously on the thread of the caller | Confirmed |
| Block-Based Observer Token Cleanup | `addObserver(forName:object:queue:using:)` returns an `NSObjectProtocol` token requiring `removeObserver` | Confirmed |
| One-to-Many vs One-to-One Relationships | Delegates and closures are 1-to-1; NotificationCenter is 1-to-many broadcast | Confirmed |
| Two-Way Question Capability | Delegates can return values (e.g., Bool permission); NotificationCenter posts cannot receive return values | Confirmed |
| Modern AsyncSequence for Notifications | `NotificationCenter.default.notifications(named:)` supports Swift Concurrency `for await` loops | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `protocols` and `closures-escaping-capture` are confirmed as published prerequisites.
2. **Progression in Batch 2F**: First topic in Batch 2F (Architecture & Testing).
