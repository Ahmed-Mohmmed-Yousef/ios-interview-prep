# Fact-Check — Enumerations (Step 6)

Run 2026-11-09. Topic: `enumerations` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/enumerations/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/enumerations/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Enumerations](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| First-class values without integers | Enum cases have no integer values unless raw type is declared | Confirmed |
| Exhaustive pattern matching | Switch must cover all cases or provide default branch | Confirmed |
| Associated values | Cases store different types and payloads per instance | Confirmed |
| Pattern matching extraction | Values extracted using `case .caseName(let value):` or `case let .caseName(value):` | Confirmed |
| Raw values auto-increment | Int raw values increment by 1 from previous value (defaults to 0 or explicit start) | Confirmed |
| String raw values default | String raw values default to case name text | Confirmed |
| Failable raw initializer | `init?(rawValue:)` returns an Optional (`Enum?`) | Confirmed |
| No stored properties in enums | `var x: Int = 1` inside enum fails compile time (`enums must not contain stored properties`) | Confirmed |
| Mutually exclusive rule | Raw type with associated values fails compile time (`enum with raw type cannot have cases with arguments`) | Confirmed |
| Computed properties & methods | Enums support computed properties and methods switching on `self` | Confirmed |
| Value type semantics | Enums are copied on assignment | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `control-flow`, which was verified and published.
2. **Progression in Batch 1B**: `enumerations` follows `closures-basics` and provides essential modeling concepts for subsequent topics (`properties`, `methods-and-initialization`, and `error-handling`).
