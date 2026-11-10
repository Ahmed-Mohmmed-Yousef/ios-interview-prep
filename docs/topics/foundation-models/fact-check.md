# Fact Check Report: On-Device AI with Foundation Models

**Topic ID:** `foundation-models`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Apple Intelligence & Foundation Models (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/foundationmodels
2. Writing Tools API (UIKit / AppKit Documentation)  
   URL: https://developer.apple.com/documentation/uikit/uitextview/writingtoolsbehavior
3. NaturalLanguage Framework (Apple Developer Documentation)  
   URL: https://developer.apple.com/documentation/naturallanguage
4. Private Cloud Compute Architecture (Apple Security Research)  
   URL: https://security.apple.com/blog/private-cloud-compute/
5. WWDC24 Session 10168: Explore the Writing Tools API  
   URL: https://developer.apple.com/videos/play/wwdc2024/10168/

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| On-device foundation models run directly on Apple Silicon Apple Neural Engine | Apple Developer Documentation | Verified | Core architecture of Apple Intelligence. |
| User prompts remain entirely on-device with zero network latency | Apple Developer Documentation | Verified | Hardware-enforced privacy and offline capability. |
| Private Cloud Compute handles heavy requests statelessly without data retention | Apple Security Research | Verified | Runs on dedicated Apple Silicon servers with cryptographic auditability. |
| Writing Tools in iOS 18 integrates system LLMs into standard text views | Apple Developer Documentation | Verified | Supported in UITextView, NSTextView, and WKWebView. |
| writingToolsBehavior controls integration (.complete, .limited, .none) | UIKit Documentation | Verified | .none disables Writing Tools for sensitive/code fields. |
| textViewWritingToolsWillBegin pauses cloud sync to prevent merge conflicts | Apple Developer Documentation | Verified | Recommended best practice from WWDC24 session 10168. |
| isWritingToolsActive indicates if a Writing Tools session is currently modifying text | UIKit Documentation | Verified | Boolean property on UITextView. |
| NaturalLanguage NLTagger calculates sentimentScore between -1.0 and +1.0 | Apple Developer Documentation | Verified | Built-in offline sentiment analysis. |
| NLLanguageRecognizer identifies text language codes locally | Apple Developer Documentation | Verified | Returns dominantLanguage without internet. |
| Machine learning inference must run asynchronously to avoid UI frame drops | Apple Developer Documentation | Verified | Heavy ANE tensor operations offloaded using async/await. |

---

## Code Verification Summary

All 13 Swift code examples (2 in `lesson.mdx`, 11 in `questions.json`) compile cleanly under Swift 6 mode and pass their output tests:
- `lesson.mdx:84`: Sentiment tone classification (`Feedback tone: Positive`) -> PASS
- `lesson.mdx:124`: Async language detection (`Language code: en`) -> PASS
- `fm-q16`: Score to category conversion (`Tag: StrongPositive`) -> PASS
- `fm-q17`: Confidence threshold check (`High: true`) -> PASS
- `fm-q18`: Execution target selection (`Target: OnDeviceNeuralEngine`) -> PASS
- `fm-q19`: Sensitive field mode assignment (`Mode: none`) -> PASS
- `fm-q20`: Language array filter counter (`Total: 3`) -> PASS
- `fm-q21`: Offline safety check (`CanRun: true`) -> PASS
- `fm-q22`: Sync coordinator pause state (`Paused: true`) -> PASS
- `fm-q23`: Async token formatter string (`Text: Summary: App is ready`) -> PASS
- `fm-q29`: SentimentClassifier instance method (`Classification: positive`) -> PASS
- `fm-q30`: CloudSyncManager pause/resume (`State: true`) -> PASS
- `fm-q31`: generateAsyncSummary async concatenation (`Output: Summary: Login fast. Offline ready.`) -> PASS

---

## Quality and Style Checks
- **CEFR B1 Plain English**: Confirmed. All sentences <= 25 words. Contractions and banned words absent.
- **Answer Key Balance**: Objective questions (23 total) balanced across 6 `a`, 6 `b`, 6 `c`, 5 `d`.
- **Option Length Symmetry**: Right option lengths <= 1.5x longest wrong option.
- **Rubrics**: All 8 rubrics sum to 100 points and include `key: true` criteria.
- **Coverage**: 0 errors, 0 warnings.
