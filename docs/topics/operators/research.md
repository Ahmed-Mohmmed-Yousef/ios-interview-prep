# Research — Operators (Step 1)

Researched 2026-11-09. Topic: `operators` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Basic Operators](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/basicoperators)**
- **Operator Kinds**:
  - Unary (prefix: `!a`, `-a`; postfix: `i!`).
  - Binary (infix: `a + b`).
  - Ternary (three targets: `condition ? answer1 : answer2`).
- **Assignment Operator (`=`)**:
  - In Swift, assignment **does not return a value**.
  - `if x = y` fails at compile time with `use of '=' in a boolean context, did you mean '=='?`. This eliminates a major source of bugs found in C and JavaScript.
- **Arithmetic Operators**:
  - Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`), Remainder (`%`).
  - Swift detects arithmetic overflow and traps with a runtime crash rather than silently wrapping values. (Overflow operators `&+`, `&-`, `&*` exist for explicit wrapping).
  - String concatenation: `+` joins strings.
  - Remainder `%`: `a % b` computes the remainder. In Swift, the sign of `b` is ignored (`a % -b` equals `a % b`). Negative `a` yields negative results (`-9 % 4 == -1`).
- **Compound Assignment**:
  - `+=`, `-=`, etc.
  - Like `=`, compound assignments return `()` (`Void`), not the updated value. `let b = (a += 2)` sets `b` to `()`.
- **Comparison Operators**:
  - Standard comparisons: `==`, `!=`, `>`, `<`, `>=`, `<=`.
  - Identity comparisons: `===` and `!==` test whether two object references refer to the exact same instance in memory.
- **Ternary Conditional Operator**:
  - `question ? answer1 : answer2` provides clean conditional expressions without multi-line `if/else` statements.
- **Nil-Coalescing Operator**:
  - `a ?? b` unwraps optional `a` if it has a value, or evaluates `b` if `a` is `nil`.
  - **Short-circuiting**: `b` is never evaluated if `a` is non-nil.
- **Range Operators**:
  - **Closed Range (`a...b`)**: runs from `a` to `b` inclusive. Requires `a <= b` (e.g. `5...2` crashes with `Fatal error: Range requires lowerBound <= upperBound`).
  - **Half-Open Range (`a..<b`)**: runs from `a` up to but not including `b`. Ideal for zero-indexed collections of count `n`.
  - **One-Sided Ranges**: `a...`, `...b`, `..<b`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Assignment inside `if` | `if x = y { }` | Compile error: `use of '=' in a boolean context, did you mean '=='?` |
| Compound assignment return | `let b = (a += 1)` | Warning: inferred to have type `()` |
| Negative integer remainder | `-9 % 4` | `-1` |
| Negative divisor remainder | `9 % -4` | `1` |
| Ternary conditional | `true ? "Day" : "Night"` | `"Day"` |
| Closed range inclusive | `(1...3).contains(3)` | `true` |
| Half-open range exclusive | `(1..<3).contains(3)` | `false` |
| Range with `a > b` | `5...2` | Fatal runtime error: `Range requires lowerBound <= upperBound` |
| Nil-coalescing short-circuit | `let opt: String? = "A"; opt ?? fallback()` | `fallback()` is never called |

## 3. Common wrong ideas (traps)

1. **"Writing `if x = 5` compiles like in C."** False. Swift's assignment operator returns `Void`, so it cannot be used inside conditional tests.
2. **"`a...b` works in reverse order for countdowns (e.g. `5...1`)."** False. The lower bound must be less than or equal to the upper bound. Countdowns require `(1...5).reversed()`.
3. **"`a % b` uses floating-point modulo."** False. `%` is the integer remainder operator. Floating-point remainder uses `.truncatingRemainder(dividingBy:)`.
4. **"`==` and `===` do the same thing."** False. `==` checks whether two values are equal according to their `Equatable` implementation. `===` checks whether two references point to the exact same class instance in memory.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between `==` and `===` in Swift?
  - What is the difference between closed range `...` and half-open range `..<`?
  - Why does Swift refuse to compile `if x = y`?
- **Junior**:
  - How does short-circuit evaluation work with `??`, `&&`, and `||`?
  - What happens when an arithmetic operation overflows in Swift, and how does Swift prevent silent data corruption?
- **Senior**:
  - How do custom operator definitions and precedence groups work in Swift, and what are the API design trade-offs of operator overloading?
