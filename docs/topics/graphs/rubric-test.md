# Rubric Test: Graphs

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/graphs/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## gph-q24 (Written: Adjacency List vs Adjacency Matrix)

### Rubric
- Compares space complexity: O(V + E) for adjacency list vs O(V^2) for adjacency matrix (40 pts, key)
- Compares edge lookup time: O(degree(u)) for list vs O(1) for matrix (30 pts, key)
- Provides clear scenarios for each (sparse graphs/interviews for list, dense graphs/instant lookup for matrix) (30 pts)

### Good Answer
An adjacency list stores neighbors in a dictionary or array of lists, taking O(V + E) space. An adjacency matrix allocates a 2D array taking O(V squared) space. While a matrix checks edge existence in O(1) time, an adjacency list is much more memory efficient for sparse graphs. In iOS coding interviews, an adjacency list is almost always preferred.

**Score: 100/100**
- [x] Compares space complexity: O(V + E) vs O(V^2) (40/40)
- [x] Compares edge lookup time: O(degree) vs O(1) (30/30)
- [x] Provides clear scenarios for each (30/30)

### Average Answer
An adjacency list uses O(V + E) space, whereas a matrix uses O(V squared) space. Matrices can check if an edge exists in O(1) time, but they waste a lot of memory when there are few edges. Use lists for sparse graphs and matrices for dense graphs.

**Score: 80/100**
- [x] Compares space complexity (40/40)
- [x] Compares edge lookup time (20/30 - notes matrix O(1) without stating list degree scan time)
- [x] Provides clear scenarios (20/30)

### Weak Answer
An adjacency list is a dictionary. A matrix is a table. Matrices take more memory.

**Score: 25/100**
- [ ] Compares space complexity (15/40 - mentions more memory vaguely without Big-O)
- [ ] Compares edge lookup time (0/30)
- [x] Provides clear scenarios (10/30)

---

## gph-q25 (Written: Visited Set in Graphs vs Trees)

### Rubric
- Explains that trees are hierarchical and acyclic with a single root (35 pts, key)
- Explains that graphs can contain cycles and multiple paths to the same node (35 pts, key)
- Explains that omitting visited causes infinite loops or stack overflow crashes (30 pts)

### Good Answer
A tree is an acyclic hierarchy where each node has exactly one parent, so each node is visited only once without cycles. Graphs can contain cycles and multiple distinct paths connecting the same vertices. Without a visited Set, BFS or DFS will repeatedly re-enqueue or revisit cyclic vertices, causing an infinite loop or a stack overflow crash.

**Score: 100/100**
- [x] Explains trees are hierarchical and acyclic (35/35)
- [x] Explains graphs have cycles and alternate paths (35/35)
- [x] Explains infinite loops and crashes (30/30)

### Average Answer
Trees do not have cycles, so you only visit each node once going downwards from the root. Graphs can have loops. If you do not track visited nodes with a Set, your algorithm will keep visiting the same cycle forever.

**Score: 85/100**
- [x] Explains trees are acyclic (30/35)
- [x] Explains graphs can have cycles (35/35)
- [x] Explains infinite loops (20/30 - mentions visiting forever without noting stack overflow)

### Weak Answer
Because graphs have more nodes and edges than trees.

**Score: 0/100**
- [ ] Explains trees are hierarchical and acyclic (0/35)
- [ ] Explains graphs have cycles (0/35)
- [ ] Explains infinite loops (0/30)

---

## gph-q26 (Written: Kahn's Algorithm Cycle Detection)

### Rubric
- Explains computing in-degrees and seeding the queue with nodes having in-degree 0 (40 pts, key)
- Explains that nodes inside a cycle depend on each other, so their in-degrees never reach zero (35 pts, key)
- Concludes that a processed count less than V confirms the presence of a cycle (25 pts)

### Good Answer
Kahn's algorithm begins by counting incoming dependencies (in-degrees) and enqueuing nodes with in-degree zero. As each node is dequeued, in-degrees of its neighbors are decremented by one. If a cycle exists, nodes in that cycle continually depend on one another, preventing their in-degrees from ever dropping to zero. Consequently, the total count of processed nodes will be less than V, confirming a cycle.

**Score: 100/100**
- [x] Explains in-degrees and queue seeding (40/40)
- [x] Explains cyclic nodes never reach in-degree zero (35/35)
- [x] Concludes processed count less than V confirms cycle (25/25)

### Average Answer
You count in-degrees for all nodes and queue the ones with zero in-degree. When you pop a node, you subtract one from its neighbors. If there is a cycle, those nodes never reach zero, so the queue empties early and not all nodes get processed.

**Score: 85/100**
- [x] Explains in-degrees and queue seeding (40/40)
- [x] Explains cyclic nodes never reach in-degree zero (30/35)
- [x] Concludes early stop confirms cycle (15/25)

### Weak Answer
Kahn's algorithm uses a queue to sort courses. If the queue crashes, there was a cycle.

