# Rubric Test — Generics: The Basics (Step 5)

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
| **q24** What generics are and why preferred over Any | **Good:** Explains generics allow writing reusable code using placeholder type parameters (<T>); enforces compile-time type safety without runtime casting; standard collections like Array and Dictionary use generics. | 100 | Yes | Pass (100%) |
| | **Average:** "Generics use placeholders like T so you do not have to duplicate functions. They are safer than Any." | 80 | Yes | Pass (80%) |
| | **Weak:** "Generics let you create variables without declaring types." | 0 | No | Fail (0%) |
| **q25** Type constraints and operators like == | **Good:** Explains type constraints require type parameters to conform to protocols; operators like == require Equatable conformance to prove to the compiler that comparison is supported. | 100 | Yes | Pass (100%) |
| | **Average:** "Type constraints make sure T conforms to Equatable so == works." | 75 | Yes | Pass (75%) |
| | **Weak:** "Type constraints convert objects to Strings." | 0 | No | Fail (0%) |
| **q26** Extending generic types syntax rule | **Good:** Explains extensions write extension TypeName without angle brackets; original type parameters (like Element) are available automatically inside the extension body. | 100 | Yes | Pass (100%) |
| | **Average:** "You write extension Stack and use Element directly." | 80 | Yes | Pass (80%) |
| | **Weak:** "You must write extension Stack<Element> every time." | 0 | No | Fail (0%) |
| **q27** Compiler specialization (monomorphization) | **Good:** Explains the compiler generates specialized concrete machine code for types used at call sites; eliminates runtime boxing and indirection, running at concrete code speed. | 100 | Yes | Pass (100%) |
| | **Average:** "The compiler makes copies of the code for each type to make it fast." | 75 | Yes | Pass (75%) |
| | **Weak:** "Swift uses Java-style type erasure at runtime." | 0 | No | Fail (0%) |
| **q28** Generic where clauses vs simple constraints | **Good:** Explains where clauses define complex requirements on type parameters and associated types; needed for multi-type relationships like equating elements between two collections. | 100 | Yes | Pass (100%) |
| | **Average:** "where clauses are for complex constraints on collections." | 70 | Yes | Pass (70%) |
| | **Weak:** "where clauses are loops for generics." | 0 | No | Fail (0%) |
| **q29** swapValues generic function code-write | **Good:** Model answer: func swapValues<T>(_ a: inout T, _ b: inout T) { let temp = a; a = b; b = temp }; outputs 20 and 10. | 100 | Yes | Pass (100%) |
| | **Average:** Omits inout on parameters, preventing swap from persisting. | 50 (capped) | No (inout missed) | Fail (50%) |
| | **Weak:** Swaps hard-coded integers instead of using generic T. | 25 | No | Fail (25%) |
| **q30** Stack<T> struct code-write | **Good:** Model answer: struct Stack<T> with private var items: [T] = []; mutating push and mutating pop returning T?; outputs 200 and 100. | 100 | Yes | Pass (100%) |
| | **Average:** Omits mutating keyword on push or pop, causing build failure. | 50 (capped) | No (mutating missed) | Fail (50%) |
| | **Weak:** Hard-codes Stack to Int only without type parameter T. | 25 | No | Fail (25%) |
| **q31** findIndex<T: Equatable> code-write | **Good:** Model answer: func findIndex<T: Equatable>(of target: T, in array: [T]) -> Int?; iterates and returns matching index or nil; outputs 1 and -1. | 100 | Yes | Pass (100%) |
| | **Average:** Omits Equatable constraint on T, causing == comparison compilation error. | 50 (capped) | No (constraint missed) | Fail (50%) |
| | **Weak:** Returns array.count without searching. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully verify:
1. Deep understanding of generic placeholders (`<T>`), type constraints (`<T: Equatable>`), and where clauses.
2. Knowledge of syntax rules when extending generic types (omitting angle brackets).
3. Awareness of Swift compiler optimization via monomorphization.
4. Accurate implementation of generic algorithms, collections, and value mutating methods in Swift 6.
