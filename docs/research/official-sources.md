# Official Sources — What They Cover

Checked 2026-10-22.

## Current versions

Xcode 27.1, Swift 6.4, iOS 27.1 SDK (27.2 RC available). Source: [Latest Xcode versions](https://developer.apple.com/support/xcode/).

## The Swift Programming Language (Swift book)

Source: [swiftlang/swift-book, Language Guide folder](https://github.com/swiftlang/swift-book/tree/main/TSPL.docc/LanguageGuide) (Apache-2.0). The Language Guide has these chapters (from the file list):

The Basics · Basic Operators · Strings and Characters · Collection Types · Control Flow · Functions · Closures · Enumerations · Structures and Classes · Properties · Methods · Subscripts · Inheritance · Initialization · Deinitialization · Optional Chaining · Error Handling · Concurrency · Macros · Type Casting · Nested Types · Extensions · Protocols · Generics · Opaque Types · Automatic Reference Counting · Memory Safety · Access Control · Advanced Operators

These chapters are the base for the Swift Language and Memory topics.

## Apple frameworks in scope

All of these are listed on Apple's technologies index ([technologies.json](https://developer.apple.com/tutorials/data/documentation/technologies.json)):

| Group | Frameworks |
|---|---|
| App frameworks | SwiftUI, UIKit, Foundation, Swift, Observation, Accessibility, Foundation Models |
| App services | SwiftData, Core Data, Combine, Background Tasks, User Notifications, App Intents, WidgetKit, StoreKit, Core Location, MapKit |
| Developer tools | Swift Testing, XCTest |
| System | Security, Network, OSLog, MetricKit |

## Recent changes that lessons must teach correctly

### Swift 6.2 (2025) — [swift.org: Swift 6.2 released](https://www.swift.org/blog/swift-6.2-released/)
- **Approachable concurrency:** less annotation work for data-race-safe code.
- **Default main-actor isolation:** a module option to run code on the main actor without writing `@MainActor`. Aimed at apps, scripts and UI code.
- **`nonisolated` async functions run in the caller's context** (upcoming feature "nonisolated-nonsending-by-default").
- **`@concurrent`:** opt a function into running on the concurrent thread pool.
- **`InlineArray`** (fixed-size array, no heap allocation) and **`Span`** (safe access to contiguous memory).
- **Opt-in strict memory safety.**
- **Swift Testing:** exit tests, attachments, raw identifier names (SE-0451).

### Swift 6.4 (2026) — [WWDC26 Swift guide](https://developer.apple.com/wwdc26/guides/swift/), [swift.org June 2026](https://swift.org/blog/whats-new-in-swift-june-2026/)
- `anyAppleOS` availability, `@diagnose` for warnings.
- **`async` code in `defer`.**
- Iteration protocol for noncopyable types (`for-in` over `Span`, `InlineArray`).
- Foundation URL parsing up to 4x faster.
- **Swift Testing ↔ XCTest interoperability** for step-by-step migration.
- Swift Evolution (not tied to a release yet): SE-0526 `withDeadline` (in review), SE-0474 yielding accessors, SE-0529 `FilePath` in the standard library, SE-0527 `UniqueArray`.

### SwiftUI in iOS 27 — [WWDC26 SwiftUI guide](https://developer.apple.com/wwdc26/guides/swiftui/)
- **`State` is now a macro.** Classes stored in `@State` are created lazily, once per view lifetime. *This changes a classic interview answer* (before, `@State` could re-run the initializer when the view was rebuilt).
- `ViewBuilder` is exposed as `ContentBuilder` (faster builds).
- Reordering in any container, swipe actions on any `ScrollView`, item-bound alerts and dialogs.
- `AsyncImage` uses standard HTTP caching by default; custom `URLSession` via `asyncImageURLSession`.
- New toolbar controls and a new document API.

### iOS 26 (2025) — [What's new in iOS 26](https://developer.apple.com/ios/whats-new)
- **Liquid Glass:** a new design material and design language across platforms. Apps may need UI changes.
- **Foundation Models framework:** apps can use Apple's on-device models (guided generation, tool calling).

## Other official learning material

- Apple's **Develop in Swift** curriculum (Apple Education) teaches Swift, Xcode, UIKit and Auto Layout to beginners. Useful as a check for fresh-level topics. ([Develop in Swift](https://education.apple.com/learning-center/T021340A))

## Gaps to fill in step 1.7

Exact doc URLs for each topic are attached and checked in step 1.7 (Sources). Some pages on developer.apple.com need JavaScript and could not be read directly here; we will use the docs data endpoints or the WWDC session pages for those.
