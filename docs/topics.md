# Topics by Level

Generated from `content/` by `node scripts/curriculum-report.mjs`. Do not edit by hand.

★ = bonus topic (side branch, not in the score). Order inside each unit is a draft until step 1.6.

| Level | Main | Bonus |
|---|---|---|
| Fresh | 22 | 0 |
| Junior | 44 | 1 |
| Mid | 44 | 9 |
| Senior | 30 | 5 |
| Staff | 9 | 0 |

## Fresh — 22 topics + 0 bonus

_Looking for your first iOS job._

### Swift Language

| Topic | Goal |
|---|---|
| Constants, Variables and Types | After this topic, you can create constants and variables, and explain how Swift chooses their types. |
| Optionals | After this topic, you can explain what an optional is and unwrap it safely. |
| Operators | After this topic, you can use Swift operators, including range and nil-coalescing operators. |
| Strings and Characters | After this topic, you can work with text in Swift strings. |
| Arrays, Sets and Dictionaries | After this topic, you can choose the right collection and use it correctly. |
| Control Flow | After this topic, you can use if, switch, guard and loops to control your code. |
| Functions | After this topic, you can write functions with parameters, labels and return values. |
| Closures: The Basics | After this topic, you can write closures and pass them to functions. |
| Enumerations | After this topic, you can model choices with enums and associated values. |
| Structs vs Classes | After this topic, you can explain the difference between value types and reference types, and choose one. |
| Properties | After this topic, you can use stored, computed and lazy properties and property observers. |
| Methods and Initialization | After this topic, you can write methods and initializers for your types. |
| Error Handling | After this topic, you can throw, catch and pass on errors, and use Result. |

### Coding Interview

| Topic | Goal |
|---|---|
| Big-O: Time and Space | After this topic, you can describe how fast an algorithm is and how much memory it uses. |
| Arrays and Strings | After this topic, you can solve array and string problems in Swift. |
| Hash Tables | After this topic, you can use dictionaries and sets to solve problems faster. |

### SwiftUI

| Topic | Goal |
|---|---|
| Views and Modifiers | After this topic, you can build a simple screen with views, modifiers and previews. |
| Stacks and Layout | After this topic, you can place views with stacks, spacing and alignment. |
| @State and @Binding | After this topic, you can store screen data with @State and share it with @Binding. |
| Lists and ForEach | After this topic, you can show a list of items. |
| Navigation | After this topic, you can move between screens with NavigationStack. |

### App and System

| Topic | Goal |
|---|---|
| Xcode, Projects and Git | After this topic, you can create a project in Xcode, run it and save your work with Git. |

## Junior — 44 topics + 1 bonus

_You build features on a team, with help._

### Swift Language

| Topic | Goal |
|---|---|
| Optional Chaining | After this topic, you can call properties and methods on optionals safely. |
| Inheritance | After this topic, you can use subclasses, override methods and explain when to avoid inheritance. |
| Type Casting and Any | After this topic, you can check and convert types with is, as? and as!. |
| Protocols | After this topic, you can define protocols and make types conform to them. |
| Extensions | After this topic, you can add features to existing types with extensions. |
| Generics: The Basics | After this topic, you can write generic functions and types. |
| Access Control | After this topic, you can choose the right access level for your code. |
| Closures: Escaping and Capture Lists | After this topic, you can explain escaping closures and how closures capture values. |
| Codable and JSON | After this topic, you can convert Swift types to and from JSON with Codable. |

### Coding Interview

| Topic | Goal |
|---|---|
| Sorting and Binary Search | After this topic, you can sort data and search it with binary search. |
| Two Pointers and Sliding Window | After this topic, you can solve problems with the two pointers and sliding window patterns. |
| Stacks and Queues | After this topic, you can solve problems with stacks and queues. |
| Linked Lists | After this topic, you can build and change linked lists. |
| Recursion | After this topic, you can solve problems with recursion. |
| Matrix Problems | After this topic, you can solve problems on 2D grids. |

### Memory

| Topic | Goal |
|---|---|
| How ARC Works | After this topic, you can explain how ARC decides when to free an object. |
| Strong, Weak and Unowned | After this topic, you can choose between strong, weak and unowned references. |
| Retain Cycles | After this topic, you can find and fix retain cycles in closures and delegates. |

### Concurrency

