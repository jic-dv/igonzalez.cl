import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/ivan-gonzalez",
  "/nosotros",
  "/equipo",
  "/contacto",
  "/preguntas-frecuentes",
  "/trabaja-con-nosotros",
  "/privacidad",
];

// Recorre la pagina para disparar las entradas por scroll y espera a que terminen:
// axe mide el contraste con la opacidad real, y un elemento a medio aparecer falla.
async function settleReveals(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  // Duracion de la aparicion (650 ms) mas el mayor retraso de cascada
  await page.waitForTimeout(1500);
}

test.describe("Accesibilidad", () => {
  for (const path of routes) {
    test(`axe sin violaciones en ${path}`, async ({ page }) => {
      await page.goto(path);
      await settleReveals(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }

  test("recorrido por teclado: skip link, logo, navegacion y botones", async ({ page, isMobile }) => {
    test.skip(isMobile, "El menu movil se cubre en el test siguiente");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "IGonzalez, ir al inicio" })).toBeFocused();

    const banner = page.getByRole("banner");
    // Servicios, Nosotros, Equipo, Contacto y el boton del desplegable
    for (const name of ["Servicios", "Nosotros", "Equipo", "Contacto"]) {
      await page.keyboard.press("Tab");
      await expect(banner.getByRole("link", { name, exact: true })).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(banner.getByRole("button", { name: "Más información" })).toBeFocused();

    await page.keyboard.press("Tab");
    // El mismo destino esta en el desplegable y en el boton: se distingue por el boton
    await expect(banner.getByRole("link", { name: "Trabaja con nosotros" }).last()).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(banner.getByRole("link", { name: /Escríbenos/ })).toBeFocused();
  });

  test("el desplegable Más información se abre con teclado y cierra con Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "En movil es un acordeon dentro del drawer");
    await page.goto("/");
    const banner = page.getByRole("banner");
    const toggle = banner.getByRole("button", { name: "Más información" });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = banner.getByRole("navigation", { name: "Principal" });
    for (const name of ["FAQ", "Reclamos y sugerencias", "Trabaja con nosotros"]) {
      await expect(panel.getByRole("link", { name, exact: true })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("en movil el grupo Más información despliega sus enlaces dentro del drawer", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo movil");
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const toggle = page.getByRole("button", { name: "Más información" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const drawer = page.getByRole("dialog", { name: "Menú de navegación" });
    await expect(drawer.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
    await drawer.getByRole("link", { name: "Reclamos y sugerencias", exact: true }).click();
    await expect(page).toHaveURL(/\/reclamos-y-sugerencias$/);
  });

  test("menu movil: abre, enfoca cerrar, Escape devuelve el foco", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Solo movil");
    await page.goto("/");
    const open = page.getByRole("button", { name: "Abrir menú" });
    await open.click();
    await expect(page.getByRole("dialog", { name: "Menú de navegación" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Menú de navegación" })).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("las preguntas frecuentes se operan con teclado", async ({ page }) => {
    await page.goto("/preguntas-frecuentes");
    const second = page.locator("details").nth(1);
    await second.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(second).toHaveAttribute("open", "");
  });
});
