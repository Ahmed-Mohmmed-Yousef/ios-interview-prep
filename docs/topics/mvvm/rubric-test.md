# Rubric Test: MVVM (Model-View-ViewModel)

**Topic:** `mvvm`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Roles of Model, View, and ViewModel

**Prompt:** Explain the distinct roles of the Model, View, and ViewModel in the MVVM architecture. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Model represents domain entities, data schemas, and fundamental business rules without any dependency on UI frameworks. The View renders visual elements on screen, lays out user interface components, and captures user input. The ViewModel acts as a presentation mediator that owns UI state, coordinates user actions, and formats raw model data into display strings for the View."
- **Expected Score:** 100% (Met: Model domain data without UI 35%, Met: View visual interface 35%, Met: ViewModel presentation mediator 30%)
- **Rationale:** Accurately and completely describes all three architectural layers.

### Sample 2: Average
- **Answer:** "The Model stores raw data structures for the feature. The View draws the buttons and text labels on screen. The ViewModel handles the presentation logic and passes formatted text to the View."
- **Expected Score:** 90% (Met: Model 35%, Met: View 30%, Met: ViewModel 25%)
- **Rationale:** Captures the core role of each layer clearly in plain English.

### Sample 3: Weak
- **Answer:** "The Model is a database table, and the View is a controller that makes network requests."
- **Expected Score:** 0% (Not Met: Model 0%, Not Met: View 0%, Not Met: ViewModel 0%)
- **Rationale:** Confuses layers and assigns network requests directly to the View.

---

## Question 25 (Written): Unit Testability of ViewModels

**Prompt:** Why does using a ViewModel improve unit testability compared to Apple MVC? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "In Apple MVC, presentation logic and state transitions are tightly coupled to the UIViewController lifecycle, which requires initializing view hierarchies or UIKit environments to test. ViewModels do not import UI frameworks or rely on view lifecycles. This allows developers to test formatting, state mutations, and business rules quickly in headless unit tests without launching the simulator."
- **Expected Score:** 100% (Met: no UI framework or lifecycle dependency 50%, Met: fast headless unit testing 50%)
- **Rationale:** Thoroughly covers decoupling from UI lifecycles and the benefits of headless unit tests.

### Sample 2: Average
- **Answer:** "ViewModels do not import UIKit or depend on view loading methods. You can instantiate a ViewModel directly in an XCTest case and assert on its state changes without running a simulator."
- **Expected Score:** 100% (Met: no UI dependency 50%, Met: fast assertion in tests 50%)
- **Rationale:** Clear and accurate answer in simple terms.

### Sample 3: Weak
- **Answer:** "ViewModels are faster to test because they use C++ pointers under the hood."
- **Expected Score:** 0% (Not Met: lifecycle decoupling 0%, Not Met: headless testing 0%)
- **Rationale:** Fabricates false claims without addressing architecture or testability.

---

## Question 26 (Written): Massive ViewModel Anti-Pattern

**Prompt:** What is the Massive ViewModel problem, and how can an engineering team prevent it? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Massive ViewModel problem occurs when developers move networking, database operations, validation, and navigation directly into a single ViewModel class, replicating the Massive View Controller issue. Teams can prevent this by following the single responsibility principle and injecting specialized service or repository objects. The ViewModel should only coordinate presentation state and delegate data retrieval and persistence to those external services."
- **Expected Score:** 100% (Met: identifies bloat from networking/storage 50%, Met: delegates to injected services/repositories 50%)
- **Rationale:** Explains the causes of bloat and standard decoupling strategies.

### Sample 2: Average
- **Answer:** "A Massive ViewModel happens when you pack all API calls, database code, and routing into one file. You can fix this by injecting separate network services and repositories so the ViewModel only manages UI properties."
- **Expected Score:** 100% (Met: causes 50%, Met: fix via injected services 50%)
- **Rationale:** Straightforward explanation addressing both required rubric criteria.

### Sample 3: Weak
- **Answer:** "Massive ViewModel means having too many classes in the Xcode project navigator."
- **Expected Score:** 0% (Not Met: causes 0%, Not Met: remediation 0%)
- **Rationale:** Misunderstands the concept of architectural bloat.

---

## Question 27 (Written): Data Binding in SwiftUI vs UIKit

