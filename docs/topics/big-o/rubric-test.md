# Rubric Test — Big-O: Time and Space (Step 5)

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
| **q24** Big-O definition and importance | **Good:** Explains Big-O describes upper bound of time/memory growth as input size increases; ignores constants and smaller terms; interviewers evaluate scalability on large inputs. | 100 | Yes | Pass (100%) |
| | **Average:** "Big-O describes how fast an algorithm runs as data grows, so interviewers know if code is fast." (Misses constants/simplification detail). | 70 | Yes | Pass (70%) |
| | **Weak:** "Big-O measures the exact milliseconds an app takes to start up." | 0 | No | Fail (0%) |
| **q25** time vs space complexity | **Good:** Defines time complexity as operation growth rate; space complexity as auxiliary memory allocated; mentions auxiliary collections and recursive call stack frames. | 100 | Yes | Pass (100%) |
| | **Average:** "Time complexity is how long code takes, and space complexity is how much RAM it uses." (Misses call stack and auxiliary distinction). | 80 | Yes | Pass (80%) |
| | **Weak:** "Time complexity is for loops and space complexity is for hard drive storage." | 0 | No | Fail (0%) |
| **q26** string.isEmpty vs string.count == 0 | **Good:** Explains string.isEmpty is O(1) constant time because it checks startIndex == endIndex; string.count is O(n) linear time because characters are extended grapheme clusters requiring Unicode scalar traversal. | 100 | Yes | Pass (100%) |
| | **Average:** "isEmpty is O(1) while count is O(n), so isEmpty is much faster." (Misses extended grapheme cluster explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "count == 0 is faster because comparing numbers is faster than booleans." | 0 | No | Fail (0%) |
| **q27** contains in loop and Set optimization | **Good:** Explains array.contains is O(n) linear search, causing nested iterations to multiply into O(n^2); converting to Set provides O(1) average lookups; total optimized runtime is O(n). | 100 | Yes | Pass (100%) |
| | **Average:** "contains in a loop is slow because both are loops; use a Set to make it faster." (Misses O(1) vs O(n) lookup explanation). | 70 | Yes | Pass (70%) |
| | **Weak:** "Use a while loop instead of for-in to reduce time complexity." | 0 | No | Fail (0%) |
| **q28** recursion stack space and iterative loops | **Good:** Explains each recursive call pushes a stack frame to call stack; depth of n uses O(n) memory, risking stack overflow; rewriting iteratively with a loop reduces auxiliary space to O(1). | 100 | Yes | Pass (100%) |
| | **Average:** "Recursion uses memory because of function calls on the stack, which can crash if too deep." (Misses iterative loop refactoring suggestion). | 70 | Yes | Pass (70%) |
| | **Weak:** "Recursion uses O(1) memory if you pass arguments by value." | 0 | No | Fail (0%) |
| **q29** linearContains code-write | **Good:** Model answer: func linearContains(_ array: [Int], target: Int) -> Bool with single loop, returns true on match, false at end; prints true for [10, 20, 30] target 20. | 100 | Yes | Pass (100%) |
| | **Average:** Uses array.contains(target) instead of implementing loop as requested in prompt. | 50 (capped) | No (manual loop missed) | Fail (50%) |
| | **Weak:** Does not return a Boolean or fails compilation. | 20 | No | Fail (20%) |
| **q30** hasDuplicates using Set code-write | **Good:** Model answer: func hasDuplicates(_ array: [Int]) -> Bool with Set<Int>, checks seen.contains(element), inserts, returns false at end; prints true for [1, 2, 3, 2]. | 100 | Yes | Pass (100%) |
| | **Average:** Uses nested loops over array instead of Set, resulting in O(n^2) instead of requested O(n). | 50 (capped) | No (Set check missed) | Fail (50%) |
| | **Weak:** Compares only adjacent elements in an unsorted array. | 25 | No | Fail (25%) |
| **q31** makeSquares with reserveCapacity code-write | **Good:** Model answer: func makeSquares(_ array: [Int]) -> [Int] with result.reserveCapacity(array.count), appends squares, returns result; prints [4, 9, 16] for [2, 3, 4]. | 100 | Yes | Pass (100%) |
| | **Average:** Appends squared elements in O(n) time but omits reserveCapacity preallocation call. | 75 | Yes | Pass (75%) |
| | **Weak:** Modifies input array in place without returning new array. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify essential comprehension of asymptotic complexity analysis (Big-O growth rates, drop constants/minor terms, worst-case reasoning).
2. Distinguish operational runtime from auxiliary space and recursive call stack allocations.
3. Validate understanding of Swift-specific collection performance nuances (`String.count` vs `String.isEmpty`, `Array.insert(at: 0)` vs `Array.append`, and `Set` $O(1)$ lookups).
4. Accurately differentiate between good, average, and failing implementations in code-writing tasks.
