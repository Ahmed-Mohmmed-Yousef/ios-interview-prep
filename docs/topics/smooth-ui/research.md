# Research Notes — Keeping the UI Smooth (`smooth-ui`)

Verified: **2026-11-14** against official Apple documentation, WWDC/Tech Talk sessions, and Swift 6.4.2 (`swiftc -swift-version 6`).

## Official Sources

| Title | URL | Kind | Key Facts Verified |
|---|---|---|---|
| Improving app responsiveness (Xcode) | https://developer.apple.com/documentation/xcode/improving-app-responsiveness | official | Target < 100 ms for discrete user actions; < 16.7 ms (60 Hz) or < 8.3 ms (120 Hz ProMotion) per frame for continuous motion; move heavy work off main thread; use Thread Performance Checker and Instruments. |
| Understanding hangs in your app (Xcode) | https://developer.apple.com/documentation/xcode/understanding-hangs-in-your-app | official | Hangs occur when main run loop is blocked; default reporting threshold in tools/Organizer is 250 ms (configurable lower in Hangs instrument); avoid locks, semaphores, sync I/O on main thread. |
| Understanding hitches in your app (Xcode) | https://developer.apple.com/documentation/xcode/understanding-hitches-in-your-app | official | Hitches are missed frames during scrolling/animations; measured via Hitch Time Ratio; caused by commit phase (app CPU) or render phase (GPU) delays. |
| Tech Talks: Explore UI animation hitches and the render loop | https://developer.apple.com/videos/play/tech-talks/10855/ | official | Render loop stages: Event -> Commit -> Render Prepare/Execute -> Display. Commit hitches happen in the app process; render hitches happen in the render server/GPU (e.g., offscreen passes). |
| UIImage.byPreparingForDisplay() (UIKit) | https://developer.apple.com/documentation/uikit/uiimage/bypreparingfordisplay() | official | Async iOS 15+ API (`preparingForDisplay()` / `byPreparingForDisplay()`) to decode images off the main thread before display; `byPreparingThumbnail(ofSize:)` creates downscaled thumbnails asynchronously. |
| CGImageSourceCreateThumbnailAtIndex(_:_:_:) (ImageIO) | https://developer.apple.com/documentation/imageio/cgimagesourcecreatethumbnailatindex(_:_:_:) | official | Downsamples large images at decode time using `kCGImageSourceThumbnailMaxPixelSize`, `kCGImageSourceCreateThumbnailFromImageAlways`, `kCGImageSourceShouldCacheImmediately`, and `kCGImageSourceCreateThumbnailWithTransform`. |
| MetricManager / DiagnosticResult / HangDiagnostic / HitchTimeMetric (MetricKit) | https://developer.apple.com/documentation/metrickit/hangdiagnostic | official | iOS 27+ MetricKit uses `MetricManager`, `MetricResult` (`.hangTime`, `.hitchTime`), and `DiagnosticResult.hang` (`HangDiagnostic` with `hangDuration` and `callStackTree`); `MXMetricManager` and `MXHangDiagnostic` are deprecated (`Use MetricManager/DiagnosticResult instead`). |
| Swift 6.2 Released / SE-0461 @concurrent (Swift.org) | https://www.swift.org/blog/swift-6.2-released/ | official | Under Swift 6.2+ Approachable Concurrency (`NonisolatedNonsendingByDefault`), `nonisolated` async functions inherit the caller's actor; mark functions `@concurrent` to explicitly hop off `@MainActor` onto the global concurrent executor. Verified compiling/running in Swift 6.4.2. |

## Key Technical Facts

1. **Hangs vs Hitches:**
   - **Hang:** Discrete interaction delay. Users notice > 100 ms; Apple tools flag >= 250 ms by default.
   - **Hitch:** Continuous motion frame drop. Frame budget is 16.67 ms (60 Hz) or 8.33 ms (120 Hz ProMotion). Measured with Hitch Time Ratio (ms/s).
2. **Render Loop:** Event -> Commit (app process / main thread) -> Render Prepare/Execute (render server / GPU) -> Display.
3. **Common Main-Thread & GPU Culprits:**
   - Synchronous JSON parsing, disk I/O, or locks/semaphores on `@MainActor`.
   - Lazy image decoding on main thread or loading full-resolution images into tiny image views (memory + decode cost). Fix with `ImageIO` (`CGImageSourceCreateThumbnailAtIndex`) or `UIImage.byPreparingForDisplay()` / `byPreparingThumbnail(ofSize:)`.
   - Recreating `DateFormatter` / `NumberFormatter` per cell or view evaluation.
   - Offscreen rendering passes in GPU (e.g., shadows without `shadowPath`, complex masks).
4. **Swift 6 Concurrency Note (project settings matter):**
   - With Xcode's Approachable Concurrency (`NonisolatedNonsendingByDefault`, Swift 6.2+), `nonisolated` async functions stay on the caller's actor (`@MainActor`). Use `@concurrent` to force background execution.
   - Without that flag (Swift 6.0–6.1), `nonisolated` async functions already hop to the global executor, or `Task.detached` / dedicated `actor` types run off-main.

## Mid-Level vs Senior Interview Expectations

- **Mid-level:** Distinguishes hangs (100 ms / 250 ms) from hitches (16.67 ms / 8.33 ms frame budget), moves JSON/image decoding off `@MainActor`, caches formatters, uses `ImageIO` downsampling or `byPreparingForDisplay()`, and profiles with Time Profiler / Hangs / Animation Hitches.
- **Senior:** Traces the render loop (Event -> Commit -> Render -> Display) to separate CPU commit hitches from GPU render hitches (`shadowPath`, offscreen passes), understands Swift 6.2+ `@concurrent` vs `nonisolated` under Approachable Concurrency, uses Thread Performance Checker to catch priority inversions, and tracks field `HitchTimeMetric` and `HangDiagnostic` (or pre-iOS 27 `MXHangDiagnostic`) in MetricKit / Xcode Organizer.
