# Fact-Check — App Signing and the App Store (Step 6)

Run 2026-11-09. Topic: `signing-app-store` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/signing-app-store/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/signing-app-store/questions.json`.
- **Official Documentation**:
  - Verified against [Distributing your app for beta testing and releases (Xcode)](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases), [App Review Guidelines - Apple Developer](https://developer.apple.com/app-store/review/guidelines/), and [Code Signing (Apple Developer Support)](https://developer.apple.com/support/code-signing/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Code Signing Guarantees | Cryptographically verifies developer identity and guarantees code/resource integrity | Confirmed |
| Signing Triangle | Provisioning profiles bind signing certificates, App IDs with entitlements, and device UDIDs | Confirmed |
| App Store Profile UDID Omission | App Store distribution profiles omit device UDIDs; Apple re-encrypts and signs with FairPlay | Confirmed |
| Version vs Build Numbers | `CFBundleShortVersionString` is user marketing version; `CFBundleVersion` is monotonic build integer | Confirmed |
| Lost Private Key Recovery | Apple stores only public certificates; lost private keys require revoking and regenerating | Confirmed |
| TestFlight Quotas | Internal testing supports up to 100 team members; external testing supports up to 10,000 testers | Confirmed |
| Phased Release Progression | 7-day progressive rollout: Day 1 (1%), Day 2 (2%), Day 3 (5%), Day 4 (10%), Day 5 (20%), Day 6 (50%), Day 7 (100%) | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `xcode-and-git-basics` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Fifth topic in Batch 2E (Design, System & Data), completing the system release track and bridging into the networking sequence (`http-rest-basics` and `urlsession`).
