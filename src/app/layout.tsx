import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/shared/lib/site";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/shared/lib/json-ld";
import SiteHeader from "@/shared/components/layout/SiteHeader";
import SiteFooter from "@/shared/components/layout/SiteFooter";
import SkipLink from "@/shared/components/layout/SkipLink";
import FloatingActions from "@/shared/components/layout/FloatingActions";
import MotionProvider from "@/shared/components/core/MotionProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "IGonzalez | Abogados especialistas en deudas en Chile",
    template: "%s | IGonzalez Abogados",
  },
  description:
    "Eliminamos deudas fiscales y comerciales mediante prescripción, abandono del procedimiento y procedimientos concursales. Más de 25 abogados en Chile, atención por WhatsApp.",
  applicationName: site.name,
  // Variantes reales con que se busca la oficina y a su fundador
  keywords: [
    "abogados especialistas en deudas",
    "eliminar deudas Chile",
    "prescripción de deudas",
    "abogado deudas Chile",
    "Iván González abogado",
    "abogado de TikTok",
    "abogado TikTok Chile",
    "IGonzalez abogados",
    "deudas Tesorería General de la República",
    "quiebra personal Chile",
    "abogados Concepción",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: true, email: true, address: true },
  // Favicons e iconos entregados por el cliente (public/)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: site.social.instagram.handle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#06094e",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang={site.lang} className={`${jakarta.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions />
        </MotionProvider>
        <JsonLd nonce={nonce} data={[organizationJsonLd(), websiteJsonLd()]} />
        {process.env.VERCEL === "1" ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
