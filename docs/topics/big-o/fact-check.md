# Fact-Check — Big-O: Time and Space (Step 6)

Run 2026-11-09. Topic: `big-o` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/big-o/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/big-o/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array), [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string), and [apple/swift-algorithms](https://github.com/apple/swift-algorithms).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, valid `<Trap>` blocks, `<TryIt>` link, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Array random access | `array[index]` runs in $\mathcal{O}(1)$ constant time | Confirmed |
| Array append amortized | `array.append(element)` runs in amortized $\mathcal{O}(1)$ time | Confirmed |
| Array insert at 0 | `array.insert(element, at: 0)` shifts elements in memory ($\mathcal{O}(n)$) | Confirmed |
| `String.isEmpty` vs `count == 0` | `isEmpty` checks indices in $\mathcal{O}(1)$ time; `count` traverses extended grapheme clusters in $\mathcal{O}(n)$ time | Confirmed |
| Set lookup complexity | `set.contains(element)` operates in $\mathcal{O}(1)$ average time | Confirmed |
| Linear search complexity | Iterating over array of size $n$ takes $\mathcal{O}(n)$ time | Confirmed |
| Quadratic nested loops | Two nested loops of size $n$ take $\mathcal{O}(n^2)$ iterations | Confirmed |
| Binary search complexity | Halving search space requires $\mathcal{O}(\log n)$ comparisons | Confirmed |
| Array sorting complexity | Swift `array.sorted()` guarantees $\mathcal{O}(n \log n)$ time | Confirmed |
| Space complexity of recursion | Recursion to depth $n$ allocates $\mathcal{O}(n)$ call stack frames | Confirmed |
| `reserveCapacity` optimization | Preallocating storage prevents intermediate memory reallocations | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `functions`, which is published.
2. **Progression in Batch 1C**: `big-o` is the first topic in the Coding Interview unit for Fresh level, establishing the vocabulary and complexity foundation needed for subsequent topics (`arrays-and-strings` and `hash-tables`).
