# Rubric Test: Combine Basics

**Topic:** `combine-basics`  
**Date:** 2026-11-10  
**Tested Questions:** 8 open questions (5 written + 3 code-write)  
**Total Sample Evaluations:** 24 (Good, Average, Weak per question)

---

## Question 24 (Written): Role of AnyCancellable

**Prompt:** Explain the role of AnyCancellable and what happens if it is not stored. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "AnyCancellable represents the active lifetime of a Combine subscription. If you do not store the returned AnyCancellable token in a property or Set, it deallocates immediately when the local function scope ends. Its deinitializer automatically calls cancel(), terminating the subscription before asynchronous values can arrive."
- **Expected Score:** 100% (Met: manages subscription lifetime 50%, Met: deallocates on scope exit and cancels 50%)
- **Rationale:** Accurately explains both token lifetime management and immediate cancellation on scope exit.

### Sample 2: Average
- **Answer:** "AnyCancellable keeps the subscription alive while you need values. If you forget to store it in a cancellable bag, it gets freed when the function ends and cancels your pipeline right away."
- **Expected Score:** 100% (Met: lifetime 50%, Met: deallocates and cancels 50%)
- **Rationale:** Clear and accurate explanation in plain words.

### Sample 3: Weak
- **Answer:** "AnyCancellable is a protocol that formats numbers into strings for UI buttons."
- **Expected Score:** 0% (Not Met: lifetime 0%, Not Met: deallocate 0%)
- **Rationale:** Completely unrelated definition with no mention of stream cancellation.

---

## Question 25 (Written): PassthroughSubject vs CurrentValueSubject

**Prompt:** Explain the difference between PassthroughSubject and CurrentValueSubject. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "PassthroughSubject broadcasts events to active subscribers without storing or buffering past elements, meaning new subscribers only receive future events. In contrast, CurrentValueSubject requires an initial value and retains its latest element in memory. Any new subscriber immediately receives the current value upon connecting."
- **Expected Score:** 100% (Met: Passthrough does not buffer 50%, Met: CurrentValue retains and replays 50%)
- **Rationale:** Clearly differentiates event broadcasting from buffered state replay.

### Sample 2: Average
- **Answer:** "PassthroughSubject does not remember previous values and only sends new ones to current listeners. CurrentValueSubject holds on to the latest value with an initial state and hands it to any new subscriber."
- **Expected Score:** 100% (Met: Passthrough no buffer 50%, Met: CurrentValue replay 50%)
- **Rationale:** Captures the essential behavioral distinction cleanly.

### Sample 3: Weak
- **Answer:** "PassthroughSubject is only for SwiftUI buttons while CurrentValueSubject is only for UIKit sliders."
- **Expected Score:** 0% (Not Met: Passthrough 0%, Not Met: CurrentValue 0%)
- **Rationale:** Erroneously limits framework types to specific UI controls.

---

## Question 26 (Written): assign(to:on:) Retain Cycles

**Prompt:** Why can assign(to:on: self) cause a retain cycle and how can you fix it? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "The operator assign(to:on: self) holds a strong reference to the target instance. If that same instance stores the returned AnyCancellable in a property, a strong reference cycle is created (self -> cancellable -> self). To prevent memory leaks, developers should use sink with a [weak self] capture list or use assign(to: &$property) on @Published properties."
- **Expected Score:** 100% (Met: strong reference cycle 50%, Met: fix with weak self or assign to published 50%)
- **Rationale:** Explicitly describes the retain loop and both recommended remediation techniques.

### Sample 2: Average
- **Answer:** "It creates a retain cycle because assign holds a strong reference to self, and self stores the cancellable. You can fix this by using sink with weak self instead."
- **Expected Score:** 100% (Met: retain cycle 50%, Met: weak self fix 50%)
- **Rationale:** Correctly identifies the strong reference cycle and provides a valid fix.

