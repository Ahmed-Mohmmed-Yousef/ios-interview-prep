# Rubric Test: SwiftUI Performance

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/swiftui-performance/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sui-perf-q24 (Written: Fast View Body Execution)

### Rubric
- Explains that view body executes synchronously on the main thread during render passes (50 pts, key)
- Explains that heavy computations in body cause main thread blocking and dropped frames (50 pts, key)

### Good Answer
SwiftUI evaluates the `body` property synchronously on the main thread whenever any dependent state property changes. If a view body performs heavy tasks such as sorting large arrays, JSON decoding, or date formatting, it blocks the main run loop from processing touches and drawing frame buffers. This delay causes dropped frames, visual hitches, and poor scrolling performance. Keeping view bodies lightweight makes sure the app consistently hits 60 or 120 frames per second.

**Score: 100/100**
- [x] Explains body runs synchronously on main thread (50/50)
- [x] Explains heavy computations block main thread and drop frames (50/50)

### Average Answer
The body property runs on the main thread whenever state changes. If you do slow things like sorting arrays inside body, it makes the app stutter and drop frames while scrolling.

**Score: 85/100**
- [x] Mentions main thread evaluation (45/50)
- [x] Mentions heavy work causing stutter and dropped frames (40/50)

### Weak Answer
View bodies run in the background on the GPU to compile Swift code into shaders.

**Score: 0/100**
- [ ] Misses main thread execution concept (0/50)
- [ ] Inaccurate GPU shader claim (0/50)

---

## sui-perf-q25 (Written: Equatable Subviews)

### Rubric
- Explains that Equatable allows SwiftUI to compare view property values between render passes (50 pts, key)
- Explains that matching properties allow SwiftUI to skip executing the subview body (50 pts, key)

### Good Answer
Conforming a child view to `Equatable` and applying the `.equatable()` modifier enables SwiftUI to perform an equality check on the view's input properties before evaluating its body. If a parent view re-evaluates its body but passes unchanged properties to the child, SwiftUI observes that the child's properties match the previous values. Consequently, SwiftUI skips re-evaluating the child view's body entirely, preventing redundant work across deep view subtrees.

**Score: 100/100**
- [x] Explains Equatable compares input properties between render passes (50/50)
- [x] Explains matching properties allow skipping child body execution (50/50)

### Average Answer
Equatable lets SwiftUI compare old and new view inputs. When the properties are the same, SwiftUI skips running the view body.

**Score: 85/100**
- [x] Explains comparing view inputs (45/50)
- [x] Explains skipping body execution (40/50)

### Weak Answer
Equatable forces the subview to be saved to disk so it never has to be loaded into memory again.

**Score: 0/100**
- [ ] Inaccurate disk caching claim (0/50)
- [ ] Misses body skipping mechanism (0/50)

---

## sui-perf-q26 (Written: UUID in ForEach Identity)

### Rubric
- Explains that generating UUID() inside body creates random IDs on every evaluation pass (50 pts, key)
- Explains that unstable identity destroys view state and forces complete reconstruction of subviews (50 pts, key)

### Good Answer
Instantiating `UUID()` directly inside `var body` generates a fresh, random identifier on every single evaluation pass. Because the identity changes on every render, SwiftUI cannot associate previous subview instances with the new ones in its view tree. This breaks identity stability, causing SwiftUI to deallocate existing view state, cancel in-flight animations, and completely re-create all subviews from scratch. To preserve performance, developers must supply stable, persistent identifiers from their data models.

**Score: 100/100**
- [x] Explains generating UUID() creates random IDs on each pass (50/50)
- [x] Explains unstable identity forces teardown and recreation of views (50/50)

### Average Answer
Calling UUID() inside body makes new random IDs every time the screen updates. SwiftUI thinks they are new views, so it destroys the old views and recreates them, which causes bad performance.

**Score: 85/100**
- [x] Explains random IDs on update (45/50)
- [x] Explains view destruction and recreation (40/50)

### Weak Answer
UUID causes an overflow crash because Swift only allows ten thousand UUIDs per app.

**Score: 0/100**
- [ ] Inaccurate crash explanation (0/50)
- [ ] Misses identity stability concept (0/50)

---

## sui-perf-q27 (Written: Observation Framework vs ObservableObject)

