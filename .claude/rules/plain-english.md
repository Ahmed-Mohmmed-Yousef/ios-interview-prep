# Plain English rule — write for the whole world

Our readers are iOS developers from every country. Many speak English as a second language, at different levels. **Every word the learner sees must be simple English**: lessons, questions, options, explanations, model answers, feedback from the AI grader, and UI text.

**Target reader:** an English level of about CEFR B1 ("can understand the main points of clear standard input on familiar matters"). If a B1 reader would stop to look up a word, change the word.

## Sentences
- Keep sentences short: aim for **15–20 words**, and never more than **25 words**. (Based on the ASD-STE100 Simplified Technical English limit of 25 words for descriptive text, and the US plain-language advice of a 20-word average.)
- One idea per sentence. Split long sentences instead of joining them with "which", "whereas" or ";".
- Use active voice: "ARC frees the object", not "The object is freed by ARC".
- Use present tense where you can.
- Write "do not", "cannot", "it is" — no contractions. They are harder for non-native readers.
- No double negatives ("not uncommon" → "common").

## Words
- Use common, everyday words. Prefer the short word:

| Don't write | Write |
|---|---|
| utilize | use |
| facilitate | help |
| demonstrate | show |
| initiate / commence | start |
| subsequently | then, after that |
| in order to | to |
| prior to | before |
| a number of | some, many |
| leverage | use |
| mitigate | reduce |
| ensure | make sure |

- No idioms, slang or jokes that depend on English: "under the hood", "a piece of cake", "out of the box", "rule of thumb", "ballpark".
- Avoid phrasal verbs when a single verb exists: "find out" → "learn", "set up" → "create", "carry out" → "do". Common ones that are also technical terms (e.g. "set up" in Xcode) are fine.
- Use the same word for the same thing every time. Do not switch between "object", "instance" and "thing".

## Technical terms
- **Keep the real technical terms.** Interviewers use them, so learners must know them ("retain cycle", "actor", "value type").
- Explain each term in simple words the first time it appears in a lesson. Example: "A **retain cycle** happens when two objects hold strong references to each other, so neither can be freed."
- Do not add jargon that is not needed. Explain the idea first, then give it its name.

## Analogies and examples
- Use analogies everyone in the world knows: keys, boxes, libraries, phones, shops, queues. No sports, holidays, foods or TV shows from one country.
- Use simple, neutral names in code and examples: `User`, `Order`, `Photo`.

## Layout helps reading
- Short paragraphs: 2–4 sentences.
- Use numbered lists for steps and bullet lists for groups of facts.
- **Bold** the one key idea in a section — not more.

## Check before you finish
The content hook (`.claude/hooks/check-plain-english.mjs`) flags long sentences, contractions, words from the table above and common idioms in `lesson.mdx` and `questions.json`. It cannot judge everything, so also read the text as a B1 reader would. Replace any hard word, split any long sentence, and explain any new term.
