import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";

export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };

export type LegalDoc = {
  version: string;
  updatedAt: string; // ISO date
  intro: string;
  sections: LegalSection[];
};

const dateFmt = new Intl.DateTimeFormat("es-CL", { dateStyle: "long" });

// Documento legal en HTML real, indexable y accesible. Con version y fecha visibles.
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <Section labelledBy="legal-meta">
      <div className="mx-auto max-w-3xl">
        <p id="legal-meta" className="text-muted text-sm">
          Versión {doc.version} · Última actualización:{" "}
          <time dateTime={doc.updatedAt}>{dateFmt.format(new Date(`${doc.updatedAt}T12:00:00`))}</time>
        </p>
        <p className="text-lead text-text mt-6">{doc.intro}</p>
        <div className="mt-10 flex flex-col gap-10">
          {doc.sections.map((s, i) => (
            <Reveal key={s.title} delay={0.05}>
              <section aria-labelledby={`legal-s${i}`}>
                <h2 id={`legal-s${i}`} className="font-display text-display-sm text-ink font-medium">
                  {i + 1}. {s.title}
                </h2>
                <div className="text-text mt-4 flex flex-col gap-4">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {s.list ? (
                    <ul className="flex list-disc flex-col gap-2 pl-6">
                      {s.list.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
