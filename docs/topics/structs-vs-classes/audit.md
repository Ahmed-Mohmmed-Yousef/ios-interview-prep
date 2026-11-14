# Audit: structs-vs-classes

Date: 2026-11-10. Independent check (content-fact-checker, fix mode). Baseline: Swift 6.4 (swiftc 6.4.2), Xcode 27.2.

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| q3, q9, q10, q26, q31 `lessonSection` | "Which one should you choose?" | RULES (not a `##` heading) | docs/lesson-format.md | Pointed at `In code`, the `##` section that holds the sub-heading |
| Lesson VersionNote | A class is Sendable if it is `final` with only `let` Sendable properties | INCOMPLETE | https://developer.apple.com/documentation/swift/sendable ; swiftc: `final class FS { let v = 0 }` is not Sendable without `: Sendable`; a subclass of a non-NSObject class cannot be Sendable | Added "no parent class" and "you must mark it `Sendable` yourself" |
| Lesson VersionNote | "Structs work the same way in both places" | IMPRECISE | swiftc with and without `-default-isolation MainActor` | Now: "A struct with `Sendable` properties is `Sendable` in both places" |
| Lesson VersionNote | New Xcode app projects use main actor by default; main-actor classes are Sendable | OK | https://developer.apple.com/videos/play/wwdc2025/268/ (Xcode 26 default), Sendable docs | none |
| Lesson trap "struct copy is always fully separate" | (q27 rubric scores a way to avoid the bug; lesson did not teach one) | UNTAUGHT | — | Added one sentence: use a struct for that property, or create a new instance on purpose |
| Lesson trap "stack" | Class instances live on the heap (q28 rubric scores reference counting) | UNTAUGHT in trap | https://developer.apple.com/videos/play/wwdc2016/416/ | Added "and Swift counts the references to each one" |
| Lesson trap / DeepDive | `var` captured by escaping closure is boxed on the heap; large struct in protocol type goes on heap | OK | https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst ; WWDC16 416 (3-word buffer) | none |
| Lesson table | memberwise init only for structs, lost with custom `init` inside the struct, kept with init in extension | OK | swift-book Initialization.md; swiftc test | none |
| Lesson table | `deinit` only on classes, except noncopyable structs | OK | swift-book Deinitialization.md; SE-0390; swiftc | none |
| Lesson table | `===` only for class instances | OK | swift-book ClassesAndStructures.md; swiftc error on struct | none |
| Lesson | let struct cannot change; mutating needed | OK | swift-book Properties.md, Methods.md; swiftc | none |
| Lesson | Array/Dictionary/String copy optimization | OK | swift-book ClassesAndStructures.md | none |
| Choosing guide | struct by default; class for identity, Obj-C class hierarchies | OK | https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes | none |
| q10 option d | "A class, because users are important" | RULES (joke option) | — | Replaced with a believable mistake ("the user data can change") |
| q13 option d | "Swift has no stack or heap at all" | RULES (joke option) | — | Replaced with "A struct moves to the heap when you copy it" |
| q14 option b explanation | "the compiler reports an error" | IMPRECISE | swiftc | Error only when the class is shared between tasks |
| q24 prompt | rubric scored "one more difference" and the effect of a change, prompt did not ask | RULES | — | Prompt asks for both; criterion 4 now only accepts real differences |
| q28 prompt | rubric scored a heap example and class costs, prompt did not ask | RULES | — | Prompt asks for class cost, a heap example and the main difference |
| All code | lesson examples and `verify` | OK | run-swift-examples: 4 + 12 passed | none |

## Still open
- Not done in time: a full B1 read by the plain-english-reviewer agent (the hook passes). (review.html was rebuilt.)
- The senior InterviewAnswer still says "Classes need `final` and immutable `Sendable` properties" without "no parent class" and the explicit `Sendable` mark. Short form; not wrong enough to block, but worth a small edit.
