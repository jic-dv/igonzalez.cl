import { cartaIvan, historia, videoHistoria } from "@/features/inicio/data/textos";
import { getServices } from "@/features/servicios/services/services";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { JsonLd } from "@/shared/components/core/JsonLd";
import Media from "@/shared/components/core/Media";
import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";
import VideoPlayer from "@/shared/components/core/VideoPlayer";
import CtaFinal from "@/shared/components/layout/CtaFinal";
import PageHeader from "@/shared/components/layout/PageHeader";
import { breadcrumbJsonLd, founderJsonLd, profilePageJsonLd } from "@/shared/lib/json-ld";
import { absoluteUrl, site, whatsappUrl } from "@/shared/lib/site";
import type { Metadata } from "next";
import { headers } from "next/headers";

const PHOTO = "/equipo/ivan-gonzalez.webp";

export const metadata: Metadata = {
  title: "Iván González Navarrete, abogado especialista en deudas",
  description:
    "Iván González Navarrete, el abogado que explica las deudas en TikTok. Fundador de IGonzalez y ex abogado de la Tesorería General de la República, especialista en eliminar deudas fiscales y comerciales en Chile.",
  alternates: { canonical: site.founder.path },
  keywords: [
    "Iván González abogado",
    "Ivan Gonzalez Navarrete",
    "abogado Iván González",
    "Iván González deudas",
    "abogado IGonzalez",
    "abogado de TikTok",
    "el abogado de TikTok",
    "abogado TikTok deudas",
  ],
  openGraph: {
    type: "profile",
    title: "Iván González Navarrete, abogado especialista en deudas",
    description:
      "Abogado y fundador de IGonzalez. Ex abogado de la Tesorería General de la República, especialista en deudas fiscales y comerciales.",
    url: site.founder.path,
  },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Iván González Navarrete", path: site.founder.path },
];

export default async function IvanGonzalezPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const services = getServices();

  return (
    <>
      <PageHeader
        eyebrow="Abogado y fundador"
        title="Iván González Navarrete"
        lead="Abogado chileno especialista en deudas. Mucha gente me conoce por mis videos de TikTok: ahí explico lo que nadie te cuenta sobre las cobranzas. Empecé en la Tesorería General de la República y hoy dirijo una oficina de más de 25 abogados."
        breadcrumbs={crumbs}
      />

      <Section labelledBy="perfil-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="fade" className="lg:sticky lg:top-28">
              <div className="rounded-card shadow-card relative aspect-[4/5] overflow-hidden">
                {/* Foto apaisada (1524x1032) recortada a 4/5: para cubrir el alto hace falta
                ~1,85 veces el ancho de la caja, y sizes tiene que declararlo o el navegador
                baja una version pequena que al ampliarse se ve borrosa. */}
                <Media
                  src={PHOTO}
                  alt="Retrato de Iván González Navarrete, abogado y fundador de IGonzalez"
                  fill
                  preload
                  quality={90}
                  sizes="(min-width: 1024px) 70vw, 185vw"
                  className="object-[60%_center]"
                />
              </div>
              <dl className="border-line mt-6 flex flex-col gap-4 border-t pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Profesión</dt>
                  <dd className="text-ink font-semibold">Abogado</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Especialidad</dt>
                  <dd className="text-ink text-right font-semibold">Deudas fiscales y comerciales</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Oficina</dt>
                  <dd className="text-ink text-right font-semibold">
                    {site.address.city}, atención en todo Chile
                  </dd>
                </div>
              </dl>
              <AppLink
                href={whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas")}
                asButton
                variant="whatsapp"
                className="mt-6 w-full"
                title="Escribir a la oficina de Iván González por WhatsApp"
              >
                <Icon name="whatsapp" className="size-5" />
                Consultar mi caso
              </AppLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="perfil-title"
                className="font-display text-display-md text-ink font-medium text-balance"
              >
                Quince años defendiendo a quienes no pueden pagar.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-lead text-text mt-8 flex flex-col gap-5">
                {cartaIvan.parrafos.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="font-display text-display-sm text-ink mt-12 font-medium">
                Cómo nació la oficina
              </h2>
              <div className="text-text mt-5 flex flex-col gap-4">
                {historia.parrafos.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-display text-display-sm text-ink mt-12 font-medium">
                En qué te puede ayudar
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {services.map((s) => (
                  <li key={s.slug} className="rounded-card border-line border bg-white p-5">
                    <h3 className="text-ink font-bold">{s.title}</h3>
                    <p className="text-muted mt-2 text-sm">{s.summary}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-display text-display-sm text-ink mt-12 font-medium">Dónde encontrarlo</h2>
              <p className="text-muted mt-3">
                Si llegaste aquí buscando al abogado de TikTok, es él. Iván comparte a diario consejos sobre
                deudas en sus redes, donde lo sigue una comunidad de más de un millón de personas.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <AppLink
                  href={site.social.tiktok.url}
                  asButton
                  variant="outline"
                  title={`TikTok de Iván González ${site.social.tiktok.handle}`}
                >
                  <Icon name="tiktok" className="size-4" />
                  {site.social.tiktok.handle}
                </AppLink>
                <AppLink
                  href={site.social.instagram.url}
                  asButton
                  variant="outline"
                  title={`Instagram de Iván González ${site.social.instagram.handle}`}
                >
                  <Icon name="instagram" className="size-4" />
                  {site.social.instagram.handle}
                </AppLink>
                <AppLink
                  href={site.social.facebook.url}
                  asButton
                  variant="outline"
                  title={`Facebook de Iván González ${site.social.facebook.handle}`}
                >
                  <Icon name="facebook" className="size-4" />
                  {site.social.facebook.handle}
                </AppLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="video-title" tone="paper-2">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <VideoPlayer
                src={videoHistoria.src}
                poster={videoHistoria.poster}
                width={videoHistoria.width}
                height={videoHistoria.height}
                title={videoHistoria.title}
                className="mx-auto w-full max-w-[20rem]"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="video-title" className="font-display text-display-md text-ink font-medium text-balance">
                Escúchalo en sus palabras.
              </h2>
              <p className="text-lead text-muted mt-5">
                El video con el que Iván cuenta por qué decidió compartir lo que sabe sobre deudas en redes
                sociales, y cómo eso terminó en una oficina de abogados.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaFinal
        title="¿Tienes deudas? Cuéntame tu caso."
        text="Escríbenos por WhatsApp y un abogado del equipo revisará tu situación."
      />
      <JsonLd
        nonce={nonce}
        data={[
          breadcrumbJsonLd(crumbs),
          founderJsonLd(absoluteUrl(PHOTO)),
          profilePageJsonLd(site.founder.path),
        ]}
      />
    </>
  );
}
