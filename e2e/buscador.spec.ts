import { expect, test } from "@playwright/test";

test.describe("Buscador del equipo", () => {
  test("filtra por nombre sin acentos y refleja el termino en la URL", async ({ page }) => {
    await page.goto("/equipo");
    const input = page.getByRole("searchbox", { name: "Buscar abogado o abogada" });
    await input.fill("alvarez");
    await expect(page.getByRole("status")).toContainText("1 resultado");
    await expect(page.getByRole("heading", { level: 3 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 3, name: "Rodrigo Álvarez" })).toBeVisible();
    await expect.poll(() => page.url()).toContain("q=alvarez");
  });

  test("filtra por numero con formato y muestra estado vacio con salida a WhatsApp", async ({ page }) => {
    await page.goto("/equipo");
    const input = page.getByRole("searchbox", { name: "Buscar abogado o abogada" });
    await input.fill("+56 9 6519 1739");
    await expect(page.getByRole("heading", { level: 3, name: "Angeles Torres" })).toBeVisible();
    await input.fill("000000");
    await expect(page.getByRole("status")).toContainText("Sin resultados");
    await expect(page.getByRole("link", { name: "Verificar por WhatsApp" })).toBeVisible();
    await page.getByRole("button", { name: "Limpiar la búsqueda" }).click();
    await expect(page.getByRole("heading", { level: 3 })).toHaveCount(25);
  });

  test("abre con ?q= ya aplicado", async ({ page }) => {
    await page.goto("/equipo?q=torres");
    await expect(page.getByRole("searchbox", { name: "Buscar abogado o abogada" })).toHaveValue("torres");
    await expect(page.getByRole("status")).toContainText("2 resultados");
  });
});
