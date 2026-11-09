# Fact-Check — Inheritance (Step 6)

Run 2026-11-09. Topic: `inheritance` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/inheritance/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/inheritance/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Inheritance](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/inheritance) and [The Swift Programming Language: Initialization](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Class-only inheritance | Structs and enums cannot inherit; only classes can | Confirmed |
| Universal root absence | Pure Swift classes without superclasses are independent root classes | Confirmed |
| Mandatory `override` | Omitting `override` on superclass method is a build error | Confirmed |
| Invalid `override` | Writing `override` on non-inherited method is a build error | Confirmed |
| `super` method invocation | `super.makeNoise()` executes parent implementation | Confirmed |
| Property observer chaining | Superclass `didSet` runs before subclass `didSet` on mutation | Confirmed |
| `final` prevention | Subclassing a `final class` or overriding a `final` method fails compilation | Confirmed |
| Two-phase init order | Subclass stored properties must be initialized before calling `super.init()` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `methods-and-initialization`, which is completed and published.
2. **Progression**: Sets the foundation for Topic 3: `type-casting` (`is`, `as?`, `as!`, and downcasting across class hierarchies).
