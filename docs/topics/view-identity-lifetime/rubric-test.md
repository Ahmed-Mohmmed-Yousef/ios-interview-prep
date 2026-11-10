# Rubric Test: View Identity and Lifetime

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/view-identity-lifetime/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## vil-q24 (Written: Explicit vs Structural Identity)

### Rubric
- Defines explicit identity as custom assigned identifiers such as .id() or Identifiable (40 pts, key)
- Defines structural identity as inferred by SwiftUI based on the view position in the code hierarchy (40 pts, key)
- Provides clear code examples illustrating both forms of identity (20 pts)

### Good Answer
Explicit identity uses custom identifiers assigned by the developer, such as calling `.id(item.uuid)` or conforming a model to `Identifiable` inside a `ForEach`. Structural identity is inferred automatically by SwiftUI based on the view's static position within the hierarchy tree. For example, an `if/else` block creates two structural identities because each branch occupies a distinct slot in the layout tree.

**Score: 100/100**
- [x] Defines explicit identity with .id / Identifiable (40/40)
- [x] Defines structural identity based on tree position (40/40)
- [x] Provides clear examples of both (20/20)

### Average Answer
Explicit identity is when you give a view an id like `.id("card")`. Structural identity is the view's location in the view code, like inside an if statement.

**Score: 80/100**
- [x] Explains explicit identity (40/40)
- [x] Explains structural identity (30/40)
- [x] Brief examples provided (10/20)

### Weak Answer
Identity tells SwiftUI if the view is in dark mode or light mode.

**Score: 0/100**
- [ ] Confuses identity with color scheme environment (0/40)
- [ ] Misses structural identity concepts (0/40)
- [ ] No relevant examples (0/20)

---

## vil-q25 (Written: View Lifetime and Identity Changes)

### Rubric
- Defines view lifetime as the period over which SwiftUI links an identity to persistent state storage (40 pts, key)
- Explains that changing identity terminates the previous lifetime and destroys its @State storage (35 pts, key)
- Notes that active .task modifiers are cancelled and fresh initial state is allocated for the new identity (25 pts)

### Good Answer
A view lifetime in SwiftUI is the duration for which SwiftUI associates a persistent identity with allocated state storage. When a view identity changes or leaves the hierarchy, its lifetime ends. SwiftUI destroys the previous `@State` storage, cancels any running `.task` modifiers cooperatively, and allocates fresh default state for the newly introduced view identity.

**Score: 100/100**
- [x] Defines lifetime tied to identity and state (40/40)
- [x] Changing identity destroys @State (35/35)
- [x] Notes .task cancellation and fresh state allocation (25/25)

### Average Answer
A view lifetime is how long its state lasts. When identity changes, SwiftUI throws away the old @State and creates new state from scratch.

**Score: 75/100**
- [x] Defines lifetime (35/40)
- [x] Discards old state and creates new (35/35)
- [ ] Misses .task cancellation details (5/25)

### Weak Answer
View lifetime is the amount of time in seconds the user stays on a screen.

**Score: 0/100**
- [ ] Incorrect analytics definition (0/40)
- [ ] Misses identity and state destruction (0/35)
- [ ] Misses task lifecycle impact (0/25)

---

## vil-q26 (Written: Ternary Operator vs if/else)

### Rubric
- Explains that ternary operators maintain a single stable view identity (40 pts, key)
- Points out that if/else creates two distinct structural identities that destroy and reset @State (40 pts, key)
- Notes that stable identity allows smooth animation of property changes across frames (20 pts)

### Good Answer
Using a ternary operator preserves a single structural identity for the view, modifying only a property value across render passes. This maintains internal `@State` and enables smooth animation interpolation. In contrast, an `if/else` block creates two distinct structural identities. This forces SwiftUI to terminate the view lifetime, discard existing state, and show abrupt transitions.

**Score: 100/100**
- [x] Ternary preserves single stable identity (40/40)
- [x] if/else creates two structural identities resetting @State (40/40)
- [x] Notes smooth animation vs abrupt transitions (20/20)

### Average Answer
Ternary keeps the same view identity so your `@State` is not lost and colors animate smoothly. Using `if/else` creates two different views, so switching branches resets all state.

