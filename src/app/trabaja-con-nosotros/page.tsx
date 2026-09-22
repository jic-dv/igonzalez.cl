import type { Metadata } from "next";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import Section from "@/shared/components/core/Section";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import PostulacionForm from "@/features/contacto/components/PostulacionForm";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description:
    "Postula como abogado/a o procurador/a en IGonzalez, oficina de abogados especialistas en deudas con sede en Concepción. Envía tu CV por el formulario.",
  alternates: { canonical: "/trabaja-con-nosotros" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Trabaja con nosotros", path: "/trabaja-con-nosotros" },
];

export default async function PostulacionPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Trabaja con nosotros"
        title="Buscamos personas con ganas de ayudar."
        lead="Abogados, abogadas y procuradores que compartan nuestros valores: cercanía, claridad y cliente informado."
        breadcrumbs={crumbs}
      />
      <Section labelledBy="postulacion-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="postulacion-title" className="font-display text-display-sm text-ink font-medium">
            Formulario de postulación
          </h2>
          <p className="text-muted mt-2 mb-8">Los campos marcados con * son obligatorios.</p>
          <PostulacionForm />
        </div>
      </Section>
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
