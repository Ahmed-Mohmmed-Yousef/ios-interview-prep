# Rubric Test: Actors and @MainActor

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/actors-and-main-actor/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## ama-q24 (Written: Actor Mutual Exclusion)

### Rubric
- Explains that actors enforce mutual exclusion allowing only one task access at a time (40 pts, key)
- Explains that external callers must use await because the calling task may need to suspend (35 pts, key)
- Mentions that internal access to state inside actor methods is synchronous (25 pts)

### Good Answer
Swift actors protect mutable state by enforcing mutual exclusion so only one task can execute on an instance at any moment. External callers must write await because their task might need to suspend while waiting for another task to finish with the actor. Inside the actor's own methods, state access is direct and synchronous.

**Score: 100/100**
- [x] Explains mutual exclusion: one task at a time (40/40)
- [x] Explains await for external caller suspension (35/35)
- [x] Mentions internal access is synchronous (25/25)

### Average Answer
Actors make sure only one task can change their variables at a time to prevent data races. You have to write await when calling an actor from outside because another task might be using it.

**Score: 75/100**
- [x] Explains one task at a time (35/40)
- [x] Explains await for waiting on busy actor (30/35)
- [ ] Misses internal synchronous access explanation (10/25)

### Weak Answer
Actors are thread-safe classes that prevent all crashes.

**Score: 10/100**
- [ ] Misses mutual exclusion mechanics (0/40)
- [ ] Misses await requirement (0/35)
- [x] Vaguely implies thread safety (10/25)

---

## ama-q25 (Written: Actor Reentrancy)

### Rubric
- Explains that an actor releases its lock when a method suspends at an await point (40 pts, key)
- Explains that other tasks can execute and mutate actor state while the first task is suspended (35 pts, key)
- Describes bugs where assumed state before await is invalidated upon resumption (25 pts)

### Good Answer
Actor reentrancy means an actor releases its execution lock whenever an internal method reaches an await suspension point. While suspended, other tasks can execute on that actor and mutate its properties. A bug occurs if a method assumes state remains unchanged across the await, such as duplicate item purchases when balances drop during suspension.

**Score: 100/100**
- [x] Explains lock release at await point (40/40)
- [x] Explains other tasks can mutate state during suspension (35/35)
- [x] Describes state assumption invalidation bugs (25/25)

### Average Answer
Actor reentrancy happens when an actor method awaits something and lets other tasks run on the actor. The state can change while the method is waiting, causing bugs if you do not check again.

**Score: 80/100**
- [x] Explains allowing other tasks to run at await (35/40)
- [x] Explains state changes during wait (30/35)
- [ ] Mentions re-checking state without concrete bug scenario (15/25)

### Weak Answer
Reentrancy means you can call the actor from multiple threads without await.

**Score: 0/100**
- [ ] Incorrect: claims calls without await (0/40)
- [ ] Misses suspension lock release (0/35)
- [ ] Misses race condition bugs (0/25)

---

## ama-q26 (Written: nonisolated Keyword)

### Rubric
- Explains that nonisolated allows members to be called synchronously from outside without await (40 pts, key)
- Explains that nonisolated members can only access immutable let constants or other nonisolated APIs (35 pts, key)
- Mentions protocol conformances like CustomStringConvertible or Hashable as common use cases (25 pts)

### Good Answer
The nonisolated keyword allows an actor member to be called synchronously from the outside without writing await. Because it runs outside actor isolation, a nonisolated method can only read immutable let constants or call other nonisolated code. This is commonly used to conform actors to synchronous protocols like CustomStringConvertible or Hashable.

**Score: 100/100**
- [x] Explains synchronous access without await (40/40)
- [x] Explains restricted to immutable let constants (35/35)
- [x] Mentions synchronous protocol conformances (25/25)

### Average Answer
nonisolated lets you read an actor property without using await. It can only read let constants because reading mutable vars would cause data races. It is useful for conforming to Hashable.

**Score: 85/100**
- [x] Explains reading without await (35/40)
- [x] Explains reading let constants (30/35)
- [x] Mentions Hashable conformance (20/25)

