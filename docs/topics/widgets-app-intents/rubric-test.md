# Rubric Test: Widgets and App Intents

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/widgets-app-intents/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## wid-q24 (Written: Why widgets do not run continuously and timeline architecture)

### Rubric
- Explains that widgets terminate to protect device battery life and memory performance (30 pts)
- Explains that the widget extension produces a timeline of pre-rendered entries with future timestamps (40 pts, key)
- Explains that the system switches views at scheduled times without executing app code (30 pts)

### Good Answer
Widgets do not run continuously in device memory to protect battery life and prevent resource drain on the Home Screen. Instead, an independent widget extension launches briefly to generate a timeline containing pre-rendered `TimelineEntry` objects, each with a timestamp and view model. Once generated, the extension terminates, and the iOS system automatically updates the displayed view at each scheduled time without running application code.

**Score: 100/100**
- [x] Battery and memory protection (30/30)
- [x] Timeline with pre-rendered future entries (40/40)
- [x] Zero-CPU scheduled rendering by system (30/30)

### Average Answer
Widgets avoid running all the time so they do not drain the iPhone battery. The widget extension creates a timeline of views for future hours. iOS then shows the matching view when each time arrives without keeping the app open.

**Score: 85/100**
- [x] Mentions battery savings (25/30)
- [x] Mentions timeline creation for future hours (35/40)
- [x] Mentions system showing views at scheduled times (25/30)

### Weak Answer
Widgets use low-voltage Bluetooth beacons to draw pixels on the screen every second.

**Score: 0/100**
- [ ] Inaccurate hardware claims (0/30)
- [ ] Misses timeline architecture (0/40)
- [ ] Misses system caching mechanism (0/30)

---

## wid-q25 (Written: Comparison of .atEnd, .after, and .never reload policies)

### Rubric
- Explains that .atEnd requests a new timeline after the final entry date passes (40 pts, key)
- Explains that .after(Date) schedules a reload at or after a specific future timestamp (30 pts)
- Explains that .never relies on external reload triggers without scheduling automatic refreshes (30 pts)

### Good Answer
The `.atEnd` policy instructs iOS to request a brand-new timeline immediately after the date of the last entry in the current timeline has passed. In contrast, the `.after(Date)` policy requests a reload at or after a predetermined future timestamp, which is ideal for periodic data like stock quotes or weather forecasts. Finally, the `.never` policy tells iOS not to schedule automatic refreshes at all, maintaining the current view until the main application or a push notification explicitly calls `WidgetCenter.reloadTimelines`.

**Score: 100/100**
- [x] .atEnd explained accurately (40/40)
- [x] .after(Date) explained with future timestamp (30/30)
- [x] .never explained with external triggers (30/30)

### Average Answer
.atEnd reloads the widget after the last entry in the timeline finishes. .after tells iOS to reload after a specific date. .never means the widget will not reload on its own and needs an app reload trigger.

**Score: 85/100**
- [x] Explains .atEnd behavior (35/40)
- [x] Explains .after date scheduling (25/30)
- [x] Explains .never manual requirement (25/30)

### Weak Answer
These policies control whether the widget closes when the user swipes away Safari.

**Score: 0/100**
- [ ] Incorrect understanding of reload policies (0/40)
- [ ] Misses date scheduling (0/30)
- [ ] Misses external reload concept (0/30)

---

## wid-q26 (Written: Interactive widgets with App Intents in iOS 17)

### Rubric
- Explains that Button(intent:) executes AppIntent.perform() in the background extension process (40 pts, key)
- Notes that the action executes without launching the main application into the foreground (30 pts)
- Mentions mutating shared App Group storage and calling WidgetCenter reloadTimelines to update UI (30 pts)

### Good Answer
In iOS 17 and later, interactive widgets use SwiftUI controls like `Button(intent:)` and `Toggle(isOn:intent:)` to trigger actions directly from the Home Screen. Tapping the control wakes the widget extension in the background to execute `AppIntent.perform()` without launching the main application. Inside `perform()`, the intent mutates shared state in an App Group container and invokes `WidgetCenter.shared.reloadTimelines(ofKind:)`, allowing the widget to refresh its UI instantly.

**Score: 100/100**
- [x] Button(intent:) and AppIntent.perform() background execution (40/40)
- [x] Avoids foreground app launch (30/30)
- [x] Mutates App Group storage and calls reloadTimelines (30/30)

