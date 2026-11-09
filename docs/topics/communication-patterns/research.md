# Research: Communication Patterns (Delegates, Closures and Notifications)

## 1. Core Concepts & Technical Facts

### The Problem
Objects in an iOS app must talk to each other without creating tight coupling or retain cycles. Apple frameworks and iOS app architecture rely on three primary communication patterns:
1. **Delegation** (1-to-1, structured contract)
2. **Closures** (1-to-1, lightweight event / completion)
3. **NotificationCenter** (1-to-many broadcast)

### Comparison Matrix

| Feature | Delegate | Closure | NotificationCenter |
|---|---|---|---|
| **Relationship** | 1-to-1 (one sender to one delegate) | 1-to-1 (one caller to one handler) | 1-to-many (one poster to zero or many observers) |
| **Coupling** | Loose (coupled via protocol contract) | Loose (coupled via function signature) | Very loose (decoupled, sender knows nothing of observers) |
| **Return Values** | Two-way: delegate can return values back (e.g. `shouldSelect`) | Two-way: closure can return values or receive parameters | One-way: sender cannot receive values back from observers |
| **Multiple Events** | Grouped into a single protocol | Separate closure property per event | Distinct notification names |
| **Memory Risk** | Retain cycle if delegate is strong (`weak var` required) | Retain cycle if closure captures `self` strongly (`[weak self]`) | Retain cycle if observer block captures `self` strongly; leak if token is not removed |
| **Delivery Thread** | Runs on caller thread synchronously | Runs on caller thread synchronously | Delivered on posting thread synchronously |

### Deep Dive: Delegation
- **Protocol Definition**: Constrained to `AnyObject` (`protocol FeedViewDelegate: AnyObject`) so that the property holding it can be marked `weak`.
- **Reference**: `weak var delegate: FeedViewDelegate?`. If marked strong, parent owning child and acting as child delegate creates an instant retain cycle.
- **Two-way flow**: The delegator asks questions (`shouldDeleteRowAt`) or reports events (`didSelectRowAt`).
- **Standard Apple usage**: `UITableViewDelegate`, `CLLocationManagerDelegate`, `UITextFieldDelegate`.

### Deep Dive: Closures
- Single callbacks, completion handlers, or event closures.
- Escaping closures (`@escaping`) outlive the call and are stored in properties or passed to async dispatch.
- Capture list: `[weak self]` prevents retain cycle when storing a closure on an object that references `self`.
- Modern Swift: SwiftUI heavily favors closures (`Button(action: { ... })`).

### Deep Dive: NotificationCenter
- Broadcast mechanism managed by `NotificationCenter.default`.
- **Posting**: `NotificationCenter.default.post(name: .userDidSignOut, object: nil, userInfo: ["reason": "manual"])`.
- **Observing**:
  1. Traditional selector-based: `NotificationCenter.default.addObserver(self, selector: #selector(handleSignOut), name: .userDidSignOut, object: nil)`.
  2. Block-based: `let token = NotificationCenter.default.addObserver(forName: .userDidSignOut, object: nil, queue: .main) { [weak self] note in ... }`.
  3. Swift AsyncSequence: `for await notification in NotificationCenter.default.notifications(named: .userDidSignOut) { ... }`.
- **Crucial Delivery Rule**: `NotificationCenter.default.post` runs observer callbacks **synchronously on the poster's current thread**. If background task posts, observers run on the background thread.
- **Observer Cleanup**: Block-based tokens (`NSObjectProtocol`) must be retained and removed via `NotificationCenter.default.removeObserver(token)`.

---

## 2. Common Misconceptions & Interview Traps

1. **"Delegates can be strong references"**:
   - *Trap*: Omitting `weak` on the delegate variable.
   - *Reality*: If object A creates object B and sets `B.delegate = A`, a strong delegate creates a retain cycle: A -> B -> A. Neither deallocates.
2. **"NotificationCenter delivers on the main thread automatically"**:
   - *Trap*: Updating UI inside an observer without checking thread.
   - *Reality*: Notifications are delivered synchronously on the thread where `post()` was called. If posted on a background queue, the observer runs on that background queue.
3. **"NotificationCenter observer tokens clean themselves up automatically"**:
   - *Trap*: Ignoring the return value of `addObserver(forName:object:queue:using:)`.
   - *Reality*: The block-based token retains memory and continues to receive events until `NotificationCenter.default.removeObserver(token)` is called.
4. **"Notifications can return values to the sender"**:
   - *Trap*: Trying to get a boolean approval or user decision via NotificationCenter.
   - *Reality*: Notifications are one-way broadcast fire-and-forget. Use delegates or closures when a response or data query is needed.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "Delegates, closures, and notifications are three ways objects send messages in iOS. A delegate is a one-to-one link where an object talks to a helper through a protocol. It needs a weak property to avoid memory leaks. Closures are blocks of code passed as callbacks for single tasks like network downloads. Notifications are one-to-many broadcasts where any part of the app can listen without knowing the sender."
- **Junior**:
  - "I choose between them based on relationship and data flow. For one-to-one communication with multiple events or two-way questions, like a table view asking if a row can be deleted, I use a delegate protocol with `AnyObject` and a `weak` reference. For a single event or completion handler, I use a closure with `[weak self]`. For one-to-many decoupled events, like a user logging out or keyboard appearing, I use `NotificationCenter`. I remember that notifications post synchronously on the caller's thread, so UI work in observers must run on the main queue."
- **Senior**:
  - "In modern iOS architecture, we evaluate coupling, testability, and concurrency. Delegates provide explicit, mockable contracts with compile-time type safety. Closures reduce boilerplate for asynchronous pipelines and integrate cleanly with Combine and Swift concurrency. NotificationCenter provides broadcast capabilities but lacks compile-time safety on payload dictionaries and obscures dependency graphs. For notifications in Swift 6, we prefer typed notifications using `NotificationCenter.default.notifications(named:)` with AsyncAlgorithms, avoiding manual token de-registration and ensuring thread isolation across actors."
