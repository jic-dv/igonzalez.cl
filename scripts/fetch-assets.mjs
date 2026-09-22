// Descarga los retratos publicados en igonzalez.cl y los normaliza a 1200 px de lado mayor.
// Uso: node scripts/fetch-assets.mjs
import { writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const BASE = "https://www.igonzalez.cl/assets/";
const equipo = {
  "ivan-gonzalez": "ivan_2-DCmEIkPM.jpeg",
  "ivan-gonzalez-hero": "ivan-D6b06lUo.png",
  "rodrigo-alvarez": "rodrigo_alvarez-D3hg-5-v.jpeg",
  "angeles-torres": "angeles_torres-xhyFK780.jpeg",
  "hans-wohlk": "hans_wohlk-fTWUxvTm.jpeg",
  "daniela-pacheco": "daniela_pacheco-CbUcGHn3.jpeg",
  "elizabeth-mella": "elizabeth_mella-DAC_upoB.jpg",
  "nicolas-alonso": "nicolas_alonso-2yX721yA.jpeg",
  "sebastian-jahr": "sebastian_jahr-D463GZZT.jpeg",
  "daniela-prieres": "daniela_prieres-BTURV1Bw.jpg",
  "pablo-bravo": "pablo_bravo-DUW974Qu.jpg",
  "catalina-valdes": "catalina_valdes-DaRlm0qx.jpg",
  "fernanda-lopez": "fernanda_lopez-CoxaHier.jpg",
  "javiera-fuentes": "javiera_fuentes-BTYr8lKz.jpg",
  "valeria-alarcon": "valeria_alarcon-B_S5M508.jpg",
  "katherine-silva": "katherine_silva-BCZZT7_w.jpg",
  "nicolas-carrasco": "nicolas_carrasco-C7l2v63u.jpg",
  "macarena-torres": "macarena_torres-3mPd4kqx.jpg",
  "belen-martinez": "belen_martinez-Cl12f-eS.jpg",
  "marcela-tenorio": "marcela_tenorio-CLHxFPgl.jpg",
  "mayte-vera": "mayte_vera-rDydw-ZN.jpg",
  "gabriel-fica": "gabriel_fica-WGv7Vr_s.jpeg",
  "milena-yaksic": "milena-EJCgkAPr.jpeg",
  "ignacia-caceres": "ignacia_caceres-DSBs6LWz.jpg",
};

await mkdir("public/equipo", { recursive: true });
await mkdir("public/marca", { recursive: true });

for (const [slug, file] of Object.entries(equipo)) {
  const res = await fetch(BASE + file);
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const isPng = file.endsWith(".png");
  const pipeline = sharp(input)
    .rotate()
    .resize({ width: 1200, height: 1600, fit: "inside", withoutEnlargement: true });
  const out = isPng
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(`public/equipo/${slug}.${isPng ? "png" : "jpg"}`, out);
  const meta = await sharp(out).metadata();
  console.log(slug, meta.width, meta.height, Math.round(out.length / 1024) + "KB");
}

const logo = await fetch(BASE + "LOGO%20IG%2026%20COLOR-C4yJ_rDi.png");
const logoBuf = Buffer.from(await logo.arrayBuffer());
await writeFile(
  "public/marca/logo-original.png",
  await sharp(logoBuf).resize({ width: 1600 }).png().toBuffer(),
);
const isotipo = await fetch(BASE + "IG26-BIhQyquY.png");
await writeFile(
  "public/marca/isotipo-original.png",
  await sharp(Buffer.from(await isotipo.arrayBuffer()))
    .resize({ width: 512 })
    .png()
    .toBuffer(),
);
console.log("logo ok");
