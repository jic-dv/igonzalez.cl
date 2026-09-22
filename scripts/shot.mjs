import { chromium } from "@playwright/test";
const [, , url, out, width = "1440", full = "1"] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto(url, { waitUntil: "networkidle" });
// dispara animaciones whileInView recorriendo la pagina
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: full === "1" });
console.log("saved", out, "errors:", errors.length ? errors.join(" | ") : "none");
await browser.close();
