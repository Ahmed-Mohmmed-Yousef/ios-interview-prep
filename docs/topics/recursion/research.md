# Research: Recursion

## 1. Core Concepts & Technical Facts

### Recursive Function Mechanics
- **Definition**: A function that calls itself directly or indirectly to solve smaller instances of the same problem.
- **Two Essential Components**:
  1. **Base Case**: A terminating condition that returns a value immediately without making further recursive calls.
  2. **Recursive Step (Inductive Step)**: Decomposes the problem into smaller subproblems and calls the function with inputs that strictly progress toward the base case.
- **The Call Stack**:
  - Each invocation creates an activation record (stack frame) in thread memory, preserving parameters, local variables, and the return address.
  - Stack frames accumulate until a base case is reached, after which they unwind in LIFO order.
- **Complexity**:
  - Time complexity: Count of recursive nodes multiplied by the work performed per call.
    - Example: Linear recursion like factorial takes $\mathcal{O}(n)$.
    - Example: Naive Fibonacci $T(n) = T(n-1) + T(n-2)$ takes exponential $\mathcal{O}(2^n)$ time due to a branching binary call tree.
  - Space complexity: $\mathcal{O}(d)$, proportional to the maximum depth of the call stack tree.

### Tail Recursion & Swift Compiler Behavior
- **Tail Call**: A function call performed as the final action in a execution path, returning the result directly without post-call operations.
- **Tail Call Optimization (TCO)**:
  - Replaces the current stack frame with the callee's frame, reducing call stack growth to $\mathcal{O}(1)$ space.
  - **In Swift**: TCO is an optimization performed by LLVM under release builds (`-O`), but it is **not guaranteed** by the Swift language specification. ARC retain/release operations and debug configurations frequently prevent TCO. Never rely on TCO for algorithm correctness or stack overflow prevention in Swift.

### Recursive Patterns in Interviews
- **Divide and Conquer**: Break problem into independent subproblems, solve recursively, and merge results (e.g. MergeSort, binary search).
- **Tree and Graph Traversal**: Natural recursive structures where each child node is the root of its own subtree (Preorder, Inorder, Postorder, DFS).
- **Backtracking**: Systematically exploring combinations (subsets, permutations, pathfinding), undoing state modifications when a path fails.
- **Memoization**: Storing computed results in a hash table or array (top-down dynamic programming) to eliminate overlapping subproblems (e.g., reducing Fibonacci from $\mathcal{O}(2^n)$ to $\mathcal{O}(n)$).
- **Recursion to Iteration**: Any recursive algorithm can be converted to an iterative loop using an explicit `Array` stack.

---

## 2. Common Misconceptions & Traps

1. **Missing or unreachable base cases**:
   - Omitting base cases causes endless recursive calls, exhausting stack memory and triggering a `EXC_BAD_ACCESS` / Stack Overflow crash.
2. **Inputs that fail to progress toward the base case**:
   - Calling `recurse(n)` instead of `recurse(n - 1)` or mishandling negative inputs causes infinite recursion.
3. **Ignoring call stack space in Big-O analysis**:
   - Candidates often claim recursive algorithms use $\mathcal{O}(1)$ space because they allocate no arrays. The call stack depth is auxiliary space and must be counted ($\mathcal{O}(n)$ stack frames).
4. **Relying on Tail Call Optimization in Swift**:
   - Assuming Swift optimizes tail calls like Scheme or Haskell. If depth exceeds thread stack limits (typically 512 KB to 1 MB on iOS), apps will crash.
5. **Overlapping subproblems explosion**:
   - Naive recursion on branching problems without memoization recalculates the same subproblems millions of times.

---

## 3. Interview Questions by Level

### Fresh
- What is a base case in a recursive function, and what happens if you omit it?
- What is the difference between recursion and iteration?
- Why does recursion consume memory even if no arrays are allocated?

### Junior
- Implement a recursive function to compute the factorial of a positive integer.
- How does memoization optimize a recursive Fibonacci function from $\mathcal{O}(2^n)$ to $\mathcal{O}(n)$?
- Can you convert a recursive Depth-First Search into an iterative loop in Swift?
- Does Swift guarantee Tail Call Optimization? Why or why not?

### Senior / Staff
- How does the iOS thread stack limit affect deep recursion, and how do you protect production code against stack overflow crashes?
- How do compiler optimizations and ARC deinitialization interact with tail calls in the SIL (Swift Intermediate Language)?
- When should you choose iterative worklists with explicit heap stacks over native recursion in high-scale graph processing?

---

## 4. Sources

- **Official**: [Swift Programming Language: Functions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions/)
- **Official**: [Apple Developer Documentation: Standard Library](https://developer.apple.com/documentation/swift)
- **Community**: [Tech Interview Handbook: Recursion Cheatsheet](https://www.techinterviewhandbook.org/algorithms/recursion/)
