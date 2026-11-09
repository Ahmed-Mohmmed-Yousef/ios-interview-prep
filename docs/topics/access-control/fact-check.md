# Fact-Check — Access Control (Step 6)

Run 2026-11-09. Topic: `access-control` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/access-control/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/access-control/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Access Control](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol) and [SE-0386: Package Access Level](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0386-package-access-modifier.md).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Default access level | `internal` is applied by default to all declarations when no modifier is specified | Confirmed |
| `open` vs `public` | `open` allows subclassing and overriding outside defining module; `public` restricts subclassing/overriding to defining module | Confirmed |
| `package` modifier | Introduced in Swift 5.9 (SE-0386); shares code across targets within the same Swift package | Confirmed |
| `private` vs `fileprivate` | `private` visible in enclosing declaration and same-file extensions; `fileprivate` visible anywhere in the file | Confirmed |
| `private(set)` | Creates public or internal getter with private setter | Confirmed |
| Public struct memberwise initializer | Swift does NOT generate a public memberwise init for public structs; explicit `public init` is required | Confirmed |
| Access level consistency | No entity can be defined in terms of another entity with lower access level | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `structs-vs-classes`, which is published.
2. **Progression**: Sets up Topic 8: `closures-escaping-capture` (escaping closures, capture lists, weak references).
