# Topic Research: Navigation Patterns

## 1. Official Sources & Navigation Architectures
- **Apple Documentation**: NavigationStack (SwiftUI)
  - https://developer.apple.com/documentation/swiftui/navigationstack
  - Programmatic path-based navigation using `NavigationPath` and `.navigationDestination(for:)`.
- **Apple Documentation**: UINavigationController (UIKit)
  - https://developer.apple.com/documentation/uikit/uinavigationcontroller
  - Managing stack-based view controller navigation in UIKit.
- **WWDC22**: The SwiftUI cookbook for navigation
  - https://developer.apple.com/videos/play/wwdc2022/10054/
  - Decoupling navigation state from views, data-driven navigation, and deep linking recipes.

## 2. Core Patterns & Mechanics
1. **The Problem with Direct Navigation**:
   - If `ViewA` instantiates and presents `ViewB`, `ViewA` cannot be reused in another flow without modifying its navigation logic.
   - ViewControllers become tightly coupled and heavy.
2. **The Coordinator Pattern (UIKit & Hybrid)**:
   - Invented by Soroush Khanlou to isolate screen flow outside view controllers.
   - **Protocol**: `protocol Coordinator: AnyObject { var navigationController: UINavigationController { get }; func start() }`.
   - **Child Coordinators**: A parent coordinator holds a `childCoordinators: [Coordinator]` array to prevent premature deallocation.
   - **Flow Delegation**: ViewModels or ViewControllers communicate intent via delegates or closures (e.g., `didSelectOrder(id:)`), and the coordinator decides which screen to present.
   - **Clean-up**: Coordinators must be removed when their flow finishes to avoid memory leaks.
3. **The Router Pattern in Modern SwiftUI**:
   - Data-driven navigation using `NavigationStack(path: $router.path)`.
   - Routes modeled as `Hashable` enums (e.g., `enum AppRoute: Hashable { case profile(UUID), settings, details(Int) }`).
   - A centralized `NavigationRouter` (`@Observable`) manages the `NavigationPath` or array of routes.
   - Enables programmatic popping, pop-to-root, and deep link serialization.

## 3. Common Traps & Interview Gotchas
1. **Retain Cycles and Leaked Child Coordinators**:
   - A parent coordinator holds a strong reference in an array. If `childDidFinish(_:)` is never invoked, the coordinator and its view controllers leak in memory.
   - Using `UINavigationControllerDelegate` to intercept user back-button pops is standard for clean-up.
2. **Hardcoded NavigationLinks in SwiftUI**:
   - Using legacy `NavigationLink(destination: DetailView())` eagerly instantiates destination views and couples view hierarchies.
   - The modern data-driven `NavigationLink(value:)` paired with `.navigationDestination(for:)` lazily resolves destinations and decouples flow.
3. **State Desynchronization**:
   - When mixing UIKit modal presentations with SwiftUI `NavigationStack`, state flags can desynchronize if not coordinated centrally.
