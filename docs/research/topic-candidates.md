# Topic Candidates

> **History (step 1.3).** This was the first list. The final topics, levels and order are in [../topics.md](../topics.md) and the `content/` files. Some levels changed later (for example async/await moved to junior).

The main result of step 1.3: every topic we might teach. **Nothing here is final.** The areas below are draft groups. Step 1.4 decides the units, and step 1.5 sets the final level of each topic with you.

**Columns**
- **Level** — our suggestion: F = fresh, J = junior, M = mid, S = senior, St = staff.
- **Kind** — main (on the road) or bonus (side branch). A suggestion.
- **Why** — **O** = an official source covers it ([official-sources.md](official-sources.md)). **I** = interview sources ask about it ([interview-topics.md](interview-topics.md)). **New** = changed in Swift 6.2–6.4 or iOS 26–27.

## A. Swift Language

| Topic | Level | Kind | Why |
|---|---|---|---|
| Constants, variables, types, type inference | F | main | O |
| Optionals and unwrapping | F | main | O, I |
| Operators | F | main | O |
| Strings and characters | F | main | O |
| Collections: Array, Set, Dictionary | F | main | O |
| Control flow (if, switch, loops, guard) | F | main | O |
| Functions | F | main | O |
| Closures: basics | F | main | O, I |
| Enumerations and associated values | F | main | O |
| Structs vs classes | F | main | O, I |
| Properties (stored, computed, observers, lazy) | F | main | O |
| Methods and initialization | F | main | O |
| Error handling (throws, do/catch, Result) | F | main | O |
| Protocols | J | main | O, I |
| Extensions | J | main | O |
| Inheritance and overriding | J | main | O |
| Generics: basics | J | main | O |
| Access control | J | main | O |
| Type casting and `Any` | J | main | O |
| Closures: escaping, capture lists | J | main | O, I |
| Optional chaining | J | main | O |
| Codable (JSON) | J | main | O, I |
| Protocol-oriented programming | M | main | I |
| Generics: associated types and `where` | M | main | O |
| Opaque and boxed types (`some` vs `any`) | M | main | O, I |
| Property wrappers | M | main | O, I |
| Result builders | M | bonus | O |
| Copy-on-write and value semantics in depth | M | main | I |
| Key paths | M | bonus | O |
| Macros | S | main | O |
| Noncopyable types and ownership (`borrowing`, `consuming`) | S | bonus | O, New |
| `InlineArray` and `Span` | S | bonus | O, New |
| Memory safety (exclusive access) and strict memory safety | S | bonus | O, New |

## B. Memory

| Topic | Level | Kind | Why |
|---|---|---|---|
| How ARC works | J | main | O, I |
| Strong, weak and unowned references | J | main | O, I |
| Retain cycles in closures and delegates | J | main | O, I |
| Finding leaks with the Memory Graph debugger | M | main | I |
| Memory profiling with Instruments | S | main | I |

## C. Concurrency

| Topic | Level | Kind | Why |
|---|---|---|---|
| Main thread and why UI work runs there | J | main | I |
| GCD basics (still in many codebases) | J | main | I |
| async/await | M | main | O, I |
| Tasks, task groups, structured concurrency | M | main | O, I |
| Task cancellation | M | main | O |
| Actors and `@MainActor` | M | main | O, I |
| `Sendable` and data races | M | main | O, I |
| Swift 6 strict concurrency | M | main | O, I |
| Approachable concurrency: default main actor, `@concurrent`, `nonisolated` | M | main | O, New |
| AsyncSequence and AsyncStream | M | main | O |
| Moving from GCD and callbacks to async/await | S | main | I |
| Designing concurrent systems (isolation choices) | S | main | I |
| New in Swift 6.4: `async` in `defer`, cancellation shields | S | bonus | O, New |

## D. User Interface — SwiftUI

| Topic | Level | Kind | Why |
|---|---|---|---|
| Views, modifiers and previews | F | main | O |
| Stacks, spacing and basic layout | F | main | O |
| Lists and `ForEach` | F | main | O |
| `@State` and `@Binding` | F | main | O, I |
| Navigation basics (`NavigationStack`) | F | main | O |
| Data flow: `@Observable`, `@Bindable`, `@Environment` | J | main | O, I |
| `ObservableObject`, `@StateObject`, `@ObservedObject` (older code) | J | main | I |
| Sheets, alerts and dialogs | J | main | O, New |
| Forms and user input | J | main | O |
| Loading data: `.task`, `AsyncImage` | J | main | O, New |
| View identity, lifetime and when views update | M | main | O, I, New |
| SwiftUI performance | M | main | I |
| Animations and transitions | M | main | O |
| Custom layouts | M | bonus | O |
| SwiftUI and UIKit together (`UIViewRepresentable`, `UIHostingController`) | M | main | O, I |

## E. User Interface — UIKit

| Topic | Level | Kind | Why |
|---|---|---|---|
| Views and view controllers | J | main | O |
| View controller lifecycle | J | main | O, I |
| Auto Layout | J | main | O, I |
| Table and collection views (diffable data sources, compositional layout) | J | main | O, I |
| Navigation and presentation in UIKit | J | main | O |
| Custom views and the layout pass | M | main | O |

## F. Design, Accessibility and iPad

| Topic | Level | Kind | Why |
|---|---|---|---|
| Human Interface Guidelines and Liquid Glass basics | J | bonus | O, New |
| Dark Mode and Dynamic Type | J | main | O |
| Accessibility (VoiceOver, labels, contrast) | M | main | O, I |
| Localization (String Catalogs) | M | bonus | O |
| iPad: size classes and adaptive layouts | M | main | O |