**Prompt:** How does data binding differ between modern SwiftUI and legacy UIKit when implementing MVVM? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "In modern SwiftUI, data binding is declarative and automated using the Observation framework (@Observable) or Combine (@Published with ObservableObject), causing views to re-render automatically when accessed properties change. In UIKit, data binding is manual because views do not observe state changes natively. Developers must establish explicit bindings using closure callbacks, Combine sink subscriptions, or delegation to update UI controls."
- **Expected Score:** 100% (Met: SwiftUI declarative Observation/Combine 50%, Met: UIKit manual closures/delegation/Combine 50%)
- **Rationale:** Clear contrast between automatic declarative observation and imperative UIKit glue code.

### Sample 2: Average
- **Answer:** "SwiftUI updates views automatically when an observable view model changes its published properties. In UIKit, you have to write closure handlers or Combine pipelines yourself to update labels and buttons when values change."
- **Expected Score:** 100% (Met: SwiftUI observation 50%, Met: UIKit manual callbacks 50%)
- **Rationale:** Accurate summary of declarative vs manual data binding.

### Sample 3: Weak
- **Answer:** "SwiftUI does not support ViewModels, while UIKit uses ViewModels for every storyboard."
- **Expected Score:** 0% (Not Met: SwiftUI binding 0%, Not Met: UIKit binding 0%)
- **Rationale:** Completely incorrect statement regarding framework capabilities.

---

## Question 28 (Written): Overusing ViewModels in SwiftUI

**Prompt:** Why is it sometimes an anti-pattern to create a ViewModel for every single SwiftUI view in an app? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "SwiftUI views are already lightweight, declarative value types with built-in state management tools like @State and @Binding. For trivial screens that only display static content, simple forms, or local animation states, forcing a separate ViewModel introduces unnecessary boilerplate and indirection. Teams should reserve ViewModels for screens with complex presentation logic, asynchronous workflows, or business formatting that require dedicated unit testing."
- **Expected Score:** 100% (Met: SwiftUI views are lightweight structs with built-in state 50%, Met: trivial screens add boilerplate without testability benefits 50%)
- **Rationale:** Thorough and balanced evaluation of architectural pragmatism in SwiftUI.

### Sample 2: Average
- **Answer:** "SwiftUI views already handle local state cleanly with @State and @Binding. Making a ViewModel for simple static views adds extra code without improving testability."
- **Expected Score:** 100% (Met: lightweight built-in state 50%, Met: unnecessary boilerplate 50%)
- **Rationale:** Captures the core reason why ubiquitous ViewModels can become redundant.

### Sample 3: Weak
- **Answer:** "SwiftUI views crash if you assign more than three view models to one view hierarchy."
- **Expected Score:** 0% (Not Met: view characteristics 0%, Not Met: trade-offs 0%)
- **Rationale:** Incorrect technical claim.

---

## Question 29 (Code-Write): ProfileDisplayViewModel Formatting

**Prompt:** Create a `ProfileModel` struct with a `followers: Int` property, and a `ProfileDisplayViewModel` class that exposes a `followerSummary: String`. If followers are 1000 or more, format as thousands with one decimal place followed by 'K' (such as '2.5K'). Otherwise, return the integer string. Print the summary for 2500 followers.

### Sample 1: Good
- **Answer:**
```swift
import Foundation

struct ProfileModel {
    let followers: Int
}

final class ProfileDisplayViewModel {
    let profile: ProfileModel
    init(profile: ProfileModel) {
        self.profile = profile
    }
    var followerSummary: String {
        if profile.followers >= 1000 {
            let thousands = Double(profile.followers) / 1000.0
            return String(format: "%.1fK", thousands)
        }
        return "\(profile.followers)"
    }
}

let vm = ProfileDisplayViewModel(profile: ProfileModel(followers: 2500))
print(vm.followerSummary)
```
- **Expected Score:** 100% (Met: ProfileModel struct 30%, Met: followerSummary calculation 40%, Met: outputs '2.5K' 30%)
- **Rationale:** Clean, compiles, passes tests, and satisfies all requirements.

### Sample 2: Average
- **Answer:**
```swift
struct ProfileModel { var followers: Int }
class ProfileDisplayViewModel {
    var profile: ProfileModel
    init(profile: ProfileModel) { self.profile = profile }
    var followerSummary: String {
        return "\(Double(profile.followers)/1000.0)K"
    }
}
let vm = ProfileDisplayViewModel(profile: ProfileModel(followers: 2500))
print(vm.followerSummary)
```
- **Expected Score:** 70% (Met: struct 30%, Partly Met: calculation misses < 1000 branch and exact format 20%, Met: prints 20%)
- **Rationale:** Omits branch check for follower count below 1000.

### Sample 3: Weak
- **Answer:**
```swift
print("2.5K")
```
- **Expected Score:** 0% (Not Met: no model struct, no view model, key criterion missed -> capped at 0)
- **Rationale:** Hardcodes the output without declaring the requested Model or ViewModel types.

