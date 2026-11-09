# Rubric Test — Closures Basics (Step 5)

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
| **q24** closure definition and relation to functions | **Good:** Explains closure is a self-contained block of functionality that can be passed and stored; functions are special named closures; closures can also be written anonymously inline. | 100 | Yes | Pass (100%) |
| | **Average:** "A closure is a block of code you can pass around, and functions are named closures." (Misses inline anonymous expression note). | 70 | Yes | Pass (70%) |
| | **Weak:** "Closures are memory objects that store thread stacks." | 0 | No | Fail (0%) |
| **q25** the in keyword | **Good:** Explains in separates closure signature from body; parameters and return type appear before in; execution statements appear after in; omitted when using shorthand $0. | 100 | Yes | Pass (100%) |
| | **Average:** "The in keyword marks where the code starts after the arguments." (Misses return type placement). | 75 | Yes | Pass (75%) |
| | **Weak:** "The in keyword loops through items in an array." | 0 | No | Fail (0%) |
| **q26** value capturing lifecycle | **Good:** Explains closures capture references to variables from surrounding scope; captured variables remain alive in memory after enclosing function returns; closure retains read/write access. | 100 | Yes | Pass (100%) |
| | **Average:** "Closures capture variables from outer functions so you can still use them later." (Misses memory lifecycle explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Capturing copies the variable to disk storage." | 0 | No | Fail (0%) |
| **q27** reference type semantics | **Good:** Explains closures and functions are reference types; assigning to multiple variables points to the same underlying instance; captured state is shared across all references. | 100 | Yes | Pass (100%) |
| | **Average:** "Closures are reference types, so two variables will point to the same closure." (Misses shared captured state consequence). | 75 | Yes | Pass (75%) |
| | **Weak:** "Closures are value types copied on assignment." | 0 | No | Fail (0%) |
| **q28** trailing closure syntax | **Good:** Explains trailing closures can be written outside call parentheses when final argument; parentheses can be omitted entirely if closure is the only argument; provides clean syntax for higher-order functions. | 100 | Yes | Pass (100%) |
| | **Average:** "You put the closure outside the parentheses if it is the last argument." (Misses omitting parentheses when it is the only argument). | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** "Trailing closures run after a background thread finishes." | 0 | No | Fail (0%) |
| **q29** square closure code-write | **Good:** Model answer: let square = { (x: Int) -> Int in x * x }; prints square(6) producing 36. | 100 | Yes | Pass (100%) |
| | **Average:** Writes a named func instead of an assigned closure variable. | 50 (capped) | No (closure expression missed) | Fail (50%) |
| | **Weak:** Computes 6 * 6 directly without defining a closure. | 25 | No | Fail (25%) |
| **q30** filter with shorthand $0 code-write | **Good:** Model answer: let numbers = [3, 12, 5, 20, 8]; let filtered = numbers.filter { $0 > 9 }; prints filtered producing [12, 20]. | 100 | Yes | Pass (100%) |
| | **Average:** Uses full named closure syntax `filter { number in number > 9 }` instead of requested shorthand $0. | 55 (capped) | No (shorthand missed) | Fail (55%) |
| | **Weak:** Iterates with a for loop and appends manually. | 30 | No | Fail (30%) |
| **q31** makeMultiplier returning closure code-write | **Good:** Model answer: func makeMultiplier(factor: Int) -> (Int) -> Int { return { $0 * factor } }; creates multiplier for 3, calls with 7, prints 21. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets to return a closure, instead immediately returning factor * 7. | 45 (capped) | No (returning closure missed) | Fail (45%) |
| | **Weak:** Multiplies 3 * 7 and prints 21 with no function. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify essential comprehension of closure mechanics (syntax, `in` keyword, type inference, shorthand `$0`, and trailing closure rules).
2. Validate conceptual understanding of reference semantics and captured variable lifetimes.
3. Confirm practical ability to author closures, pass closures to higher-order functions, and return closures from functions.
