# Research — Properties (Step 1)

Researched 2026-11-09. Topic: `properties` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Properties](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties)**
- **Stored Properties**:
  - Store constant (`let`) or variable (`var`) values as part of an instance.
  - Provided by classes and structures.
  - Stored properties of constant structure instances: because structures are value types, declaring a structure instance as a constant (`let`) prevents modifying any of its properties, even if declared with `var`.
- **Lazy Stored Properties**:
  - A property whose initial value is not calculated until the first time it is used.
  - Declared with the `lazy` modifier.
  - Must always be declared as a variable (`var`), because its initial value might not be retrieved until after instance initialization completes (`'lazy' cannot be used on a let`).
  - Useful when a property depends on external factors or complex setup that should only execute when needed.
- **Computed Properties**:
  - Do not store values directly. They provide a getter and an optional setter to retrieve and set other properties indirectly.
  - Provided by classes, structures, and enumerations.
  - Always declared with `var` because their values can change dynamically (`'let' declarations cannot be computed properties`).
  - Shorthand setter: default parameter name is `newValue` if no name is provided.
  - Read-only computed property: omits setter and `get` keyword if single-expression.
- **Property Observers**:
  - Observe and respond to changes in a property's value.
  - `willSet`: called just before the value is stored (default parameter `newValue`).
  - `didSet`: called immediately after the new value is stored (default parameter `oldValue`).
  - Observers are **not** called when a property is set during an initializer (`init`).
  - Assigning a value to a property within its own `didSet` replaces the value without triggering `didSet` again.
- **Type Properties**:
  - Properties belonging to the type itself, declared with the `static` keyword (or `class` keyword in classes for overridable computed properties).
  - Stored type properties are lazily initialized on first access and are guaranteed thread-safe.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Stored properties on struct | `struct User { var name: String }` | Compiles & runs cleanly |
| Constant struct property immutability | `let u = User(name: "A"); u.name = "B"` | Compile error: `cannot assign to property: 'u' is a 'let' constant` |
| Lazy property deferral | `lazy var data = load()` | Execution deferred until first property access |
| `lazy let` restriction | `lazy let x = 10` | Compile error: `'lazy' cannot be used on a let` |
| Computed property getter/setter | `var area: Double { width * height }` | Evaluates dynamically on access |
| `let` on computed property | `let area: Double { ... }` | Compile error: `'let' declarations cannot be computed properties` |
| `willSet` and `didSet` execution | `counter.totalSteps = 200` | Fires `willSet(newValue)` then `didSet(oldValue)` |
| Observers during `init` | Initializing property in `init` | Observers do NOT fire |
| Type properties | `static let standard = ...` | Accessed on type directly; thread-safe lazy init |

## 3. Common wrong ideas (traps)

1. **"Lazy properties can be declared with `let` if they never change."** False. A lazy property must be declared with `var` because its initial value is assigned after the instance is initialized.
2. **"Read-only computed properties can be declared with `let`."** False. Computed properties must always be declared with `var` because their value is evaluated dynamically each time they are read.
3. **"Property observers (`didSet`) run during `init`."** False. Swift suppresses property observers during initialization to prevent half-initialized state bugs.
4. **"Constant structure instances allow mutating their `var` properties."** False. Structures are value types. When a structure instance is a `let` constant, all of its properties become immutable constants.
5. **"Computed properties store values in memory."** False. Computed properties do not allocate storage in the instance; they calculate their return value on demand.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between a stored property and a computed property in Swift?
  - Why must lazy properties always be declared with `var` instead of `let`?
  - What are property observers (`willSet` and `didSet`), and when do they execute?
- **Junior**:
  - Do property observers fire when a property is initialized in `init`? Why or why not?
  - What happens when you declare a struct instance with `let` and try to modify one of its `var` properties? How does this differ for a class instance?
  - How do stored type properties handle initialization and thread safety compared to instance stored properties?
- **Senior**:
  - How do property wrappers (`@propertyWrapper`) encapsulate property storage and observer logic across multiple types? (Covered in Senior level).
