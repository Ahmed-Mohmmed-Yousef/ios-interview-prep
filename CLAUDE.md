@AGENTS.md

## Claude Code only

- The shared instructions for all agents are in `AGENTS.md` (imported above). Edit that file, not this one, for anything every agent should follow.
- `.claude/rules/` files load on their own (some only for matching paths).
- Workflows run as skills: `/new-topic`, `/lesson-writer`, `/exam-writer`, `/content-fact-checker`, `/diagram-animator`, and for Phase 5 `/build-screen`, `/ui-check`.
- Delegate a B1 reading check of learner text to the `plain-english-reviewer` subagent, an accessibility review to `a11y-reviewer`, and a product-rule check to `rules-tester`.
- Hooks in `.claude/settings.json`:
  - After an edit in `content/`, they validate the file.
  - After a brand or page-builder change, they run the brand check.
  - They block hand edits to generated files.
