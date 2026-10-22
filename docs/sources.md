# Sources (Step 1.7)

Done 2026-10-22. Every topic's sources are in its `topic.json` (`sources`), and every topic has `lastVerified: "2026-10-22"`. You can browse them on the [Path Map page](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM): tap a topic.

## Decisions (from the user)

- **1–3 key sources per topic now.** The lesson writer adds more when writing the lesson.
- **Community sources are allowed, and marked,** only in Coding Interview, Mobile System Design, Behavior and Leadership, plus 9 topics in Architecture and Testing that have no Apple page: SOLID, MVVM, Dependency Injection, Clean Architecture, Unidirectional Data Flow, Testable Code and Mocks, Code Review, Feature Flags, Test Strategy.
- **WWDC videos count** when they explain the "why" better than the docs.

The policy lives in [content/rules.json](../content/rules.json) under `sources`. The validator enforces it: a source must be marked `official` or `community`, `official` must be on an allowed site, and `community` only appears where it is allowed. To allow more, edit `rules.json`.

## Result

| | Count |
|---|---|
| Topics with sources | 164 of 164 |
| Topics with 1 / 2 / 3 sources | 38 / 91 / 35 |
| Official sources | 264 |
| Community sources | 61 |
| WWDC videos among them | 32 |
| Topics with only community sources | 28 (all in the allowed units and topics) |

**Official sites:** developer.apple.com (docs, HIG, WWDC, App Store Connect help), docs.swift.org (the Swift book, Swift Package Manager), swift.org (blog, migration guide, API guidelines), github.com/swiftlang and github.com/apple, rfc-editor.org (HTTP and WebSocket standards), lldb.llvm.org.

**Community sites:** Tech Interview Handbook, weeeBox mobile system design, ByteByteGo, Dropbox Career Framework, Staff Engineer Archetypes (Will Larson), Martin Fowler, Clean Coder Blog, Microsoft Learn, Google engineering practices, Google SRE book, Design Docs at Google, GraphQL.org, the Composable Architecture repo.

## How links were checked

Every link was fetched on 2026-10-22. Apple and Swift docs pages need JavaScript, so the check used their JSON data files: these return a real "not found" error and the real page title. A link counted only when the page loaded **and** showed a real title. A removed WWDC video, for example, loads but shows a generic title, so it was dropped. Redirects were followed and the final address was saved. Titles come from the pages themselves.

- 257 candidate links were checked first. 7 failed and 1 loaded only a generic page; all were replaced or dropped. In the final run, 254 links all worked.
- 8 pages had unclear titles (for example "Clean Coder Blog" or "Documentation"), so they got a readable name instead, such as "The Clean Architecture (Clean Coder Blog)" or "Migrating to Swift 6 (Swift.org)".

## Known gaps

- Apple has no single page for SwiftUI's `.task` modifier that we could reach. "Loading Data in SwiftUI" uses `AsyncImage` and the WWDC21 video "Discover concurrency in SwiftUI" instead.
- Many coding-interview topics only have community sources. That is expected: algorithms are not Apple-specific.

## Changing sources later

Edit `sources` in `topic.json` directly, then run `node scripts/validate-curriculum.mjs`. The step 1.7 scripts (`scripts/check-sources.mjs`, `scripts/apply-sources.mjs`, `scripts/data/sources-1.7.mjs`) are kept as history. **Do not run them again**, because they would overwrite later edits. The check method above can be reused for a future "check all links" tool (Phase 4).