### Average Answer
iOS 17 lets widgets have interactive buttons using Button with an AppIntent. When tapped, the intent runs in the background without opening the main app. It updates shared data in the App Group and tells WidgetCenter to reload the timeline.

**Score: 90/100**
- [x] Button with AppIntent in background (35/40)
- [x] Mentions avoiding opening main app (28/30)
- [x] Mentions App Group and WidgetCenter reload (27/30)

### Weak Answer
It opens a web browser popup inside the widget frame to submit an HTML form.

**Score: 0/100**
- [ ] Incorrect web popup claim (0/40)
- [ ] Misses AppIntent architecture (0/30)
- [ ] Misses storage and timeline refresh (0/30)

---

## wid-q27 (Written: UserDefaults.standard failure and App Groups)

### Rubric
- Explains process isolation and separate sandboxed container directories between app and extension (40 pts, key)
- States that developers must enable the App Groups entitlement in Xcode for both targets (30 pts)
- Explains accessing shared preferences using UserDefaults(suiteName:) with the App Group identifier (30 pts)

### Good Answer
`UserDefaults.standard` fails to share data with a widget because the widget extension executes in a separate process with its own sandboxed file system container. As a result, standard preferences read from completely isolated plist files. To share data, developers must add the App Groups capability in Xcode to both the main app and widget extension targets. Both targets can then read and write from the shared container by instantiating `UserDefaults(suiteName: "group.com.example")`.

**Score: 100/100**
- [x] Sandboxed container isolation explained (40/40)
- [x] Enabling App Groups entitlement on both targets (30/30)
- [x] Using UserDefaults(suiteName:) with shared identifier (30/30)

### Average Answer
Standard UserDefaults does not work because the widget is in a separate sandbox from the app. You have to enable App Groups in Xcode for both targets. Then you access shared data using UserDefaults with the group suite name.

**Score: 85/100**
- [x] Mentions separate sandbox (35/40)
- [x] Mentions App Groups capability in Xcode (25/30)
- [x] Mentions UserDefaults with suite name (25/30)

### Weak Answer
You need to pass the values over AirDrop between the app and the widget.

**Score: 0/100**
- [ ] Incorrect AirDrop claim (0/40)
- [ ] Misses App Groups entitlement (0/30)
- [ ] Misses suiteName configuration (0/30)

---

## wid-q28 (Written: Reload budget management and architectural prevention)

### Rubric
- Explains that iOS limits daily reloads to 40-70 updates and throttles background calls when exhausted (40 pts, key)
- Recommends pre-generating multi-hour forecast timeline entries in advance (30 pts)
- Recommends using Text with timer style for live countdowns rather than triggering reloads (30 pts)

### Good Answer
iOS enforces a daily budget of roughly forty to seventy background reloads per widget to preserve system battery. If an application requests reloads too frequently, iOS throttles background updates, leaving the widget showing stale data until the budget resets. To prevent exhaustion, developers should generate multi-hour timeline entries in advance during a single reload cycle. Additionally, developers should use `Text(date, style: .timer)` for real-time countdowns rather than scheduling frequent timeline refreshes.

**Score: 100/100**
- [x] Budget limits (40-70/day) and throttling consequences (40/40)
- [x] Pre-generating multi-hour entries in single batch (30/30)
- [x] Text timer style for live countdowns (30/30)

### Average Answer
iOS only gives each widget forty to seventy reloads a day to protect battery. If you use them all up, iOS ignores background reload requests. You can avoid this by creating several entries ahead of time in your timeline. For countdowns, use Text with timer style instead of refreshing.

**Score: 90/100**
- [x] Mentions 40-70 reloads and throttling (36/40)
- [x] Mentions creating multiple entries ahead of time (27/30)
- [x] Mentions Text timer style for countdowns (27/30)

### Weak Answer
You buy additional widget reloads through the Apple Developer subscription portal.

**Score: 0/100**
- [ ] Irrelevant paid subscription claim (0/40)
- [ ] Misses batching strategy (0/30)
- [ ] Misses Text timer style (0/30)

---

## wid-q29 (Code-write: TimelineBuilder)

### Rubric
- Enumerates values array to calculate hourly offsets correctly (30 pts)
- Adds time interval of index * 3600 seconds to the start date (40 pts, key)
- Returns array of tuples pairing calculated Date and Int value (30 pts)

