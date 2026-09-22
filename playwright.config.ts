import { defineConfig, devices } from "@playwright/test";

const PORT = 3211;
const baseURL = `http://localhost:${PORT}`;

// Corre contra el build de produccion: CSP, cabeceras y render real.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL, trace: "on-first-retry", locale: "es-CL" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    env: { E2E_MOCK_DELIVERY: "1" },
    url: baseURL,
    // Siempre servidor propio: la simulacion de entrega depende de la variable de entorno
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
