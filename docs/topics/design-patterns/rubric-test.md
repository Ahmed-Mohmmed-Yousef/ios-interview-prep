# Rubric Test: Design Patterns

**Topic:** `design-patterns`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Singleton Definition and Drawbacks

**Prompt:** Explain what a Singleton is in iOS and describe two major drawbacks of overusing it. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "A singleton is a design pattern where a class restricts instantiation to a single shared instance accessible globally through static let shared. While useful for unique system resources, overusing singletons creates global mutable state that any part of an app can modify without restriction. It also introduces hidden dependencies across classes and causes test pollution because tests running out of order can inherit lingering state."
- **Expected Score:** 100% (Met: definition of single shared instance 50%, Met: two drawbacks such as mutable state and test pollution 50%)
- **Rationale:** Accurately defines the pattern and details two distinct disadvantages.

### Sample 2: Average
- **Answer:** "A singleton provides one shared instance for the whole app using a static property. Drawbacks include making code tightly coupled to global state and making unit tests hard to run because tests interfere with each other."
- **Expected Score:** 100% (Met: definition 50%, Met: two drawbacks 50%)
- **Rationale:** Clear and accurate in plain words.

### Sample 3: Weak
- **Answer:** "A singleton is an Apple framework that prevents apps from crashing when memory runs low."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: drawbacks 0%)
- **Rationale:** Inaccurate definition and claims.

---

## Question 25 (Written): Thread Safety in Swift Singletons

**Prompt:** How does Swift implement thread-safe singleton initialization, and why is a private initializer necessary? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Swift initializes static let properties lazily upon first access, using the runtime's built-in atomic initialization guarantees to prevent race conditions during creation. A private initializer is required to prevent external files from instantiating their own separate instances. Together, these two mechanisms ensure that exactly one thread-safe instance exists throughout the entire application lifecycle."
- **Expected Score:** 100% (Met: atomic lazy static let initialization 50%, Met: private init prevents external creation 50%)
- **Rationale:** Covers both Swift runtime atomic guarantees and access control restriction.

### Sample 2: Average
- **Answer:** "Swift static properties are created lazily the first time they are accessed, and the language guarantees thread safety during that creation. Making the initializer private stops other developers from creating new instances of the class."
- **Expected Score:** 100% (Met: lazy thread-safe creation 50%, Met: private init purpose 50%)
- **Rationale:** Clear and correct summary.

### Sample 3: Weak
- **Answer:** "Swift singletons run on background threads automatically, so private initializers make them faster."
- **Expected Score:** 0% (Not Met: runtime guarantees 0%, Not Met: private init purpose 0%)
- **Rationale:** False assertions about threading and performance.

---

## Question 26 (Written): Refactoring Singletons for Testability

**Prompt:** How can an iOS engineering team refactor a hardcoded singleton so that it becomes easily testable with mocks? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The team can define a protocol that abstracts all the methods and properties exposed by the singleton service. Next, the singleton conforms to that protocol. Finally, consumer classes receive the protocol through initializer injection, using the singleton's shared instance as a default argument so production call sites stay clean while test targets can pass custom mocks."
- **Expected Score:** 100% (Met: abstracting behind a protocol 50%, Met: initializer injection with default shared instance 50%)
- **Rationale:** Thorough and practical architectural remediation.

### Sample 2: Average
- **Answer:** "You create a protocol for the singleton and make the singleton conform to it. Then you inject that protocol into your view model initializer with a default value of the shared instance, so tests can pass a mock."
- **Expected Score:** 100% (Met: protocol abstraction 50%, Met: injection with default value 50%)
- **Rationale:** Straightforward, complete explanation.

### Sample 3: Weak
- **Answer:** "You make the singleton public so tests can call it from anywhere."
- **Expected Score:** 0% (Not Met: protocol abstraction 0%, Not Met: injection 0%)
- **Rationale:** Misses the concept of protocol abstraction and mocking.

---

## Question 27 (Written): The Adapter Pattern in iOS

