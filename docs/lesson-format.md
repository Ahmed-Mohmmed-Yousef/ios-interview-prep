# Lesson Format (Step 2.1)

Decided 2026-10-22. The template is [.claude/skills/lesson-writer/template.mdx](../.claude/skills/lesson-writer/template.mdx). The content hook checks every `lesson.mdx` against the rules below.

## Decisions (from the user)

| Question | Decision |
|---|---|
| Same sections in every lesson? | **Core sections in every lesson, plus optional extras** when they help |
| Length | **8–12 minutes** (`meta.estimatedMinutes` between 8 and 12) |
| Quick checks inside the lesson | **Yes, 2–3 per lesson.** Not scored, instant feedback |
| Guess first | **Yes.** The lesson starts with the interview question and the learner guesses before reading. Not scored; the answer comes back in the recap |
| Code results | **Code is shown with its output** (decided in the Phase 2 plan) |

## Why this format — what research says

| Finding | How the format uses it | Source |
|---|---|---|
| **Pretesting:** trying to answer before learning, even with a wrong answer, helps people learn the right answer later. Feedback matters | **Guess first** at the start; the recap shows the right answer and the learner's guess | [Richland, Kornell & Kao 2009](https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf) |
| **Retrieval practice:** recalling information helps more than reading it again | **Quick checks** inside the lesson, then the exam | [The Learning Scientists](https://www.learningscientists.org/downloadable-materials) |
| **Dual coding:** words plus pictures | Every lesson has an animated **diagram** | [The Learning Scientists](https://www.learningscientists.org/downloadable-materials) |
| **Concrete examples** and **worked examples:** step-by-step examples help beginners most | **Code with its output**, with comments that explain each step | [Worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect) |
| **Elaboration:** asking "why" and "how" | **Interview traps** explain why the wrong idea is wrong; **interview answers** explain why | [The Learning Scientists](https://www.learningscientists.org/downloadable-materials) |
| **Segmenting:** short parts the learner moves through at their own pace | Short, separate sections; the app can show them one at a time (Phase 3) | [Mayer's principles](https://services.dartmouth.edu/TDClient/1806/Portal/KB/PrintArticle?ID=171655) |
| **Coherence:** remove extra words and pictures | No filler, no decorative images; one idea per paragraph | same |
| **Signaling:** highlight what matters | One **bold** key idea per section | same |
| **Spatial and temporal contiguity:** words next to the picture, at the same time | Each diagram step has its caption **inside** the diagram, not in a paragraph far away | same |
| **Spaced practice** and **interleaving** | Not inside one lesson. Skip tests mix topics; review reminders come later (Phase 8) | [The Learning Scientists](https://www.learningscientists.org/downloadable-materials) |

These sources are about learning research, not iOS facts.

## Core sections (every lesson, in this order)

| # | Section | Component | Rule |
|---|---|---|---|
| 1 | Interview question + guess | `<InterviewHook>` with `<Question>`, `<Guess>` (3–4 `<Option>`, one with `correct`) | The question is how a real interviewer asks it |
| 2 | The simple idea | `## The simple idea` + `<Analogy>` | One everyday analogy, then 1–3 short paragraphs |
| 3 | See it | `## See it` + `<Diagram>` | One main diagram, with a spec for `/diagram-animator` |
| 4 | In code / In practice | `## In code` with `<CodeExample>` blocks — or `## In practice` for Behavior and Mobile System Design topics | Every Swift block shows its output (see below) |
| 5 | Quick checks | 2–3 `<QuickCheck>` placed after the sections they test | Not scored. Each has a question, options, the answer and an explanation |
| 6 | Interview traps | `## Interview traps` + 2 or more `<Trap>` | What people get wrong, and the right idea |
| 7 | How to answer | `## How to answer in the interview` + 2 or more `<InterviewAnswer level="...">` | At least the topic's level and one higher level |
| 8 | Recap | `## Recap` + `<Recap>` | 3–5 key points. The app shows the guess result here |
| 9 | Try it | `<TryIt>` | For topics with code: a link to Swift Playground (free for iPad and Mac) |

## Optional extras (only when they help)

| Extra | Component | Use for |
|---|---|---|
| Comparison table | a Markdown table | Two or more things side by side (for example struct vs class) |
| Go deeper | `<DeepDive title="...">` | Extra detail for curious learners. Folded by default. Not tested in the exam |
| Real-world example | `<RealWorld>` | How the idea shows up in a real app |
| Version note | `<VersionNote since="iOS 27">` | Behavior that changed in a recent Swift or iOS version |
| Extra diagram | another `<Diagram>` | Only if one diagram is not enough |

## Code with its output

Every Swift example is a `swift` block followed by an `output` block. The output is what the code really prints. It is checked with the Swift compiler before the lesson is approved: `node scripts/run-swift-examples.mjs content/topics/<id>/lesson.mdx`.

````mdx
<CodeExample title="Copying a struct">

```swift
struct Point { var x: Int }
var a = Point(x: 1)
var b = a        // b is a copy
b.x = 2
print(a.x, b.x)
```

```output
1 2
```

</CodeExample>
````

A snippet that prints nothing (for example a type declaration) uses ` ```swift no-output `.

## Text rules for components

Put learner text **between** the tags, not inside attributes (except short labels like `title`). The simple-English check reads the text between tags; it does not read attributes.

## What the content hook checks

- `meta` has `id` (same as the folder), `summary`, `estimatedMinutes` from 8 to 12, `lastVerified` and `sources`.
- All core sections are there, in order, with the right counts: 1 guess with 3–4 options and exactly 1 correct; 2–3 quick checks, each with exactly 1 correct option; 2+ traps; 2+ interview answers; 1 recap.
- Every `swift` block has an `output` block right after it, unless it is marked `no-output`.
- `## In code` or `## In practice` is present.
- The simple-English check passes.
