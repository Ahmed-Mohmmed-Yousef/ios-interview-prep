# Research — Arrays, Sets and Dictionaries (Step 1)

Researched 2026-11-09. Topic: `collections` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Collection Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/collectiontypes)**
- **Three Core Collection Types**:
  - **`Array`**: Ordered collections of values. Elements are accessed by zero-based integer index. Duplicates are allowed.
  - **`Set`**: Unordered collections of distinct values. Elements must conform to `Hashable`. Fast $O(1)$ membership lookup via `contains(_:)`. Set operations include `union`, `intersection`, `subtracting`, and `symmetricDifference`.
  - **`Dictionary`**: Unordered collections of key-value associations. Keys must conform to `Hashable`. Subscripting with a key returns an optional (`Value?`), which is `nil` if the key is not found.
- **Mutability & Value Semantics**:
  - Swift collections are value types (`struct`).
  - Declaring with `let` creates an immutable collection (cannot add, remove, or modify items).
  - Declaring with `var` creates a mutable collection.
  - Swift uses Copy-on-Write (COW) behind the scenes, so assigning a collection to a new variable does not duplicate memory until one copy is modified.
- **Subscripting & Safe Access**:
  - Array subscripting `arr[index]` traps with a fatal runtime error if the index is out of bounds (`index < 0` or `index >= count`).
  - Safe alternatives for boundary elements: `arr.first` and `arr.last` return `Element?` (nil when empty).
  - Dictionary subscript with default value: `dict[key, default: defaultValue]` returns non-optional `Value` and inserts the key with the default value if modified.
  - Removing a dictionary entry: setting `dict[key] = nil` or calling `dict.removeValue(forKey:)`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Array out of bounds | `[10, 20][2]` | Runtime trap: `Fatal error: Index out of range` |
| Safe first on empty array | `[Int]().first` | `nil` (`Int?`) |
| Set uniqueness | `Set([1, 1, 2]).count` | `2` |
| Set non-Hashable element | `Set<NonHashableStruct>()` | Compile error: `does not conform to protocol 'Hashable'` |
| Set O(1) membership | `set.contains(2)` | `true` |
| Dictionary lookup of missing key | `["a": 1]["b"]` | `nil` (`Int?`) |
| Dictionary default subscript | `dict["count", default: 0] += 1` | `1` |
| Dictionary removal via nil | `dict["a"] = nil` | Key `"a"` removed from dictionary |

## 3. Common wrong ideas (traps)

1. **"Subscripting an array past its count returns nil like a dictionary."** False. Array subscripting crashes immediately with a fatal runtime error (`Index out of range`). Only properties like `.first` and `.last` return optionals.
2. **"Sets keep elements in insertion order."** False. Sets are unordered. If you need ordered unique elements, you need a custom ordered set or an array with manual filtering.
3. **"Dictionary subscripting always returns a concrete value."** False. Because a key might not exist, `dict[key]` always returns an optional `Value?`.
4. **"Assigning an array to another variable immediately copies all its elements."** False. Swift uses Copy-on-Write (COW) to share storage until one of the copies is modified.

## 4. Real interview questions by level

- **Fresh**:
  - What are the three primary collection types in Swift, and when should you choose each?
  - What happens when you access an array index that is out of bounds?
  - Why does subscripting a dictionary return an optional value?
- **Junior**:
  - What protocol must types conform to before they can be stored in a `Set` or used as a `Dictionary` key, and why?
  - How does the default subscript `dict[key, default: 0]` work, and when would you use it?
  - What is the time complexity of searching for an element in an `Array` versus a `Set`?
- **Senior**:
  - How does Swift manage Array capacity reallocations (geometric growth strategy), and how can `reserveCapacity(_:)` prevent memory churn in high-throughput pipelines?
