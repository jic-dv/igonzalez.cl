import type { Metadata } from "next";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import LegalDocument from "@/features/legal/components/LegalDocument";
import { privacidad } from "@/features/legal/data/privacidad";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos personales recoge IGonzalez.cl, con qué finalidad, cuánto tiempo los conserva, con quién los comparte y cómo ejercer tus derechos según la Ley 21.719.",
  alternates: { canonical: "/privacidad" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Política de privacidad", path: "/privacidad" },
];

export default async function PrivacidadPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader eyebrow="Legal" title="Política de privacidad" breadcrumbs={crumbs} />
      <LegalDocument doc={privacidad} />
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
