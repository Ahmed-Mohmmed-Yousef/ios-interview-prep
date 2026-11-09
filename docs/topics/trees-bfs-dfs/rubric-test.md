# Rubric Test: Trees: BFS and DFS

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/trees-bfs-dfs/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## tbd-q24 (Written: BFS vs DFS Overview)

### Rubric
- Identifies BFS using a queue (FIFO) and DFS using a stack (LIFO or recursion) (40 pts, key)
- Explains difference in traversal geometry (level-by-level vs branch-first) (30 pts, key)
- Provides a clear scenario when to pick one (e.g. shortest path for BFS, subtree/path search for DFS) (30 pts)

### Good Answer
Breadth-first search explores a tree level by level using a first-in, first-out queue. Depth-first search dives deep along one branch before backtracking, using a stack or recursion. In an interview, I choose BFS when finding the shortest path in an unweighted tree. I choose DFS when checking for path existence or performing bottom-up subtree calculations.

**Score: 100/100**
- [x] Identifies BFS using a queue (FIFO) and DFS using a stack (LIFO or recursion) (40/40)
- [x] Explains difference in traversal geometry (level-by-level vs branch-first) (30/30)
- [x] Provides a clear scenario when to pick one (30/30)

### Average Answer
BFS searches level by level using a queue, while DFS searches branch by branch using a call stack. I pick BFS when I want to find the nearest target to the root.

**Score: 70/100**
- [x] Identifies BFS using a queue (FIFO) and DFS using a stack (LIFO or recursion) (40/40)
- [ ] Explains difference in traversal geometry (0/30 - mentions level by level and branch by branch without explaining deep dive or backtracking geometry)
- [x] Provides a clear scenario when to pick one (30/30)

### Weak Answer
BFS visits all nodes in order. DFS is faster for some trees.

**Score: 0/100**
- [ ] Identifies BFS using a queue (FIFO) and DFS using a stack (0/40 - missing key data structures)
- [ ] Explains difference in traversal geometry (0/30)
- [ ] Provides a clear scenario when to pick one (0/30)

---

## tbd-q25 (Written: Pre-order, In-order, Post-order DFS)

### Rubric
- Defines pre-order (root, left, right), in-order (left, root, right), and post-order (left, right, root) (50 pts, key)
- Explains that in-order traversal of a binary search tree produces sorted order (30 pts, key)
- Uses clear technical terminology without unnecessary jargon (20 pts)

### Good Answer
Pre-order visits the root first, then the left and right subtrees. In-order visits the left child, then the root, and finally the right child. Post-order visits both children before visiting the parent. On a valid binary search tree, an in-order traversal visits all values in strictly sorted ascending order.

**Score: 100/100**
- [x] Defines pre-order, in-order, and post-order traversals (50/50)
- [x] Explains in-order traversal yields sorted order on a BST (30/30)
- [x] Uses clear technical terminology (20/20)

### Average Answer
Pre-order visits the root then children. In-order visits left child, root, right child. Post-order visits children then root. In-order is useful because on a BST it gives values in sorted order.

**Score: 80/100**
- [x] Defines pre-order, in-order, and post-order traversals (40/50 - brief on pre-order and post-order)
- [x] Explains in-order traversal yields sorted order on a BST (30/30)
- [ ] Uses clear technical terminology (10/20)

### Weak Answer
These are three ways to do recursion on trees. In-order is used for sorting.

**Score: 30/100**
- [ ] Defines pre-order, in-order, and post-order traversals (0/50 - misses traversal node sequences)
- [x] Explains in-order traversal yields sorted order on a BST (30/30)
- [ ] Uses clear technical terminology (0/20)

---

## tbd-q26 (Written: Level Isolation in BFS)

### Rubric
- Explains taking a snapshot of queue.count before running the level loop (50 pts, key)
- Explains that newly enqueued child nodes belong to the next tier and are not processed in the current loop (30 pts, key)
- Explains grouping level values into a list or computing level metrics (20 pts)

### Good Answer
To isolate individual levels in BFS, I snapshot `let count = queue.count` at the start of each while iteration. An inner loop runs exactly `count` times, dequeuing nodes from the current tier and collecting their values. Any children discovered during this step are appended to the queue, but they will only be processed during the subsequent tier loop.

**Score: 100/100**
- [x] Explains taking a snapshot of queue.count (50/50)
- [x] Explains newly enqueued children belong to next tier (30/30)
- [x] Explains grouping level values (20/20)

### Average Answer
You count how many nodes are in the queue at the start of the level. Then you run a loop for that count to remove those nodes. When you add their child nodes, those child nodes stay in the queue for the next loop.

**Score: 80/100**
- [x] Explains taking a snapshot of queue.count (50/50)
- [x] Explains newly enqueued children belong to next tier (30/30)
- [ ] Explains grouping level values (0/20)

