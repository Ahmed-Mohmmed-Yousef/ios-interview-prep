# Start and Progress (Step 3.7)

Built 2026-10-24. The prototype link is in [PROGRESS.md](../../PROGRESS.md). It is built with `node scripts/build-start-prototype.mjs` from `content/levels.json`, `units.json`, `rules.json`, `config/brand.json` and the design tokens.

## Decisions (from the user)

| Question | Decision |
|---|---|
| Self-check on the level picker | **A checklist that suggests a level.** The learner ticks what they can do; we suggest a level, but they still choose |
| Export format | **A JSON file download**, named `<brand-slug>-progress-<date>.json` |
| Import when progress already exists | **Replace, after a preview** that compares "Now in this browser" with "In the file" |
| Reset confirmation | **Type RESET to confirm**, with an offer to export first |

## Screens

### S1 — Welcome (first visit only)
- Logo and app name (from `brand.json`), one headline, the tagline and one line about the path.
- Three facts: Free · No account · Progress stays in this browser.
- "How it works" in 3 numbered steps: lesson → exam (pass mark from `rules.json`) → next stop.
- Main button "Choose my level". A small link "Have a progress file from another browser? Import it".

### S2 — Level picker
- Five radio cards with the level color stripe, summary, description and "N topics. Includes Fresh, Junior." (cumulative count of main topics).
- "You are here if you can…" opens the level's self-check list.
- **"Not sure? Check what I can do"** opens a checklist of all self-check items, grouped by level.
  - **Suggestion rule** *(my design choice; easy to change)*: go up the levels; a level counts when at least half of its items are ticked (`selfCheckShare` = 0.5 in the builder). The suggestion is the highest level in an unbroken run from Fresh. Example: Fresh 4/5, Junior 4/6, Mid 2/6, Senior 5/6 → **Junior** (Mid breaks the run).
  - The suggestion shows the counts per level and a "Use Junior" button. It never chooses for the learner.
- Sticky bar: "Start my path" (first visit) or "Save my level" (from settings), disabled until a level is picked.
- Changing level shows "Your progress is kept. N topics done on this path."

### After picking
- "Your junior path is ready. 66 topics in 2 stages." For levels above Fresh: "Already know the basics? Skip a stage with a short test" (skip pass mark from `rules.json`). In the app this goes straight to the path map.

### S11 — Progress and settings
- **Level** with "Change level".
- **Stats:** Progress % (done ÷ main topics), Path score % (average of done topics), Topics done N/M, and one line that explains the words.
- **By stage:** a bar per stage; opening a stage shows each unit with done/total and its average. A skipped unit says "skipped".
- **Keep your progress safe:** Export progress, Import progress.
- **Appearance:** Light / Dark / Device.
- **Reset progress** (red border, ghost button that opens the confirmation).
- Link to About.

### Export
- Downloads the file, then a dialog: the file name, how many topics it holds, and how to import it in another browser.
- "Did the download not start? Show the file" shows the JSON to copy.
- In the published artifact, the download goes through the viewer's `downloads` capability (the viewer asks the learner first). The real app uses a normal download link.

### Import
- Picks a `.json` file and checks it before anything changes:

| Problem | Message title |
|---|---|
| Over 1 MB | This file is too big |
| Not JSON | We could not read this file |
| Not our `app` / `kind` | This is not a progress file |
| `schema` missing | This file is damaged |
| `schema` newer than the app | This file is from a newer version |
| Unknown level | This file is damaged |
| Unknown or damaged topics | Not an error: "2 topics in the file no longer exist or are damaged. We will leave them out." |

- Every error says "Nothing changed. Your progress is the same as before." and offers "Choose another file".
- A good file shows the preview, the export date, "Your progress in this browser will be replaced by the file. This cannot be undone.", and an "Export it" link first.

### Reset
- "Delete all your progress?" with the number of topics done, "It cannot be undone", an Export button, and a text box "Type RESET to confirm" (not case-sensitive). The red button stays disabled until it matches.
- Reset deletes topics, scores and level; **the theme stays**. Then the welcome screen shows again.

### S12 — About
- What it is, where the content comes from (official and community sources, the "Updated" note), privacy (no account, progress only in this browser, clearing browser data deletes it), and a "Not made by Apple" trademark note. *(The trademark wording needs the legal check before launch.)*

### States
- **Loading:** gray blocks shaped like the path, "Loading your path…", only after half a second; no pulse with reduced motion.
- **No progress yet:** on the progress page, a friendly empty card with "Go to my path".
- **The browser blocks saving:** a warning banner on every screen, with Export. Progress lives in memory for the page. Detected by a test write to storage.
- **Saved progress cannot be read:** "Import a file" or "Start again".
- **Import errors:** see the table above (the prototype has sample-file buttons).
- **Page not found:** "This page is not on the path… Your progress is safe."

## Progress file (schema 1)

```json
{
  "app": "ios-interview-prep",
  "kind": "progress",
  "schema": 1,
  "exportedAt": "2026-10-24T10:00:00.000Z",
  "level": "junior",
  "topics": { "structs-vs-classes": { "status": "passed", "best": 88, "version": 2 } },
  "settings": { "theme": "device" }
}
```

- `app` is a fixed id, **not the app name**, so files still import after a rename.
- `version` per topic is the topic version when it was passed. It drives the "Updated" badge.
- The same shape is the browser store (Zustand `persist` with `version` + `migrate` in Phase 5), so it can move to an account later.

## Checked (375px, light and dark)

- Self-check example above suggested Junior; "Use Junior" picked it; "Start my path" opened the ready screen.
- Example progress: 34 of 66 topics → 52% progress, 85% path score; the skipped unit shows 86%.
- Export dialog shows the right name and topic count; the file has all schema keys.
- Import: broken, other-app and newer-version files show their errors and change nothing; the removed-topics file shows the "leave them out" note; a good file replaces progress.
- Reset: the button stays off until RESET is typed; after reset the welcome shows and the dark theme stays.
- A local `data:` page really blocks storage: the banner appeared on its own.
- Nothing spills off the screen on any screen.
