# Rubric Test — SOLID Basics (Step 5)

Run 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** Summarize the five SOLID principles | **Good:** Accurately lists and defines all five principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. | 100 | Yes | Pass (100%) |
| | **Average:** Lists all 5 letters correctly and explains 4 of them clearly, but gives a vague definition for Liskov Substitution. | 85 | Yes | Pass (85%) |
| | **Weak:** "SOLID means making code solid like rock so users cannot change variables." | 0 | No | Fail (0%) |
| **q25** Open/Closed Principle in checkout system | **Good:** Explains growing switch statements risk regressions in tested code; shows how a `PaymentMethod` protocol allows adding Apple Pay via a new conforming type without modifying existing code. | 100 | Yes | Pass (100%) |
| | **Average:** "Using a PaymentMethod protocol lets us add new payment methods with new structs instead of editing an existing switch statement." | 85 | Yes | Pass (85%) |
| | **Weak:** "Open/Closed means you open the file and close Xcode before building." | 0 | No | Fail (0%) |
| **q26** Liskov Substitution Principle and iOS violations | **Good:** Defines Liskov Substitution: subtypes must fulfill parent contracts without breaking correctness; gives violation example of subclassing `File` into `ReadOnlyFile` and throwing `fatalError` on `save()`. | 100 | Yes | Pass (100%) |
| | **Average:** "Subclasses must work wherever the parent is used. A violation is overriding a method to crash with fatalError because it is unsupported." | 85 | Yes | Pass (85%) |
| | **Weak:** "Liskov Substitution means swapping integers for strings in array literals." | 0 | No | Fail (0%) |
| **q27** Dependency Inversion Principle and fast unit testing | **Good:** Explains high-level modules like ViewModels depend on protocol abstractions like `UserLoader`; tests inject mock implementations running in milliseconds without live network servers. | 100 | Yes | Pass (100%) |
| | **Average:** "ViewModels depend on protocols, so tests can inject mock objects instead of real network loaders, making tests fast and reliable." | 85 | Yes | Pass (85%) |
| | **Weak:** "Dependency Inversion tests code by reversing the order of git commits." | 0 | No | Fail (0%) |
| **q28** Interface Segregation Principle and Swift protocol composition | **Good:** Defines ISP: clients should not depend on methods they do not use; explains Swift composes small protocols using the ampersand operator (`Readable & Writable`). | 100 | Yes | Pass (100%) |
| | **Average:** "Keep protocols small so types only implement what they need, and combine them with the ampersand operator in Swift." | 85 | Yes | Pass (85%) |
| | **Weak:** "Interface Segregation segregates user interface views by screen resolution." | 0 | No | Fail (0%) |
| **q29** `PaymentProcessor` protocol and `ApplePayProcessor` | **Good:** Defines protocol with `process(amount: Int) -> Bool` and struct conforming to it returning true for amounts greater than zero. | 100 | Yes | Pass (100%) |
| | **Average:** Implements protocol and struct, but returns constant true regardless of amount. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing protocol or invalid function signature. | 20 | No | Fail (20%) |
| **q30** `Readable`, `Writable`, and `MemoryBuffer` | **Good:** Defines both protocols and creates `MemoryBuffer` class conforming to both, storing and returning string text. | 100 | Yes | Pass (100%) |
| | **Average:** Defines protocols and class, but conforms only to `Readable` and omits `Writable`. | 50 | No | Fail (50% - capped by key criterion) |
| | **Weak:** Empty class without protocol conformance. | 10 | No | Fail (10%) |
| **q31** `DataFetcher` protocol and `ContentManager` | **Good:** Defines `DataFetcher` protocol, `ContentManager` class with initializer injection, and `displayContent()` calling `fetch()`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements protocol and class, but instantiates concrete fetcher directly instead of using initializer injection. | 60 | No | Fail (60%) |
| | **Weak:** Missing protocol and initializer. | 10 | No | Fail (10%) |

---

## Verdict

The rubrics successfully:
1. Validate clear definitions of all 5 SOLID principles.
2. Verify understanding of OCP with protocols vs growing switch statements.
3. Test comprehension of LSP substitutability and fatalError subclassing hazards.
4. Reinforce DIP with protocol abstractions and fast mock-driven unit testing.
5. Check ISP and Swift protocol composition with the ampersand operator.
6. Accurately grade Swift 6 protocol and dependency injection implementations.
