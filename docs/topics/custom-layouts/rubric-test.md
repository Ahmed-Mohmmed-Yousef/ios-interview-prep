# Rubric Test: Custom Layouts

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/custom-layouts/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## cl-q24 (Written: sizeThatFits versus placeSubviews)

### Rubric
- Explains that sizeThatFits calculates and returns total container dimensions for a proposed size (40 pts, key)
- Explains that placeSubviews positions child subviews in allocated coordinate space (40 pts, key)
- Distinguishes measurement from positioning and mentions subviews and cache arguments (20 pts)

### Good Answer
In the SwiftUI Layout protocol, `sizeThatFits` handles container measurement while `placeSubviews` handles child placement. `sizeThatFits` asks subviews for their desired dimensions and calculates the overall container size to return to the parent. In contrast, `placeSubviews` receives the final allocated rectangle from the parent and calls `place(at:anchor:proposal:)` on each subview. Both methods receive the layout cache to avoid duplicate computations between measurement and positioning phases.

**Score: 100/100**
- [x] Explains sizeThatFits calculates container size (40/40)
- [x] Explains placeSubviews positions child subviews (40/40)
- [x] Distinguishes measurement from placement and mentions cache (20/20)

### Average Answer
`sizeThatFits` measures how big the custom layout needs to be given a proposed size. `placeSubviews` puts each subview at its specific coordinates inside the bounds. They separate sizing from positioning.

**Score: 75/100**
- [x] Explains sizeThatFits (35/40)
- [x] Explains placeSubviews (35/40)
- [ ] Misses cache role and placement call details (5/20)

### Weak Answer
`sizeThatFits` draws the layout background, and `placeSubviews` creates the subviews on the screen.

**Score: 0/100**
- [ ] Inaccurate drawing explanation (0/40)
- [ ] Subviews are created in view bodies, not placeSubviews (0/40)
- [ ] Misses measurement and coordinate layout phases (0/20)

---

## cl-q25 (Written: ProposedViewSize Semantics)

### Rubric
- Explains that ProposedViewSize conveys size proposals from parent to child (40 pts, key)
- Explains the meaning of nil width or height as asking for the child's ideal or natural size (40 pts, key)
- Mentions zero and infinity proposals representing minimum and maximum limits (20 pts)

### Good Answer
`ProposedViewSize` represents the size suggestion offered by a parent container to its child during the layout pass. A value of `nil` for width or height indicates that the parent places no restrictions on that axis, requesting the child's ideal or intrinsic size. Additionally, proposals can supply `0` to determine the minimum allowable size or `.infinity` to determine the maximum size the child can fill.

**Score: 100/100**
- [x] Explains ProposedViewSize conveys parent size proposal (40/40)
- [x] Explains nil width or height requests ideal/intrinsic size (40/40)
- [x] Mentions 0 for minimum and infinity for maximum limits (20/20)

### Average Answer
`ProposedViewSize` is the size proposal passed from a parent container. If width or height is `nil`, it means the container wants the view to return its ideal natural size without any restriction.

**Score: 80/100**
- [x] Explains parent proposal (40/40)
- [x] Explains nil dimensions (40/40)
- [ ] Does not mention 0 and infinity boundary proposals (0/20)

### Weak Answer
`ProposedViewSize` is a fixed frame rectangle that child views are forced to adopt. `nil` means the view should be hidden.

**Score: 0/100**
- [ ] Incorrect frame concept (0/40)
- [ ] Incorrect nil definition (0/40)
- [ ] No understanding of SwiftUI layout negotiation (0/20)

---

## cl-q26 (Written: Layout Cache Usage)

### Rubric
- Explains that layout caching shares expensive calculations between sizeThatFits and placeSubviews (40 pts, key)
- Mentions makeCache and updateCache methods to generate and refresh cached data (30 pts, key)
- Notes that SwiftUI passes cache as inout and invalidates it automatically when subviews or inputs change (30 pts)

### Good Answer
Custom layouts can implement `makeCache(subviews:)` and `updateCache(_:subviews:)` to avoid repeating expensive calculations across layout passes. Calculations such as text wrapping, row breaks, and subview sizes determined in `sizeThatFits` can be stored in a custom cache type. SwiftUI passes this cache as an `inout` parameter to `placeSubviews`. SwiftUI automatically calls `updateCache` whenever subviews, environment values, or layout properties change.

**Score: 100/100**
- [x] Explains sharing expensive calculations across phases (40/40)
- [x] Mentions makeCache and updateCache methods (30/30)
- [x] Explains inout parameter and automatic invalidation (30/30)

### Average Answer
You use layout cache to save heavy calculation results like row heights between `sizeThatFits` and `placeSubviews`. You implement `makeCache` to create the cache data, and SwiftUI passes it to both methods so you do not recalculate twice.

**Score: 75/100**
- [x] Explains calculation sharing (40/40)
- [x] Mentions makeCache (25/30)
- [ ] Omits updateCache and automatic invalidation details (10/30)

