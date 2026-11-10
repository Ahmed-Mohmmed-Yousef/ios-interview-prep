# Project Progress

Last updated: **2026-11-10**

**Status marks:** ✅ done · 🟡 done, waiting for your review · 🔄 in progress · ⬜ not started · ⏸️ paused · ❌ dropped

---

## Phase 0 — Claude Code setup ✅

- ✅ Check the tech stack with web search → [docs/stack.md](docs/stack.md)
- ✅ Project guide → [CLAUDE.md](CLAUDE.md)
- ✅ Rules → [.claude/rules/](.claude/rules/)
  - ✅ Always search the web → [research.md](.claude/rules/research.md)
  - ✅ Simple English → [plain-english.md](.claude/rules/plain-english.md)
  - ✅ Ask, don't guess → [ask-dont-guess.md](.claude/rules/ask-dont-guess.md)
  - ✅ Lesson content → [content.md](.claude/rules/content.md)
  - ✅ Questions → [questions.md](.claude/rules/questions.md)
  - ✅ Design → [design.md](.claude/rules/design.md)
- ✅ Skills → [.claude/skills/](.claude/skills/)
  - ✅ lesson-writer (+ lesson template)
  - ✅ exam-writer (+ question format)
  - ✅ content-fact-checker
  - ✅ diagram-animator
- ✅ Automatic content checks (hook): lesson sections, question rules, simple English

## Phase 1 — Curriculum map ✅

Plan: [docs/phase-1-plan.md](docs/phase-1-plan.md)

- ✅ **1.1 Data model** — file format, starter files, validator → [docs/curriculum-schema.md](docs/curriculum-schema.md)
  - ✅ Your OK on skip-test sizes in [content/rules.json](content/rules.json)
- ✅ **1.2 Level definitions** — what each level (fresh → staff) must know → [docs/levels.md](docs/levels.md), [content/levels.json](content/levels.json)
- ✅ **1.3 Research topics** — from official sources and real interviews → [docs/research/](docs/research/README.md) (164 candidate topics)
- ✅ **1.4 Units** — group topics into subjects → [docs/units.md](docs/units.md), [content/units.json](content/units.json) (14 units)
- ✅ **1.5 Topics per level** — level and learning goal for each topic → [docs/topics.md](docs/topics.md) (164 topics: 149 main, 15 bonus)
- ✅ **1.6 Order and prerequisites** — the path, with a visual page per level → [docs/path-order.md](docs/path-order.md), [Path Map page](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM) (221 prerequisite links, 0 conflicts)
- ✅ **1.7 Sources** — checked official links for every topic → [docs/sources.md](docs/sources.md) (164 of 164 topics, 264 official + 61 community links)
- ✅ **1.8 Final check** — validate and save everything → [docs/phase-1-summary.md](docs/phase-1-summary.md) (all checks pass; saved with Git)

## Phase 2 — Pilot topic ✅

One topic built end to end (lesson, diagram, exam) to test the format before we write many.
Plan: [docs/phase-2-plan.md](docs/phase-2-plan.md) · Pilot topic: **Structs vs Classes**

