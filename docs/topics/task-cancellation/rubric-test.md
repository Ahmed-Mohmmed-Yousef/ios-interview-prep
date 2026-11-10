# Rubric Test: Task Cancellation

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/task-cancellation/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## tc-q24 (Written: Cooperative Cancellation)

### Rubric
- Explains that calling cancel() sets a cancellation flag rather than killing threads (40 pts, key)
- Explains that code must inspect Task.isCancelled or checkCancellation to halt work (35 pts, key)
- Explains that a loop without checks will run to completion, wasting CPU and battery (25 pts)

### Good Answer
Swift task cancellation is cooperative because the system sets a cancellation flag instead of killing threads. Running code must explicitly check Task.isCancelled or call try Task.checkCancellation() to stop working. If a running loop contains no cancellation checks, it continues executing until completion, consuming CPU cycles and battery.

**Score: 100/100**
- [x] Explains setting flag rather than killing threads (40/40)
- [x] Explains inspecting Task.isCancelled or checkCancellation (35/35)
- [x] Explains loop runs to completion wasting resources (25/25)

### Average Answer
Task cancellation does not kill the thread. It sets isCancelled to true, and your code must check it. If you do not check Task.isCancelled in your loop, the loop will keep running.

**Score: 80/100**
- [x] Explains flag set without thread killing (35/40)
- [x] Explains checking isCancelled (30/35)
- [x] Mentions loop keeps running (15/25)

### Weak Answer
Calling cancel stops the task if it is waiting on the network.

**Score: 10/100**
- [ ] Misses cooperative cancellation explanation (0/40)
- [ ] Misses explicit checking APIs (0/35)
- [x] Mentions network cancellation (10/25)

---

## tc-q25 (Written: Task.isCancelled vs checkCancellation)

### Rubric
- Explains Task.isCancelled returns a Boolean without throwing (35 pts, key)
- Explains try Task.checkCancellation() throws CancellationError (35 pts, key)
- Explains choosing Task.isCancelled for partial returns or non-throwing functions (30 pts)

### Good Answer
Task.isCancelled is a Boolean property that lets you inspect cancellation status without throwing an error. In contrast, try Task.checkCancellation() immediately throws CancellationError if the task is cancelled. You choose Task.isCancelled in non-throwing functions or when returning partial results, and checkCancellation() in throwing asynchronous pipelines.

**Score: 100/100**
- [x] Explains isCancelled is non-throwing Boolean (35/35)
- [x] Explains checkCancellation throws CancellationError (35/35)
- [x] Explains appropriate use case selection (30/30)

### Average Answer
Task.isCancelled is a boolean check, while checkCancellation throws an error when cancelled. Use isCancelled if your function does not throw.

**Score: 80/100**
- [x] Explains isCancelled is boolean (30/35)
- [x] Explains checkCancellation throws error (30/35)
- [x] Mentions non-throwing functions (20/30)

### Weak Answer
They both cancel the current task.

**Score: 0/100**
- [ ] Misses isCancelled explanation (0/35)
- [ ] Misses checkCancellation explanation (0/35)
- [ ] Misses use case distinctions (0/30)

---

## tc-q26 (Written: SwiftUI .task Modifier Cancellation)

### Rubric
- Explains that .task launches when the view appears and cancels when it disappears (40 pts, key)
- Explains that .task(id:) cancels existing work and restarts when the id value changes (35 pts, key)
- Mentions avoiding manual task cancellation boilerplate in view models (25 pts)

### Good Answer
The SwiftUI .task modifier automatically starts an asynchronous task when the view appears and cancels it when the view disappears. When using .task(id: value), SwiftUI cancels any existing in-flight task whenever the identity value changes, then starts a new one. This handles search-as-you-type cancellations automatically without manual task management.

**Score: 100/100**
- [x] Explains launch on appear and cancel on disappear (40/40)
- [x] Explains cancel and restart on id value change (35/35)
- [x] Mentions automated management without manual boilerplate (25/25)

### Average Answer
The .task modifier cancels when the user leaves the screen. If you provide an ID, it cancels the previous task and starts again whenever that ID changes.

