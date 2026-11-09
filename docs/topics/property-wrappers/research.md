# Research: Property Wrappers

Topic ID: `property-wrappers`
Level: Mid
Goal: After this topic, you can explain how property wrappers work and write your own.

## 1. Official Sources & Language Mechanics

### Official Sources
- **The Swift Programming Language**: Properties (Property Wrappers section)
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties
- **The Swift Programming Language**: Attributes (`@propertyWrapper`)
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes
- **Swift Evolution Proposal**: SE-0258 Property Wrappers
  https://github.com/swiftlang/swift-evolution/blob/main/proposals/0258-property-wrappers.md

### Core Technical Concepts
1. **`@propertyWrapper` Attribute & Requirements**:
   - Applied to a struct, class, or enum.
   - Mandatory requirement: `var wrappedValue: Value { get [set] }`.
   - Optional requirement: `var projectedValue: ProjectedValue { get [set] }`.

2. **Compiler Code Synthesis**:
   - When you declare `@Clamped(max: 100) var score: Int = 50`:
     - The compiler creates a private backing storage property prefixed with an underscore: `private var _score: Clamped<Int>`.
     - Accessing `score` calls `_score.wrappedValue`.
     - Accessing `$score` calls `_score.projectedValue`.

3. **Initialization Conventions**:
   - `init(wrappedValue:)`: Enables inline assignment syntax (`@Wrapper var count = 0`).
   - Additional parameters: can be passed in parentheses at the declaration site (`@Clamped(min: 0, max: 10) var level = 1`).

4. **Projected Values (`$` syntax)**:
   - Exposes supplementary information or capability related to the wrapped property.
   - Example in custom wrappers: projecting a boolean indicating whether clamping occurred, or an error status.
   - Example in SwiftUI: `@State` has `wrappedValue: Value` and `projectedValue: Binding<Value>`.

5. **Restrictions**:
   - Cannot be applied to computed properties, global top-level variables, protocol property requirements, or properties marked `lazy`, `weak`, or `unowned`.

## 2. Interview Questions by Level

### Fresh / Junior
- What is a property wrapper in Swift?
- What is the required property of a property wrapper?
- What does the underscore prefix (`_property`) mean on a wrapped property?

### Mid
- How does the projected value (`projectedValue`) work, and how is it accessed?
- How does SwiftUI's `@State` project a `Binding` using a property wrapper?
- What does the compiler synthesize when you write `@Wrapper var count = 0`?

### Senior / Staff
- How do enclosing self property wrappers work for reference types (classes)?
- What are the concurrency implications of property wrappers under Swift 6 strict concurrency (`Sendable`)?
- When would you choose a macro (e.g. `@Observable`) over a property wrapper?

## 3. Verified Swift 6 Code Snippets

```swift
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    let range: ClosedRange<T>
    
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    
    var projectedValue: Bool {
        return value == range.upperBound || value == range.lowerBound
    }
    
    init(wrappedValue: T, range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct VolumeControl {
    @Clamped(range: 0...100) var volume: Int = 50
}

var control = VolumeControl()
print("Initial volume: \(control.volume)")

control.volume = 120 // Clamped to 100
print("Clamped volume: \(control.volume)")
print("Is at limit ($volume): \(control.$volume)")
```
Output verified on Swift 6 compiler.
