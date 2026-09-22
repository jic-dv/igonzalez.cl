import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/lib/site";

// Decision de negocio explicita: los crawlers de IA tienen acceso. El contenido
// del sitio esta pensado para ser citado por buscadores generativos.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
