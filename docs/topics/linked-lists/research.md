# Research: Linked Lists

## 1. Core Concepts & Technical Facts

### Linked List Architecture
- **Node Definition**:
  - A node contains data (`value`) and one or more reference pointers (`next`, optional `prev`).
  - In Swift, a linked list node must be implemented as a **`final class`** or an **`indirect enum`**.
  - A plain `struct` cannot contain an unboxed property of its own type because value types require fixed compile-time byte layout; recursive value types cause a compiler error: `value type 'Node' has recursive value type dependency`.
- **Singly vs Doubly Linked Lists**:
  - Singly Linked List: Each node references only `next: Node?`.
  - Doubly Linked List: Each node references `next: Node?` and `weak var prev: Node?`.
  - In Swift, the `prev` reference must be marked **`weak`** to avoid retain cycles and memory leaks.
- **Complexity**:
  - Access / Search by index: $\mathcal{O}(n)$ time (no random access; must traverse sequentially).
  - Prepend (insert at head): $\mathcal{O}(1)$ time.
  - Append (insert at tail with tail pointer): $\mathcal{O}(1)$ time; without tail pointer: $\mathcal{O}(n)$.
  - Deletion at head: $\mathcal{O}(1)$ time.
  - Deletion of an arbitrary middle node: $\mathcal{O}(1)$ once the previous node is known; $\mathcal{O}(n)$ to search.
  - Space complexity: $\mathcal{O}(n)$ with additional pointer overhead per node compared to contiguous arrays.

### Key Interview Techniques
- **Dummy Head (Sentinel Node)**:
  - Allocating a temporary node before the head (`let dummy = ListNode(0); dummy.next = head`) eliminates special-case logic for mutating or removing the head.
- **Reversing a Singly-Linked List**:
  - Iterative 3-pointer approach (`prev`, `curr`, `nextTemp`).
  - Updates pointer connections in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ auxiliary space.
- **Fast and Slow Pointers (Floyd's Tortoise and Hare)**:
  - `slow` advances 1 step (`slow = slow?.next`); `fast` advances 2 steps (`fast = fast?.next?.next`).
  - Cycle detection: If `slow === fast`, a cycle exists.
  - Middle node finding: When `fast` reaches `nil` or `fast?.next == nil`, `slow` points to the middle node.

---

## 2. Common Misconceptions & Traps

1. **Trying to define nodes as simple structs**:
   - `struct ListNode { var val: Int; var next: ListNode? }` fails to compile in Swift because of recursive value type dependency. Nodes must be classes or indirect enums.
2. **Retain cycles in doubly-linked lists**:
   - Making `prev` strong creates an uncollectible circular reference between every adjacent node pair. `prev` must always be `weak`.
3. **Losing the rest of the list during pointer rewiring**:
   - Setting `curr.next = prev` before saving `curr.next` severs the reference to the remainder of the list. Always cache `next = curr.next` first.
4. **Using equality `==` instead of reference identity `===` for cycle detection**:
   - Nodes might share identical values. Floyd's cycle detection requires comparing memory addresses with `===`.
5. **Stack overflow on deallocation**:
   - In deep linked lists (e.g. 50,000 nodes), ARC recursive deallocation triggers call stack overflow.

---

## 3. Interview Questions by Level

### Fresh
- Why is a linked list node defined as a class rather than a struct in Swift?
- What are the time complexities of prepending an element versus indexing by position in a linked list?
- What is the purpose of a dummy head node in linked list problems?

### Junior
- Reverse a singly-linked list iteratively in Swift returning the new head.
- How does Floyd's cycle detection algorithm (tortoise and hare) determine whether a linked list contains a cycle?
- Why must the backward pointer in a doubly-linked list be marked `weak` in Swift?
- How do you find the middle element of a linked list in a single pass?

### Senior / Staff
- How does linked list memory fragmentation affect hardware cache lines compared to contiguous Swift arrays?
- How would you implement an iterative `deinit` to prevent ARC call stack overflow on deep linked lists?
- How does an unrolled linked list balance node pointer flexibility with contiguous CPU cache locality?

---

## 4. Sources

- **Official**: [Swift Programming Language: Structures and Classes](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures/)
- **Official**: [Swift Programming Language: Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)
- **Community**: [Tech Interview Handbook: Linked List Cheatsheet](https://www.techinterviewhandbook.org/algorithms/linked-list/)
