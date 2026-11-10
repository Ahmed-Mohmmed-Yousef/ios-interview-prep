# Rubric Test: Tasks and Task Groups

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/structured-concurrency/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sc-q24 (Written: Structured Concurrency vs Task { })

### Rubric
- Explains the parent-child relationship where a parent task waits for all child tasks before completing (40 pts, key)
- Explains automatic cancellation and priority propagation down the task tree (35 pts, key)
- Contrasts with Task { } whose lifetime is not bound to the surrounding lexical scope (25 pts)

### Good Answer
Structured concurrency organizes concurrent work into a clear parent-child tree hierarchy bound to lexical scope. A parent task cannot complete until all its child tasks have finished or cancelled. In contrast, an unstructured Task { } escapes the calling function. It continues running in the background even after the function returns.

**Score: 100/100**
- [x] Explains parent waits for child tasks before completing (40/40)
- [x] Explains scope-bound lifecycle and cancellation (35/35)
- [x] Contrasts with unstructured Task { } escaping scope (25/25)

### Average Answer
Structured concurrency makes tasks run in a hierarchy where parents wait for children. If you use Task { }, it is unstructured and can keep running even after the function finishes.

**Score: 75/100**
- [x] Explains parent-child waiting hierarchy (35/40)
- [x] Mentions task structure without detailing cancellation flow (15/35)
- [x] Contrasts with Task { } outliving the function (25/25)

### Weak Answer
Structured concurrency is when you use async and await instead of GCD.

**Score: 0/100**
- [ ] Explains parent-child relationship (0/40)
- [ ] Explains automatic cancellation/priority propagation (0/35)
- [ ] Contrasts with Task { } lifecycle (0/25)

---

## sc-q25 (Written: withTaskGroup Dynamics)

### Rubric
- Explains spawning child tasks dynamically inside the closure using group.addTask (40 pts, key)
- Explains gathering results asynchronously using a for await loop over the task group (35 pts, key)
- Mentions that withTaskGroup only returns once all child tasks finish executing (25 pts)

### Good Answer
withTaskGroup allows developers to spawn a dynamic number of child tasks inside a closure using group.addTask. Because TaskGroup conforms to AsyncSequence, the parent collects results as they complete using for await in group. The entire withTaskGroup block suspends until all child tasks finish before returning its result.

**Score: 100/100**
- [x] Explains group.addTask dynamic spawning (40/40)
- [x] Explains gathering results via for await over group (35/35)
- [x] Mentions waiting until all child tasks complete (25/25)

### Average Answer
withTaskGroup lets you add tasks with group.addTask in a loop. You get the results back using for await on the group. It waits for the tasks to finish.

**Score: 80/100**
- [x] Explains group.addTask (35/40)
- [x] Explains for await gathering (30/35)
- [x] Mentions waiting for tasks (15/25)

### Weak Answer
TaskGroup is like an array that downloads things in parallel.

**Score: 10/100**
- [ ] Missing group.addTask explanation (0/40)
- [ ] Missing for await iteration over group (0/35)
- [x] Mentions parallel downloads (10/25)

---

## sc-q26 (Written: Cooperative Cancellation)

### Rubric
- Explains that cancelling a parent task automatically flags all child tasks as cancelled (40 pts, key)
- Explains that cancellation is cooperative and does not stop threads by force (35 pts, key)
- Mentions using Task.isCancelled or Task.checkCancellation() inside child tasks (25 pts)

### Good Answer
When a parent task cancels, Swift automatically sets the cancellation flag on all child tasks in its tree. However, cancellation is cooperative, meaning the system does not forcibly terminate threads. Child tasks must periodically check Task.isCancelled or call Task.checkCancellation() to stop running early and release system resources.

**Score: 100/100**
- [x] Explains automatic downward cancellation propagation (40/40)
- [x] Explains cancellation is cooperative without thread killing (35/35)
- [x] Mentions Task.isCancelled or Task.checkCancellation() (25/25)

### Average Answer
Cancelling the parent cancels all child tasks automatically. But child tasks do not crash or stop instantly. You have to check Task.isCancelled inside the child loop so it stops doing work.