- ✅ **2.1 Lesson format** — final sections, components and the "code + output" block → [docs/lesson-format.md](docs/lesson-format.md)
- ✅ **2.2 Topic research** — official sources and interview questions for Structs vs Classes → [docs/pilot/research.md](docs/pilot/research.md)
- ✅ **2.3 Write the lesson** — `lesson.mdx` in simple English, every code example run → [lesson.mdx](content/topics/structs-vs-classes/lesson.mdx)
- ✅ **2.4 Build the animation** — "copy vs shared" animation with step controls → [prototype](https://claude.ai/artifact/4tptMqRDWzod93nSudGRts), [source](docs/pilot/diagram-structs-vs-classes.html)
- ✅ **2.5 Write the exam** — 30+ questions of all 4 types, every code question run → [questions.json](content/topics/structs-vs-classes/questions.json) (31 questions)
- ✅ **2.6 Fact-check** — official sources, simple English, copyright → [docs/pilot/fact-check.md](docs/pilot/fact-check.md)
- ✅ **2.7 Prototype page** — lesson + animation + exam + result screen; rubrics tested with sample answers → [prototype](https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J), [rubric test](docs/pilot/rubric-test.md)
- ✅ **2.8 Improve once** — your feedback as version 2 with a `changes` entry (proves the edit workflow) → topic version 2, bank version 3, [rubric test: after](docs/pilot/rubric-test.md)
- ✅ **2.9 Lessons learned** — update template, rules and skills; all checks; Git commit → [docs/phase-2-summary.md](docs/phase-2-summary.md), [docs/topic-workflow.md](docs/topic-workflow.md)

## Phase 3 — Design system and UX ✅

Plan: [docs/phase-3-plan.md](docs/phase-3-plan.md) · Summary: [docs/phase-3-summary.md](docs/phase-3-summary.md)

- ✅ **3.1 Screens and flows** — every screen and how learners move between them → [docs/ux/flows.md](docs/ux/flows.md), [Flow Map page](https://claude.ai/artifact/5cQDao3KDygBCQ7dGYWmv6)
- ✅ **3.2 Name and brand** — name options (checked), voice, logo idea, color and type directions → **Prep Stops**, Calm Trail · [docs/brand/brand.md](docs/brand/brand.md), [Brand Board](https://claude.ai/artifact/Ai3rDph8YXX39ycWy7qZdv), `config/brand.json`
- ✅ **3.3 Design system** — tokens (light and dark) and core components; name and colors in one place → [Design System page](https://claude.ai/artifact/9uwRqVKPFEt5qTVsjbV2Ao), [docs/design/design-system.md](docs/design/design-system.md), `config/generated/tokens.css`
- ✅ **3.4 Path map** — the winding road with stages, stops, bonus side roads, skip-test points → [Path Map Prototype](https://claude.ai/artifact/KnAK3X8Tj4FxQopL1Mnrx6), [docs/design/path-map.md](docs/design/path-map.md)
- ✅ **3.5 Lesson page** — the pilot lesson layout improved with the design system → [Lesson Page Prototype](https://claude.ai/artifact/PVy3so2N1oD2SrhoSVSLwz), [docs/design/lesson-page.md](docs/design/lesson-page.md)
- ✅ **3.6 Exam and results** — exam, feedback, topic result, path total, "topic updated" message → [Exam and Results Prototype](https://claude.ai/artifact/P41sZga3jfPNXuz6ZVQNLw), [docs/design/exam-results.md](docs/design/exam-results.md)
- ✅ **3.7 Start and progress** — first visit, level picker, skip tests, saving, export and import → [Start and Progress Prototype](https://claude.ai/artifact/XgfSvzH9Xt7vgZ8Sk1J4uT), [docs/design/start-progress.md](docs/design/start-progress.md)
- ✅ **3.8 Usability and accessibility check** — contrast, keyboard, screen reader, motion, 375px, reading time → [docs/design/a11y-check.md](docs/design/a11y-check.md). 13 kinds of problems found and fixed; reading-time and VoiceOver tests moved to Phase 5
- ✅ **3.9 Final check** — one clickable walk-through, design summary, Git commit → [docs/design/walkthrough.html](docs/design/walkthrough.html), [docs/phase-3-summary.md](docs/phase-3-summary.md)

Open choices from Phase 2 — all decided in step 3.1 (see the requirements table).

## Phase 4 — Content production 🔄

Plan: [docs/phase-4-plan.md](docs/phase-4-plan.md)

Write all lessons and question banks, level by level, with fact checks.
- ✅ A repeatable "improve a topic" workflow → [docs/topic-workflow.md](docs/topic-workflow.md)
- ✅ Decide where per-topic notes live → `docs/topics/<topic-id>/` (decided 2026-11-08)
- ✅ **4.0 Tooling & review setup** — generalize prototype review builder for any topic, write to `docs/topics/<topic-id>/review.html`
- ✅ **4.1 Fresh level topics (Wave 1)** — Complete (all 22 published: `structs-vs-classes`, `swift-basics`, `optionals`, `operators`, `strings-and-characters`, `collections`, `control-flow`, `functions`, `closures-basics`, `enumerations`, `properties`, `methods-and-initialization`, `error-handling`, `big-o`, `arrays-and-strings`, `hash-tables`, `swiftui-views-modifiers`, `swiftui-layout`, `state-and-binding`, `swiftui-lists`, `swiftui-navigation`, `xcode-and-git-basics`)
  - ✅ **Batch 1A: Swift Language Core (7 topics)** — Complete
    - ✅ **swift-basics** (Constants, Variables and Types) — published (lesson, diagram, 31 questions) → [docs/topics/swift-basics/review.html](docs/topics/swift-basics/review.html)
    - ✅ **optionals** (Optionals) — published (lesson, diagram, 31 questions) → [docs/topics/optionals/review.html](docs/topics/optionals/review.html)
    - ✅ **operators** (Operators) — published (lesson, diagram, 31 questions) → [docs/topics/operators/review.html](docs/topics/operators/review.html)
    - ✅ **strings-and-characters** (Strings and Characters) — published (lesson, diagram, 31 questions) → [docs/topics/strings-and-characters/review.html](docs/topics/strings-and-characters/review.html)
    - ✅ **collections** (Arrays, Sets and Dictionaries) — published (lesson, diagram, 31 questions) → [docs/topics/collections/review.html](docs/topics/collections/review.html)
    - ✅ **control-flow** (Control Flow) — published (lesson, diagram, 31 questions) → [docs/topics/control-flow/review.html](docs/topics/control-flow/review.html)
    - ✅ **functions** (Functions) — published (lesson, diagram, 31 questions) → [docs/topics/functions/review.html](docs/topics/functions/review.html)
  - ✅ **Batch 1B: Intermediate Types & Logic (5 topics: `closures-basics` → `error-handling`)** — Complete
    - ✅ **closures-basics** (Closures: The Basics) — published (lesson, diagram, 31 questions) → [docs/topics/closures-basics/review.html](docs/topics/closures-basics/review.html)
    - ✅ **enumerations** (Enumerations) — published (lesson, diagram, 31 questions) → [docs/topics/enumerations/review.html](docs/topics/enumerations/review.html)
    - ✅ **properties** (Properties) — published (lesson, diagram, 31 questions) → [docs/topics/properties/review.html](docs/topics/properties/review.html)
    - ✅ **methods-and-initialization** (Methods and Initialization) — published (lesson, diagram, 31 questions) → [docs/topics/methods-and-initialization/review.html](docs/topics/methods-and-initialization/review.html)
    - ✅ **error-handling** (Error Handling) — published (lesson, diagram, 31 questions) → [docs/topics/error-handling/review.html](docs/topics/error-handling/review.html)
  - ✅ **Batch 1C: Coding Interview (3 topics: `big-o` → `hash-tables`)** — Complete
    - ✅ **big-o** (Big-O: Time and Space) — published (lesson, diagram, 31 questions) → [docs/topics/big-o/review.html](docs/topics/big-o/review.html)
    - ✅ **arrays-and-strings** (Arrays and Strings) — published (lesson, diagram, 31 questions) → [docs/topics/arrays-and-strings/review.html](docs/topics/arrays-and-strings/review.html)
    - ✅ **hash-tables** (Hash Tables) — published (lesson, diagram, 31 questions) → [docs/topics/hash-tables/review.html](docs/topics/hash-tables/review.html)
  - ✅ **Batch 1D: SwiftUI Basics (5 topics: `swiftui-views-modifiers` → `swiftui-navigation`)** — Complete
    - ✅ **swiftui-views-modifiers** (Views and Modifiers) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-views-modifiers/review.html](docs/topics/swiftui-views-modifiers/review.html)
    - ✅ **swiftui-layout** (Stacks and Layout) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-layout/review.html](docs/topics/swiftui-layout/review.html)
    - ✅ **state-and-binding** (@State and @Binding) — published (lesson, diagram, 31 questions) → [docs/topics/state-and-binding/review.html](docs/topics/state-and-binding/review.html)
    - ✅ **swiftui-lists** (Lists and ForEach) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-lists/review.html](docs/topics/swiftui-lists/review.html)
    - ✅ **swiftui-navigation** (Navigation) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-navigation/review.html](docs/topics/swiftui-navigation/review.html)
  - ✅ **Batch 1E: App and System (1 topic: `xcode-and-git-basics`)** — Complete
    - ✅ **xcode-and-git-basics** (Xcode, Projects and Git) — published (lesson, diagram, 31 questions) → [docs/topics/xcode-and-git-basics/review.html](docs/topics/xcode-and-git-basics/review.html)
- ✅ **4.2 Junior level topics (Wave 2)** — Complete (all 45 topics published: 44 main + 1 bonus)
  - ✅ **Batch 2A: Swift Language Advanced (9 topics)** — Complete
    - ✅ **optional-chaining** (Optional Chaining) — published (lesson, diagram, 31 questions) → [docs/topics/optional-chaining/review.html](docs/topics/optional-chaining/review.html)
    - ✅ **inheritance** (Inheritance) — published (lesson, diagram, 31 questions) → [docs/topics/inheritance/review.html](docs/topics/inheritance/review.html)
    - ✅ **type-casting** (Type Casting and Any) — published (lesson, diagram, 31 questions) → [docs/topics/type-casting/review.html](docs/topics/type-casting/review.html)
    - ✅ **protocols** (Protocols) — published (lesson, diagram, 31 questions) → [docs/topics/protocols/review.html](docs/topics/protocols/review.html)
    - ✅ **extensions** (Extensions) — published (lesson, diagram, 31 questions) → [docs/topics/extensions/review.html](docs/topics/extensions/review.html)
    - ✅ **generics-basics** (Generics: The Basics) — published (lesson, diagram, 31 questions) → [docs/topics/generics-basics/review.html](docs/topics/generics-basics/review.html)
    - ✅ **access-control** (Access Control) — published (lesson, diagram, 31 questions) → [docs/topics/access-control/review.html](docs/topics/access-control/review.html)
    - ✅ **closures-escaping-capture** (Closures: Escaping and Capture Lists) — published (lesson, diagram, 31 questions) → [docs/topics/closures-escaping-capture/review.html](docs/topics/closures-escaping-capture/review.html)
    - ✅ **codable** (Codable and JSON) — published (lesson, diagram, 31 questions) → [docs/topics/codable/review.html](docs/topics/codable/review.html)
  - ✅ **Batch 2B: Coding Interview Algorithms (6 topics)** — all 6 topics published
    - ✅ **sorting-binary-search** (Sorting and Binary Search) — published (lesson, diagram, 31 questions) → [docs/topics/sorting-binary-search/review.html](docs/topics/sorting-binary-search/review.html)
    - ✅ **two-pointers-sliding-window** (Two Pointers and Sliding Window) — published (lesson, diagram, 31 questions) → [docs/topics/two-pointers-sliding-window/review.html](docs/topics/two-pointers-sliding-window/review.html)
    - ✅ **stacks-and-queues** (Stacks and Queues) — published (lesson, diagram, 31 questions) → [docs/topics/stacks-and-queues/review.html](docs/topics/stacks-and-queues/review.html)
    - ✅ **linked-lists** (Linked Lists) — published (lesson, diagram, 31 questions) → [docs/topics/linked-lists/review.html](docs/topics/linked-lists/review.html)
    - ✅ **recursion** (Recursion) — published (lesson, diagram, 31 questions) → [docs/topics/recursion/review.html](docs/topics/recursion/review.html)
    - ✅ **matrix-problems** (Matrix Problems) — published (lesson, diagram, 31 questions) → [docs/topics/matrix-problems/review.html](docs/topics/matrix-problems/review.html)
  - ✅ **Batch 2C: Memory & Concurrency (6 topics)** — all 6 topics published
    - ✅ **arc-basics** (How ARC Works) — published (lesson, diagram, 31 questions) → [docs/topics/arc-basics/review.html](docs/topics/arc-basics/review.html)
    - ✅ **strong-weak-unowned** (Strong, Weak and Unowned) — published (lesson, diagram, 31 questions) → [docs/topics/strong-weak-unowned/review.html](docs/topics/strong-weak-unowned/review.html)
    - ✅ **retain-cycles** (Retain Cycles) — published (lesson, diagram, 31 questions) → [docs/topics/retain-cycles/review.html](docs/topics/retain-cycles/review.html)
    - ✅ **main-thread** (The Main Thread) — published (lesson, diagram, 31 questions) → [docs/topics/main-thread/review.html](docs/topics/main-thread/review.html)
    - ✅ **gcd-basics** (GCD Basics) — published (lesson, diagram, 31 questions) → [docs/topics/gcd-basics/review.html](docs/topics/gcd-basics/review.html)
    - ✅ **async-await** (async/await) — published (lesson, diagram, 31 questions) → [docs/topics/async-await/review.html](docs/topics/async-await/review.html)
  - ✅ **Batch 2D: SwiftUI & UIKit (9 topics)** — all 9 topics published
    - ✅ **swiftui-observation** (Data Flow with @Observable) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-observation/review.html](docs/topics/swiftui-observation/review.html)
    - ✅ **observable-object** (ObservableObject and @StateObject) — published (lesson, diagram, 31 questions) → [docs/topics/observable-object/review.html](docs/topics/observable-object/review.html)
    - ✅ **forms-and-input** (Forms and User Input) — published (lesson, diagram, 31 questions) → [docs/topics/forms-and-input/review.html](docs/topics/forms-and-input/review.html)
    - ✅ **sheets-alerts-dialogs** (Sheets, Alerts and Dialogs) — published (lesson, diagram, 31 questions) → [docs/topics/sheets-alerts-dialogs/review.html](docs/topics/sheets-alerts-dialogs/review.html)
    - ✅ **uiviews-and-view-controllers** (Views and View Controllers) — published (lesson, diagram, 31 questions) → [docs/topics/uiviews-and-view-controllers/review.html](docs/topics/uiviews-and-view-controllers/review.html)
    - ✅ **view-controller-lifecycle** (View Controller Lifecycle) — published (lesson, diagram, 31 questions) → [docs/topics/view-controller-lifecycle/review.html](docs/topics/view-controller-lifecycle/review.html)
    - ✅ **auto-layout** (Auto Layout) — published (lesson, diagram, 31 questions) → [docs/topics/auto-layout/review.html](docs/topics/auto-layout/review.html)
    - ✅ **uikit-navigation** (Navigation in UIKit) — published (lesson, diagram, 31 questions) → [docs/topics/uikit-navigation/review.html](docs/topics/uikit-navigation/review.html)
    - ✅ **table-collection-views** (Table and Collection Views) — published (lesson, diagram, 31 questions) → [docs/topics/table-collection-views/review.html](docs/topics/table-collection-views/review.html)
  - ✅ **Batch 2E: Design, System & Data (9 topics: 8 main + 1 bonus)** — completed (9 of 9 published)
    - ✅ **dark-mode-dynamic-type** (Dark Mode and Dynamic Type) — published (lesson, diagram, 31 questions) → [docs/topics/dark-mode-dynamic-type/review.html](docs/topics/dark-mode-dynamic-type/review.html)
    - ✅ **hig-liquid-glass** (Apple Design and Liquid Glass) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/hig-liquid-glass/review.html](docs/topics/hig-liquid-glass/review.html)
    - ✅ **app-lifecycle** (App and Scene Lifecycle) — published (lesson, diagram, 31 questions) → [docs/topics/app-lifecycle/review.html](docs/topics/app-lifecycle/review.html)
    - ✅ **permissions-privacy** (Permissions and Privacy) — published (lesson, diagram, 31 questions) → [docs/topics/permissions-privacy/review.html](docs/topics/permissions-privacy/review.html)
    - ✅ **signing-app-store** (App Signing and the App Store) — published (lesson, diagram, 31 questions) → [docs/topics/signing-app-store/review.html](docs/topics/signing-app-store/review.html)
    - ✅ **http-rest-basics** (HTTP and REST Basics) — published (lesson, diagram, 31 questions) → [docs/topics/http-rest-basics/review.html](docs/topics/http-rest-basics/review.html)
    - ✅ **urlsession** (URLSession) — published (lesson, diagram, 31 questions) → [docs/topics/urlsession/review.html](docs/topics/urlsession/review.html)
    - ✅ **userdefaults-and-files** (UserDefaults and Files) — published (lesson, diagram, 31 questions) → [docs/topics/userdefaults-and-files/review.html](docs/topics/userdefaults-and-files/review.html)
    - ✅ **keychain-basics** (Keychain Basics) — published (lesson, diagram, 31 questions) → [docs/topics/keychain-basics/review.html](docs/topics/keychain-basics/review.html)
  - ✅ **Batch 2F: Architecture & Testing (6 topics)** — Complete (all 6 topics published)
    - ✅ **communication-patterns** (Delegates, Closures and Notifications) — published (lesson, diagram, 31 questions) → [docs/topics/communication-patterns/review.html](docs/topics/communication-patterns/review.html)
    - ✅ **mvc** (MVC and Its Problems) — published (lesson, diagram, 31 questions) → [docs/topics/mvc/review.html](docs/topics/mvc/review.html)
    - ✅ **solid-basics** (SOLID Basics) — published (lesson, diagram, 31 questions) → [docs/topics/solid-basics/review.html](docs/topics/solid-basics/review.html)
    - ✅ **debugging-lldb** (Debugging with Breakpoints and LLDB) — published (lesson, diagram, 31 questions) → [docs/topics/debugging-lldb/review.html](docs/topics/debugging-lldb/review.html)
    - ✅ **logging-oslog** (Logging with OSLog) — published (lesson, diagram, 31 questions) → [docs/topics/logging-oslog/review.html](docs/topics/logging-oslog/review.html)
    - ✅ **unit-testing** (Unit Tests) — published (lesson, diagram, 31 questions) → [docs/topics/unit-testing/review.html](docs/topics/unit-testing/review.html)
- 🔄 **4.3 Mid level topics (Wave 3)** — in progress (29 of 53 published: 22 main + 7 bonus)
  - ✅ **Batch 3A: Swift Language Deep Dive (7 topics: 5 main + 2 bonus)** — completed (7 of 7 published)
    - ✅ **protocol-oriented-programming** (Protocol-Oriented Programming) — published (lesson, diagram, 31 questions) → [docs/topics/protocol-oriented-programming/review.html](docs/topics/protocol-oriented-programming/review.html)
    - ✅ **generics-associated-types** (Generics: Associated Types and Where Clauses) — published (lesson, diagram, 31 questions) → [docs/topics/generics-associated-types/review.html](docs/topics/generics-associated-types/review.html)
    - ✅ **opaque-and-boxed-types** (Opaque and Boxed Types: some vs any) — published (lesson, diagram, 31 questions) → [docs/topics/opaque-and-boxed-types/review.html](docs/topics/opaque-and-boxed-types/review.html)
    - ✅ **copy-on-write** (Copy-on-Write and Value Semantics) — published (lesson, diagram, 31 questions) → [docs/topics/copy-on-write/review.html](docs/topics/copy-on-write/review.html)
    - ✅ **key-paths** (Key Paths) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/key-paths/review.html](docs/topics/key-paths/review.html)
    - ✅ **property-wrappers** (Property Wrappers) — published (lesson, diagram, 31 questions) → [docs/topics/property-wrappers/review.html](docs/topics/property-wrappers/review.html)
    - ✅ **result-builders** (Result Builders) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/result-builders/review.html](docs/topics/result-builders/review.html)
  - ✅ **Batch 3B: Advanced Algorithms & Data Structures (7 topics: 4 main + 3 bonus)** — completed (7 of 7 published)
    - ✅ **trees-bfs-dfs** (Trees: BFS and DFS) — published (lesson, diagram, 31 questions) → [docs/topics/trees-bfs-dfs/review.html](docs/topics/trees-bfs-dfs/review.html)
    - ✅ **graphs** (Graphs) — published (lesson, diagram, 31 questions) → [docs/topics/graphs/review.html](docs/topics/graphs/review.html)
    - ✅ **heaps** (Heaps) — published (lesson, diagram, 31 questions) → [docs/topics/heaps/review.html](docs/topics/heaps/review.html)
    - ✅ **tries** (Tries) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/tries/review.html](docs/topics/tries/review.html)
    - ✅ **intervals** (Intervals) — published (lesson, diagram, 31 questions) → [docs/topics/intervals/review.html](docs/topics/intervals/review.html)
    - ✅ **dynamic-programming** (Dynamic Programming) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/dynamic-programming/review.html](docs/topics/dynamic-programming/review.html)
    - ✅ **bits-math-geometry** (Bits, Math and Geometry) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/bits-math-geometry/review.html](docs/topics/bits-math-geometry/review.html)
  - ✅ **Batch 3C: Memory Profiling & Swift Concurrency (8 topics: 1 memory + 7 concurrency)** — completed (8 of 8 published)
    - ✅ **memory-graph-debugger** (Finding Leaks with the Memory Graph) — published (lesson, diagram, 31 questions) → [docs/topics/memory-graph-debugger/review.html](docs/topics/memory-graph-debugger/review.html)
    - ✅ **structured-concurrency** (Tasks and Task Groups) — published (lesson, diagram, 31 questions) → [docs/topics/structured-concurrency/review.html](docs/topics/structured-concurrency/review.html)
    - ✅ **task-cancellation** (Task Cancellation) — published (lesson, diagram, 31 questions) → [docs/topics/task-cancellation/review.html](docs/topics/task-cancellation/review.html)
    - ✅ **async-sequences** (AsyncSequence and AsyncStream) — published (lesson, diagram, 31 questions) → [docs/topics/async-sequences/review.html](docs/topics/async-sequences/review.html)
    - ✅ **actors-and-main-actor** (Actors and @MainActor) — published (lesson, diagram, 31 questions) → [docs/topics/actors-and-main-actor/review.html](docs/topics/actors-and-main-actor/review.html)
    - ✅ **sendable-data-races** (Sendable and Data Races) — published (lesson, diagram, 31 questions) → [docs/topics/sendable-data-races/review.html](docs/topics/sendable-data-races/review.html)
    - ✅ **swift-6-strict-concurrency** (Swift 6 Strict Concurrency) — published (lesson, diagram, 31 questions) → [docs/topics/swift-6-strict-concurrency/review.html](docs/topics/swift-6-strict-concurrency/review.html)
    - ✅ **approachable-concurrency** (Approachable Concurrency) — published (lesson, diagram, 31 questions) → [docs/topics/approachable-concurrency/review.html](docs/topics/approachable-concurrency/review.html)
  - ✅ **Batch 3D: SwiftUI & UIKit Advanced (7 topics: 6 SwiftUI + 1 UIKit)** — completed (7 of 7 published)
    - ✅ **swiftui-loading-data** (Loading Data in SwiftUI) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-loading-data/review.html](docs/topics/swiftui-loading-data/review.html)
    - ✅ **view-identity-lifetime** (View Identity and Lifetime) — published (lesson, diagram, 31 questions) → [docs/topics/view-identity-lifetime/review.html](docs/topics/view-identity-lifetime/review.html)
    - ✅ **swiftui-animations** (Animations and Transitions) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-animations/review.html](docs/topics/swiftui-animations/review.html)
    - ✅ **custom-layouts** (Custom Layouts) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/custom-layouts/review.html](docs/topics/custom-layouts/review.html)
    - ✅ **swiftui-uikit-interop** (SwiftUI and UIKit Together) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-uikit-interop/review.html](docs/topics/swiftui-uikit-interop/review.html)
    - ✅ **swiftui-performance** (SwiftUI Performance) — published (lesson, diagram, 31 questions) → [docs/topics/swiftui-performance/review.html](docs/topics/swiftui-performance/review.html)
    - ✅ **custom-views-layout-pass** (Custom Views and the Layout Pass) — published (lesson, diagram, 31 questions) → [docs/topics/custom-views-layout-pass/review.html](docs/topics/custom-views-layout-pass/review.html)
  - ✅ **Batch 3E: Design, Accessibility & System Integration (8 topics: 3 design + 5 system) — COMPLETE (8 of 8 published)**
    - ✅ **accessibility** (Accessibility) — published (lesson, diagram, 31 questions) → [docs/topics/accessibility/review.html](docs/topics/accessibility/review.html)
    - ✅ **localization** (Localization) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/localization/review.html](docs/topics/localization/review.html)
    - ✅ **ipad-adaptive-layout** (iPad and Adaptive Layout) — published (lesson, diagram, 31 questions) → [docs/topics/ipad-adaptive-layout/review.html](docs/topics/ipad-adaptive-layout/review.html)
    - ✅ **notifications** (Push and Local Notifications) — published (lesson, diagram, 31 questions) → [docs/topics/notifications/review.html](docs/topics/notifications/review.html)
    - ✅ **background-tasks** (Background Work) — published (lesson, diagram, 31 questions) → [docs/topics/background-tasks/review.html](docs/topics/background-tasks/review.html)
    - ✅ **deep-links** (Deep Links and Universal Links) — published (lesson, diagram, 31 questions) → [docs/topics/deep-links/review.html](docs/topics/deep-links/review.html)
    - ✅ **widgets-app-intents** (Widgets and App Intents) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/widgets-app-intents/review.html](docs/topics/widgets-app-intents/review.html)
    - ✅ **foundation-models** (On-Device AI with Foundation Models) [bonus] — published (lesson, diagram, 31 questions) → [docs/topics/foundation-models/review.html](docs/topics/foundation-models/review.html)
  - 🔄 **Batch 3F: Data Persistence & Networking (5 topics)**
    - 🔄 **swiftdata** (SwiftData) — starting research
    - ⬜ **core-data** (Core Data)
    - ⬜ **caching** (Caching)
    - ⬜ **pagination** (Pagination)
    - ⬜ **combine-basics** (Combine Basics)
  - ⬜ **Batch 3G: Architecture & Testing Strategy (8 topics)**
  - ⬜ **Batch 3H: Performance & System Design Foundations (3 topics)**
