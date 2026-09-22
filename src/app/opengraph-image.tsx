import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "IGonzalez, abogados especialistas en deudas en Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen OG generada con datos reales del sitio y la fuente de display.
export default async function OpenGraphImage() {
  const [serif, photo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/SourceSerif4Display-Semibold.ttf")),
    readFile(join(process.cwd(), "public/equipo/ivan-gonzalez-og.jpg")),
  ]);
  // Copia JPEG a proposito: Satori no decodifica WebP y no avisa, simplemente deja el hueco
  // vacio. El tipo del data URI tambien tiene que coincidir con el archivo real.
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#06094e",
        color: "#f9fafd",
        fontFamily: "Source Serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          width: 720,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#ffb330",
            textTransform: "uppercase",
          }}
        >
          Abogados especialistas en deudas
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, letterSpacing: -3 }}>Eliminamos</div>
          <div
            style={{ display: "flex", fontSize: 92, lineHeight: 1, letterSpacing: -3, position: "relative" }}
          >
            tus deudas.
            <div
              style={{
                position: "absolute",
                left: 132,
                top: 50,
                width: 335,
                height: 10,
                background: "#ffb330",
                borderRadius: 6,
                transform: "rotate(-2deg)",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b5bed2" }}>
          <span>igonzalez.cl</span>
          <span>Concepción · Chile</span>
        </div>
      </div>
      <div style={{ display: "flex", width: 480, height: "100%", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- satori solo renderiza <img> */}
        <img
          src={photoSrc}
          alt="Iván González Navarrete, abogado y fundador de IGonzalez"
          width={480}
          height={630}
          style={{ objectFit: "cover", objectPosition: "60% center" }}
        />
      </div>
    </div>,
    { ...size, fonts: [{ name: "Source Serif", data: serif, weight: 600, style: "normal" }] },
  );
}
