# Research — Stacks and Layout (Step 1)

Researched 2026-11-09. Topic: `swiftui-layout` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27.

Facts are written in our own words. Apple documentation and official sources are credited.

## 1. What the official sources say

**Apple Developer Documentation — [Building layouts with stack views](https://developer.apple.com/documentation/swiftui/building-layouts-with-stack-views)**
- **The 3-step layout protocol**:
  1. Parent proposes a size to child.
  2. Child chooses its own size based on its content, rules, and proposal.
  3. Parent positions the child in its coordinate space.
  - **Golden rule**: Parents propose, but children decide their own size. A parent cannot dictate child dimensions without the child's consent.

**Apple Developer Documentation — [VStack](https://developer.apple.com/documentation/swiftui/vstack), [HStack](https://developer.apple.com/documentation/swiftui/hstack), [ZStack](https://developer.apple.com/documentation/swiftui/zstack)**
- **VStack**: Arranges children vertically along the Y-axis. Takes `alignment: HorizontalAlignment` (leading, center, trailing) and `spacing: CGFloat?`.
- **HStack**: Arranges children horizontally along the X-axis. Takes `alignment: VerticalAlignment` (top, center, bottom, firstTextBaseline, lastTextBaseline) and `spacing: CGFloat?`.
- **ZStack**: Layers children on top of each other along the Z-axis (back-to-front). Takes `alignment: Alignment`.
- **Default spacing**: If `spacing` is nil, SwiftUI applies adaptive platform-standard margins based on system HIG guidelines.

**Apple Developer Documentation — [Spacer](https://developer.apple.com/documentation/swiftui/spacer)**
- `Spacer` is a flexible view that expands to consume all available unused space along its containing stack's primary axis.
- In `HStack`, it expands horizontally to push siblings apart.
- In `VStack`, it expands vertically.
- Outside a stack, it expands along both axes.

**Apple Developer Documentation — [Frame](https://developer.apple.com/documentation/swiftui/view/frame(width:height:alignment:))**
- `.frame(width:height:alignment:)` wraps a view in a frame container.
- `.frame(maxWidth: .infinity)` creates a greedy view that accepts all proposed space from its parent.
- Applying a frame does not clip overflow content by default; clipping requires the `.clipped()` modifier.

## 2. Checked by running code (Swift 6.4, Swift 6 language mode)

| Fact | Code | Result |
|---|---|---|
| Stack composition | `VStack { HStack { Text("A"); Spacer(); Text("B") } }` | Compiles under Swift 6 strict concurrency |
| Spacer axis expansion | `Spacer()` inside `HStack` vs `VStack` | Adapts primary axis expansion dynamically |
| Frame maxWidth infinity | `.frame(maxWidth: .infinity, alignment: .leading)` | Compiles and aligns child to leading boundary |
| Stack alignment options | `HStack(alignment: .firstTextBaseline)` | Aligns text views cleanly along font baselines |
| Layout priority | `.layoutPriority(1)` | Guarantees space allocation before unprioritized sibling views |

## 3. Common wrong ideas (traps)

1. **"A parent view forces its child to be a specific size."** False. SwiftUI's layout protocol explicitly states that the parent proposes a size, but the child determines its own concrete size.
2. **"Spacer has a fixed default width or height."** False. Spacer is a flexible view with a default `minLength` (often 8–10pt depending on platform) that expands to absorb all remaining stack space.
3. **"Adding `.frame(width: 50, height: 50)` automatically clips text that overflows."** False. Frames define layout boundaries for positioning; visual clipping requires `.clipped()`.
4. **"ZStack children are placed in random order."** False. `ZStack` renders children in sequential order: the first child is in the back, and the last child is at the very front.
5. **"All views in an HStack share space equally."** False. SwiftUI offers space to the least flexible views first (such as fixed text), and then divides remaining space among flexible views.

## 4. Real interview questions by level

- **Fresh**:
  - What are the three steps of the SwiftUI layout process?
  - What is the difference between `VStack`, `HStack`, and `ZStack`?
  - How does a `Spacer` work, and how does its behavior change inside an `HStack` versus a `VStack`?
  - How do you make a view take up the entire width of the screen?
  - What does `spacing: 0` do in a stack?
- **Junior**:
  - How does SwiftUI allocate space among sibling views in an `HStack` when space is limited?
  - What is the purpose of `.layoutPriority(_:)` in resolving layout conflicts?
  - How do alignment guides and `.firstTextBaseline` help align text of different font sizes?
  - What happens if content exceeds the bounds of a `.frame()` modifier?
- **Senior**:
  - How do custom `Layout` protocol implementations (introduced in iOS 16) differ from stacks for complex grid geometries?
  - How does SwiftUI avoid layout loops and cycles compared to UIKit Auto Layout constraint solvers?
  - How do you optimize stack nesting depth to maintain 120fps scrolling performance?