- ⬜ **4.4 Senior level topics (Wave 4)** — 30 main + 5 bonus
- ⬜ **4.5 Staff level topics (Wave 5)** — 9 main
- ⬜ **4.6 Phase 4 summary and final verification**
- 🔄 **4.7 Content audit and publish gate** (started 2026-11-10) → [docs/audit/README.md](docs/audit/README.md)
  - ✅ Spot check of 3 random fresh topics (`control-flow`, `error-handling`, `methods-and-initialization`): all code compiled, but each had wrong facts and about 20 questions in total tested ideas the lessons never teach
  - ✅ Coverage script [scripts/check-coverage.mjs](scripts/check-coverage.mjs): real lesson headings, possibly untaught ideas, the 2–5 sentence rule, the mix, matching dates. First run on 92 published topics: 103 errors (90 written prompts ask for 2–4 sentences, 13 questions point at "Go deeper" or a missing heading) and 166 questions flagged as possibly untaught
  - ✅ Publish gate [scripts/check-publish-gate.mjs](scripts/check-publish-gate.mjs): coverage + an independent fact check (`docs/topics/<id>/audit.json`) + the code runner. The validator now blocks publishing without a passing audit. The 92 topics published before the gate are listed in [docs/audit/legacy-unaudited.json](docs/audit/legacy-unaudited.json)
  - ✅ Workflow, `new-topic` and `content-fact-checker` skills and `AGENTS.md` updated for the gate. New topics continue, but each must pass the gate
  - 🔄 Fresh level audit (22 topics) → re-check 3 random topics → report. **1 of 22 passes the gate.** Findings for every topic are in `docs/topics/<id>/audit.md`
    - ✅ `structs-vs-classes`: passes the gate (2 wrong facts, 2 untaught ideas and 10 rule problems fixed; topic version 3)
    - 🔄 `control-flow`: lesson fixed (guard exits, guard scope, switch end, C claim; added if/switch expressions, loops, labels, compound and range cases). Questions partly fixed
    - 🔄 `swift-basics`: 4 wrong facts and 6 untaught ideas fixed (topic version 2). q11 and q15 still need replacing
    - 🔄 `error-handling`: checked, findings written, no fixes yet (4 wrong, 3 outdated, 7 untaught)
    - 🔄 `optionals`: checked, findings written, no fixes yet (5 wrong, 11 untaught)
    - 🔄 `methods-and-initialization`: checked, findings written, no fixes yet (8 wrong, 8 untaught)
    - ⬜ The other 16 fresh topics
  - ⬜ Junior level audit (45 topics) → re-check 3 random topics → report
  - ⬜ Mid level audit (25 topics) → re-check 3 random topics → report

## Phase 5 — Web app MVP ✅

Plan: [docs/phase-5-plan.md](docs/phase-5-plan.md) · Summary: [docs/phase-5-summary.md](docs/phase-5-summary.md)

