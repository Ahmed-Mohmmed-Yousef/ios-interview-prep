# Research — Error Handling (Step 1)

Researched 2026-11-09. Topic: `error-handling` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Error Handling](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling)**
- **Representing Errors**:
  - In Swift, errors conform to the empty `Error` protocol.
  - Enumerations with associated values are the idiomatic way to model grouped, domain-specific error conditions.
- **Throwing Errors**:
  - The `throw` keyword throws an error value: `throw PrinterError.noPaper`.
  - Functions, methods, and closures that can throw errors mark their declaration with `throws` before the return arrow (`func process() throws -> String`).
- **Four Ways to Handle Errors**:
  1. **Propagate**: Forward the error up the call stack by declaring the calling function `throws`. Requires `try` at the call site.
  2. **Catch (`do-catch`)**: Handle errors using pattern matching. A general `catch` block provides an implicit `error` constant.
  3. **Convert to Optional (`try?`)**: If an error is thrown, the expression evaluates to `nil`. On success, the value is wrapped in an Optional (`Type?`).
  4. **Force (`try!`)**: Asserts that no error will be thrown. If an error is thrown, the application crashes with a runtime error.
- **Cleanup with `defer`**:
  - A `defer` block executes just before current code leaves its surrounding scope.
  - Runs regardless of how the scope exits (normal return, thrown error, or break).
  - Multiple `defer` blocks execute in **reverse order** (bottom-up / LIFO).

**Apple Developer Documentation — [Result](https://developer.apple.com/documentation/swift/result)**
- `Result<Success, Failure: Error>` is an enumeration with two cases:
  - `.success(Success)`
  - `.failure(Failure)`
- Useful for passing the result of an operation asynchronously across threads or storing completion states.
- The `.get()` method unwraps the success value or throws the failure error.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Throwing error | `throw NetworkError.badURL` | Triggers error propagation |
| Missing `try` compiler check | Calling throwing function without `try` | Compile error: `call can throw but is not marked with 'try'` |
| `do-catch` pattern matching | `catch NetworkError.badURL` | Matches specific enum error case |
| Implicit `error` constant | `catch { print(error) }` | `error` variable available automatically |
| `try?` conversion to optional | `let x = try? failingFunc()` | Returns `nil` without crashing |
| `defer` reverse execution order | `defer { 1 }; defer { 2 }` | Outputs `2` then `1` |
| `Result` type | `Result { try succeed() }` | Evaluates to `.success` or `.failure` |
| `Result.get()` | `try result.get()` | Returns success value or throws failure |

## 3. Common wrong ideas (traps)

1. **"Swift error handling is slow like exception unwinding in Java or C++."** False. Swift error handling does not unwind the stack. It is compiled to efficient return-code branching, matching the performance of returning a value.
2. **"You must explicitly declare `catch let error` to inspect the error."** False. Swift automatically provides an implicit constant named `error` in every general `catch` block.
3. **"`defer` statements execute in the order they are written."** False. Multiple `defer` statements execute in reverse order (last defined runs first).
4. **"`try?` throws an error if it fails."** False. `try?` suppresses the error completely, returning `nil` on failure.
5. **"`Result` can hold both a value and an error at the same time."** False. `Result` is an enum with mutually exclusive cases: `.success` OR `.failure`.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between `try`, `try?`, and `try!` in Swift?
  - How do you declare a custom error in Swift, and why are enums ideal for this?
  - What does the `defer` keyword do, and in what order do multiple `defer` blocks execute?
- **Junior**:
  - When would you use the `Result` type instead of a `throws` function?
  - How does Swift error handling differ from traditional exception handling in languages like Java or C++?
  - What is typed throws in Swift, and how does it restrict the thrown error type? (Covered in Junior level).
- **Senior**:
  - How does compiler optimization lay out typed throws and error registers in the Swift ABI? (Covered in Senior level).
