# Rubric Test: Heaps

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/heaps/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## heap-q24 (Written: Min-Heap of Size K vs Full Sorting)

### Rubric
- Explains that sorting the entire array takes O(N log N) time and O(N) auxiliary space (35 pts, key)
- Explains that a min-heap of size K takes O(N log K) time and O(K) space (40 pts, key)
- Notes that smaller items can be discarded as soon as they are smaller than the min-heap root (25 pts)

### Good Answer
Sorting an entire array of size N requires O(N log N) time and O(N) space. Using a min-heap of size K bounds auxiliary space to O(K) and runs in O(N log K) time. When K is much smaller than N, this saves significant memory and CPU time because numbers smaller than the heap root are discarded immediately.

**Score: 100/100**
- [x] Explains sorting requires O(N log N) time and O(N) space (35/35)
- [x] Explains min-heap of size K takes O(N log K) time and O(K) space (40/40)
- [x] Explains immediate discarding below root (25/25)

### Average Answer
Sorting the whole array takes O(N log N) time and uses extra memory for all N elements. A min-heap of size K is better because it takes O(N log K) time and only keeps K items in memory.

**Score: 75/100**
- [x] Explains sorting O(N log N) (35/35)
- [x] Explains min-heap O(N log K) time and O(K) space (40/40)
- [ ] Omits detailed explanation of discarding items smaller than root (0/25)

### Weak Answer
Heaps are faster than sorting arrays because trees are efficient in Swift.

**Score: 15/100**
- [ ] Omits Big-O complexities (10/35)
- [ ] No mention of O(N log K) or K space (5/40)
- [ ] No mention of discarding below root (0/25)

---

## heap-q25 (Written: Sift-Up vs Sift-Down)

### Rubric
- Identifies that sift-up is used after insertion at the array tail (35 pts, key)
- Identifies that sift-down is used after extracting the root element (35 pts, key)
- Describes movement direction (sift-up travels up toward parent, sift-down travels down comparing with children) (30 pts)

### Good Answer
Sift-up is used during insertion when a new item is appended to the end of the heap array. It compares the element with its parent and bubbles up toward the root. Sift-down is used during root extraction when the last array element replaces the deleted root. It compares the element with both children and swaps downward with the smaller child until heap order is restored.

**Score: 100/100**
- [x] Sift-up used after insertion (35/35)
- [x] Sift-down used after root extraction (35/35)
- [x] Describes direction and comparisons (30/30)

### Average Answer
Sift-up happens after you insert an item at the bottom and bubble it up to its parent. Sift-down happens when you remove the root and move the last item to the top, pushing it down until it sits below both children.

**Score: 85/100**
- [x] Identifies sift-up on insert (35/35)
- [x] Identifies sift-down on pop (35/35)
- [x] Describes direction (15/30 - brief)

### Weak Answer
Sift-up goes up and sift-down goes down when numbers are out of order.

**Score: 20/100**
- [ ] Does not specify insert triggers sift-up (10/35)
- [ ] Does not specify root pop triggers sift-down (10/35)
- [ ] Vague direction description (0/30)

---

## heap-q26 (Written: Bottom-Up Heapify O(N) Time)

### Rubric
- Explains that leaves make up roughly half the nodes (N / 2) and require zero sifting (40 pts, key)
- Notes that higher levels require more sift work but contain exponentially fewer nodes (35 pts, key)
- Mentions that repeated insertion takes O(N log N) because most nodes sift all the way up (25 pts)

### Good Answer
Building a heap with bottom-up sift-down takes O(N) time because roughly half the nodes are leaves that require zero swaps. As you move up the tree, the maximum number of swaps increases linearly with height, but the number of nodes at each level decreases exponentially. The resulting mathematical summation converges to O(N), whereas repeated insertion takes O(N log N).

**Score: 100/100**
- [x] Explains leaves require zero swaps (40/40)
- [x] Higher levels have exponentially fewer nodes (35/35)
- [x] Contrasts with O(N log N) repeated insertion (25/25)

### Average Answer
Half of all nodes in a heap are leaves at the very bottom, so they do not need to sift down at all. Only the top nodes need multiple swaps, but there are very few nodes near the root. This adds up to O(N) total operations instead of O(N log N).

**Score: 80/100**
- [x] Mentions leaves (35/40)
- [x] Mentions fewer top nodes (30/35)
- [x] Mentions O(N) vs O(N log N) (15/25)

### Weak Answer
Building a heap is linear because you do it with an array loop.

**Score: 20/100**
- [ ] Misses leaf node explanation (10/40)
- [ ] Misses node count distribution per level (5/35)
- [ ] Misses mathematical comparison (5/25)

---

## heap-q27 (Written: Running Median with Two Heaps)

