import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(path.join(dir, "icon.svg"));
const outDir = path.join(dir, "..", "public");
mkdirSync(outDir, { recursive: true });

const targets = [
  { file: "icon-512.png", size: 512 },
  { file: "icon-192.png", size: 192 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-16.png", size: 16 }
];

for (const t of targets) {
  await sharp(svg, { density: 384 })
    .resize(t.size, t.size)
    .png()
    .toFile(path.join(outDir, t.file));
  console.log("wrote", t.file);
}

// also ship the source SVG as a scalable favicon for browsers that support it
const svgOut = path.join(outDir, "icon.svg");
import { copyFileSync } from "fs";
copyFileSync(path.join(dir, "icon.svg"), svgOut);
console.log("wrote icon.svg");
