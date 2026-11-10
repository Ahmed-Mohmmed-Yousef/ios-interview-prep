# Rubric Test: Accessibility

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/accessibility/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## acc-q24 (Written: accessibilityLabel, accessibilityValue, and accessibilityHint)

### Rubric
- Explains that accessibilityLabel provides the name or description of the control (35 pts, key)
- Explains that accessibilityValue conveys current state or amount (35 pts, key)
- Explains that accessibilityHint gives additional guidance on interaction results (30 pts, key)

### Good Answer
The `accessibilityLabel` identifies the control by giving it a clear name, such as "Volume" or "Play". The `accessibilityValue` communicates the current state or quantity of that element, such as "60 percent" or "Selected". Finally, the `accessibilityHint` provides supplementary context explaining the outcome of interacting with the control when that result is not obvious from the label alone.

**Score: 100/100**
- [x] Identifies label role (35/35)
- [x] Explains value role (35/35)
- [x] Explains hint role (30/30)

### Average Answer
accessibilityLabel tells VoiceOver the name of the view like Play. accessibilityValue is the state like a slider percentage. accessibilityHint explains what happens when you tap it.

**Score: 85/100**
- [x] Identifies label role (30/35)
- [x] Explains value role (30/35)
- [x] Explains hint role (25/30)

### Weak Answer
These properties control the visual layout, color palette, and animation timings of buttons in UIKit.

**Score: 0/100**
- [ ] Inaccurate layout claim (0/35)
- [ ] Misses value definition (0/35)
- [ ] Misses hint definition (0/30)

---

## acc-q25 (Written: accessibilityElement(children: .combine))

### Rubric
- Explains that .combine merges child accessibility elements into a single spoken unit (50 pts, key)
- Explains that this improves navigation efficiency on compound views like cards or list rows (50 pts, key)

### Good Answer
In SwiftUI, `accessibilityElement(children: .combine)` collapses all nested child accessibility elements into a single accessible node. This is especially useful for composite elements like cards or list rows with separate title, subtitle, and badge labels. Combining them allows VoiceOver users to hear the complete information in one pass rather than having to make several consecutive swipe gestures.

**Score: 100/100**
- [x] Merges child elements into one node (50/50)
- [x] Improves navigation efficiency on compound views (50/50)

### Average Answer
Using .combine groups all the text and images inside a card into one single VoiceOver item. This saves the user from swiping through every label separately.

**Score: 85/100**
- [x] Mentions grouping into one item (45/50)
- [x] Mentions avoiding separate swipes (40/50)

### Weak Answer
It merges image layers into a single PNG file to reduce graphics memory.

**Score: 0/100**
- [ ] Incorrect image export claim (0/50)
- [ ] Misses screen reader navigation concept (0/50)

---

## acc-q26 (Written: Never Include Control Type in Label)

### Rubric
- Explains that accessibility traits already announce control type automatically (50 pts, key)
- Explains that repeating the type results in redundant, confusing speech like 'Play button, button' (50 pts, key)

### Good Answer
Developers should never append words like "button" or "image" to an accessibility label because accessibility traits announce the control type automatically. If a button with the `.button` trait has an accessibility label of "Search button", VoiceOver will announce "Search button, button". Keeping the label concise as "Search" guarantees clear, non-redundant speech for assistive users.

**Score: 100/100**
- [x] Explains traits announce type automatically (50/50)
- [x] Explains double announcement issue (50/50)

### Average Answer
VoiceOver already says button because of the view traits. If you write button in the label too, it repeats the word and sounds strange.

**Score: 85/100**
- [x] Mentions traits announce type (45/50)
- [x] Mentions duplicate speech (40/50)

### Weak Answer
Including the word button causes a syntax error in the Swift compiler.

**Score: 0/100**
- [ ] False compiler error claim (0/50)
- [ ] Misses VoiceOver traits mechanics (0/50)

---

## acc-q27 (Written: Managing Focus on Custom Dialogs)

