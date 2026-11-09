# Fact-Check — Arrays and Strings (Step 6)

Run 2026-11-09. Topic: `arrays-and-strings` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/arrays-and-strings/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/arrays-and-strings/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array) and [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, valid `<Trap>` blocks, `<TryIt>` link, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| In-place swap | `array.swapAt(i, j)` runs in $\mathcal{O}(1)$ time without extra memory | Confirmed |
| Two-pointer array reversal | In-place swaps from both ends take $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space | Confirmed |
| Palindrome verification | Comparing characters symmetrically detects palindromes in $\mathcal{O}(n)$ time | Confirmed |
| ArraySlice indexing behavior | Slices retain original indices; accessing `slice[0]` on a slice starting after index 0 crashes | Confirmed |
| Integer string indexing restriction | Subscripting a String directly with an Int fails compilation | Confirmed |
| `Array(string)` character array | Converts String to `[Character]`, enabling integer indexing and fast swaps | Confirmed |
| Fast and slow pointer deduplication | Mutates array in place in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space | Confirmed |
| Sliding window range sum | Adding incoming and subtracting outgoing item updates sum in $\mathcal{O}(1)$ time | Confirmed |
| `reverse()` vs `reversed()` | `reverse()` mutates in place; `reversed()` returns a lazy wrapper | Confirmed |
| Substring / ArraySlice memory retention | Slices share memory buffers with parent collections until converted | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `big-o`, `collections`, and `strings-and-characters`, all of which are verified and published.
2. **Progression in Batch 1C**: `arrays-and-strings` builds directly on the asymptotic analysis taught in `big-o` and prepares the learner for the final Coding Interview topic in Fresh level: `hash-tables`.
