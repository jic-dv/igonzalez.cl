import { expect, test, type Page } from "@playwright/test";

// El formulario valida en el navegador con react-hook-form (reglas de
// features/contacto/validation/rules.ts) y despues en el servidor con las mismas reglas.
async function fillValid(page: Page, { email = "camila@example.cl", celular = "9 1234 5678" } = {}) {
  await page.getByLabel("Nombre", { exact: false }).first().fill("Camila");
  await page.getByLabel(/^Apellido/).fill("Rojas");
  await page.getByLabel(/^Correo electrónico/).fill(email);
  await page.getByLabel(/^Celular/).fill(celular);
  await page.getByLabel(/^Tipo de deudor/).selectOption("persona");
  await page.locator("#mensaje").fill("Tengo deudas con dos bancos desde 2021 y no puedo pagarlas.");
  await page.getByRole("checkbox", { name: /Autorizo a IGonzalez/ }).check();
}

test.describe("Formulario de contacto", () => {
  test("envio valido muestra confirmacion y ofrece volver al inicio o escribir de nuevo", async ({
    page,
  }) => {
    await page.goto("/contacto");
    await fillValid(page);
    // Tiempo minimo de llenado anti-bot: el servidor ignora envios en menos de 3 s
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(page.getByRole("status")).toContainText("Mensaje enviado");
    await expect(page.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");

    await page.getByRole("button", { name: "Enviar otro mensaje" }).click();
    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(page.getByLabel("Nombre", { exact: false }).first()).toHaveValue("");
  });

  test("un envio vacio muestra los mensajes en español y marca los campos", async ({ page }) => {
    await page.goto("/contacto");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText("Escribe tu nombre")).toBeVisible();
    await expect(page.getByText("Escribe tu correo electrónico")).toBeVisible();
    await expect(page.getByLabel("Nombre", { exact: false }).first()).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("el numero se valida contra el pais elegido", async ({ page }) => {
    await page.goto("/contacto");
    const pais = page.getByLabel("País del número de teléfono");
    await expect(pais).toHaveValue("CL");

    // Panama son 8 digitos: un numero chileno de 9 deja de ser valido al cambiar de pais
    await page.getByLabel(/^Celular/).fill("912345678");
    await pais.selectOption("PA");
    await expect(page.getByLabel(/^Celular/)).toHaveAttribute("placeholder", "6123 4567");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(page.getByText(/El número de Panamá tiene 8 dígitos/)).toBeVisible();

    await pais.selectOption("CL");
    await page.getByLabel(/^Celular/).fill("912345678");
    await expect(page.getByText(/El número de Panamá tiene 8 dígitos/)).toHaveCount(0);
  });

  test("el monto se escribe con separadores de miles y rechaza cifras irreales", async ({ page }) => {
    await page.goto("/contacto");
    const monto = page.getByLabel(/^Monto aproximado/);
    await monto.fill("1500000");
    await expect(monto).toHaveValue("1.500.000");
    // Escribir letras o puntos no ensucia el valor
    await monto.fill("abc25.000def");
    await expect(monto).toHaveValue("25.000");

    await monto.fill("500");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(page.getByText(/El monto mínimo es/)).toBeVisible();
  });

  test("rechaza datos que no parecen reales antes de enviarlos", async ({ page }) => {
    await page.goto("/contacto");
    await fillValid(page, { email: "camila@ejemplo" });
    await page.getByLabel(/^Apellido/).fill("aaaaaa");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText(/correo válido/)).toBeVisible();
    await expect(page.getByText(/no parece real/)).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });
});