| Topic | Goal |
|---|---|
| The Main Thread | After this topic, you can explain why UI work must run on the main thread. |
| GCD Basics | After this topic, you can use dispatch queues and explain what replaced them. |
| async/await | After this topic, you can write and call async functions. |

### SwiftUI

| Topic | Goal |
|---|---|
| Data Flow with @Observable | After this topic, you can share data between views with @Observable, @Bindable and @Environment. |
| ObservableObject and @StateObject | After this topic, you can use ObservableObject, @StateObject and @ObservedObject in older code. |
| Forms and User Input | After this topic, you can build forms with text fields, toggles and pickers. |
| Sheets, Alerts and Dialogs | After this topic, you can show sheets, alerts and confirmation dialogs. |

### UIKit

| Topic | Goal |
|---|---|
| Views and View Controllers | After this topic, you can build a screen with UIView and UIViewController. |
| View Controller Lifecycle | After this topic, you can explain the view controller lifecycle methods and when each one runs. |
| Auto Layout | After this topic, you can build layouts with constraints. |
| Navigation in UIKit | After this topic, you can move between screens with navigation controllers and presentation. |
| Table and Collection Views | After this topic, you can show lists and grids with diffable data sources and compositional layout. |

### Design and Accessibility

| Topic | Goal |
|---|---|
| Dark Mode and Dynamic Type | After this topic, you can support Dark Mode and different text sizes. |
| ★ Apple Design and Liquid Glass | After this topic, you can explain the main ideas of the Human Interface Guidelines and Liquid Glass. |

### App and System

| Topic | Goal |
|---|---|
| App and Scene Lifecycle | After this topic, you can explain how an app starts, goes to the background and comes back. |
| Permissions and Privacy | After this topic, you can ask for permissions correctly and protect user privacy. |
| App Signing and the App Store | After this topic, you can explain app signing and how an app gets to the App Store. |

### Data and Networking

| Topic | Goal |
|---|---|
| HTTP and REST Basics | After this topic, you can explain HTTP requests, status codes and REST APIs. |
| URLSession | After this topic, you can load data from a web API with URLSession. |
| UserDefaults and Files | After this topic, you can save small data with UserDefaults and files. |
| Keychain Basics | After this topic, you can store secrets like tokens in the Keychain. |

### Architecture

| Topic | Goal |
|---|---|
| Delegates, Closures and Notifications | After this topic, you can choose between delegates, closures and notifications. |
| MVC and Its Problems | After this topic, you can explain MVC and why view controllers often get too big. |
| SOLID Basics | After this topic, you can explain the SOLID principles with iOS examples. |

### Testing and Release

| Topic | Goal |
|---|---|
| Debugging with Breakpoints and LLDB | After this topic, you can find bugs with breakpoints and LLDB. |
| Logging with OSLog | After this topic, you can add useful logs with OSLog. |
| Unit Tests | After this topic, you can write unit tests with Swift Testing and XCTest. |

## Mid — 44 topics + 9 bonus

_You own features from start to end._

### Swift Language

| Topic | Goal |
|---|---|
| Protocol-Oriented Programming | After this topic, you can design code with protocols and protocol extensions. |
| Generics: Associated Types and Where Clauses | After this topic, you can use associated types and add rules to generic code. |
| Opaque and Boxed Types: some vs any | After this topic, you can explain the difference between some and any, and choose one. |
| Copy-on-Write and Value Semantics | After this topic, you can explain how Swift collections avoid extra copies and when copies happen. |
| ★ Key Paths | After this topic, you can use key paths to refer to properties. |
| Property Wrappers | After this topic, you can explain how property wrappers work and write your own. |
| ★ Result Builders | After this topic, you can explain how result builders build values like SwiftUI views. |

### Coding Interview

| Topic | Goal |
|---|---|
| Trees: BFS and DFS | After this topic, you can walk trees with breadth-first and depth-first search. |
| Graphs | After this topic, you can model problems as graphs and search them. |
| Heaps | After this topic, you can use heaps to find the top items fast. |
| ★ Tries | After this topic, you can store and search words with a trie. |
| Intervals | After this topic, you can solve problems with ranges that overlap. |
| ★ Dynamic Programming | After this topic, you can solve problems by building on answers to smaller problems. |
| ★ Bits, Math and Geometry | After this topic, you can solve problems with bit operations and math. |

### Memory

| Topic | Goal |
|---|---|
| Finding Leaks with the Memory Graph | After this topic, you can find memory leaks with the Xcode Memory Graph debugger. |

