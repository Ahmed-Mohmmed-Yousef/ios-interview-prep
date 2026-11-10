# Fact-Check: SwiftData

**Topic ID:** `swiftdata`  
**Date Checked:** 2026-11-10  
**Checker:** content-fact-checker  
**Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Source Verification

| Claim | Verified Source | Status |
|---|---|---|
| SwiftData uses the `@Model` macro to transform Swift classes into stored schema models | [Apple Developer: SwiftData](https://developer.apple.com/documentation/swiftdata) | Pass |
| `ModelContainer` manages database schema and SQLite files on disk or in RAM | [Apple Developer: ModelContainer](https://developer.apple.com/documentation/swiftdata/modelcontainer) | Pass |
| `ModelContext` acts as the in-memory scratchpad for tracking insertions, deletions, and updates | [Apple Developer: ModelContext](https://developer.apple.com/documentation/swiftdata/modelcontext) | Pass |
| `@Query` fetches models into SwiftUI views and automatically updates when data changes | [Apple Developer: Query](https://developer.apple.com/documentation/swiftdata/query) | Pass |
| `#Predicate` macro checks query expressions at compile time | [WWDC23: Meet SwiftData](https://developer.apple.com/videos/play/wwdc2023/10187/) | Pass |
| Models are non-Sendable; pass `PersistentIdentifier` across actors and background tasks | [Apple Developer: ModelActor](https://developer.apple.com/documentation/swiftdata/modelactor) | Pass |
| In-memory containers use `ModelConfiguration(isStoredInMemoryOnly: true)` | [Apple Developer: ModelContainer](https://developer.apple.com/documentation/swiftdata/modelcontainer) | Pass |
| Cascade delete rule removes children when parent is deleted | [Apple Developer: SwiftData](https://developer.apple.com/documentation/swiftdata) | Pass |

---

## 2. Code Verification

- 2 lesson code examples compiled and run using `swiftc -swift-version 6`: **Passed**.
- 8 code-reading questions compiled and run using `swiftc -swift-version 6`: **Passed**.
- 3 code-write model answers compiled and run using `swiftc -swift-version 6`: **Passed**.
- Total verified code snippets: 13. All outputs match 100%.

---

## 3. Coverage & Quality Gates

- `scripts/check-coverage.mjs`: 0 errors, 0 warnings, 0 untaught terms.
- Plain English checks (`.claude/hooks/check-plain-english.mjs`): 0 banned words, all sentences <= 25 words, no contractions.
- Answer distribution: exactly 6 a, 6 b, 6 c, 5 d across 23 choice questions.
- Length ratio: right option length <= 1.5x longest wrong option on all questions.
- Rubrics: all 8 open questions have rubrics summing to 100 with key criteria marked.
