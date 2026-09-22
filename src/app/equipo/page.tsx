import type { Metadata } from "next";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import CtaFinal from "@/shared/components/layout/CtaFinal";
import Section from "@/shared/components/core/Section";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd, organizationRef } from "@/shared/lib/json-ld";
import { absoluteUrl } from "@/shared/lib/site";
import TeamSearch from "@/features/equipo/components/TeamSearch";
import { getLawyers, toPublicMember } from "@/features/equipo/services/team";

export const metadata: Metadata = {
  title: "Equipo de abogados de IGonzalez",
  description:
    "Conoce a los abogados y abogadas de IGonzalez. Cada profesional tiene su WhatsApp publicado: sabes quién lleva tu caso y cómo contactarle.",
  alternates: { canonical: "/equipo" },
  openGraph: { title: "Equipo de abogados | IGonzalez", url: "/equipo" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Equipo", path: "/equipo" },
];

type PageProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function EquipoPage({ searchParams }: PageProps) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const lawyers = await getLawyers();
  const { q } = await searchParams;
  // Entrada externa: se acota a un string corto antes de usarla
  const initialQuery = (Array.isArray(q) ? q[0] : q)?.slice(0, 60) ?? "";

  const peopleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Equipo de abogados de IGonzalez",
    numberOfItems: lawyers.length,
    itemListElement: lawyers.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        worksFor: organizationRef(),
        ...(m.photo ? { image: absoluteUrl(m.photo) } : {}),
      },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="Nuestro equipo"
        title={`${lawyers.length} abogados que te atienden por su nombre.`}
        lead="Todos los profesionales de la oficina están aquí, con su contacto directo. Si el abogado que te contactó no aparece en esta lista, confírmalo con Rodrigo Álvarez antes de continuar."
        breadcrumbs={crumbs}
      />

      <Section labelledBy="listado-title" width="wide">
        <h2 id="listado-title" className="sr-only">
          Listado de abogados y abogadas
        </h2>
        <TeamSearch members={lawyers.map(toPublicMember)} initialQuery={initialQuery} />
      </Section>

      <CtaFinal
        title="¿No sabes con quién hablar? Empieza por el WhatsApp de la oficina."
        text="Te derivamos con el abogado que corresponda según tu tipo de deuda y tu ciudad."
      />
      <JsonLd nonce={nonce} data={[breadcrumbJsonLd(crumbs), peopleJsonLd]} />
    </>
  );
}
