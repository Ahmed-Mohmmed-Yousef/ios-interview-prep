# Rubric Test: Property Wrappers

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/property-wrappers/questions.json`.
Each question is tested with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## pw-q24 (Written: Property Wrapper Purpose & SE-0258)

### Rubric
- Defines property wrappers as reusable property access logic via `@propertyWrapper` (25 pts, key)
- Identifies SE-0258 introduction in Swift 5.1 (20 pts)
- Contrasts with repetitive boilerplate getters and setters (25 pts, key)
- Highlights clear call-site syntax and separation of concerns (30 pts)

### Good Answer
A property wrapper is a Swift language feature marked with `@propertyWrapper` that encapsulates property access logic in a reusable type. It was introduced in Swift 5.1 under SE-0258. Before property wrappers, developers had to write repetitive computed property boilerplate for caching, validation, clamping, or user defaults persistence. Property wrappers eliminate this boilerplate by extracting storage management into a dedicated wrapper struct or class. At the call site, developers simply attach the attribute to a stored property. This separation keeps domain models clean while centralizing behavioral logic.

**Score: 100/100**
- [x] Defines property wrappers as reusable property access logic via `@propertyWrapper` (25/25)
- [x] Identifies SE-0258 introduction in Swift 5.1 (20/20)
- [x] Contrasts with repetitive boilerplate getters and setters (25/25)
- [x] Highlights clear call-site syntax and separation of concerns (30/30)

### Average Answer
A property wrapper is an attribute you put on a variable to change how it gets and sets values. It was added in Swift 5.1 to remove boilerplate code from classes and structs. Instead of writing manual getters and setters on ten different properties, you write one wrapper struct. It makes the code cleaner.

**Score: 70/100**
- [x] Defines property wrappers as reusable property access logic via `@propertyWrapper` (25/25)
- [x] Identifies SE-0258 introduction in Swift 5.1 (20/20)
- [x] Contrasts with repetitive boilerplate getters and setters (25/25)
- [ ] Highlights clear call-site syntax and separation of concerns (0/30 - mentions cleaner code briefly without explaining separation of concerns or caller syntax details)

### Weak Answer
It wraps a property so you can do things when it changes, kind of like didSet. It is used in SwiftUI.

**Score: 25/100**
- [x] Defines property wrappers as reusable property access logic via `@propertyWrapper` (25/25 - minimally mentions wrapping property behavior)
- [ ] Identifies SE-0258 introduction in Swift 5.1 (0/20)
- [ ] Contrasts with repetitive boilerplate getters and setters (0/25)
- [ ] Highlights clear call-site syntax and separation of concerns (0/30)

---

## pw-q25 (Written: wrappedValue, projectedValue, and _storage)

### Rubric
- Explains `wrappedValue` as the primary read/write property accessed directly (30 pts, key)
- Explains `projectedValue` accessed with `$` for auxiliary functionality (30 pts, key)
- Explains `_storage` as the compiler-synthesized private instance (25 pts, key)
- Clarifies access levels and visibility distinctions (15 pts)

### Good Answer
In a property wrapper, `wrappedValue` is the main value exposed to callers. When you read or write `foo`, Swift translates that access directly to `_foo.wrappedValue`. `projectedValue` is an optional secondary projection accessed using the dollar sign prefix `$foo`. It can return helper state, such as a SwiftUI `Binding` or a publisher. Finally, `_foo` is the synthesized backing storage property holding the actual wrapper struct instance. While `foo` and `$foo` share the declared property visibility, `_foo` is private to its enclosing scope by default to maintain encapsulation.

**Score: 100/100**
- [x] Explains `wrappedValue` as the primary read/write property accessed directly (30/30)
- [x] Explains `projectedValue` accessed with `$` for auxiliary functionality (30/30)
- [x] Explains `_storage` as the compiler-synthesized private instance (25/25)
- [x] Clarifies access levels and visibility distinctions (15/15)

### Average Answer
`wrappedValue` is the value you get when you call the property name normally. `projectedValue` is accessed using `$` and gives extra features, like a binding in SwiftUI. `_foo` is the hidden property that holds the wrapper struct itself.

**Score: 85/100**
- [x] Explains `wrappedValue` as the primary read/write property accessed directly (30/30)
- [x] Explains `projectedValue` accessed with `$` for auxiliary functionality (30/30)
- [x] Explains `_storage` as the compiler-synthesized private instance (25/25)
- [ ] Clarifies access levels and visibility distinctions (0/15)

### Weak Answer
`wrappedValue` is what is inside the wrapper. `$` is for bindings in SwiftUI views.

**Score: 30/100**
- [x] Explains `wrappedValue` as the primary read/write property accessed directly (30/30)
- [ ] Explains `projectedValue` accessed with `$` for auxiliary functionality (0/30 - does not define projectedValue property name)
- [ ] Explains `_storage` as the compiler-synthesized private instance (0/25)
- [ ] Clarifies access levels and visibility distinctions (0/15)

---

## pw-q26 (Written: Property Wrapper Limitations vs Macros)

### Rubric
- Lists syntactic restrictions (no computed properties, global vars, protocols) (30 pts, key)
- Explains lack of multiple wrapper composition transparency or custom naming (20 pts)
- Compares with Swift macros regarding compile-time code generation and AST access (30 pts, key)
- Discusses runtime overhead or storage constraints (20 pts)

### Good Answer
Property wrappers suffer from several language limitations. They can only attach to stored properties inside types or local scopes; they cannot be applied to computed properties, protocol property requirements, or top-level global variables. Additionally, composing multiple wrappers on a single property nests storage without easy control over projection names. In contrast, Swift macros operate at compile-time directly on the abstract syntax tree (AST). Macros can generate multiple independent properties, conform types to protocols (like `@Observable`), inspect arbitrary member lists, and introduce zero runtime overhead or hidden wrapper storage structs.

**Score: 100/100**
- [x] Lists syntactic restrictions (no computed properties, global vars, protocols) (30/30)
- [x] Explains lack of multiple wrapper composition transparency or custom naming (20/20)
- [x] Compares with Swift macros regarding compile-time code generation and AST access (30/30)
- [x] Discusses runtime overhead or storage constraints (20/20)

### Average Answer
Property wrappers cannot be used on computed properties or in protocol declarations. They also store extra memory for the wrapper struct. Swift macros are newer and operate at compile time by generating actual Swift code, so macros can add whole new methods and conformances, whereas property wrappers can only intercept property access.

**Score: 80/100**
- [x] Lists syntactic restrictions (30/30)
- [ ] Explains lack of multiple wrapper composition transparency or custom naming (0/20)
- [x] Compares with Swift macros regarding compile-time code generation and AST access (30/30)
- [x] Discusses runtime overhead or storage constraints (20/20)

### Weak Answer
You cannot use them everywhere in Swift. Macros are better because they are from Swift 5.9.

**Score: 0/100**
- [ ] Lists syntactic restrictions (0/30 - vague statement)
- [ ] Explains lack of multiple wrapper composition transparency or custom naming (0/20)
- [ ] Compares with Swift macros regarding compile-time code generation and AST access (0/30)
- [ ] Discusses runtime overhead or storage constraints (0/20)

---

## pw-q27 (Written: SwiftUI Property Wrappers and Projected Values)

### Rubric
- Explains roles of `@State`, `@Binding`, and `@Environment` (35 pts, key)
- Identifies projected value (`$`) as producing a two-way `Binding` (35 pts, key)
- Discusses view invalidation and reactive UI updates (20 pts)
- Mentions property wrapper role in declarative framework architecture (10 pts)

### Good Answer
SwiftUI relies on property wrappers to manage state and drive view invalidation. `@State` declares local source-of-truth state owned by the view. `@Binding` establishes a reference to mutable state owned elsewhere. `@Environment` reads global shared dependencies like color scheme or dismiss actions. The projected value accessed via `$` on a `@State` property produces a `Binding<Value>`. This allows child controls such as `TextField` or `Toggle` to read and modify parent state directly. When the wrapped value mutates, the wrapper triggers view body re-evaluation, powering SwiftUI's reactive UI.

**Score: 100/100**
- [x] Explains roles of `@State`, `@Binding`, and `@Environment` (35/35)
- [x] Identifies projected value (`$`) as producing a two-way `Binding` (35/35)
- [x] Discusses view invalidation and reactive UI updates (20/20)
- [x] Mentions property wrapper role in declarative framework architecture (10/10)

### Average Answer
`@State` is for private state inside a view, `@Binding` lets child views edit parent state, and `@Environment` reads system values like color schemes. When you put `$` before `@State`, its projected value gives you a Binding that you can pass to controls like `Toggle`. When the state changes, SwiftUI re-renders the view.

**Score: 90/100**
- [x] Explains roles of `@State`, `@Binding`, and `@Environment` (35/35)
- [x] Identifies projected value (`$`) as producing a two-way `Binding` (35/35)
- [x] Discusses view invalidation and reactive UI updates (20/20)
- [ ] Mentions property wrapper role in declarative framework architecture (0/10)

### Weak Answer
SwiftUI uses `@State` to save numbers and texts. You use `$` when passing variables to textfields.

**Score: 35/100**
- [ ] Explains roles of `@State`, `@Binding`, and `@Environment` (0/35 - only mentions State superficially)
- [x] Identifies projected value (`$`) as producing a two-way `Binding` (35/35 - recognizes passing $ to textfields)
- [ ] Discusses view invalidation and reactive UI updates (0/20)
- [ ] Mentions property wrapper role in declarative framework architecture (0/10)

---

## pw-q28 (Written: Enclosing Self Subscripts)

### Rubric
- Explains `_enclosingInstance` static subscript mechanism (35 pts, key)
- Identifies purpose: accessing enclosing instance properties or notifying it of changes (25 pts, key)
- Explains limitation: only available on reference types (classes) (25 pts)
- Notes unofficial or underscored API status in Swift (15 pts)

### Good Answer
The enclosing self subscript is an internal Swift mechanism using `static subscript(_enclosingInstance:wrapped:storage:)`. It allows a property wrapper to access the enclosing type instance and read or mutate other properties on it. This solves the problem where standard property wrappers cannot observe or communicate with their parent object, which was essential for Combine's `@Published` to trigger `objectWillChange` on an enclosing `ObservableObject`. Its major limitation is that it only functions on reference types (classes), not structs. Furthermore, it remains an underscored, unofficial Swift language feature.

**Score: 100/100**
- [x] Explains `_enclosingInstance` static subscript mechanism (35/35)
- [x] Identifies purpose: accessing enclosing instance properties or notifying it of changes (25/25)
- [x] Explains limitation: only available on reference types (classes) (25/25)
- [x] Notes unofficial or underscored API status in Swift (15/15)

### Average Answer
Enclosing self subscript lets a property wrapper know about the instance that contains it. It is used in Combine so `@Published` can tell an `ObservableObject` class that a value changed. It only works on classes, not on structs. It uses a static subscript with `_enclosingInstance`.

**Score: 85/100**
- [x] Explains `_enclosingInstance` static subscript mechanism (35/35)
- [x] Identifies purpose: accessing enclosing instance properties or notifying it of changes (25/25)
- [x] Explains limitation: only available on reference types (classes) (25/25)
- [ ] Notes unofficial or underscored API status in Swift (0/15)

### Weak Answer
It lets you call self inside a property wrapper. It is used in SwiftUI classes.

**Score: 25/100**
- [ ] Explains `_enclosingInstance` static subscript mechanism (0/35)
- [x] Identifies purpose (25/25 - roughly recognizes connecting wrapper to parent class)
- [ ] Explains limitation (0/25)
- [ ] Notes unofficial or underscored API status in Swift (0/15)

---

## pw-q29 (Code-Write: Custom @Clamped Wrapper)

### Rubric
- Marks struct with `@propertyWrapper` attribute (20 pts, key)
- Implements `init(wrappedValue:range:)` or clamp parameters correctly (30 pts, key)
- Clamps values in both initializer and `wrappedValue` setter (30 pts, key)
- Provides correct property declarations and types (20 pts)

### Good Answer
```swift
@propertyWrapper
struct Clamped {
    private var range: ClosedRange<Int>
    private var value: Int
    
