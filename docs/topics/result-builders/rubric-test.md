# Rubric Test: Result Builders

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/result-builders/questions.json`.
Each question is tested with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## rb-q24 (Written: Result Builder Purpose & SE-0289)

### Rubric
- Defines result builders as compiler-driven closure transformations via `@resultBuilder` (25 pts, key)
- Identifies SE-0289 standardization in Swift 5.4 (20 pts)
- Contrasts with verbose arrays, commas, and manual append calls (25 pts, key)
- Highlights declarative syntax and static type safety in DSLs like SwiftUI (30 pts)

### Good Answer
A result builder is a Swift language feature marked with `@resultBuilder` that enables domain-specific languages by transforming closure statements into static builder method calls. Standardized in Swift 5.4 under SE-0289 after first appearing in SwiftUI, it solves the problem of syntactic clutter when constructing complex nested data. Without result builders, developers had to create explicit arrays separated by commas or repeatedly invoke mutable append methods. Result builders allow statements to be listed naturally line by line, producing strongly typed structures with full compile-time validation.

**Score: 100/100**
- [x] Defines result builders as compiler-driven closure transformations via `@resultBuilder` (25/25)
- [x] Identifies SE-0289 standardization in Swift 5.4 (20/20)
- [x] Contrasts with verbose arrays, commas, and manual append calls (25/25)
- [x] Highlights declarative syntax and static type safety in DSLs like SwiftUI (30/30)

### Average Answer
A result builder is an attribute in Swift that lets you write lines of code inside a closure without commas. It was standardized in SE-0289. Instead of creating an array with commas and brackets or calling append, you write items on separate lines. SwiftUI uses this for view hierarchies.

**Score: 70/100**
- [x] Defines result builders as closure transformations via attribute (25/25)
- [x] Identifies SE-0289 standardization (20/20)
- [x] Contrasts with verbose arrays and commas (25/25)
- [ ] Highlights declarative syntax and static type safety in DSLs like SwiftUI (0/30 - mentions SwiftUI briefly without discussing type safety or compile-time translation details)

### Weak Answer
It lets you make SwiftUI views without commas between them.

**Score: 25/100**
- [ ] Defines result builders as compiler-driven closure transformations via `@resultBuilder` (0/25 - does not identify `@resultBuilder` or closure mechanism)
- [ ] Identifies SE-0289 standardization in Swift 5.4 (0/20)
- [x] Contrasts with verbose arrays, commas, and manual append calls (25/25 - mentions omitting commas)
- [ ] Highlights declarative syntax and static type safety in DSLs like SwiftUI (0/30)

---

## rb-q25 (Written: buildBlock, buildOptional, and buildEither)

### Rubric
- Explains `buildBlock` as the core sequential combiner (30 pts, key)
- Explains `buildOptional` for single if conditions with optional components (25 pts, key)
- Explains `buildEither(first:)` and `buildEither(second:)` for if-else and switch branching (25 pts, key)
- Explains compile-time errors that occur when control flow methods are missing (20 pts)

### Good Answer
In a result builder, `buildBlock` is the required fundamental method that collects sequential expressions and combines them into a single component. `buildOptional` accepts an optional component type to support single `if` statements that have no `else` branch, returning an empty or fallback representation when the condition evaluates to false. `buildEither(first:)` and `buildEither(second:)` handle conditional branching in `if-else` and `switch` statements, preserving the active branch. If any of these methods are omitted, the Swift compiler emits a compile-time error whenever those control flow statements appear inside the builder closure.

**Score: 100/100**
- [x] Explains `buildBlock` as the core sequential combiner (30/30)
- [x] Explains `buildOptional` for single if conditions with optional components (25/25)
- [x] Explains `buildEither(first:)` and `buildEither(second:)` for if-else and switch branching (25/25)
- [x] Explains compile-time errors that occur when control flow methods are missing (20/20)

### Average Answer
`buildBlock` combines all statements inside the closure into one value. `buildOptional` handles an `if` statement when there is no `else`. `buildEither` has first and second versions to handle `if-else` branches and switches. If you do not write them, your code will not compile when you use an `if` statement.

**Score: 90/100**
- [x] Explains `buildBlock` as the core sequential combiner (30/30)
- [x] Explains `buildOptional` for single if conditions (25/25)
- [x] Explains `buildEither(first:)` and `buildEither(second:)` (25/25)
- [ ] Explains compile-time errors that occur when control flow methods are missing (10/20 - mentions it will not compile without explaining the reason or message)

### Weak Answer
`buildBlock` builds the block. The other two methods are for if statements in Swift.

**Score: 30/100**
- [x] Explains `buildBlock` (30/30 - minimally identifies building the block)
- [ ] Explains `buildOptional` (0/25)
- [ ] Explains `buildEither` (0/25)
- [ ] Explains compile-time errors (0/20)

---

## rb-q26 (Written: buildExpression and buildFinalResult)

### Rubric
- Explains `buildExpression` intercepts individual statements to normalize input types (35 pts, key)
- Explains `buildFinalResult` converts accumulated components into the final return type (35 pts, key)
- Explains decoupling of input syntax, internal components, and final output type (30 pts)

### Good Answer
`buildExpression` intercepts each raw statement expression before it is collected by `buildBlock`. By overloading `buildExpression`, a result builder can accept multiple different types, such as strings, integers, or custom models, and normalize them all into the builder's internal component type. `buildFinalResult` runs as the very last step after `buildBlock` finishes merging components. It converts the accumulated internal component structure into the final return type exposed to the caller. Together, these methods decouple what callers write from how the builder stores components and what the enclosing function ultimately returns.

**Score: 100/100**
- [x] Explains `buildExpression` intercepts individual statements to normalize input types (35/35)
- [x] Explains `buildFinalResult` converts accumulated components into the final return type (35/35)
- [x] Explains decoupling of input syntax, internal components, and final output type (30/30)

### Average Answer
`buildExpression` is called on every expression in the closure. It lets you take different input types and turn them into the component type the builder expects. `buildFinalResult` takes the output of `buildBlock` and converts it into the final type the caller receives.

**Score: 80/100**
- [x] Explains `buildExpression` intercepts individual statements (35/35)
- [x] Explains `buildFinalResult` converts accumulated components (35/35)
- [ ] Explains decoupling of input syntax, internal components, and final output type (10/30 - mentions conversion without architectural decoupling context)

### Weak Answer
`buildExpression` is for expressions and `buildFinalResult` gives the final result of the closure.

**Score: 20/100**
- [ ] Explains `buildExpression` (10/35 - restates method name)
- [ ] Explains `buildFinalResult` (10/35 - restates method name)
- [ ] Explains decoupling (0/30)

---

## rb-q27 (Written: SwiftUI @ViewBuilder and TupleView)

### Rubric
- Explains `@ViewBuilder` role in view body and container closures (30 pts, key)
- Identifies `TupleView` as the static composite representation of child views (30 pts, key)
- Discusses 10-view limit history and modern variadic generics / parameter packs (25 pts)
- Highlights static type preservation and avoiding type erasure (15 pts)

### Good Answer
SwiftUI uses `@ViewBuilder` to power the `body` property of views and container view closures like `VStack` and `HStack`. When child views are listed line by line, `@ViewBuilder` groups them into a strongly typed `TupleView`. For example, three views produce `TupleView<(Text, Image, Button)>`. Historically, SwiftUI defined overloads of `buildBlock` supporting up to ten views, which caused compiler errors if a developer added an eleventh view without a container. In modern Swift, variadic generics and parameter packs allow arbitrary view counts. `TupleView` preserves exact concrete view types at compile time, avoiding costly runtime type erasure.

**Score: 100/100**
- [x] Explains `@ViewBuilder` role in view body and container closures (30/30)
- [x] Identifies `TupleView` as the static composite representation of child views (30/30)
- [x] Discusses 10-view limit history and modern variadic generics / parameter packs (25/25)
- [x] Highlights static type preservation and avoiding type erasure (15/15)

### Average Answer
`@ViewBuilder` is used on SwiftUI view bodies and containers like `VStack`. It groups multiple views together into a `TupleView` without commas. In older SwiftUI versions there was a limit of 10 child views because `buildBlock` only had 10 overloads, but now modern Swift handles more views with parameter packs.

**Score: 85/100**
- [x] Explains `@ViewBuilder` role in view body and container closures (30/30)
- [x] Identifies `TupleView` as the static composite representation (30/30)
- [x] Discusses 10-view limit history and modern parameter packs (25/25)
- [ ] Highlights static type preservation and avoiding type erasure (0/15)

### Weak Answer
SwiftUI uses `@ViewBuilder` to show views on screen. If you put too many views inside a VStack you used to get an error.

**Score: 30/100**
- [x] Explains `@ViewBuilder` role (30/30 - mentions view bodies)
- [ ] Identifies `TupleView` (0/30)
- [ ] Discusses 10-view limit and variadic generics (0/25)
- [ ] Highlights type preservation (0/15)

---

## rb-q28 (Written: Result Builders vs Swift Macros)

### Rubric
- Distinguishes closure method call transformation from AST syntax generation (35 pts, key)
- Identifies result builder scope: closures and declarative DSL construction (25 pts, key)
- Identifies macro scope: arbitrary code synthesis, member additions, and conformances (25 pts)
- Provides clear selection criteria and practical use cases for each tool (15 pts)

### Good Answer
Result builders and Swift macros operate at different stages of the Swift language toolchain. A result builder is a closure-level transformation: it rewrites a sequence of expressions inside a closure into a pipeline of static method calls like `buildBlock`. It cannot create new member variables, add protocol conformances, or inspect type definitions. In contrast, Swift macros operate on the abstract syntax tree (AST) at compile time. Macros can synthesize entire structs, generate properties and accessors, and add protocol conformances (like `@Observable`). Use result builders when building declarative DSLs and hierarchy trees. Use macros for automated code generation, boilerplate removal, and type decoration.

**Score: 100/100**
- [x] Distinguishes closure method call transformation from AST syntax generation (35/35)
- [x] Identifies result builder scope: closures and declarative DSL construction (25/25)
- [x] Identifies macro scope: arbitrary code synthesis, member additions, and conformances (25/25)
- [x] Provides clear selection criteria and practical use cases for each tool (15/15)

### Average Answer
Result builders are used inside closures to combine statements into a single value, like in SwiftUI views. Swift macros are compile-time code generators that create actual Swift code, like `@Observable`. Macros can add new properties and methods to types, which result builders cannot do.

**Score: 75/100**
- [x] Distinguishes closure method calls from code generation (35/35)
- [x] Identifies result builder scope (25/25)
- [ ] Identifies macro scope: arbitrary code synthesis, member additions (15/25 - mentions adding properties but misses conformances)
- [ ] Provides clear selection criteria (0/15)

### Weak Answer
Result builders are for SwiftUI. Macros are newer and came in Swift 5.9.

**Score: 15/100**
- [ ] Distinguishes closure transformation from AST generation (0/35)
- [ ] Identifies result builder scope (15/25 - mentions SwiftUI)
- [ ] Identifies macro scope (0/25)
- [ ] Provides selection criteria (0/15)

---

## rb-q29 (Code-Write: Custom @CSVBuilder)

### Rubric
- Marks type with `@resultBuilder` attribute (25 pts, key)
- Implements `static func buildBlock` taking variadic String parameters (35 pts, key)
- Joins items with comma separator and returns combined String (25 pts, key)
- Provides valid helper function and compiles cleanly in Swift 6 (15 pts)

### Good Answer
```swift
@resultBuilder
struct CSVBuilder {
    static func buildBlock(_ items: String...) -> String {
        return items.joined(separator: ",")
    }
}

