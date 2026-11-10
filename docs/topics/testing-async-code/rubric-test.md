# Rubric Tests: Testing Async Code

## Question 24 (written): Legacy vs Swift Concurrency in Async Unit Testing

Prompt: How has Swift Concurrency improved the process of writing asynchronous unit tests compared to legacy completion handlers? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Swift Concurrency allows test functions to be marked with `async throws`. Tests can await asynchronous operations directly and assert results on the following lines. In contrast, older XCTest code required setting up manual expectations, fulfilling them inside escaping completion handlers, and waiting for timeouts. This change makes async tests linear, easier to read, and less prone to timeout bugs.
- Criterion 1 (async throws and linear await): 50/50 (Met)
- Criterion 2 (contrast with manual expectations and callbacks): 50/50 (Met)

### Average Answer (Score: 50/100)
> Modern Swift allows you to use `await` inside your test methods instead of writing closures. This makes the test code much shorter and cleaner.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Missing explicit contrast with XCTest expectations and timeouts)

### Weak Answer (Score: 0/100)
> Async tests run much faster than regular unit tests. You do not need to write tests anymore because Swift handles concurrency automatically.
- Criterion 1: 0/50 (Inaccurate)
- Criterion 2: 0/50 (Inaccurate)

---

## Question 25 (written): Testing Actors and Swift 6 Safety

Prompt: How do you test an actor-isolated class in Swift, and how does Swift 6 enforce safety during testing? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> When testing an actor, calling its methods or reading isolated properties from a test runner requires the `await` keyword. Swift 6 enforces actor isolation boundaries at compile time to ensure data races cannot happen during test execution. If test code attempts to access mutable actor state synchronously, the compiler flags a build error.
- Criterion 1 (access requires await): 50/50 (Met)
- Criterion 2 (Swift 6 enforces compile-time isolation and race safety): 50/50 (Met)

### Average Answer (Score: 50/100)
> You have to call actor methods with await because actors run on their own isolation context.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Omits Swift 6 compile-time data race safety enforcement)

### Weak Answer (Score: 0/100)
> Actors cannot be tested because their internal state is private and protected from unit tests.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 26 (written): Dangers of Unawaited Detached Tasks in Tests

Prompt: Why is launching an unawaited detached Task inside a unit test considered dangerous? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> An unawaited detached Task runs independently in the background. Because the test method does not await its completion, the test runner finishes and records a pass before the task finishes executing. If the detached task subsequently fails an assertion or throws a crash, it produces intermittent test failures or false passes.
- Criterion 1 (test method finishes before detached task completes): 50/50 (Met)
- Criterion 2 (causes false passes and flaky crashes after completion): 50/50 (Met)

### Average Answer (Score: 50/100)
> Detached tasks are dangerous in unit tests because the test will end before the task has completed its work.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Does not explain false passes or crashes)

### Weak Answer (Score: 0/100)
> Detached tasks use too much memory on the simulator, which slows down the local build.
- Criterion 1: 0/50 (Missing key mechanism)
- Criterion 2: 0/50 (Irrelevant)

---

## Question 27 (written): Testing Task Cancellation

Prompt: How do you test that an asynchronous function properly responds to task cancellation? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> You test cancellation by wrapping the asynchronous function call inside a structured `Task` instance and immediately calling `task.cancel()`. You then await the task's outcome inside a `do-catch` block. The test asserts that the function throws a `CancellationError` or ceases work without returning a normal result.
- Criterion 1 (wrapping in Task and calling cancel): 50/50 (Met)
- Criterion 2 (asserting CancellationError or clean stop): 50/50 (Met)

### Average Answer (Score: 50/100)
> You create a Task, call `cancel()` on it, and wait for it.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Missing assertion for CancellationError)

### Weak Answer (Score: 0/100)
> Swift automatically cancels functions when you run them in unit tests, so no assertions are required.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 28 (written): Avoiding Task.sleep in CI Pipelines

Prompt: Why should engineering teams avoid using Task.sleep to test timing or concurrency in CI pipelines? Write 2 to 5 sentences.

### Good Answer (Score: 100/100)
> Arbitrary sleep delays drastically slow down unit test execution and cause flaky test failures under variable CI server loads. If a server is under heavy CPU contention, a hardcoded sleep delay may expire before background work completes. Instead, teams should inject clock protocols or use deterministic expectations to synchronize test steps without real-time delays.
- Criterion 1 (slow execution and CI server flakiness under load): 50/50 (Met)
- Criterion 2 (inject clock protocols or deterministic expectations): 50/50 (Met)

### Average Answer (Score: 50/100)
> Using Task.sleep in tests makes your test suite run very slowly when you have many test cases.
- Criterion 1: 50/50 (Met)
- Criterion 2: 0/50 (Missing alternative like clock injection or structured waiting)

