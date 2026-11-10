# Rubric Test: Custom Views and the Layout Pass

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/custom-views-layout-pass/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## cvl-q24 (Written: setNeedsLayout vs layoutIfNeeded)

### Rubric
- Explains that setNeedsLayout is asynchronous and marks the view dirty for the next run loop pass (50 pts, key)
- Explains that layoutIfNeeded is synchronous and forces immediate layout execution if the dirty flag is set (50 pts, key)

### Good Answer
In UIKit, `setNeedsLayout()` is an asynchronous method that flags the view as dirty and schedules a layout pass on the next turn of the run loop. It returns immediately and allows multiple subsequent layout invalidations to coalesce into a single pass. In contrast, `layoutIfNeeded()` is synchronous; if the view is marked dirty, it immediately executes `layoutSubviews()` without waiting for the run loop. This makes `layoutIfNeeded()` essential for animating Auto Layout changes inside animation blocks.

**Score: 100/100**
- [x] Explains setNeedsLayout is asynchronous and marks view dirty (50/50)
- [x] Explains layoutIfNeeded is synchronous and forces immediate pass (50/50)

### Average Answer
setNeedsLayout flags the view so it updates later during the run loop. layoutIfNeeded forces an immediate layout right away if the view was marked dirty.

**Score: 85/100**
- [x] Explains setNeedsLayout flags for later (45/50)
- [x] Explains layoutIfNeeded forces immediate pass (40/50)

### Weak Answer
Both methods perform garbage collection on unused Core Graphics bitmaps.

**Score: 0/100**
- [ ] Inaccurate bitmap claim (0/50)
- [ ] Misses layout pass mechanisms (0/50)

---

## cvl-q25 (Written: Never Call layoutSubviews Directly)

### Rubric
- Explains that layoutSubviews is a system callback managed by the UIKit layout engine (50 pts, key)
- Explains to call setNeedsLayout to request layout or layoutIfNeeded to force immediate execution (50 pts, key)

### Good Answer
Developers should never call `layoutSubviews()` directly because it is an internal system callback managed by the UIKit layout engine. Calling it manually bypasses the run loop coalescing architecture and fails to update dirty ancestor or descendant views in the hierarchy. Instead, developers should invoke `setNeedsLayout()` to request an asynchronous pass or `layoutIfNeeded()` to trigger an immediate, coordinated layout.

**Score: 100/100**
- [x] Explains layoutSubviews is system callback (50/50)
- [x] Explains calling setNeedsLayout or layoutIfNeeded instead (50/50)

### Average Answer
layoutSubviews is called by UIKit, not by your code. If you need a layout update, call setNeedsLayout to schedule it or layoutIfNeeded to do it now.

**Score: 85/100**
- [x] Mentions system call (45/50)
- [x] Explains using setNeedsLayout or layoutIfNeeded (40/50)

### Weak Answer
You cannot call layoutSubviews because it is written in assembly code on the device.

**Score: 0/100**
- [ ] Inaccurate assembly claim (0/50)
- [ ] Misses layout scheduling explanation (0/50)

---

## cvl-q26 (Written: Purpose of intrinsicContentSize)

### Rubric
- Explains that intrinsicContentSize defines a view natural size based on its contents (50 pts, key)
- Explains that calling invalidateIntrinsicContentSize tells Auto Layout to recalculate constraints (50 pts, key)

### Good Answer
The `intrinsicContentSize` property defines the natural, intrinsic dimensions of a view derived from its internal contents, such as text length or image dimensions. This allows Auto Layout to measure and position views without requiring explicit width or height constraints. Whenever internal content changes and alters these natural dimensions, you must call `invalidateIntrinsicContentSize()` so the layout engine knows to recalculate parent and sibling constraints.

**Score: 100/100**
- [x] Explains intrinsicContentSize defines natural content dimensions (50/50)
- [x] Explains invalidateIntrinsicContentSize triggers constraint recalculation (50/50)

### Average Answer
intrinsicContentSize returns the natural size of a view based on what is inside it. When the content changes, you call invalidateIntrinsicContentSize to tell Auto Layout to update its size.

**Score: 85/100**
- [x] Explains natural size from content (45/50)
- [x] Explains invalidation call (40/50)

### Weak Answer
intrinsicContentSize sets the maximum frame boundaries to prevent views from going offscreen.

**Score: 0/100**
- [ ] Inaccurate boundary claim (0/50)
- [ ] Misses intrinsic size and invalidation roles (0/50)

---

## cvl-q27 (Written: Animating Constraint Changes with UIView.animate)

