# Fact-Check — Linked Lists (Step 6)

Run 2026-11-09. Topic: `linked-lists` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/linked-lists/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/linked-lists/questions.json`.
- **Official Documentation**:
  - Verified against [Swift Programming Language: Structures and Classes](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures/) and [Swift Programming Language: Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Node reference semantics | Nodes must be classes; recursive structs fail compilation with recursive layout error | Confirmed |
| Weak backward pointers | In doubly-linked lists, `weak var prev: ListNode?` breaks ARC strong reference cycles | Confirmed |
| In-place list reversal | 3-pointer reversal runs in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ space | Confirmed |
| Floyd's cycle detection | Fast (2 steps) and slow (1 step) pointers detect cycles; requires `===` for pointer identity | Confirmed |
| Sentinel dummy head | Dummy nodes eliminate edge-case conditionals when removing or inserting head nodes | Confirmed |
| Prepend vs Index access | Prepending takes $\mathcal{O}(1)$ time; sequential traversal to index $k$ takes $\mathcal{O}(k)$ time | Confirmed |
| Fast/slow middle discovery | Slow pointer lands on middle node when fast pointer reaches list termination | Confirmed |
| ARC deallocation recursion | Releasing very deep linked lists recursively can exceed thread call stack frames | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `structs-vs-classes` and `big-o` are both published and verified.
2. **Progression in Batch 2B**: Fourth topic in Junior Coding Interview Algorithms, connecting reference type semantics to pointer manipulation before tackling `recursion`.
