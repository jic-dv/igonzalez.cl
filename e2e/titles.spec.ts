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

// Regla del proyecto: todo enlace e imagen lleva title descriptivo, y ninguna imagen se
// queda sin alt. En este sitio no hay imagenes decorativas: las que lo serian se pintan
// con CSS, asi que un alt vacio siempre es un descuido.
test.describe("Atributo title y alt", () => {
  for (const path of routes) {
    test(`enlaces e imagenes con title y alt en ${path}`, async ({ page }) => {
      await page.goto(path);
      const problemas = await page.evaluate(() => {
        const describir = (el: Element) =>
          `${el.tagName.toLowerCase()} ${el.getAttribute("href") ?? el.getAttribute("src") ?? ""}`;
        const sinTitle = [...document.querySelectorAll("a, img")]
          .filter((el) => !el.getAttribute("title")?.trim())
          .map((el) => `sin title: ${describir(el)}`);
        const sinAlt = [...document.querySelectorAll("img")]
          .filter((el) => !el.getAttribute("alt")?.trim())
          .map((el) => `sin alt: ${describir(el)}`);
        return [...sinTitle, ...sinAlt];
      });
      expect(problemas).toEqual([]);
    });
  }
});