### Rubric
- Specifies a max-heap for the lower half of values and a min-heap for the upper half (40 pts, key)
- States that the size difference between the two heaps must never exceed one (35 pts, key)
- Explains how the median is computed from the roots in O(1) time (25 pts)

### Good Answer
We maintain two heaps: a max-heap for the smaller half of numbers and a min-heap for the larger half. We keep the two heaps balanced so their sizes differ by at most one element. To compute the median in O(1) time, read the root of the larger heap. Average the two roots when both sizes are equal.

**Score: 100/100**
- [x] Max-heap for lower half and min-heap for upper half (40/40)
- [x] Size difference bounded by 1 (35/35)
- [x] O(1) median reading from roots (25/25)

### Average Answer
You use two heaps: one max-heap for smaller values and one min-heap for larger values. If one heap has more than one extra element, you rebalance them. The median is the root of the bigger heap, or the average of the two roots if they have equal counts.

**Score: 90/100**
- [x] Two heaps identified correctly (40/40)
- [x] Size balancing explained (30/35)
- [x] Median calculation from roots (20/25)

### Weak Answer
Put all stream values into a priority queue and divide the middle index.

**Score: 10/100**
- [ ] Single heap does not give O(1) median (5/40)
- [ ] No balance condition mentioned (0/35)
- [ ] Incorrect middle lookup (5/25)

---

## heap-q28 (Written: Binary Heap vs Binary Search Tree)

### Rubric
- Compares heap (only vertical priority order) with BST (complete horizontal key order) (35 pts, key)
- Notes heap storage advantage (flat array with cache locality and zero pointer overhead) (35 pts, key)
- Identifies scenario: choose heap for priority queues / top K items; choose BST for arbitrary key search or range queries (30 pts)

### Good Answer
A binary heap only maintains vertical parent-child priority, whereas a binary search tree maintains total order across all keys. A heap is stored in a flat array, providing excellent cache locality with zero pointer overhead. Choose a heap when you only need fast access to extreme values or priority scheduling. Choose a BST when you need arbitrary key lookups or ordered range searches.

**Score: 100/100**
- [x] Compares ordering requirements (35/35)
- [x] Notes flat array cache locality (35/35)
- [x] Identifies specific iOS use cases (30/30)

### Average Answer
A heap keeps the minimum or maximum element at the root using an array, but sibling nodes are not sorted. A BST sorts all elements from left to right. Use a heap for finding top elements and a BST for searching any key.

**Score: 80/100**
- [x] Explains ordering difference (30/35)
- [x] Mentions array storage (25/35)
- [x] Identifies top elements vs key search (25/30)

### Weak Answer
Heaps are trees stored in arrays. BSTs are trees stored in memory.

**Score: 25/100**
- [ ] Weak ordering distinction (10/35)
- [ ] Vague memory comparison (10/35)
- [ ] No practical scenario (5/30)

---

## heap-q29 (Code-Write: Kth Smallest Element with Max-Heap)

### Rubric
- Maintains a max-heap where the root is the maximum among the smallest k elements (40 pts, key)
- Pops the maximum when heap size exceeds k (35 pts, key)
- Returns the root of the heap which represents the kth smallest element (25 pts)

### Good Answer
```swift
struct MaxHeap {
    var items: [Int] = []
    var count: Int { items.count }
    var peek: Int? { items.first }
    mutating func insert(_ v: Int) {
        items.append(v)
        var i = items.count - 1
        while i > 0 {
            let p = (i - 1) / 2
            if items[i] > items[p] { items.swapAt(i, p); i = p } else { break }
        }
    }
    mutating func pop() -> Int? {
        if items.isEmpty { return nil }
        if items.count == 1 { return items.removeLast() }
        let top = items[0]
        items[0] = items.removeLast()
        var p = 0
        while true {
            let l = 2 * p + 1, r = 2 * p + 2
            var c = p
            if l < items.count && items[l] > items[c] { c = l }
            if r < items.count && items[r] > items[c] { c = r }
            if c == p { break }
            items.swapAt(p, c)
            p = c
        }
        return top
    }
}
func kthSmallest(_ nums: [Int], _ k: Int) -> Int {
    var maxHeap = MaxHeap()
    for num in nums {
        maxHeap.insert(num)
        if maxHeap.count > k {
            _ = maxHeap.pop()
        }
    }
    return maxHeap.peek ?? -1
}
let numbers = [7, 10, 4, 3, 20, 15]
print(kthSmallest(numbers, 3))
```

**Score: 100/100**
- [x] Max-heap holds smallest k items (40/40)
- [x] Pops root when size > k (35/35)
- [x] Returns peek root correctly (25/25)

