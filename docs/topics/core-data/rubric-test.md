# Rubric Test: Core Data

**Topic:** `core-data`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Faulting and Performance

**Prompt:** Explain the concept of faulting in Core Data and why it helps performance. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Faulting is Core Data lazy loading mechanism where queried objects load into memory as hollow placeholder records. The actual attribute and relationship data remains on disk until your code explicitly reads a property. This prevents large object graphs from consuming unnecessary RAM and accelerates initial fetch speeds."
- **Expected Score:** 100% (Met: hollow placeholders 50%, Met: memory and query speed 50%)
- **Rationale:** Accurately explains placeholder instantiation and lazy data retrieval benefits.

### Sample 2: Average
- **Answer:** "Faulting means Core Data does not load all columns right away when you fetch. It leaves them as faults and only gets the data when you touch a property."
- **Expected Score:** 75% (Met: hollow placeholders 50%, Partly Met: performance benefits 25%)
- **Rationale:** Understands lazy property loading, but gives minimal detail on memory impact.

### Sample 3: Weak
- **Answer:** "Faulting happens when a database query crashes because of corrupted files."
- **Expected Score:** 0% (Not Met: placeholder 0%, Not Met: performance 0%)
- **Rationale:** Conflates faulting with a software bug or crash.

---

## Question 25 (Written): Role of NSPersistentContainer

**Prompt:** Explain what NSPersistentContainer does in a Core Data stack. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "NSPersistentContainer simplifies Core Data setup by encapsulating the managed object model, the persistent store coordinator, and the managed object contexts. It provides the main-queue viewContext for user interface display. It also offers helper methods like newBackgroundContext() to handle background data imports safely."
- **Expected Score:** 100% (Met: encapsulation of stack 50%, Met: viewContext and background helper 50%)
- **Rationale:** Covers full stack encapsulation and context provision.

### Sample 2: Average
- **Answer:** "NSPersistentContainer sets up the Core Data stack easily so you do not have to write all the coordinator code yourself. It gives you a viewContext to display data."
- **Expected Score:** 75% (Partly Met: encapsulation 25%, Met: context access 50%)
- **Rationale:** Mentions stack setup and viewContext without detailing the internal components.

### Sample 3: Weak
- **Answer:** "It is a UI container view that holds table views on iPad."
- **Expected Score:** 0% (Not Met: stack 0%, Not Met: context 0%)
- **Rationale:** Confuses database architecture with UIKit view layout.

---

## Question 26 (Written): Concurrency and Thread Safety in Core Data

**Prompt:** Why are NSManagedObject and NSManagedObjectContext not thread-safe, and how do you access them correctly? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Managed objects and contexts are strictly confined to the specific thread or dispatch queue where they were created. Accessing them from another thread causes data corruption and crashes. Developers must wrap operations inside perform or performAndWait, and pass thread-safe NSManagedObjectID tokens between contexts."
- **Expected Score:** 100% (Met: queue confinement 50%, Met: perform and NSManagedObjectID 50%)
- **Rationale:** Clearly explains queue confinement, perform blocks, and object ID transfer.

### Sample 2: Average
- **Answer:** "They are not thread safe because you can only use them on the thread they belong to. You have to call context.perform to do work safely."
- **Expected Score:** 75% (Met: queue confinement 50%, Partly Met: perform without ID 25%)
- **Rationale:** Mentions queue confinement and perform, but omits NSManagedObjectID.

### Sample 3: Weak
- **Answer:** "They are not thread safe because Swift 6 does not allow any classes to run on background threads."
- **Expected Score:** 0% (Not Met: confinement 0%, Not Met: perform 0%)
- **Rationale:** Misattributes the issue to general Swift class restrictions.

---

## Question 27 (Written): Propagating Background Saves to viewContext

**Prompt:** How do you propagate changes saved in a background context to the main viewContext? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "To synchronize changes, configure viewContext by setting automaticallyMergesChangesFromParent to true. When a background context commits updates to the persistent store coordinator, the coordinator notifies the main context. The main context merges these changes into memory automatically so the UI reflects updated data."
- **Expected Score:** 100% (Met: property setting 50%, Met: automatic coordinator merge 50%)
- **Rationale:** Covers both property configuration and coordinator propagation.

### Sample 2: Average
- **Answer:** "You set automaticallyMergesChangesFromParent on the viewContext. When the background context saves to disk, the changes merge into the main context."
- **Expected Score:** 100% (Met: property setting 50%, Met: merge 50%)
- **Rationale:** Accurately states property and merging effect.

### Sample 3: Weak
- **Answer:** "You restart the app so the main view reads the new database file."
- **Expected Score:** 0% (Not Met: property 0%, Not Met: merge 0%)
- **Rationale:** Suggests restarting the app instead of using Core Data synchronization.

---

## Question 28 (Written): N+1 Fault Problem and Resolution

