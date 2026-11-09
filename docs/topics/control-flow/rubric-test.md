# Rubric Test — Control Flow (Step 5)

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
| **q24** switch in Swift vs C/Java | **Good:** Explains exhaustiveness requirement; no automatic fallthrough without break; mentions interval matching and where clauses. | 100 | Yes | Pass (100%) |
| | **Average:** "In Swift, switch cases do not fall through automatically and you must cover every case." (Misses pattern matching features). | 70 | Yes | Pass (70%) |
| | **Weak:** "Swift switches only accept integers." | 0 | No | Fail (0%) |
| **q25** while vs repeat-while | **Good:** Explains while checks condition at start; repeat-while checks at end, running body at least once; provides clear use case (input prompt before validation). | 100 | Yes | Pass (100%) |
| | **Average:** "while checks first and repeat-while checks at the end so it runs once." (Misses practical use case). | 70 | Yes | Pass (70%) |
| | **Weak:** "repeat-while runs indefinitely without a condition." | 0 | No | Fail (0%) |
| **q26** guard else control transfer & scope | **Good:** Explains guard else must transfer control out of scope; guard let keeps variables in outer scope; contrasts with if let inner scoping. | 100 | Yes | Pass (100%) |
| | **Average:** "guard requires a return in else and lets you use the variable afterwards." (Misses contrast with if let). | 70 | Yes | Pass (70%) |
| | **Weak:** "guard let creates a global variable." | 0 | No | Fail (0%) |
| **q27** where clauses in pattern matching | **Good:** Explains where adds an extra boolean filter to case; case only matches if pattern and where evaluate to true; pattern-bound variables can be inspected. | 100 | Yes | Pass (100%) |
| | **Average:** "where lets you add an if condition to a switch case." (Misses bound variable detail). | 75 | Yes | Pass (75%) |
| | **Weak:** "where specifies the file location of the code." | 0 | No | Fail (0%) |
| **q28** labeled statements in nested loops | **Good:** Explains labels name a loop with an identifier; allows break/continue to target outer loop directly; eliminates awkward boolean flags. | 100 | Yes | Pass (100%) |
| | **Average:** "Labels let you break out of an outer loop from an inner loop." (Misses explanation of avoiding boolean flags). | 75 | Yes | Pass (75%) |
| | **Weak:** "Labels print debug names on the console." | 0 | No | Fail (0%) |
| **q29** product factorial code-write | **Good:** Model answer: var product = 1; for number in 1...5 { product *= number }; print(product). | 100 | Yes | Pass (100%) |
| | **Average:** Declares with let instead of var, causing compile failure on mutation. | 50 (capped) | No (mutability missed) | Fail (50%) |
| | **Weak:** Prints 120 directly without loop. | 25 | No | Fail (25%) |
| **q30** checkLevel switch code-write | **Good:** Model answer: defines checkLevel with switch, interval cases 1...10, 11...20, default, calls with 15 and prints. | 100 | Yes | Pass (100%) |
| | **Average:** Uses if/else if blocks instead of a switch statement. | 50 (capped) | No (switch missed) | Fail (50%) |
| | **Weak:** Prints "Expert" without defining a function. | 25 | No | Fail (25%) |
| **q31** validateAge guard code-write | **Good:** Model answer: defines validateAge with guard let age, age >= 18 else { return "Invalid" }, returns string, calls with 21. | 100 | Yes | Pass (100%) |
| | **Average:** Uses if let and returns in the if block instead of using a guard statement. | 50 (capped) | No (guard missed) | Fail (50%) |
| | **Weak:** Force-unwraps age! without nil checking. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Verify deep comprehension of Swift's safety-first control flow (exhaustiveness, no implicit fallthrough, guard control transfer).
2. Distinguish candidates who understand pattern matching and loop controls from those who rely on C-style constructs.
3. Enforce idiomatic early exit patterns with guard rather than nested if pyramids.
