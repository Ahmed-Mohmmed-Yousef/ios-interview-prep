# Rubric Test — Methods and Initialization (Step 5)

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
| **q24** mutating keyword on structs | **Good:** Explains structs are value types whose properties cannot be modified by default; mutating authorizes modifying properties or reassigning self; cannot call mutating methods on let constants. | 100 | Yes | Pass (100%) |
| | **Average:** "Structs need mutating because they are value types and you cannot change them inside methods otherwise." (Misses let constant restriction). | 75 | Yes | Pass (75%) |
| | **Weak:** "mutating makes the struct asynchronous." | 0 | No | Fail (0%) |
| **q25** memberwise initializer and extension | **Good:** Defines memberwise initializer synthesized for all stored properties; custom inits in struct body suppress it; custom inits in extensions preserve it. | 100 | Yes | Pass (100%) |
| | **Average:** "A memberwise initializer takes all properties. You put custom initializers in extensions to keep it." (Misses suppression rationale). | 75 | Yes | Pass (75%) |
| | **Weak:** "Classes synthesize memberwise initializers automatically." | 0 | No | Fail (0%) |
| **q26** failable initializers | **Good:** Explains init? declares failable inits returning an Optional; return nil signals failure when conditions are not met; callers handle via optional binding. | 100 | Yes | Pass (100%) |
| | **Average:** "init? returns an optional and you write return nil if the input is bad." (Misses optional binding handling note). | 70 | Yes | Pass (70%) |
| | **Weak:** "Failable initializers throw an exception." | 0 | No | Fail (0%) |
| **q27** instance vs type methods | **Good:** Explains instance methods operate on specific instances and their state; type methods run on the type itself without an instance; declared with static (or class in classes). | 100 | Yes | Pass (100%) |
| | **Average:** "Instance methods run on objects and type methods run on the type using static." (Misses class keyword override option). | 70 | Yes | Pass (70%) |
| | **Weak:** "Type methods are private global functions." | 0 | No | Fail (0%) |
| **q28** classes do not need mutating | **Good:** Explains classes are reference types on the heap; methods mutate the referenced object through a pointer; value semantics only apply to value types. | 100 | Yes | Pass (100%) |
| | **Average:** "Classes are reference types so their properties can be changed without mutating." (Misses heap/pointer explanation). | 75 | Yes | Pass (75%) |
| | **Weak:** "Classes do not have methods that change properties." | 0 | No | Fail (0%) |
| **q29** StepCounter mutating method code-write | **Good:** Model answer: struct StepCounter with steps: Int = 0, mutating addSteps(_ count: Int), calls with 50, prints 50. | 100 | Yes | Pass (100%) |
| | **Average:** Omits mutating keyword on addSteps, causing compile failure. | 60 (capped) | No (mutating missed) | Fail (60%) |
| | **Weak:** Implements loose function without struct. | 25 | No | Fail (25%) |
| **q30** Person extension initializer code-write | **Good:** Model answer: struct Person with firstName and lastName, extension init(fullName: String), delegates to self.init, prints Jane. | 100 | Yes | Pass (100%) |
| | **Average:** Declares custom init in struct body instead of extension, losing memberwise init. | 65 | Yes (partial) | Fail (65%) |
| | **Weak:** Prints Jane without defining an initializer. | 25 | No | Fail (25%) |
| **q31** Username failable initializer code-write | **Good:** Model answer: struct Username with value: String, failable init?(value: String) returning nil when count < 3, prints true. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets question mark (init instead of init?), causing compile error on return nil. | 60 (capped) | No (failable init? missed) | Fail (60%) |
| | **Weak:** Returns nil in a standalone function. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully:
1. Verify essential comprehension of value type method restrictions (`mutating` keyword and `let` immutability).
2. Validate knowledge of initializer synthesis and preservation rules (`extension` pattern).
3. Confirm practical ability to implement failable initializers, type methods, and initializer delegation.
