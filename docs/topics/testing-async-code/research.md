# Topic Research: Testing Async Code

## 1. Official Sources & Modern Apple Testing APIs
- **Apple Documentation**: Testing asynchronous code (Swift Testing)
  - https://developer.apple.com/documentation/testing/testing-asynchronous-code
  - Swift Testing framework: declaring async `@Test` functions, `confirmation` blocks, and time limits.
- **Apple Documentation**: Asynchronous Tests and Expectations (XCTest)
  - https://developer.apple.com/documentation/xctest/asynchronous-tests-and-expectations
  - `XCTestExpectation`, `fulfillment(of:timeout:)`, and async test methods in XCTest.
- **WWDC24**: Meet Swift Testing
  - https://developer.apple.com/videos/play/wwdc2024/10179/
  - Structured concurrency testing, native async assertions with `#expect` and `#require`.

## 2. Core Concepts & Mechanics
1. **Direct async/await in Test Functions**:
   - Modern test runners (both Swift Testing and XCTest) natively support `async throws` test functions.
   - Code can simply call `let result = try await service.fetch()` and assert directly with `#expect` or `XCTAssertEqual`.
   - Eliminates boilerplate callback expectations for async/await code.
2. **Swift Testing `confirmation` API**:
   - For callback-based APIs, event streams, or notifications:
     `await confirmation("Notification received", expectedCount: 1) { confirm in service.onUpdate = { confirm() } ... }`
3. **XCTest Expectations**:
   - `expectation(description:)`, `fulfill()`, and `await fulfillment(of: [expectation], timeout: 2.0)`.
4. **Testing Cancellation**:
   - Triggering `task.cancel()` on a cooperative `Task` and checking that it throws `CancellationError` or halts gracefully.
5. **Testing Actor Isolation**:
   - Calling actor methods from tests requires `await` and respects Swift 6 strict concurrency checks.

## 3. Common Traps & Antipatterns
1. **Unawaited Detached Tasks**:
   - Creating an unawaited `Task { ... }` inside a test causes the test method to exit before the task completes, producing false passes or intermittent crashes.
2. **Excessive Timeouts**:
   - Using large timeouts (e.g., 30–60 seconds) causes CI builds to stall when a test fails. Timeouts should be tight (1–2 seconds) for fast feedback.
3. **Flaky `Task.sleep` Delays**:
   - Inserting arbitrary delays to wait for concurrent tasks is fragile. Use structured concurrency, expectations, or confirmations instead.
