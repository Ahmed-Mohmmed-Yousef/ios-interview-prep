# Audit: smooth-ui (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `topic.json`, `lesson.mdx` `meta.sources` | `uiimage/bypreparingfordisplay()` URL | WRONG (HTTP 404) | `curl` + DocC JSON (`preparingfordisplay()`) | Replaced with verified HTTP 200 URL `https://developer.apple.com/documentation/uikit/uiimage/preparingfordisplay()` |
| `lesson.mdx` `meta.baseline` | `xcode: "27"` | OUTDATED | `xcodebuild -version` (Xcode 27.2) | Updated `baseline.xcode` to `"27.2"` |
| `lesson.mdx` Simple idea | Hitch Time Ratio "per second of scrolling" | WRONG (incomplete) | `understanding-hitches-in-your-app` ("all animated interactions") | Changed to "per second of scrolling or animation" |
| `lesson.mdx` Simple idea (Render loop) | Render hitches caused only by "Heavy GPU work"; `offscreen rendering` unexplained | WRONG / HARD-ENGLISH | `understanding-hitches-in-your-app` | Clarified "render-server or GPU work" and added a plain-English explanation of offscreen rendering |
| `lesson.mdx` In code (`@concurrent`) | "In Swift 6.0 and 6.1 without that setting..." | WRONG (incomplete) | Swift 6.2 release notes (`NonisolatedNonsendingByDefault`) | Clarified "In Swift 6.0 and 6.1, or when that setting is off" |
| `lesson.mdx` In code (Images) | Grouped sync `preparingForDisplay()` with async `byPreparingForDisplay()` / `byPreparingThumbnail(ofSize:)` as "off the main thread" | WRONG (imprecise) | Apple UIKit `UIImage` docs + iOS SDK typecheck | Distinguished synchronous `preparingForDisplay()` (call on background thread) from async `byPreparingForDisplay()` and `byPreparingThumbnail(ofSize:)`; clarified `kCGImageSourceShouldCacheImmediately` runs on the calling background thread |
| `lesson.mdx` Trap 2 | "Set a matching `UIBezierPath` on `layer.shadowPath`" | WRONG | `CALayer.shadowPath` DocC (`CGPath?`) | Changed to "Set a matching `CGPath` (such as `UIBezierPath(...).cgPath`) on `layer.shadowPath`" |
| `lesson.mdx` Tools, QuickCheck 1, Traps, Senior answer | "synchronous I/O", "classify main-thread unresponsiveness", "lazily", "decompresses", "inspect", "diagnose", "payloads" | HARD-ENGLISH | `.claude/rules/plain-english.md` | Simplified wording and explained technical terms in B1 English |

| `lesson.mdx` Trap 1 | Grouped `byPreparingThumbnail(ofSize:)` under "display pixel size (`pointSize * scale`)" | WRONG (imprecise) | `UIImage.preparingThumbnail(of:)` DocC (`CGSize` view bounds) vs `kCGImageSourceThumbnailMaxPixelSize` (`CGImageSource.h`) | Clarified `CGImageSourceCreateThumbnailAtIndex` uses `pointSize * scale` in pixels while `byPreparingThumbnail(ofSize:)` takes target view size |
| `topic.json`, `lesson.mdx` (`meta.sources`, Simple idea, Tools, Senior answer, Recap) | Presented `MXHangDiagnostic` as current MetricKit API | OUTDATED (deprecated in iOS 27) | `iPhoneOS27.2.sdk` `MXHangDiagnostic.h` (`API_DEPRECATED("Use DiagnosticResult instead.")`), `MXMetricManager.h`, `MetricKit.swiftinterface`, Apple DocC | Updated to `MetricManager`, `MetricResult` (`.hangTime`, `.hitchTime`), `DiagnosticResult.hang` (`HangDiagnostic`), and `HitchTimeMetric`, noting `MXMetricManager` and `MXHangDiagnostic` as pre-iOS 27 APIs |
| `docs/topics/smooth-ui/diagram.html` | `aria-label` said "decoding with `@concurrent`" while step 2 code uses `byPreparingForDisplay()` | WRONG (mismatch) | `diagram.html` line 87 vs line 175 | Updated `aria-label` to "decoding off the main thread" |

