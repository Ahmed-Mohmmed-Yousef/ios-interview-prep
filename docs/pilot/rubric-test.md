# Rubric Test — Structs vs Classes (Step 2.7)

Done 2026-10-22. Each of the 8 AI-graded questions (5 written, 3 write-code) was graded by hand with its rubric, for 3 sample answers: good, average and weak. This shows whether the rubrics give fair scores before the AI grader is built (Phase 6).

**Partial credit used here:** each criterion gets its full weight (met), half (partly met) or 0 (not met). The rubrics do not say this yet — see finding 1.

Pass mark: 70.

## Results

| Q | Sample answer (short) | Score | Fair? |
|---|---|---|---|
| **q24** difference | **Good:** value type, copied; reference type, shared; change effects; Apple default | 100 | Yes |
| | **Average:** "Structs are value types and classes are reference types. Classes can inherit." | 45 (15+15+0+15) | Yes — names the terms but never explains copy vs share |
| | **Weak:** "Structs are faster because they are on the stack." | 0 | Yes — the myth gets no points |
| **q25** let | **Good:** let fixes the reference; the instance can change; a let struct is fully constant; value vs reference | 100 | Yes |
| | **Average:** "let only applies to the variable for a class. A let struct is constant." | 72 (35+10+17+10) | Borderline — it passes without saying *why* the struct is fully constant |
| | **Weak:** "Classes ignore let." | 0 | Yes |
| **q26** when to choose | **Good:** struct by default; shared identity; network client example | 100 | Yes |
| | **Average:** "I use a class when I need inheritance." | 45 (0+45+0) | Yes |
| | **Weak:** "When the data is big." | 0 | Yes |
| **q27** struct holds class | **Good:** reference copied; values copied; surprise bug; use a value type | 100 | Yes |
| | **Average:** "The class is shared, so changes show in both." | 55 (40+0+15+0) | Yes |
| | **Weak:** "The struct is copied fully, so nothing happens." | 0 | Yes |
| **q28** stack myth | **Good:** partly true; closure example; heap and reference counting cost; copy vs share | 100 | Yes |
| | **Average:** "It is not always true. It depends." | 17 | Yes — too vague for an interview |
| | **Weak:** "Yes, structs are faster." | 0 | Yes |
| **q29** write Book | **Good:** the model answer | 100 | Yes |
| | **Average:** correct, but prints only the copy | 87 (25+25+25+12) | Yes |
| | **Weak:** declares `class Book`, so both lines print the same number | **50** (0+25+25+0) | **No** — the answer misses the whole point but gets half the points |
| **q30** Wallet | **Good:** the model answer | 100 | Yes |
| | **Average:** forgets `mutating`, so it does not compile | 40 (25+0+15+0) | Yes — fails, which is right |
| | **Weak:** no method; sets `balance` directly | 25 | Yes |
| **q31** share settings | **Good:** changes the struct to a class | 100 | Yes |
| | **Average:** changes to a class, and also changes `var` to `let` below | 70 (50+20+0) | Borderline — it works, but it changed lines the prompt said to keep |
| | **Weak:** changes the last line to print `screenB` | 20 (0+20+0) | Yes — the trick gets no credit |

## Findings

1. **Partial credit is not defined.** The rubrics have weights, but no rule for "partly met". **Proposal:** add one rule for all rubrics: met = full weight, partly met = half, not met = 0. The AI grader uses this rule too.
2. **A key idea can be missed while still scoring 50%.** In q29, using a class instead of a struct gets 50 points. **Proposal:** add `"key": true` to the criteria that carry the main idea of the question. If a key criterion is not met, the total is capped below the pass mark (for example, at 50).
3. **Two borderline cases (q25 average, q31 average).** They come from wording, not from the rubric design. They can be fixed with clearer criteria in step 2.8.
4. **The rubrics handle myths and tricks well.** The stack myth, "classes ignore let" and changing the print line all score 0 on their key criteria.

Findings 1 and 2 change how all future rubrics work, so they need your decision. They fit step 2.8 ("Improve once").
