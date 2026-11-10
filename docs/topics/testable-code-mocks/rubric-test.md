# Rubric Test: Testable Code and Mocks

**Topic:** `testable-code-mocks`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Meaning of Test Double and Three Types

**Prompt:** Explain what a Test Double is and name three specific types of test doubles. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "A test double is a generic term for any replacement object used in place of a real production collaborator during automated testing. They prevent tests from interacting with external systems like remote APIs or physical disk databases. Three specific types of test doubles are Stubs, which provide canned return values; Spies, which record method invocations for later inspection; and Fakes, which provide functional in-memory implementations."
- **Expected Score:** 100% (Met: defines test double 50%, Met: names three specific types 50%)
- **Rationale:** Accurate definition and clearly names three specific test double types with their purposes.

### Sample 2: Average
- **Answer:** "A test double is an object you use during unit tests instead of a real service like a network client. Three types of test doubles are stubs, spies, and mocks."
- **Expected Score:** 100% (Met: definition 50%, Met: names three types 50%)
- **Rationale:** Clear and meets both criteria in simple terms.

### Sample 3: Weak
- **Answer:** "A test double is a 64-bit number used to test arithmetic operations."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: types 0%)
- **Rationale:** Confuses test double with the Double numeric type.

---

## Question 25 (Written): State vs Behavior Verification

**Prompt:** Explain the difference between state verification and behavior verification. Which is generally preferred, and why? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "State verification asserts on the final outcomes, returned values, or property state of the system under test after an action executes. Behavior verification checks whether specific collaborator methods were called, how many times they ran, and what arguments were passed. State verification is generally preferred because it tests outcomes rather than internal mechanics, ensuring that tests remain resilient when private implementation details are refactored."
- **Expected Score:** 100% (Met: contrasts state vs behavior verification 50%, Met: preference for state verification due to refactoring resilience 50%)
- **Rationale:** Comprehensive explanation addressing both definitions and the architectural reason for favoring state verification.

### Sample 2: Average
- **Answer:** "State verification checks the final properties or output values of an object, while behavior verification checks how many times helper methods were called. State verification is preferred because it does not break when you rename or change internal helper functions."
- **Expected Score:** 100% (Met: distinction 50%, Met: preference justification 50%)
- **Rationale:** Straightforward explanation in plain words.

### Sample 3: Weak
- **Answer:** "State verification is for SwiftUI view state, while behavior verification is only used in Core Data."
- **Expected Score:** 0% (Not Met: distinction 0%, Not Met: preference 0%)
- **Rationale:** Incorrect conceptual understanding.

---

## Question 26 (Written): The Over-Mocking Anti-Pattern

**Prompt:** What is the over-mocking anti-pattern, and what negative impact does it have on a test suite? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The over-mocking anti-pattern occurs when developers replace every internal collaborator or helper class with mocks rather than isolating only true external boundaries like network, disk, or device hardware. This creates a brittle test suite that is coupled to the exact private method call sequences of the system under test. As a result, routine internal refactorings cause widespread test failures even when the feature's observable behavior is completely intact."
- **Expected Score:** 100% (Met: defines over-mocking internal helpers 50%, Met: explains brittle tests breaking on refactoring 50%)
- **Rationale:** Accurately details the cause and the resulting maintenance cost.

### Sample 2: Average
- **Answer:** "Over-mocking happens when you mock internal objects instead of only mocking external boundaries like networks. It makes tests very fragile because any small change to your private code breaks the tests even if the feature still works."
- **Expected Score:** 100% (Met: definition 50%, Met: negative impact 50%)
- **Rationale:** Captures both key rubric points clearly.

### Sample 3: Weak
- **Answer:** "Over-mocking means writing more than ten unit tests per file."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: impact 0%)
- **Rationale:** Completely misunderstands the concept.

---

## Question 27 (Written): Injecting Clocks and Time Dependencies

**Prompt:** How does injecting system dependencies like clocks, dates, and UUIDs improve unit test reliability? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Calling Date() or UUID() directly inside business logic introduces non-determinism, as every test run receives a different timestamp or random identifier. By injecting a date provider closure or clock protocol, unit tests can supply a fixed, pre-programmed timestamp. This makes test runs completely deterministic, prevents timezone or timing-related flakiness, and enables instant verification of expiration or time-based logic."
- **Expected Score:** 100% (Met: explains non-determinism of direct system calls 50%, Met: describes injecting fixed values for deterministic assertions 50%)
- **Rationale:** Thorough coverage of non-determinism and the remediation through injected providers.

