#!/bin/bash
# PostToolUse hook: runs the brand and contrast check after a brand, token or page-builder change.
# Exit 2 sends the problems back to Claude; exit 0 otherwise.

FILE=$(jq -r '.tool_input.file_path // empty')
case "$FILE" in
  */config/brand.json|*/config/design-tokens.json|*/scripts/build-*.mjs|*/prototype/build*.mjs) ;;
  *) exit 0 ;;
esac

ROOT="$(dirname "$0")/../.."
OUT=$(cd "$ROOT" && node scripts/check-brand.mjs 2>&1) && exit 0
echo "$OUT" >&2
exit 2
