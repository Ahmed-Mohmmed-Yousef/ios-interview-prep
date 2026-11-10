# Rubric Test: SwiftUI and UIKit Together

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/swiftui-uikit-interop/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sui-ui-q24 (Written: UIViewRepresentable vs UIHostingController)

### Rubric
- Explains that UIViewRepresentable wraps UIKit views for use in SwiftUI (50 pts, key)
- Explains that UIHostingController embeds SwiftUI views inside UIKit view controller hierarchies (50 pts, key)

### Good Answer
`UIViewRepresentable` wraps native UIKit `UIView` instances so they can be rendered and controlled within declarative SwiftUI view hierarchies. In contrast, `UIHostingController` is a `UIViewController` subclass that embeds and renders SwiftUI views inside imperative UIKit view controller hierarchies. Together, they allow engineering teams to adopt SwiftUI incrementally while preserving existing UIKit components.

**Score: 100/100**
- [x] Explains UIViewRepresentable wraps UIKit views in SwiftUI (50/50)
- [x] Explains UIHostingController embeds SwiftUI in UIKit (50/50)

### Average Answer
UIViewRepresentable lets you put a UIKit view into SwiftUI. UIHostingController lets you display SwiftUI views inside UIKit screens.

**Score: 80/100**
- [x] Explains UIViewRepresentable wraps UIKit views (40/50)
- [x] Explains UIHostingController embeds SwiftUI views (40/50)

### Weak Answer
Both classes are used to translate Objective-C strings into Swift dictionaries.

**Score: 0/100**
- [ ] Misses UIViewRepresentable purpose (0/50)
- [ ] Misses UIHostingController purpose (0/50)

---

## sui-ui-q25 (Written: Coordinator Role and Communication)

### Rubric
- Explains that makeCoordinator instantiates a helper object to act as delegate or target for UIKit (50 pts, key)
- Explains that the Coordinator updates SwiftUI state or bindings when UIKit events occur (50 pts, key)

### Good Answer
The `makeCoordinator` method creates and initializes a custom `Coordinator` object before SwiftUI calls `makeUIView`. The Coordinator acts as a bridge, conforming to UIKit delegate protocols and handling target-action callbacks from user gestures. When user interaction occurs in the UIKit view, the Coordinator mutates a SwiftUI `@Binding` or state variable, ensuring the declarative state synchronizes with imperative UIKit events.

**Score: 100/100**
- [x] Explains makeCoordinator instantiates delegate/target bridge (50/50)
- [x] Explains Coordinator updates SwiftUI state/bindings (50/50)

### Average Answer
makeCoordinator creates the coordinator class. The coordinator acts as the delegate for the UIKit view and updates the SwiftUI binding when the user changes a control.

**Score: 85/100**
- [x] Explains makeCoordinator creates delegate instance (45/50)
- [x] Explains coordinator updates binding (40/50)

### Weak Answer
The coordinator is a background thread worker that compiles UIKit views into SwiftUI metal views.

**Score: 0/100**
- [ ] Inaccurate delegate explanation (0/50)
- [ ] Inaccurate state communication explanation (0/50)

---

## sui-ui-q26 (Written: Traps in UIViewRepresentable)

### Rubric
- Identifies creating new views inside updateUIView and explains to create them once in makeUIView (50 pts, key)
- Identifies mutating SwiftUI state directly inside updateUIView causing recursion (50 pts, key)

### Good Answer
A major trap is creating new UIKit view instances inside `updateUIView`; because this method executes on every state change, re-creating views destroys scroll positions, touch focus, and performance. Views should be instantiated strictly once inside `makeUIView`. Another critical trap is mutating SwiftUI state or bindings inside `updateUIView`, which triggers immediate re-renders and creates infinite layout recursion loops.

**Score: 100/100**
- [x] Identifies re-creating views in updateUIView vs makeUIView (50/50)
- [x] Identifies mutating state in updateUIView causing infinite loop (50/50)

### Average Answer
Do not create views in updateUIView because it runs often and causes memory problems. Also, do not change state variables inside updateUIView because it can loop forever.

**Score: 85/100**
- [x] Identifies view creation trap (45/50)
- [x] Identifies state mutation recursion trap (40/50)

### Weak Answer
You should never use coordinators with UIKit views because SwiftUI does not support delegation.

**Score: 0/100**
- [ ] Misses view creation trap (0/50)
- [ ] Misses state mutation loop trap (0/50)

---

## sui-ui-q27 (Written: UIHostingController Containment Ceremony)