### Rubric
- Explains updating the constraint constant property (50 pts, key)
- Explains calling layoutIfNeeded on the container view inside the UIView.animate block (50 pts, key)

### Good Answer
To animate an Auto Layout constraint change, you first update the constraint's `constant` property on the main thread. Next, inside the `UIView.animate` animation block, you call `layoutIfNeeded()` on the view or its parent container. Calling `layoutIfNeeded()` inside the animation closure forces UIKit to recalculate subview frames immediately, allowing the Core Animation engine to smoothly interpolate the geometric changes over the specified duration.

**Score: 100/100**
- [x] Explains updating constraint constant property (50/50)
- [x] Explains calling layoutIfNeeded inside UIView.animate (50/50)

### Average Answer
Change the constant of the constraint first. Then call view.layoutIfNeeded inside UIView.animate so that UIKit animates the new frame positions.

**Score: 85/100**
- [x] Mentions updating constant (45/50)
- [x] Mentions calling layoutIfNeeded in animation block (40/50)

### Weak Answer
Change the constraint and call setNeedsDisplay() inside a background thread.

**Score: 0/100**
- [ ] Misses constraint constant update pattern (0/50)
- [ ] Misses layoutIfNeeded in animation block (0/50)

---

## cvl-q28 (Written: Mandatory super.layoutSubviews)

### Rubric
- Explains that super.layoutSubviews executes the Auto Layout engine subview positioning pass (50 pts, key)
- Explains that omitting super.layoutSubviews prevents subviews from receiving their calculated frames (50 pts, key)

### Good Answer
Calling `super.layoutSubviews()` is mandatory because it invokes the underlying Auto Layout engine pass to compute and apply frames to all managed subviews. If you omit the `super` call, constraint equations will not resolve into concrete subview geometries, leaving subviews misplaced or with zero frames. Always call `super.layoutSubviews()` at the beginning of your custom implementation before performing additional manual adjustments.

**Score: 100/100**
- [x] Explains super executes Auto Layout positioning pass (50/50)
- [x] Explains omitting super leaves subviews misplaced/with zero frames (50/50)

### Average Answer
super.layoutSubviews lets Auto Layout position the subviews based on their constraints. If you forget to call it, your subviews will not get their proper frames.

**Score: 85/100**
- [x] Mentions Auto Layout subview positioning (45/50)
- [x] Mentions subviews missing frames (40/50)

### Weak Answer
super.layoutSubviews resets the view background color to transparent.

**Score: 0/100**
- [ ] Inaccurate background color claim (0/50)
- [ ] Misses Auto Layout engine frame assignment (0/50)

---

## cvl-q29 (Code-Write: IntrinsicDimension)

### Rubric
- Declares IntrinsicDimension with width and height properties (35 pts, key)
- Implements isLarger method comparing area calculations (35 pts, key)
- Prints exact output 'Larger: true' (30 pts, key)

### Good Answer
```swift
struct IntrinsicDimension {
    let width: Double
    let height: Double

    func isLarger(than other: IntrinsicDimension) -> Bool {
        (width * height) > (other.width * other.height)
    }
}

func testDimension() {
    let d1 = IntrinsicDimension(width: 50.0, height: 40.0)
    let d2 = IntrinsicDimension(width: 30.0, height: 30.0)
    print("Larger: \(d1.isLarger(than: d2))")
}

testDimension()
```

**Score: 100/100**
- [x] Declares IntrinsicDimension with width and height (35/35)
- [x] Implements isLarger comparing areas (35/35)
- [x] Prints 'Larger: true' (30/30)

### Average Answer
```swift
struct IntrinsicDimension {
    var width: Double
    var height: Double
    func isLarger(than other: IntrinsicDimension) -> Bool {
        let area1 = width * height
        let area2 = other.width * other.height
        return area1 > area2
    }
}
func testDimension() {
    let a = IntrinsicDimension(width: 50.0, height: 40.0)
    let b = IntrinsicDimension(width: 30.0, height: 30.0)
    print("Larger: \(a.isLarger(than: b))")
}
testDimension()
```

**Score: 100/100**
- [x] Declares IntrinsicDimension (35/35)
- [x] Implements isLarger (35/35)
- [x] Prints 'Larger: true' (30/30)

### Weak Answer
```swift
struct IntrinsicDimension {
    let width: Double
}
func testDimension() {
    print("Larger: false")
}
testDimension()
```

**Score: 10/100**
- [ ] Missing height property (0/35)
- [ ] Missing isLarger method (0/35)
- [ ] Wrong output 'Larger: false' (10/30)

