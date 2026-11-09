# Fact-Check — Permissions and Privacy (Step 6)

Run 2026-11-09. Topic: `permissions-privacy` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/permissions-privacy/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/permissions-privacy/questions.json`.
- **Official Documentation**:
  - Verified against [Protecting the User’s Privacy (UIKit)](https://developer.apple.com/documentation/uikit/protecting-the-user-s-privacy), [Human Interface Guidelines: Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy), and [Privacy manifest files (Bundle Resources)](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Missing Purpose String Crash | Calling protected APIs without Info.plist description triggers fatal SIGABRT exception | Confirmed |
| One-Time System Prompt | iOS shows system permission dialog only once per app installation; subsequent requests return status | Confirmed |
| Settings URL Navigation | `UIApplication.openSettingsURLString` deep-links directly to app privacy settings in system Settings app | Confirmed |
| Restricted Status Immutability | `.restricted` cannot be toggled by user in Settings due to MDM or Screen Time restrictions | Confirmed |
| Photo Library Limited Access | `PHAuthorizationStatus.limited` allows user-selected photo picking introduced in iOS 14+ | Confirmed |
| Privacy Manifest Requirement | `PrivacyInfo.xcprivacy` declares tracking domains, collected data types, and Required Reason APIs | Confirmed |
| Required Reason APIs | Specific system APIs (e.g. file timestamps, boot time, disk space) require Apple-approved reasons | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `app-lifecycle` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Fourth topic in Batch 2E (Design, System & Data), following app lifecycle and leading into app signing, App Store distribution, and networking fundamentals.
