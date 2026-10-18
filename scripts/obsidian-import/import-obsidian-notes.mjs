#!/usr/bin/env node
// Usage: npm run import:notes -- <obsidian folder> [--topic sahabah] [--dry-run] [--strict]
//        [--out src/data/importedNotes.generated.ts] [--backend-out backend/data/obsidian_import.json]
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { importVault, renderTypeScript, TOPIC_IDS } from "./lib.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

function parseArgs(argv) {
  const options = {
    out: resolve(repoRoot, "src/data/importedNotes.generated.ts"),
    backendOut: resolve(repoRoot, "backend/data/obsidian_import.json"),
    dryRun: false,
    strict: false
  };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      const value = argv[++index];
      if (!value) throw new Error(`${arg} needs a value`);
      return value;
    };
    if (arg === "--topic") options.topic = next();
    else if (arg === "--out") options.out = resolve(next());
    else if (arg === "--backend-out") options.backendOut = resolve(next());
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--strict") options.strict = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg.startsWith("--")) throw new Error(`Unknown option ${arg}`);
    else positional.push(arg);
  }
  options.vault = positional[0];
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help || !options.vault) {
    console.log(`Convert Obsidian notes into app lessons.

  npm run import:notes -- <obsidian folder> [options]

  --topic <id>         topic for notes that don't name one (${TOPIC_IDS.join(", ")})
  --dry-run            print what would be imported without writing files
  --strict             exit with an error if any note produced a warning
  --out <file>         app content file (default src/data/importedNotes.generated.ts)
  --backend-out <file> backend seed file (default backend/data/obsidian_import.json)

See docs/obsidian-import.md for the note format.`);
    process.exit(options.vault || options.help ? 0 : 1);
  }

  const vault = resolve(options.vault);
  if (!existsSync(vault) || !statSync(vault).isDirectory()) {
    throw new Error(`Folder not found: ${vault}`);
  }

  const result = importVault(vault, { defaultTopic: options.topic });
  for (const warning of result.warnings) console.warn(`warning: ${warning}`);

  const { notes, branches, lessons, questions } = result.stats;
  console.log(`Imported ${notes} notes into ${branches} branches, ${lessons} lessons and ${questions} questions.`);
  for (const section of result.content.sections) {
    console.log(`  ${section.topicId}: ${section.branches.map((branch) => branch.title).join(", ")}`);
  }

  if (options.strict && result.warnings.length) {
    console.error(`Stopped: ${result.warnings.length} warnings with --strict.`);
    process.exit(2);
  }
  if (options.dryRun) return;

  mkdirSync(dirname(options.out), { recursive: true });
  writeFileSync(options.out, renderTypeScript(result.content));
  mkdirSync(dirname(options.backendOut), { recursive: true });
  writeFileSync(options.backendOut, `${JSON.stringify(result.backend, null, 2)}\n`);
  console.log(`Wrote ${options.out}\nWrote ${options.backendOut}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