**Prompt:** What causes the N+1 fault firing problem in Core Data and how do you resolve it? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "The N+1 problem occurs when iterating through an array of objects and accessing an unloaded relationship on each item. Because relationships are faults, Core Data executes a separate disk query for every single iteration. To solve this, specify relationshipKeyPathsForPrefetching on the NSFetchRequest so related entities load together in a batch."
- **Expected Score:** 100% (Met: cause of N+1 50%, Met: prefetching key paths 50%)
- **Rationale:** Clearly explains relationship fault firing in loops and the prefetching solution.

### Sample 2: Average
- **Answer:** "It happens when you loop through objects and reading their child objects causes a new query every time. You fix it by batch prefetching the relationship."
- **Expected Score:** 75% (Met: cause 50%, Partly Met: batch prefetch without API 25%)
- **Rationale:** Explains the problem well and mentions prefetching generally.

### Sample 3: Weak
- **Answer:** "The N+1 problem happens when your database has more than one table."
- **Expected Score:** 0% (Not Met: cause 0%, Not Met: solution 0%)
- **Rationale:** Completely misses the concept of repeated fault firing.

---

## Question 29 (Code-Write): Inserting a Managed Object

**Prompt:** Write a function insertRecord(entity: NSEntityDescription, name: String, into context: NSManagedObjectContext) -> NSManagedObject that creates a managed object, sets its "name" key, and returns it.

### Sample 1: Good
```swift
func insertRecord(entity: NSEntityDescription, name: String, into context: NSManagedObjectContext) -> NSManagedObject {
    let obj = NSManagedObject(entity: entity, insertInto: context)
    obj.setValue(name, forKey: "name")
    return obj
}
```
- **Expected Score:** 100% (Met: instantiate 50%, Met: setValue 50%)
- **Rationale:** Correctly instantiates object into context and sets attribute.

### Sample 2: Average
```swift
func insertRecord(entity: NSEntityDescription, name: String, into context: NSManagedObjectContext) -> NSManagedObject {
    let obj = NSManagedObject(entity: entity, insertInto: context)
    obj.setValue(name, forKey: "name")
    // forgets return or returns nil
    return obj
}
```
- **Expected Score:** 100% (Met: instantiate 50%, Met: setValue 50%)
- **Rationale:** Fully working implementation.

### Sample 3: Weak
```swift
func insertRecord(entity: NSEntityDescription, name: String, into context: NSManagedObjectContext) -> NSManagedObject {
    return NSManagedObject()
}
```
- **Expected Score:** 0% (Not Met: instantiate into context 0%, Not Met: setValue 0%)
- **Rationale:** Empty object unassociated with entity, context, or attribute.

---

## Question 30 (Code-Write): Fetching Entity Count

**Prompt:** Write a function fetchCount(for entityName: String, in context: NSManagedObjectContext) throws -> Int that creates an NSFetchRequest and returns context.count(for: request).

### Sample 1: Good
```swift
func fetchCount(for entityName: String, in context: NSManagedObjectContext) throws -> Int {
    let request = NSFetchRequest<NSManagedObject>(entityName: entityName)
    return try context.count(for: request)
}
```
- **Expected Score:** 100% (Met: NSFetchRequest 50%, Met: context.count 50%)
- **Rationale:** Clean, efficient implementation using count(for:).

### Sample 2: Average
```swift
func fetchCount(for entityName: String, in context: NSManagedObjectContext) throws -> Int {
    let request = NSFetchRequest<NSManagedObject>(entityName: entityName)
    let items = try context.fetch(request)
    return items.count
}
```
- **Expected Score:** 75% (Met: NSFetchRequest 50%, Partly Met: fetch vs count(for:) 25%)
- **Rationale:** Fetches full object array instead of performing count on store.

### Sample 3: Weak
```swift
func fetchCount(for entityName: String, in context: NSManagedObjectContext) throws -> Int {
    return 0
}
```
- **Expected Score:** 0% (Not Met: request 0%, Not Met: count 0%)
- **Rationale:** Hardcoded return without Core Data interaction.

---

## Question 31 (Code-Write): Conditional Context Save

**Prompt:** Write a function saveIfChanged(context: NSManagedObjectContext) throws -> Bool that checks context.hasChanges, calls context.save() if true and returns true, or returns false if unchanged.

### Sample 1: Good
```swift
func saveIfChanged(context: NSManagedObjectContext) throws -> Bool {
    if context.hasChanges {
        try context.save()
        return true
    }
    return false
}
```
- **Expected Score:** 100% (Met: hasChanges 40%, Met: save and true 40%, Met: false 20%)
- **Rationale:** Perfectly checks hasChanges, saves, and returns respective booleans.

### Sample 2: Average
```swift
func saveIfChanged(context: NSManagedObjectContext) throws -> Bool {
    guard context.hasChanges else { return false }
    try context.save()
    return true
}
```
- **Expected Score:** 100% (Met: hasChanges 40%, Met: save and true 40%, Met: false 20%)
- **Rationale:** Idiomatic Swift guard implementation.

### Sample 3: Weak
```swift
func saveIfChanged(context: NSManagedObjectContext) throws -> Bool {
    try context.save()
    return true
}
```
- **Expected Score:** 40% (Not Met: hasChanges check 0%, Met: save 40%, Not Met: false 0%)
- **Rationale:** Saves indiscriminately without verifying hasChanges.
