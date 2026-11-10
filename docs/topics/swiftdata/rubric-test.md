# Rubric Test: SwiftData

**Topic:** `swiftdata`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): ModelContainer vs ModelContext

**Prompt:** Explain the difference between ModelContainer and ModelContext in SwiftData. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "ModelContainer manages the physical storage on disk and coordinates the database schema and migrations. ModelContext acts as an in-memory scratchpad where you insert, update, or delete objects before saving them. You can have multiple contexts backed by a single container."
- **Expected Score:** 100% (Met: storage management 50%, Met: in-memory scratchpad 50%)
- **Rationale:** Accurately distinguishes physical storage management from transactional in-memory operations.

### Sample 2: Average
- **Answer:** "ModelContainer is the database where records are kept. ModelContext is where you do work in memory like creating objects."
- **Expected Score:** 75% (Partly Met: storage 25%, Met: in-memory scratchpad 50%)
- **Rationale:** Identifies both concepts but provides brief explanations lacking schema and migration details.

### Sample 3: Weak
- **Answer:** "They are both classes in SwiftData that you use in SwiftUI views to show lists."
- **Expected Score:** 0% (Not Met: storage 0%, Not Met: context 0%)
- **Rationale:** Misses the primary distinction between storage management and change tracking.

---

## Question 25 (Written): Operation of @Query in SwiftUI

**Prompt:** Explain how the @Query property wrapper operates in SwiftUI views. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "The @Query property wrapper fetches persistent models directly from the ambient ModelContext in the SwiftUI environment. It monitors the database for insertions, updates, and deletions. Whenever underlying data changes, @Query automatically triggers a view update to keep the user interface synchronized."
- **Expected Score:** 100% (Met: environment fetching 50%, Met: observation and updates 50%)
- **Rationale:** Thoroughly explains both environment fetching and reactive UI updates.

### Sample 2: Average
- **Answer:** "@Query loads models into a SwiftUI view so you can show them in a list. When you add a new item to SwiftData, the list updates automatically."
- **Expected Score:** 75% (Partly Met: environment context 25%, Met: auto updates 50%)
- **Rationale:** Recognizes view updates and loading, but omits mention of the ambient environment ModelContext.

### Sample 3: Weak
- **Answer:** "@Query is like @State for normal Swift variables."
- **Expected Score:** 25% (Not Met: context fetching 0%, Partly Met: updates 25%)
- **Rationale:** Conflates database querying with local view state.

---

## Question 26 (Written): Concurrency and @Model Non-Sendability

**Prompt:** Why can you not pass a @Model instance directly into a background Task or actor, and what should you pass instead? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "SwiftData models are non-Sendable reference types that belong to a single ModelContext. Passing them across concurrency boundaries leads to data races and compiler errors under Swift 6. Instead, pass the model's Sendable PersistentIdentifier to the background actor, and fetch a fresh instance inside the actor's own context."
- **Expected Score:** 100% (Met: non-Sendable context binding 50%, Met: pass PersistentIdentifier 50%)
- **Rationale:** Clearly identifies non-Sendable context confinement and the PersistentIdentifier solution.

### Sample 2: Average
- **Answer:** "Models cannot be sent across tasks because they are not Sendable classes and cause data races. You should pass an ID string or identifier instead to load it again."
- **Expected Score:** 75% (Met: non-Sendable 50%, Partly Met: identifier re-fetch 25%)
- **Rationale:** Identifies non-Sendable nature, but mentions generic ID rather than PersistentIdentifier.

### Sample 3: Weak
- **Answer:** "Background tasks do not support classes because classes use too much memory."
- **Expected Score:** 0% (Not Met: context safety 0%, Not Met: identifier 0%)
- **Rationale:** Completely incorrect rationale regarding memory rather than concurrency safety.

---

## Question 27 (Written): Relationships and Cascade Deletes

**Prompt:** How does SwiftData handle relationships between models and how do cascade delete rules work? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "SwiftData models establish relationships by holding properties that reference other @Model entities or arrays of models. When you configure a relationship with the cascade delete rule, deleting the parent model automatically deletes all connected child models. This prevents orphan records from persisting in the database."
- **Expected Score:** 100% (Met: relationship modeling 50%, Met: cascade deletion 50%)
- **Rationale:** Accurately explains relationship modeling and automatic removal of child entities.

### Sample 2: Average
- **Answer:** "You link models by making a property of another model type. Cascade delete means when you delete one object, its related children also get deleted."
- **Expected Score:** 75% (Partly Met: relationship modeling 25%, Met: cascade delete 50%)
- **Rationale:** Captures core mechanism with brief phrasing.

### Sample 3: Weak
- **Answer:** "Relationships connect views in SwiftUI navigation hierarchies."
- **Expected Score:** 0% (Not Met: relationship 0%, Not Met: cascade 0%)
- **Rationale:** Confuses database relationships with UI navigation.

---

## Question 28 (Written): In-Memory ModelContainer for Testing