### Rubric
- Explains that ObservableObject invalidates any observing view whenever any Published property changes (50 pts, key)
- Explains that @Observable tracks per-property access so only views reading the changed property re-evaluate (50 pts, key)

### Good Answer
Under the older `ObservableObject` protocol, modifying any `@Published` property sends an `objectWillChange` broadcast notification, which invalidates every view observing the object regardless of which property it accesses. In contrast, the modern `@Observable` macro tracks fine-grained, property-level dependencies at runtime. When a view executes its `body`, SwiftUI registers interest only in the specific properties read during that pass. If an unread property changes, the view is not invalidated, eliminating over-invalidation cascades.

**Score: 100/100**
- [x] Explains ObservableObject invalidates for any published property change (50/50)
- [x] Explains @Observable scopes invalidation strictly to read properties (50/50)

### Average Answer
ObservableObject notifies all views whenever any published property changes, causing extra updates. With @Observable in iOS 17, SwiftUI only updates views that actually read the specific property that changed.

**Score: 85/100**
- [x] Explains ObservableObject broad invalidation (45/50)
- [x] Explains @Observable granular tracking (40/50)

### Weak Answer
@Observable compiles all model properties into C++ structs to increase memory speed.

**Score: 0/100**
- [ ] Inaccurate C++ claim (0/50)
- [ ] Misses dependency scoping concept (0/50)

---

## sui-perf-q28 (Written: Role of Self._printChanges)

### Rubric
- Explains that calling Self._printChanges() inside body logs which dependency caused the view update (50 pts, key)
- Explains that it helps developers detect unexpected state changes and over-invalidation loops (50 pts, key)

### Good Answer
Calling `Self._printChanges()` inside a SwiftUI view's `body` property logs the specific `@State`, `@Binding`, `@Environment`, or observable property that triggered the body evaluation to the Xcode debug console. This provides immediate diagnostic visibility into why a view is re-rendering. It helps engineers identify unnecessary state mutations, discover unexpected parent dependency invalidations, and break infinite layout update loops.

**Score: 100/100**
- [x] Explains logging specific dependency causing update (50/50)
- [x] Explains diagnosing unexpected state updates and over-invalidation (50/50)

### Average Answer
Self._printChanges() prints which state or environment value changed and caused the view to redraw. It helps find why views are updating too often.

**Score: 85/100**
- [x] Explains logging the changed value (45/50)
- [x] Explains detecting excessive redraws (40/50)

### Weak Answer
Self._printChanges() prints the source code of the view into an external PDF document.

**Score: 0/100**
- [ ] Inaccurate printing claim (0/50)
- [ ] Misses debugging update causes (0/50)

---

## sui-perf-q29 (Code-Write: CalculationCache)

### Rubric
- Declares CalculationCache with computedCount integer property initialized to 0 (35 pts, key)
- Implements mutating computeDouble method incrementing count and returning double (35 pts, key)
- Prints exact output 'Doubled: 10, Count: 1' (30 pts, key)

### Good Answer
```swift
struct CalculationCache {
    var computedCount: Int = 0

    mutating func computeDouble(_ val: Int) -> Int {
        computedCount += 1
        return val * 2
    }
}

func testCache() {
    var cache = CalculationCache()
    let doubled = cache.computeDouble(5)
    print("Doubled: \(doubled), Count: \(cache.computedCount)")
}

testCache()
```

**Score: 100/100**
- [x] Declares CalculationCache with computedCount (35/35)
- [x] Implements mutating computeDouble (35/35)
- [x] Prints 'Doubled: 10, Count: 1' (30/30)

### Average Answer
```swift
struct CalculationCache {
    var computedCount = 0
    mutating func computeDouble(_ val: Int) -> Int {
        self.computedCount = self.computedCount + 1
        return val + val
    }
}
func testCache() {
    var cache = CalculationCache()
    let d = cache.computeDouble(5)
    print("Doubled: \(d), Count: \(cache.computedCount)")
}
testCache()
```

**Score: 100/100**
- [x] Declares CalculationCache (35/35)
- [x] Implements mutating computeDouble (35/35)
- [x] Prints 'Doubled: 10, Count: 1' (30/30)

### Weak Answer
```swift
struct CalculationCache {
    func computeDouble(_ val: Int) -> Int {
        return val
    }
}
func testCache() {
    print("Doubled: 0")
}
testCache()
```

