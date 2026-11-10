# Rubric Test: Swift 6 Strict Concurrency

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/swift-6-strict-concurrency/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## s6-q24 (Written: Primary Difference and Guarantee of Swift 6)

### Rubric
- Explains that Swift 5 had optional concurrency warnings while Swift 6 enables complete checking by default (40 pts, key)
- Explains that concurrency warnings become hard compiler errors in Swift 6 (35 pts, key)
- States that compiling without errors in Swift 6 guarantees compile-time freedom from data races (25 pts, key)

### Good Answer
In Swift 5, concurrency checking was optional and surfaced as non-blocking compiler warnings. Swift 6 turns complete strict concurrency checking on by default, upgrading all data race warnings into hard compiler errors. Once an application compiles cleanly under Swift 6, the compiler statically guarantees that the code is free of data races.

**Score: 100/100**
- [x] Swift 5 optional warnings vs Swift 6 complete by default (40/40)
- [x] Warnings become hard compiler errors (35/35)
- [x] Guarantees compile-time data race freedom (25/25)

### Average Answer
Swift 5 only showed warnings for concurrency problems, but Swift 6 turns them into errors that stop the build. Compiling without errors means your code does not have data races.

**Score: 80/100**
- [x] Warnings in Swift 5 vs errors in Swift 6 (35/40)
- [x] Errors stop the build (30/35)
- [x] Mentions freedom from data races (15/25)

### Weak Answer
Swift 6 is faster and removes warnings from Xcode.

**Score: 10/100**
- [ ] Misses optional warnings vs complete default checking (0/40)
- [ ] Misses warnings becoming hard errors (0/35)
- [x] Vaguely references Xcode warnings (10/25)

---

## s6-q25 (Written: Fixing Main Actor-Isolated Call in Non-Isolated Context)

### Rubric
- Describes calling the method asynchronously with await from an async context (40 pts, key)
- Describes annotating the calling function or class with @MainActor (40 pts, key)
- Alternatively mentions MainActor.run or MainActor.assumeIsolated where appropriate (20 pts)

### Good Answer
To fix this error, you can use two main approaches:
1. Call the method with `await` from an asynchronous context. This hops to the main actor safely.
2. Annotate the calling function or its enclosing type with `@MainActor`. This isolates the caller so it executes directly on the main thread.
Additionally, you can use `await MainActor.run { ... }` or `MainActor.assumeIsolated { ... }` if already on the main thread.

**Score: 100/100**
- [x] Calls with await from async context (40/40)
- [x] Annotates caller with @MainActor (40/40)
- [x] Mentions MainActor.run / assumeIsolated (20/20)

### Average Answer
You can fix it by adding `await` before calling the method, or you can put `@MainActor` on the calling function so it runs on the main thread.

**Score: 80/100**
- [x] Adds await (40/40)
- [x] Puts @MainActor on caller (40/40)
- [ ] Omits MainActor.run / assumeIsolated context (0/20)

### Weak Answer
You should wrap the call in a DispatchQueue.main.async block.

**Score: 20/100**
- [ ] Misses await hop mechanism (0/40)
- [ ] Misses @MainActor annotation on caller (0/40)
- [x] Understands that the call belongs on the main thread (20/20)

---

## s6-q26 (Written: Mutable Global Variables Banned and Fixes)

### Rubric
- Explains that mutable global variables allow concurrent unsynchronized reads and writes, creating data races (40 pts, key)
- States converting to an immutable let constant if the value never changes (30 pts, key)
- States isolating the variable to @MainActor or a custom actor (30 pts, key)

### Good Answer
Mutable global variables are banned by default because any concurrent thread can read or write that shared memory without synchronization, producing data races. To fix them:
1. If the value never changes after initialization, change `var` to an immutable `let` constant.
2. If mutation is required, isolate the static variable using `@MainActor` or encapsulate it inside a dedicated actor.

**Score: 100/100**
- [x] Explains concurrent unsynchronized reads/writes causing data races (40/40)
- [x] Change to immutable let constant (30/30)
- [x] Isolate to @MainActor or actor (30/30)

### Average Answer
Global variables can be changed by two threads at the same time and cause data races. You can fix them by making them `let` constants or putting them on `@MainActor`.

