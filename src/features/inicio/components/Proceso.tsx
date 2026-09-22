import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import { proceso } from "@/features/inicio/data/textos";

export default function Proceso() {
  return (
    <Section labelledBy="proceso-title" tone="paper-2">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-amber-deep">Así trabajamos</p>
          <h2
            id="proceso-title"
            className="font-display text-display-lg text-ink mt-4 font-medium text-balance"
          >
            Tres pasos, sin letra chica.
          </h2>
          <p className="text-lead text-muted mt-5">
            Nuestro foco está en la atención: que sepas en qué está tu caso, siempre.
          </p>
        </Reveal>
        <ol className="grid gap-4 lg:col-span-8 lg:grid-cols-3">
          {proceso.map((p, i) => (
            <Reveal as="li" key={p.paso} delay={0.1 + i * 0.12}>
              <div className="rounded-card border-line shadow-card flex h-full flex-col border bg-white p-6">
                <span
                  className="font-display text-display-md text-amber-deep font-medium tabular-nums"
                  aria-hidden="true"
                >
                  {p.paso}
                </span>
                <h3 className="text-ink mt-4 text-xl font-bold">{p.titulo}</h3>
                <p className="text-muted mt-3">{p.texto}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