**Prompt:** Describe how to set up an in-memory ModelContainer and explain why it is valuable for testing and previews. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "To configure an in-memory container, initialize a ModelConfiguration with isStoredInMemoryOnly set to true, then pass it to ModelContainer(for:configurations:). This setup prevents SwiftData from creating physical SQLite files on disk during execution. It allows unit tests and SwiftUI previews to run quickly in isolated environments without polluting disk state."
- **Expected Score:** 100% (Met: configuration 50%, Met: test isolation 50%)
- **Rationale:** Fully explains configuration syntax and test isolation benefits.

### Sample 2: Average
- **Answer:** "You turn on memory only in ModelConfiguration so it does not save to SQLite disk. This helps tests start fresh every time."
- **Expected Score:** 75% (Partly Met: configuration syntax 25%, Met: test isolation 50%)
- **Rationale:** Understands the goal and setting, omitting exact API details.

### Sample 3: Weak
- **Answer:** "Memory storage is used when the iPhone has no storage space left."
- **Expected Score:** 0% (Not Met: configuration 0%, Not Met: test isolation 0%)
- **Rationale:** Misunderstands development feature as an end-user device constraint.

---

## Question 29 (Code-Write): Declaring a UserAccount Model

**Prompt:** Create a persistent model class UserAccount using @Model with UUID property id and String property email, including an initializer.

### Sample 1: Good
```swift
import Foundation
import SwiftData

@Model
final class UserAccount {
    var id: UUID
    var email: String

    init(id: UUID = UUID(), email: String) {
        self.id = id
        self.email = email
    }
}
```
- **Expected Score:** 100% (Met: @Model class 40%, Met: properties 30%, Met: init 30%)
- **Rationale:** Flawless SwiftData model definition with initializer.

### Sample 2: Average
```swift
import Foundation
import SwiftData

@Model
class UserAccount {
    var id: UUID
    var email: String
    init(id: UUID, email: String) {
        self.id = id
        self.email = email
    }
}
```
- **Expected Score:** 100% (Met: @Model class 40%, Met: properties 30%, Met: init 30%)
- **Rationale:** Valid implementation conforming to all requirements.

### Sample 3: Weak
```swift
struct UserAccount {
    var id: UUID
    var email: String
}
```
- **Expected Score:** 30% (Not Met: @Model class 0%, Met: properties 30%, Not Met: init 0%)
- **Rationale:** Declared as struct without @Model macro.

---

## Question 30 (Code-Write): Inserting Tasks into ModelContext

**Prompt:** Write a function insertTask(title: String, into context: ModelContext) that instantiates a TaskRecord and inserts it into the context.

### Sample 1: Good
```swift
func insertTask(title: String, into context: ModelContext) {
    let task = TaskRecord(title: title)
    context.insert(task)
}
```
- **Expected Score:** 100% (Met: instantiate TaskRecord 50%, Met: context.insert 50%)
- **Rationale:** Correctly instantiates model and inserts it into the provided context.

### Sample 2: Average
```swift
func insertTask(title: String, into context: ModelContext) {
    context.insert(TaskRecord(title: title))
}
```
- **Expected Score:** 100% (Met: instantiate TaskRecord 50%, Met: context.insert 50%)
- **Rationale:** Concise one-liner meeting all requirements.

### Sample 3: Weak
```swift
func insertTask(title: String, into context: ModelContext) {
    let task = TaskRecord(title: title)
    // missing insert
}
```
- **Expected Score:** 50% (Met: instantiate 50%, Not Met: insert 0%)
- **Rationale:** Instantiates instance but fails to insert it into context.

---

## Question 31 (Code-Write): Fetch Completed Count with Predicate

**Prompt:** Write a function fetchCompletedCount(in context: ModelContext) throws -> Int that returns the count of JobItem models where isFinished is true using a Predicate.

### Sample 1: Good
```swift
func fetchCompletedCount(in context: ModelContext) throws -> Int {
    let predicate = #Predicate<JobItem> { $0.isFinished == true }
    let descriptor = FetchDescriptor<JobItem>(predicate: predicate)
    return try context.fetchCount(descriptor)
}
```
- **Expected Score:** 100% (Met: predicate 50%, Met: fetchCount descriptor 50%)
- **Rationale:** Correctly creates #Predicate and calls fetchCount on descriptor.

### Sample 2: Average
```swift
func fetchCompletedCount(in context: ModelContext) throws -> Int {
    let descriptor = FetchDescriptor<JobItem>(predicate: #Predicate { $0.isFinished })
    return try context.fetch(descriptor).count
}
```
- **Expected Score:** 75% (Met: predicate 50%, Partly Met: fetchCount vs fetch().count 25%)
- **Rationale:** Fetches all models into memory to count them rather than using fetchCount.

### Sample 3: Weak
```swift
func fetchCompletedCount(in context: ModelContext) throws -> Int {
    return 0
}
```
- **Expected Score:** 0% (Not Met: predicate 0%, Not Met: fetch 0%)
- **Rationale:** Hardcodes return without querying context or predicate.
