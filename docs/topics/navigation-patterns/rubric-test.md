# Rubric Test: Navigation Patterns

**Topic:** `navigation-patterns`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): The Coordinator Pattern

**Prompt:** Explain the Coordinator pattern in iOS and why it is beneficial. Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "The Coordinator pattern isolates navigation flow and screen presentation into dedicated controller objects outside of view controllers. Instead of a view controller directly creating and pushing its destination, it informs its coordinator of user actions via delegates or closures. This architecture decouples views from one another, enabling individual screens to be reused across different app flows and simplifying automated testing."
- **Expected Score:** 100% (Met: defines Coordinator handling flow outside views 50%, Met: benefits of decoupling and reusability 50%)
- **Rationale:** Clear, accurate definition and benefits in simple English.

### Sample 2: Average
- **Answer:** "A Coordinator is an object that handles all screen transitions so that view controllers do not push each other directly. This keeps view controllers small and makes it easy to reuse screens in multiple parts of the app."
- **Expected Score:** 100% (Met: definition 50%, Met: benefits 50%)
- **Rationale:** Concise and captures core concepts.

### Sample 3: Weak
- **Answer:** "The Coordinator pattern is an auto layout tool in Interface Builder that aligns buttons on iPad."
- **Expected Score:** 0% (Not Met: definition 0%, Not Met: benefits 0%)
- **Rationale:** Completely confused with UIKit Auto Layout.

---

## Question 25 (Written): SwiftUI Data-Driven Navigation

**Prompt:** How does data-driven navigation work in modern SwiftUI with NavigationStack? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "In modern SwiftUI, NavigationStack binds to a state-driven collection of Hashable routes or a NavigationPath. Pushing or popping views is achieved by simply appending or removing values from this path array. The .navigationDestination modifier observes route types and lazily constructs the appropriate destination view, enabling programmatic control, state restoration, and deep linking."
- **Expected Score:** 100% (Met: NavigationStack bound to Hashable routes / NavigationPath 50%, Met: path mutations and navigationDestination resolving views 50%)
- **Rationale:** Thoroughly covers path binding and destination resolution.

### Sample 2: Average
- **Answer:** "SwiftUI uses NavigationStack bound to an array of routes. When you add a new route value to the path array, SwiftUI uses .navigationDestination to display the matching view. You can pop back to root just by emptying the array."
- **Expected Score:** 100% (Met: bound route array 50%, Met: path manipulation and destination view 50%)
- **Rationale:** Clear explanation in plain words.

### Sample 3: Weak
- **Answer:** "SwiftUI requires storyboard segues to push views onto navigation stacks."
- **Expected Score:** 0% (Not Met: NavigationStack 0%, Not Met: path array 0%)
- **Rationale:** Incorrect statement; SwiftUI does not use storyboard segues.

---

## Question 26 (Written): Child Coordinator Memory Leaks

**Prompt:** Why can child coordinators cause memory leaks in UIKit apps, and how can you clean them up? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Parent coordinators retain child coordinators in a collection to keep them alive while their flows are active. If a user pops a screen using the navigation bar back button and the parent coordinator is not notified, the child coordinator remains retained in memory, leaking its entire view hierarchy. Teams can clean them up by acting as the UINavigationControllerDelegate to detect when a view controller is popped and remove the corresponding child from the array."
- **Expected Score:** 100% (Met: parent strong retention causing leaks 50%, Met: cleanup via delegate detecting pops 50%)
- **Rationale:** Explains the retention issue and standard delegate-based remediation.

### Sample 2: Average
- **Answer:** "Parent coordinators hold child coordinators in an array so they do not deallocate too early. If you forget to remove the child when the user taps back, it stays in memory forever. You can clean it up by listening to the navigation controller delegate and removing the child from the array."
- **Expected Score:** 100% (Met: retention cause 50%, Met: removal via delegate 50%)
- **Rationale:** Covers both required points accurately.

### Sample 3: Weak
- **Answer:** "Child coordinators cause leaks because Swift structs cannot be deallocated."
- **Expected Score:** 0% (Not Met: retention cause 0%, Not Met: cleanup 0%)
- **Rationale:** Erroneous claims about Swift memory management.

---

## Question 27 (Written): Deep Links and Navigation Patterns