**Score: 85/100**
- [x] Mentions simultaneous access and data races (35/40)
- [x] Make them let constants (25/30)
- [x] Put on @MainActor (25/30)

### Weak Answer
Global variables are bad practice in object-oriented programming.

**Score: 10/100**
- [ ] Misses concurrency and data race explanation (0/40)
- [ ] Misses let constant fix (0/30)
- [x] Notes that global variables are discouraged (10/30)

---

## s6-q27 (Written: Purpose of @preconcurrency Attribute)

### Rubric
- Explains that @preconcurrency suppresses or downgrades concurrency diagnostics for unannotated third-party dependencies (40 pts, key)
- Explains that it is used during incremental migration when external libraries have not yet adopted Swift 6 annotations (35 pts, key)
- Mentions that it should be removed once the dependency updates with native Sendable conformances (25 pts)

### Good Answer
`@preconcurrency` suppresses or downgrades strict concurrency errors that stem from unannotated third-party dependencies. It is used during incremental migration when your app is ready for Swift 6, but an imported framework has not yet adopted `Sendable` annotations. Once the dependency releases an update with native Swift 6 annotations, the `@preconcurrency` attribute should be removed.

**Score: 100/100**
- [x] Suppresses/downgrades diagnostics for unannotated dependencies (40/40)
- [x] Used during incremental migration for legacy libraries (35/35)
- [x] Mentions removing it after dependency updates (25/25)

### Average Answer
`@preconcurrency` stops compiler errors from external libraries that do not have Sendable annotations yet. You use it when migrating to Swift 6 so you do not have to wait for library maintainers to update their code.

**Score: 75/100**
- [x] Stops errors from unannotated libraries (35/40)
- [x] Used during Swift 6 migration (30/35)
- [ ] Leaves removal upon update unmentioned (10/25)

### Weak Answer
It speeds up compilation by caching pre-concurrency tokens.

**Score: 0/100**
- [ ] Confuses with precompiled headers/caching (0/40)
- [ ] Misses dependency migration purpose (0/35)
- [ ] Misses Sendable context (0/25)

---

## s6-q28 (Written: nonisolated(unsafe) Mechanics and Risks)

### Rubric
- Explains that nonisolated(unsafe) opts a specific variable or property out of compiler isolation checks (40 pts, key)
- States that it should only be used when thread safety is guaranteed manually with custom locks or queues (35 pts, key)
- Warns that bugs in manual locking will still cause runtime data races because the compiler no longer checks it (25 pts, key)

### Good Answer
`nonisolated(unsafe)` tells the compiler to opt a specific variable or stored property out of concurrency isolation checks. It is intended strictly for scenarios where thread safety is managed manually using primitives like `os_unfair_lock`, `NSLock`, or dedicated serial queues. The risk is that it completely disables compiler verification; if the manual locking implementation has any flaw, data races will still occur silently at runtime.

**Score: 100/100**
- [x] Opts variable out of compiler isolation checks (40/40)
- [x] For manual thread safety like locks or queues (35/35)
- [x] Warns of silent runtime data races if locking fails (25/25)

### Average Answer
`nonisolated(unsafe)` turns off compiler concurrency checks for a variable. You should only use it if you protect the variable yourself with a lock. If you make a mistake in your lock, you will get a runtime data race.

**Score: 85/100**
- [x] Turns off compiler concurrency checks (35/40)
- [x] Use with manual locks (30/35)
- [x] Warns of runtime data race risk (20/25)

### Weak Answer
It marks dangerous code that should only run in debug builds.

**Score: 10/100**
- [ ] Misses opting out of compiler isolation checks (0/40)
- [ ] Misses manual locking prerequisite (0/35)
- [x] Recognizes unsafe connotation (10/25)

---

## s6-q29 (Code-Write: AppLaunchTracker with @MainActor static var)

### Rubric
- Declares AppLaunchTracker with @MainActor static var count (35 pts, key)
- Increments count inside MainActor.run or isolated context (35 pts, key)
- Prints exact output 'Launch: 1' (30 pts, key)

### Good Answer
```swift
enum AppLaunchTracker {
    @MainActor static var count: Int = 0
}

func incrementLaunchCount() async {
    await MainActor.run {
        AppLaunchTracker.count += 1
        print("Launch: \(AppLaunchTracker.count)")
    }
}

await incrementLaunchCount()
```