**Score: 90/100**
- [x] Ternary keeps identity and state (40/40)
- [x] if/else resets state (40/40)
- [x] Mentions animation (10/20)

### Weak Answer
Ternary operators are faster because they avoid the if keyword in Swift.

**Score: 15/100**
- [ ] Does not understand identity mechanics (0/40)
- [ ] Misses state destruction explanation (0/40)
- [x] Vaguely recognizes ternary syntax (15/20)

---

## vil-q27 (Written: Performance Cost of AnyView)

### Rubric
- Explains that AnyView performs type erasure on the underlying concrete view types (40 pts, key)
- Explains that type erasure hides the static hierarchy structure from the diffing algorithm (35 pts, key)
- Notes that this forces SwiftUI to destroy and recreate views rather than updating existing nodes (25 pts)

### Good Answer
`AnyView` performs type erasure on concrete view types, hiding the compile-time structural tree from SwiftUI. Because the layout engine cannot inspect the static hierarchy structure, its diffing algorithm cannot determine whether a node merely changed properties. This forces SwiftUI to destroy and recreate view nodes and state on render passes, causing dropped frames in complex hierarchies.

**Score: 100/100**
- [x] AnyView performs type erasure (40/40)
- [x] Hides static structure from diffing algorithm (35/35)
- [x] Forces view recreation causing dropped frames (25/25)

### Average Answer
`AnyView` erases view types. Because SwiftUI cannot see what type the view is, it cannot compare old and new views efficiently, which makes lists laggy.

**Score: 75/100**
- [x] Erases view types (40/40)
- [x] Impairs view comparison/diffing (25/35)
- [x] Mentions lag/performance degradation (10/25)

### Weak Answer
AnyView was removed from iOS 17 and will crash if you use it in Xcode.

**Score: 0/100**
- [ ] Incorrect claim of deprecation crash (0/40)
- [ ] Misses structural identity mechanics (0/35)
- [ ] Misses diffing algorithm impact (0/25)

---

## vil-q28 (Written: Impact of .id(UUID()) inside body)

### Rubric
- Explains that UUID() generates a fresh unique identifier on every single body evaluation pass (40 pts, key)
- Explains that this forces SwiftUI to treat the view as a completely new identity on each redraw (35 pts, key)
- Mentions that all @State is wiped, animations break, and tasks re-execute continually (25 pts)

### Good Answer
Calling `.id(UUID())` inside a view `body` creates a new unique identifier on every single evaluation pass. Because the identity changes on every redraw, SwiftUI treats the view as a brand new element. This continuously wipes all local `@State` storage, cancels and restarts `.task` modifiers, and breaks smooth animation transitions, severely degrading performance.

**Score: 100/100**
- [x] Generates fresh UUID on every evaluation pass (40/40)
- [x] Forces view to be treated as brand new identity (35/35)
- [x] Wipes state, breaks animations, restarts tasks (25/25)

### Average Answer
Passing a new UUID on every render changes the view identity every time. This resets `@State` variables back to their defaults and ruins animations.

**Score: 80/100**
- [x] Changes identity every time (40/40)
- [x] New identity every render (25/35)
- [x] Resets @State and ruins animations (15/25)

### Weak Answer
It generates a secure database identifier so hackers cannot read view data.

**Score: 0/100**
- [ ] Irrelevant security misunderstanding (0/40)
- [ ] Misses identity renewal (0/35)
- [ ] Misses state reset impact (0/25)

---

## vil-q29 (Code-Write: ViewIdentityTracker Struct)

### Rubric
- Declares ViewIdentityTracker with explicitId and stateValue properties (35 pts, key)
- Preserves and accumulates state when id matches, and resets state when id differs (35 pts, key)
- Prints exact output 'Final: 8' (30 pts, key)

### Good Answer
```swift
struct ViewIdentityTracker {
    var explicitId: String
    var stateValue: Int = 0

    mutating func applyUpdate(newId: String, increment: Int) {
        if newId == explicitId {
            stateValue += increment
        } else {
            explicitId = newId
            stateValue = increment
        }
    }
}

func testTracker() {
    var tracker = ViewIdentityTracker(explicitId: "btn-1")
    tracker.applyUpdate(newId: "btn-1", increment: 5)
    tracker.applyUpdate(newId: "btn-1", increment: 3)
    print("Final: \(tracker.stateValue)")
}

testTracker()
```

