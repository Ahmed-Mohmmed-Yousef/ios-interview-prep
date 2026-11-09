# Rubric Test — Unit Tests (Step 5)

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
| **q24** AAA Pattern | **Good:** Explains Arrange sets up state and doubles, Act runs the code under test, Assert verifies expectations; notes clear separation, readability, and easy failure diagnosis. | 100 | Yes | Pass (100%) |
| | **Average:** "Arrange creates inputs and mock objects. Act calls the method under test. Assert verifies the output equals what we expected." (Misses team consistency / failure diagnosis details). | 85 | Yes | Pass (85%) |
| | **Weak:** "AAA stands for Apple App Architecture." | 0 | No | Fail (0%) |
| **q25** Swift Testing vs XCTest | **Good:** Explains XCTest uses classes inheriting XCTestCase and test prefixes; Swift Testing uses @Test and @Suite macros on structs/classes, running in parallel by default with #expect / try #require assertions. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift Testing uses @Test macros on structs instead of XCTestCase classes. It also replaces XCTAssert with #expect." | 85 | Yes | Pass (85%) |
| | **Weak:** "Swift Testing is an external third-party package for testing SwiftUI views only." | 0 | No | Fail (0%) |
| **q26** Test Isolation and Dependency Injection | **Good:** Explains live network and databases cause slow runs, flakiness, rate limits, and network timeouts; explains using protocols and Dependency Injection to supply in-memory test doubles. | 100 | Yes | Pass (100%) |
| | **Average:** "Live network calls make tests slow and unreliable. We inject mock objects using protocols so tests run completely offline." | 85 | Yes | Pass (85%) |
| | **Weak:** "Tests must always hit staging servers to ensure real internet connectivity works." | 0 | No | Fail (0%) |
| **q27** Stub vs Spy vs Mock | **Good:** Clearly distinguishes Stub (returns canned data), Spy (records call counts and arguments for inspection), and Mock (pre-programmed with strict behavioral expectations). | 100 | Yes | Pass (100%) |
| | **Average:** Accurately explains Stub and Spy, but gives a vague definition of Mock without mentioning behavioral verification. | 80 | Yes | Pass (80%) |
| | **Weak:** "Stubs are temporary comments, spies are analytics trackers, and mocks are SwiftUI previews." | 0 | No | Fail (0%) |
| **q28** try #require vs #expect | **Good:** Explains try #require halts execution immediately on failure by throwing, whereas #expect records a failure and continues; explains that using #expect before force-unwraps leads to fatal test crashes. | 100 | Yes | Pass (100%) |
| | **Average:** "#require throws an error and stops the test right away. #expect logs an error and lets the test keep running." | 85 | Yes | Pass (85%) |
| | **Weak:** "try #require is deprecated in Xcode 16 and replaced by #expect." | 0 | No | Fail (0%) |
| **q29** `MathEngine` and `testAdd()` | **Good:** Implements `MathEngine` with `add(_:_:)`, creates `testAdd()` arranging 3 and 7, acting with `engine.add`, and asserting 10. | 100 | Yes | Pass (100%) |
| | **Average:** Implements `MathEngine` and `testAdd()`, but hardcodes return without asserting dynamically. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing `MathEngine` struct or incorrect math function signature. | 20 | No | Fail (20%) |
| **q30** `UserRepository`, `MockUserRepo`, `UserProfile` | **Good:** Defines `UserRepository` protocol, `MockUserRepo` returning "MockUser", and `UserProfile` injecting repository and returning "User: MockUser". | 100 | Yes | Pass (100%) |
| | **Average:** Implements protocol and mock, but hardcodes "User: MockUser" in `UserProfile` without calling the repository. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing protocol abstraction or directly instantiating mock inside `UserProfile`. | 25 | No | Fail (25%) |
| **q31** `PaymentGateway` and `SpyPaymentGateway` | **Good:** Defines `PaymentGateway` protocol with `pay(cents:) -> Bool`, and `SpyPaymentGateway` tracking `wasCalled: Bool` and `lastCents: Int`. | 100 | Yes | Pass (100%) |
| | **Average:** Conforms to protocol and records `wasCalled`, but forgets to record `lastCents`. | 70 | Yes | Pass (70%) |
| | **Weak:** Implements concrete class without protocol or tracking state. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate clear understanding of the Arrange-Act-Assert (AAA) testing lifecycle.
2. Differentiate modern Swift Testing (@Test, @Suite, #expect, try #require) from legacy XCTest.
3. Test comprehension of test isolation, Dependency Injection, and deterministic test double patterns.
4. Distinguish test doubles: stubs, spies, and mocks.
5. Identify common pitfalls like crash risks with `#expect` versus `try #require` on optionals.
6. Grade Swift 6 test doubles, assertions, and test runners accurately.
