# Fact Check Report: Push and Local Notifications

**Topic ID:** `notifications`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. User Notifications Framework (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/usernotifications
2. Registering your app with APNs (User Notifications)  
   URL: https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns
3. Generating a remote notification (APNs)  
   URL: https://developer.apple.com/documentation/usernotifications/generating-a-remote-notification
4. Modifying content in newly delivered notifications (Apple)  
   URL: https://developer.apple.com/documentation/usernotifications/modifying-content-in-newly-delivered-notifications

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Local notifications are scheduled on device; push notifications route via APNs | Apple Developer Documentation | Verified | Core distinction in UserNotifications architecture. |
| UNUserNotificationCenter is the central hub for local alerts and requests | Apple Developer Documentation | Verified | Manages triggers, requests, and authorization. |
| UNTimeIntervalNotificationTrigger requires interval >= 60s when repeating | Apple Developer Documentation | Verified | Throws runtime exception if interval is under 60 seconds. |
| APNs generates an opaque device token for the app on that device | Apple Developer Documentation | Verified | Delivered in didRegisterForRemoteNotificationsWithDeviceToken. |
| Device token is not permanent and can change across reinstalls and restores | Apple Developer Documentation | Verified | App must update backend database on token delivery. |
| Foreground notifications suppress banners unless willPresent is implemented | Apple Developer Documentation | Verified | UNUserNotificationCenterDelegate willPresent controls foreground presentation. |
| Standard APNs payload size limit is 4096 bytes (4 KB) | Apple Developer Documentation | Verified | Maximum byte limit for JSON remote notification payloads. |
| Notification Service Extension is triggered by mutable-content: 1 in aps | Apple Developer Documentation | Verified | Allows 30s background execution to decrypt or attach media. |
| Silent push notifications use content-available: 1 | Apple Developer Documentation | Verified | Wakes app in background without alert banners; subject to throttling. |
| userNotificationCenter(_:didReceive:withCompletionHandler:) handles taps | Apple Developer Documentation | Verified | Delegate callback for banner taps and custom action selections. |

---

## Code Verification
- `content/topics/notifications/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/notifications/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, APNs registration and payload mechanics, UserNotifications framework APIs, and Swift 6 compiler test blocks for `notifications` are verified, accurate, and consistent with official Apple documentation.
