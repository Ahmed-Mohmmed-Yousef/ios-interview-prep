// Runs Swift code with the real compiler (Swift 6 language mode) and checks the expected result.
// - lesson.mdx: each `swift` block must print exactly its `output` block; `swift no-output` blocks are type-checked.
// - questions.json: for each question with `verify`, runs `code` (code-reading) or `modelAnswer` (code-write);
//   `verifyStarter` runs `starterCode`. `verify` is { "output": "..." } or { "compileError": "text in the error" }.
// Usage: node scripts/run-swift-examples.mjs content/topics/<id>/lesson.mdx | questions.json
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const file = process.argv[2];
const src = readFileSync(file, "utf8");
const fences = [...src.matchAll(/^```(\S*)([^\n]*)\n([\s\S]*?)^```\s*$/gm)].map((m) => ({
  lang: m[1], info: m[2], code: m[3], start: m.index, end: m.index + m[0].length,
}));
const line = (i) => src.slice(0, i).split("\n").length;
const dir = mkdtempSync(join(tmpdir(), "swift-examples-"));
let passed = 0, failed = 0;

function compile(code, typecheckOnly) {
  const path = join(dir, "main.swift");
  writeFileSync(path, code);
  const extraArgs = [];
  if (code.includes("UIKit")) {
    extraArgs.push(
      "-target",
      "arm64-apple-ios17.0-macabi",
      "-F",
      "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/iOSSupport/System/Library/Frameworks"
    );
  }
  const args = [...extraArgs, "-swift-version", "6", path, ...(typecheckOnly ? ["-typecheck"] : ["-o", join(dir, "main")])];
  try {
    const log = execFileSync("swiftc", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, log };
  } catch (e) {
    return { ok: false, log: String(e.stderr || e.message) };
  }
}

function checkExpectation(where, code, expect) {
  const built = compile(code, false);
  if (expect.compileError) {
    const ok = !built.ok && built.log.includes(expect.compileError);
    ok ? passed++ : failed++;
    console.log(ok ? `ok   ${where} (compile error as expected)` : `FAIL ${where} — expected a compile error containing "${expect.compileError}"\n${built.log.trim()}\n`);
    return;
  }
  if (!built.ok) { failed++; console.log(`FAIL ${where} — does not compile:\n${built.log.trim()}\n`); return; }
  const actual = execFileSync(join(dir, "main"), { encoding: "utf8" }).replace(/\s+$/, "");
  const expected = String(expect.output).replace(/\s+$/, "");
  if (actual === expected) { passed++; console.log(`ok   ${where}`); }
  else { failed++; console.log(`FAIL ${where} — output differs\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}\n`); }
}

if (file.endsWith(".json")) {
  for (const q of JSON.parse(src).questions ?? []) {
    if (q.verify) checkExpectation(`${q.id} (${q.type === "code-write" ? "modelAnswer" : "code"})`, q.type === "code-write" ? q.modelAnswer : q.code, q.verify);
    if (q.verifyStarter) checkExpectation(`${q.id} (starterCode)`, q.starterCode, q.verifyStarter);
    if (q.type === "code-reading" && !q.verify) { failed++; console.log(`FAIL ${q.id} — code-reading question needs a verify field`); }
  }
}

fences.forEach((f, i) => {
  if (file.endsWith(".json")) return;
  if (f.lang !== "swift") return;
  const where = `${file}:${line(f.start)}`;
  const noOutput = /\bno-output\b/.test(f.info);
  const built = compile(f.code, noOutput);
  if (!built.ok) {
    failed++;
    console.log(`FAIL ${where} — does not compile:\n${built.log.trim()}\n`);
    return;
  }
  if (noOutput) { passed++; console.log(`ok   ${where} (type-checked)`); return; }
  const next = fences[i + 1];
  if (!next || next.lang !== "output") { failed++; console.log(`FAIL ${where} — no output block`); return; }
  const actual = execFileSync(join(dir, "main"), { encoding: "utf8" }).replace(/\s+$/, "");
  const expected = next.code.replace(/\s+$/, "");
  if (actual === expected) { passed++; console.log(`ok   ${where}`); }
  else { failed++; console.log(`FAIL ${where} — output differs\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}\n`); }
});

rmSync(dir, { recursive: true, force: true });
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