### Rubric
- Mentions calling addChild to establish parent-child view controller relationship (40 pts, key)
- Mentions adding the hosting controller view with addSubview and setting layout (30 pts, key)
- Mentions calling didMove(toParent:) to complete containment ceremony (30 pts)

### Good Answer
To properly embed a `UIHostingController` inside a UIKit view controller, you must follow the three-step view controller containment ceremony. First, call `addChild(hostingController)` to establish the parent-child relationship. Next, add `hostingController.view` to the view hierarchy using `view.addSubview` and configure Auto Layout constraints or frames. Finally, call `hostingController.didMove(toParent: self)` so that lifecycle callbacks, safe area updates, and appearance events propagate correctly.

**Score: 100/100**
- [x] Mentions addChild (40/40)
- [x] Mentions addSubview and layout configuration (30/30)
- [x] Mentions didMove(toParent:) (30/30)

### Average Answer
You add the hosting controller by calling addChild, putting its view on the screen with addSubview, and then calling didMove to parent. This keeps lifecycle events working.

**Score: 85/100**
- [x] Mentions addChild (35/40)
- [x] Mentions addSubview (25/30)
- [x] Mentions didMove(toParent:) (25/30)

### Weak Answer
Just call `view.addSubview(hostingController.view)` and nothing else is needed in modern iOS.

**Score: 25/100**
- [ ] Misses addChild (0/40)
- [x] Mentions addSubview (25/30)
- [ ] Misses didMove(toParent:) (0/30)

---

## sui-ui-q28 (Written: UIHostingConfiguration in Cells)

### Rubric
- Explains that UIHostingConfiguration allows using SwiftUI views inside collection and table view cells on iOS 16+ (50 pts, key)
- Explains that it avoids manual UIHostingController containment ceremony and view hierarchy overhead (50 pts, key)

### Good Answer
Introduced in iOS 16, `UIHostingConfiguration` allows developers to define the content of `UICollectionViewCell` and `UITableViewCell` using native SwiftUI view hierarchies. It completely eliminates the complex boilerplate of creating, adding, and removing individual `UIHostingController` child instances inside reusable cells. This architectural improvement prevents controller containment overhead and significantly improves list scrolling performance.

**Score: 100/100**
- [x] Explains UIHostingConfiguration configures cells with SwiftUI on iOS 16+ (50/50)
- [x] Explains avoiding child UIHostingController containment overhead (50/50)

### Average Answer
UIHostingConfiguration is an iOS 16 feature that lets you use SwiftUI views directly inside table and collection view cells. You do not have to embed UIHostingController instances in each cell anymore.

**Score: 85/100**
- [x] Explains SwiftUI in cells on iOS 16+ (45/50)
- [x] Explains avoiding manual hosting controllers (40/50)

### Weak Answer
UIHostingConfiguration converts SwiftUI view code into Storyboard XIB files at build time.

**Score: 0/100**
- [ ] Inaccurate cell configuration explanation (0/50)
- [ ] Inaccurate hosting controller comparison (0/50)

---

## sui-ui-q29 (Code-Write: InteropCoordinator)

### Rubric
- Declares InteropCoordinator with eventCount integer property initialized to 0 (35 pts, key)
- Implements mutating recordEvent method incrementing eventCount (35 pts, key)
- Prints exact output 'Events: 2' (30 pts, key)

### Good Answer
```swift
struct InteropCoordinator {
    var eventCount: Int = 0

    mutating func recordEvent() {
        eventCount += 1
    }
}

func testCoordinator() {
    var coordinator = InteropCoordinator()
    coordinator.recordEvent()
    coordinator.recordEvent()
    print("Events: \(coordinator.eventCount)")
}

testCoordinator()
```

**Score: 100/100**
- [x] Declares InteropCoordinator with eventCount property (35/35)
- [x] Implements mutating recordEvent (35/35)
- [x] Prints 'Events: 2' (30/30)

### Average Answer
```swift
struct InteropCoordinator {
    var eventCount = 0
    mutating func recordEvent() {
        self.eventCount = self.eventCount + 1
    }
}

func testCoordinator() {
    var coordinator = InteropCoordinator()
    coordinator.recordEvent()
    coordinator.recordEvent()
    print("Events: \(coordinator.eventCount)")
}
testCoordinator()
```

**Score: 100/100**
- [x] Declares InteropCoordinator (35/35)
- [x] Implements mutating recordEvent (35/35)
- [x] Prints 'Events: 2' (30/30)

