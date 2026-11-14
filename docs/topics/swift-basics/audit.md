# Audit: swift-basics (2026-11-14)

Independent fact check, fix mode. Baseline Swift 6.4 / Xcode 27.2 (compiler: Apple Swift 6.4.2). **Result: pass.**

## Previous fixes (2026-11-10)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| Lesson recap | Swift validates types "before compiling" | WRONG | TheBasics.md "When building code, Swift checks the code for type safety" | Now "when it builds your code" |
| Lesson In code + trap | Swift never converts numbers between types | WRONG (absolute) | SE-0307 (Double <-> CGFloat implicit since Swift 5.5); verified with swiftc | Narrowed to constants/variables; added CGFloat exception |
| Lesson junior answer | let gives compiler performance optimizations | UNVERIFIED | No official source found | Removed; replaced with data-isolation benefit (Concurrency.md "Immutable data is always isolated") |
| Lesson junior answer | Swift "does not allow implicit type conversion" | WRONG (too broad) | SE-0307; TheBasics.md is about numeric conversion | Limited to number types |
| Lesson trap | JavaScript adds integer and decimal (as a conversion) | WRONG (misleading: JS has one number type) | TheBasics.md numeric conversion section | Now "C or Java"; reason taken from book ("hidden conversion errors") |
| q3, q12 | Double inferred, not Float; Double 64 / Float 32 bits | UNTAUGHT | TheBasics.md Floating-Point Numbers | Taught in "The simple idea" + annotation example |
| q13 | Number literals have no fixed type | UNTAUGHT | TheBasics.md Note on literals | Taught in "In code" |
| q7, q10, q21, q27, q31 | Delayed let initialization rules | UNTAUGHT | TheBasics.md deferred initialization; swiftc error "used before being initialized" | New code example + 3 rules in "In code" |
| q23 | String(letter) converts Character | UNTAUGHT | StringsAndCharacters.md; verify passes | Added to Character trap |
| q28 | Rubric accepted "performance optimizations" | UNVERIFIED | — | Rubric and model answer now: concurrency safety or clear intent |
| q25, q26 | Prompt did not ask for everything the rubric scores | RULES | questions.md | Prompts extended |
| q5 option a | "speed comes from safety and optimizations" | UNVERIFIED | — | Explanation rewritten |
| q14 | Labeled hard but easy | RULES | questions.md mix | Difficulty 3 -> 1 |

## Completed fixes (2026-11-14)

| Location | Claim | Verdict | Evidence | Fix made |
|---|---|---|---|---|
| q11 | Int8 literal overflow | UNTAUGHT | Not taught in lesson | Retired (`"retired": true`); replaced with q32 (unmutated `var` compiler warning, verified with `swiftc`) |
| q15 | Basic types are structures | UNTAUGHT | Not taught in lesson | Retired (`"retired": true`); replaced with q33 (`Double` and `CGFloat` implicit conversion exception, SE-0307, verified with `swiftc`) |
| q19 | Correct option 64 chars vs max distractor 22 chars | RULES | questions.md option length rule | Balanced all 4 option lengths (31–34 chars) |
| q12 option a | Distractor mentioned "reference type / value type" | UNTAUGHT / Distractor | Not taught in fresh lesson | Replaced with a taught distractor ("Float is inferred by default for decimals") |
| q14d, q22d, q25-q27 modelAnswers | "genuinely needs to mutate", "overflow exception", "coercion", "execution branch" | HARD-ENGLISH | plain-english.md | Rewritten in B1 English; added missing type-safe sentence to q25 modelAnswer |
| Dates / versions | lastVerified 2026-11-10; bank v2 | RULES | docs/audit/README.md | Set lastVerified to 2026-11-14 across topic.json, lesson.mdx, questions.json, audit.json; bumped questions.json to v3 |

Checks run (2026-11-14): `check-lesson`, `check-plain-english` (lesson, questions, topic), `validate-content.sh`, `check-coverage`, `check-publish-gate --code`, and `prototype/build.mjs swift-basics` — all passed.
