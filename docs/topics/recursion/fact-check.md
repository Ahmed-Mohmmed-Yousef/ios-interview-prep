# Fact-Check — Recursion (Step 6)

Run 2026-11-09. Topic: `recursion` (junior). Baseline: Swift 6.4, Xcode 27, macOS 27.2 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/recursion/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/recursion/questions.json`.
- **Official Documentation**:
  - Verified against [Swift Programming Language: Functions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions/) and [Apple Developer Documentation: Standard Library](https://developer.apple.com/documentation/swift).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Base case necessity | Omitting base case causes unbounded recursion and thread stack overflow crash | Confirmed |
| Call stack depth space | Every active recursive call pushes a stack frame; space complexity is $\mathcal{O}(\text{depth})$ | Confirmed |
| Tail call optimization | Swift language specification does not guarantee TCO; release mode can optimize but debug/ARC disables it | Confirmed |
| Branching complexity | Naive recursive Fibonacci branches into $\mathcal{O}(2^n)$ calls | Confirmed |
| Memoization optimization | Passing an inout dictionary cache resolves subproblems in $\mathcal{O}(1)$ time, achieving $\mathcal{O}(n)$ total time | Confirmed |
| Stack frame allocation | Frames store local parameters, local variables, and the return address | Confirmed |
| Iterative stack transformation | Any recursive algorithm can be rewritten iteratively using an explicit heap stack | Confirmed |
| iOS thread stack sizes | Secondary threads default to 512 KB, main thread to 1 MB | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `functions` and `big-o` are both published and verified.
2. **Progression in Batch 2B**: Fifth topic in Junior Coding Interview Algorithms, preceding `matrix-problems` where recursive DFS grid traversals are applied.
