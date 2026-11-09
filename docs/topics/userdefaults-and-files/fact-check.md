# Fact-Check — UserDefaults and Files (Step 6)

Run 2026-11-09. Topic: `userdefaults-and-files` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/userdefaults-and-files/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/userdefaults-and-files/questions.json`.
- **Official Documentation**:
  - Verified against [UserDefaults (Foundation)](https://developer.apple.com/documentation/foundation/userdefaults), [FileManager (Foundation)](https://developer.apple.com/documentation/foundation/filemanager), and [File System Basics (Apple Developer Archive)](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| UserDefaults Launch Overhead | The plist file is deserialized in its entirety into memory at app launch | Confirmed |
| Plaintext Insecurity | UserDefaults stores unencrypted property lists; passwords and tokens belong in Keychain | Confirmed |
| Sandbox Directory Rules | `Documents/` backs up to iCloud; `Library/Caches/` is purgeable and excluded from backup | Confirmed |
| Application Support Directory | `Library/Application Support/` stores internal operational databases; hidden from Files app | Confirmed |
| Atomic File Writing | `Data.WritingOptions.atomic` writes to an auxiliary temporary file before renaming | Confirmed |
| Deprecation of synchronize() | `synchronize()` is deprecated since iOS 12; writes persist asynchronously automatically | Confirmed |
| SwiftUI @AppStorage | Automatically updates SwiftUI views and writes to UserDefaults keys | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `codable` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Eighth topic in Batch 2E (Design, System & Data), bridging general data storage concepts with secure credential storage in `keychain-basics`.