### Good Answer
```swift
import Foundation

struct TimelineBuilder {
    static func buildSchedule(start: Date, values: [Int]) -> [(date: Date, value: Int)] {
        var schedule: [(date: Date, value: Int)] = []
        for (index, val) in values.enumerated() {
            let entryDate = start.addingTimeInterval(Double(index * 3600))
            schedule.append((date: entryDate, value: val))
        }
        return schedule
    }
}
```

**Score: 100/100**
- [x] Enumeration and indexing (30/30)
- [x] Hourly time interval calculation (40/40)
- [x] Tuple array construction and return (30/30)

### Average Answer
```swift
import Foundation

struct TimelineBuilder {
    static func buildSchedule(start: Date, values: [Int]) -> [(date: Date, value: Int)] {
        var schedule: [(date: Date, value: Int)] = []
        var offset = 0.0
        for val in values {
            let entryDate = start.addingTimeInterval(offset)
            schedule.append((date: entryDate, value: val))
            offset += 3600.0
        }
        return schedule
    }
}
```

**Score: 95/100**
- [x] Offsets calculated sequentially (28/30)
- [x] Hourly interval added (38/40)
- [x] Tuples constructed correctly (29/30)

### Weak Answer
```swift
struct TimelineBuilder {
    static func buildSchedule(start: Date, values: [Int]) -> [(date: Date, value: Int)] {
        return [(start, 0)]
    }
}
```

**Score: 15/100**
- [ ] No enumeration of input values (0/30)
- [ ] No hourly offset calculation (0/40)
- [x] Valid tuple return syntax (15/30)

---

## wid-q30 (Code-write: ActionIntentHandler)

### Rubric
- Calculates new total by adding amount to currentCount (50 pts, key)
- Returns formatted string interpolating the updated total (50 pts)

### Good Answer
```swift
import Foundation

struct ActionIntentHandler {
    static func performAction(currentCount: Int, amount: Int) -> String {
        let newTotal = currentCount + amount
        return "Count: \(newTotal)"
    }
}
```

**Score: 100/100**
- [x] Correctly adds amount to currentCount (50/50)
- [x] Formats string properly with updated total (50/50)

### Average Answer
```swift
import Foundation

struct ActionIntentHandler {
    static func performAction(currentCount: Int, amount: Int) -> String {
        return "Count: \(currentCount + amount)"
    }
}
```

**Score: 100/100**
- [x] Inline addition (50/50)
- [x] Formatted string output (50/50)

### Weak Answer
```swift
struct ActionIntentHandler {
    static func performAction(currentCount: Int, amount: Int) -> String {
        return "Count: 0"
    }
}
```

**Score: 20/100**
- [ ] Hardcoded zero instead of calculation (0/50)
- [x] Returns formatted string (20/50)

---

## wid-q31 (Code-write: SharedStorageStore)

### Rubric
- Initializes suiteName property and storage dictionary (40 pts)
- Saves value string into storage dictionary under key (30 pts)
- Retrieves optional string value from storage dictionary safely (30 pts, key)

### Good Answer
```swift
import Foundation

class SharedStorageStore {
    let suiteName: String
    var storage: [String: String] = [:]

    init(suiteName: String) {
        self.suiteName = suiteName
    }

    func setString(value: String, key: String) {
        storage[key] = value
    }

    func getString(key: String) -> String? {
        return storage[key]
    }
}
```

**Score: 100/100**
- [x] Initializer and property setup (40/40)
- [x] Key-value setter implementation (30/30)
- [x] Optional getter implementation (30/30)

### Average Answer
```swift
import Foundation

class SharedStorageStore {
    let suiteName: String
    var storage: [String: String] = [:]

    init(suiteName: String) {
        self.suiteName = suiteName
    }

    func setString(value: String, key: String) {
        storage[key] = value
    }

    func getString(key: String) -> String? {
        if let val = storage[key] {
            return val
        }
        return nil
    }
}
```

**Score: 95/100**
- [x] Initializer and storage (40/40)
- [x] Setter (30/30)
- [x] Verbose unwrapping of dictionary lookup (25/30)

### Weak Answer
```swift
class SharedStorageStore {
    let suiteName: String
    init(suiteName: String) { self.suiteName = suiteName }
    func setString(value: String, key: String) {}
    func getString(key: String) -> String? { return nil }
}
```

**Score: 20/100**
- [x] Class initializer (20/40)
- [ ] No storage saving (0/30)
- [ ] Stubbed nil return (0/30)
