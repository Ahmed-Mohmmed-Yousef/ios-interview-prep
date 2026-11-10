# Research: Dynamic Programming

Topic ID: `dynamic-programming`  
Level: Mid  
Goal: After this topic, you can solve problems by building on answers to smaller problems.

## 1. Official Sources & Algorithm Mechanics

### Sources
- **Tech Interview Handbook: Dynamic Programming Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/dynamic-programming/
- **Swift Standard Library: Array**  
  https://developer.apple.com/documentation/swift/array
- **Apple Developer Documentation: NSCache**  
  https://developer.apple.com/documentation/foundation/nscache
- **Swift Standard Library: CollectionDifference (Diffing / LCS)**  
  https://developer.apple.com/documentation/swift/collectiondifference

### Core Technical Concepts
1. **Dynamic Programming Fundamentals**:
   - An optimization technique that solves problems by breaking them into overlapping subproblems, storing each intermediate result to eliminate redundant computations.
   - Requires two mandatory criteria:
     1. **Optimal Substructure**: An optimal solution to the overall problem can be assembled from optimal solutions to its constituent subproblems.
     2. **Overlapping Subproblems**: The problem recursively evaluates the same smaller subproblems repeatedly. Without overlapping subproblems, divide-and-conquer (e.g., Merge Sort) is used instead of DP.

2. **Top-Down (Memoization) vs Bottom-Up (Tabulation)**:
   - **Top-Down with Memoization**:
     - Starts with the original goal and recurses downward toward base cases.
     - Caches results in a dictionary `[State: Value]` or table `[Int]`.
     - Advantage: Only computes subproblems that are actually reached.
     - Disadvantage: Call stack overhead; risk of stack overflow on deep inputs.
   - **Bottom-Up with Tabulation**:
     - Fills a table iteratively from base cases up to the destination state.
     - Advantage: Zero recursion overhead; cache-friendly sequential array iterations.
     - **Space Optimization (State Rolling)**: If state $dp[i]$ only depends on $dp[i-1]$ and $dp[i-2]$, the full $O(N)$ array can be collapsed into two variables, achieving $O(1)$ auxiliary space.

3. **Core DP Archetypes in Technical Interviews**:
   - **Linear 1D DP (Decide to Include or Skip)**:
     - *Climbing Stairs*: $dp[i] = dp[i-1] + dp[i-2]$.
     - *House Robber*: $dp[i] = \max(dp[i-1], dp[i-2] + \text{nums}[i])$. Space optimizable to $O(1)$.
     - *Coin Change (Unbounded Knapsack)*: $dp[a] = \min_{c \in \text{coins}} (dp[a - c] + 1)$.
   - **Grid / 2D DP**:
     - *Unique Paths*: $dp[r][c] = dp[r-1][c] + dp[r][c-1]$. Space can be reduced to a single 1D row buffer of size $O(C)$.
   - **String / Sequence DP**:
     - *Longest Common Subsequence (LCS)*: Computes edit similarities between two strings; forms the mathematical basis for Swift's `CollectionDifference` and git diffs.
     - *Longest Increasing Subsequence (LIS)*: $O(N^2)$ with DP table; optimizable to $O(N \log N)$ with binary search (patience sorting).

4. **Real iOS Engineering Analogies**:
   - **Collection Difference & Table Updates**: Swift's standard library `CollectionDifference` uses dynamic programming (Myers' diff algorithm / LCS) to produce minimal insert/remove change sets for `UITableView` / `UICollectionView` batch updates.
   - **View Layout & Measurement Caching**: SwiftUI and UIKit compute subview fitting sizes bottom-up (intrinsic content size) and memoize dimensions to avoid recalculating view trees during animation frames.
   - **In-Memory Memoization**: `NSCache` and dictionary memoization prevent repeating expensive computations or parsing passes.

## 2. Common Interview Traps
- **Confusing Divide-and-Conquer with Dynamic Programming**: Divide-and-conquer subproblems are independent and non-overlapping (e.g., merge sort splits arrays into disjoint halves). DP specifically addresses overlapping subproblems.
- **Forgetting Base Cases**: Omitting $dp[0]$ or $dp[1]$ produces index-out-of-bounds crashes or propagation of incorrect zeroes.
- **Off-by-One Table Sizing**: In problems asking for an amount $A$, allocating an array of size $A$ instead of $A + 1$ causes out-of-range index crashes for $dp[A]$.
- **Overlooking $O(1)$ Space Optimizations**: Candidates often leave $O(N)$ space when the recurrence only depends on the previous one or two states. Demonstrating state rolling is a prime differentiator for Mid and Senior candidates.

## 3. Interview Answers by Experience Level
- **Fresh**: Defines memoization as caching function outputs, writes bottom-up Fibonacci or climbing stairs, and identifies base cases and state transitions.
- **Junior/Mid**: Implements 1D and 2D tabulation, identifies recurrence relations ($dp[i]$), handles coin change and house robber, and performs space optimization from $O(N)$ to $O(1)$.
- **Senior/Staff**: Analyzes time-space trade-offs between recursion call-stack limits vs iterative cache locality, reduces 2D tables to single rolling arrays, explains Myers diff algorithm in `CollectionDifference`, and applies DP patterns to mobile app UI layout and rendering pipelines.