### Sample 3: Weak
- **Answer:** "It causes a retain cycle because Swift arrays do not support Combine publishers."
- **Expected Score:** 0% (Not Met: retain cycle 0%, Not Met: fix 0%)
- **Rationale:** Irrelevant reference to arrays that misses the memory leak mechanism.

---

## Question 27 (Written): Debounce Operator Purpose

**Prompt:** Explain the purpose of the debounce operator and provide a practical iOS example. Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "The debounce operator waits for a specified time interval of quiet activity before emitting the latest value downstream. A practical iOS example is a search bar where users type rapidly. Debouncing by 300 milliseconds waits until the user pauses typing before initiating a search network request, avoiding dozens of redundant API calls."
- **Expected Score:** 100% (Met: quiet window delay 50%, Met: search bar example 50%)
- **Rationale:** Thoroughly describes the quiet window mechanics and provides the canonical search input use case.

### Sample 2: Average
- **Answer:** "Debounce waits for events to stop coming for a certain amount of time before sending the newest value. An example is a search field, where you wait for the user to pause typing before sending a search query."
- **Expected Score:** 100% (Met: delay 50%, Met: search field 50%)
- **Rationale:** Clear explanation with practical search field example.

### Sample 3: Weak
- **Answer:** "Debounce multiplies incoming numbers by two to make UI animations run faster."
- **Expected Score:** 0% (Not Met: delay 0%, Not Met: example 0%)
- **Rationale:** Completely incorrect explanation unrelated to event throttling.

---

## Question 28 (Written): Combine vs Swift Concurrency AsyncStream

**Prompt:** How does Combine compare with Swift Concurrency AsyncStream for handling asynchronous event sequences? Answer in 2–5 sentences.

### Sample 1: Good
- **Answer:** "Modern Swift prioritizes native language concurrency using async/await and AsyncStream, which integrate directly into Swift 6 task isolation and structured concurrency. However, Combine remains essential for supporting existing production codebases, reactive UIKit view models, and advanced multi-stream operator pipelines. Both frameworks co-exist effectively across iOS development."
- **Expected Score:** 100% (Met: Swift Concurrency prioritization 50%, Met: Combine role in existing code 50%)
- **Rationale:** Balanced comparison explaining modern language direction alongside existing Combine production value.

### Sample 2: Average
- **Answer:** "Swift Concurrency with AsyncStream is Apple primary choice for new iOS projects because of native task isolation. But Combine is still widely used to maintain existing production apps and UIKit reactive pipelines."
- **Expected Score:** 100% (Met: Swift Concurrency 50%, Met: Combine existing apps 50%)
- **Rationale:** Accurate summary of platform direction and framework coexistence.

### Sample 3: Weak
- **Answer:** "Combine was completely deleted in iOS 18 and can no longer be imported."
- **Expected Score:** 0% (Not Met: Concurrency 0%, Not Met: Combine 0%)
- **Rationale:** Factually false claim; Combine remains fully supported.

---

## Question 29 (Code-Write): multiplyPipeline Function

**Prompt:** Write a function multiplyPipeline(numbers: [Int], multiplier: Int) -> [Int] that converts numbers to a publisher, multiplies each by multiplier with map, and returns the array.

### Sample 1: Good
```swift
import Combine
import Foundation

func multiplyPipeline(numbers: [Int], multiplier: Int) -> [Int] {
    var output: [Int] = []
    _ = numbers.publisher
        .map { $0 * multiplier }
        .sink { output.append($0) }
    return output
}
```
- **Expected Score:** 100% (Met: numbers.publisher 40%, Met: map multiplier 40%, Met: sink return 20%)
- **Rationale:** Idiomatic Combine pipeline satisfying all rubric criteria.

### Sample 2: Average
```swift
import Combine
import Foundation

func multiplyPipeline(numbers: [Int], multiplier: Int) -> [Int] {
    var result: [Int] = []
    let cancellable = numbers.publisher
        .map { element in element * multiplier }
        .sink { value in result.append(value) }
    _ = cancellable
    return result
}
```
- **Expected Score:** 100% (Met: numbers.publisher 40%, Met: map 40%, Met: sink return 20%)
- **Rationale:** Correctly converts, transforms, and sinks values.

