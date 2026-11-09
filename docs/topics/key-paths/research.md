# Research: Key Paths

Topic ID: `key-paths`
Level: Mid [Bonus]
Goal: After this topic, you can use key paths to refer to properties.

## 1. Official Sources & Language Mechanics

### Official Sources
- **Apple Developer Documentation**: `KeyPath`
  https://developer.apple.com/documentation/swift/keypath
- **The Swift Programming Language**: Expressions
  https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions
- **Apple Developer Documentation**: `WritableKeyPath`
  https://developer.apple.com/documentation/swift/writablekeypath
- **Apple Developer Documentation**: `ReferenceWritableKeyPath`
  https://developer.apple.com/documentation/swift/referencewritablekeypath

### Core Technical Concepts
1. **Key Path Syntax & Semantics**:
   - Written with a leading backslash: `\Type.property` or shorthand `\.property` when the type is inferred from context.
   - Refers to a property without reading or invoking it immediately.
   - Read via subscript: `instance[keyPath: \.propertyName]`.
   - Written via subscript: `instance[keyPath: \.mutableProperty] = newValue`.

2. **The Key Path Type Hierarchy**:
   - `AnyKeyPath`: Erases both root and value types.
   - `PartialKeyPath<Root>`: Fixes root type, erases value type.
   - `KeyPath<Root, Value>`: Strongly typed read-only key path.
   - `WritableKeyPath<Root, Value>`: Strongly typed read-write key path for value types or mutable references.
   - `ReferenceWritableKeyPath<Root, Value>`: Strongly typed read-write key path on reference types (`class`).

3. **Key Paths as Functions (SE-0249)**:
   - Swift 5.2+ treats `\Root.Value` as equivalent to a closure `(Root) -> Value`.
   - Allows clean functional operations: `users.map(\.name)`, `orders.filter(\.isShipped)`.

4. **Key Path Chaining & Appending**:
   - Key paths can traverse nested properties: `\Order.customer.address.city`.
   - Can be combined dynamically at runtime using `appending(path:)`.

5. **Dynamic Member Lookup (`@dynamicMemberLookup`)**:
   - Type-safe forwarding of member access via key paths.
   - Underpins SwiftUI's `@Binding` projecting child bindings: `$state.user.name`.

## 2. Interview Questions by Level

### Fresh / Junior
- What is a key path in Swift?
- How do you pass a key path to `map` or `filter`?
- How do you access a property using a key path subscript?

### Mid
- What is the difference between `KeyPath`, `WritableKeyPath`, and `ReferenceWritableKeyPath`?
- How do key paths provide compile-time safety compared to Objective-C string-based KVC?
- Can key paths refer to computed properties and optional chaining?

### Senior / Staff
- How does `@dynamicMemberLookup` use key paths to create type-safe proxy wrappers?
- How does SwiftUI leverage key paths for bindings and animation identifiers?
- What are the performance characteristics of key path evaluation versus direct property access?

## 3. Verified Swift 6 Code Snippets

```swift
struct User {
    let name: String
    var age: Int
}

let user = User(name: "Taylor", age: 34)

// Read-only key path
let namePath: KeyPath<User, String> = \User.name
print("Name via keypath: \(user[keyPath: namePath])")

// Key path as closure
let users = [User(name: "Alex", age: 25), User(name: "Sam", age: 30)]
let names = users.map(\.name)
print("Names list: \(names.joined(separator: ", "))")

// Writable key path
var editableUser = User(name: "Jordan", age: 28)
let agePath: WritableKeyPath<User, Int> = \User.age
editableUser[keyPath: agePath] = 29
print("Updated age: \(editableUser.age)")
```
Output verified on Swift 6 compiler.
