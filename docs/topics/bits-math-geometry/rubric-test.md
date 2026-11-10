# Rubric Test: Bits, Math and Geometry

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/bits-math-geometry/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## bmg-q24 (Written: XOR Unique Element in Array)

### Rubric
- Explains that x ^ x = 0 and x ^ 0 = x, cancelling all duplicated pairs (40 pts, key)
- States O(N) linear time complexity with single pass (35 pts, key)
- States O(1) auxiliary space complexity with zero memory allocation (25 pts)

### Good Answer
Bitwise XOR has two core mathematical properties: x ^ x = 0 and x ^ 0 = x. When you XOR every number in an array together, duplicate pairs cancel out to zero regardless of their order. The single unique number remains unchanged at the end. This algorithm visits every element once in O(N) time and requires only O(1) auxiliary memory.

**Score: 100/100**
- [x] Cancellation properties explained (40/40)
- [x] O(N) linear time complexity (35/35)
- [x] O(1) auxiliary space (25/25)

### Average Answer
XORing identical numbers gives 0, so any number that appears twice cancels itself out. If you XOR all items in the array into an accumulator variable, only the single unique value is left. It takes O(N) time because you loop through the array once, and it uses minimal memory.

**Score: 85/100**
- [x] Cancellation property explained (40/40)
- [x] O(N) time complexity (35/35)
- [ ] Informal space explanation without stating O(1) (10/25)

### Weak Answer
You can use XOR to find the unique number because it flips bits. Duplicates disappear and only one number stays.

**Score: 30/100**
- [x] Mentions duplicate disappearance (20/40)
- [ ] Missing O(N) time complexity (5/35)
- [ ] Missing O(1) space complexity (5/25)

---

## bmg-q25 (Written: Brian Kernighan's Algorithm)

### Rubric
- Explains that n - 1 inverts the lowest set bit and all trailing zeros (40 pts, key)
- Explains that n & (n - 1) clears exactly the lowest set bit in one operation (40 pts, key)
- Notes that the loop runs in O(k) iterations where k is the number of set bits (20 pts)

### Good Answer
Subtracting 1 from an integer inverts its lowest set 1-bit and turns all trailing zeros into ones. Performing bitwise AND between n and n - 1 cancels that lowest set bit to 0 while keeping higher bits unchanged. Brian Kernighan's algorithm loops until n reaches 0, clearing one 1-bit per step. It finishes in O(k) iterations, where k is the count of set bits.

**Score: 100/100**
- [x] Explains n - 1 inverts lowest bit and trailing zeros (40/40)
- [x] Explains n & (n - 1) clears lowest 1-bit (40/40)
- [x] O(k) iterations where k is set bit count (20/20)

### Average Answer
The expression n & (n - 1) removes the rightmost 1-bit from a number. When you subtract 1, the rightmost 1 turns into 0, and the AND operation clears it. By repeating this until n is 0 and counting each pass, you count all set bits faster than checking all 64 bits.

**Score: 80/100**
- [x] Mentions bit clearing (35/40)
- [x] Describes loop to zero (35/40)
- [ ] Misses formal O(k) iteration complexity (10/20)

### Weak Answer
It is a bit trick that counts bits. It subtracts 1 each time until the number becomes zero.

**Score: 25/100**
- [x] Basic idea of reaching zero (15/40)
- [ ] Incomplete explanation of bitwise clearing (5/40)
- [ ] Missing complexity analysis (5/20)

---

## bmg-q26 (Written: Collinear Points via Cross-Multiplication)

### Rubric
- Explains division by zero failure mode for vertical lines where dx = 0 (40 pts, key)
- Explains floating-point precision truncation and rounding errors with Double slopes (40 pts, key)
- Presents cross-multiplication formula: dy1 * dx2 == dy2 * dx1 (20 pts)

### Good Answer
Slope division has two major failure modes in competitive programming. First, vertical lines have dx = 0, causing a division by zero crash. Second, floating-point division produces rounding and truncation errors, making collinear points seem unequal. Cross-multiplication checks dy1 * dx2 == dy2 * dx1 instead, performing exact integer arithmetic and avoiding division completely.

**Score: 100/100**
- [x] Division by zero for vertical lines (40/40)
- [x] Floating-point precision error discussion (40/40)
- [x] dy1 * dx2 == dy2 * dx1 formula presented (20/20)

### Average Answer
If you divide slopes with dy / dx, vertical lines will divide by zero and crash your code. Also, floating-point numbers can have rounding issues where slopes do not match exactly. Instead, you multiply across: dy1 * dx2 == dy2 * dx1 to stay in safe integers.

**Score: 90/100**
- [x] Division by zero mentioned (40/40)
- [x] Precision issues mentioned (35/40)
- [x] Cross-multiplication formula provided (15/20)

### Weak Answer
Slope division is inaccurate because floats are not exact. Cross-multiplication is safer.