**Prompt:** Describe the Adapter pattern and explain a common real-world scenario where you would use it in an iOS project. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Adapter pattern wraps an existing class with an incompatible interface to make it conform to a target protocol expected by callers. In iOS development, a common real-world scenario is integrating a third-party analytics or payment SDK. Instead of coupling your feature code directly to the vendor's SDK types, you build an adapter that translates your app's clean domain protocol calls into the vendor's specific methods."
- **Expected Score:** 100% (Met: defines Adapter pattern 50%, Met: concrete real-world SDK scenario 50%)
- **Rationale:** Accurately describes interface translation with a concrete vendor SDK scenario.

### Sample 2: Average
- **Answer:** "An Adapter bridges an incompatible class to match a protocol your app expects without changing the original source code. For example, if you import an external logging library with strange method names, you can write an adapter that matches your internal logger protocol."
- **Expected Score:** 100% (Met: definition 50%, Met: realistic scenario 50%)
- **Rationale:** Clear explanation with practical logging example.

### Sample 3: Weak
- **Answer:** "The Adapter pattern is a layout container in SwiftUI that resizes views on iPad."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: scenario 0%)
- **Rationale:** Confuses software design pattern with UI layout.

---

## Question 28 (Written): Factory vs Dependency Injection

**Prompt:** Compare the Factory pattern with the Dependency Injection pattern. How do they complement each other? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Factory pattern focuses on object creation by centralizing instantiation logic and returning protocol abstractions based on runtime criteria. Dependency Injection focuses on supplying those created collaborators into consumer classes from the outside. They complement each other because a composition root or factory often constructs the concrete dependencies and injects them directly into view models or coordinators."
- **Expected Score:** 100% (Met: distinguishes creation vs supplying dependencies 50%, Met: explains complementary composition root usage 50%)
- **Rationale:** Distinctly contrasts responsibilities and explains how they work together in architecture.

### Sample 2: Average
- **Answer:** "The Factory pattern is responsible for creating objects, while dependency injection is about passing those objects into the classes that need them. A factory can build the services and inject them into view models during app startup."
- **Expected Score:** 100% (Met: distinction 50%, Met: complementary usage 50%)
- **Rationale:** Concise and accurate.

### Sample 3: Weak
- **Answer:** "Factory and dependency injection are identical names for the same Swift keyword."
- **Expected Score:** 0% (Not Met: distinction 0%, Not Met: complementarity 0%)
- **Rationale:** Completely incorrect statement.

---

## Question 29 (Code-Write): ThemeManager Singleton

**Prompt:** Declare a `@MainActor final class ThemeManager` singleton with `static let shared` and a `private init()`. Include a `var currentTheme: String = "System"` property. Create a `@MainActor` function that updates `currentTheme` to 'Dark' and prints the updated theme.

### Sample 1: Good
- **Answer:**
```swift
@MainActor
final class ThemeManager {
    static let shared = ThemeManager()
    private init() {}
    var currentTheme: String = "System"
}

@MainActor
func runTheme() {
    ThemeManager.shared.currentTheme = "Dark"
    print(ThemeManager.shared.currentTheme)
}
runTheme()
```
- **Expected Score:** 100% (Met: static let shared and private init 40%, Met: @MainActor isolation 30%, Met: mutates to Dark and prints Dark 30%)
- **Rationale:** Meets all constraints and compiles cleanly with Swift 6 strict concurrency.

### Sample 2: Average
- **Answer:**
```swift
@MainActor
class ThemeManager {
    static let shared = ThemeManager()
    private init() {}
    var currentTheme = "System"
}
@MainActor
func test() {
    let t = ThemeManager.shared
    t.currentTheme = "Dark"
    print(t.currentTheme)
}
test()
```
- **Expected Score:** 100% (Met: singleton structure 40%, Met: @MainActor 30%, Met: prints Dark 30%)
- **Rationale:** Satisfies all requirements.

### Sample 3: Weak
- **Answer:**
```swift
print("Dark")
```
- **Expected Score:** 0% (Not Met: no class, no singleton, key criterion failed)
- **Rationale:** Hardcodes string output without implementing the class or singleton pattern.

---

## Question 30 (Code-Write): AuthServiceFactory

**Prompt:** Declare an `AuthServiceProtocol` protocol with `func login() -> String`. Implement `MockAuthService` returning 'Mock Logged In' and `LiveAuthService` returning 'Live Logged In'. Create an `AuthServiceFactory` enum with a `static func make(isTest: Bool) -> AuthServiceProtocol` method. Instantiate with `isTest: true` and print the login result.

