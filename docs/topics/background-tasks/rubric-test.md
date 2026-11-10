# Rubric Test: Background Work

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/background-tasks/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## bg-q24 (Written: beginBackgroundTask and endBackgroundTask)

### Rubric
- Explains that beginBackgroundTask grants roughly 30 seconds to finish in-flight work before app suspension (50 pts, key)
- Explains that failing to call endBackgroundTask triggers a watchdog timeout crash by the system (50 pts, key)

### Good Answer
In UIKit, `beginBackgroundTask(withName:expirationHandler:)` requests temporary background execution time, typically around thirty seconds, to complete in-flight tasks such as writing data to disk or uploading analytics when the app transitions out of the foreground. You must always invoke `endBackgroundTask(_:)` once the work completes or inside the expiration closure. Failing to call `endBackgroundTask` causes the iOS watchdog timer to kill the process with exception code `0xbaadca11`.

**Score: 100/100**
- [x] Explains 30s grant for in-flight work before suspension (50/50)
- [x] Explains watchdog termination if endBackgroundTask omitted (50/50)

### Average Answer
beginBackgroundTask gives your app about thirty seconds to finish saving a file when leaving the app. You must call endBackgroundTask when you are done or the system watchdog kills the app.

**Score: 85/100**
- [x] Mentions 30 seconds to finish saving work (45/50)
- [x] Mentions watchdog kill if not ended (40/50)

### Weak Answer
It lets an app run infinite background crypto mining without using battery.

**Score: 0/100**
- [ ] Inaccurate infinite execution claim (0/50)
- [ ] Misses watchdog termination mechanism (0/50)

---

## bg-q25 (Written: BGAppRefreshTask vs BGProcessingTask)

### Rubric
- Explains that BGAppRefreshTask is short (~30s) for updating feeds and current content (50 pts, key)
- Explains that BGProcessingTask is longer (minutes) for heavy work and can require power and network (50 pts, key)

### Good Answer
`BGAppRefreshTask` provides a short execution window of approximately thirty seconds designed for lightweight content updates, such as fetching latest chat messages or refreshing a news timeline. In contrast, `BGProcessingTask` offers an extended runtime of several minutes for resource-intensive maintenance like Core Data database indexing, machine learning model updates, or cache cleanup. Furthermore, `BGProcessingTaskRequest` allows developers to require external power and Wi-Fi connectivity so heavy work runs while the phone charges overnight.

**Score: 100/100**
- [x] Explains BGAppRefreshTask (~30s, feed refresh) (50/50)
- [x] Explains BGProcessingTask (minutes, heavy maintenance, power/network) (50/50)

### Average Answer
BGAppRefreshTask is for quick tasks lasting around thirty seconds to update feeds. BGProcessingTask is for heavier tasks lasting several minutes and can require the phone to be plugged into power.

**Score: 85/100**
- [x] Mentions short 30s feed updates (45/50)
- [x] Mentions longer tasks requiring power (40/50)

### Weak Answer
BGAppRefreshTask refreshes the screen display refresh rate to 120Hz, while BGProcessingTask compiles C++ code.

**Score: 0/100**
- [ ] Inaccurate ProMotion claim (0/50)
- [ ] Misses background task scheduling concepts (0/50)

---

## bg-q26 (Written: Info.plist and Launch Registration)

### Rubric
- Explains that Info.plist tells iOS which background tasks the app is permitted to run (50 pts, key)
- Explains that registering handlers early in launch ensures the system can deliver wakeups properly (50 pts, key)

### Good Answer
Task identifiers must be declared in `Info.plist` under `BGTaskSchedulerPermittedIdentifiers` so iOS knows your application is authorized to schedule those tasks. Submitting an unregistered identifier throws a runtime exception. Additionally, handlers must be registered with `BGTaskScheduler.shared.register` before `didFinishLaunchingWithOptions` finishes execution so the operating system can map background wakeups directly to your handler closures.

**Score: 100/100**
- [x] Info.plist permitted identifiers authorization (50/50)
- [x] Registration before launch completes for wakeup delivery (50/50)

