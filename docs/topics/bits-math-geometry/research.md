# Research: Bits, Math and Geometry

Topic ID: `bits-math-geometry`  
Level: Mid  
Goal: After this topic, you can solve problems with bit operations and math.

## 1. Official Sources & Technical Mechanics

### Sources
- **Tech Interview Handbook: Binary Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/binary/
- **Tech Interview Handbook: Math Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/math/
- **Tech Interview Handbook: Geometry Cheatsheet**  
  https://www.techinterviewhandbook.org/algorithms/geometry/
- **Swift Standard Library: FixedWidthInteger**  
  https://developer.apple.com/documentation/swift/fixedwidthinteger
- **Apple Developer Documentation: CoreGraphics (CGPoint, CGRect)**  
  https://developer.apple.com/documentation/coregraphics

### Core Technical Concepts
1. **Bitwise Operations in Swift**:
   - Operators: Bitwise AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), Left Shift (`<<`), Right Shift (`>>`).
   - Swift enforces strict overflow checking; unchecked bit shifting or arithmetic uses `&<<`, `&>>`, `&+`, `&-`.
   - Essential Bit Manipulation Tricks:
     - **Clear lowest set bit**: `n & (n - 1)`. Running this until zero counts set bits (Brian Kernighan's algorithm) in $O(k)$ iterations where $k$ is the number of 1-bits.
     - **Power of Two check**: `n > 0 && (n & (n - 1)) == 0`.
     - **Isolate lowest set bit**: `n & -n` (utilizing two's complement where $-n = \sim n + 1$).
     - **Single Number / Unique element**: Since $x \oplus x = 0$ and $x \oplus 0 = x$, folding an array with `^` finds the element appearing once while all others appear twice in $O(N)$ time and $O(1)$ space.
     - **Swift `nonzeroBitCount`**: Swift's standard library provides a hardware-accelerated population count (`popcount`) directly on `FixedWidthInteger` (e.g. `n.nonzeroBitCount`).
     - **OptionSet in Swift**: Idiomatic bitmasking in iOS architectures (`struct ViewOptions: OptionSet { let rawValue: Int; static let header = ViewOptions(rawValue: 1 << 0) ... }`).

2. **Core Mathematical Patterns**:
   - **Greatest Common Divisor (Euclidean Algorithm)**:
     `func gcd(_ a: Int, _ b: Int) -> Int { b == 0 ? a : gcd(b, a % b) }`
     Runs in logarithmic time $O(\log(\min(a, b)))$.
   - **Least Common Multiple (LCM)**:
     $$\text{lcm}(a, b) = \frac{|a \cdot b|}{\text{gcd}(a, b)}$$
   - **Remainder vs Modulo**:
     In Swift, `%` is the remainder operator, not mathematical Euclidean modulo: `(-7) % 3 == -1`.
     To ensure positive modulo: `(n % m + m) % m`.
   - **Fast Exponentiation (Binary Exponentiation)**:
     Computes $x^n$ in $O(\log n)$ time by squaring the base when $n$ is even and multiplying when $n$ is odd.
   - **Prime Numbers**:
     Testing primality in $O(\sqrt{n})$ by trial division up to $\lfloor \sqrt{n} \rfloor$.
     Finding all primes up to $n$ using the Sieve of Eratosthenes in $O(n \log \log n)$ time.

3. **Core Geometric Principles**:
   - **Distance Metrics**:
     - Euclidean distance: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. In Swift, `hypot(dx, dy)`.
     - Manhattan distance (grid distance): $d = |x_2 - x_1| + |y_2 - y_1|$.
   - **Collinear Points (Avoiding Floating-Point Division)**:
     - Three points $A(x_1, y_1), B(x_2, y_2), C(x_3, y_3)$ are collinear if the slopes $AB$ and $AC$ match.
     - Comparing slopes $\frac{y_2 - y_1}{x_2 - x_1} == \frac{y_3 - y_1}{x_3 - x_1}$ invites divide-by-zero (vertical lines) and floating point precision truncation.
     - Cross-multiplication test:
       $$(y_2 - y_1) \cdot (x_3 - x_1) == (y_3 - y_1) \cdot (x_2 - x_1)$$
   - **CoreGraphics Primitives**:
     - `CGPoint(x, y)`: 2D coordinate point.
     - `CGRect(x, y, width, height)`: 2D bounding box.
     - `CGRect.intersects(_:)`: Checks geometric intersection between two rectangular bounds.
     - Two non-rotated rectangles overlap if and only if:
       `max(rectA.minX, rectB.minX) < min(rectA.maxX, rectB.maxX) && max(rectA.minY, rectB.minY) < min(rectA.maxY, rectB.maxY)`.

## 2. Common Interview Traps
- **Integer Division and Slope Float Precision**: Dividing `dy / dx` as integers truncates decimals (e.g. `1 / 2 == 0`). Using `Double` introduces IEEE 754 precision inaccuracies. Always use cross-multiplication for collinearity.
- **Negative Modulo in Swift**: Expecting `(-1) % 5` to equal 4. In Swift `%` is remainder, returning `-1`.
- **Bit Shift Overflow**: Shifting a 32-bit integer by 32 or more bits causes undefined behavior or runtime crashes in Swift without masking.
- **Arithmetic Overflow on Large Products**: Multiplying large coordinates `(y2 - y1) * (x3 - x1)` can overflow 64-bit integers; use `Int64` or check bounds.

## 3. Interview Answers by Experience Level
- **Fresh**: Knows fundamental bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`), explains single number with XOR, uses `nonzeroBitCount`, and calculates Euclidean distance.
- **Junior/Mid**: Implements Brian Kernighan's bit clearing `n & (n - 1)`, Euclidean GCD, cross-multiplication for point collinearity, and rectangle overlap logic using CoreGraphics coordinates.
- **Senior/Staff**: Connects bit manipulation to iOS `OptionSet` architectures and memory bitmasks, discusses IEEE 754 floating point hazards, applies vector cross-products for polygon convexity / orientation tests, and designs coordinate compression for geometric bounding volumes in rendering pipelines.
