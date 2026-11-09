# Rubric Test — Protocol-Oriented Programming (Step 5)

Done 2026-11-09. Topic: `protocol-oriented-programming` (mid).
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
| **q24** (written) Definition and motivation of POP | **Good:** Explains POP designs systems around protocols and capabilities rather than class inheritance trees; mentions value types like structs and enums sharing behaviors without inheritance; notes avoiding fragile base classes and shared mutable state. | 100 | Yes | Pass (100%) |
| | **Average:** "Protocol-oriented programming means using protocols instead of classes so structs can share code." | 70 | Yes | Pass (70%) |
| | **Weak:** "Protocol-oriented programming means all classes must be private." | 0 | No | Fail (0%) |
| **q25** (written) Protocol extension default implementations and overrides | **Good:** Explains protocol extensions provide default implementations for all conforming types; conforming types can keep default or provide custom override; notes no override keyword is needed. | 100 | Yes | Pass (100%) |
| | **Average:** "Protocol extensions give default code to conforming types so you do not have to write it in every struct, but you can override it." | 80 | Yes | Pass (80%) |
| | **Weak:** "Protocol extensions let classes inherit stored properties from structs." | 0 | No | Fail (0%) |
| **q26** (written) Dynamic vs static dispatch in protocol extensions | **Good:** Explains methods in protocol definition use dynamic dispatch through witness tables, executing conforming type version; methods only in extensions use static dispatch resolved at compile time; notes calling extension-only method on protocol reference ignores type override. | 100 | Yes | Pass (100%) |
| | **Average:** "Methods in the protocol header use dynamic dispatch, but methods only in the extension use static dispatch." | 80 | Yes | Pass (80%) |
| | **Weak:** "All protocol methods in Swift are dispatched through Objective-C runtime selectors." | 0 | No | Fail (0%) |
| **q27** (written) Protocol composition and Interface Segregation Principle | **Good:** Explains composition combines protocols with the ampersand operator; supports ISP by keeping protocols small and focused; clients only depend on capabilities they actually use. | 100 | Yes | Pass (100%) |
| | **Average:** "Protocol composition uses the ampersand to combine multiple protocols so functions only ask for what they need." | 80 | Yes | Pass (80%) |
| | **Weak:** "Protocol composition is when you inherit from ten base classes at once." | 0 | No | Fail (0%) |
| **q28** (written) Testability and dependency injection with POP | **Good:** Explains defining service protocols decouples ViewModels from concrete implementations like URLSession; tests inject mock structs with stubbed data; provides deterministic, fast unit tests without live networks. | 100 | Yes | Pass (100%) |
| | **Average:** "Using protocols lets you inject fake mock objects into your classes during unit tests without touching real networks." | 80 | Yes | Pass (80%) |
| | **Weak:** "Protocols make testing impossible because structs have no memory addresses." | 0 | No | Fail (0%) |
| **q29** (code-write) Describable protocol and Item struct | **Good:** Model answer: protocol Describable with func describe() -> String; extension with default returning 'General item'; struct Item conforming; prints "General item". | 100 | Yes | Pass (100%) |
| | **Average:** Declares protocol and extension but implements redundant describe() in Item. | 65 | Yes | Pass (65%) |
| | **Weak:** Writes empty protocol without method requirement or extension. | 20 | No (requirement missed) | Fail (20%) |
| **q30** (code-write) Payable protocol and PremiumInvoice override | **Good:** Model answer: protocol Payable with fee() -> Int; extension default returning 10; struct PremiumInvoice overriding fee() returning 25; prints "25". | 100 | Yes | Pass (100%) |
| | **Average:** Forgets protocol extension default, implementing fee() only in struct. | 60 | No (extension default missed) | Fail (60%) |
| | **Weak:** Writes class with override func fee() without conforming to Payable. | 20 | No | Fail (20%) |
| **q31** (code-write) Named & Tagged protocol composition | **Good:** Model answer: Named and Tagged protocols with get-only string properties; logItem(item: Named & Tagged) prints formatted string; Article struct conforms; prints "Swift 6 [#iOS]". | 100 | Yes | Pass (100%) |
| | **Average:** Writes function taking two separate arguments instead of composite type parameter. | 60 | No (composition missed) | Fail (60%) |
| | **Weak:** Writes single protocol with both properties instead of composing two protocols. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully verify:
1. Clear understanding of protocol composition over class inheritance.
2. Accurate grasp of default implementations in protocol extensions.
3. Precise knowledge of witness table dynamic dispatch versus extension-only static dispatch.
4. Clean application of small protocols and dependency injection in unit testing.