### Sample 1: Good
- **Answer:**
```swift
protocol AuthServiceProtocol {
    func login() -> String
}

struct MockAuthService: AuthServiceProtocol {
    func login() -> String {
        return "Mock Logged In"
    }
}

struct LiveAuthService: AuthServiceProtocol {
    func login() -> String {
        return "Live Logged In"
    }
}

enum AuthServiceFactory {
    static func make(isTest: Bool) -> AuthServiceProtocol {
        return isTest ? MockAuthService() : LiveAuthService()
    }
}

let service = AuthServiceFactory.make(isTest: true)
print(service.login())
```
- **Expected Score:** 100% (Met: protocol and conforming types 30%, Met: factory method 40%, Met: prints 'Mock Logged In' 30%)
- **Rationale:** Full implementation conforming to all requirements.

### Sample 2: Average
- **Answer:**
```swift
protocol AuthServiceProtocol { func login() -> String }
struct MockAuthService: AuthServiceProtocol { func login() -> String { "Mock Logged In" } }
struct LiveAuthService: AuthServiceProtocol { func login() -> String { "Live Logged In" } }
struct AuthServiceFactory {
    static func make(isTest: Bool) -> AuthServiceProtocol {
        if isTest { return MockAuthService() } else { return LiveAuthService() }
    }
}
let s = AuthServiceFactory.make(isTest: true)
print(s.login())
```
- **Expected Score:** 100% (Met: protocol 30%, Met: factory 40%, Met: output 30%)
- **Rationale:** Complete and correct.

### Sample 3: Weak
- **Answer:**
```swift
print("Mock Logged In")
```
- **Expected Score:** 0% (Not Met: protocol missing, factory missing, key criterion failed)
- **Rationale:** Hardcodes output without implementing the factory pattern.

---

## Question 31 (Code-Write): LegacyPaymentAdapter

**Prompt:** Create a legacy struct `OldSquarePayment` with `func makeCharge(amountInCents: Int) -> String` returning 'Charged: X'. Define a modern protocol `ModernPaymentProtocol` with `func charge(dollars: Int) -> String`. Implement an adapter struct `LegacyPaymentAdapter: ModernPaymentProtocol` that wraps `OldSquarePayment` and converts dollars to cents (dollars * 100). Charge 5 dollars and print 'Charged: 500'.

### Sample 1: Good
- **Answer:**
```swift
struct OldSquarePayment {
    func makeCharge(amountInCents: Int) -> String {
        return "Charged: \(amountInCents)"
    }
}

protocol ModernPaymentProtocol {
    func charge(dollars: Int) -> String
}

struct LegacyPaymentAdapter: ModernPaymentProtocol {
    let oldSystem: OldSquarePayment
    func charge(dollars: Int) -> String {
        return oldSystem.makeCharge(amountInCents: dollars * 100)
    }
}

let adapter = LegacyPaymentAdapter(oldSystem: OldSquarePayment())
print(adapter.charge(dollars: 5))
```
- **Expected Score:** 100% (Met: old system and modern protocol 30%, Met: adapter with unit translation 40%, Met: prints 'Charged: 500' 30%)
- **Rationale:** Idiomatic adapter implementation translating dollars to cents accurately.

### Sample 2: Average
- **Answer:**
```swift
struct OldSquarePayment {
    func makeCharge(amountInCents: Int) -> String { "Charged: \(amountInCents)" }
}
protocol ModernPaymentProtocol { func charge(dollars: Int) -> String }
struct LegacyPaymentAdapter: ModernPaymentProtocol {
    var old: OldSquarePayment
    func charge(dollars: Int) -> String {
        old.makeCharge(amountInCents: dollars * 100)
    }
}
let a = LegacyPaymentAdapter(old: OldSquarePayment())
print(a.charge(dollars: 5))
```
- **Expected Score:** 100% (Met: struct and protocol 30%, Met: adapter 40%, Met: output 30%)
- **Rationale:** Correct and functional.

### Sample 3: Weak
- **Answer:**
```swift
print("Charged: 500")
```
- **Expected Score:** 0% (Not Met: no legacy type, no protocol, no adapter)
- **Rationale:** Hardcodes the output without writing the requested adapter.
