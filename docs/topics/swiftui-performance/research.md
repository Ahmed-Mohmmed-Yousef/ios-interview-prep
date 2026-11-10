# Research: SwiftUI Performance

**Topic ID:** `swiftui-performance`  
**Level:** Mid  
**Goal:** After this topic, you can find and fix slow SwiftUI views.  
**Prerequisites:** `view-identity-lifetime`

---

## 1. Official Sources & Key Documentation

1. **WWDC23 Session 10160: Demystify SwiftUI Performance**  
   - URL: https://developer.apple.com/videos/play/wwdc2023/10160/  
   - Core insights:
     - SwiftUI updates views through a cycle: State Change -> Dependency Evaluation -> View Body Execution -> Render Tree Diff.
     - View bodies must be lightweight, pure functions with no side effects or heavy work (no file I/O, no network calls, no complex filtering or JSON parsing).
     - Dependency graph scoping: SwiftUI only calls `body` when a dependency changes.
     - `@Observable` (Observation framework in iOS 17+) tracks property access on a fine-grained, per-property level. In contrast, `ObservableObject` and `objectWillChange` in Combine invalidate every view reading any part of the object.
     - View identity stability: Unstable or random IDs cause SwiftUI to destroy and re-create view state, triggering expensive render allocations.

2. **WWDC21 Session 10022: Demystify SwiftUI**  
   - URL: https://developer.apple.com/videos/play/wwdc2021/10022/  
   - Structural and explicit identity; avoiding branching with `if/else` inside view bodies when transitions are not needed, as structural identity changes force state resets.

3. **Instruments: SwiftUI Profiling Tools**  
   - Time Profiler: pinpoints CPU bottlenecks and heavy computations.
   - SwiftUI Instruments template: monitors View Body evaluations, View Properties, and State Invalidation.
   - Debugging utility: `Self._printChanges()` inside `var body` to log which specific dependency or state property triggered the body evaluation.

4. **Equatable Views**  
   - `EquatableView` and `.equatable()` modifier: conformance to `Equatable` allows SwiftUI to compare view values and skip body re-evaluations if properties have not changed.

---

## 2. Common Interview Themes & Traps

- **Heavy work in body:** Doing data transformations (sorting large arrays, date formatting) inside `var body: some View`.
- **Granularity of Observation:** Why migrating from `ObservableObject` to `@Observable` dramatically improves performance (property-level vs object-level invalidation).
- **Unstable identity in ForEach:** Generating `UUID()` inside `body` or using index-based identity on mutating collections.
- **Over-invalidation:** Parent views passing monolithic models instead of primitive values or granular observable types.
- **Diagnosing tools:** How candidates actually identify SwiftUI hitches in production: Instruments (SwiftUI view bodies instrument), `Self._printChanges()`.
