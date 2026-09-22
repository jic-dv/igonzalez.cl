import type { Metadata } from "next";
import Reveal from "@/shared/components/core/Reveal";
import { headers } from "next/headers";
import PageHeader from "@/shared/components/layout/PageHeader";
import CtaFinal from "@/shared/components/layout/CtaFinal";
import Section from "@/shared/components/core/Section";
import Media from "@/shared/components/core/Media";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { breadcrumbJsonLd } from "@/shared/lib/json-ld";
import { historia, manifiesto } from "@/features/inicio/data/textos";
import { getFounders } from "@/features/equipo/services/team";
import { site } from "@/shared/lib/site";

export const metadata: Metadata = {
  title: "Nosotros: la historia de IGonzalez Abogados",
  description:
    "IGonzalez nació en 2020 a partir de un video en redes sociales. Hoy es una oficina de abogados especialistas en deudas con sede en Concepción y atención en todo Chile.",
  alternates: { canonical: "/nosotros" },
  openGraph: { title: "Nosotros | IGonzalez Abogados", url: "/nosotros" },
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/nosotros" },
];

export default async function NosotrosPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const founders = getFounders();

  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="De un primer video a una oficina de más de 25 abogados."
        lead="Una historia que empezó en redes sociales y que hoy es una sociedad con un foco: la atención al cliente."
        breadcrumbs={crumbs}
      />

      <Section labelledBy="historia-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-amber-deep">Historia completa</p>
            <h2
              id="historia-title"
              className="font-display text-display-md text-ink mt-4 font-medium text-balance"
            >
              Emparejar la cancha y entregar tranquilidad.
            </h2>
            <div className="text-lead text-text mt-8 flex flex-col gap-5">
              {historia.parrafos.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <aside className="lg:col-span-5" aria-labelledby="socios-title">
            <Reveal delay={0.15}>
              <div className="rounded-card border-line shadow-card border bg-white p-6 sm:p-8">
                <h2 id="socios-title" className="eyebrow text-muted">
                  Socios fundadores
                </h2>
                {/* La foto de los dos socios encabeza su propia tarjeta, que es donde aporta y
                    donde no interrumpe la lectura de la historia. Va con width y height reales,
                    sin recorte: asi no hay factor de ampliacion y sizes es el ancho de la caja. */}
                <figure className="mt-5">
                  <Media
                    src="/fundadores/fundadores.webp"
                    alt="Iván González Navarrete y Mauricio Acuña Agost, socios fundadores de IGonzalez"
                    width={626}
                    height={540}
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 32rem, 84vw"
                    className="rounded-control h-auto w-full"
                  />
                </figure>
                <ul className="mt-6 flex flex-col gap-6">
                  {founders.map((f) => (
                    <li key={f.slug} className="flex items-center gap-4">
                      <div className="rounded-control bg-ink-2 relative size-16 shrink-0 overflow-hidden">
                        {f.photo ? (
                          // El retrato de Ivan es apaisado y la caja cuadrada: object-cover lo
                          // amplia ~1,5 veces el lado, asi que sizes declara 96px y no 64.
                          <Media
                            src={f.photo}
                            alt={`${f.name}, socio fundador de IGonzalez`}
                            fill
                            sizes="96px"
                            quality={90}
                            className="object-[60%_20%]"
                          />
                        ) : (
                          <span
                            className="font-display text-amber absolute inset-0 flex items-center justify-center text-xl"
                            aria-hidden="true"
                          >
                            {f.firstName[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-ink font-bold">{f.name}</p>
                        <p className="text-muted text-sm">
                          {f.slug === "mauricio-acuna"
                            ? "Ingeniero comercial, socio fundador"
                            : "Abogado, socio fundador"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-line mt-8 grid gap-4 border-t pt-6 text-sm">
                  <div>
                    <dt className="text-muted">Sociedad</dt>
                    <dd className="text-ink font-semibold">
                      {site.legalName} · RUT {site.rut}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Oficina</dt>
                    <dd className="text-ink font-semibold">
                      {site.address.street}, {site.address.city}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Comunidad</dt>
                    <dd className="text-ink font-semibold">
                      Más de un millón de personas en Instagram y TikTok
                    </dd>
                  </div>
                </dl>
                <AppLink
                  href="/equipo"
                  asButton
                  variant="ink"
                  className="mt-8 w-full"
                  title="Ver el listado completo de abogados"
                >
                  Ver a todo el equipo
                  <Icon name="arrow-right" className="size-4" />
                </AppLink>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section labelledBy="filosofia-title" tone="paper-2">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-amber-deep">Nuestra filosofía</p>
          <h2
            id="filosofia-title"
            className="font-display text-display-md text-ink mt-4 font-medium text-balance"
          >
            Que nadie se sienta abandonado ni ignorado.
          </h2>
          <blockquote className="border-amber mt-8 border-l-4 pl-6 sm:pl-8">
            <div className="text-lead text-text flex flex-col gap-5">
              {manifiesto.parrafos.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <p className="font-display text-display-sm text-ink font-medium">{manifiesto.cierre}</p>
            </div>
            <footer className="text-muted mt-6">
              <cite className="not-italic">Iván González Navarrete, fundador</cite>
            </footer>
          </blockquote>
        </div>
      </Section>

      <CtaFinal />
      <JsonLd nonce={nonce} data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
