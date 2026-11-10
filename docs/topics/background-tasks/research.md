# Background Work Research

**Topic ID:** `background-tasks`  
**Level:** Mid  
**Date:** 2026-11-10  
**Author:** Curriculum Production Agent  

---

## 1. Official Documentation & Authoritative Sources

1. **Background Tasks Framework (Apple Developer Documentation)**  
   https://developer.apple.com/documentation/backgroundtasks  
   *`BGTaskScheduler`, `BGTask`, `BGAppRefreshTask`, `BGProcessingTask`, `BGTaskRequest`.*

2. **BGTaskScheduler (Background Tasks)**  
   https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler  
   *Registering handlers before launch completes, submitting requests, setting `earliestBeginDate`, handling expiration.*

3. **Choosing the right background task (Apple)**  
   https://developer.apple.com/documentation/backgroundtasks/choosing-the-right-background-task  
   *`BGAppRefreshTask` (~30 seconds for content refresh) vs `BGProcessingTask` (minutes for data processing, indexing, database maintenance).*

4. **Extending your app's background execution time (UIKit)**  
   https://developer.apple.com/documentation/uikit/uiapplication/1623031-beginbackgroundtask  
   *`beginBackgroundTask(withName:expirationHandler:)` and `endBackgroundTask(_:)` for finishing in-flight work.*

5. **Downloading files in the background (Foundation)**  
   https://developer.apple.com/documentation/foundation/url_loading_system/downloading_files_in_the_background  
   *`URLSessionConfiguration.background(withIdentifier:)` for delegating large downloads to system daemon `nsurlsessiond`.*

6. **WWDC Sessions**  
   - WWDC19 Session 707: *Advances in App Background Execution*  
   - WWDC20 Session 10063: *Background execution demystified*  

---

## 2. Key Technical Concepts

### iOS Background Philosophy
- To preserve user battery life, prevent thermal throttling, and ensure instant foreground responsiveness, iOS suspends apps shortly after they enter the background.
- Apps cannot run continuous background threads without specialized system capabilities (e.g. audio playback, navigation tracking).

### 1. Short Tasks: `beginBackgroundTask`
- Used to finish immediate in-flight work when leaving the foreground (e.g., saving user draft, completing an analytics batch upload).
- Invoked via:
  ```swift
  var taskID = UIBackgroundTaskIdentifier.invalid
  taskID = UIApplication.shared.beginBackgroundTask(withName: "SaveDraft") {
      UIApplication.shared.endBackgroundTask(taskID)
      taskID = .invalid
  }
  // Perform work...
  UIApplication.shared.endBackgroundTask(taskID)
  taskID = .invalid
  ```
- Yields approximately **30 seconds** of execution time (`UIApplication.shared.backgroundTimeRemaining`).
- **Critical rule**: Must call `endBackgroundTask` when finished, or watchdog crashes the app with code `0xbaadca11`.

### 2. Scheduled Work: `BGTaskScheduler`
- Unified framework introduced in iOS 13 for opportunistic background execution.
- Two task types:
  1. **`BGAppRefreshTask`**: Short duration (~30s). Used to keep app content current (e.g., fetching new social feed posts or weather updates).
  2. **`BGProcessingTask`**: Extended duration (several minutes). Used for heavy maintenance, machine learning training, Core Data database indexing, or cleaning caches. Can require:
     - `requiresNetworkConnectivity = true`
     - `requiresExternalPower = true`
- **Requirements**:
  - Add task identifier strings to `Info.plist` under `BGTaskSchedulerPermittedIdentifiers`.
  - Register task handlers in `didFinishLaunchingWithOptions` or early in app lifecycle using `BGTaskScheduler.shared.register(forTaskWithIdentifier:using:launchHandler:)`.
  - Schedule tasks with `BGTaskScheduler.shared.submit(request)`.
  - Set `task.expirationHandler` to cancel ongoing async tasks if the system terminates the window early.
  - Call `task.setTaskCompleted(success: Bool)` upon completion.

### 3. Background Transfers: Background URLSession
- Managed by `URLSessionConfiguration.background(withIdentifier:)`.
- The system hands transfer requests over to the out-of-process system daemon (`nsurlsessiond`).
- Transfers continue even if the app process is suspended, evicted from RAM, or terminated by the user.
- When transfer finishes, the system launches the app in the background and calls `application(_:handleEventsForBackgroundURLSession:completionHandler:)`.

### Debugging with LLDB
- Background tasks are opportunistic, so you cannot easily wait for the scheduler in tests.
- Simulate a task launch in Xcode debugger:
  ```lldb
  e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@"com.example.refresh"]
  ```
- Simulate task expiration:
  ```lldb
  e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateExpirationForTaskWithIdentifier:@"com.example.refresh"]
  ```

---

## 3. Common Interview Questions by Level

### Fresh / Junior Level
- What happens to an iOS app process when the user swipes home?
- How much background execution time does `beginBackgroundTask` give your app?
- Why must you always call `endBackgroundTask`?
- What is the difference between `BGAppRefreshTask` and `BGProcessingTask`?

### Mid Level
- Where must you declare background task identifiers, and when must you register task handlers?
- What is the role of `task.expirationHandler` in `BGTask`?
- Why is `earliestBeginDate` considered a hint rather than an exact alarm trigger?
- How does `URLSessionConfiguration.background` allow downloads to complete even if an app is killed?

### Senior / Staff Level
- How does iOS calculate background execution budgets based on battery, charging state, and user usage patterns?
- How do you design idempotent background sync routines that recover safely from sudden system task expiration?
- How do you test and simulate `BGTaskScheduler` launches in automated integration test pipelines?
