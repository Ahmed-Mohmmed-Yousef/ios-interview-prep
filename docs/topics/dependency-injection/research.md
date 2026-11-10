# Topic Research: Dependency Injection

## 1. Official Sources & Architectural Principles
- **Apple Documentation**: Environment (SwiftUI)
  - https://developer.apple.com/documentation/swiftui/environment
  - SwiftUI's built-in dependency injection system using `@Environment` and `EnvironmentValues`.
- **Apple Documentation**: Entry macro (SwiftUI)
  - https://developer.apple.com/documentation/swiftui/entry()
  - Modern SwiftUI custom environment key creation using the `@Entry` macro (iOS 18+).
- **Martin Fowler**: Inversion of Control Containers and the Dependency Injection Pattern
  - https://martinfowler.com/articles/injection.html
  - Foundational concepts: decoupling creation from use, constructor injection vs service locators.

## 2. Core Concepts
1. **Inversion of Control (IoC)**:
   - Instead of a consumer creating its own collaborators (e.g. `let service = NetworkClient()`), dependencies are supplied from the outside.
2. **Techniques in iOS / Swift**:
   - **Initializer (Constructor) Injection**:
     - The gold standard in Swift.
     - Allows stored properties to be constants (`let`).
     - Guarantees the object is never in an invalid half-initialized state.
   - **Property (Setter) Injection**:
     - Used when initializer injection is inconvenient (e.g., legacy UIKit storyboard view controllers).
     - Requires mutable `var` and often optionals or force unwraps.
   - **Method Injection**:
     - Supplying a dependency only for the duration of a single method call.
   - **SwiftUI Environment**:
     - Tree-based implicit dependency injection passed down view hierarchies.
3. **Protocol-Oriented Abstraction**:
   - Consumers declare protocol requirements (e.g., `protocol PaymentService { func charge(amount: Int) async throws }`).
   - Production code injects concrete clients; unit tests inject fast, deterministic mock or stub implementations.

## 3. Common Traps & Trade-offs
1. **Hidden Dependencies & Service Locators**:
   - Using a global locator or singleton registry conceals what an object actually needs to function.
   - Initializer injection makes all requirements visible at compile time.
2. **Over-engineering with Third-Party Containers**:
   - Complex runtime reflection containers add boilerplate and obscure compile-time safety.
   - Pure, explicit initializer injection is standard practice in idiomatic Swift.
3. **Hardcoded Singletons**:
   - Directly calling `URLSession.shared` or `UserDefaults.standard` inside ViewModels makes unit testing without network side effects impossible.

## 4. Swift 6 Concurrency Considerations
- Injected dependencies must conform to `Sendable` if passed across concurrency domains or actor boundaries.
- Protocols defining async dependencies should mark methods with `async throws` and consider actor isolation.
