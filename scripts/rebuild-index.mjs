import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = "https://fonts.grok.me";
const CONTACT = "maxinfeld@gmail.com";
const REPO = "https://github.com/maximusmaximus/xerographer-fonts";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "font.json") acc.push(full);
  }
  return acc;
}

const files = walk(path.join(ROOT, "fonts"));
const records = files.map((file) => ({
  font: JSON.parse(fs.readFileSync(file, "utf8")),
  rel: path.relative(ROOT, path.dirname(file)).split(path.sep).join("/"),
}));
records.sort((a, b) => a.font.category.localeCompare(b.font.category) || a.font.subcategory.localeCompare(b.font.subcategory) || a.font.name.localeCompare(b.font.name));

const existing = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog.json"), "utf8"));
existing.stats.typefaces = records.length;
existing.stats.fontFiles = records.reduce((n, row) => n + row.font.files.length, 0);
existing.stats.facesWithVariations = records.filter((row) => row.font.files.length > 1).length;
existing.fonts = records.map((row) => ({
  name: row.font.name,
  slug: row.font.slug,
  category: row.font.category,
  subcategory: row.font.subcategory,
  files: row.font.files.map((file) => file.file),
  catalog: row.font.catalog || `${CATALOG}/font/${row.font.slug}`,
  path: row.rel,
}));
fs.writeFileSync(path.join(ROOT, "catalog.json"), JSON.stringify(existing, null, 2) + "\n");

let md = `# Every typeface\n\n${records.length.toLocaleString("en-US")} faces. ${existing.stats.fontFiles.toLocaleString("en-US")} font files. Each name opens the files in this repository. Each catalog link opens that face on [fonts.grok.me](${CATALOG}).\n\nCopyright © Max Infeld. Commercial licensing: [${CONTACT}](mailto:${CONTACT}).\n\n`;
let current = "";
for (const row of records) {
  const heading = `${row.font.category} · ${row.font.subcategory}`;
  if (heading !== current) {
    current = heading;
    md += `## ${heading}\n\n`;
  }
  const extra = row.font.files.length > 1 ? ` · ${row.font.files.length} files` : "";
  const catalog = row.font.catalog || `${CATALOG}/font/${row.font.slug}`;
  md += `- [${row.font.name}](${row.rel}) — [catalog](${catalog})${extra}\n`;
}
fs.writeFileSync(path.join(ROOT, "FONTS.md"), md + "\n");
console.log(`indexed ${records.length} faces (${existing.stats.fontFiles} files)`);