### Weak Answer
nonisolated turns off Swift 6 strict concurrency checks.

**Score: 0/100**
- [ ] Incorrect understanding of nonisolated (0/40)
- [ ] Misses immutable property restriction (0/35)
- [ ] Misses synchronous protocol role (0/25)

---

## ama-q27 (Written: @MainActor Purpose)

### Rubric
- Explains that @MainActor is a global actor binding code execution to the main thread (40 pts, key)
- Explains that UI frameworks require state updates on the main thread to prevent crashes (35 pts, key)
- Mentions avoiding manual DispatchQueue.main.async dispatch boilerplate (25 pts)

### Good Answer
@MainActor is a global actor that ensures all isolated properties and functions execute on the main thread. Annotating view models with @MainActor guarantees that published UI state mutations always occur on the main thread without manual dispatch calls. This prevents background thread UI violation crashes and rendering glitches.

**Score: 100/100**
- [x] Explains global actor bound to main thread (40/40)
- [x] Explains UI framework requirement preventing crashes (35/35)
- [x] Mentions avoiding manual dispatch boilerplate (25/25)

### Average Answer
@MainActor forces functions to run on the main thread. You put it on view models so when you update UI state, you do not have to write DispatchQueue.main.async manually.

**Score: 85/100**
- [x] Explains running on main thread (35/40)
- [x] Explains updating UI state (25/35)
- [x] Mentions eliminating DispatchQueue.main.async (25/25)

### Weak Answer
@MainActor makes your app run faster by giving it more CPU power.

**Score: 0/100**
- [ ] Misses main thread binding concept (0/40)
- [ ] Misses UI thread safety purpose (0/35)
- [ ] Misses dispatch boilerplate benefit (0/25)

---

## ama-q28 (Written: Image Caching Reentrancy)

### Rubric
- Explains storing in-flight Task handles inside a cache dictionary before awaiting the network (40 pts, key)
- Explains that subsequent callers await the existing in-flight task rather than starting a duplicate (35 pts, key)
- Mentions replacing the task with the completed image result upon download completion (25 pts)

### Good Answer
To prevent duplicate network downloads during actor reentrancy, an image cache actor can store in-flight Task handles in a dictionary. When a request arrives, the actor checks if a task is already running for that URL. Subsequent requests await the existing task value rather than spawning a duplicate network request.

**Score: 100/100**
- [x] Explains storing in-flight Task handles in dictionary (40/40)
- [x] Explains subsequent callers await existing task (35/35)
- [x] Mentions deduplicating duplicate network requests (25/25)

### Average Answer
You can avoid duplicate image downloads in an actor by caching the in-flight Task in a dictionary. If another caller requests the same image while the first one is downloading, it awaits the running task instead of downloading again.

**Score: 85/100**
- [x] Explains caching in-flight Task in dictionary (40/40)
- [x] Explains awaiting running task (30/35)
- [x] Mentions preventing duplicate downloads (15/25)

### Weak Answer
Use NSCache because it handles threading automatically.

**Score: 10/100**
- [ ] Misses in-flight task dictionary pattern (0/40)
- [ ] Misses reentrancy deduplication (0/35)
- [x] Mentions caching concept generally (10/25)

---

## ama-q29 (Code-Write: BankAccount Actor)

### Rubric
- Declares actor BankAccount with private(set) var balance property (35 pts, key)
- Implements initializer and deposit method mutating balance (35 pts, key)
- Awaits deposit and balance, printing exact output Balance: 150 (30 pts)

### Good Answer
```swift
actor BankAccount {
    private(set) var balance: Int
    init(initialBalance: Int) {
        self.balance = initialBalance
    }
    func deposit(amount: Int) {
        balance += amount
    }
}

let account = BankAccount(initialBalance: 100)
await account.deposit(amount: 50)
print("Balance: \(await account.balance)")
```

**Score: 100/100**
- [x] Declares actor with private(set) var balance (35/35)
- [x] Implements init and deposit (35/35)
- [x] Awaits deposit/balance and prints Balance: 150 (30/30)

