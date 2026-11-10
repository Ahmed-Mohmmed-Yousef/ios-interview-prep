# Rubric Test: On-Device AI with Foundation Models

This document tests the 8 rubric-based questions (5 written, 3 code-write) from `content/topics/foundation-models/questions.json`.
Each question is evaluated with three sample answers: Good, Average, and Weak (24 total evaluations).

---

## fm-q24 (Written: Advantages of on-device models over cloud AI APIs)

### Rubric
- Explains that user prompts and text remain entirely on-device without cloud network transmission (40 pts, key)
- Highlights low latency and full functionality while completely offline (30 pts)
- Notes that running local models incurs zero per-token or server subscription costs (30 pts)

### Good Answer
On-device foundation models provide complete data privacy because user prompts, personal text, and photos never leave the local Apple Silicon hardware. They eliminate network round-trip latency and operate reliably even when the device is completely offline or in airplane mode. Furthermore, executing models locally on the Apple Neural Engine incurs zero per-token API charges or monthly server hosting costs for developers.

**Score: 100/100**
- [x] Total local privacy without network transfer (40/40)
- [x] Low latency and offline execution (30/30)
- [x] Zero per-token and cloud server costs (30/30)

### Average Answer
On-device AI keeps user data on the phone so prompts do not get sent over the internet to cloud servers. The models run fast and work completely offline without internet. There are also no token fees for developers.

**Score: 90/100**
- [x] Prompts remain on device without internet transfer (36/40)
- [x] Mentions fast local speed and offline capability (27/30)
- [x] Mentions no token costs (27/30)

### Weak Answer
On-device models run faster because iPhone screens have higher refresh rates than cloud monitors.

**Score: 0/100**
- [ ] Irrelevant screen refresh rate argument (0/40)
- [ ] Misses privacy architecture (0/30)
- [ ] Misses zero-cost advantage (0/30)

---

## fm-q25 (Written: Private Cloud Compute architecture and privacy)

### Rubric
- Explains that Private Cloud Compute runs larger models on dedicated Apple Silicon servers for heavy queries (40 pts, key)
- Emphasizes that user data is processed statelessly and is never retained or stored in the cloud (30 pts)
- Mentions cryptographically verifiable software and independent security researcher auditability (30 pts)

### Good Answer
Private Cloud Compute handles complex generative requests that exceed on-device compute limits using custom Apple Silicon servers. It processes user data statelessly in memory without ever writing user prompts to disk or retaining data after the request completes. To guarantee privacy, Apple enforces cryptographic attestation so user devices only communicate with servers running publicly auditable, signed software inspected by independent security researchers.

**Score: 100/100**
- [x] Escalation to Apple Silicon servers for heavy queries (40/40)
- [x] Stateless processing with zero data retention (30/30)
- [x] Cryptographic verification and independent researcher audits (30/30)

### Average Answer
Private Cloud Compute uses Apple Silicon servers to run bigger models when the phone cannot handle the request. The servers never store user data and delete everything once the query finishes. Apple also lets security researchers verify the server software.

**Score: 85/100**
- [x] Apple Silicon servers for complex queries (35/40)
- [x] No data retention after processing (25/30)
- [x] Mention of security researcher auditability (25/30)

### Weak Answer
Private Cloud Compute is an iCloud Drive folder where user text is backed up for thirty days.

**Score: 0/100**
- [ ] Inaccurate storage folder claim (0/40)
- [ ] Misses stateless processing (0/30)
- [ ] Misses cryptographic auditability (0/30)

---

## fm-q26 (Written: writingToolsBehavior and disabling with .none)

### Rubric
- Explains that writingToolsBehavior controls how system AI features like rewriting integrate with a text view (40 pts, key)
- Identifies that .none turns off Writing Tools completely for the target text container (30 pts)
- Provides examples of sensitive fields like passwords, security tokens, or code inputs needing .none (30 pts)

### Good Answer
The `writingToolsBehavior` property on `UITextView` and `WKWebView` governs how system Writing Tools interact with text content, supporting modes like `.complete`, `.limited`, or `.none`. Setting the property to `.none` completely disables Writing Tools, preventing inline rewrites, summarization, and proofreading panels. Developers should apply `.none` to sensitive inputs such as password fields, one-time security codes, and credit card entries, as well as code editors where generative alterations would corrupt programming syntax.

