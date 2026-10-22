# Level Definitions (Step 1.2)

Researched 2026-10-22. Learner-facing text (summary, description, self-check) is stored in [content/levels.json](../content/levels.json). This file explains how we got there.

## Decisions (from the user)

| Question | Decision |
|---|---|
| Which interviews do levels match? | A mix: big tech, startups and normal companies |
| Non-coding skills (system design, leadership, behavior) | Yes, from **senior** up, as required topics |
| How a learner picks a level | Description + "You are here if you can…" self-check. No years of experience |
| Algorithm / coding tests | Yes — a **Coding Interview unit in Swift**, counts in the score |

## How the levels line up with real career ladders

Our base is the public **Dropbox Engineering Career Framework**, because it describes every level in detail and is an official company source. Titles differ between companies, so the mapping is approximate.

| Our level | About the same as | Scope (from the framework) |
|---|---|---|
| **Fresh** | Before IC1: student, new graduate, intern, self-taught | Learning. Not yet doing team work as an engineer |
| **Junior** | IC1–IC2 | Does defined tasks and projects with guidance from a manager or tech lead |
| **Mid** | IC3 | Owns projects for quarterly team goals; solves open problems on their own; mentors new hires |
| **Senior** | IC4 | Owns half-year and yearly team goals; designs systems in their area; impact goes beyond the team |
| **Staff** | IC5 (Staff) | Sets multi-year, multi-team strategy; decides what to build, not only how |

Key facts used:
- IC1 "executes defined tasks", works with "specific guidance", and "can navigate large codebases they didn't write". IC2 "independently chooses solutions" for defined problems. ([IC1](https://dropbox.github.io/dbx-career-framework/ic1_software_engineer.html), [IC2](https://dropbox.github.io/dbx-career-framework/ic2_software_engineer.html))
- IC3 "independently works out solutions to ambiguous, open-ended problems" and mentors new hires. ([IC3](https://dropbox.github.io/dbx-career-framework/ic3_software_engineer.html))
- IC4 "designs systems in their area of ownership", reviews others' designs, plans reliable rollouts with monitoring. ([IC4](https://dropbox.github.io/dbx-career-framework/ic4_software_engineer.html))
- IC5 Staff sets multi-year strategy, makes build-vs-buy and framework choices, and "code fluency expectations don't go beyond L4". ([IC5](https://dropbox.github.io/dbx-career-framework/ic5_staff_software_engineer.html))
- Staff engineers work in four common shapes — Tech Lead, Architect, Solver, Right Hand — and mostly lead through scoping, coordination and influence. ([Will Larson, Staff Engineer Archetypes](https://lethain.com/staff-engineer-archetypes/))

## What interviews test at each level

| Round | Fresh | Junior | Mid | Senior | Staff |
|---|---|---|---|---|---|
| Swift and iOS knowledge | ● | ● | ● deeper | ● deep | ● deep |
| Coding problems (algorithms) | ● easy | ● easy–medium | ● medium | ● medium | ○ less weight |
| Build or read real code | ○ own project | ● | ● | ● | ○ |
| App architecture | — | ○ | ● | ● | ● |
| Mobile system design | — | — | ○ | ● | ● org scale |
| Behavior and leadership | ○ | ○ | ○ | ● | ● main focus |

● = usually tested · ○ = sometimes or light · — = rarely

**Confidence:** this table is built from interview-prep sources, not official company rubrics. They agree on the big picture:
- Algorithm coding is a standard round for juniors at tech companies. ([ResumeGeni, junior iOS](https://resumegeni.com/blog/ios-engineer/junior))
- Swift concurrency (async/await, actors, Sendable) is expected from mid level up. ([ResumeGeni, mid iOS](https://resumegeni.com/blog/ios-engineer/mid))
- Mobile system design checks offline behavior, network efficiency, app lifecycle, failure handling and trade-offs. Seniors are expected to lead the requirements part on their own. ([System Design Handbook](https://www.systemdesignhandbook.com/guides/ios-system-design-interview/), [ByteByteGo](https://bytebytego.com/courses/mobile-system-design-interview/introduction))

Rows marked ○ or — are our judgment from these sources. We will check them again in step 1.3 when we research topics.

## What this means for the curriculum

- **Fresh and junior:** Swift basics, UI basics, data and networking, memory basics, debugging, plus the Coding Interview unit (easy level).
- **Mid:** concurrency, architecture, testing, performance basics, medium coding problems.
- **Senior:** mobile system design, modularization, performance tools, release safety, plus non-coding topics (leading, mentoring, behavior questions).
- **Staff:** platform strategy, large-scale architecture choices, leading through influence. Less new coding content.

Levels are cumulative, so a senior learner walks fresh → junior → mid → senior.

## Coverage check (step 1.8)

Checked on 2026-10-22: every self-check item in `levels.json` is taught by topics at that level or earlier. Examples: "I can explain how ARC works and find a retain cycle" (junior) → `arc-basics`, `retain-cycles`; "I can split a large app into modules with Swift packages" (senior) → `modularization-spm`. Run the check again when a self-check item or a topic level changes.
