# Rubric Test — Enumerations (Step 5)

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
| **q24** enum definition and C comparison | **Good:** Explains enums define a type for related values; cases do not receive default integer values like in C; cases are first-class values in their own right. | 100 | Yes | Pass (100%) |
| | **Average:** "An enum is a type of related values, and in Swift they do not get numbers like in C." (Misses first-class value rationale). | 70 | Yes | Pass (70%) |
| | **Weak:** "Enums in Swift are dynamic classes with integers." | 0 | No | Fail (0%) |
| **q25** raw values vs associated values | **Good:** Explains raw values are fixed compile-time constants of a uniform type; associated values are per-instance runtime payloads; enums cannot combine both features. | 100 | Yes | Pass (100%) |
| | **Average:** "Raw values are default values, while associated values are passed when creating the case." (Misses mutually exclusive rule). | 70 | Yes | Pass (70%) |
| | **Weak:** "They are the exact same thing." | 0 | No | Fail (0%) |
| **q26** init?(rawValue:) returns Optional | **Good:** Explains init?(rawValue:) is a failable initializer returning an Optional; returns nil if raw value has no matching case; requires safe unwrapping. | 100 | Yes | Pass (100%) |
| | **Average:** "It returns an optional because the number you pass might not exist in the enum." (Misses safe unwrapping practice). | 75 | Yes | Pass (75%) |
| | **Weak:** "It returns an integer error code if the case fails." | 0 | No | Fail (0%) |
| **q27** properties and methods in enums | **Good:** Explains enums can have computed properties, instance methods, and mutating methods; forbidden from having stored properties; use associated values for per-instance data. | 100 | Yes | Pass (100%) |
| | **Average:** "Enums can have methods and computed properties, but cannot have stored properties." (Misses associated values recommendation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Enums can have any stored property like structs." | 0 | No | Fail (0%) |
| **q28** exhaustive switch matching | **Good:** Explains exhaustive matching guarantees all cases are handled; adding a new case produces a compiler error in any switch without default; prevents uncaught logic bugs. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift makes sure you handle every case so your code does not crash." (Misses compiler error protection on newly added cases). | 75 | Yes | Pass (75%) |
| | **Weak:** "Switch statements are exhaustive to speed up memory allocation." | 0 | No | Fail (0%) |
| **q29** Direction enum definition and reassignment code-write | **Good:** Model answer: defines Direction enum, declares variable with .north, reassigns to .south, prints true. | 100 | Yes | Pass (100%) |
| | **Average:** Declares currentDirection as a constant let, causing compile failure on reassignment. | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** Prints true without defining an enum or variable. | 25 | No | Fail (25%) |
| **q30** Coin raw values with if let code-write | **Good:** Model answer: defines Coin: Int enum, initializes with rawValue: 10, unwraps with if let, prints 10. | 100 | Yes | Pass (100%) |
| | **Average:** Uses force unwrap (!) instead of safe optional binding with if let. | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** Prints 10 without defining enum or raw values. | 25 | No | Fail (25%) |
| **q31** FileStatus associated values switch code-write | **Good:** Model answer: defines FileStatus enum with associated values, implements describeStatus with switch, calls with 75%, prints Uploading: 75%. | 100 | Yes | Pass (100%) |
| | **Average:** Fails to extract associated value in switch case using let progress. | 55 (capped) | No (associated value extraction missed) | Fail (55%) |
| | **Weak:** Prints hard-coded string with no enum. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify solid grasp of core enum concepts (type safety, first-class values, exhaustive switch matching).
2. Distinguish clearly between raw values (uniform compile-time constants) and associated values (runtime payloads).
3. Validate understanding of enum capabilities (computed properties, methods) and compiler restrictions (no stored properties, failable raw value initializers).
