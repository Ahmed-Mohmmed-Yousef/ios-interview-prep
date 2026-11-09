# Rubric Test — App and Scene Lifecycle (Step 5)

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
| **q24** Foreground Inactive vs Background | **Good:** Explains Foreground Inactive means the app is visible on screen but cannot receive touch events, giving an example like an incoming call banner or Face ID prompt; contrasts with Background where the app is hidden and has a brief window to save data before suspension. | 100 | Yes | Pass (100%) |
| | **Average:** "Inactive is visible but paused by a phone call. Background means the app is closed and hidden." | 80 | Yes | Pass (80%) |
| | **Weak:** "Inactive means the app crashed. Background is when push notifications arrive." | 0 | No | Fail (0%) |
| **q25** `UISceneDelegate` introduction and role separation | **Good:** Explains Apple introduced `UISceneDelegate` in iOS 13 to support multiple independent windows for one process; contrasts process duties in `UIApplicationDelegate` (launch, push tokens, background tasks) with window lifecycle in `UISceneDelegate` (active, inactive, background). | 100 | Yes | Pass (100%) |
| | **Average:** "UISceneDelegate allows multiple windows on iPad. AppDelegate handles the main app launch." | 75 | Yes | Pass (75%) |
| | **Weak:** "UISceneDelegate was made to replace Core Data with SwiftData." | 0 | No | Fail (0%) |
| **q26** Avoiding `applicationWillTerminate` for data persistence | **Good:** Explains that suspended apps in the background can be terminated silently by iOS under memory pressure without executing termination callbacks; states that critical user state must be persisted as soon as the scene moves into the background. | 100 | Yes | Pass (100%) |
| | **Average:** "The system can kill background apps without calling willTerminate, so save earlier in the background." | 80 | Yes | Pass (80%) |
| | **Weak:** "applicationWillTerminate is deprecated in Swift 6." | 0 | No | Fail (0%) |
| **q27** SwiftUI scene lifecycle and monitoring | **Good:** Mentions the `@Environment(\.scenePhase)` property wrapper and its values (`.active`, `.inactive`, `.background`); explains using `.onChange(of: scenePhase)` to respond to state changes and persist state on `.background`. | 100 | Yes | Pass (100%) |
| | **Average:** "SwiftUI uses scenePhase in the environment to check if the app is active or in background." | 75 | Yes | Pass (75%) |
| | **Weak:** "SwiftUI uses viewWillAppear and viewDidDisappear to check lifecycles." | 0 | No | Fail (0%) |
| **q28** iOS watchdog timer, startup triggers, and prevention | **Good:** Defines the watchdog timer as an OS monitor that kills apps blocking the main thread during startup for more than ~20 seconds; explains keeping `didFinishLaunchingWithOptions` minimal and dispatching heavy operations asynchronously. | 100 | Yes | Pass (100%) |
| | **Average:** "The watchdog kills the app if launch takes too long. Run heavy tasks on background threads." | 85 | Yes | Pass (85%) |
| | **Weak:** "The watchdog timer restarts the phone if memory leaks exist." | 0 | No | Fail (0%) |
| **q29** `SceneStatusChecker` isInteractive method | **Good:** Declares `struct SceneStatusChecker` with `static func isInteractive(phase: ScenePhase) -> Bool` returning `phase == .active`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements method returning true, but uses a verbose switch statement with unhandled default. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns constant true without checking the phase parameter. | 25 | No | Fail (25%) |
| **q30** `LifecycleCoordinator` updateState method | **Good:** Declares `struct LifecycleCoordinator` with `var isSaved: Bool = false` and `mutating func updateState(event: String) -> String` setting `isSaved = true` when event is "background". | 100 | Yes | Pass (100%) |
| | **Average:** Implements method, but omits the mutating keyword or fails to return the required string. | 60 | Yes | Fail (60%) |
| | **Weak:** Does not store or update `isSaved` property. | 20 | No | Fail (20%) |
| **q31** `MultiWindowManager` countActiveScenes method | **Good:** Declares `class MultiWindowManager` with `func countActiveScenes(states: [UIScene.ActivationState]) -> Int` filtering and counting `.foregroundActive` elements. | 100 | Yes | Pass (100%) |
| | **Average:** Uses a manual for loop that counts elements, with minor syntax inefficiency. | 80 | Yes | Pass (80%) |
| | **Weak:** Returns array length without filtering for `.foregroundActive`. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Assess understanding of Foreground Inactive interruptions versus Background visibility.
2. Verify understanding of multi-window scene delegation split from process-level `UIApplicationDelegate`.
3. Validate comprehension of silent background process purges and avoiding `applicationWillTerminate`.
4. Check proficiency with SwiftUI declarative lifecycle via `@Environment(\.scenePhase)`.
5. Test knowledge of watchdog timer limits and asynchronous launch routines.
6. Validate clean Swift 6 implementations for phase checking, mutating state transitions, and multi-scene filtering.
