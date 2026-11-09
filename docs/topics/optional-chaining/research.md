# Research — Optional Chaining (Step 1)

Researched 2026-11-09. Topic: `optional-chaining` (junior). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple documentation is not copied; the Swift book (Apache-2.0) is credited.

## 1. What the official sources say

**The Swift book — [Optional Chaining](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/optionalchaining)**
- **Definition**:
  - Optional chaining is a process for querying and calling properties, methods, and subscripts on an optional that might currently be `nil`.
  - If the optional contains a value, the call succeeds. If the optional is `nil`, the call returns `nil`.
  - Multiple queries can be chained together. The entire chain fails gracefully if any link in the chain is `nil`.
- **Optional Chaining as an Alternative to Forced Unwrapping**:
  - You place a question mark (`?`) after the optional value on which you wish to call a property, method, or subscript.
  - This contrasts with placing an exclamation mark (`!`) after an optional value to force-unwrap its value.
  - Forced unwrapping triggers a runtime error when the optional is `nil`. Optional chaining fails gracefully and evaluates to `nil`.
- **Result Type Rules**:
  - The result of an optional chaining call is always an optional value, even if the property, method, or subscript you query returns a non-optional value.
  - If the type you query is already optional, optional chaining does not add more levels of optionality. An `Int?` property accessed through optional chaining still results in `Int?`, not `Int??`.
- **Calling Methods through Optional Chaining**:
  - You can use optional chaining to call a method on an optional value.
  - Even if that method does not define a return type (it returns `Void`), calling it through optional chaining returns `Void?` (`()?`).
  - This allows you to check whether the method call was successful using `if person.residence?.printDetails() != nil`.
- **Accessing Subscripts through Optional Chaining**:
  - You place the question mark before the subscript brackets: `array?[index]` or `dict?[key]`.
- **Setting Properties through Optional Chaining**:
  - You can attempt to set a property value through optional chaining: `person.residence?.address = someAddress`.
  - If the optional value before the dot is `nil`, the assignment is skipped.
  - Crucially, any expression on the right-hand side of the assignment is not evaluated if the chain short-circuits.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Safe query on `nil` | `person.residence?.street` when residence is `nil` | Returns `nil` without crashing |
| Return type is optional | Querying non-optional `String` through `?` | Evaluates to `String?` |
| No double wrapping | Querying `String?` through `?` | Evaluates to `String?` (not `String??`) |
| Method call returns `Void?` | `person.residence?.sayHi()` | Returns `Optional<()>` |
| Subscript access | `dict?["key"]?.count` | Accesses subscript safely |
| Short-circuit on assignment | `person.residence?.name = sideEffect()` | `sideEffect()` never executes when `person.residence` is `nil` |

## 3. Common wrong ideas (traps)

1. **"Optional chaining adds another layer of optionality for every question mark."** False. Swift collapses multiple levels into a single optional. Querying an `Int?` through optional chaining produces `Int?`, not `Int??`.
2. **"Code on the right side of an assignment always runs."** False. If the chain before the assignment operator fails on `nil`, Swift short-circuits. The expression on the right-hand side never evaluates.
3. **"Methods with no return value cannot be checked with optional chaining."** False. A method returning `Void` evaluates to `Void?` (`()?`) when called through optional chaining. Comparing against `nil` confirms whether the method executed.
4. **"Placing a question mark after subscript brackets checks the container."** False. The question mark must precede the brackets (`scores?[key]`) to check the optional container. Placing `?` after brackets checks an optional value returned by the subscript.

## 4. Real interview questions by level

- **Fresh / Junior**:
  - What is optional chaining in Swift, and how does it differ from forced unwrapping (`!`)?
  - What is the return type when you access a non-optional property through optional chaining?
  - How can you tell if a method returning `Void` was actually called through optional chaining?
- **Senior**:
  - How does the Swift compiler implement short-circuiting in optional chaining assignments with right-hand side expressions?
  - What is the difference between `scores?[key]` and `scores[key]?` when working with optional dictionaries?
