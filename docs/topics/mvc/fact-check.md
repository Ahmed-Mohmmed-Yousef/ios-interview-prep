# Fact-Check — MVC and Its Problems (Step 6)

Run 2026-11-09. Topic: `mvc` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/mvc/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/mvc/questions.json`.
- **Official Documentation**:
  - Verified against [Model-View-Controller (Apple Archive)](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html) and [UIViewController (UIKit)](https://developer.apple.com/documentation/uikit/uiviewcontroller).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Cocoa MVC Mediation Rule | Controller mediates between Model and View; Model and View never communicate directly | Confirmed |
| Smalltalk MVC vs Cocoa MVC | Original 1979 Smalltalk had View observe Model; Cocoa MVC decouples View from Model | Confirmed |
| Massive View Controller Antipattern | UIKit `UIViewController` combines view lifecycle and controller logic, causing bloat | Confirmed |
| UIViewController Test Friction | Instantiating views and simulating lifecycle methods makes UIViewController testing slow | Confirmed |
| Service Extraction | Moving `URLSession` into dedicated services enables mock injection and headless tests | Confirmed |
| Child View Controllers | `addChild(_:)` and `didMove(toParent:)` modularize complex screens | Confirmed |
| Dedicated Data Sources | `UICollectionViewDiffableDataSource` and custom data sources remove table logic from controllers | Confirmed |
| Helper Struct Isolation | Extracting formatters and validators into pure Swift types enables millisecond unit tests | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `uiviews-and-view-controllers` is confirmed as published prerequisite.
2. **Progression in Batch 2F**: Second topic in Batch 2F (Architecture & Testing).
