import type { NextConfig } from "next";

// La CSP se emite por request en src/proxy.ts porque necesita un nonce.
// El resto de cabeceras son estaticas y viven aqui.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 exige lista blanca. 75 es el resto del sitio; 90 solo para los retratos de
    // Ivan, donde el rostro es el foco y a 75 se notaban artefactos en el traje.
    qualities: [75, 90],
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920, 2560],
    // Poster del video alojado en Cloudinary (frame generado por la CDN)
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/da4bpuks4/video/upload/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // Rutas del sitio anterior (SPA). Se conservan como 308 para no perder enlaces externos.
  async redirects() {
    return [
      { source: "/about", destination: "/nosotros", permanent: true },
      { source: "/faq", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/reclamos", destination: "/reclamos-y-sugerencias", permanent: true },
      { source: "/postulacion", destination: "/trabaja-con-nosotros", permanent: true },
    ];
  },
};

export default nextConfig;
