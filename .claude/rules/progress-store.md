---
paths:
  - "**/store/**"
  - "**/stores/**"
  - "**/progress/**"
  - "**/*progress*.ts"
  - "**/*progress*.tsx"
---

# Progress store rules (Phase 5)

Progress lives in the browser for now and moves to an account later (Phase 8). Write it so that move is easy.

## One store, versioned
- All learner progress lives in **one** Zustand store with the `persist` middleware and localStorage. No other code reads or writes that localStorage key.
- The store has a `version` number. Every change to the saved shape raises `version` and adds a step to `migrate(persistedState, version)`. Migrations go one version at a time (0→1→2), so any old save can reach the newest shape. (Source: https://github.com/pmndrs/zustand/blob/main/docs/reference/integrations/persisting-store-data.md, checked 2026-11-09.)
- Use `partialize` to save only learner data, never derived values or UI state.

## Server rendering
- Pages render on the server, where there is no localStorage. Use `skipHydration: true` and call `await useProgress.persist.rehydrate()` once in a client effect. Until hydration finishes, show a neutral loading state, not "0% done". Check `persist.hasHydrated()` before you trust the data. (Same source.)
- Never read progress during server rendering.

## Saved data points to topic ids
- Save results by topic `id` only. Never save titles, positions, unit order or array indexes. Topic ids never change (`.claude/rules/content.md`).
- Keep the topic `version` with each result, so the app can show the "Updated" badge when a passed topic gets a new version. The pass stays.
- Compute progress, path score and locks from saved results plus the current `content/`. Do not save them.
- Handle these cases without losing or breaking data, and test each one (`.claude/rules/testing.md`):
  1. A topic gets a new version.
  2. A topic moves to another unit or position.
  3. A topic is retired.
  4. A new topic is added before passed topics.
  5. The learner changes level.
  6. The save is from an older store version, or is broken JSON.

## Privacy
- Store no names or emails. Progress data never goes to the AI grader.
