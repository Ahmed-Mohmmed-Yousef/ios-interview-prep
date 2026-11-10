# Topic Research: Testable Code and Mocks

## 1. Official Sources & Test Double Foundations
- **Apple Documentation**: Testing in Xcode
  - https://developer.apple.com/documentation/xcode/testing
  - Xcode testing infrastructure, Swift Testing framework (`@Test`), and XCTest assertions.
- **Martin Fowler**: Mocks Aren't Stubs
  - https://martinfowler.com/articles/mocksArentStubs.html
  - Definitive taxonomy of test doubles (Dummy, Stub, Spy, Mock, Fake) and state vs. behavior verification.

## 2. Core Concepts
1. **Qualities of Testable Code**:
   - Explicit dependency injection via protocols.
   - High cohesion and single responsibility.
   - Elimination of global hidden state (singletons, direct hardware clocks, random generators).
   - Deterministic execution without real network or disk latency.
2. **Taxonomy of Test Doubles**:
   - **Dummy**: Passed to satisfy method signatures; never accessed or evaluated.
   - **Stub**: Supplies canned return values or fixed errors to callers.
   - **Spy**: Records calls made to it (e.g., `invokedMethodCount`, `lastArguments`) for verification after the action.
   - **Mock**: Pre-programmed with expectations that verify communication behavior.
   - **Fake**: Functional working implementation using lightweight shortcuts (e.g., an in-memory dictionary instead of a SQLite database).
3. **Verification Strategies**:
   - **State Verification**: Inspects final state or return values (`XCTAssertEqual(vm.title, "Expected")`). Resilient to internal refactoring.
   - **Behavior Verification**: Inspects interactions and method call sequences on collaborators (`XCTAssertEqual(analyticsSpy.loggedEvents, ["click"])`).

## 3. Common Traps & Best Practices
1. **Over-Mocking Anti-Pattern**:
   - Mocking every internal collaborator couples tests tightly to private implementation details. Refactoring breaks the test even if the feature still works.
2. **Hidden System Clock / Time Dependencies**:
   - Directly invoking `Date()` or `Task.sleep` inside business logic makes tests flaky or slow. Inject a clock or time provider closure.
3. **Asserting on the Mock Instead of the System Under Test (SUT)**:
   - Tests should verify the SUT's reaction or output, not just verify mock mechanics.
