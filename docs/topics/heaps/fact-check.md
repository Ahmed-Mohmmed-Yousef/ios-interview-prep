# Fact Check Report: Heaps

**Topic ID:** `heaps`  
**Date:** 2026-11-10  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. Tech Interview Handbook: *Heap cheatsheet for coding interviews*  
   URL: https://www.techinterviewhandbook.org/algorithms/heap/
2. Apple Swift Collections: *Heap Documentation & Implementation*  
   URL: https://github.com/apple/swift-collections
3. Swift Algorithms: *Sequence and Collection Algorithms*  
   URL: https://github.com/apple/swift-algorithms

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Complete binary tree stored in 0-indexed array: left child at `2*i + 1`, right at `2*i + 2`, parent at `(i - 1)/2` | Tech Interview Handbook | Verified | Standard binary heap indexing scheme. |
| Min-heap peek takes O(1) time | Tech Interview Handbook | Verified | The root at index 0 holds the minimum value. |
| Insert (push) and Extract (pop) take O(log N) time | Tech Interview Handbook | Verified | Tree height is bounded by $\lfloor \log_2 N \rfloor$. |
| Bottom-up heapify runs in O(N) time | Tech Interview Handbook & CLRS | Verified | Mathematical summation of node heights converges to linear time. |
| Swift standard library does not provide a built-in Heap type | Swift Standard Library & Apple docs | Verified | Swift standard library lacks Heap; `apple/swift-collections` provides `Heap<Element>`. |
| Top K largest items via Min-Heap takes O(N log K) time and O(K) space | Tech Interview Handbook | Verified | Bounding heap size to K enables sublinear auxiliary memory and faster runtime than O(N log N) sorting. |
| Running median solved with balanced max-heap and min-heap in O(1) query time | Tech Interview Handbook | Verified | Classic two-heap pattern. |
| Binary heap maintains vertical priority, unlike BST which maintains horizontal key order | Tech Interview Handbook | Verified | Crucial interview conceptual distinction. |

---

## Code Verification
- `content/topics/heaps/lesson.mdx`: 2 code blocks compiled with Swift 6.4.2 -> 2 passed, 0 failed.
- `content/topics/heaps/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6.4.2 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All factual claims, complexities, mathematical indexing formulas, and Swift 6 code examples in `heaps` are accurate, fully verified against official and community sources, and completely compliant with curriculum guidelines.
