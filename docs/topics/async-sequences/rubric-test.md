# Rubric Test: AsyncSequence and AsyncStream

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/async-sequences/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## as-q24 (Written: AsyncSequence vs Sequence)

### Rubric
- Explains that AsyncSequence delivers elements asynchronously over time using for-await (40 pts, key)
- Contrasts with synchronous Sequence which delivers all elements immediately (35 pts, key)
- Explains that the loop terminates when next() returns nil (25 pts)

### Good Answer
A standard Swift Sequence provides its elements immediately in memory during a synchronous loop. In contrast, an AsyncSequence delivers elements asynchronously over time, suspending the consuming task between values. The for-await loop consumes elements one by one until the iterator returns nil to signal completion.

**Score: 100/100**
- [x] Explains delivering elements asynchronously over time with for-await (40/40)
- [x] Contrasts with synchronous Sequence immediate delivery (35/35)
- [x] Explains termination when next() returns nil (25/25)

### Average Answer
AsyncSequence lets you receive elements over time with a for await loop. Normal sequences have all items ready right away. The loop stops when the sequence is empty.

**Score: 75/100**
- [x] Explains elements over time with for await (35/40)
- [x] Contrasts with normal sequences (30/35)
- [ ] Misses next() returning nil mechanic (10/25)

### Weak Answer
AsyncSequence is used for networking arrays.

**Score: 10/100**
- [ ] Misses async delivery explanation (0/40)
- [ ] Misses synchronous contrast (0/35)
- [x] Mentions network arrays vaguely (10/25)

---

## as-q25 (Written: AsyncStream Adaptation)

### Rubric
- Explains that AsyncStream provides a continuation closure to bridge event callbacks (40 pts, key)
- Explains that continuation.yield emits individual values into the stream (35 pts, key)
- Explains that continuation.finish signals that no more elements will be produced (25 pts)

### Good Answer
AsyncStream provides a continuation that bridges callback or delegate events into an async sequence. The producer calls continuation.yield(value) whenever a delegate event fires to push data into the stream buffer. When events are done, calling continuation.finish() closes the stream so the consuming for-await loop exits.

**Score: 100/100**
- [x] Explains continuation bridges callbacks/delegates (40/40)
- [x] Explains continuation.yield emits values (35/35)
- [x] Explains continuation.finish closes stream (25/25)

### Average Answer
AsyncStream wraps old callbacks with a continuation. You call yield to send each new item into the stream. When you are done, you call finish so the loop can stop.

**Score: 85/100**
- [x] Explains wrapping callbacks with continuation (35/40)
- [x] Explains yield sends items (30/35)
- [x] Explains finish stops the loop (20/25)

### Weak Answer
AsyncStream is used to make background threads wait for downloads.

**Score: 0/100**
- [ ] Misses callback bridge purpose (0/40)
- [ ] Misses yield method (0/35)
- [ ] Misses finish method (0/25)

---

## as-q26 (Written: continuation.onTermination)

### Rubric
- Explains that onTermination runs when the consumer cancels or finishes iterating (40 pts, key)
- Identifies that without it, producers keep running and emitting events in the background (35 pts, key)
- Provides a concrete example such as CoreLocation manager or open network socket (25 pts)

### Good Answer
continuation.onTermination is called whenever a consumer task is cancelled or stops reading the stream. Without this callback, event producers such as location managers or WebSocket connections will continue generating events in the background. Implementing onTermination allows you to stop location updates or close sockets, preventing battery drain and memory leaks.

**Score: 100/100**
- [x] Explains onTermination runs on cancel or finish (40/40)
- [x] Identifies producers continue emitting without it (35/35)
- [x] Provides location manager or socket example (25/25)

### Average Answer
onTermination runs when the stream is cancelled or ends. If you wrap a CoreLocation manager without onTermination, GPS keeps tracking location in the background and drains battery.

**Score: 85/100**
- [x] Explains callback timing (35/40)
- [x] Identifies background continuation (25/35)
- [x] Provides CoreLocation GPS example (25/25)

### Weak Answer
onTermination is called when the app closes to save files.

**Score: 0/100**
- [ ] Incorrect timing understanding (0/40)
- [ ] Misses background producer leak (0/35)
- [ ] Misses sensor/socket teardown context (0/25)

---

## as-q27 (Written: Buffering Policies)