### Weak Answer (Score: 0/100)
> Task.sleep is deprecated in Swift 6 and cannot be called from test methods.
- Criterion 1: 0/50 (Incorrect)
- Criterion 2: 0/50 (Incorrect)

---

## Question 29 (code-write): Declare and Await Async Function

Prompt: Declare an asynchronous function `fetchStatus() async -> String` that returns 'Online'. Call it at the top level with `await` and print 'Status: Online'.

### Good Answer (Score: 100/100)
```swift
func fetchStatus() async -> String {
    return "Online"
}

let status = await fetchStatus()
print("Status: \(status)")
```
- Criterion 1 (fetchStatus async -> String): 40/40 (Met)
- Criterion 2 (await call): 30/30 (Met)
- Criterion 3 (prints 'Status: Online'): 30/30 (Met)

### Average Answer (Score: 70/100)
```swift
func fetchStatus() async -> String {
    "Online"
}

let result = await fetchStatus()
print(result)
```
- Criterion 1: 40/40 (Met)
- Criterion 2: 30/30 (Met)
- Criterion 3: 0/30 (Output missing 'Status: ' prefix)

### Weak Answer (Score: 0/100)
```swift
func fetchStatus() -> String {
    return "Online"
}
print(fetchStatus())
```
- Criterion 1: 0/40 (Missing async keyword)
- Criterion 2: 0/30 (No await)
- Criterion 3: 0/30 (Incorrect format)

---

## Question 30 (code-write): Implement Actor Cache

Prompt: Implement an `actor UserCache` that stores user names by integer IDs in a private dictionary. Provide `func save(user: String, for id: Int)` and `func getUser(for id: Int) -> String?`. Instantiate, save 'Alex' for ID 1, fetch it with `await`, and print 'User: Alex'.

### Good Answer (Score: 100/100)
```swift
actor UserCache {
    private var cache: [Int: String] = [:]
    func save(user: String, for id: Int) {
        cache[id] = user
    }
    func getUser(for id: Int) -> String? {
        return cache[id]
    }
}

let cache = UserCache()
await cache.save(user: "Alex", for: 1)
print("User: \(await cache.getUser(for: 1) ?? "none")")
```
- Criterion 1 (actor UserCache with private dictionary): 30/30 (Met)
- Criterion 2 (save and getUser methods called with await): 40/40 (Met)
- Criterion 3 (prints 'User: Alex'): 30/30 (Met)

### Average Answer (Score: 70/100)
```swift
class UserCache {
    var cache: [Int: String] = [:]
    func save(user: String, for id: Int) { cache[id] = user }
    func getUser(for id: Int) -> String? { cache[id] }
}
let cache = UserCache()
cache.save(user: "Alex", for: 1)
print("User: \(cache.getUser(for: 1) ?? "")")
```
- Criterion 1: 0/30 (Uses class instead of actor)
- Criterion 2: 40/40 (Methods implemented)
- Criterion 3: 30/30 (Correct output format)

### Weak Answer (Score: 0/100)
```swift
let user = "Alex"
print(user)
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30

---

## Question 31 (code-write): Cancellation Handling

Prompt: Write an async function `downloadFile() async throws -> String` that checks `try Task.checkCancellation()` and returns 'Downloaded'. Create a Task to call it, cancel the task, await its result in a do-catch block, catch `is CancellationError`, and print 'Task was cancelled'.

### Good Answer (Score: 100/100)
```swift
func downloadFile() async throws -> String {
    try Task.checkCancellation()
    return "Downloaded"
}

let task = Task {
    try await downloadFile()
}
task.cancel()

do {
    _ = try await task.value
} catch is CancellationError {
    print("Task was cancelled")
} catch {
    print("Other error")
}
```
- Criterion 1 (downloadFile with checkCancellation): 30/30 (Met)
- Criterion 2 (Task creation, cancel, and do-catch await): 40/40 (Met)
- Criterion 3 (catches CancellationError and prints 'Task was cancelled'): 30/30 (Met)

### Average Answer (Score: 60/100)
```swift
func downloadFile() async throws -> String {
    return "Downloaded"
}
let task = Task {
    try await downloadFile()
}
task.cancel()
do {
    _ = try await task.value
} catch {
    print("Task was cancelled")
}
```
- Criterion 1: 0/30 (Missing Task.checkCancellation)
- Criterion 2: 40/40 (Met)
- Criterion 3: 20/30 (Catches generic error instead of is CancellationError)

### Weak Answer (Score: 0/100)
```swift
func downloadFile() {
    print("Downloaded")
}
```
- Criterion 1: 0/30
- Criterion 2: 0/40
- Criterion 3: 0/30
