# Rubric Test: Animations and Transitions

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/swiftui-animations/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## sa-q24 (Written: Implicit vs Explicit Animations)

### Rubric
- Defines implicit animations using .animation(_:value:) and scoped to a specific view and property (40 pts, key)
- Defines explicit animations using withAnimation to wrap state mutations affecting multiple views (40 pts, key)
- Explains when to choose implicit versus explicit based on animation scope and coordination (20 pts)

### Good Answer
Implicit animations attach directly to a view using `.animation(_:value:)`. They animate changes only on that view when the specified value changes. Explicit animations wrap state mutations in `withAnimation`. They animate all views across the hierarchy that depend on that state change. Use implicit animations for isolated view effects, and explicit animations when multiple components or transitions must coordinate together.

**Score: 100/100**
- [x] Defines implicit animations with .animation(_:value:) (40/40)
- [x] Defines explicit animations with withAnimation (40/40)
- [x] Explains when to choose each (20/20)

### Average Answer
Implicit animations are attached to views using `.animation()`, while explicit animations wrap state mutations in `withAnimation`. You use implicit for one view and explicit when changing state that affects multiple views.

**Score: 80/100**
- [x] Defines implicit (35/40)
- [x] Defines explicit (35/40)
- [x] Chooses based on scope (10/20)

### Weak Answer
Implicit animations run on UIKit layers, while explicit animations run on Core Animation layers.

**Score: 0/100**
- [ ] Confused UIKit/Core Animation concepts (0/40)
- [ ] Misses withAnimation and .animation differences (0/40)
- [ ] No practical usage guidelines (0/20)

---

## sa-q25 (Written: Transitions and withAnimation Requirement)

### Rubric
- Explains that .transition defines how a view enters or leaves the hierarchy but does not start animation itself (40 pts, key)
- Explains that SwiftUI needs an animated transaction context to interpolate transition frames (40 pts, key)
- Notes that without withAnimation, the view appears or disappears instantly without visual interpolation (20 pts)

### Good Answer
The `.transition()` modifier only defines the appearance and disappearance style of a view when its structural identity enters or leaves the hierarchy. However, transitions do not generate animation timing on their own. SwiftUI requires an active animated transaction to interpolate frames over time. Without wrapping the state change in `withAnimation`, SwiftUI performs an un-animated transaction, causing the view to appear or vanish instantly.

**Score: 100/100**
- [x] Explains .transition defines appearance without timing (40/40)
- [x] Explains need for animated transaction context (40/40)
- [x] Notes view appears/disappears instantly without withAnimation (20/20)

### Average Answer
Transitions only tell SwiftUI what kind of transition to use, like slide or fade. If you do not change the boolean state inside `withAnimation`, SwiftUI shows the view instantly without any animation.

**Score: 75/100**
- [x] Explains role of transition (35/40)
- [x] Mentions need for withAnimation (25/40)
- [x] Notes instant appearance (15/20)

### Weak Answer
Transitions require a paid developer license to enable animations.

**Score: 0/100**
- [ ] Irrelevant and false assertion (0/40)
- [ ] Misses transaction mechanics (0/40)
- [ ] Misses instant appearance behavior (0/20)

---

## sa-q26 (Written: Spring Interruption Handling vs Linear)

### Rubric
- Explains that spring animations are physics-based and naturally preserve velocity and momentum (40 pts, key)
- Explains that user gesture interruptions redirect the spring smoothly without visual snapping (40 pts, key)
- Contrasts with linear curves that stop abruptly or restart from zero velocity (20 pts)

### Good Answer
Modern spring animations use physical spring models that track position and velocity continuously. When a user gesture interrupts an active spring animation, the spring incorporates the current velocity and redirects smoothly toward the new target. In contrast, linear or traditional timing curves lack velocity state, causing visual snapping or awkward pauses when interrupted by fast user interactions.

**Score: 100/100**
- [x] Physics-based preserving velocity and momentum (40/40)
- [x] Smooth redirection on gesture interruptions (40/40)
- [x] Contrasts with visual snapping of linear curves (20/20)

### Average Answer
Spring animations use physics so they keep their speed when interrupted. If a user taps again while the view is moving, it changes direction smoothly. Linear animations snap abruptly.

