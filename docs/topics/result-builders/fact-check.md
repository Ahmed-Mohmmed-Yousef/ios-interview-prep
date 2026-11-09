# Fact Check Report: Result Builders

**Topic ID:** `result-builders`  
**Date:** 2026-11-09  
**Reviewer:** Automated Curriculum Subagent  
**Sources Consulted:**
1. The Swift Programming Language: *Attributes — @resultBuilder*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes
2. Swift Evolution SE-0289: *Result Builders*  
   URL: https://github.com/swiftlang/swift-evolution/blob/main/proposals/0289-result-builders.md
3. Apple Developer Documentation: *ViewBuilder (SwiftUI)*  
   URL: https://developer.apple.com/documentation/swiftui/viewbuilder

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Attribute is `@resultBuilder` | Swift Book & SE-0289 | Verified | Standardized in Swift 5.4. |
| `buildBlock` is the required combiner method | SE-0289 Section "Detailed Design" | Verified | Minimum requirement for compiling a result builder. |
| `buildOptional` handles single `if` statements | SE-0289 Section "Selection Statements" | Verified | Receives an optional component `Component?`. |
| `buildEither(first:)` and `buildEither(second:)` handle `if-else` and `switch` | SE-0289 | Verified | Balances binary choice branches. |
| `buildArray` handles `for...in` loops | SE-0289 Section "Loop Statements" | Verified | Collects loop iterations into `[Component]`. |
| `buildExpression` transforms individual expressions before `buildBlock` | SE-0289 Section "Expression Statements" | Verified | Normalizes varied input types to intermediate components. |
| `buildFinalResult` converts accumulated component into final return type | SE-0289 | Verified | Applied as the final step after `buildBlock`. |
| `buildLimitedAvailability` handles `#available(...)` checks | SE-0289 | Verified | Adapts components for OS-version conditional blocks. |
| Local constants (`let x = ...`) execute normally inside builder closures | SE-0289 Section "Local Declarations" | Verified | Declarations are preserved without builder wrapping. |
| Missing control flow methods trigger compile-time errors | Swift Compiler Diagnostics | Verified | "Closure containing a control flow statement cannot be used with result builder...". |
| SwiftUI `@ViewBuilder` creates composite `TupleView` hierarchies | SwiftUI Developer Docs | Verified | Strongly typed without runtime type erasure. |
| Result builders rewrite closures, while Swift macros generate AST code | Swift 5.9 / SE-0389 & SE-0289 | Verified | Architectural distinction verified. |

---

## Code Verification
- `content/topics/result-builders/lesson.mdx`: 3 code blocks verified with Swift 6.4 (`node scripts/run-swift-examples.mjs`) -> 3 passed, 0 failed.
- `content/topics/result-builders/questions.json`: 8 code-reading and 3 code-write verification blocks verified with Swift 6.4 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, fully CEFR B1 compliant.

## Conclusion
All technical mechanisms, method signatures, Swift compiler transformations, and framework behaviors in `result-builders` are accurate, verified against official Swift 6 and Apple documentation, and compliant with curriculum quality standards.
