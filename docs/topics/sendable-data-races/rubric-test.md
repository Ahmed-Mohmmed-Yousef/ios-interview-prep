# Rubric Test: Sendable and Data Races

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/sendable-data-races/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sdr-q24 (Written: Data Race Definition and Problems)

### Rubric
- Explains that multiple concurrent tasks access the same memory simultaneously with at least one write without synchronization (35 pts, key)
- Describes consequences including silent memory corruption, inconsistent state, crashes, and unpredictable behavior (35 pts, key)
- Notes that data races are hard to reproduce because they depend on thread scheduling and timing (30 pts)

### Good Answer
A data race happens when two or more concurrent execution contexts access the same memory location simultaneously, at least one access is a write, and there is no synchronization. This causes silent memory corruption, inconsistent app state, undefined behavior, and hard-to-trace crashes. Data races are notoriously difficult to reproduce because they depend on exact thread scheduling and hardware timing.

**Score: 100/100**
- [x] Explains simultaneous access with at least one write without synchronization (35/35)
- [x] Describes memory corruption, inconsistent state, crashes (35/35)
- [x] Explains hard reproduction due to thread timing (30/30)

### Average Answer
A data race occurs when two threads try to read and write to the same variable at the exact same time without locks. It can cause random crashes or corrupted variables that are very tricky to debug.

**Score: 75/100**
- [x] Explains simultaneous read/write without locks (30/35)
- [x] Describes crashes and corrupted variables (25/35)
- [x] Mentions tricky debugging due to timing (20/30)

### Weak Answer
A data race is when two things run at the same time and the network is slow.

**Score: 10/100**
- [ ] Misses simultaneous unsynchronized write access (0/35)
- [ ] Misses memory corruption and crash hazards (0/35)
- [x] Vaguely references concurrent execution (10/30)

---

## sdr-q25 (Written: Sendable Protocol and Marker Protocol)

### Rubric
- Defines Sendable as a protocol signaling that values can safely cross concurrency boundaries without data races (40 pts, key)
- Explains that it is a marker protocol because it has no runtime requirements, methods, or properties (35 pts, key)
- Mentions that Sendable checks are performed by the Swift compiler at compile time (25 pts)

### Good Answer
Sendable is a Swift protocol indicating that values of a type can safely cross concurrency boundaries, such as between tasks or actors, without causing data races. It is called a marker protocol because it defines no required properties, methods, or runtime witness tables. Instead, it serves as a compile-time directive to the Swift compiler to verify thread safety statically.

**Score: 100/100**
- [x] Defines Sendable for safe transfer across boundaries (40/40)
- [x] Explains marker protocol with no runtime requirements or witness tables (35/35)
- [x] Mentions compile-time verification by Swift compiler (25/25)

### Average Answer
Sendable tells Swift that a value can be passed between background tasks safely. It is a marker protocol because you do not have to write any methods or properties to conform to it.

**Score: 75/100**
- [x] Defines Sendable for passing between tasks (35/40)
- [x] Explains marker protocol has no methods (30/35)
- [ ] Leaves compile-time checking implicit (10/25)

### Weak Answer
Sendable is a protocol that sends data over a URLSession request.

**Score: 0/100**
- [ ] Confuses Sendable with network serialization (0/40)
- [ ] Misses marker protocol definition (0/35)
- [ ] Misses compile-time safety (0/25)

---

## sdr-q26 (Written: Strict Requirements for Sendable Classes)

### Rubric
- States that the class must be marked with the final keyword (35 pts, key)
- States that all stored properties must be immutable let constants (35 pts, key)
- States that all stored properties must themselves conform to Sendable (30 pts, key)

### Good Answer
To conform to Sendable without @unchecked, a class must meet three strict requirements:
1. It must be declared `final`, preventing subclasses from adding mutable state.
2. All stored properties must be immutable `let` constants, ensuring state never changes after initialization.
3. Every stored property must itself conform to `Sendable`.

**Score: 100/100**
- [x] Class must be final (35/35)
- [x] All stored properties must be let constants (35/35)
- [x] Stored properties must conform to Sendable (30/30)