**Score: 85/100**
- [x] Notes physics and speed (35/40)
- [x] Smooth direction changes on tap (35/40)
- [x] Mentions linear snapping (15/20)

### Weak Answer
Springs are faster than linear curves because they use less memory on iOS.

**Score: 10/100**
- [ ] Inaccurate assertion on speed and memory (0/40)
- [ ] Misses interruption mechanics (0/40)
- [x] Recognizes spring vs linear distinction (10/20)

---

## sa-q27 (Written: Modifier Ordering with .animation)

### Rubric
- Explains that .animation(_:value:) only affects modifiers placed before it in the chain (45 pts, key)
- Explains that modifiers placed after .animation are not animated and update immediately (35 pts, key)
- Provides an example such as animating offset while keeping color changes instantaneous (20 pts)

### Good Answer
In SwiftUI, modifier ordering determines animation scope. The `.animation(_:value:)` modifier only animates modifiers that appear before it in the view chain. Any modifiers placed after `.animation` update immediately without interpolation. For example, placing `.offset()` before `.animation` and `.background()` after `.animation` will animate position changes smoothly while changing background colors instantly.

**Score: 100/100**
- [x] Affects modifiers before it in chain (45/45)
- [x] Modifiers after update immediately (35/35)
- [x] Provides clear example (20/20)

### Average Answer
The `.animation` modifier only animates things that come before it. Anything you write after `.animation` will not animate and changes instantly.

**Score: 75/100**
- [x] Modifiers before animate (40/45)
- [x] Modifiers after do not animate (35/35)
- [ ] Omits concrete code example (0/20)

### Weak Answer
Modifiers should always be placed in alphabetical order for the compiler.

**Score: 0/100**
- [ ] False guideline (0/45)
- [ ] Misses animation scoping (0/35)
- [ ] No example provided (0/20)

---

## sa-q28 (Written: matchedGeometryEffect Mechanics & Requirements)

### Rubric
- Explains that matchedGeometryEffect interpolates size and position between two views across identity changes (40 pts, key)
- Mentions that both views must share the same identifier string and Namespace token (35 pts, key)
- Explains that only one view sharing that identifier should be active in the hierarchy at a given time (25 pts)

### Good Answer
The `matchedGeometryEffect` modifier synchronizes and smoothly interpolates frame size and position between two separate views across an identity change. To work correctly, both views must share an identical identifier and belong to the same `@Namespace` token. Additionally, only one view with that identifier should be visible at a time. This allows SwiftUI to morph seamlessly between them.

**Score: 100/100**
- [x] Interpolates size and position across identity changes (40/40)
- [x] Requires shared identifier and @Namespace token (35/35)
- [x] Explains only one view visible at a time (25/25)

### Average Answer
It morphs one view into another by animating their frame size and position. Both views must share the same id and the same `@Namespace`.

**Score: 75/100**
- [x] Morphs size and position (35/40)
- [x] Notes shared id and @Namespace (35/35)
- [ ] Misses rule about only one view visible at once (5/25)

### Weak Answer
It lets you embed SwiftUI views inside UIKit storyboards.

**Score: 0/100**
- [ ] Confuses with UIHostingController (0/40)
- [ ] Misses geometry interpolation (0/35)
- [ ] Misses namespace requirements (0/25)

---

## sa-q29 (Code-Write: SpringCurve Struct)

### Rubric
- Declares SpringCurve struct with duration and bounce properties (35 pts, key)
- Implements describe method formatting duration and bounce correctly (35 pts, key)
- Prints exact output 'Duration: 0.4, Bounce: 0.2' (30 pts, key)

### Good Answer
```swift
struct SpringCurve {
    let duration: Double
    let bounce: Double

    func describe() -> String {
        "Duration: \(duration), Bounce: \(bounce)"
    }
}

func testSpringCurve() {
    let curve = SpringCurve(duration: 0.4, bounce: 0.2)
    print(curve.describe())
}

testSpringCurve()
```

**Score: 100/100**
- [x] SpringCurve declared with duration and bounce (35/35)
- [x] describe formats output (35/35)
- [x] Prints 'Duration: 0.4, Bounce: 0.2' (30/30)

