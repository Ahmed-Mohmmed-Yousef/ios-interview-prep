# Rubric Test: Push and Local Notifications

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/notifications/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## notif-q24 (Written: Local vs Push Notifications)

### Rubric
- Explains that local notifications are scheduled on device with time, calendar, or location triggers (50 pts, key)
- Explains that push notifications originate from a backend server and route through APNs to the device (50 pts, key)

### Good Answer
Local notifications are scheduled directly on the device by your client application code. They utilize on-device triggers like time intervals, specific calendar dates, or geographical boundary changes, functioning without internet connectivity. In contrast, push notifications originate on your backend server. The server packages a JSON payload and dispatches it over HTTP/2 to Apple Push Notification service (APNs), which routes and delivers it to the target device.

**Score: 100/100**
- [x] Explains local notifications and on-device triggers (50/50)
- [x] Explains push notifications and server APNs routing (50/50)

### Average Answer
Local notifications are scheduled on the device using time or calendar triggers without needing the internet. Push notifications are sent from your server through Apple APNs to the phone.

**Score: 85/100**
- [x] Mentions on-device scheduling (45/50)
- [x] Mentions server and APNs delivery (40/50)

### Weak Answer
Local notifications display text, but push notifications are only for playing MP3 sound effects.

**Score: 0/100**
- [ ] Inaccurate sound distinction (0/50)
- [ ] Misses APNs and scheduling architecture (0/50)

---

## notif-q25 (Written: Remote Push Registration Lifecycle)

### Rubric
- Mentions requesting user authorization and calling registerForRemoteNotifications (50 pts, key)
- Mentions receiving the device token in the app delegate and uploading it to the backend server (50 pts, key)

### Good Answer
The push registration lifecycle begins when the app requests authorization for alerts, badges, and sounds using `UNUserNotificationCenter`, followed by calling `UIApplication.shared.registerForRemoteNotifications()`. iOS connects to APNs to generate an opaque device token, which it delivers to `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`. The app formats this binary data as a hexadecimal string and uploads it to its backend server so the server can address targeted push payloads to that device.

**Score: 100/100**
- [x] Authorization and registerForRemoteNotifications (50/50)
- [x] Device token delivery and backend upload (50/50)

### Average Answer
The app asks the user for permission and calls registerForRemoteNotifications. APNs sends back a device token to the app delegate, and the app sends that token to the server.

**Score: 85/100**
- [x] Mentions permission and registration call (45/50)
- [x] Mentions receiving token and sending to server (40/50)

### Weak Answer
The user types their phone number into a text field and APNs sends an SMS text message.

**Score: 0/100**
- [ ] Confuses APNs with SMS telephony (0/50)
- [ ] Misses token registration ceremony (0/50)

---

## notif-q26 (Written: Foreground Banner Presentation)

### Rubric
- Mentions setting the UNUserNotificationCenter delegate (50 pts, key)
- Explains implementing userNotificationCenter(_:willPresent:withCompletionHandler:) and calling the handler with presentation options (50 pts, key)

### Good Answer
By default, iOS suppresses visual banners when a notification arrives while the app is actively in the foreground. To present banners, you must assign an object as the `delegate` of `UNUserNotificationCenter.current()`. Then implement `userNotificationCenter(_:willPresent:withCompletionHandler:)` and invoke the completion handler with the desired presentation options, such as `[.banner, .sound]`.

**Score: 100/100**
- [x] Assigning UNUserNotificationCenter delegate (50/50)
- [x] Implementing willPresent and calling completion handler (50/50)

### Average Answer
You have to set the UNUserNotificationCenter delegate and implement the willPresent method. In that method, call the completion handler with .banner so it shows on screen.

**Score: 85/100**
- [x] Mentions setting center delegate (45/50)
- [x] Mentions willPresent and completion handler (40/50)

### Weak Answer
You set the view background to clear color so the lock screen banner shows through.

