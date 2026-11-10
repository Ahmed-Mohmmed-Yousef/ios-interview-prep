# Research: Intervals

Topic ID: `intervals`  
Level: Mid  
Goal: After this topic, you can solve problems with ranges that overlap.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Interval Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/interval/
- **Swift Standard Library: Range and ClosedRange**  
  https://developer.apple.com/documentation/swift/range
- **Apple Developer Documentation: DateInterval (Foundation)**  
  https://developer.apple.com/documentation/foundation/dateinterval
- **Apple Developer Documentation: CMTimeRange (AVFoundation)**  
  https://developer.apple.com/documentation/avfoundation/cmtimerange

### Core Technical Concepts
1. **Interval Representation**:
   - An interval represents a continuous span between two points: `[start, end]`.
   - In Swift, intervals are modeled with:
     - Arrays of pairs: `[[Int]]` (e.g., `[[1, 3], [2, 6]]`) in LeetCode-style interviews.
     - Custom structs: `struct Interval { var start: Int; var end: Int }`.
     - Standard Library types: `ClosedRange<Int>` (`1...5`), `Range<Int>` (`1..<5`).
     - Foundation types: `DateInterval(start: Date, end: Date)` and `CMTimeRange` in AVFoundation for video tracks.

2. **The Overlap Condition**:
   - Two intervals $A = [s_A, e_A]$ and $B = [s_B, e_B]$ overlap if and only if:
     $$\max(s_A, s_B) \le \min(e_A, e_B)$$
   - When intervals are pre-sorted such that $s_A \le s_B$, the condition simplifies to:
     $$s_B \le e_A$$
   - Merging two overlapping intervals results in:
     $$[\min(s_A, s_B), \max(e_A, e_B)]$$

3. **Core Algorithmic Patterns**:
   - **Pattern 1: Merge Overlapping Intervals**:
     - Sort intervals by their start point: $O(N \log N)$.
     - Maintain an output array `merged`.
     - For each interval:
       - If `merged` is empty or current `start > merged.last.end`: append current.
       - Else (overlap detected): `merged.last.end = max(merged.last.end, current.end)`.
     - Time Complexity: $O(N \log N)$ (sorting dominates). Space Complexity: $O(N)$.
   - **Pattern 2: Insert Interval (Already Sorted)**:
     - Add all intervals ending strictly before the new interval starts ($e_i < s_{\text{new}}$).
     - Merge all intervals that overlap with the new interval by updating $s_{\text{new}} = \min(s_{\text{new}}, s_i)$ and $e_{\text{new}} = \max(e_{\text{new}}, e_i)$.
     - Append the merged `newInterval`.
     - Append all remaining intervals starting after the new interval ends.
     - Time Complexity: $O(N)$. Space Complexity: $O(N)$.
   - **Pattern 3: Minimum Meeting Rooms (Concurrent Resource Count)**:
     - Two approaches:
       1. **Sweep-Line / Two-Pointer**: Extract and sort all start times and end times independently. Increment active rooms when `starts[i] < ends[j]`, decrement when `starts[i] >= ends[j]`.
       2. **Min-Heap**: Sort intervals by start time. Push end times into a Min-Heap. If the earliest finishing meeting in the heap finishes before the current meeting starts, pop it. Otherwise, allocate a new room. Max heap size is the required room count.
     - Time Complexity: $O(N \log N)$. Space Complexity: $O(N)$.
   - **Pattern 4: Non-Overlapping Intervals (Greedy Interval Scheduling)**:
     - To minimize removals (or maximize disjoint intervals), sort intervals by **end time**.
     - Greedily pick the interval that ends earliest to maximize remaining time for future intervals.
     - Time Complexity: $O(N \log N)$. Space Complexity: $O(1)$ auxiliary.

## 2. Common Interview Traps
- **Forgetting to sort before merging**: Trying to merge intervals without sorting requires quadratic $O(N^2)$ pairwise comparisons.
- **Sorting by the wrong endpoint**: Sorting by start time vs end time. Merge intervals requires sorting by start time; greedy interval scheduling (maximum non-overlapping intervals) requires sorting by end time!
- **Edge cases with touching boundaries**: Whether $[1, 2]$ and $[2, 3]$ overlap depends on whether intervals are closed or half-open. In standard interviews with `[start, end]`, touching points are considered overlapping ($s_B \le e_A$).
- **Updating end point incorrectly**: Setting `merged.last.end = current.end` instead of `max(merged.last.end, current.end)`. If a large interval completely contains a smaller one (e.g. $[1, 5]$ and $[2, 3]$), setting `end = 3` would incorrectly truncate the merged interval.

## 3. Interview Answers by Experience Level
- **Fresh**: Understands start and end points, explains the overlap condition ($s_B \le e_A$ when sorted), and merges two intervals by taking the min start and max end.
- **Junior/Mid**: Implements merge intervals in $O(N \log N)$ by sorting by start time, handles touching boundaries and nested intervals using `max(last.end, curr.end)`, and solves insert interval in linear $O(N)$ time.
- **Senior/Staff**: Compares Min-Heap vs Sweep-Line coordinate compression for concurrent meeting room scheduling, explains greedy interval scheduling by end time, and connects interval algorithms to real iOS systems like EventKit calendar conflict detection, AVFoundation audio/video track timeline splicing (`CMTimeRange`), and task scheduling backoffs.