**Score: 0/100**
- [ ] Explains in-degrees and queue seeding (0/40)
- [ ] Explains cyclic nodes never reach zero (0/35)
- [ ] Concludes processed count less than V (0/25)

---

## gph-q27 (Written: Handling Disconnected Components)

### Rubric
- Explains that starting only from node 0 fails because edges do not cross disconnected components (40 pts, key)
- Explains using an outer loop iterating over all vertex indices from 0 to V - 1 (40 pts, key)
- Explains checking the visited set before launching BFS or DFS from each vertex (20 pts)

### Good Answer
A graph may consist of several disconnected subgraphs with no edges between them. Starting a search only from node 0 leaves all nodes in other components unvisited. To handle this, write an outer loop iterating through all vertices from 0 to V minus 1. For each vertex not yet in the visited Set, launch a new BFS or DFS traversal, incrementing a component counter.

**Score: 100/100**
- [x] Explains starting only from node 0 fails (40/40)
- [x] Explains outer loop over 0..<V (40/40)
- [x] Explains checking visited set before search (20/20)

### Average Answer
If the graph is broken into disconnected parts, starting at node 0 will not reach the other parts. You need a loop from 0 to V-1 that checks if a node was already visited, and starts a search if it was not.

**Score: 85/100**
- [x] Explains starting at node 0 fails (40/40)
- [x] Explains loop from 0 to V-1 (35/40)
- [x] Explains checking visited (10/20)

### Weak Answer
You should connect the disconnected nodes with new edges first.

**Score: 0/100**
- [ ] Explains starting at node 0 fails (0/40)
- [ ] Explains outer loop over 0..<V (0/40)
- [ ] Explains checking visited set (0/20)

---

## gph-q28 (Written: Three-Color Cycle Detection)

### Rubric
- Defines the three states (white = unvisited, gray = visiting / on call stack, black = visited / done) (50 pts, key)
- Explains that encountering a gray node indicates a back-edge and confirms a directed cycle (35 pts, key)
- Explains marking nodes black once all adjacent edges have been processed (15 pts)

### Good Answer
The three-color DFS method tracks three node states: white (unvisited), gray (currently in the recursion call stack), and black (fully explored). When exploring neighbors, if DFS encounters a node that is currently gray, it has reached an ancestor on the current path. This back-edge confirms the existence of a directed cycle. When all neighbors of a node finish without cycles, the node transitions to black.

**Score: 100/100**
- [x] Defines white, gray, black states (50/50)
- [x] Explains gray node indicates back-edge cycle (35/35)
- [x] Explains marking black when finished (15/15)

### Average Answer
Nodes start as white. When you visit a node, you mark it gray while it is being searched. If you see another gray node while searching, there is a cycle because you looped back. When done with a node, you mark it black.

**Score: 85/100**
- [x] Defines three states (45/50)
- [x] Explains gray node signals cycle (30/35)
- [x] Explains marking black when done (10/15)

### Weak Answer
Coloring nodes with three colors tells you if the graph is bipartite.

**Score: 0/100**
- [ ] Defines three states (0/50)
- [ ] Explains gray node signals cycle (0/35)
- [ ] Explains marking black when done (0/15)

---

## gph-q29 (Code-Write: validPath)

### Rubric
- Handles immediate match when source equals destination (20 pts)
- Builds bidirectional adjacency list and tracks visited nodes (40 pts, key)
- Traverses graph using BFS or DFS and returns false when unreachable (40 pts, key)

### Good Answer
```swift
func validPath(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {
    if source == destination { return true }
    var adj: [Int: [Int]] = [:]
    for e in edges {
        adj[e[0], default: []].append(e[1])
        adj[e[1], default: []].append(e[0])
    }
    var visited = Set<Int>([source])
    var queue = [source]
    while !queue.isEmpty {
        let curr = queue.removeFirst()
        if curr == destination { return true }
        for neighbor in adj[curr, default: []] {
            if !visited.contains(neighbor) {
                visited.insert(neighbor)
                queue.append(neighbor)
            }
        }
    }
    return false
}

let edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]]
print(validPath(6, edges, 0, 5))
```

**Score: 100/100**
- [x] Handles source equals destination (20/20)
- [x] Builds bidirectional adjacency list and tracks visited (40/40)
- [x] Traverses graph and returns false when unreachable (40/40)

### Average Answer
```swift
func validPath(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {
    var adj: [Int: [Int]] = [:]
    for e in edges {
        adj[e[0], default: []].append(e[1])
        adj[e[1], default: []].append(e[0])
    }
    var visited = Set<Int>()
    var q = [source]
    while !q.isEmpty {
        let curr = q.removeFirst()
        if curr == destination { return true }
        visited.insert(curr)
        for next in adj[curr, default: []] {
            if !visited.contains(next) {
                q.append(next)
            }
        }
    }
    return false
}
```

**Score: 80/100**
- [ ] Handles immediate match when source equals destination (0/20)
- [x] Builds bidirectional adjacency list (35/40 - marks visited on pop rather than push)
- [x] Traverses graph and returns false (40/40)