**Score: 0/100**
- [ ] Inaccurate rendering claim (0/50)
- [ ] Misses delegate and willPresent APIs (0/50)

---

## notif-q27 (Written: Notification Service Extension)

### Rubric
- Explains that it intercepts remote notifications to download media or decrypt payloads before display (50 pts, key)
- Identifies that it is triggered by setting mutable-content to 1 in the aps payload (50 pts, key)

### Good Answer
A `UNNotificationServiceExtension` is an out-of-process app extension that intercepts remote notifications before they are displayed to the user. It is triggered by including `"mutable-content": 1` in the `aps` dictionary of the push payload. Within a roughly 30-second execution window, the extension can download rich media attachments like images or decrypt end-to-end encrypted notification content before presenting the final banner.

**Score: 100/100**
- [x] Intercepts to download media or decrypt payloads (50/50)
- [x] Triggered by mutable-content: 1 in aps (50/50)

### Average Answer
It is an extension that wakes up when mutable-content is 1 in the payload. It has about 30 seconds to download photos or decrypt messages before showing the alert.

**Score: 85/100**
- [x] Mentions downloading media and decryption (45/50)
- [x] Mentions mutable-content trigger (40/50)

### Weak Answer
It is a background cron job that runs continuously on Apple Watch.

**Score: 0/100**
- [ ] Inaccurate cron job claim (0/50)
- [ ] Misses payload interception and trigger (0/50)

---

## notif-q28 (Written: Silent Push Limitations)

### Rubric
- Explains that silent pushes wake the app in the background without user alerts using content-available: 1 (50 pts, key)
- Discusses system throttling based on battery, Low Power Mode, and user usage patterns (50 pts, key)

### Good Answer
Silent push notifications contain `"content-available": 1` and omit alert strings, waking the app in the background via `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)` without displaying a banner or playing audio. While effective for quiet background data synchronization, iOS aggressively throttles silent pushes based on battery level, Low Power Mode, and user engagement metrics. Consequently, silent pushes cannot be relied upon for mission-critical or real-time delivery.

**Score: 100/100**
- [x] Explains silent wake with content-available: 1 (50/50)
- [x] Discusses throttling, Low Power Mode, and non-guaranteed delivery (50/50)

### Average Answer
Silent pushes have content-available set to 1 and wake up the app to download data without showing a banner. However, iOS throttles them when battery is low or the user is not opening the app often.

**Score: 85/100**
- [x] Mentions content-available background wake (45/50)
- [x] Mentions iOS throttling and low battery (40/50)

### Weak Answer
Silent pushes are notifications where the volume slider is turned down to zero decibels.

**Score: 0/100**
- [ ] Inaccurate volume claim (0/50)
- [ ] Misses background execution and power throttling (0/50)

---

## notif-q29 (Code-Write: HexTokenConverter)

### Rubric
- Declares HexTokenConverter struct (35 pts, key)
- Implements convert formatting bytes into joined lowercase hex string (35 pts, key)
- Prints exact output 'Hex: aabbcc' (30 pts, key)

### Good Answer
```swift
import Foundation

struct HexTokenConverter {
    func convert(bytes: [UInt8]) -> String {
        bytes.map { String(format: "%02x", $0) }.joined()
    }
}

func testConverter() {
    let converter = HexTokenConverter()
    print("Hex: \(converter.convert(bytes: [0xaa, 0xbb, 0xcc]))")
}

testConverter()
```
**Score: 100/100**
- [x] Declares struct (35/35)
- [x] Implements byte conversion to lowercase hex (35/35)
- [x] Prints 'Hex: aabbcc' (30/30)

