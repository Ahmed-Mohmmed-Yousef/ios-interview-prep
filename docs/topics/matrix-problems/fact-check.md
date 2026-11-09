# Fact-Check — Matrix Problems (Step 6)

Run 2026-11-09. Topic: `matrix-problems` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/matrix-problems/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/matrix-problems/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array) and [Apple Developer Documentation: Collection](https://developer.apple.com/documentation/swift/collection).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Index order `matrix[r][c]` | Outer array stores rows; inner array stores columns; access is strictly row then column | Confirmed |
| Empty matrix guard | Calling `matrix[0].count` on `[]` triggers an `index out of range` runtime crash; `guard !matrix.isEmpty` required | Confirmed |
| Direction vectors | `[(-1,0), (0,1), (1,0), (0,-1)]` cleanly navigates Up, Right, Down, Left | Confirmed |
| Bounds checking | Valid cells satisfy `r >= 0 && r < rows && c >= 0 && c < cols` | Confirmed |
| Matrix rotation | Transposing across diagonal (`c > r`) followed by horizontal row reversal rotates square matrices 90 degrees clockwise | Confirmed |
| Rectangular transpose limitation | Swapping `matrix[r][c]` with `matrix[c][r]` in-place on non-square matrices ($m \neq n$) causes out-of-bounds crashes | Confirmed |
| Visited tracking | Mutating cell in place or tracking in a visited set prevents infinite recursion loops during DFS/BFS | Confirmed |
| Cache locality | Row-by-row iteration reads contiguous row buffers, maximizing CPU cache hits compared to column-by-column iteration | Confirmed |
| Flat array mapping | Mapping index in row-major layout: `flatIndex = r * cols + c`; reverse: `r = flatIndex / cols`, `c = flatIndex % cols` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `arrays-and-strings` is published and verified.
2. **Progression in Batch 2B**: Sixth and final topic in Junior Coding Interview Algorithms, concluding Batch 2B.
