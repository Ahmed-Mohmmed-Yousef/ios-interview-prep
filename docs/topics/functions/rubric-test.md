# Rubric Test — Functions (Step 5)

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
| **q24** argument label vs parameter name | **Good:** Explains argument labels used at call site; parameter names used in body; makes call sites read like expressive English sentences. | 100 | Yes | Pass (100%) |
| | **Average:** "Labels are used outside when calling and names are used inside the function." (Misses English sentence expressiveness rationale). | 70 | Yes | Pass (70%) |
| | **Weak:** "Argument labels are comments for documentation." | 0 | No | Fail (0%) |
| **q25** parameter immutability | **Good:** Explains parameters are let constants to prevent accidental mutation; mutating triggers compile error; requires local var or inout to modify. | 100 | Yes | Pass (100%) |
| | **Average:** "Parameters are constants so the compiler gives an error if you change them." (Misses local copy / inout alternative). | 75 | Yes | Pass (75%) |
| | **Weak:** "Parameters are mutable by default like in C." | 0 | No | Fail (0%) |
| **q26** inout and copy-in copy-out | **Good:** Explains inout modifies caller variables; copy-in copy-out semantics; callers must pass mutable var prefixed with ampersand &. | 100 | Yes | Pass (100%) |
| | **Average:** "inout lets a function modify a variable directly, and you must put & in front of it." (Misses copy-in copy-out explanation). | 65 | Yes | Fail (65%) |
| | **Weak:** "inout creates a background thread reference." | 0 | No | Fail (0%) |
| **q27** first-class function types | **Good:** Explains functions can be stored in variables, passed as arguments, and returned; provides valid type like (Int, Int) -> Int; enables higher-order patterns. | 100 | Yes | Pass (100%) |
| | **Average:** "Functions are values that can be passed around, with types like (Int) -> String." (Misses higher-order patterns detail). | 75 | Yes | Pass (75%) |
| | **Weak:** "First-class means functions run with priority in GCD." | 0 | No | Fail (0%) |
| **q28** implicit returns | **Good:** Explains single-expression functions can omit return; returns value of that expression automatically; multi-statement functions still require return. | 100 | Yes | Pass (100%) |
| | **Average:** "You can leave out return if there is only one line in the function." (Misses distinction between one line and single expression). | 75 | Yes | Pass (75%) |
| | **Weak:** "Implicit returns return nil if nothing is specified." | 0 | No | Fail (0%) |
| **q29** formatPrice default parameter code-write | **Good:** Model answer: func formatPrice(amount: Int, currency: String = "$") -> String; prints $50. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets default value and requires caller to pass currency. | 60 (capped) | No (default currency missed) | Fail (60%) |
| | **Weak:** Prints $50 without writing a function. | 25 | No | Fail (25%) |
| **q30** addFive inout code-write | **Good:** Model answer: func addFive(_ value: inout Int); var score = 20; addFive(&score); prints 25. | 100 | Yes | Pass (100%) |
| | **Average:** Declares score with let instead of var, causing compile failure at addFive(&score). | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** Modifies value without inout keyword. | 0 | No | Fail (0%) |
| **q31** function type assignment code-write | **Good:** Model answer: defines multiply, assigns to calculator: (Int, Int) -> Int, calls calculator(6, 7), prints 42. | 100 | Yes | Pass (100%) |
| | **Average:** Omits explicit function type annotation (let calculator = multiply). | 60 (capped) | No (explicit type missed) | Fail (60%) |
| | **Weak:** Assigns integer result instead of function reference. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify deep comprehension of Swift API design principles (expressive call sites vs internal clarity).
2. Validate parameter safety rules (immutable constants, copy-in copy-out inout semantics).
3. Confirm mastery of first-class function types, preparing candidates for closures in Batch 1B.
