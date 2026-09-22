import { cifras } from "@/features/inicio/data/textos";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import Media from "@/shared/components/core/Media";
import Reveal from "@/shared/components/core/Reveal";
import Strike from "@/shared/components/core/Strike";
import { site, whatsappUrl } from "@/shared/lib/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-ink bg-ink text-on-ink relative overflow-hidden">
      {/* Trama de fondo: lineas horizontales tenues, eco del motivo de tachado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_47px,oklch(1_0_0/0.035)_47px_48px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.45_0.19_268/0.55),transparent)]"
      />

      <div className="max-w-wide relative mx-auto px-4 pt-28 sm:px-6 lg:min-h-[46rem] lg:px-8 lg:pt-40">
        <div className="relative z-10 max-w-2xl pb-2 lg:w-[54%] lg:pb-20">
          <Reveal immediate>
            <p className="eyebrow text-amber">Abogados especialistas en deudas · Chile</p>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 id="hero-title" className="font-display text-display-xl mt-5 font-medium text-balance">
              Eliminamos tus <Strike delay={900}>deudas</Strike>.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.2}>
            <p className="text-lead text-on-ink-muted mt-6 max-w-xl">
              Somos abogados. Defendemos juicios de deudas fiscales y comerciales y te acompañamos hasta que
              la deuda deja de existir. Cercanos, claros y con el cliente informado en cada etapa.
            </p>
          </Reveal>
          <Reveal immediate delay={0.3} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink
              href={whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas")}
              asButton
              variant="whatsapp"
              size="lg"
              title="Abre WhatsApp en una pestaña nueva"
            >
              <Icon name="whatsapp" className="size-5" />
              Cuéntanos tu caso por WhatsApp
            </AppLink>
            <AppLink
              href="/#servicios"
              asButton
              variant="outline-on-ink"
              size="lg"
              title="Ir a la sección de servicios legales"
            >
              Ver qué deudas eliminamos
              <Icon name="arrow-right" className="size-5" />
            </AppLink>
          </Reveal>
          <Reveal immediate delay={0.4} variant="fade">
            <p className="text-on-ink-muted mt-10 flex items-center gap-3 text-sm">
              <span aria-hidden="true" className="bg-amber h-px w-8" />
              <span>
                <strong className="text-on-ink font-semibold">Iván González Navarrete</strong>, abogado y
                fundador. Ex abogado de la Tesorería General de la República.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Recorte del fundador a toda la altura del hero, anclado al borde inferior. La base
            se difumina con una mascara sobre la propia imagen: antes era un rectangulo de tinta
            encima, que contra el resplandor azul se veia como un bloque oscuro con bordes rectos.
            En movil va bajo el texto, a ancho casi completo. */}
        <Reveal
          as="div"
          immediate
          variant="fade"
          delay={0.15}
          className="relative mt-8 -mb-px lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:flex lg:w-[52%] lg:items-end lg:justify-end lg:pt-24"
        >
          <figure className="contents">
            <div className="relative mx-auto w-[88%] max-w-[26rem] sm:max-w-[30rem] lg:mx-0 lg:h-full lg:w-auto lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[8%] top-[8%] aspect-square rounded-full bg-[radial-gradient(closest-side,oklch(0.45_0.19_268/0.65),transparent_72%)]"
              />
              {/* width y height son los pixeles reales del archivo: cualquier otra proporcion
                  deforma el retrato. quality 90 porque es la imagen LCP y el rostro es el foco. */}
              <Media
                src="/equipo/ivan-gonzalez-hero.webp"
                alt="Iván González Navarrete, abogado y fundador de IGonzalez, de pie con traje azul"
                width={1274}
                height={1600}
                preload
                fetchPriority="high"
                quality={90}
                sizes="(min-width: 1024px) 40rem, (min-width: 640px) 30rem, 88vw"
                className="relative block h-auto w-full mask-b-from-58% mask-b-to-96% object-contain object-bottom lg:h-full lg:w-auto"
              />
              <figcaption className="sr-only">
                Iván González Navarrete, abogado y fundador de IGonzalez.
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>

      <dl className="max-w-wide relative mx-auto grid grid-cols-2 gap-px border-t border-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {cifras.map((c, i) => (
          <Reveal key={c.detalle} delay={i * 0.08} className="flex flex-col gap-1 py-6 pr-4 lg:py-8">
            <dt className="text-on-ink-muted text-sm">{c.detalle}</dt>
            <dd className="font-display text-display-md order-first font-medium tabular-nums">
              {"prefijo" in c ? <span className="text-amber">{c.prefijo}</span> : null}
              {c.valor}
              {c.sufijo ? (
                <span className="text-on-ink-muted ml-2 font-sans text-base font-medium">{c.sufijo}</span>
              ) : null}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
