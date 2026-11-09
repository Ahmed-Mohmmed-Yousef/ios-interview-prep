# Research: App and Scene Lifecycle

## 1. Core Concepts & Technical Facts

### Process vs UI Lifecycle
- Historically (pre-iOS 13), `UIApplicationDelegate` managed both process lifecycle and UI window management.
- Starting in iOS 13 (and required in modern iOS SDKs), Apple split responsibilities:
  1. **Process Lifecycle (`UIApplicationDelegate`)**:
     - Manages process-level initialization, launch options, push notification tokens, background task registration, and OS termination.
     - Key method: `application(_:didFinishLaunchingWithOptions:)`.
  2. **UI Scene Lifecycle (`UISceneDelegate` / `UIWindowSceneDelegate`)**:
     - Manages independent visual instances (scenes/windows) of the app interface.
     - Supports multi-window workflows on iPadOS, macOS, and visionOS.
     - One process can run multiple active scenes simultaneously.

### Scene Lifecycle States in UIKit
1. **Unattached / Disconnected**:
   - The scene is not connected to any on-screen window.
   - Initialized via `scene(_:willConnectTo:options:)` when UIKit provisions a new scene.
   - Cleared via `sceneDidDisconnect(_:)` when a window is closed.
2. **Foreground Inactive**:
   - The scene is visible on screen but **not receiving user touch or keyboard events**.
   - Occurs during temporary interruptions: incoming phone call banner, Control Center swipe, Siri invocation, Face ID prompt, or app switcher navigation.
   - Key method: `sceneWillResignActive(_:)`.
3. **Foreground Active**:
   - The scene is visible, in the foreground, and actively responding to user touch events.
   - Key method: `sceneDidBecomeActive(_:)`.
4. **Background**:
   - The scene is no longer visible on screen (e.g. user pressed home or switched to another app).
   - UIKit gives the app a brief execution window (typically seconds) to save critical state, flush files, and pause ongoing tasks.
   - Key methods: `sceneDidEnterBackground(_:)`, `sceneWillEnterForeground(_:)`.
5. **Suspended**:
   - The app sits in RAM with 0 CPU execution.
   - If device memory runs low, the OS terminates the suspended process without notifying the app.

### SwiftUI Declarative Lifecycle (`ScenePhase`)
- Abstracted into the `@Environment(\.scenePhase)` property wrapper.
- Values:
  - `.active`: The scene is interactive and running in the foreground.
  - `.inactive`: The scene is visible or partially obscured, but not receiving user input.
  - `.background`: The scene is hidden and minimized.
- Observed via:
  ```swift
  .onChange(of: scenePhase) { oldPhase, newPhase in
      if newPhase == .background {
          savePendingData()
      }
  }
  ```
- Observing `scenePhase` in the root `App` struct yields an aggregate status across all active scenes.

---

## 2. Common Misconceptions & Interview Traps

1. **"Relying on `applicationWillTerminate` to save data"**:
   - *Trap*: Waiting for `applicationWillTerminate(_:)` to write critical state to disk or database.
   - *Consequence*: When the app is suspended in the background, iOS purges the process silently under memory pressure without calling `applicationWillTerminate`. Critical data is lost.
   - *Fix*: Always persist essential state when entering the background (`sceneDidEnterBackground` or `.background` phase).
2. **"Heavy synchronous work in `didFinishLaunchingWithOptions`"**:
   - *Trap*: Running synchronous network calls or heavy database migrations in `didFinishLaunchingWithOptions`.
   - *Consequence*: The iOS watchdog timer kills the app if launch takes longer than roughly 20 seconds.
   - *Fix*: Keep app launch fast and dispatch heavy tasks asynchronously.
3. **"Confusing Inactive with Background"**:
   - *Trap*: Assuming an app goes straight from Active to Background when an incoming phone call rings.
   - *Consequence*: Unnecessarily tearing down network connections or stopping background tasks.
   - *Fix*: Understand that Inactive means the app is still visible in the foreground, but paused from user input.
4. **"Storing per-window state in AppDelegate"**:
   - *Trap*: Keeping active navigation state or view controllers in `AppDelegate`.
   - *Consequence*: On iPadOS, opening two windows of the same app causes state collisions.
   - *Fix*: Keep window-specific UI state within each `SceneDelegate`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "The app lifecycle tracks whether the app is active, inactive, in the background, or suspended. Inactive means it is visible but paused by an alert or call. Background means it is hidden. In modern iOS, we save user data when the app enters the background because the system can terminate suspended apps without warning."
- **Junior**:
  - "Since iOS 13, Apple separates process lifecycle in `AppDelegate` from UI scene lifecycle in `SceneDelegate`. This allows iPadOS to run multiple independent windows for one app. Scenes transition between unattached, inactive, active, and background. In SwiftUI, we monitor these state transitions cleanly using the `@Environment(\.scenePhase)` modifier."
- **Senior**:
  - "The architecture isolates process-level concerns like APNs registration and background tasks in `UIApplicationDelegate` from multi-scene window instances in `UISceneDelegate`. We treat background transitions as our boundary for persisting unsaved state and freeing volatile caches, avoiding watchdog termination by keeping launches asynchronous. In SwiftUI, observing `ScenePhase` at the App level aggregates multi-window states for coordinated persistence."
