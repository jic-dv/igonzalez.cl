import { expect, test } from "@playwright/test";

test.describe("Carrusel del equipo en el home", () => {
  test("dos filas, avanza con el boton y el de retroceso aparece solo tras avanzar", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section[aria-labelledby=equipo-title]");
    await section.scrollIntoViewIfNeeded();
    const list = section.getByRole("list", { name: "Abogados y abogadas del equipo" });
    await expect(list).toHaveCSS("grid-template-rows", /^\S+ \S+$/);
    const prev = section.getByRole("button", { name: "Ver abogados anteriores" });
    const next = section.getByRole("button", { name: "Ver más abogados" });
    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.click();
    await expect.poll(() => list.evaluate((el) => el.scrollLeft)).toBeGreaterThan(100);
    await expect(prev).toBeEnabled();
  });

  test("cada tarjeta enlaza al WhatsApp de la persona con title", async ({ page }) => {
    await page.goto("/");
    const first = page.locator("section[aria-labelledby=equipo-title] li a").first();
    await expect(first).toHaveAttribute("href", /wa\.me\/569\d{8}\?text=/);
    await expect(first).toHaveAttribute("title", /Escribir a \S+ por WhatsApp/);
  });

  test("al pasar el cursor aparece el overlay con el boton de WhatsApp", async ({ page, isMobile }) => {
    test.skip(isMobile, "En tactil el overlay compacto es permanente");
    await page.goto("/");
    const card = page.locator("section[aria-labelledby=equipo-title] li a").nth(2);
    await card.scrollIntoViewIfNeeded();
    const overlay = card.locator("> span").last();
    await expect(overlay).toHaveCSS("opacity", "0");
    await card.hover();
    await expect(overlay).toHaveCSS("opacity", "1");
    await expect(overlay).toContainText("Escribir a");
  });
});
