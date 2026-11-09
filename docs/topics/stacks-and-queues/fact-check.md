# Fact-Check — Stacks and Queues (Step 6)

Run 2026-11-09. Topic: `stacks-and-queues` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/stacks-and-queues/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/stacks-and-queues/questions.json`.
- **Official Documentation**:
  - Verified against [Apple Developer Documentation: Array](https://developer.apple.com/documentation/swift/array) and [GitHub: apple/swift-collections (Deque)](https://github.com/apple/swift-collections).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| LIFO Stack on Array | `Array.append` and `Array.popLast` operate in $\mathcal{O}(1)$ amortized time | Confirmed |
| Array.removeFirst penalty | Head element removal shifts all subsequent elements left in $\mathcal{O}(n)$ time | Confirmed |
| Safe popping | `popLast()` safely returns `nil` on empty collections; `removeLast()` traps with fatal error | Confirmed |
| Two-stack queue | Reversing inbox into outbox when outbox is empty guarantees amortized $\mathcal{O}(1)$ operations | Confirmed |
| Bracket validation | Valid Parentheses requires checking `stack.isEmpty` after iteration to reject unclosed brackets | Confirmed |
| Monotonic stack complexity | Pushing and popping each index at most once bounds total runtime to $\mathcal{O}(n)$ | Confirmed |
| Apple Deque structure | `Deque` from `apple/swift-collections` provides double-ended $\mathcal{O}(1)$ insertion and removal | Confirmed |
| iOS architecture stacks | `UINavigationController` uses LIFO navigation stack; GCD serial dispatch queues use FIFO queues | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `arrays-and-strings` is published and verified.
2. **Progression in Batch 2B**: Third topic in Junior Coding Interview Algorithms, providing linear auxiliary storage techniques before advancing to `linked-lists`.
