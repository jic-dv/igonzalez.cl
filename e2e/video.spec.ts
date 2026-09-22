import { expect, test } from "@playwright/test";

test.describe("Video de la historia", () => {
  test("la fachada muestra el poster y el reproductor se carga solo al pulsar", async ({ page }) => {
    const scripts: string[] = [];
    page.on("response", (r) => {
      if (r.request().resourceType() === "script") scripts.push(r.url());
    });
    await page.goto("/");
    await expect(page.locator("media-controller")).toHaveCount(0);
    const before = scripts.length;

    const play = page.getByRole("button", { name: /Reproducir video/ });
    await play.scrollIntoViewIfNeeded();
    await expect(play.locator("img")).toHaveAttribute("src", /res\.cloudinary\.com|_next\/image/);
    await play.click();

    await expect(page.locator("media-controller")).toHaveCount(1, { timeout: 15000 });
    expect(scripts.length).toBeGreaterThan(before);
    const video = page.locator("media-controller video");
    await expect(video).toHaveAttribute("src", /res\.cloudinary\.com.*\.mp4$/);
    await expect(page.locator("media-play-button")).toBeVisible();
  });

  test("la anecdota completa esta en el HTML servido", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain("más de 450.000 seguidores");
    expect(html).toContain("Así nació nuestra oficina de abogados");
  });
});
