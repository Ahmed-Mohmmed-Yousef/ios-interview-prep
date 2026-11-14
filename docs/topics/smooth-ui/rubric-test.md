# Rubric Test — Keeping the UI Smooth (`smooth-ui`)

Tested: **2026-11-14** against `content/rules.json` (`rubricScoring`: met = 1, partly = 0.5, not met = 0, `keyMissedCap` = 50, pass mark = 70).

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q25** hang vs hitch | **Good:** Hang freezes discrete tap (>100 ms noticed, 250 ms reported); hitch drops frames during motion (16.67 ms at 60 Hz, 8.33 ms at 120 Hz). | 100 | Yes |
| | **Average:** "A hang freezes taps and a hitch stutters scrolling." (no time thresholds) | 60 (35+0+25+0) | Yes — misses both threshold criteria |
| | **Weak:** "They mean the same thing." | 0 | Yes |
| **q26** render loop | **Good:** Event, Commit, Render, Display; commit hitch is slow CPU on main thread; render hitch is slow GPU/offscreen passes. | 100 | Yes |
| | **Average:** "Event, Commit, Render, Display. Commit is CPU and Render is GPU." | 85 (40+15+30) | Yes |
| | **Weak:** "The render loop only has layout and drawRect." | 0 | Yes |
| **q27** image memory | **Good:** Memory uses pixel dimensions not JPEG size; default decoding blocks main; fix with `CGImageSourceCreateThumbnailAtIndex` or `byPreparingThumbnail`. | 100 | Yes |
| | **Average:** "Downsample large images in the background with ImageIO." (omits why RAM spikes) | 50 (capped: key pixel dimension point missed) | Yes |
| | **Weak:** "Convert PNG to JPEG on the main thread." | 0 | Yes |
| **q28** `@concurrent` | **Good:** Under Swift 6.2+ Approachable Concurrency, `nonisolated` async stays on caller actor; calling from `@MainActor` stays on main; `@concurrent` hops off. | 100 | Yes |
| | **Average:** "`nonisolated` stays on main now, so add `@concurrent` to run in background." | 85 (45+10+30) | Yes |
| | **Weak:** "`nonisolated` always runs on a background thread in every Swift 6 mode." | 0 | Yes |
| **q29** profiling tools | **Good:** Check Xcode Organizer / MetricKit (`HangDiagnostic` and `HitchTimeMetric`) in production, enable Thread Performance Checker, profile with Animation Hitches / Time Profiler in Instruments. | 100 | Yes |
| | **Average:** "Use Time Profiler and Animation Hitches in Instruments." | 55 (40+0+15) | Yes — omits Thread Performance Checker and Organizer/MetricKit |
| | **Weak:** "Add `print` statements around every view." | 0 | Yes |
| **q30** `squareValues` | **Good:** Model answer using `@concurrent func squareValues` and awaiting from `@MainActor`. | 100 | Yes |
| | **Average:** Writes `func squareValues` without `@concurrent`. | 50 (capped: key `@concurrent` missed) | Yes |
| | **Weak:** Writes a synchronous loop with no `async`. | 0 | Yes |
| **q31** `thumbnailOptions` | **Good:** Model answer computing `max(width, height) * scale` and setting both boolean keys. | 100 | Yes |
| | **Average:** Sets `kCGImageSourceThumbnailMaxPixelSize` without multiplying by `scale`. | 78 (23+35+20) | Wait — 45*0.5 + 35 + 20 = 78, partial credit fair since keys are set |
| | **Weak:** Returns empty dictionary `[:]`. | 0 | Yes |
| **q32** `UTCFormatter` | **Good:** Model answer caching `static let shared: DateFormatter` with POSIX locale and UTC timeZone. | 100 | Yes |
| | **Average:** Creates `DateFormatter` inside `day(from:)` instead of caching in `static let`. | 50 (capped: key caching missed) | Yes |
| | **Weak:** Returns `String(timestamp)`. | 0 | Yes |
