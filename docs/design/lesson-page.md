# Lesson Page (Step 3.5)

Built 2026-10-23. The prototype link is in [PROGRESS.md](../../PROGRESS.md). It is built with `node prototype/build-lesson.mjs <topic-id>` from the real `lesson.mdx` (official MDX compiler) and the design tokens.

## Decisions (from the user)

| Question | Decision |
|---|---|
| How a lesson is shown | **One section at a time**, with Back / Continue and a step bar |
| Text size | **A- / A+ control**: Normal, Large (115%), Larger (130%). The choice is remembered |
| Sources | **"Where this comes from"** at the end of the lesson: official links first, community links marked |

## How the steps are made

The page splits the lesson by its headings. No extra markup is needed in `lesson.mdx`:
- **Step 1 — Guess first:** the title, unit, level, time and goal, the "Updated" note when needed, and the interview question with its guess.
- **One step per `##` section** (The simple idea, See it, In code, Interview traps, How to answer, Recap) and **per `###` sub-heading** (such as "Which one should you choose?").
- **The last step** is the recap with the guess result, the "Try it" link and the sources. The button there says **"Start the exam"**.

The pilot has 8 steps.

## The page

- **Sticky header:** "← Path", the topic title, the text-size control, the step bar and "Step 3 of 8". The header keeps a fixed size, so it fits even with the largest text.
- **Sticky bottom bar:** Back / Continue. Continue moves focus to the new step's heading, for keyboard and screen-reader users.
- **The current step is remembered** in the browser, so a learner can come back later.
- **Sample interview answers** are folded. The answer for the topic's own level is open; higher levels open on tap.
- **Code blocks** have a Copy button. If the browser blocks the clipboard, the code is selected instead.
- **Tables** scroll sideways inside their own box. The page itself never scrolls sideways.
- **The diagram** now uses the design tokens, so it matches the app in light and dark mode.

## Found and fixed while testing (at 375px, normal and largest text)

1. **Hidden steps still showed:** a layout style overrode `hidden`, so all 8 steps appeared at once. Fixed with an explicit `[hidden] { display: none }`. Remember this for the app.
2. **Long code lines pushed the page wider.** Fixed by letting code boxes shrink inside their container.
3. **Code showed in the normal font,** because a CSS variable pointed to itself. Fixed.
4. **The header overflowed at the largest text size.** Fixed by giving the header a fixed size.
5. **The diagram's `--muted` clashed with the design system's `--muted`**, which turned controls dark grey. Fixed: the diagram's names now apply only inside the diagram.
6. **Diagram, an older bug from step 2.4:** the arrowheads of the not-yet-drawn "second" arrows showed at step 1. Fixed in the diagram source, and the diagram page is republished.
