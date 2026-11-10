# Rubric Test: iPad and Adaptive Layout

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/ipad-adaptive-layout/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## ipad-q24 (Written: Size Classes Definition and Defaults)

### Rubric
- Explains that size classes abstract screen space into compact and regular categories (50 pts, key)
- Identifies compact horizontal for iPhone portrait and regular horizontal for full-screen iPad (50 pts, key)

### Good Answer
Size classes abstract physical screen dimensions into two semantic categories: compact and regular. A compact size class represents constrained space, whereas a regular size class represents expansive screen area. An iPhone in portrait orientation has a compact horizontal size class, while a full-screen iPad provides a regular horizontal size class.

**Score: 100/100**
- [x] Explains compact and regular abstractions (50/50)
- [x] Identifies iPhone compact and iPad regular defaults (50/50)

### Average Answer
Size classes describe how much space an app has using compact and regular. An iPhone in portrait is compact width and an iPad full screen is regular width.

**Score: 85/100**
- [x] Mentions compact and regular categories (45/50)
- [x] Identifies iPhone and iPad defaults (40/50)

### Weak Answer
Size classes tell UIKit what physical pixel density screen is installed on the phone.

**Score: 0/100**
- [ ] Confuses size classes with screen scale (0/50)
- [ ] Misses iPhone and iPad categories (0/50)

---

## ipad-q25 (Written: NavigationSplitView Adaptive Behavior)

### Rubric
- Explains that NavigationSplitView renders side-by-side columns on regular width (50 pts, key)
- Explains that it automatically collapses into a single navigation stack on compact width (50 pts, key)

### Good Answer
In SwiftUI, `NavigationSplitView` creates a multi-column interface that adapts seamlessly to the active horizontal size class. When horizontal space is regular, such as on a full-screen iPad or Mac, it displays sidebar and detail views side-by-side. When the window width shrinks to compact in Split View or on an iPhone, it automatically collapses those columns into a single navigation stack hierarchy with push-pop navigation.

**Score: 100/100**
- [x] Explains side-by-side multi-column presentation on regular width (50/50)
- [x] Explains automatic collapse into single stack on compact width (50/50)

### Average Answer
NavigationSplitView shows sidebar and detail columns side-by-side on regular iPad screens. When the screen becomes compact, it collapses them into a standard navigation stack.

**Score: 85/100**
- [x] Mentions side-by-side columns on regular (45/50)
- [x] Mentions collapsing into stack on compact (40/50)

### Weak Answer
NavigationSplitView cuts off the sidebar and hides all content when the user resizes the app.

**Score: 0/100**
- [ ] Inaccurate truncation claim (0/50)
- [ ] Misses automatic stack collapse mechanism (0/50)

---

## ipad-q26 (Written: userInterfaceIdiom Anti-Pattern)

### Rubric
- Explains that an iPad running in Slide Over or Split View has compact width identical to an iPhone (50 pts, key)
- Explains that checking device idiom forces wide tablet layouts into narrow windows, causing clipping (50 pts, key)

### Good Answer
Checking `UIDevice.current.userInterfaceIdiom == .pad` is an anti-pattern because device hardware does not dictate available window geometry. On iPadOS, users can place an app into a narrow 1/3 Split View or Slide Over, which assigns the window a compact width identical to an iPhone. Forcing a multi-column tablet layout into such a narrow window results in clipped text and overlapping views.

**Score: 100/100**
- [x] Explains iPad multitasking provides compact width (50/50)
- [x] Explains layout clipping from forced tablet layouts (50/50)

### Average Answer
On iPad the user can use Split View, which gives the app a compact size class just like an iPhone. If you check for iPad hardware, you will force wide layouts into small windows.

**Score: 85/100**
- [x] Mentions Split View compact width (45/50)
- [x] Mentions wide layouts breaking in small windows (40/50)

### Weak Answer
UIDevice was deleted from iOS and using it will fail to compile.

**Score: 0/100**
- [ ] False compiler error claim (0/50)
- [ ] Misses multitasking window concepts (0/50)

