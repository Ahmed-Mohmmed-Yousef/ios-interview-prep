# Research — Closures: The Basics (Step 1)

Researched 2026-11-09. Topic: `closures-basics` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures)**
- **What is a Closure?**:
  - Closures are self-contained blocks of functionality that can be passed around and stored.
  - Three forms of closures:
    1. Global functions: named closures that do not capture values.
    2. Nested functions: named closures that can capture values from their enclosing function.
    3. Closure expressions: unnamed closures written with lightweight inline syntax.
  - Closures are **reference types**. Assigning a closure to two variables shares the underlying state.
- **Closure Expression Syntax**:
  - `{ (parameters) -> ReturnType in statements }`.
  - The `in` keyword marks the end of parameter/return declarations and the start of the closure body.
- **Syntactic Shorthand Forms**:
  - **Inferring type from context**: When passed to a function expecting a known type, parameter types and return type can be omitted: `{ a, b in a < b }`.
  - **Implicit returns from single-expression closures**: Omit the `return` keyword.
  - **Shorthand argument names**: `$0`, `$1`, `$2` refer to arguments by position, allowing the parameter list and `in` keyword to be omitted entirely: `{ $0 < $1 }`.
  - **Operator methods**: In Swift, binary operators like `<` are functions conforming to `(Type, Type) -> Bool`, so you can pass `<` directly: `items.sorted(by: <)`.
- **Trailing Closure Syntax**:
  - If a function's final argument is a closure, the closure can be written after the function call parentheses: `numbers.map { $0 * 2 }`.
  - If the closure is the only argument, parentheses can be omitted entirely: `numbers.filter { $0 > 2 }`.
- **Capturing Values**:
  - A closure can capture constants and variables from the surrounding context in which it was defined.
  - Swift manages memory for captured values, keeping them alive even after the original enclosing scope has finished executing.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Closure full syntax vs shorthand | `{ (a: String, b: String) -> Bool in a < b }` vs `{ $0 < $1 }` | Evaluates identically |
| Trailing closure syntax | `[1, 2, 3].map { $0 * 2 }` | `[2, 4, 6]` |
| Operator method as closure | `["b", "a"].sorted(by: <)` | `["a", "b"]` |
| Reference semantics of closures | Assigning closure to second variable shares captured total | Confirmed (`10, 20, 30`) |
| Capturing surrounding variables | Closure increments captured local variable outside original scope | Variable retained in closure context |

## 3. Common wrong ideas (traps)

1. **"Closures and functions are completely different language features."** False. Functions are simply named closures. They share the same underlying calling conventions and type rules.
2. **"Closures are value types like structs and arrays."** False. Closures and functions are reference types. Assigning a closure to multiple variables points to the same underlying closure and captured references.
3. **"Trailing closure syntax can only be used if there are no other arguments."** False. Trailing closure syntax applies to the final closure argument, even if preceding non-closure arguments exist (e.g. `items.sorted(by:)`).
4. **"Shorthand names like `$0` can be combined with named parameters."** False. If you declare named parameters with `in`, you cannot use `$0` or `$1` inside that closure.

## 4. Real interview questions by level

- **Fresh**:
  - What is a closure in Swift, and how does it relate to a function?
  - What does the `in` keyword do in a closure expression?
  - What are shorthand argument names like `$0` and `$1`?
- **Junior**:
  - How does trailing closure syntax work in Swift, and when does it improve code clarity?
  - Are closures value types or reference types? What happens when two variables point to the same closure?
  - How does variable capturing work in Swift closures, and why does a closure keep variables alive?
- **Senior**:
  - How do `@escaping` and `@autoclosure` attributes alter the compiler's memory management and execution lifecycle for closures? (Covered in Wave 3: `closures-escaping-capture`).
