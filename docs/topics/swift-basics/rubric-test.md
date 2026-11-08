# Rubric Test — Constants, Variables and Types (Step 5)

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
| **q24** let vs var | **Good:** Explains constant vs variable, explains cannot change vs can change, mentions Apple default for safety. | 100 | Yes | Pass (100%) |
| | **Average:** "let is a constant and var is a variable." (Names terms, but leaves out mutation details and Apple recommendation). | 35 | Yes (partial) | Fail (35%) |
| | **Weak:** "let is for numbers and var is for strings." | 0 | No | Fail (0%) |
| **q25** type inference & annotations | **Good:** Defines inference from initial value; provides valid scenarios for annotations (delayed init, Character vs String); mentions type safety. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift infers types automatically. You use annotations when declaring without a value." | 60 | Yes (partial) | Fail (60%) |
| | **Weak:** "Type inference means Swift has no types until runtime." | 0 | No | Fail (0%) |
| **q26** no implicit conversion | **Good:** Explains type safety; explains avoiding silent bugs and precision loss; mentions explicit conversion syntax. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift does not convert types because it is strictly typed. You have to cast." | 50 | Yes (partial) | Fail (50%) |
| | **Weak:** "It converts them automatically if you use the plus operator." | 0 | No | Fail (0%) |
| **q27** delayed initialization | **Good:** Explains declaring with annotation and initializing later; compiler enforces assignment on all branches; reading before assign is an error. | 100 | Yes | Pass (100%) |
| | **Average:** "You can assign let later if you give it a type first." | 40 | Yes (partial) | Fail (40%) |
| | **Weak:** "let must always have a value on the same line." | 0 | No | Fail (0%) |
| **q28** why let by default | **Good:** Prevents unintentional mutations; enables multithreading safety/no data races; compiler optimizations. | 100 | Yes | Pass (100%) |
| | **Average:** "It makes code cleaner and prevents bugs when values change." | 40 | Yes (partial) | Fail (40%) |
| | **Weak:** "Because let variables use less battery on iOS." | 0 | No | Fail (0%) |
| **q29** speed code-write | **Good:** Model answer declaring let maxSpeed = 120, var currentSpeed = 80, currentSpeed += 25, prints "120 105". | 100 | Yes | Pass (100%) |
| | **Average:** Declares both with var; increases speed; prints output. | 50 (capped) | No (let missed) | Fail (50%) |
| | **Weak:** Sets both to constants, attempts mutation that fails compile. | 0 | No | Fail (0%) |
| **q30** unit price code-write | **Good:** Model answer: let total = Double(quantity) * unitPrice; prints total. | 100 | Yes | Pass (100%) |
| | **Average:** Converts correctly but prints hardcoded "49.95" instead of total. | 80 | Yes | Pass (80%) |
| | **Weak:** Writes quantity * unitPrice without conversion (fails compilation). | 0 | No | Fail (0%) |
| **q31** greeting code-write | **Good:** Model answer: let greeting: String; if/else assigns "Good morning" / "Hello"; prints greeting. | 100 | Yes | Pass (100%) |
| | **Average:** Uses var greeting = "" and reassigns in if. | 50 (capped) | No (let annotation missed) | Fail (50%) |
| | **Weak:** Uses let greeting without type annotation (compiler error). | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully:
1. Reward complete, articulate explanations with full marks (100%).
2. Penalize superficial or incomplete answers below the 70% pass threshold.
3. Completely reject common myths and syntax errors with 0%.
4. Enforce the key criterion cap, preventing code that misses core architectural requirements (such as using `let`) from passing.