**Prompt:** How do navigation patterns simplify handling universal links and push notification deep links? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Navigation patterns centralize routing logic into a single coordinator or router rather than spreading transition code across multiple views. When a deep link or push notification arrives, the router parses the URL into structured route enums and programmatically assembles the complete navigation stack. This allows the app to jump directly to deep content without requiring user clicks through intermediate screens."
- **Expected Score:** 100% (Met: centralized parsing into structured routes 50%, Met: programmatic stack assembly without view coupling 50%)
- **Rationale:** Comprehensive explanation of deep link parsing and stack construction.

### Sample 2: Average
- **Answer:** "A central router can take a deep link URL and convert it into a list of screen routes. It then updates the navigation path array to push all required screens at once, taking the user directly to the linked feature."
- **Expected Score:** 100% (Met: centralized parsing 50%, Met: stack update 50%)
- **Rationale:** Clear and practical explanation.

### Sample 3: Weak
- **Answer:** "Deep links cannot be opened in iOS apps that use navigation patterns."
- **Expected Score:** 0% (Not Met: central parsing 0%, Not Met: programmatic stack 0%)
- **Rationale:** Completely incorrect statement.

---

## Question 28 (Written): Coordinator Migration to SwiftUI

**Prompt:** How can the Coordinator pattern help a smooth migration from UIKit to SwiftUI in an existing iOS codebase? Write 2 to 5 sentences.

### Sample 1: Good
- **Answer:** "Coordinators manage a shared UINavigationController and can present traditional UIViewController instances alongside SwiftUI views wrapped in UIHostingController. Because individual screens communicate only with their coordinator rather than directly with each other, teams can rewrite one screen in SwiftUI without altering the surrounding screens. The coordinator simply swaps the instantiation from a UIKit controller to a UIHostingController seamlessly."
- **Expected Score:** 100% (Met: UIHostingController alongside UIKit in shared navigation 50%, Met: screen-by-screen swap without coupling 50%)
- **Rationale:** Accurately explains incremental screen migration using UIHostingController.

### Sample 2: Average
- **Answer:** "Coordinators allow you to wrap SwiftUI views in UIHostingController and push them onto an existing UIKit navigation controller. Because views only talk to the coordinator, you can replace one UIKit view controller with a SwiftUI view at a time without breaking other screens."
- **Expected Score:** 100% (Met: UIHostingController in navigation 50%, Met: incremental replacement 50%)
- **Rationale:** Simple and correct explanation.

### Sample 3: Weak
- **Answer:** "Coordinators automatically translate UIKit Objective-C files into SwiftUI Swift files."
- **Expected Score:** 0% (Not Met: UIHostingController 0%, Not Met: modular migration 0%)
- **Rationale:** Erroneous claim about automated file translation.

---

## Question 29 (Code-Write): AppRouter Implementation

**Prompt:** Implement an `AppRouter` class with a `var path: [String] = []` property. Add a `navigate(to:)` method that appends a route and a `reset()` method that removes all routes. Navigate to 'home' then 'profile', call `reset()`, and print the remaining count of routes.

### Sample 1: Good
- **Answer:**
```swift
final class AppRouter {
    var path: [String] = []
    func navigate(to route: String) {
        path.append(route)
    }
    func reset() {
        path.removeAll()
    }
}

let router = AppRouter()
router.navigate(to: "home")
router.navigate(to: "profile")
router.reset()
print(router.path.count)
```
- **Expected Score:** 100% (Met: path array 30%, Met: navigate and reset methods 40%, Met: outputs '0' 30%)
- **Rationale:** Clean, compiles, passes verification.

### Sample 2: Average
- **Answer:**
```swift
class AppRouter {
    var path = [String]()
    func navigate(to r: String) { path.append(r) }
    func reset() { path = [] }
}
let router = AppRouter()
router.navigate(to: "home")
router.navigate(to: "profile")
router.reset()
print(router.path.count)
```
- **Expected Score:** 100% (Met: path array 30%, Met: navigate and reset 40%, Met: prints 0 30%)
- **Rationale:** Fully satisfies requirements.

