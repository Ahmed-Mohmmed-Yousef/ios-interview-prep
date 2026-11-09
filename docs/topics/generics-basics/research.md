# Research — Generics: The Basics (Step 1)

Researched 2026-11-09. Topic: `generics-basics` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Generics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/generics)**
- **Purpose and Problem Solved**:
  - Generics enable you to write flexible, reusable functions and types that work with any type according to requirements you define.
  - Eliminates code duplication without abandoning static type safety.
  - Swift's standard collections (like `Array` and `Dictionary`) are generic types.
- **Generic Functions**:
  - Use placeholder type names inside angle brackets immediately after the function name: `func swapTwoValues<T>(_ a: inout T, _ b: inout T)`.
  - The placeholder `T` does not specify what type `T` must be, but both parameters must share the identical concrete type.
  - The actual type to use for `T` is inferred from the arguments passed at the call site.
- **Generic Types**:
  - Swift allows you to define custom generic classes, structures, and enumerations: `struct Stack<Element> { ... }`.
  - Type parameters are declared in angle brackets following the type name.
  - When extending a generic type, you do not restate the type parameter list in the extension declaration: `extension Stack { var top: Element? { items.last } }`.
- **Type Constraints**:
  - Type constraints enforce that a type parameter must inherit from a specific class or conform to a protocol or protocol composition.
  - Syntax: `<T: Equatable>` specifies that `T` must conform to the `Equatable` protocol.
  - Unlocks operations defined by the constraint (such as using `==` to compare elements) inside the generic implementation.
- **Where Clauses**:
  - A generic `where` clause lets you define requirements on generic parameters or associated types: `func allItemsMatch<C1: Container, C2: Container>(_ c1: C1, _ c2: C2) -> Bool where C1.Item == C2.Item, C1.Item: Equatable`.
- **Compiler Specialization (Monomorphization)**:
  - Swift compiles generic code efficiently. During optimization, the compiler specializes generic functions for concrete types (like `Int` or `String`), generating direct machine code with zero abstraction penalty.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Generic swap function | `func swapValues<T>(_ a: inout T, _ b: inout T)` | Swaps values for any matching types |
| Type inference at call site | `swapValues(&x, &y)` where x, y are Int | Compiler infers `T` as `Int` automatically |
| Generic custom struct | `struct Stack<Element>` with `push` and `pop` | Holds typed elements safely |
| Extension on generic type | `extension Stack { var top: Element? ... }` | Reuses `Element` parameter automatically |
| Type constraint with protocol | `func findIndex<T: Equatable>(of item: T, in list: [T])` | Compiles using `==` operator cleanly |
| Missing type constraint error | Using `==` without `Equatable` constraint | Compile error: binary operator '==' cannot be applied to operands of type 'T' |

## 3. Common wrong ideas (traps)

1. **"Generics use dynamic type erasure like Java."** False. Swift preserves type metadata at runtime and uses compiler specialization (monomorphization) to generate high-performance concrete code.
2. **"You must restate angle brackets when extending a generic type (`extension Stack<Element>`)."** False. The extension declaration uses `extension Stack`, and `Element` is available implicitly.
3. **"Any and generics are interchangeable."** False. `Any` throws away type safety and requires runtime casting. Generics enforce strict compile-time types across inputs and outputs.
4. **"You can compare unconstrained generic types with `==`."** False. The compiler forbids `==` unless `T` is constrained to `Equatable`.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What are generics in Swift, and why are they better than using `Any`?
  - How do you write a generic function that swaps two values?
  - What is a type constraint, and why do we need `<T: Equatable>`?
- **Senior**:
  - How does the Swift compiler optimize generic code through specialization (monomorphization)?
  - What are the trade-offs between generic code specialization and binary code size?