### Average Answer
You need to put your task IDs in Info.plist under permitted identifiers or submitting will fail. You also have to register handlers during app launch so the system knows what code to run when it wakes up.

**Score: 85/100**
- [x] Mentions Info.plist permitted identifiers (45/50)
- [x] Mentions registering during app launch (40/50)

### Weak Answer
You put task IDs in Info.plist to change the app icon color in the background.

**Score: 0/100**
- [ ] Inaccurate app icon claim (0/50)
- [ ] Misses system scheduler authorization (0/50)

---

## bg-q27 (Written: expirationHandler on BGTask)

### Rubric
- Explains that expirationHandler is called by iOS when allocated background time has expired (50 pts, key)
- Explains using it to cancel ongoing async work cleanly and save state before termination (50 pts, key)

### Good Answer
The `expirationHandler` closure is invoked by iOS when the system decides that allocated background execution time has expired. This provides the app with a crucial, brief grace period to cancel in-flight asynchronous operations, close open file handles, and save current state. Properly handling expiration ensures your app terminates cleanly without being forcefully killed and preserves your app background execution budget.

**Score: 100/100**
- [x] Invoked when allocated background time expires (50/50)
- [x] Cancels async operations and saves state cleanly (50/50)

### Average Answer
iOS calls expirationHandler when time is up for your task. You use it to cancel running network calls and save progress so the system does not kill your app.

**Score: 85/100**
- [x] Mentions call when time is up (45/50)
- [x] Mentions cancelling calls and saving progress (40/50)

### Weak Answer
It sets the expiration date on user passwords stored in iCloud Keychain.

**Score: 0/100**
- [ ] Confuses task expiration with password expiry (0/50)
- [ ] Misses background execution cancellation (0/50)

---

## bg-q28 (Written: Background URLSession with nsurlsessiond)

### Rubric
- Discusses using URLSessionConfiguration.background to delegate transfers to the system daemon nsurlsessiond (50 pts, key)
- Explains that transfers continue even if the app process terminates or is suspended (50 pts, key)

### Good Answer
A senior engineer handles large file downloads by creating a `URLSession` configured with `URLSessionConfiguration.background(withIdentifier:)`. This configuration hands off file download and upload tasks to the independent system daemon `nsurlsessiond`. As a result, transfers continue transferring packets even if the app process is suspended, evicted by memory pressure, or killed. When downloads finish, iOS wakes the app in the background to handle the completed files.

**Score: 100/100**
- [x] URLSessionConfiguration.background and nsurlsessiond delegation (50/50)
- [x] Transfers persist across suspension and process termination (50/50)

### Average Answer
You create a background URLSession which hands the download over to the system daemon nsurlsessiond. That way files keep downloading even if your app is killed by the system.

**Score: 85/100**
- [x] Mentions background URLSession and nsurlsessiond (45/50)
- [x] Mentions continuing after app is killed (40/50)

### Weak Answer
You set the device screen brightness to zero and run a while loop on the main thread.

**Score: 0/100**
- [ ] Inaccurate main thread loop claim (0/50)
- [ ] Misses background URLSession architecture (0/50)

---

## bg-q29 (Code-Write: BackgroundExecutionTimer)

### Rubric
- Declares BackgroundExecutionTimer with allocatedSeconds set to 30.0 (35 pts, key)
- Implements hasRemainingTime comparing elapsedSeconds against allocatedSeconds (35 pts, key)
- Prints exact output 'HasTime: true' (30 pts, key)

### Good Answer
```swift
struct BackgroundExecutionTimer {
    let allocatedSeconds: Double = 30.0

    func hasRemainingTime(elapsedSeconds: Double) -> Bool {
        elapsedSeconds < allocatedSeconds
    }
}

func testTimer() {
    let timer = BackgroundExecutionTimer()
    print("HasTime: \(timer.hasRemainingTime(elapsedSeconds: 15.0))")
}

testTimer()
```
**Score: 100/100**
- [x] Declares struct with 30.0 property (35/35)
- [x] Implements comparison (35/35)
- [x] Prints 'HasTime: true' (30/30)