Level picker, path, lessons, browser-graded exams, saved progress, results.
- ✅ **5.0 Plan Phase 5** — [docs/phase-5-plan.md](docs/phase-5-plan.md) approved by user
- ✅ **5.1 Setup & Scaffold** — Next.js 16 (App Router), TypeScript, Turbopack, Tailwind v4 tokens, agent tools
- ✅ **5.2 Content & Store Layer** — Zod schemas, MDX + Shiki compiler, Zustand versioned store with migrations, Vitest product rule tests
- ✅ **5.3 Screen 1: Welcome & Level Picker (S1, S2)** — first visit intro, level cards, interactive self-check
- ✅ **5.4 Screen 2: Winding Path Map (S3, S4)** — responsive road, 6 stop states, progress bar, path score, locked sheet
- ✅ **5.5 Screen 3: Lesson Reader & Diagrams (S5)** — section reader, embedded diagrams, text size switcher, QuickChecks
- ✅ **5.6 Screen 4: Exam Runner & Results (S6–S10)** — 10 questions, option shuffling, instant feedback, scoring, skip tests, path completion
- ✅ **5.7 Screen 5: Settings, Progress Export/Import & About (S11, S12)** — stage/unit breakdown, JSON export/import/reset, About page
- ✅ **5.8 Accessibility, Testing & Final Verification** — Vitest unit tests, Playwright E2E tests (375px & desktop), axe-core scans, VoiceOver test, reading-time test
- ✅ Progress keeps working when a topic is edited, moved, retired or gets a new version (tested in 5.2 and 5.8)
- ⬜ **VoiceOver test by you** — one short flow on the real app (moved from step 3.8 on 2026-10-29); steps in [docs/design/a11y-check.md](docs/design/a11y-check.md)
- ⬜ **Measure the real reading time** of lessons with real learners in the app (moved from step 3.8 on 2026-10-29). Lessons say "about 10 minutes" until then
- ✅ **Agent rules, skills and helper agents for Phase 5** (2026-11-09, chosen by you from the setup recommender): rules [nextjs.md](.claude/rules/nextjs.md), [progress-store.md](.claude/rules/progress-store.md), [testing.md](.claude/rules/testing.md); skills [/build-screen](.claude/skills/build-screen/SKILL.md), [/ui-check](.claude/skills/ui-check/SKILL.md); agents [a11y-reviewer](.claude/agents/a11y-reviewer.md), [rules-tester](.claude/agents/rules-tester.md)
- ⬜ **Install the official agent tools right after the app is scaffolded** (commands verified 2026-11-09; check them again then):
  - ✅ Keep the managed Next.js block that `next dev` (16.3+) writes into `AGENTS.md`, and commit it ([AI agents guide](https://nextjs.org/docs/app/guides/ai-agents))
  - ⬜ Next.js dev-server MCP: add `next-devtools` (`npx -y next-devtools-mcp@latest`) to `.mcp.json` ([guide](https://nextjs.org/docs/app/guides/mcp))
  - ⬜ Next.js skill: `npx skills add vercel/next.js --skill next-dev-loop`
  - ⬜ shadcn skill (needs `components.json`): `pnpm dlx skills add shadcn/ui` ([docs](https://ui.shadcn.com/docs/skills)); shadcn MCP: `pnpm dlx shadcn@latest mcp init --client claude` ([docs](https://ui.shadcn.com/docs/mcp))
  - ⬜ Playwright CLI + skills (your choice for browser testing): `npm install -g @playwright/cli@latest`, then `playwright-cli install --skills` ([repo](https://github.com/microsoft/playwright-cli))
  - ⬜ Vercel React skill: `npx skills add vercel-labs/agent-skills --skill react-best-practices` ([repo](https://github.com/vercel-labs/agent-skills))
  - ⬜ Context7 for Tailwind, shadcn, Motion and Zustand docs (Next.js now uses its bundled docs): `npx ctx7 setup --claude` ([docs](https://context7.com/docs/clients/claude-code))
- ⬜ **Theme: no flash on load** — a tiny script in `<head>` reads the saved Light / Dark / Device choice and sets the `.light` or `.dark` class on `<html>` before the page appears, so dark-mode learners never see a white flash. Test it with a hard reload in dark mode
- ⬜ **Theme: status bar colors** — a light and a dark `themeColor` in the Next.js `viewport` export, from `config/brand.json` ([viewport docs](https://nextjs.org/docs/app/api-reference/functions/generate-viewport), checked 2026-11-09). The manifest takes one color only
- ⬜ **PWA: installable** — `app/manifest.ts` (built into Next.js) with the name and colors from `config/brand.json`, plus 192px and 512px icons. Learners can add the app to the home screen; on iPhone through Share → "Add to Home Screen". Vercel gives the HTTPS this needs ([Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps), checked 2026-11-09)
- ⬜ **PWA: works offline** — a service worker with Serwist (`@serwist/turbopack` 9.5.13 on npm, 2026-11-09; check again then) keeps the visited lessons, MCQ and code-reading exams and the app shell on the device. Test offline in the e2e tests (`.claude/rules/testing.md`)
- ❌ ~~Certificate of completion (PDF) in Phase 5~~ — moved to Phase 8: you want certificates only for logged-in learners (2026-11-09)
- ❌ ~~Install context7 with `claude mcp add context7 -- npx -y @upstash/context7-mcp`~~ — replaced by the item above (new official setup command; Next.js docs now come bundled)

## Phase 6 — AI grading ✅

Plan: [docs/phase-6-plan.md](docs/phase-6-plan.md) · Summary: [docs/phase-6-summary.md](docs/phase-6-summary.md)

Written answers and code answers graded by AI, with limits against abuse.
- ✅ **6.0 Plan Phase 6** — [docs/phase-6-plan.md](docs/phase-6-plan.md) approved by user
- ✅ **6.1 AI Provider Layer & Mock Engine** — `GradingProvider` interface, Gemini client, deterministic Mock provider
- ✅ **6.2 Rubric Evaluation Engine & Prompting** — structured Zod schema, CEFR B1 coaching prompt, 50% key criterion cap logic
- ✅ **6.3 API Route & Abuse Protections** — `POST /api/grade`, 2000 char bounds, rate limiting, zero personal data transmission
- ✅ **6.4 Exam Runner UI Integration** — "Grade with AI" button, animated evaluation card, criteria badges, manual override toggle, offline self-check fallback
- ✅ **6.5 Rubric Benchmark Testing** — automated test suite evaluating against 24 sample answers across Good, Average, Weak in `rubric-test.md`
- ✅ **6.6 E2E Verification & Phase 6 Summary** — Playwright flow test with mock provider, axe-core a11y audit, `docs/phase-6-summary.md`
- ✅ **Before Phase 6 starts:** run the Claude Code setup recommender (`claude-code-setup` plugin, read-only) on the Phase 5 app code. Review its suggested hooks, skills, subagents, MCP servers and rules with you, and add only the ones you approve. (A first run on the planning files was done early on 2026-11-08, at your request; run it again on the app code)
- ⬜ **Backup grader: Cloudflare Workers AI** (free 10,000 Neurons/day) when the Gemini free quota runs out; the learner sees a calm "try again later" if both are used up (decided 2026-11-09, [docs/stack.md](docs/stack.md))

## Phase 7 — Launch ⬜

Search engine setup, privacy-friendly analytics, deploy, feedback button.
- ✅ **Public GitHub repo + CI** (2026-11-09) — [github.com/Ahmed-Mohmmed-Yousef/ios-interview-prep](https://github.com/Ahmed-Mohmmed-Yousef/ios-interview-prep). Licenses: MIT for code (`LICENSE`), CC BY-NC-SA 4.0 for content (`LICENSE-CONTENT.md`). CI (`.github/workflows/checks.yml`) runs curriculum, brand, lesson and plain-English checks, unit tests and `next build` on every push and pull request; first run passed. Swift examples run on macOS for changed topics, advisory until the runner has Xcode 27 (it has 26.6 now)
- ⬜ **Analytics: Cloudflare Web Analytics** — free, no personal data (decided 2026-11-09)
- ⬜ **"Report a problem" on each question + anonymous question stats** in Cloudflare D1 through a small Worker, right after launch. Shows which questions confuse learners, to improve them (decided 2026-11-09)
- ⬜ **Content dashboard, part 1 (view)** — private `/admin` page: Firebase login + an allow-list of admin emails, checked on the server. Screens: overview of every topic (status, version, questions, sources, last fact-check, open reports), topic preview as learners see it with per-question stats from D1, and the reports inbox. Reports stay private in D1
- ⬜ **Content dashboard, part 2 (edit), right after launch** — every change becomes a pull request, never a direct edit of the live content:
  - Quick edits (typo, option text, publish or retire a topic, sources) → a pull request through the GitHub API, committed **in your name** (Vercel Hobby deploys only commits by the owner)
  - AI tasks (fix a report, re-check facts, write a topic, add questions) → a GitHub issue with an `ai-task` label and the skill to run. **You run them on your computer** with Claude Code when you choose; it opens a pull request. Issue text holds no learner data, because the repo is public
  - CI runs all checks and Vercel builds a preview link; you approve in the dashboard ("Changes waiting" screen) → merge → the live site updates

## Phase 8 — Later ⬜

Login and sync, running real Swift code, review reminders, mock interviews.
- ⬜ **Login and sync: Firebase Authentication + Cloud Firestore** (free Spark plan; replaces Supabase, decided 2026-11-09). Email, Google, Apple or GitHub sign-in; no phone sign-in on Spark. Certificates are stored in Firestore
- ⬜ **Certificate (PDF), for logged-in learners only** — earned when all main topics of the chosen level are done **and** the path score is at least the pass mark (`topicPassMark` in `content/rules.json`, now 70%). The name comes from the learner's account. Shows the level, path score, number of topics, date and a check link (for example `/verify/<id>`) that an employer can open, so every certificate is verified from day one. The server checks the results before it issues a certificate, so it cannot be faked by editing browser data. Calm, branded design (Calm Trail, level color, path-stop mark), always the light theme, app name from `config/brand.json`. PDF library to choose then (`@react-pdf/renderer` 4.9.0, MIT, was current on npm 2026-11-09). Needs a short design step first for your OK. Guests see a note on the results screen: "Log in to get your certificate"
- ⬜ **PWA push notifications** for review reminders (iOS 16.4+ when the app is installed). Needs a server and a database for subscriptions, so it comes with login ([Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps))

---

## Your rules and requirements

New rules and changes you ask for are added here, with the date.

| Date | Requirement | Where it lives |
|---|---|---|
| 2026-10-22 | Always check facts with a web search, never from old knowledge | [research.md](.claude/rules/research.md) |
| 2026-10-22 | All learner text in simple English for a worldwide audience | [plain-english.md](.claude/rules/plain-english.md) |
| 2026-10-22 | Ask simple questions before you continue, never guess | [ask-dont-guess.md](.claude/rules/ask-dont-guess.md) |
| 2026-10-22 | Plan each phase first, split it into steps, do one step at a time | [docs/phase-1-plan.md](docs/phase-1-plan.md) |
| 2026-10-22 | The curriculum must be easy to add to and update | [docs/curriculum-schema.md](docs/curriculum-schema.md) |
| 2026-10-22 | Show progress in this file, with check marks, updated after every change | this file |
| 2026-10-22 | Levels match a mix of companies (big tech, startups, normal companies) | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | Non-coding skills (system design, leadership, behavior) are required from senior up | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | Learners pick a level with a description and a self-check list, not years | [content/levels.json](content/levels.json) |
| 2026-10-22 | Teach coding-interview algorithms as a Swift unit that counts in the score | [docs/levels.md](docs/levels.md) |
| 2026-10-22 | No Objective-C; Swift only | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | Teach Apple tools only; mention popular libraries briefly | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | Cover iPhone and iPad only | [docs/research/README.md](docs/research/README.md) |
| 2026-10-22 | 14 small units, one per subject | [docs/units.md](docs/units.md) |
| 2026-10-22 | Coding Interview unit comes right after Swift Language in every stage | [docs/units.md](docs/units.md) |
| 2026-10-22 | Map all ~164 topics now; write and publish them in waves | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Keep "Xcode, Projects and Git" in App and System (not first) | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Older tools (GCD, ObservableObject, Core Data, Combine) are required topics | [docs/topics.md](docs/topics.md) |
| 2026-10-22 | Prerequisite conflicts are shown to the user one by one, never fixed silently | [docs/path-order.md](docs/path-order.md) |
| 2026-10-22 | Path is shown on an interactive web page | [Path Map page](https://claude.ai/artifact/LchDwuEHK6kUxbQqGJYhSM) |
| 2026-10-22 | async/await moves to junior; "Loading Data in SwiftUI" moves to mid; two lessons give short intros to later topics | [docs/path-order.md](docs/path-order.md) |
| 2026-10-22 | 1–3 key sources per topic now; more are added when lessons are written | [docs/sources.md](docs/sources.md) |
| 2026-10-22 | Community sources are allowed and marked only in Coding Interview, Mobile System Design, Behavior and Leadership, plus 9 named Architecture/Testing topics | [content/rules.json](content/rules.json) → `sources` |
| 2026-10-22 | WWDC videos count as sources when they explain the "why" | [docs/sources.md](docs/sources.md) |
| 2026-10-22 | Every topic must be easy to edit and improve in the future | [docs/curriculum-schema.md](docs/curriculum-schema.md) → "Editing and improving topics" |
| 2026-10-22 | Save the project with local Git; commits use ahmed.moyousef98@gmail.com (this project only) | `.git/config` |
| 2026-10-22 | Pilot topic is Structs vs Classes, shown as a clickable prototype page | [docs/phase-2-plan.md](docs/phase-2-plan.md) |
| 2026-10-22 | Lesson code examples are shown with their output, plus a link to Swift Playground | [docs/phase-2-plan.md](docs/phase-2-plan.md) |
| 2026-10-22 | Lessons have the same core sections plus optional extras; 8–12 minutes long | [docs/lesson-format.md](docs/lesson-format.md) |
| 2026-10-22 | Every lesson starts with a guess and has 2–3 quick checks (not scored) | [docs/lesson-format.md](docs/lesson-format.md) |
| 2026-10-22 | Pilot lesson: photocopy vs shared document analogy; sample answers for fresh, junior and senior; all four extras | [lesson.mdx](content/topics/structs-vs-classes/lesson.mdx) |
| 2026-10-22 | Diagrams use a friendly illustrated style; every step shows the code line that causes it | [diagram-animator skill](.claude/skills/diagram-animator/SKILL.md) |
| 2026-10-22 | About 20% hard questions may test traps, version notes and higher-level answers; "Go deeper" is never tested | [.claude/rules/questions.md](.claude/rules/questions.md) |
| 2026-10-22 | Written answers are 2–5 sentences | [.claude/rules/questions.md](.claude/rules/questions.md) |
| 2026-10-22 | Copy-on-write is taught as a trap in the main lesson (so q15 stays); the Sendable note explains both the Xcode main-actor default and Swift packages | [docs/pilot/fact-check.md](docs/pilot/fact-check.md) |
| 2026-10-22 | Exam feedback right after each question; 10-question exam mix: 5 multiple choice, 3 code reading, 1 written, 1 write-code; written answers use a self-check until AI grading | [prototype](https://claude.ai/artifact/DTYhYTuSHnAjg1U1D5W45J) |
| 2026-10-22 | Rubric scoring: met = full weight, partly met = half, not met = 0; key points cap a missed answer at 50 | [content/rules.json](content/rules.json) → `rubricScoring` |
| 2026-10-22 | You review every topic on its own prototype page before it is published | [docs/topic-workflow.md](docs/topic-workflow.md) |
| 2026-10-23 | App name: Claude suggests checked options, you pick; the name must stay easy to change (one config file) | [docs/phase-3-plan.md](docs/phase-3-plan.md) |
| 2026-10-23 | Designs are clickable web prototypes; calm and friendly feel; the path is a winding road | [docs/phase-3-plan.md](docs/phase-3-plan.md) |
| 2026-10-23 | Skipped topics count with the skip-test score; skip tests only for stages below your level | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Answer options are shuffled in every exam | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | An updated topic shows a badge and a note; the pass stays | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Locked topics are fully locked | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Level can change any time; progress is kept | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | First visit: a short welcome, then the level picker | [docs/ux/flows.md](docs/ux/flows.md) |
| 2026-10-23 | Name style: journey words; tagline "Interview prep for iOS developers" under the name; voice: friendly coach | [docs/brand/brand.md](docs/brand/brand.md) |
| 2026-10-23 | App name **Prep Stops**, direction **A · Calm Trail**; both live only in `config/brand.json` | [config/brand.json](config/brand.json) |
| 2026-10-23 | Before Phase 6, run the claude-code-setup recommender on the app code and add only approved hooks, skills and rules | [PROGRESS.md](PROGRESS.md) → Phase 6 |
| 2026-10-23 | Design system page is built from our token files (one source of truth) | [docs/design/design-system.md](docs/design/design-system.md) |
| 2026-10-23 | Theme follows the device, with a Light / Dark / Device switch | [docs/design/design-system.md](docs/design/design-system.md) |
| 2026-10-23 | Passing a topic gets a small, calm celebration (no confetti, no sound) | [docs/design/design-system.md](docs/design/design-system.md) |
| 2026-10-23 | Path: zig-zag road; finished stages fold; units as small signposts; tapping a stop opens a small card first | [docs/design/path-map.md](docs/design/path-map.md) |
| 2026-10-23 | Lessons: one section at a time; Normal / Large / Larger text; sources shown at the end | [docs/design/lesson-page.md](docs/design/lesson-page.md) |
| 2026-10-23 | Exams: saved if you leave; no timer; results show mistakes first; path total has a readiness label (85% ready, 70% almost) | [docs/design/exam-results.md](docs/design/exam-results.md) |
| 2026-10-24 | Level picker: a self-check checklist suggests a level, the learner still chooses. Progress export is a JSON file; import replaces after a preview; reset needs RESET typed | [docs/design/start-progress.md](docs/design/start-progress.md) |
| 2026-10-24 | Accessibility check covers all 5 prototypes; reading time is measured by you reading the pilot lesson with a timer; you try one VoiceOver flow | [docs/design/a11y-check.md](docs/design/a11y-check.md) |
| 2026-11-08 | All main AI coding agents follow the same rules: one shared `AGENTS.md` (Claude Code imports it). Added from the setup recommender: protect generated files, brand check hook, `/new-topic` skill, plain-English reviewer agent; context7 planned for Phase 5 | [AGENTS.md](AGENTS.md) |
| 2026-11-08 | Per-topic research, fact checks and rubric test notes live in `docs/topics/<topic-id>/` | [docs/phase-4-plan.md](docs/phase-4-plan.md) |
| 2026-11-08 | Content production runs level by level, starting with Fresh level (21 remaining topics) | [docs/phase-4-plan.md](docs/phase-4-plan.md) |
| 2026-11-09 | The web app is a PWA: installable and works offline in Phase 5; push notifications later in Phase 8 | this file (Phase 5, Phase 8) |
| 2026-11-09 | Downloadable PDF certificate when a level is done with a path score at the pass mark or more; **only for logged-in learners**, verified with a check link; calm branded design | this file (Phase 8) |
| 2026-11-09 | Free services only: Firebase Auth + Firestore for login (Phase 8), Cloudflare Web Analytics (Phase 7), Cloudflare Workers AI as backup grader (Phase 6), Cloudflare D1 for problem reports and question stats (after launch); hosting stays on Vercel | [docs/stack.md](docs/stack.md) |
| 2026-11-09 | Content dashboard: view in Phase 7, edit right after launch. Every change is a pull request that passes all checks and that you approve. AI tasks run on your computer. The repo is public | this file (Phase 7) |
| 2026-11-09 | Complete all 22 Fresh level topics first (Coding Interview, SwiftUI, App and System); keep optional-chaining in Wave 2 (Junior) | ask_question decision |
| 2026-11-09 | Delegate Phase 4 content production to autonomous workflow without manual approvals; each topic auto-publishes upon passing compiler and linter checks | User instruction |
| 2026-11-10 | Audit every published topic and fix wrong content directly, level by level (fresh first). One short report per level; 3 random topics re-checked per level | [docs/audit/README.md](docs/audit/README.md) |
| 2026-11-10 | Every new topic must pass the publish gate (coverage + independent fact check + code) before it is published. New topics paused only until the gate existed | [docs/audit/README.md](docs/audit/README.md) |
| 2026-11-10 | Fact checks for the audit may run as parallel helper agents | [docs/audit/README.md](docs/audit/README.md) |

## Change log

Newest first.

- **2026-11-10** — Starting Batch 3F: Data Persistence & Networking (5 topics: `swiftdata` through `combine-basics`). Launching dedicated autonomous subagent.

- **2026-11-10** — Built and published topic `foundation-models` (On-Device AI with Foundation Models) [bonus]: researched official Apple Intelligence, Foundation Models, Writing Tools API, and NaturalLanguage framework docs, authored lesson in simple English, interactive 4-step on-device Neural Engine inference and Private Cloud Compute escalation diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/foundation-models/review.html`). All checks passed. Batch 3E (Design, Accessibility & System Integration) is now 100% COMPLETE (8 of 8 published)! Mid level progress: 37 of 53 published (104 total published topics across curriculum).

- **2026-11-10** — Built and published topic `widgets-app-intents` (Widgets and App Intents) [bonus]: researched official Apple WidgetKit, App Intents, AppIntentTimelineProvider, and WWDC23 interactive widgets docs, authored lesson in simple English, interactive 4-step WidgetKit timeline and AppIntent lifecycle diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/widgets-app-intents/review.html`). All checks passed. Batch 3E progress: 7 of 8 published (103 total published topics across curriculum). Starting foundation-models.

- **2026-11-10** — Built and published topic `deep-links` (Deep Links and Universal Links): researched official Apple Universal Links, custom URL schemes, apple-app-site-association requirements, and SwiftUI onOpenURL modifier, authored lesson in simple English, interactive 4-step Universal Link routing and domain verification diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/deep-links/review.html`). All checks passed. Batch 3E progress: 6 of 8 published (102 total published topics across curriculum). Starting widgets-app-intents.

- **2026-11-10** — Built and published topic `background-tasks` (Background Work): researched official Apple BackgroundTasks framework, BGTaskScheduler, and background URLSession docs, authored lesson in simple English, interactive 4-step BGTaskScheduler lifecycle and execution queue diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/background-tasks/review.html`). All checks passed. Batch 3E progress: 5 of 8 published (101 total published topics across curriculum). Starting deep-links.

- **2026-11-10** — Built and published topic `notifications` (Push and Local Notifications): researched official Apple UserNotifications and APNs registration docs, authored lesson in simple English, interactive 4-step APNs lifecycle and device token synchronization diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/notifications/review.html`). All checks passed. Batch 3E progress: 4 of 8 published (100 total published topics across curriculum!). Starting background-tasks.

- **2026-11-10** — Built and published topic `ipad-adaptive-layout` (iPad and Adaptive Layout): researched official Apple HIG Layout, UITraitCollection, NavigationSplitView, and ViewThatFits docs, authored lesson in simple English, interactive 4-step iPad window resizing from regular to compact size class diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/ipad-adaptive-layout/review.html`). All checks passed. Batch 3E progress: 3 of 8 published (99 total published topics across curriculum). Starting notifications.

- **2026-11-10** — Built and published topic `localization` (Localization) [bonus]: researched official Xcode String Catalogs (.xcstrings), String(localized:), LocalizedStringResource, and HIG Right-to-Left docs, authored lesson in simple English, interactive 4-step String Catalog build extraction and localization pipeline diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/localization/review.html`). All checks passed. Batch 3E progress: 2 of 8 published (98 total published topics across curriculum). Starting ipad-adaptive-layout.

- **2026-11-10** — Built and published topic `accessibility` (Accessibility): researched official Apple Accessibility and HIG docs, authored lesson in simple English, interactive 4-step VoiceOver tree focus and speech cycle diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/accessibility/review.html`). All checks passed. Batch 3E progress: 1 of 8 published (97 total published topics across curriculum). Starting localization.

- **2026-11-10** — Starting Batch 3E: Design, Accessibility & System Integration (8 topics: `accessibility` through `foundation-models`). Launching dedicated autonomous subagent.

- **2026-11-10** — Built and published topic `custom-views-layout-pass` (Custom Views and the Layout Pass): researched official UIKit layoutSubviews, setNeedsLayout, layoutIfNeeded, and WWDC18 Auto Layout docs, authored lesson in simple English, interactive 4-step run loop layout cycle diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/custom-views-layout-pass/review.html`). All checks passed. Batch 3D (SwiftUI & UIKit Advanced) is now 100% COMPLETE (7 of 7 published)! Mid level progress: 29 of 53 published (96 total published topics across curriculum).

- **2026-11-10** — Built and published topic `swiftui-performance` (SwiftUI Performance): researched official WWDC23 and WWDC21 SwiftUI performance docs, authored lesson in simple English, interactive 4-step render loop and dependency graph diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/swiftui-performance/review.html`). All checks passed. Batch 3D progress: 6 of 7 published. Starting custom-views-layout-pass.

- **2026-11-10** — Built and published topic `swiftui-uikit-interop` (SwiftUI and UIKit Together): researched official UIViewRepresentable, UIViewControllerRepresentable, UIHostingController, and UIHostingConfiguration docs, authored lesson in simple English, interactive 4-step coordinator lifecycle and containment ceremony diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/swiftui-uikit-interop/review.html`). All checks passed. Batch 3D progress: 5 of 7 published. Starting swiftui-performance.

- **2026-11-10** — Fresh audit, first group of 6 (stopped at the 10-minute limit set by the user). `structs-vs-classes` passes the gate and left the legacy list. `control-flow` and `swift-basics` are partly fixed. `error-handling`, `optionals` and `methods-and-initialization` have full findings in `audit.md`, with no fixes yet. Learned: the coverage script missed all 11 untaught questions in `optionals`, so the independent fact check stays required. Each topic needs more than 6 minutes.
- **2026-11-10** — Built and published topic `custom-layouts` (Custom Layouts) [bonus]: researched official SwiftUI Layout protocol and WWDC22 Compose custom layouts session, authored lesson in simple English, interactive 4-step layout negotiation and positioning diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, audit.json passing publish gate, and review page generated (`docs/topics/custom-layouts/review.html`). All checks passed. Batch 3D progress: 4 of 7 published. Starting swiftui-uikit-interop.

- **2026-11-10** — Started step 4.7 Content audit. A spot check of 3 random fresh topics found wrong facts and exam questions on untaught ideas that the old checks could not catch. Added the coverage script, the publish gate (independent `audit.json` + coverage + code), a validator rule that blocks publishing without a passing audit, and the legacy list of 92 topics to audit. Updated the topic workflow, the `new-topic` and `content-fact-checker` skills and `AGENTS.md`. Next: audit the fresh level with parallel helper agents.
- **2026-11-10** — Built and published topic `swiftui-animations` (Animations and Transitions): researched official SwiftUI Animations and WWDC23 Explore SwiftUI animation docs, authored lesson in simple English, interactive 4-step animation scope, spring physics, and transitions diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-animations/review.html`). All checks passed. Batch 3D progress: 3 of 7 published. Starting custom-layouts [bonus].
- **2026-11-10** — Built and published topic `view-identity-lifetime` (View Identity and Lifetime): researched official WWDC21 Demystify SwiftUI session and State docs, authored lesson in simple English, interactive 4-step view identity, branching, and state lifetime diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/view-identity-lifetime/review.html`). All checks passed. Batch 3D progress: 2 of 7 published. Starting swiftui-animations.
- **2026-11-10** — Built and published topic `swiftui-loading-data` (Loading Data in SwiftUI): researched official Apple AsyncImage, task, and refreshable docs, authored lesson in simple English, interactive 4-step task lifecycle and AsyncImage diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-loading-data/review.html`). All checks passed. Batch 3D progress: 1 of 7 published. Starting view-identity-lifetime.
- **2026-11-10** — Built and published topic `approachable-concurrency` (Approachable Concurrency): researched official WWDC25 Session 268 and Swift 6.2 release, authored lesson in simple English, interactive 4-step diagram with stepper illustrating default main actor isolation and off-actor hops, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/approachable-concurrency/review.html`). All checks passed. Batch 3C is now 100% COMPLETE (8 of 8 published). Mid level progress: 22 of 53 published. Starting Batch 3D with `swiftui-loading-data`.
- **2026-11-10** — Resumed Batch 3C: finishing `approachable-concurrency` and queued Batch 3D (SwiftUI & UIKit Advanced). Launching dedicated autonomous subagent.

- **2026-11-10** — Built and published topic `swift-6-strict-concurrency` (Swift 6 Strict Concurrency): researched official Swift.org migration guide and WWDC24 migrate to Swift 6, authored lesson in simple English, interactive 4-step strict concurrency diagnostic diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swift-6-strict-concurrency/review.html`). All checks passed. Batch 3C progress: 7 of 8 published. Starting approachable-concurrency.

- **2026-11-10** — Built and published topic `sendable-data-races` (Sendable and Data Races): researched official Sendable docs and WWDC22 eliminate data races, authored lesson in simple English, interactive 4-step Sendable isolation and data race diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/sendable-data-races/review.html`). All checks passed. Batch 3C progress: 6 of 8 published. Starting swift-6-strict-concurrency.

- **2026-11-10** — Built and published topic `actors-and-main-actor` (Actors and @MainActor): researched official Swift Concurrency and MainActor docs, authored lesson in simple English, interactive 4-step actor isolation and reentrancy diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/actors-and-main-actor/review.html`). All checks passed. Batch 3C progress: 5 of 8 published. Starting sendable-data-races.

- **2026-11-10** — Built and published topic `async-sequences` (AsyncSequence and AsyncStream): researched official AsyncSequence and AsyncStream docs, authored lesson in simple English, interactive 4-step stream pipeline diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/async-sequences/review.html`). All checks passed. Batch 3C progress: 4 of 8 published. Starting actors-and-main-actor.

- **2026-11-10** — Built and published topic `task-cancellation` (Task Cancellation): researched official Task and Concurrency docs, authored lesson in simple English, interactive 4-step cancellation diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/task-cancellation/review.html`). All checks passed. Batch 3C progress: 3 of 8 published. Starting async-sequences.

- **2026-11-10** — Built and published topic `structured-concurrency` (Tasks and Task Groups): researched official Swift Concurrency and TaskGroup docs, authored lesson in simple English, interactive 4-step task tree diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/structured-concurrency/review.html`). All checks passed. Batch 3C progress: 2 of 8 published. Starting task-cancellation.

- **2026-11-10** — Built and published topic `memory-graph-debugger` (Finding Leaks with the Memory Graph): researched official Xcode and WWDC18 memory docs, authored lesson in simple English, interactive 4-step memory graph diagram with stepper, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/memory-graph-debugger/review.html`). All checks passed. Batch 3C progress: 1 of 8 published. Starting structured-concurrency.

- **2026-11-10** — Starting Batch 3C: Memory Profiling & Swift Concurrency (8 topics: `memory-graph-debugger` through `approachable-concurrency`). Launching dedicated autonomous subagent.

- **2026-11-10** — Built and published topic `bits-math-geometry` (Bits, Math and Geometry) [bonus]: researched official FixedWidthInteger, CGRect, and OptionSet docs, authored lesson in simple English, interactive bitwise stepper diagram with step controls, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/bits-math-geometry/review.html`). All checks passed. Batch 3B is now 100% COMPLETE (7 of 7 published: 4 main + 3 bonus)! Mid level progress: 14 of 53 published (81 total published topics across curriculum).

- **2026-11-10** — Built and published topic `dynamic-programming` (Dynamic Programming) [bonus]: researched official Array/NSCache docs and DP mechanics, authored lesson in simple English, interactive diagram with bottom-up tabulation and state rolling, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/dynamic-programming/review.html`). All checks passed. Batch 3B progress: 6 of 7 published. Starting bits-math-geometry.

- **2026-11-10** — Built and published topic `intervals` (Intervals): researched official ClosedRange/DateInterval docs and interval mechanics, authored lesson in simple English, interactive timeline diagram with interval merging, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/intervals/review.html`). All checks passed. Batch 3B progress: 5 of 7 published. Starting dynamic-programming.

- **2026-11-10** — Built and published topic `tries` (Tries) [bonus]: researched official String docs and trie mechanics, authored lesson in simple English, interactive diagram with prefix sharing and word search, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/tries/review.html`). All checks passed. Batch 3B progress: 4 of 7 published. Starting intervals.

- **2026-11-10** — Built and published topic `heaps` (Heaps): researched official docs and algorithms mechanics, authored lesson in simple English, interactive diagram with sift-up/sift-down and array buffer, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/heaps/review.html`). All checks passed. Batch 3B progress: 3 of 7 published. Starting tries.

- **2026-11-10** — Built and published topic `graphs` (Graphs): researched official docs and interview patterns, authored lesson in simple English, interactive diagram with topological sort, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/graphs/review.html`). All checks passed. Starting heaps.

- **2026-11-09** — Built and published topic trees-bfs-dfs (Trees: BFS and DFS): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/trees-bfs-dfs/review.html`). All checks passed. Batch 3B progress: 1 of 7 published. Starting graphs.

- **2026-11-09** — Completed Batch 3A (Swift Language Deep Dive: 7 topics published). Starting Batch 3B (Advanced Algorithms & Data Structures: 7 topics: `trees-bfs-dfs` through `bits-math-geometry`). Launching dedicated autonomous subagent.

- **2026-11-09** — Completed Batch 3A (Swift Language Deep Dive: all 7 topics published and committed). Mid level progress is now 7 of 53 published (74 total published topics across curriculum: 22 Fresh, 45 Junior, 7 Mid).

- **2026-11-09** — Built and published topic result-builders (Result Builders) [bonus]: researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/result-builders/review.html`). All checks passed. Batch 3A complete!

- **2026-11-09** — Built and published topic property-wrappers (Property Wrappers): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/property-wrappers/review.html`). All checks passed. Starting result-builders.

- **2026-11-09** — Built and published topic key-paths (Key Paths) [bonus]: researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/key-paths/review.html`). All checks passed. Starting property-wrappers.

- **2026-11-09** — Built and published topic copy-on-write (Copy-on-Write and Value Semantics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/copy-on-write/review.html`). All checks passed. Starting key-paths.

- **2026-11-09** — Built and published topic opaque-and-boxed-types (Opaque and Boxed Types: some vs any): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/opaque-and-boxed-types/review.html`). All checks passed. Starting copy-on-write.

- **2026-11-09** — Built and published topic generics-associated-types (Generics: Associated Types and Where Clauses): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/generics-associated-types/review.html`). All checks passed. Starting opaque-and-boxed-types.

- **2026-11-09** — Built and published topic protocol-oriented-programming (Protocol-Oriented Programming): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/protocol-oriented-programming/review.html`). All checks passed. Starting generics-associated-types.

