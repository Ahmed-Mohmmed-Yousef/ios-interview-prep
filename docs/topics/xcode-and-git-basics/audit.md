# Content audit: `xcode-and-git-basics`

- **Date**: 2026-11-14
- **Mode**: `fix` (independent)
- **Result**: `pass`
- **Topic version**: 2 (was 1)
- **Question bank version**: 2 (was missing `version`; 31 live, 0 retired)
- **Baseline**: Swift 6.4 (Swift 6 mode), Xcode 27.2, iOS 27 SDK (`iPhoneOS27.2.sdk`)

## Sources checked

- Apple Developer Documentation — `Creating an Xcode project for an app` (`https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app`) — HTTP 200.
- Apple Developer Documentation — `Source control management` (`https://developer.apple.com/documentation/xcode/source-control-management`) — HTTP 200.
- Git Reference Manual (`https://git-scm.com/docs`) — HTTP 200 (replaced `https://git-scm.com/doc` which failed curl).
- Local `swiftc -swift-version 6` verification of `-O` vs `-Onone` behavior for `assert(false)` (exits 0 under `-O`, traps under `-Onone`).

## Findings and fixes

| ID | Category | Where | Finding | Fix applied |
|---|---|---|---|---|
| F1 | `rules` | `questions.json` top-level; `lesson.mdx`; `questions.json` (`q16`, `q29`, `q30`) | Missing `"version"` and `"lastVerified"` on `questions.json`; hardcoded app brand names (`PrepStopsApp`, `com.prepstops.ios`, `com.example.prepstops`, `com.prepstops.app`); `q30` `modelAnswer` printed `Debug` field not requested in prompt | Added `"version": 2` and `"lastVerified": "2026-11-14"`; replaced brand strings with neutral `WeatherApp` / `com.example.weather`; aligned `q30` output with prompt and rubric |
| F2 | `outdated` | `lesson.mdx` `meta` & `Go deeper`, `topic.json`, `questions.json` | Baseline Xcode was `27`, `lastVerified` was `2026-11-09`, and Git URL `https://git-scm.com/doc` failed curl | Updated baseline Xcode to `27.2`, aligned `lastVerified` to `2026-11-14`, updated Git links to `https://git-scm.com/docs`, bumped `topic.json` to v2 |
| F3 | `wrong` | `questions.json` (`q10` option `c`) | `git branch --force` resets/creates a branch instead of simply creating without switching | Replaced option `c` with `git branch <branch-name>` and accurate explanation |
| F4 | `untaught` | `lesson.mdx` (`The simple idea`, `Interview traps`) | Bundle Identifier reverse-DNS role, `.xcworkspace`, `Debug` (`-Onone`) vs `Release` (`-O`, `assert`), `DerivedData` vs `xcuserdata` contents, `Compile Sources` & `File Inspector`, and `git switch -c` / `git merge` were tested without full explanation in main sections | Taught all missing Xcode and Git concepts directly in `The simple idea` and `Interview traps`; updated `q11` `lessonSection` to `Interview traps` |
| F5 | `hardEnglish` | `lesson.mdx`, `questions.json` | Words like "anatomy", "atomic units", "pollutes", "simultaneously", "corrupting", "verbose diagnostic", "disallowed", "prohibited" exceeded B1 readability | Rewrote in plain B1 English |
| F6 | `rules` | `questions.json` difficulty mix | 21 easy (68%), 10 medium (32%), 0 hard (0%) triggered two coverage mix warnings | Re-leveled to 13 easy (42%), 12 medium (39%), 6 hard (19%) |

## Verification

- `node .claude/hooks/check-lesson.mjs content/topics/xcode-and-git-basics/lesson.mdx`: pass
- `node .claude/hooks/check-plain-english.mjs` on `lesson.mdx`, `questions.json`, `topic.json`: pass
- `bash .claude/hooks/validate-content.sh` on `lesson.mdx`, `questions.json`: pass
- `node scripts/check-coverage.mjs xcode-and-git-basics --strict`: pass (`0 errors, 0 warnings`)
- `node scripts/check-publish-gate.mjs xcode-and-git-basics --code`: pass
- `cd prototype && node build.mjs xcode-and-git-basics`: pass