**Score: 75/100**
- [x] Explains cancel on leaving screen (35/40)
- [x] Explains restart on ID change (30/35)
- [ ] Misses view model boilerplate reduction context (10/25)

### Weak Answer
It runs background tasks for SwiftUI buttons.

**Score: 0/100**
- [ ] Misses appearance lifecycle cancellation (0/40)
- [ ] Misses id value change cancellation (0/35)
- [ ] Misses task management benefit (0/25)

---

## tc-q27 (Written: withTaskCancellationHandler)

### Rubric
- Explains executing an operation while providing an onCancel closure to abort external work (40 pts, key)
- Explains that onCancel runs immediately on whichever thread called cancel() (35 pts, key)
- Identifies data race risks between operation and onCancel requiring synchronization (25 pts)

### Good Answer
withTaskCancellationHandler runs an operation and provides an onCancel closure to cancel legacy resources like network sessions or file descriptors. However, onCancel executes immediately on whatever thread invoked task.cancel(). This means onCancel can run concurrently with the operation, so shared variables must be protected against data races.

**Score: 100/100**
- [x] Explains executing operation with onCancel closure (40/40)
- [x] Explains onCancel runs on the cancelling thread (35/35)
- [x] Identifies concurrent execution and data race risk (25/25)

### Average Answer
withTaskCancellationHandler has an onCancel closure that runs when cancel is called. It lets you cancel old non-async operations. But onCancel runs on a different thread, so you must be careful with shared memory.

**Score: 75/100**
- [x] Explains onCancel running on cancel (35/40)
- [x] Mentions running on calling thread (25/35)
- [x] Mentions shared memory caution (15/25)

### Weak Answer
It handles errors when tasks crash.

**Score: 0/100**
- [ ] Misses operation/onCancel bridge purpose (0/40)
- [ ] Misses cancelling thread execution (0/35)
- [ ] Misses synchronization hazards (0/25)

---

## tc-q28 (Written: Resource Cleanups with defer)

### Rubric
- Explains using defer to guarantee cleanup code runs when scope exits (40 pts, key)
- Explains that defer executes even when checkCancellation throws CancellationError (35 pts, key)
- Mentions cleaning up open handles, sockets, or temporary files (25 pts)

### Good Answer
When a task is cancelled, throwing checkCancellation() unwinds the call stack immediately. Using a defer block ensures cleanup logic always runs regardless of how the function exits. This allows you to close open files, terminate database connections, and release temporary memory safely upon cancellation.

**Score: 100/100**
- [x] Explains defer guarantees cleanup on scope exit (40/40)
- [x] Explains defer runs during CancellationError unwinding (35/35)
- [x] Mentions releasing files, connections, or buffers (25/25)

### Average Answer
defer is great because it runs whenever the function exits. If a task throws a CancellationError, the defer block still runs to close files and clean up resources.

**Score: 80/100**
- [x] Explains defer on scope exit (35/40)
- [x] Explains defer runs on CancellationError (30/35)
- [x] Mentions closing files and resources (15/25)

### Weak Answer
defer delays code from executing until the app goes to sleep.

**Score: 0/100**
- [ ] Incorrect understanding of defer (0/40)
- [ ] Misses cancellation stack unwinding (0/35)
- [ ] Misses resource cleanup role (0/25)

---

## tc-q29 (Code-Write: runWorker with Task.isCancelled)

### Rubric
- Creates a Task inspecting Task.isCancelled (30 pts, key)
- Calls task.cancel() and returns awaited task.value (40 pts, key)
- Prints the correct output Stopped (30 pts)

### Good Answer
```swift
func runWorker() async -> String {
    let task = Task {
        if Task.isCancelled {
            return "Stopped"
        }
        return "Running"
    }
    task.cancel()
    return await task.value
}

print(await runWorker())
```

**Score: 100/100**
- [x] Creates Task checking Task.isCancelled (30/30)
- [x] Cancels task and returns await task.value (40/40)
- [x] Prints exact output Stopped (30/30)