- **2026-11-09** — Step 4.3 started: Mid level topics (Wave 3, 53 topics across 8 batches). Launching dedicated autonomous subagent for Batch 3A (Swift Language Deep Dive: `protocol-oriented-programming` through `result-builders`).

- **2026-11-09** — Completed Junior Level Wave 2: all 45 junior topics (44 main + 1 bonus) across Batches 2A–2F are now 100% published and committed! Built and published the final topic unit-testing (Unit Tests): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/unit-testing/review.html`). All checks passed. Total published topics across curriculum: 67 (22 Fresh + 45 Junior).

- **2026-11-09** — Pushed the project to a public GitHub repo with MIT (code) and CC BY-NC-SA 4.0 (content) licenses, and added CI. The first CI run passed. Added `/main` (a stray compiled Swift file) to `.gitignore`.
- **2026-11-09** — Built and published topic logging-oslog (Logging with OSLog): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/logging-oslog/review.html`). All checks passed. Starting unit-testing.

- **2026-11-09** — Built and published topic debugging-lldb (Debugging with Breakpoints and LLDB): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/debugging-lldb/review.html`). All checks passed. Starting logging-oslog.

- **2026-11-09** — Built and published topic solid-basics (SOLID Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/solid-basics/review.html`). All checks passed. Starting debugging-lldb.

