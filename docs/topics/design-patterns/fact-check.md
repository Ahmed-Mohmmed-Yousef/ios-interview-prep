# Fact-Check Report: Design Patterns

## 1. Verified Sources
- **Apple Developer Documentation**: Managing a Shared Resource Using a Singleton (Swift)
  - URL: `https://developer.apple.com/documentation/swift/managing-a-shared-resource-using-a-singleton`
  - Verified: Thread-safe lazy static property initialization and private initializer guarantees in Swift.
- **Apple Developer Documentation Archive**: Cocoa Design Patterns
  - URL: `https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaFundamentals/CocoaDesignPatterns/CocoaDesignPatterns.html`
  - Verified: Core Cocoa structural, creational, and behavioral patterns including Adapter, Observer, Delegation, and Factory.

## 2. Technical Claims Verification
- **Singleton Initialization**: Confirmed that Swift initializes `static let` constants lazily with thread safety built into the runtime.
- **Private Initializers**: Confirmed that `private init()` prevents external instantiation, enforcing a single instance.
- **Swift 6 Strict Concurrency**: Confirmed that singletons with mutable state require `@MainActor` or actor isolation in Swift 6 language mode to prevent data races.
- **Singleton Anti-Pattern**: Confirmed that global mutable state, hidden dependencies, and test pollution make uncontrolled singletons problematic in enterprise codebases.
- **Factory & Adapter**: Confirmed the roles of Factory for centralized creation and Adapter for interface translation without modifying third-party or legacy code.

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