**Score: 85/100**
- [x] Explains cancellation cascades to children (40/40)
- [x] Explains tasks do not stop instantly (25/35)
- [x] Mentions Task.isCancelled check in loops (20/25)

### Weak Answer
Swift kills all child threads immediately when a parent task gets cancelled.

**Score: 0/100**
- [ ] Incorrect: claims forced thread killing instead of cooperative propagation (0/40)
- [ ] Misses cooperative cancellation explanation (0/35)
- [ ] Missing cooperative API checks (0/25)

---

## sc-q27 (Written: Task vs Task.detached)

### Rubric
- Explains that Task { } inherits priority, actor isolation, and task-local values from caller (40 pts, key)
- Explains that Task.detached inherits nothing and runs independently on global executor (35 pts, key)
- Explains choosing Task.detached for background independent work unaffected by caller actor or priority (25 pts)

### Good Answer
An ordinary Task { } inherits the caller actor isolation, priority, and task-local values. In contrast, Task.detached runs completely independently without inheriting actor context or caller priority. Developers should pick Task.detached for heavy background computations or caching operations that should not tie to the calling actor.

**Score: 100/100**
- [x] Explains Task inherits priority, actor, and task-locals (40/40)
- [x] Explains Task.detached inherits nothing (35/35)
- [x] Explains appropriate use case for detached work (25/25)

### Average Answer
Task inherits the main actor and priority from where you call it. Task.detached does not inherit anything and runs on a background thread. You use detached when you do not want to inherit the main actor.

**Score: 75/100**
- [x] Mentions inheritance of actor and priority (30/40)
- [x] Explains detached lacks inheritance (25/35)
- [x] Mentions avoiding main actor (20/25)

### Weak Answer
Task is for UI and Task.detached is for networking.

**Score: 15/100**
- [ ] Misses inheritance mechanics (0/40)
- [ ] Misses global executor and independent isolation (0/35)
- [x] Vaguely implies background separation (15/25)

---

## sc-q28 (Written: withDiscardingTaskGroup)

### Rubric
- Explains that withDiscardingTaskGroup automatically discards child task results upon completion (40 pts, key)
- Explains that standard withTaskGroup retains finished results until consumed via group.next() (35 pts, key)
- Identifies use cases such as long-running server loops or infinite event listeners without memory leaks (25 pts)

### Good Answer
Standard withTaskGroup retains the result of every completed child task until it is consumed by the parent. In long-running background loops, this retained memory can grow indefinitely. withDiscardingTaskGroup automatically discards child task results immediately upon completion. This keeps memory constant for infinite producer-consumer loops.

**Score: 100/100**
- [x] Explains discarding task results on completion (40/40)
- [x] Explains memory retention in standard TaskGroup (35/35)
- [x] Identifies long-running producer-consumer use cases (25/25)

### Average Answer
In a regular task group, completed task results stay in memory until you read them. If you run tasks forever in a loop, memory runs out. withDiscardingTaskGroup throws away results as soon as they finish to save memory.

**Score: 80/100**
- [x] Explains throwing away results to save memory (35/40)
- [x] Explains memory retention in standard task groups (30/35)
- [x] Mentions infinite loops (15/25)

### Weak Answer
It cancels tasks that you do not need.

**Score: 0/100**
- [ ] Misses result discard on completion (0/40)
- [ ] Misses memory accumulation in standard group (0/35)
- [ ] Misses long-running loop use cases (0/25)

---

## sc-q29 (Code-Write: parallelFetch with async let)

### Rubric
- Declares parallelFetch returning a tuple of String and Int asynchronously (30 pts, key)
- Uses async let to run both operations concurrently within the function (40 pts, key)
- Awaits the tuple and prints the correct formatted output User: 100 (30 pts)

### Good Answer
```swift
func parallelFetch() async -> (String, Int) {
    async let name = "User"
    async let score = 100
    return await (name, score)
}

let (name, score) = await parallelFetch()
print("\(name): \(score)")
```

**Score: 100/100**
- [x] Declares parallelFetch returning tuple asynchronously (30/30)
- [x] Uses async let for both child values (40/40)
- [x] Awaits tuple and prints User: 100 (30/30)

