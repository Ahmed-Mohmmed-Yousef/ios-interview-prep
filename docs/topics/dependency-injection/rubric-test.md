# Rubric Test: Dependency Injection

**Topic:** `dependency-injection`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Meaning and Purpose of Dependency Injection

**Prompt:** Explain what Dependency Injection means and why developers use it in iOS apps. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Dependency Injection is a design pattern where an object receives its collaborators and dependencies from the outside instead of constructing them internally. In iOS development, this pattern decouples classes from concrete implementations by programming against protocol abstractions. Developers use it primarily to enable fast, isolated unit testing by passing mock objects and to make code modular and reusable."
- **Expected Score:** 100% (Met: defines external collaborator injection 50%, Met: testability and modularity benefits 50%)
- **Rationale:** Clear, accurate definition and benefits in simple English.

### Sample 2: Average
- **Answer:** "Dependency injection means giving a class the helper services it needs through its initializer rather than instantiating them inside. We use it in iOS apps so that unit tests can inject fake services without hitting live network servers."
- **Expected Score:** 100% (Met: definition 50%, Met: testing benefit 50%)
- **Rationale:** Practical explanation meeting all rubric points.

### Sample 3: Weak
- **Answer:** "Dependency injection is a library that downloads dependencies from GitHub during compile time."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: benefits 0%)
- **Rationale:** Confuses dependency injection with dependency package managers like SPM.

---

## Question 25 (Written): Initializer vs Property Injection

**Prompt:** Compare initializer injection with property injection. Why is initializer injection usually preferred in Swift? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Initializer injection supplies all necessary dependencies at creation time, allowing properties to be declared as immutable let constants that are guaranteed to exist. In contrast, property injection assigns dependencies after instantiation, which requires mutable var properties and risks runtime crashes if accessed before assignment. Swift developers prefer initializer injection because it enforces compile-time safety and prevents objects from existing in an invalid state."
- **Expected Score:** 100% (Met: let constants and creation-time safety 50%, Met: contrasts with mutable property risks 50%)
- **Rationale:** Thorough comparison emphasizing immutability and compile-time safety.

### Sample 2: Average
- **Answer:** "Initializer injection sets dependencies when the object is initialized, so they can be constants that never become nil. Property injection uses variables that can be modified later or left nil by mistake. Initializer injection is preferred because it prevents crashes from missing dependencies."
- **Expected Score:** 100% (Met: initializer safety 50%, Met: property injection risks 50%)
- **Rationale:** Captures the core distinction in plain words.

### Sample 3: Weak
- **Answer:** "Initializer injection is only for SwiftUI, while property injection is required for all UIKit classes."
- **Expected Score:** 0% (Not Met: initializer safety 0%, Not Met: property comparison 0%)
- **Rationale:** Incorrect claims unrelated to language semantics.

---

## Question 26 (Written): Service Locator Anti-Pattern

**Prompt:** Why is the Service Locator pattern considered an anti-pattern when compared to explicit initializer injection? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Service Locator pattern uses a global registry to locate dependencies, which hides a class's requirements from its public interface. Callers cannot tell what dependencies an object needs until runtime crashes occur when an entry is missing from the registry. Initializer injection is superior because it declares all dependencies explicitly at compile time, making classes easier to understand, refactor, and test."
- **Expected Score:** 100% (Met: hides dependencies from interface 50%, Met: runtime crash risks vs compile-time visibility 50%)
- **Rationale:** Identifies both hidden dependency issues and runtime failure risks.

### Sample 2: Average
- **Answer:** "A service locator hides what a class actually needs to work because dependencies are retrieved from a global dictionary. If a service is missing from the locator, the app crashes at runtime. With initializer injection, the compiler makes sure all dependencies are passed before the object runs."
- **Expected Score:** 100% (Met: hidden dependencies 50%, Met: runtime failure vs compile-time safety 50%)
- **Rationale:** Explains the trade-off clearly.

### Sample 3: Weak
- **Answer:** "Service locators take up too much memory on iPhone devices."
- **Expected Score:** 0% (Not Met: hidden dependencies 0%, Not Met: compile-time safety 0%)
- **Rationale:** Fabricates performance claims rather than architectural reasons.

---

## Question 27 (Written): SwiftUI Environment Injection

