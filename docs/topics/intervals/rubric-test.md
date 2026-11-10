# Rubric Test: Intervals

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/intervals/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## int-q24 (Written: Why Sort Intervals Before Merging)

### Rubric
- Explains that sorting aligns overlapping intervals contiguously in the array (40 pts, key)
- Explains that without sorting, every interval would need pairwise checks taking O(N squared) time (35 pts, key)
- States overall time complexity of O(N log N) dominated by sorting (25 pts)

### Good Answer
Sorting intervals by start time places potentially overlapping intervals adjacent to each other. Without sorting, detecting overlaps would require comparing every pair against every other pair in quadratic O(N squared) time. Sorting takes O(N log N) time and enables merging in a single linear O(N) pass.

**Score: 100/100**
- [x] Contiguous alignment of overlaps (40/40)
- [x] O(N^2) pairwise comparisons without sorting (35/35)
- [x] O(N log N) total time complexity (25/25)

### Average Answer
If you do not sort the intervals, an interval at the start could overlap with an interval at the end, so you would have to check all pairs taking O(N squared) time. Sorting takes O(N log N) time and lets you check just adjacent intervals.

**Score: 85/100**
- [x] Adjacent check explanation (35/40)
- [x] O(N^2) without sorting (35/35)
- [x] O(N log N) stated (15/25)

### Weak Answer
Sorting makes the intervals clean and organized so they are easier to loop through.

**Score: 15/100**
- [ ] No mention of adjacent overlap condition (5/40)
- [ ] No mention of O(N^2) pairwise cost (5/35)
- [ ] No Big-O stated (5/25)

---

## int-q25 (Written: Calculating Merged End Point with Max)

### Rubric
- Explains that an earlier interval might completely contain or enclose a later interval (40 pts, key)
- Provides a clear concrete example (such as [1, 10] and [2, 5]) (35 pts, key)
- Explains that assigning current.end directly would erroneously truncate the merged span (25 pts)

### Good Answer
When two intervals overlap, the earlier interval might completely enclose the later one. For example, consider [1, 10] and [2, 5]. If you assign the end point directly to current.end, the merged interval becomes [1, 5], which loses the tail of the original span. Taking max(10, 5) keeps the correct span [1, 10].

**Score: 100/100**
- [x] Enclosure scenario explained (40/40)
- [x] Concrete [1, 10] and [2, 5] example (35/35)
- [x] Explains truncation error (25/25)

### Average Answer
One interval might be inside another interval. For example, if you have [1, 8] and [2, 4], the end of the second interval is 4. If you do not use max, the end becomes 4 instead of 8, which is wrong.

**Score: 85/100**
- [x] Explains enclosure (35/40)
- [x] Example provided (35/35)
- [x] Explains result error (15/25)

### Weak Answer
You use max so you always get the bigger number at the end of the interval.

**Score: 20/100**
- [ ] Misses enclosure concept (10/40)
- [ ] No example (0/35)
- [ ] Vague reasoning (10/25)

---

## int-q26 (Written: Sweep-Line Two-Pointer for Meeting Rooms)

### Rubric
- Extracts start times and end times into separate sorted arrays (35 pts, key)
- Advances start pointer and increments active rooms when a meeting begins before the earliest ends (35 pts, key)
- Advances end pointer and decrements active rooms when a meeting concludes, tracking the peak room count (30 pts)

### Good Answer
The algorithm separates start times and end times into two arrays and sorts them independently. A start pointer and an end pointer track chronological event order. When a meeting starts before the earliest active meeting ends, an additional room is allocated. When an end time is reached, a room is freed, and the algorithm tracks the maximum rooms used.

**Score: 100/100**
- [x] Separate sorted arrays (35/35)
- [x] Start pointer increments room (35/35)
- [x] End pointer decrements and tracks peak (30/30)

### Average Answer
You sort starts and ends in two arrays. When a start is less than an end, you add one room because a new meeting started. When an end is reached, you subtract a room. The answer is the highest room count.

**Score: 85/100**
- [x] Two arrays sorted (35/35)
- [x] Start condition increments (30/35)
- [x] Decrement and max tracking (20/30)

### Weak Answer
You count how many meetings happen at the same time by checking meeting times.

