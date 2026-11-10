# Research: Animations and Transitions

Topic ID: `swiftui-animations`  
Level: Mid  
Goal: After this topic, you can add animations and transitions to your views.

## 1. Official Sources & Technical Mechanics

### Sources
- **Animations (SwiftUI)**: https://developer.apple.com/documentation/swiftui/animations
- **WWDC23: Explore SwiftUI animation (Session 10156)**: https://developer.apple.com/videos/play/wwdc2023/10156/
- **View.animation(_:value:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/view/animation(_:value:)
- **withAnimation(_:_:) (SwiftUI)**: https://developer.apple.com/documentation/swiftui/withanimation(_:_:)
- **Transition (SwiftUI)**: https://developer.apple.com/documentation/swiftui/transition

### Core Technical Concepts

1. **Implicit vs Explicit Animations**:
   - **Implicit Animations (`.animation(_:value:)`)**:
     - Applied directly to a view in the modifier chain.
     - Scoped strictly to that view and its children, triggering only when the observed `value` (conforming to `Equatable`) changes.
     - The legacy single-parameter `.animation(_:)` was deprecated in iOS 15 because it responded to every ancestor invalidation, causing uncontrolled animation glitches.
   - **Explicit Animations (`withAnimation(_:_:)`)**:
     - Wraps the source of truth mutation: `withAnimation(.snappy) { isExpanded.toggle() }`.
     - Animates all views in the entire view graph that depend on that modified state.
     - Provides clear intent by telling SwiftUI: "animate all layout and visual updates resulting from this specific state change."

2. **Transitions (`.transition(_:)`)**:
   - Transitions define how a view appears (insertion) and disappears (removal) from the view hierarchy.
   - Transitions ONLY execute when a view's identity is added or removed from the tree (structural or explicit identity changes).
   - Built-in transitions:
     - `.opacity`: fades in and out.
     - `.scale`: scales up from zero and down to zero.
     - `.slide`: slides in from leading and out to trailing.
     - `.move(edge:)`: slides in/out from top, bottom, leading, or trailing.
     - `.asymmetric(insertion:removal:)`: specifies different behaviors for entrance and exit.
     - `.combined(with:)`: combines multiple transitions (e.g. opacity + scale).
   - **Essential Prerequisite**: A transition will NOT animate unless the identity insertion/removal happens inside an animated context (such as `withAnimation`). Without an animated context, the view simply pops in or out instantly.

3. **Modern Spring Physics**:
   - Modern SwiftUI emphasizes spring physics over linear easing curves.
   - iOS 17+ introduces standard presets:
     - `.smooth`: minimal bounce, fluid motion.
     - `.snappy`: quick response with high stiffness.
     - `.bouncy`: playful, expressive overshoot.
   - Springs handle user interruptions naturally: if a gesture or state change interrupts an ongoing spring animation, the spring preserves momentum and velocity without jarring visual jumps.

4. **Modifier Ordering & Animation Scope**:
   - The `.animation(_:value:)` modifier only animates modifiers placed *before* it in the chain. Modifiers placed *after* `.animation` are not animated.

## 2. Interview Questions by Level

### Fresh / Junior Level
- What is the difference between `.animation(_:value:)` and `withAnimation`?
- Why did Apple deprecate `.animation()` without a `value` parameter?
- How do you combine opacity and slide into a single transition?

### Mid Level
- Why does a `.transition()` fail to animate if the state change is not wrapped in `withAnimation`?
- How do spring animations handle interruptions compared to linear or ease-in-out animations?
- How does modifier order affect which view properties are animated by `.animation(_:value:)`?
- When would you use `.asymmetric(insertion:removal:)`?

### Senior / Staff Level
- How does SwiftUI's transaction system (`Transaction`) propagate animation metadata down the view hierarchy?
- How does `matchedGeometryEffect` coordinate frame interpolation across distinct structural view identities?
- How do you optimize complex animated feeds to avoid CPU frame drops during gesture tracking?
