# Content audit and the publish gate

Started 2026-11-10. A spot check of 3 random fresh topics (`control-flow`, `error-handling`, `methods-and-initialization`) found wrong facts and exam questions about ideas the lessons never teach. All their code compiled and the hooks passed, so the old checks could not catch these problems. The user decided:

- **Full audit** of every published topic, level by level (fresh first), fixed directly, with one short report per level and random re-checks.
- **A publish gate** for every new topic. New topic production pauses until the gate exists, then continues with it.
- Fact checks run as **parallel helper agents**.

## The publish gate

A topic can be published only when `node scripts/check-publish-gate.mjs <topic-id> --code` passes:

1. **Coverage** (`node scripts/check-coverage.mjs <topic-id>`): no errors, and no "possibly untaught" warnings. Each warning is fixed by teaching the idea in a main lesson section, by changing or retiring the question, or, when it is a false positive, by adding the term to `coverageAccepted` in `audit.json`.
2. **Independent fact check:** `docs/topics/<topic-id>/audit.json` exists, with `"result": "pass"`, `"independent": true`, every `open` count 0, and a `date` not older than `lastVerified` in `topic.json`, the lesson and `questions.json` (all three the same date).
3. **Code:** every lesson example and every `verify` passes (`--code` runs `scripts/run-swift-examples.mjs`).

`node scripts/validate-curriculum.mjs` (run by the content hook and CI) fails when a published topic has no passing `audit.json`, unless the topic is in `legacy-unaudited.json`.

**Independent** means the fact check runs in a fresh agent (the `content-fact-checker` skill forks its own context). The agent that wrote the topic never writes its `audit.json`. The old `fact-check.md` notes were written by the same agent that wrote the topic, and they missed every problem the spot check found.

## `legacy-unaudited.json`

The topics published before the gate. Remove a topic from the list when its audit passes. Never add a topic to it. When the list is empty, the audit is done.

## `docs/topics/<topic-id>/audit.json`

```jsonc
{
  "topicId": "control-flow",
  "date": "2026-11-10",              // the day the check finished; equals lastVerified everywhere
  "result": "pass",                  // "pass" or "fail"
  "independent": true,               // a fresh agent did the check
  "checker": "content-fact-checker",
  "baseline": { "swift": "6.4", "xcode": "27.2" },
  "topicVersion": 2,                 // topic.json version after the fixes
  "bankVersion": 2,                  // questions.json version after the fixes
  "fixed": { "wrong": 3, "outdated": 1, "untaught": 9, "unverified": 0, "copied": 1, "hardEnglish": 4, "rules": 6 },
  "open":  { "wrong": 0, "outdated": 0, "untaught": 0, "unverified": 0, "copied": 0, "hardEnglish": 0 },
  "coverageAccepted": [],            // check-coverage terms that are false positives, with the reason in notes
  "sourcesChecked": ["https://..."],
  "notes": "Short, simple English: what was wrong and what changed."
}
```

The full findings table goes in `docs/topics/<topic-id>/audit.md`.

## How a topic is audited and fixed

1. A helper agent runs `content-fact-checker` on the topic **in fix mode**: it verifies every claim on the web against official sources and fixes the lesson and questions.
2. Fix order: wrong facts, then questions on untaught ideas (teach the idea in a main section, or retire the question and add a new one with a new id), then missing current features, then plain English and question rules.
3. Never change or reuse a question id. Retire instead of deleting, and keep at least 30 live questions.
4. Learners who already passed the topic must know when the content changed in a way that matters: bump `version` in `topic.json` and add a `changes` entry with a simple-English note. The app shows the "Updated" badge.
5. Run the checks: the content hooks, `validate-curriculum`, `run-swift-examples` on both files, `check-coverage`, then write `audit.json` and `audit.md` and run `check-publish-gate --code`.
6. Remove the topic from `legacy-unaudited.json` and rebuild its review page (`cd prototype && node build.mjs <topic-id>`).

## Verification after each level

After all topics in a level pass, 3 random topics of that level get a **second, fresh** fact check (report only). Any new wrong fact found there means the level is checked again. The user gets one short report per level.
