# Rubric Test — Recursion (Step 5)

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
| **q24** base case vs recursive step mechanics | **Good:** Defines base case as stopping condition returning directly; defines recursive step as decomposing problem toward base case; missing base case causes infinite recursion and stack overflow. | 100 | Yes | Pass (100%) |
| | **Average:** "The base case stops the function, and the recursive step calls itself. Without a base case, the function crashes with a stack overflow." (Misses progression toward base case detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "The base case is where you initialize local arrays." | 0 | No | Fail (0%) |
| **q25** stack frame anatomy & call stack lifecycle | **Good:** Explains stack frames store parameters, local variables, return address; frames accumulate on call stack during growth; frames compute return values and pop in LIFO order during unwinding. | 100 | Yes | Pass (100%) |
| | **Average:** "Stack frames store local variables for each call on the stack. When the base case is hit, the stack unwinds and pops the frames." (Misses return address role). | 80 | Yes | Pass (80%) |
| | **Weak:** "Stack frames are heap objects managed by ARC retain counts." | 0 | No | Fail (0%) |
| **q26** memoization optimization from O(2^n) to O(n) | **Good:** Defines memoization as caching computed subproblem return values; prevents recalculating overlapping branches in O(2^n); passing a dictionary cache inout achieves O(n) linear time. | 100 | Yes | Pass (100%) |
| | **Average:** "Memoization caches results in a dictionary so you do not recalculate Fibonacci numbers multiple times, making it run in O(n) time." (Misses inout dictionary or cache table implementation detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Memoization sorts the recursive calls before running them." | 0 | No | Fail (0%) |
| **q27** Tail Call Optimization non-guarantee in Swift | **Good:** States Swift language specification does not guarantee TCO; debug builds, ABI, and ARC release cleanups prevent stack frame reuse; recommends rewriting deep recursion into iterative loops with explicit stack. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift does not guarantee tail call optimization, so if your recursion goes deep, rewrite it with a while loop." (Misses ARC and debug build causes for TCO failure). | 70 | Yes | Pass (70%) |
| | **Weak:** "Swift guarantees tail call optimization only on 64-bit devices." | 0 | No | Fail (0%) |
| **q28** recursive backtracking & state restoration | **Good:** Defines backtracking as building candidates incrementally and abandoning invalid paths; state changes must be undone before exploring alternative branches to keep shared buffers clean. | 100 | Yes | Pass (100%) |
| | **Average:** "Backtracking tries different choices recursively and removes the item when a path fails so other paths can try." (Misses formal incremental candidate construction definition). | 80 | Yes | Pass (80%) |
| | **Weak:** "Backtracking rewinds audio streams using circular buffers." | 0 | No | Fail (0%) |
| **q29** `factorial` code-write | **Good:** Model answer with `guard n > 1 else { return 1 }` base case and `return n * factorial(n - 1)`. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets to guard against `0` input, returning wrong result on `factorial(0)`. | 80 | Yes | Pass (80%) |
| | **Weak:** Calls `factorial(n)` without decrementing, creating an infinite loop. | 30 | No | Fail (30%) |
| **q30** `fibonacciMemoized` code-write | **Good:** Model answer with base cases `n <= 1`, cache checking `memo[n]`, recursive calculation with `&memo`, storing in `memo[n]`, and returning result. | 100 | Yes | Pass (100%) |
| | **Average:** Uses recursion without checking the cache dictionary, running in exponential O(2^n) time. | 50 (capped) | No (memoization check missed) | Fail (50%) |
| | **Weak:** Returns `n * fib(n - 1)`. | 0 | No | Fail (0%) |
| **q31** `isPalindromeRecursive` code-write | **Good:** Model answer with character array or bounds, base case `left >= right` returning true, mismatch returning false, and recursive `left + 1, right - 1`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `String(s.dropFirst().dropLast())` on each call, creating O(n^2) string slicing allocations instead of O(n) index pointers. | 80 | Yes | Pass (80%) |
| | **Weak:** Reverses string with built-in `.reversed()` without using recursion. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Differentiate understanding between base case termination rules and inductive recursive steps.
2. Verify knowledge of call stack allocation mechanics, frame lifecycles, and stack overflow limits on iOS.
3. Assess comprehension of memoization caching to convert exponential branching into linear O(n) complexity.
4. Confirm awareness of Swift compiler Tail Call Optimization non-guarantees and ARC cleanup impacts.
5. Accurately score implementation correctness for recursive mathematical functions, cache lookups, and palindrome verification.