### Average Answer
```swift
func runWorker() async -> String {
    let t = Task {
        if Task.isCancelled {
            return "Stopped"
        } else {
            return "Running"
        }
    }
    t.cancel()
    let res = await t.value
    return res
}
print(await runWorker())
```

**Score: 95/100**
- [x] Checks Task.isCancelled (30/30)
- [x] Cancels and awaits value (35/40)
- [x] Prints Stopped (30/30)

### Weak Answer
```swift
func runWorker() async -> String {
    return "Stopped"
}
print(await runWorker())
```

**Score: 30/100**
- [ ] Missing Task declaration and isCancelled check (0/30)
- [ ] Missing cancel() call and await value (0/40)
- [x] Output matches coincidentally (30/30)

---

## tc-q30 (Code-Write: throwingOperation with checkCancellation)

### Rubric
- Uses try Task.checkCancellation() inside a Task (35 pts, key)
- Cancels the task and catches CancellationError around try await task.value (35 pts, key)
- Prints CancellationError handled upon catching the error (30 pts)

### Good Answer
```swift
func throwingOperation() async {
    let task = Task {
        try Task.checkCancellation()
        return "Data downloaded"
    }
    task.cancel()
    do {
        _ = try await task.value
    } catch is CancellationError {
        print("CancellationError handled")
    } catch {
        print("Other error")
    }
}

await throwingOperation()
```

**Score: 100/100**
- [x] Uses try Task.checkCancellation() (35/35)
- [x] Cancels task and catches CancellationError (35/35)
- [x] Prints CancellationError handled (30/30)

### Average Answer
```swift
func throwingOperation() async {
    let task = Task {
        try Task.checkCancellation()
        return "Data downloaded"
    }
    task.cancel()
    do {
        _ = try await task.value
    } catch {
        print("CancellationError handled")
    }
}
await throwingOperation()
```

**Score: 85/100**
- [x] Uses checkCancellation() (35/35)
- [x] Cancels and catches error (25/35 - catches generic error instead of is CancellationError)
- [x] Prints correct message (25/30)

### Weak Answer
```swift
func throwingOperation() async {
    print("CancellationError handled")
}
await throwingOperation()
```

**Score: 25/100**
- [ ] Missing Task and checkCancellation() (0/35)
- [ ] Missing cancel() and do-catch (0/35)
- [x] Prints expected message directly (25/30)

---

## tc-q31 (Code-Write: fetchUntilCancelled Loop)

### Rubric
- Declares task iterating 1...count with if Task.isCancelled break check (35 pts, key)
- Cancels the task and awaits task.value (35 pts, key)
- Prints exact output Collected: 0 (30 pts)

### Good Answer
```swift
func fetchUntilCancelled(_ count: Int) async -> [Int] {
    let task = Task {
        var items: [Int] = []
        for i in 1...count {
            if Task.isCancelled { break }
            items.append(i)
        }
        return items
    }
    task.cancel()
    return await task.value
}

let collected = await fetchUntilCancelled(5)
print("Collected: \(collected.count)")
```

**Score: 100/100**
- [x] Iterates loop with Task.isCancelled break (35/35)
- [x] Cancels task and awaits task.value (35/35)
- [x] Prints Collected: 0 (30/30)

### Average Answer
```swift
func fetchUntilCancelled(_ count: Int) async -> [Int] {
    let t = Task {
        var list: [Int] = []
        for num in 1...count {
            if Task.isCancelled {
                return list
            }
            list.append(num)
        }
        return list
    }
    t.cancel()
    return await t.value
}
let res = await fetchUntilCancelled(5)
print("Collected: \(res.count)")
```

**Score: 95/100**
- [x] Loops with cancellation return (35/35)
- [x] Cancels and awaits value (35/35)
- [x] Prints Collected: 0 (25/30)

### Weak Answer
```swift
func fetchUntilCancelled(_ count: Int) async -> [Int] {
    return []
}
print("Collected: \(0)")
```

**Score: 20/100**
- [ ] Missing Task and loop logic (0/35)
- [ ] Missing cancel() call (0/35)
- [x] Prints target format manually (20/30)
