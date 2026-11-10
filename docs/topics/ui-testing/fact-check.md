# Fact-Check Report: UI Tests

## 1. Verified Sources
- **Apple Developer Documentation**: XCUIAutomation
  - URL: `https://developer.apple.com/documentation/xcuiautomation`
  - Verified: Xcode UI testing framework, separate test runner process architecture, accessibility tree queries, and element interactions.
- **Apple Developer Documentation**: XCUIApplication (XCUIAutomation)
  - URL: `https://developer.apple.com/documentation/xcuiautomation/xcuiapplication`
  - Verified: Application proxy lifecycle (`launch()`, `activate()`, `terminate()`), configuration via `launchArguments` and `launchEnvironment`.

## 2. Technical Claims Verification
- **Process Isolation**: Confirmed that XCUITest executes in an independent test runner process completely isolated from the target app's memory space, interacting strictly through iOS accessibility IPC.
- **Identifiers vs Labels**: Confirmed that `accessibilityIdentifier` is a stable, non-localized, user-invisible identifier specifically designed for automated test queries, whereas `accessibilityLabel` is user-facing and spoken by VoiceOver.
- **Launch Arguments Configuration**: Confirmed that passing custom CLI arguments to `app.launchArguments` allows the app to read `ProcessInfo.processInfo.arguments` at launch to enable mock data or disable animations.
- **Polling vs Sleep**: Confirmed that `element.waitForExistence(timeout:)` polls the accessibility hierarchy and resumes execution immediately upon rendering, avoiding flaky failures and execution delays caused by fixed `sleep()` calls.
- **Page Object Pattern**: Confirmed that encapsulating screen queries and interactions in dedicated Page Object models decouples test assertions from UI layout refactoring.

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