### Sample 3: Weak
- **Answer:**
```swift
print(0)
```
- **Expected Score:** 0% (Not Met: no class, no path, key criterion failed)
- **Rationale:** Hardcodes the output without declaring the requested class or methods.

---

## Question 30 (Code-Write): RouteResolver Implementation

**Prompt:** Declare a `ScreenRoute` enum with cases `list` and `item(Int)`. Implement a `RouteResolver` enum with a `static func resolve(_ route: ScreenRoute) -> String` method that returns 'Showing list' for `.list` and 'Showing item X' for `.item(X)`. Resolve `.item(5)` and print the result.

### Sample 1: Good
- **Answer:**
```swift
enum ScreenRoute {
    case list
    case item(Int)
}

enum RouteResolver {
    static func resolve(_ route: ScreenRoute) -> String {
        switch route {
        case .list:
            return "Showing list"
        case .item(let id):
            return "Showing item \(id)"
        }
    }
}

print(RouteResolver.resolve(.item(5)))
```
- **Expected Score:** 100% (Met: ScreenRoute enum 30%, Met: RouteResolver.resolve pattern matching 40%, Met: outputs 'Showing item 5' 30%)
- **Rationale:** Exact pattern matching and formatting as requested.

### Sample 2: Average
- **Answer:**
```swift
enum ScreenRoute { case list, item(Int) }
struct RouteResolver {
    static func resolve(_ r: ScreenRoute) -> String {
        if case .item(let id) = r { return "Showing item \(id)" }
        return "Showing list"
    }
}
print(RouteResolver.resolve(.item(5)))
```
- **Expected Score:** 100% (Met: enum 30%, Met: resolver 40%, Met: output 30%)
- **Rationale:** Accurate and passes verification.

### Sample 3: Weak
- **Answer:**
```swift
print("Showing item 5")
```
- **Expected Score:** 0% (Not Met: enum missing, resolver missing, key criterion failed)
- **Rationale:** Hardcodes output string without enum or resolver.

---

## Question 31 (Code-Write): FlowManager with Child Coordinators

**Prompt:** Create a `BaseCoordinator: AnyObject` protocol. Implement a `ChildCoordinatorA: BaseCoordinator` class and a `FlowManager` class holding `var childCoordinators: [BaseCoordinator] = []`. Add `addChild(_:)` and `removeChild(_:)` (using identity comparison `===`). Add a child, remove it, and print 'Remaining: 0'.

### Sample 1: Good
- **Answer:**
```swift
protocol BaseCoordinator: AnyObject {}
final class ChildCoordinatorA: BaseCoordinator {}

final class FlowManager {
    var childCoordinators: [BaseCoordinator] = []
    func addChild(_ child: BaseCoordinator) {
        childCoordinators.append(child)
    }
    func removeChild(_ child: BaseCoordinator) {
        childCoordinators.removeAll { $0 === child }
    }
}

let fm = FlowManager()
let child = ChildCoordinatorA()
fm.addChild(child)
fm.removeChild(child)
print("Remaining: \(fm.childCoordinators.count)")
```
- **Expected Score:** 100% (Met: protocol and child class 30%, Met: FlowManager with identity remove 40%, Met: outputs 'Remaining: 0' 30%)
- **Rationale:** Complete, idiomatic Swift implementation.

### Sample 2: Average
- **Answer:**
```swift
protocol BaseCoordinator: AnyObject {}
class ChildCoordinatorA: BaseCoordinator {}
class FlowManager {
    var childCoordinators: [BaseCoordinator] = []
    func addChild(_ c: BaseCoordinator) { childCoordinators.append(c) }
    func removeChild(_ c: BaseCoordinator) {
        childCoordinators.removeAll { $0 === c }
    }
}
let m = FlowManager()
let c = ChildCoordinatorA()
m.addChild(c)
m.removeChild(c)
print("Remaining: \(m.childCoordinators.count)")
```
- **Expected Score:** 100% (Met: protocol 30%, Met: manager and identity removal 40%, Met: output 30%)
- **Rationale:** Fully satisfies all criteria.

### Sample 3: Weak
- **Answer:**
```swift
print("Remaining: 0")
```
- **Expected Score:** 0% (Not Met: protocol missing, manager missing, key criterion failed)
- **Rationale:** Hardcodes output without implementing the coordinator manager.
