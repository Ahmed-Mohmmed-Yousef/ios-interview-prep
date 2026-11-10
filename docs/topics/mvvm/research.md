# Topic Research: MVVM (Model-View-ViewModel)

## 1. Official Sources & Patterns
- **Apple Documentation**: Managing model data in your app (SwiftUI)
  - https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app
  - SwiftUI Observation framework (`@Observable` in iOS 17+) and `@State` for view model lifetime.
- **Apple Documentation**: Migrating from the Observable Object protocol to the Observable macro
  - https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro
- **WWDC23**: Meet Observation in SwiftUI
  - https://developer.apple.com/videos/play/wwdc2023/10149/
- **Community Architecture Reference**: Microsoft Learn - Model-View-ViewModel Pattern
  - https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm

## 2. Key Concepts & Architecture Flow
1. **Model**:
   - Represents domain entities, raw data structures, and fundamental business rules.
   - Typically Swift `struct` types conforming to `Identifiable`, `Codable`, or `Equatable`.
   - Never imports UI frameworks (`SwiftUI`, `UIKit`) and knows nothing about presentation.
2. **View**:
   - Visual representation on screen (SwiftUI `View` or UIKit `UIViewController` / `UIView`).
   - Declares UI layout, receives user input, and binds to the ViewModel.
   - Forwards user gestures (e.g., button taps, pull-to-refresh) to the ViewModel.
   - Avoids raw formatting logic (e.g. converting date objects or currency).
3. **ViewModel**:
   - Presentation logic mediator.
   - Owns and mutates UI state (e.g., `isLoading`, `errorMessage`, formatted strings).
   - Transforms raw domain models into presentation-ready properties.
   - Communicates with asynchronous services, repositories, or network clients.
   - In modern SwiftUI: marked with `@Observable` and held via `@State` in the root view.
   - In UIKit: binds to view controllers using Combine subjects, closures, or delegates.

## 3. Core Trade-offs & Interview Traps
1. **Massive ViewModel Anti-Pattern**:
   - Moving all networking, parsing, routing, and persistence into the ViewModel recreates the Massive View Controller problem.
   - Solution: Delegate to service, repository, and router objects through dependency injection.
2. **Over-Engineering Pure SwiftUI**:
   - SwiftUI views are lightweight structs, not heavy UIKit view controllers.
   - Simple static views or purely local UI animations do not require a separate ViewModel.
3. **Retain Cycles in Closures**:
   - When binding UIKit views or Combine pipelines to a ViewModel, capturing `[weak self]` prevents memory leaks.
4. **Presentation Logic vs Domain Logic**:
   - Domain validation and persistence belong to domain services or models.
   - ViewModel focuses on UI state, string formatting, and dispatching actions.

## 4. Swift 6 Concurrency & Observation
- In Swift 6, view models updating UI properties must be isolated to `@MainActor` to prevent data races.
- SwiftUI `@Observable` automatically tracks access down to individual properties, eliminating unnecessary view invalidations caused by `@Published`.
