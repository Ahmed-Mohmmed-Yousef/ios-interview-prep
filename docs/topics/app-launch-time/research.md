# Research Notes — App Launch Time (`app-launch-time`)

Verified: **2026-11-14** against official Apple documentation and Swift 6.4.2 (`swiftc -swift-version 6`).

## Official Sources

| Title | URL | Kind | Key Facts Verified |
|---|---|---|---|
| Reducing your app’s launch time (Xcode) | https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time | official | Cold vs warm vs resume launches; minimize work before first frame; defer non-essential initialization; avoid blocking main thread; profile with App Launch instrument on a real device in Release mode. |
| About the app launch sequence (Xcode) | https://developer.apple.com/documentation/xcode/about-the-app-launch-sequence | official | Prewarming loads process and linked libraries and suspends before app code runs (or before first unlock); `main()` / `@main` -> `UIApplicationMain` -> `application(_:willFinishLaunchingWithOptions:)` -> state restoration -> `application(_:didFinishLaunchingWithOptions:)` -> `scene(_:willConnectTo:options:)` -> first frame. |
| Configuring your project to use mergeable libraries (Xcode) | https://developer.apple.com/documentation/xcode/configuring-your-project-to-use-mergeable-libraries | official | Mergeable libraries keep dynamic linking in Debug (fast incremental builds) and merge libraries into the app binary in Release (`MERGEABLE_LIBRARY` = YES on frameworks, `MERGED_BINARY_TYPE` = Automatic/Manual on app target) to remove `dyld` launch overhead. |
| OSSignposter (os) | https://developer.apple.com/documentation/os/ossignposter | official | Unified logging signpost API (`beginInterval`, `endInterval`, `makeSignpostID`) for timing startup phases in Instruments (Points of Interest). Confirmed compiling in Swift 6.4.2. |
| XCTApplicationLaunchMetric (XCTest) | https://developer.apple.com/documentation/xctest/xctapplicationlaunchmetric | official | Measures launch duration in UI tests (`measure(metrics: [XCTApplicationLaunchMetric()])`). Replaces deprecated `XCTOSSignpostMetric.applicationLaunch`. |
| MXAppLaunchMetric (MetricKit) | https://developer.apple.com/documentation/metrickit/mxapplaunchmetric | official | Collects field launch histograms (`histogrammedTimeToFirstDraw`, `histogrammedOptimizedTimeToFirstDraw`, `histogrammedApplicationResumeTime`, `histogrammedExtendedLaunch`). |

## Key Technical Facts

1. **Launch Types:**
   - **Cold launch:** App process and data are not in memory; OS spawns the process, `dyld` loads binary and dynamic libraries, initializes frameworks, runs app launch delegates, and draws the first frame.
   - **Warm launch:** Process is not running, but parts of the binary or system pages remain cached in memory.
   - **Resume:** App is already suspended in memory; bringing it back to the foreground skips `dyld` and process creation.
   - **Prewarming:** iOS may start a process early, load dynamic libraries, and suspend it to reduce wait time. Apps must not assume protected storage (`UserDefaults`, Keychain) is unlocked during early launch if prewarmed before first device unlock.

2. **Pre-main vs Post-main:**
   - **Pre-main:** `dyld` maps the binary and dynamic frameworks, resolves symbols (fix-ups), and runs static initializers (Objective-C `+load`, C++ static constructors). Swift `static let` and global variables initialize lazily on first access, avoiding pre-main bloat.
   - **Post-main:** `UIApplicationMain` / `@main`, `willFinishLaunchingWithOptions`, `didFinishLaunchingWithOptions`, scene connection (`willConnectTo`), initial layout, and **first frame**.
   - **Watchdog (`0x8badf00d`):** iOS terminates apps that block the main thread during launch or lifecycle transitions for too long. Target a fast first frame (commonly budgeted around 400 ms so startup feels instant).

3. **Measuring:**
   - Always profile launch time on a **real device** in **Release** configuration (not Simulator or Debug).
   - Tools: Instruments **App Launch** template, `OSSignposter` intervals, `XCTApplicationLaunchMetric` in XCTest, and Xcode Organizer / `MetricKit` (`MXAppLaunchMetric`) for field data.

## Common Misconceptions (Interview Traps)

- **Testing launch time in Debug on the Simulator:** Debug builds disable optimizations and include extra checks, while the Simulator runs on Mac CPU and SSD instead of iPhone hardware.
- **Putting analytics, logging, or database migrations inside `didFinishLaunchingWithOptions`:** Running heavy setup synchronously before the first frame delays startup and risks a watchdog kill (`0x8badf00d`).
- **Adding many dynamic frameworks without merging:** Each dynamic framework forces `dyld` to load and link it at cold launch. Mergeable libraries or static linking remove that startup cost in Release builds.
- **Assuming `UserDefaults` or Keychain data is always available at launch:** Prewarming can start the app process before the user unlocks the device for the first time after a reboot.

## Mid-Level vs Senior Interview Expectations

- **Mid-level:** Explains cold vs warm vs resume launch, separates pre-main (`dyld`, dynamic libraries, static initializers) from post-main (delegates, initial views, first frame), defers non-essential work until after the first frame, and profiles on a real device in Release mode using Instruments.
- **Senior:** Connects prewarming and first-unlock data protection, uses mergeable libraries (`MERGEABLE_LIBRARY` / `MERGED_BINARY_TYPE`), instruments custom startup stages with `OSSignposter`, guards regressions in CI with `XCTApplicationLaunchMetric`, and tracks field histograms in Xcode Organizer / `MetricKit`.
