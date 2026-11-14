# Content audit: `swiftui-navigation`

- **Date**: 2026-11-14
- **Mode**: `fix` (independent)
- **Result**: `pass`
- **Topic version**: 2 (was 1)
- **Question bank version**: 2 (was missing `version`; 31 live, 0 retired)
- **Baseline**: Swift 6.4 (Swift 6 mode), Xcode 27.2, iOS 27 SDK (`iPhoneOS27.2.sdk`)

## Sources checked

- Apple Developer Documentation — `NavigationStack` (`https://developer.apple.com/documentation/swiftui/navigationstack`) — HTTP 200.
- Apple Developer Documentation — `NavigationLink` (`https://developer.apple.com/documentation/swiftui/navigationlink`) — HTTP 200.
- Apple Developer Documentation — `NavigationPath` (`https://developer.apple.com/documentation/swiftui/navigationpath`) — HTTP 200.
- Apple Developer Documentation — `NavigationSplitView` (`https://developer.apple.com/documentation/swiftui/navigationsplitview`) — HTTP 200.
- WWDC22 — `The SwiftUI cookbook for navigation` (`https://developer.apple.com/videos/play/wwdc2022/10054/`) — HTTP 200.
- Local verification with `swiftc -typecheck -swift-version 6 -target arm64-apple-ios27.0 -sdk "$SDK"` for `NavigationStack`, `NavigationLink(value:)`, `.navigationDestination(for:)`, `.navigationBarTitleDisplayMode(.inline)`, `NavigationPath.removeLast()`, and `NavigationPath.removeLast(path.count)`.

## Findings and fixes

| ID | Category | Where | Finding | Fix applied |
|---|---|---|---|---|
| F1 | `rules` | `questions.json` top-level | Missing `"version"` and `"lastVerified"` keys (`validate-content.sh` error) | Added `"version": 2` and `"lastVerified": "2026-11-14"` |
| F2 | `outdated` | `lesson.mdx` `meta`, `topic.json` | Baseline Xcode was `27` and `lastVerified` was `2026-11-09` | Updated baseline Xcode to `27.2` and `lastVerified` to `2026-11-14`; bumped `topic.json` version to `2` with `changes` note |
| F3 | `wrong` | `questions.json` (`q6`, `q11`, `q28`) | `q28` `modelAnswer` claimed `Hashable` alone enables state preservation (state restoration via `path.codable` requires `Codable` elements as well) | Clarified `Hashable` tracks/matches items while `Codable` enables `path.codable` saving and restoration across `q6`, `q11`, `q28`, and `lesson.mdx` |
| F4 | `untaught` | `lesson.mdx` (`The simple idea`, `In code`, `Interview traps`) | `.navigationBarTitleDisplayMode(_:)`, `path.removeLast()`, `NavigationPath` vs `[Route]`, `NavigationSplitView` columns (sidebar, content, detail), and nesting `NavigationStack` trap were tested in questions (`q8`, `q9`, `q10`, `q13`, `q26`) without appearing in main lesson sections | Taught all five in `The simple idea`, `In code`, and `Interview traps` (added Trap 5 for nested stacks) |
| F5 | `hardEnglish` | `lesson.mdx`, `questions.json` | Words like "hierarchical", "instantiates", "postpones", "decouples", "robust", "antipattern", "identical" exceeded B1 readability | Simplified wording across `lesson.mdx` and `questions.json` while keeping standard Swift API terms |
| F6 | `rules` | `questions.json` difficulty mix | 18 easy (58%), 13 medium (42%), 0 hard (0%) triggered two coverage mix warnings | Re-leveled to 13 easy (42%), 12 medium (39%), 6 hard (19%) |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/swiftui-navigation/lesson.mdx`: pass
- `node .claude/hooks/check-plain-english.mjs` on `lesson.mdx`, `questions.json`, `topic.json`: pass
- `bash .claude/hooks/validate-content.sh` on `lesson.mdx`, `questions.json`: pass
- `node scripts/check-coverage.mjs swiftui-navigation --strict`: pass (`0 errors, 0 warnings`)
- `node scripts/check-publish-gate.mjs swiftui-navigation --code`: pass
- `cd prototype && node build.mjs swiftui-navigation`: pass
