# Rubric Test — Communication Patterns (Step 5)

Run 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** Delegates vs closures comparison and memory management | **Good:** Explains delegates are formal 1-to-1 contracts for multiple events or two-way queries with `weak var` and `AnyObject`, while closures handle single asynchronous callbacks with `[weak self]`. | 100 | Yes | Pass (100%) |
| | **Average:** "Delegates use protocols for multiple events with weak references. Closures handle single callbacks and need weak self." | 85 | Yes | Pass (85%) |
| | **Weak:** "Delegates run on the CPU while closures run on the GPU." | 0 | No | Fail (0%) |
| **q25** NotificationCenter use cases and architectural risks | **Good:** Defines NotificationCenter as a 1-to-many broadcast mechanism for decoupled events like user sign-out; notes synchronous caller thread delivery causing UI crashes and memory leaks from unremoved tokens. | 100 | Yes | Pass (100%) |
| | **Average:** "NotificationCenter broadcasts events to many listeners like user logout. You must remove tokens and remember it posts synchronously." | 85 | Yes | Pass (85%) |
| | **Weak:** "NotificationCenter sends push notifications over the cellular network." | 0 | No | Fail (0%) |
| **q26** Retain cycles in delegates and closures | **Good:** Explains parent-child retain cycle when child holds strong delegate to parent, fixed by `weak var` on `AnyObject` protocol; explains closure retain cycle when object stores escaping closure capturing `self`, fixed by `[weak self]`. | 100 | Yes | Pass (100%) |
| | **Average:** "Strong delegates cause retain cycles between two objects, so use weak. Closures that capture self in a stored property need weak self." | 80 | Yes | Pass (80%) |
| | **Weak:** "Retain cycles happen when a variable is named after a keyword." | 0 | No | Fail (0%) |
| **q27** Synchronous delivery in NotificationCenter and threading bugs | **Good:** Explains notifications run synchronously on the posting thread; if a background thread posts, observer code runs in the background, risking crashes if UI updates are not dispatched to main. | 100 | Yes | Pass (100%) |
| | **Average:** "Notifications deliver immediately on the thread that called post. If background code posts, UI code in observers will crash without main queue dispatch." | 85 | Yes | Pass (85%) |
| | **Weak:** "Notifications only run when the app enters the background." | 0 | No | Fail (0%) |
| **q28** Modern Swift concurrency for notifications and callbacks | **Good:** Explains `NotificationCenter.default.notifications(named:)` returns an `AsyncSequence` consumed via `for await` with automatic task cancellation; explains async/await replaces nested escaping completion closures. | 100 | Yes | Pass (100%) |
| | **Average:** "Swift concurrency provides async sequences for notifications so you do not need tokens, and async/await replaces completion closures." | 85 | Yes | Pass (85%) |
| | **Weak:** "Concurrency deletes NotificationCenter from iOS entirely." | 0 | No | Fail (0%) |
| **q29** `ScoreDelegate` protocol and `GameSession` class | **Good:** Protocol conforms to `AnyObject` with `scoreDidUpdate(newScore: Int)`, class holds `weak var delegate: ScoreDelegate?`, and `addPoints` updates score and calls delegate. | 100 | Yes | Pass (100%) |
| | **Average:** Protocol and class implemented correctly, but omits `weak` on the delegate variable. | 60 | No | Fail (60% - capped by key criterion) |
| | **Weak:** Protocol not constrained to `AnyObject`, invalid syntax, no delegate invocation. | 20 | No | Fail (20%) |
| **q30** `loadUser(valid:completion:)` with `Result` type | **Good:** Method takes boolean and `@escaping` completion closure, invoking `.success("Dana")` or `.failure(.badURL)` correctly. | 100 | Yes | Pass (100%) |
| | **Average:** Handles success and failure, but forgets `@escaping` keyword or passes raw string instead of Result. | 60 | No | Fail (60%) |
| | **Weak:** Does not define completion handler closure. | 0 | No | Fail (0%) |
| **q31** `PurchaseNotifier` with token, listen, post, stop | **Good:** Listens for `itemPurchased`, extracts item from `userInfo`, posts with `userInfo`, and removes observer token in `stop()`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements post and listen correctly, but fails to store or remove the observer token in `stop()`. | 60 | No | Fail (60%) |
| | **Weak:** Missing observer registration and notification posting. | 10 | No | Fail (10%) |

---

## Verdict

The rubrics successfully:
1. Validate clear differentiation between 1-to-1 delegates, 1-to-1 closures, and 1-to-many notifications.
2. Verify understanding of ARC memory management (`weak var`, `AnyObject`, `[weak self]`).
3. Check awareness of NotificationCenter synchronous thread delivery and UI threading hazards.
4. Reinforce observer token lifetime management and modern Swift AsyncSequence alternatives.
5. Grade Swift 6 code implementations accurately against explicit functional criteria.
