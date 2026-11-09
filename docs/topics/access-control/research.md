# Research — Access Control (Step 1)

Researched 2026-11-09. Topic: `access-control` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Access Control](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol)**
- **Modules and Source Files**:
  - A **module** is a single unit of code distribution (a framework or an app target built and imported with `import`).
  - A **source file** is a single Swift source file within a module.
- **The Access Levels (from least restrictive to most restrictive)**:
  1. **`open`**:
     - Accessible from any source file in its defining module and any module importing it.
     - Can be subclassed outside its defining module. Methods marked `open` can be overridden outside the module.
     - Applies only to classes and class members.
  2. **`public`**:
     - Accessible from any source file in its module and any importing module.
     - Classes marked `public` cannot be subclassed outside their module. Methods marked `public` cannot be overridden outside their module.
  3. **`package`**:
     - Accessible from any file inside the same Swift package (across package modules), but hidden from outside clients.
  4. **`internal`** (Default):
     - Accessible from any source file within its defining module.
     - Hidden from any source file outside that module.
     - Default access level for virtually all code.
  5. **`fileprivate`**:
     - Accessible only within its own defining source file.
  6. **`private`**:
     - Accessible only within the enclosing declaration and extensions of that declaration in the same file.
- **Guiding Principle of Access Control**:
  - No entity can be defined in terms of another entity that has a lower (more restrictive) access level.
  - A public variable cannot be declared with an internal or private type.
  - A public function cannot expose internal or private parameter types or return types.
- **Getters and Setters Access**:
  - A setter can be given a lower access level than its getter: `private(set) var score: Int`.
  - Exposes read-only access publicly while restricting mutation to the enclosing scope.
- **Initializers and Public Structs**:
  - Default initializers match the access level of the type, up to `internal`.
  - Even if a struct is declared `public`, its automatic memberwise initializer remains `internal`. To allow callers from external modules to initialize a public struct, you must explicitly declare a `public init(...)`.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Default access level | `class User { var name = "" }` | Verified as `internal` within module |
| `private(set)` read vs write | Reading `private(set)` outside type | Readable; mutation restricted to internal type |
| Guiding principle enforcement | `public func doWork(arg: InternalType)` | Compile error: function cannot be declared public because its parameter uses an internal type |
| `private` across extensions | Accessing `private` in extension in same file | Compiles cleanly in same file |
| `open` vs `public` subclassing | Subclassing `public class` in external module | Compile error: cannot inherit from non-open class outside module |
| Public struct init | Initializing `public struct` from importing module | Fails without explicit `public init` |

## 3. Common wrong ideas (traps)

1. **"Marking a struct `public` makes its memberwise initializer public."** False. The synthesized memberwise initializer is always `internal`. You must write an explicit `public init` for external modules to instantiate it.
2. **"`private` properties cannot be accessed inside extensions."** False. Extensions of the same declaration inside the same source file can freely access `private` members.
3. **"`public` classes can be subclassed by importing modules."** False. Only `open` classes can be subclassed across module boundaries. `public` classes can only be subclassed within their own module.
4. **"Access control provides security encryption."** False. Access control provides software boundary protection, encapsulation, and API cleanliness. It does not encrypt memory or prevent binary inspection.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What is the difference between `open` and `public` in Swift?
  - What is the difference between `private` and `fileprivate`?
  - What does `private(set)` do, and why is it useful in app architecture?
  - What is the default access level in Swift?
- **Senior**:
  - Why does the Swift compiler require an explicit `public init` for public structs used across modules?
  - How does `package` access control simplify multi-module Swift Package Manager architectures?