## G. App and System

| Topic | Level | Kind | Why |
|---|---|---|---|
| Xcode, project structure and Git basics | F | main | O |
| App and scene lifecycle | J | main | O, I |
| Permissions and privacy | J | main | O |
| App signing and App Store basics | J | main | O |
| Push and local notifications | M | main | O, I |
| Background work (Background Tasks) | M | main | O, I |
| Deep links and universal links | M | main | O |
| Widgets and App Intents | M | bonus | O |
| On-device AI with Foundation Models | M | bonus | O, New |

## H. Data and Networking

| Topic | Level | Kind | Why |
|---|---|---|---|
| HTTP and REST basics | J | main | I |
| URLSession | J | main | O, I |
| Saving small data: UserDefaults and files | J | main | O |
| Keychain basics | J | main | O, I |
| SwiftData | M | main | O, New |
| Core Data (still in many apps) | M | main | O, I |
| Caching (URLCache, images) | M | main | O, I |
| Pagination | M | main | I |
| Combine basics (still in many apps) | M | main | O, I |
| Real-time: WebSockets and server-sent events | S | main | I |
| Offline-first apps and sync | S | main | I |
| App security: TLS, certificate pinning, data protection | S | main | O, I |

## I. Architecture

| Topic | Level | Kind | Why |
|---|---|---|---|
| MVC and its problems | J | main | I |
| Delegation, closures and notifications: when to use each | J | main | I |
| SOLID basics | J | main | I |
| MVVM | M | main | I |
| Dependency injection | M | main | I |
| Navigation patterns (coordinators, routers) | M | main | I |
| Common design patterns and singleton pitfalls | M | main | I |
| Clean Architecture | S | main | I |
| Modularization with Swift Package Manager | S | main | O, I |
| Unidirectional data flow (Redux style; TCA mentioned) | S | bonus | I |
| Designing a library or SDK | St | main | I |
| Platform architecture for many teams | St | main | I |

## J. Testing, Debugging and Release

| Topic | Level | Kind | Why |
|---|---|---|---|
| Debugging: breakpoints and LLDB | J | main | O, I |
| Logging with OSLog | J | main | O |
| Unit tests with Swift Testing and XCTest | J | main | O, New |
| Writing testable code with mocks | M | main | I |
| Testing async code | M | main | O |
| UI tests | M | main | O |
| Code review | M | main | I |
| CI/CD (Xcode Cloud; fastlane mentioned) | S | main | O, I |
| Crash reports and MetricKit | S | main | O, I |
| Feature flags, phased releases, staged rollouts | S | main | I |
| Test strategy for a large app | St | main | I |

## K. Performance

| Topic | Level | Kind | Why |
|---|---|---|---|
| Keeping the UI smooth (main-thread work) | M | main | I |
| App launch time | M | main | I |
| Instruments: Time Profiler and more | S | main | O, I |
| Battery, network and app size | S | main | I |

## L. Coding Interview (algorithms in Swift)

Priority from Tech Interview Handbook: H = high, Mi = mid, L = low.

| Topic | Level | Kind | Why |
|---|---|---|---|
| Big-O: time and space | F | main | I |
| Arrays and strings (H) | F | main | I |
| Hash tables (Mi) | F | main | I |
| Two pointers and sliding window | J | main | I |
| Stacks and queues (Mi) | J | main | I |
| Sorting and binary search (H) | J | main | I |
| Recursion (Mi) | J | main | I |
| Linked lists (Mi) | J | main | I |
| Matrix problems (H) | J | main | I |
| Trees: BFS and DFS (H) | M | main | I |
| Graphs (H) | M | main | I |
| Heaps (Mi) | M | main | I |
| Intervals (Mi) | M | main | I |
| Tries (Mi) | M | bonus | I |
| Dynamic programming (L) | S | bonus | I |
| Bits, math and geometry (L) | S | bonus | I |

## M. Mobile System Design

| Topic | Level | Kind | Why |
|---|---|---|---|
| How a mobile system design interview works | M | main | I |
| Requirements and scoping | S | main | I |
| High-level app architecture for a design | S | main | I |
| API design and protocols (REST, GraphQL, WebSocket) | S | main | I |
| Pagination, caching and storage in a design | S | main | I |
| Offline mode and sync in a design | S | main | I |
| Real-time updates and push | S | main | I |
| Image loading at scale | S | main | I |
| Security and privacy in a design | S | main | I |
| Practice: design a feed | S | main | I |
| Practice: design a chat app | S | main | I |
| Practice: design an image loader or analytics SDK | St | main | I |
| Org-scale design: shared platforms for many teams | St | main | I |

## N. Behavior and Leadership (senior and staff)

| Topic | Level | Kind | Why |
|---|---|---|---|
| The STAR method | S | main | I |
| Disagreement and conflict | S | main | I |
| Mentoring | S | main | I |
| Mistakes, incidents and recovery | S | main | I |
| Prioritizing under pressure | S | main | I |
| Influencing other teams | S | main | I |
| Technical vision and multi-year plans | St | main | I |
| Writing design docs (RFCs) | St | main | I |
| Build or buy decisions | St | main | I |
| Leading through influence | St | main | I |

## Totals

**164 candidates**: 149 main, 15 bonus.

| Level | Fresh | Junior | Mid | Senior | Staff |
|---|---|---|---|---|---|
| Topics | 22 | 45 | 51 | 37 | 9 |

Staff has few new topics on purpose: Dropbox's framework says staff coding skill is not expected beyond senior, so staff is mostly strategy and leadership. Mid and junior are large; step 1.5 asks you how many topics per level feels right, and some topics may merge or move to bonus.
