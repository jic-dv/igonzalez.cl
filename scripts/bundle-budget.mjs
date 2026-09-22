// Mide el JS de cliente transferido (comprimido) por ruta contra el presupuesto.
// Piso medido de Next 16.3 App Router + React 19.2: 160 KB gz (react-dom 70.6,
// runtime del router 44.8, chunks compartidos 45). motion (LazyMotion + m + domAnimation
// cargado por import() dinamico) suma 50 KB gz medidos con Turbopack; es una decision
// explicita del cliente para las animaciones de aparicion. El codigo propio del sitio
// pesa 1 a 8 KB por ruta. Las rutas con formulario suman ademas react-hook-form
// (15 KB gz medidos), pedido explicitamente por el cliente para la validacion.
// Los presupuestos se fijan sobre esa medicion.
// Uso: node scripts/bundle-budget.mjs http://localhost:3211 [--verbose]
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3211";
const budgets = {
  "/": 220,
  "/ivan-gonzalez": 220,
  "/equipo": 220,
  "/nosotros": 220,
  "/preguntas-frecuentes": 220,
  "/contacto": 240,
  "/trabaja-con-nosotros": 240,
};

const browser = await chromium.launch();
let failed = false;
const verbose = process.argv.includes("--verbose");

for (const [path, budgetKb] of Object.entries(budgets)) {
  // Contexto nuevo por ruta: sin cache, cada ruta se mide en frio
  const context = await browser.newContext();
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  const scripts = new Map();
  client.on("Network.responseReceived", (e) => {
    if (e.type === "Script") scripts.set(e.requestId, { url: e.response.url, bytes: 0 });
  });
  client.on("Network.loadingFinished", (e) => {
    const s = scripts.get(e.requestId);
    if (s) s.bytes = e.encodedDataLength;
  });
  await page.goto(base + path, { waitUntil: "networkidle" });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const total = [...scripts.values()].reduce((a, s) => a + s.bytes, 0) / 1024;
  const ok = total <= budgetKb;
  if (!ok) failed = true;
  console.log(
    `${ok ? "OK " : "FAIL"} ${path.padEnd(24)} ${total.toFixed(1)} KB / ${budgetKb} KB (${scripts.size} scripts)`,
  );
  if (verbose)
    for (const s of scripts.values())
      console.log(`     ${(s.bytes / 1024).toFixed(1).padStart(7)} KB  ${s.url.replace(base, "")}`);
  await context.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