**Score: 15/100**
- [ ] No sweep-line or array sorting mentioned (5/35)
- [ ] No two-pointer pointer mechanics (5/35)
- [ ] Vague description (5/30)

---

## int-q27 (Written: Sorting for Merge vs Non-Overlapping Intervals)

### Rubric
- States that merge intervals sorts by start time to align contiguous candidate ranges (40 pts, key)
- States that maximum non-overlapping intervals sorts by end time for greedy scheduling (40 pts, key)
- Explains that picking earliest finish times leaves maximum remaining timeline for future tasks (20 pts)

### Good Answer
Merging intervals requires sorting by start time so overlapping candidates appear contiguously in a single linear pass. In contrast, finding the maximum non-overlapping intervals uses greedy scheduling and sorts by end time. Picking the interval that finishes earliest frees up the timeline as soon as possible, leaving the maximum room for subsequent events.

**Score: 100/100**
- [x] Merge sorts by start time (40/40)
- [x] Non-overlapping sorts by end time (40/40)
- [x] Earliest finish greedy rationale (20/20)

### Average Answer
For merge intervals, you sort by start time so you can combine overlapping neighbors in one pass. For non-overlapping intervals, you sort by end time so you always pick the meeting that finishes first, leaving more time for other meetings.

**Score: 90/100**
- [x] Merge sorts by start time (40/40)
- [x] Non-overlapping sorts by end time (40/40)
- [x] Greedy rationale briefly stated (10/20)

### Weak Answer
One sorts by the first number and the other sorts by the second number.

**Score: 25/100**
- [ ] No algorithm names tied to criteria (10/40)
- [ ] No reason given (10/40)
- [ ] No greedy scheduling explanation (5/20)

---

## int-q28 (Written: iOS Framework Examples for Intervals)

### Rubric
- Cites calendar / scheduling collision detection using EventKit or DateInterval (50 pts, key)
- Cites audio / video timeline splicing or track management using AVFoundation CMTimeRange (50 pts, key)

### Good Answer
In calendar apps using EventKit and DateInterval, interval overlap logic detects booking conflicts and finds free slots among busy blocks. In video and audio editing apps using AVFoundation, CMTimeRange models media clips on an editing track to prevent track collisions and calculate timeline intersections.

**Score: 100/100**
- [x] EventKit / DateInterval calendar conflict detection (50/50)
- [x] AVFoundation CMTimeRange media clip timeline (50/50)

### Average Answer
In calendar apps, you use DateInterval to see if two events clash on a user's calendar. In video apps, you use CMTimeRange in AVFoundation to place video clips on a timeline without unwanted overlaps.

**Score: 90/100**
- [x] DateInterval calendar events (45/50)
- [x] CMTimeRange in AVFoundation (45/50)

### Weak Answer
Apps use intervals for timers and for scheduling notifications on iOS devices.

**Score: 20/100**
- [ ] No EventKit / DateInterval mention (10/50)
- [ ] No AVFoundation / CMTimeRange mention (10/50)

---

## int-q29 (Code-Write: Can Attend All Meetings)

### Rubric
- Sorts intervals by start time in O(N log N) (40 pts, key)
- Iterates through sorted intervals checking if current start < previous end (40 pts, key)
- Returns false on overlap and true when all meetings are conflict-free (20 pts)

### Good Answer
```swift
func canAttendAllMeetings(_ intervals: [[Int]]) -> Bool {
    let sorted = intervals.sorted { $0[0] < $1[0] }
    for i in 1..<sorted.count {
        if sorted[i][0] < sorted[i - 1][1] { return false }
    }
    return true
}
let m1 = [[0, 30], [5, 10], [15, 20]]
let m2 = [[7, 10], [2, 4]]
print("\(canAttendAllMeetings(m1)) \(canAttendAllMeetings(m2))")
```

**Score: 100/100**
- [x] Sorts by start time (40/40)
- [x] Checks sorted[i][0] < sorted[i-1][1] (40/40)
- [x] Returns false on collision, true otherwise (20/20)

### Average Answer
Sorts by start time and uses `<=`: `sorted[i][0] <= sorted[i - 1][1]`, rejecting back-to-back meetings that touch at an exact boundary point.

**Score: 80/100**
- [x] Sorts correctly (40/40)
- [x] Adjacent check (30/40)
- [x] Boundary point subtlety (10/20)

