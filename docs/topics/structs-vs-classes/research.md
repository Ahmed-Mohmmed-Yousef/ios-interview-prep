# Pilot Research — Structs vs Classes (Step 2.2)

Researched 2026-10-22. Topic: `structs-vs-classes` (fresh). Baseline: Swift 6.4, Xcode 27.

Facts are written in our own words. Apple's documentation is not copied; the Swift book (Apache-2.0) may be quoted briefly with credit.

## 1. What the official sources say

**The Swift book — [Structures and Classes](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures)**
- Both can have stored properties, methods, subscripts and initializers, and both can use extensions and protocols.
- **Only classes have:** inheritance, type casting of instances at runtime, deinitializers, and reference counting (more than one reference to one instance).
- The book's own advice: **prefer structures**, because they are easier to reason about; use classes when they are needed. Most custom types should be structures and enumerations.
- **Value type:** the value is **copied** when it is assigned to a variable or constant, or passed to a function. All structures and enumerations are value types. So are Swift's basic types: `Int`, `Double`, `Bool`, `String`, `Array`, `Dictionary`.
- **Collections copy lazily** (copy-on-write): `Array`, `Dictionary` and `String` share their storage until one copy is changed. The code always behaves as if a copy happened right away.
- **Reference type:** assigning or passing gives a **reference to the same instance**, not a copy.
- Shared references are harder to reason about, because a change in one place shows up everywhere.
- A `let` constant that holds a class instance **can still change the instance's `var` properties**, because the constant holds the reference, not the object.
- **Identity:** `===` and `!==` check if two references point to the same class instance. This is different from `==`, which checks if two values are equal (the type decides what "equal" means).
- **Memberwise initializer:** structures get one automatically. Classes do not.
- Classes and actors share many features (actors are covered in Concurrency).

**The Swift book — [Properties](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties) and [Methods](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/methods)**
- If a structure instance is assigned to a `let` constant, **none of its properties can change**, even `var` properties. This is not true for classes.
- A method that changes a structure's properties must be marked **`mutating`**. You cannot call a `mutating` method on a `let` constant.

**Apple — [Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)**
Four recommendations:
1. Use structures **by default**.
2. Use classes when you need **Objective-C interoperability** (for example, frameworks that expect you to subclass).
3. Use classes when you need to **control identity**: file handles, network connections, a shared hardware manager, a local database connection. Be careful: sharing an instance everywhere makes logic errors more likely.
4. Use **structures plus protocols** to share behavior. Prefer protocol inheritance to class inheritance when you build a new hierarchy.
- Also: use structures for data whose identity you **do not** control, such as records from a server, identified by an ID.