---

## ipad-q27 (Written: UIScreen.main.bounds Deprecation)

### Rubric
- Explains that UIScreen.main reflects physical screen dimensions rather than multitasking window size (50 pts, key)
- Explains using view bounds, container geometry, or GeometryReader to determine available layout space (50 pts, key)

### Good Answer
Apple deprecated `UIScreen.main.bounds` because modern iOS supports multi-window multitasking features like Split View, Slide Over, and Stage Manager. In these modes, the application window only occupies a portion of the physical hardware display. Developers should instead determine layout dimensions by inspecting view controller view bounds, container geometries, or using SwiftUI `GeometryReader`.

**Score: 100/100**
- [x] Explains screen bounds mismatch in multitasking (50/50)
- [x] Recommends view bounds, container geometry, or GeometryReader (50/50)

### Average Answer
UIScreen.main returns the whole hardware screen size, but in Split View or Stage Manager your app is only in a smaller window. You should check your view bounds or GeometryReader instead.

**Score: 85/100**
- [x] Mentions screen vs window size mismatch (45/50)
- [x] Mentions view bounds or GeometryReader (40/50)

### Weak Answer
UIScreen is deprecated because modern iPhones do not have screens and use spatial audio instead.

**Score: 0/100**
- [ ] Inaccurate hardware claim (0/50)
- [ ] Misses container bounds calculation (0/50)

---

## ipad-q28 (Written: Senior Stage Manager Architecture)

### Rubric
- Discusses relying on fluid Auto Layout constraints, adaptive size classes, and ViewThatFits rather than fixed frames (50 pts, key)
- Discusses registering for trait changes with modern registerForTraitChanges and supporting multi-scene sessions (50 pts, key)

### Good Answer
A senior iOS engineer treats the application window as an arbitrary, dynamically resizable viewport. They design flexible view hierarchies using fluid Auto Layout constraints, size classes, and adaptive containers like `ViewThatFits` and `NavigationSplitView`. In UIKit, they observe dynamic window resizing using `registerForTraitChanges` introduced in iOS 17. Finally, they configure `UISceneConfiguration` to support concurrent multi-scene multitasking sessions.

**Score: 100/100**
- [x] Fluid constraints, size classes, ViewThatFits (50/50)
- [x] registerForTraitChanges and multi-scene UISceneConfiguration (50/50)

### Average Answer
I build layouts with flexible constraints and ViewThatFits so windows resize smoothly. I observe traits using registerForTraitChanges and enable multiple window scenes in Info.plist.

**Score: 85/100**
- [x] Mentions flexible constraints and ViewThatFits (45/50)
- [x] Mentions registerForTraitChanges and multi-scene support (40/50)

### Weak Answer
I disable multitasking by checking the iPad orientation setting in Xcode.

**Score: 15/100**
- [ ] No adaptive architecture or fluid constraint strategy (10/50)
- [ ] No multi-scene or trait change registration (5/50)

---

## ipad-q29 (Code-Write: AdaptiveLayoutDecider)

### Rubric
- Declares AdaptiveLayoutDecider with horizontalSizeClass string property (35 pts, key)
- Implements columnCount returning 2 for regular or 1 for other values (35 pts, key)
- Prints exact output 'Columns: 2' (30 pts, key)

### Good Answer
```swift
struct AdaptiveLayoutDecider {
    let horizontalSizeClass: String

    func columnCount() -> Int {
        horizontalSizeClass == "regular" ? 2 : 1
    }
}

func testDecider() {
    let decider = AdaptiveLayoutDecider(horizontalSizeClass: "regular")
    print("Columns: \(decider.columnCount())")
}

testDecider()
```
**Score: 100/100**
- [x] Declares struct with property (35/35)
- [x] Implements columnCount logic (35/35)
- [x] Prints 'Columns: 2' (30/30)

