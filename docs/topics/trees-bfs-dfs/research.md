# Research: Trees: BFS and DFS

Topic ID: `trees-bfs-dfs`
Level: Mid
Goal: After this topic, you can walk trees with breadth-first and depth-first search.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Tree Cheatsheet**
  https://www.techinterviewhandbook.org/algorithms/tree/
- **The Swift Programming Language: Closures and Recursion**
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/
- **Apple Developer Documentation: Collections and Graph/Tree Data Structures**
  https://developer.apple.com/documentation/swift

### Core Technical Concepts
1. **Tree Data Structure**:
   - A tree is a non-linear, hierarchical data structure of nodes connected by directed edges.
   - A binary tree has at most two children per node (`left` and `right`).
   - Swift representation:
     ```swift
     final class TreeNode<Value> {
         var value: Value
         var left: TreeNode?
         var right: TreeNode?

         init(_ value: Value, left: TreeNode? = nil, right: TreeNode? = nil) {
             self.value = value
             self.left = left
             self.right = right
         }
     }
     ```
   - In Swift, a class reference type is standard because recursive value types (`struct`) require indirect storage (`indirect enum`).

2. **Depth-First Search (DFS)**:
   - Traverses as deep as possible along each branch before backtracking.
   - Uses a stack (call stack via recursion or explicit `[TreeNode]`).
   - Three standard depth-first orders on binary trees:
     - **Pre-order (Root, Left, Right)**: Useful for serialization, cloning, and prefix expressions.
     - **In-order (Left, Root, Right)**: On a Binary Search Tree (BST), visits elements in ascending sorted order.
     - **Post-order (Left, Right, Root)**: Useful for bottom-up calculation (tree deletion, computing subtree height or diameter).
   - Time complexity: $O(N)$ where $N$ is the total count of nodes.
   - Space complexity: $O(H)$ where $H$ is the height of the tree. Best case $O(\log N)$ for balanced trees; worst case $O(N)$ for skewed linear trees.

3. **Breadth-First Search (BFS) / Level-Order Traversal**:
   - Traverses the tree level by level, from top to bottom, left to right.
   - Uses a queue data structure (FIFO).
   - Standard interview level-order batching pattern:
     ```swift
     var queue: [TreeNode<Int>] = [root]
     while !queue.isEmpty {
         let levelSize = queue.count
         for _ in 0..<levelSize {
             let node = queue.removeFirst()
             // process node
             if let left = node.left { queue.append(left) }
             if let right = node.right { queue.append(right) }
         }
     }
     ```
   - Time complexity: $O(N)$.
   - Space complexity: $O(W)$ where $W$ is maximum width of the tree. In a full binary tree, the leaf level contains $\approx N/2$ nodes, yielding $O(N)$ space.

4. **Trade-offs and Choices**:
   - **Shortest Path**: BFS is optimal for finding the shortest path or minimum depth in an unweighted tree because it visits closer nodes first.
   - **Memory**: When the tree is very wide, DFS uses less memory ($O(H)$ vs $O(W)$). When the tree is very deep and unbalanced, BFS avoids recursion stack overflow.
   - **Swift Array as Queue**: `removeFirst()` on `Array` is $O(K)$ because remaining elements shift. Mentioning a two-pointer index offset or `Deque` from `swift-collections` shows senior understanding.

## 2. Interview Questions by Level

### Fresh / Junior
- What is the difference between BFS and DFS?
- What are pre-order, in-order, and post-order traversals?
- Why does in-order traversal of a binary search tree produce sorted values?

### Mid
- How do you traverse a tree level-by-level, grouping nodes by depth?
- How do you find the maximum depth of a binary tree iteratively and recursively?
- How do you invert a binary tree?
- What is the space complexity difference between BFS and DFS on a balanced binary tree?

### Senior / Staff
- How do you handle tree traversal when recursion depth risks a stack overflow crash?
- How do you optimize the BFS queue in Swift to avoid $O(N^2)$ cumulative array shifting?
- How would you design a thread-safe, concurrent tree walk in Swift 6 under Sendable constraints?

## 3. Verified Swift 6 Code Snippets

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

// DFS in-order
func inOrder(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    return inOrder(root.left) + [root.val] + inOrder(root.right)
}

// BFS level order
func levelOrder(_ root: TreeNode?) -> [[Int]] {
    guard let root = root else { return [] }
    var result: [[Int]] = []
    var queue: [TreeNode] = [root]
    while !queue.isEmpty {
        let count = queue.count
        var currentLevel: [Int] = []
        for _ in 0..<count {
            let node = queue.removeFirst()
            currentLevel.append(node.val)
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        result.append(currentLevel)
    }
    return result
}
```