### Average Answer
```swift
struct SpringCurve {
    var duration: Double
    var bounce: Double
    func describe() -> String {
        return "Duration: " + String(duration) + ", Bounce: " + String(bounce)
    }
}

func testSpringCurve() {
    print(SpringCurve(duration: 0.4, bounce: 0.2).describe())
}
testSpringCurve()
```

**Score: 100/100**
- [x] Clean implementation passing all criteria (100/100)

### Weak Answer
```swift
struct SpringCurve {}
print("Duration: 0.4, Bounce: 0.2")
```

**Score: 15/100**
- [ ] Empty struct missing properties (0/35)
- [ ] No describe method (0/35)
- [x] Output string printed (15/30)

---

## sa-q30 (Code-Write: TransitionComposer Struct)

### Rubric
- Declares TransitionComposer with hasSlide and hasFade boolean properties (35 pts, key)
- Implements summary method handling all four combination branches correctly (35 pts, key)
- Prints exact output 'Effects: Slide+Fade' (30 pts, key)

### Good Answer
```swift
struct TransitionComposer {
    let hasSlide: Bool
    let hasFade: Bool

    func summary() -> String {
        if hasSlide && hasFade {
            return "Effects: Slide+Fade"
        } else if hasSlide {
            return "Effects: Slide"
        } else if hasFade {
            return "Effects: Fade"
        } else {
            return "Effects: None"
        }
    }
}

func testComposer() {
    let composer = TransitionComposer(hasSlide: true, hasFade: true)
    print(composer.summary())
}

testComposer()
```

**Score: 100/100**
- [x] Declares struct with properties (35/35)
- [x] summary handles branches correctly (35/35)
- [x] Prints 'Effects: Slide+Fade' (30/30)

### Average Answer
```swift
struct TransitionComposer {
    var hasSlide: Bool
    var hasFade: Bool

    func summary() -> String {
        switch (hasSlide, hasFade) {
        case (true, true): "Effects: Slide+Fade"
        case (true, false): "Effects: Slide"
        case (false, true): "Effects: Fade"
        case (false, false): "Effects: None"
        }
    }
}

func testComposer() {
    print(TransitionComposer(hasSlide: true, hasFade: true).summary())
}
testComposer()
```

**Score: 100/100**
- [x] Idiomatic tuple switch meeting all criteria (100/100)

### Weak Answer
```swift
struct TransitionComposer {}
print("Effects: Slide+Fade")
```

**Score: 15/100**
- [ ] Missing stored properties (0/35)
- [ ] No summary logic (0/35)
- [x] Prints output (15/30)

---

## sa-q31 (Code-Write: AnimatedPropertyTracker Struct)

### Rubric
- Declares AnimatedPropertyTracker with opacity initialized to 0.0 (35 pts, key)
- Implements mutating animateToVisible method updating opacity to 1.0 (35 pts, key)
- Prints exact output 'Visible: 1.0' (30 pts, key)

### Good Answer
```swift
struct AnimatedPropertyTracker {
    var opacity: Double = 0.0

    mutating func animateToVisible() {
        opacity = 1.0
    }
}

func testAnimationTracker() {
    var tracker = AnimatedPropertyTracker()
    tracker.animateToVisible()
    print("Visible: \(tracker.opacity)")
}

testAnimationTracker()
```

**Score: 100/100**
- [x] AnimatedPropertyTracker declared with opacity 0.0 (35/35)
- [x] animateToVisible sets opacity to 1.0 (35/35)
- [x] Prints 'Visible: 1.0' (30/30)

### Average Answer
```swift
struct AnimatedPropertyTracker {
    var opacity = 0.0
    mutating func animateToVisible() {
        self.opacity = 1.0
    }
}

func testAnimationTracker() {
    var t = AnimatedPropertyTracker()
    t.animateToVisible()
    print("Visible: \(t.opacity)")
}
testAnimationTracker()
```

**Score: 100/100**
- [x] Passes all criteria (100/100)

### Weak Answer
```swift
var opacity = 1.0
print("Visible: \(opacity)")
```

**Score: 10/100**
- [ ] No struct AnimatedPropertyTracker (0/35)
- [ ] No mutating method (0/35)
- [x] Output string printed (10/30)
