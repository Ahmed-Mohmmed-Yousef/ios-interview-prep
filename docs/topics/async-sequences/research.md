# Research: AsyncSequence and AsyncStream

Topic ID: `async-sequences`
Level: Mid
Goal: After this topic, you can use async sequences to handle values over time.

## 1. Official Sources & Sequence Mechanics

### Sources
- **Apple Developer Documentation: AsyncSequence**
  https://developer.apple.com/documentation/swift/asyncsequence
- **Apple Developer Documentation: AsyncStream**
  https://developer.apple.com/documentation/swift/asyncstream
- **WWDC21: Meet AsyncSequence (Session 10058)**
  https://developer.apple.com/videos/play/wwdc2021/10058/

### Core Technical Concepts

1. **AsyncSequence Protocol**:
   - Represents a sequence that provides values asynchronously over time.
   - Analogue of synchronous `Sequence`:
     - Synchronous: `makeIterator()` returns `IteratorProtocol` with mutating `next() -> Element?`.
     - Asynchronous: `makeAsyncIterator()` returns `AsyncIteratorProtocol` with mutating `next() async throws -> Element?`.
   - Returning `nil` from `next()` signals the termination of the stream.
   - Consumed using `for await element in sequence` (or `for try await` if throwing).
   - Standard library functional operators: `map`, `filter`, `prefix`, `drop`, `reduce`, `contains`.

2. **Built-in AsyncSequences**:
   - `URLSession.shared.bytes(from: url)`: streams incoming HTTP bytes asynchronously.
   - `NotificationCenter.default.notifications(named:)`: streams posted system notifications.
   - `FileHandle.standardInput.bytes.lines`: streams lines of text asynchronously.

3. **AsyncStream and AsyncThrowingStream**:
   - Primary adapter bridging legacy callback, delegate, closure, or event-driven APIs into modern async/await sequences.
   - Constructor: `AsyncStream(Element.self) { continuation in ... }`
   - Key continuation operations:
     - `continuation.yield(value)`: Emits a value into the stream buffer.
     - `continuation.finish()`: Signals successful stream completion (causes `next()` to return `nil`).
     - `continuation.finish(throwing: error)`: (In `AsyncThrowingStream`) signals an error and terminates.
     - `continuation.onTermination`: Closure invoked when the stream finishes or when the consumer's task is cancelled. Indispensable for stopping sensors (e.g. `CLLocationManager`), unregistering observers, or tearing down sockets.

4. **Buffering Policies & Backpressure**:
   - When a producer emits values faster than the consumer calls `await next()`, values buffer in memory.
   - `BufferingPolicy`:
     - `.unbounded`: Default. Retains all unconsumed values until memory runs out.
     - `.bufferingNewest(Int)`: Discards oldest unconsumed items when buffer limit is exceeded.
     - `.bufferingOldest(Int)`: Discards incoming newest items when buffer limit is exceeded.

5. **AsyncSequence vs Combine AnyPublisher**:
   - `AsyncSequence` is pull-based (consumer awaits each element on a task), integrates natively with Swift structured concurrency, and supports automatic task cancellation.
   - `Combine` is push-based, requires subscriber subscriptions (`AnyCancellable`), and involves separate operators for thread scheduling.

## 2. Interview Questions by Level

### Fresh / Junior
- What is an `AsyncSequence` in Swift?
- How do you consume elements from an `AsyncSequence`?
- What does returning `nil` from an async iterator mean?

### Mid
- How does `AsyncStream` bridge a delegate-based API into a modern `for await` loop?
- What is the purpose of `continuation.onTermination` in an `AsyncStream`?
- What buffering policies are available in `AsyncStream`, and why are they needed?

### Senior
- How do you manage backpressure and memory growth when a producer outpaces an async sequence consumer?
- What are the differences in cancellation propagation between an `AsyncStream` consumer and a Combine `Publisher` subscriber?
- How do you build a custom type conforming to `AsyncSequence` and `AsyncIteratorProtocol` in Swift 6?

## 3. Common Traps and Misconceptions

- **Trap 1: Forgetting `continuation.finish()`**:
  If a stream producer finishes emitting but never calls `continuation.finish()`, the consuming `for await` loop hangs indefinitely awaiting the next element.
- **Trap 2: Omitting `continuation.onTermination`**:
  If a consumer task cancels or breaks out of a `for await` loop, the producer may continue generating events (e.g. polling a sensor or keeping a socket open), causing resource and memory leaks.
- **Trap 3: Unbounded buffer memory spikes**:
  Using the default `.unbounded` buffer policy on high-frequency producers (like accelerometer or real-time camera frames) can rapidly exhaust device RAM if the consumer thread lags behind.