**Score: 100/100**
- [x] @MainActor static var count on enum AppLaunchTracker (35/35)
- [x] Increments inside MainActor.run (35/35)
- [x] Prints exact output "Launch: 1" (30/30)

### Average Answer
```swift
enum AppLaunchTracker {
    @MainActor static var count = 0
}

@MainActor
func incrementLaunchCount() {
    AppLaunchTracker.count += 1
    print("Launch: \(AppLaunchTracker.count)")
}

await incrementLaunchCount()
```

**Score: 90/100**
- [x] Declares @MainActor static var count (35/35)
- [x] Increments in @MainActor context (35/35)
- [x] Prints output "Launch: 1" (20/30)

### Weak Answer
```swift
var count = 0
func incrementLaunchCount() {
    count += 1
}
```

**Score: 10/100**
- [ ] Missing AppLaunchTracker enum and @MainActor (0/35)
- [ ] Unsynchronized global variable mutation (0/35)
- [x] Increments a count variable (10/30)

---

## s6-q30 (Code-Write: ProfileService @MainActor Class)

### Rubric
- Declares @MainActor final class ProfileService with username and update method (35 pts, key)
- Declares nonisolated func refreshProfile() async and awaits ProfileService calls (35 pts, key)
- Prints exact output 'User: Jordan' (30 pts, key)

### Good Answer
```swift
@MainActor
final class ProfileService {
    var username = "Guest"

    func updateUsername(to newName: String) {
        username = newName
    }
}

nonisolated func refreshProfile() async {
    let service = await ProfileService()
    await service.updateUsername(to: "Jordan")
    let current = await service.username
    print("User: \(current)")
}

await refreshProfile()
```

**Score: 100/100**
- [x] @MainActor final class ProfileService with username and update method (35/35)
- [x] nonisolated async function awaiting service methods (35/35)
- [x] Prints exact output "User: Jordan" (30/30)

### Average Answer
```swift
@MainActor
final class ProfileService {
    var username = "Guest"
    func updateUsername(to newName: String) {
        username = newName
    }
}

func refreshProfile() async {
    let service = ProfileService()
    service.updateUsername(to: "Jordan")
    print("User: \(service.username)")
}
```

**Score: 65/100**
- [x] Declares @MainActor class ProfileService (35/35)
- [ ] Calls methods synchronously without await from unisolated function (15/35)
- [x] Logic targets "User: Jordan" (15/30)

### Weak Answer
```swift
class ProfileService {
    var username = "Guest"
}
```

**Score: 10/100**
- [ ] Missing @MainActor and updateUsername method (0/35)
- [ ] Missing refreshProfile function (0/35)
- [x] Defines class with username (10/30)

---

## s6-q31 (Code-Write: computeSumAsync Function)

### Rubric
- Declares computeSumAsync taking numbers: [Int] returning async Int (35 pts, key)
- Calculates sum inside Task without mutating captured outer variables (35 pts, key)
- Returns awaited task.value and prints 'Sum: 60' (30 pts, key)

### Good Answer
```swift
func computeSumAsync(numbers: [Int]) async -> Int {
    let task = Task {
        numbers.reduce(0, +)
    }
    return await task.value
}

func testSum() async {
    let total = await computeSumAsync(numbers: [10, 20, 30])
    print("Sum: \(total)")
}

await testSum()
```

**Score: 100/100**
- [x] Correct function signature returning async Int (35/35)
- [x] Computes sum inside Task without mutating outer variables (35/35)
- [x] Returns awaited task.value and test prints "Sum: 60" (30/30)

### Average Answer
```swift
func computeSumAsync(numbers: [Int]) async -> Int {
    var sum = 0
    let task = Task {
        for n in numbers { sum += n }
    }
    await task.value
    return sum
}
```

**Score: 40/100**
- [x] Function signature matches requirements (30/35)
- [ ] Fails Swift 6: mutates captured local variable 'sum' in concurrent closure (0/35)
- [x] Attempts to return sum (10/30)

### Weak Answer
```swift
func computeSumAsync(numbers: [Int]) -> Int {
    return numbers.reduce(0, +)
}
```

**Score: 10/100**
- [ ] Synchronous instead of async, no Task used (0/35)
- [ ] Does not demonstrate concurrency safe Task execution (0/35)
- [x] Calculates array sum (10/30)
