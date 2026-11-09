# Fact Check Report: Trees: BFS and DFS

**Topic ID:** `trees-bfs-dfs`  
**Date:** 2026-11-09  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. Tech Interview Handbook: *Tree cheatsheet for coding interviews*  
   URL: https://www.techinterviewhandbook.org/algorithms/tree/
2. The Swift Programming Language: *Properties & Closures*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties
3. Apple Open Source / Swift Collections: *Deque Documentation*  
   URL: https://github.com/apple/swift-collections

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| BFS uses a FIFO queue to explore nodes level by level | Tech Interview Handbook | Verified | Fundamental queue-based traversal behavior. |
| DFS explores branch-first using a stack (LIFO or recursion) | Tech Interview Handbook | Verified | Recursion leverages call stack; iterative uses explicit stack. |
| Pre-order visits Root, Left, Right | Tech Interview Handbook | Verified | Standard binary tree traversal sequence. |
| In-order visits Left, Root, Right | Tech Interview Handbook | Verified | Visits BST elements in ascending sorted order. |
| Post-order visits Left, Right, Root | Tech Interview Handbook | Verified | Ideal for bottom-up computation (e.g. tree height, deletion). |
| BFS finds shortest path in unweighted trees | Tech Interview Handbook | Verified | Each edge has weight 1; first visit to a depth is optimal. |
| Recursive DFS auxiliary space is O(H) | Tech Interview Handbook | Verified | Bounded by tree height (O(log N) balanced, O(N) skewed). |
| BFS auxiliary space is O(W) | Tech Interview Handbook | Verified | Widest level contains up to ~N/2 nodes in complete binary tree. |
| `Array.removeFirst()` in Swift takes O(K) time | Swift Standard Library & apple/swift-collections | Verified | Array storage is contiguous; front pop shifts elements. |
| `Deque` provides amortized O(1) front removals | apple/swift-collections | Verified | Uses ring-buffer structure with head and tail pointers. |
| Validating BST requires range [min, max] boundaries | Tech Interview Handbook | Verified | Checking immediate children is insufficient for ancestors. |

---

## Code Verification
- `content/topics/trees-bfs-dfs/lesson.mdx`: 2 code blocks compiled with Swift 6.4.2 -> 2 passed, 0 failed.
- `content/topics/trees-bfs-dfs/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6.4.2 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All factual assertions, complexity analyses, and Swift 6 code implementations in `trees-bfs-dfs` are verified, accurate, and free of outdated or invalid claims.
