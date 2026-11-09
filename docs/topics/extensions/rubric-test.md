# Rubric Test — Extensions (Step 5)

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
| **q24** Capabilities and restrictions of extensions | **Good:** Explains extensions can add computed properties, methods, initializers, subscripts, and protocol conformances; cannot add stored properties, property observers to existing properties, or override existing methods. | 100 | Yes | Pass (100%) |
| | **Average:** "Extensions add methods and computed properties, but cannot add stored properties." (Misses overriding prohibition). | 75 | Yes | Pass (75%) |
| | **Weak:** "Extensions are used to subclass final classes." | 0 | No | Fail (0%) |
| **q25** Preserving struct memberwise initializers | **Good:** Explains declaring initializers inside struct body removes automatic memberwise initializer; placing custom initializer in an extension keeps both memberwise and custom initializers active. | 100 | Yes | Pass (100%) |
| | **Average:** "Putting initializers in an extension keeps the default initializer working." | 80 | Yes | Pass (80%) |
| | **Weak:** "Structs never lose their memberwise initializers." | 0 | No | Fail (0%) |
| **q26** Retroactive modeling | **Good:** Explains retroactive modeling enables existing types (including Standard Library or third-party types) to conform to protocols via extensions without modifying their original source code. | 100 | Yes | Pass (100%) |
| | **Average:** "It allows you to add protocols to types in other files." | 75 | Yes | Pass (75%) |
| | **Weak:** "Retroactive modeling converts Objective-C classes to Swift." | 0 | No | Fail (0%) |
| **q27** Method dispatch in protocol extensions | **Good:** Explains methods in protocol definition dispatch dynamically via witness tables (allowing conforming overrides); methods declared only in extensions dispatch statically and cannot be overridden dynamically. | 100 | Yes | Pass (100%) |
| | **Average:** "Blueprint methods use dynamic dispatch, but extension-only methods use static dispatch." | 80 | Yes | Pass (80%) |
| | **Weak:** "All extension methods dispatch dynamically." | 0 | No | Fail (0%) |
| **q28** Class extensions and convenience initializers | **Good:** Explains designated initializers must initialize all stored properties introduced by the class and delegate up; convenience initializers delegate across to designated inits, protecting initialization integrity across files. | 100 | Yes | Pass (100%) |
| | **Average:** "Class extensions can only have convenience initializers to call self.init()." | 75 | Yes | Pass (75%) |
| | **Weak:** "Classes do not support initializers in extensions." | 0 | No | Fail (0%) |
| **q29** isEven computed property on Int code-write | **Good:** Model answer: extension Int { var isEven: Bool { return self % 2 == 0 } }; prints true and false. | 100 | Yes | Pass (100%) |
| | **Average:** Declares isEven as a method func isEven() -> Bool instead of computed property. | 60 | Yes | Pass (60%) |
| | **Weak:** Writes function outside extension. | 25 | No | Fail (25%) |
| **q30** Box square initializer code-write | **Good:** Model answer: extension Box { init(side: Double) { self.init(width: side, height: side) } }; outputs 4.0x6.0 and 5.0x5.0. | 100 | Yes | Pass (100%) |
| | **Average:** Declares initializer inside struct Box body instead of in an extension. | 50 (capped) | No (extension missed) | Fail (50%) |
| | **Weak:** Assigns variables without defining initializer. | 0 | No | Fail (0%) |
| **q31** IdentifiableItem protocol extension code-write | **Good:** Model answer: extension IdentifiableItem { func formattedID() -> String { return "ID: \(id)" } }; prints ID: ORD-99. | 100 | Yes | Pass (100%) |
| | **Average:** Omits return statement or formats wrong string. | 60 | Yes | Pass (60%) |
| | **Weak:** Defines protocol instead of extension. | 25 | No | Fail (25%) |

---

## Verdict

The rubrics successfully verify:
1. Deep understanding of Swift extension capabilities (computed properties, convenience inits, protocol adoption) and strict constraints (no stored properties, no overriding).
2. Knowledge of struct memberwise initializer preservation mechanics.
3. Awareness of protocol extension dispatch rules (dynamic witness table vs direct static dispatch).
4. Practical ability to write clean extensions in Swift 6 syntax.