**Prompt:** How does SwiftUI provide built-in dependency injection across a view hierarchy? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "SwiftUI provides dependency injection through its Environment system using the @Environment property wrapper and EnvironmentValues. A parent view injects an object or value into the environment using view modifiers like .environment(). That injected dependency automatically cascades down the entire view subtree, allowing any child view to access it without manual parameter drilling."
- **Expected Score:** 100% (Met: identifies Environment and @Environment 50%, Met: explains downward cascading to child views 50%)
- **Rationale:** Comprehensive overview of SwiftUI's environment injection mechanism.

### Sample 2: Average
- **Answer:** "SwiftUI uses the @Environment property wrapper to inject shared dependencies. When a parent view adds an object to the environment, all child views inside that view tree can read it without passing it manually through every view initializer."
- **Expected Score:** 100% (Met: @Environment identified 50%, Met: child view inheritance 50%)
- **Rationale:** Clear, accurate explanation of environment propagation.

### Sample 3: Weak
- **Answer:** "SwiftUI does not support dependency injection because all views are structs."
- **Expected Score:** 0% (Not Met: Environment 0%, Not Met: tree cascade 0%)
- **Rationale:** Factual error regarding SwiftUI architecture.

---

## Question 28 (Written): Composition Root

**Prompt:** What is a composition root in iOS architecture, and what responsibility does it hold? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The composition root is the centralized entry point in an application where all modules, services, and view models are assembled and wired together. In an iOS app, this often occurs at the App launch or within root coordinators. By centralizing object creation at the composition root, the rest of the application remains focused purely on business logic without needing knowledge of concrete dependency construction."
- **Expected Score:** 100% (Met: centralized entry point definition 50%, Met: wiring dependencies and decoupling creation 50%)
- **Rationale:** Accurately defines the composition root and its architectural purpose.

### Sample 2: Average
- **Answer:** "The composition root is the main place in an app where objects and their dependencies are instantiated and connected. It is usually set up at app launch or in the top coordinator. This keeps the rest of the codebase free from hardcoded object creation."
- **Expected Score:** 100% (Met: centralized creation place 50%, Met: wiring dependencies 50%)
- **Rationale:** Covers definition and responsibility in simple terms.

### Sample 3: Weak
- **Answer:** "The composition root is the root directory where the AppIcon asset catalog is stored."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: wiring responsibility 0%)
- **Rationale:** Completely confused with asset catalogs.

---

## Question 29 (Code-Write): DisplayManager with NumberFormatterProtocol

**Prompt:** Declare a `NumberFormatterProtocol` protocol with a `func format(value: Int) -> String` requirement. Create a `CurrencyFormatter` struct conforming to it that prepends '$' (such as '$50'). Implement a `DisplayManager` class with initializer injection of `NumberFormatterProtocol` and a `show(value:)` method. Instantiate with 50 and print '$50'.

### Sample 1: Good
- **Answer:**
```swift
protocol NumberFormatterProtocol {
    func format(value: Int) -> String
}

struct CurrencyFormatter: NumberFormatterProtocol {
    func format(value: Int) -> String {
        return "$\(value)"
    }
}

final class DisplayManager {
    let formatter: NumberFormatterProtocol
    init(formatter: NumberFormatterProtocol) {
        self.formatter = formatter
    }
    func show(value: Int) -> String {
        return formatter.format(value: value)
    }
}

let dm = DisplayManager(formatter: CurrencyFormatter())
print(dm.show(value: 50))
```
- **Expected Score:** 100% (Met: protocol declared 30%, Met: initializer injection and conformance 40%, Met: outputs '$50' 30%)
- **Rationale:** Fully compliant, compiles cleanly, produces expected output.

### Sample 2: Average
- **Answer:**
```swift
protocol NumberFormatterProtocol { func format(value: Int) -> String }
struct CurrencyFormatter: NumberFormatterProtocol {
    func format(value: Int) -> String { "$\(value)" }
}
class DisplayManager {
    var formatter: NumberFormatterProtocol?
    func show(value: Int) -> String { formatter?.format(value: value) ?? "" }
}
let dm = DisplayManager()
dm.formatter = CurrencyFormatter()
print(dm.show(value: 50))
```
- **Expected Score:** 70% (Met: protocol 30%, Partly Met: used property injection instead of requested initializer injection 20%, Met: outputs '$50' 20%)
- **Rationale:** Implements property injection instead of the required initializer injection.

### Sample 3: Weak
- **Answer:**
```swift
print("$50")
```
- **Expected Score:** 0% (Not Met: protocol missing, class missing, key criterion missed -> capped at 0)
- **Rationale:** Hardcodes the output without declaring the requested types or injection.

---

## Question 30 (Code-Write): CheckoutService with PaymentGateway

