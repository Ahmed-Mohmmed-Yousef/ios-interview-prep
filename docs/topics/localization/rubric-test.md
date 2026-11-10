# Rubric Test: Localization

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/localization/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## loc-q24 (Written: Internationalization vs Localization)

### Rubric
- Explains that internationalization is the engineering process of making code adaptable without redesign (50 pts, key)
- Explains that localization is translating text and tailoring assets for specific languages and cultures (50 pts, key)

### Good Answer
Internationalization is the fundamental architectural and engineering process that designs a software application so it can easily adapt to different languages, regional formatting, and reading orientations without changing source code. Localization is the subsequent process of translating strings, formatting local currencies, and providing customized media assets for a specific locale, culture, or market.

**Score: 100/100**
- [x] Explains internationalization architecture (50/50)
- [x] Explains localization translation and adaptation (50/50)

### Average Answer
Internationalization means preparing your code to work with multiple languages. Localization is translating your words and formatting dates for each country.

**Score: 85/100**
- [x] Mentions preparation of code (45/50)
- [x] Mentions translation and date formatting (40/50)

### Weak Answer
Internationalization is downloading translations from Apple servers, and localization is saving files into SQLite.

**Score: 0/100**
- [ ] Inaccurate server download claim (0/50)
- [ ] Inaccurate SQLite claim (0/50)

---

## loc-q25 (Written: Build-Time String Extraction)

### Rubric
- Explains that Xcode automatically scans source files during the build phase for localizable strings (50 pts, key)
- Explains that newly discovered keys are inserted into .xcstrings catalog with the NEW state (50 pts, key)

### Good Answer
During every project build, Xcode compiler tools scan your Swift and SwiftUI source files for instances of `LocalizedStringKey` in views like `Text` and calls to `String(localized:)`. Whenever Xcode discovers a string key that does not yet exist in your `Localizable.xcstrings` catalog, it automatically inserts the key and assigns it the `NEW` state so translators know it requires translation.

**Score: 100/100**
- [x] Scans source files during build phase (50/50)
- [x] Inserts discovered keys with NEW state (50/50)

### Average Answer
Xcode inspects your code during build time to find any LocalizedStringKey or String(localized:). It adds them to the String Catalog file and marks them as NEW.

**Score: 85/100**
- [x] Mentions scanning at build time (45/50)
- [x] Mentions adding to catalog as NEW (40/50)

### Weak Answer
Xcode uploads your strings to the App Store review portal to generate machine translations.

**Score: 0/100**
- [ ] False review portal upload claim (0/50)
- [ ] Misses local compiler extraction mechanism (0/50)

---

## loc-q26 (Written: Leading and Trailing vs Left and Right)

### Rubric
- Explains that leading and trailing adapt automatically to right-to-left languages like Arabic and Hebrew (50 pts, key)
- Explains that left and right remain fixed to physical edges and break mirrored layout flow (50 pts, key)

### Good Answer
Developers must use leading and trailing constraints because they automatically adapt to the user reading direction. In right-to-left (RTL) locales like Arabic and Hebrew, leading maps to the physical right edge and trailing maps to the physical left edge. Conversely, left and right constraints remain locked to physical screen borders, which prevents layout mirroring and produces confusing, visually broken interfaces for RTL users.

**Score: 100/100**
- [x] Explains automatic RTL adaptation (50/50)
- [x] Explains physical lock of left/right breaking layouts (50/50)

### Average Answer
Leading and trailing flip automatically when the phone language is Arabic or Hebrew. If you use left and right, the views stay on the wrong side of the screen.

**Score: 85/100**
- [x] Mentions flipping in RTL (45/50)
- [x] Mentions staying on wrong side with left/right (40/50)

### Weak Answer
Left and right constraints were removed in iOS 10 and cause compiler errors.

**Score: 0/100**
- [ ] False compiler error claim (0/50)
- [ ] Misses RTL reading direction concept (0/50)

---

