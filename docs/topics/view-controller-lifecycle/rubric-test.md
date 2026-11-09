# Rubric Test — View Controller Lifecycle (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** `viewDidLoad` vs `viewWillAppear` | **Good:** Explains viewDidLoad runs once for one-time subview creation and Auto Layout constraints; viewWillAppear runs on every appearance for fresh data reloading and dynamic UI updates. | 100 | Yes | Pass (100%) |
| | **Average:** "viewDidLoad runs once when loading views, and viewWillAppear runs every time the screen is about to appear." | 85 | Yes | Pass (85%) |
| | **Weak:** "viewDidLoad runs on background threads and viewWillAppear runs on the main thread." | 0 | No | Fail (0%) |
| **q25** Frame finalization in `viewDidLayoutSubviews` | **Good:** Explains frames are placeholder or zero in viewDidLoad before Auto Layout completes; viewDidLayoutSubviews is the correct place where final bounds and geometry are applied. | 100 | Yes | Pass (100%) |
| | **Average:** "Frames are not final in viewDidLoad, so you must update corner radius in viewDidLayoutSubviews." | 85 | Yes | Pass (85%) |
| | **Weak:** "You calculate corner radius in init before views are added." | 0 | No | Fail (0%) |
| **q26** Tasks in `viewWillDisappear` and `viewDidDisappear` | **Good:** Explains viewWillDisappear dismisses keyboard, pauses video/audio, and stops timers; viewDidDisappear stops sensors and tears down heavy off-screen tasks. | 100 | Yes | Pass (100%) |
| | **Average:** "viewWillDisappear hides the keyboard and pauses timers, and viewDidDisappear stops background tracking." | 85 | Yes | Pass (85%) |
| | **Weak:** "viewWillDisappear removes all subviews from memory." | 0 | No | Fail (0%) |
| **q27** Calling `super` in lifecycle methods | **Good:** Explains UIKit relies on super calls to maintain internal transition state machine; enables forwarding events to child controllers and sending VoiceOver accessibility notifications. | 100 | Yes | Pass (100%) |
| | **Average:** "You must call super so UIKit can manage screen transitions and coordinate child controllers." | 85 | Yes | Pass (85%) |
| | **Weak:** "Calling super is optional and only needed in Swift 4." | 0 | No | Fail (0%) |
| **q28** `deinit` and memory leak diagnostics | **Good:** Defines deinit as destructor called by ARC when memory is reclaimed; failure to run deinit indicates a memory retain cycle from strong delegates or closures capturing self. | 100 | Yes | Pass (100%) |
| | **Average:** "deinit runs when the controller is destroyed. If it does not run, you have a retain cycle in closures." | 85 | Yes | Pass (85%) |
| | **Weak:** "deinit runs automatically every time the app enters the background." | 0 | No | Fail (0%) |
| **q29** `TrackedVC` subclass | **Good:** Declares `class TrackedVC: UIViewController` with `events: [String] = []`, appending `"load"` in `viewDidLoad` and `"appear"` in `viewWillAppear`, calling `super` in both. | 100 | Yes | Pass (100%) |
| | **Average:** Overrides both methods and appends strings, but forgets `super.viewWillAppear(animated)`. | 70 | Yes | Pass (70%) |
| | **Weak:** Fails to inherit from UIViewController or does not record events. | 30 | No | Fail (30%) |
| **q30** `TeardownVC` stopping timer | **Good:** Declares `class TeardownVC: UIViewController` with `timerRunning: Bool = true`, overriding `viewWillDisappear` to call `super` and set `timerRunning = false`. | 100 | Yes | Pass (100%) |
| | **Average:** Sets timerRunning to false in `viewDidDisappear` instead of `viewWillDisappear`. | 70 | Yes | Pass (70%) |
| | **Weak:** Does not modify timerRunning property or fails to compile. | 25 | No | Fail (25%) |
| **q31** `RoundedButtonVC` corner radius | **Good:** Declares `class RoundedButtonVC: UIViewController` with `button: UIButton`, overriding `viewDidLayoutSubviews` to call `super` and set `button.layer.cornerRadius = button.bounds.height / 2`. | 100 | Yes | Pass (100%) |
| | **Average:** Configures corner radius in `viewDidLoad` instead of `viewDidLayoutSubviews`. | 70 | Yes | Pass (70%) |
| | **Weak:** Hardcodes a fixed number without using bounds height or does not call super. | 40 (capped) | No | Fail (40%) |

---

## Verdict

The rubrics successfully:
1. Differentiate one-time setup (`viewDidLoad`) from repeatable appearance (`viewWillAppear`).
2. Test understanding of layout passes and frame finalization in `viewDidLayoutSubviews`.
3. Check teardown practices (keyboard dismissal, timers) in `viewWillDisappear`.
4. Validate `super` call compliance and `deinit` leak detection.
5. Verify code implementation of lifecycle overrides and layer geometry updates.
