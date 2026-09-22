import type { Metadata } from "next";
import Reveal from "@/shared/components/core/Reveal";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import Section from "@/shared/components/core/Section";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/shared/lib/json-ld";
import { site, whatsappUrl } from "@/shared/lib/site";
import ContactoForm from "@/features/contacto/components/ContactoForm";

export const metadata: Metadata = {
  title: "Contacto: cuéntanos tu caso",
  description:
    "Escríbenos por WhatsApp, correo o formulario. Un abogado de IGonzalez te responderá a la brevedad. Oficina en Concepción, atención en todo Chile.",
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto | IGonzalez Abogados", url: "/contacto" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Contacto", path: "/contacto" },
];

export default async function ContactoPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Contáctanos"
        title="¿Tienes una consulta o necesitas orientación?"
        lead="Completa el formulario y uno de nuestros abogados te responderá a la brevedad. Si prefieres, escríbenos directo por WhatsApp o correo."
        breadcrumbs={crumbs}
      />

      <Section labelledBy="form-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 id="form-title" className="font-display text-display-sm text-ink font-medium">
              Formulario de contacto
            </h2>
            <p className="text-muted mt-2 mb-8">Los campos marcados con * son obligatorios.</p>
            <ContactoForm />
          </Reveal>

          <aside className="lg:col-span-5" aria-labelledby="directo-title">
            <Reveal delay={0.15}>
              <div className="rounded-card bg-ink text-on-ink shadow-card on-ink p-6 sm:p-8">
                <h2 id="directo-title" className="eyebrow text-amber">
                  Contacto directo
                </h2>
                <ul className="mt-6 flex flex-col gap-5">
                  <li>
                    <AppLink
                      href={whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas")}
                      className="group flex items-start gap-4"
                      title="Abre WhatsApp en una pestaña nueva"
                    >
                      <span className="rounded-control bg-wa flex size-11 shrink-0 items-center justify-center text-white">
                        <Icon name="whatsapp" className="size-5" />
                      </span>
                      <span>
                        <span className="text-on-ink-muted block text-sm">WhatsApp</span>
                        <span className="block font-semibold group-hover:underline">{site.phoneDisplay}</span>
                      </span>
                    </AppLink>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      title="Escribir un correo a la oficina"
                      className="group flex items-start gap-4"
                    >
                      <span className="rounded-control flex size-11 shrink-0 items-center justify-center bg-white/10">
                        <Icon name="mail" className="size-5" />
                      </span>
                      <span>
                        <span className="text-on-ink-muted block text-sm">Correo</span>
                        <span className="block font-semibold group-hover:underline">{site.email}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="rounded-control flex size-11 shrink-0 items-center justify-center bg-white/10">
                      <Icon name="pin" className="size-5" />
                    </span>
                    <span>
                      <span className="text-on-ink-muted block text-sm">Oficina</span>
                      <span className="block font-semibold">{site.address.street}</span>
                      <span className="text-on-ink-muted block">{site.address.city}, Chile</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="rounded-control flex size-11 shrink-0 items-center justify-center bg-white/10">
                      <Icon name="clock" className="size-5" />
                    </span>
                    <span>
                      <span className="text-on-ink-muted block text-sm">Horario</span>
                      <span className="block font-semibold">{site.hours}</span>
                    </span>
                  </li>
                </ul>
                <p className="text-on-ink-muted mt-8 border-t border-white/10 pt-6 text-sm">
                  La mayor parte de la atención es remota. Si estás en Concepción, también puedes visitarnos.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
      <JsonLd nonce={nonce} data={[breadcrumbJsonLd(crumbs), contactPageJsonLd("/contacto")]} />
    </>
  );
}