### Sample 2: Average
- **Answer:** "If you call Date() directly, the current time changes every second and causes flaky tests. Injecting a date closure allows your tests to pass a fixed date so assertions always compare the same predictable values."
- **Expected Score:** 100% (Met: flakiness problem 50%, Met: fixed date injection solution 50%)
- **Rationale:** Clear, accurate explanation.

### Sample 3: Weak
- **Answer:** "Clocks are injected to make the iPhone processor run faster during test compilation."
- **Expected Score:** 0% (Not Met: problem 0%, Not Met: solution 0%)
- **Rationale:** Irrelevant technical claims.

---

## Question 28 (Written): When to Use Fakes Instead of Stubs

**Prompt:** In what testing scenarios would you use a Fake implementation rather than a simple Stub? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "A developer should use a Fake implementation when a test involves multiple sequential operations that rely on working state, such as saving an entity, updating its properties, and later querying it back. A simple Stub only provides static, pre-programmed canned responses and cannot simulate realistic state mutations. In contrast, an in-memory Fake repository maintains working data across operations without incurring the latency or side effects of a real database."
- **Expected Score:** 100% (Met: explains Fake maintains working state across sequential operations 50%, Met: contrasts with static canned responses of Stubs 50%)
- **Rationale:** Explains when stateful in-memory doubles are superior to static stubs.

### Sample 2: Average
- **Answer:** "You use a Fake when you need a working in-memory store that can save and return items across multiple steps in a test. A stub only returns a single fixed value, while a fake actually stores data in memory during the test."
- **Expected Score:** 100% (Met: working in-memory state 50%, Met: contrast with stub 50%)
- **Rationale:** Simple and correct contrast.

### Sample 3: Weak
- **Answer:** "Fakes are only used when testing SwiftUI previews."
- **Expected Score:** 0% (Not Met: scenarios 0%, Not Met: contrast 0%)
- **Rationale:** Inaccurate limitation of testing concepts.

---

## Question 29 (Code-Write): TemperatureStub Implementation

**Prompt:** Declare a `TemperatureProvider` protocol with `func currentTemp() -> Int`. Create a `TemperatureStub: TemperatureProvider` struct initialized with a `temp: Int` property that returns it. Implement a `WeatherReporter` class with initializer injection of `TemperatureProvider` and a `report: String` property returning 'Temp: X'. Instantiate with 25 and print 'Temp: 25'.

### Sample 1: Good
- **Answer:**
```swift
protocol TemperatureProvider {
    func currentTemp() -> Int
}

struct TemperatureStub: TemperatureProvider {
    let temp: Int
    func currentTemp() -> Int {
        return temp
    }
}

final class WeatherReporter {
    let provider: TemperatureProvider
    init(provider: TemperatureProvider) {
        self.provider = provider
    }
    var report: String {
        return "Temp: \(provider.currentTemp())"
    }
}

let reporter = WeatherReporter(provider: TemperatureStub(temp: 25))
print(reporter.report)
```
- **Expected Score:** 100% (Met: protocol and stub struct 30%, Met: reporter with initializer injection 40%, Met: outputs 'Temp: 25' 30%)
- **Rationale:** Clean, compiles, passes verification.

### Sample 2: Average
- **Answer:**
```swift
protocol TemperatureProvider { func currentTemp() -> Int }
struct TemperatureStub: TemperatureProvider {
    var temp: Int
    func currentTemp() -> Int { temp }
}
class WeatherReporter {
    var provider: TemperatureProvider
    init(provider: TemperatureProvider) { self.provider = provider }
    var report: String { "Temp: \(provider.currentTemp())" }
}
let r = WeatherReporter(provider: TemperatureStub(temp: 25))
print(r.report)
```
- **Expected Score:** 100% (Met: protocol 30%, Met: class and injection 40%, Met: output 30%)
- **Rationale:** Complete and correct.

### Sample 3: Weak
- **Answer:**
```swift
print("Temp: 25")
```
- **Expected Score:** 0% (Not Met: protocol missing, stub missing, key criterion failed)
- **Rationale:** Hardcodes the output without writing the requested protocol or stub.

---

## Question 30 (Code-Write): AnalyticsSpy Implementation

