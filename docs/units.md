# Units (Step 1.4)

Decided 2026-10-22. The units live in [content/units.json](../content/units.json). Topics are added to them in step 1.5.

## Decisions (from the user)

- **14 small units** — one unit per subject. Clear names and precise skip tests.
- **Coding Interview comes right after Swift Language** in every stage, so learners practice problems with the Swift they just learned.

## Order

This order repeats inside every stage. A unit is hidden in a stage when it has no topics at that level.

| # | Unit | Goal | From research area | Stages with topics (from candidates) |
|---|---|---|---|---|
| 1 | Swift Language | Write clear, safe Swift code and explain how the language works. | A | F J M S |
| 2 | Coding Interview | Solve coding interview problems in Swift and explain your solution. | L | F J M S |
| 3 | Memory | Understand how an app uses memory and how to stop memory leaks. | B | J M S |
| 4 | Concurrency | Run work at the same time safely, without data races. | C | J M S |
| 5 | SwiftUI | Build screens with SwiftUI and manage the data they show. | D | F J M |
| 6 | UIKit | Build screens with UIKit and work in older codebases. | E | J M |
| 7 | Design and Accessibility | Make apps that look right on every iPhone and iPad and work for every user. | F | J M |
| 8 | App and System | Understand how an app starts, runs and works with the system. | G | F J M |
| 9 | Data and Networking | Load data from the internet and save it on the device. | H | J M S |
| 10 | Architecture | Organize code so it is easy to change, test and share with a team. | I | J M S St |
| 11 | Testing and Release | Find bugs, test your code and ship apps safely. | J | J M S St |
| 12 | Performance | Find and fix code that is slow or uses too much memory or battery. | K | M S |
| 13 | Mobile System Design | Design a full mobile feature and explain your choices in an interview. | M | M S St |
| 14 | Behavior and Leadership | Answer behavior questions and show how you lead and work with others. | N | S St |

Research areas are the groups in [research/topic-candidates.md](research/topic-candidates.md).

## Example: the Fresh stage

Swift Language → Coding Interview → SwiftUI → App and System

## Open points for step 1.5

- **"Xcode, project structure and Git basics"** is a fresh topic in App and System, so it comes *after* SwiftUI in the fresh stage. Beginners need Xcode first. In step 1.5 we decide whether to move it to the start of Swift Language.
- Some units have only 1–2 topics in a stage (for example Performance at mid). That is fine, but a unit skip test then has few questions; the minimum in `rules.json` is 6.
