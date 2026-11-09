# Rubric Test — Linked Lists (Step 5)

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
| **q24** class vs struct recursive layout mechanics | **Good:** Explains structs are value types requiring fixed compile-time size; recursive nesting requires infinite size causing compiler error; classes use fixed-size 64-bit reference pointers. | 100 | Yes | Pass (100%) |
| | **Average:** "Structs cannot contain themselves recursively because the compiler throws an error. You must use classes because they are reference types." (Misses compile-time size explanation). | 80 | Yes | Pass (80%) |
| | **Weak:** "Structs are too slow to hold integers in memory." | 0 | No | Fail (0%) |
| **q25** 3-pointer list reversal algorithm | **Good:** Describes prev, curr, nextTemp roles; explains caching nextTemp before rewiring avoids losing list; states O(n) time and O(1) space complexities. | 100 | Yes | Pass (100%) |
| | **Average:** "Save curr.next, point curr.next to prev, then advance prev and curr until the end." (Misses explicit O(n) time and O(1) space complexities). | 80 | Yes | Pass (80%) |
| | **Weak:** "Reverse the list by converting it to an array and reading it backwards." | 30 | No | Fail (30%) |
| **q26** Floyd's cycle detection & `===` reference equality | **Good:** Explains slow moves 1 step while fast moves 2; fast must lap slow if cycle exists; explains === compares reference identity rather than equal values. | 100 | Yes | Pass (100%) |
| | **Average:** "Slow moves by 1 and fast moves by 2. If they meet, there is a cycle. Use === to check pointers." (Misses explanation of why duplicate values require ===). | 80 | Yes | Pass (80%) |
| | **Weak:** "Cycle detection stores nodes in a dictionary and checks keys." | 30 | No | Fail (30%) |
| **q27** dummy head node utility & edge case elimination | **Good:** Defines dummy node as sentinel placed before head; eliminates special conditionals for inserting before or deleting the head; returning dummy.next yields clean head. | 100 | Yes | Pass (100%) |
| | **Average:** "A dummy head is a fake node placed before head to make head modifications easier without special if statements." (Misses returning dummy.next detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "Dummy heads store the count of elements in the list." | 0 | No | Fail (0%) |
| **q28** ARC recursive deallocation stack overflow | **Good:** Explains ARC recursively releases child nodes upon deallocation; deep lists exceed call stack frames causing stack overflow crash; proposes iterative deinit loop to flatten cleanup. | 100 | Yes | Pass (100%) |
| | **Average:** "When a huge linked list is released, recursive deallocation can crash the app with a stack overflow. You should clean it up iteratively." (Misses ARC child release mechanism). | 70 | Yes | Pass (70%) |
| | **Weak:** "ARC crashes because linked lists create retain cycles with the OS." | 0 | No | Fail (0%) |
| **q29** `reverseLinkedList` code-write | **Good:** Model answer with `prev = nil`, while loop, caching `nextTemp`, updating `node.next = prev`, advancing pointers, and returning `prev`. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets to cache `nextTemp` before `curr.next = prev`, severing the rest of the list. | 50 (capped) | No (broken pointer rewiring) | Fail (50%) |
| | **Weak:** Returns input head without changing pointer references. | 0 | No | Fail (0%) |
| **q30** `hasCycle` Floyd's algorithm code-write | **Good:** Model answer with slow/fast pointers, moving 1 and 2 steps safely with optional binding, and testing `slow === fast`. | 100 | Yes | Pass (100%) |
| | **Average:** Uses `slow?.val == fast?.val` instead of reference identity `===`, returning false positives on duplicate values. | 50 (capped) | No (value equality instead of reference equality) | Fail (50%) |
| | **Weak:** Traverses list with single pointer until counter reaches 1000. | 20 | No | Fail (20%) |
| **q31** `findMiddleNode` code-write | **Good:** Model answer advancing slow by 1 and fast by 2 steps, returning slow when fast reaches end. | 100 | Yes | Pass (100%) |
| | **Average:** Traverses list twice: first counting total nodes, second stopping at count / 2. Works but lacks single-pass elegance. | 80 | Yes | Pass (80%) |
| | **Weak:** Returns head.next without moving through the list. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Differentiate understanding of Swift type system constraints (value type recursive layout vs reference pointers).
2. Assess pointer rewiring mechanics, order of operations, and prevention of list severing.
3. Verify comprehension of reference identity (`===`) in Floyd's cycle detection algorithm.
4. Confirm mastery of architectural patterns: sentinel dummy heads and iterative ARC deallocation loops.
5. Accurately evaluate code implementations for list reversal, cycle detection, and midpoint discovery.
