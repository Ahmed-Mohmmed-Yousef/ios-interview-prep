# Fact-Check: Pagination

**Topic ID:** `pagination`  
**Date Checked:** 2026-11-10  
**Checker:** content-fact-checker  
**Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Source Verification

| Claim | Verified Source | Status |
|---|---|---|
| `LazyVStack` creates child row views lazily on demand as they scroll into view | [Apple Developer: LazyVStack](https://developer.apple.com/documentation/swiftui/lazyvstack) | Pass |
| Cursor-based pagination uses an opaque anchor token, preventing duplicate shifts | [Apple Developer: URLComponents](https://developer.apple.com/documentation/foundation/urlcomponents) | Pass |
| Offset-limit pagination calculates skip offsets via `(page - 1) * pageSize` | [Apple Developer: URLComponents](https://developer.apple.com/documentation/foundation/urlcomponents) | Pass |
| Pre-fetching on a threshold item before the end prevents scroll interruptions | [Apple Developer: LazyVStack](https://developer.apple.com/documentation/swiftui/lazyvstack) | Pass |
| `guard !isLoading` stops duplicate network tasks during rapid flings | [Apple Developer: URLSession](https://developer.apple.com/documentation/foundation/urlsession) | Pass |
| Unique identifiers are mandatory for SwiftUI `ForEach` diffing integrity | [WWDC21: Demystify SwiftUI](https://developer.apple.com/videos/play/wwdc2021/10022/) | Pass |
| Pull-to-refresh (`.refreshable`) resets items and cursor state to reload page one | [Apple Developer: URLSession](https://developer.apple.com/documentation/foundation/urlsession) | Pass |

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
