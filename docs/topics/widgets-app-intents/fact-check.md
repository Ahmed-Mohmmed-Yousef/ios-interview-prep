# Fact Check Report: Widgets and App Intents

**Topic ID:** `widgets-app-intents`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. WidgetKit Framework (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/widgetkit
2. App Intents Framework (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/appintents
3. AppIntentTimelineProvider (WidgetKit)  
   URL: https://developer.apple.com/documentation/widgetkit/appintenttimelineprovider
4. Making a configurable widget (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/widgetkit/making-a-configurable-widget
5. Adding interactivity to widgets (WWDC23 Sessions 10028 & 10103)  
   URL: https://developer.apple.com/videos/play/wwdc2023/10028/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| Widgets run in a separate extension process and do not stay in memory | Apple Developer Documentation | Verified | Widget extension terminates after generating timeline. |
| WidgetKit uses pre-rendered SwiftUI views driven by timeline entries | Apple Developer Documentation | Verified | System renders views at timestamp without app running. |
| Timeline reload policies are .atEnd, .after(Date), and .never | Apple Developer Documentation | Verified | Standard TimelineReloadPolicy enum options. |
| Daily background reload budget is roughly 40-70 updates per day | Apple Developer Documentation | Verified | System throttles background reloads when budget depleted. |
| iOS 17+ supports interactive widgets via Button(intent:) and Toggle | WWDC23 / Apple Docs | Verified | Executes AppIntent.perform() in background. |
| App Intents replace legacy SiriKit .intentdefinition with Swift structs | Apple Developer Documentation | Verified | Conforming to AppIntent / WidgetConfigurationIntent. |
| App Groups and UserDefaults(suiteName:) are required to share data | Apple Developer Documentation | Verified | Extensions have isolated sandbox directories. |
| Live countdowns should use Text(date, style: .timer) | SwiftUI / WidgetKit Docs | Verified | Avoids burning reload budget on continuous redraws. |
| Lists in widgets do not support scrolling gestures | Apple Developer Documentation | Verified | Home Screen touch gestures prioritize page swiping. |
| getSnapshot returns a quick entry for the widget gallery preview | Apple Developer Documentation | Verified | Standard provider method across timeline protocols. |

---

## Code Verification Summary

All 13 Swift code snippets (2 in `lesson.mdx`, 11 in `questions.json`) compile cleanly under Swift 6 language mode and match output verifications:
- `lesson.mdx:93`: Hourly entry generation (`Temp: 68`, `Temp: 72`, `Temp: 70`) -> PASS
- `lesson.mdx:132`: Counter intent calculation (`Updated count: 6`, `Finished: 6`) -> PASS
- `wid-q16`: Minimum temperature filtering (`Warm count: 2`) -> PASS
- `wid-q17`: Step counter addition (`Steps: 1500`) -> PASS
- `wid-q18`: Interval reload decision (`Policy: atEnd`) -> PASS
- `wid-q19`: Daily budget subtraction (`Remaining: 15`) -> PASS
- `wid-q20`: App Group container naming (`Container: group.apple.weather`) -> PASS
- `wid-q21`: Interval offset timestamp (`Next: 1900`) -> PASS
- `wid-q22`: Interactive action description (`Action: BackgroundIntent`) -> PASS
- `wid-q23`: Scheduled timestamp queue filter (`Active: 200`) -> PASS
- `wid-q29`: TimelineBuilder model answer (`Built: 2`) -> PASS
- `wid-q30`: ActionIntentHandler model answer (`Outcome: Count: 10`) -> PASS
- `wid-q31`: SharedStorageStore model answer (`Stored: sunny`) -> PASS

---

## Quality and Style Checks
- **CEFR B1 Plain English**: Confirmed. All sentences <= 25 words. Contractions and banned words absent.
- **Answer Key Balance**: Objective questions (23 total) balanced across 6 `a`, 6 `b`, 6 `c`, 5 `d`.
- **Option Length Symmetry**: Right option lengths <= 1.5x longest wrong option.
- **Rubrics**: All 8 rubrics sum to 100 points and include `key: true` criteria.
- **Coverage**: 0 errors, 0 warnings.
