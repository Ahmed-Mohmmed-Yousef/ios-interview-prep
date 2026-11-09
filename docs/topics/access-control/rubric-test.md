# Rubric Test — Access Control (Step 5)

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
| **q24** Difference between open and public | **Good:** Both open and public allow external module access; open allows external subclassing and method overriding, while public prohibits external inheritance; open is chosen when framework authors intentionally design extension points. | 100 | Yes | Pass (100%) |
| | **Average:** "open lets other modules subclass, but public blocks subclassing outside the module." | 75 | Yes | Pass (75%) |
| | **Weak:** "open is for classes and public is for structs." | 0 | No | Fail (0%) |
| **q25** Purpose of private(set) | **Good:** Explains private(set) allows public or internal reading while restricting modification to private scope; avoids boilerplate getter methods while protecting internal state from external mutation. | 100 | Yes | Pass (100%) |
| | **Average:** "private(set) lets people read the variable from outside, but only the struct can change it." | 80 | Yes | Pass (80%) |
| | **Weak:** "private(set) makes both getter and setter private." | 0 | No | Fail (0%) |
| **q26** Why public structs lack public memberwise inits | **Good:** Explains the default memberwise initializer is internal to avoid leaking private implementation details; forces library authors to design intentional public initializers so future private property changes do not break client code. | 100 | Yes | Pass (100%) |
| | **Average:** "Because the memberwise initializer is internal to keep private fields hidden from outside code." | 75 | Yes | Pass (75%) |
| | **Weak:** "Public structs cannot have initializers." | 0 | No | Fail (0%) |
| **q27** private vs fileprivate and extensions | **Good:** Explains private is scoped to the enclosing declaration and same-file extensions; fileprivate allows access from anywhere within the same source file, including unrelated types; both allow same-file extensions to access members. | 100 | Yes | Pass (100%) |
| | **Average:** "private is just for the type and its extensions in the same file, while fileprivate is for the whole file." | 85 | Yes | Pass (85%) |
| | **Weak:** "private is for one file and fileprivate is for one folder." | 0 | No | Fail (0%) |
| **q28** package access level in Swift 5.9 | **Good:** Explains package access allows sharing types and members across multiple targets within the same Swift package; prevents having to expose internal framework architecture APIs as public to external clients. | 100 | Yes | Pass (100%) |
| | **Average:** "package lets different targets in the same package share code without making it public." | 80 | Yes | Pass (80%) |
| | **Weak:** "package is an alias for internal." | 0 | No | Fail (0%) |
| **q29** Player struct with private(set) score code-write | **Good:** Model answer: struct Player with private(set) var score = 0 and mutating func addPoints(_ count: Int); outputs 15. | 100 | Yes | Pass (100%) |
| | **Average:** Declares var score = 0 without private(set), allowing external write mutation. | 50 (capped) | No (private(set) missed) | Fail (50%) |
| | **Weak:** Declares score as private let without mutating method. | 25 | No | Fail (25%) |
| **q30** public ServerConfig struct with explicit public init code-write | **Good:** Model answer: public struct ServerConfig with public let host and port, plus explicit public init(host:port:); outputs api.example.com:443. | 100 | Yes | Pass (100%) |
| | **Average:** Forgets public modifier on init, leaving it internal and unusable from external modules. | 50 (capped) | No (public init missed) | Fail (50%) |
| | **Weak:** Writes a class instead of struct and omits public modifiers. | 25 | No | Fail (25%) |
| **q31** Counter class with private count code-write | **Good:** Model answer: class Counter with private var count = 0, func increment(), and func getValue() -> Int; outputs 2. | 100 | Yes | Pass (100%) |
| | **Average:** Leaves count property internal instead of private. | 60 | No (private missed) | Fail (60%) |
| | **Weak:** Returns hardcoded 2 without property or mutation. | 0 | No | Fail (0%) |

---

## Verdict

The rubrics successfully verify:
1. Understanding of the 6 Swift access levels (open, public, package, internal, fileprivate, private).
2. Knowledge of read-only public properties using `private(set)`.
3. Recognition of the public struct memberwise initializer trap.
4. Correct use of `public init` for framework library code.
