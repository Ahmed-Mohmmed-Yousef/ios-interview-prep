# Research: Stacks and Queues

## 1. Core Concepts & Technical Facts

### Stack Data Structure
- **Principle**: LIFO (Last-In, First-Out).
- **Core Operations**:
  - `push(element)`: Adds an item to the top. $\mathcal{O}(1)$ amortized time.
  - `pop()`: Removes and returns the top item. $\mathcal{O}(1)$ time.
  - `peek()`: Inspects the top item without removing it. $\mathcal{O}(1)$ time.
  - `isEmpty`: Checks whether elements exist. $\mathcal{O}(1)$ time.
- **Swift Implementation**:
  - Standard `Array` serves as an efficient stack:
    - `append(_:)` acts as `push`.
    - `popLast()` acts as `pop` (returns optional `Element?`).
    - `last` acts as `peek` (returns optional `Element?`).
  - All operations run in $\mathcal{O}(1)$ amortized time with contiguous memory cache locality.
- **Monotonic Stack Pattern**:
  - A stack that maintains elements in monotonically increasing or decreasing order.
  - Useful for finding the "next greater element" or "previous smaller element" in $\mathcal{O}(n)$ total time across the entire array.

### Queue Data Structure
- **Principle**: FIFO (First-In, First-Out).
- **Core Operations**:
  - `enqueue(element)`: Inserts element at the back. $\mathcal{O}(1)$ time.
  - `dequeue()`: Removes element from the front. $\mathcal{O}(1)$ time.
  - `peek()`: Inspects the front element without removal. $\mathcal{O}(1)$ time.
- **The Swift Array Queue Trap**:
  - Calling `array.removeFirst()` on an ordinary Swift array requires shifting all subsequent elements left in memory.
  - Time complexity of `removeFirst()` is $\mathcal{O}(n)$.
  - Dequeuing $n$ elements using `array.removeFirst()` takes quadratic $\mathcal{O}(n^2)$ time.
- **Efficient Queue Approaches in Swift**:
  1. **Two Stacks Queue**: One stack for enqueuing (`inbox`), one for dequeuing (`outbox`). When `outbox` is empty, transfer all items from `inbox` in reversed order. Amortized $\mathcal{O}(1)$ time per operation.
  2. **Ring / Circular Buffer**: Fixed-size contiguous buffer with head and tail index wrapping modulo capacity. $\mathcal{O}(1)$ time.
  3. **`Deque` from `apple/swift-collections`**: Official Apple package providing a double-ended queue backed by a ring buffer with $\mathcal{O}(1)$ insertion and removal at both ends.
  4. **Linked List**: Nodes with `head` and `tail` pointers. $\mathcal{O}(1)$ operations, but lacks array cache locality.

---

## 2. Common Misconceptions & Traps

1. **Using `Array.removeFirst()` for a queue**:
   - $\mathcal{O}(n)$ per dequeue shifts memory. In interviews, explain this trade-off and propose a two-stack queue, ring buffer, or `Deque`.
2. **Forgetting to check `stack.isEmpty` at the end of bracket matching**:
   - If an input string has extra opening brackets (e.g. `"((("`), matching never fails during iteration, but the stack remains non-empty. The final result must check `stack.isEmpty`.
3. **Popping from an empty stack**:
   - Calling `removeLast()` on an empty array crashes with a fatal error. Use `popLast()` which safely returns `nil`.
4. **Monotonic stack order confusion**:
   - To find the next greater element, maintain a monotonically decreasing stack so smaller elements are popped when a greater element arrives.

---

## 3. Interview Questions by Level

### Fresh
- What is the difference between LIFO and FIFO?
- How can you implement a stack in Swift using standard Array?
- Why does `Array.removeFirst()` take $\mathcal{O}(n)$ time?

### Junior
- Implement a Valid Parentheses checker for `"()[]{}"` using a stack.
- Implement an efficient Queue using two stacks with amortized $\mathcal{O}(1)$ operations.
- How does a monotonic stack solve the Next Greater Element problem in $\mathcal{O}(n)$ time?
- When would you use Apple's `Deque` from `swift-collections` in production iOS apps?

### Senior / Staff
- How does `Deque` in `apple/swift-collections` manage internal circular buffers and chunked allocations?
- How do you design an undo/redo manager with capacity limits for a mobile text editor?
- How would you implement a lock-free or concurrent bounded queue for audio/graphics processing in iOS?

---

## 4. Sources

- **Official**: [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array)
- **Official**: [GitHub: apple/swift-collections (Deque)](https://github.com/apple/swift-collections)
- **Community**: [Tech Interview Handbook: Stack Cheatsheet](https://www.techinterviewhandbook.org/algorithms/stack/)
- **Community**: [Tech Interview Handbook: Queue Cheatsheet](https://www.techinterviewhandbook.org/algorithms/queue/)