**Prompt:** Define an `AnalyticsProtocol: AnyObject` protocol with `func logEvent(_ name: String)`. Implement an `AnalyticsSpy: AnalyticsProtocol` class that records logged event names into a `var events: [String] = []` array. Implement a `UserTracker` class that calls `logEvent` twice ('open' and 'click'). Track events and print 'Logged: 2'.

### Sample 1: Good
- **Answer:**
```swift
protocol AnalyticsProtocol: AnyObject {
    func logEvent(_ name: String)
}

final class AnalyticsSpy: AnalyticsProtocol {
    var events: [String] = []
    func logEvent(_ name: String) {
        events.append(name)
    }
}

final class UserTracker {
    let analytics: AnalyticsProtocol
    init(analytics: AnalyticsProtocol) {
        self.analytics = analytics
    }
    func trackUserActions() {
        analytics.logEvent("open")
        analytics.logEvent("click")
    }
}

let spy = AnalyticsSpy()
let tracker = UserTracker(analytics: spy)
tracker.trackUserActions()
print("Logged: \(spy.events.count)")
```
- **Expected Score:** 100% (Met: protocol and spy class 30%, Met: UserTracker with injection and call sequence 40%, Met: outputs 'Logged: 2' 30%)
- **Rationale:** Accurate spy implementation capturing invocations.

### Sample 2: Average
- **Answer:**
```swift
protocol AnalyticsProtocol: AnyObject { func logEvent(_ name: String) }
class AnalyticsSpy: AnalyticsProtocol {
    var events: [String] = []
    func logEvent(_ name: String) { events.append(name) }
}
class UserTracker {
    let a: AnalyticsProtocol
    init(analytics: AnalyticsProtocol) { self.a = analytics }
    func trackUserActions() {
        a.logEvent("open")
        a.logEvent("click")
    }
}
let s = AnalyticsSpy()
let t = UserTracker(analytics: s)
t.trackUserActions()
print("Logged: \(s.events.count)")
```
- **Expected Score:** 100% (Met: protocol and spy 30%, Met: tracker 40%, Met: output 30%)
- **Rationale:** Fully satisfies requirements.

### Sample 3: Weak
- **Answer:**
```swift
print("Logged: 2")
```
- **Expected Score:** 0% (Not Met: protocol missing, spy missing, key criterion failed)
- **Rationale:** Hardcodes output string without writing the spy.

---

## Question 31 (Code-Write): FakeUserDatabase Implementation

**Prompt:** Declare a `UserDatabaseProtocol: AnyObject` protocol with `func saveUser(id: Int, name: String)` and `func findUser(id: Int) -> String?`. Implement a `FakeUserDatabase: UserDatabaseProtocol` class storing users in a private `[Int: String]` dictionary. Save user 1 as 'Alice', find user 1, and print 'Found: Alice'.

### Sample 1: Good
- **Answer:**
```swift
protocol UserDatabaseProtocol: AnyObject {
    func saveUser(id: Int, name: String)
    func findUser(id: Int) -> String?
}

final class FakeUserDatabase: UserDatabaseProtocol {
    private var users: [Int: String] = [:]
    func saveUser(id: Int, name: String) {
        users[id] = name
    }
    func findUser(id: Int) -> String? {
        return users[id]
    }
}

let db = FakeUserDatabase()
db.saveUser(id: 1, name: "Alice")
print("Found: \(db.findUser(id: 1) ?? "none")")
```
- **Expected Score:** 100% (Met: protocol methods 30%, Met: fake class with dictionary store 40%, Met: outputs 'Found: Alice' 30%)
- **Rationale:** Clean, accurate implementation of an in-memory fake database.

### Sample 2: Average
- **Answer:**
```swift
protocol UserDatabaseProtocol: AnyObject {
    func saveUser(id: Int, name: String)
    func findUser(id: Int) -> String?
}
class FakeUserDatabase: UserDatabaseProtocol {
    var dict: [Int: String] = [:]
    func saveUser(id: Int, name: String) { dict[id] = name }
    func findUser(id: Int) -> String? { dict[id] }
}
let db = FakeUserDatabase()
db.saveUser(id: 1, name: "Alice")
print("Found: \(db.findUser(id: 1)!)")
```
- **Expected Score:** 100% (Met: protocol 30%, Met: fake 40%, Met: output 30%)
- **Rationale:** Functional and passes verification.

### Sample 3: Weak
- **Answer:**
```swift
print("Found: Alice")
```
- **Expected Score:** 0% (Not Met: protocol missing, fake missing, key criterion failed)
- **Rationale:** Hardcodes output without implementing the fake database.
