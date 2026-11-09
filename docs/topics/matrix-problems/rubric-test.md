# Rubric Test — Matrix Problems (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** `matrix.isEmpty` check before `matrix[0].count` | **Good:** Explains index 0 access on an empty array triggers a runtime out-of-bounds crash; reading column count requires at least one row; guard protects edge cases safely. | 100 | Yes | Pass (100%) |
| | **Average:** "If the matrix has no elements, accessing index 0 crashes your app. You must check isEmpty first." (Misses explicit column length connection). | 80 | Yes | Pass (80%) |
| | **Weak:** "Empty matrices take up too much memory so Swift throws an error." | 0 | No | Fail (0%) |
| **q25** direction vectors in grid neighbor traversal | **Good:** Explains direction vectors store delta pairs `(dr, dc)` for adjacent cells; iterating replaces four manual if-blocks with one clean loop; adds bounds checks inside the loop. | 100 | Yes | Pass (100%) |
| | **Average:** "Direction vectors store moves like (-1,0) and (0,1) so you can use a for-loop instead of writing four if statements." (Misses coordinate addition or bounds check detail). | 70 | Yes | Pass (70%) |
| | **Weak:** "Direction vectors sort the grid rows in ascending order." | 0 | No | Fail (0%) |
| **q26** in-place 90-degree clockwise rotation | **Good:** Identifies step one as transposing across the main diagonal (`matrix[r][c]` with `matrix[c][r]` for `c > r`); step two as reversing each row horizontally; achieves O(1) space. | 100 | Yes | Pass (100%) |
| | **Average:** "First transpose the matrix across its diagonal, and then reverse all the rows to turn it 90 degrees." (Misses index condition `c > r` or auxiliary space statement). | 80 | Yes | Pass (80%) |
| | **Weak:** "Rotate by shifting all numbers in the first column to the last column." | 0 | No | Fail (0%) |
| **q27** Depth-First Search vs Breadth-First Search | **Good:** Describes DFS for depth exploration, connected components, and flood fill; describes BFS for layer-by-layer shortest path queries; mentions stack/recursion vs explicit queue. | 100 | Yes | Pass (100%) |
| | **Average:** "Use DFS for counting islands and BFS for finding the shortest path on a grid." (Misses mention of queue vs stack/recursion mechanics). | 80 | Yes | Pass (80%) |
| | **Weak:** "DFS is for 1D arrays while BFS is for 2D arrays." | 0 | No | Fail (0%) |
| **q28** row-major vs column-major iteration performance | **Good:** Explains row traversal accesses contiguous row buffers; enables hardware prefetching and CPU cache hits; column traversal jumps between separate buffers causing cache misses. | 100 | Yes | Pass (100%) |
| | **Average:** "Row by row is faster because memory is stored sequentially in each row, giving better cache performance than jumping columns." (Misses prefetcher or separate buffer allocation detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Swift executes row loops on the GPU and column loops on the CPU." | 0 | No | Fail (0%) |
| **q29** `floodFill` code-write | **Good:** Model answer checking bounds, guarding against `startColor == newColor`, implementing recursive DFS with direction vectors, and mutating image in place. | 100 | Yes | Pass (100%) |
| | **Average:** Recolor works but forgets to guard against `startColor == newColor`, which causes infinite recursion when newColor matches startColor. | 70 | Yes | Pass (70%) |
| | **Weak:** Overwrites entire matrix with `newColor` without DFS traversal. | 30 | No | Fail (30%) |
| **q30** `rotateSquareMatrix` code-write | **Good:** Model answer transposing across main diagonal (`for c in (r + 1)..<n`) and reversing each row (`matrix[r].reverse()`) with O(1) auxiliary space. | 100 | Yes | Pass (100%) |
| | **Average:** Allocates a second result matrix `let res = matrix` and assigns coordinates, functioning correctly but failing O(1) in-place requirement. | 85 | Yes | Pass (85%) |
| | **Weak:** Transposes twice across the diagonal, leaving the matrix in its original orientation. | 50 (capped) | No (clockwise rotation missed) | Fail (50%) |
| **q31** `diagonalSum` code-write | **Good:** Model answer iterating `0..<n`, adding `mat[i][i]` and `mat[i][n - 1 - i]`, and subtracting center element `mat[n / 2][n / 2]` when `n % 2 == 1`. | 100 | Yes | Pass (100%) |
| | **Average:** Sums both diagonals correctly but forgets to subtract the center element on odd-sized matrices, counting the intersection twice. | 70 | Yes | Pass (70%) |
| | **Weak:** Sums only the first row and first column. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Differentiate understanding between empty matrix edge-case guards and runtime crashes.
2. Verify knowledge of direction vectors and coordinate bounds checks.
3. Assess comprehension of two-phase matrix rotation (transposition followed by row reversal).
4. Confirm trade-offs between recursive DFS exploration and level-order BFS shortest path searches.
5. Evaluate understanding of memory cache locality and row-major layout in Swift arrays.
6. Accurately score implementation correctness for flood fill, in-place rotation, and diagonal arithmetic.
