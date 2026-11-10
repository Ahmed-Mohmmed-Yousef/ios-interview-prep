# Research: Graphs

Topic ID: `graphs`
Level: Mid
Goal: After this topic, you can model problems as graphs and search them.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Graph Cheatsheet**
  https://www.techinterviewhandbook.org/algorithms/graph/
- **Swift Standard Library: Set and Dictionary Collections**
  https://developer.apple.com/documentation/swift/set
  https://developer.apple.com/documentation/swift/dictionary
- **Swift Package Manager: Dependency Graph Resolution**
  https://github.com/apple/swift-package-manager

### Core Technical Concepts
1. **Graph Fundamentals**:
   - A graph consists of a set of vertices $V$ and edges $E$ connecting pairs of vertices.
   - Directed vs Undirected: edges have a direction (one-way dependency, like package requirements) or bidirectional symmetry (friendships, network links).
   - Cyclic vs Acyclic: cyclic graphs contain at least one path leading back to the start; a Directed Acyclic Graph (DAG) has no directed cycles.
   - Weighted vs Unweighted: edges carry costs/weights (latency, travel distance) or have uniform weight 1.

2. **Graph Representations in Swift**:
   - **Adjacency List** (`[Vertex: [Vertex]]` or `[[Int]]`):
     - Most common and versatile in interviews.
     - Space complexity: $O(V + E)$.
     - Checking edge existence: $O(\text{deg}(u))$. Finding neighbors: $O(1)$ lookup + $O(\text{deg}(u))$ scan.
   - **Adjacency Matrix** (`[[Bool]]` or `[[Int]]`):
     - $V \times V$ grid.
     - Space complexity: $O(V^2)$.
     - Checking edge existence: $O(1)$. Good for dense graphs where $E \approx V^2$.
   - **Edge List** (`[(from: Int, to: Int, weight: Int)]`):
     - Space complexity: $O(E)$. Great for Kruskal's algorithm or union-find initializations.

3. **Graph Traversal & Search**:
   - **The Visited Set**: Unlike trees, graphs may contain cycles or multiple paths to the same vertex. A `Set<Vertex>` tracking visited nodes is essential to prevent infinite loops.
   - **BFS on Graphs**:
     - Uses a queue and a visited set.
     - Finds the shortest path in unweighted graphs.
     - Time: $O(V + E)$. Space: $O(V)$ for queue and visited set.
   - **DFS on Graphs**:
     - Uses recursion (call stack) or an explicit stack plus a visited set.
     - Used for connectivity, pathfinding, and cycle detection.
     - Time: $O(V + E)$. Space: $O(V)$ for stack and visited set.

4. **Essential Graph Patterns**:
   - **Topological Sorting (Kahn's Algorithm)**:
     - Orders vertices in a DAG such that for every directed edge $u \to v$, $u$ comes before $v$.
     - Computes in-degrees for all vertices.
     - Seeds queue with vertices having in-degree 0.
     - If output count $< V$, the graph has a cycle.
     - Real iOS analogy: Swift Package Manager / CocoaPods resolving package build orders!
   - **Cycle Detection**:
     - Undirected: DFS with visited set and parent pointer (if neighbor is visited and not parent $\implies$ cycle).
     - Directed: Three-state coloring (0 = unvisited, 1 = visiting/in current recursion path, 2 = visited/finished). If DFS hits a node with state 1 $\implies$ back-edge cycle.
   - **Disconnected Components**:
     - Always iterate over all vertices `0..<numVertices` in an outer loop to ensure disjoint components are visited.

## 2. Interview Questions by Level

### Fresh / Junior
- What is the difference between a tree and a graph?
- Why do you need a `visited` set when searching a graph but not a tree?
- What is the difference between an adjacency list and an adjacency matrix?

### Mid
- How do you implement BFS to find the shortest path between two nodes in an unweighted graph?
- How do you detect a cycle in a directed graph using topological sort or DFS coloring?
- How does Kahn's algorithm use in-degrees to order build tasks?
- How do you handle disconnected graph components in BFS or DFS?

### Senior / Staff
- How does Swift Package Manager detect circular dependencies between package targets?
- What are the memory and cache locality trade-offs between an adjacency list and an adjacency matrix for massive sparse graphs?
- How would you design a concurrent graph traversal in Swift 6 without data races across actor boundaries?

## 3. Verified Swift 6 Code Snippets

```swift
// BFS Shortest Path in Unweighted Graph
func shortestPath(numNodes: Int, edges: [[Int]], start: Int, target: Int) -> Int {
    var adj: [Int: [Int]] = [:]
    for edge in edges {
        adj[edge[0], default: []].append(edge[1])
        adj[edge[1], default: []].append(edge[0])
    }

    var queue: [Int] = [start]
    var visited: Set<Int> = [start]
    var distance = 0

    while !queue.isEmpty {
        let count = queue.count
        for _ in 0..<count {
            let curr = queue.removeFirst()
            if curr == target { return distance }
            for neighbor in adj[curr, default: []] {
                if !visited.contains(neighbor) {
                    visited.insert(neighbor)
                    queue.append(neighbor)
                }
            }
        }
        distance += 1
    }
    return -1
}

// Topological Sort (Kahn's Algorithm)
func canFinishCourses(numCourses: Int, prerequisites: [[Int]]) -> Bool {
    var adj: [Int: [Int]] = [:]
    var inDegree = Array(repeating: 0, count: numCourses)

    for edge in prerequisites {
        let course = edge[0]
        let prereq = edge[1]
        adj[prereq, default: []].append(course)
        inDegree[course] += 1
    }

    var queue: [Int] = []
    for i in 0..<numCourses where inDegree[i] == 0 {
        queue.append(i)
    }

    var visitedCount = 0
    while !queue.isEmpty {
        let curr = queue.removeFirst()
        visitedCount += 1
        for neighbor in adj[curr, default: []] {
            inDegree[neighbor] -= 1
            if inDegree[neighbor] == 0 {
                queue.append(neighbor)
            }
        }
    }
    return visitedCount == numCourses
}
```
