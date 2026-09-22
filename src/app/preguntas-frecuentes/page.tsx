import type { Metadata } from "next";
import Reveal from "@/shared/components/core/Reveal";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import CtaFinal from "@/shared/components/layout/CtaFinal";
import Section from "@/shared/components/core/Section";
import Icon from "@/shared/components/core/Icon";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import { faqJsonLd, getFaqs } from "@/features/faq/services/faqs";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Oficina física en Concepción, cómo verificar a un abogado de IGonzalez, reclamos, pagos y horario de atención. Respuestas directas de la oficina.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: { title: "Preguntas frecuentes | IGonzalez Abogados", url: "/preguntas-frecuentes" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
];

// Acordeon nativo con <details>: accesible por teclado sin JavaScript.
export default async function FaqPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const faqs = getFaqs();

  return (
    <>
      <PageHeader
        eyebrow="Preguntas frecuentes"
        title="Lo que nos preguntan antes de empezar."
        lead="Si tu duda no está aquí, escríbenos: te respondemos en horario de oficina."
        breadcrumbs={crumbs}
      />

      <Section labelledBy="faq-title">
        <h2 id="faq-title" className="sr-only">
          Preguntas y respuestas
        </h2>
        <div className="divide-line rounded-card border-line shadow-card mx-auto max-w-3xl divide-y border bg-white">
          {faqs.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.06}>
              <details id={f.id} className="group scroll-mt-24" open={i === 0}>
                <summary className="text-ink flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 text-lg font-bold sm:px-8 [&::-webkit-details-marker]:hidden">
                  <span>{f.question}</span>
                  <span
                    aria-hidden="true"
                    className="bg-paper-2 text-ink duration-fast mt-1 flex size-7 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-45"
                  >
                    <Icon name="close" className="size-4 rotate-45" />
                  </span>
                </summary>
                <div className="text-text flex flex-col gap-4 px-6 pb-6 sm:px-8">
                  {f.answer.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaFinal title="¿Tienes más preguntas? No dudes en contactarnos." />
      <JsonLd nonce={nonce} data={[breadcrumbJsonLd(crumbs), faqJsonLd()]} />
    </>
  );
}
