# Fact Check Report: Background Work

**Topic ID:** `background-tasks`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Background Tasks Framework (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/backgroundtasks
2. BGTaskScheduler (Background Tasks)  
   URL: https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler
3. Choosing the right background task (Apple)  
   URL: https://developer.apple.com/documentation/backgroundtasks/choosing-the-right-background-task
4. Extending your app background execution time (UIKit)  
   URL: https://developer.apple.com/documentation/uikit/uiapplication/1623031-beginbackgroundtask
5. Downloading files in the background (Foundation)  
   URL: https://developer.apple.com/documentation/foundation/url_loading_system/downloading_files_in_the_background

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| iOS suspends apps in background to preserve battery and performance | Apple Developer Documentation | Verified | Core architecture of iOS process lifecycle. |
| beginBackgroundTask grants ~30s execution time to finish in-flight work | UIKit Documentation | Verified | Monitored by UIApplication backgroundTimeRemaining. |
| Failing to call endBackgroundTask causes watchdog termination (0xbaadca11) | UIKit Documentation | Verified | Watchdog terminates unresponsive background processes. |
| BGTaskScheduler manages scheduled background work in iOS 13+ | Apple Developer Documentation | Verified | Replaces older background refresh mechanisms. |
| BGAppRefreshTask provides ~30s for content feed updates | Apple Developer Documentation | Verified | Intended for lightweight feed and data refreshes. |
| BGProcessingTask runs for several minutes for heavy maintenance | Apple Developer Documentation | Verified | Supports requiresExternalPower and network connectivity. |
| Task identifiers must be declared in Info.plist | Apple Developer Documentation | Verified | BGTaskSchedulerPermittedIdentifiers required key. |
| Handlers must be registered before launch completes | Apple Developer Documentation | Verified | Must register in didFinishLaunchingWithOptions or early launch. |
| earliestBeginDate is a hint and does not guarantee exact start time | Apple Developer Documentation | Verified | iOS schedules opportunistically based on power and usage. |
| Background URLSession transfers files via nsurlsessiond system daemon | Foundation Documentation | Verified | Transfers continue across app process termination. |

---

## Code Verification
- `content/topics/background-tasks/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/background-tasks/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, BGTaskScheduler lifecycle rules, background execution constraints, and Swift 6 compiler test blocks for `background-tasks` are verified, accurate, and consistent with official Apple documentation.
