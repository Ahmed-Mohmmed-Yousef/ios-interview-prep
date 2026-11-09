# Fact-Check — Strings and Characters (Step 6)

Run 2026-11-09. Topic: `strings-and-characters` (fresh). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/strings-and-characters/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/strings-and-characters/questions.json`.
- **Official Documentation**:
  - All facts verified against [The Swift Programming Language: Strings and Characters](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters) and [Apple Developer Documentation: String](https://developer.apple.com/documentation/swift/string).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, valid `<QuickCheck>` blocks, valid `<Trap>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited idioms, plain English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Integer subscripting on String | `str[0]` fails compile time: `cannot subscript String with an Int, use a String.Index instead.` | Confirmed |
| Combining accent grapheme count | `"cafe\u{301}".count == 4` | Confirmed |
| Canonical equivalence | `"cafe\u{301}" == "café"` is `true` | Confirmed |
| Flag emoji grapheme count | `"🇺🇸".count == 1`, `"🇺🇸".utf8.count == 8` | Confirmed |
| Substring return type on slice | `type(of: str[..<idx]) == Substring.self` | Confirmed |
| Substring conversion to String | `String(sub)` creates independent buffer | Confirmed |
| Subscripting at `endIndex` | Traps with runtime crash (past-the-end index) | Confirmed |
| Multi-line literal indentation | Strips whitespace matching closing delimiter | Confirmed |
| Trailing backslash in multi-line string | Suppresses newline character | Confirmed |
| `String.isEmpty` | $O(1)$ efficiency checking `startIndex == endIndex` | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: Correctly lists `swift-basics`, which was verified and published.
2. **Readiness for Next Topics**: Sets up foundational collection and indexing concepts for `collections`, `control-flow`, and `functions`.
