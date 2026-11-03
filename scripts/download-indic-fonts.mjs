import { mkdir, writeFile } from "node:fs/promises";

const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

const jobs = [
  {
    css: "https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@600;700&display=swap",
    family: "Noto Sans Gurmukhi",
    script: /U\+0A01-0A76/,
    files: { 600: "noto-sans-gurmukhi-600.woff2", 700: "noto-sans-gurmukhi-700.woff2" },
  },
  {
    css: "https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@500;600&display=swap",
    family: "Noto Serif Devanagari",
    script: /U\+09[0-7A]/,
    files: { 500: "noto-serif-devanagari-500.woff2", 600: "noto-serif-devanagari-600.woff2" },
  },
];

await mkdir("public/fonts", { recursive: true });

for (const job of jobs) {
  const response = await fetch(job.css, { headers: { "User-Agent": ua }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${job.family} stylesheet: ${response.status}`);
  const css = await response.text();
  const faces = [...css.matchAll(/@font-face\s*\{[^}]+\}/g)].map(match => match[0]);
  const scriptFaces = faces.filter(block => job.script.test(block) && block.includes("woff2"));
  if (!scriptFaces.length) throw new Error(`${job.family}: no script woff2 faces\n${css.slice(0, 800)}`);
  for (const [weight, name] of Object.entries(job.files)) {
    const block = scriptFaces.find(face => new RegExp(`font-weight:\\s*${weight}`).test(face));
    if (!block) throw new Error(`${job.family} ${weight}: missing face`);
    const url = block.match(/url\(([^)]+)\)/)?.[1];
    if (!url) throw new Error(`${job.family} ${weight}: missing url`);
    const font = await fetch(url, { headers: { "User-Agent": ua }, signal: AbortSignal.timeout(20000) });
    if (!font.ok) throw new Error(`${name}: ${font.status}`);
    const buffer = Buffer.from(await font.arrayBuffer());
    if (buffer.length < 20000 || buffer.subarray(0, 4).toString() !== "wOF2") {
      throw new Error(`${name}: not a woff2 (${buffer.length} bytes, ${buffer.subarray(0, 4).toString()})`);
    }
    await writeFile(`public/fonts/${name}`, buffer);
    console.log(`Saved ${name} (${buffer.length} bytes)`);
  }
}
