# Path Map (Step 3.4)

Built 2026-10-23. Prototype: the Path Map Prototype link in [PROGRESS.md](../../PROGRESS.md). Built with `node scripts/build-path-prototype.mjs` from the real curriculum and the design tokens.

## Decisions (from the user)

| Question | Decision |
|---|---|
| Road shape on a phone | **Zig-zag:** stops alternate left and right, each with its title next to it |
| Long paths (up to 149 topics) | **Fold finished parts:** a finished stage becomes one sign, for example "Done. Average score 86%". Tap to open it |
| Units on the road | **Small signposts** where a unit starts, with "Skip this unit" when it is allowed |
| Tapping a stop | **A small card first** (bottom sheet): title, unit, level, goal, time and status, then the buttons |

## What the road shows

- **Top bar** (always visible): app logo and name (from `config/brand.json`), the level picker, "X of Y topics done", the path score, and a progress bar.
- **Stage signs** in the level's stage color. They show the stage number, the title, the done count and the average score. "Skip this stage" appears only for stages below your level. A folded stage says how many topics were updated.
- **Unit signposts:** the unit name, plus "Skip this unit" for unfinished units in stages below your level.
- **Stops:** each state has its own shape and words, not only a color:

| State | Look | Words |
|---|---|---|
| Passed | green, check mark | Passed 90% |
| Updated | green, check mark, amber dot | Passed 90% · Updated |
| Current | large, primary color, play icon, glow ring | You are here |
| Locked | outline, lock | Locked |
| Skipped | dashed outline, double arrow | Skipped 85% |
| Bonus | small dashed star, on a dashed side road | Bonus, optional / opens later |

- **The road** is drawn behind the stops. The finished part has a dotted green line. Bonus stops hang off the road on a dashed side road.
- **"Go to my stop"** button: jumps to the current stop, and opens a folded stage if needed.
- **First-time tip** above fresh level: "Already know the basics? Skip a stage or a unit with a short test."
- **End sign** when the path is complete: the total result. The full result screen comes in step 3.6.

## The stop card

- **Passed / Updated / Skipped:** "Start lesson" and "Take the exam again". An updated topic also shows the `changes` note and "Your pass stays".
- **Current / Bonus open:** "Start lesson".
- **Locked:** "Pass *X* first", plus "Go to that topic" (this is the S4 locked notice).
- **Skip test card:** the number of questions (from `rules.json`), the 80% pass mark, and "If you do not pass, nothing changes."
- The card closes with Close, Escape or a tap outside it. Focus goes back to the stop.

## Prototype-only parts

- **Example progress buttons** (New learner, Halfway, Path complete) and **"Example: pretend I passed / scored 85%"** buttons. They show the states and the celebration without real exams. They are labeled as examples and are not part of the app.
- Only the pilot topic has a real lesson; its card links to the pilot prototype.

## Found while testing

- **A folded stage hid the "Updated" badge** of a topic inside it. Fixed: the stage sign now says "1 topic updated".
