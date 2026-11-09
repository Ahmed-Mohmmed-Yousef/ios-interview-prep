# Rubric Test — Copy-on-Write and Value Semantics (Step 5)

Done 2026-11-09. Topic: `copy-on-write` (mid).
Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** (written) Definition of COW and value semantics balance | **Good:** Explains COW is an optimization where value types share underlying heap storage until mutation; notes it preserves value semantics by copying the buffer only when one variable modifies the data. | 100 | Yes | Pass (100%) |
| | **Average:** "Copy-on-write shares memory between arrays so they do not duplicate until you change one of them." | 80 | Yes | Pass (80%) |
| | **Weak:** "Copy-on-write is how ARC frees memory." | 0 | No | Fail (0%) |
| **q25** (written) Custom structs COW status and copying | **Good:** Clarifies custom Swift structs do not have COW automatically; explains copying a custom struct copies all stored properties directly on the stack. | 100 | Yes | Pass (100%) |
| | **Average:** "Custom structs do not have COW by default, they copy their properties immediately." | 80 | Yes | Pass (80%) |
| | **Weak:** "All structs in Swift have COW automatically." | 0 | No | Fail (0%) |
| **q26** (written) Implementing custom COW and role of isKnownUniquelyReferenced | **Good:** Explains struct wraps a private reference class holding data on the heap; mutating methods call isKnownUniquelyReferenced to check reference count and copy the buffer if shared. | 100 | Yes | Pass (100%) |
| | **Average:** "You wrap a class in your struct and use isKnownUniquelyReferenced to check if you need to copy before writing." | 80 | Yes | Pass (80%) |
| | **Weak:** "You add the @COW attribute to your struct declaration." | 0 | No | Fail (0%) |
| **q27** (written) Closure reference holding causing unexpected COW duplication | **Good:** Explains capturing a collection in a closure creates an additional reference to storage; isKnownUniquelyReferenced detects reference count > 1, forcing a deep copy on mutation. | 100 | Yes | Pass (100%) |
| | **Average:** "Holding the array in a closure increases the reference count, so when you mutate it, Swift makes a full copy." | 80 | Yes | Pass (80%) |
| | **Weak:** "Closures make arrays read-only forever." | 0 | No | Fail (0%) |
| **q28** (written) inout parameters and COW performance | **Good:** Explains inout passes a reference to existing variable without incrementing storage reference count; isKnownUniquelyReferenced remains true, allowing in-place O(1) mutations without COW allocations. | 100 | Yes | Pass (100%) |
| | **Average:** "inout keeps the reference count at one so the array can mutate in place without making a copy." | 80 | Yes | Pass (80%) |
| | **Weak:** "inout converts arrays to C pointers to bypass Swift memory safety." | 0 | No | Fail (0%) |
| **q29** (code-write) Array original and copy mutation | **Good:** Model answer: original = [10, 20]; copy = original; copy.append(30); prints 2 and 3 on separate lines. | 100 | Yes | Pass (100%) |
| | **Average:** Prints both counts on a single line instead of separate lines. | 85 | Yes | Pass (85%) |
| | **Weak:** Mutates original instead of copy, resulting in wrong counts. | 30 | No (COW behavior missed) | Fail (30%) |
| **q30** (code-write) isUnique function with isKnownUniquelyReferenced | **Good:** Model answer: final class RawClass; func isUnique(_ object: inout RawClass?) -> Bool returning isKnownUniquelyReferenced(&object); prints "true". | 100 | Yes | Pass (100%) |
| | **Average:** Forgets inout on function argument, causing compiler error. | 50 (capped) | No (inout parameter missed) | Fail (50%) |
| | **Weak:** Returns hardcoded true without calling isKnownUniquelyReferenced. | 20 | No (functionality missed) | Fail (20%) |
| **q31** (code-write) Custom COW SmartArray struct | **Good:** Model answer: final class DataStorage; struct SmartArray with private storage and isKnownUniquelyReferenced in append; creates a, copies to b, appends 2 to b; prints "a: 1, b: 2". | 100 | Yes | Pass (100%) |
| | **Average:** Mutates storage directly without isKnownUniquelyReferenced check, altering both instances ("a: 2, b: 2"). | 50 (capped) | No (uniqueness check missed) | Fail (50%) |
| | **Weak:** Writes empty struct with hardcoded print statement. | 10 | No (COW logic missed) | Fail (10%) |

---

## Verdict

The rubrics successfully verify:
1. Understanding of COW as a balance between performance and value semantics.
2. Knowledge that custom structs lack COW by default.
3. Accurate usage of `isKnownUniquelyReferenced` in custom COW implementations.
4. Concurrency and reference retention impacts on collection performance.
