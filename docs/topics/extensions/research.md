# Research — Extensions (Step 1)

Researched 2026-11-09. Topic: `extensions` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Extensions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/extensions)**
- **Definition and Scope**:
  - Extensions add new functionality to an existing class, structure, enumeration, or protocol type.
  - Can extend types even when you do not own or have access to their original source code (retroactive modeling).
- **What Extensions Can Add**:
  - Add computed instance properties and computed type properties.
  - Define new instance methods and type methods (`static func`).
  - Provide new initializers:
    - For structs: adding an initializer in an extension preserves the default memberwise initializer.
    - For classes: extensions can add convenience initializers, but cannot add designated initializers or deinitializers.
  - Define new subscripts.
  - Define and use new nested types.
  - Make existing types conform to protocols.
- **What Extensions Cannot Do**:
  - Extensions cannot add stored properties.
  - Extensions cannot add property observers (`willSet`, `didSet`) to existing stored properties.
  - Extensions cannot override existing methods or properties on classes (overriding belongs exclusively to subclasses).
- **Mutating Methods in Extensions**:
  - Instance methods added with an extension that modify `self` in a structure or enumeration must be marked with `mutating`.
- **Protocol Extensions**:
  - Extensions can extend protocols to provide default implementations of requirements to all conforming types.
  - Can also define new helper methods available to all conforming types.
  - Dispatch behavior difference:
    - Methods declared in the protocol blueprint and implemented in an extension use dynamic dispatch (witness tables), allowing conforming types to customize them.
    - Methods defined purely in a protocol extension without declaration in the protocol blueprint use static direct dispatch and cannot be dynamically customized.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Computed property extension | `extension Double { var km: Double { self * 1000 } }` | Extends Double cleanly |
| Struct memberwise init preservation | Custom init declared in extension of struct | Both custom init and memberwise init compile |
| Stored property in extension | `extension Int { var count = 0 }` | Compile error: extensions must not contain stored properties |
| Protocol conformance via extension | `extension String: SomeProtocol` | Adopts protocol cleanly |
| Protocol default implementation | `extension Describable { func desc() { ... } }` | Provides default behavior |
| Class convenience init in extension | `convenience init(...)` in extension | Compiles cleanly; delegates to designated init |
| Overriding in extension | `override func existingMethod()` in extension | Compile error: cannot override declarations in extensions |

## 3. Common wrong ideas (traps)

1. **"Extensions can add stored properties if given default values."** False. Extensions can never add stored properties, regardless of initial values.
2. **"Adding an initializer in an extension overwrites the memberwise initializer for structs."** False. Adding an initializer inside the struct body removes the memberwise initializer, but adding it in an extension preserves both.
3. **"Classes can add designated initializers in extensions."** False. Class extensions can only add convenience initializers. Designated initializers must remain in the class body.
4. **"Protocol extension methods are always dynamically dispatched."** False. If a method is not declared in the protocol definition, it uses static dispatch and cannot be dynamically overridden by conforming types.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What can and cannot be added using Swift extensions?
  - How do extensions preserve the memberwise initializer of a struct?
  - How do you use extensions to adopt protocols cleanly?
- **Senior**:
  - What is the difference in method dispatch between a protocol method implemented in an extension versus a method defined solely in a protocol extension?
  - How do conditional protocol extensions (`extension Collection where Element: Equatable`) enable targeted functionality?
