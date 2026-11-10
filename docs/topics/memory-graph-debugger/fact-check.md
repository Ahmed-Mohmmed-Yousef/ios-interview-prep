# Fact Check Report: Finding Leaks with the Memory Graph

**Topic ID:** `memory-graph-debugger`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Apple Developer Documentation: *Gathering information about memory use (Xcode)*  
   URL: https://developer.apple.com/documentation/xcode/gathering-information-about-memory-use
2. WWDC18: *iOS Memory Deep Dive (Session 416)*  
   URL: https://developer.apple.com/videos/play/wwdc2018/416/
3. The Swift Programming Language: *Automatic Reference Counting*  
   URL: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Memory Graph button pauses process and snapshots heap | Apple Developer Documentation | Verified | Standard Xcode debugger workflow. |
| Purple exclamation badge highlights retain cycles | Apple Developer Documentation | Verified | Visual indicator in the Debug Navigator. |
| Malloc Stack Logging records allocation backtraces | Apple Developer Documentation | Verified | Configured in Scheme > Run > Diagnostics. |
| Selecting node with Malloc Stack Logging shows code line | Apple Developer Documentation | Verified | Displayed in the Memory Inspector pane. |
| Abandoned memory reachable from roots lacks purple badges | WWDC18 Session 416 | Verified | Leaks detection isolates cycles with zero external roots. |
| `.memgraph` files preserve memory graph for offline CLI analysis | WWDC18 Session 416 | Verified | Exported via File > Export Memory Graph. |
| `leaks` CLI scans `.memgraph` files for cycles | WWDC18 Session 416 | Verified | Used in CI/CD automation pipelines. |
| `vmmap` reports virtual memory breakdown (dirty vs clean) | WWDC18 Session 416 | Verified | iOS terminates apps due to high dirty memory. |
| `malloc_history` prints allocation backtrace for an address | Apple Developer Documentation | Verified | Requires Malloc Stack Logging in memgraph. |
| `[weak self]` prevents closure retain cycles | Swift Programming Language | Verified | Reference count not incremented; optional self. |

---

## Code Verification
- `content/topics/memory-graph-debugger/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/memory-graph-debugger/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.

## Conclusion
All technical claims, Xcode diagnostics workflows, and Swift 6 code examples for `memory-graph-debugger` are verified, accurate, and aligned with Apple's official documentation.
