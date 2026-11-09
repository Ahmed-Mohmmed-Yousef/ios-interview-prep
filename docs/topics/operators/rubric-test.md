# Rubric Test — Operators (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 write-code) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** assignment return value | **Good:** Explains assignment returns Void; prevents accidental assignment in if conditions; contrasts with C where if (x = y) compiles silently. | 100 | Yes | Pass (100%) |
| | **Average:** "Assignment in Swift does not return a value so you do not accidentally assign variables in if checks." (Misses contrast with C). | 75 | Yes | Pass (75%) |
| | **Weak:** "Assignment returns a boolean indicating if the values match." | 0 | No | Fail (0%) |
| **q25** == vs === difference | **Good:** Explains == checks value equality via Equatable; === checks reference identity / memory address; notes === only applies to class objects. | 100 | Yes | Pass (100%) |
| | **Average:** "== compares the values while === checks if they are the exact same instance in memory." (Misses reference type restriction). | 75 | Yes | Pass (75%) |
| | **Weak:** "=== is used for structs and == is for classes." | 0 | No | Fail (0%) |
| **q26** closed vs half-open range | **Good:** Explains closed range includes both a and b; half-open excludes upper bound b; gives clear use cases (calendar days vs zero-indexed counts). | 100 | Yes | Pass (100%) |
| | **Average:** "... includes both ends while ..< excludes the end." (Misses use cases). | 70 | Yes | Pass (70%) |
| | **Weak:** ".. moves backwards while ... moves forwards." | 0 | No | Fail (0%) |
| **q27** nil-coalescing short-circuit | **Good:** Explains right-hand side is only evaluated if left optional is nil; non-nil skips right side; saves costly computations or side effects. | 100 | Yes | Pass (100%) |
| | **Average:** "If the optional has a value, it does not run the right side." | 75 | Yes | Pass (75%) |
| | **Weak:** "Short circuiting makes the operator run asynchronously." | 0 | No | Fail (0%) |
| **q28** integer overflow behavior | **Good:** States Swift crashes immediately on integer overflow; contrasts with C silent wrapping or undefined behavior; mentions &+ for explicit wrapping. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift crashes on overflow to protect memory, while C wraps around." (Misses explicit overflow operators like &+). | 75 | Yes | Pass (75%) |
| | **Weak:** "Swift automatically expands integers to 128-bit values." | 0 | No | Fail (0%) |
| **q29** ternary conditional code-write | **Good:** Model answer: let score = 82; let result = score >= 70 ? "Pass" : "Fail"; print(result). | 100 | Yes | Pass (100%) |
| | **Average:** Uses an if/else block instead of the ternary conditional operator. | 50 (capped) | No (ternary missed) | Fail (50%) |
| | **Weak:** Writes score = 82; print("Pass") without conditional logic. | 25 | No | Fail (25%) |
| **q30** half-open range code-write | **Good:** Model answer: let names = ["Dana", "Alex", "Jordan"]; let range = 0..<names.count; print(range.contains(2)). | 100 | Yes | Pass (100%) |
| | **Average:** Uses a closed range 0...names.count (which causes off-by-one boundary). | 50 (capped) | No (half-open missed) | Fail (50%) |
| | **Weak:** Prints names[2] without creating a range. | 25 | No | Fail (25%) |
| **q31** nil-coalescing code-write | **Good:** Model answer: let savedCity: String? = nil; let displayCity = savedCity ?? "Default City"; print(displayCity). | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let unwrapping instead of the ?? operator. | 55 (capped) | No (?? missed) | Fail (55%) |
| | **Weak:** Force unwraps savedCity! causing a fatal crash. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Distinguish between candidates who understand why Swift was designed with these operator behaviors versus those who memorize syntax.
2. Verify strict enforcement of language safety features (Void assignment, overflow trapping, reference identity vs value equality).
3. Ensure candidates master range boundaries and short-circuit evaluation in practical code scenarios.
