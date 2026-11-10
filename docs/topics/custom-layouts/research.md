# Research: Custom Layouts

Topic ID: `custom-layouts`  
Level: Mid (Bonus)  
Goal: After this topic, you can write a custom layout with the Layout protocol.

## 1. Official Sources & Technical Mechanics

### Sources
- **Layout (SwiftUI)**: https://developer.apple.com/documentation/swiftui/layout
- **WWDC22: Compose custom layouts with SwiftUI (Session 10056)**: https://developer.apple.com/videos/play/wwdc2022/10056/
- **ProposedViewSize (SwiftUI)**: https://developer.apple.com/documentation/swiftui/proposedviewsize
- **LayoutSubview (SwiftUI)**: https://developer.apple.com/documentation/swiftui/layoutsubview
- **LayoutValueKey (SwiftUI)**: https://developer.apple.com/documentation/swiftui/layoutvaluekey

### Core Technical Concepts

1. **The `Layout` Protocol (iOS 16+)**:
   - Introduced in iOS 16, the `Layout` protocol allows developers to build custom container views that position and size arbitrary children, just like `VStack`, `HStack`, or `ZStack`.
   - Before iOS 16, custom arrangements required complex hacks combining `GeometryReader`, preference keys, and hidden background views.
   - Types conforming to `Layout` integrate directly into SwiftUI's layout negotiation algorithm and support seamless animation transitions.

2. **The Two Core Protocol Requirements**:
   - **`sizeThatFits(proposal:subviews:cache:) -> CGSize`**:
     - Tells the parent container how much space the layout needs given a proposed size (`ProposedViewSize`).
     - Measures subviews by querying `subview.sizeThatFits(childProposal)`.
     - Returns the total bounding box size of the layout.
   - **`placeSubviews(in:proposal:subviews:cache:)`**:
     - Assigns positions (`CGPoint`) to each subview inside the allocated rectangle bounds (`CGRect`).
     - Calls `subview.place(at:anchor:proposal:)` on each `LayoutSubview`.

3. **`ProposedViewSize`**:
   - Represents the size proposed by the parent view.
   - It has optional `width: CGFloat?` and `height: CGFloat?`.
   - Special cases:
     - `ProposedViewSize.unspecified`: measures the view's natural, unconstrained ideal size.
     - `ProposedViewSize.zero`: measures the view's minimum size.
     - `ProposedViewSize.infinity`: measures the view's maximum size.

4. **Cache Mechanism (`makeCache(subviews:)`)**:
   - Layout calculations can be computationally expensive (such as word wrapping or dynamic packing algorithms).
   - The `Layout` protocol provides optional cache methods:
     - `makeCache(subviews:) -> Cache`: initializes custom cache storage.
     - `updateCache(_:subviews:)`: updates cache when subviews or layout properties mutate.
   - Pre-computed offsets or line-break indices calculated in `sizeThatFits` can be saved in the cache and reused directly in `placeSubviews` without re-measuring.

5. **`LayoutValueKey`**:
   - Allows child views to pass metadata up to the custom layout container.
   - For example, tags can declare priority, flex weight, or row alignment preferences:
     `TagView().layoutValue(key: CustomWeightKey.self, value: 2)`.

6. **Common Layout Patterns**:
   - **FlowLayout / WrapLayout**: Places elements horizontally until width is exhausted, then wraps to the next line.
   - **RadialLayout / CircleLayout**: Arranges subviews in a circular ring using trigonometric functions (`cos` and `sin`).
   - **EqualWidthHStack**: Measures the widest child and forces all children to match that width.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What two methods must you implement to conform to the `Layout` protocol?
- What is `ProposedViewSize`, and why are its width and height optional?
- How is `Layout` better than using `GeometryReader` for custom view positioning?

### Mid Level
- Explain how `sizeThatFits` and `placeSubviews` coordinate during a single layout pass.
- How do you use `makeCache(subviews:)` to avoid redundant layout calculations?
- How does `LayoutValueKey` allow children to pass custom spacing or weight data to a layout?
- How do custom layouts animate when children are added or removed?

### Senior / Staff Level
- How does the `Layout` protocol interact with SwiftUI's view identity and transaction propagation?
- Design a high-performance flow layout that supports dynamic type, line wrapping, and animated child reordering without layout recursion.
