# Fact-Check — Codable and JSON (Step 6)

Run 2026-11-09. Topic: `codable` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/codable/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/codable/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Codable](https://developer.apple.com/documentation/swift/codable), [Encoding and Decoding Custom Types](https://developer.apple.com/documentation/foundation/encoding-and-decoding-custom-types), and [JSONDecoder](https://developer.apple.com/documentation/foundation/jsondecoder).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| `Codable` definition | `typealias Codable = Encodable & Decodable` in Swift Standard Library | Confirmed |
| Automatic synthesis | When all stored properties conform to `Codable`, `CodingKeys` and serialization methods are synthesized automatically | Confirmed |
| `CodingKeys` requirement | When custom `CodingKeys` enum is declared, all participating stored properties must have cases | Confirmed |
| `decodeIfPresent` | Returns `nil` when a key is absent or contains JSON null; allows safe fallback defaults | Confirmed |
| `keyDecodingStrategy = .convertFromSnakeCase` | Automatically maps snake_case JSON keys to camelCase Swift properties | Confirmed |
| `DecodingError` hierarchy | Throws `keyNotFound`, `typeMismatch`, `valueNotFound`, or `dataCorrupted` with contextual paths | Confirmed |
| Date decoding | Supports `.iso8601`, `.secondsSince1970`, `.millisecondsSince1970`, `.deferredToDate` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `protocols` and `error-handling`, both published.
2. **Progression**: Completes Batch 2A (Swift Language Advanced - 9 topics). All 9 topics are published!
