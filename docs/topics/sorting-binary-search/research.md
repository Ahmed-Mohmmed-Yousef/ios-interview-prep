# Research: Sorting and Binary Search

## 1. Core Concepts & Technical Facts

### Swift Standard Library Sorting
- **`sort()` vs `sorted()`**:
  - `sort()`: In-place mutation on a mutable array (`var`). Mutates the collection directly. Returns `Void`.
  - `sorted()`: Returns a new sorted array containing all elements. Safe on immutable arrays (`let`).
  - Elements must conform to `Comparable` or provide a predicate closure `by: (Element, Element) throws -> Bool`.
- **Complexity**:
  - Time complexity: $\mathcal{O}(n \log n)$ average and worst-case comparisons.
  - Space complexity: $\mathcal{O}(n)$ auxiliary space for `sorted()`, $\mathcal{O}(1)$ or minimal auxiliary buffer for in-place `sort()`.
- **Stability**:
  - Since Swift 5, Swift's sorting algorithm is guaranteed to be **stable**.
  - Equal elements preserve their original relative order after sorting.
  - The implementation uses a modified Timsort-based algorithm.
- **Predicates**:
  - Strict weak ordering is required: the predicate closure must return `false` when two elements are equal (e.g., `<` instead of `<=`). Violating strict weak ordering leads to undefined sorting behavior.

### Binary Search
- **Definition & Precondition**:
  - An efficient search algorithm that finds the target element in a sorted collection by repeatedly dividing the search interval in half.
  - **Absolute requirement**: The input collection must already be sorted according to the search criterion.
- **Complexity**:
  - Time complexity: $\mathcal{O}(\log n)$ time in both average and worst case.
  - Space complexity: $\mathcal{O}(1)$ auxiliary space for the iterative loop; $\mathcal{O}(\log n)$ auxiliary space for the recursive version due to call stack frames.
- **Midpoint calculation**:
  - In fixed-width integer arithmetic, calculating `(low + high) / 2` risks integer overflow if `low + high > Int.max`.
  - The standard interview-grade formulation is `low + (high - low) / 2`.
- **Variants**:
  - Exact match: Return index of target or `nil` if not found.
  - Leftmost / Lower bound: Find the first index where element is $\ge target$.
  - Rightmost / Upper bound: Find the first index where element is $> target$.
  - Rotated sorted array search: Identify which half is monotonically sorted, then branch.

---

## 2. Common Misconceptions & Traps

1. **Running binary search on an unsorted array**:
   - Binary search assumes monotonic order. On unsorted inputs, it discards valid halves and yields arbitrary, incorrect results.
2. **Midpoint arithmetic overflow**:
   - `(low + high) / 2` can overflow with large indices. Use `low + (high - low) / 2`.
3. **Off-by-one termination conditions**:
   - Using `while low < high` when search space includes `high`, missing the last candidate. Standard exact match requires `while low <= high`.
   - Failing to adjust `mid`: Setting `low = mid` or `high = mid` in an exact match loop causes infinite loops when `low + 1 == high`. Use `low = mid + 1` and `high = mid - 1`.
4. **Confusing `sort()` and `sorted()`**:
   - Calling `sort()` on `let` arrays results in a compiler error. Calling `sorted()` and ignoring the return value does nothing.
5. **Using `<=` instead of `<` in sort predicates**:
   - Swift predicates require strict weak ordering. Returning `true` for equal items violates the irreflexivity requirement and causes runtime crashes or corrupted sorts.

---

## 3. Interview Questions by Level

### Fresh
- What is the difference between `sort()` and `sorted()` in Swift?
- What is the prerequisite for using binary search on an array?
- What are the time complexities of linear search versus binary search?

### Junior
- Implement an iterative binary search in Swift returning `Int?`.
- Why do we write `low + (high - low) / 2` instead of `(low + high) / 2`?
- Is Swift's `sort()` stable or unstable? What does that mean for sorting records by multiple keys?
- How do you find the first occurrence of a duplicate value in a sorted array using binary search?

### Senior / Staff
- How does Swift implement sorting under the hood (Timsort variant with adaptive run merging)?
- How would you implement binary search over an infinite stream or monotonic function (binary search on answer)?
- How do you search a rotated sorted array in $\mathcal{O}(\log n)$ time without un-rotating?

---

## 4. Sources

- **Official**: [Apple Developer Documentation: Array.sort()](https://developer.apple.com/documentation/swift/array/sort())
- **Official**: [Apple Developer Documentation: Array.sorted()](https://developer.apple.com/documentation/swift/array/sorted())
- **Official**: [Apple Developer Documentation: Comparable](https://developer.apple.com/documentation/swift/comparable)
- **Community**: [Tech Interview Handbook: Sorting and Searching Cheatsheet](https://www.techinterviewhandbook.org/algorithms/sorting-searching/)
