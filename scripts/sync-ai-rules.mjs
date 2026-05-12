#!/usr/bin/env node
/**
 * Syncs CLAUDE.md to all other AI assistant instruction files.
 * Run manually: node scripts/sync-ai-rules.mjs
 * Runs automatically via .git/hooks/pre-commit on every commit.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const source = readFileSync(join(root, "CLAUDE.md"), "utf8");

// Strip the first header line (# aero-ds — AI Rules (Claude Code))
const body = source.replace(/^#[^\n]*\n/, "").trimStart();

const targets = [
  {
    path: join(root, "GEMINI.md"),
    header: "# aero-ds — AI Rules (Gemini CLI)\n\n",
  },
  {
    path: join(root, "AGENTS.md"),
    header: "# aero-ds — AI Rules (Codex / OpenAI Agents)\n\n",
  },
  {
    path: join(root, ".github", "copilot-instructions.md"),
    header: "# aero-ds — AI Rules (GitHub Copilot)\n\n",
  },
];

for (const { path, header } of targets) {
  writeFileSync(path, header + body, "utf8");
  console.log(`✓ wrote ${path.replace(root + "/", "")}`);
}

console.log("\nSync complete. All AI instruction files are up to date.");