### Concurrency

| Topic | Goal |
|---|---|
| Tasks and Task Groups | After this topic, you can create tasks and task groups, and explain structured concurrency. |
| Task Cancellation | After this topic, you can cancel tasks and write code that stops when you cancel it. |
| AsyncSequence and AsyncStream | After this topic, you can use async sequences to handle values over time. |
| Actors and @MainActor | After this topic, you can protect shared state with actors and run UI code on the main actor. |
| Sendable and Data Races | After this topic, you can explain data races and how Sendable helps stop them. |
| Swift 6 Strict Concurrency | After this topic, you can fix common Swift 6 concurrency errors. |
| Approachable Concurrency | After this topic, you can explain default main actor isolation, @concurrent and nonisolated. |

### SwiftUI

| Topic | Goal |
|---|---|
| Loading Data in SwiftUI | After this topic, you can load data with the task modifier and show images with AsyncImage. |
| View Identity and Lifetime | After this topic, you can explain view identity and when SwiftUI updates a view. |
| Animations and Transitions | After this topic, you can add animations and transitions to your views. |
| ★ Custom Layouts | After this topic, you can write a custom layout with the Layout protocol. |
| SwiftUI and UIKit Together | After this topic, you can use UIKit views in SwiftUI and SwiftUI views in UIKit. |
| SwiftUI Performance | After this topic, you can find and fix slow SwiftUI views. |

### UIKit

| Topic | Goal |
|---|---|
| Custom Views and the Layout Pass | After this topic, you can build custom views and explain how UIKit lays out views. |

### Design and Accessibility

| Topic | Goal |
|---|---|
| Accessibility | After this topic, you can make an app work with VoiceOver and other accessibility features. |
| ★ Localization | After this topic, you can translate an app with String Catalogs. |
| iPad and Adaptive Layout | After this topic, you can build layouts that work on iPhone and iPad. |

### App and System

| Topic | Goal |
|---|---|
| Push and Local Notifications | After this topic, you can send local notifications and explain how push notifications work. |
| Background Work | After this topic, you can run work in the background with Background Tasks. |
| Deep Links and Universal Links | After this topic, you can open a screen in your app from a link. |
| ★ Widgets and App Intents | After this topic, you can explain how widgets and App Intents work. |
| ★ On-Device AI with Foundation Models | After this topic, you can use the on-device Apple model in an app. |

### Data and Networking

| Topic | Goal |
|---|---|
| SwiftData | After this topic, you can save and query data with SwiftData. |
| Core Data | After this topic, you can explain Core Data and use it in older apps. |
| Caching | After this topic, you can cache network responses and images. |
| Pagination | After this topic, you can load long lists page by page. |
| Combine Basics | After this topic, you can read and write basic Combine code in older apps. |

### Architecture

| Topic | Goal |
|---|---|
| MVVM | After this topic, you can build a feature with MVVM and explain its trade-offs. |
| Dependency Injection | After this topic, you can pass dependencies into your code so it is easy to test. |
| Design Patterns | After this topic, you can use common design patterns and explain the problems with singletons. |
| Navigation Patterns | After this topic, you can manage navigation with coordinators or routers. |

### Testing and Release

| Topic | Goal |
|---|---|
| Testable Code and Mocks | After this topic, you can write code that is easy to test and use mocks. |
| Testing Async Code | After this topic, you can test async functions and concurrent code. |
| UI Tests | After this topic, you can write UI tests for your app. |
| Code Review | After this topic, you can give and receive useful code reviews. |

### Performance

| Topic | Goal |
|---|---|
| Keeping the UI Smooth | After this topic, you can find and remove slow work on the main thread. |
| App Launch Time | After this topic, you can measure and improve how fast an app starts. |

### Mobile System Design

| Topic | Goal |
|---|---|
| How a Mobile System Design Interview Works | After this topic, you can explain the steps of a mobile system design interview. |

## Senior — 30 topics + 5 bonus

_You design systems and lead projects._

### Swift Language

| Topic | Goal |
|---|---|
| Macros | After this topic, you can explain what Swift macros do and when to use them. |
| ★ Noncopyable Types and Ownership | After this topic, you can explain noncopyable types and the borrowing and consuming keywords. |
| ★ InlineArray and Span | After this topic, you can explain when InlineArray and Span help performance. |
| ★ Memory Safety and Exclusive Access | After this topic, you can explain the exclusive access rules and strict memory safety. |