**Score: 10/100**
- [ ] Missing stored computedCount property (0/35)
- [ ] Does not double value or increment count (0/35)
- [ ] Wrong output (10/30)

---

## sui-perf-q30 (Code-Write: EquatableStateEvaluator)

### Rubric
- Declares EquatableStateEvaluator with id and version conforming to Equatable (35 pts, key)
- Implements needsUpdate method returning inequality check (35 pts, key)
- Prints exact output 'Update needed: false' (30 pts, key)

### Good Answer
```swift
struct EquatableStateEvaluator: Equatable {
    let id: Int
    let version: Int

    func needsUpdate(against newState: EquatableStateEvaluator) -> Bool {
        self != newState
    }
}

func testEvaluator() {
    let s1 = EquatableStateEvaluator(id: 1, version: 2)
    let s2 = EquatableStateEvaluator(id: 1, version: 2)
    print("Update needed: \(s1.needsUpdate(against: s2))")
}

testEvaluator()
```

**Score: 100/100**
- [x] Declares EquatableStateEvaluator conforming to Equatable (35/35)
- [x] Implements needsUpdate (35/35)
- [x] Prints 'Update needed: false' (30/30)

### Average Answer
```swift
struct EquatableStateEvaluator: Equatable {
    var id: Int
    var version: Int
    func needsUpdate(against other: EquatableStateEvaluator) -> Bool {
        if self.id != other.id || self.version != other.version {
            return true
        }
        return false
    }
}
func testEvaluator() {
    let a = EquatableStateEvaluator(id: 1, version: 2)
    let b = EquatableStateEvaluator(id: 1, version: 2)
    print("Update needed: \(a.needsUpdate(against: b))")
}
testEvaluator()
```

**Score: 100/100**
- [x] Declares EquatableStateEvaluator conforming to Equatable (35/35)
- [x] Implements inequality comparison (35/35)
- [x] Prints 'Update needed: false' (30/30)

### Weak Answer
```swift
struct EquatableStateEvaluator {
    let id: Int
    func needsUpdate() -> Bool {
        return true
    }
}
func testEvaluator() {
    print("Update needed: true")
}
testEvaluator()
```

**Score: 10/100**
- [ ] Missing version property and Equatable conformance (0/35)
- [ ] Missing comparison logic (0/35)
- [ ] Wrong output 'Update needed: true' (10/30)

---

## sui-perf-q31 (Code-Write: ScopedDependencyTracker)

### Rubric
- Declares ScopedDependencyTracker with observedKeys set property (35 pts, key)
- Implements isDirty method checking if modified key exists in observed set (35 pts, key)
- Prints exact output 'Is dirty: false' (30 pts, key)

### Good Answer
```swift
struct ScopedDependencyTracker {
    let observedKeys: Set<String>

    func isDirty(modifiedKey: String) -> Bool {
        observedKeys.contains(modifiedKey)
    }
}

func testTracker() {
    let tracker = ScopedDependencyTracker(observedKeys: ["title", "avatar"])
    print("Is dirty: \(tracker.isDirty(modifiedKey: "status"))")
}

testTracker()
```

**Score: 100/100**
- [x] Declares ScopedDependencyTracker with observedKeys set (35/35)
- [x] Implements isDirty checking containment in set (35/35)
- [x] Prints 'Is dirty: false' (30/30)

### Average Answer
```swift
struct ScopedDependencyTracker {
    var observedKeys: Set<String>
    func isDirty(modifiedKey: String) -> Bool {
        if observedKeys.contains(modifiedKey) {
            return true
        }
        return false
    }
}
func testTracker() {
    let t = ScopedDependencyTracker(observedKeys: ["title", "avatar"])
    print("Is dirty: \(t.isDirty(modifiedKey: "status"))")
}
testTracker()
```

**Score: 100/100**
- [x] Declares ScopedDependencyTracker (35/35)
- [x] Implements isDirty (35/35)
- [x] Prints 'Is dirty: false' (30/30)

### Weak Answer
```swift
struct ScopedDependencyTracker {
    var count = 0
}
func testTracker() {
    print("Is dirty: true")
}
testTracker()
```

**Score: 0/100**
- [ ] Missing observedKeys set (0/35)
- [ ] Missing isDirty method (0/35)
- [ ] Wrong output 'Is dirty: true' (0/30)