### Rubric
- Mentions posting UIAccessibility notifications like screenChanged or layoutChanged in UIKit (50 pts, key)
- Explains passing the target element to shift VoiceOver focus or using AccessibilityFocusState in SwiftUI (50 pts, key)

### Good Answer
When presenting a custom non-modal dialog, the system does not always automatically transfer VoiceOver focus to the new element. In UIKit, you should call `UIAccessibility.post(notification: .screenChanged, argument: dialogView)` to shift the focus cursor directly to the dialog container. In SwiftUI, you can manage focus programmatically using the `@AccessibilityFocusState` property wrapper.

**Score: 100/100**
- [x] Mentions UIAccessibility.post with screenChanged (50/50)
- [x] Explains passing target view or using AccessibilityFocusState (50/50)

### Average Answer
In UIKit you call UIAccessibility.post with screenChanged and pass the dialog so focus moves there. In SwiftUI you can use AccessibilityFocusState to move the cursor.

**Score: 85/100**
- [x] Mentions screenChanged post (45/50)
- [x] Mentions focus state management (40/50)

### Weak Answer
You should play a system beep sound through AVAudioSession so the user knows to tap around the screen.

**Score: 0/100**
- [ ] Irrelevant audio claim (0/50)
- [ ] Misses programmatic focus APIs (0/50)

---

## acc-q28 (Written: Senior Accessibility Architecture)

### Rubric
- Discusses integrating accessibility into foundational design systems like minimum 44pt touch targets and Dynamic Type (50 pts, key)
- Discusses custom Rotor actions and automated accessibility audits in CI with Xcode or XCTest (50 pts, key)

### Good Answer
A senior iOS engineer integrates accessibility into the design system from day one. This involves establishing minimum 44-point touch targets, supporting Dynamic Type without clipping content, and providing custom Rotor actions for complex gesture interactions. Furthermore, they implement automated accessibility audits in XCTest pipelines and run the Xcode Accessibility Inspector regularly to detect regressions before release.

**Score: 100/100**
- [x] Integrates into design system: touch targets, Dynamic Type (50/50)
- [x] Rotor actions and automated CI audits (50/50)

### Average Answer
I make sure buttons have at least 44pt touch targets and text scales with Dynamic Type. I also add custom actions for Rotor and run automated accessibility audits in Xcode tests.

**Score: 85/100**
- [x] Mentions touch targets and scaling (45/50)
- [x] Mentions Rotor and automated audits (40/50)

### Weak Answer
I turn on VoiceOver once on my phone right before submitting the build to the App Store.

**Score: 15/100**
- [ ] No design system or architectural consideration (10/50)
- [ ] No automated testing or Rotor actions (5/50)

---

## acc-q29 (Code-Write: AccessibleControlDescriptor)

### Rubric
- Declares AccessibleControlDescriptor with label and isButton properties (35 pts, key)
- Implements spokenDescription correctly appending button trait suffix (35 pts, key)
- Prints exact output 'Spoken: Bookmark, button' (30 pts, key)

### Good Answer
```swift
struct AccessibleControlDescriptor {
    let label: String
    let isButton: Bool

    func spokenDescription() -> String {
        if isButton {
            return "\(label), button"
        }
        return label
    }
}

func testDescriptor() {
    let descriptor = AccessibleControlDescriptor(label: "Bookmark", isButton: true)
    print("Spoken: \(descriptor.spokenDescription())")
}

testDescriptor()
```
**Score: 100/100**
- [x] Declares struct with properties (35/35)
- [x] Implements spokenDescription (35/35)
- [x] Prints 'Spoken: Bookmark, button' (30/30)