### Weak Answer
```swift
func validPath(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {
    return edges.contains([source, destination])
}
```

**Score: 0/100**
- [ ] Handles immediate match (0/20)
- [ ] Builds bidirectional adjacency list (0/40)
- [ ] Traverses graph (0/40)

---

## gph-q30 (Code-Write: findCircleNum)

### Rubric
- Maintains a visited array or set across all N nodes (30 pts, key)
- Explores connected neighbors using DFS or BFS when an unvisited node is found (40 pts, key)
- Increments and returns the total component count (prints 2 for the sample matrix) (30 pts)

### Good Answer
```swift
func findCircleNum(_ isConnected: [[Int]]) -> Int {
    let n = isConnected.count
    var visited = Array(repeating: false, count: n)
    var count = 0
    func dfs(_ i: Int) {
        visited[i] = true
        for j in 0..<n {
            if isConnected[i][j] == 1 && !visited[j] {
                dfs(j)
            }
        }
    }
    for i in 0..<n {
        if !visited[i] {
            count += 1
            dfs(i)
        }
    }
    return count
}

let matrix = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
]
print(findCircleNum(matrix))
```

**Score: 100/100**
- [x] Maintains visited array across N nodes (30/30)
- [x] Explores connected neighbors using DFS/BFS (40/40)
- [x] Increments and returns count, printing 2 (30/30)

### Average Answer
```swift
func findCircleNum(_ isConnected: [[Int]]) -> Int {
    var visited = Set<Int>()
    var count = 0
    for i in 0..<isConnected.count {
        if !visited.contains(i) {
            count += 1
            var q = [i]
            while !q.isEmpty {
                let u = q.removeFirst()
                visited.insert(u)
                for v in 0..<isConnected.count {
                    if isConnected[u][v] == 1 && !visited.contains(v) {
                        q.append(v)
                    }
                }
            }
        }
    }
    return count
}
```

**Score: 85/100**
- [x] Maintains visited set (30/30)
- [x] Explores neighbors (35/40 - marks visited on pop rather than push)
- [x] Increments and returns count (20/30 - omitted matrix test print)

### Weak Answer
```swift
func findCircleNum(_ isConnected: [[Int]]) -> Int {
    return isConnected.count
}
```

**Score: 0/100**
- [ ] Maintains visited array (0/30)
- [ ] Explores connected neighbors (0/40)
- [ ] Increments and returns component count (0/30)

---

## gph-q31 (Code-Write: canFinish)

### Rubric
- Constructs adjacency list and computes accurate in-degrees for all courses (35 pts, key)
- Initializes queue with in-degree 0 courses and decrements neighbor in-degrees on pop (35 pts, key)
- Compares processed course count to numCourses and prints false for cyclic input (30 pts)

### Good Answer
```swift
func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
    var adj: [Int: [Int]] = [:]
    var inDegree = Array(repeating: 0, count: numCourses)
    for p in prerequisites {
        adj[p[1], default: []].append(p[0])
        inDegree[p[0]] += 1
    }
    var queue: [Int] = []
    for i in 0..<numCourses where inDegree[i] == 0 {
        queue.append(i)
    }
    var visited = 0
    while !queue.isEmpty {
        let curr = queue.removeFirst()
        visited += 1
        for next in adj[curr, default: []] {
            inDegree[next] -= 1
            if inDegree[next] == 0 {
                queue.append(next)
            }
        }
    }
    return visited == numCourses
}

let prereqs = [[1, 0], [0, 1]]
print(canFinish(2, prereqs))
```

**Score: 100/100**
- [x] Constructs adjacency list and in-degrees (35/35)
- [x] Initializes queue with in-degree 0 and decrements on pop (35/35)
- [x] Compares count and prints false (30/30)

### Average Answer
```swift
func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
    var adj: [Int: [Int]] = [:]
    var inDegree = Array(repeating: 0, count: numCourses)
    for p in prerequisites {
        adj[p[1], default: []].append(p[0])
        inDegree[p[0]] += 1
    }
    var q = [Int]()
    for i in 0..<numCourses where inDegree[i] == 0 {
        q.append(i)
    }
    var count = 0
    while !q.isEmpty {
        let u = q.removeFirst()
        count += 1
        for v in adj[u, default: []] {
            inDegree[v] -= 1
            if inDegree[v] == 0 { q.append(v) }
        }
    }
    return count == numCourses
}
```

**Score: 85/100**
- [x] Constructs adjacency list and in-degrees (35/35)
- [x] Initializes queue and decrements on pop (35/35)
- [x] Compares count (15/30 - omitted test input and print statement)

### Weak Answer
```swift
func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
    return prerequisites.isEmpty
}
```

**Score: 0/100**
- [ ] Constructs adjacency list (0/35)
- [ ] Initializes queue and in-degrees (0/35)
- [ ] Compares count (0/30)
