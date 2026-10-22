#!/bin/bash
# PostToolUse hook: validates curriculum files, lesson.mdx and questions.json under content/.
# Exit 2 sends the problems back to Claude; exit 0 otherwise.

FILE=$(jq -r '.tool_input.file_path // empty')
[[ -z "$FILE" || "$FILE" != */content/* || ! -f "$FILE" ]] && exit 0

errors=()

case "$FILE" in
  */content/levels.json|*/content/units.json|*/content/rules.json|*/topic.json)
    CONTENT_DIR="${FILE%%/content/*}/content"
    while IFS= read -r line; do
      [[ -n "$line" ]] && errors+=("$line")
    done < <(node "$(dirname "$0")/../../scripts/validate-curriculum.mjs" "$CONTENT_DIR" 2>&1 | grep -v '^OK:')
    ;;
esac

if [[ "$FILE" == */questions.json ]]; then
  if ! jq empty "$FILE" 2>/dev/null; then
    echo "$FILE: invalid JSON." >&2
    exit 2
  fi
  while IFS= read -r line; do
    [[ -n "$line" ]] && errors+=("$line")
  done < <(jq -r '
    def need($q; $f): if ($q | has($f)) then empty else "\($q.id // "?"): missing \($f)" end;
    (if has("topicId") and has("version") and has("questions") then empty
     else "top level: needs topicId, version, questions" end),
    ([.questions[].id] | group_by(.) | map(select(length > 1) | "duplicate id \(.[0])") | .[]),
    # Lesson from the pilot: spread right answers over a-d, so the position gives nothing away.
    ([.questions[] | select(.options and (.retired | not)) | .answer] as $ans |
      if ($ans | length) >= 12 then
        (["a","b","c","d"][] as $l | select(($ans | index($l)) == null) | "right answers never use option \($l); spread them over a-d")
      else empty end),
    (.questions[] as $q |
      (["id","type","difficulty","prompt","lessonSection","sources"][] as $f | need($q; $f)),
      (if ($q.type | IN("mcq","code-reading","written","code-write")) then empty
       else "\($q.id): unknown type \($q.type)" end),
      (if (($q.sources // []) | length) == 0 then "\($q.id): needs at least one source" else empty end),
      (if ($q.type | IN("mcq","code-reading")) then
         (if (($q.options // []) | length) != 4 then "\($q.id): needs exactly 4 options" else empty end),
         (if ([($q.options // [])[].id] | index($q.answer)) == null then "\($q.id): answer is not an option id" else empty end),
         (($q.options // [])[] | select((.explanation // "") == "") | "\($q.id): option \(.id) has no explanation"),
         (if $q.type == "code-reading" and (($q.code // "") == "") then "\($q.id): code-reading needs code" else empty end),
         (if $q.type == "code-reading" and ($q.verify == null) then "\($q.id): code-reading needs a verify field (run scripts/run-swift-examples.mjs)" else empty end),
         # Lesson from the pilot: the right answer must not be much longer than the wrong ones.
         ((($q.options // [])[] | select(.id == $q.answer) | .text | length) as $c |
          ([($q.options // [])[] | select(.id != $q.answer) | .text | length] | max // 0) as $w |
          if $w > 0 and $c > 1.5 * $w then "\($q.id): the right option is \($c) characters, more than 1.5 times the longest wrong one (\($w)); balance the lengths" else empty end)
       else
         (if ([($q.rubric // [])[].weight] | add) != 100 then "\($q.id): rubric weights must sum to 100" else empty end),
         (if (($q.modelAnswer // "") == "") then "\($q.id): needs modelAnswer" else empty end),
         (if ([($q.rubric // [])[] | select(.key == true)] | length) == 0 then "\($q.id): rubric needs at least one key criterion (\"key\": true)" else empty end)
       end)
    )' "$FILE")

elif [[ "$FILE" == */lesson.mdx ]]; then
  # Structure rules: docs/lesson-format.md
  while IFS= read -r line; do
    [[ -n "$line" ]] && errors+=("$line")
  done < <(node "$(dirname "$0")/check-lesson.mjs" "$FILE" 2>&1)
fi

if [[ "$FILE" == */questions.json || "$FILE" == */lesson.mdx || "$FILE" == */topic.json || "$FILE" == */content/levels.json || "$FILE" == */content/units.json ]] && (( ${#errors[@]} == 0 )); then
  while IFS= read -r line; do
    [[ -n "$line" ]] && errors+=("plain English: $line")
  done < <(node "$(dirname "$0")/check-plain-english.mjs" "$FILE" 2>&1)
fi

if (( ${#errors[@]} > 0 )); then
  echo "Content validation failed for $FILE:" >&2
  printf ' - %s\n' "${errors[@]}" >&2
  exit 2
fi
exit 0
