# Research — Lists and ForEach (Step 1)

Researched 2026-11-09. Topic: `swiftui-lists` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27.

Facts are written in our own words. Apple documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [List](https://developer.apple.com/documentation/swiftui/list)**
- **Lazy loading and row recycling**: `List` is built for high-performance scrolling across large datasets. Rows are created and rendered lazily as they scroll into view and recycled when offscreen.
- **Platform HIG integration**: Provides built-in platform styles (plain, grouped, inset grouped), row separators, swipe actions, and accessory indicators.
- **Contrast with ScrollView + VStack**: A `ScrollView` paired with a standard `VStack` creates all child view structs eagerly upon loading, which degrades memory and frame rate with large collections.

**Apple Developer Documentation — [ForEach](https://developer.apple.com/documentation/swiftui/foreach)**
- **View generation from collections**: Generates views on demand by looping over a collection.
- **Identity requirement**:
  - Elements must conform to `Identifiable` (providing a stable `id` property), OR
  - An explicit key path must be supplied using the `id:` parameter (e.g., `ForEach(items, id: \.self)`).
- **DynamicViewContent**: `ForEach` conforms to `DynamicViewContent`, enabling collection mutation modifiers like `.onDelete(perform:)` and `.onMove(perform:)`.

**Apple Developer Documentation — [Identifiable](https://developer.apple.com/documentation/swift/identifiable)**
- **Contract**: Requires an `id` property conforming to `Hashable`.
- **Stable identity**: The `id` must remain constant across the lifetime of the element. Generating dynamic identifiers (like calling `UUID()` inside a computed getter) breaks identity tracking, resetting animations and scroll positions.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Identifiable struct in List | `struct Item: Identifiable { let id = UUID(); let name: String }` | Loops cleanly in `List(items)` without explicit id parameter |
| Key path identity | `ForEach(names, id: \.self)` | Compiles and binds string collections |
| Row deletion modifier | `ForEach.onDelete(perform: { indices in ... })` | Compiles under Swift 6 strict concurrency |
| List style application | `List { ... }.listStyle(.plain)` | Applies platform plain list layout |
| Lazy row evaluation | `List(0..<1000)` vs `VStack` | List defers body calls until visible |

## 3. Common wrong ideas (traps)

1. **"Calling `.onDelete` directly on `List` compiles."** False. `.onDelete` is defined on `DynamicViewContent`, which `ForEach` conforms to. It must be attached to the `ForEach`, not the parent `List`.
2. **"Using `id: \.self` is safe for duplicate values."** False. If two items in an array share the same value (e.g. `["Apple", "Banana", "Apple"]`), duplicate IDs break diffing and cause visual glitches.
3. **"Declaring `var id: UUID { UUID() }` as a computed property works."** False. Every time SwiftUI reads `id`, a new UUID is generated. This destroys item identity, breaking list animations, row states, and scroll positions.
4. **"`ScrollView` with `VStack` behaves like `List`."** False. A `VStack` inside a `ScrollView` loads all rows immediately in memory, causing huge memory spikes and lag on large datasets.
5. **"List requires `ForEach` for all layouts."** False. If the data model conforms to `Identifiable`, you can pass the collection directly to `List(items) { item in ... }`.

## 4. Real interview questions by level

- **Fresh**:
  - What is the difference between `List` and `ScrollView` + `VStack`?
  - What protocol must data conform to before being displayed in a `List` without an `id` parameter?
  - How do you add swipe-to-delete functionality to a SwiftUI `List`?
  - Why is using `\.self` as an ID dangerous when an array contains duplicate elements?
  - How do you iterate through an array in SwiftUI using `ForEach`?
- **Junior**:
  - How does SwiftUI use `Identifiable.id` to compute row insertions, deletions, and animations?
  - What happens if an element's `id` property changes on every render pass?
  - What is the difference between `List` and `LazyVStack` regarding cell recycling and swipe actions?
  - How do you implement custom swipe actions using the `.swipeActions` modifier?
- **Senior**:
  - How does SwiftUI bridge `List` to underlying platform controls (`UICollectionView` on iOS) and manage cell reuse pools?
  - How do you optimize `List` scroll performance when rows contain complex asynchronous image loads?
  - How does structural identity differ from explicit identity when diffing dynamic collections in the attribute graph?
