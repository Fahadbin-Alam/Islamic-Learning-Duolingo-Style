// Lists every English string the app's screens pass to t(), plus the screen copy kept in tables.
// Usage: node scripts/i18n/ui-strings.cjs [--json]
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "../..");
// Tables of English copy that are translated where they are shown (t(TABLE[key])).
const TABLE_FILES = {
  "src/ui/screens/BottomTabs.tsx": ["TABS"],
  "src/ui/screens/SettingsSheet.tsx": ["ROLES"],
  "src/services/prayerTimes.ts": ["PRAYER_LABELS"],
  "src/ui/screens/ShopView.tsx": ["BENEFITS"],
  "src/ui/lesson/FeedbackSheet.tsx": ["PRAISE_WORDS", "WRONG_TITLE"],
  "src/components/FoundationLearning.tsx": ["QUIT_TITLES", "QUIT_LINE", "HEADLINES", "SKILL_LOOK"],
  "src/i18n.ts": ["UI_STRINGS", "TOPIC_COPY"]
};
// Lesson states read aloud with t(node.status) in LearnPath.
const DYNAMIC_STRINGS = ["available", "completed", "current", "locked"];
const SKIP_TABLE_KEYS = new Set(["key", "icon", "id", "testID"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__" && entry.name !== "gallery" && entry.name !== "translations" && entry.name !== "data") walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function collectStrings(node, out) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    const parent = node.parent;
    const key = ts.isPropertyAssignment(parent) ? parent.name.getText() : "";
    if (!SKIP_TABLE_KEYS.has(key) && /[A-Za-z]/.test(node.text)) out.add(node.text);
    return;
  }
  ts.forEachChild(node, (child) => collectStrings(child, out));
}

function extract() {
  const strings = new Set(DYNAMIC_STRINGS);
  for (const file of walk(path.join(ROOT, "src"))) {
    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const tables = TABLE_FILES[rel] ?? [];
    const visit = (node) => {
      if (ts.isCallExpression(node) && node.expression.getText(source) === "t" && node.arguments[0]) {
        const first = node.arguments[0];
        if (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first)) strings.add(first.text);
        // t(cond ? "A" : "B")
        if (ts.isConditionalExpression(first)) {
          for (const branch of [first.whenTrue, first.whenFalse]) if (ts.isStringLiteral(branch)) strings.add(branch.text);
        }
      }
      if (ts.isVariableDeclaration(node) && tables.includes(node.name.getText(source)) && node.initializer) {
        collectStrings(node.initializer, strings);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return [...strings].sort();
}

module.exports = { extract };

if (require.main === module) {
  const strings = extract();
  if (process.argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(strings, null, 2)}\n`);
  } else {
    console.log(strings.join("\n"));
    console.error(`${strings.length} strings`);
  }
}
