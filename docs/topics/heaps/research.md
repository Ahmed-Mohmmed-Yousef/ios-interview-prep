# Research: Heaps

Topic ID: `heaps`  
Level: Mid  
Goal: After this topic, you can use heaps to find the top items fast.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Heap Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/heap/
- **Apple Swift Collections (GitHub: apple/swift-collections)**  
  https://github.com/apple/swift-collections
- **Swift Algorithms (GitHub: apple/swift-algorithms)**  
  https://github.com/apple/swift-algorithms

### Core Technical Concepts
1. **Heap Fundamentals**:
   - A heap is a complete binary tree that satisfies the heap property.
   - **Min-Heap**: The value of each node is greater than or equal to the value of its parent. The minimum element is at the root.
   - **Max-Heap**: The value of each node is less than or equal to the value of its parent. The maximum element is at the root.
   - Because a heap is a complete binary tree (all levels filled except possibly the last, which is filled from left to right), it can be stored compactly in a contiguous array without pointers.

2. **Array-Based Binary Heap Indexing (0-indexed)**:
   - For an element at index `i`:
     - Parent index: `(i - 1) / 2`
     - Left child index: `2 * i + 1`
     - Right child index: `2 * i + 2`
   - No pointers or node reference objects needed. This ensures excellent CPU cache locality.

3. **Core Operations & Complexities**:
   - **Peek**: Inspect the root element in $O(1)$ time.
   - **Insert (Push)**: Add the new item at the end of the array (maintaining tree shape), then **sift up** (bubble up) until the heap property is restored. Time complexity: $O(\log n)$.
   - **Extract (Pop)**: Swap the root with the last element of the array, remove the last element, then **sift down** (bubble down) the new root until the heap property is restored. Time complexity: $O(\log n)$.
   - **Build Heap (Heapify)**: Convert an unsorted array of $n$ elements into a valid heap. Calling sift-down from index $\lfloor n/2 \rfloor - 1$ down to 0 runs in **$O(n)$ time** (mathematical proof: sum of node depths and heights converges to linear, not $O(n \log n)$).

4. **Swift Standard Library vs swift-collections**:
   - Swift standard library currently does not provide a built-in `Heap` or `PriorityQueue` type.
   - Apple provides an official open-source package: `apple/swift-collections` featuring `Heap<Element>`.
   - In standard coding interviews where external SPM packages cannot be imported, candidates build a simple array-backed generic `struct Heap<Element>` or priority queue helper functions with a comparator `(Element, Element) -> Bool`.

5. **Essential Interview Patterns**:
   - **Top K Elements / Kth Largest**:
     - Maintain a **Min-Heap** of size $K$.
     - Push each element. If size exceeds $K$, pop the minimum.
     - At the end, the heap contains the $K$ largest elements. The root is the $K$th largest.
     - Time complexity: $O(n \log K)$ instead of $O(n \log n)$ full sorting. Space complexity: $O(K)$.
   - **Merge K Sorted Lists**:
     - Insert the first node of each list into a Min-Heap of size $K$.
     - Pop the smallest node, append to the merged list, and push the next node from that list.
     - Time complexity: $O(N \log K)$ where $N$ is total elements across all lists.
   - **Continuous Median / Two Heaps**:
     - Keep a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half.
     - Balance sizes so they differ by at most 1.
     - Insert: $O(\log n)$, Median lookup: $O(1)$.

## 2. Common Interview Traps & Pitfalls
- **Using a Max-Heap for Kth Largest**: Candidates often mistakenly think "Kth largest means max-heap". Using a max-heap requires storing all $n$ elements ($O(n \log n)$ push, $O(n)$ space). A min-heap of size $K$ only retains the top $K$ candidates and runs in $O(n \log K)$.
- **Assuming Swift has `std::priority_queue` built into Foundation/Stdlib**: Candidates write `var pq = PriorityQueue<Int>()` and fail compilation. Knowing how to write a clean 20-line `Heap` struct in Swift demonstrates deep readiness.
- **Thinking Build-Heap is $O(n \log n)$**: Sifting down takes $O(n)$ total operations, whereas repeated insertions take $O(n \log n)$.
- **Index Math Errors**: Miscalculating `(i - 1) / 2` or forgetting boundary checks for `leftChild < count` and `rightChild < count`.

## 3. Interview Answers by Experience Level
- **Fresh**: Understands the difference between Min-Heap and Max-Heap, explains that heaps offer fast $O(1)$ access to min or max, and uses heaps to find top items without sorting all elements.
- **Junior/Mid**: Explains array indexing formulas (`(i - 1) / 2`, `2 * i + 1`), implements sift-up and sift-down, compares $O(n \log K)$ heap approach vs $O(n \log n)$ sorting, and acknowledges `swift-collections`.
- **Senior/Staff**: Discusses memory layout and CPU cache locality of array-backed heaps, explains why building a heap runs in $O(n)$ time via bottom-up sift-down, compares heaps against balanced BSTs (Red-Black / AVL trees), and designs streaming two-heap median finders with concurrent synchronization.
