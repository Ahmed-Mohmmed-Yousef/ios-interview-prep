# Research: Permissions and Privacy

## 1. Core Concepts & Technical Facts

### Info.plist Purpose Strings
- Protected device resources (Camera, Microphone, Photo Library, Location, Health, Bluetooth, Tracking) require an explicit purpose string in `Info.plist` (e.g., `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`).
- If an app attempts to access a protected hardware resource or API without the corresponding `Info.plist` key, iOS immediately triggers a SIGABRT crash with an exception log message specifying the missing key.
- Purpose strings must provide clear, human-readable explanations of why the app needs access and how the user benefits. Apple rejects apps with generic strings like "Needed for app functionality".

### The 4 Standard Authorization States
Frameworks like `AVFoundation` and `Photos` share common authorization statuses:
1. `.notDetermined`: The user has not yet been presented with the permission dialog. Calling the request API presents the system dialog.
2. `.authorized`: The user granted access. The app may access the hardware or data freely.
3. `.denied`: The user explicitly denied access or disabled it in Settings. Calling the request API again does **not** show the system dialog; it returns `.denied` immediately. The app must guide the user to system Settings via `UIApplication.openSettingsURLString`.
4. `.restricted`: The app cannot access the feature due to active device restrictions (e.g., Parental Controls, Screen Time, or enterprise MDM profiles). The user cannot enable it even from Settings.
5. `.limited`: Available in select frameworks (e.g., `PHAuthorizationStatus.limited` in Photos since iOS 14). The user granted access only to a curated subset of photos.

### In-Context vs Upfront Permission Requests
- **Upfront Permission Asking (Anti-pattern)**: Prompting for camera, location, and notifications immediately on first app launch causes user fatigue and high rejection rates.
- **In-Context Asking (Apple HIG Best Practice)**: Prompt only when the user takes an explicit action that requires the permission (e.g., tapping "Scan Barcode" or "Attach Photo").
- **Priming Screens (Pre-permission dialogs)**: An app-designed custom screen shown *before* the one-time system dialog to explain the value proposition. If the user dismisses the priming screen, the system prompt is preserved for later.

### Privacy Manifests (`PrivacyInfo.xcprivacy`)
- Mandated by Apple starting in 2024 for all App Store submissions and third-party SDKs.
- Encoded as a property list file (`PrivacyInfo.xcprivacy`) included in the app bundle.
- Four main components:
  1. `NSPrivacyTracking`: Boolean indicating if the app uses data for tracking across third-party apps and websites.
  2. `NSPrivacyTrackingDomains`: Array of internet domains connected to tracking. If the user does not grant ATT permission, network requests to these domains fail.
  3. `NSPrivacyCollectedDataTypes`: Array of dictionaries detailing collected user data categories (e.g., Contact Info, Diagnostics, Usage Data), their collection purposes, and whether they are linked to the user's identity.
  4. `NSPrivacyAccessedAPITypes`: Declares usage of "Required Reason APIs" (e.g., system boot time, disk space, file timestamps, active keyboard layout), specifying Apple-approved reason codes.

---

## 2. Common Misconceptions & Interview Traps

1. **"Calling `requestAuthorization` repeatedly to prompt the user after denial"**:
   - *Trap*: Calling the request method again expecting the system alert to reappear after the user tapped "Don't Allow".
   - *Reality*: The system prompt appears only once per permission lifetime. Subsequent calls immediately return `.denied`. The app must detect `.denied` and offer a button linking to `UIApplication.openSettingsURLString`.
2. **"Missing Info.plist description string"**:
   - *Trap*: Calling camera or photo APIs in code without adding `NSCameraUsageDescription` to `Info.plist`.
   - *Consequence*: The application crashes instantly with SIGABRT in debug and production.
3. **"Assuming `.restricted` can be overridden by the user"**:
   - *Trap*: Presenting a "Go to Settings" alert when status is `.restricted`.
   - *Reality*: Screen Time or MDM profile restrictions lock the toggle in Settings. The user cannot enable it. Show an explanatory message instead.
4. **"Ignoring limited photo access (`.limited`)"**:
   - *Trap*: Assuming photo access is binary (`.authorized` or `.denied`). In iOS 14+, `.limited` gives access only to user-selected assets; treating `.limited` as `.denied` breaks the photo picker for privacy-conscious users.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "iOS requires permission before an app can access sensitive data like the camera or location. We must add a purpose string in `Info.plist`, or the app crashes. There are four main states: not determined, authorized, denied, and restricted. If the user denies permission, we cannot show the system prompt again; we must guide them to the device Settings."
- **Junior**:
  - "We follow Apple HIG by requesting permissions in context when the user taps an action, rather than blasting alerts at launch. We check the authorization status first. If it is `.denied`, we provide context and deep-link to `UIApplication.openSettingsURLString`. If `.restricted`, we gracefully disable the feature because MDM or parental controls prevent changes. In modern iOS, we also configure `PrivacyInfo.xcprivacy` to declare collected data types and required reason APIs."
- **Senior**:
  - "Privacy architecture in iOS combines runtime authorization checks with static build manifests. We design pre-permission priming flows that decouple UI intent from the immutable one-shot system prompt. We handle nuanced states like `PHAuthorizationStatus.limited` and present the `PHPhotoLibrary.shared().presentLimitedLibraryPicker` when needed. Architecturally, we enforce compliance using `PrivacyInfo.xcprivacy` to document Required Reason APIs and tracking domains, generating privacy nutrition reports during CI verification."