- **2026-11-09** — Built and published topic mvc (MVC and Its Problems): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/mvc/review.html`). All checks passed. Starting solid-basics.

- **2026-11-09** — Built and published topic communication-patterns (Delegates, Closures and Notifications): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/communication-patterns/review.html`). All checks passed. Starting mvc.

- **2026-11-09** — Planned the content dashboard with you: a public GitHub repo + CI now; a view-only `/admin` dashboard with the reports inbox in Phase 7; quick edits and AI tasks right after launch. Every change is a pull request with all checks and a preview, and you approve it. AI tasks run on your computer, not in GitHub Actions.
- **2026-11-09** — Completed Batch 2E (Design, System & Data: 9 topics published and committed). Launching dedicated autonomous subagent for the final Junior batch: Batch 2F (Architecture & Testing: 6 topics, `communication-patterns` through `unit-testing`).

- **2026-11-09** — Completed Batch 2E (Design, System & Data: all 9 topics published and committed). Junior level progress is now 39 of 45 topics published (61 total published topics across curriculum). Final Junior batch is Batch 2F (Architecture & Testing, 6 topics).

- **2026-11-09** — Built and published topic keychain-basics (Keychain Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/keychain-basics/review.html`). All checks passed. Batch 2E complete!

- **2026-11-09** — Built and published topic userdefaults-and-files (UserDefaults and Files): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/userdefaults-and-files/review.html`). All checks passed. Starting keychain-basics.

- **2026-11-09** — Built and published topic urlsession (URLSession): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/urlsession/review.html`). All checks passed. Starting userdefaults-and-files.

- **2026-11-09** — Built and published topic http-rest-basics (HTTP and REST Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/http-rest-basics/review.html`). All checks passed. Starting urlsession.

- **2026-11-09** — Built and published topic signing-app-store (App Signing and the App Store): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/signing-app-store/review.html`). All checks passed. Starting http-rest-basics.

- **2026-11-09** — Built and published topic permissions-privacy (Permissions and Privacy): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/permissions-privacy/review.html`). All checks passed. Starting signing-app-store.

- **2026-11-09** — Built and published topic app-lifecycle (App and Scene Lifecycle): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/app-lifecycle/review.html`). All checks passed. Starting permissions-privacy.

- **2026-11-09** — Resumed Batch 2E subagent upon user request. Continuing from `app-lifecycle` through `keychain-basics`.

- **2026-11-09** — Subagent stopped upon user request. Published `hig-liquid-glass` (Commit `047ccf5`). Batch 2E paused with 2 of 9 topics published (54 total published topics across curriculum). Draft of `app-lifecycle` preserved.

- **2026-11-09** — Built and published topic hig-liquid-glass (Apple Design and Liquid Glass) [bonus]: researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/hig-liquid-glass/review.html`). All checks passed. Starting app-lifecycle.

- **2026-11-09** — Built and published topic dark-mode-dynamic-type (Dark Mode and Dynamic Type): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/dark-mode-dynamic-type/review.html`). All checks passed. Starting hig-liquid-glass.

- **2026-11-09** — Completed Batch 2D (SwiftUI & UIKit: 9 topics published and committed). Launching dedicated autonomous subagent for Batch 2E (Design, System & Data: 9 topics, `dark-mode-dynamic-type` through `keychain-basics`).

- **2026-11-09** — Built and published topic table-collection-views (Table and Collection Views): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/table-collection-views/review.html`). All checks passed. Batch 2D (SwiftUI & UIKit - 9 topics) is now 100% complete and published!

- **2026-11-09** — Built and published topic uikit-navigation (Navigation in UIKit): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/uikit-navigation/review.html`). All checks passed. Starting table-collection-views.

- **2026-11-09** — Built and published topic auto-layout (Auto Layout): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/auto-layout/review.html`). All checks passed. Starting uikit-navigation.

- **2026-11-09** — Built and published topic view-controller-lifecycle (View Controller Lifecycle): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/view-controller-lifecycle/review.html`). All checks passed. Starting auto-layout.

- **2026-11-09** — Built and published topic uiviews-and-view-controllers (Views and View Controllers): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/uiviews-and-view-controllers/review.html`). All checks passed. Starting view-controller-lifecycle.

- **2026-11-09** — Built and published topic sheets-alerts-dialogs (Sheets, Alerts and Dialogs): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/sheets-alerts-dialogs/review.html`). All checks passed. Starting uiviews-and-view-controllers.

- **2026-11-09** — Built and published topic forms-and-input (Forms and User Input): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/forms-and-input/review.html`). All checks passed. Starting sheets-alerts-dialogs.

- **2026-11-09** — Built and published topic observable-object (ObservableObject and @StateObject): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/observable-object/review.html`). All checks passed. Starting forms-and-input.

- **2026-11-09** — Built and published topic swiftui-observation (Data Flow with @Observable): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-observation/review.html`). All checks passed. Starting observable-object.

- **2026-11-09** — Completed Batch 2C (Memory & Concurrency: 6 topics published and committed). Launching dedicated autonomous subagent for Batch 2D (SwiftUI & UIKit: 9 topics, `swiftui-observation` through `table-collection-views`).

- **2026-11-09** — Built and published topic async-await (async/await): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/async-await/review.html`). All checks passed. Batch 2C (Memory & Concurrency - 6 topics) is now 100% complete and published!

- **2026-11-09** — Built and published topic gcd-basics (GCD Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/gcd-basics/review.html`). All checks passed. Starting async-await.

- **2026-11-09** — Built and published topic main-thread (The Main Thread): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/main-thread/review.html`). All checks passed. Starting gcd-basics.

- **2026-11-09** — Built and published topic retain-cycles (Retain Cycles): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/retain-cycles/review.html`). All checks passed. Starting main-thread.

- **2026-11-09** — Built and published topic strong-weak-unowned (Strong, Weak and Unowned): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/strong-weak-unowned/review.html`). All checks passed. Starting retain-cycles.

- **2026-11-09** — Built and published topic arc-basics (How ARC Works): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/arc-basics/review.html`). All checks passed. Starting strong-weak-unowned.

- **2026-11-09** — Completed Batch 2B (Coding Interview Algorithms: 6 topics published and committed). Launching dedicated autonomous subagent for Batch 2C (Memory & Concurrency: 6 topics, `arc-basics` through `async-await`).

- **2026-11-09** — Built and published topic matrix-problems (Matrix Problems): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/matrix-problems/review.html`). All checks passed. Batch 2B (Coding Interview Algorithms - 6 topics) is now 100% complete and published!

- **2026-11-09** — Phase 6 (AI Grading) complete: Built Gemini 2.5 Flash and Mock grading providers with structured Zod output, pure rubric scoring math (100/50/0 with 50% key missed cap), `POST /api/grade` with sliding window rate limiting and 2000 char bounds, Exam Runner UI integration with "Grade with AI Coach" and offline fallback, 41 passing Vitest tests (including rubric benchmarks), 16 passing Playwright E2E and axe-core tests, and authored [docs/phase-6-summary.md](docs/phase-6-summary.md).

- **2026-11-09** — Built and published topic recursion (Recursion): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/recursion/review.html`). All checks passed. Starting matrix-problems.

