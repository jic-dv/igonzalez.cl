import { cartaIvan } from "@/features/inicio/data/textos";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import Media from "@/shared/components/core/Media";
import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";

// Carta del fundador. Texto integro del sitio original, con jerarquia tipografica nueva.
export default function Carta() {
  return (
    <Section labelledBy="carta-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <div className="rounded-card shadow-card relative aspect-[4/5] overflow-hidden">
              {/* Foto apaisada (1524x1032) recortada a 4/5: para cubrir el alto hace falta
              ~1,85 veces el ancho de la caja, y sizes tiene que declararlo o el navegador
              baja una version pequena que al ampliarse se ve borrosa. */}
              <Media
                src="/equipo/ivan-gonzalez.webp"
                alt="Iván González Navarrete en su escritorio, con un computador portátil"
                fill
                sizes="(min-width: 1024px) 70vw, 185vw"
                quality={90}
                className="object-[60%_center]"
              />
            </div>
            <p className="text-muted mt-4 text-sm">
              Iván comenzó como abogado de la Tesorería General de la República. Hoy dirige una oficina de más
              de 25 abogados.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="eyebrow text-amber-deep">Una carta de Iván</p>
          <h2
            id="carta-title"
            className="font-display text-display-lg text-ink mt-4 font-medium text-balance"
          >
            Sabemos lo que pesa una deuda. Por eso existimos.
          </h2>
          <div className="text-lead text-text mt-8 flex flex-col gap-5">
            {cartaIvan.parrafos.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <p className="font-display text-display-sm text-ink mt-10 font-medium">{cartaIvan.firma}</p>
          <p className="text-muted mt-1">{cartaIvan.cargo}</p>
          <AppLink
            href="/ivan-gonzalez"
            className="text-brand mt-4 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
            title="Perfil de Iván González Navarrete, abogado y fundador"
          >
            Conocer a Iván González
            <Icon name="arrow-right" className="size-4" />
          </AppLink>
        </Reveal>
      </div>
    </Section>
  );
}
