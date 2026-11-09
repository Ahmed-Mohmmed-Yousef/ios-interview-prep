# Research — Inheritance (Step 1)

Researched 2026-11-09. Topic: `inheritance` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Inheritance](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/inheritance)**
- **Class-Only Feature**:
  - Inheritance is a fundamental behavior that differentiates classes from other types in Swift.
  - Structs and enumerations cannot inherit from other types.
- **Base Classes**:
  - Swift classes do not inherit from a universal base class.
  - Any class that does not specify a superclass becomes a base class automatically.
- **Subclassing**:
  - Subclassing is the act of basing a new class on an existing class.
  - The subclass inherits characteristics, stored properties, and methods from its superclass.
  - Syntax: `class Subclass: Superclass { ... }`.
- **Overriding**:
  - A subclass can provide its own custom implementation of an instance method, type method, instance property, or subscript.
  - Overrides must be marked with the `override` keyword.
  - The Swift compiler checks that a matching definition exists on the superclass, catching accidental spelling or parameter errors.
- **Accessing Superclass Features**:
  - Code can access superclass versions of methods, properties, or subscripts using the `super` prefix: `super.someMethod()`, `super.someProperty`.
- **Overriding Properties and Observers**:
  - You can present an inherited property as a computed property in a subclass.
  - You can add property observers (`willSet`, `didSet`) to inherited stored or computed properties to monitor changes.
- **Preventing Overrides with `final`**:
  - You can prevent a method, property, or subscript from being overridden by marking it with the `final` modifier.
  - You can mark an entire class as `final` (`final class`) to prevent any other class from subclassing it.
  - Marking classes `final` allows the compiler to use direct (static) dispatch instead of dynamic table dispatch, improving runtime performance.
- **Initializer Delegation in Class Hierarchies**:
  - Designated initializers must delegate up to a designated initializer from their immediate superclass.
  - Subclasses must initialize all new stored properties before calling `super.init()`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Basic inheritance | `class Dog: Animal` | Inherits superclass methods and properties |
| `override` keyword required | Overriding without `override` | Compile error: `overriding declaration requires an 'override' keyword` |
| Erroneous override | `override` on non-existent method | Compile error: `method does not override any method from its superclass` |
| Calling `super` | `super.makeSound()` | Executes superclass behavior |
| Overriding property observers | Adding `didSet` to inherited property | Successfully triggers observer on mutation |
| `final class` prevention | Subclassing `final class` | Compile error: `inheritance from a final class` |
| Two-phase init order | Assigning `self.prop` after `super.init()` | Phase 1 requires self properties initialized before `super.init()` |

## 3. Common wrong ideas (traps)

1. **"All Swift classes inherit from a root class like NSObject or Object."** False. Swift does not have a universal base class. A class without a superclass is a root class on its own.
2. **"Structs can inherit from other structs."** False. Only classes support inheritance in Swift. Structs share behavior using protocols and composition.
3. **"You can override a stored property by redefining it as another stored property."** False. You cannot replace an inherited stored property with another stored property. You can only override getters/setters or add property observers.
4. **"Dynamic dispatch cannot be devirtualized by the compiler."** False. Marking a class or method `final` proves to the compiler that no overrides exist, enabling fast static dispatch.
5. **"Inheritance is always the best way to reuse code across types."** False. Swift favors protocols and composition. Deep class hierarchies create fragile base classes and tight coupling.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What is inheritance in Swift, and which types support it?
  - What does the `override` keyword do, and why does the compiler require it?
  - What is the purpose of the `final` keyword on classes and methods?
  - How do you call a superclass method from an overridden subclass method?
- **Senior**:
  - How does marking classes or methods `final` affect method dispatch (virtual table vs direct dispatch)?
  - Why does Swift favor composition and protocol-oriented programming over deep class inheritance hierarchies?
