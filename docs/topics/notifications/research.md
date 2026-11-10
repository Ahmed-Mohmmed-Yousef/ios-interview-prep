# Push and Local Notifications Research

**Topic ID:** `notifications`  
**Level:** Mid  
**Date:** 2026-11-10  
**Author:** Curriculum Production Agent  

---

## 1. Official Documentation & Authoritative Sources

1. **User Notifications Framework (Apple Developer Documentation)**  
   https://developer.apple.com/documentation/usernotifications  
   *`UNUserNotificationCenter`, `UNNotificationRequest`, `UNMutableNotificationContent`, `UNNotificationTrigger`, `UNUserNotificationCenterDelegate`.*

2. **Registering your app with APNs (User Notifications)**  
   https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns  
   *The APNs lifecycle: `registerForRemoteNotifications()`, `didRegisterForRemoteNotificationsWithDeviceToken`, token transmission to provider server, APNs payload delivery.*

3. **Generating a remote notification (APNs)**  
   https://developer.apple.com/documentation/usernotifications/generating-a-remote-notification  
   *JSON payload structure, `aps` dictionary keys (`alert`, `badge`, `sound`, `content-available`, `mutable-content`, `category`, `thread-id`), payload size limits (4096 bytes for standard notifications, 5120 bytes for VoIP push).*

4. **Modifying content in newly delivered notifications (UNNotificationServiceExtension)**  
   https://developer.apple.com/documentation/usernotifications/modifying-content-in-newly-delivered-notifications  
   *Service extension lifecycle, 30-second time limit, downloading media attachments, payload decryption.*

5. **WWDC Sessions**  
   - WWDC20 Session 10095: *Design for intelligence: Make friends with notifications*  
   - WWDC21 Session 10091: *Send communication and Time Sensitive notifications*  

---

## 2. Key Technical Concepts

### Local Notifications
- Scheduled directly on device without internet or backend server interaction.
- Configured with `UNMutableNotificationContent` (title, body, sound, badge, userInfo).
- Three types of triggers (`UNNotificationTrigger`):
  1. `UNTimeIntervalNotificationTrigger`: fires after a set duration in seconds (can repeat if interval >= 60s).
  2. `UNCalendarNotificationTrigger`: fires on matching date components (hour, minute, weekday).
  3. `UNLocationNotificationTrigger`: fires when entering or exiting a `CLRegion`.
- Scheduled via `UNUserNotificationCenter.current().add(request)`.

### Remote (Push) Notifications & APNs Flow
1. App calls `UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge])`.
2. App invokes `UIApplication.shared.registerForRemoteNotifications()`.
3. iOS device connects securely to APNs and receives an opaque binary **device token**.
4. AppDelegate receives the token in `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`.
5. App transmits the device token to its backend server.
6. When sending an alert, the backend sends an HTTP/2 request to Apple APNs gateway with JWT authentication and JSON payload.
7. APNs locates the physical device and delivers the notification.

### Notification Payloads
- Maximum payload size is **4096 bytes** (4 KB) for standard notifications.
- Structure:
  ```json
  {
    "aps": {
      "alert": {
        "title": "New Message",
        "body": "Alex sent you a photo."
      },
      "badge": 1,
      "sound": "default",
      "category": "MESSAGE_CATEGORY",
      "mutable-content": 1
    },
    "customData": { "conversationId": "12345" }
  }
  ```

### Foreground Notification Presentation
- By default, iOS suppresses visual banners when the app is running in the foreground.
- To display banners in the foreground:
  - Assign `UNUserNotificationCenter.current().delegate`.
  - Implement `userNotificationCenter(_:willPresent:withCompletionHandler:)`.
  - Call completion handler with `[.banner, .sound, .badge]`.

### User Interaction & Responses
- When the user taps a notification banner or an action button:
  - iOS calls `userNotificationCenter(_:didReceive:withCompletionHandler:)`.
  - Inspect `response.actionIdentifier` (default tap, dismiss, or custom action).

### Notification Service Extension (`mutable-content: 1`)
- Separate app extension process launched before the notification banner appears.
- Triggered when `"mutable-content": 1` is present in the `aps` dictionary.
- Has roughly **30 seconds** of execution time.
- Common use cases:
  - Downloading rich images or video attachments.
  - Decrypting end-to-end encrypted notification content.
  - Modifying the title or body dynamically before display.

### Silent Push Notifications (`content-available: 1`)
- Does not show a banner, play sound, or update badges.
- Wakes up the app in the background via `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`.
- Subject to system power management and throttling; not guaranteed to deliver immediately if device is low on battery.

---

## 3. Common Interview Questions by Level

### Fresh / Junior Level
- What is the difference between local notifications and push notifications?
- How do you request notification authorization from the user?
- What are the three triggers for scheduling local notifications?
- Why does a notification banner not appear when the app is open in the foreground?

### Mid Level
- Describe the step-by-step registration flow between the app, APNs, and your backend server.
- Why can you never assume a device token is permanent?
- What is the purpose of the Notification Service Extension and what payload key triggers it?
- How do silent push notifications work and what are their limitations?

### Senior / Staff Level
- How do you implement end-to-end encryption for push notifications using a Notification Service Extension?
- How do you handle APNs token invalidation and device token churn at scale across millions of devices?
- What strategies ensure reliable background sync when silent push notifications are throttled by iOS power management?
