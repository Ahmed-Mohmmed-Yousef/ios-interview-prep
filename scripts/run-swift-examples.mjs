// Runs every Swift example in a lesson with the real compiler (Swift 6 language mode) and checks
// that each `output` block matches what the code prints. `swift no-output` blocks are type-checked only.
// Usage: node scripts/run-swift-examples.mjs content/topics/<id>/lesson.mdx
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
  const args = ["-swift-version", "6", path, ...(typecheckOnly ? ["-typecheck"] : ["-o", join(dir, "main")])];
  try {
    const log = execFileSync("swiftc", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, log };
  } catch (e) {
    return { ok: false, log: String(e.stderr || e.message) };
  }
}

fences.forEach((f, i) => {
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
