# Fact-Check — Properties (Step 6)

Run 2026-11-09. Topic: `properties` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/properties/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/properties/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Properties](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Stored properties in structs & classes | Store values directly in instance memory | Confirmed |
| Constant struct property immutability | `let s = Struct(); s.varProp = 1` fails compile time (`cannot assign to property: 's' is a 'let' constant`) | Confirmed |
| Constant class property mutability | `let c = Class(); c.varProp = 1` compiles and mutates heap object | Confirmed |
| Computed properties | Provide getter/setter without storing instance memory | Confirmed |
| Computed property with `let` error | `let area: Double { ... }` fails compile time (`'let' declarations cannot be computed properties`) | Confirmed |
| Lazy property with `let` error | `lazy let x = 1` fails compile time (`'lazy' cannot be used on a let`) | Confirmed |
| Lazy initialization deferral | Lazy property closure does not execute until first read access | Confirmed |
| Property observers timing | `willSet` fires before storage (`newValue`); `didSet` fires after storage (`oldValue`) | Confirmed |
| Observer suppression during init | Initializing property in `init` suppresses `willSet` and `didSet` | Confirmed |
| Self-assignment in `didSet` | Mutating property inside `didSet` updates value without triggering recursive `didSet` | Confirmed |
| Type properties | `static let` is lazily initialized on first access and thread-safe | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `structs-vs-classes`, which was verified and published.
2. **Progression in Batch 1B**: `properties` builds directly on `closures-basics` and `enumerations`, preparing learners for `methods-and-initialization`.
