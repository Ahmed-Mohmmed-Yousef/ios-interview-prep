# Fact-Check — @State and @Binding (Step 6)

Run 2026-11-09. Topic: `state-and-binding` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/state-and-binding/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/state-and-binding/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: State](https://developer.apple.com/documentation/swiftui/state), [Apple Developer Documentation: Binding](https://developer.apple.com/documentation/swiftui/binding), and [Apple Developer Documentation: Managing user interface state](https://developer.apple.com/documentation/swiftui/managing-user-interface-state).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| @State persistence | Value survives struct recreation in separate persistent memory | Confirmed |
| @Binding zero storage | Acts as a direct pointer without allocating independent data storage | Confirmed |
| Projected value ($) | `$name` evaluates to `Binding<String>` for `@State var name: String` | Confirmed |
| Invalidation on mutation | Writing to state or binding invalidates view and schedules body call | Confirmed |
| Binding.constant | Provides immutable mock binding for canvas previews and tests | Confirmed |
| State in custom init | Initializing `@State` in custom `init` does not respond to parent updates | Confirmed |
| Custom Binding(get:set:) | Compiles and executes custom getter and setter logic cleanly | Confirmed |
| Encapsulation best practice | Apple recommends marking all `@State` properties as `private` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `swiftui-views-modifiers` and `properties`, both of which are verified and published.
2. **Progression in Batch 1D**: `state-and-binding` introduces dynamic interactivity, which is immediately utilized in the following topic, `swiftui-lists`, for collection-based UI and selection bindings.
