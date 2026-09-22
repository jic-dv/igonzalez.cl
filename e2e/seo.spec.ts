import { expect, test } from "@playwright/test";

// El contenido debe venir en el HTML servido: sin JavaScript, Google y los
// fetchers de IA deben ver lo mismo que una persona.
test.describe("SEO y renderizado en servidor", () => {
  test("el HTML inicial del home trae h1, texto y JSON-LD", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('<html lang="es-CL"');
    expect(html).toMatch(/<h1[^>]*>[\s\S]*Eliminamos tus[\s\S]*deudas/);
    expect(html).toContain("Deudas de impuestos");
    expect(html).toContain("Rodrigo Álvarez");
    expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.igonzalez\.cl\/?"/);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('"@type":"LegalService"');
  });

  test("cada pagina publica tiene un solo h1 y metadata unica", async ({ page }) => {
    const seen = new Set<string>();
    for (const path of [
      "/",
      "/nosotros",
      "/equipo",
      "/contacto",
      "/preguntas-frecuentes",
      "/trabaja-con-nosotros",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(title.length).toBeGreaterThan(20);
      expect(description?.length ?? 0).toBeGreaterThan(80);
      expect(seen.has(title)).toBe(false);
      seen.add(title);
    }
  });

  test("todo JSON-LD del sitio es JSON valido con @type", async ({ page }) => {
    for (const path of ["/", "/ivan-gonzalez", "/equipo", "/preguntas-frecuentes"]) {
      await page.goto(path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.length).toBeGreaterThan(0);
      for (const b of blocks) {
        const data = JSON.parse(b);
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) expect(item["@type"]).toBeTruthy();
      }
    }
  });

  test("la pagina del fundador declara la entidad Person con sus variantes de nombre", async ({ page }) => {
    await page.goto("/ivan-gonzalez");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = blocks.flatMap((b) => {
      const data = JSON.parse(b);
      return Array.isArray(data) ? data : [data];
    });
    const person = nodes.find((n) => n["@type"] === "Person");
    expect(person).toBeTruthy();
    expect(person.name).toBe("Iván González Navarrete");
    // Las variantes sin tilde y el apellido mal escrito son busquedas reales
    expect(person.alternateName).toEqual(
      expect.arrayContaining(["Ivan Gonzalez", "Ivan Gonzales", "El abogado de TikTok"]),
    );
    expect(person.sameAs.length).toBeGreaterThan(2);
    expect(nodes.some((n) => n["@type"] === "ProfilePage")).toBe(true);
    // La oficina referencia al fundador con el mismo @id en todo el sitio
    await page.goto("/");
    const home = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(home.join(" ")).toContain("/ivan-gonzalez#person");
  });

  // Satori no decodifica WebP y no falla: deja el hueco vacio. Con la foto ausente la
  // tarjeta queda de un solo color, asi que se comprueba que la mitad derecha tenga imagen.
  test("la tarjeta OG lleva la foto, no solo el fondo", async ({ page, request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.headers()["content-type"]).toContain("image/png");
    const base64 = Buffer.from(await res.body()).toString("base64");
    const colores = await page.evaluate(async (datos) => {
      const img = new Image();
      img.src = `data:image/png;base64,${datos}`;
      await img.decode();
      const lienzo = document.createElement("canvas");
      lienzo.width = img.naturalWidth;
      lienzo.height = img.naturalHeight;
      const ctx = lienzo.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      // Franja vertical dentro del panel de la foto
      const vistos = new Set<string>();
      for (let y = 40; y < lienzo.height - 40; y += 20) {
        const [r, g, b] = ctx.getImageData(Math.round(lienzo.width * 0.8), y, 1, 1).data;
        vistos.add(`${r},${g},${b}`);
      }
      return vistos.size;
    }, base64);
    // Un panel vacio da un solo color; una fotografia da muchos
    expect(colores).toBeGreaterThan(8);
  });

  test("sitemap, robots y redirecciones del sitio anterior", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("https://www.igonzalez.cl/equipo");
    expect(sitemap).toContain("https://www.igonzalez.cl/ivan-gonzalez");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://www.igonzalez.cl/sitemap.xml");
    expect(robots).toContain("GPTBot");
    const redirects: [string, string][] = [
      ["/about", "/nosotros"],
      ["/faq", "/preguntas-frecuentes"],
      ["/postulacion", "/trabaja-con-nosotros"],
    ];
    for (const [from, to] of redirects) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers().location).toContain(to);
    }
  });
});
