# Audit: system-design-interview-intro (2026-11-14)

Independent fact check in fix mode. Baseline Swift 6.4 / Xcode 27.2 (`swiftc` 6.4.2). **Result: pass.**

## Lesson fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `meta.baseline` | `xcode: "27"` | RULES | Local Xcode 27.2 / Swift 6.4.2 | Updated `meta.baseline.xcode` to `"27.2"` |
| `The simple idea` (Step 3 & 4) | Uses `downsampling` and `decoupled` without plain-English explanation | HARD-ENGLISH | `.claude/rules/plain-english.md` | Added short parenthetical explanations for both terms and split the bullet so every sentence stays under 25 words |
| `See it` (`<Diagram>` spec) | Spec comment called minutes 38–45 "Step 4" while the lesson and `diagram.html` use 5 steps | RULES | `lesson.mdx`, `diagram.html` | Aligned the diagram spec comment with Steps 3–4 (minutes 22–40) and Step 5 wrap-up (minutes 40–45) |
| `How to answer in the interview` (`senior`) | Used unexplained jargon (`time-boxed phases`, `bounding scope`, `observability`, `MetricKit hang rates`) | HARD-ENGLISH | `.claude/rules/plain-english.md` | Simplified to B1 English (`five timed steps`, `setting clear limits`, `production monitoring like hang rates and crash reports`) |

## Question bank and metadata fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| `q17` option `a` explanation | Said `"Memory is false and offline is false"` (inverted `isOnline: false`) | WRONG | `q17` Swift snippet (`isOnline: false`) | Fixed explanation to `"Right. hasMemory is false and isOnline is false, so it falls back to diskCache."` |
| `q24` | Prompt named `FeedPage` while code defined `FeedCard`; code compiles under `-default-isolation MainActor` (Xcode 27.2 app default); tests Swift 6 `Sendable` class rules not taught in the lesson | WRONG / UNTAUGHT | `swiftc -swift-version 6 -default-isolation MainActor`; `lesson.mdx` | Retired `q24` (`"retired": true`) without deleting or reusing its ID, and added `q33` (`code-reading`, difficulty 3, `"In practice"`) testing offline-first `FeedRepo` fallback and `nextCursor` |
| `q01`, `q02`, `q05`, `q06`, `q07`, `q08`, `q09`, `q10`, `q12`, `q13`, `q14`, `q15`, `q16` | Contained joke or implausible distractors (e.g., compiler timing warnings, 3-screen limit, 15 minutes in a 5–8 minute window, backend downloading Swift protocols) or unbalanced option wording | RULES | `.claude/rules/questions.md` | Replaced joke/contradictory distractors with realistic mobile design misconceptions, aligned `q13` terminology (`offline sync queues`), and balanced option lengths |
| `q12` (`d`), `q29` rubric | Used `Observability` and `OOM risk` | HARD-ENGLISH | `.claude/rules/plain-english.md` | Replaced with `Production monitoring` and `out-of-memory crashes` |
| `q27` | Prompt asked for "three ways" without naming client layers scored in the 20% rubric criterion | RULES | `.claude/rules/questions.md` | Updated prompt to ask for client focus, device constraints, and client layers |
| `questions.json` | Bank version `1` before audit edits | RULES | `.claude/skills/exam-writer/schema.md` | Bumped `questions.json` `version` to `2`; kept `lastVerified: "2026-11-14"` synced across `topic.json`, `lesson.mdx`, and `questions.json`; kept `status: "draft"` |

## Checks run (2026-11-14)

- Source URLs verified (HTTP 200 via `curl`, content verified via web search): `weeeBox/mobile-system-design`, `bytebytego.com/courses/mobile-system-design-interview/introduction`, `developer.apple.com/documentation/swiftui/managing-model-data-in-your-app`, `developer.apple.com/documentation/xcode/improving-app-responsiveness`.
- `node .claude/hooks/check-lesson.mjs content/topics/system-design-interview-intro/lesson.mdx` — passed.
- `node .claude/hooks/check-plain-english.mjs` on `topic.json`, `lesson.mdx`, `questions.json` — passed (0 warnings).
- `bash .claude/hooks/validate-content.sh` on `lesson.mdx` and `questions.json` — passed.
- `node scripts/run-swift-examples.mjs` on `lesson.mdx` (2/2 passed) and `questions.json` (12/12 passed), plus `swiftc -swift-version 6 -default-isolation MainActor` on all live code blocks and questions — passed.
- `node scripts/check-coverage.mjs system-design-interview-intro --strict` — passed (0 errors, 0 warnings).
- `node scripts/check-publish-gate.mjs system-design-interview-intro --code` — passed (`ok   system-design-interview-intro`).
