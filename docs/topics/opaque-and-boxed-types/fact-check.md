# Fact-Check — Opaque and Boxed Types: some vs any (Step 6)

Run 2026-11-09. Topic: `opaque-and-boxed-types` (mid). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/opaque-and-boxed-types/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/opaque-and-boxed-types/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Opaque and Boxed Protocol Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes) and [WWDC22: Embrace Swift generics](https://developer.apple.com/videos/play/wwdc2022/110352/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `some Protocol` return semantics | Represents one fixed concrete type known to the compiler; all return statements in a function must return the same type | Confirmed |
| `any Protocol` existential semantics | Creates an existential container box holding any conforming type at runtime | Confirmed |
| Mixed collections | Heterogeneous collections with different conforming types require `[any Protocol]`; `[some Protocol]` is invalid for mixed types | Confirmed |
| `some` in parameter position | In Swift 5.7+, `func f(_ item: some P)` is syntactic sugar for generic `func f<T: P>(_ item: T)` | Confirmed |
| Existential unboxing | Swift 5.7+ automatically opens existentials when passed into generic or `some` parameters | Confirmed |
| Existential container layout | 3-word inline value buffer + type metadata pointer + witness table pointer | Confirmed |
| Swift 6 requirement | Swift 6 strictly enforces the `any` keyword before protocol types when used as existentials | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `generics-associated-types`, which is published.
2. **Progression**: Completes Topic 3 of Batch 3A. Prepares learners for `copy-on-write` and value semantics.
