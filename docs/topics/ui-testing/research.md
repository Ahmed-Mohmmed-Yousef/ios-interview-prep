# Research: UI Tests (ui-testing)

## 1. Official Documentation & Specifications
- **Apple Developer Documentation**: `XCUIAutomation`
  - URL: `https://developer.apple.com/documentation/xcuiautomation`
  - Key concepts: UI testing framework in Xcode; interacts with app user interface elements using the accessibility hierarchy.
- **Apple Developer Documentation**: `XCUIApplication`
  - URL: `https://developer.apple.com/documentation/xcuiautomation/xcuiapplication`
  - Key concepts: Proxy object for the application under test; lifecycle controls (`launch()`, `activate()`, `terminate()`); configuring execution parameters via `launchArguments` and `launchEnvironment`.
- **Apple Developer Documentation**: `XCUIElement` & `XCUIElementQuery`
  - Key concepts: `XCUIElement` represents a control or view; `XCUIElementQuery` finds elements matching predicates or identifiers; dynamic queries evaluate on-demand; `waitForExistence(timeout:)` performs polling waits without freezing tests.

## 2. Core Concepts & Architectural Patterns
- **Process Isolation**:
  - UI tests execute in an independent test runner process, completely separated from the target application's process.
  - The test runner communicates with the app process via inter-process accessibility APIs.
  - Because memory is isolated, tests cannot directly inspect internal Swift structs, view models, or variables; all interaction happens through the UI.
- **Identifiers vs Labels**:
  - `accessibilityIdentifier`: A unique, stable programmatic identifier (string) assigned to views. It is invisible to users and unaffected by language/localization changes. Ideal for automated testing selectors.
  - `accessibilityLabel`: A localized descriptive string read by assistive technologies (VoiceOver). Subject to changes across languages and product copy updates.
- **Launch Arguments and Configuration**:
  - `app.launchArguments.append("--uitesting")` passes CLI arguments consumed by `ProcessInfo.processInfo.arguments` in the app.
  - Used to mock API responses, reset databases/UserDefaults, and disable animations (`UIView.setAnimationsEnabled(false)`) to speed up tests.
- **Page Object Pattern (POM)**:
  - Encapsulates queries and interactions for a screen inside a dedicated class or struct (e.g., `LoginPage`, `HomeScreen`).
  - Shields test cases from UI layout changes: when an element identifier or hierarchy shifts, only the page object needs updating.
- **Flakiness Prevention**:
  - Replace hardcoded sleeps with `waitForExistence(timeout:)`.
  - Isolate tests from external network dependencies using local mock servers or launch flags.
  - Reset app state before each test run (`setUpWithError`).

## 3. Real Interview Questions
1. How does an XCUITest test runner communicate with the iOS app under test?
2. Why should you always use `accessibilityIdentifier` instead of `accessibilityLabel` or raw button titles when querying elements in UI tests?
3. How can you configure an app to use mock network data or bypass login screens during UI testing?
4. What is the Page Object Pattern, and how does it improve UI test suite maintainability?
5. What are the common causes of flakiness in iOS UI tests, and how do you eliminate them?