**Score: 100/100**
- [x] Controls Writing Tools integration modes (40/40)
- [x] .none disables Writing Tools completely (30/30)
- [x] Concrete examples of sensitive and code fields (30/30)

### Average Answer
writingToolsBehavior lets you configure how Writing Tools works on your text view. Setting it to .none disables all writing tools features. You should use .none on password fields and code editors so the AI does not change sensitive tokens or code syntax.

**Score: 90/100**
- [x] Explains behavior configuration (36/40)
- [x] Explains .none disabling effect (27/30)
- [x] Mentions password and code fields (27/30)

### Weak Answer
It changes the font color of the text view to green during spell checking.

**Score: 0/100**
- [ ] Irrelevant font styling claim (0/40)
- [ ] Misses .none opt-out purpose (0/30)
- [ ] Misses sensitive data protection (0/30)

---

## fm-q27 (Written: Coordinating cloud synchronization during Writing Tools sessions)

### Rubric
- Explains implementing textViewWritingToolsWillBegin to pause background cloud sync and prevent merge conflicts (50 pts, key)
- Explains implementing textViewWritingToolsDidEnd to resume synchronization after AI text changes complete (50 pts)

### Good Answer
When a user activates Writing Tools, developers should implement `textViewWritingToolsWillBegin(_:)` in their `UITextViewDelegate` to pause background synchronization engines like CloudKit or Core Data sync. Pausing synchronization prevents incoming cloud updates from colliding with real-time AI text replacements while the model rewrites content. When the session finishes, the system calls `textViewWritingToolsDidEnd(_:)`, where the application safely resumes synchronization and persists the finalized text state to storage.

**Score: 100/100**
- [x] textViewWritingToolsWillBegin pauses sync to prevent merge conflicts (50/50)
- [x] textViewWritingToolsDidEnd resumes sync and persists changes (50/50)

### Average Answer
You should use textViewWritingToolsWillBegin to stop cloud sync while the AI is rewriting text so there are no conflicts. When the writing tools finish, textViewWritingToolsDidEnd runs, and you can turn cloud synchronization back on.

**Score: 85/100**
- [x] WillBegin pauses sync to avoid conflicts (45/50)
- [x] DidEnd resumes sync (40/50)

### Weak Answer
You should disconnect the device from Wi-Fi manually in device Settings.

**Score: 0/100**
- [ ] Unacceptable manual user action (0/50)
- [ ] Misses delegate lifecycle callbacks (0/50)

---

## fm-q28 (Written: Asynchronous model inference and Swift concurrency)

### Rubric
- Explains that synchronous inference blocks the main thread, causing frame drops and unresponsive UI (50 pts, key)
- Explains using async/await and Task to offload heavy computation to background threads smoothly (50 pts)

### Good Answer
Machine learning inference on foundation models requires intensive tensor computation on the Apple Neural Engine and GPU. Executing inference synchronously on the main thread blocks the main run loop, resulting in dropped frames, hitching animations, and an unresponsive user interface. By using Swift concurrency with `async`/`await` and background `Task` dispatch, developers offload token generation and NLP processing off `@MainActor`, keeping the UI perfectly fluid while streaming results.

**Score: 100/100**
- [x] Synchronous inference main thread blocking and hitching (50/50)
- [x] Swift concurrency async/await and background Task offloading (50/50)

### Average Answer
Running AI inference on the main thread freezes the app and causes stuttering animations because the Neural Engine is busy computing. Using async and await lets the model run in the background so the user interface stays responsive.

**Score: 85/100**
- [x] Main thread freezing and stuttering (45/50)
- [x] async/await background offloading for UI responsiveness (40/50)

### Weak Answer
Async functions allow models to access external quantum computing cloud nodes.

**Score: 0/100**
- [ ] Fictional quantum computing claim (0/50)
- [ ] Misses main thread blocking rationale (0/50)

---

## fm-q29 (Code-write: SentimentClassifier)

