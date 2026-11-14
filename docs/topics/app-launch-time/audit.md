# Audit: app-launch-time

- **Date:** 2026-11-14
- **Checker:** `content-fact-checker` (independent, fix mode)
- **Baseline:** Swift 6.4 (verified compiler: 6.4.2), Xcode 27.2, iOS 27
- **Topic status:** `draft` (version 1; bank version 2)

## Findings and fixes

### `content/topics/app-launch-time/topic.json` & `lesson.mdx`

| Location | Claim | Verdict | Evidence URL | Fix applied |
|---|---|---|---|---|
| `lesson.mdx` (`## The simple idea` → Measuring launch time) | Lists `MXAppLaunchMetric` (`histogrammedTimeToFirstDraw`, `histogrammedOptimizedTimeToFirstDraw`, `histogrammedExtendedLaunch`) as the current MetricKit API | OUTDATED | https://developer.apple.com/documentation/metrickit/metricresult | Updated to iOS 27 `MetricManager` / `MetricResult` (`TimeToFirstDrawMetric`, `OptimizedTimeToFirstDrawMetric`, `ExtendedLaunchMetric`), and noted `MXAppLaunchMetric` as the deprecated pre-iOS-27 API. Added `MetricResult` and `TimeToFirstDrawMetric` to `sources` in `topic.json` and `lesson.mdx`. |
| `lesson.mdx` (`## The simple idea` → Measuring launch time) | Listed `histogrammedOptimizedTimeToFirstDraw` without explaining in the main section that it tracks prewarmed launches (only explained inside `<DeepDive>`) | UNTAUGHT (in main section) | https://developer.apple.com/documentation/metrickit/timetofirstdrawmetric | Explained `TimeToFirstDrawMetric` (standard launch to first draw) and `OptimizedTimeToFirstDrawMetric` (launches sped up by system prewarming) directly in the main section. |
| `lesson.mdx` (`## The simple idea` → Post-main work) | Says `The system calls application(_:willFinishLaunchingWithOptions:)...` right after mentioning both SwiftUI and UIKit | WRONG (oversimplified) | https://developer.apple.com/documentation/xcode/about-the-app-launch-sequence | Scoped those delegate callbacks to UIKit (`In UIKit, the system calls...`). |
| `lesson.mdx` (`## The simple idea` → Pre-main work) | Uses "initialize lazily" without explaining it in simple words | HARD-ENGLISH | — | Added `(only when your code reads them for the first time)`. |
| `lesson.mdx` (`## The simple idea`, `## In code`, `<QuickCheck>` 2, `<InterviewAnswer>`) | Uses `terminates`, `crash-reporting enrichment`, `overhead`, `watchdog termination` | HARD-ENGLISH | — | Simplified to `stops`, `crash reporting`, `work`, `watchdog crash`. |
| `lesson.mdx` (`<DeepDive>`, `<InterviewAnswer level="senior">`) | Presents `MXAppLaunchMetric` as current production MetricKit API | OUTDATED | https://developer.apple.com/documentation/metrickit/metricresult | Updated to `MetricManager` / `MetricResult` (`TimeToFirstDrawMetric`, `OptimizedTimeToFirstDrawMetric`, `ExtendedLaunchMetric`) with older `MXAppLaunchMetric` noted. |
| `lesson.mdx` (`<Trap>` 2: prewarming and protected data) | Implies prewarming directly executes app launch code before unlock | WRONG (imprecise) | https://developer.apple.com/documentation/xcode/about-the-app-launch-sequence | Clarified that iOS can prewarm or start an app in the background after a reboot before first unlock, and added `UIApplication.shared.isProtectedDataAvailable`. |

### `content/topics/app-launch-time/questions.json`

| Location | Claim / Issue | Verdict | Evidence URL | Fix applied |
|---|---|---|---|---|
| `app-launch-time-q12` | Presents deprecated `MXAppLaunchMetric` as the current MetricKit class for launch histograms | OUTDATED | https://developer.apple.com/documentation/metrickit/timetofirstdrawmetric | Updated prompt and answer to iOS 27 `TimeToFirstDrawMetric` inside `MetricResult`; moved `MXAppLaunchMetric` to option `b` explaining its iOS 27 deprecation. |
| `app-launch-time-q16` | Tests deprecated `MXAppLaunchMetric` properties (`histogrammedTimeToFirstDraw` vs `histogrammedOptimizedTimeToFirstDraw`), and the prewarmed distinction was previously only in `<DeepDive>` | OUTDATED / UNTAUGHT | https://developer.apple.com/documentation/metrickit/metricresult | Updated to iOS 27 `TimeToFirstDrawMetric` vs `OptimizedTimeToFirstDrawMetric` (now taught in the main section). |
| `app-launch-time-q27` | Rubric awards 30 points for naming Instruments, but prompt did not ask which tool to use | RULES | — | Updated prompt to ask for the Xcode tool used. |
| `app-launch-time-q28` | Rubric awards 20 points for stating the fix, but prompt only asked what prewarming is and what bug it causes | RULES | — | Updated prompt to ask how to avoid the bug, and aligned `modelAnswer` with `isProtectedDataAvailable`. |
| `app-launch-time-q29` | Rubric and `modelAnswer` cite deprecated `MXAppLaunchMetric` without iOS 27 `MetricResult` | OUTDATED | https://developer.apple.com/documentation/metrickit/timetofirstdrawmetric | Updated `modelAnswer` and rubric to `TimeToFirstDrawMetric` via `MetricResult` (still accepting `MXAppLaunchMetric` in rubric for older OS versions). |

## Verified clean items

- **Swift 6.4.2 compilation (`-swift-version 6` with and without `-default-isolation MainActor`):** Both lesson examples and all 12 question code/starterCode/modelAnswer snippets compile and match expected outputs under both modes.
- **Official URLs checked:**
  - `https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time`
  - `https://developer.apple.com/documentation/xcode/about-the-app-launch-sequence`
  - `https://developer.apple.com/documentation/xcode/configuring-your-project-to-use-mergeable-libraries`
  - `https://developer.apple.com/documentation/os/ossignposter`
  - `https://developer.apple.com/documentation/xctest/xctapplicationlaunchmetric`
  - `https://developer.apple.com/documentation/metrickit/mxapplaunchmetric`
  - `https://developer.apple.com/documentation/metrickit/metricresult`
  - `https://developer.apple.com/documentation/metrickit/timetofirstdrawmetric`
- **Question bank rules:** 32 live questions (16 `mcq`, 8 `code-reading`, 5 `written`, 3 `code-write`; 12 easy, 13 medium, 7 hard); answer distribution balanced (`a: 6, b: 6, c: 6, d: 6`); all option lengths within 1.5x limit; all rubrics sum to 100 with `key: true` criteria.