### Weak Answer
Cache in Layout is an NSCache instance used to download subview images from the network.

**Score: 0/100**
- [ ] Completely unrelated network cache concept (0/40)
- [ ] Misses makeCache/updateCache lifecycle (0/30)
- [ ] Confuses image loading with geometry computation (0/30)

---

## cl-q27 (Written: LayoutValueKey Role)

### Rubric
- Explains that LayoutValueKey attaches custom metadata to individual child subviews (40 pts, key)
- Explains how custom layout reads subview[Key.self] during sizeThatFits or placeSubviews (35 pts, key)
- Compares pattern to PreferenceKey or environment values for per-child customization (25 pts)

### Good Answer
`LayoutValueKey` defines custom layout traits that can be attached to individual child views using `.layoutValue(key:value:)`. Inside `sizeThatFits` and `placeSubviews`, the custom container reads these values via `subview[Key.self]`. This pattern operates similarly to `PreferenceKey` or environment keys, enabling per-child customization such as column spans, flex priorities, or alignment anchors without tightly coupling children to their parent layout.

**Score: 100/100**
- [x] Attaches custom metadata to individual subviews (40/40)
- [x] Container reads values via subview[Key.self] (35/35)
- [x] Compares to PreferenceKey/environment and per-child customization (25/25)

### Average Answer
`LayoutValueKey` lets you attach special values to child views. In your layout implementation, you read `subview[MyKey.self]` so each child can specify how it wants to be laid out, like a priority or span.

**Score: 75/100**
- [x] Attaches values to subviews (35/40)
- [x] Container reads subview[Key.self] (35/35)
- [ ] Does not compare to preference keys or discuss architectural benefits (5/25)

### Weak Answer
`LayoutValueKey` is a database primary key used to identify SwiftUI Core Data records.

**Score: 0/100**
- [ ] Unrelated database concept (0/40)
- [ ] Misses subview inspection mechanism (0/35)
- [ ] Irrelevant to SwiftUI layout hierarchy (0/25)

---

## cl-q28 (Written: Layout Protocol vs GeometryReader)

### Rubric
- Explains that GeometryReader causes view re-evaluations, layout cycles, and sizing side effects (40 pts, key)
- Explains that Layout protocol participates directly in SwiftUI layout pass without extra body evaluations (40 pts, key)
- Notes cleaner separation of layout logic from view hierarchy and container reusability (20 pts)

### Good Answer
Prior to iOS 16, custom dynamic arrangements relied on `GeometryReader` combined with preference keys. This technique often caused infinite layout loops, view re-evaluations, and unintended greedy expansion because `GeometryReader` consumes all proposed space. The `Layout` protocol participates directly in the 2-pass layout engine without creating nested views or triggering view body re-evaluations. It delivers reusable, container-agnostic layouts with clean separation between views and geometry algorithms.

**Score: 100/100**
- [x] Explains GeometryReader sizing and re-evaluation drawbacks (40/40)
- [x] Explains direct participation in layout pass without body passes (40/40)
- [x] Highlights reusable layout containers and cleaner separation (20/20)

### Average Answer
`GeometryReader` is greedy and takes all available space. Passing preferences back from `GeometryReader` often creates layout loops and slow body re-evaluations. The `Layout` protocol fixes this by calculating sizes and positions directly in native layout methods.

**Score: 80/100**
- [x] Mentions GeometryReader greedy sizing and loops (35/40)
- [x] Mentions native layout calculation without body re-evaluations (35/40)
- [ ] Could further elaborate on container reusability (10/20)

### Weak Answer
`GeometryReader` only works on UIKit, while the `Layout` protocol is the only tool that works on watchOS.

**Score: 0/100**
- [ ] Inaccurate platform statements (0/40)
- [ ] Fails to contrast layout algorithms (0/40)
- [ ] Irrelevant justification (0/20)

---

## cl-q29 (Code-Write: LayoutCache Implementation)

### Rubric
- Declares struct LayoutCache with stored property var offsets: [Double] = [] (35 pts, key)
- Implements mutating method storeOffset(_ offset: Double) that appends offset (35 pts, key)
- Writes testLayoutCache that creates instance, appends 10.0 and 25.0, and prints 'Cached: 2' (30 pts)

### Good Answer
```swift
struct LayoutCache {
    var offsets: [Double] = []
    
    mutating func storeOffset(_ offset: Double) {
        offsets.append(offset)
    }
}

func testLayoutCache() {
    var cache = LayoutCache()
    cache.storeOffset(10.0)
    cache.storeOffset(25.0)
    print("Cached: \(cache.offsets.count)")
}

testLayoutCache()
```

**Score: 100/100**
- [x] Correct struct and property declaration (35/35)
- [x] Mutating storeOffset method implementation (35/35)
- [x] testLayoutCache function with exact expected output (30/30)

