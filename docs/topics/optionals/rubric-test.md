# Rubric Test — Optionals (Step 5)

Done 2026-11-08. Each of the 8 AI-graded questions (5 written, 3 write-code) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** what is optional | **Good:** Defines optional as wrapping value or nil; notes non-optionals cannot be nil; explains compile-time null safety. | 100 | Yes | Pass (100%) |
| | **Average:** "An optional can hold nil. Normal types cannot hold nil." (Misses compile-time crash prevention). | 70 | Yes | Pass (70%) |
| | **Weak:** "An optional is a pointer in C that can be null." | 0 | No | Fail (0%) |
| **q25** if let vs guard let | **Good:** Explains if let scoped to block; guard let available in outer scope and requires early exit; advises when to use each. | 100 | Yes | Pass (100%) |
| | **Average:** "guard let exits early while if let continues. Both unwrap optionals." (Misses scoping detail). | 52 | Yes (partial) | Fail (52%) |
| | **Weak:** "guard let is faster than if let." | 0 | No | Fail (0%) |
| **q26** nil-coalescing vs force unwrap | **Good:** Explains ?? unwraps or provides fallback; safe non-optional result; contrasts with ! fatal crash. | 100 | Yes | Pass (100%) |
| | **Average:** "?? gives a default value so your app does not crash like with !." | 70 | Yes | Pass (70%) |
| | **Weak:** "?? forces the value to unwrap." | 0 | No | Fail (0%) |
| **q27** forced unwrapping anti-pattern | **Good:** Bypasses compile safety; crashes on nil at runtime; refactoring risk; recommends if let / guard let / ??. | 100 | Yes | Pass (100%) |
| | **Average:** "It causes crashes when the value is nil, so you should use if let." | 65 | Yes | Fail (65%) |
| | **Weak:** "It makes variables immutable." | 0 | No | Fail (0%) |
| **q28** Optional enum structure | **Good:** Enum with .none and .some(Wrapped); .none is nil; syntactic sugar for Optional<Type>; pattern matching. | 100 | Yes | Pass (100%) |
| | **Average:** "Optional is an enum with some and none cases." | 57 | Yes (partial) | Fail (57%) |
| | **Weak:** "Optional is a class that inherits from NSObject." | 0 | No | Fail (0%) |
| **q29** finalScore code-write | **Good:** Model answer: let score: Int? = nil; let finalScore = score ?? 0; prints 0. | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let instead of ?? operator. | 60 (capped) | No (?? missed) | Fail (60%) |
| | **Weak:** Uses score! which crashes. | 0 | No | Fail (0%) |
| **q30** displayUser code-write | **Good:** Model answer: func displayUser taking String?, unwraps with if let, prints appropriately. | 100 | Yes | Pass (100%) |
| | **Average:** Defines function without optional parameter type (func displayUser(name: String)). | 50 (capped) | No (name: String? missed) | Fail (50%) |
| | **Weak:** Force-unwraps parameter without checking nil. | 25 | No | Fail (25%) |
| **q31** parsePort code-write | **Good:** Model answer: guard let input, let port = Int(input) else { return 8080 }; returns port. | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let and returns inside if, but forgets guard let. | 60 (capped) | No (guard let missed) | Fail (60%) |
| | **Weak:** Force-unwraps Int(input)! directly. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Provide fair and accurate evaluation of core concepts.
2. Distinguish between shallow terminology recitations and deep comprehension of scope, safety, and control flow.
3. Protect against syntax shortcuts and forced unwrapping anti-patterns.