### Average Answer
```swift
import Foundation

struct HexTokenConverter {
    func convert(bytes: [UInt8]) -> String {
        var str = ""
        for b in bytes {
            str += String(format: "%02x", b)
        }
        return str
    }
}

func testConverter() {
    let c = HexTokenConverter()
    print("Hex: \(c.convert(bytes: [0xaa, 0xbb, 0xcc]))")
}

testConverter()
```
**Score: 90/100**
- [x] Declares struct (30/35)
- [x] Implements byte formatting (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct HexTokenConverter {
    func convert() -> String { "aabbcc" }
}
```
**Score: 10/100**
- [ ] Missing bytes parameter (5/35)
- [ ] Hardcoded string instead of hex formatting (5/35)
- [ ] Missing test runner (0/30)

---

## notif-q30 (Code-Write: NotificationPayloadValidator)

### Rubric
- Declares NotificationPayloadValidator with maxPayloadBytes set to 4096 (35 pts, key)
- Implements isValidSize comparing payloadSize to maxPayloadBytes (35 pts, key)
- Prints exact output 'Valid: true' (30 pts, key)

### Good Answer
```swift
struct NotificationPayloadValidator {
    var maxPayloadBytes: Int = 4096

    func isValidSize(payloadSize: Int) -> Bool {
        payloadSize <= maxPayloadBytes
    }
}

func testValidator() {
    let validator = NotificationPayloadValidator()
    let result = validator.isValidSize(payloadSize: 2048)
    print("Valid: \(result)")
}

testValidator()
```
**Score: 100/100**
- [x] Declares struct with 4096 constant (35/35)
- [x] Implements comparison (35/35)
- [x] Prints 'Valid: true' (30/30)

### Average Answer
```swift
struct NotificationPayloadValidator {
    let maxPayloadBytes = 4096

    func isValidSize(payloadSize: Int) -> Bool {
        if payloadSize <= 4096 { return true }
        return false
    }
}

func testValidator() {
    let v = NotificationPayloadValidator()
    print("Valid: \(v.isValidSize(payloadSize: 2048))")
}

testValidator()
```
**Score: 90/100**
- [x] Declares struct and property (30/35)
- [x] Implements size check (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct NotificationPayloadValidator {
    func isValidSize() -> Bool { true }
}
```
**Score: 10/100**
- [ ] Missing maxPayloadBytes property (5/35)
- [ ] Missing parameter and comparison (5/35)
- [ ] Missing test runner (0/30)

---

## notif-q31 (Code-Write: TriggerIntervalEvaluator)

### Rubric
- Declares TriggerIntervalEvaluator struct (35 pts, key)
- Implements isValidInterval checking 60.0 second threshold when repeats is true (35 pts, key)
- Prints exact output 'Allowed: false' (30 pts, key)

### Good Answer
```swift
struct TriggerIntervalEvaluator {
    func isValidInterval(seconds: Double, repeats: Bool) -> Bool {
        if repeats {
            return seconds >= 60.0
        }
        return seconds > 0.0
    }
}

func testEvaluator() {
    let evaluator = TriggerIntervalEvaluator()
    let result = evaluator.isValidInterval(seconds: 30.0, repeats: true)
    print("Allowed: \(result)")
}

testEvaluator()
```
**Score: 100/100**
- [x] Declares struct (35/35)
- [x] Checks 60.0s when repeats is true (35/35)
- [x] Prints 'Allowed: false' (30/30)

### Average Answer
```swift
struct TriggerIntervalEvaluator {
    func isValidInterval(seconds: Double, repeats: Bool) -> Bool {
        repeats ? seconds >= 60.0 : seconds > 0.0
    }
}

func testEvaluator() {
    let e = TriggerIntervalEvaluator()
    print("Allowed: \(e.isValidInterval(seconds: 30.0, repeats: true))")
}

testEvaluator()
```
**Score: 90/100**
- [x] Declares struct (30/35)
- [x] Implements ternary check (30/35)
- [x] Correct output (30/30)

### Weak Answer
```swift
struct TriggerIntervalEvaluator {
    func isValidInterval() -> Bool { false }
}
```
**Score: 10/100**
- [ ] Missing parameters (5/35)
- [ ] Hardcoded boolean (5/35)
- [ ] Missing test runner (0/30)
