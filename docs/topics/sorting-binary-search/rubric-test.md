# Rubric Test — Sorting and Binary Search (Step 5)

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
| **q24** `sort()` vs `sorted()` mutability & memory | **Good:** Explains sort() mutates array in-place returning Void on var, while sorted() returns a new array for let; notes sorted() allocates O(n) memory. | 100 | Yes | Pass (100%) |
| | **Average:** "sort() modifies the array directly while sorted() returns a new sorted array. You need var for sort()." (Misses O(n) memory allocation detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "sort() is faster because it uses threads." | 0 | No | Fail (0%) |
| **q25** O(log n) division & unsorted array behavior | **Good:** Explains repeated halving of search space yields O(log n); compares target to mid element to branch; unsorted array breaks ordering and discards valid candidates arbitrarily. | 100 | Yes | Pass (100%) |
| | **Average:** "Each step cuts the array in half to give O(log n) time. An unsorted array returns wrong answers." (Misses explicit mid comparison explanation). | 70 | Yes | Pass (70%) |
| | **Weak:** "Binary search uses a hash table to jump directly to the target." | 0 | No | Fail (0%) |
| **q26** midpoint calculation & pointer update traps | **Good:** Explains low + high can overflow fixed-width integers; low + (high - low)/2 avoids overflow via subtraction; setting low = mid creates infinite loops when adjacent. | 100 | Yes | Pass (100%) |
| | **Average:** "Adding low and high can cause integer overflow, so subtracting first is safer. Setting low = mid can loop forever." (Misses adjacent element integer truncation mechanism). | 80 | Yes | Pass (80%) |
| | **Weak:** "The formula is required for SwiftUI animation interpolation." | 0 | No | Fail (0%) |
| **q27** sorting stability & multi-key sorting | **Good:** Defines stability as preserving original relative order for equal keys; confirms Swift standard sorts guarantee stability; provides multi-level contact sorting scenario. | 100 | Yes | Pass (100%) |
| | **Average:** "Stability means elements with the same key stay in their original order. Swift sort is stable." (Misses practical iOS multi-level sorting example). | 80 | Yes | Pass (80%) |
| | **Weak:** "Stable sorting means the array never triggers thread race conditions." | 0 | No | Fail (0%) |
| **q28** strict weak ordering & `<=` pitfall | **Good:** Explains comparator must return false for equal items (irreflexivity); `<=` returns true, breaking strict weak ordering; causes corrupted order, non-termination, or assertion crashes. | 100 | Yes | Pass (100%) |
| | **Average:** "You must use < instead of <= because equal elements should not return true, which breaks sorting." (Misses crash or non-termination consequence details). | 80 | Yes | Pass (80%) |
| | **Weak:** "<= makes the sort run in reverse order." | 0 | No | Fail (0%) |
| **q29** `binarySearchIndex` implementation | **Good:** Model answer with `while low <= high`, midpoint subtraction, equality return, pointer adjustments, and nil on miss. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `(low + high) / 2` midpoint calculation instead of overflow-safe formula. | 85 | Yes | Pass (85%) |
| | **Weak:** Uses linear scan with `for (i, v) in array.enumerated()`. | 30 (capped) | No (binary search missed) | Fail (30%) |
| **q30** `findFirstOccurrence` with duplicates | **Good:** Model answer continuing search with `high = mid - 1` upon match and recording `result = mid`. | 100 | Yes | Pass (100%) |
| | **Average:** Returns `mid` immediately on match instead of searching earlier duplicate occurrences. | 50 (capped) | No (duplicate lower bound missed) | Fail (50%) |
| | **Weak:** Returns the first element of the array without searching. | 0 | No | Fail (0%) |
| **q31** `sortPeople` multi-criteria sorting | **Good:** Model answer checking primary age inequality and falling back to secondary name comparison with `<`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements tuple sorting using `<=`, violating strict weak ordering. | 80 | Yes | Pass (80%) |
| | **Weak:** Returns the unsorted people array without applying sorting. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Differentiate understanding of in-place vs returning sorting methods and memory impact.
2. Verify knowledge of logarithmic search mechanics, midpoint overflow protection, and pointer progression rules.
3. Assess comprehension of sorting stability and the strict weak ordering contract.
4. Evaluate code implementations for standard binary search, duplicate boundary searching, and multi-criteria sorting.