### Rubric
- Returns "positive" when score is strictly greater than 0.1 (40 pts, key)
- Returns "negative" when score is strictly less than -0.1 (30 pts)
- Returns "neutral" for scores within the range -0.1 to 0.1 inclusive (30 pts)

### Good Answer
```swift
import Foundation

struct SentimentClassifier {
    func classify(score: Double) -> String {
        if score > 0.1 {
            return "positive"
        } else if score < -0.1 {
            return "negative"
        }
        return "neutral"
    }
}
```

**Score: 100/100**
- [x] Positive condition > 0.1 (40/40)
- [x] Negative condition < -0.1 (30/30)
- [x] Neutral default fallback (30/30)

### Average Answer
```swift
import Foundation

struct SentimentClassifier {
    func classify(score: Double) -> String {
        if score > 0.1 {
            return "positive"
        }
        if score < -0.1 {
            return "negative"
        }
        return "neutral"
    }
}
```

**Score: 100/100**
- [x] Correct positive check (40/40)
- [x] Correct negative check (30/30)
- [x] Neutral return (30/30)

### Weak Answer
```swift
struct SentimentClassifier {
    func classify(score: Double) -> String {
        return "positive"
    }
}
```

**Score: 20/100**
- [ ] No score branching (0/40)
- [ ] No negative handling (0/30)
- [x] Valid method signature returning String (20/30)

---

## fm-q30 (Code-write: CloudSyncManager)

### Rubric
- Declares isSyncingPaused boolean property initialized to false (30 pts)
- Sets isSyncingPaused to true inside pauseSyncForWritingTools (40 pts, key)
- Sets isSyncingPaused to false inside resumeSyncAfterWritingTools (30 pts)

### Good Answer
```swift
import Foundation

class CloudSyncManager {
    var isSyncingPaused = false

    func pauseSyncForWritingTools() {
        isSyncingPaused = true
    }

    func resumeSyncAfterWritingTools() {
        isSyncingPaused = false
    }
}
```

**Score: 100/100**
- [x] Property initialized to false (30/30)
- [x] pause method sets property to true (40/40)
- [x] resume method sets property to false (30/30)

### Average Answer
```swift
import Foundation

class CloudSyncManager {
    var isSyncingPaused: Bool = false

    func pauseSyncForWritingTools() {
        self.isSyncingPaused = true
    }

    func resumeSyncAfterWritingTools() {
        self.isSyncingPaused = false
    }
}
```

**Score: 100/100**
- [x] Initialized property (30/30)
- [x] Pause setter (40/40)
- [x] Resume setter (30/30)

### Weak Answer
```swift
class CloudSyncManager {
    var isSyncingPaused = true
    func pauseSyncForWritingTools() {}
    func resumeSyncAfterWritingTools() {}
}
```

**Score: 15/100**
- [ ] Initialized to true instead of false (0/30)
- [ ] Empty pause method (0/40)
- [ ] Empty resume method (0/30)
- [x] Class with boolean property (15/30)

---

## fm-q31 (Code-write: generateAsyncSummary)

### Rubric
- Declares async function accepting array of String and returning String (40 pts, key)
- Prefixes result with "Summary:" string (30 pts)
- Iterates through sentences appending each with a separating space (30 pts)

### Good Answer
```swift
import Foundation

func generateAsyncSummary(sentences: [String]) async -> String {
    var summary = "Summary:"
    for sentence in sentences {
        summary += " " + sentence
    }
    return summary
}
```

**Score: 100/100**
- [x] Async function signature (40/40)
- [x] Prefix "Summary:" (30/30)
- [x] Space-separated sentence concatenation (30/30)

### Average Answer
```swift
import Foundation

func generateAsyncSummary(sentences: [String]) async -> String {
    let joined = sentences.joined(separator: " ")
    return "Summary: " + joined
}
```

**Score: 100/100**
- [x] Async signature (40/40)
- [x] Prefix format (30/30)
- [x] Array joining with spaces (30/30)

### Weak Answer
```swift
func generateAsyncSummary(sentences: [String]) -> String {
    return "Summary:"
}
```

**Score: 20/100**
- [ ] Not an async function (0/40)
- [x] Returns prefix (20/30)
- [ ] Sentences ignored (0/30)