- **2026-11-09** — Step 6.1 and 6.2 done: Built AI Provider Layer (`GradingProvider` interface, `GeminiGradingProvider`, `MockGradingProvider`) and Rubric Evaluation Engine with structured Zod schema and CEFR B1 coaching prompt. Verified rubric scoring math (100% met, 50% partly met, 50% key missed cap) with 8 passing Vitest tests (34 total). Starting Step 6.3: API Route & Abuse Protections.

- **2026-11-09** — Built and published topic linked-lists (Linked Lists): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/linked-lists/review.html`). All checks passed. Starting recursion.

- **2026-11-09** — Planned Phase 6 (AI Grading): authored [docs/phase-6-plan.md](docs/phase-6-plan.md) covering Gemini provider, structured rubric evaluation, abuse protections, and offline self-check fallback. Prepared Claude Code setup recommender review on app code for your approval.

- **2026-11-09** — Built and published topic stacks-and-queues (Stacks and Queues): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/stacks-and-queues/review.html`). All checks passed. Starting linked-lists.

- **2026-11-09** — Built and published topic two-pointers-sliding-window (Two Pointers and Sliding Window): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/two-pointers-sliding-window/review.html`). All checks passed. Starting stacks-and-queues.

- **2026-11-09** — Built and published topic sorting-binary-search (Sorting and Binary Search): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/sorting-binary-search/review.html`). All checks passed. Starting two-pointers-sliding-window.

- **2026-11-09** — Decided free Firebase and Cloudflare services with you: Firebase Auth + Firestore replace Supabase for login (Phase 8), Cloudflare Web Analytics (Phase 7), Cloudflare Workers AI replaces Groq / OpenRouter as the backup grader (Phase 6), and Cloudflare D1 stores "Report a problem" and question stats after launch. Hosting stays on Vercel; Cloudflare is plan B if money ever comes in. Limits checked on the official pricing pages and written in `docs/stack.md`.
- **2026-11-09** — Completed Batch 2A (Swift Language Advanced: 9 topics published and committed). Launching dedicated autonomous subagent for Batch 2B (Coding Interview Algorithms: 6 topics, `sorting-binary-search` through `matrix-problems`).

- **2026-11-09** — Changed the certificate plan: only logged-in learners get a certificate, so it moved from Phase 5 to Phase 8 (login). Every certificate is now verified, with a check link, and the name comes from the account.
- **2026-11-09** — Your new idea: a downloadable PDF certificate. Added to Phase 5 as the last step (level done + path score at the pass mark, calm branded design, made in the browser, name never stored). Added verified check links to Phase 8, because they need login.
- **2026-11-09** — Added two theme items to Phase 5: no wrong-theme flash on load, and light and dark status-bar colors for the PWA. Light and dark mode itself was already planned in Phase 3.
- **2026-11-09** — You asked for PWA support. Added to Phase 5: installable (web app manifest) and works offline (Serwist service worker). Added push notifications for review reminders to Phase 8, because they need a server and a database.
- **2026-11-09** — Step 4.2 started: Junior level topics (Wave 2, 45 topics across 6 batches). Launching dedicated autonomous subagent for Batch 2A (`optional-chaining` through `codable`).

- **2026-11-09** — Step 5.8 done, Phase 5 complete: Verified Web App MVP with 26 passing Vitest unit tests, 14 passing Playwright E2E tests (mobile 375px & desktop), 0 axe-core WCAG 2.1 A/AA violations, Next.js 16 SSG build producing 52 static routes with Turbopack, and authored docs/phase-5-summary.md. Phase 5 Web App MVP is 100% complete and approved!

- **2026-11-09** — Built and published topic xcode-and-git-basics (Xcode, Projects and Git): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/xcode-and-git-basics/review.html`). Wave 1 (all 22 Fresh level topics) is now 100% complete and published!

- **2026-11-09** — Built and published topic swiftui-navigation (Navigation): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-navigation/review.html`). Batch 1D complete. Starting final Fresh topic: xcode-and-git-basics.

- **2026-11-09** — Step 5.7 done: Built Screen 11 (Progress & Settings) and Screen 12 (About). Features: stage and unit performance breakdown bars, Device/Light/Dark appearance switcher applied to document, JSON progress file export with clipboard fallback, JSON file import with schema preview comparison, typed `RESET` progress confirmation modal, mission and source policy declarations, and Apple trademark notice. 49 pages prerendered cleanly. Starting Step 5.8: Accessibility, Testing & Final Verification.

- **2026-11-09** — Step 5.6 done: Built Screen 6 (Exam Runner), Screen 7 (Topic Result), Screen 8 & 9 (Skip Tests & Skip Results), and Screen 10 (Path Complete). Features: 10-question drawing engine with option shuffling, Tap-then-Check interaction loop, rubric self-check scoring with key point capping, mistakes-first review list, stage and unit skip exams (80% threshold) marking covered stops with skip score, and path completion readiness labels (85% Interview ready, 70% Almost ready) with unit performance breakdown. All 47 pages prerendered cleanly. Starting Step 5.7: Settings, Progress Export/Import & About.

- **2026-11-09** — Built and published topic swiftui-lists (Lists and ForEach): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-lists/review.html`). All checks passed. Starting swiftui-navigation.

- **2026-11-09** — Step 5.5 done: Built Screen 5 (Lesson Reader & Animated Diagrams). Features: section-by-section reader splitting by headings, interactive guess-first hook with recap reveal, interactive QuickCheck with explanation toggles, animated 4-step diagram stepper with Back/Next/Replay and accessible descriptions, A/A+/A++ text size switcher tied to store, copyable Swift code figures, keyboard focus management on step headings, official sources drawer, and SSG static prerendering for all published topic lessons. Clean Next.js build and 26 passing tests. Starting Step 5.6: Exam Runner & Results.

- **2026-11-09** — Step 5.4 done: Built Screen 3 (Winding Path Map) and Screen 4 (Locked Notice bottom sheet). Features: sticky top stats bar (done count, path score, accessible progress bar), zig-zag responsive road, 6 visual stop states (passed, updated with amber badge, current with pulse ring, locked with prerequisite guidance, skipped with dashed outline, bonus branch), completed stage folding, unit and stage skip test triggers, and floating "Go to my stop" jump button. Next.js build passes cleanly with 26 unit tests. Starting Step 5.5: Lesson Reader & Diagrams.

- **2026-11-09** — Built and published topic codable (Codable and JSON): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/codable/review.html`). All checks passed. Completed Batch 2A (Swift Language Advanced - 9 topics).

- **2026-11-09** — Built and published topic closures-escaping-capture (Closures: Escaping and Capture Lists): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/closures-escaping-capture/review.html`). All checks passed. Starting codable.

- **2026-11-09** — Built and published topic access-control (Access Control): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/access-control/review.html`). All checks passed. Starting closures-escaping-capture.

- **2026-11-09** — Built and published topic state-and-binding (@State and @Binding): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/state-and-binding/review.html`). All checks passed. Starting swiftui-lists.

- **2026-11-09** — Built and published topic generics-basics (Generics: The Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/generics-basics/review.html`). All checks passed. Starting access-control.

- **2026-11-09** — Built and published topic extensions (Extensions): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/extensions/review.html`). All checks passed. Starting generics-basics.

- **2026-11-09** — Built and published topic protocols (Protocols): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/protocols/review.html`). All checks passed. Starting extensions.

- **2026-11-09** — Built and published topic type-casting (Type Casting and Any): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/type-casting/review.html`). All checks passed. Starting protocols.

- **2026-11-09** — Built and published topic inheritance (Inheritance): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/inheritance/review.html`). All checks passed. Starting type-casting.

- **2026-11-09** — Built and published topic optional-chaining (Optional Chaining): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/optional-chaining/review.html`). All checks passed. Starting inheritance.

- **2026-11-09** — Step 5.3 done: Built Screen 1 (Welcome) and Screen 2 (Level Picker) with interactive self-check checklist, unbroken run suggestion algorithm, radio level cards, cumulative topic counts, responsive 375px/desktop styling, and seamless store hydration. 26 Vitest unit tests passing, Next.js build clean. Starting Step 5.4: Winding Path Map.

- **2026-11-09** — Built and published topic swiftui-layout (Stacks and Layout): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-layout/review.html`). All checks passed. Starting state-and-binding.

- **2026-11-09** — Step 5.2 done: Content & Store Layer built. Zod schemas for levels, units, rules, topics, and questions; content loaders and path road builder; Shiki syntax highlighter; versioned Zustand progress store with sequential migrations, partialize, and SSR-safe hydration; 23 Vitest unit tests verifying 100% of product rules (pass marks, skip tests, score calculation, option shuffling, store resilience). Verified with clean build and passing tests. Starting Step 5.3: Welcome & Level Picker screens.

- **2026-11-09** — Step 5.1 done: Next.js 16.4 (App Router) scaffolded with TypeScript, Turbopack, Tailwind v4 tokens, brand helper, MDX support, Vitest test runner, and Playwright config. Verified with clean production build and test run. Starting Step 5.2: Content & Store Layer.

- **2026-11-09** — Built and published topic swiftui-views-modifiers (Views and Modifiers): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swiftui-views-modifiers/review.html`). All checks passed. Starting swiftui-layout.

- **2026-11-09** — Phase 5 plan approved by user. Started step 5.1: Setup and scaffold Next.js 16 App Router application.
- **2026-11-09** — Built and published topic hash-tables (Hash Tables): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/hash-tables/review.html`). All checks passed. Completed Batch 1C (Coding Interview). Starting Batch 1D: swiftui-views-modifiers.
- **2026-11-09** — Planned Phase 5: Web App MVP (`docs/phase-5-plan.md`). Structured into 8 verifiable steps from scaffolding to a11y tests, running in parallel with Phase 4 content production. Status: waiting for your review.
- **2026-11-09** — arrays-and-strings published. User authorized autonomous content production for remaining Phase 4 topics without pausing for manual approvals.
- **2026-11-09** — Built topic arrays-and-strings (Arrays and Strings): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/arrays-and-strings/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — big-o approved and published by user. Started topic arrays-and-strings: researching two-pointer techniques, sliding window patterns, and Swift string indexing.
- **2026-11-09** — Built topic big-o (Big-O: Time and Space): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/big-o/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — Clarified Fresh vs Junior batch sequence with user: Complete all 22 Fresh topics first, keeping optional-chaining for Wave 2 (Junior). Started topic big-o (Big-O: Time and Space): researching official sources, Swift collection complexities, and interview patterns.
- **2026-11-09** — error-handling approved and published by user. Completed Batch 1B (Swift Language Intermediate Types & Logic: 5 topics).

- **2026-11-09** — Built topic error-handling (Error Handling): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/error-handling/review.html`). Status: review, waiting for your approval.

- **2026-11-09** — methods-and-initialization approved and published by user. Started topic error-handling: researching official documentation and Swift 6 compiler behavior.

- **2026-11-09** — Built topic methods-and-initialization (Methods and Initialization): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/methods-and-initialization/review.html`). Status: review, waiting for your approval.

- **2026-11-09** — properties approved and published by user (also aligned structs-vs-classes topic.json status to published). Started topic methods-and-initialization: researching official documentation and Swift 6 compiler behavior.

- **2026-11-09** — Built topic properties (Properties): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/properties/review.html`). Status: review, waiting for your approval.

- **2026-11-09** — enumerations approved and published by user. Started topic properties: researching official documentation and Swift 6 compiler behavior.

- **2026-11-09** — Built topic enumerations (Enumerations): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/enumerations/review.html`). Status: review, waiting for your approval.

- **2026-11-09** — closures-basics approved and published by user. Started topic enumerations: researching official documentation and Swift 6 compiler behavior.

