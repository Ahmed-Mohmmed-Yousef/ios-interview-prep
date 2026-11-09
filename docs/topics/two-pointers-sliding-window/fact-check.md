# Fact-Check — Two Pointers and Sliding Window (Step 6)

Run 2026-11-09. Topic: `two-pointers-sliding-window` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/two-pointers-sliding-window/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/two-pointers-sliding-window/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array), [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string), and [Apple Developer Documentation: Collection](https://developer.apple.com/documentation/swift/collection).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Convergent Two Sum | Opposing pointers on sorted array find target pair in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space | Confirmed |
| Monotonic ordering precondition | Two-pointer pair search requires sorted input; fails on unsorted arrays | Confirmed |
| Fast and slow runner pointers | Reader and writer pointers remove duplicates in-place in a single pass | Confirmed |
| Fixed window calculation | Adding incoming and subtracting outgoing element updates sum in $\mathcal{O}(1)$ time | Confirmed |
| Inclusive window length | Number of elements between `left` and `right` inclusive is `right - left + 1` | Confirmed |
| Amortized dynamic window | Inner `while` loop has amortized $\mathcal{O}(n)$ time because pointers never move backward | Confirmed |
| Swift String indexing cost | `string.index(_:offsetBy:)` takes $\mathcal{O}(n)$ time due to variable grapheme clusters | Confirmed |
| Character array optimization | `Array(string)` produces contiguous memory with $\mathcal{O}(1)$ random-access indexing | Confirmed |
| Container With Most Water logic | Moving the shorter line is required because area is bounded by `min(h[l], h[r])` | Confirmed |
| In-place mutation memory | Modifying `inout [Int]` with `swapAt` or subscript writes maintains $\mathcal{O}(1)$ auxiliary memory | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `arrays-and-strings` is published and verified.
2. **Progression in Batch 2B**: Follows `sorting-binary-search`, providing essential linear optimization patterns before introducing `stacks-and-queues`.
