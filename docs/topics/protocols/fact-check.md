# Fact-Check — Protocols (Step 6)

Run 2026-11-09. Topic: `protocols` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/protocols/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/protocols/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols) and [Swift Standard Library: Identifiable](https://developer.apple.com/documentation/swift/identifiable).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Protocol conformance across types | Structs, enums, and classes can conform to protocols | Confirmed |
| `{ get }` satisfaction | Constant `let` property satisfies read-only `{ get }` | Confirmed |
| `{ get set }` requirement | Demands mutable `var` or read-write computed property | Confirmed |
| `mutating` on value types | Structs modifying `self` must have `mutating` on protocol method | Confirmed |
| Class omitting `mutating` | Classes conform to `mutating func` without writing `mutating` | Confirmed |
| `AnyObject` for delegates | Class-only protocol allows `weak var delegate: MyDelegate?` | Confirmed |
| Non-final class initializers | Protocol initializers on non-final classes require `required` keyword | Confirmed |
| Explicit existential `any` | Swift 6 requires explicit `any Protocol` for existential containers | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `methods-and-initialization`, which is completed.
2. **Progression**: Sets up Topic 5: `extensions` (protocol extensions and default implementations) and Topic 6: `generics-basics`.
