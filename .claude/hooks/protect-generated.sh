#!/bin/bash
# PreToolUse hook: blocks hand edits to generated files and names the builder to run instead.
# Exit 2 blocks the edit and sends the message back to Claude.

FILE=$(jq -r '.tool_input.file_path // empty')
[[ -z "$FILE" ]] && exit 0

case "$FILE" in
  */config/generated/*|*/docs/design/design-system.html) SRC="config/brand.json or config/design-tokens.json, then run: node scripts/build-design-system.mjs" ;;
  */docs/topics.md) SRC="content/, then run: node scripts/curriculum-report.mjs" ;;
  */docs/path-map.html) SRC="scripts/build-path-page.mjs, then run it and republish the Path Map artifact" ;;
  */docs/design/path-map-prototype.html) SRC="scripts/build-path-prototype.mjs, then run it" ;;
  */docs/design/exam-prototype.html) SRC="scripts/build-exam-prototype.mjs, then run it" ;;
  */docs/design/start-prototype.html) SRC="scripts/build-start-prototype.mjs, then run it" ;;
  */docs/design/lesson-prototype.html) SRC="prototype/build-lesson.mjs, then run: cd prototype && node build-lesson.mjs <topic-id>" ;;
  */docs/design/walkthrough.html) SRC="scripts/build-walkthrough.mjs, then run: node scripts/build-walkthrough.mjs" ;;
  */docs/topics/*/review.html|*/docs/pilot/prototype-*.html) SRC="prototype/build.mjs, then run: cd prototype && node build.mjs <topic-id>" ;;
  *) exit 0 ;;
esac

echo "${FILE##*/} is generated. Do not edit it by hand. Edit $SRC" >&2
exit 2
