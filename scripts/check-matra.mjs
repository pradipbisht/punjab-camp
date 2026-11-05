import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

async function shot(width, height, file) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000/#admission-drive", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      #admission-drive-heading span.col-start-1 { transition: none !important; }
      #admission-drive-heading { background: #052c25; }
      #admission-drive-heading span.col-start-1:has([lang="pa"]) { opacity: 1 !important; filter: none !important; transform: none !important; }
      #admission-drive-heading span.col-start-1:not(:has([lang="pa"])) { display: none !important; }
    `,
  });
  const debug = await page.evaluate(() => {
    return [...document.querySelectorAll('#admission-drive-heading [lang="pa"] .dgs-admission-drive-line')].map((line) => {
      const textNode = line.querySelector("span, em").firstChild;
      const lineRect = line.getBoundingClientRect();
      let minTop = Infinity;
      let maxBottom = 0;
      for (let i = 0; i < textNode.textContent.length; i += 1) {
        const range = document.createRange();
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const rect = range.getBoundingClientRect();
        if (rect.height === 0) continue;
        if (rect.top < minTop) minTop = rect.top;
        if (rect.bottom > maxBottom) maxBottom = rect.bottom;
      }
      return {
        text: textNode.textContent,
        above: Math.round(minTop - lineRect.top),
        below: Math.round(lineRect.bottom - maxBottom),
        h: Math.round(lineRect.height),
      };
    });
  });
  if (width === 1280) console.log("ink", JSON.stringify(debug));
  const box = await page.evaluate(() => {
    const heading = document.querySelector("#admission-drive-heading");
    heading.scrollIntoView({ block: "center" });
    const rect = heading.getBoundingClientRect();
    const lines = [...heading.querySelectorAll('[lang="pa"] .dgs-admission-drive-line')].map((node) => {
      const r = node.getBoundingClientRect();
      return { text: node.textContent.replace(/\s+/g, " ").trim(), h: Math.round(r.height), w: Math.round(r.width) };
    });
    return {
      x: Math.max(0, rect.x - 8),
      y: Math.max(0, rect.y - 16),
      width: Math.min(rect.width + 16, window.innerWidth),
      height: Math.min(rect.height + 24, window.innerHeight - Math.max(0, rect.y - 16)),
      lines,
    };
  });
  await page.screenshot({
    path: file,
    clip: { x: box.x, y: box.y, width: Math.max(box.width, 40), height: Math.max(box.height, 40) },
  });
  await page.close();
  return box.lines;
}

const desktop = await shot(1280, 900, "artifacts/verify-lang/matra-after.png");
const mobile = await shot(390, 844, "artifacts/verify-lang/matra-after-mobile.png");
console.log(JSON.stringify({ desktop, mobile }, null, 2));
await browser.close();
