# Fact-Check: Caching

**Topic ID:** `caching`  
**Date Checked:** 2026-11-10  
**Checker:** content-fact-checker  
**Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Source Verification

| Claim | Verified Source | Status |
|---|---|---|
| `URLCache` maps requests to `CachedURLResponse` across RAM and disk storage | [Apple Developer: URLCache](https://developer.apple.com/documentation/foundation/urlcache) | Pass |
| `NSCache` automatically purges in-memory objects under system memory pressure | [Apple Developer: NSCache](https://developer.apple.com/documentation/foundation/nscache) | Pass |
| `NSCache` is thread-safe and can be accessed concurrently without manual locks | [Apple Developer: NSCache](https://developer.apple.com/documentation/foundation/nscache) | Pass |
| `URLRequest.CachePolicy.useProtocolCachePolicy` defers to HTTP headers | [Apple Developer: Accessing cached data](https://developer.apple.com/documentation/foundation/accessing-cached-data) | Pass |
| `.returnCacheDataElseLoad` returns cached data first and loads only if absent | [Apple Developer: Accessing cached data](https://developer.apple.com/documentation/foundation/accessing-cached-data) | Pass |
| `.returnCacheDataDontLoad` acts as an offline mode without network calls | [Apple Developer: Accessing cached data](https://developer.apple.com/documentation/foundation/accessing-cached-data) | Pass |
| `304 Not Modified` indicates cached payload is unchanged and valid | [Apple Developer: Accessing cached data](https://developer.apple.com/documentation/foundation/accessing-cached-data) | Pass |
| Caching decoded bitmaps in `NSCache` avoids repeated CPU decompression | [Apple Developer: NSCache](https://developer.apple.com/documentation/foundation/nscache) | Pass |

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