    var wrappedValue: Int {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    
    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}
```

**Score: 100/100**
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
- [x] Implements `init(wrappedValue:range:)` or clamp parameters correctly (30/30)
- [x] Clamps values in both initializer and `wrappedValue` setter (30/30)
- [x] Provides correct property declarations and types (20/20)

### Average Answer
```swift
@propertyWrapper
struct Clamped {
    var minVal: Int
    var maxVal: Int
    var value: Int
    
    var wrappedValue: Int {
        get { value }
        set {
            if newValue < minVal { value = minVal }
            else if newValue > maxVal { value = maxVal }
            else { value = newValue }
        }
    }
    
    init(wrappedValue: Int, min: Int, max: Int) {
        self.minVal = min
        self.maxVal = max
        self.value = wrappedValue
    }
}
```

**Score: 70/100**
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
- [x] Implements initializer correctly (30/30)
- [ ] Clamps values in both initializer and setter (0/30 - fails to clamp initial `wrappedValue` in init if caller passes out-of-range value)
- [x] Provides correct property declarations and types (20/20)

### Weak Answer
```swift
struct Clamped {
    var value: Int
    var wrappedValue: Int {
        return value
    }
}
```

**Score: 20/100**
- [ ] Marks struct with `@propertyWrapper` attribute (0/20)
- [ ] Implements range parameters (0/30)
- [ ] Clamps values in both initializer and setter (0/30)
- [x] Provides correct property declarations and types (20/20)

---

## pw-q30 (Code-Write: @Trimmed Wrapper with Projected Value)

### Rubric
- Marks struct with `@propertyWrapper` attribute (20 pts, key)
- Trims whitespace and newlines in `init` and `wrappedValue` setter (30 pts, key)
- Implements `projectedValue` returning character count of trimmed string (30 pts, key)
- Correct Swift types and Foundation integration (20 pts)

### Good Answer
```swift
import Foundation

@propertyWrapper
struct Trimmed {
    private var text: String = ""
    
