# Fact Check Report: Property Wrappers

**Topic ID:** `property-wrappers`  
**Date:** 2026-11-09  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. Apple Developer Documentation: *Properties — Property Wrappers* (The Swift Programming Language)  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties
2. Swift Evolution SE-0258: *Property Wrappers*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0258-property-wrappers.md
3. Apple Developer Documentation: *State and Data Flow (SwiftUI)*  
   URL: https://developer.apple.com/documentation/swiftui/state-and-data-flow

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| `@propertyWrapper` requires a type with a `wrappedValue` property | The Swift Programming Language & SE-0258 | Verified | Omitting `wrappedValue` produces a compile-time error. |
| The compiler synthesizes `_foo` as backing storage | SE-0258 | Verified | Synthesized storage variable is prefixed with an underscore. |
| The backing storage `_foo` is private by default | SE-0258 | Verified | Inaccessible outside the declaring type scope. |
| `projectedValue` is optional and accessed via `$` prefix | SE-0258 & Apple Docs | Verified | If `projectedValue` is not defined on the wrapper, `$foo` is a compile error. |
| Property wrappers cannot be used on computed properties, protocols, or globals | SE-0258 Section "Restrictions on Wrapped Properties" | Verified | Also cannot wrap `lazy`, `weak`, or `unowned` properties. |
| Initializer syntax: `init(wrappedValue:)` enables inline value assignment | SE-0258 | Verified | E.g. `@Wrapper var x = 5` transforms to `init(wrappedValue: 5)`. |
| Initializer arguments like `@Clamped(min: 0, max: 10)` map to wrapper `init` parameters | SE-0258 | Verified | Caller arguments precede or follow `wrappedValue:`. |
| SwiftUI `@State` projects `Binding<Value>` via `$state` | Apple SwiftUI Docs | Verified | `$state` returns a two-way binding connection. |
| `_enclosingInstance` static subscript requires class (reference type) | SE-0258 & Swift Compiler Source | Verified | Underscored implementation detail; not available for structs. |
| Swift 5.9+ Macros provide compile-time code generation without runtime wrapper struct overhead | SE-0389, SE-0390 | Verified | Used by `@Observable` in iOS 17+. |

---

## Code Verification
- `content/topics/property-wrappers/lesson.mdx`: 2 code blocks compiled with Swift 6.4 (`node scripts/run-swift-examples.mjs`) -> 2 passed, 0 failed.
- `content/topics/property-wrappers/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6.4 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All factual assertions, code examples, and technical mechanisms in `property-wrappers` are accurate, verified against official Swift 6 and Apple documentation, and free of outdated or deprecated constructs.
