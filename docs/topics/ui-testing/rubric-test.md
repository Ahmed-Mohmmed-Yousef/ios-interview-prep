# Rubric Tests: UI Tests

## Question 24 (written): Process Isolation in UI Tests

Prompt: Why does an iOS UI test run in an independent process rather than inside the application process? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> An iOS UI test executes in an independent process to simulate an external user interacting with the device screen through accessibility APIs. This separation ensures tests interact strictly through visible controls without reaching into internal application memory or private Swift types. As a result, the test validates true end-to-end behavior just like a real user holding an iPhone.
- Criterion 1 (simulates user through accessibility APIs): 50/50 (Met)
- Criterion 2 (process separation prevents touching internal memory/types): 50/50 (Met)

### Average Answer (Score: 50/100)
> The UI test runs in another process so it acts like a real person tapping buttons on the screen through accessibility.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Omits discussion of memory isolation and private types)

### Weak Answer (Score: 0/100)
> It runs in a separate process because iOS apps cannot run unit tests on real physical devices.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 25 (written): accessibilityIdentifier vs Localized Text

Prompt: Explain why UI automation tests should query views using accessibilityIdentifier instead of accessibilityLabel or visible button text. Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Automated UI tests should always query views using `accessibilityIdentifier` because it is an internal, stable string key that never changes with localization or marketing copy updates. In contrast, `accessibilityLabel` and visible button text are user-facing strings read aloud by VoiceOver or translated into other languages. Relying on visible text causes tests to break as soon as copy is revised or the test runs in another locale.
- Criterion 1 (accessibilityIdentifier is stable internal key): 50/50 (Met)
- Criterion 2 (visible text/accessibilityLabel changes and breaks tests): 50/50 (Met)

### Average Answer (Score: 50/100)
> You should use accessibilityIdentifier because it does not change when your app gets translated into Spanish or German.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Lacks comparison to accessibilityLabel and user-facing copy)

### Weak Answer (Score: 0/100)
> accessibilityIdentifier is faster to render on the GPU during tests than accessibilityLabel.
- Criterion 1: 0/50 (Irrelevant)
- Criterion 2: 0/50 (Irrelevant)

---

## Question 26 (written): The Page Object Pattern

Prompt: Describe the Page Object pattern and how it improves UI test maintainability in an iOS codebase. Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> The Page Object pattern encapsulates on-screen element selectors, queries, and user actions for a specific screen into a dedicated class or struct. This design pattern separates test business logic from UI hierarchy details. When a screen layout changes or an element is moved, developers only update the corresponding Page Object rather than editing dozens of individual test cases.
- Criterion 1 (encapsulates selectors, queries, actions for a screen): 50/50 (Met)
- Criterion 2 (UI refactoring only requires updating the page object): 50/50 (Met)

### Average Answer (Score: 50/100)
> The Page Object pattern groups all the buttons and text fields of a screen into one object so you do not repeat selector code.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Does not explain maintenance resilience during layout updates)

### Weak Answer (Score: 0/100)
> Page objects are UIViewController subclasses used to render screens faster in Xcode previews.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 27 (written): Avoiding sleep() Delays

Prompt: Why is using sleep() considered an anti-pattern in UI tests, and what should you use instead? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Hardcoding `sleep()` calls is an anti-pattern because fixed time delays dramatically increase total test suite run duration while still failing under variable CI server load. If a test sleeps for 3 seconds but the network takes 3.1 seconds under heavy CPU contention, the test flakes. Instead, teams should use `element.waitForExistence(timeout:)`, which polls the accessibility hierarchy and resumes execution the millisecond the element appears.
- Criterion 1 (wastes test execution time and causes CI flakiness): 50/50 (Met)
- Criterion 2 (recommends waitForExistence for immediate resumption): 50/50 (Met)

### Average Answer (Score: 50/100)
> You should not use sleep() because it makes your test suite run very slowly. You should use waitForExistence instead.
- Criterion 1: 25/50 (Mentions speed, misses CI flakiness under load)
- Criterion 2: 50/50 (Met)

### Weak Answer (Score: 0/100)
> sleep() is not allowed because Xcode crashes when threads are blocked during UI tests.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 28 (written): Launch Arguments for Fast Deterministic Tests

Prompt: How can engineering teams use launchArguments to make UI tests fast, deterministic, and isolated from external services? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Engineering teams can pass custom string flags into `app.launchArguments` prior to launching the application under test. Inside the app, startup code checks `ProcessInfo.processInfo.arguments` to activate mock networking, reset local databases, and disable UI animations. This eliminates flaky external network dependencies and removes unnecessary animation delays, making UI tests fast and reliable.
- Criterion 1 (passes custom launch arguments to configure app mode): 50/50 (Met)
- Criterion 2 (app checks ProcessInfo to mock networking, disable animations, reset DB): 50/50 (Met)

### Average Answer (Score: 50/100)
> Teams use launchArguments to pass `--mock-network` so the app uses fake data instead of real servers.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Omits ProcessInfo check, disabling animations, and resetting state)

