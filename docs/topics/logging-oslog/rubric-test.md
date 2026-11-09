# Rubric Test — Logging with OSLog (Step 5)

Run 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

Scoring follows `content/rules.json`:
- Met = full weight
- Partly met = 50% of weight
- Not met = 0
- Missed key criterion (`key: true`) caps the total score at 50% max.
- Topic pass mark: 70%.

---

## Results

| Question | Sample Answer Summary | Score | Key Met? | Result |
|---|---|---|---|---|
| **q24** OSLog vs print() vs NSLog() | **Good:** Explains print() and NSLog() perform synchronous blocking I/O and leak plaintext PII; OSLog provides deferred interpolation, kernel memory buffering, structured subsystems/categories, and privacy redaction. | 100 | Yes | Pass (100%) |
| | **Average:** "print() is slow and leaks private user data in logs. OSLog is fast because string interpolation is deferred, and it organizes logs by subsystem." | 85 | Yes | Pass (85%) |
| | **Weak:** "print() only works in debug mode and cannot be compiled into release builds." | 0 | No | Fail (0%) |
| **q25** The 5 OSLog log levels | **Good:** Lists debug, info, notice, error, fault in order; accurately describes use case for each (debug for local tracing, notice for milestones, error for handled failures, fault for system bugs with stack capture). | 100 | Yes | Pass (100%) |
| | **Average:** Lists the levels and explains most accurately, but confuses notice with info. | 85 | Yes | Pass (85%) |
| | **Weak:** "The levels are Low, Medium, High, and Critical." | 0 | No | Fail (0%) |
| **q26** Privacy protection and public annotations | **Good:** Explains dynamic strings and objects are redacted as `<private>` in release builds by default while scalars are public; explains using `privacy: .public` for safe data and `mask: .hash` for correlation without leaking PII. | 100 | Yes | Pass (100%) |
| | **Average:** "Dynamic strings are private by default in release builds. You use privacy: .public to make non-sensitive values visible in device logs." | 85 | Yes | Pass (85%) |
| | **Weak:** "OSLog encrypts messages using user Face ID biometric keys." | 0 | No | Fail (0%) |
| **q27** Subsystems and categories in OSLog | **Good:** Defines subsystem as reverse-DNS identifier and category as feature domain; explains how structured hierarchy enables filtering in Console.app and Xcode 15+ without searching noisy output. | 100 | Yes | Pass (100%) |
| | **Average:** "Subsystems like com.app and categories like networking let teams filter logs in Console.app to find relevant messages quickly." | 85 | Yes | Pass (85%) |
| | **Weak:** "Subsystems determine which device speaker plays the log sound." | 0 | No | Fail (0%) |
| **q28** OSLogStore and diagnostic telemetry | **Good:** Explains OSLogStore queries past unified log entries programmatically from disk or memory buffers, allowing structured export attached to user bug reports or crash logs without third-party SDKs. | 100 | Yes | Pass (100%) |
| | **Average:** "OSLogStore lets you read recent logs in code and attach them to feedback forms or crash reports." | 85 | Yes | Pass (85%) |
| | **Weak:** "OSLogStore is an online App Store section for purchasing developer logs." | 0 | No | Fail (0%) |
| **q29** `AppLogger` struct with `logger` and `logInfo` | **Good:** Defines `AppLogger` with static `logger` initialized with subsystem `com.prepstops.app` and category `general`, and static `logInfo(message:)` logging via `logger.info`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements struct and static logger, but omits static keyword on `logInfo`. | 70 | Yes | Pass (70%) |
| | **Weak:** Missing Logger initialization or wrong parameter types. | 20 | No | Fail (20%) |
| **q30** `NetworkTelemetry` struct with `logStatus` | **Good:** Implements `logStatus(code:)` returning `Success` for 200...299 and `Error` otherwise. | 100 | Yes | Pass (100%) |
| | **Average:** Handles 200...299 correctly, but returns empty string instead of `Error` on failure. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns `Success` for all status codes. | 10 | No | Fail (10%) |
| **q31** `PrivacyFilter` struct with `redactSensitive` | **Good:** Implements static `redactSensitive(key:value:)` returning `[REDACTED]` for `password` or `token`, and `value` otherwise. | 100 | Yes | Pass (100%) |
| | **Average:** Redacts `password`, but forgets to check for `token`. | 60 | Yes | Fail (60%) |
| | **Weak:** Returns constant `[REDACTED]` for all keys. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate clear understanding of OSLog advantages over `print()` and `NSLog()`.
2. Verify knowledge of the 5 log levels and their severity progression.
3. Test comprehension of automated privacy redaction, scalar defaults, and hash masking.
4. Reinforce subsystem and category taxonomy for diagnostic filtering in Console.app.
5. Emphasize OSLogStore for on-device telemetry capture without third-party dependencies.
6. Grade Swift 6 telemetry structs and privacy filters accurately.
