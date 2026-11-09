# Research: Copy-on-Write and Value Semantics

Topic ID: `copy-on-write`
Level: Mid
Goal: After this topic, you can explain how Swift collections avoid extra copies and when copies happen.

## 1. Official Sources & Language Mechanics

### Official Sources
- **The Swift Programming Language**: Structures and Classes
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures
- **Swift Optimization Tips (swiftlang/swift)**: Advice: Use copy-on-write semantics for large value types
  https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst
- **Apple Developer Documentation**: `isKnownUniquelyReferenced(_:)`
  https://developer.apple.com/documentation/swift/isknownuniquelyreferenced(_:)

### Core Technical Concepts
1. **Value Semantics with Reference Backing**:
   - Swift value types (structs) behave as independent copies. Mutating one never changes another.
   - For large collections like `Array`, `Dictionary`, `Set`, and `String`, naive deep copying on assignment would be extremely expensive (O(n) time and memory).
   - Solution: Copy-on-Write (COW).

2. **How COW Operates**:
   - The struct stores a pointer to a private reference type (`class Storage`) on the heap.
   - Assigning `var b = a` only copies the pointer and increments the reference count of the storage buffer. This is an O(1) shallow copy.
   - Both structs point to the same memory buffer as long as they are only read.
   - When a mutating operation occurs, the struct checks if the buffer is shared.
   - If reference count == 1: Mutate buffer in place.
   - If reference count > 1: Allocate a new buffer, copy elements over, update pointer, and mutate the new buffer.

3. **`isKnownUniquelyReferenced(_:)`**:
   - Swift standard library function that checks whether a class reference has a reference count of exactly 1.
   - Must be passed an `inout` reference to a non-weak, non-unowned class instance.
   - Returns `true` if uniquely referenced, `false` if shared.
   - Custom structs do NOT get COW automatically. Developers must implement COW manually wrapping a reference type and calling `isKnownUniquelyReferenced`.

## 2. Interview Questions by Level

### Fresh / Junior
- What is copy-on-write in Swift?
- Which types in Swift have copy-on-write behavior built in?
- When does an array actually duplicate its elements in memory?

### Mid
- Do custom structs have copy-on-write automatically?
- How do you implement copy-on-write in a custom data structure?
- What is `isKnownUniquelyReferenced`, and what does it do?

### Senior / Staff
- What is the memory and performance overhead of an unshared mutation versus a shared mutation in COW collections?
- What are the safety rules and concurrency guarantees of `isKnownUniquelyReferenced`?
- How does passing collections as `inout` parameters avoid unnecessary COW allocations?

## 3. Verified Swift 6 Code Snippets

```swift
final class Storage {
    var data: [Int]
    init(data: [Int]) { self.data = data }
}

struct COWBuffer {
    private var storage: Storage
    
    init(data: [Int]) {
        self.storage = Storage(data: data)
    }
    
    var values: [Int] { storage.data }
    
    mutating func append(_ value: Int) {
        if !isKnownUniquelyReferenced(&storage) {
            // Shared reference: duplicate buffer before mutating
            storage = Storage(data: storage.data)
        }
        storage.data.append(value)
    }
}

var a = COWBuffer(data: [1, 2, 3])
var b = a // Shallow copy: storage is shared

print("Initial b values count: \(b.values.count)")
b.append(4) // COW triggers: b gets new storage
print("After append: a has \(a.values.count) items, b has \(b.values.count) items")
```
Output verified on Swift 6 compiler.
