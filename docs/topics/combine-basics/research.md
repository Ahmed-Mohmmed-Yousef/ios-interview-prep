# Topic Research: Combine Basics

**Topic ID:** `combine-basics`  
**Level:** Mid  
**Prerequisites:** `closures-escaping-capture`, `observable-object`  
**Date Researched:** 2026-11-10  
**Target Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Official Documentation & Authoritative Sources

1. **Combine Framework Documentation (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/combine  
   *Summary:* Combine provides a declarative Swift API for processing values over time. It standardizes asynchronous event handling using publishers that emit values and subscribers that receive them.

2. **Receiving and Handling Events with Combine (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/combine/receiving-and-handling-events-with-combine  
   *Summary:* Explains how to create a subscriber via `sink(receiveCompletion:receiveValue:)`, attach it to a publisher, and manage subscription lifecycle with `AnyCancellable`.

3. **Subscribers.Sink (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/combine/subscribers/sink  
   *Summary:* A closure-based subscriber that requests unlimited elements upon subscription and executes user blocks on value arrival and stream completion.

4. **Subject Protocol & Implementations (Apple Developer Documentation)**  
   URL: https://developer.apple.com/documentation/combine/subject  
   *Summary:* Details `PassthroughSubject` (stateless event broadcaster) and `CurrentValueSubject` (stateful publisher wrapping an active initial value and buffering the latest emission).

---

## 2. Core Technical Concepts

### A. The Three Pillars of Combine
- **`Publisher`:** Protocol declaring types that produce a sequence of values over time (`Output`) and can terminate with a completion (`Failure`).
- **`Subscriber`:** Protocol declaring types that receive elements and completion events from publishers.
- **`Subscription`:** Represents the connection between a publisher and a subscriber, governing demand and backpressure.

### B. Lifecycle and AnyCancellable
- **Automatic Cancellation:** Subscribing via `sink` or `assign` returns an `AnyCancellable` instance.
- **Storage Requirement:** If `AnyCancellable` is not stored in a persistent container (e.g. `Set<AnyCancellable>`), it deinitializes immediately, automatically calling `cancel()` and tearing down the stream.
- **Memory Safety:** When an owning object (like a UIViewController or ViewModel) deallocates, its `Set<AnyCancellable>` deinitializes and cancels all active subscriptions, preventing memory leaks and dangling closures.

### C. Subjects and Operators
- **`PassthroughSubject`:** Relays values injected via `.send(_:)` without caching or remembering past values.
- **`CurrentValueSubject`:** Holds a current `.value` and replays it immediately to any new subscriber upon connection.
- **Operators:** Transform streams fluently:
  - `map`: Transforms each emitted element.
  - `filter`: Discards elements that fail a boolean predicate.
  - `debounce(for:scheduler:)`: Delays emissions until a pause in fast-firing streams (e.g., search text inputs).
  - `removeDuplicates`: Filters out sequential identical values.

### D. Combine vs Swift Concurrency
- Swift Concurrency (`async`/`await`, `AsyncStream`, `AsyncSequence`) is Apple primary direction for asynchronous Swift 6 code.
- Combine remains essential for maintaining existing production codebases, UIKit reactive view models, and older SwiftUI architectures.

---

## 3. Common Interview Questions & Traps

1. **What happens if you do not store the `AnyCancellable` returned by `.sink()`?**  
   The returned `AnyCancellable` falls out of scope and deinitializes immediately. Its deinitializer calls `cancel()`, terminating the subscription before values can be received.
2. **What is the difference between `PassthroughSubject` and `CurrentValueSubject`?**  
   `PassthroughSubject` has no initial value and does not store the latest emission; new subscribers only receive future events. `CurrentValueSubject` requires an initial value, exposes it via `.value`, and replays it immediately to new subscribers.
3. **Why does `assign(to: \.property, on: self)` cause a retain cycle?**  
   `assign(to:on:)` creates a strong reference to `self`. If `self` also stores the returned `AnyCancellable`, a strong reference cycle is formed (`self -> cancellable -> self`). Use `sink { [weak self] in ... }` or `@Published`'s `assign(to: &$property)` to avoid the leak.
4. **How does Combine handle backpressure?**  
   Subscribers communicate demand via `Subscribers.Demand` during subscription setup (`request(_:)`), ensuring publishers do not overwhelm slow subscribers with high-volume data streams.
