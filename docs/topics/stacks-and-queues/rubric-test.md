# Rubric Test — Stacks and Queues (Step 5)

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
| **q24** LIFO vs FIFO concepts & iOS examples | **Good:** Defines LIFO (Last-In First-Out) with UINavigationController view controller stack; defines FIFO (First-In First-Out) with GCD serial dispatch queues. | 100 | Yes | Pass (100%) |
| | **Average:** "LIFO means last in first out like an undo stack. FIFO means first in first out." (Misses concrete iOS example for FIFO). | 75 | Yes | Pass (75%) |
| | **Weak:** "LIFO and FIFO are algorithms for disk formatting." | 0 | No | Fail (0%) |
| **q25** Array.removeFirst() O(n) penalty & alternatives | **Good:** Explains contiguous array requires shifting subsequent elements left in O(n) time, creating O(n^2) dequeue loops; proposes two-stack queue and Apple's Deque as O(1) alternatives. | 100 | Yes | Pass (100%) |
| | **Average:** "removeFirst() is slow because it shifts all elements in memory taking O(n) time. You should use a Deque instead." (Misses O(n^2) dequeue cumulative penalty and second alternative). | 70 | Yes | Pass (70%) |
| | **Weak:** "removeFirst() is slow because Swift uses ARC on each array slot." | 0 | No | Fail (0%) |
| **q26** two-stack queue mechanics & amortized O(1) | **Good:** Explains inbox receives enqueued items, outbox delivers dequeued items; reversing order on outbox empty; each item transfers at most once for amortized O(1) operations. | 100 | Yes | Pass (100%) |
| | **Average:** "You push to inbox and pop from outbox. When outbox is empty, dump inbox into outbox." (Misses order reversal explanation and amortized single-transfer proof). | 50 (capped) | No (key order reversal detail missed) | Fail (50%) |
| | **Weak:** "The two stacks run on two concurrent background threads." | 0 | No | Fail (0%) |
| **q27** Valid Parentheses stack algorithm & edge cases | **Good:** Pushes opening brackets; pops on closing brackets and verifies matching type; returns false on mismatch or empty stack; checks stack.isEmpty at end for unclosed brackets. | 100 | Yes | Pass (100%) |
| | **Average:** "Push opening brackets to stack and pop when you see a closing bracket. Return true if brackets match." (Misses stack.isEmpty unclosed bracket check). | 80 | Yes | Pass (80%) |
| | **Weak:** "Count opening and closing brackets and check if counts are equal." | 30 | No | Fail (30%) |
| **q28** monotonic stack & Next Greater Element O(n) | **Good:** Defines monotonic stack as preserving sorted order; pops smaller elements when greater incoming value arrives; each item pushed once and popped at most once for O(n) time. | 100 | Yes | Pass (100%) |
| | **Average:** "A monotonic stack keeps items in order. You pop smaller items when a bigger number comes along." (Misses amortized O(n) push/pop proof). | 80 | Yes | Pass (80%) |
| | **Weak:** "Monotonic stacks sort numbers using recursive divide and conquer." | 0 | No | Fail (0%) |
| **q29** `isValidBracketString` code-write | **Good:** Model answer with matching dictionary, character iteration, popLast() matching checks, and `return stack.isEmpty`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `stack.removeLast()` without checking if stack is empty, risking runtime crash on unbalanced strings like `")"`. | 80 | Yes | Pass (80%) |
| | **Weak:** Returns `true` if text count is even without checking bracket pairs. | 0 | No | Fail (0%) |
| **q30** `StackQueue` two-stack implementation | **Good:** Model answer with private inbox/outbox arrays, O(1) enqueue, outbox transfer on empty, and accurate isEmpty computed property. | 100 | Yes | Pass (100%) |
| | **Average:** Transfers inbox to outbox on every dequeue call even when outbox is non-empty, destroying FIFO order. | 50 (capped) | No (proper outbox.isEmpty check missed) | Fail (50%) |
| | **Weak:** Implements queue using single array with `removeFirst()`. | 30 | No | Fail (30%) |
| **q31** `dailyTemperatures` monotonic stack | **Good:** Model answer maintaining index stack, popping smaller indices upon warmer days, computing `i - top`, and returning in O(n) time. | 100 | Yes | Pass (100%) |
| | **Average:** Uses nested loops to search forward for the next warmer day, taking O(n^2) time instead of O(n) monotonic stack. | 50 (capped) | No (monotonic stack O(n) pattern missed) | Fail (50%) |
| | **Weak:** Returns the differences between adjacent days. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Differentiate LIFO vs FIFO semantics and verify recognition of concrete iOS equivalents (UINavigationController, GCD dispatch queues).
2. Assess understanding of Array memory shift costs and validate knowledge of high-performance alternatives (two stacks, Deque).
3. Test mathematical comprehension of amortized constant time in batched transfer operations.
4. Evaluate algorithm implementation across bracket validation, two-stack queue encapsulation, and monotonic stack temperature distance calculations.
