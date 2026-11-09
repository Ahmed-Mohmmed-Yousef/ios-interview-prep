# Fact-Check — Views and Modifiers (Step 6)

Run 2026-11-09. Topic: `swiftui-views-modifiers` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-views-modifiers/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-views-modifiers/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: View](https://developer.apple.com/documentation/swiftui/view), [Apple Developer Documentation: Configuring Views](https://developer.apple.com/documentation/swiftui/configuring-views), and [Apple Developer Documentation: ViewModifier](https://developer.apple.com/documentation/swiftui/viewmodifier).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| View protocol structure | Requires computed `var body: some View` | Confirmed |
| Views are value types | Declaring views as structs compiles cleanly on stack | Confirmed |
| Modifiers wrap views | `Text("A").padding()` yields `ModifiedContent<Text, _PaddingLayout>` | Confirmed |
| Modifier order differentiation | `.padding().background(...)` vs `.background().padding()` produce distinct nested types | Confirmed |
| `some View` opaque type | Preserves concrete type safety while hiding generic wrappers | Confirmed |
| Custom ViewModifier | `struct CardStyle: ViewModifier` with `body(content:) -> some View` compiles | Confirmed |
| View dot-syntax extension | `extension View { func customStyle() -> some View }` compiles and chains | Confirmed |
| Color conforms to View | `Color.blue` is a valid view conforming to `View` | Confirmed |
| Memberwise initialization | Stored properties generate default initializers automatically | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `structs-vs-classes` and `swift-basics`, both of which are verified and published.
2. **Progression in Batch 1D**: `swiftui-views-modifiers` is the foundation of the SwiftUI unit. The subsequent topic `swiftui-layout` builds directly on view containers and stacks (`VStack`, `HStack`, `ZStack`).