### Average Answer
```swift
func parallelFetch() async -> (String, Int) {
    async let name: String = "User"
    async let score: Int = 100
    let n = await name
    let s = await score
    return (n, s)
}
let res = await parallelFetch()
print("\(res.0): \(res.1)")
```

**Score: 90/100**
- [x] Declares async tuple function (30/30)
- [x] Uses async let concurrently (35/40)
- [x] Awaits and prints output correctly (25/30)

### Weak Answer
```swift
func parallelFetch() async -> (String, Int) {
    let name = "User"
    let score = 100
    return (name, score)
}
```

**Score: 30/100**
- [x] Declares tuple function (30/30)
- [ ] Missing async let concurrent spawning (0/40)
- [ ] Missing execution and print statements (0/30)

---

## sc-q30 (Code-Write: sumConcurrently with withTaskGroup)

### Rubric
- Declares sumConcurrently using withTaskGroup(of: Int.self) (30 pts, key)
- Spawns child tasks with group.addTask returning each integer (35 pts, key)
- Accumulates values via for await loop and prints correct result Sum: 30 (35 pts)

### Good Answer
```swift
func sumConcurrently(_ numbers: [Int]) async -> Int {
    await withTaskGroup(of: Int.self) { group in
        for n in numbers {
            group.addTask { n }
        }
        var total = 0
        for await val in group {
            total += val
        }
        return total
    }
}

let total = await sumConcurrently([5, 10, 15])
print("Sum: \(total)")
```

**Score: 100/100**
- [x] Uses withTaskGroup(of: Int.self) (30/30)
- [x] Spawns child tasks with group.addTask (35/35)
- [x] Accumulates values with for await and prints Sum: 30 (35/35)

### Average Answer
```swift
func sumConcurrently(_ numbers: [Int]) async -> Int {
    await withTaskGroup(of: Int.self) { group in
        for n in numbers {
            group.addTask { return n }
        }
        var sum = 0
        while let next = await group.next() {
            sum += next
        }
        return sum
    }
}
let total = await sumConcurrently([5, 10, 15])
print("Sum: \(total)")
```

**Score: 95/100**
- [x] Uses withTaskGroup (30/30)
- [x] Spawns tasks with group.addTask (35/35)
- [x] Accumulates via group.next() while loop and prints Sum: 30 (30/35)

### Weak Answer
```swift
func sumConcurrently(_ numbers: [Int]) -> Int {
    return numbers.reduce(0, +)
}
```

**Score: 10/100**
- [ ] Missing withTaskGroup (0/30)
- [ ] Missing group.addTask (0/35)
- [ ] Missing concurrent execution and output (10/35)

---

## sc-q31 (Code-Write: squareAll with withTaskGroup)

### Rubric
- Initializes task group with withTaskGroup(of: Int.self) (30 pts, key)
- Adds child tasks squaring each number and gathers results via for await (40 pts, key)
- Returns sorted array and prints exact result [4, 9, 16] (30 pts)

### Good Answer
```swift
func squareAll(_ values: [Int]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for x in values {
            group.addTask { x * x }
        }
        var out: [Int] = []
        for await val in group {
            out.append(val)
        }
        return out.sorted()
    }
}

let result = await squareAll([2, 3, 4])
print(result)
```

**Score: 100/100**
- [x] Initializes withTaskGroup(of: Int.self) (30/30)
- [x] Adds child tasks and gathers via for await (40/40)
- [x] Returns sorted array and prints [4, 9, 16] (30/30)

### Average Answer
```swift
func squareAll(_ values: [Int]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for val in values {
            group.addTask { val * val }
        }
        var res = [Int]()
        for await item in group {
            res.append(item)
        }
        res.sort()
        return res
    }
}
let res = await squareAll([2, 3, 4])
print(res)
```

**Score: 95/100**
- [x] Initializes withTaskGroup (30/30)
- [x] Adds child tasks and gathers with for await (40/40)
- [x] Sorts and prints [4, 9, 16] (25/30)

### Weak Answer
```swift
func squareAll(_ values: [Int]) -> [Int] {
    return values.map { $0 * $0 }
}
```

**Score: 10/100**
- [ ] Missing withTaskGroup (0/30)
- [ ] Missing child tasks and for await (0/40)
- [ ] Missing concurrent task execution (10/30)