### Average Answer
A class can be Sendable if it is final and all its properties are `let` constants instead of `var`.

**Score: 70/100**
- [x] Class must be final (35/35)
- [x] Properties must be let constants (35/35)
- [ ] Misses that stored properties must themselves be Sendable (0/30)

### Weak Answer
The class has to inherit from NSObject and declare private properties.

**Score: 10/100**
- [ ] Misses final keyword requirement (0/35)
- [ ] Misses immutable let constants requirement (0/35)
- [x] References class structure vaguely (10/30)

---

## sdr-q27 (Written: Purpose and Rules of @Sendable Closures)

### Rubric
- Explains that @Sendable marks closures that can safely cross concurrency boundaries to execute in other tasks (40 pts, key)
- Identifies that the closure cannot capture mutable local variables by reference (35 pts, key)
- States that all values captured by the closure must conform to Sendable (25 pts)

### Good Answer
The `@Sendable` attribute marks closure types that are safe to pass across concurrency boundaries and execute concurrently in background tasks. To guarantee freedom from data races, the compiler enforces two rules: the closure cannot capture mutable local variables (`var`) by reference, and all captured values must conform to `Sendable`.

**Score: 100/100**
- [x] Explains safe transfer across concurrency boundaries (40/40)
- [x] Forbids capturing mutable local variables (35/35)
- [x] Requires captured values to be Sendable (25/25)

### Average Answer
`@Sendable` is used on closures that run in another task. It prevents you from capturing mutable variables from outside so you do not get a race condition.

**Score: 75/100**
- [x] Explains closures running in another task (35/40)
- [x] Mentions cannot capture mutable variables (30/35)
- [ ] Omits requirement that captured values must be Sendable (10/25)

### Weak Answer
`@Sendable` is a closure that runs on the main thread automatically.

**Score: 0/100**
- [ ] Confuses with @MainActor (0/40)
- [ ] Misses capture semantics (0/35)
- [ ] Misses Sendable captured types (0/25)

---

## sdr-q28 (Written: Risks and Uses of @unchecked Sendable)

### Rubric
- States that @unchecked Sendable is appropriate when a type manages thread safety manually using locks or dispatch queues (40 pts, key)
- Explains that it disables compiler verification, creating risk of runtime data races if synchronization contains bugs (35 pts, key)
- Emphasizes that it should not be used as a shortcut to silence compiler warnings (25 pts)

### Good Answer
`@unchecked Sendable` is appropriate when a reference type provides manual thread safety—such as using `os_unfair_lock`, `NSLock`, or a serial dispatch queue—that the Swift compiler cannot verify statically. It introduces substantial risk because it completely turns off compiler diagnostics for that type. If the manual synchronization has any flaw or omission, data races will still occur at runtime. It should never be used as a quick shortcut to silence warnings.

**Score: 100/100**
- [x] Appropriate for manual locking or serial queues (40/40)
- [x] Explains disabling compiler checks and risk of runtime races (35/35)
- [x] Emphasizes avoiding it as a shortcut (25/25)

### Average Answer
You use `@unchecked Sendable` when you protect a class with your own locks like `NSLock`. The risk is that Swift will not check your code anymore, so if your lock logic is buggy you can still get data races.

**Score: 75/100**
- [x] Mentions manual locks like NSLock (35/40)
- [x] Explains compiler no longer checks, risk of data races (30/35)
- [ ] Omits explicit warning against using it to silence compiler errors (10/25)

### Weak Answer
It makes any class Sendable so you do not see compiler errors in Swift 6.

**Score: 10/100**
- [ ] Misses manual synchronization prerequisite (0/40)
- [ ] Misses safety risk explanation (0/35)
- [x] Notes that it silences compiler errors (10/25)

---

## sdr-q29 (Code-Write: ScoreCard Sendable Struct)

### Rubric
- Declares ScoreCard as a struct conforming to Sendable with properties player and points (35 pts, key)
- Uses let constants for immutable Sendable properties (35 pts, key)
- Implements formatted() method returning the exact expected string (30 pts, key)

