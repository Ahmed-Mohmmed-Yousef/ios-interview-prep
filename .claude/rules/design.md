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
- Use design tokens (Tailwind v4 `@theme` variables) — no hard-coded colors, sizes or shadows in components.
- Light and dark mode both supported from day one.
- Accessibility: WCAG AA contrast, full keyboard navigation, visible focus, semantic HTML, alt text and captions for every diagram.
- Motion: honor `prefers-reduced-motion` — every animation has a static fallback that still explains the idea.
- Mobile first: the path map, lessons and exams must work at 375px wide.
- Never block a learner on network: lessons, MCQ and code-reading exams work without the AI service.
- Progress state lives in one store with a versioned schema (`persist` `version` + `migrate`) so it can move to an account later.
