# Rubric Test — The Main Thread (Step 5)

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
| **q24** Why UI updates must run on main thread | **Good:** Model answer explaining UIKit is not thread-safe to avoid locking overhead, and view rendering must synchronize with display refreshes at 60/120Hz. | 100 | Yes | Pass (100%) |
| | **Average:** "UI updates must be on the main thread because UIKit is not thread-safe and updating from background causes crashes." (Misses frame rate synchronization). | 80 | Yes | Pass (80%) |
| | **Weak:** "Because iOS devices only have one CPU core." | 0 | No | Fail (0%) |
| **q25** Effects of blocking the main thread | **Good:** Explains the run loop cannot process touches or redraw frames, causing frozen UI, hitches/frame drops, and potential watchdog crashes. | 100 | Yes | Pass (100%) |
| | **Average:** "The UI freezes and buttons stop working because the main thread is busy with the loop." (Misses render loop / frame drop detail). | 80 | Yes | Pass (80%) |
| | **Weak:** "The app switches to airplane mode automatically." | 0 | No | Fail (0%) |
| **q26** The iOS watchdog and 0x8badf00d | **Good:** Describes watchdog monitoring responsiveness, killing apps that block the main thread for ~10s (~5s at launch), logging exception code 0x8badf00d. | 100 | Yes | Pass (100%) |
| | **Average:** "The watchdog kills the app if it freezes for too long and logs 0x8badf00d." (Misses launch vs runtime timing). | 80 | Yes | Pass (80%) |
| | **Weak:** "Watchdog is an anti-virus scanner built into Xcode." | 0 | No | Fail (0%) |
| **q27** DispatchQueue.main.sync deadlock | **Good:** Explains calling sync pauses the main thread until the closure finishes, but the closure cannot start because the main thread is paused, causing permanent deadlock. | 100 | Yes | Pass (100%) |
| | **Average:** "It deadlocks because the main thread waits for the block and the block waits for the main thread." (Misses serial queue context). | 80 | Yes | Pass (80%) |
| | **Weak:** "Calling sync makes the app run twice as fast." | 0 | No | Fail (0%) |
| **q28** @MainActor compile-time safety | **Good:** Explains @MainActor binds types to the main thread, the compiler verifies actor isolation at compile time, and external calls require async await. | 100 | Yes | Pass (100%) |
| | **Average:** "@MainActor ensures that methods run on the main thread so you do not have to write DispatchQueue.main.async." (Misses compile-time verification details). | 80 | Yes | Pass (80%) |
| | **Weak:** "@MainActor allows classes to access private user data." | 0 | No | Fail (0%) |
| **q29** `StatusPresenter` @MainActor implementation | **Good:** Model answer declaring StatusPresenter with @MainActor, updateStatus mutating status, logging Thread.isMainThread, and printing final status. | 100 | Yes | Pass (100%) |
| | **Average:** Implements StatusPresenter and updates status, but forgets to log Thread.isMainThread. | 70 | Yes | Pass (70%) |
| | **Weak:** Omits @MainActor annotation, failing compile-time actor isolation. | 50 (capped) | No | Fail (50%) |
| **q30** `UIViewModel` @MainActor and assert | **Good:** Model answer declaring UIViewModel with @MainActor, init, refresh asserting Thread.isMainThread, and printing outputs. | 100 | Yes | Pass (100%) |
| | **Average:** Declares @MainActor and refresh, but omits the assert(Thread.isMainThread) check. | 70 | Yes | Pass (70%) |
| | **Weak:** Implements a global non-isolated function without class structure or @MainActor. | 30 | No | Fail (30%) |
| **q31** `NavigationCoordinator` screen count | **Good:** Model answer implementing ScreenState, @MainActor NavigationCoordinator, pushScreen method, and calling it twice. | 100 | Yes | Pass (100%) |
| | **Average:** Implements coordinator and state, but calls pushScreen only once instead of twice. | 70 | Yes | Pass (70%) |
| | **Weak:** Mutates state from an asynchronous background thread without @MainActor. | 30 | No | Fail (30%) |

---

## Verdict

The rubrics successfully:
1. Assess core rationale for main thread UI execution (thread safety, display vsync frame budgets).
2. Verify knowledge of main thread blocking, UI hitches, and the `0x8badf00d` watchdog crash.
3. Evaluate understanding of the classic `DispatchQueue.main.sync` deadlock trap.
4. Confirm proficiency in modern Swift `@MainActor` compile-time thread isolation.
5. Accurately score implementation correctness for main-thread isolated models and state presenters.
