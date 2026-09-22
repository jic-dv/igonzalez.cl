import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/ivan-gonzalez",
  "/nosotros",
  "/equipo",
  "/contacto",
  "/preguntas-frecuentes",
  "/trabaja-con-nosotros",
];

// Regla del proyecto: todo enlace e imagen lleva title descriptivo.
test.describe("Atributo title", () => {
  for (const path of routes) {
    test(`enlaces e imagenes con title en ${path}`, async ({ page }) => {
      await page.goto(path);
      const missing = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("a, img")]
          .filter((el) => !el.getAttribute("title")?.trim())
          .map(
            (el) => `${el.tagName.toLowerCase()} ${el.getAttribute("href") ?? el.getAttribute("src") ?? ""}`,
          ),
      );
      expect(missing).toEqual([]);
    });
  }
});