### Sample 3: Weak
```swift
func multiplyPipeline(numbers: [Int], multiplier: Int) -> [Int] {
    return numbers.map { $0 * multiplier }
}
```
- **Expected Score:** 40% (Not Met: numbers.publisher 0%, Met: map multiplication 40%, Not Met: sink subscription 0%)
- **Rationale:** Uses standard Swift Array.map instead of Combine publisher and subscriber pipeline.

---

## Question 30 (Code-Write): EventBroadcaster Class

**Prompt:** Create a class EventBroadcaster with a private PassthroughSubject, a send(message:) method, and a subscribe(action:) method returning AnyCancellable.

### Sample 1: Good
```swift
import Combine
import Foundation

final class EventBroadcaster {
    private let subject = PassthroughSubject<String, Never>()

    func send(message: String) {
        subject.send(message)
    }

    func subscribe(action: @escaping (String) -> Void) -> AnyCancellable {
        return subject.sink(receiveValue: action)
    }
}
```
- **Expected Score:** 100% (Met: PassthroughSubject 40%, Met: send method 30%, Met: subscribe returning cancellable 30%)
- **Rationale:** Complete, clean class design matching all rubric requirements.

### Sample 2: Average
```swift
import Combine
import Foundation

class EventBroadcaster {
    private let subject = PassthroughSubject<String, Never>()

    func send(message: String) {
        self.subject.send(message)
    }

    func subscribe(action: @escaping (String) -> Void) -> AnyCancellable {
        self.subject.sink { action($0) }
    }
}
```
- **Expected Score:** 100% (Met: PassthroughSubject 40%, Met: send 30%, Met: subscribe 30%)
- **Rationale:** Functional and fully compliant.

### Sample 3: Weak
```swift
class EventBroadcaster {
    var messages: [String] = []

    func send(message: String) {
        messages.append(message)
    }
}
```
- **Expected Score:** 0% (Not Met: PassthroughSubject 0%, Not Met: send to subject 0%, Not Met: subscribe 0%)
- **Rationale:** Implements a simple array buffer with no Combine publishers or subscriptions.

---

## Question 31 (Code-Write): filterPositiveNumbers Function

**Prompt:** Write a function filterPositiveNumbers(input: [Int]) -> [Int] that uses input.publisher with the filter operator to return an array of positive integers.

### Sample 1: Good
```swift
import Combine
import Foundation

func filterPositiveNumbers(input: [Int]) -> [Int] {
    var results: [Int] = []
    _ = input.publisher
        .filter { $0 > 0 }
        .sink { results.append($0) }
    return results
}
```
- **Expected Score:** 100% (Met: input.publisher 40%, Met: filter > 0 40%, Met: sink return 20%)
- **Rationale:** Idiomatic Combine usage satisfying all criteria.

### Sample 2: Average
```swift
import Combine
import Foundation

func filterPositiveNumbers(input: [Int]) -> [Int] {
    var positives = [Int]()
    let sub = input.publisher
        .filter { value in value > 0 }
        .sink { positives.append($0) }
    _ = sub
    return positives
}
```
- **Expected Score:** 100% (Met: input.publisher 40%, Met: filter 40%, Met: sink return 20%)
- **Rationale:** Fully working implementation meeting all criteria.

### Sample 3: Weak
```swift
func filterPositiveNumbers(input: [Int]) -> [Int] {
    var out: [Int] = []
    for item in input where item > 0 {
        out.append(item)
    }
    return out
}
```
- **Expected Score:** 0% (Not Met: input.publisher 0%, Not Met: filter operator 0%, Not Met: sink 0%)
- **Rationale:** Uses standard imperative for loop without Combine publishers or operators.
