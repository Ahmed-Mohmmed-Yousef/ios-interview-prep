# Rubric Test — Permissions and Privacy (Step 5)

Done 2026-11-09. Each of the 8 AI-graded questions (5 written, 3 code-write) was tested against its rubric with three sample answers: Good (meets criteria), Average (partially meets / misses non-key details), and Weak (incorrect / misses key criteria).

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
| **q24** Purpose strings in `Info.plist` and missing key behavior | **Good:** Explains purpose strings in `Info.plist` are human-readable explanations of why an app needs sensitive user data or hardware; notes that accessing a resource without the key triggers an immediate SIGABRT crash. | 100 | Yes | Pass (100%) |
| | **Average:** "Purpose strings explain why the camera is needed. If you forget it, the app crashes on launch." | 80 | Yes | Pass (80%) |
| | **Weak:** "Purpose strings translate app icons into other languages." | 0 | No | Fail (0%) |
| **q25** `.denied` vs `.restricted` authorization status | **Good:** Explains `.denied` means the user chose not to allow access and should be directed to system Settings; contrasts with `.restricted` where parental controls or MDM profiles lock the setting so opening Settings is unhelpful. | 100 | Yes | Pass (100%) |
| | **Average:** "Denied means user tapped no so open Settings. Restricted means Screen Time or device controls block it." | 85 | Yes | Pass (85%) |
| | **Weak:** "Denied and restricted are identical and show the same popup." | 0 | No | Fail (0%) |
| **q26** In-context permission requests vs launch requests | **Good:** Defines in-context requests as prompting only when a user taps a feature requiring access; explains upfront launch prompts lack context and cause user distrust and high denial rates. | 100 | Yes | Pass (100%) |
| | **Average:** "Ask when the user taps the camera button instead of app launch so they know why." | 80 | Yes | Pass (80%) |
| | **Weak:** "Apple requires asking at launch to pass App Store review." | 0 | No | Fail (0%) |
| **q27** `PrivacyInfo.xcprivacy` and declared categories | **Good:** Identifies `PrivacyInfo.xcprivacy` as the official privacy manifest required for iOS apps and SDKs; lists declared categories including tracking domains, collected user data types, and Required Reason APIs. | 100 | Yes | Pass (100%) |
| | **Average:** "It is a privacy manifest file that lists tracking domains and reasons for using sensitive APIs." | 80 | Yes | Pass (80%) |
| | **Weak:** "It is a Swift file containing user passwords." | 0 | No | Fail (0%) |
| **q28** Permission priming screens | **Good:** Explains a priming screen is an in-app custom view explaining user benefit before the system prompt; notes it preserves the one-time system dialog if the user is not ready. | 100 | Yes | Pass (100%) |
| | **Average:** "A priming screen explains why permission is needed before showing the real system alert." | 75 | Yes | Pass (75%) |
| | **Weak:** "A priming screen bypasses the system permission popup entirely." | 0 | No | Fail (0%) |
| **q29** `PermissionValidator` shouldPromptUser method | **Good:** Declares `struct PermissionValidator` with `static func shouldPromptUser(status: String) -> Bool` returning `status == "notDetermined"`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements method returning boolean check, but checks for lowercase string variations. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant true without inspecting the status string. | 25 | No | Fail (25%) |
| **q30** `PrivacyManager` filterDomains method | **Good:** Declares `struct PrivacyManager` with `var isTrackingAllowed: Bool` and `func filterDomains(domains: [String]) -> [String]` returning domains or empty array. | 100 | Yes | Pass (100%) |
| | **Average:** Implements filter method, but creates a mutable copy with a loop instead of simple ternary. | 80 | Yes | Pass (80%) |
| | **Weak:** Does not store `isTrackingAllowed` or returns unfiltered domains always. | 20 | No | Fail (20%) |
| **q31** `PhotoPermissionHandler` determineAccessLevel method | **Good:** Declares `class PhotoPermissionHandler` with `func determineAccessLevel(status: String) -> String` mapping authorized to full, limited to partial, and other to none. | 100 | Yes | Pass (100%) |
| | **Average:** Maps authorized and limited, but omits the default case or returns empty string. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant string without evaluating status parameter. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Validate understanding of `Info.plist` purpose strings and SIGABRT crash behavior on omission.
2. Verify understanding of `.denied` user routing versus `.restricted` parental lock handling.
3. Assess best practices for in-context permission priming over upfront launch prompts.
4. Verify knowledge of `PrivacyInfo.xcprivacy` manifests and Required Reason APIs.
5. Validate clean Swift 6 code implementations for prompt validation, tracking domain gating, and granular access level mapping.
