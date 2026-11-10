# Topic Research: Design Patterns

## 1. Official Sources & Cocoa Design Patterns
- **Apple Documentation**: Managing a Shared Resource Using a Singleton (Swift)
  - https://developer.apple.com/documentation/swift/managing-a-shared-resource-using-a-singleton
  - Explains thread-safe lazy initialization with `static let shared` and `private init()`.
- **Apple Documentation (Archive)**: Cocoa Design Patterns
  - https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaFundamentals/CocoaDesignPatterns/CocoaDesignPatterns.html
  - Covers Delegation, Observer, Model-View-Controller, Target-Action, and Singleton patterns in Apple platforms.

## 2. Core Patterns in Modern iOS
1. **Creational Patterns**:
   - **Singleton**: Ensures a class has only one instance with a global point of access.
     - In Swift: `static let shared = ConfigurationManager()` (guaranteed thread-safe lazy initialization by Swift runtime).
     - `private init()` prevents external instantiation.
   - **Factory / Factory Method**: Centralizes instantiation logic, returning protocol types rather than concrete classes.
2. **Structural Patterns**:
   - **Adapter**: Converts the interface of a class into another interface expected by clients (e.g., bridging an external analytics library into an internal `AnalyticsService` protocol).
   - **Facade**: Provides a unified, simplified interface to a complex set of interfaces in a subsystem (e.g., a `NetworkingFacade` wrapping token refresh, caching, and decoding).
3. **Behavioral Patterns**:
   - **Observer**: Defines a one-to-many dependency between objects so that when one changes state, all dependents are notified (Combine, Observation, NotificationCenter).
   - **Delegation**: Allows one object to send messages to another when specific events occur; uses a `weak` reference to prevent retain cycles.
   - **Strategy**: Defines a family of interchangeable algorithms conforming to a common protocol (e.g., sorting or payment algorithms).

## 3. The Singleton Anti-Pattern & Interview Traps
1. **Hidden Dependencies**:
   - Objects calling `NetworkManager.shared` disguise their collaborators, making code hard to trace.
2. **Test Pollution & State Leakage**:
   - Unit tests run in indeterminate order. If a singleton stores mutable state, one test can break subsequent tests.
3. **Mocking Difficulties**:
   - Without protocols, test targets cannot substitute singletons with mocks.
4. **Best Practice Remediation**:
   - Introduce a protocol for the service.
   - Allow default parameter injection (`init(network: NetworkProtocol = NetworkManager.shared)`).
   - Unit tests inject mock implementations while production retains convenience.