### Memory

| Topic | Goal |
|---|---|
| Memory Profiling with Instruments | After this topic, you can measure memory use with Instruments and reduce it. |

### Concurrency

| Topic | Goal |
|---|---|
| Moving from GCD to async/await | After this topic, you can move old callback and GCD code to async/await safely. |
| Designing for Concurrency | After this topic, you can choose the right isolation for a whole feature or app. |
| ★ New in Swift 6.4: Concurrency | After this topic, you can use async code in defer and protect cleanup work from cancellation. |

### Data and Networking

| Topic | Goal |
|---|---|
| Real-Time Data | After this topic, you can get live updates with WebSockets and server-sent events. |
| Offline-First Apps and Sync | After this topic, you can build apps that work offline and sync later. |
| App Security | After this topic, you can protect data on the network and on the device. |

### Architecture

| Topic | Goal |
|---|---|
| Clean Architecture | After this topic, you can split an app into layers and explain the trade-offs. |
| Modularization with Swift Packages | After this topic, you can split a large app into Swift packages. |
| ★ Unidirectional Data Flow | After this topic, you can explain Redux-style architecture and when teams use it. |

### Testing and Release

| Topic | Goal |
|---|---|
| CI/CD | After this topic, you can build, test and ship apps automatically with Xcode Cloud. |
| Crash Reports and MetricKit | After this topic, you can read crash reports and collect app metrics. |
| Feature Flags and Safe Releases | After this topic, you can release features safely with feature flags and phased releases. |

### Performance

| Topic | Goal |
|---|---|
| Profiling with Instruments | After this topic, you can find slow code with Time Profiler and other instruments. |
| Battery, Network and App Size | After this topic, you can reduce battery use, network use and app size. |

### Mobile System Design

| Topic | Goal |
|---|---|
| Requirements and Scope | After this topic, you can ask the right questions and set the scope of a design. |
| High-Level App Architecture | After this topic, you can draw the main parts of an app design. |
| API Design and Protocols | After this topic, you can choose between REST, GraphQL and WebSockets for a design. |
| Pagination, Caching and Storage | After this topic, you can design how an app loads, caches and stores data. |
| Offline Mode and Sync | After this topic, you can design an app that works offline. |
| Real-Time Updates and Push | After this topic, you can design live updates and push notifications. |
| Image Loading at Scale | After this topic, you can design fast image loading for long lists. |
| Security and Privacy in a Design | After this topic, you can add security and privacy to a design. |
| Practice: Design a Feed | After this topic, you can design a news feed from start to end. |
| Practice: Design a Chat App | After this topic, you can design a chat app from start to end. |

### Behavior and Leadership

| Topic | Goal |
|---|---|
| The STAR Method | After this topic, you can answer behavior questions with the STAR method. |
| Disagreement and Conflict | After this topic, you can talk about a disagreement and how you solved it. |
| Mentoring | After this topic, you can show how you help other developers grow. |
| Mistakes and Incidents | After this topic, you can talk about a mistake or an incident and what you learned. |
| Prioritizing Under Pressure | After this topic, you can explain how you choose what to do first. |
| Working with Other Teams | After this topic, you can show how you get other teams to agree with a plan. |

## Staff — 9 topics + 0 bonus

_You set technical direction for many teams._

### Architecture

| Topic | Goal |
|---|---|
| Designing a Library or SDK | After this topic, you can design a library that other teams can use safely. |
| Platform Architecture for Many Teams | After this topic, you can plan an app architecture that many teams share. |

### Testing and Release

| Topic | Goal |
|---|---|
| Test Strategy for a Large App | After this topic, you can plan how a large app is tested. |

### Mobile System Design

| Topic | Goal |
|---|---|
| Practice: Design an Image Loader or Analytics SDK | After this topic, you can design a library that many apps or teams use. |
| Shared Platforms for Many Teams | After this topic, you can design shared mobile systems for many teams. |

### Behavior and Leadership

| Topic | Goal |
|---|---|
| Technical Vision | After this topic, you can write a technical plan for the next years. |
| Design Docs and RFCs | After this topic, you can write a design document that others can review. |
| Build or Buy | After this topic, you can decide when to build a tool and when to use an existing one. |
| Leading Through Influence | After this topic, you can lead people who do not report to you. |
