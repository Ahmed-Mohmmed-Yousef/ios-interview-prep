# Research — Type Casting and Any (Step 1)

Researched 2026-11-09. Topic: `type-casting` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Type Casting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/typecasting)**
- **Definition and Purpose**:
  - Type casting is a way to check the type of an instance, or to treat that instance as a different superclass or subclass from somewhere else in its own class hierarchy.
  - Type casting in Swift is implemented with the `is` and `as` operators.
- **Checking Type with `is`**:
  - The type check operator (`is`) checks whether an instance is of a certain subclass type.
  - Returns `true` if the instance belongs to that subclass (or conforms to the checked protocol); returns `false` if not.
- **Downcasting with `as?` and `as!`**:
  - A constant or variable of a superclass type may refer to an instance of a subclass behind the scenes.
  - You can attempt to downcast to the subclass type using a downcast operator:
    - **Conditional downcast (`as?`)**: Returns an optional value of the target type. If downcasting is not possible, the result is `nil`.
    - **Forced downcast (`as!`)**: Attempts downcasting and force-unwraps the result. If downcasting fails, it triggers a runtime crash.
- **Upcasting with `as`**:
  - The `as` operator is used when the cast is guaranteed to succeed at compile time, such as upcasting from a subclass to a superclass.
  - Also used for bridged type conversions like `String as NSString`.
- **Type Casting for `Any` and `AnyObject`**:
  - Swift provides two special types for working with non-specific types:
    - **`Any`**: Can represent an instance of any type at all, including function types, structs, enums, primitives, and classes.
    - **`AnyObject`**: Can represent an instance of any class type (reference types only).
- **Pattern Matching in Switch Statements**:
  - You can use `is` and `as` patterns in a `switch` statement cases to discover the specific type of an `Any` or superclass value and unwrap it.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Type checking with `is` | `item is Movie` | Returns `true` or `false` boolean |
| Conditional downcasting | `item as? Movie` | Returns `Movie?` (unwrapped or `nil`) |
| Failed forced downcast | `item as! Song` when item is Movie | Fatal runtime error: could not cast value |
| Guaranteed upcast | `movie as MediaItem` | Safe compile-time upcast |
| `Any` holds value types | `let x: Any = 42` | Successfully stores Int value |
| `AnyObject` restricts to classes | `let y: AnyObject = 42` without Foundation | Compile error: Int does not conform to AnyObject |
| Switch pattern matching | `case let m as Movie:` | Casts and binds constant in one step |

## 3. Common wrong ideas (traps)

1. **"Type casting changes the underlying instance in memory."** False. Casting does not convert or mutate the instance. It simply treats and accesses the instance as the target type.
2. **"`AnyObject` can store any Swift type."** False. `AnyObject` can only hold class instances. `Any` is required to hold value types like structs, enums, or tuples.
3. **"`as!` is safe if you checked with `is` earlier in another function."** False. If the instance is mutated or replaced between checks, `as!` can crash. Use `as?` with optional binding instead.
4. **"You should use `Any` whenever you want flexible APIs."** False. Using `Any` discards Swift's compile-time type safety. Prefer generics and protocols for flexible code.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What is the difference between `is`, `as?`, and `as!` in Swift?
  - What is the difference between `Any` and `AnyObject`?
  - When should you use `as?` instead of `as!`?
- **Senior**:
  - How does the Swift runtime verify dynamic type casting for protocol conformances and class metatypes?
  - Why is generic constraint polymorphism preferred over collections of `[Any]` or `[AnyObject]`?
