# Research: Logging with OSLog

## 1. Core Concepts & Technical Facts

### What is the Unified Logging System (OSLog)?
- Apple's **Unified Logging System** (introduced in iOS 10, modernized in Swift with `os.Logger` in iOS 14 / macOS 11) is the unified, high-performance telemetry and logging architecture for all Apple platforms.
- Replaces legacy `print()` and Objective-C `NSLog()`.
- Logs are written to a compressed, circular in-memory kernel buffer and committed to disk according to policy, minimizing battery, CPU, and disk I/O impact.

### OSLog vs print() vs NSLog()

| Feature | `print()` | `NSLog()` | `os.Logger` (OSLog) |
|---|---|---|---|
| **Performance** | Synchronous disk/console I/O; slows execution | Synchronous; slow thread blocking | Extremely fast; deferred formatting; zero cost when inactive |
| **Release Builds** | Ships in release; leaks data to device logs | Ships in release; leaks data to system console | Managed by system log policies; configurable per environment |
| **Filtering** | None; monolithic stream | Limited; basic process name prefix | Structured filtering by `subsystem` and `category` |
| **Privacy / PII** | Plaintext; exposes sensitive user data | Plaintext; exposes sensitive user data | **Private by default**; dynamic strings automatically redacted as `<private>` |
| **Console.app / Xcode** | Cluttered standard output | Apple System Log (legacy) | Dedicated subsystem/category filters, icons, and metadata in Xcode 15+ and Console.app |

### The `os.Logger` Swift API
```swift
import os

let logger = Logger(subsystem: "com.prepstops.app", category: "networking")
```
- **Subsystem**: Reverse-DNS identifier representing the app module or package (e.g., `com.company.app` or `com.company.auth`).
- **Category**: Specific feature area within the subsystem (e.g., `networking`, `database`, `ui`, `payment`).

### The 5 Log Levels (In Order of Severity)
1. **`debug` (`logger.debug(...)`)**:
   - High-volume diagnostic messages.
   - Captured in memory only while actively streaming in Xcode or Console.app. Not written to disk by default.
2. **`info` (`logger.info(...)`)**:
   - Helpful informational messages for troubleshooting non-critical flows.
   - Kept in memory buffers; persisted to disk when an error or fault occurs.
3. **`notice` (`logger.notice(...)` / `logger.log(...)`)**:
   - The default log level. Essential status and lifecycle milestones.
   - Stored in disk log archives up to a storage quota.
4. **`error` (`logger.error(...)`)**:
   - Application-level errors (e.g., network request failed, decoding error).
   - Saved to disk; included in crash reports and sysdiagnose archives.
5. **`fault` (`logger.fault(...)`)**:
   - Critical system-level bugs or impossible states indicating a programming error.
   - Automatically captures thread backtraces and system state for bug reports.

### Privacy and Data Protection
- **Privacy by Default**: To comply with privacy laws (GDPR, CCPA) and protect Personally Identifiable Information (PII):
  - Dynamic strings and objects are automatically redacted as `<private>` in production release builds.
  - Scalar numbers (integers, floats, booleans) are public by default.
- **Explicit Privacy Annotations**:
  ```swift
  logger.info("Order \(orderId, privacy: .public) processed for \(userEmail, privacy: .private)")
  ```
- **Hash Masking**:
  ```swift
  logger.info("Card: \(cardNumber, privacy: .private(mask: .hash))")
  ```

### Tooling & Inspection
- **Console.app**: Live streaming, subsystem filtering (`subsystem:com.prepstops.app`), category filtering (`category:networking`), and log export.
- **OSLogStore**: Swift API to programmatically read past logs from disk to attach diagnostic logs to user bug reports.

---

## 2. Common Misconceptions & Interview Traps

1. **"Using print() in production is harmless"**:
   - *Trap*: Leaving `print()` statements throughout production code.
   - *Reality*: `print()` does synchronous string formatting on the calling thread, hurting 120Hz scrolling performance. It also exposes sensitive PII in plaintext system logs.
2. **"OSLog slows down the app when logging high volumes"**:
   - *Trap*: Fearing that adding debug logs will degrade production performance.
   - *Reality*: OSLog defers string interpolation. If the log level (such as `debug`) is inactive, the string interpolation code is never evaluated!
3. **"Dynamic strings are public by default in OSLog"**:
   - *Trap*: Expecting user names to show in Console.app on customer devices.
   - *Reality*: Dynamic strings are masked as `<private>` unless explicitly annotated with `privacy: .public`.
4. **"NSLog is the same as OSLog"**:
   - *Trap*: Treating `NSLog` and `OSLog` interchangeably.
   - *Reality*: `NSLog` is a legacy Objective-C function that writes to `stderr` and Apple System Log synchronously. `OSLog` is a modern unified kernel-buffered logging daemon.

---

## 3. Interview Answers by Level

- **Fresh**:
  - "OSLog is Apple's modern logging system in iOS. Unlike `print()`, which writes plaintext and slows down the app, OSLog is fast and organizes messages by subsystem and category. It also protects user privacy by hiding sensitive strings as `<private>` in release builds. We use `Logger` with levels like `debug`, `info`, `error`, and `fault`."
- **Junior**:
  - "I use `os.Logger` for all production logging. I organize logs using reverse-DNS subsystems and categories, like `com.app.network`, so we can filter messages in Xcode and Console.app. OSLog is much faster than `print()` because string interpolation is deferred and buffered in kernel memory. I choose levels carefully: `debug` for local development, `info` for milestones, and `error` or `fault` for failures. I also rely on privacy annotations to keep sensitive user data out of device logs."
- **Senior**:
  - "Architecturally, `os.Logger` provides structured telemetry with zero runtime overhead when levels are disabled. In Swift 6, `Logger` is `Sendable`, making it safe across concurrent actor domains. By annotating interpolated values with `privacy: .private(mask: .hash)`, we achieve auditability without leaking PII. Furthermore, we leverage `OSLogStore` to extract recent in-memory log entries programmatically when capturing non-fatal crashes or user feedback diagnostics, attaching structured system context directly to our error tracking pipelines."
