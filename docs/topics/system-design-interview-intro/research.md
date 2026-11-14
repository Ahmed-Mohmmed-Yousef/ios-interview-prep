# Research Notes — How a Mobile System Design Interview Works (`system-design-interview-intro`)

Verified: **2026-11-14** against community mobile system design interview frameworks (allowed under `content/rules.json` for unit `mobile-system-design`), official Apple documentation, and Swift 6.4.2 (`swiftc -swift-version 6`).

## Sources

| Title | URL | Kind | Key Facts Verified |
|---|---|---|---|
| weeeBox/mobile-system-design (GitHub) | https://github.com/weeeBox/mobile-system-design | community | 5-step mobile system design framework: (1) Introductions & stage setting, (2) Define task & functional/non-functional requirements + out-of-scope, (3) High-level client architecture (UI, Presentation, Repository/Data, Network, Persistence) & server communication, (4) Deep dives (pagination, image pipeline, offline sync, concurrency), (5) Wrap-up & trade-offs / monitoring. |
| ByteByteGo: Mobile System Design Interview Introduction | https://bytebytego.com/courses/mobile-system-design-interview/introduction | community | 45–60 min open-ended interview structure: (1) Understand problem & establish scope (functional/non-functional, out-of-scope), (2) API design, (3) High-level client architecture, (4) Design deep dive (offline-first, performance, state, background/push), (5) Wrap-up & trade-offs. |
| Managing model data in your app (SwiftUI) | https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app | official | Separating UI state and model data cleanly supports testable client layers. |
| Improving app responsiveness (Xcode) | https://developer.apple.com/documentation/xcode/improving-app-responsiveness | official | Mobile client non-functional constraints include frame budgets (60/120 Hz), avoiding main-thread blocking, and managing memory/battery. |

## Key Technical Facts

1. **Mobile vs Backend System Design:**
   - Backend system design focuses on distributed servers, load balancers, sharding, and horizontal scaling.
   - Mobile system design focuses on the client application: small screens, unstable cellular networks, battery life, memory/disk limits, offline caching, and modular client architecture.
2. **Typical 45-Minute Structure (5 Steps):**
   - **Step 1 — Clarify scope and requirements (~5–8 min):** Functional requirements (core user actions), non-functional requirements (offline support, smooth 60/120 fps scrolling, battery/memory limits), and explicit out-of-scope items.
   - **Step 2 — High-level architecture & API contract (~10–15 min):** Client layers (View, ViewModel, Repository as single source of truth, Network client, Local store) and backend protocol choice (REST, GraphQL, or WebSockets) + pagination.
   - **Step 3 — Deep dives (~15–20 min):** Focus on 2–3 key mobile bottlenecks (e.g., cursor pagination and prefetching, image caching and downsampling, offline mutation queue and sync, concurrency).
   - **Step 4 — Model key boundaries in Swift (~5 min when asked):** Clean `Sendable` data models (`FeedItem`, `FeedPage`) and protocols (`FeedRepository`, `FeedCache`) separating network from UI.
   - **Step 5 — Wrap-up and trade-offs (~3–5 min):** State trade-offs explicitly (battery vs real-time freshness, memory cache size vs OOM crashes) and discuss production monitoring (crash reports, launch time, hang/hitch rates).

## Common Misconceptions (Interview Traps)

- **Jumping straight into drawing boxes or naming frameworks:** Starting to design screens or pick third-party libraries before asking clarifying questions wastes time on the wrong scope.
- **Designing only the backend:** Treating a mobile system design prompt like a backend interview (spending 30 minutes on server databases and load balancers) misses what mobile interviewers evaluate.
- **Presenting choices as "best" without trade-offs:** Every design decision trades something (e.g., WebSockets give low latency at higher battery cost compared to REST polling).
- **Working silently without checking in:** Because the prompt is open-ended, candidates must drive the pace and check in with the interviewer at each transition.

## Mid-Level vs Senior Interview Expectations

- **Mid-level:** Follows the structured steps (requirements -> API -> client architecture -> deep dive -> trade-offs), keeps scope realistic, separates UI/ViewModel/Repository/Network/Cache, and explains basic mobile constraints (battery, offline, memory).
- **Senior:** Actively drives time allocation across the 45 minutes, negotiates scope clearly, designs clean protocol boundaries and single source of truth data flows, handles edge cases (offline conflicts, pagination, image memory), and evaluates production observability and trade-offs.