func makeCSV(@CSVBuilder content: () -> String) -> String {
    return content()
}

let csv = makeCSV {
    "apple"
    "banana"
    "cherry"
}
print(csv)
```

**Score: 100/100**
- [x] Marks type with `@resultBuilder` attribute (25/25)
- [x] Implements `static func buildBlock` taking variadic String parameters (35/35)
- [x] Joins items with comma separator and returns combined String (25/25)
- [x] Provides valid helper function and compiles cleanly in Swift 6 (15/15)

### Average Answer
```swift
@resultBuilder
struct CSVBuilder {
    static func buildBlock(_ items: String...) -> String {
        var result = ""
        for item in items {
            result += item + ","
        }
        return result
    }
}
```

**Score: 70/100**
- [x] Marks type with `@resultBuilder` attribute (25/25)
- [x] Implements `static func buildBlock` taking variadic String parameters (35/35)
- [ ] Joins items with comma separator (10/25 - leaves trailing comma at the end of the string)
- [ ] Provides valid helper function and execution example (0/15)

### Weak Answer
```swift
struct CSVBuilder {
    func makeCSV(items: [String]) -> String {
        return items.joined(separator: ",")
    }
}
```

**Score: 0/100**
- [ ] Marks type with `@resultBuilder` attribute (0/25)
- [ ] Implements static func buildBlock (0/35)
- [ ] Result builder closure implementation (0/25)
- [ ] Swift 6 result builder compilation (0/15)

---

## rb-q30 (Code-Write: @HTMLBuilder with Control Flow)

### Rubric
- Annotates struct with `@resultBuilder` and implements `buildBlock` (25 pts, key)
- Implements `buildOptional` handling optional String branches (25 pts, key)
- Implements `buildEither(first:)` and `buildEither(second:)` for branching (30 pts, key)
- Filters empty elements, joins with newlines, and compiles cleanly in Swift 6 (20 pts)

### Good Answer
```swift
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ tags: String...) -> String {
        return tags.filter { !$0.isEmpty }.joined(separator: "\n")
    }
    
    static func buildOptional(_ tag: String?) -> String {
        return tag ?? ""
    }
    
    static func buildEither(first tag: String) -> String {
        return tag
    }
    
    static func buildEither(second tag: String) -> String {
        return tag
    }
}

