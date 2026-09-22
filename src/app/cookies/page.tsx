import type { Metadata } from "next";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import LegalDocument from "@/features/legal/components/LegalDocument";
import { cookies } from "@/features/legal/data/cookies";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies usa igonzalez.cl y por qué. El sitio no usa cookies de seguimiento ni publicitarias.",
  alternates: { canonical: "/cookies" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Política de cookies", path: "/cookies" },
];

export default async function CookiesPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader eyebrow="Legal" title="Política de cookies" breadcrumbs={crumbs} />
      <LegalDocument doc={cookies} />
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
