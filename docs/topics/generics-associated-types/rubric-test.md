# Rubric Test — Generics: Associated Types and Where Clauses (Step 5)

Done 2026-11-09. Topic: `generics-associated-types` (mid).
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
| **q24** (written) Definition of associated types in protocols | **Good:** Explains associatedtype acts as a placeholder type within a protocol declaration; explains protocols specify requirements rather than concrete angle bracket instantiations; conforming types bind concrete types. | 100 | Yes | Pass (100%) |
| | **Average:** "An associated type is a placeholder type in a protocol that conforming structs fill in with real types." | 80 | Yes | Pass (80%) |
| | **Weak:** "Associated types are class variables stored in memory." | 0 | No | Fail (0%) |
| **q25** (written) Generic where clauses in protocol extensions | **Good:** Explains where clauses in extensions restrict methods to conforming types whose associated types meet specific rules; compiler prevents calling methods when constraints are not met. | 100 | Yes | Pass (100%) |
| | **Average:** "Where clauses let you add methods that only work when your element conforms to Equatable." | 80 | Yes | Pass (80%) |
| | **Weak:** "Where clauses are SQL filters for Core Data." | 0 | No | Fail (0%) |
| **q26** (written) Compiler type inference with associated types | **Good:** Explains compiler inspects property types and method signatures in conforming types to deduce associated types; explicit typealias is optional when deduced automatically. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift looks at your functions to guess the type, so you do not always need to write typealias." | 80 | Yes | Pass (80%) |
| | **Weak:** "The compiler guesses types at runtime through reflection." | 0 | No | Fail (0%) |
| **q27** (written) Primary associated types in Swift 5.7+ | **Good:** Explains primary associated types are declared in angle brackets on protocol headers, like protocol Collection<Element>; enables concise syntax like some Collection<String> without complex where clauses. | 100 | Yes | Pass (100%) |
| | **Average:** "Primary associated types let you write some Collection<String> using angle brackets on the protocol." | 80 | Yes | Pass (80%) |
| | **Weak:** "Primary associated types allow Objective-C protocols to inherit from Swift structs." | 0 | No | Fail (0%) |
| **q28** (written) Enforcing type equality with generic where clauses | **Good:** Explains use of double equals (==) in where clauses to mandate type equality; gives example where two containers must share identical element types (e.g. C1.Item == C2.Item). | 100 | Yes | Pass (100%) |
| | **Average:** "You use double equals in a where clause like C1.Item == C2.Item so both containers hold the same type." | 80 | Yes | Pass (80%) |
| | **Weak:** "You use the is keyword to cast both items to AnyObject." | 0 | No | Fail (0%) |
| **q29** (code-write) Repository protocol with Model associated type | **Good:** Model answer: protocol Repository with associatedtype Model and func fetch() -> Model; struct UserRepo returning "User: Alex"; prints "User: Alex". | 100 | Yes | Pass (100%) |
| | **Average:** Declares protocol and struct but misses printing fetch() output. | 80 | Yes | Pass (80%) |
| | **Weak:** Writes class without conforming to Repository protocol. | 20 | No (protocol conformance missed) | Fail (20%) |
| **q30** (code-write) Storage protocol with where Item: Equatable extension | **Good:** Model answer: protocol Storage with associatedtype Item; extension Storage where Item: Equatable adding areEqual; struct IntStorage; prints "true". | 100 | Yes | Pass (100%) |
| | **Average:** Writes extension without where clause constraint. | 60 | No (constrained extension missed) | Fail (60%) |
| | **Weak:** Writes standalone global function without protocol or extension. | 20 | No (protocol requirements missed) | Fail (20%) |
| **q31** (code-write) Accumulator protocol with Numeric constraint | **Good:** Model answer: protocol Accumulator with associatedtype Element: Numeric; extension with doubleValue returning val + val; FloatAccumulator conforming; prints "9.0". | 100 | Yes | Pass (100%) |
| | **Average:** Writes associatedtype without Numeric constraint, causing compiler error on val + val. | 50 (capped) | No (Numeric constraint missed) | Fail (50%) |
| | **Weak:** Writes empty struct with hardcoded print statement. | 10 | No (protocol and methods missed) | Fail (10%) |

---

## Verdict

The rubrics successfully verify:
1. Associated type mechanics and type inference.
2. Generic where clause syntax and method availability.
3. Primary associated types and clean opaque type syntax.
4. Concrete coding with associatedtype constraints (Numeric, Equatable).
