# Fact-Check — How ARC Works (Step 6)

Run 2026-11-09. Topic: `arc-basics` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/arc-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/arc-basics/questions.json`.
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
| ARC targets reference types | Classes, actors, and closures use ARC; structs and enums are value types and do not use reference counts | Confirmed |
| Immediate deallocation at zero count | When strong reference count drops to 0, Swift immediately calls `deinit` and reclaims heap memory | Confirmed |
| Compile-time insertion | The compiler inserts retain and release calls into the binary; no background tracing garbage collector is involved | Confirmed |
| Synchronous `deinit` execution | `deinit` runs synchronously on the thread that releases the last reference | Confirmed |
| Structs with class members | A struct does not have a reference count, but copying the struct increments the reference count of any contained class property | Confirmed |
| Lexical lifetimes | Modern Swift keeps local variables alive until the end of their enclosing lexical scope | Confirmed |
| Multi-reference tracking | Reassigning or setting one reference to `nil` leaves the object alive as long as other strong references exist | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `structs-vs-classes` is published and verified.
2. **Progression in Batch 2C**: First topic in Unit 3 (Memory), laying the foundation for `strong-weak-unowned` and `retain-cycles`.
