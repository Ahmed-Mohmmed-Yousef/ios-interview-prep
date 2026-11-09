# Rubric Test — App Signing and the App Store (Step 5)

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
| **q24** The Code Signing Triangle components | **Good:** Identifies Certificate (proves identity), App ID (capabilities), and Provisioning Profile (binding glue linking identity, capabilities, and device eligibility). | 100 | Yes | Pass (100%) |
| | **Average:** "The triangle is certificates, app IDs, and provisioning profiles that let you install the app." | 80 | Yes | Pass (80%) |
| | **Weak:** "The triangle is git, Xcode, and CocoaPods." | 0 | No | Fail (0%) |
| **q25** Device UDID inclusion in profiles | **Good:** Explains development profiles restrict testing to registered hardware UDIDs, while App Store profiles omit UDIDs because Apple signs releases for universal customer installation. | 100 | Yes | Pass (100%) |
| | **Average:** "Dev profiles need your test iPhone UDIDs. App Store profiles do not because Apple signs the final app." | 85 | Yes | Pass (85%) |
| | **Weak:** "App Store profiles require registering every customer phone." | 0 | No | Fail (0%) |
| **q26** `CFBundleShortVersionString` vs `CFBundleVersion` | **Good:** Differentiates public marketing version from internal build number; explains each new upload requires an increased build number or App Store Connect rejects it. | 100 | Yes | Pass (100%) |
| | **Average:** "ShortVersionString is for users and CFBundleVersion is the build number that must go up." | 80 | Yes | Pass (80%) |
| | **Weak:** "They are identical version keys that can be set to any random string." | 0 | No | Fail (0%) |
| **q27** Phased Release 7-day schedule and benefits | **Good:** Describes the progressive rollout (1%, 2%, 5%, 10%, 20%, 50%, 100%); explains it mitigates risk by allowing teams to detect and pause rollout before all users get a buggy release. | 100 | Yes | Pass (100%) |
| | **Average:** "Phased release rolls out an update over 7 days starting at 1% so you can pause if there are crashes." | 85 | Yes | Pass (85%) |
| | **Weak:** "Phased release is a beta test for up to 100 internal employees." | 0 | No | Fail (0%) |
| **q28** Internal vs External Testing in TestFlight | **Good:** States internal testing has a 100-member limit with immediate availability and no review; external testing allows up to 10,000 public testers and requires Beta App Review for version builds. | 100 | Yes | Pass (100%) |
| | **Average:** "Internal is for team members without review. External is for up to 10,000 testers with beta review." | 85 | Yes | Pass (85%) |
| | **Weak:** "Internal and external testing have the same 1,000 tester limit." | 0 | No | Fail (0%) |
| **q29** `VersionComparator` isBuildEligible method | **Good:** Declares `struct VersionComparator` with `static func isBuildEligible(current: Int, previous: Int) -> Bool` returning `current > previous`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements comparison, but uses `>=` instead of strictly greater than. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns constant true without checking integer parameters. | 25 | No | Fail (25%) |
| **q30** `ProfileClassifier` requiresUDIDRegistration method | **Good:** Declares `struct ProfileClassifier` with `func requiresUDIDRegistration(profileType: String) -> Bool` returning true for development or adHoc. | 100 | Yes | Pass (100%) |
| | **Average:** Checks development, but forgets to check adHoc. | 70 | Yes | Pass (70%) |
| | **Weak:** Returns false for all input strings. | 20 | No | Fail (20%) |
| **q31** `PhasedReleaseScheduler` percentageForDay method | **Good:** Declares `class PhasedReleaseScheduler` with `func percentageForDay(day: Int) -> Int` mapping days 1-7 to 1, 2, 5, 10, 20, 50, 100, and handling `day < 1`. | 100 | Yes | Pass (100%) |
| | **Average:** Implements mapping, but returns 100 for day 0 or negative days. | 75 | Yes | Pass (75%) |
| | **Weak:** Returns day number as percentage directly. | 20 | No | Fail (20%) |

---

## Verdict

The rubrics successfully:
1. Assess foundational code signing architecture (Certificates, App IDs, Profiles).
2. Validate understanding of UDID device requirements in development versus App Store distribution.
3. Test distinction between marketing versions and monotonic build number requirements.
4. Verify knowledge of Phased Release 7-day schedules and blast radius mitigation.
5. Contrast TestFlight internal team testing with external public beta testing.
6. Validate clean Swift 6 implementations for build comparisons, profile classifications, and rollout scheduling.
