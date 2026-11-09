# Fact-Check — App and Scene Lifecycle (Step 6)

Run 2026-11-09. Topic: `app-lifecycle` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/app-lifecycle/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/app-lifecycle/questions.json`.
- **Official Documentation**:
  - Verified against [Managing your app’s life cycle (UIKit)](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle), [ScenePhase (SwiftUI)](https://developer.apple.com/documentation/swiftui/scenephase), and [UISceneDelegate (UIKit)](https://developer.apple.com/documentation/uikit/uiscenedelegate).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Process vs Scene Separation | `UIApplicationDelegate` manages process and launch; `UISceneDelegate` manages individual UI windows | Confirmed |
| Inactive vs Background | Inactive is visible but paused from touch input; Background is hidden and minimized | Confirmed |
| Silent Background Purge | Suspended background processes are terminated by iOS without `applicationWillTerminate` callback | Confirmed |
| SwiftUI `ScenePhase` | `@Environment(\.scenePhase)` provides `.active`, `.inactive`, and `.background` states | Confirmed |
| UIKit `ActivationState` | `UIScene.ActivationState` provides `.unattached`, `.foregroundActive`, `.foregroundInactive`, and `.background` | Confirmed |
| Watchdog Timer Crash | Blocking main thread startup in `didFinishLaunchingWithOptions` triggers watchdog termination after ~20s | Confirmed |
| Multi-Window State Collision | Window navigation state stored in `AppDelegate` is corrupted when multiple windows open on iPadOS | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `xcode-and-git-basics` is confirmed as published prerequisite.
2. **Progression in Batch 2E**: Third topic in Batch 2E (Design, System & Data), bridging design foundations with system runtime environments and multi-window lifecycle mechanics.