---

## Question 30 (Code-Write): AuthFlowViewModel State Machine

**Prompt:** Create an `AuthState` enum with cases `loggedOut`, `authenticating`, and `loggedIn(String)`. Implement an `AuthFlowViewModel` class with a `state` property initialized to `loggedOut` and a `login(username:)` method that transitions to `authenticating` then `loggedIn`. Print 'Logged in as maria' upon completion.

### Sample 1: Good
- **Answer:**
```swift
enum AuthState {
    case loggedOut
    case authenticating
    case loggedIn(String)
}

final class AuthFlowViewModel {
    var state: AuthState = .loggedOut
    func login(username: String) {
        state = .authenticating
        state = .loggedIn(username)
    }
}

let vm = AuthFlowViewModel()
vm.login(username: "maria")
if case .loggedIn(let name) = vm.state {
    print("Logged in as \(name)")
}
```
- **Expected Score:** 100% (Met: AuthState enum 30%, Met: AuthFlowViewModel state transitions 40%, Met: prints 'Logged in as maria' 30%)
- **Rationale:** Fully implements the state machine and verifies the final state transition.

### Sample 2: Average
- **Answer:**
```swift
enum AuthState { case loggedOut, authenticating, loggedIn(String) }
class AuthFlowViewModel {
    var state = AuthState.loggedOut
    func login(username: String) {
        self.state = .loggedIn(username)
    }
}
let vm = AuthFlowViewModel()
vm.login(username: "maria")
if case .loggedIn(let u) = vm.state { print("Logged in as \(u)") }
```
- **Expected Score:** 75% (Met: enum 30%, Partly Met: skipped intermediate .authenticating state 25%, Met: printed result 20%)
- **Rationale:** Skipped transitioning through `.authenticating`.

### Sample 3: Weak
- **Answer:**
```swift
class AuthFlowViewModel {
    var name = "maria"
}
print("Logged in as maria")
```
- **Expected Score:** 0% (Not Met: enum missing, state machine missing, key criterion failed)
- **Rationale:** Fails to implement the requested enum or state transition logic.

---

## Question 31 (Code-Write): TaskListViewModel Filtering

**Prompt:** Create an `ItemTask` struct with `id: Int`, `title: String`, and `isDone: Bool`. Implement a `TaskListViewModel` class containing an array of `ItemTask` items and a `completedTasks()` method that returns only finished tasks. Initialize with three items (two finished), and print 'Completed 2 tasks'.

### Sample 1: Good
- **Answer:**
```swift
struct ItemTask {
    let id: Int
    let title: String
    let isDone: Bool
}

final class TaskListViewModel {
    var tasks: [ItemTask] = [
        ItemTask(id: 1, title: "Write tests", isDone: true),
        ItemTask(id: 2, title: "Review PR", isDone: false),
        ItemTask(id: 3, title: "Deploy app", isDone: true)
    ]
    func completedTasks() -> [ItemTask] {
        return tasks.filter { $0.isDone }
    }
}

let vm = TaskListViewModel()
print("Completed \(vm.completedTasks().count) tasks")
```
- **Expected Score:** 100% (Met: ItemTask struct 30%, Met: TaskListViewModel filtering 40%, Met: prints 'Completed 2 tasks' 30%)
- **Rationale:** Correctly implements model, filtering method, and verifies output count.

### Sample 2: Average
- **Answer:**
```swift
struct ItemTask { let id: Int; let title: String; var isDone: Bool }
class TaskListViewModel {
    var tasks: [ItemTask] = []
    func completedTasks() -> [ItemTask] {
        var res: [ItemTask] = []
        for t in tasks { if t.isDone { res.append(t) } }
        return res
    }
}
let vm = TaskListViewModel()
vm.tasks = [ItemTask(id: 1, title: "A", isDone: true), ItemTask(id: 2, title: "B", isDone: true), ItemTask(id: 3, title: "C", isDone: false)]
print("Completed \(vm.completedTasks().count) tasks")
```
- **Expected Score:** 90% (Met: struct 30%, Met: loop filtering 30%, Met: prints count 30%)
- **Rationale:** Functional imperative implementation instead of idiomatic filter.

### Sample 3: Weak
- **Answer:**
```swift
let tasks = [true, false, true]
print("Completed 2 tasks")
```
- **Expected Score:** 0% (Not Met: no ItemTask struct, no TaskListViewModel, key criterion failed)
- **Rationale:** Hardcodes logic without the required types or architecture.
