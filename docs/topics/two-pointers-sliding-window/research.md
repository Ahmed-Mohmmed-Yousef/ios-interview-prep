# Research: Two Pointers and Sliding Window

## 1. Core Concepts & Technical Facts

### Two Pointers Pattern
- **Opposite Ends (Convergent)**:
  - Start one pointer at index 0 (`left`) and one pointer at index `count - 1` (`right`).
  - Move inward based on comparison: `left += 1` or `right -= 1` until `left >= right`.
  - Classic interview problems:
    - Palindrome verification: check `chars[left] == chars[right]`.
    - Sorted Two Sum: if `arr[left] + arr[right] > target`, decrement `right`; if `< target`, increment `left`.
    - Container With Most Water: advance pointer with smaller height.
    - Reverse array or string in-place: swap elements at `left` and `right`.
- **Same Direction (Fast and Slow Pointers / Reader-Writer)**:
  - `slow` writes or tracks unique elements; `fast` scans forward through every element.
  - Classic problems: Remove duplicates from sorted array in-place, move zeros to end, partition.
- **Complexity**:
  - Time complexity: $\mathcal{O}(n)$ because each pointer advances at most $n$ times.
  - Space complexity: $\mathcal{O}(1)$ auxiliary space.

### Sliding Window Pattern
- **Fixed-Size Window**:
  - Window of fixed width $k$.
  - First, compute sum or state for first $k$ elements (`0 ..< k`).
  - Then slide the window across array: subtract element leaving on left (`arr[i - k]`), add incoming element on right (`arr[i]`).
  - Complexity: $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space, compared to $\mathcal{O}(n \cdot k)$ brute force.
- **Variable-Size (Dynamic) Window**:
  - Two pointers: `left` (window start) and `right` (window end).
  - Expand window by advancing `right` to include elements until a condition is satisfied (or violated).
  - Shrink window by advancing `left` to restore invariant or minimize window size.
  - Classic problems: Longest substring without repeating characters, minimum window substring, minimum size subarray sum.
  - Complexity: Amortized $\mathcal{O}(n)$ time because `left` and `right` each move forward at most $n$ times.

### Swift Specifics & String Indexing
- Swift `String` uses extended grapheme clusters; indices are `String.Index`, not random-access integer offsets.
- Calling `string.index(string.startIndex, offsetBy: i)` inside a loop turns an $\mathcal{O}(n)$ two-pointer algorithm into an accidental $\mathcal{O}(n^2)$ algorithm.
- Best practice in Swift coding interviews: convert `String` to `Array(string)` in $\mathcal{O}(n)$ time once, then use fast random-access $\mathcal{O}(1)$ integer indexing.

---

## 2. Common Misconceptions & Traps

1. **Applying convergent two pointers to an unsorted array**:
   - The two-pointer Two Sum algorithm relies on monotonic property ($arr[left] + arr[right]$ increases with left and decreases with right). On unsorted arrays, use a hash map.
2. **Accidental $\mathcal{O}(n^2)$ string indexing**:
   - Repeatedly offsetting `String.Index` in a loop.
3. **Off-by-one window length**:
   - Length of window between indices `left` and `right` inclusive is `right - left + 1`, not `right - left`.
4. **Shrinking with `if` instead of `while`**:
   - In dynamic sliding window, adding one element on the right might violate the constraint multiple times. Shrinking must use `while` to restore the invariant completely.
5. **Inner loop fallacy**:
   - Mistaking a `while` loop inside a `for` loop for $\mathcal{O}(n^2)$. Because `left` only moves forward and never resets backward, total `left` movements are at most $n$, ensuring amortized $\mathcal{O}(n)$ time.

---

## 3. Interview Questions by Level

### Fresh
- What is the difference between two pointers moving inward and two pointers moving in the same direction?
- How does the sliding window pattern avoid recalculating overlapping subproblems?
- What is the time complexity of checking if a string is a palindrome using two pointers?

### Junior
- Implement an in-place removal of duplicates from a sorted array returning the new length.
- Implement the sliding window maximum sum subarray of size $k$.
- Why does a dynamic sliding window with an inner `while` loop have an amortized $\mathcal{O}(n)$ time complexity?
- How do you handle Swift string indexing when solving two-pointer substring problems?

### Senior / Staff
- How would you design a sliding window rate limiter or telemetry aggregator for real-time streaming data?
- How do you generalize sliding window to multiple constraints (e.g., Minimum Window Substring with character frequencies)?
- How do you optimize memory and cache locality when sliding windows over contiguous memory buffers?

---

## 4. Sources

- **Official**: [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array)
- **Official**: [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string)
- **Official**: [Apple Developer Documentation: Collection](https://developer.apple.com/documentation/swift/collection)
- **Community**: [Tech Interview Handbook: Array Cheatsheet](https://www.techinterviewhandbook.org/algorithms/array/)