### Average Answer
```swift
struct AdaptiveLayoutDecider {
    var horizontalSizeClass: String

    func columnCount() -> Int {
        if horizontalSizeClass == "regular" { return 2 }
        return 1
    }
}

func testDecider() {
    let d = AdaptiveLayoutDecider(horizontalSizeClass: "regular")
    print("Columns: \(d.columnCount())")
}

testDecider()
```
**Score: 90/100**
- [x] Declares struct and property (30/35)
- [x] Implements column count check (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct AdaptiveLayoutDecider {
    func columnCount() -> Int { 2 }
}
```
**Score: 10/100**
- [ ] Missing stored property (5/35)
- [ ] Hardcoded constant without branching (5/35)
- [ ] Missing test runner (0/30)

---

## ipad-q30 (Code-Write: WindowWidthClassifier)

### Rubric
- Declares WindowWidthClassifier with regularThreshold property initialized to 768.0 (35 pts, key)
- Implements isCompact comparing input width against regularThreshold (35 pts, key)
- Prints exact output 'IsCompact: true' (30 pts, key)

### Good Answer
```swift
struct WindowWidthClassifier {
    var regularThreshold: Double = 768.0

    func isCompact(width: Double) -> Bool {
        width < regularThreshold
    }
}

func testClassifier() {
    let classifier = WindowWidthClassifier()
    let result = classifier.isCompact(width: 375.0)
    print("IsCompact: \(result)")
}

testClassifier()
```
**Score: 100/100**
- [x] Declares struct with regularThreshold (35/35)
- [x] Implements isCompact comparison (35/35)
- [x] Prints 'IsCompact: true' (30/30)

### Average Answer
```swift
struct WindowWidthClassifier {
    let regularThreshold = 768.0

    func isCompact(width: Double) -> Bool {
        if width < 768.0 { return true }
        return false
    }
}

func testClassifier() {
    let c = WindowWidthClassifier()
    print("IsCompact: \(c.isCompact(width: 375.0))")
}

testClassifier()
```
**Score: 90/100**
- [x] Declares struct and threshold (30/35)
- [x] Implements comparison (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct WindowWidthClassifier {
    func isCompact() -> Bool { true }
}
```
**Score: 10/100**
- [ ] Missing regularThreshold (5/35)
- [ ] Missing parameter and threshold logic (5/35)
- [ ] Missing test caller (0/30)

---

## ipad-q31 (Code-Write: MultitaskingColumnManager)

### Rubric
- Declares MultitaskingColumnManager with availableWidth Double property (35 pts, key)
- Implements presentationStyle returning SplitView for width >= 768.0 or SingleStack otherwise (35 pts, key)
- Prints exact output 'Style: SingleStack' (30 pts, key)

### Good Answer
```swift
struct MultitaskingColumnManager {
    var availableWidth: Double

    func presentationStyle() -> String {
        availableWidth >= 768.0 ? "SplitView" : "SingleStack"
    }
}

func testManager() {
    let manager = MultitaskingColumnManager(availableWidth: 500.0)
    print("Style: \(manager.presentationStyle())")
}

testManager()
```
**Score: 100/100**
- [x] Declares struct with availableWidth (35/35)
- [x] Implements presentationStyle branch (35/35)
- [x] Prints 'Style: SingleStack' (30/30)

### Average Answer
```swift
struct MultitaskingColumnManager {
    let availableWidth: Double

    func presentationStyle() -> String {
        if availableWidth >= 768.0 { return "SplitView" }
        return "SingleStack"
    }
}

func testManager() {
    let m = MultitaskingColumnManager(availableWidth: 500.0)
    print("Style: \(m.presentationStyle())")
}

testManager()
```
**Score: 90/100**
- [x] Declares struct and property (30/35)
- [x] Implements presentationStyle (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct MultitaskingColumnManager {
    func presentationStyle() -> String { "SingleStack" }
}
```
**Score: 10/100**
- [ ] Missing availableWidth property (5/35)
- [ ] Hardcoded constant without check (5/35)
- [ ] Missing test runner (0/30)
