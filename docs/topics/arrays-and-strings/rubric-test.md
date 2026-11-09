# Rubric Test — Arrays and Strings (Step 5)

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
| **q24** two-pointer in-place array reversal | **Good:** Explains pointers start at 0 and count - 1; swap elements using swapAt and move inward; O(n) time and O(1) space with no extra array. | 100 | Yes | Pass (100%) |
| | **Average:** "Put one pointer at start and one at end, swap them inward until they meet." (Misses complexity mention). | 70 | Yes | Pass (70%) |
| | **Weak:** "Reverse an array by creating an empty array and appending from the end." | 30 (capped) | No (in-place missed) | Fail (30%) |
| **q25** integer string indexing & workaround | **Good:** Explains characters are extended grapheme clusters varying in byte size; String.Index required to resolve boundaries; Array(string) workaround provides [Character] with integer indices. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift strings do not support integer indexes, so convert the string to an array to index characters." (Misses grapheme cluster explanation). | 70 | Yes | Pass (70%) |
| | **Weak:** "Swift strings use linked lists so indexing is disabled." | 0 | No | Fail (0%) |
| **q26** ArraySlice indexing and slice[0] crash | **Good:** Explains ArraySlice is a view sharing memory with parent array; retains original indices rather than reindexing from 0; slice[0] crashes if slice starts after index 0. | 100 | Yes | Pass (100%) |
| | **Average:** "ArraySlice keeps the original indexes, so index 0 does not exist if the slice starts at 2." (Misses shared memory explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "ArraySlice crashes because structs cannot be sliced in Swift." | 0 | No | Fail (0%) |
| **q27** sliding window maximum sum in O(n) time | **Good:** Explains computing initial sum of first k items; slides by adding incoming and subtracting outgoing item; O(1) per step avoids recalculation and maintains O(n) total time. | 100 | Yes | Pass (100%) |
| | **Average:** "Add the next element and subtract the left element as you move the window to keep O(n) time." (Misses initial sum explanation). | 70 | Yes | Pass (70%) |
| | **Weak:** "Sort the array and take the last k elements." | 0 | No | Fail (0%) |
| **q28** Substring buffer retention and ARC release | **Good:** Explains slices share storage with parent buffers; holding a small slice keeps the entire large parent buffer in memory; converting to String/Array releases the parent buffer. | 100 | Yes | Pass (100%) |
| | **Average:** "Slices share memory with the original string, keeping it alive, so create a new String to free memory." (Misses ARC explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Slices cause strong reference cycles between structs." | 0 | No | Fail (0%) |
| **q29** reverseArrayInPlace code-write | **Good:** Model answer: func reverseArrayInPlace(_ numbers: inout [Int]) with while left < right, numbers.swapAt(left, right), left++, right--; prints [5, 4, 3, 2, 1]. | 100 | Yes | Pass (100%) |
| | **Average:** Uses numbers.reverse() built-in instead of manual two-pointer loop. | 50 (capped) | No (two pointers missed) | Fail (50%) |
| | **Weak:** Allocates a new array and returns it instead of mutating inout. | 25 | No | Fail (25%) |
| **q30** isPalindromeWord code-write | **Good:** Model answer: func isPalindromeWord(_ word: String) -> Bool with Array(word.lowercased()), two pointers comparing chars[l] == chars[r]; prints true for radar. | 100 | Yes | Pass (100%) |
| | **Average:** Compares word == String(word.reversed()) instead of manual two pointers. | 50 (capped) | No (two pointers missed) | Fail (50%) |
| | **Weak:** Returns false without comparing all characters. | 25 | No | Fail (25%) |
| **q31** maxConsecutiveSum code-write | **Good:** Model answer: func maxConsecutiveSum(_ numbers: [Int], k: Int) -> Int with guard, initial sum of k items, sliding loop adding incoming and subtracting outgoing; prints 9 for [1, 2, 3, 4, 5] k=2. | 100 | Yes | Pass (100%) |
| | **Average:** Calculates sum with nested loops (array[i..<i+k].reduce(0, +)), resulting in O(n * k) rather than O(n). | 50 (capped) | No (O(n) window missed) | Fail (50%) |
| | **Weak:** Only checks the first k elements without sliding across the array. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify proficiency with two-pointer techniques for in-place array manipulation and palindrome detection.
2. Confirm understanding of Swift-specific collection behaviors, including `String.Index` grapheme cluster mechanics and `ArraySlice` non-zero start indices.
3. Validate sliding window optimization from $O(n \cdot k)$ to $O(n)$ linear time.
4. Distinguish between memory-efficient in-place algorithms and naive buffer allocations in code-writing exercises.
