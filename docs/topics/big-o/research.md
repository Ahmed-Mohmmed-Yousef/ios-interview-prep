# Research — Big-O: Time and Space (Step 1)

Researched 2026-11-09. Topic: `big-o` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [Array](https://developer.apple.com/documentation/swift/array)**
- **Random Access (`array[i]`)**: Conforms to `RandomAccessCollection`. Reads and writes by integer index in $\mathcal{O}(1)$ constant time.
- **`append(_:)`**: Constant $\mathcal{O}(1)$ amortized time. Reallocates and doubles storage capacity when full ($\mathcal{O}(n)$ worst-case reallocation), but over many appends the average cost per append is $\mathcal{O}(1)$. `reserveCapacity(_:)` preallocates memory to guarantee strict $\mathcal{O}(1)$ appends without reallocations.
- **`insert(_:at:)` and `remove(at:)`**: Linear $\mathcal{O}(n)$ time where $n$ is the number of elements after the index that must shift in contiguous memory. Inserting at index 0 shifts all $n$ elements ($\mathcal{O}(n)$).
- **`contains(_:)`**: Linear $\mathcal{O}(n)$ time. Performs a sequential linear search from index 0 until a match is found or the end is reached.
- **`sort()` and `sorted()`**: $\mathcal{O}(n \log n)$ time. Uses a modified Introsort/Timsort hybrid algorithm guaranteeing $\mathcal{O}(n \log n)$ worst-case performance.

**Apple Developer Documentation — [String](https://developer.apple.com/documentation/swift/string)**
- **`count` property**: Linear $\mathcal{O}(n)$ time. Swift strings are collections of **extended grapheme clusters** (composed characters like accented letters or multi-scalar emoji sequences). Swift must inspect Unicode scalar boundaries across the string to count characters.
- **`isEmpty` property**: Constant $\mathcal{O}(1)$ time. Checks whether `startIndex == endIndex` without traversing the string. Checking `string.count == 0` is an anti-pattern.
- **Integer indexing**: Swift strings do not support integer indexing (`str[0]` does not compile). Index traversal via `index(_:offsetBy:)` takes $\mathcal{O}(k)$ time where $k$ is the offset.

**Apple Developer Documentation — [Dictionary](https://developer.apple.com/documentation/swift/dictionary) & [Set](https://developer.apple.com/documentation/swift/set)**
- **Lookups, insertions, removals**: $\mathcal{O}(1)$ average time complexity using hash tables.
- Degrades to $\mathcal{O}(n)$ in the pathological worst-case scenario where hash collisions force linear probing across all entries.

**Tech Interview Handbook & Swift Algorithms — [Study Cheatsheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/)**
- **Big-O definition**: Describes how runtime or memory consumption scales as input size $n$ approaches infinity.
- **Simplification rules**:
  1. Drop constant factors: $\mathcal{O}(2n) \rightarrow \mathcal{O}(n)$, $\mathcal{O}(500) \rightarrow \mathcal{O}(1)$.
  2. Drop lower-order terms: $\mathcal{O}(n^2 + 3n + 10) \rightarrow \mathcal{O}(n^2)$.
- **Common Big-O categories** (fastest to slowest):
  1. $\mathcal{O}(1)$ — Constant: Array index lookup, checking `isEmpty`, dictionary key lookup.
  2. $\mathcal{O}(\log n)$ — Logarithmic: Binary search on sorted data (halving candidate space each step).
  3. $\mathcal{O}(n)$ — Linear: Single loop, linear search, `String.count`, `Array.insert(at: 0)`.
  4. $\mathcal{O}(n \log n)$ — Linearithmic: Efficient comparison sorts (`Array.sort()`, merge sort).
  5. $\mathcal{O}(n^2)$ — Quadratic: Nested loops over the same input array (naive two-sum).
  6. $\mathcal{O}(2^n)$ — Exponential: Naive recursive tree calculations (e.g. unmemoized Fibonacci).
- **Space complexity**:
  - Measures auxiliary memory allocated during execution.
  - Creating an array of $n$ items takes $\mathcal{O}(n)$ space.
  - Call stack frames in recursion consume memory: $n$ recursive calls deep consume $\mathcal{O}(n)$ stack space.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Array subscript | `arr[0]` | $\mathcal{O}(1)$ instant access |
| `String.isEmpty` vs `count == 0` | `"hello".isEmpty` | $\mathcal{O}(1)$ check vs $\mathcal{O}(n)$ scan |
| Grapheme cluster complexity | `"👨‍👩‍👧‍👦".count` | Evaluates to 1 character across 25 UTF-8 bytes |
| Set lookup speed | `set.contains(item)` | $\mathcal{O}(1)$ average lookup |
| Array linear search | `arr.contains(item)` | $\mathcal{O}(n)$ scan |
| Nested loop complexity | Two nested `for` loops | $\mathcal{O}(n^2)$ iterations |
| Stack space in recursion | Recursive calls | Stack frame allocated per frame level |

## 3. Common wrong ideas (traps)

1. **"Calling `string.count` is $\mathcal{O}(1)$ like `array.count`."** False. Swift characters are extended grapheme clusters. Swift must walk the Unicode scalars to find cluster boundaries. `string.count` is $\mathcal{O}(n)$. Always use `string.isEmpty` ($\mathcal{O}(1)$) to check if a string is empty.
2. **"`array.insert(x, at: 0)` is as fast as `array.append(x)`."** False. Appending adds to the end in amortized $\mathcal{O}(1)$ time. Inserting at index 0 shifts all $n$ items in memory, costing $\mathcal{O}(n)$ time.
3. **"`array.contains(x)` inside a loop is $\mathcal{O}(n)$."** False. If the outer loop runs $n$ times and each iteration runs `array.contains(x)` ($\mathcal{O}(n)$), the total runtime is $\mathcal{O}(n^2)$. Converting the array to a `Set` reduces the total runtime to $\mathcal{O}(n)$ because Set lookups are $\mathcal{O}(1)$.
4. **"Recursive functions with no variables use $\mathcal{O}(1)$ space."** False. Each recursive function call pushes a new stack frame onto the system call stack. A recursion depth of $n$ uses $\mathcal{O}(n)$ call stack memory.
5. **"Dictionary lookups are always guaranteed to be $\mathcal{O}(1)$."** False. They are $\mathcal{O}(1)$ on average. In the worst-case scenario with extreme hash collisions, dictionary operations degrade to $\mathcal{O}(n)$.

## 4. Real interview questions by level

- **Fresh**:
  - What is Big-O notation, and why do interviewers care about it?
  - What is the time complexity of accessing an array element by index versus searching for an element with `contains`?
  - Why is `string.isEmpty` better than `string.count == 0` in Swift?
  - What is space complexity, and does recursion use extra space?
- **Junior**:
  - What is the difference between $\mathcal{O}(1)$ and amortized $\mathcal{O}(1)$ for `Array.append`?
  - How do you optimize an $\mathcal{O}(n^2)$ lookup algorithm using a `Set` or `Dictionary`?
  - How does binary search achieve $\mathcal{O}(\log n)$ time, and what is its prerequisite?
