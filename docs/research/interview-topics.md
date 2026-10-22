# What Interviews Ask

Checked 2026-10-22. These are interview-prep sources, not official rules. They tell us what is asked, not what is technically true.

## iOS knowledge questions

Topics that come up again and again:
- **Memory:** ARC, strong / weak / unowned, retain cycles in closures (`[weak self]`) and delegates. ([techinterview.org](https://www.techinterview.org/post/3233460869/swift-ios-interview-questions/))
- **Value vs reference types**, protocol-oriented programming. (same source)
- **Concurrency:** GCD vs structured concurrency, `@MainActor`, actors and data races, async/await. Swift 6 strict concurrency is expected from mid level. ([ResumeGeni mid](https://resumegeni.com/blog/ios-engineer/mid))
- **SwiftUI state:** `@State`, `@Binding`, `@StateObject` vs `@ObservedObject`, `@Observable` vs `ObservableObject`, `@Bindable`, view identity and state resets. ([Hacking with Swift](https://www.hackingwithswift.com/interview-questions/when-would-you-use-atstateobject-versus-atobservedobject), [Jesse Squires](https://www.jessesquires.com/blog/2024/09/09/swift-observable-macro/))
- **Junior basics:** struct vs class, retain cycles, delegation. ([ResumeGeni junior](https://resumegeni.com/blog/ios-engineer/junior))
- **Senior:** an offline-first or list-performance scenario explained out loud; framework-design depth at Apple. ([techinterview.org](https://www.techinterview.org/post/3233460869/swift-ios-interview-questions/), [ResumeGeni](https://resumegeni.com/blog/ios-engineer/at-apple))

## Coding problems (algorithms)

[Tech Interview Handbook](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/) lists 19 topics with a priority:

| Priority | Topics |
|---|---|
| High | Array, String, Sorting and searching, Matrix, Tree, Graph |
| Mid | Hash table, Recursion, Linked list, Queue, Stack, Heap, Trie, Interval |
| Low | Dynamic programming, Binary, Math, Geometry |

Algorithm rounds are standard for juniors at tech companies. ([ResumeGeni junior](https://resumegeni.com/blog/ios-engineer/junior))

## Mobile system design

From [weeeBox/mobile-system-design](https://github.com/weeeBox/mobile-system-design) (a well-known open framework), plus [System Design Handbook](https://www.systemdesignhandbook.com/guides/ios-system-design-interview/) and [ByteByteGo](https://bytebytego.com/courses/mobile-system-design-interview/introduction):

- **Round format:** 45–60 minutes: requirements, high-level design, deep dive, questions.
- **Common tasks:** design a feed (Twitter-style), an image loader, an analytics SDK, a chat app, a file uploader.
- **Topics to discuss:** API and protocols (REST, GraphQL, WebSocket, SSE, polling), pagination (offset, cursor, keyset), local storage and caching, offline mode and sync, conflict handling, image loading, real-time updates, push notifications, retries with backoff, idempotency, security and privacy, performance (startup, memory, battery, app size), feature flags and staged rollouts, SDK design.
- **What is judged:** trade-offs over a "perfect" answer; seniors lead the requirements part on their own.

## Behavior and leadership (senior and staff)

- Answers use the **STAR** format (Situation, Task, Action, Result). ([Tech Interview Handbook STAR](https://techinterviewhandbook.org/star-format/))
- Common prompts: a disagreement with a coworker, mentoring someone, shipping a bug and recovering, prioritizing under pressure, influencing another team. ([Glassdoor senior iOS](https://static.glassdoor.it/Interview/senior-ios-engineer-interview-questions-SRCH_KO0,19_IP58.htm), [Design Gurus](https://designgurus.substack.com/p/the-senior-engineers-guide-to-behavioral))
- Seniors should lead and influence, resolve conflict, see risks and plan roadmaps. ([Tech Interview Handbook](https://techinterviewhandbook.org/star-format/))
- Staff: decide what to build, set multi-year direction, lead through influence. ([Dropbox IC5](https://dropbox.github.io/dbx-career-framework/ic5_staff_software_engineer.html), [Staff Engineer Archetypes](https://lethain.com/staff-engineer-archetypes/))

## Warning

Many question lists online are old (some still mention Xcode 11). Lesson facts must come from official sources, checked against Swift 6.4 and iOS 27 — for example, the `@State` initializer pitfall changed in iOS 27.
