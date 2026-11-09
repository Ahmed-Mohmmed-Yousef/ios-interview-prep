# Fact-Check — Closures: Escaping and Capture Lists (Step 6)

Run 2026-11-09. Topic: `closures-escaping-capture` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/closures-escaping-capture/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/closures-escaping-capture/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures) and [The Swift Programming Language: Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Default closure lifecycle | Closure parameters are non-escaping by default, running synchronously on the stack | Confirmed |
| `@escaping` attribute | Required whenever a closure outlives the function call (stored or scheduled) | Confirmed |
| Non-escaping assignment failure | Assigning non-escaping parameter to stored property fails: `assigning non-escaping parameter to an '@escaping' closure` | Confirmed |
| Reference capture | By default closures capture variables by reference, reading mutations at execution time | Confirmed |
| Value type capture list | `[count]` captures an immutable snapshot of value type at closure definition time | Confirmed |
| `[weak self]` zeroing | `weak` captures an optional reference; ARC zeroes reference to `nil` when instance deallocates | Confirmed |
| `[unowned self]` crash | `unowned` assumes instance is alive; crashes if accessed after deallocation | Confirmed |
| Explicit `self` requirement | Escaping closures require explicit `self.` or inclusion in capture list | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `closures-basics` and `structs-vs-classes`, both published.
2. **Progression**: Sets up Topic 9: `codable` (Codable, Encodable, Decodable, JSON parsing).
