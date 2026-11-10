# Fact-Check Report: Testing Async Code

## 1. Verified Sources
- **Apple Developer Documentation**: Testing asynchronous code (Swift Testing)
  - URL: `https://developer.apple.com/documentation/testing/testing-asynchronous-code`
  - Verified: Modern async testing support in Swift Testing and XCTest, marking test functions `async throws`, direct awaiting of asynchronous APIs, and actor isolation testing.
- **Apple Developer Documentation**: Asynchronous Tests and Expectations (XCTest)
  - URL: `https://developer.apple.com/documentation/xctest/asynchronous-tests-and-expectations`
  - Verified: Legacy completion handler testing using `XCTestExpectation`, `fulfillment(of:timeout:)`, inverted expectations, and comparison to linear async/await tests.

## 2. Technical Claims Verification
- **Direct Await in Tests**: Verified that test methods declared as `func test...() async throws` allow linear awaiting of asynchronous code without manual expectation setup.
- **Actor Testing and Swift 6**: Confirmed that actor methods and isolated properties must be called with `await` from test functions, and that Swift 6 compiler flags data race violations when actor boundaries are violated synchronously.
- **Cancellation Testing**: Verified that wrapping an async function in a structured `Task` and calling `cancel()` allows verifying that `CancellationError` is thrown or `Task.isCancelled` evaluates to true.
- **Avoiding Sleep Delays**: Confirmed that `Task.sleep` introduces test flakiness under variable CI load and increases execution duration; injecting clock abstractions or test clocks provides deterministic behavior.

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