---

## cvl-q30 (Code-Write: LayoutPassTracker)

### Rubric
- Declares LayoutPassTracker with isDirty and executedPasses properties (35 pts, key)
- Implements markDirty and flushIfNeeded correctly coalescing passes (35 pts, key)
- Prints exact output 'Passes: 1' (30 pts, key)

### Good Answer
```swift
struct LayoutPassTracker {
    var isDirty: Bool = false
    var executedPasses: Int = 0

    mutating func markDirty() {
        isDirty = true
    }

    mutating func flushIfNeeded() {
        if isDirty {
            executedPasses += 1
            isDirty = false
        }
    }
}

func testTracker() {
    var tracker = LayoutPassTracker()
    tracker.markDirty()
    tracker.markDirty()
    tracker.flushIfNeeded()
    print("Passes: \(tracker.executedPasses)")
}

testTracker()
```

**Score: 100/100**
- [x] Declares LayoutPassTracker with properties (35/35)
- [x] Implements markDirty and flushIfNeeded (35/35)
- [x] Prints 'Passes: 1' (30/30)

### Average Answer
```swift
struct LayoutPassTracker {
    var isDirty = false
    var executedPasses = 0
    mutating func markDirty() { isDirty = true }
    mutating func flushIfNeeded() {
        guard isDirty else { return }
        executedPasses += 1
        isDirty = false
    }
}
func testTracker() {
    var t = LayoutPassTracker()
    t.markDirty()
    t.markDirty()
    t.flushIfNeeded()
    print("Passes: \(t.executedPasses)")
}
testTracker()
```

**Score: 100/100**
- [x] Declares properties (35/35)
- [x] Implements methods (35/35)
- [x] Prints 'Passes: 1' (30/30)

### Weak Answer
```swift
struct LayoutPassTracker {
    func markDirty() {}
}
func testTracker() {
    print("Passes: 0")
}
testTracker()
```

**Score: 10/100**
- [ ] Missing properties (0/35)
- [ ] Missing flushIfNeeded (0/35)
- [ ] Wrong output 'Passes: 0' (10/30)

---

## cvl-q31 (Code-Write: SubviewLayoutPlacer)

### Rubric
- Declares SubviewLayoutPlacer with containerBounds property initialized to 400.0 (35 pts, key)
- Implements computeOriginX handling leading, trailing, and center alignments (35 pts, key)
- Prints exact output 'Origin: 150.0' (30 pts, key)

### Good Answer
```swift
struct SubviewLayoutPlacer {
    var containerBounds: Double = 400.0

    func computeOriginX(itemWidth: Double, alignment: String) -> Double {
        switch alignment {
        case "leading":
            return 0.0
        case "trailing":
            return containerBounds - itemWidth
        case "center":
            return (containerBounds - itemWidth) / 2.0
        default:
            return 0.0
        }
    }
}

func testPlacer() {
    let placer = SubviewLayoutPlacer()
    let origin = placer.computeOriginX(itemWidth: 100.0, alignment: "center")
    print("Origin: \(origin)")
}

testPlacer()
```

**Score: 100/100**
- [x] Declares SubviewLayoutPlacer with containerBounds initialized to 400.0 (35/35)
- [x] Implements computeOriginX for all alignments (35/35)
- [x] Prints 'Origin: 150.0' (30/30)

### Average Answer
```swift
struct SubviewLayoutPlacer {
    var containerBounds = 400.0
    func computeOriginX(itemWidth: Double, alignment: String) -> Double {
        if alignment == "leading" { return 0.0 }
        if alignment == "trailing" { return containerBounds - itemWidth }
        if alignment == "center" { return (containerBounds - itemWidth) / 2 }
        return 0.0
    }
}
func testPlacer() {
    let p = SubviewLayoutPlacer()
    print("Origin: \(p.computeOriginX(itemWidth: 100.0, alignment: "center"))")
}
testPlacer()
```

**Score: 100/100**
- [x] Declares SubviewLayoutPlacer (35/35)
- [x] Implements computeOriginX (35/35)
- [x] Prints 'Origin: 150.0' (30/30)

### Weak Answer
```swift
struct SubviewLayoutPlacer {
    func computeOriginX() -> Double { return 0.0 }
}
func testPlacer() {
    print("Origin: 0.0")
}
testPlacer()
```

**Score: 10/100**
- [ ] Missing containerBounds property (0/35)
- [ ] Missing alignment and width parameters (0/35)
- [ ] Wrong output 'Origin: 0.0' (10/30)
