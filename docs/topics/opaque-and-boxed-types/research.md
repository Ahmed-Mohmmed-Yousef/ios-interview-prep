# Research: Opaque and Boxed Types: some vs any

Topic ID: `opaque-and-boxed-types`
Level: Mid
Goal: After this topic, you can explain the difference between some and any, and choose one.

## 1. Official Sources & Language Mechanics

### Official Sources
- **The Swift Programming Language**: Opaque and Boxed Protocol Types
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes
- **WWDC22**: Embrace Swift generics
  https://developer.apple.com/videos/play/wwdc2022/110352/

### Core Technical Concepts
1. **Opaque Types (`some Protocol`)**:
   - "Reverse generic": The implementation chooses the specific concrete type, but hides the exact type identity from the caller.
   - The compiler knows the exact underlying concrete type at compile time.
   - Type identity is preserved: associated types and `Self` requirements work seamlessly.
   - All return paths in a function must return the exact same underlying type.
   - Used as parameter type (Swift 5.7+): `func render(_ shape: some Shape)` is syntactic sugar for `func render<T: Shape>(_ shape: T)`.
   - Zero runtime overhead: compiler can inline and optimize with static dispatch.

2. **Boxed Protocol Types / Existentials (`any Protocol`)**:
   - Represents a box that can hold ANY conforming type dynamically at runtime.
   - Enables heterogeneous collections: `let shapes: [any Shape] = [Circle(), Square()]`.
   - Memory layout: Uses an existential container (3-word value buffer + metadata pointer + witness table pointer). If the value exceeds 3 machine words, it allocates storage on the heap.
   - Incurs dynamic dispatch overhead through the protocol witness table.
   - Swift 6 enforces explicit `any` keyword (SE-0335) to make the performance and dynamism trade-off visible.

3. **Opening Existentials (Swift 5.7+)**:
   - Passing an `any Protocol` into a function expecting `some Protocol` automatically opens the existential box and binds its underlying type to the generic parameter.

4. **When to Choose Which**:
   - Default to `some`: It is faster, safer, preserves type identity, and enables compiler optimizations.
   - Use `any`: Only when you must store heterogeneous types in a collection or swap types at runtime.

## 2. Interview Questions by Level

### Fresh / Junior
- What does `some View` mean in SwiftUI?
- What is the difference between `some` and `any`?
- Can a function returning `some Shape` return a `Circle` in one branch and a `Square` in another?

### Mid
- Why does Swift 6 require the `any` keyword before protocol types?
- What are the performance trade-offs between `some` and `any`?
- How does `some` preserve type identity where `any` cannot?

### Senior / Staff
- How does an existential container work in memory (inline value buffer vs heap allocation)?
- How does the compiler open existentials when calling generic functions?
- How do primary associated types interact with `some Protocol<T>` vs `any Protocol<T>`?

## 3. Verified Swift 6 Code Snippets

```swift
protocol Shape {
    func draw() -> String
}

struct Circle: Shape {
    func draw() -> String { "Drawing Circle" }
}

struct Square: Shape {
    func draw() -> String { "Drawing Square" }
}

// Opaque return type: underlying type is Circle, hidden from caller
func makeOpaqueShape() -> some Shape {
    return Circle()
}

// Boxed existential: can hold different types dynamically
let shapes: [any Shape] = [Circle(), Square()]

print(makeOpaqueShape().draw())
for s in shapes {
    print(s.draw())
}
```
Output verified on Swift 6 compiler.
