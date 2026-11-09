# Research — Closures: Escaping and Capture Lists (Step 1)

**Topic**: `closures-escaping-capture`  
**Level**: Junior  
**Target Baseline**: Swift 6.4, iOS 18+ SDK  
**Sources**:
- [The Swift Programming Language: Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures)
- [The Swift Programming Language: Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting)
- [SE-0269: Increased availability of implicit self in closures](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0269-implicit-self-explicit-capture.md)

---

## 1. Key Concepts & Compiler Mechanics

### A. Escaping vs Non-Escaping Closures
- Since Swift 3, closure parameters are **non-escaping by default**.
- A non-escaping closure executes synchronously within the function body before the function returns.
- An **escaping closure** is passed as an argument to a function, but is called after the function returns (e.g. stored in a property, scheduled on a background queue, or passed to an asynchronous completion handler).
- Escaping closures require the `@escaping` attribute before the closure parameter type: `completion: @escaping () -> Void`.
- Attempting to assign a non-escaping closure to a stored property or pass it to an escaping context produces:  
  `error: assigning non-escaping parameter 'action' to an '@escaping' closure`.
- Performance benefit: Non-escaping closures do not require memory allocation on the heap because their lifetime is tied to the stack frame of the enclosing function.

### B. Capture Lists & Value Types
- By default, closures capture constants and variables from surrounding scope **by reference**. If the variable changes later, the closure reads the updated value.
- When an explicit capture list is provided, such as `{ [count] in ... }`, a copy of the value type is captured at the moment the closure is created and stored as an immutable constant inside the closure.
- Example:
  ```swift
  var count = 0
  let copyClosure = { [count] in print(count) }
  let refClosure = { print(count) }
  count = 10
  copyClosure() // 0
  refClosure()  // 10
  ```

### C. Strong Reference Cycles & `[weak self]`
- When a class instance holds a reference to a closure (e.g. as a stored property), and the closure captures `self` strongly, a **retain cycle** (strong reference cycle) is formed. Neither can ever be deallocated.
- Capture lists break this cycle:
  - `[weak self]`: Captures `self` as an optional reference (`Self?`). When the instance deallocates, ARC automatically zeroes the reference to `nil`.
  - `[unowned self]`: Captures `self` as a non-optional reference. Assumes `self` will always be alive when the closure runs. If `self` has already deallocated, accessing `unowned self` crashes at runtime (`Fatal error: Attempted to read an unowned reference but the object was already deallocated`).
- `guard let self = self else { return }` is the standard Swift pattern to safely unwrap a weak reference and ensure the instance stays alive for the duration of the closure block.

### D. Explicit `self` in Closures
- Inside an escaping closure, referring to properties or methods of `self` requires explicit `self.` or including `self` in a capture list:
  - `error: reference to property 'x' in closure requires explicit use of 'self' to make capture semantics explicit`
- In Swift 5.3+ (SE-0269), writing `[self]` or `[weak self]` in the capture list enables implicit `self` inside the closure body.

---

## 2. Common Interview Traps

1. **Thinking non-escaping closures can cause retain cycles**: Non-escaping closures run synchronously and are released before the function returns; they cannot cause retain cycles.
2. **Assuming `[unowned self]` is always safe**: If the closure runs asynchronously (e.g. network callback) and the view controller was popped, `[unowned self]` crashes. `[weak self]` is safer for asynchronous tasks.
3. **Believing capture lists only apply to `self`**: Capture lists work with any variable, including value types to capture values by copy.
4. **Confusing closure capture with function parameter passing**: Closures capture surrounding variables by reference by default, whereas function parameters in Swift are constants passed by value unless marked `inout`.

---

## 3. Interview Answers by Level

- **Fresh**: Closures can capture variables from surrounding code. By default, closures are non-escaping and run before the function returns. When a closure runs later, like after a network call, it must be marked `@escaping`. We use `[weak self]` to avoid memory leaks.
- **Junior**: In Swift, closure parameters are non-escaping by default, which enables compiler stack allocation optimizations. If a closure is stored or executed after the function returns, it must be marked `@escaping`. When an escaping closure captures a class instance strongly and that instance retains the closure, a retain cycle occurs. Capture lists like `[weak self]` break the cycle by creating an optional, non-retaining reference that ARC zeroes when the object deallocates.
- **Senior**: Escaping closures extend past the execution frame and are allocated on the heap, requiring explicit lifecycle management. Using `[weak self]` in completion handlers prevents strong reference cycles with view models or controllers. Value capture lists (`[count]`) capture immutable value snapshots at definition time rather than mutable storage references. For modern Swift concurrency, `async/await` and structured concurrency replace many escaping completion handlers, eliminating retain cycle risks while retaining strict compiler isolation.
