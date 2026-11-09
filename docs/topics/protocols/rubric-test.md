# Rubric Test — Protocols (Step 5)

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
| **q24** What protocols are, conformance, and class differences | **Good:** Explains a protocol is a blueprint/contract without storage; structs, enums, and classes conform by implementing requirements; enables horizontal composition across both value and reference types. | 100 | Yes | Pass (100%) |
| | **Average:** "A protocol is an interface for structs and classes to share code." (Misses lack of physical storage distinction). | 70 | Yes | Pass (70%) |
| | **Weak:** "Protocols are abstract base classes in Swift." | 0 | No | Fail (0%) |
| **q25** { get } vs { get set } requirements | **Good:** Explains { get } requires read access, satisfied by let, var, or computed properties; { get set } requires read and write access, requiring mutable stored var or read-write computed property. | 100 | Yes | Pass (100%) |
| | **Average:** "{ get } is read-only and { get set } is read-write." (Lacks concrete property satisfaction rules like let vs var). | 75 | Yes | Pass (75%) |
| | **Weak:** "{ get set } means the property cannot be changed." | 0 | No | Fail (0%) |
| **q26** AnyObject and weak delegates | **Good:** Explains AnyObject restricts conformance to classes; delegates are declared weak to avoid retain cycles; ARC requires reference semantics to zero out weak pointers. | 100 | Yes | Pass (100%) |
| | **Average:** "AnyObject is for classes and weak stops retain cycles." (Misses explanation of why ARC needs classes for weak). | 75 | Yes | Pass (75%) |
| | **Weak:** "AnyObject makes delegates run on the main thread." | 0 | No | Fail (0%) |
| **q27** mutating methods in protocols | **Good:** Explains mutating allows value types (structs and enums) to alter self or stored properties inside the method; classes omit mutating because they have reference semantics. | 100 | Yes | Pass (100%) |
| | **Average:** "mutating lets structs change their variables. Classes do not need it." | 80 | Yes | Pass (80%) |
| | **Weak:** "mutating makes a function return a new copy." | 0 | No | Fail (0%) |
| **q28** any Protocol vs some Protocol | **Good:** Explains any Protocol is an existential container with dynamic dispatch and boxing overhead; some Protocol is an opaque type with one specific concrete type known at compile time, enabling static dispatch. | 100 | Yes | Pass (100%) |
| | **Average:** "any is existential and slower; some is opaque and faster." (Misses single concrete type explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "any is for UIKit and some is for SwiftUI." | 25 | No | Fail (25%) |
| **q29** Product struct priceable code-write | **Good:** Model answer: struct Product: Priceable { var price: Double }; prints 19.99. | 100 | Yes | Pass (100%) |
| | **Average:** Declares price as String instead of Double, failing conformance. | 50 (capped) | No (type match missed) | Fail (50%) |
| | **Weak:** Declares class without Priceable conformance. | 0 | No | Fail (0%) |
| **q30** SimpleCounter struct code-write | **Good:** Model answer: struct SimpleCounter: Counter with var count = 0 and mutating func increment() { count += 1 }. | 100 | Yes | Pass (100%) |
| | **Average:** Omits mutating keyword on increment(), causing compilation failure. | 50 (capped) | No (mutating missed) | Fail (50%) |
| | **Weak:** Implements class with static method. | 25 | No | Fail (25%) |
| **q31** CompletionDelegate and Manager code-write | **Good:** Model answer: protocol CompletionDelegate: AnyObject with taskDidComplete(); class Manager: CompletionDelegate printing "Task finished". | 100 | Yes | Pass (100%) |
| | **Average:** Omits AnyObject on protocol declaration. | 50 (capped) | No (AnyObject missed) | Fail (50%) |
| | **Weak:** Uses struct instead of class for delegate conformance. | 40 | No | Fail (40%) |

---

## Verdict

The rubrics successfully verify:
1. Deep understanding of protocol contracts, get/set requirements, and value type mutation rules.
2. Practical knowledge of class-only protocols for weak delegate memory management.
3. Comprehension of existential types (`any`) versus opaque types (`some`).
4. Accurate Swift 6 code implementation across structs, classes, and protocols.