### Weak Answer
You use an if statement inside the while loop to check the node level number.

**Score: 0/100**
- [ ] Explains taking a snapshot of queue.count (0/50)
- [ ] Explains newly enqueued children belong to next tier (0/30)
- [ ] Explains grouping level values (0/20)

---

## tbd-q27 (Written: Space Complexity of Recursive DFS)

### Rubric
- States O(log N) auxiliary space for balanced tree (40 pts, key)
- States O(N) auxiliary space for skewed tree (40 pts, key)
- Explains that call stack frames correspond to the height of the tree (20 pts)

### Good Answer
Recursive depth-first search consumes stack memory proportional to tree height H. On a balanced tree with N nodes, the height is log N, requiring O(log N) call stack frames. On a completely skewed tree, each node has only one child, forming a linear list of depth N. In that worst case, the call stack grows to O(N) frames and risks a stack overflow crash.

**Score: 100/100**
- [x] States O(log N) auxiliary space for balanced tree (40/40)
- [x] States O(N) auxiliary space for skewed tree (40/40)
- [x] Explains call stack frames correspond to tree height (20/20)

### Average Answer
Recursive DFS uses O(log N) space when the tree is balanced because the height is small. If the tree is skewed into a straight line, it takes O(N) space. The call stack holds function calls for the path.

**Score: 90/100**
- [x] States O(log N) auxiliary space for balanced tree (40/40)
- [x] States O(N) auxiliary space for skewed tree (40/40)
- [x] Explains call stack frames correspond to tree height (10/20)

### Weak Answer
Space complexity is always O(1) auxiliary space because trees are traversed in place without creating extra arrays.

**Score: 0/100**
- [ ] States O(log N) auxiliary space for balanced tree (0/40)
- [ ] States O(N) auxiliary space for skewed tree (0/40)
- [ ] Explains call stack frames correspond to tree height (0/20)

---

## tbd-q28 (Written: Swift Array.removeFirst Performance Trap)

### Rubric
- Explains that removeFirst on Array shifts all remaining elements in O(K) time, causing O(N^2) total time (50 pts, key)
- Proposes using an index pointer to avoid array shifts (25 pts, key)
- Proposes using a Deque data structure (e.g. swift-collections) (25 pts)

### Good Answer
Calling `removeFirst()` on a Swift Array takes linear time because all remaining elements shift left in memory. Repeating this for N nodes degrades overall BFS runtime to O(N squared). You can avoid this trap by maintaining a read index pointer into the array without shifting elements. Alternatively, you can use a ring-buffer double-ended queue, such as `Deque` from the official swift-collections package.

**Score: 100/100**
- [x] Explains removeFirst shifts elements in O(K) time causing O(N^2) total runtime (50/50)
- [x] Proposes using an index pointer (25/25)
- [x] Proposes using Deque from swift-collections (25/25)

### Average Answer
`removeFirst()` takes O(N) time because it shifts array elements over by one spot. This makes BFS slow. You can fix it by using a Deque or keeping a pointer variable to track your current index in the array.

**Score: 85/100**
- [x] Explains removeFirst shifts elements (35/50 - mentions shifting without explicitly stating cumulative O(N^2) runtime)
- [x] Proposes using an index pointer (25/25)
- [x] Proposes using Deque (25/25)

### Weak Answer
`removeFirst()` crashes when the array is empty. You should check if the array is empty first.

**Score: 0/100**
- [ ] Explains removeFirst shifts elements in O(K) time (0/50)
- [ ] Proposes using an index pointer (0/25)
- [ ] Proposes using a Deque data structure (0/25)

---

## tbd-q29 (Code-Write: maxDepth)

### Rubric
- Handles nil root base case returning 0 (30 pts, key)
- Recursively computes 1 + max(maxDepth(left), maxDepth(right)) (40 pts, key)
- Constructs the tree correctly and prints the result 3 (30 pts)

### Good Answer
```swift
final class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int, left: TreeNode? = nil, right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
}

let tree = TreeNode(1, left: TreeNode(2, left: TreeNode(4)), right: TreeNode(3))
print(maxDepth(tree))
```

**Score: 100/100**
- [x] Handles nil root base case returning 0 (30/30)
- [x] Recursively computes 1 + max(maxDepth(left), maxDepth(right)) (40/40)
- [x] Constructs tree and prints 3 (30/30)

### Average Answer
```swift
final class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int, left: TreeNode? = nil, right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

func maxDepth(_ root: TreeNode?) -> Int {
    if root == nil { return 0 }
    let left = maxDepth(root!.left)
    let right = maxDepth(root!.right)
    return left > right ? left + 1 : right + 1
}

let tree = TreeNode(1, left: TreeNode(2, left: TreeNode(4)), right: TreeNode(3))
print(maxDepth(tree))
```

