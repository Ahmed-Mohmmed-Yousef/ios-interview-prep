# Research: Unit Tests (Swift Testing and XCTest)

## 1. Core Concepts & Technical Facts

### What is a Unit Test?
- A **unit test** is an automated test that exercises a small, isolated piece of code (a single method, struct, or class) in memory.
- **The AAA Pattern (Arrange, Act, Assert)**:
  1. **Arrange**: Prepare input data, dependencies, and mocks.
  2. **Act**: Invoke the method under test.
  3. **Assert**: Verify that the actual outcome matches expectations.

### The Two iOS Testing Frameworks

#### 1. XCTest (Legacy / Traditional Framework)
- Apple's original test framework based on Objective-C `XCTestCase` class inheritance.
- **Test Discovery**: Methods must be prefixed with `test` (e.g., `func testUserLogin()`).
- **Lifecycle**: `setUpWithError()` and `tearDownWithError()`.
- **Assertions**:
  - `XCTAssertEqual(a, b)`
  - `XCTAssertTrue(a)`, `XCTAssertFalse(a)`
  - `XCTAssertNil(a)`, `XCTAssertNotNil(a)`
  - `XCTAssertThrowsError(try ...)`
  - `XCTUnwrap(optional)`: unrolls an optional or fails the test immediately if nil.
- **Asynchronous Testing**: `expectation(description:)`, `fulfill()`, and `await fulfillment(of: [exp], timeout: 2.0)`.

#### 2. Swift Testing (`import Testing`, Xcode 16 / Swift 6)
- Modern, pure Swift, macro-driven testing framework designed from the ground up for modern Swift features (concurrency, value types, macros).
- **Test Attributes**:
  - `@Test`: Marks a function as a test. Can provide custom display names: `@Test("Calculates cart total with discount") func cartTotal()`.
  - `@Suite`: Groups related test functions into a struct, class, or actor. Structs are preferred because tests run concurrently in parallel by default!
- **Assertions**:
  - `#expect(condition)`: Records a failure if false, but **continues executing the rest of the test**.
  - `try #require(condition)`: Records a failure and **throws an error to abort the test immediately** (essential when unwrapping optionals or checking preconditions).
- **Parameterized Testing**:
  - Out of the box: `@Test(arguments: [1, 5, 10]) func checkValues(val: Int)`. Tests each input independently.
- **Tags & Traits**:
  - `@Test(.tags(.critical), .enabled(if: ...))`
  - Custom traits for bug tracking: `@Test(.bug("https://github.com/...", "Issue 42"))`.

### XCTest to Swift Testing Migration Mapping

| XCTest | Swift Testing |
|---|---|
| `class MyTests: XCTestCase` | `@Suite struct MyTests` (or just `@Test func`) |
| `func testAddition()` (name prefix) | `@Test("Descriptive name") func addition()` |
| `XCTAssertEqual(a, b)` | `#expect(a == b)` |
| `XCTAssertTrue(a)` | `#expect(a)` |
| `XCTAssertNil(a)` | `#expect(a == nil)` |
| `XCTUnwrap(a)` | `try #require(a)` |
| `setUp()` / `tearDown()` | `init()` and `deinit` in `@Suite` type |
| Sequential test execution | Concurrent parallel execution by default |

### Test Doubles (Mocks, Stubs, Spies)
- **Dummy**: Passed around but never actually used (e.g. placeholder parameter).
- **Stub**: Provides canned answers to calls made during the test.
- **Spy**: Records calls and parameters so the test can assert on interactions.
- **Mock**: Objects pre-programmed with expectations which form a specification of the calls they are expected to receive.

---

## 2. Common Misconceptions & Interview Traps

1. **"Unit tests should test database queries and live network APIs"**:
   - *Trap*: Writing unit tests that hit staging backend APIs or read real file paths.
   - *Reality*: Unit tests must be fast, deterministic, and isolated. Real network and database calls belong to Integration or End-to-End tests.
2. **"`#expect` and `#require` are identical"**:
   - *Trap*: Using `#expect` when unwrapping optionals.
   - *Reality*: `#expect` continues execution on failure, which causes subsequent optional force-unwraps to crash. `try #require` throws and halts the test immediately upon failure.
3. **"Swift Testing runs tests in sequential order like XCTest"**:
   - *Trap*: Sharing mutable global state or singletons between tests.
   - *Reality*: Swift Testing runs test cases concurrently in parallel by default. Shared mutable singletons cause race conditions and flaky tests.
4. **"Unit testing view controllers is the priority in iOS"**:
   - *Trap*: Trying to write unit tests for UIViewController views.
   - *Reality*: Unit testing should focus on pure business logic, models, view models, and domain engines. UI and user flows are best covered by UI tests or snapshot tests.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "Unit tests verify that small pieces of code, like functions and models, work correctly. We follow the Arrange-Act-Assert pattern. In iOS, Apple provides XCTest and the new Swift Testing framework. XCTest uses classes that inherit from `XCTestCase` and functions starting with `test`. Swift Testing uses `@Test` and `@Suite` macros with `#expect` assertions. Unit tests should be fast, isolated, and never hit live networks."
- **Junior**:
  - "I structure unit tests using the Arrange-Act-Assert pattern. With XCTest, I use `XCTestCase` subclasses and assertions like `XCTAssertEqual`. In Xcode 16 and Swift 6, I use Swift Testing with `@Test` and `@Suite`. Swift Testing allows using structs instead of classes and provides `#expect` for non-halting checks and `try #require` when an unwrap failure should halt the test immediately. I decouple dependencies using protocols so I can inject fast in-memory mocks instead of hitting live network endpoints."
- **Senior**:
  - "In modern iOS architecture, unit testability is a first-class design constraint. We decouple domain logic from UIKit and Core Data using the Dependency Inversion Principle, injecting mock protocols. With Swift Testing in Swift 6, tests run in parallel across actors by default, which enforces thread isolation and catches hidden mutable singleton leaks. We leverage parameterized testing via `@Test(arguments:)` to test boundary edge cases declaratively, and organize tests into suites with tags. We aim for high coverage on pure business rules, keeping test suites running in seconds to maintain rapid CI/CD deployment cadences."
