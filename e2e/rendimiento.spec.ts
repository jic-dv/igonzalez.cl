import { expect, test } from "@playwright/test";

// CLS y LCP en laboratorio, sin throttling: una alerta temprana, no la medicion de campo.
test.describe("Web Vitals de laboratorio", () => {
  test("home: CLS bajo 0.05 y la imagen LCP se sirve con prioridad", async ({ page }) => {
    await page.goto("/");
    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          type Shift = PerformanceEntry & { hadRecentInput: boolean; value: number };
          new PerformanceObserver((list) => {
            for (const e of list.getEntries() as Shift[]) if (!e.hadRecentInput) total += e.value;
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve(total), 1500);
        }),
    );
    expect(cls).toBeLessThan(0.05);
    const hero = page.locator("img[fetchpriority=high]").first();
    await expect(hero).toHaveCount(1);
    await expect(hero).toHaveAttribute("alt", /Iván González/);
  });

  // El recorte del fundador va sobre el degradado del hero: si un reexport pierde el canal
  // alfa, aparece como un bloque negro rectangular. Se comprueba la imagen ya decodificada,
  // asi cubre el archivo de origen y tambien la conversion del optimizador.
  test("el recorte del hero conserva la transparencia", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("img[fetchpriority=high]").first();
    await expect(hero).toHaveAttribute("alt", /Iván González/);
    const esquinas = await hero.evaluate(async (el) => {
      const img = el as HTMLImageElement;
      await img.decode();
      const lienzo = document.createElement("canvas");
      lienzo.width = img.naturalWidth;
      lienzo.height = img.naturalHeight;
      const ctx = lienzo.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const { width: w, height: h } = lienzo;
      return [
        [0, 0],
        [w - 1, 0],
        [0, h - 1],
      ].map(([x, y]) => ctx.getImageData(x, y, 1, 1).data[3]);
    });
    // Las tres esquinas superiores y la inferior izquierda quedan fuera de la silueta
    expect(esquinas).toEqual([0, 0, 0]);
  });

  test("las imagenes del equipo se sirven como AVIF o WebP", async ({ page }) => {
    await page.goto("/equipo");
    const first = page.locator("main img").first();
    const src = await first.getAttribute("src");
    expect(src).toContain("/_next/image");
    const res = await page.request.get(src as string, { headers: { Accept: "image/avif,image/webp,*/*" } });
    expect(res.headers()["content-type"]).toMatch(/image\/(avif|webp)/);
  });
});
