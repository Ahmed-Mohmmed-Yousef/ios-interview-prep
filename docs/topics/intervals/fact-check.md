# Fact Check Report: Intervals

**Topic ID:** `intervals`  
**Date:** 2026-11-10  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. Tech Interview Handbook: *Interval cheatsheet for coding interviews*  
   URL: https://www.techinterviewhandbook.org/algorithms/interval/
2. Swift Standard Library: *ClosedRange and Range Documentation*  
   URL: https://developer.apple.com/documentation/swift/closedrange
3. Apple Developer Documentation: *DateInterval (Foundation)*  
   URL: https://developer.apple.com/documentation/foundation/dateinterval
4. Apple Developer Documentation: *CMTimeRange (AVFoundation / CoreMedia)*  
   URL: https://developer.apple.com/documentation/avfoundation/cmtimerange

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Overlap condition when sorted by start time is `B.start <= A.end` | Tech Interview Handbook | Verified | Standard interval overlap definition. |
| Merging overlapping intervals requires `end = max(A.end, B.end)` | Tech Interview Handbook | Verified | Handles enclosed / nested intervals properly. |
| Merging N unsorted intervals runs in O(N log N) time | Tech Interview Handbook | Verified | Sorting dominates; pass is O(N). |
| Greedy non-overlapping scheduling sorts by end time | Tech Interview Handbook & CLRS | Verified | Earliest finish time maximizes remaining availability. |
| DateInterval represents calendar intervals in Apple Foundation | Apple Developer Docs | Verified | Built-in Foundation struct for date intervals. |
| CMTimeRange models media track time intervals in AVFoundation | Apple Developer Docs | Verified | Represents start time and duration in media compositions. |
| Two-pointer sweep-line tracks concurrent resource usage in O(N log N) time | Tech Interview Handbook | Verified | Classic meeting rooms / resource count pattern. |
| Insert interval into sorted disjoint list runs in O(N) time | Tech Interview Handbook | Verified | Optimal linear scan without re-sorting. |

---

## Code Verification
- `content/topics/intervals/lesson.mdx`: 2 code blocks compiled with Swift 6.4.2 -> 2 passed, 0 failed.
- `content/topics/intervals/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6.4.2 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All technical formulas, Big-O complexities, Swift 6 implementations, and Apple framework references in `intervals` are verified, accurate, and completely aligned with interview prep standards.
