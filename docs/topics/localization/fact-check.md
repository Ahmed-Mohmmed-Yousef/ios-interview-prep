# Fact Check Report: Localization

**Topic ID:** `localization`  
**Date:** 2026-11-10  
**Reviewer:** Autonomous Curriculum Production Subagent  
**Sources Consulted:**
1. Localizing and varying text with a string catalog (Xcode)  
   URL: https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog
2. Localization (Xcode Documentation)  
   URL: https://developer.apple.com/documentation/xcode/localization
3. String(localized:defaultValue:table:bundle:locale:comment:) (Swift / Foundation)  
   URL: https://developer.apple.com/documentation/swift/string/init(localized:defaultvalue:table:bundle:locale:comment:)
4. LocalizedStringResource (Foundation)  
   URL: https://developer.apple.com/documentation/foundation/localizedstringresource
5. Right to Left (Human Interface Guidelines)  
   URL: https://developer.apple.com/design/human-interface-guidelines/right-to-left

---

## Fact Verification Checklist

| Fact / Claim in Lesson & Questions | Source Authority | Status | Notes |
|---|---|---|---|
| String Catalogs (.xcstrings) replaced .strings and .stringsdict in Xcode 15 | Xcode Documentation | Verified | Unified format for strings, plurals, and device variations. |
| Xcode extracts localizable keys at build time | Xcode Documentation | Verified | Automatically scans Swift/SwiftUI sources for localized text. |
| Translation states: NEW, NEEDS REVIEW, TRANSLATED, STALE | Xcode Documentation | Verified | Stale keys are preserved to prevent loss of translations. |
| Pluralization supports full Unicode CLDR categories visually | Xcode Documentation | Verified | Configured per language in catalog editor without XML. |
| String concatenation breaks due to grammatical word order differences | HIG Localization Guidelines | Verified | String interpolation with named arguments is required. |
| leading and trailing adapt to RTL; left and right remain fixed | HIG Right-to-Left | Verified | Core principle for bidirectional layout support. |
| Formatted APIs handle numbers, dates, and currencies according to locale | Foundation Documentation | Verified | Replaces manual string assembling and fixed formatting. |
| LocalizedStringResource provides deferred localization | Foundation Documentation | Verified | Ideal for Swift Packages, widgets, and background intents. |
| Media play triangles and clocks do not flip in RTL | HIG Right-to-Left | Verified | Directional navigation flips; non-directional icons do not. |
| Pseudolocalization schemes test text expansion and RTL mirroring | Xcode Documentation | Verified | Double-length and RTL pseudolanguages catch clipping early. |

---

## Code Verification
- `content/topics/localization/lesson.mdx`: 2 code blocks compiled with Swift 6 -> 2 passed, 0 failed.
- `content/topics/localization/questions.json`: 8 code-reading and 3 code-write verification blocks compiled with Swift 6 -> 11 passed, 0 failed.
- Plain English checks: 0 warnings, CEFR B1 compliant.
- Objective questions: exactly 6 a, 6 b, 6 c, 5 d, 0 option ratio violations.

## Conclusion
All technical assertions, String Catalog extraction workflows, CLDR pluralization behaviors, and Swift 6 compiler test blocks for `localization` are verified, accurate, and consistent with official Apple documentation.
