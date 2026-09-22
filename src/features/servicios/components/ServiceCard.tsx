import type { Service } from "@/features/servicios/schemas/service";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { site, whatsappUrl } from "@/shared/lib/site";

type Props = { service: Service; index: number };

export default function ServiceCard({ service, index }: Props) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="group rounded-card border-line shadow-card duration-enter ease-standard hover:shadow-elevated relative flex flex-col border bg-white p-6 transition-[transform,box-shadow] hover:-translate-y-1 sm:p-8 lg:p-10"
    >
      <span
        className="font-display text-display-sm text-amber-deep font-medium tabular-nums"
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <h3 id={`${service.slug}-title`} className="font-display text-display-md text-ink mt-4 font-medium">
        {service.title}
      </h3>
      <p className="text-lead text-text mt-4">{service.summary}</p>
      <p className="text-muted mt-4">{service.description}</p>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="eyebrow text-muted">Vía legal</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {service.mechanisms.map((m) => (
              <span key={m} className="rounded-pill bg-paper-2 text-ink px-3 py-1.5 text-sm font-medium">
                {m}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="eyebrow text-muted">Por ejemplo</dt>
          <dd className="mt-3 flex flex-col gap-1.5 text-sm">
            {service.examples.map((e) => (
              <span key={e} className="flex items-center gap-2">
                <Icon name="check" className="text-wa size-4" />
                {e}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-10">
        <AppLink
          href={whatsappUrl(
            site.whatsapp,
            `Hola, tengo ${service.title.toLowerCase()} y quisiera una asesoría`,
          )}
          asButton
          variant="ink"
          title="Abre WhatsApp en una pestaña nueva"
        >
          Consultar por {service.shortTitle.toLowerCase()}
          <Icon name="arrow-up-right" className="size-4" />
        </AppLink>
      </div>
    </article>
  );
}
