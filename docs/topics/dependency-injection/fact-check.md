# Fact-Check Report: Dependency Injection

## 1. Verified Sources
- **Apple Developer Documentation**: Environment (SwiftUI)
  - URL: `https://developer.apple.com/documentation/swiftui/environment`
  - Verified: Built-in tree-based dependency injection using `@Environment` and `EnvironmentValues`.
- **Martin Fowler Architecture Reference**: Inversion of Control Containers and the Dependency Injection pattern
  - URL: `https://martinfowler.com/articles/injection.html`
  - Verified: Decoupling collaborator construction from usage, constructor (initializer) injection patterns, service locator trade-offs.

## 2. Technical Claims Verification
- **Inversion of Control**: Confirmed that DI inverts collaborator management so that consumers receive dependencies rather than constructing them directly.
- **Initializer Injection**: Confirmed that initializer injection in Swift enables `let` constant properties, enforces non-nil guarantees, and prevents half-initialized object states.
- **Protocol Abstraction**: Confirmed that declaring protocol boundaries allows unit tests to supply deterministic mocks and stubs without triggering network or disk side effects.
- **Service Locator Anti-Pattern**: Confirmed that service locators obscure dependencies from initializers and risk runtime crashes when dependencies are missing.
- **SwiftUI Environment**: Confirmed that `@Environment` provides tree-level dependency propagation across child views.

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
