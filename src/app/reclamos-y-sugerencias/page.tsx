import type { Metadata } from "next";
import Reveal from "@/shared/components/core/Reveal";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import Section from "@/shared/components/core/Section";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import { site } from "@/shared/lib/site";
import ReclamoForm from "@/features/contacto/components/ReclamoForm";

export const metadata: Metadata = {
  title: "Reclamos y sugerencias",
  description:
    "Tu opinión nos importa. Envía tu reclamo o sugerencia por formulario o al correo sac@igonzalez.cl: lo revisa el Jefe de Servicio de Atención al Cliente.",
  alternates: { canonical: "/reclamos-y-sugerencias" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Reclamos y sugerencias", path: "/reclamos-y-sugerencias" },
];

export default async function ReclamosPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Atención al cliente"
        title="Tu opinión nos importa."
        lead="En nuestro compromiso por ofrecerte el mejor servicio valoramos tus opiniones. Si tienes un reclamo o una sugerencia, compártela con nosotros."
        breadcrumbs={crumbs}
      />
      <Section labelledBy="reclamo-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 id="reclamo-title" className="font-display text-display-sm text-ink font-medium">
              Formulario de reclamos y sugerencias
            </h2>
            <p className="text-muted mt-2 mb-8">
              También puedes escribirnos a{" "}
              <a
                href={`mailto:${site.sacEmail}`}
                title="Escribir al servicio de atención al cliente"
                className="text-brand font-semibold underline-offset-4 hover:underline"
              >
                {site.sacEmail}
              </a>
              .
            </p>
            <ReclamoForm />
          </Reveal>
          <aside className="lg:col-span-5" aria-labelledby="protocolo-title">
            <Reveal delay={0.15}>
              <div className="rounded-card border-line shadow-card border bg-white p-6 sm:p-8">
                <h2 id="protocolo-title" className="eyebrow text-muted">
                  Qué pasa con tu reclamo
                </h2>
                <ol className="mt-6 flex flex-col gap-5">
                  {[
                    "Lo recibe y responde el Jefe de Servicio de Atención al Cliente.",
                    "Aplicamos protocolos de atención para corregir el inconveniente en el menor tiempo posible.",
                    "Si el problema persiste, se presenta en la reunión quincenal de Jefes de Área con el Gerente General.",
                  ].map((t, i) => (
                    <li key={t} className="flex gap-4">
                      <span
                        className="font-display text-display-sm text-amber-deep font-medium tabular-nums"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <p className="text-text pt-1">{t}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