### Good Answer
```swift
struct ScoreCard: Sendable {
    let player: String
    let points: Int

    func formatted() -> String {
        "\(player): \(points) pts"
    }
}

func printScore() async {
    let card = ScoreCard(player: "Alex", points: 150)
    let task = Task {
        card.formatted()
    }
    let res = await task.value
    print(res)
}

await printScore()
```

**Score: 100/100**
- [x] Struct conforming to Sendable with player and points (35/35)
- [x] Uses immutable let constants (35/35)
- [x] formatted() method produces exact output "Alex: 150 pts" (30/30)

### Average Answer
```swift
struct ScoreCard: Sendable {
    var player: String
    var points: Int

    func formatted() -> String {
        "\(player): \(points) pts"
    }
}
```

**Score: 70/100**
- [x] Struct conforming to Sendable with player and points (35/35)
- [ ] Uses var instead of let constants (15/35)
- [x] Implements formatted() correctly (20/30)

### Weak Answer
```swift
class ScoreCard {
    var score = 150
}
```

**Score: 10/100**
- [ ] Uses non-Sendable class instead of struct (0/35)
- [ ] Lacks required properties (0/35)
- [x] Contains numeric score field (10/30)

---

## sdr-q30 (Code-Write: ImmutableSession Sendable Class)

### Rubric
- Uses final class and declares Sendable conformance (35 pts, key)
- Declares stored properties token and userId as let constants (35 pts, key)
- Provides complete initializer and prints from detached task (30 pts)

### Good Answer
```swift
final class ImmutableSession: Sendable {
    let token: String
    let userId: Int

    init(token: String, userId: Int) {
        self.token = token
        self.userId = userId
    }
}

func printSession() async {
    let session = ImmutableSession(token: "xyz789", userId: 101)
    let task = Task.detached {
        "User \(session.userId) with token \(session.token)"
    }
    let res = await task.value
    print(res)
}

await printSession()
```

**Score: 100/100**
- [x] final class with Sendable conformance (35/35)
- [x] let stored properties token and userId (35/35)
- [x] Complete init and detached task prints "User 101 with token xyz789" (30/30)

### Average Answer
```swift
final class ImmutableSession: Sendable {
    let token: String
    let userId: Int

    init(token: String, userId: Int) {
        self.token = token
        self.userId = userId
    }
}
```

**Score: 70/100**
- [x] final class with Sendable conformance (35/35)
- [x] let stored properties (35/35)
- [ ] Did not include async detached task execution runner (0/30)

### Weak Answer
```swift
class ImmutableSession {
    var token = ""
    var userId = 0
}
```

**Score: 10/100**
- [ ] Missing final and Sendable conformance (0/35)
- [ ] Mutable var properties instead of let constants (0/35)
- [x] Defines token and userId properties (10/30)

---

## sdr-q31 (Code-Write: runSendableWork Function)

### Rubric
- Declares function taking action: @escaping @Sendable () -> String returning async String (35 pts, key)
- Spawns a Task executing action() (35 pts, key)
- Awaits task.value and returns the string result (30 pts)

### Good Answer
```swift
func runSendableWork(action: @escaping @Sendable () -> String) async -> String {
    let task = Task {
        action()
    }
    return await task.value
}

func testWork() async {
    let result = await runSendableWork {
        "Worker completed successfully"
    }
    print(result)
}

await testWork()
```

**Score: 100/100**
- [x] Correct signature with @escaping @Sendable () -> String returning async String (35/35)
- [x] Spawns Task running action() (35/35)
- [x] Awaits task.value and returns string (30/30)

### Average Answer
```swift
func runSendableWork(action: @Sendable () -> String) async -> String {
    let task = Task {
        action()
    }
    return await task.value
}
```

**Score: 65/100**
- [ ] Missing @escaping attribute required when spawning Task (15/35)
- [x] Spawns Task running action (25/35)
- [x] Returns awaited task.value (25/30)

### Weak Answer
```swift
func runSendableWork(action: () -> Void) {
    action()
}
```

**Score: 10/100**
- [ ] Missing @escaping @Sendable and return type (0/35)
- [ ] No Task spawned (0/35)
- [x] Accepts a closure parameter (10/30)
