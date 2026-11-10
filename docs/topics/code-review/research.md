# Research: Code Review (code-review)

## 1. Official Documentation & Authoritative Sources
- **Google Engineering Practices**: Code Review Guide
  - URL: `https://google.github.io/eng-practices/review/`
  - Core philosophy: The primary purpose of code review is to ensure that the overall code health of the codebase is improving over time.
  - Standard of Code Review: "There is no such thing as perfect code—there only is better code." Reviewers should approve changes that improve overall code health rather than blocking indefinitely for subjective perfection.

## 2. Core Concepts & iOS Code Review Criteria
- **Code Health & Maintainability**:
  - Focuses on readability, simplicity, testability, and adherence to established project architecture.
  - Discourages over-engineering: code should solve the immediate problem cleanly without adding speculative abstractions.
- **Key Inspection Points for iOS**:
  - **Architecture & SOLID**: Does the pull request respect layer boundaries? Does it avoid massive view models or view controllers?
  - **Memory & ARC**: Are closure capture lists properly using `[weak self]` when long-lived tasks or strong delegate references could create retain cycles?
  - **Concurrency & Swift 6 Safety**: Are shared states isolated to actors or `@MainActor`? Are non-isolated background calls avoiding UI updates?
  - **Error Handling**: Are errors caught and handled gracefully instead of force unwrapping (`!`) or silently ignoring failures?
  - **Test Coverage**: Does the PR include meaningful unit tests that assert on state outcomes and edge cases, rather than superficial tests?
- **Reviewer Etiquette & Communication**:
  - Direct feedback at the code, not the engineer ("This closure captures `self` strongly, which creates a retain cycle" rather than "You made a memory leak").
  - Distinguish blocking requirements from optional suggestions using conventional prefixes (e.g., `nit:`, `suggestion:`, `question:`).
  - Review speed: Reviewing PRs promptly (within hours or 1 business day) prevents merge conflicts, reduces branch staleness, and maintains team velocity.
- **Author Best Practices**:
  - Keep pull requests small (< 200–400 lines). Small PRs receive thorough reviews, uncover more bugs, and merge faster.
  - Provide clear descriptions, issue ticket links, and UI screenshots/recordings for visual changes.
  - Welcome constructive feedback with an open mindset and explain technical trade-offs respectfully.
- **Automation vs Human Judgment**:
  - Delegate formatting, linting (SwiftLint), compilation, and test execution to CI bots.
  - Reserve human reviewer bandwidth for architecture, system design, business logic correctness, and readability.

## 3. Real Interview Questions
1. What is the primary purpose of code reviews on a professional iOS engineering team?
2. What specific iOS architectural, concurrency, and memory pitfalls do you look for during a code review?
3. How do you distinguish between blocking architectural feedback and non-blocking stylistic suggestions?
4. Why is pull request size critical to review quality, and how should large features be split?
5. How do you handle disagreements with another engineer during a code review?
