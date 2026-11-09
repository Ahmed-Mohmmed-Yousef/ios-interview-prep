# Research — Methods and Initialization (Step 1)

Researched 2026-11-09. Topic: `methods-and-initialization` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Methods](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/methods)**
- **Instance Methods**:
  - Functions belonging to instances of a class, structure, or enumeration.
  - Can access instance properties and other methods directly.
  - `self` property: an implicit property referring to the current instance, used primarily to disambiguate parameter names shadowing property names (`self.x = x`).
- **Mutating Methods on Value Types**:
  - Structures and enumerations are value types whose properties cannot be modified from within normal instance methods by default.
  - The `mutating` keyword permits modifying properties from within a method: `mutating func moveBy(x: Double, y: Double)`.
  - Mutating methods can also assign an entirely new instance to `self`.
  - Calling a mutating method on a constant (`let`) struct instance triggers a compiler error (`cannot use mutating member on immutable value: 'c' is a 'let' constant`).
  - Classes do not need `mutating` because classes are reference types.
- **Type Methods**:
  - Methods called directly on the type itself, marked with `static func` (or `class func` in classes to allow subclass overrides).
  - Inside type methods, `self` refers to the type itself rather than an instance.

**The Swift book — [Initialization](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization)**
- **Initialization Role**:
  - Prepares an instance of a class, structure, or enumeration for use.
  - Declared with the `init` keyword (no `func` keyword, no return type).
  - All stored properties must be initialized before an instance can be used.
- **Default and Memberwise Initializers**:
  - Swift provides a default `init()` for classes and structs that supply default values for all properties and define no custom initializers.
  - Structures automatically receive a **memberwise initializer** (`init(prop1:prop2:)`) if they define no custom initializers.
  - Declaring a custom initializer inside the struct body suppresses the automatic memberwise initializer. Declaring custom initializers in an `extension` preserves the memberwise initializer.
- **Initializer Delegation for Value Types**:
  - Value type initializers can call other initializers of the same type using `self.init(...)`.
- **Failable Initializers**:
  - Declared with `init?`, producing an optional instance (`Type?`).
  - Written with `return nil` to trigger initialization failure when inputs are invalid.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Mutating method on struct | `mutating func moveBy(...)` | Compiles & mutates properties |
| Missing mutating keyword | Normal `func` mutating property | Compile error: `left side of mutating operator isn't mutable: 'self' is immutable` |
| Mutating call on let struct | `let p = Point(); p.moveBy(...)` | Compile error: `cannot use mutating member on immutable value: 'p' is a 'let' constant` |
| Memberwise initializer | `struct Point { var x: Double, y: Double }; Point(x: 1, y: 2)` | Synthesized automatically |
| Preserving memberwise init | `extension Point { init(square: Double) { ... } }` | Both memberwise and custom inits available |
| Type methods | `static func calculate() -> Int` | Invoked via `Type.calculate()` |
| Failable initializer | `init?(fahrenheit: Double)` | Returns `Optional(value)` or `nil` |
| Initializer delegation | `self.init(width: s, height: s)` | Delegates to another initializer |

## 3. Common wrong ideas (traps)

1. **"Methods on structs can modify properties without any special keyword."** False. Methods on value types (structs and enums) require the `mutating` keyword to modify stored properties.
2. **"You can call mutating methods on a struct declared with `let`."** False. Even if the method is marked `mutating` and the property is `var`, the enclosing struct instance must be a variable (`var`) to call mutating methods.
3. **"Classes require `mutating` methods to modify their properties."** False. Classes are reference types. Methods on classes can modify variable stored properties without `mutating`.
4. **"Adding a custom initializer preserves the automatic memberwise initializer."** False. Declaring a custom initializer in the primary struct definition removes the synthesized memberwise initializer. Use an `extension` to retain both.
5. **"Failable initializers return a non-optional instance and throw an error."** False. `init?` returns an Optional (`Type?`) and evaluates to `nil` on failure without throwing errors.

## 4. Real interview questions by level

- **Fresh**:
  - Why do struct methods require the `mutating` keyword to modify properties, while class methods do not?
  - What is a memberwise initializer in Swift, and which types receive it automatically?
  - How do you preserve the automatic memberwise initializer while adding custom initializers to a struct?
- **Junior**:
  - What is a failable initializer (`init?`), and what type does it return?
  - What happens when you attempt to call a mutating method on a constant struct instance?
  - What is the difference between `static func` and `class func` when defining type methods on classes?
- **Senior**:
  - How does two-phase initialization in Swift classes prevent accessing uninitialized memory before `super.init()`? (Covered in Wave 1 Batch 1C: `inheritance`).
