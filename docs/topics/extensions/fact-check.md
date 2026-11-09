# Fact-Check — Extensions (Step 6)

Run 2026-11-09. Topic: `extensions` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/extensions/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/extensions/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Extensions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/extensions) and [WWDC: Protocol-Oriented Programming in Swift](https://developer.apple.com/videos/play/wwdc2015/408/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Computed properties in extensions | `extension Double { var km: Double ... }` works on standard types | Confirmed |
| Preserving struct memberwise init | Custom `init` in extension keeps automatic `init(width:height:)` | Confirmed |
| Stored property restriction | Extensions cannot add stored properties (enforced at compile time) | Confirmed |
| Protocol default implementations | Conforming types inherit defaults from protocol extensions | Confirmed |
| Dynamic vs static protocol dispatch | Blueprint methods override dynamically; extension-only methods dispatch statically | Confirmed |
| Class initializers in extensions | Class extensions are limited to convenience initializers | Confirmed |
| Overriding restriction | Extensions cannot override existing class methods | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `protocols`, which is completed and published.
2. **Progression**: Sets up Topic 6: `generics-basics` (generic functions, generic types, and type constraints).