## loc-q27 (Written: String Concatenation Problem)

### Rubric
- Explains that grammatical word order differs significantly across spoken languages (50 pts, key)
- Explains using string interpolation or format specifiers so translators can reorder sentence parts (50 pts, key)

### Good Answer
Assembling strings with the plus operator hardcodes English grammatical structure into application code. Different languages have completely different word orders, often placing verbs, adjectives, and nouns in opposite positions. By using string interpolation with arguments, such as `String(localized: "Welcome, \(userName)")`, translators can reorder arguments in the String Catalog to construct natural, grammatically correct sentences.

**Score: 100/100**
- [x] Explains differing word order across languages (50/50)
- [x] Explains interpolation allows translators to reorder parts (50/50)

### Average Answer
Different languages put words in different orders. Concatenating with plus forces English order, but string interpolation lets translators move the parameters around.

**Score: 85/100**
- [x] Mentions differing word order (45/50)
- [x] Mentions reordering parameters with interpolation (40/50)

### Weak Answer
String concatenation causes memory leaks because Swift cannot release strings created with plus.

**Score: 0/100**
- [ ] Inaccurate memory leak claim (0/50)
- [ ] Misses grammatical syntax implications (0/50)

---

## loc-q28 (Written: Senior Localization Architecture)

### Rubric
- Discusses testing layout resiliency using pseudolocalization schemes like Double-Length text (50 pts, key)
- Discusses modular architectures with LocalizedStringResource and automated CI XLIFF export pipelines (50 pts, key)

### Good Answer
A senior engineer tests localization resiliency early by configuring Xcode schemes with Double-Length and Right-to-Left pseudolanguages, ensuring UI views never clip verbose languages like German. In modular systems, they expose text from packages and intents using `LocalizedStringResource` so strings resolve against the host application locale. Finally, they automate continuous translation pipelines in CI using XLIFF exports and synchronization with translation management platforms.

**Score: 100/100**
- [x] Pseudolocalization testing (Double-Length, RTL) (50/50)
- [x] LocalizedStringResource and CI XLIFF automation (50/50)

### Average Answer
I test layouts with Double-Length pseudolanguage in Xcode to check for text clipping. In modular code, I use LocalizedStringResource and export XLIFF files for translation services in CI.

**Score: 85/100**
- [x] Mentions pseudolanguage testing (45/50)
- [x] Mentions LocalizedStringResource and XLIFF export (40/50)

### Weak Answer
I run Google Translate on my string files on release day.

**Score: 15/100**
- [ ] No architectural considerations or pseudolocalization (10/50)
- [ ] No CI automation or deferred resource strategy (5/50)

---

## loc-q29 (Code-Write: LocalizedPriceFormatter)

### Rubric
- Declares LocalizedPriceFormatter with amount Double property (35 pts, key)
- Implements formattedPrice using .formatted currency API with en_US locale (35 pts, key)
- Prints exact output 'Price: $49.99' (30 pts, key)

### Good Answer
```swift
import Foundation

struct LocalizedPriceFormatter {
    let amount: Double

    func formattedPrice(currencyCode: String) -> String {
        amount.formatted(.currency(code: currencyCode).locale(Locale(identifier: "en_US")))
    }
}

func testFormatter() {
    let formatter = LocalizedPriceFormatter(amount: 49.99)
    print("Price: \(formatter.formattedPrice(currencyCode: "USD"))")
}

testFormatter()
```
**Score: 100/100**
- [x] Declares struct with amount (35/35)
- [x] Uses .formatted currency with en_US locale (35/35)
- [x] Prints 'Price: $49.99' (30/30)