### Weak Answer
Compares pairs with nested loops without sorting:
```swift
func canAttendAllMeetings(_ intervals: [[Int]]) -> Bool {
    for i in 0..<intervals.count {
        for j in (i+1)..<intervals.count {
            if max(intervals[i][0], intervals[j][0]) < min(intervals[i][1], intervals[j][1]) {
                return false
            }
        }
    }
    return true
}
```

**Score: 60/100**
- [ ] Did not sort in O(N log N) (0/40)
- [x] Correct O(N^2) pairwise overlap check (40/40)
- [x] Correct Boolean return (20/20)

---

## int-q30 (Code-Write: Insert Interval)

### Rubric
- Appends intervals ending strictly before the new interval starts (35 pts, key)
- Merges all overlapping intervals updating newInterval start and end (40 pts, key)
- Appends merged interval and all remaining trailing intervals (25 pts)

### Good Answer
```swift
func insertInterval(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
    var result: [[Int]] = []
    var new = newInterval
    var i = 0
    let n = intervals.count

    while i < n && intervals[i][1] < new[0] {
        result.append(intervals[i])
        i += 1
    }
    while i < n && intervals[i][0] <= new[1] {
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    }
    result.append(new)
    while i < n {
        result.append(intervals[i])
        i += 1
    }
    return result
}
let intervals = [[1, 3], [6, 9]]
let newInterval = [2, 5]
print(insertInterval(intervals, newInterval))
```

**Score: 100/100**
- [x] Pre-overlap intervals appended (35/35)
- [x] Overlapping intervals merged (40/40)
- [x] Merged and post-overlap appended (25/25)

### Average Answer
Appends `newInterval` to `intervals` and calls `mergeIntervals(intervals.sorted())`, taking $O(N \log N)$ instead of optimal $O(N)$.

**Score: 75/100**
- [x] Correct result produced (25/35)
- [x] Merge logic works (25/40)
- [x] Suboptimal sorting $O(N \log N)$ vs required $O(N)$ (25/25)

### Weak Answer
Only inserts at the end without merging:
```swift
func insertInterval(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
    var copy = intervals
    copy.append(newInterval)
    return copy
}
```

**Score: 20/100**
- [ ] No pre-overlap separation (5/35)
- [ ] No overlap merging (0/40)
- [x] Basic array insertion (15/25)

---

## int-q31 (Code-Write: Interval Intersection)

### Rubric
- Uses two pointers to advance through both sorted interval lists simultaneously (35 pts, key)
- Computes overlap using start = max(a[0], b[0]) and end = min(a[1], b[1]) (40 pts, key)
- Advances pointer corresponding to the interval with the earlier end point (25 pts)

### Good Answer
```swift
func intervalIntersection(_ firstList: [[Int]], _ secondList: [[Int]]) -> [[Int]] {
    var result: [[Int]] = []
    var i = 0
    var j = 0
    while i < firstList.count && j < secondList.count {
        let start = max(firstList[i][0], secondList[j][0])
        let end = min(firstList[i][1], secondList[j][1])
        if start <= end {
            result.append([start, end])
        }
        if firstList[i][1] < secondList[j][1] {
            i += 1
        } else {
            j += 1
        }
    }
    return result
}
let first = [[0, 2], [5, 10]]
let second = [[1, 5], [8, 12]]
print(intervalIntersection(first, second))
```

**Score: 100/100**
- [x] Two pointers used (35/35)
- [x] Correct intersection formula (40/40)
- [x] Advances earlier ending interval pointer (25/25)

### Average Answer
Calculates intersections correctly but uses nested loops $O(N \cdot M)$ instead of the two-pointer $O(N + M)$ approach.

**Score: 70/100**
- [ ] No simultaneous two pointers (10/35)
- [x] Correct max start and min end formula (40/40)
- [x] Output matches (20/25)

### Weak Answer
Only compares matching indices `firstList[i]` and `secondList[i]`:
```swift
func intervalIntersection(_ firstList: [[Int]], _ secondList: [[Int]]) -> [[Int]] {
    return [[1, 2], [5, 5], [8, 10]]
}
```

**Score: 15/100**
- [ ] Hardcoded output (0/35)
- [ ] No intersection logic (5/40)
- [x] Compiles and prints test answer (10/25)
