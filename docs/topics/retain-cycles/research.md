# Research: Retain Cycles

## 1. Core Concepts & Technical Facts

### What is a Retain Cycle?
- A **retain cycle** (also known as a **strong reference cycle**) occurs when two or more class instances hold strong references to each other.
- Because each instance keeps the other alive, their strong reference counts never reach zero (`0`).
- ARC cannot deallocate these instances, leading to a permanent **memory leak** for the duration of the app session.

### Classic Scenarios in iOS Development

1. **Two Class Instances (Bidirectional Association)**:
   - Example: A `Person` owns an `Apartment` strongly, and the `Apartment` refers back to the `Person` strongly.
   - Resolution: Mark one side of the relationship `weak` (or `unowned` if lifetime is identical).

2. **Delegation Pattern**:
   - A `ViewController` creates and holds a `DataSource` or `NetworkManager` strongly.
   - The helper holds a strong reference to its delegate (`var delegate: CustomDelegate?`), which is the `ViewController`.
   - Resolution: Always declare delegate properties as `weak var delegate: CustomDelegate?` where `CustomDelegate: AnyObject`.

3. **Closures Capturing `self`**:
   - Closures are reference types allocated on the heap when capturing state.
   - If an instance holds a stored closure property (`var onUpdate: (() -> Void)?`) and the closure refers to `self` or any property of `self`, a strong reference cycle is formed:
     - `self` -> holds closure strongly
     - closure -> captures and holds `self` strongly
   - Resolution: Use a capture list `[weak self]` at the start of the closure.

### Escaping vs Non-Escaping Closures
- **Non-escaping closures** (`( (Int) -> Void )` without `@escaping`, such as `Array.map`, `Array.forEach`, or `DispatchQueue.sync`):
  - Execute synchronously within the current stack frame.
  - Do NOT cause retain cycles because they are discarded once the function returns. `[weak self]` is unnecessary here.
- **Escaping closures** (`@escaping`, such as asynchronous network handlers, notification closures, or stored properties):
  - Can outlive the function that created them.
  - Must use capture lists `[weak self]` if stored or held by objects that `self` also retains.

### The Modern `guard let self` Pattern
- In Swift 5.3+ and Swift 6:
  ```swift
  service.fetchData { [weak self] result in
      guard let self else { return }
      self.updateUI(with: result)
  }
  ```
- This captures `self` weakly. If `self` is still alive when the callback runs, `guard let self` creates a temporary strong reference on the stack for the duration of the closure block. If `self` has already deallocated, the closure returns early and safely.

### How to Detect Retain Cycles
1. **`deinit` Logging**: Putting `print("\(Self.self) deallocated")` in view controllers. If the log does not appear when popping or dismissing the screen, a retain cycle exists.
2. **Xcode Memory Graph Debugger**: Pauses the process and visualizes heap allocations. Purple warning marks highlight leaking reference cycles.
3. **Instruments (Leaks & Allocations)**: Profiling persistent heap allocations across repeated user journeys.
4. **Unit Tests**: Retaining a weak reference to a test object, releasing the strong reference, and asserting `XCTAssertNil(weakRef)`.

---

## 2. Common Misconceptions & Interview Traps

1. **"Every closure capturing `self` needs `[weak self]`"**:
   - *Correction*: Non-escaping closures (like `map`, `filter`, `forEach`, `UIView.animate`) do not retain `self` after execution and do not cause retain cycles.
2. **"Capturing `self.name` instead of `self` avoids the retain cycle"**:
   - *Correction*: Accessing a property of `self` inside a closure implicitly captures the entire `self` instance strongly.
3. **"Unowned self is always better if you know self will exist"**:
   - *Correction*: If an asynchronous network request returns after the user navigates away and dismisses the view controller, `unowned self` triggers a fatal crash. `[weak self]` is much safer.
4. **"Value types can have retain cycles"**:
   - *Correction*: Value types (structs and enums) are copied and do not have reference counts. A retain cycle can only occur between reference types (classes, actors, closures).

---

## 3. Interview Answers by Level

- **Fresh**:
  - Focus: What a retain cycle is (two objects holding strong references so neither can be freed), how it causes memory leaks, and how `weak` breaks the cycle.
- **Junior**:
  - Focus: Common causes (delegates and stored closures capturing `self`), how to break them using `weak var delegate` and `[weak self]`, and difference between escaping and non-escaping closures.
- **Senior**:
  - Focus: Diagnostic techniques (Memory Graph Debugger, Leaks Instrument, automated unit testing with weak references), memory side table costs, architectural patterns to decouple callbacks, and clean concurrency using Swift 6 actors and Tasks.

---

## 4. Official Sources & References

1. **The Swift Programming Language: Automatic Reference Counting**:
   - https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting
2. **WWDC21: ARC in Swift: Basics and beyond**:
   - https://developer.apple.com/videos/play/wwdc2021/10216/
