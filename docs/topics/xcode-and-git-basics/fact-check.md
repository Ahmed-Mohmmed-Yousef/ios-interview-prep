# Fact-Check — Xcode, Projects and Git (Step 6)

Run 2026-11-09. Topic: `xcode-and-git-basics` (fresh). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/xcode-and-git-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/xcode-and-git-basics/questions.json`.
- **Official Documentation**:
  - All facts verified against [Apple Developer Documentation: Creating an Xcode project for an app](https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app), [Apple Developer Documentation: Source control management in Xcode](https://developer.apple.com/documentation/xcode/source-control-management), and [Git Documentation](https://git-scm.com/doc).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are ≤ 1.5× the length of the longest wrong answer.
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Target vs Scheme role | Targets define build products; schemes direct actions (Run, Test, Archive) | Confirmed |
| Bundle Identifier uniqueness | Reverse-DNS format (`com.company.app`) uniquely identifies app across iOS | Confirmed |
| Target membership scope | Files omitted from target membership produce "cannot find type in scope" | Confirmed |
| Optimization levels | Debug defaults to `-Onone`; Release defaults to `-O` | Confirmed |
| DerivedData caching | DerivedData contains build artifacts and index caches; safe to delete and ignore | Confirmed |
| xcuserdata isolation | xcuserdata contains user-specific IDE layout; must be excluded in `.gitignore` | Confirmed |
| Git commands | `git status`, `git add`, `git commit`, `git switch -c` execute standard workflows | Confirmed |
| Workspace grouping | `.xcworkspace` groups projects and Swift packages to share dependencies | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: No prior prerequisites (`[]`), perfectly suited as an foundational or concluding Fresh topic in App & System.
2. **Milestone Completion**: `xcode-and-git-basics` completes Batch 1E and marks the final topic of **Phase 4.1: Fresh Level Topics (Wave 1)**. All 22 Fresh level topics are now fully researched, authored, tested, and published.
