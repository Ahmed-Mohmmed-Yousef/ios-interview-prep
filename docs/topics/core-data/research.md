# Topic Research: Core Data

**Topic ID:** `core-data`  
**Level:** Mid  
**Prerequisites:** `userdefaults-and-files`  
**Date Researched:** 2026-11-10  
**Target Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Official Documentation & Authoritative Sources

1. **Core Data Framework (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/coredata  
   *Summary:* Core Data is an object graph management and persistence framework. It allows developers to model data relationships, track changes, perform undo/redo, and persist graphs to SQLite, binary, or in-memory stores.

2. **Setting Up a Core Data Stack (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/coredata/setting_up_a_core_data_stack  
   *Summary:* Describes `NSPersistentContainer`, which encapsulates the Core Data stack: `NSManagedObjectModel`, `NSPersistentStoreCoordinator`, and the main-thread `viewContext`.

3. **NSManagedObjectContext (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext  
   *Summary:* Manages a collection of managed objects, tracking inserts, deletions, and updates. Details queue confinement rules: `.mainQueueConcurrencyType` and `.privateQueueConcurrencyType`. Emphasizes `perform(_:)` and `performAndWait(_:)` for thread safety.

4. **Faulting and Uniquing (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/coredata/faulting_and_uniquing  
   *Summary:* Explains faulting: Core Data creates placeholder objects (`faults`) to minimize memory usage. When an attribute is accessed, Core Data fires the fault and retrieves the data from disk. Uniquing ensures that a single context never contains more than one managed object representing the same database record.

5. **NSFetchedResultsController (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/coredata/nsfetchedresultscontroller  
   *Summary:* Coordinates between Core Data fetch requests and table or collection views in UIKit, handling incremental batch updates, sectioning, and change tracking efficiently.

---

## 2. Core Technical Concepts

### A. The Core Data Stack Architecture
- **`NSManagedObjectModel` (`.xcdatamodeld`):** The blueprint of entities, attributes, and relationships.
- **`NSPersistentStoreCoordinator`:** The mediator that connects contexts to physical storage files (SQLite, XML, binary, or memory).
- **`NSPersistentContainer`:** The high-level coordinator introduced in iOS 10 that wraps model, coordinator, and context setup into a unified interface.
- **`NSManagedObjectContext`:** The working scratchpad.
  - `container.viewContext`: Main-queue context for UI operations.
  - `container.newBackgroundContext()`: Creates a private queue context for heavy background tasks.
  - `container.performBackgroundTask { context in ... }`: Executes closures asynchronously on a temporary background context.

### B. Faulting and Uniquing
- **Faulting:** Objects are loaded as hollow shells (pointers with IDs) until their attributes are read. This keeps memory footprints low even when querying thousands of records.
- **Fault Firing:** Triggered automatically when reading a property. If triggered on the wrong thread, causes data corruption or crashes.
- **Uniquing:** Core Data guarantees that within a given `NSManagedObjectContext`, there is only one `NSManagedObject` instance per physical database record.

### C. Concurrency and Thread Safety
- `NSManagedObjectContext` and `NSManagedObject` are **not thread-safe**.
- Never access a managed object outside the context's designated queue.
- Always use `context.perform { ... }` or `context.performAndWait { ... }`.
- To pass records between threads or contexts, pass `NSManagedObjectID` (which is thread-safe and Sendable), and call `context.object(with: id)` or `context.existingObject(with: id)`.

---

## 3. Common Interview Questions & Traps

1. **What is faulting, and why is it important in Core Data?**  
   Faulting is lazy loading: Core Data instantiates an `NSManagedObject` placeholder without fetching its full column data from disk until a property is accessed. This saves memory and speeds up queries.
2. **How do you handle multithreading and concurrency in Core Data?**  
   Core Data contexts are bound to specific queues. Use `viewContext` for UI on the main thread, and `newBackgroundContext()` for background operations. Always wrap operations inside `context.perform`. Never pass `NSManagedObject` instances between contexts; pass `NSManagedObjectID` instead.
3. **What is the difference between `perform(_:)` and `performAndWait(_:)`?**  
   `perform(_:)` schedules the closure asynchronously on the context's queue without blocking the caller. `performAndWait(_:)` schedules it synchronously, blocking the calling thread until the closure completes.
4. **How do changes in a background context reach the viewContext?**  
   In modern Core Data, set `container.viewContext.automaticallyMergesChangesFromParent = true`. When background contexts save to the persistent store coordinator, changes automatically propagate to the main context.