### Rubric
- Identifies available policies: unbounded, bufferingNewest, and bufferingOldest (40 pts, key)
- Explains that unbounded buffers can exhaust memory if consumer is slower than producer (35 pts, key)
- Explains that bufferingNewest discards older stale frames, keeping fresh data and bounded memory (25 pts)

### Good Answer
AsyncStream supports unbounded, bufferingNewest, and bufferingOldest policies. Fast producers like camera video frames can quickly exhaust memory if using the default unbounded buffer with a slow consumer. Using bufferingNewest with a fixed capacity discards older stale data, maintaining fresh sensor readings while guaranteeing bounded memory usage.

**Score: 100/100**
- [x] Identifies all three buffering policies (40/40)
- [x] Explains memory exhaustion risk with unbounded buffers (35/35)
- [x] Explains bufferingNewest dropping stale items for fresh data (25/25)

### Average Answer
AsyncStream has unbounded and bufferingNewest policies. If a producer yields items too fast and the consumer is slow, an unbounded buffer can cause an out-of-memory crash. bufferingNewest drops older items to keep memory bounded.

**Score: 80/100**
- [x] Identifies policies (30/40 - omitted bufferingOldest)
- [x] Explains memory crash risk (30/35)
- [x] Explains dropping older items (20/25)

### Weak Answer
Buffering caches network responses on disk.

**Score: 0/100**
- [ ] Misses buffering policy names (0/40)
- [ ] Misses memory growth explanation (0/35)
- [ ] Misses real-time streaming rationale (0/25)

---

## as-q28 (Written: AsyncSequence vs Combine)

### Rubric
- Explains AsyncSequence is pull-based where consumer awaits values, while Combine pushes to subscribers (40 pts, key)
- Explains AsyncSequence integrates natively with Swift task cancellation without AnyCancellable tokens (35 pts, key)
- Explains Combine requires storing cancellable subscriptions in memory bags (25 pts)

### Good Answer
AsyncSequence uses a pull-based model where the consumer explicitly awaits each element within a task. In contrast, Combine uses a push-based model where publishers push values to subscribers. AsyncSequence cancellation integrates directly into Swift structured concurrency, whereas Combine requires storing AnyCancellable tokens to manage subscription lifetimes.

**Score: 100/100**
- [x] Explains pull-based await vs push-based publisher (40/40)
- [x] Explains native task cancellation integration (35/35)
- [x] Explains Combine AnyCancellable storage requirement (25/25)

### Average Answer
AsyncSequence pulls values using for await in a task. Combine pushes values to sinks. In AsyncSequence you do not need to store an AnyCancellable set because task cancellation handles it.

**Score: 85/100**
- [x] Explains pull vs push (35/40)
- [x] Mentions task cancellation integration (30/35)
- [x] Mentions AnyCancellable set (20/25)

### Weak Answer
AsyncSequence is new and Combine is old.

**Score: 10/100**
- [ ] Misses architectural mechanisms (0/40)
- [ ] Misses cancellation comparison (0/35)
- [x] Vaguely implies generational shift (10/25)

---

## as-q29 (Code-Write: makeMessageStream)

### Rubric
- Creates AsyncStream yielding Hello and World (35 pts, key)
- Calls continuation.finish() to close the stream cleanly (35 pts, key)
- Iterates with for await and prints Combined: Hello World (30 pts)

### Good Answer
```swift
func makeMessageStream() -> AsyncStream<String> {
    AsyncStream { continuation in
        continuation.yield("Hello")
        continuation.yield("World")
        continuation.finish()
    }
}
var words: [String] = []
for await w in makeMessageStream() {
    words.append(w)
}
print("Combined: \(words.joined(separator: " "))")
```

**Score: 100/100**
- [x] Creates AsyncStream yielding Hello and World (35/35)
- [x] Calls continuation.finish() (35/35)
- [x] Iterates with for await and prints Combined: Hello World (30/30)

### Average Answer
```swift
func makeMessageStream() -> AsyncStream<String> {
    AsyncStream { continuation in
        continuation.yield("Hello")
        continuation.yield("World")
        continuation.finish()
    }
}
var str = ""
for await word in makeMessageStream() {
    if str.isEmpty { str = word } else { str += " " + word }
}
print("Combined: \(str)")
```

