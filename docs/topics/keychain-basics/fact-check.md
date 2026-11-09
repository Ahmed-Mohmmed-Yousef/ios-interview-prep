# Fact-Check — Keychain Basics (Step 6)

Run 2026-11-09. Topic: `keychain-basics` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/keychain-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/keychain-basics/questions.json`.
- **Official Documentation**:
  - Verified against [Keychain services (Security)](https://developer.apple.com/documentation/security/keychain-services), [Storing Keys in the Keychain (Security)](https://developer.apple.com/documentation/security/storing-keys-in-the-keychain), and [Searching for Keychain Items (Security)](https://developer.apple.com/documentation/security/keychain_services/keychain_items/searching_for_keychain_items).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Hardware-backed securityd Daemon | Keychain items are managed by system daemon `securityd` and encrypted using Secure Enclave | Confirmed |
| Persistence across App Deletion | Keychain items persist across app uninstalls on physical hardware; sandbox files do not | Confirmed |
| Generic Password Item Class | `kSecClassGenericPassword` is the standard class for app passwords and auth tokens | Confirmed |
| Unique Item Primary Keys | `kSecAttrService` and `kSecAttrAccount` uniquely identify generic password records | Confirmed |
| SecItem CRUD Operations | `SecItemAdd`, `SecItemCopyMatching`, `SecItemUpdate`, and `SecItemDelete` handle storage | Confirmed |
| Error Status Codes | `errSecSuccess` (0), `errSecDuplicateItem` (-25299), `errSecItemNotFound` (-25300) | Confirmed |
| Accessibility Policies | `kSecAttrAccessibleWhenUnlocked` vs `kSecAttrAccessibleAfterFirstUnlock` for background execution | Confirmed |
| Deprecation of kSecAttrAccessibleAlways | Deprecated in iOS 9 due to vulnerability when device is locked | Confirmed |
| Team ID Keychain Sharing | `kSecAttrAccessGroup` with shared developer Team ID prefix enables cross-target sharing | Confirmed |
| Small Secret Optimization | Keychain is optimized for small secrets under a few kilobytes; files should use filesystem storage | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `userdefaults-and-files` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Ninth and final topic in Batch 2E (Design, System & Data), completing the entire batch.
