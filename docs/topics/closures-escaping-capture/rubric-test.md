# Rubric Test — Closures: Escaping and Capture Lists (Step 5)

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
| **q24** Escaping vs non-escaping closures | **Good:** Non-escaping closures execute synchronously within the function body before returning; escaping closures outlive the function call, such as when stored in properties or passed to async callbacks; escaping closures are stored on the heap. | 100 | Yes | Pass (100%) |
| | **Average:** "Non-escaping closures run before the function returns, while escaping closures are called later." | 80 | Yes | Pass (80%) |
| | **Weak:** "Escaping closures run only on background threads." | 0 | No | Fail (0%) |
| **q25** Strong reference cycle and weak self | **Good:** Explains retain cycle occurs when an instance retains an escaping closure that captures the instance strongly, preventing ARC deallocation; [weak self] creates an optional weak reference that avoids incrementing retain count and zeroes on deallocation. | 100 | Yes | Pass (100%) |
| | **Average:** "A retain cycle happens when self and closure both hold each other. weak self breaks the cycle so it can deallocate." | 85 | Yes | Pass (85%) |
| | **Weak:** "Weak self makes closures run faster." | 0 | No | Fail (0%) |
| **q26** weak self vs unowned self | **Good:** Explains weak creates an optional reference that ARC zeroes to nil upon deallocation, while unowned assumes the instance is always alive; unowned causes a fatal crash if the instance deallocates before asynchronous callback execution. | 100 | Yes | Pass (100%) |
| | **Average:** "weak self is optional and becomes nil, but unowned self crashes if the view controller was already dismissed." | 85 | Yes | Pass (85%) |
| | **Weak:** "weak self is for structs and unowned is for classes." | 0 | No | Fail (0%) |
| **q27** Value type capture lists vs default capture | **Good:** Explains default capture is by reference and reflects subsequent mutations to the variable; capture lists take an immutable snapshot copy of value types at the moment the closure is created. | 100 | Yes | Pass (100%) |
| | **Average:** "By default closures capture variables by reference, but [count] copies the value at the time the closure is made." | 85 | Yes | Pass (85%) |
| | **Weak:** "Capture lists make variables global." | 0 | No | Fail (0%) |
| **q28** Explicit self requirement in escaping closures | **Good:** Explains explicit self requires developers to acknowledge that the closure captures reference semantics; prevents accidental retain cycles and memory leaks caused by unintentionally retaining the enclosing instance. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift requires explicit self to warn developers that self is being captured to prevent accidental memory leaks." | 80 | Yes | Pass (80%) |
| | **Weak:** "Because the Swift compiler cannot find variable names without self." | 0 | No | Fail (0%) |
| **q29** AsyncFetcher class code-write | **Good:** Model answer: class AsyncFetcher with var completion: (() -> Void)? and fetch(callback: @escaping () -> Void); outputs "Fetched data". | 100 | Yes | Pass (100%) |
| | **Average:** Forgets @escaping attribute on callback parameter, causing compile failure. | 50 (capped) | No (@escaping missed) | Fail (50%) |
| | **Weak:** Implements empty class without completion property. | 0 | No | Fail (0%) |
| **q30** ViewModel makeHandler code-write | **Good:** Model answer: class ViewModel with var count = 10, makeHandler returning closure with [weak self] returning self?.count ?? 0; outputs 10. | 100 | Yes | Pass (100%) |
| | **Average:** Omits [weak self] capture list, capturing self strongly. | 50 (capped) | No (weak self missed) | Fail (50%) |
| | **Weak:** Returns hardcoded 10 without closure or capture list. | 25 | No | Fail (25%) |
| **q31** applyOperation function code-write | **Good:** Model answer: func applyOperation(value: Int, operation: (Int) -> Int) -> Int executing operation(value); outputs 21. | 100 | Yes | Pass (100%) |
| | **Average:** Takes hardcoded Int multiplier rather than executing closure. | 25 | No | Fail (25%) |
| | **Weak:** Returns value without invoking closure. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully verify:
1. Clear understanding of `@escaping` versus non-escaping closure lifecycles (heap vs stack).
2. Deep knowledge of ARC reference cycles and `[weak self]` zeroing behavior.
3. Appreciation of risks with `[unowned self]` in asynchronous tasks.
4. Correct understanding of value type snapshot capture lists.
