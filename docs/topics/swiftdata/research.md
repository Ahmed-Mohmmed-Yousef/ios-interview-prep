# Topic Research: SwiftData

**Topic ID:** `swiftdata`  
**Level:** Mid  
**Prerequisites:** `userdefaults-and-files`, `swiftui-observation`  
**Date Researched:** 2026-11-10  
**Target Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Official Documentation & Authoritative Sources

1. **SwiftData Framework Documentation (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/swiftdata  
   *Summary:* SwiftData provides a declarative, Swift-native persistence framework built on top of Core Data's proven storage engine. It uses Swift macros (`@Model`) rather than external `.xcdatamodeld` files.

2. **ModelContainer (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/swiftdata/modelcontainer  
   *Summary:* An object that manages an app's schema and model storage configuration. It establishes the persistence layer, manages SQLite files on disk or in-memory stores, and coordinates schema migrations.

3. **ModelContext (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/swiftdata/modelcontext  
   *Summary:* An object that tracks unsaved changes to models, handles CRUD operations (`insert`, `delete`, `save`), and coordinates fetching. SwiftUI views access the main context through the `@Environment(\.modelContext)` environment value.

4. **Query (SwiftUI / SwiftData Documentation)**  
   URL: https://developer.apple.com/documentation/swiftdata/query  
   *Summary:* A SwiftUI property wrapper that fetches persistent models from the ambient `ModelContext`, applies sorting and predicates, and triggers automatic view updates when data changes.

5. **ModelActor Protocol & Macro (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/swiftdata/modelactor  
   *Summary:* A protocol and macro that isolates a `ModelContext` to an actor for safe background processing in Swift Concurrency. Models should not cross actor boundaries; only `PersistentIdentifier` or values should be transferred.

6. **WWDC23 Session 10187: Meet SwiftData**  
   URL: https://developer.apple.com/videos/play/wwdc2023/10187/  
   *Summary:* Introduces SwiftData architecture, `@Model` macro transformations, automatic observation integration, relationship modeling, and SwiftUI environment integration.

---

## 2. Core Technical Concepts

### A. The Core Building Blocks
- **`@Model` Macro:** Converts standard Swift classes into persistent entities. Automatically synthesizes schema metadata, observation tracking (similar to `@Observable`), and property getters/setters.
- **`ModelContainer`:** Manages the database schema and storage backend. In SwiftUI apps, set up at root level with `.modelContainer(for: [ModelType.self])`.
- **`ModelContext`:** The working scratchpad. Tracks entity mutations, inserts, deletes, and handles rollback/save. In SwiftUI, the container supplies a main-actor bound context. In background threads, you instantiate a new context or use a `@ModelActor`.
- **`@Query`:** Declarative data fetching in SwiftUI views. Re-executes and updates views when matching models are inserted, updated, or removed.
- **`#Predicate` Macro:** Compile-time type-checked query predicates that replace `NSPredicate` string formatting.
- **`FetchDescriptor`:** Configures queries outside SwiftUI, combining `#Predicate`, sort descriptors, and batch fetch limits.

### B. Relationships and Attributes
- **`@Attribute(.unique)`:** Enforces uniqueness constraints on model properties.
- **`@Attribute(.externalStorage)`:** Stores binary data (blobs/images) outside the SQLite store on disk.
- **`@Relationship(deleteRule: .cascade)`:** Defines relationship behavior such as cascade delete, nullify, or deny.

### C. Concurrency in Swift 6
- Persistent models are classes and conform to `PersistentModel`. They are **not** `Sendable`.
- Passing a model instance between different threads or actors causes data races or crashes.
- To use SwiftData across actors, use `PersistentIdentifier` (which is `Sendable`), or encapsulate background work in an actor conforming to `ModelActor`.

---

## 3. Common Interview Questions & Traps

1. **How does SwiftData relate to Core Data?**  
   SwiftData is a modern Swift-native abstraction on top of Core Data storage infrastructure (SQLite). It uses Swift macros and Swift Concurrency instead of Objective-C runtimes and XML mapping models.
2. **Can you pass a `@Model` instance to a background `Task` or actor?**  
   No. `@Model` classes are not `Sendable`. Passing model instances across concurrency boundaries causes undefined behavior and Swift 6 concurrency compiler errors. Pass `PersistentIdentifier` instead and re-fetch inside the target actor's `ModelContext`.
3. **What happens if you do not call `context.save()`?**  
   SwiftData features an autosave mechanism. In many UI contexts, changes are saved periodically (e.g., when the app goes to background or the run loop finishes). However, explicit `try context.save()` is recommended before critical transitions or when checking for persistence errors.
4. **How do you set up SwiftData for testing or SwiftUI previews?**  
   Configure `ModelConfiguration(isStoredInMemoryOnly: true)` to avoid writing to disk during automated tests or canvas previews.