**Score: 85/100**
- [x] Handles nil root base case returning 0 (30/30)
- [x] Recursively computes 1 + max depth (35/40 - uses force unwrapping root! instead of safe optional binding)
- [x] Constructs tree and prints 3 (20/30)

### Weak Answer
```swift
func maxDepth(_ root: TreeNode?) -> Int {
    return 3
}
```

**Score: 0/100**
- [ ] Handles nil root base case (0/30)
- [ ] Recursively computes depth (0/40)
- [ ] Constructs tree and prints (0/30)

---

## tbd-q30 (Code-Write: invertTree)

### Rubric
- Returns nil for empty node base case (25 pts, key)
- Recursively inverts both left and right subtrees (40 pts, key)
- Swaps inverted left and right children and returns root (35 pts)

### Good Answer
```swift
final class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int, left: TreeNode? = nil, right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

func invertTree(_ root: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    let leftInverted = invertTree(root.left)
    let rightInverted = invertTree(root.right)
    root.left = rightInverted
    root.right = leftInverted
    return root
}

let tree = TreeNode(4, left: TreeNode(2), right: TreeNode(7))
let inverted = invertTree(tree)
print("\(inverted?.left?.val ?? 0),\(inverted?.right?.val ?? 0)")
```

**Score: 100/100**
- [x] Returns nil for empty node base case (25/25)
- [x] Recursively inverts both left and right subtrees (40/40)
- [x] Swaps inverted children and returns root (35/35)

### Average Answer
```swift
func invertTree(_ root: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    let temp = root.left
    root.left = root.right
    root.right = temp
    _ = invertTree(root.left)
    _ = invertTree(root.right)
    return root
}
```

**Score: 75/100**
- [x] Returns nil for empty node base case (25/25)
- [x] Recursively inverts subtrees (25/40 - swaps before recurse, inverts children in place)
- [x] Swaps inverted children and returns root (25/35 - missing tree setup and print verification)

### Weak Answer
```swift
func invertTree(_ root: TreeNode?) -> TreeNode? {
    return root
}
```

**Score: 0/100**
- [ ] Returns nil for empty base case (0/25)
- [ ] Recursively inverts subtrees (0/40)
- [ ] Swaps inverted children (0/35)

---

## tbd-q31 (Code-Write: levelOrderAverages)

### Rubric
- Initializes BFS queue with root and returns empty array if root is nil (25 pts, key)
- Snapshots level count and sums node values across each tier (40 pts, key)
- Enqueues children, computes Double average per level, and returns correct array [3.0, 14.5, 11.0] (35 pts)

### Good Answer
```swift
final class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int, left: TreeNode? = nil, right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

func levelOrderAverages(_ root: TreeNode?) -> [Double] {
    guard let root = root else { return [] }
    var result: [Double] = []
    var queue: [TreeNode] = [root]

    while !queue.isEmpty {
        let levelCount = queue.count
        var sum = 0

        for _ in 0..<levelCount {
            let node = queue.removeFirst()
            sum += node.val
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }

        result.append(Double(sum) / Double(levelCount))
    }

    return result
}

let root = TreeNode(3, left: TreeNode(9), right: TreeNode(20, left: TreeNode(15), right: TreeNode(7)))
print(levelOrderAverages(root))
```

**Score: 100/100**
- [x] Initializes BFS queue with root and handles nil (25/25)
- [x] Snapshots level count and sums node values (40/40)
- [x] Enqueues children, computes Double average per level, and prints output (35/35)

### Average Answer
```swift
func levelOrderAverages(_ root: TreeNode?) -> [Double] {
    guard let root = root else { return [] }
    var result: [Double] = []
    var queue: [TreeNode] = [root]
    while !queue.isEmpty {
        let count = queue.count
        var sum: Double = 0
        for _ in 0..<count {
            let node = queue.removeFirst()
            sum += Double(node.val)
            if node.left != nil { queue.append(node.left!) }
            if node.right != nil { queue.append(node.right!) }
        }
        result.append(sum / Double(count))
    }
    return result
}
```

**Score: 85/100**
- [x] Initializes BFS queue with root and handles nil (25/25)
- [x] Snapshots level count and sums node values (40/40)
- [x] Enqueues children and computes Double average (20/35 - uses force unwrapping node.left! and omits tree instantiation and test print)

### Weak Answer
```swift
func levelOrderAverages(_ root: TreeNode?) -> [Double] {
    return [3.0, 14.5, 11.0]
}
```

**Score: 0/100**
- [ ] Initializes BFS queue with root (0/25)
- [ ] Snapshots level count (0/40)
- [ ] Computes averages iteratively (0/35)
