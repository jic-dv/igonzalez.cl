import { NextResponse, type NextRequest } from "next/server";

// Genera un nonce por request y emite la CSP. Next.js lo aplica automaticamente
// a sus scripts; los <script> propios (JSON-LD) lo leen desde la cabecera x-nonce.
//
// style-src permite 'unsafe-inline' de forma deliberada: next/image y los retrasos
// de animacion emiten atributos style= en el HTML, que no pueden llevar nonce.
// La inyeccion de estilos no ejecuta codigo; script-src se mantiene estricto.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://res.cloudinary.com",
    "media-src 'self' https://res.cloudinary.com",
    "font-src 'self'",
    "connect-src 'self' https://va.vercel-scripts.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon|apple-touch-icon|android-chrome|site.webmanifest|equipo/|marca/|robots.txt|sitemap.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
