# Fact Check Report: Graphs

**Topic ID:** `graphs`  
**Date:** 2026-11-10  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. Tech Interview Handbook: *Graph cheatsheet for coding interviews*  
   URL: https://www.techinterviewhandbook.org/algorithms/graph/
2. Swift Standard Library: *Set and Dictionary Documentation*  
   URL: https://developer.apple.com/documentation/swift/set
3. Swift Package Manager: *Package Graph & Dependency Resolution*  
   URL: https://github.com/apple/swift-package-manager

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Adjacency list takes O(V + E) space | Tech Interview Handbook | Verified | Stores vertices and their outgoing neighbor lists. |
| Adjacency matrix takes O(V^2) space and O(1) edge lookup | Tech Interview Handbook | Verified | Direct cell lookup via `matrix[u][v]`. |
| Visited set prevents infinite loops from graph cycles | Tech Interview Handbook | Verified | Essential difference between tree and graph searches. |
| BFS finds shortest path in unweighted graphs | Tech Interview Handbook | Verified | Level-order queue guarantees optimal edge count. |
| Dijkstra's algorithm solves shortest paths with non-negative weights | Tech Interview Handbook | Verified | Standard weighted shortest-path algorithm. |
| Kahn's algorithm resolves topological ordering on a DAG | Tech Interview Handbook & Swift PM | Verified | Uses in-degrees and queue; count < V indicates cycle. |
| Swift Package Manager orders targets using DAG dependency graph | Swift Package Manager Source | Verified | Target builds form an acyclic dependency graph. |
| Three-color DFS detects cycles via gray (visiting) back-edges | Tech Interview Handbook | Verified | Gray nodes indicate current recursion call stack ancestors. |
| Disconnected graphs require outer loop over all vertices 0..<V | Tech Interview Handbook | Verified | Prevents missing isolated components. |

---

## Code Verification
- `content/topics/graphs/lesson.mdx`: 2 code blocks compiled with Swift 6.4.2 -> 2 passed, 0 failed.
- `content/topics/graphs/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6.4.2 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All factual assertions, complexity metrics, and Swift 6 algorithms in `graphs` are verified, accurate, and completely aligned with current computer science principles and Apple developer conventions.
