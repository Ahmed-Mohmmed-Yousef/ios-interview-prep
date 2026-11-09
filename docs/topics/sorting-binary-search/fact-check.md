# Fact-Check — Sorting and Binary Search (Step 6)

Run 2026-11-09. Topic: `sorting-binary-search` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/sorting-binary-search/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/sorting-binary-search/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Array.sort()](https://developer.apple.com/documentation/swift/array/sort()), [Apple Developer Documentation: Array.sorted()](https://developer.apple.com/documentation/swift/array/sorted()), and [Apple Developer Documentation: Comparable](https://developer.apple.com/documentation/swift/comparable).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| In-place sorting | `Array.sort()` mutates mutable array in-place and returns `Void` | Confirmed |
| Returning sort | `Array.sorted()` returns a new array and leaves original unchanged | Confirmed |
| Sorting stability | Swift sorting guarantees stability for equal elements | Confirmed |
| Time complexity | `sort()` and `sorted()` operate in $\mathcal{O}(n \log n)$ comparisons | Confirmed |
| Strict weak ordering | Predicates returning `true` for equal values violate irreflexivity | Confirmed |
| Precondition of binary search | Requires input collection to be sorted monotonically | Confirmed |
| Logarithmic complexity | Binary search runs in $\mathcal{O}(\log n)$ time | Confirmed |
| Midpoint overflow | `low + (high - low) / 2` protects against fixed-width integer overflow | Confirmed |
| Pointer progression | `mid + 1` and `mid - 1` prevent infinite loops on adjacent bounds | Confirmed |
| Duplicate lower bound | Storing candidate index and setting `high = mid - 1` finds first occurrence | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `arrays-and-strings` is published and verified.
2. **Batch 2B Progression**: `sorting-binary-search` starts the Junior level Coding Interview Algorithms batch, laying foundation for `two-pointers-sliding-window`.