### Weak Answer
```swift
struct InteropCoordinator {
    func recordEvent() {
        print("event")
    }
}
func testCoordinator() {
    print("Events: 0")
}
testCoordinator()
```

**Score: 10/100**
- [ ] Missing stored eventCount property (0/35)
- [ ] Does not increment stored count (0/35)
- [ ] Wrong output 'Events: 0' (10/30)

---

## sui-ui-q30 (Code-Write: StateGuard)

### Rubric
- Declares StateGuard with currentValue string property (35 pts, key)
- Implements mutating update method guarding against redundant assignments (35 pts, key)
- Prints exact output 'Changed: Updated' (30 pts, key)

### Good Answer
```swift
struct StateGuard {
    var currentValue: String

    mutating func update(to newValue: String) -> Bool {
        if currentValue != newValue {
            currentValue = newValue
            return true
        }
        return false
    }
}

func testGuard() {
    var guardObj = StateGuard(currentValue: "Initial")
    _ = guardObj.update(to: "Updated")
    print("Changed: \(guardObj.currentValue)")
}

testGuard()
```

**Score: 100/100**
- [x] Declares StateGuard with currentValue property (35/35)
- [x] Implements mutating update guarding redundant assignments (35/35)
- [x] Prints 'Changed: Updated' (30/30)

### Average Answer
```swift
struct StateGuard {
    var currentValue: String
    mutating func update(to newValue: String) -> Bool {
        guard currentValue != newValue else { return false }
        currentValue = newValue
        return true
    }
}
func testGuard() {
    var g = StateGuard(currentValue: "Initial")
    _ = g.update(to: "Updated")
    print("Changed: \(g.currentValue)")
}
testGuard()
```

**Score: 100/100**
- [x] Declares StateGuard with currentValue (35/35)
- [x] Implements update guard (35/35)
- [x] Prints 'Changed: Updated' (30/30)

### Weak Answer
```swift
struct StateGuard {
    var currentValue: String
    func update(to newValue: String) -> Bool {
        return true
    }
}
func testGuard() {
    print("Changed: Initial")
}
testGuard()
```

**Score: 20/100**
- [x] Declares property (20/35)
- [ ] Does not mutate property or check inequality (0/35)
- [ ] Prints wrong output 'Changed: Initial' (0/30)

---

## sui-ui-q31 (Code-Write: ContainmentVerifier)

### Rubric
- Declares ContainmentVerifier with steps array initialized to empty (35 pts, key)
- Implements recordStep and isCompliant checking all three containment steps (35 pts, key)
- Prints exact output 'Compliant: true' (30 pts, key)

### Good Answer
```swift
struct ContainmentVerifier {
    var steps: [String] = []

    mutating func recordStep(_ step: String) {
        steps.append(step)
    }

    var isCompliant: Bool {
        steps == ["addChild", "addSubview", "didMove"]
    }
}

func testVerifier() {
    var verifier = ContainmentVerifier()
    verifier.recordStep("addChild")
    verifier.recordStep("addSubview")
    verifier.recordStep("didMove")
    print("Compliant: \(verifier.isCompliant)")
}

testVerifier()
```

**Score: 100/100**
- [x] Declares ContainmentVerifier with steps array (35/35)
- [x] Implements recordStep and isCompliant (35/35)
- [x] Prints 'Compliant: true' (30/30)

### Average Answer
```swift
struct ContainmentVerifier {
    var steps = [String]()
    mutating func recordStep(_ s: String) {
        steps.append(s)
    }
    var isCompliant: Bool {
        if steps.count == 3 && steps[0] == "addChild" && steps[1] == "addSubview" && steps[2] == "didMove" {
            return true
        }
        return false
    }
}
func testVerifier() {
    var v = ContainmentVerifier()
    v.recordStep("addChild")
    v.recordStep("addSubview")
    v.recordStep("didMove")
    print("Compliant: \(v.isCompliant)")
}
testVerifier()
```

**Score: 100/100**
- [x] Declares ContainmentVerifier (35/35)
- [x] Implements step tracking and compliance (35/35)
- [x] Prints 'Compliant: true' (30/30)

### Weak Answer
```swift
struct ContainmentVerifier {
    var isCompliant = true
}
func testVerifier() {
    print("Compliant: false")
}
testVerifier()
```

**Score: 10/100**
- [ ] Missing steps array (0/35)
- [ ] Missing recordStep implementation (0/35)
- [ ] Wrong output 'Compliant: false' (10/30)
