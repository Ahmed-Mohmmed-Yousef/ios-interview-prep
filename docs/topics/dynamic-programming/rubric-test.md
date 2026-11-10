# Rubric Test: Dynamic Programming

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/dynamic-programming/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## dp-q24 (Written: Top-Down Memoization vs Bottom-Up Tabulation)

### Rubric
- Contrasts top-down recursion with memoization versus bottom-up iterative table filling (40 pts, key)
- Notes top-down computes only reached states in sparse spaces while bottom-up avoids stack overhead (35 pts, key)
- Mentions that bottom-up enables space optimization using rolling variables (25 pts)

### Good Answer
Top-down memoization begins at the target problem and recurses downward toward base cases, storing results in a cache. Bottom-up tabulation starts from the base cases and fills an array iteratively up to the target answer. Choose top-down when the state space is sparse and only a small subset of subproblems is visited. Choose bottom-up to avoid recursion call stack overhead and optimize space with rolling variables.

**Score: 100/100**
- [x] Contrasts top-down recursion with bottom-up table filling (40/40)
- [x] Sparse space vs stack overhead trade-off (35/35)
- [x] Rolling variable space optimization (25/25)

### Average Answer
Top-down uses recursion and saves answers in a dictionary so it does not repeat work. Bottom-up uses a loop and starts from the smallest base cases, building up an array. Bottom-up is usually safer because it does not risk stack overflow crashes.

**Score: 80/100**
- [x] Contrasts recursion cache vs loop table (40/40)
- [x] Mentions stack overflow prevention (25/35)
- [ ] Omits rolling variable space reduction (15/25)

### Weak Answer
Top-down is recursive and bottom-up is iterative. Both give the same answer.

**Score: 25/100**
- [x] Basic distinction (15/40)
- [ ] No discussion of sparse spaces or stack limits (5/35)
- [ ] No mention of space optimization (5/25)

---

## dp-q25 (Written: State Rolling in Climbing Stairs)

### Rubric
- Identifies that dp[i] only depends on the two preceding values: dp[i - 1] and dp[i - 2] (40 pts, key)
- Explains maintaining two scalar variables (prev1, prev2) and updating them sequentially (40 pts, key)
- Concludes that storing the entire N-length array is redundant (20 pts)

### Good Answer
The climbing stairs recurrence relation is dp[i] = dp[i - 1] + dp[i - 2]. To calculate the current step count, you only need the results of the two immediately preceding stairs. Keep two scalar variables and update them in each step. This avoids storing the full N-element array, reducing space complexity to O(1).

**Score: 100/100**
- [x] Recurrence depends only on previous two values (40/40)
- [x] Two scalar variables updated iteratively (40/40)
- [x] Full array eliminated to O(1) space (20/20)

### Average Answer
To find the ways to reach step i, you only add step i-1 and step i-2. You do not need to keep earlier values in an array. You can just use two variables, prev1 and prev2, and update them inside your loop to get O(1) space.

**Score: 85/100**
- [x] Explains dependency on i-1 and i-2 (35/40)
- [x] Uses two variables (35/40)
- [x] Achieves O(1) space (15/20)

### Weak Answer
You use two variables instead of a list because variables use less memory in Swift.

**Score: 20/100**
- [ ] No recurrence explanation (10/40)
- [ ] Vague update mechanics (5/40)
- [ ] Incomplete reasoning (5/20)

---

## dp-q26 (Written: Dynamic Programming vs Divide-and-Conquer)

### Rubric
- Identifies overlapping subproblems as the key distinguishing property (45 pts, key)
- Explains that divide-and-conquer solves independent disjoint subproblems without caching (35 pts, key)
- Provides clear contrasting examples (such as merge sort vs Fibonacci / coin change) (20 pts)

### Good Answer
Both techniques break problems down into smaller subproblems, but divide-and-conquer solves independent disjoint subproblems, like in merge sort. Dynamic programming is used when subproblems overlap and would be evaluated repeatedly by naive recursion. Caching intermediate results in dynamic programming prevents redundant computations, whereas divide-and-conquer does not need a cache.

**Score: 100/100**
- [x] Identifies overlapping subproblems (45/45)
- [x] Explains disjoint subproblems in divide-and-conquer (35/35)
- [x] Concrete examples provided (merge sort vs DP) (20/20)

### Average Answer
Divide-and-conquer splits the problem into independent parts that do not share work, like merge sort. Dynamic programming is for problems where subproblems repeat, like Fibonacci. You use a table in dynamic programming to cache answers.

