# Fact-Check — HTTP and REST Basics (Step 6)

Run 2026-11-09. Topic: `http-rest-basics` (junior). Baseline: Swift 6.4, Xcode 27, iOS 27 SDK.

## 1. What passed verification

- **All Swift 6.4 code runs cleanly**:
  - 2 lesson code examples and outputs verified via `node scripts/run-swift-examples.mjs content/topics/http-rest-basics/lesson.mdx`.
  - 8 code-reading and 3 code-write verification blocks verified via `node scripts/run-swift-examples.mjs content/topics/http-rest-basics/questions.json`.
- **Official Documentation**:
  - Verified against [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/info/rfc9110/), [URLRequest (Foundation)](https://developer.apple.com/documentation/foundation/urlrequest), and [Fetching website data into memory (Foundation)](https://developer.apple.com/documentation/foundation/urlsession/fetching_website_data_into_memory).
- **Rules & Checks**:
  - `check-lesson.mjs`: all core sections present in proper order, valid meta tags, valid `<Guess>`, 2 valid `<QuickCheck>` blocks, 4 valid `<Trap>` blocks, `<TryIt>` link, 3 `<InterviewAnswer>` blocks, and valid `<Recap>`.
  - `check-plain-english.mjs`: 0 sentences over 25 words, no contractions, no prohibited words, simple English for CEFR B1 readers.
  - Option length ratio: all right answers are <= 1.5x average wrong answer length (0 violations).
  - Spread of right answers: balanced across options (6 `a`, 6 `b`, 6 `c`, 5 `d`).
  - Rubric validation: all 8 rubrics sum to 100 with designated `key: true` criteria.

## 2. Technical accuracy points verified with Swift 6.4 compiler

| Fact | Compiler / Doc Verification | Status |
|---|---|---|
| HTTP Method Semantics | RFC 9110 classifies GET/HEAD as safe; GET/HEAD/PUT/DELETE as idempotent | Confirmed |
| 401 vs 403 Semantics | 401 indicates unauthenticated (credentials required); 403 indicates unauthorized (permission denied) | Confirmed |
| PUT vs PATCH | PUT replaces full resource representation; PATCH applies delta modifications to specific fields | Confirmed |
| DELETE Idempotence | Idempotence applies to server state mutations; resource remains deleted on repeated calls | Confirmed |
| REST Statelessness | Server stores no client context between requests; each request carries full credentials | Confirmed |
| 200 OK Error Anti-pattern | Returning 200 with error body corrupts HTTP caching proxies and breaks network error pipelines | Confirmed |
| Foundation URLRequest | Encapsulates URL, HTTP method, header fields, and HTTP body payload in Swift | Confirmed |

## 3. Editorial & curriculum consistency notes

1. **Prerequisites**: No prior prerequisites required (foundational topic for networking).
2. **Progression in Batch 2E**: Sixth topic in Batch 2E (Design, System & Data), serving as the theoretical and protocol baseline for `urlsession`.