- **2026-11-09** — Built topic closures-basics (Closures: The Basics): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/closures-basics/review.html`). Status: review, waiting for your approval.

- **2026-11-09** — Ran the claude-code-setup recommender for Phase 5, at your request, with web research on official sources. Added the rules `nextjs.md`, `progress-store.md` and `testing.md`, the skills `/build-screen` and `/ui-check`, and the agents `a11y-reviewer` and `rules-tester` (also in `.agents/` through the symlinks). Third-party tools (next-devtools MCP, next-dev-loop, shadcn skill + MCP, Playwright CLI + skills, react-best-practices, Context7) are planned for right after scaffolding. Changed the Context7 item: new official setup command, and Next.js now ships its own docs for agents.
- **2026-11-09** — Added `.agents/rules` and `.agents/skills` as symlinks to `.claude/rules` and `.claude/skills`, so other agents find the same rules and skills. One source, no copies. Noted in `AGENTS.md`.
- **2026-11-09** — functions approved and published by user. Completed Batch 1A (Swift Language Core - 7 topics). Started Batch 1B (Intermediate Types & Logic): topic closures-basics.
- **2026-11-09** — Built topic functions (Functions): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/functions/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — control-flow approved and published by user. Started topic functions: researching official documentation and Swift 6 compiler behavior.
- **2026-11-09** — Built topic control-flow (Control Flow): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/control-flow/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — collections approved and published by user. Started topic control-flow: researching official documentation and Swift 6 compiler behavior.
- **2026-11-09** — Built topic collections (Arrays, Sets and Dictionaries): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/collections/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — strings-and-characters approved and published by user. Started topic collections: researching official documentation and Swift 6 compiler behavior.
- **2026-11-09** — Built topic strings-and-characters (Strings and Characters): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/strings-and-characters/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — operators approved and published by user. Started topic strings-and-characters: researching official documentation and Swift 6 compiler behavior.
- **2026-11-09** — Built topic operators (Operators): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/operators/review.html`). Status: review, waiting for your approval.
- **2026-11-09** — optionals approved and published by user. Started topic operators: researching official documentation and Swift 6 compiler behavior.
- **2026-11-08** — Built topic optionals (Optionals): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/optionals/review.html`). Status: review, waiting for your approval.
- **2026-11-08** — swift-basics approved and published by user. Started topic optionals: researching official documentation and Swift 6 compiler behavior.
- **2026-11-08** — Built topic swift-basics (Constants, Variables and Types): researched official docs, authored lesson in simple English, animated diagram, 31 verified questions (15 MCQ, 8 code reading, 5 written, 3 code write), fact-check report, rubric test, and review page generated (`docs/topics/swift-basics/review.html`). Status: review, waiting for your approval.
- **2026-11-08** — Step 4.0 finished: generalized prototype review builder (`prototype/build.mjs`) to handle any topic with or without diagrams, writing to `docs/topics/<topic-id>/review.html`; pilot notes moved to `docs/topics/structs-vs-classes/`; hooked in `protect-generated.sh`. Starting Batch 1A (`swift-basics`).
- **2026-11-08** — Planned Phase 4: content production level by level (`docs/phase-4-plan.md`). Decided per-topic notes live in `docs/topics/<topic-id>/`. Step 4.0 started: generalizing prototype review builder for all topics.
- **2026-11-08** — Phase 3 approved and finished. Step 3.9 approved: built interactive walk-through hub (`docs/design/walkthrough.html`), verified local/hosted prototype navigation across all 5 prototypes, authored Phase 3 summary (`docs/phase-3-summary.md`), and committed to Git.
- **2026-11-08** — Ran the claude-code-setup recommender early, at your request (the plan said before Phase 6; it will run again then on the app code). Added `AGENTS.md` as the single instruction file for all agents (Codex, Cursor, Copilot, Gemini CLI, Windsurf; Claude Code imports it), `.gemini/settings.json`, a hook that blocks hand edits to generated files, a brand-check hook, the `/new-topic` skill and the `plain-english-reviewer` agent. context7 is planned for Phase 5.
- **2026-10-29** — Step 3.8 finished and waiting for review. You chose to skip the reading-time test: copy, download and send did not reach me, so it moves to Phase 5 with real learners.
- **2026-10-29** — Step 3.8: the VoiceOver person test moves to Phase 5 (your choice). The reading-time test is still waiting: the downloaded file did not reach this Mac, so you will try again.
- **2026-10-24** — Step 3.8 tool checks done: axe-core 4.14.0 on all 5 prototypes (light and dark) found 13 kinds of problems, all fixed. Light green and amber are slightly darker for contrast. Found and fixed a duplicate button id that broke the lesson's Continue button. All 8 pages republished to the same links. Waiting for the reading-time and VoiceOver tests.
- **2026-10-24** — Step 3.7 approved, including the half-ticked self-check rule. Step 3.8 started.
- **2026-10-24** — Step 3.7 built and waiting for review: welcome, level picker with self-check suggestion, progress and settings, export / import / reset of a JSON progress file, about, and the empty, loading and error states.
- **2026-10-24** — Step 3.6 approved, including tap-then-Check for answers. Step 3.7 started.
- **2026-10-23** — Step 3.6 done, waiting for review: exam, topic result, skip test and path complete screens with the real pilot questions. Options shuffle, save-and-continue, scoring and readiness checked at 375px. Readiness numbers added to `rules.json`.
- **2026-10-23** — Step 3.5 approved. Step 3.6 started.
- **2026-10-23** — Step 3.5 done, waiting for review: lesson page prototype with 8 steps built from the real lesson.mdx, text size control, sources list, copy buttons and the diagram in design-system colors. Tested at 375px with normal and largest text. Fixed 6 bugs (one was an old diagram bug from step 2.4).
- **2026-10-23** — Step 3.4 approved. Step 3.5 started.
- **2026-10-23** — Step 3.4 done, waiting for review: clickable winding-road prototype with all 164 real topics, stage signs, unit signposts, 6 stop states, stop cards, skip tests, folding and example progress. Tested at 375px. Fixed: a folded stage hid the Updated badge.
- **2026-10-23** — Step 3.3 approved. Step 3.4 started.
- **2026-10-23** — Step 3.3 done, waiting for review: design tokens and 11 component groups, built from `config/brand.json` + `config/design-tokens.json` into `config/generated/tokens.css` (Tailwind v4 + shadcn/ui names) and the Design System page. The contrast check found and fixed 4 AA failures (light amber now `#9c6210`). Checked at 375px and in dark mode.
- **2026-10-23** — Step 3.2 approved. Step 3.3 started.
- **2026-10-23** — Added a step before Phase 6: run the claude-code-setup recommender on the app code (your request).
- **2026-10-23** — Step 3.2 done, waiting for review: Apple trademark rules checked; 16 names checked on the App Store, domains and the web; 7 shown; you picked Prep Stops and Calm Trail. Brand saved in `config/brand.json` with a check script.
- **2026-10-23** — Step 3.1 approved. Step 3.2 started.
- **2026-10-23** — Step 3.1 done, waiting for review: 12 screens, 8 flows, and clear definitions of topic score, progress and path score. The 3 open choices from Phase 2 are decided. Flow Map page published.
- **2026-10-23** — Phase 3 plan approved. Step 3.1 started.
- **2026-10-23** — Phase 3 planned: 9 steps, from screens and flows to one clickable walk-through.
- **2026-10-23** — Phase 2 approved. Phase 3 planning started.
- **2026-10-22** — Step 2.9 done, Phase 2 waiting for review: lessons learned turned into rules, skills and 3 new automatic checks (MDX `//` lines, option length, answer spread — the length check found and fixed 3 more pilot questions). Topic workflow and Phase 2 summary written. All checks pass.
- **2026-10-22** — Step 2.8 approved. Step 2.9 started.
- **2026-10-22** — Step 2.8 done, waiting for review: rubric scoring rules added to rules.json, schema, hook and validator; key points marked in all 8 rubrics; 2 borderline rubrics fixed; topic bumped to version 2 with a changes entry (edit workflow proven); prototype self-check now uses Yes/Partly/No and shows the update note.
- **2026-10-22** — Step 2.7 approved, with both rubric proposals (half credit for "partly met"; key points cap the score). Step 2.8 started.
- **2026-10-22** — Step 2.7 done, waiting for review: prototype page built from the real lesson.mdx with the official MDX compiler, plus the diagram and a 10-question exam with feedback, results, retakes and self-check. Tested in the browser at phone width. Fixed 5 bugs found while testing (MDX comment line, script clash, topic position, repeat questions without storage, double "Right"). Rubric test: 24 sample answers graded; 2 proposals for your decision.
- **2026-10-22** — Step 2.6 approved. Step 2.7 started.
- **2026-10-22** — Step 2.6 done, waiting for review: fact-check found 4 wrong or outdated facts, 1 rule issue, unclear terms and 4 weak questions or rubrics. All fixed and confirmed with Swift 6.4. Bank version 2. 4 lessons for future topics written down.
- **2026-10-22** — Step 2.5 approved. Step 2.6 started.
- **2026-10-22** — Step 2.5 done, waiting for review: 31 questions (15 multiple choice, 8 read-the-code, 5 written, 3 write-code; 12 easy, 12 medium, 7 hard). All 12 code checks pass with Swift 6.4. Fixed a starter code bug found while checking. New: `verify` field, the runner checks questions, the hook requires `verify`, publishing needs 30+ questions.
- **2026-10-22** — Step 2.4 approved. Step 2.5 started.
- **2026-10-22** — Step 2.4 done, waiting for review: illustrated "copy vs shared" diagram prototype with 4 steps, code line per step, Back/Next/Replay, keyboard keys, screen reader text and a reduced-motion list. Checked at phone width (384px).
- **2026-10-22** — Step 2.3 approved, including the "Which one should you choose?" heading (now an allowed extra). Step 2.4 started.
- **2026-10-22** — Step 2.3 done, waiting for review: pilot lesson written (status draft). 4 code examples pass with Swift 6.4; lesson checks and simple-English check pass. New tool: `scripts/run-swift-examples.mjs`.
- **2026-10-22** — Step 2.2 approved. Step 2.3 started.
- **2026-10-22** — Step 2.2 done, waiting for review: Structs vs Classes researched from the Swift book, Apple docs, WWDC16 and Swift Optimization Tips; 14 facts checked by running code with Swift 6.4; 6 common wrong ideas; interview questions by level.
- **2026-10-22** — Step 2.1 approved. Step 2.2 started.
- **2026-10-22** — Step 2.1 done, waiting for review: lesson format based on learning research (guess first, quick checks, diagram, code with output, traps, interview answers, recap, Swift Playground link); new template; new lesson checker in the content hook. Fixed the app name: it is "Swift Playground" now.
- **2026-10-22** — Phase 2 plan approved. Step 2.1 started.
- **2026-10-22** — Phase 2 planned: 9 steps, pilot topic Structs vs Classes. Code examples will be run with Swift 6.4 on this Mac.
- **2026-10-22** — Phase 1 approved. Phase 2 planning started.
- **2026-10-22** — Step 1.8 done, waiting for review: all checks pass on every file, every level self-check item is covered, stale docs fixed, Phase 1 summary written, project saved as the first Git commit.
- **2026-10-22** — Step 1.7 approved. Step 1.8 started.
- **2026-10-22** — Step 1.7 done, waiting for review: 325 checked links (264 official, 61 community) on all 164 topics; source policy added to `rules.json` and enforced by the validator; sources shown on the Path Map page.
- **2026-10-22** — Step 1.6 approved. Step 1.7 started.
- **2026-10-22** — Step 1.6 done, waiting for review: topic order inside each unit, 221 prerequisite links, 4 conflicts decided by the user, new `briefIntro` field, interactive Path Map page (`scripts/build-path-page.mjs`).
- **2026-10-22** — Step 1.5 approved. Step 1.6 started.
- **2026-10-22** — Made topics easy to edit and improve: added an editing guide (what can change, when to bump version, split, merge, retire), an optional `changes` history in `topic.json` checked by the validator, `retired` for questions, and edit checks in Phases 2, 3, 4 and 5.
- **2026-10-22** — Step 1.5 done, waiting for review: 164 `topic.json` files (status "planned"), placed in units, each with a level and a goal in simple English. Changed: "Dynamic Programming" and "Bits, Math and Geometry" moved from senior to mid bonus, because a bonus topic must sit next to a main topic of the same level, and the Coding Interview unit has no senior main topics. New report script: `scripts/curriculum-report.mjs`.
- **2026-10-22** — Step 1.4 approved. Step 1.5 started.
- **2026-10-22** — Step 1.4 done, waiting for review: 14 units in order, each with a goal. Topics are added in step 1.5.
- **2026-10-22** — Step 1.3 approved. Step 1.4 started.

- **2026-10-22** — Step 1.3 done, waiting for review: official sources, interview topics and 164 candidate topics in 14 draft areas.
- **2026-10-22** — Step 1.2 approved. Step 1.3 started.
- **2026-10-22** — Step 1.2 done, waiting for review: 5 level definitions with self-check lists, based on the Dropbox career framework. Levels file now has summary, description and self-check, all checked for simple English.
- **2026-10-22** — Step 1.1 approved (with skip-test sizes). Step 1.2 started.
- **2026-10-22** — Added this progress file.
- **2026-10-22** — Step 1.1 done: curriculum data model, validator, starter files.
- **2026-10-22** — Phase 1 split into 8 steps.
- **2026-10-22** — Added the simple English rule and its automatic check; fixed skill headers.
- **2026-10-22** — Phase 0 done: stack checked, rules, skills, content hook.