**Score: 90/100**
- [x] Overlapping subproblems noted (40/45)
- [x] Disjoint subproblems in divide-and-conquer (35/35)
- [x] Examples included (15/20)

### Weak Answer
Divide-and-conquer splits things in half and dynamic programming uses arrays.

**Score: 15/100**
- [ ] Misses overlapping subproblem concept (5/45)
- [ ] No discussion of memoization / caching (5/35)
- [ ] Inaccurate simplification (5/20)

---

## dp-q27 (Written: House Robber Recurrence Relation)

### Rubric
- States the recurrence: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]) (40 pts, key)
- Explains the choice: skip house i and keep dp[i - 1], or rob house i and add to dp[i - 2] (35 pts, key)
- States base cases for empty array, single house, and two houses (25 pts)

### Good Answer
For each house i, the robber has two choices: rob the house or skip it. If the house is robbed, the robber gains nums[i] plus the loot from two houses back: dp[i - 2] + nums[i]. If skipped, the loot is dp[i - 1]. The recurrence is dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]), which prevents robbing adjacent properties.

**Score: 100/100**
- [x] States recurrence relation (40/40)
- [x] Rob vs skip choice explained (35/35)
- [x] Explains adjacency constraint (25/25)

### Average Answer
The formula is dp[i] = max(dp[i-1], dp[i-2] + nums[i]). You either skip the current house and take the loot from the previous house, or you rob the current house and add its value to the loot from two houses ago so no alarms go off.

**Score: 85/100**
- [x] Correct formula (40/40)
- [x] Choice explained clearly (35/35)
- [ ] Base cases not detailed (10/25)

### Weak Answer
You cannot rob neighbors, so you just rob all even houses or all odd houses and take the bigger sum.

**Score: 25/100**
- [ ] Flawed alternating greedy heuristic (0/40)
- [ ] No recurrence relation (10/35)
- [x] Mentions adjacent constraint (15/25)

---

## dp-q28 (Written: Dynamic Programming in Real iOS Engineering)

### Rubric
- Explains that Swift's CollectionDifference uses dynamic programming diffing algorithms (such as Myers / LCS) (50 pts, key)
- Mentions UI layout / size calculation caching in SwiftUI or self-sizing cell height caching in UIKit (50 pts, key)

### Good Answer
In iOS development, Swift's standard library CollectionDifference uses dynamic programming based on the Myers diff algorithm and longest common subsequence. This computes minimal insert and delete sets to animate table and collection view updates smoothly. In addition, SwiftUI and UIKit layout engines memoize view measurements from leaf subviews upward to prevent redundant geometry recalculations during animation frames.

**Score: 100/100**
- [x] CollectionDifference Myers / LCS diffing (50/50)
- [x] SwiftUI / UIKit layout measurement caching (50/50)

### Average Answer
Swift's CollectionDifference type uses dynamic programming to find differences between two lists so table views can animate inserts and deletes. Also, layout engines in UIKit and SwiftUI cache view sizes so they do not recalculate heights on every scroll frame.

**Score: 90/100**
- [x] CollectionDifference diffing (45/50)
- [x] View size caching in UIKit/SwiftUI (45/50)

### Weak Answer
iOS developers use dynamic programming when they write recursive algorithms on background queues.

**Score: 15/100**
- [ ] No CollectionDifference reference (5/50)
- [ ] No layout engine caching reference (10/50)

---

## dp-q29 (Code-Write: House Robber with O(1) Space)

### Rubric
- Maintains two rolling variables for previous rob states without allocating an array (40 pts, key)
- Applies recurrence: current = max(rob1 + n, rob2) (40 pts, key)
- Returns the maximum loot amount correctly for all test inputs (20 pts)

### Good Answer
```swift
func robHouses(_ nums: [Int]) -> Int {
    var rob1 = 0
    var rob2 = 0
    for n in nums {
        let temp = max(rob1 + n, rob2)
        rob1 = rob2
        rob2 = temp
    }
    return rob2
}
let h1 = [1, 2, 3, 1]
let h2 = [2, 7, 9, 3, 1]
print("\(robHouses(h1)) \(robHouses(h2))")
```

**Score: 100/100**
- [x] Two rolling variables, no array (40/40)
- [x] max(rob1 + n, rob2) recurrence (40/40)
- [x] Correct outputs 4 and 12 (20/20)

