# Fact-Check — Stacks and Layout (Step 6)

Run 2026-11-09. Topic: `swiftui-layout` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-layout/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/swiftui-layout/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Building layouts with stack views](https://developer.apple.com/documentation/swiftui/building-layouts-with-stack-views), [Apple Developer Documentation: VStack](https://developer.apple.com/documentation/swiftui/vstack), [Apple Developer Documentation: HStack](https://developer.apple.com/documentation/swiftui/hstack), and [Apple Developer Documentation: ZStack](https://developer.apple.com/documentation/swiftui/zstack).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| 3-step layout negotiation | Parent proposes, child decides size, parent positions child | Confirmed |
| Stack orientation | VStack arranges along Y; HStack along X; ZStack along Z | Confirmed |
| Spacer primary axis | Expands horizontally in HStack, vertically in VStack | Confirmed |
| Default stack spacing | Omitted spacing parameter applies adaptive platform HIG default | Confirmed |
| Frame bounds vs clipping | Frames define layout bounds; clipping requires `.clipped()` | Confirmed |
| Greedy frame expansion | `.frame(maxWidth: .infinity)` accepts all proposed space | Confirmed |
| Layout priority | `.layoutPriority(_:)` allocates space to high-priority views first | Confirmed |
| ZStack rendering order | Earlier declared views sit behind later declared views | Confirmed |
| Alignment guides | `.firstTextBaseline` aligns text by typographic baselines | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `swiftui-views-modifiers`, which is verified and published.
2. **Progression in Batch 1D**: `swiftui-layout` provides structural foundations for the next topic, `state-and-binding`, where view layouts become dynamic and interactive.