func renderPage(@HTMLBuilder content: () -> String) -> String {
    return content()
}

let isAdmin = false
let html = renderPage {
    "<h1>Welcome</h1>"
    if isAdmin {
        "<p>Admin Dashboard</p>"
    } else {
        "<p>User Profile</p>"
    }
}
print(html)
```

**Score: 100/100**
- [x] Annotates struct with `@resultBuilder` and implements `buildBlock` (25/25)
- [x] Implements `buildOptional` handling optional String branches (25/25)
- [x] Implements `buildEither(first:)` and `buildEither(second:)` for branching (30/30)
- [x] Filters empty elements, joins with newlines, and compiles cleanly in Swift 6 (20/20)

### Average Answer
```swift
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ tags: String...) -> String {
        return tags.joined(separator: "\n")
    }
    
    static func buildOptional(_ tag: String?) -> String {
        return tag ?? ""
    }
    
    static func buildEither(first tag: String) -> String {
        return tag
    }
    
    static func buildEither(second tag: String) -> String {
        return tag
    }
}
```

**Score: 80/100**
- [x] Annotates struct with `@resultBuilder` and implements `buildBlock` (25/25)
- [x] Implements `buildOptional` (25/25)
- [x] Implements `buildEither(first:)` and `buildEither(second:)` (30/30)
- [ ] Filters empty elements and provides full executable helper (0/20 - empty strings from false if statements will produce blank newlines)

### Weak Answer
```swift
@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ tags: String...) -> String {
        return tags.joined(separator: "\n")
    }
}
```

**Score: 25/100**
- [x] Annotates struct with `@resultBuilder` and implements `buildBlock` (25/25)
- [ ] Implements `buildOptional` (0/25)
- [ ] Implements `buildEither` (0/30)
- [ ] Full control flow handling (0/20)

---

## rb-q31 (Code-Write: @QueryBuilder with buildExpression and buildArray)

### Rubric
- Annotates struct with `@resultBuilder` attribute (20 pts, key)
- Implements `buildExpression` trimming whitespace from input strings (30 pts, key)
- Implements `buildBlock` joining non-empty components with ' AND ' (25 pts, key)
- Implements `buildArray` to flatten loop iterations into query string (25 pts, key)

### Good Answer
```swift
import Foundation