## Question bank fixes (2026-11-14)

| Location | Claim / Issue | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q07` | Asked for deprecated `MXHangDiagnostic` class as current; used untaught distractors (`MXAppLaunchMetric`, `XCTApplicationLaunchMetric`, `OSSignposter`) | OUTDATED / RULES | `iPhoneOS27.2.sdk` `MXHangDiagnostic.h`, `MetricKit.swiftinterface`, `HangDiagnostic` DocC | Updated `q07` to test `HangDiagnostic` (`DiagnosticResult.hang`) with current MetricKit distractors (`AppLaunchDiagnostic`, `HitchTimeMetric`, `HangTimeMetric`), noting `MXHangDiagnostic` in explanation, and updated `sources` |
| `q29`, `rubric-test.md` | Rubric, `modelAnswer`, and `sources` cited deprecated `MXHangDiagnostic` as current | OUTDATED | `iPhoneOS27.2.sdk` `MXHangDiagnostic.h`, `HangDiagnostic` & `HitchTimeMetric` DocC | Updated rubric, `modelAnswer`, `sources`, and `rubric-test.md` to reference `HangDiagnostic` and `HitchTimeMetric` (noting `MXHangDiagnostic` before iOS 27) |
| `q08`, `q27` `sources` | `uiimage/bypreparingfordisplay()` URL (404) | WRONG | `curl` + DocC JSON | Updated URL to `https://developer.apple.com/documentation/uikit/uiimage/preparingfordisplay()` |
| `q24` | Tested `Sendable` + `Task.detached` (untaught in topic and prerequisites); error message changes under `-default-isolation MainActor` (`main actor-isolated property` vs `non-Sendable type`) | UNTAUGHT / OUTDATED | `swiftc -swift-version 6` with and without `-default-isolation MainActor`; `main-thread` & `swiftui-performance` lessons | Retired `q24` (`"retired": true`) and added `q33` (60 Hz vs 120 Hz frame budget comparison, `"answer": "d"`, verified with `swiftc`) |
| `q05` | Untaught `Pre-main phase` / `dyld` distractor | RULES | `.claude/rules/questions.md` | Replaced option d with `"The Event phase"` |
| `q04`, `q06`, `q08`–`q16` | Joke or unrelated distractors (`network DNS`, `dyld`, `UserDefaults`, `LazyVStack`, `URLSession`, `Core Data Migration Assistant`, `Asset Catalog Compiler`, etc.) | RULES | `.claude/rules/questions.md` | Replaced with realistic domain misconceptions and balanced option lengths |
| `q03`, `q04`, `q07`, `q23`, `q25`, `q28` | Non-B1 terms (`discrete`, `formal`, `severe`, `payloads`, `background executor`) | HARD-ENGLISH | `.claude/rules/plain-english.md` | Rewrote in B1 English matching lesson terms (`single`, `hang`, `long`, `reports`, `background thread pool`) |
| `q26` | Render hitch rubric mentioned only GPU | WRONG (incomplete) | `understanding-hitches-in-your-app` | Updated criterion to "slow render server or GPU work" |
| `q29` | Prompt asked to "verify the fix" without a matching rubric criterion | RULES | `.claude/rules/questions.md` | Aligned prompt with the 3 rubric criteria |
| `questions.json` | Version and verification date | RULES | `docs/audit/README.md` | Bumped bank `version` to `3`; kept `lastVerified: "2026-11-14"` synced across `topic.json`, `lesson.mdx`, `questions.json` |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (`lesson.mdx`, `questions.json`), `run-swift-examples` (`lesson.mdx` 3/3, `questions.json` 12/12), `swift -swift-version 6 -default-isolation MainActor -enable-upcoming-feature NonisolatedNonsendingByDefault`, `check-coverage smooth-ui` (0 errors, 0 warnings), and `check-publish-gate.mjs smooth-ui --code` — all passed.
