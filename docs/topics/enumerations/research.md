# Research — Enumerations (Step 1)

Researched 2026-11-09. Topic: `enumerations` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Enumerations](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations)**
- **What is an Enumeration?**:
  - An enumeration defines a common type for a group of related values and enables you to work with those values in a type-safe way.
  - In Swift, enumeration cases do not have an integer value assigned by default (unlike C or Objective-C). The cases are full values in their own right.
- **Enumeration Syntax**:
  - Declared with the `enum` keyword: `enum CompassPoint { case north, south, east, west }`.
  - Case names follow camelCase naming conventions.
  - Once a variable or parameter type is known, dot syntax allows shorter notation: `direction = .east`.
- **Matching Enums with Switch**:
  - A `switch` statement on an enumeration must be exhaustive.
  - All cases must be covered, or a `default` branch must be provided.
- **Associated Values**:
  - Swift enums can store associated values of any given type alongside case values.
  - The stored data can vary each time you create an instance.
  - Pattern matching extracts associated values: `case let .qrCode(code):` or `case .upc(let a, let b, let c, let d):`.
- **Raw Values**:
  - Cases can come prepopulated with default values (called raw values) of a uniform type (`String`, `Character`, `Int`, `Double`).
  - Integer raw values automatically increment by 1 from the first case (starting at 0 unless specified).
  - String raw values default to the text of the case name.
  - Access raw values with `.rawValue`.
  - Initializing from a raw value uses `init?(rawValue:)`, which returns an Optional (`Type?`) because the raw value might not match any valid case.
- **Value Semantics**:
  - Enums in Swift are value types. They are copied when assigned to variables or passed to functions.
- **Properties and Methods**:
  - Enums can have computed properties and instance/mutating methods.
  - Enums **cannot** contain stored properties.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Basic enum definition & dot syntax | `enum Direction { case north }; var d: Direction = .north` | Compiles & runs cleanly |
| Exhaustive switch statement | Switch without default covering all cases | Compiles without warnings |
| Associated values | `enum Barcode { case upc(Int, Int); case qr(String) }` | Compiles & extracts values |
| Raw values (Int auto-increment) | `enum Planet: Int { case mercury = 1, venus }` | `Planet.venus.rawValue == 2` |
| Raw value failable initializer | `Planet(rawValue: 99)` | Returns `nil` (`Optional<Planet>`) |
| No stored properties in enums | `var name: String = "Test"` inside enum | Compile error: `enums must not contain stored properties` |
| No raw values with associated values | `enum Response: String { case success(Int) }` | Compile error: `enum with raw type cannot have cases with arguments` |
| Computed properties | `var isCaffeinated: Bool { switch self { ... } }` | Compiles & evaluates cleanly |

## 3. Common wrong ideas (traps)

1. **"Swift enums assign 0, 1, 2 integers to cases by default."** False. Unlike C, Swift enums have no raw integer values unless you explicitly declare an integer raw type like `enum State: Int`.
2. **"Raw values and associated values are the same thing."** False. Raw values are fixed compile-time constants shared by all instances of a case. Associated values are dynamic runtime data attached to an instance when created.
3. **"An enum can have both raw values and associated values."** False. Swift forbids an enum from declaring a raw type if its cases carry associated values (`enum with raw type cannot have cases with arguments`).
4. **"Initializing an enum with a raw value returns a non-optional value."** False. `init?(rawValue:)` is failable and returns an Optional (`Enum?`) because invalid raw values evaluate to `nil`.
5. **"Enums can store properties like structs."** False. Enums cannot have stored properties; they can only declare computed properties.

## 4. Real interview questions by level

- **Fresh**:
  - What is an enumeration in Swift, and how does it differ from enums in C or Objective-C?
  - What are raw values in Swift enums, and why does `init?(rawValue:)` return an Optional?
  - What are associated values, and how do you extract them in a switch statement?
- **Junior**:
  - When would you choose an enum with associated values over a class hierarchy?
  - Can Swift enums have properties and methods? What kind of properties are prohibited?
  - What is the difference between raw values and associated values?
- **Senior**:
  - How does the Swift runtime lay out enums with associated values in memory (spare bits, extra tags)? (Covered in Senior level).
