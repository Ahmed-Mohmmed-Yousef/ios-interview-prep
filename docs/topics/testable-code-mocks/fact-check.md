# Fact-Check Report: Testable Code and Mocks

## 1. Verified Sources
- **Apple Developer Documentation**: Testing in Xcode
  - URL: `https://developer.apple.com/documentation/xcode/testing`
  - Verified: Xcode unit testing architecture, test doubles in Swift test targets, and Swift Testing framework assertions.
- **Martin Fowler Architecture Reference**: Mocks Aren't Stubs
  - URL: `https://martinfowler.com/articles/mocksArentStubs.html`
  - Verified: Classic test double taxonomy (Dummy, Stub, Spy, Mock, Fake) and state versus behavior verification principles.

## 2. Technical Claims Verification
- **Test Double Taxonomy**: Confirmed the formal definitions of Dummy (parameter placeholder), Stub (canned responses), Spy (interaction recorder), Mock (pre-programmed expectation verifier), and Fake (working in-memory shortcut).
- **Verification Strategy**: Confirmed that state verification asserts on output states/properties and provides greater resilience during internal refactoring than behavior verification.
- **Over-Mocking Pitfall**: Confirmed that mocking internal collaborators couples tests to private implementation details, while mocking external boundaries (network, disk, clock) ensures isolation.
- **Deterministic Time**: Confirmed that injecting time providers or clock protocols eliminates non-deterministic test flakiness caused by `Date()` or `UUID()`.

## 3. Code Verification
- All 2 lesson code examples compiled and verified with Swift 6 compiler (`swiftc -swift-version 6`).
- All 8 code-reading questions and 3 code-write model answers (11 total) compiled and verified with Swift 6 compiler.
- Total Swift examples verified: 13 (13 passed, 0 failed).

## 4. Quality Gate Checks
- `check-lesson.mjs`: Passed cleanly.
- `check-plain-english.mjs`: Passed on both lesson.mdx and questions.json.
- `check-coverage.mjs`: 0 errors, 0 warnings.
- Question distribution: Exactly 31 questions (15 MCQ, 8 code-reading, 5 written, 3 code-write).
- Answer spread: 6 a, 6 b, 6 c, 5 d across the 23 multiple choice questions.
