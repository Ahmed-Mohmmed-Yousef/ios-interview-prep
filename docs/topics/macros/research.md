# Macros — Research Notes

Verified: 2026-11-14
Baseline: Swift 6.4.2, Xcode 27, iOS 27

## Sources

1. **The Swift Programming Language: Macros** (official, Swift.org)
   - URL: `https://docs.swift.org/swift-book/documentation/the-swift-programming-language/macros`
   - Covers freestanding (`#`) vs attached (`@`) macros, macro declarations with `#externalMacro(module:type:)`, macro roles, `SwiftSyntax`, and macro expansion model.
2. **WWDC23: Write Swift macros** (official, Apple)
   - URL: `https://developer.apple.com/videos/play/wwdc2023/10166/`
   - Covers freestanding expression/declaration macros, `SwiftSyntax` AST rewriting, compiler plugin sandbox, diagnostics/fix-its, and macro testing.
3. **WWDC23: Expand on Swift macros** (official, Apple)
   - URL: `https://developer.apple.com/videos/play/wwdc2023/10167/`
   - Covers attached macro roles (`member`, `memberAttribute`, `peer`, `accessor`, `extension` + `conformances`), name specifiers (`names:`), and macro composition (`@Observable`).
4. **SE-0382: Expression Macros** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0382-expression-macros.md`
   - Covers `@freestanding(expression)` syntax, type-checked inputs/outputs, and standard library `#file`, `#line`, `#function`, `#column`.
5. **SE-0389: Attached Macros** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0389-attached-macros.md`
   - Covers `@attached(...)` roles (`peer`, `accessor`, `memberAttribute`, `member`, `extension`/`conformance`).
6. **SE-0415: Function Body Macros** (official, Swift Evolution)
   - URL: `https://github.com/swiftlang/swift-evolution/blob/main/proposals/0415-function-body-macros.md`
   - Covers `@attached(body)` (`BodyMacro`) to generate or wrap a function or accessor body (max one body macro per function).

## Verified Facts (checked with Swift 6.4.2 compiler & official docs)

- **Compile-time transformation:** Macros transform Swift syntax trees (ASTs) using `SwiftSyntax` inside an external compiler plugin target (`#externalMacro(module:type:)`). They run at compile time and generate type-checked Swift code.
- **Additive only:** Swift macros can only add new code (or wrap/replace bodies with `@attached(body)`). They cannot delete or arbitrarily rewrite unrelated declarations outside their attached scope.
- **Sandboxed:** Macro plugins run in a sandboxed process with no network access and no filesystem access, so macro expansion is deterministic and safe.
- **Two main categories:**
  1. **Freestanding macros (`#`)** stand alone without attaching to a declaration:
     - `@freestanding(expression)`: produces a value/expression (e.g., `#Predicate`, `#fileID`, `#line`, `#function`).
     - `@freestanding(declaration)`: generates new declarations in place (e.g., `#Preview`).
  2. **Attached macros (`@`)** modify or extend the declaration they are placed on:
     - `@attached(member)`: adds members inside a type or extension (e.g., `init`, properties).
     - `@attached(memberAttribute)`: adds attributes to members inside a type (e.g., `@Observable` adding `@ObservationTracked` to stored properties).
     - `@attached(peer)`: adds new declarations next to the target in the same scope (e.g., async overload next to completion-handler function).
     - `@attached(accessor)`: adds `get`, `set`, `willSet`, `didSet`, or `init` accessors to a property.
     - `@attached(extension, conformances: ...)`: adds an extension and protocol conformances (replaces older standalone `conformance` role).
     - `@attached(body)`: generates or wraps a function/accessor body (SE-0415).
- **Name specifiers (`names:`):** Macro declarations declare what names they generate (`named(...)`, `overloaded`, `prefixed(...)`, `suffixed(...)`, `arbitrary`) so the compiler knows symbol visibility before running the plugin.
- **Macros vs Property Wrappers:** Property wrappers wrap individual properties at runtime with backing storage (`_prop`), whereas macros transform AST at compile time across functions, types, expressions, and properties with zero wrapper object overhead.
- **Compiler checks verified on Swift 6.4.2:**
  - `@Observable` on `final class Cart` with `@ObservationIgnored` compiles and runs.
  - `@Observable` on `struct BadModel` fails with compile error: `'@Observable' cannot be applied to struct type 'BadModel' (from macro 'Observable')`.
  - `#Predicate<Product>` compiles and evaluates with `Foundation`.
  - `#function` and `#fileID` compile and print the enclosing function name and file ID.
  - `@freestanding(expression)` and `@attached(member, names: named(init))` + `@attached(extension, conformances: Equatable)` macro declarations typecheck and compile cleanly in Swift 6 mode (emitting only a warning when the external plugin module is not linked).

## Common Misconceptions & Interview Traps

1. **Thinking macros are unsafe C preprocessor text substitution:** Swift macros operate on parsed `SwiftSyntax` ASTs, are type-checked before and after expansion, and run in a sandbox.
2. **Thinking macros can do anything or read config files / network:** Macro plugins are sandboxed (no disk or network) and additive (cannot delete existing declarations).
3. **Confusing `#` (freestanding) and `@` (attached) or confusing property wrappers with attached macros:** `@Observable` is a macro (not a property wrapper), so it adds no `_property` wrapper struct and works across the whole class by combining `member`, `memberAttribute`, and `extension` roles.
4. **Forgetting build-time and debugging trade-offs:** Heavy macro use adds `SwiftSyntax` build-time dependency and compile cost, and Xcode's "Expand Macro" helps inspect generated code.

## Senior / Staff Interview Questions

- How do freestanding and attached macros differ, and what are the attached macro roles?
- How does `@Observable` work using multiple macro roles (`member`, `memberAttribute`, `extension`)?
- When would you choose a macro instead of a property wrapper, protocol extension, or generic code?
- What security and build-time trade-offs do Swift macros bring to a large iOS codebase?
