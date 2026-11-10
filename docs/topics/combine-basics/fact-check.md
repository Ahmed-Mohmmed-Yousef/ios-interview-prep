# Fact-Check: Combine Basics

**Topic ID:** `combine-basics`  
**Date Checked:** 2026-11-10  
**Checker:** content-fact-checker  
**Baseline:** Swift 6.0, iOS 17+, Xcode 16+

---

## 1. Source Verification

| Claim | Verified Source | Status |
|---|---|---|
| Publishers produce values over time and complete with either finished or failure | [Apple Developer: Combine](https://developer.apple.com/documentation/combine) | Pass |
| Subscribers receive values and demand elements through backpressure | [Apple Developer: Receiving and Handling Events with Combine](https://developer.apple.com/documentation/combine/receiving-and-handling-events-with-combine) | Pass |
| `AnyCancellable` tears down subscriptions on deallocation or when calling `cancel()` | [Apple Developer: Receiving and Handling Events with Combine](https://developer.apple.com/documentation/combine/receiving-and-handling-events-with-combine) | Pass |
| `PassthroughSubject` broadcasts events downstream without storing past elements | [Apple Developer: Combine](https://developer.apple.com/documentation/combine) | Pass |
| `CurrentValueSubject` stores and immediately replays its current value to subscribers | [Apple Developer: Combine](https://developer.apple.com/documentation/combine) | Pass |
| `assign(to:on: self)` creates a retain cycle unless `sink` with `[weak self]` or `assign(to: &$prop)` is used | [Apple Developer: Combine](https://developer.apple.com/documentation/combine) | Pass |
| Swift Concurrency (`async/await`, `AsyncStream`) is prioritized for new code while Combine serves existing apps | [Swift Evolution & Apple Concurrency](https://developer.apple.com/documentation/combine) | Pass |

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
