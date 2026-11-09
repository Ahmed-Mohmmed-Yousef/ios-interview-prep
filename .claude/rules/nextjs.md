---
paths:
  - "app/**"
  - "src/**"
  - "components/**"
  - "lib/**"
  - "next.config.*"
  - "mdx-components.tsx"
---

# Next.js app rules (Phase 5)

Stack and versions: `docs/stack.md`. Re-check versions on npm before you add a package (`.claude/rules/research.md`).

## Use the docs that match the installed version
- **Before you write Next.js code, read the matching guide in `node_modules/next/dist/docs/`.** Next.js 16.2+ ships these docs. They match the installed version, so trust them over training data. (Source: https://nextjs.org/docs/app/guides/ai-agents, checked 2026-11-09.)
- `next dev` (16.3+) writes a managed block into `AGENTS.md` between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->`. Keep it and commit it. Never edit inside the markers. Our own text stays outside them.
- Error pages under `nextjs.org/docs/messages/...` are not bundled. Fetch them (they also have a `.md` version).

## Check your work on the running dev server
- Run one dev server per project. If `next dev` says a server is already running, use that one (see `.next/dev/lock`).
- Prefer the dev server's MCP tools (through `next-devtools-mcp`) to a full `next build` while you edit: `get_errors`, `get_compilation_issues`, `compile_route`, `get_routes`, `get_logs`. (Source: https://nextjs.org/docs/app/guides/mcp, checked 2026-11-09.)
- Open the page in a browser before `get_errors` or `get_page_metadata`. They read from browser sessions.
- Run `next build` before you call a step done.

## Components
- Components are Server Components by default. Add `'use client'` only to the small leaf that needs state, effects, event handlers or browser APIs. Do not put it on whole pages.
- Motion: import from `motion/react` in client components. In Server Components use the `motion/react-client` entry. (Source: `docs/stack.md`.)
- Code highlighting with Shiki runs on the server, not in the browser.
- The lesson, path, MCQ and code-reading exam work without the AI service and without the network after load (`.claude/rules/design.md`).

## Content
- Lessons are MDX through `@next/mdx`. There is no frontmatter: each lesson exports `meta`. With Turbopack, MDX plugin names are strings. (Source: `docs/stack.md`.)
- Read `content/` at build time only. The app never writes to `content/`.
- Validate `topic.json`, `questions.json`, `units.json`, `levels.json` and `rules.json` with Zod schemas that match `docs/curriculum-schema.md`. The build fails on bad content.

## Names and text
- The app name, tagline and brand colors come only from `config/brand.json` (run `node scripts/check-brand.mjs`).
- All UI text follows `.claude/rules/plain-english.md`. All design rules are in `.claude/rules/design.md`.
- Product rules (pass marks, skip tests, scores, unlocks) come from `content/rules.json` and the "Product rules" section of `AGENTS.md`. Never hard-code a number such as 70 or 80 in a component.
