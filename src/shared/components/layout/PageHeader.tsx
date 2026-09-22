import type { ReactNode } from "react";
import Reveal from "@/shared/components/core/Reveal";
import Link from "next/link";

type Crumb = { name: string; path: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  breadcrumbs: Crumb[];
};

// Cabecera de tinta para paginas interiores. El h1 vive aqui: uno por pagina.
export default function PageHeader({ eyebrow, title, lead, breadcrumbs }: Props) {
  return (
    <header className="on-ink bg-ink text-on-ink">
      <div className="max-w-content mx-auto px-4 pt-28 pb-14 sm:px-6 lg:px-8 lg:pt-40 lg:pb-20">
        <nav aria-label="Migas de pan" className="text-on-ink-muted text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="text-on-ink">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path as "/"} title={`Ir a ${c.name}`} className="hover:text-on-ink">
                      {c.name}
                    </Link>
                  )}
                  {last ? null : <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
        <Reveal immediate delay={0.05}>
          <p className="eyebrow text-amber mt-8">{eyebrow}</p>
        </Reveal>
        <Reveal immediate delay={0.15}>
          <h1 className="font-display text-display-lg mt-4 max-w-4xl font-medium text-balance">{title}</h1>
        </Reveal>
        {lead ? (
          <Reveal immediate delay={0.25}>
            <p className="text-lead text-on-ink-muted mt-6 max-w-2xl">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