### Average Answer
Allocates an array `var dp = Array(repeating: 0, count: nums.count)` and uses `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`, which takes $O(N)$ space instead of required $O(1)$ space.

**Score: 70/100**
- [ ] Used O(N) array instead of O(1) variables (10/40)
- [x] Correct recurrence (40/40)
- [x] Output is correct (20/20)

### Weak Answer
Adds all even indices and odd indices and takes the max:
```swift
func robHouses(_ nums: [Int]) -> Int {
    var even = 0, odd = 0
    for (i, v) in nums.enumerated() {
        if i % 2 == 0 { even += v } else { odd += v }
    }
    return max(even, odd)
}
```

**Score: 30/100**
- [ ] Fails on patterns like [2, 1, 1, 2] (0/40)
- [ ] Incorrect recurrence (10/40)
- [x] Runs in O(1) space (20/20)

---

## dp-q30 (Code-Write: Unique Paths Grid DP)

### Rubric
- Initializes base row/column values to 1 (30 pts, key)
- Applies grid recurrence: dp[r][c] = dp[r - 1][c] + dp[r][c - 1] (or rolling 1D row buffer) (45 pts, key)
- Returns the final path count for the destination corner (25 pts)

### Good Answer
```swift
func uniquePaths(_ m: Int, _ n: Int) -> Int {
    var row = Array(repeating: 1, count: n)
    for _ in 1..<m {
        var newRow = Array(repeating: 1, count: n)
        for c in 1..<n {
            newRow[c] = newRow[c - 1] + row[c]
        }
        row = newRow
    }
    return row[n - 1]
}
print("\(uniquePaths(3, 7)) \(uniquePaths(3, 2))")
```

**Score: 100/100**
- [x] Base cases initialized to 1 (30/30)
- [x] Grid recurrence with rolling row buffer (45/45)
- [x] Correct outputs 28 and 3 (25/25)

### Average Answer
Uses a full 2D array `[[Int]]` of dimensions $m \times n$, producing correct results with $O(M \cdot N)$ space.

**Score: 90/100**
- [x] Base edges initialized (30/30)
- [x] 2D recurrence (40/45)
- [x] Correct outputs (20/25)

### Weak Answer
Uses naive recursion without memoization:
```swift
func uniquePaths(_ m: Int, _ n: Int) -> Int {
    if m == 1 || n == 1 { return 1 }
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
}
```

**Score: 40/100**
- [x] Base cases (20/30)
- [ ] Times out on larger grids with exponential O(2^(M+N)) runtime (10/45)
- [x] Correct for small test cases (10/25)

---

## dp-q31 (Code-Write: Partition Equal Subset Sum)

### Rubric
- Guards against odd total sums returning false immediately (25 pts)
- Computes target sum as total / 2 and tracks reachable sums using DP set or Boolean array (45 pts, key)
- Returns true when target sum is reachable and false otherwise (30 pts, key)

### Good Answer
```swift
func canPartition(_ nums: [Int]) -> Bool {
    let sum = nums.reduce(0, +)
    guard sum % 2 == 0 else { return false }
    let target = sum / 2
    var dp = Set<Int>([0])
    for n in nums {
        var nextDP = dp
        for t in dp {
            let nextVal = t + n
            if nextVal == target { return true }
            if nextVal < target { nextDP.insert(nextVal) }
        }
        dp = nextDP
    }
    return dp.contains(target)
}
let n1 = [1, 5, 11, 5]
let n2 = [1, 2, 3, 5]
print("\(canPartition(n1)) \(canPartition(n2))")
```

**Score: 100/100**
- [x] Odd sum guard (25/25)
- [x] Target total / 2 with reachable DP set (45/45)
- [x] Correct Boolean return values (30/30)

### Average Answer
Uses a 1D Boolean array `var dp = Array(repeating: false, count: target + 1)` and updates it backwards from target down to num.

**Score: 100/100**
- [x] Odd sum guard (25/25)
- [x] Backward 1D table update prevents reuse (45/45)
- [x] Correct returns (30/30)

### Weak Answer
```swift
func canPartition(_ nums: [Int]) -> Bool {
    return nums.reduce(0, +) % 2 == 0
}
```

**Score: 25/100**
- [x] Checks even sum (25/25)
- [ ] Assumes any even sum can be split equally (0/45)
- [ ] Fails on counterexamples like [1, 2, 3, 5] (0/30)
