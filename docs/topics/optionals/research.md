# Research — Optionals (Step 1)

Researched 2026-11-08. Topic: `optionals` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [The Basics: Optionals](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics)**
- You use optionals in situations where a value may be absent. An optional represents two possibilities: either there is a wrapped value and you can unwrap it to access that value, or there is no value at all (`nil`).
- Non-optional types can never be `nil` in Swift. If a variable is declared as `String`, it is guaranteed to always hold a valid `String`.
- You write an optional type by appending a question mark `?` to the underlying type name (e.g., `Int?`, `String?`).
- **`nil` in Swift**: `nil` is not a pointer to an unmapped memory address. It is the absence of a value of a specific type. Optionals of any type can be set to `nil`, not only object references.
- **Unwrapping Optionals**:
  1. **Optional Binding (`if let` / `guard let`)**: Checks whether an optional contains a value. If so, binds that value to a temporary constant.
     - `if let name = optionalName` or shorthand `if let name` (introduced in Swift 5.7).
     - `guard let name = optionalName else { return }` binds `name` to the enclosing scope and requires an exit (`return`, `throw`, `break`, `continue`) if `nil`.
  2. **Nil-Coalescing Operator (`??`)**: Unwraps an optional if it contains a value, or provides a default fallback value if it is `nil`: `let name = optionalName ?? "Guest"`.
  3. **Forced Unwrapping (`!`)**: Asserts that an optional definitely contains a non-nil value and accesses it immediately. If the value is `nil`, forced unwrapping causes a fatal runtime crash.
  4. **Implicitly Unwrapped Optionals (`!`)**: Declared with an exclamation mark after the type (e.g., `String!`). Automatically force-unwrapped when accessed. Useful when an optional is guaranteed to be set immediately after initialization (such as UIKit `@IBOutlet` references). If accessed while `nil`, it triggers a fatal runtime crash.

**Apple Developer Documentation — [Optional](https://developer.apple.com/documentation/swift/optional)**
- `Optional<Wrapped>` is an enumeration with two cases:
  - `case none` (corresponds to `nil`)
  - `case some(Wrapped)` (contains the wrapped value)
- `Int?` is syntactic sugar for `Optional<Int>`.
- `Optional` conforms to `Equatable` when its `Wrapped` type conforms to `Equatable`. This allows comparing optionals directly: `optionalA == optionalB` or `optionalA == nil`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Converting non-numeric string to Int | `Int("abc")` | Returns `nil` (`Int?`) |
| Passing `String?` to non-optional `String` parameter | `func f(_ s: String); f(optString)` | Error: `value of optional type 'String?' must be unwrapped` |
| Shorthand `if let` | `let name: String? = "Ann"; if let name { print(name) }` | Prints `"Ann"` |
| `guard let` without exit | `guard let x else { print("nil") }` | Error: `'guard' body must not fall through` |
| Nil-coalescing with fallback | `let val: Int? = nil; let res = val ?? 10` | Returns `10` (`Int`) |
| Forced unwrapping of `nil` | `let x: Int? = nil; print(x!)` | Fatal error: `Unexpectedly found nil while unwrapping an Optional value` |
| Optional enum representation | `Optional.some(5) == 5` | `true` |
| `Optional.none == nil` | `Optional<Int>.none == nil` | `true` |

## 3. Common wrong ideas (traps)

1. **"Optionals are pointers that can be null like in C or Java."** False. Optionals in Swift are an enum wrapper (`some` vs `none`). Any type in Swift (including `Int`, `Double`, `struct`) can be wrapped in an optional.
2. **"Forced unwrapping with `!` is safe if you checked `if x != nil` beforehand."** While it will not crash in that exact line, manual checks followed by `!` are prone to refactoring bugs and concurrency races. Idiomatic Swift uses `if let`, `guard let`, or `??`.
3. **"`String?` and `String` can be used interchangeably."** False. Swift's strict type safety treats `String?` and `String` as completely distinct types. You cannot perform string operations on `String?` without unwrapping.
4. **"An implicitly unwrapped optional (`String!`) cannot be nil."** False. It can be `nil` at any point; it simply removes the requirement to write `!` when accessing its value.
5. **"`guard let` and `if let` do the exact same thing."** False. `if let` scopes the unwrapped constant only inside the `if` block, whereas `guard let` makes the unwrapped constant available in the rest of the current function scope and enforces an early exit if `nil`.

## 4. Real interview questions by level

- **Fresh**:
  - What is an optional in Swift, and why does Swift have optionals?
  - What is the difference between `if let`, `guard let`, and `??`?
  - What happens when you force-unwrap an optional containing `nil`?
- **Junior**:
  - How is `Optional` implemented in the Swift standard library?
  - What is an Implicitly Unwrapped Optional, and when should you use one?
  - Compare `guard let` and `if let` in terms of scope, readability, and early returns.
- **Senior**:
  - How does Swift's optional design eliminate null pointer exceptions at compile time?
  - What are the memory layout and storage implications of `Optional` (enum discriminant and niche optimizations)?