### Average Answer
Uses an array-based max-heap without a complete sift-down loop (replaces root and calls sort or partial sift), still achieving correct answer for the test inputs.

**Score: 75/100**
- [x] Max-heap strategy (30/40)
- [x] Pruning beyond size k (25/35)
- [x] Returns root (20/25)

### Weak Answer
Sorts the entire array and takes index k - 1:
```swift
func kthSmallest(_ nums: [Int], _ k: Int) -> Int {
    return nums.sorted()[k - 1]
}
```

**Score: 30/100**
- [ ] Did not use a max-heap (0/40)
- [ ] No size-k heap maintenance (0/35)
- [x] Returns correct kth smallest value via sorting (30/25 -> capped at 30)

---

## heap-q30 (Code-Write: Heap Sort)

### Rubric
- Inserts all input elements into a min-heap in O(N log N) time (35 pts, key)
- Repeatedly extracts the minimum root element until the heap is empty (40 pts, key)
- Returns the sorted array in ascending order (25 pts)

### Good Answer
```swift
struct MinHeap {
    var items: [Int] = []
    var isEmpty: Bool { items.isEmpty }
    mutating func insert(_ v: Int) {
        items.append(v)
        var i = items.count - 1
        while i > 0 {
            let p = (i - 1) / 2
            if items[i] < items[p] { items.swapAt(i, p); i = p } else { break }
        }
    }
    mutating func pop() -> Int? {
        if items.isEmpty { return nil }
        if items.count == 1 { return items.removeLast() }
        let top = items[0]
        items[0] = items.removeLast()
        var p = 0
        while true {
            let l = 2 * p + 1, r = 2 * p + 2
            var c = p
            if l < items.count && items[l] < items[c] { c = l }
            if r < items.count && items[r] < items[c] { c = r }
            if c == p { break }
            items.swapAt(p, c)
            p = c
        }
        return top
    }
}
func heapSort(_ nums: [Int]) -> [Int] {
    var minHeap = MinHeap()
    for n in nums { minHeap.insert(n) }
    var result: [Int] = []
    while let minVal = minHeap.pop() {
        result.append(minVal)
    }
    return result
}
let arr = [5, 2, 8, 1, 9]
print(heapSort(arr))
```

**Score: 100/100**
- [x] Inserts all elements into min-heap (35/35)
- [x] Repeatedly pops root element (40/40)
- [x] Returns ascending sorted array (25/25)

### Average Answer
Uses an in-place max-heap sift-down approach but leaves the array reversed or requires an extra reverse step.

**Score: 80/100**
- [x] Heap construction (30/35)
- [x] Repeated extraction (30/40)
- [x] Returns sorted array (20/25)

### Weak Answer
```swift
func heapSort(_ nums: [Int]) -> [Int] {
    return nums.sorted()
}
```

**Score: 25/100**
- [ ] Did not implement heap insertion (0/35)
- [ ] Did not implement heap extraction (0/40)
- [x] Output is sorted (25/25)

---

## heap-q31 (Code-Write: Verify Min-Heap Property)

### Rubric
- Iterates through array indices checking left child (2 * i + 1) and right child (2 * i + 2) (40 pts, key)
- Returns false as soon as any child is strictly smaller than its parent (40 pts, key)
- Handles boundary checks and returns true for valid heaps and empty arrays (20 pts)

### Good Answer
```swift
func isMinHeap(_ arr: [Int]) -> Bool {
    guard !arr.isEmpty else { return true }
    for i in 0..<arr.count {
        let left = 2 * i + 1
        let right = 2 * i + 2
        if left < arr.count && arr[left] < arr[i] { return false }
        if right < arr.count && arr[right] < arr[i] { return false }
    }
    return true
}
let validHeap = [1, 3, 5, 7, 9, 8]
let invalidHeap = [1, 10, 5, 4, 9, 8]
print("\(isMinHeap(validHeap)) \(isMinHeap(invalidHeap))")
```

**Score: 100/100**
- [x] Checks left and right child indices (40/40)
- [x] Early false return on violation (40/40)
- [x] Valid boundary handling (20/20)

### Average Answer
Checks `parent = (i - 1) / 2` starting from index 1 to `arr.count - 1` without guarding empty arrays explicitly, returning `arr[i] >= arr[parent]`.

**Score: 85/100**
- [x] Checks parent-child relationship (35/40)
- [x] Validates ordering (35/40)
- [x] Basic bounds (15/20)

### Weak Answer
```swift
func isMinHeap(_ arr: [Int]) -> Bool {
    return arr == arr.sorted()
}
```

**Score: 15/100**
- [ ] Confuses heap property with full array sorting (0/40)
- [ ] No tree index calculation (0/40)
- [x] Checks some condition (15/20)
