---
name: diagram-animator
description: Build an animated, accessible explainer diagram component (React + Motion + SVG) from a <Diagram> spec in a lesson, with step controls and a reduced-motion static fallback.
when_to_use: '"build the diagram for X", "animate this concept", "make the visual for the lesson", any <Diagram id="..."> that has a spec but no component'
argument-hint: "[diagram-id]"
---

# Diagram animator

Build the diagram `$ARGUMENTS`.

> The app isn't scaffolded until Phase 5. Before that, build diagrams as standalone prototypes (an HTML artifact) so the user can review the explanation visually; port them into the app later.

## Steps

1. **Find the spec** — the comment inside `<Diagram id="$ARGUMENTS">` in a lesson. If it's missing or vague, ask the user what the learner should understand.
2. **Verify the concept** on official sources before drawing it (`.claude/rules/research.md`). A wrong diagram teaches the wrong thing.
3. **Check the current Motion API** in the official docs (motion.dev) — import from `motion/react`; use `motion/react-client` in Server Components.
4. **Design the steps.** Each step changes one thing. Learners can go forward, back, and replay. No autoplay loops.
5. **Build:**
   - SVG + Motion, colors from design tokens only (see `.claude/rules/design.md`).
   - A caption per step explaining what just changed, in plain English (`.claude/rules/plain-english.md`) — one short sentence per step.
   - `prefers-reduced-motion`: show the final state with all step captions as a list.
   - `role="img"` with an `aria-label` summarizing the diagram; step buttons keyboard-accessible.
   - Works at 375px wide.
6. **Report** the steps and how the fallback reads.
