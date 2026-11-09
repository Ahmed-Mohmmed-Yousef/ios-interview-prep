# Research: SOLID Basics

## 1. Core Concepts & Technical Facts

### What is SOLID?
SOLID is an acronym for five design principles for maintainable, testable, and flexible object-oriented and protocol-oriented software systems:
1. **S** - Single Responsibility Principle (SRP)
2. **O** - Open/Closed Principle (OCP)
3. **L** - Liskov Substitution Principle (LSP)
4. **I** - Interface Segregation Principle (ISP)
5. **D** - Dependency Inversion Principle (DIP)

### The 5 Principles with Swift / iOS Applications

#### 1. Single Responsibility Principle (SRP)
- *Definition*: A class, struct, or module should have only one reason to change.
- *iOS Context*: Directly addresses the "Massive View Controller" problem. A view controller should not handle networking, database persistence, and UI layout simultaneously.
- *Swift Example*: Separating `UserAccountManager` into:
  - `UserAPIService` (networking)
  - `UserDatabaseStore` (persistence)
  - `UserProfileViewController` (UI presentation)

#### 2. Open/Closed Principle (OCP)
- *Definition*: Software entities should be open for extension, but closed for modification.
- *iOS Context*: Adding a new feature (e.g., Apple Pay, PayPal, Klarna) should not require modifying an existing 200-line `switch` statement in `PaymentProcessor`.
- *Swift Example*: Define a `PaymentMethod` protocol with a `processPayment(amount:)` method. Each new provider is a new conforming struct or class (`ApplePayProcessor`, `CreditCardProcessor`). The `PaymentService` is closed to modification but open to new payment types.

#### 3. Liskov Substitution Principle (LSP)
- *Definition*: Subtypes must be substitutable for their base types without altering program correctness (introduced by Barbara Liskov in 1987).
- *iOS Context*: Subclasses should not break behavioral contracts, preconditions, or postconditions established by the parent type.
- *Swift Example*:
  - *Violation*: Subclassing `FileStorage` to create `ReadOnlyFileStorage` and implementing `saveData()` with `fatalError("Cannot write to read-only file")`. Code expecting a `FileStorage` crashes when passed the subclass.
  - *Correction*: Separate the hierarchy into `ReadableStorage` and `WritableStorage` protocols.

#### 4. Interface Segregation Principle (ISP)
- *Definition*: Clients should not be forced to depend on methods they do not use. Prefer small, focused interfaces over large, fat ones.
- *iOS Context*: Swift protocols are lightweight and composable. Avoid "god protocols" with dozens of optional methods.
- *Swift Example*:
  - *Fat protocol*: `protocol Worker { func work(); func eat(); func sleep() }`
  - *Segregated protocols*: `protocol Workable { func work() }` and `protocol Feedable { func eat() }`
  - Conforming types only adopt what they need; consumers can combine them via protocol composition (`Workable & Feedable`).

#### 5. Dependency Inversion Principle (DIP)
- *Definition*:
  1. High-level modules should not depend on low-level modules. Both should depend on abstractions (protocols).
  2. Abstractions should not depend on details. Details should depend on abstractions.
- *iOS Context*: Enables testability through Dependency Injection. A ViewModel or Presenter should not instantiate concrete `URLSession` network loaders or Core Data contexts directly.
- *Swift Example*: Injecting `protocol AuthService` into `LoginViewModel`. Production code injects `RemoteAuthService`, while unit test targets inject `MockAuthService`.

---

## 2. Common Misconceptions & Interview Traps

1. **"Dependency Inversion is the same as Dependency Injection"**:
   - *Trap*: Conflating DIP and DI.
   - *Reality*: Dependency Inversion is the high-level **architectural principle** (depend on abstractions, not concretions). Dependency Injection is the **implementation technique** (passing dependencies via initializers or properties).
2. **"Single Responsibility means a class can only have one function"**:
   - *Trap*: Creating hundreds of 1-method classes.
   - *Reality*: Single responsibility means a class has one cohesive domain or actor it serves (one reason to change), which may involve multiple related methods.
3. **"Interface Segregation means every protocol must have exactly one method"**:
   - *Trap*: Over-fragmenting protocols to where code becomes unreadable.
   - *Reality*: ISP means clients should not be forced to implement methods they don't care about (e.g. implementing dummy empty methods).
4. **"Violating Liskov Substitution only occurs with classes"**:
   - *Trap*: Believing LSP doesn't apply to protocols.
   - *Reality*: If a type conforms to a protocol but throws unexpected errors or violates the protocol's documented contracts, it breaks substitutability.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "SOLID is five principles that make code clean and easy to change. Single Responsibility means each class has one job. Open/Closed means we add new features by writing new code instead of editing old code. Liskov Substitution means subclasses should behave properly like their parent classes. Interface Segregation means we write small, specific protocols. Dependency Inversion means classes depend on protocols, not concrete types, making testing easy."
- **Junior**:
  - "I use SOLID to design clean iOS apps. S keeps view controllers small by moving networking and persistence into separate services. O uses protocols so we can add new payment or analytics options without touching existing code. L ensures subclasses or conforming types don't crash when substituting a parent. I keeps protocols focused so types don't implement empty stub methods. D uses protocols and constructor injection so we can easily mock network calls in unit tests."
- **Senior**:
  - "SOLID principles guide protocol-oriented design and modular architecture in Swift. SRP establishes clean boundaries between domain models, presentation state, and external services. OCP and ISP leverage Swift's protocol composition and default extension implementations, avoiding large switch statements and fat interfaces. LSP prevents fragile class inheritance traps, leading us toward value types and composition over inheritance. DIP decouples high-level business logic from framework details like URLSession or SwiftData, enabling fast, isolated unit test suites and modular SPM packages."
