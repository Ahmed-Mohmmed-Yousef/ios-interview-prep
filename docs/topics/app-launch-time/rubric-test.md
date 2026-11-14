# Rubric Test — App Launch Time (`app-launch-time`)

Tested: **2026-11-14** against `content/rules.json` (`rubricScoring`: met = 1, partly = 0.5, not met = 0, `keyMissedCap` = 50, pass mark = 70).

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** launch types | **Good:** Cold creates a new process from disk; warm reuses cached binary pages; resume wakes a suspended app in memory. | 100 | Yes |
| | **Average:** "Cold launch starts the app fresh. Resume wakes it from background." (omits warm launch) | 70 (40+0+30) | Yes — borderline pass, covers the two main extremes |
| | **Weak:** "Cold launch is only after installing the app for the first time." | 0 | Yes — wrong definition misses key criterion |
| **q26** pre-main | **Good:** `dyld` loads binary and dynamic libraries and runs `+load`/C++ constructors; fix with mergeable libraries and removing static initializers. | 100 | Yes |
| | **Average:** "Pre-main runs before main; delete unused dynamic frameworks." (no detail on `dyld`/initializers and only one fix) | 50 (25+25+0) | Yes — needs both `dyld` mechanism and two fixes |
| | **Weak:** "Pre-main happens inside `viewDidLoad`." | 0 | Yes |
| **q27** Release vs Debug | **Good:** Debug turns off optimizations and adds checks; Simulator uses fast Mac CPU/SSD; profile Release on a real device with Instruments. | 100 | Yes |
| | **Average:** "The Simulator is faster than an iPhone, so test on a device." (misses Debug optimization difference) | 50 (capped: key Debug point missed) | Yes — misses key Debug criterion |
| | **Weak:** "Debug builds are always faster than Release builds." | 0 | Yes |
| **q28** prewarming | **Good:** Prewarming starts and suspends the process early; before first unlock Keychain/protected files fail; wait until scene active. | 100 | Yes |
| | **Average:** "iOS prewarms apps in the background, so Keychain might be locked." | 80 (45+35+0) | Yes — covers both key points cleanly |
| | **Weak:** "Prewarming deletes UserDefaults." | 0 | Yes |
| **q29** measuring | **Good:** Instruments App Launch + `OSSignposter` locally, `XCTApplicationLaunchMetric` in UI tests, Xcode Organizer + `MXAppLaunchMetric` in production. | 100 | Yes |
| | **Average:** "Use Instruments locally and Xcode Organizer in production." (omits `XCTApplicationLaunchMetric`) | 65 (35+0+30) | Yes — misses CI test metric |
| | **Weak:** "Print `Date()` in `didFinishLaunching`." | 0 | Yes |
| **q30** `OSSignposter` | **Good:** Model answer using `beginInterval`, `defer { endInterval }`, returning `work()`. | 100 | Yes |
| | **Average:** Calls `beginInterval` and `endInterval` without `defer` (risks skipping end on early return). | 80 (40+20+20) | Yes — works for simple closure, loses half on `defer` |
| | **Weak:** Prints `"LoadUser"` without calling `OSSignposter`. | 20 (capped at 50, key missed) | Yes |
| **q31** `LaunchCoordinator` | **Good:** Model answer appending closure to `deferredTasks`, running and clearing in `firstFrameDidDraw`. | 100 | Yes |
| | **Average:** Appends and runs `deferredTasks` but forgets `removeAll()`. | 85 (50+35+0) | Yes |
| | **Weak:** Calls `setupAnalytics()` directly in `didFinishLaunching()`. | 0 (key missed) | Yes |
| **q32** `SecretLoader` | **Good:** Model answer guarding `isProtectedDataAvailable` and printing both states. | 100 | Yes |
| | **Average:** Returns `nil` when false and `"API-KEY"` when true, forgets loop print. | 80 (50+30+0) | Yes |
| | **Weak:** Always returns `"API-KEY"` regardless of flag. | 0 (key missed) | Yes |