### Weak Answer (Score: 0/100)
> Launch arguments change the iOS bundle identifier to bypass App Store code review.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 29 (code-write): PageElement Implementation

Prompt: Implement a struct `PageElement` with properties `let identifier: String` and `var tapped: Bool`. Add a mutating method `tap()` that sets `tapped` to `true`. Instantiate an element with identifier 'checkout_button' and `tapped: false`, call `tap()`, and print 'Button checkout_button tapped: true'.

### Good Answer (Score: 100/100)
```swift
struct PageElement {
    let identifier: String
    var tapped: Bool

    mutating func tap() {
        tapped = true
    }
}

var button = PageElement(identifier: "checkout_button", tapped: false)
button.tap()
print("Button \(button.identifier) tapped: \(button.tapped)")
```
- Criterion 1 (properties declared): 30/30 (Met)
- Criterion 2 (mutating tap sets tapped): 30/30 (Met)
- Criterion 3 (instantiates, calls tap, prints output): 40/40 (Met)

### Average Answer (Score: 60/100)
```swift
struct PageElement {
    let identifier: String
    var tapped: Bool

    mutating func tap() {
        tapped = true
    }
}

var button = PageElement(identifier: "checkout_button", tapped: false)
print("Button \(button.identifier) tapped: \(button.tapped)")
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 30/30 (Met)
- Criterion 3: 0/40 (Forgot to call tap(), printing false instead of true)

### Weak Answer (Score: 0/100)
```swift
let button = "checkout_button"
print("Button \(button) tapped: true")
```
- Criterion 1: 0/30
- Criterion 2: 0/30
- Criterion 3: 0/40

---

## Question 30 (code-write): LaunchInspector

Prompt: Create a `LaunchInspector` struct that stores an array of argument strings `let arguments: [String]`. Implement a method `isFlagEnabled(_ flag: String) -> Bool`. Instantiate it with flags `["--ui-testing", "--reset-db"]`, check for `"--ui-testing"`, and print 'UI Testing Enabled: true'.

### Good Answer (Score: 100/100)
```swift
struct LaunchInspector {
    let arguments: [String]

    func isFlagEnabled(_ flag: String) -> Bool {
        arguments.contains(flag)
    }
}

let inspector = LaunchInspector(arguments: ["--ui-testing", "--reset-db"])
let isEnabled = inspector.isFlagEnabled("--ui-testing")
print("UI Testing Enabled: \(isEnabled)")
```
- Criterion 1 (struct with arguments property): 30/30 (Met)
- Criterion 2 (isFlagEnabled method checks contains): 40/40 (Met)
- Criterion 3 (instantiates and prints 'UI Testing Enabled: true'): 30/30 (Met)

### Average Answer (Score: 70/100)
```swift
struct LaunchInspector {
    let arguments: [String]

    func isFlagEnabled(_ flag: String) -> Bool {
        arguments.contains(flag)
    }
}

let inspector = LaunchInspector(arguments: ["--ui-testing", "--reset-db"])
print(inspector.isFlagEnabled("--ui-testing"))
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 40/40 (Met)
- Criterion 3: 0/30 (Output missing 'UI Testing Enabled: ' prefix)

### Weak Answer (Score: 0/100)
```swift
let arguments = ["--ui-testing"]
print("UI Testing Enabled: true")
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30

---

## Question 31 (code-write): LoginScreenObject Page Object

Prompt: Implement a `LoginScreenObject` class representing the Page Object pattern. It should store `var username: String = ""` and `var isSubmitted: Bool = false`. Provide methods `func setUsername(_ name: String)` and `func submit()`. Instantiate it, set username to 'Sarah', call `submit()`, and print 'Submitted Sarah: true'.

### Good Answer (Score: 100/100)
```swift
class LoginScreenObject {
    var username: String = ""
    var isSubmitted: Bool = false

    func setUsername(_ name: String) {
        username = name
    }

    func submit() {
        isSubmitted = true
    }
}

let loginScreen = LoginScreenObject()
loginScreen.setUsername("Sarah")
loginScreen.submit()
print("Submitted \(loginScreen.username): \(loginScreen.isSubmitted)")
```
- Criterion 1 (class with username and isSubmitted): 30/30 (Met)
- Criterion 2 (setUsername and submit methods): 40/40 (Met)
- Criterion 3 (instantiates, calls methods, prints 'Submitted Sarah: true'): 30/30 (Met)

### Average Answer (Score: 60/100)
```swift
class LoginScreenObject {
    var username: String = ""
    var isSubmitted: Bool = false

    func setUsername(_ name: String) {
        username = name
    }

    func submit() {
        isSubmitted = true
    }
}

let screen = LoginScreenObject()
screen.setUsername("Sarah")
print("Submitted \(screen.username): false")
```
- Criterion 1: 30/30 (Met)
- Criterion 2: 40/40 (Met)
- Criterion 3: 0/30 (Never called submit() and printed false)

### Weak Answer (Score: 0/100)
```swift
print("Submitted Sarah: true")
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30