**Prompt:** Create a `PaymentGateway` protocol with `func process(amount: Int) -> Bool`. Implement a `MockGateway` struct that returns `amount > 0`. Build a `CheckoutService` class with initializer injection of `PaymentGateway` and a `pay(cents:)` method returning 'Success' or 'Failed'. Print 'Success' for 1000 cents.

### Sample 1: Good
- **Answer:**
```swift
protocol PaymentGateway {
    func process(amount: Int) -> Bool
}

struct MockGateway: PaymentGateway {
    func process(amount: Int) -> Bool {
        return amount > 0
    }
}

final class CheckoutService {
    let gateway: PaymentGateway
    init(gateway: PaymentGateway) {
        self.gateway = gateway
    }
    func pay(cents: Int) -> String {
        return gateway.process(amount: cents) ? "Success" : "Failed"
    }
}

let cs = CheckoutService(gateway: MockGateway())
print(cs.pay(cents: 1000))
```
- **Expected Score:** 100% (Met: protocol and mock 30%, Met: CheckoutService with initializer injection 40%, Met: outputs 'Success' 30%)
- **Rationale:** Elegant, compiles, and passes verification.

### Sample 2: Average
- **Answer:**
```swift
protocol PaymentGateway { func process(amount: Int) -> Bool }
struct MockGateway: PaymentGateway {
    func process(amount: Int) -> Bool { amount > 0 }
}
class CheckoutService {
    let gateway: PaymentGateway
    init(gateway: PaymentGateway) { self.gateway = gateway }
    func pay(cents: Int) -> String {
        if gateway.process(amount: cents) { return "Success" } else { return "Failed" }
    }
}
let cs = CheckoutService(gateway: MockGateway())
print(cs.pay(cents: 1000))
```
- **Expected Score:** 100% (Met: protocol 30%, Met: class and injection 40%, Met: output 30%)
- **Rationale:** Fully satisfies all criteria.

### Sample 3: Weak
- **Answer:**
```swift
class CheckoutService {
    func pay(cents: Int) -> String { "Success" }
}
print(CheckoutService().pay(cents: 1000))
```
- **Expected Score:** 0% (Not Met: protocol missing, injection missing, key criterion failed)
- **Rationale:** Misses the protocol abstraction and dependency injection requirement.

---

## Question 31 (Code-Write): FeedViewModel with DataRepository

**Prompt:** Define a `DataRepository` protocol with `func allItems() -> [String]`. Implement a `MockDataRepository` struct that holds an array of strings. Create a `FeedViewModel` class that accepts `DataRepository` via initializer injection and has a computed property `countText: String` returning 'Loaded X items'. Initialize with 3 items and print 'Loaded 3 items'.

### Sample 1: Good
- **Answer:**
```swift
protocol DataRepository {
    func allItems() -> [String]
}

struct MockDataRepository: DataRepository {
    let items: [String]
    func allItems() -> [String] {
        return items
    }
}

final class FeedViewModel {
    let repository: DataRepository
    init(repository: DataRepository) {
        self.repository = repository
    }
    var countText: String {
        return "Loaded \(repository.allItems().count) items"
    }
}

let repo = MockDataRepository(items: ["Post 1", "Post 2", "Post 3"])
let vm = FeedViewModel(repository: repo)
print(vm.countText)
```
- **Expected Score:** 100% (Met: protocol declared 30%, Met: MockDataRepository and FeedViewModel with injection 40%, Met: outputs 'Loaded 3 items' 30%)
- **Rationale:** Complete, idiomatic Swift implementation.

### Sample 2: Average
- **Answer:**
```swift
protocol DataRepository { func allItems() -> [String] }
struct MockDataRepository: DataRepository {
    var items: [String]
    func allItems() -> [String] { items }
}
class FeedViewModel {
    let repo: DataRepository
    init(repository: DataRepository) { self.repo = repository }
    var countText: String { "Loaded \(repo.allItems().count) items" }
}
let vm = FeedViewModel(repository: MockDataRepository(items: ["A", "B", "C"]))
print(vm.countText)
```
- **Expected Score:** 100% (Met: protocol 30%, Met: injection 40%, Met: output 30%)
- **Rationale:** Satisfies all requirements with minimal syntax.

### Sample 3: Weak
- **Answer:**
```swift
let items = ["A", "B", "C"]
print("Loaded \(items.count) items")
```
- **Expected Score:** 0% (Not Met: protocol missing, ViewModel missing, key criterion failed)
- **Rationale:** Direct array manipulation without architecture or dependency injection.
