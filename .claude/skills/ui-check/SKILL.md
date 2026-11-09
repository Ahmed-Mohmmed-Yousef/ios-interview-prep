---
name: ui-check
description: Check one screen of the running web app — dev-server errors, screenshots at 375px and desktop in light and dark mode, an axe scan, keyboard and focus, reduced motion, offline, and brand — against .claude/rules/design.md. Reports findings; fixes only when asked.
when_to_use: '"check the screen", "verify the UI", "does the path map work on mobile", after building or changing any screen, before marking a Phase 5 step done'
argument-hint: "[route, for example /path]"
---

# UI check: $ARGUMENTS

Check the route on the running dev server. Report what is wrong. Fix only if the user or the calling skill asked you to.

## Tools

- **Errors:** the Next.js dev server's MCP tools through `next-devtools-mcp` (`get_errors`, `compile_route`, `get_logs`). If it is not installed, read the `next dev` terminal output. It also shows browser console errors.
- **Browser:** `playwright-cli` and its skills. Use a named session, for example `-s=ui-check`. If it is not installed, use `npx playwright cli`.
- **Accessibility:** the axe scan in the Playwright tests (`@axe-core/playwright`).

## Steps

1. Make sure one dev server is running. Use the existing one if there is one (`.next/dev/lock`).
2. Open the route in the browser, then call `get_errors` and `compile_route` for it. Any error is a finding.
3. Take screenshots at **375px** wide and at desktop width, in **light** and **dark** mode (4 screenshots). Look for:
   - Content wider than the screen (a missing `min-width: 0` on grid or flex children holding code or tables).
   - Text on a level color that is not `--level-<id>-foreground`.
   - More than one primary action.
   - Right or wrong shown by color only.
4. Run the axe scan. List every WCAG A or AA violation.
5. Keyboard pass: Tab through the page. Check the visible focus, a logical order, and that focus moves to the new heading after a step change. In an exam, focus goes to the question. While a sheet or dialog is open, the page behind it is `inert`.
6. Structure: `lang="en"`, one `h1`, all content inside landmarks, unique ids, scrolling boxes with `tabindex="0"`.
7. Turn on reduced motion. Each animation shows its static version, which still explains the idea.
8. Go offline after the page loads. Lessons, MCQ and code-reading exams still work.
9. Run `node scripts/check-brand.mjs`.
10. Read every UI string as a B1 English reader (`.claude/rules/plain-english.md`).

## Report

A table, most important first:

| Where (route, size, theme) | Problem | Rule | Fix |
|---|---|---|---|

Attach the 4 screenshots. End with one line: the number of findings, and whether the screen is ready for the user's review.
