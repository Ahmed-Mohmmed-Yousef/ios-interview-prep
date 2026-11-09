# Fact-Check — SOLID Basics (Step 6)

Run 2026-11-09. Topic: `solid-basics` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/solid-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/solid-basics/questions.json`.
- **Official Documentation & Core Sources**:
  - Verified against [The Swift Programming Language: Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols) and [Solid Relevance (Clean Coder Blog)](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Single Responsibility Principle (SRP) | Modules have one reason to change, separating networking, persistence, and views | Confirmed |
| Open/Closed Principle (OCP) | Using protocol conformance enables new feature types without altering working code | Confirmed |
| Liskov Substitution Principle (LSP) | Subtypes must preserve parent behavioral contracts; overriding with fatalError violates LSP | Confirmed |
| Interface Segregation Principle (ISP) | Swift protocols are small and composable using the `&` operator (e.g. `Readable & Writable`) | Confirmed |
| Dependency Inversion Principle (DIP) | High-level modules depend on abstractions (protocols); enables fast in-memory test mocks | Confirmed |
| DIP vs Dependency Injection | DIP is the architectural principle; DI is the injection technique (initializer/property) | Confirmed |
| Protocol Composition | Swift supports `protocol A` & `protocol B` composition without fat god interfaces | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `protocols` is confirmed as published prerequisite.
2. **Progression in Batch 2F**: Third topic in Batch 2F (Architecture & Testing).
