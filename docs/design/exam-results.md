# Exam and Results (Step 3.6)

Built 2026-10-23. The prototype link is in [PROGRESS.md](../../PROGRESS.md). It is built with `node scripts/build-exam-prototype.mjs` from the real pilot question bank, `content/rules.json` and the design tokens.

## Decisions (from the user)

| Question | Decision |
|---|---|
| Leaving in the middle of an exam | **Saved.** Next time: "Continue your exam (question 4 of 10)", or "Start again" |
| Timer | **No timer.** The result shows how long it took |
| Topic result screen | **Mistakes first.** "Show all questions" opens the rest |
| Total result at the end of a path | **Plus a readiness label:** 85% or more = "Interview ready", 70–84% = "Almost ready". The numbers live in `rules.json` → `readiness` |

Earlier decisions still apply: feedback right after each question, options shuffled every time, the 5 / 3 / 1 / 1 question mix, and a self-check for written and code answers until AI grading (Phase 6).

## Screens

### S6 — Exam
- **Start card:** what is in the exam, "you see the right answer after each question", "no timer", the pass mark, and "your answers are saved if you leave".
- **Sticky header:** the topic title, **"Save and leave"**, a progress bar, "Question 3 of 10" and the question type.
- **Choice questions:** **tap an answer, then "Check answer".** Two steps, so a slip of the finger does not count. *(My design choice; easy to change.)* After checking, the right answer and your answer show both a color and a word. The feedback explains your answer, then the right one, and gives the right **letter in the new shuffled order**.
- **Written and code questions:** a text box (a code font for code). Then the model answer and the self-check (Yes / Partly / No per point, key points marked, the cap applied). There is a note that it does not count until AI grading.
- **Sticky bottom bar:** one main button (Check → Next question → See my result).

### S7 — Topic result
- The score (big), "You passed! The next stop is open." or "Not passed yet. You need 70%…", and the small calm check-mark celebration when passed.
- **Stats:** right answers, best score, time.
- **"Your mistakes"** with your answer, the right answer and the explanation. Then "Show all questions".
- **Buttons:** passed → "Next topic: Properties", "Take it again", "Read the lesson again". Not passed → "Try again with new questions", "Read the lesson again".

### S8 / S9 — Skip test and its result
- The same engine and screens. The start card says what passing means: "these topics count as done with your score".
- **Passed (80%):** "Skipped! These 13 topics now count as done, each with 85%."
- **Not passed:** "Nothing changed." Try again or take the topics one by one.
- The prototype uses pilot questions as stand-ins. The real skip test draws from every topic of the stage or unit (sizes in `rules.json`).

### S10 — Path complete (example scores in the prototype)
- The total result (path score), the readiness label with what it means, the strongest units and the units to review, a breakdown per stage and unit with bars, and next steps (next level, bonus topics, export progress).

## Checked (375px)

- **Shuffling:** all 8 choice questions appeared in a new option order, and the feedback letter matched the new order.
- **Save and leave:** "Continue your exam (question 3 of 10)", then it resumed at question 3 with the earlier answers kept.
- **Scoring:** 7 of 8 → 88%, 6 of 8 → 75%. Both pass at 70%. The self-check applies the key-point cap.
- **Skip test** passed, and the path-complete screen shows the readiness label.
- Nothing spills off the screen on any screen or question.
