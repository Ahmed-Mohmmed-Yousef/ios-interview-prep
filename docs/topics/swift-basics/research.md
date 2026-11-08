# Research — Constants, Variables and Types (Step 1)

Researched 2026-11-08. Topic: `swift-basics` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [The Basics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics)**
- **Constants (`let`)**: A constant value cannot change after it is set.
- **Variables (`var`)**: A variable value can change to another value of the same type.
- **Apple recommendation**: Always declare a value with `let` by default. Change it to `var` only when you know its value must mutate. This makes code safer and clearer in intent.
- **Type Safety**: Swift is a **type-safe** language. The compiler verifies types before running code. Mismatched types trigger compile-time errors.
- **Type Inference**: Swift infers types automatically when you provide an initial value:
  - Integer numbers (`42`) are inferred as `Int`.
  - Floating-point numbers (`3.14159`) are always inferred as `Double` (never `Float`).
  - Text in quotation marks (`"Swift"`) is inferred as `String` (even single-character strings like `"a"`).
  - Booleans (`true`, `false`) are inferred as `Bool`.
- **Type Annotations**: Explicitly tell the compiler the type using a colon (`let score: Int = 10`). Useful when declaring a constant before assigning it, when choosing a different type (such as `Float` or `Character`), or when writing public API signatures.
- **No Automatic Numeric Conversion**: Swift **never** converts numbers between different types silently.
  - Adding an `Int` and a `Double` variable directly produces a compile error: `binary operator '+' cannot be applied to operands of type 'Int' and 'Double'`.
  - You must explicitly convert: `Double(count) + rate`.
  - Numeric literals in code (such as `3 + 0.14159`) compile because raw literal numbers do not have a fixed type until the compiler evaluates the expression.
- **Delayed Initialization with `let`**: A constant does not have to be initialized on the line where it is declared. If you provide a type annotation (`let title: String`), you can assign it later (for example inside an `if`/`else` block). The compiler checks that it is assigned **exactly once** before any code reads it.
- **Integer Types**: Swift provides `Int`, which matches the current platform's native word size (64-bit on 64-bit platforms). `Int8`, `Int16`, `Int32`, `Int64`, and unsigned variants (`UInt`, `UInt8`, etc.) exist, but Apple recommends using `Int` everywhere unless working with fixed-width external formats or performance constraints.

**Apple Developer Documentation — [Swift Standard Library Basics](https://developer.apple.com/documentation/swift)**
- Primitive types in Swift (`Int`, `Double`, `Float`, `Bool`, `String`) are implemented as value types (structures in the standard library), giving them methods and properties (for example `Int.max`, `Double.pi`).
- Arithmetic operations check for overflow by default and trap at runtime if an integer overflows, protecting memory integrity.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Reassigning a `let` constant | `let x = 5; x = 10` | Error: `cannot assign to value: 'x' is a 'let' constant` |
| Floating point literal type inference | `let pi = 3.14; type(of: pi)` | `Double` |
| Single character string literal | `let ch = "c"; type(of: ch)` | `String` (not `Character`) |
| Explicit `Character` | `let ch: Character = "c"; type(of: ch)` | `Character` |
| Adding `Int` and `Double` variables | `let a: Int = 1; let b: Double = 2.0; let c = a + b` | Error: `binary operator '+' cannot be applied to operands of type 'Int' and 'Double'` |
| Explicit conversion | `let c = Double(a) + b` | Works: `3.0` (`Double`) |
| Adding numeric literals directly | `let c = 3 + 0.14159` | Works: `3.14159` (`Double`) |
| Delayed `let` initialization | `let msg: String; if true { msg = "Hi" }; print(msg)` | Works: prints `"Hi"` |
| Reading uninitialized `let` | `let msg: String; print(msg)` | Error: `constant 'msg' used before being initialized` |
| Compile-time literal overflow | `let x: Int8 = 200` | Error: `integer literal '200' overflows when stored into 'Int8'` |

## 3. Common wrong ideas (traps)

1. **"Swift converts numbers automatically like C or JavaScript."** False. Swift requires explicit type conversion between variables of different types.
2. **"`let` means the value must be known at compile time."** False. `let` constants are runtime constants. They can hold user input, network responses, or runtime calculations. They just cannot be reassigned once set.
3. **"`let` must always be given a value immediately on declaration."** False. You can declare `let title: String` and assign it in an `if`/`else` block, as long as every branch initializes it once before use.
4. **"Single-letter quotes like `"a"` are inferred as `Character`."** False. Swift always infers `String` unless you explicitly declare `: Character`.
5. **"`Double` and `Float` are the same precision."** False. `Double` is 64-bit with ~15–17 decimal digits of precision; `Float` is 32-bit with ~6 decimal digits. Swift infers `Double` by default.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between `let` and `var` in Swift?
  - What type does Swift choose if you write `let score = 95` vs `let score = 95.0`?
  - Can you add an `Int` variable and a `Double` variable directly in Swift?
- **Junior**:
  - Why does Apple recommend `let` by default? Mention safety, compiler optimization, and thread safety.
  - What is delayed initialization with `let`, and what rules does the compiler enforce?
- **Senior**:
  - How does Swift's strict type safety and static type checking reduce runtime defects compared to dynamically typed languages?
  - When would you choose `Double` over `Float`, and why are integer types other than `Int` discouraged in public APIs?