**Score: 100/100**
- [x] Declares ViewIdentityTracker with properties (35/35)
- [x] Accumulates state when id matches, resets when differs (35/35)
- [x] Prints 'Final: 8' (30/30)

### Average Answer
```swift
struct ViewIdentityTracker {
    var explicitId: String
    var stateValue = 0

    mutating func applyUpdate(newId: String, increment: Int) {
        if newId != explicitId {
            explicitId = newId
            stateValue = 0
        }
        stateValue += increment
    }
}

func testTracker() {
    var t = ViewIdentityTracker(explicitId: "btn-1")
    t.applyUpdate(newId: "btn-1", increment: 5)
    t.applyUpdate(newId: "btn-1", increment: 3)
    print("Final: \(t.stateValue)")
}
testTracker()
```

**Score: 100/100**
- [x] Logic produces identical correct behavior (100/100)

### Weak Answer
```swift
struct ViewIdentityTracker {
    var stateValue = 8
}
print("Final: \(ViewIdentityTracker().stateValue)")
```

**Score: 15/100**
- [ ] Missing explicitId and applyUpdate method (0/35)
- [ ] No identity matching or reset logic (0/35)
- [x] Hardcoded printed string (15/30)

---

## vil-q30 (Code-Write: BranchSimulator Ternary Expression)

### Rubric
- Declares BranchSimulator with renderStyle method (35 pts, key)
- Uses a ternary expression returning 'Selected: Blue' or 'Default: Gray' (35 pts, key)
- Prints exact output 'Selected: Blue' (30 pts, key)

### Good Answer
```swift
struct BranchSimulator {
    func renderStyle(isSelected: Bool) -> String {
        isSelected ? "Selected: Blue" : "Default: Gray"
    }
}

func testBranch() {
    let sim = BranchSimulator()
    print(sim.renderStyle(isSelected: true))
}

testBranch()
```

**Score: 100/100**
- [x] Declares BranchSimulator with renderStyle (35/35)
- [x] Uses ternary expression (35/35)
- [x] Prints 'Selected: Blue' (30/30)

### Average Answer
```swift
struct BranchSimulator {
    func renderStyle(isSelected: Bool) -> String {
        return isSelected ? "Selected: Blue" : "Default: Gray"
    }
}

func testBranch() {
    print(BranchSimulator().renderStyle(isSelected: true))
}
testBranch()
```

**Score: 100/100**
- [x] Passes all rubric requirements (100/100)

### Weak Answer
```swift
struct BranchSimulator {}
print("Selected: Blue")
```

**Score: 15/100**
- [ ] Missing renderStyle implementation (0/35)
- [ ] No ternary expression (0/35)
- [x] Output matches expected (15/30)

---

## vil-q31 (Code-Write: LifetimeCounter State Reset)

### Rubric
- Declares LifetimeCounter with stateCounter initialized to 10 (35 pts, key)
- Implements mutating resetState method resetting stateCounter to 0 (35 pts, key)
- Prints exact output 'Counter: 0' (30 pts, key)

### Good Answer
```swift
struct LifetimeCounter {
    var stateCounter: Int = 10

    mutating func resetState() {
        stateCounter = 0
    }
}

func runCounterTest() {
    var counter = LifetimeCounter()
    counter.resetState()
    print("Counter: \(counter.stateCounter)")
}

runCounterTest()
```

**Score: 100/100**
- [x] LifetimeCounter declared with stateCounter 10 (35/35)
- [x] resetState sets counter to 0 (35/35)
- [x] Prints 'Counter: 0' (30/30)

### Average Answer
```swift
struct LifetimeCounter {
    var stateCounter = 10
    mutating func resetState() {
        self.stateCounter = 0
    }
}

func runCounterTest() {
    var c = LifetimeCounter()
    c.resetState()
    print("Counter: \(c.stateCounter)")
}
runCounterTest()
```

**Score: 100/100**
- [x] Fully valid implementation meeting all criteria (100/100)

### Weak Answer
```swift
var counter = 0
print("Counter: \(counter)")
```

**Score: 10/100**
- [ ] No struct LifetimeCounter (0/35)
- [ ] No resetState method (0/35)
- [x] Output string printed (10/30)
