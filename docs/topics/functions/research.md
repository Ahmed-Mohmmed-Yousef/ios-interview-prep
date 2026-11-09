# Research — Functions (Step 1)

Researched 2026-11-09. Topic: `functions` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Functions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions)**
- **Function Declaration & Calling**:
  - `func name(parameters) -> ReturnType { ... }`.
  - Functions returning no value omit the return arrow (equivalent to `-> Void` or `-> ()`).
  - **Implicit Returns**: Functions containing a single expression can omit the `return` keyword.
- **Argument Labels & Parameter Names**:
  - Each parameter has an **argument label** (used at the call site) and a **parameter name** (used in the function body).
  - By default, parameters use their parameter name as their argument label.
  - Omitting argument labels: use an underscore `_` before the parameter name.
  - Custom argument labels: `func send(message: String, to recipient: String)`. Enables natural, English-like call-site sentences.
  - Default parameter values: `func greet(name: String = "Guest")`. Callers can omit arguments with defaults.
- **Parameter Mutability & In-Out Parameters**:
  - Function parameters are immutable constants (`let`) by default. Attempting to assign `param += 1` inside a function body triggers a compile-time error.
  - To modify a caller's variable in place, declare the parameter with the `inout` keyword.
  - At the call site, in-out arguments must be passed with an ampersand prefix (`&variable`).
  - Only mutable `var` variables can be passed as `inout`; passing `let` constants fails at compile time.
  - Swift implements in-out parameters using copy-in copy-out semantics.
- **Variadic Parameters**:
  - Accepts zero or more values of a specified type using `Type...`.
  - Inside the function body, the variadic parameter is accessible as an `Array<Type>`.
- **Function Types as First-Class Citizens**:
  - Every function has a specific type determined by parameter and return types: `(Int, Int) -> Int`.
  - Functions can be stored in constants/variables, passed as arguments to other functions, or returned from functions.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Parameter mutation error | `func inc(x: Int) { x += 1 }` | Compile error: `left side of mutating operator isn't mutable: 'x' is a 'let' constant` |
| In-out with let constant | `modify(&constant)` | Compile error: `cannot pass immutable value as inout argument: 'a' is a 'let' constant` |
| Implicit return | `func sq(_ x: Int) -> Int { x * x }` | Returns `16` for `sq(4)` |
| Omitting argument label | `func greet(_ name: String)` called as `greet("Sam")` | Valid call |
| Custom argument label | `func send(message: to:)` called as `send(message: "Hi", to: "Sam")` | English-like call syntax |
| In-out mutation | `double(&val)` with `inout Int` | Modifies caller variable |
| Variadic parameter | `func avg(_ n: Double...)` called with `avg(1, 2, 3)` | Accessible as `[Double]` |

## 3. Common wrong ideas (traps)

1. **"Function parameters can be modified inside the function like local variables."** False. Function parameters in Swift are constants (`let`). Modifying them requires declaring a new local variable or using `inout`.
2. **"Omitting the return type returns nil."** False. A function without a return type returns `Void` (the empty tuple `()`), not `nil`.
3. **"In-out parameters pass raw C pointers."** False. Swift in-out parameters use copy-in copy-out semantics. The value is copied into the function, mutated, and copied back on function exit.
4. **"Argument labels are just comments and can be omitted when calling."** False. Swift enforces argument labels strictly at compile time. Calling `send("Hi", "Sam")` when labels `message:to:` are expected fails to compile.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between an argument label and a parameter name in Swift?
  - Why can you not modify a function parameter directly inside its body?
  - How does an `inout` parameter work, and what symbol must you write at the call site?
- **Junior**:
  - What does it mean that functions are first-class citizens in Swift? Give an example of a function type.
  - How does copy-in copy-out work with `inout` parameters, and what happens if a function exits with a fatal crash or throw?
  - What are the API design guidelines for naming argument labels in Swift (e.g., creating grammatical English sentences)?
- **Senior**:
  - How do calling conventions (`@convention(c)`, `@convention(block)`, `@convention(thin)`) work with Swift function types when bridging to C and Objective-C runtimes?
