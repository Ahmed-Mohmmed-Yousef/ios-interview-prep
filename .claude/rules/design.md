---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# UI and design rules

- All UI text (buttons, labels, errors, results) follows `.claude/rules/plain-english.md`: "Start the exam", not "Commence assessment".
- Friendly and calm: generous spacing, rounded shapes, clear hierarchy. One primary action per screen.
- Use design tokens (Tailwind v4 `@theme` variables) — no hard-coded colors, sizes or shadows in components. Tokens come from `config/generated/tokens.css`, built by `node scripts/build-design-system.mjs` from `config/brand.json` and `config/design-tokens.json`. Never edit the generated file. See `docs/design/design-system.md`.
- Color is never the only signal: right/wrong show a word; each path-stop state has its own shape. Wrong answers are amber; red is only for real danger.
- Theme: follow the device by default; Settings has Light / Dark / Device. Passing a topic gets a small, calm celebration (no confetti, no sound).
- Any element with a `display` style needs an explicit `[hidden] { display: none }` rule, or `hidden` does not hide it (found in step 3.5).
- Grid and flex children that hold code, tables or long text need `min-width: 0`, or they push the page wider.
- Lessons show one section at a time with a step bar; learners can pick Normal / Large / Larger text; lessons end with "Where this comes from" (sources).
- When testing a prototype page locally, add a viewport meta tag first (the artifact adds it at publish time); without it the page lays out at desktop width.
- **The app name, tagline and brand colors come only from `config/brand.json`.** Never type the name in code or UI text; read it from the config. Run `node scripts/check-brand.mjs` after changes.
- Voice: friendly coach (see `docs/brand/brand.md`). No emojis or jokes in learner text.
- Light and dark mode both supported from day one.
- Accessibility: WCAG AA contrast, full keyboard navigation, visible focus, semantic HTML, alt text and captions for every diagram.
- Diagrams use a friendly illustrated style, and every animation step shows the code line that causes it (see the diagram-animator skill).
- Motion: honor `prefers-reduced-motion` — every animation has a static fallback that still explains the idea.
- Mobile first: the path map, lessons and exams must work at 375px wide.
- Never block a learner on network: lessons, MCQ and code-reading exams work without the AI service.
- Progress state lives in one store with a versioned schema (`persist` `version` + `migrate`) so it can move to an account later.
- Every page sets `lang="en"`, has one `h1`, and keeps all content inside landmarks (`header`, `main`, `nav`, `aside`, named `section`) — found in step 3.8.
- After a screen or step change, move focus to the new heading. In an exam, focus the question, not the first option.
- While a sheet or dialog is open, the page behind it is `inert` (or use a native `<dialog>` with `showModal()`).
- Ids must be unique on the page, also when components are combined (the lesson and the diagram both had `next`).
- Scrolling boxes (code, tables) get `tabindex="0"` so keyboard users can scroll them.
- Text on a level color uses `--level-<id>-foreground`, never a fixed white.
