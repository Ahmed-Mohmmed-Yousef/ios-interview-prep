# Research — Protocols (Step 1)

Researched 2026-11-09. Topic: `protocols` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols)**
- **Definition**:
  - A protocol defines a blueprint of methods, properties, and other requirements for a particular task or functionality.
  - Can be adopted by classes, structures, or enumerations. Types that satisfy these requirements conform to the protocol.
- **Property Requirements**:
  - Protocols declare properties with explicit names and types, prefixed by `var`.
  - Must state whether each property is gettable (`{ get }`) or gettable and settable (`{ get set }`).
  - A `{ get }` requirement can be satisfied by a constant (`let`), a stored variable (`var`), or a computed property.
  - A `{ get set }` requirement must be satisfied by a mutable variable (`var`) or a read-write computed property.
  - Static properties are declared with the `static` keyword in the protocol definition.
- **Method Requirements**:
  - Protocols can require instance methods and type methods (`static func`).
  - Default parameter values cannot be specified directly inside protocol declarations.
  - For value types (structs and enums) that modify `self`, the method must be marked with the `mutating` keyword in the protocol. Classes conforming to mutating requirements do not need to write `mutating`.
- **Initializer Requirements**:
  - Protocols can declare required initializers: `init(parameter: Type)`.
  - Classes conforming to protocol initializers must prefix the implementation with `required` (or mark the class `final`).
- **Protocols as Types**:
  - Protocols can be used as types for variables, constants, function parameters, and return values.
  - In Swift 6, existential types are written with `any Protocol` to make dynamic boxing explicit.
- **Protocol Inheritance and Class-Only Protocols**:
  - Protocols can inherit one or more other protocols: `protocol SubProtocol: SuperProtocol { ... }`.
  - Class-only protocols restrict conformance to classes by inheriting from `AnyObject`: `protocol Delegate: AnyObject { ... }`. This allows delegates to be stored as `weak` references.
- **Protocol Composition**:
  - Multiple protocols can be combined using the ampersand operator: `Named & Aged`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Protocol conformance on struct | `struct User: Identifiable` | Confirms value type conformance |
| `{ get }` satisfied by `let` | `let id: String` satisfying `{ get }` | Clean compilation |
| `{ get set }` requires mutable `var` | `let name: String` satisfying `{ get set }` | Compile error: candidate is not mutable |
| `mutating func` on struct | `mutating func toggle()` on struct | Compiles and mutates struct in place |
| `mutating func` on class | `func toggle()` on class (omitting `mutating`) | Compiles cleanly on class |
| `required init` on class | Omitting `required` on class protocol init | Compile error: initializer requires 'required' keyword |
| Class-only protocol with `AnyObject` | `struct S: ClassOnly` | Compile error: non-class type cannot conform |
| `weak` reference on `AnyObject` protocol | `weak var delegate: MyDelegate?` | Compiles; prevents retain cycles |

## 3. Common wrong ideas (traps)

1. **"A protocol can provide stored property storage directly."** False. Protocols define contracts only. They cannot allocate or store instance data.
2. **"Classes must write `mutating` when implementing a mutating protocol method."** False. Only value types write `mutating`. Classes have reference semantics and omit the keyword.
3. **"Any protocol can be used as a `weak` delegate reference."** False. A protocol must inherit from `AnyObject` to be stored as a `weak` reference, because weak references require class instances.
4. **"A class does not need `required` on a protocol initializer if it is not final."** False. Non-final classes must mark protocol initializers with `required` so subclasses also fulfill the protocol contract.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What is a protocol in Swift, and how does it differ from a class?
  - What is the difference between `{ get }` and `{ get set }` in protocol property requirements?
  - Why do we mark protocols with `AnyObject` for delegates?
  - Why must a class mark protocol initializers with the `required` keyword?
- **Senior**:
  - What is the performance difference between existential types (`any Protocol`) and opaque types (`some Protocol`)?
  - How do protocol witness tables (PWT) implement dynamic dispatch for protocol types?