@resultBuilder
struct QueryBuilder {
    static func buildExpression(_ word: String) -> String {
        return word.trimmingCharacters(in: .whitespaces)
    }
    
    static func buildBlock(_ components: String...) -> String {
        return components.filter { !$0.isEmpty }.joined(separator: " AND ")
    }
    
    static func buildArray(_ components: [String]) -> String {
        return components.joined(separator: " AND ")
    }
}

func buildQuery(@QueryBuilder content: () -> String) -> String {
    return content()
}

let filters = ["active", "verified"]
let query = buildQuery {
    "ios"
    for f in filters {
        f
    }
}
print(query)
```

**Score: 100/100**
- [x] Annotates struct with `@resultBuilder` attribute (20/20)
- [x] Implements `buildExpression` trimming whitespace from input strings (30/30)
- [x] Implements `buildBlock` joining non-empty components with ' AND ' (25/25)
- [x] Implements `buildArray` to flatten loop iterations into query string (25/25)

### Average Answer
```swift
import Foundation

@resultBuilder
struct QueryBuilder {
    static func buildExpression(_ word: String) -> String {
        return word.trimmingCharacters(in: .whitespaces)
    }
    
    static func buildBlock(_ components: String...) -> String {
        return components.joined(separator: " AND ")
    }
    
    static func buildArray(_ components: [String]) -> String {
        return components.joined(separator: " AND ")
    }
}
```

**Score: 75/100**
- [x] Annotates struct with `@resultBuilder` attribute (20/20)
- [x] Implements `buildExpression` (30/30)
- [ ] Implements `buildBlock` filtering empty components (15/25 - does not filter empty items)
- [x] Implements `buildArray` (25/25)
- [ ] Helper and demonstration execution (missing)

### Weak Answer
```swift
@resultBuilder
struct QueryBuilder {
    static func buildBlock(_ components: String...) -> String {
        return components.joined(separator: " AND ")
    }
}
```

**Score: 35/100**
- [x] Annotates struct with `@resultBuilder` attribute (20/20)
- [ ] Implements `buildExpression` (0/30)
- [x] Implements `buildBlock` (15/25)
- [ ] Implements `buildArray` (0/25)
