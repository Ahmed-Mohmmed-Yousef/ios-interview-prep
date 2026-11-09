# Research: Keychain Basics

## 1. Core Concepts & Technical Facts

### What is the iOS Keychain?
- The **Keychain** is a specialized, hardware-accelerated encrypted SQLite database managed by the iOS system daemon (`securityd`).
- Provides secure storage for sensitive secrets: passwords, OAuth/JWT access tokens, refresh tokens, cryptographic private keys, and payment credentials.
- Backed by the **Secure Enclave** processor and AES-256 encryption using keys derived from the device hardware UID and the user's passcode.

### Sandbox Filesystem vs Keychain Persistence
- **App Sandbox files (`Documents`, `Caches`, `UserDefaults`)**:
  - Deleted immediately when the user uninstalls the app from their device.
  - Stored in plaintext or standard filesystem encryption.
- **Keychain Items**:
  - **Persist across app uninstalls and reinstalls** on the same physical hardware. If a user deletes the app and re-installs it later, stored tokens remain accessible unless explicitly deleted or the device is wiped.
  - Isolated from other apps by default. Can be shared across apps from the same developer using **Keychain Sharing (Access Groups)**.

### Common Keychain Item Classes (`kSecClass`)
1. `kSecClassGenericPassword`: The standard class for application secrets (auth tokens, API keys, session tokens, passwords).
2. `kSecClassInternetPassword`: Designed for web/HTTP passwords tied to server domains, protocols, and port numbers.
3. `kSecClassCertificate`: X.509 public certificates.
4. `kSecClassKey`: Cryptographic symmetric and asymmetric keys.
5. `kSecClassIdentity`: A combination of a certificate and its matching private key.

### Core Security Framework CRUD Operations
All Keychain APIs use C-based dictionary queries with `CFDictionaryRef` and return an `OSStatus` code:
- `SecItemAdd(_:_:)`: Stores a new item. Returns `errSecSuccess` (0) or error like `errSecDuplicateItem` (-25299).
- `SecItemCopyMatching(_:_:)`: Queries and retrieves existing item data or attributes. Returns `errSecSuccess` or `errSecItemNotFound` (-25300).
- `SecItemUpdate(_:_:)`: Modifies attributes or data for an item matching a query.
- `SecItemDelete(_:)`: Deletes items matching a query.

### Accessibility Attributes (`kSecAttrAccessible`)
Controls the cryptographic availability and backup eligibility of a stored secret:
1. `kSecAttrAccessibleWhenUnlocked`:
   - Item can only be decrypted when the device is unlocked by the user. Recommended default for user secrets.
2. `kSecAttrAccessibleAfterFirstUnlock`:
   - Item becomes accessible after the user unlocks the device once after a device restart. Remains accessible even when the screen locks. Essential for apps that run background fetch or push notification tasks requiring auth tokens.
3. `kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly`:
   - Item requires an active device passcode. If the user removes the passcode, the item is destroyed. Never syncs to iCloud Keychain.
4. *Deprecated*: `kSecAttrAccessibleAlways` was deprecated in iOS 9 due to vulnerability when the device is locked.

---

## 2. Common Misconceptions & Interview Traps

1. **"Keychain items are deleted when the app is uninstalled"**:
   - *Trap*: Assuming an auth token or UUID will be wiped on app deletion.
   - *Reality*: Keychain items remain stored in the device Keychain database after app removal. When the app is reinstalled, the items are still readable.
2. **"Using UserDefaults for sensitive tokens because it is simpler"**:
   - *Trap*: Storing JWT access tokens in `UserDefaults` to avoid the verbose Security framework C APIs.
   - *Reality*: UserDefaults is unencrypted plaintext. Attackers can extract it from unencrypted device backups.
3. **"Failing to handle `errSecDuplicateItem` on add"**:
   - *Trap*: Calling `SecItemAdd` without checking if the item already exists.
   - *Reality*: If an item with the same service and account exists, `SecItemAdd` fails with `errSecDuplicateItem`. Best practice: attempt `SecItemUpdate`, or delete then add.
4. **"Assuming Keychain is suitable for large datasets"**:
   - *Trap*: Storing encrypted databases or media files in Keychain.
   - *Reality*: Keychain is optimized for small secrets (under a few kilobytes). For large encrypted files, use filesystem encryption with `FileProtectionType.complete`.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "The Keychain is an encrypted storage system managed by iOS. We use it to store sensitive data like passwords and authentication tokens. Unlike `UserDefaults`, which is plaintext, Keychain is hardware-encrypted. Another big difference is that Keychain data stays on the device even if the user deletes and reinstalls the app."
- **Junior**:
  - "Keychain Services in the `Security` framework provides hardware-backed storage for credentials using `kSecClassGenericPassword`. We query and save items using `SecItemAdd`, `SecItemCopyMatching`, and `SecItemDelete`. We control when data can be decrypted using accessibility attributes like `kSecAttrAccessibleWhenUnlocked` or `kSecAttrAccessibleAfterFirstUnlock` for background tasks. We also leverage Keychain Access Groups to share tokens between an app and its widget extension."
- **Senior**:
  - "Architecturally, we wrap the procedural C Security APIs behind a clean Swift actor or service protocol. We enforce strict accessibility policies using `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` to prevent silent iCloud Keychain syncing of sensitive enterprise tokens. Where biometric protection is mandated, we configure `SecAccessControl` with `.biometryAny` or `.userPresence` to require Face ID before key derivation. For large assets, we generate symmetric keys stored in Keychain to encrypt local SQLite or Realm databases using SQLCipher."