**Score: 95/100**
- [x] Creates stream and yields words (35/35)
- [x] Calls finish() (35/35)
- [x] Iterates and prints Combined: Hello World (25/30)

### Weak Answer
```swift
func makeMessageStream() -> [String] {
    return ["Hello", "World"]
}
print("Combined: \(makeMessageStream().joined(separator: " "))")
```

**Score: 20/100**
- [ ] Returns Array instead of AsyncStream (0/35)
- [ ] Missing continuation.finish() (0/35)
- [x] Outputs requested format manually (20/30)

---

## as-q30 (Code-Write: sumEvenNumbers)

### Rubric
- Creates AsyncStream yielding numbers 1...5 and finishes (35 pts, key)
- Filters and sums only even numbers during for await loop (35 pts, key)
- Prints exact output Even sum: 6 (30 pts)

### Good Answer
```swift
func sumEvenNumbers() async -> Int {
    let stream = AsyncStream<Int> { continuation in
        for n in 1...5 {
            continuation.yield(n)
        }
        continuation.finish()
    }
    var sum = 0
    for await val in stream {
        if val % 2 == 0 {
            sum += val
        }
    }
    return sum
}
let total = await sumEvenNumbers()
print("Even sum: \(total)")
```

**Score: 100/100**
- [x] Yields 1...5 and calls finish() (35/35)
- [x] Filters and sums evens (35/35)
- [x] Prints Even sum: 6 (30/30)

### Average Answer
```swift
func sumEvenNumbers() async -> Int {
    let stream = AsyncStream<Int> { continuation in
        for i in 1...5 { continuation.yield(i) }
        continuation.finish()
    }
    var sum = 0
    for await num in stream.filter({ $0 % 2 == 0 }) {
        sum += num
    }
    return sum
}
let res = await sumEvenNumbers()
print("Even sum: \(res)")
```

**Score: 100/100**
- [x] Creates stream and finishes (35/35)
- [x] Uses filter operator to sum evens (35/35)
- [x] Prints Even sum: 6 (30/30)

### Weak Answer
```swift
func sumEvenNumbers() -> Int {
    return 2 + 4
}
print("Even sum: \(sumEvenNumbers())")
```

**Score: 15/100**
- [ ] Missing AsyncStream (0/35)
- [ ] Missing for await loop (0/35)
- [x] Calculates correct total manually (15/30)

---

## as-q31 (Code-Write: RangeSequence Implementation)

### Rubric
- Declares struct conforming to AsyncSequence and AsyncIteratorProtocol (30 pts, key)
- Implements next() returning values up to max and nil when exceeded (40 pts, key)
- Iterates with for await and prints exact output [1, 2, 3] (30 pts)

### Good Answer
```swift
struct RangeSequence: AsyncSequence, AsyncIteratorProtocol {
    typealias Element = Int
    var current: Int
    let max: Int
    mutating func next() async -> Int? {
        guard current <= max else { return nil }
        defer { current += 1 }
        return current
    }
    func makeAsyncIterator() -> RangeSequence {
        self
    }
}
var output: [Int] = []
for await item in RangeSequence(current: 1, max: 3) {
    output.append(item)
}
print(output)
```

**Score: 100/100**
- [x] Conforms to AsyncSequence and AsyncIteratorProtocol (30/30)
- [x] Implements next() returning up to max, then nil (40/40)
- [x] Iterates with for await and prints [1, 2, 3] (30/30)

### Average Answer
```swift
struct RangeSequence: AsyncSequence, AsyncIteratorProtocol {
    typealias Element = Int
    var current: Int
    let max: Int
    mutating func next() async -> Int? {
        if current > max { return nil }
        let val = current
        current += 1
        return val
    }
    func makeAsyncIterator() -> RangeSequence { self }
}
var arr = [Int]()
for await n in RangeSequence(current: 1, max: 3) {
    arr.append(n)
}
print(arr)
```

**Score: 95/100**
- [x] Protocol conformances (30/30)
- [x] next() logic with temporary variable (35/40)
- [x] Iterates and prints [1, 2, 3] (30/30)

### Weak Answer
```swift
struct RangeSequence {
    let items = [1, 2, 3]
}
print(RangeSequence().items)
```

**Score: 15/100**
- [ ] Missing AsyncSequence protocols (0/30)
- [ ] Missing next() iterator method (0/40)
- [x] Prints [1, 2, 3] statically (15/30)
