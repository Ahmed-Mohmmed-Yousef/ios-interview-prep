# Content audit: `swiftui-lists`

- **Date**: 2026-11-14
- **Mode**: `fix` (independent)
- **Result**: `pass`
- **Topic version**: 2 (was 1)
- **Question bank version**: 2 (was 1; 31 live, 0 retired)
- **Baseline**: Swift 6.4 (Swift 6 mode), Xcode 27.2, iOS 27 SDK (`iPhoneOS27.2.sdk`)

## Sources checked

- Apple Developer Documentation — `List` (`https://developer.apple.com/documentation/swiftui/list`) — HTTP 200.
- Apple Developer Documentation — `ForEach` (`https://developer.apple.com/documentation/swiftui/foreach`) — HTTP 200.
- Apple Developer Documentation — `Identifiable` (`https://developer.apple.com/documentation/swift/identifiable`) — HTTP 200.
- Local verification with `swiftc -typecheck -swift-version 6 -target arm64-apple-ios27.0 -sdk "$SDK"` for `List(selection:)`, `.listStyle(.plain)`, `.listStyle(.insetGrouped)`, `.listRowSeparator(.hidden)`, `.swipeActions(edge:)`, `.onDelete`, and `.onMove`.

## Findings and fixes

| ID | Category | Where | Finding | Fix applied |
|---|---|---|---|---|
| F1 | `outdated` | `lesson.mdx` `meta`, `topic.json`, `questions.json` | Baseline Xcode was `27` and `lastVerified` was `2026-11-09` | Updated baseline Xcode to `27.2` and `lastVerified` to `2026-11-14`; bumped topic & bank versions to `2` with `changes` note |
| F2 | `wrong` | `questions.json` (`q1` option `c`, `q10` option `a`) | `q1` claimed "120fps scrolling" (hardware-specific / unverified); `q10` stated "structs on the stack" | Replaced `q1` `c` explanation with smooth large-list behavior; updated `q10` `a` to "value-type structs, not class objects compared by pointer" |
| F3 | `untaught` | `lesson.mdx` `In code` & `Interview traps`; `questions.json` (`q7`, `q8`, `q11`, `q12`, `q13`, `q15`, `q21`) | `.listStyle(.plain/.insetGrouped)`, `.listRowSeparator(.hidden)`, `.swipeActions(edge:)`, `.onMove` (`IndexSet` + destination `Int`), `List(selection:)`, and `LazyVStack` differences were tested in questions without full API teaching in `In code` | Added clear bullets for `.onMove(perform:)`, `.swipeActions(edge:)`, `.listStyle(_:)`, `.listRowSeparator(.hidden)`, and `List(selection:)` in `In code`, clarified `LazyVStack` in `Interview traps`, and aligned `lessonSection` on `q8`, `q11`, `q12`, `q15` |
| F4 | `hardEnglish` | `lesson.mdx`, `questions.json` (`q24`, `q28`) | Words/phrases like "eagerly", "upon loading", "identical", "dataset", "heterogeneous", "virtualization", "ProMotion", "synchronous image decodes" exceeded B1 simplicity | Rewrote in plain B1 English (explaining "lazily" and "eagerly (all at once)") |
| F5 | `rules` | `questions.json` difficulty mix | 0 hard (`difficulty: 3`) questions out of 31 (`check-coverage.mjs` warning) | Re-leveled `q4`, `q5`, `q11`, `q14`, `q26`, `q28` to difficulty `3` and `q13`, `q30` to difficulty `2` (13 easy / 12 medium / 6 hard) |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/swiftui-lists/lesson.mdx`: pass
- `node .claude/hooks/check-plain-english.mjs` on `lesson.mdx`, `questions.json`, `topic.json`: pass
- `bash .claude/hooks/validate-content.sh` on `lesson.mdx`, `questions.json`: pass
- `node scripts/check-coverage.mjs swiftui-lists --strict`: pass (`0 errors, 0 warnings`)
- `node scripts/check-publish-gate.mjs swiftui-lists --code`: pass
- `cd prototype && node build.mjs swiftui-lists`: pass
