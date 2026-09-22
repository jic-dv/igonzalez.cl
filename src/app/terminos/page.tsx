import type { Metadata } from "next";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import LegalDocument from "@/features/legal/components/LegalDocument";
import { terminos } from "@/features/legal/data/terminos";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio igonzalez.cl: alcance de la información, relación cliente-abogado, propiedad intelectual, pagos y ley aplicable.",
  alternates: { canonical: "/terminos" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Términos y condiciones", path: "/terminos" },
];

export default async function TerminosPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader eyebrow="Legal" title="Términos y condiciones" breadcrumbs={crumbs} />
      <LegalDocument doc={terminos} />
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
