import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import ServiceCard from "@/features/servicios/components/ServiceCard";
import { getServices } from "@/features/servicios/services/services";

export default function ServiciosSection() {
  const services = getServices();

  return (
    <Section id="servicios" labelledBy="servicios-title" tone="paper-2" className="scroll-mt-20">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-amber-deep">Servicios legales</p>
        <h2
          id="servicios-title"
          className="font-display text-display-lg text-ink mt-4 font-medium text-balance"
        >
          Dos tipos de deuda. Un mismo objetivo: que dejen de existir.
        </h2>
        <p className="text-lead text-muted mt-5">
          Fiscales o comerciales, con la Tesorería o con un banco. Cada caso tiene una vía legal para
          eliminarla y nuestro trabajo es encontrarla y llevarla hasta el final.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={0.1 + i * 0.12}>
            <ServiceCard service={s} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
