# Fact Check Report: AsyncSequence and AsyncStream

**Topic ID:** `async-sequences`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Apple Developer Documentation: *AsyncSequence*  
   URL: https://developer.apple.com/documentation/swift/asyncsequence
2. Apple Developer Documentation: *AsyncStream*  
   URL: https://developer.apple.com/documentation/swift/asyncstream
3. WWDC21: *Meet AsyncSequence (Session 10058)*  
   URL: https://developer.apple.com/videos/play/wwdc2021/10058/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| `AsyncSequence` delivers elements over time via `for await` | Apple Developer Documentation | Verified | Asynchronous counterpart to Swift `Sequence`. |
| Returning `nil` from `next()` terminates iteration | Apple Developer Documentation | Verified | Standard protocol requirement of `AsyncIteratorProtocol`. |
| `AsyncStream` bridges callbacks and closures | Apple Developer Documentation | Verified | Uses continuation closure to adapt events. |
| `continuation.yield` emits values to stream | Apple Developer Documentation | Verified | Pushes element into the stream buffer. |
| `continuation.finish()` signals sequence completion | Apple Developer Documentation | Verified | Omission causes consumer `for await` loop to hang. |
| `continuation.onTermination` cleans up resources on cancel | Apple Developer Documentation | Verified | Vital for stopping hardware sensors and sockets. |
| Default buffering policy is `.unbounded` | Apple Developer Documentation | Verified | Can cause memory buildup if consumer lags producer. |
| `bufferingNewest` drops older elements | Apple Developer Documentation | Verified | Retains most recent elements up to buffer limit. |
| `URLSession.shared.bytes(from:)` returns `AsyncBytes` | WWDC21 Session 10058 | Verified | Standard library async sequence for streaming HTTP bytes. |
| `AsyncSequence` is pull-based while Combine is push-based | WWDC21 Session 10058 | Verified | In async sequences, consumer awaits each element. |

---

## Code Verification
- `content/topics/async-sequences/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/async-sequences/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All technical assertions, streaming lifecycle behaviors, buffering policies, and Swift 6 code examples for `async-sequences` are verified, accurate, and aligned with official Apple specifications.