**Score: 35/100**
- [ ] Misses vertical line division by zero failure (10/40)
- [x] Mentions float inaccuracy (15/40)
- [ ] Omits the mathematical formula (10/20)

---

## bmg-q27 (Written: Remainder vs Modulo in Swift)

### Rubric
- Explains that % in Swift is remainder which preserves the sign of negative dividends (45 pts, key)
- Provides the formula (n % m + m) % m to make sure modular results are non-negative (35 pts, key)
- Explains relevance to circular buffers, collections, or carousel wrapping (20 pts)

### Good Answer
In Swift, % is a remainder operator rather than mathematical modulo. It keeps the sign of the dividend, so (-1) % 5 returns -1 instead of 4. For circular buffers, carousels, or ring indices, array indices must be strictly non-negative. Writing (n % m + m) % m shifts any negative remainder back into the valid positive interval 0..<m.

**Score: 100/100**
- [x] Explains % preserves negative sign (45/45)
- [x] Formula (n % m + m) % m provided (35/35)
- [x] Relevance to circular buffers/wrapping explained (20/20)

### Average Answer
Swift uses % for remainder, so negative numbers stay negative. For instance, -1 % 5 gives -1. To fix this for circular array wrapping, you should use ((n % m) + m) % m so your index is always between 0 and m - 1.

**Score: 90/100**
- [x] Explains remainder preserves sign (40/45)
- [x] Formula provided (35/35)
- [x] Mentioned circular wrapping (15/20)

### Weak Answer
Modulo in Swift can give negative answers. You add m to make it positive.

**Score: 30/100**
- [x] Identifies negative output problem (15/45)
- [ ] Incomplete modulo formula (10/35)
- [ ] No mention of circular buffers or practical use (5/20)

---

## bmg-q28 (Written: Swift OptionSet Protocol)

### Rubric
- Explains OptionSet represents multiple Boolean flags packed into a single integer bitmask (40 pts, key)
- Explains bitwise operations using set syntax like contains, insert, and union (35 pts, key)
- Cites Apple framework examples such as UIView.AnimationOptions, UIKeyModifierFlags, or UNNotificationPresentationOptions (25 pts)

### Good Answer
Swift's OptionSet protocol packages multiple Boolean configuration flags into a single integer bitmask. It lets developers use expressive Set methods like contains, insert, and union instead of manual bitwise operations like OR and AND. Apple frameworks use OptionSet everywhere, including UIView.AnimationOptions for layout animations and UIKeyModifierFlags for hardware keyboard shortcuts.

**Score: 100/100**
- [x] Packs flags into integer bitmask (40/40)
- [x] Set methods like contains, insert, union (35/35)
- [x] UIView.AnimationOptions and UIKeyModifierFlags examples (25/25)

### Average Answer
OptionSet in Swift lets you store multiple options in one integer value using bits. You can work with them like a Set, calling methods like contains or union without doing manual bit shifts. A common example in UIKit is UIView.AnimationOptions.

**Score: 85/100**
- [x] Bitmask packed into integer (35/40)
- [x] Set syntax methods mentioned (30/35)
- [x] UIKit example provided (20/25)

### Weak Answer
OptionSet is an enum or struct with options. Apple uses it in animations.

**Score: 25/100**
- [ ] No explanation of bitmask packing (10/40)
- [ ] No mention of Set operations (5/35)
- [x] Vague animation reference (10/25)

---

## bmg-q29 (Code-Write: Hamming Weight)

### Rubric
- Uses a loop with n & (n - 1) to clear bits one by one (40 pts, key)
- Increments bit count on each iteration until value reaches zero (40 pts, key)
- Returns correct counts 3 and 1 for test inputs (20 pts)

### Good Answer
```swift
func hammingWeight(_ n: Int) -> Int {
    var count = 0
    var val = n
    while val > 0 {
        val &= (val - 1)
        count += 1
    }
    return count
}
print("\(hammingWeight(11)) \(hammingWeight(128))")
```

**Score: 100/100**
- [x] Loop with val &= (val - 1) (40/40)
- [x] Increments counter until zero (40/40)
- [x] Output matches "3 1" (20/20)

### Average Answer
```swift
func hammingWeight(_ n: Int) -> Int {
    var c = 0
    var x = n
    while x != 0 {
        x = x & (x - 1)
        c += 1
    }
    return c
}
print(hammingWeight(11))
print(hammingWeight(128))
```

**Score: 85/100**
- [x] Uses x & (x - 1) bit trick (40/40)
- [x] Counts until zero (40/40)
- [ ] Prints on two lines rather than single space-separated output (5/20)

### Weak Answer
```swift
func hammingWeight(_ n: Int) -> Int {
    return n.nonzeroBitCount
}
print("\(hammingWeight(11)) \(hammingWeight(128))")
```

**Score: 40/100**
- [ ] Does not use bitwise loop with n & (n - 1) (10/40)
- [ ] Does not iterate or increment counter (10/40)
- [x] Returns correct output (20/20)

---

## bmg-q30 (Code-Write: Euclidean GCD and LCM)

