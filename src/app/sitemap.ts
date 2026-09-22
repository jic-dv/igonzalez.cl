import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/lib/site";
import { getLawyers } from "@/features/equipo/services/team";

// lastModified real: fecha del ultimo cambio de contenido de cada ruta.
// Se actualiza a mano cuando cambia el contenido, no en cada build.
const routes: {
  path: string;
  lastModified: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", lastModified: "2026-09-16", priority: 1, changeFrequency: "weekly" },
  { path: "/ivan-gonzalez", lastModified: "2026-09-22", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros", lastModified: "2026-09-16", priority: 0.8, changeFrequency: "monthly" },
  { path: "/equipo", lastModified: "2026-09-16", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto", lastModified: "2026-09-16", priority: 0.9, changeFrequency: "yearly" },
  { path: "/preguntas-frecuentes", lastModified: "2026-09-16", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reclamos-y-sugerencias", lastModified: "2026-09-16", priority: 0.4, changeFrequency: "yearly" },
  { path: "/trabaja-con-nosotros", lastModified: "2026-09-16", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacidad", lastModified: "2026-09-16", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terminos", lastModified: "2026-09-16", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", lastModified: "2026-09-16", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const teamImages = (await getLawyers()).filter((m) => m.photo).map((m) => absoluteUrl(m.photo as string));

  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: new Date(r.lastModified),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    ...(r.path === "/equipo" ? { images: teamImages } : {}),
  }));
}