### Average Answer
```swift
struct AccessibleControlDescriptor {
    var label: String
    var isButton: Bool

    func spokenDescription() -> String {
        isButton ? "\(label), button" : label
    }
}

func testDescriptor() {
    let d = AccessibleControlDescriptor(label: "Bookmark", isButton: true)
    print("Spoken: " + d.spokenDescription())
}

testDescriptor()
```
**Score: 90/100**
- [x] Declares struct and properties (30/35)
- [x] Implements spokenDescription ternary (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct AccessibleControlDescriptor {
    func spokenDescription() {
        print("button")
    }
}
```
**Score: 10/100**
- [ ] Missing stored properties (5/35)
- [ ] Missing return type and logic (5/35)
- [ ] Incorrect output (0/30)

---

## acc-q30 (Code-Write: TouchTargetValidator)

### Rubric
- Declares TouchTargetValidator with minDimension set to 44.0 (35 pts, key)
- Implements isValidTarget comparing width and height against minDimension (35 pts, key)
- Prints exact output 'Valid: false' (30 pts, key)

### Good Answer
```swift
struct TouchTargetValidator {
    var minDimension: Double = 44.0

    func isValidTarget(width: Double, height: Double) -> Bool {
        width >= minDimension && height >= minDimension
    }
}

func testTarget() {
    let validator = TouchTargetValidator()
    let result = validator.isValidTarget(width: 48.0, height: 40.0)
    print("Valid: \(result)")
}

testTarget()
```
**Score: 100/100**
- [x] Declares struct with minDimension (35/35)
- [x] Implements isValidTarget check (35/35)
- [x] Prints 'Valid: false' (30/30)

### Average Answer
```swift
struct TouchTargetValidator {
    let minDimension = 44.0

    func isValidTarget(width: Double, height: Double) -> Bool {
        if width >= 44.0 && height >= 44.0 { return true }
        return false
    }
}

func testTarget() {
    let v = TouchTargetValidator()
    print("Valid: \(v.isValidTarget(width: 48.0, height: 40.0))")
}

testTarget()
```
**Score: 90/100**
- [x] Declares struct with constant (30/35)
- [x] Implements bounds check (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct TouchTargetValidator {
    func isValidTarget() -> Bool { true }
}
```
**Score: 10/100**
- [ ] Missing minDimension (5/35)
- [ ] Missing dimension arguments and comparison (5/35)
- [ ] Missing test execution (0/30)

---

## acc-q31 (Code-Write: ElementGroupCombiner)

### Rubric
- Declares ElementGroupCombiner with children array property (35 pts, key)
- Filters out empty strings and joins with comma and space (35 pts, key)
- Prints exact output 'Card: Flight AA, Gate 4' (30 pts, key)

### Good Answer
```swift
struct ElementGroupCombiner {
    var children: [String]

    func combinedSpokenText() -> String {
        children.filter { !$0.isEmpty }.joined(separator: ", ")
    }
}

func testCombiner() {
    let combiner = ElementGroupCombiner(children: ["Flight AA", "", "Gate 4"])
    print("Card: \(combiner.combinedSpokenText())")
}

testCombiner()
```
**Score: 100/100**
- [x] Declares struct with children array (35/35)
- [x] Filters empty strings and joins (35/35)
- [x] Prints 'Card: Flight AA, Gate 4' (30/30)

### Average Answer
```swift
struct ElementGroupCombiner {
    let children: [String]

    func combinedSpokenText() -> String {
        var nonEmpties: [String] = []
        for child in children {
            if child != "" {
                nonEmpties.append(child)
            }
        }
        return nonEmpties.joined(separator: ", ")
    }
}

func testCombiner() {
    let c = ElementGroupCombiner(children: ["Flight AA", "", "Gate 4"])
    print("Card: " + c.combinedSpokenText())
}

testCombiner()
```
**Score: 90/100**
- [x] Declares struct and children (30/35)
- [x] Filters and joins items (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct ElementGroupCombiner {
    var children: [String]
    func combinedSpokenText() -> String { children.joined() }
}
```
**Score: 15/100**
- [x] Has children array (15/35)
- [ ] Misses empty filtering and comma separator (0/35)
- [ ] Missing runner and output (0/30)
