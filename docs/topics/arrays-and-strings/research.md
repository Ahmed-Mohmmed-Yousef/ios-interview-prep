# Research — Arrays and Strings (Step 1)

Researched 2026-11-09. Topic: `arrays-and-strings` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [Array](https://developer.apple.com/documentation/swift/array)**
- **Memory Model**: Arrays store elements in contiguous blocks of memory. Random access via integer index takes $\mathcal{O}(1)$ time.
- **In-Place Mutation**:
  - `swapAt(_:_:)`: Swaps elements at specified indices in $\mathcal{O}(1)$ time without extra allocations.
  - `reverse()`: Reverses an array in-place in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space.
  - `reversed()`: Returns a `ReversedCollection` view wrapper in $\mathcal{O}(1)$ time without copying.
- **Array Slices (`ArraySlice<Element>`)**:
  - Subarray indexing (`array[2...4]`) creates an `ArraySlice` sharing storage with the original array.
  - Slices **retain original indices**: an `ArraySlice` created from `array[2...4]` has `startIndex == 2`. Calling `slice[0]` causes a runtime fatal error. Converting via `Array(slice)` reindexes from 0.

**Apple Developer Documentation — [String](https://developer.apple.com/documentation/swift/string)**
- **String Indexing**:
  - Swift strings do not support integer indexing (`str[0]` fails compilation).
  - Characters are extended grapheme clusters; indices use `String.Index` with `startIndex`, `endIndex`, and `index(_:offsetBy:)`.
  - For coding interviews, converting to `Array(string)` creates `[Character]` where integer indexing and `swapAt` work in $\mathcal{O}(1)$ time per operation, at an $\mathcal{O}(n)$ auxiliary space cost.
- **Substrings (`Substring`)**:
  - String slicing (`string[range]`) produces a `Substring` that shares storage with the base string. Convert to a new `String` when persisting to release the larger underlying storage buffer.

**Tech Interview Handbook — [Array](https://www.techinterviewhandbook.org/algorithms/array/) & [String](https://www.techinterviewhandbook.org/algorithms/string/)**
- **Two-Pointer Technique**:
  - **Opposing pointers**: One pointer at the start (`left = 0`) and one at the end (`right = count - 1`) moving inward. Ideal for reversing, palindrome verification, and pair sums on sorted collections.
  - **Fast and slow pointers**: Both pointers move in the same direction at different speeds or conditions. Ideal for in-place deduplication and array partitioning.
- **Sliding Window**:
  - A contiguous window `[left, right]` that expands to include new elements and contracts to satisfy constraints.
  - Useful for finding minimum/maximum subarrays or substrings of fixed size $k$ or variable conditions in $\mathcal{O}(n)$ time.
- **Prefix Sum**:
  - Cumulative sum array `prefix[i] = prefix[i-1] + nums[i-1]`.
  - Allows querying any range sum `nums[i...j]` in $\mathcal{O}(1)$ time via `prefix[j+1] - prefix[i]`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| In-place swap | `array.swapAt(i, j)` | Swaps elements in $\mathcal{O}(1)$ time without extra memory |
| Two pointers reverse | `while left < right { swapAt }` | Reverses collection in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space |
| Palindrome check | Two pointers comparing `chars[l] == chars[r]` | Evaluates palindrome in $\mathcal{O}(n)$ time |
| Fast/slow deduplication | In-place unique write on sorted array | Returns unique count and mutates prefix in $\mathcal{O}(n)$ time |
| ArraySlice index trap | `let slice = arr[2...4]; slice[2]` vs `slice[0]` | `slice[2]` succeeds; `slice[0]` crashes at runtime |
| Sliding window max sum | Rolling sum adding incoming and subtracting outgoing element | Computes max subarray sum of size $k$ in $\mathcal{O}(n)$ time |
| String array conversion | `Array("hello")` produces `[Character]` | Enables integer indexing and in-place swaps |

## 3. Common wrong ideas (traps)

1. **"You can index a Swift String with an integer like `str[i]`."** False. Swift strings do not conform to `RandomAccessCollection` with integer indices because characters are variable-length Unicode grapheme clusters. Indexing requires `String.Index` or converting to `Array(string)`.
2. **"An `ArraySlice` always starts at index 0."** False. An `ArraySlice` preserves the exact indices of the original array. Slicing `array[3...5]` means `slice.startIndex` is 3, and calling `slice[0]` crashes at runtime.
3. **"Concatenating strings inside a loop with `+=` is always linear."** False. Repeated string concatenation without reserving capacity can cause continuous reallocations and copies, degrading into an $\mathcal{O}(n^2)$ operation. Use an array of strings with `joined()` or reserve string capacity.
4. **"Off-by-one errors in two-pointer loops."** For reversing, use `left < right` (no need to swap middle item with itself). For palindrome checking, use `left < right` (or `left <= right`).
5. **"Modifying an array while iterating over it."** Calling `remove(at:)` inside a `for i in 0..<array.count` loop causes index out-of-bounds crashes because the array shrinks while the loop range remains unchanged. Use fast/slow pointers or filtering instead.

## 4. Real interview questions by level

- **Fresh**:
  - How do you reverse an array in-place without using extra memory?
  - How do you check if a string is a palindrome using the two-pointer technique?
  - Why can you not use an integer to index a Swift string directly?
  - What happens if you access index 0 on an `ArraySlice` taken from the middle of an array?
- **Junior**:
  - How do you remove duplicates from a sorted array in-place in $\mathcal{O}(1)$ space using fast and slow pointers?
  - How does a sliding window optimize finding the maximum sum of $k$ consecutive elements from $\mathcal{O}(n \cdot k)$ to $\mathcal{O}(n)$?
  - What is the difference between `ArraySlice` and `Array` regarding memory ownership and retain cycles?