### Average Answer
```swift
struct BackgroundExecutionTimer {
    var allocatedSeconds = 30.0

    func hasRemainingTime(elapsedSeconds: Double) -> Bool {
        if elapsedSeconds < allocatedSeconds { return true }
        return false
    }
}

func testTimer() {
    let t = BackgroundExecutionTimer()
    print("HasTime: \(t.hasRemainingTime(elapsedSeconds: 15.0))")
}

testTimer()
```
**Score: 90/100**
- [x] Declares struct and property (30/35)
- [x] Implements comparison (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct BackgroundExecutionTimer {
    func hasRemainingTime() -> Bool { true }
}
```
**Score: 10/100**
- [ ] Missing stored property (5/35)
- [ ] Missing parameter and comparison (5/35)
- [ ] Missing test runner (0/30)

---

## bg-q30 (Code-Write: ProcessingTaskConfigurator)

### Rubric
- Declares ProcessingTaskConfigurator with power and network properties (35 pts, key)
- Implements mutating method configureNightlySync setting both properties to true (35 pts, key)
- Prints exact output 'Power: true, Net: true' (30 pts, key)

### Good Answer
```swift
struct ProcessingTaskConfigurator {
    var requiresExternalPower: Bool = false
    var requiresNetworkConnectivity: Bool = false

    mutating func configureNightlySync() {
        requiresExternalPower = true
        requiresNetworkConnectivity = true
    }
}

func testConfig() {
    var config = ProcessingTaskConfigurator()
    config.configureNightlySync()
    print("Power: \(config.requiresExternalPower), Net: \(config.requiresNetworkConnectivity)")
}

testConfig()
```
**Score: 100/100**
- [x] Declares struct with properties (35/35)
- [x] Mutating method sets both to true (35/35)
- [x] Prints 'Power: true, Net: true' (30/30)

### Average Answer
```swift
struct ProcessingTaskConfigurator {
    var requiresExternalPower = false
    var requiresNetworkConnectivity = false

    mutating func configureNightlySync() {
        self.requiresExternalPower = true
        self.requiresNetworkConnectivity = true
    }
}

func testConfig() {
    var c = ProcessingTaskConfigurator()
    c.configureNightlySync()
    print("Power: \(c.requiresExternalPower), Net: \(c.requiresNetworkConnectivity)")
}

testConfig()
```
**Score: 90/100**
- [x] Declares struct and properties (30/35)
- [x] Mutating method configures properties (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct ProcessingTaskConfigurator {
    func configureNightlySync() {}
}
```
**Score: 10/100**
- [ ] Missing stored properties (5/35)
- [ ] No mutation or assignment (5/35)
- [ ] Missing test runner (0/30)

---

## bg-q31 (Code-Write: ExpirationSafeWorker)

### Rubric
- Declares ExpirationSafeWorker with isCancelled Boolean property (35 pts, key)
- Implements mutating method handleExpiration updating isCancelled to true (35 pts, key)
- Prints exact output 'Cancelled: true' (30 pts, key)

### Good Answer
```swift
struct ExpirationSafeWorker {
    var isCancelled: Bool = false

    mutating func handleExpiration() {
        isCancelled = true
    }
}

func testWorker() {
    var worker = ExpirationSafeWorker()
    worker.handleExpiration()
    print("Cancelled: \(worker.isCancelled)")
}

testWorker()
```
**Score: 100/100**
- [x] Declares struct with isCancelled (35/35)
- [x] Mutating method sets isCancelled to true (35/35)
- [x] Prints 'Cancelled: true' (30/30)

### Average Answer
```swift
struct ExpirationSafeWorker {
    var isCancelled: Bool = false

    mutating func handleExpiration() {
        self.isCancelled = true
    }
}

func testWorker() {
    var w = ExpirationSafeWorker()
    w.handleExpiration()
    print("Cancelled: \(w.isCancelled)")
}

testWorker()
```
**Score: 90/100**
- [x] Declares struct and property (30/35)
- [x] Implements cancellation handler (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct ExpirationSafeWorker {
    func handleExpiration() { print("Cancelled") }
}
```
**Score: 10/100**
- [ ] Missing stored property (5/35)
- [ ] Does not mutate state (5/35)
- [ ] Incorrect output format (0/30)