### Average Answer
```swift
struct LayoutCache {
    var offsets: [Double] = []
    
    mutating func storeOffset(_ offset: Double) {
        offsets.append(offset)
    }
}

func testLayoutCache() {
    var cache = LayoutCache()
    cache.storeOffset(10.0)
    // forgot second offset call
    print("Cached: \(cache.offsets.count)")
}

testLayoutCache()
```

**Score: 75/100**
- [x] Struct and property correct (35/35)
- [x] Mutating method correct (35/35)
- [ ] Only called storeOffset once instead of twice with 10.0 and 25.0 (5/30)

### Weak Answer
```swift
class LayoutCache {
    func storeOffset() {
        print("stored")
    }
}
```

**Score: 0/100**
- [ ] Used class instead of struct and missed property (0/35)
- [ ] storeOffset takes no argument and stores nothing (0/35)
- [ ] Missing test function and invocation (0/30)

---

## cl-q30 (Code-Write: ProposedSizeEvaluator Implementation)

### Rubric
- Declares struct ProposedSizeEvaluator with width: Double? and height: Double? properties (35 pts, key)
- Implements resolvedWidth(defaultWidth: Double) -> Double using nil-coalescing (35 pts, key)
- Writes testEvaluator with width: nil and height: 100.0, printing 'Resolved: 320.0' (30 pts)

### Good Answer
```swift
struct ProposedSizeEvaluator {
    let width: Double?
    let height: Double?
    
    func resolvedWidth(defaultWidth: Double) -> Double {
        return width ?? defaultWidth
    }
}

func testEvaluator() {
    let evaluator = ProposedSizeEvaluator(width: nil, height: 100.0)
    print("Resolved: \(evaluator.resolvedWidth(defaultWidth: 320.0))")
}

testEvaluator()
```

**Score: 100/100**
- [x] Struct with optional Double properties (35/35)
- [x] resolvedWidth method with nil-coalescing (35/35)
- [x] testEvaluator creates nil width instance and prints exact output (30/30)

### Average Answer
```swift
struct ProposedSizeEvaluator {
    var width: Double?
    var height: Double?
    
    func resolvedWidth(defaultWidth: Double) -> Double {
        if let width = width {
            return width
        }
        return defaultWidth
    }
}

func testEvaluator() {
    let evaluator = ProposedSizeEvaluator(width: nil, height: 100.0)
    print("Width is: \(evaluator.resolvedWidth(defaultWidth: 320.0))")
}

testEvaluator()
```

**Score: 80/100**
- [x] Correct struct and properties (35/35)
- [x] Correct logic in resolvedWidth (35/35)
- [ ] Output string modified from 'Resolved: ' to 'Width is: ' (10/30)

### Weak Answer
```swift
struct ProposedSizeEvaluator {
    var width: Double = 0.0
    func resolvedWidth() -> Double { return 0.0 }
}
```

**Score: 0/100**
- [ ] Missing optional properties (0/35)
- [ ] Incorrect method signature and missing defaultWidth parameter (0/35)
- [ ] No test function (0/30)

---

## cl-q31 (Code-Write: SubviewsPlacer Implementation)

### Rubric
- Declares struct SubviewsPlacer with stored property spacing: Double = 8.0 (35 pts, key)
- Implements computeX(index: Int, itemWidth: Double) -> Double using formula Double(index) * (itemWidth + spacing) (35 pts, key)
- Writes testPlacer creating instance and printing 'Position: 116.0' for index 2 and itemWidth 50.0 (30 pts)

### Good Answer
```swift
struct SubviewsPlacer {
    var spacing: Double = 8.0
    
    func computeX(index: Int, itemWidth: Double) -> Double {
        return Double(index) * (itemWidth + spacing)
    }
}

func testPlacer() {
    let placer = SubviewsPlacer()
    print("Position: \(placer.computeX(index: 2, itemWidth: 50.0))")
}

testPlacer()
```

**Score: 100/100**
- [x] Struct with spacing default property (35/35)
- [x] computeX method with proper formula and type conversion (35/35)
- [x] testPlacer produces exact 'Position: 116.0' output (30/30)

### Average Answer
```swift
struct SubviewsPlacer {
    var spacing: Double = 8.0
    
    func computeX(index: Int, itemWidth: Double) -> Double {
        return Double(index) * itemWidth + spacing // missing parentheses
    }
}

func testPlacer() {
    let placer = SubviewsPlacer()
    print("Position: \(placer.computeX(index: 2, itemWidth: 50.0))")
}

testPlacer()
```

**Score: 70/100**
- [x] Struct and property correct (35/35)
- [ ] Formula missing parentheses, calculating 2 * 50 + 8 = 108.0 instead of 2 * 58 = 116.0 (15/35)
- [x] Test function structure correct (20/30)

### Weak Answer
```swift
struct SubviewsPlacer {
    func computeX() -> Double {
        return 116.0
    }
}
```

**Score: 0/100**
- [ ] Missing spacing property (0/35)
- [ ] Hardcoded method with no parameters or layout calculation (0/35)
- [ ] Missing test function invocation (0/30)
