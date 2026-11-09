# Fact-Check — Hash Tables (Step 6)

Run 2026-11-09. Topic: `hash-tables` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/hash-tables/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/hash-tables/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Dictionary](https://developer.apple.com/documentation/swift/dictionary), [Apple Developer Documentation: Set](https://developer.apple.com/documentation/swift/set), and [Apple Developer Documentation: Hashable](https://developer.apple.com/documentation/swift/hashable).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Hash table average time | Dictionary and Set lookups average $\mathcal{O}(1)$ time | Confirmed |
| Hash table worst-case time | Hash collision clustering results in $\mathcal{O}(n)$ time | Confirmed |
| Default subscript counting | `counts[key, default: 0] += 1` increments safely without optional unwrapping | Confirmed |
| Two Sum algorithm | Storing visited items in a hash table solves Two Sum in $\mathcal{O}(n)$ time and $\mathcal{O}(n)$ space | Confirmed |
| Set uniqueness | `Set.insert` discards duplicates and returns `(inserted: Bool, memberAfterInsert: Element)` | Confirmed |
| Synthesized Hashable | Compiler automatically synthesizes `Hashable` for structs with conforming members | Confirmed |
| Custom Hashable parity | Inconsistent hashing across `==` and `hash(into:)` breaks set/dictionary lookup | Confirmed |
| SipHash per-process seed | Hash values differ between separate process launches | Confirmed |
| Iteration order | `Dictionary` and `Set` iteration order is non-deterministic | Confirmed |
| Capacity reservation | `reserveCapacity(_:)` allocates bucket storage without altering element count | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `arrays-and-strings` and `collections`, both of which are verified and published.
2. **Progression in Batch 1C**: `hash-tables` concludes the Fresh-level Coding Interview unit, following `big-o` and `arrays-and-strings`.
