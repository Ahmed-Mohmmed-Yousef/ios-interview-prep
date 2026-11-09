# Fact-Check — Retain Cycles (Step 6)

Run 2026-11-09. Topic: `retain-cycles` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/retain-cycles/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/retain-cycles/questions.json`.
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
| Strong reference cycles cause leaks | Two objects strongly retaining each other never reach zero count; deinit never runs | Confirmed |
| Stored closure capture of self | A stored closure referencing `self` creates a retain cycle unless broken by `[weak self]` | Confirmed |
| Non-escaping closures do not cycle | Functions like `forEach`, `map`, and `filter` execute synchronously on stack without retaining `self` | Confirmed |
| Property access captures self | Referencing `self.property` implicitly captures the entire instance of `self` strongly | Confirmed |
| `guard let self` shadowing | Safely unwraps `weak self` and creates a temporary local strong reference for the closure duration | Confirmed |
| Delegate pattern cycle | Parent holding child strongly and child holding delegate strongly leaks unless delegate is weak | Confirmed |
| Xcode Memory Graph Debugger | Identifies object relationships and marks leaking circular cycles with purple warning badges | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `strong-weak-unowned`, `closures-escaping-capture`, and `protocols` are published and verified.
2. **Progression in Batch 2C**: Third topic in Unit 3 (Memory), concluding the junior memory core before moving to Unit 4 (Concurrency).
