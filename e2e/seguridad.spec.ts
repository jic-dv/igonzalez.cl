import { expect, test } from "@playwright/test";

test.describe("Cabeceras de seguridad", () => {
  test("CSP con nonce, HSTS y resto de cabeceras en cada respuesta HTML", async ({ request }) => {
    const res = await request.get("/contacto");
    const h = res.headers();
    expect(h["content-security-policy"]).toMatch(
      /script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/,
    );
    expect(h["content-security-policy"]).not.toContain("unsafe-eval");
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["strict-transport-security"]).toContain("preload");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("no hay violaciones de CSP ni errores de consola al cargar el home", async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.text().includes("Content Security Policy")) problems.push(m.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(problems).toEqual([]);
  });
});
