# Fact-Check — URLSession (Step 6)

Run 2026-11-09. Topic: `urlsession` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/urlsession/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/urlsession/questions.json`.
- **Official Documentation**:
  - Verified against [URLSession (Foundation)](https://developer.apple.com/documentation/foundation/urlsession), [Fetching website data into memory (Foundation)](https://developer.apple.com/documentation/foundation/urlsession/fetching_website_data_into_memory), and [URLSessionConfiguration (Foundation)](https://developer.apple.com/documentation/foundation/urlsessionconfiguration).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| Async/Await Data Return | `data(from:)` returns `(Data, URLResponse)` without throwing for 4xx/5xx HTTP responses | Confirmed |
| Task Initial State | Tasks created via `dataTask(...)` initialize in `.suspended` state and require `.resume()` | Confirmed |
| Ephemeral Configuration | `URLSessionConfiguration.ephemeral` stores zero caches, cookies, or credentials on disk | Confirmed |
| Background Daemon | `URLSessionConfiguration.background(withIdentifier:)` delegates to system `nsurlsessiond` daemon | Confirmed |
| DownloadTask Disk Stream | `URLSessionDownloadTask` streams downloaded files directly to disk to protect RAM | Confirmed |
| Task Cancellation | Modern async/await networking automatically cancels requests when parent `Task` is cancelled | Confirmed |
| Main Thread UI Updates | Network tasks run on background threads; UI updates must dispatch to `@MainActor` / main queue | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: `http-rest-basics`, `codable`, and `closures-escaping-capture` are confirmed as published prerequisites.
2. **Progression in Batch 2E**: Seventh topic in Batch 2E (Design, System & Data), completing the networking track and leading into local persistence (`userdefaults-and-files` and `keychain-basics`).