**Apple — [Sendable](https://developer.apple.com/documentation/swift/sendable)** (matters in Swift 6)
- A structure or enumeration is `Sendable` when all its members are `Sendable`. Non-public ones get this **automatically**.
- A class is `Sendable` only if it is `final`, has only immutable (`let`) `Sendable` stored properties, and has no superclass (or `NSObject`). `@MainActor` classes are `Sendable` too.
- So value types are much easier to use safely with concurrency.

**WWDC16 — [Understanding Swift Performance](https://developer.apple.com/videos/play/wwdc2016/416/)** and **[Swift Optimization Tips](https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst)**
- Cost depends on three things: **where memory is allocated** (stack or heap), **how much reference counting** happens, and **how methods are dispatched** (static or dynamic).
- Stack allocation is very cheap; heap allocation costs more.
- **A struct value is not always on the stack.** A `var` captured by an escaping closure is stored in a heap box (Optimization Tips). A large value stored in a protocol-typed variable (an existential) is stored on the heap (WWDC16).
- A struct that contains class references pays for reference counting when it is copied.

**Apple — [isKnownUniquelyReferenced(_:)](https://developer.apple.com/documentation/swift/isknownuniquelyreferenced(_:)-98zpp)**
- Checks if an object has only one strong reference. Used to build copy-on-write in your own types. Not safe to use from many threads at once without synchronization.

## 2. Checked by running the code (Swift 6.4, Swift 6 language mode)

| Fact | Result |
|---|---|
| Copy a struct, change the copy | original `1`, copy `2` — independent |
| Copy a class reference, change through it | both show `2` — the same instance |
| `let` holding a class instance, change a `var` property | works |
| `let` holding a struct, change a `var` property | error: `cannot assign to property: 's' is a 'let' constant` |
| Struct method changes a property without `mutating` | error: `left side of mutating operator isn't mutable: 'self' is immutable` |
| `===` on two references to one instance / to a new instance | `true` / `false` |
| `===` on a struct | error: expected an instance of a class |
| A struct that holds a class reference, copied, inner object changed | both copies see `99` — **the inner object is shared** |
| Passing a struct to a function and changing it there | the caller's value does not change |
| Array of structs copied and changed / array of classes copied and changed | `1 5` / `5 5` |
| Class without an initializer called as `K(x: 1)` | error — classes get no memberwise initializer |
| `deinit` in a normal struct | error: only allowed in a struct that is not `Copyable` |
| Pass a struct / a non-final class with `var` to a `Sendable` function | struct OK / class error: `does not conform to the 'Sendable' protocol` |
| `final class` with only `let` properties, marked `Sendable` | OK |

## 3. Common wrong ideas (good "Interview traps")

1. **"Structs live on the stack, classes on the heap."** Only partly true. Class instances are on the heap. Struct values often are on the stack, but not always (closures, existentials, inside a class). Better answer: talk about **copy vs share**, reference counting, and that the compiler decides where memory goes.
2. **"A `let` class instance cannot change."** Wrong. `let` fixes the reference, not the object.
3. **"A struct is always fully independent after a copy."** Not if it holds a class reference: the reference is copied, the object is shared.
4. **"Copying a big array is slow."** Standard collections use copy-on-write, so the real copy only happens when one copy is changed.
5. **"Use classes for anything with behavior."** Structs can have methods, computed properties, protocols and extensions. Apple says structs by default.
6. **"`==` and `===` are the same."** `===` is identity (same instance); `==` is equality (same value).

## 4. How interviews ask it, by level

From interview-prep sources ([Hacking with Swift](https://www.hackingwithswift.com/interview-questions/what-are-the-main-differences-between-classes-and-structs-in-swift), [Hacking with Swift: value vs reference](https://hackingwithswift.com/interview-questions/whats-the-difference-between-a-value-type-and-a-reference-type), [dataford](https://dataford.io/questions/struct-vs-class-in-swift)). These show what is asked, not what is true.

| Level | Typical questions |
|---|---|
| Fresh | What is the difference between a struct and a class? What is a value type? What does this code print (copy vs share)? |
| Junior | When do you choose a class? Why can a `let` class instance change? What does `mutating` do? `==` vs `===`? |
| Mid | What is copy-on-write? What happens when a struct holds a class? Why are structs easier with Swift concurrency (`Sendable`)? |
| Senior | Performance: stack vs heap, reference counting, dispatch — and why "structs are always on the stack" is wrong. How would you build copy-on-write for your own type? When is identity important (file handles, connections)? |

## 5. What this means for the lesson (input for step 2.3)

- **Level:** fresh. Keep the main lesson simple: copy vs share, `let` behavior, `mutating`, when to choose which. Deeper ideas (copy-on-write internals, stack and heap, `Sendable`) go into **Go deeper** and the senior interview answer, not the main path.
- **Diagram idea:** two boxes for a struct (copy appears, each changes on its own) next to two labels pointing to one box for a class (change through one label, both see it). Step 4: a struct that holds a class reference.
- **Code examples:** all checked above; outputs are known.
- **Prerequisites:** `functions` is the only prerequisite. Classes need a short `init`; the lesson shows it without teaching initializers in depth (they come in "Methods and Initialization").
- **Possible analogies** (choose in step 2.3): a photocopy of a page vs a shared online document; a copy of a key vs the address of a house; a printed photo vs a link to the photo.

## 6. Sources to use in the lesson

Official: the three Swift book chapters above, *Choosing Between Structures and Classes*, *Sendable*, *isKnownUniquelyReferenced(_:)*, WWDC16 *Understanding Swift Performance*, Swift *Optimization Tips*.
