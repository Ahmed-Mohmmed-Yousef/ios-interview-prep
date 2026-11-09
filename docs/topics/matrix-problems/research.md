# Research: Matrix Problems

## 1. Core Concepts & Technical Facts

### 2D Grid Representation in Swift
- **Memory Layout & Value Semantics**:
  - In Swift, a 2D matrix is typically represented as an array of arrays: `[[Element]]`.
  - Swift's `Array` is a struct with copy-on-write (COW) value semantics. An array of arrays is stored as an outer array containing references/buffers to individual row arrays (row-major order).
  - Traversal order matters for hardware cache lines: iterating row-by-row (`matrix[r][c]`) accesses contiguous memory buffers, which is cache-friendly. Iterating column-by-column causes cache line misses across separate row allocations.
- **Dimensions and Empty Checks**:
  - Row count: `let rows = matrix.count`.
  - Column count: `let cols = matrix.isEmpty ? 0 : matrix[0].count`.
  - Critical guard: Always verify `guard !matrix.isEmpty && !matrix[0].isEmpty else { return ... }` before reading `matrix[0].count` to avoid an `index out of range` runtime crash on `[]` or `[[]]`.
- **Indexing Convention**:
  - `(r, c)` where `r` is the row index (y-axis, vertical, top to bottom from `0` to `rows - 1`) and `c` is the column index (x-axis, horizontal, left to right from `0` to `cols - 1`).
  - Access is strictly `matrix[r][c]`.

### Coordinate Navigation & Direction Vectors
- **4-Directional Vectors**:
  - Common pattern: define delta offsets as tuples:
    ```swift
    let directions = [(-1, 0), (0, 1), (1, 0), (0, -1)] // Up, Right, Down, Left
    ```
  - For each neighbor `(dr, dc)`:
    ```swift
    let newRow = r + dr
    let newCol = c + dc
    ```
- **Bounds Checking**:
  - A cell `(r, c)` is valid if and only if:
    ```swift
    let isValid = r >= 0 && r < rows && c >= 0 && c < cols
    ```
- **8-Directional Vectors**:
  - Adds 4 diagonals: `(-1, -1)`, `(-1, 1)`, `(1, -1)`, `(1, 1)`.

### Core Algorithmic Patterns
1. **Depth-First Search (DFS) / Connected Components**:
   - Classic problems: *Number of Islands*, *Max Area of Island*, *Flood Fill*.
   - Approach: Scan every cell. When a target cell (e.g. `'1'` or matching color) is encountered, increment count and trigger DFS to explore all 4 connected neighbors.
   - Visited tracking: Mark visited cells in-place (e.g. mutate `'1'` to `'0'`) to avoid $\mathcal{O}(m \cdot n)$ auxiliary hash sets, or use a separate `[[Bool]]` array if the input matrix is immutable.
   - Complexity: Time $\mathcal{O}(m \cdot n)$ because every cell is visited at most a constant number of times. Space $\mathcal{O}(m \cdot n)$ for call stack recursion in the worst case (e.g. entire grid is land).
2. **Breadth-First Search (BFS) / Level-Order Shortest Path**:
   - Classic problems: *Rotting Oranges*, *Shortest Path in Binary Matrix*.
   - Approach: Multi-source or single-source queue tracking `(row, col, distance)`.
   - In Swift, standard arrays have $\mathcal{O}(n)$ `removeFirst()`. For optimal BFS in Swift, use an integer pointer `head` index over a flat array or a double-ended queue data structure.
   - Complexity: Time $\mathcal{O}(m \cdot n)$, Space $\mathcal{O}(m \cdot n)$ queue capacity.
3. **Boundary Shrinking (Spiral Traversal)**:
   - Classic problem: *Spiral Matrix*.
   - Approach: Maintain 4 boundaries (`top = 0`, `bottom = rows - 1`, `left = 0`, `right = cols - 1`).
   - Traverse: left to right on `top`, increment `top`; top to bottom on `right`, decrement `right`; right to left on `bottom` (if `top <= bottom`), decrement `bottom`; bottom to top on `left` (if `left <= right`), increment `left`.
   - Complexity: Time $\mathcal{O}(m \cdot n)$, Space $\mathcal{O}(1)$ auxiliary.
4. **In-Place Matrix Transformations**:
   - Classic problem: *Rotate Image (90 degrees clockwise)*.
   - Approach: Two-step transformation:
     1. Transpose the matrix: swap `matrix[r][c]` with `matrix[c][r]` for all `r < c`.
     2. Reverse each row: `matrix[r].reverse()` for all `r`.
   - Complexity: Time $\mathcal{O}(n^2)$ for an $n \times n$ matrix, Space $\mathcal{O}(1)$ in-place auxiliary memory.

---

## 2. Common Misconceptions & Traps

1. **Swapping row and column coordinates**:
   - Writing `matrix[c][r]` or checking `c < rows` and `r < cols`. This causes subtle out-of-bounds crashes whenever $rows \neq cols$.
2. **Missing empty matrix edge cases**:
   - Attempting `let cols = matrix[0].count` without checking `if matrix.isEmpty`. An empty array `[]` will immediately crash with an `index out of range` exception.
3. **Infinite recursion / loop in DFS/BFS**:
   - Forgetting to mark the current cell as visited *before* branching into neighbors. In BFS, failing to mark upon enqueueing causes duplicate entries to explode exponentially.
4. **Mutating values across rectangular boundaries**:
   - Transposing a non-square matrix ($m \neq n$) in-place requires resizing rows/cols, which cannot be done without reallocating arrays.
5. **Swift value semantics confusion**:
   - Passing `matrix` without `inout` creates a local copy. Modifying elements inside the function will not affect the caller's matrix unless returned or passed as `inout`.

---

## 3. Interview Questions by Level

### Fresh
- Accessing elements in a 2D grid using indices.
- Finding the row sum, column sum, or total sum of all matrix elements.
- Checking if a coordinate `(r, c)` is inside bounds.

### Junior
- *Number of Islands*: Counting connected components using DFS or BFS.
- *Flood Fill*: Changing connected pixels of the same color.
- *Rotate Image*: Rotating an $n \times n$ matrix 90 degrees clockwise in-place.
- *Spiral Matrix*: Returning elements in spiral order with boundary pointers.

### Senior
- *Word Search / Backtracking*: Searching a word across grid paths with cell restoration.
- *Pacific Atlantic Water Flow*: Multi-source BFS/DFS starting from matrix boundaries.
- *Cache Locality & Optimization*: Explaining row-major vs column-major array traversal performance in Swift.
- Memory considerations of `[[Element]]` allocations vs a flattened 1D array (`[Element]` with `index = r * cols + c`).

---

## 4. References & Documentation
- **Apple Developer Documentation**: `Array` — https://developer.apple.com/documentation/swift/array
- **Apple Developer Documentation**: `Collection` — https://developer.apple.com/documentation/swift/collection
- **Tech Interview Handbook**: Matrix cheatsheet — https://www.techinterviewhandbook.org/algorithms/matrix/
