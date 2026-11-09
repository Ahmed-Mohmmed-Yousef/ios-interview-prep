# Topic Research: Result Builders

**Topic ID:** `result-builders`  
**Level:** Mid (Bonus)  
**Track:** Swift Language Deep Dive  
**Date:** 2026-11-09  

---

## 1. Official Sources & Language Specifications

### Swift Evolution & Swift Book
- **SE-0289: Result Builders** (Swift 5.4, previously pitched as Function Builders in Swift 5.1)
  - https://github.com/swiftlang/swift-evolution/blob/main/proposals/0289-result-builders.md
- **The Swift Programming Language: Attributes — @resultBuilder**
  - https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes
- **Apple Developer Documentation: ViewBuilder**
  - https://developer.apple.com/documentation/swiftui/viewbuilder

---

## 2. Core Concepts & Mechanics

### Definition
A result builder is a user-defined type marked with the `@resultBuilder` attribute that provides static methods for collecting, transforming, and combining a sequence of statements inside a closure into a single consolidated return value.

### Key Static Methods of a Result Builder
1. `buildBlock(_ components: Component...) -> Component` (Required):
   - Combines a list of partial results into one accumulated result.
2. `buildOptional(_ component: Component?) -> Component`:
   - Handles `if` statements without an `else` branch.
3. `buildEither(first: Component) -> Component` and `buildEither(second: Component) -> Component`:
   - Handles selection in `if-else` statements and `switch` statements.
4. `buildArray(_ components: [Component]) -> Component`:
   - Gathers items from a `for...in` loop into an array of components and produces a single component.
5. `buildExpression(_ expression: Expression) -> Component`:
   - Converts an expression into the builder's internal component type. Enables custom DSL inputs.
6. `buildFinalResult(_ component: Component) -> FinalResult`:
   - Converts the accumulated component into the ultimate return type exposed to the caller.
7. `buildLimitedAvailability(_ component: Component) -> Component`:
   - Handles API availability checks (`if #available(...)`).

### How the Compiler Rewrites Builder Blocks
Given:
```swift
@StringBuilder
func makeWelcome() -> String {
    "Welcome"
    if isMember {
        "VIP User"
    }
}
```
The compiler desugars the statements into:
```swift
let _v0 = StringBuilder.buildExpression("Welcome")
let _v1: String? = isMember ? StringBuilder.buildExpression("VIP User") : nil
let _v1_opt = StringBuilder.buildOptional(_v1)
return StringBuilder.buildBlock(_v0, _v1_opt)
```

---

## 3. Common Interview Questions & Traps

1. **Why does SwiftUI use `@ViewBuilder`?**
   - It allows declarative UI hierarchy declaration without commas, explicit arrays, or manual append calls.
2. **What happens if a builder lacks `buildOptional` or `buildEither`?**
   - Attempting to use `if` or `switch` produces a compile error: "Closure containing a control flow statement cannot be used with result builder...".
3. **Can you declare local variables (`let x = ...`) inside a result builder?**
   - Yes, local variable declarations and expressions that do not produce builder components are evaluated normally.
4. **Result Builders vs Macros:**
   - Result builders transform closures into builder method chains for DSL construction at language level. Macros operate on AST tokens at compile time to synthesize code anywhere.

---

## 4. Real-World Practical Examples
- Custom attributed string builders (`AttributedStringBuilder`).
- HTML or Markdown tree builders.
- Menu builders (`UIMenu` / SwiftUI commands).
- Validation rule builders or test assertion builders.