### Average Answer
```swift
import Foundation

struct LocalizedPriceFormatter {
    var amount: Double
    func formattedPrice(currencyCode: String) -> String {
        let loc = Locale(identifier: "en_US")
        return amount.formatted(.currency(code: currencyCode).locale(loc))
    }
}

func testFormatter() {
    let f = LocalizedPriceFormatter(amount: 49.99)
    print("Price: " + f.formattedPrice(currencyCode: "USD"))
}

testFormatter()
```
**Score: 90/100**
- [x] Declares struct and amount (30/35)
- [x] Implements currency formatting (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct LocalizedPriceFormatter {
    func formattedPrice() -> String { "$49.99" }
}
```
**Score: 10/100**
- [ ] Missing stored property (5/35)
- [ ] Hardcoded string instead of formatted API (5/35)
- [ ] Missing test runner (0/30)

---

## loc-q30 (Code-Write: PluralMessageBuilder)

### Rubric
- Declares PluralMessageBuilder struct (35 pts, key)
- Implements message method returning singular or plural string based on itemCount (35 pts, key)
- Prints exact output 'Output: 3 items' (30 pts, key)

### Good Answer
```swift
struct PluralMessageBuilder {
    func message(itemCount: Int) -> String {
        if itemCount == 1 {
            return "1 item"
        }
        return "\(itemCount) items"
    }
}

func testBuilder() {
    let builder = PluralMessageBuilder()
    print("Output: \(builder.message(itemCount: 3))")
}

testBuilder()
```
**Score: 100/100**
- [x] Declares struct (35/35)
- [x] Implements message method (35/35)
- [x] Prints 'Output: 3 items' (30/30)

### Average Answer
```swift
struct PluralMessageBuilder {
    func message(itemCount: Int) -> String {
        itemCount == 1 ? "1 item" : "\(itemCount) items"
    }
}

func testBuilder() {
    let b = PluralMessageBuilder()
    print("Output: \(b.message(itemCount: 3))")
}

testBuilder()
```
**Score: 90/100**
- [x] Declares struct (30/35)
- [x] Implements ternary plural logic (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct PluralMessageBuilder {
    func message() { print("3 items") }
}
```
**Score: 10/100**
- [ ] Missing itemCount parameter (5/35)
- [ ] Missing return type and plural branching (5/35)
- [ ] Missing test caller (0/30)

---

## loc-q31 (Code-Write: RTLMarginResolver)

### Rubric
- Declares RTLMarginResolver with isRTL, leadingPadding, and trailingPadding properties (35 pts, key)
- Implements visualLeftPadding correctly mirroring padding when isRTL is true (35 pts, key)
- Prints exact output 'Left: 32.0' (30 pts, key)

### Good Answer
```swift
struct RTLMarginResolver {
    let isRTL: Bool
    let leadingPadding: Double
    let trailingPadding: Double

    func visualLeftPadding() -> Double {
        if isRTL {
            return trailingPadding
        }
        return leadingPadding
    }
}

func testResolver() {
    let resolver = RTLMarginResolver(isRTL: true, leadingPadding: 16.0, trailingPadding: 32.0)
    print("Left: \(resolver.visualLeftPadding())")
}

testResolver()
```
**Score: 100/100**
- [x] Declares struct with properties (35/35)
- [x] Implements mirroring when isRTL is true (35/35)
- [x] Prints 'Left: 32.0' (30/30)

### Average Answer
```swift
struct RTLMarginResolver {
    var isRTL: Bool
    var leadingPadding: Double
    var trailingPadding: Double

    func visualLeftPadding() -> Double {
        isRTL ? trailingPadding : leadingPadding
    }
}

func testResolver() {
    let r = RTLMarginResolver(isRTL: true, leadingPadding: 16.0, trailingPadding: 32.0)
    print("Left: \(r.visualLeftPadding())")
}

testResolver()
```
**Score: 90/100**
- [x] Declares struct and properties (30/35)
- [x] Implements ternary return (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct RTLMarginResolver {
    func visualLeftPadding() -> Double { 16.0 }
}
```
**Score: 10/100**
- [ ] Missing stored properties (5/35)
- [ ] Hardcoded constant without RTL mirroring (5/35)
- [ ] Incorrect output (0/30)
