# Fact-Check — Generics: Associated Types and Where Clauses (Step 6)

Run 2026-11-09. Topic: `generics-associated-types` (mid). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/generics-associated-types/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/generics-associated-types/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Generics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/generics) and [WWDC22: Embrace Swift generics](https://developer.apple.com/videos/play/wwdc2022/110352/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `associatedtype` keyword | Used inside protocol definitions to specify placeholder types | Confirmed |
| Compiler type inference | Conforming types automatically bind associated types from method signatures or properties | Confirmed |
| Associated type constraints | `associatedtype Item: Equatable` or `associatedtype Value: Numeric` enforced at compile time | Confirmed |
| Generic `where` clauses | Valid on functions, initializers, types, and protocol extensions | Confirmed |
| Type equality with `==` | `where C1.Item == C2.Item` enforces identical types across parameters | Confirmed |
| Constrained extensions | Extension methods with `where` clauses only exist on types matching the constraint | Confirmed |
| Primary associated types | `protocol Collection<Element>` enables `some Collection<String>` in Swift 5.7+ / 6.x | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `generics-basics`, which was published in Wave 2.
2. **Progression**: Unlocks `opaque-and-boxed-types` (Topic 3 in this batch).
