# Rubric Test — Two Pointers and Sliding Window (Step 5)

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
| **q24** convergent vs fast/slow pointer patterns | **Good:** Explains convergent pointers start at ends moving inward (palindrome, sorted Two Sum); fast/slow pointers move same direction at different speeds (in-place duplicate removal). | 100 | Yes | Pass (100%) |
| | **Average:** "Convergent pointers start on opposite ends and move toward the center. Fast-and-slow pointers move in the same direction." (Misses concrete problem examples). | 80 | Yes | Pass (80%) |
| | **Weak:** "Both pointers move in opposite directions on random arrays." | 0 | No | Fail (0%) |
| **q25** fixed sliding window O(n) efficiency | **Good:** Explains sliding window updates sums in O(1) by subtracting outgoing and adding incoming values; nested loops recompute k items in O(n * k); achieves O(n) total time. | 100 | Yes | Pass (100%) |
| | **Average:** "Sliding window adds the new element and removes the old element in O(1) time to achieve O(n) runtime." (Misses comparison to O(n * k) nested loops). | 70 | Yes | Pass (70%) |
| | **Weak:** "Sliding window uses binary search on subarrays." | 0 | No | Fail (0%) |
| **q26** Swift String indexing trap & array conversion | **Good:** Explains String indices take O(n) due to variable-width grapheme clusters; looping with offsetBy creates accidental O(n^2) runtime; converts to Array(string) once for O(1) indexing. | 100 | Yes | Pass (100%) |
| | **Average:** "String indices in Swift take O(n) time, so calling offsetBy in a loop is slow. Convert to an Array of characters." (Misses explanation of grapheme clusters). | 80 | Yes | Pass (80%) |
| | **Weak:** "String indexing is slow because Swift uses ARC on integers." | 0 | No | Fail (0%) |
| **q27** dynamic sliding window amortized O(n) proof | **Good:** Explains both left and right pointers only move forward and never reset backward; each element enters and leaves window at most once, capping total steps at 2n; runs in amortized O(n). | 100 | Yes | Pass (100%) |
| | **Average:** "The while loop only shrinks elements that violate the rule, so each pointer moves at most n times." (Misses explicit 2n cap and amortized explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "The while loop runs in O(1) because compiler vectorizes it." | 0 | No | Fail (0%) |
| **q28** Container With Most Water shorter line rule | **Good:** Explains volume is width * min(height[left], height[right]); moving taller line reduces width without increasing height cap; only moving shorter pointer can find taller lines for larger area. | 100 | Yes | Pass (100%) |
| | **Average:** "The shorter line limits the area, so you have to move the shorter pointer to try to find a taller line." (Misses mathematical proof that moving taller line strictly shrinks width). | 70 | Yes | Pass (70%) |
| | **Weak:** "Moving the shorter line sorts the array." | 0 | No | Fail (0%) |
| **q29** `twoSumSortedIndices` code-write | **Good:** Model answer with `while left < right`, monotonic sum branches, returning `[left, right]` in O(n) time and empty array on miss. | 100 | Yes | Pass (100%) |
| | **Average:** Uses nested loops checking all pairs in O(n^2) instead of O(n) two pointers. | 50 (capped) | No (two pointer O(n) pattern missed) | Fail (50%) |
| | **Weak:** Returns single element matching target without checking pair sums. | 0 | No | Fail (0%) |
| **q30** `maxSlidingWindowSum` code-write | **Good:** Model answer guarding parameters, calculating initial k sum, and updating window in O(1) time per step to track maximum. | 100 | Yes | Pass (100%) |
| | **Average:** Sums entire slice `nums[i ..< i + k].reduce(0, +)` in the loop, taking O(n * k) time instead of O(1) updates. | 50 (capped) | No (O(1) sliding window update missed) | Fail (50%) |
| | **Weak:** Returns sum of all array elements. | 0 | No | Fail (0%) |
| **q31** `removeDuplicates` in-place code-write | **Good:** Model answer with `guard !nums.isEmpty`, slow write pointer, fast read loop, in-place overwrite, and returning unique count. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `Set(nums)` to filter duplicates and copies back to array, using O(n) space instead of O(1) in-place. | 50 (capped) | No (in-place two-pointer update missed) | Fail (50%) |
| | **Weak:** Returns array count without modifying duplicates. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Differentiate understanding between convergent (opposite ends) and runner (fast/slow) pointer strategies.
2. Verify mastery of O(1) window sliding arithmetic vs redundant nested recalculations.
3. Confirm awareness of Swift grapheme cluster index traversal traps and the `Array(string)` conversion technique.
4. Test mathematical reasoning behind amortized 2n pointer bounds and Container With Most Water bottleneck analysis.
5. Accurately score in-place pointer updates, window boundary shifts, and edge case guards.
