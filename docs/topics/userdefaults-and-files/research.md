# Research: UserDefaults and Files

## 1. Core Concepts & Technical Facts

### The iOS App Sandbox
- iOS isolates every application inside an encrypted, private container directory on the filesystem known as the **App Sandbox**.
- An app cannot inspect, read, or write files in another app's container without explicit app group shared containers.
- Standard Sandbox Directories:
  1. **`<Application_Home>/Documents/`**:
     - Dedicated to user-generated or user-visible content (e.g., text notes, exported PDFs, user projects).
     - **Backed up** to iCloud and iTunes/Finder by default.
     - Visible in the iOS Files app if `UIFileSharingEnabled` and `LSSupportsOpeningDocumentsInPlace` are enabled in `Info.plist`.
  2. **`<Application_Home>/Library/Application Support/`**:
     - Dedicated to files the app creates to run (e.g., SQLite databases, Core Data/SwiftData stores, configuration files).
     - **Backed up** to iCloud by default.
     - Never visible to the user in the Files app.
  3. **`<Application_Home>/Library/Caches/`**:
     - Dedicated to cached data that can be re-downloaded or regenerated (e.g., thumbnail images, cached network responses).
     - **Not backed up** to iCloud.
     - The OS can purge files in `Caches/` under low disk storage pressure while the app is not running.
  4. **`<Application_Home>/tmp/`**:
     - Temporary scratch files needed during an active session (e.g., intermediate video export clips).
     - **Not backed up**.
     - OS periodically removes files when the app is not running.

### UserDefaults
- A lightweight, thread-safe key-value store backed by a property list file (`Library/Preferences/<bundle_id>.plist`).
- Supported property list types: `String`, `Int`, `Double`, `Float`, `Bool`, `Data`, `Date`, `Array`, and `Dictionary`.
- **Intended Use Case**: Small user preferences, settings, and flags (e.g., `hasSeenWalkthrough`, `soundEffectsEnabled`, `selectedAppearance`).
- **Critical Anti-patterns**:
  - *Storing large datasets*: The entire plist file is deserialized into RAM at app launch. Storing large arrays or images causes slow startup times and memory bloat.
  - *Storing sensitive secrets*: UserDefaults is stored in plaintext on disk without encryption. Never store authentication tokens, passwords, or personal credentials in UserDefaults. Use Keychain instead.
- **Modern SwiftUI Integration**: `@AppStorage("key") var soundEnabled: Bool = true` automatically binds view state to UserDefaults.
- **`synchronize()` Deprecation**: `UserDefaults.standard.synchronize()` is deprecated since iOS 12. Writes are automatically batched and persisted to disk asynchronously.

### FileManager and Atomic Writing
- `FileManager.default` coordinates filesystem operations (creating directories, copying, moving, deleting).
- Canonical URL generation:
  ```swift
  let docsURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
  let fileURL = docsURL.appendingPathComponent("note.txt")
  ```
- **Atomic Writing (`Data.WritingOptions.atomic`)**:
  - When calling `data.write(to: fileURL, options: .atomic)`, Foundation writes data to an auxiliary temporary file first, and then atomically renames the temporary file to the target URL.
  - Guarantees that if a crash, process termination, or power loss occurs mid-write, the existing file is not corrupted or truncated.

---

## 2. Common Misconceptions & Interview Traps

1. **"Storing passwords or tokens in UserDefaults"**:
   - *Trap*: Saving user JWT tokens or passwords in `UserDefaults.standard.set(token, forKey: "authToken")`.
   - *Reality*: UserDefaults files are unencrypted and easily readable via backup inspectors or jailbreak tools. Secrets belong exclusively in Keychain.
2. **"Storing downloaded images or large lists in UserDefaults"**:
   - *Trap*: Encoding high-resolution images as `Data` and saving them into UserDefaults.
   - *Consequence*: Sluggish app launch and memory spikes because the entire plist loads on launch. Save files to `Caches/` or `Documents/` instead.
3. **"Putting cached files in Documents/"**:
   - *Trap*: Saving network image caches in `Documents/`.
   - *Consequence*: Rejection during App Store review for wasting user iCloud backup storage quota. Cache files belong in `Library/Caches/`.
4. **"Calling `synchronize()`"**:
   - *Trap*: Calling `UserDefaults.standard.synchronize()` after every write.
   - *Reality*: Deprecated since iOS 12. It forces unnecessary synchronous disk I/O.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "`UserDefaults` is a key-value store for small settings like dark mode preferences or onboarding flags. We should never store passwords in `UserDefaults` because it is not encrypted. For larger files like documents or pictures, we use `FileManager` to save files in the app sandbox. User files go in `Documents` and get backed up to iCloud, while cached images go in `Caches` so they do not waste backup space."
- **Junior**:
  - "`UserDefaults` is backed by a plist file that loads entirely into memory on launch, so it is strictly for small primitives and flags. Secrets must go to Keychain, and large assets belong on disk via `FileManager`. The sandbox provides distinct directories: `Documents` for user-created content (backed up to iCloud), `Application Support` for internal databases (backed up), and `Caches` for re-creatable assets (not backed up). When writing files to disk, we use atomic write options (`.atomic`) to prevent corruption if the app terminates mid-write."
- **Senior**:
  - "Data persistence architecture balances memory overhead, backup quotas, and fault tolerance. We enforce strict data tiering: sensitive secrets in Keychain, light user preferences in UserDefaults via `@AppStorage`, re-fetchable binary assets in `Library/Caches/` with URLCache limits, and structured models in SwiftData or SQLite within `Application Support/`. We ensure compliance with Apple backup guidelines by applying the `isExcludedFromBackup` resource value when necessary. On the filesystem layer, we mandate atomic writes via `Data.WritingOptions.atomic` to guarantee file integrity across process interruptions."
