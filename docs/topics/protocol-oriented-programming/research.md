# Research: Protocol-Oriented Programming

Topic ID: `protocol-oriented-programming`
Level: Mid
Goal: After this topic, you can design code with protocols and protocol extensions.

## 1. Official Sources & Language Mechanics

### Official Sources
- **The Swift Programming Language**: Protocols
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols
- **WWDC22**: Design protocol interfaces in Swift
  https://developer.apple.com/videos/play/wwdc2022/110353/
- **WWDC15**: Protocol-Oriented Programming in Swift
  https://developer.apple.com/videos/play/wwdc2015/408/

### Core Technical Concepts
1. **Protocol Extensions with Default Implementations**:
   - Swift allows protocols to be extended to provide method and property implementations.
   - Types conforming to the protocol get these implementations for free without having to implement them manually.
   - Types can still provide their own customized implementation to override the default.

2. **Dispatch Mechanics (The Classic Swift Interview Trap)**:
   - **Protocol Requirement (in protocol declaration + extension default)**: Uses table dispatch / dynamic dispatch. If a conforming type provides an override, that override is called even when referenced through an existential or protocol type.
   - **Extension-only Method (declared only in extension, NOT in protocol declaration)**: Uses static dispatch. Calling the method through the protocol type calls the extension implementation, while calling through the concrete type calls the concrete type's implementation.

3. **Composition over Inheritance**:
   - Class inheritance is single-parent and limited to reference types (`class`).
   - Protocol-oriented programming works with value types (`struct`, `enum`) and reference types (`class`).
   - Types can conform to many small, focused protocols (e.g., `Identifiable & Equatable & CustomStringConvertible`).
   - Avoids "fragile base class" problems and unnecessary stored property baggage.

4. **Self Constraints and Where Clauses in Protocol Extensions**:
   - Extensions can be constrained: `extension Collection where Element: Equatable`.
   - Allows targeted functionality only when constraints are satisfied.

## 2. Interview Questions by Level

### Fresh / Junior
- What is protocol-oriented programming in Swift?
- How do you add a default implementation to a protocol?
- Why do we prefer protocols and structs over class inheritance hierarchies?

### Mid
- What happens when a method is declared in a protocol extension but omitted from the protocol definition?
- How does method dispatch differ between protocol requirements and extension-only methods?
- How does protocol composition (`&`) help keep protocols small and focused?

### Senior / Staff
- How does Swift dispatch protocol methods at runtime (existential containers and witness tables)?
- When would you deliberately avoid protocol abstraction in performance-critical code?
- How do you design clean API boundaries using protocol composition instead of inheritance?

## 3. Verified Swift 6 Code Snippets

```swift
protocol Greetable {
    func greet() -> String
}

extension Greetable {
    func greet() -> String {
        return "Hello from default"
    }
    
    // Extension-only method (static dispatch)
    func farewell() -> String {
        return "Farewell from protocol"
    }
}

struct Guest: Greetable {
    func greet() -> String {
        return "Hello from Guest"
    }
    func farewell() -> String {
        return "Farewell from Guest"
    }
}

let guest = Guest()
let proto: Greetable = guest

print(guest.greet())     // "Hello from Guest"
print(proto.greet())     // "Hello from Guest" (dynamic dispatch)
print(guest.farewell())  // "Farewell from Guest"
print(proto.farewell())  // "Farewell from protocol" (static dispatch!)
```
Output verified on Swift 6 compiler.