### Average Answer
```swift
actor BankAccount {
    var balance: Int
    init(initialBalance: Int) { self.balance = initialBalance }
    func deposit(amount: Int) { balance += amount }
}
let acc = BankAccount(initialBalance: 100)
await acc.deposit(amount: 50)
let bal = await acc.balance
print("Balance: \(bal)")
```

**Score: 90/100**
- [x] Declares actor with balance (30/35 - balance not private(set))
- [x] Implements init and deposit (35/35)
- [x] Awaits and prints Balance: 150 (25/30)

### Weak Answer
```swift
class BankAccount {
    var balance = 150
}
print("Balance: \(BankAccount().balance)")
```

**Score: 15/100**
- [ ] Uses class instead of actor (0/35)
- [ ] Missing deposit method and concurrency (0/35)
- [x] Outputs requested format manually (15/30)

---

## ama-q30 (Code-Write: ItemStore Nonisolated Property)

### Rubric
- Declares actor ItemStore with immutable storeName and mutable count (35 pts, key)
- Implements nonisolated var name returning storeName (35 pts, key)
- Synchronously reads store.name without await and prints Store: Books (30 pts)

### Good Answer
```swift
actor ItemStore {
    let storeName: String
    var count: Int
    init(storeName: String, count: Int) {
        self.storeName = storeName
        self.count = count
    }
    nonisolated var name: String {
        storeName
    }
}

let store = ItemStore(storeName: "Books", count: 10)
print("Store: \(store.name)")
```

**Score: 100/100**
- [x] Declares actor with storeName and count (35/35)
- [x] Implements nonisolated var name (35/35)
- [x] Reads store.name synchronously and prints Store: Books (30/30)

### Average Answer
```swift
actor ItemStore {
    let storeName: String
    var count: Int
    init(storeName: String, count: Int) {
        self.storeName = storeName
        self.count = count
    }
    nonisolated var name: String {
        return self.storeName
    }
}
let store = ItemStore(storeName: "Books", count: 10)
print("Store: \(store.name)")
```

**Score: 100/100**
- [x] Declares actor properties (35/35)
- [x] Implements nonisolated property (35/35)
- [x] Prints Store: Books synchronously (30/30)

### Weak Answer
```swift
actor ItemStore {
    var storeName = "Books"
}
```

**Score: 10/100**
- [ ] Missing let storeName and count properties (10/35)
- [ ] Missing nonisolated property (0/35)
- [ ] Missing test execution and output (0/30)

---

## ama-q31 (Code-Write: UserSettings with @MainActor)

### Rubric
- Declares @MainActor class UserSettings with theme property (30 pts, key)
- Implements toggleTheme switching between Light and Dark (35 pts, key)
- Awaits toggleTheme and theme from nonisolated function, printing Theme: Dark (35 pts)

### Good Answer
```swift
@MainActor
final class UserSettings {
    var theme = "Light"
    func toggleTheme() {
        theme = (theme == "Light") ? "Dark" : "Light"
    }
}

nonisolated func run() async {
    let settings = UserSettings()
    await settings.toggleTheme()
    print("Theme: \(await settings.theme)")
}

await run()
```

**Score: 100/100**
- [x] Declares @MainActor class UserSettings (30/30)
- [x] Implements toggleTheme between Light and Dark (35/35)
- [x] Awaits toggleTheme and theme, printing Theme: Dark (35/35)

### Average Answer
```swift
@MainActor
class UserSettings {
    var theme: String = "Light"
    func toggleTheme() {
        if theme == "Light" { theme = "Dark" } else { theme = "Light" }
    }
}
nonisolated func run() async {
    let s = UserSettings()
    await s.toggleTheme()
    let t = await s.theme
    print("Theme: \(t)")
}
await run()
```

**Score: 95/100**
- [x] @MainActor class with theme (30/30)
- [x] toggleTheme implementation (35/35)
- [x] Awaits and prints Theme: Dark (30/35)

### Weak Answer
```swift
class UserSettings {
    var theme = "Dark"
}
print("Theme: \(UserSettings().theme)")
```

**Score: 15/100**
- [ ] Missing @MainActor annotation (0/30)
- [ ] Missing toggleTheme method (0/35)
- [x] Outputs format manually (15/35)