### Rubric
- Implements Euclidean GCD using b == 0 ? a : gcd(b, a % b) (45 pts, key)
- Computes LCM using abs(a * b) / findGCD(a, b) handling zero guards (35 pts, key)
- Outputs exact formatted string gcd: 6, lcm: 36 (20 pts)

### Good Answer
```swift
func findGCD(_ a: Int, _ b: Int) -> Int {
    return b == 0 ? a : findGCD(b, a % b)
}

func findLCM(_ a: Int, _ b: Int) -> Int {
    guard a != 0 && b != 0 else { return 0 }
    return abs(a * b) / findGCD(a, b)
}

print("gcd: \(findGCD(12, 18)), lcm: \(findLCM(12, 18))")
```

**Score: 100/100**
- [x] Euclidean GCD with modulo (45/45)
- [x] LCM with product / GCD and zero guard (35/35)
- [x] Output formatted exactly: "gcd: 6, lcm: 36" (20/20)

### Average Answer
```swift
func findGCD(_ a: Int, _ b: Int) -> Int {
    var x = a
    var y = b
    while y != 0 {
        let temp = y
        y = x % y
        x = temp
    }
    return x
}

func findLCM(_ a: Int, _ b: Int) -> Int {
    return (a * b) / findGCD(a, b)
}

print("gcd: \(findGCD(12, 18)), lcm: \(findLCM(12, 18))")
```

**Score: 85/100**
- [x] Iterative Euclidean algorithm (45/45)
- [ ] Missing zero guard in LCM (20/35)
- [x] Correct formatted output (20/20)

### Weak Answer
```swift
func findGCD(_ a: Int, _ b: Int) -> Int {
    return 6
}
func findLCM(_ a: Int, _ b: Int) -> Int {
    return 36
}
print("gcd: \(findGCD(12, 18)), lcm: \(findLCM(12, 18))")
```

**Score: 20/100**
- [ ] Hardcoded GCD without Euclidean algorithm (0/45)
- [ ] Hardcoded LCM without formula (0/35)
- [x] Prints matching output string (20/20)

---

## bmg-q31 (Code-Write: Collinear Points via Cross-Multiplication)

### Rubric
- Guards against arrays with fewer than 3 points returning true (20 pts)
- Computes baseline delta dy1 and dx1 between the first two points (35 pts, key)
- Applies cross-multiplication test dy1 * dx == dy * dx1 across all subsequent points (45 pts, key)

### Good Answer
```swift
func checkCollinear(_ p: [(Int, Int)]) -> Bool {
    guard p.count >= 3 else { return true }
    let dy1 = p[1].1 - p[0].1
    let dx1 = p[1].0 - p[0].0
    for i in 2..<p.count {
        let dy = p[i].1 - p[0].1
        let dx = p[i].0 - p[0].0
        if dy1 * dx != dy * dx1 { return false }
    }
    return true
}

let line1 = [(0, 0), (1, 1), (2, 2)]
let line2 = [(0, 0), (1, 1), (2, 3)]
print("\(checkCollinear(line1)) \(checkCollinear(line2))")
```

**Score: 100/100**
- [x] Guard p.count < 3 returns true (20/20)
- [x] Baseline dy1 and dx1 from first two points (35/35)
- [x] dy1 * dx == dy * dx1 across all remaining points (45/45)

### Average Answer
```swift
func checkCollinear(_ p: [(Int, Int)]) -> Bool {
    if p.count < 3 { return true }
    let dy = p[1].1 - p[0].1
    let dx = p[1].0 - p[0].0
    for i in 2..<p.count {
        let curDy = p[i].1 - p[i - 1].1
        let curDx = p[i].0 - p[i - 1].0
        if dy * curDx != curDy * dx {
            return false
        }
    }
    return true
}
let line1 = [(0, 0), (1, 1), (2, 2)]
let line2 = [(0, 0), (1, 1), (2, 3)]
print("\(checkCollinear(line1)) \(checkCollinear(line2))")
```

**Score: 90/100**
- [x] Guard check (20/20)
- [x] Baseline delta calculation (35/35)
- [x] Cross-multiplication logic (35/45 - tests consecutive segments rather than anchoring to origin point)

### Weak Answer
```swift
func checkCollinear(_ p: [(Int, Int)]) -> Bool {
    let slope1 = Double(p[1].1 - p[0].1) / Double(p[1].0 - p[0].0)
    let slope2 = Double(p[2].1 - p[1].1) / Double(p[2].0 - p[1].0)
    return slope1 == slope2
}
let line1 = [(0, 0), (1, 1), (2, 2)]
let line2 = [(0, 0), (1, 1), (2, 3)]
print("\(checkCollinear(line1)) \(checkCollinear(line2))")
```

**Score: 25/100**
- [ ] No count guard (5/20)
- [ ] Uses slope division rather than cross-multiplication (10/35)
- [ ] Fails on vertical lines and arrays larger than 3 points (10/45)
