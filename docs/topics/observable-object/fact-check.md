# Fact-Check — ObservableObject and @StateObject (Step 6)

Run 2026-11-09. Topic: `observable-object` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/observable-object/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/observable-object/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Migrating from ObservableObject to @Observable](https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro), [Apple Developer Documentation: ObservableObject](https://developer.apple.com/documentation/combine/observableobject), and [Apple Developer Documentation: StateObject](https://developer.apple.com/documentation/swiftui/stateobject).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `ObservableObject` protocol | Requires `objectWillChange` publisher; synthesized automatically by compiler | Confirmed |
| `@Published` timing | Emits on `willSet` before the wrapped property changes value | Confirmed |
| `@StateObject` lifecycle | Persists reference across view invalidations and parent reconstructs | Confirmed |
| `@ObservedObject` inline hazard | Re-instantiates model on every parent redraw, resetting view state | Confirmed |
| Coarse-grained invalidation | Any `@Published` change invalidates all observing views for the entire object | Confirmed |
| Manual `objectWillChange.send()` | Enables observation on custom setters without `@Published` | Confirmed |
| Struct restriction | `@Published` is restricted to class types conforming to `ObservableObject` | Confirmed |
| `@EnvironmentObject` crash hazard | Throws fatal exception if requested object is missing from environment | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `swiftui-observation` and `protocols` are published and verified.
2. **Progression in Batch 2D**: Second topic in Batch 2D (SwiftUI & UIKit), bridging modern Observation with legacy Combine-based SwiftUI architectures.