    var wrappedValue: String {
        get { text }
        set { text = newValue.trimmingCharacters(in: .whitespacesAndNewlines) }
    }
    
    var projectedValue: Int {
        return text.count
    }
    
    init(wrappedValue: String) {
        self.text = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
```

**Score: 100/100**
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
- [x] Trims whitespace and newlines in `init` and `wrappedValue` setter (30/30)
- [x] Implements `projectedValue` returning character count of trimmed string (30/30)
- [x] Correct Swift types and Foundation integration (20/20)

### Average Answer
```swift
import Foundation

@propertyWrapper
struct Trimmed {
    var wrappedValue: String
    
    var projectedValue: Int {
        return wrappedValue.count
    }
    
    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
```

**Score: 70/100**
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
- [ ] Trims whitespace and newlines in `init` and setter (0/30 - `wrappedValue` is a stored property without a setter trimming subsequent updates)
- [x] Implements `projectedValue` returning character count (30/30)
- [x] Correct Swift types and Foundation integration (20/20)

### Weak Answer
```swift
@propertyWrapper
struct Trimmed {
    var wrappedValue: String = ""
}
```

**Score: 20/100**
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
- [ ] Trims whitespace and newlines (0/30)
- [ ] Implements `projectedValue` (0/30)
- [ ] Correct Swift types and Foundation integration (0/20)

---

## pw-q31 (Code-Write: @UserDefaultsBacked Wrapper)

### Rubric
- Marks struct with `@propertyWrapper` attribute and generic constraint `T: Codable` (20 pts, key)
- Accepts key, defaultValue, and optional UserDefaults suite in initializer (20 pts)
- Safely encodes and decodes value in `wrappedValue` getter/setter (40 pts, key)
- Handles fallback to default value when key is absent or decoding fails (20 pts)

### Good Answer
```swift
import Foundation

@propertyWrapper
struct UserDefaultsBacked<T: Codable> {
    let key: String
    let defaultValue: T
    var storage: UserDefaults = .standard
    
    var wrappedValue: T {
        get {
            guard let data = storage.data(forKey: key) else {
                return defaultValue
            }
            return (try? JSONDecoder().decode(T.self, from: data)) ?? defaultValue
        }
        set {
            if let data = try? JSONEncoder().encode(newValue) {
                storage.set(data, forKey: key)
            }
        }
    }
}
```

**Score: 100/100**
- [x] Marks struct with `@propertyWrapper` attribute and generic constraint `T: Codable` (20/20)
- [x] Accepts key, defaultValue, and storage in initializer (20/20)
- [x] Safely encodes and decodes value in `wrappedValue` getter/setter (40/40)
- [x] Handles fallback to default value when key is absent or decoding fails (20/20)

### Average Answer
```swift
import Foundation

@propertyWrapper
struct UserDefaultsBacked<T: Codable> {
    let key: String
    let defaultValue: T
    
    var wrappedValue: T {
        get {
            if let data = UserDefaults.standard.data(forKey: key),
               let decoded = try? JSONDecoder().decode(T.self, from: data) {
                return decoded
            }
            return defaultValue
        }
        set {
            let data = try! JSONEncoder().encode(newValue)
            UserDefaults.standard.set(data, forKey: key)
        }
    }
}
```

**Score: 80/100**
- [x] Marks struct with `@propertyWrapper` attribute and generic constraint `T: Codable` (20/20)
- [ ] Accepts custom UserDefaults suite in initializer (0/20 - hardcoded to .standard)
- [x] Encodes and decodes value in `wrappedValue` (40/40)
- [x] Handles fallback to default value (20/20)

### Weak Answer
```swift
import Foundation

@propertyWrapper
struct UserDefaultsBacked<T> {
    var key: String
    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as! T }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}
```

**Score: 20/100**
- [ ] Marks with `T: Codable` constraint (0/20)
- [ ] Initializer parameters and defaults (0/20)
- [ ] Safe JSON encoding/decoding (0/40 - uses unsafe forced cast)
- [ ] Handles fallback gracefully (0/20 - crashes if absent)
- [x] Marks struct with `@propertyWrapper` attribute (20/20)
