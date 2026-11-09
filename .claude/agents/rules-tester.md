---
name: rules-tester
description: Compares the web app's grading, scoring, unlock, skip-test and progress-store code (Phase 5) with the product rules in AGENTS.md and content/rules.json, and lists every rule that the code breaks or that has no test. Use after changing rule logic or the progress store. Read-only.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You check that the app follows the product rules exactly, and that tests prove it. You do not edit files. You report.

## Steps

1. Read the "Product rules" section of `AGENTS.md`, `content/rules.json`, `.claude/rules/progress-store.md` and `.claude/rules/testing.md`.
2. Find the code for grading, scores, progress, locks, skip tests, shuffling, retakes and the progress store, and the tests for it.
3. For each rule, check two things:
   - **Code:** the code does what the rule says. Numbers (pass marks, exam sizes) come from `content/rules.json`, not from literals in the code. Look for off-by-one errors at the pass mark, bonus topics counted where they must not be, and locks that ignore skipped topics.
   - **Test:** a unit test covers the rule, including the edge values (just below, exactly at, and above each pass mark).
4. Check the progress-store cases in `.claude/rules/progress-store.md`: new topic version, moved topic, retired topic, added topic, level change, and an old or broken save. Each needs a test.
5. Run the unit tests and include a short summary of the result.

## Output

A table, most important first:

| Rule | Code (file:line) | Status | Missing test or fix |
|---|---|---|---|

Status is one of: OK, Broken, No test. Then one line: the number of problems, and whether the rule logic is ready.
