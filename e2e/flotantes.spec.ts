import { expect, test } from "@playwright/test";

test.describe("Acciones flotantes", () => {
  test("el boton de WhatsApp abre wa.me y muestra tooltip al pasar el cursor o enfocar", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const wa = page.getByRole("link", { name: "Contáctanos por WhatsApp" });
    await expect(wa).toBeVisible();
    await expect(wa).toHaveAttribute("href", /wa\.me\/56988381428/);
    await expect(wa).toHaveAttribute("target", "_blank");
    const tooltip = page.getByRole("tooltip");
    if (isMobile) {
      await expect(tooltip).toHaveCSS("opacity", "0");
      return;
    }
    await wa.hover();
    await expect(tooltip).toHaveCSS("opacity", "1");
    await expect(tooltip).toHaveText("Contáctanos por WhatsApp");
    await page.mouse.move(0, 0);
    await wa.focus();
    await expect(tooltip).toHaveCSS("opacity", "1");
  });

  test("volver arriba aparece tras el scroll y lleva al inicio", async ({ page }) => {
    await page.goto("/");
    const top = page.getByRole("button", { name: "Volver arriba" });
    await expect(top).toHaveCSS("opacity", "0");
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(top).toHaveCSS("opacity", "1");
    await top.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(top).toHaveCSS("opacity", "0");
  });
});
