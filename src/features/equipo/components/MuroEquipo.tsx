import TeamCarousel from "@/features/equipo/components/TeamCarousel";
import Reveal from "@/shared/components/core/Reveal";
import { getLawyers, toPublicMember } from "@/features/equipo/services/team";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";

// Seccion de equipo del home: carrusel de dos filas con todo el equipo y enlace a /equipo.
export default async function MuroEquipo() {
  const lawyers = await getLawyers();
  const members = lawyers.map(toPublicMember);

  return (
    <section aria-labelledby="equipo-title" className="on-ink bg-ink text-on-ink py-16 sm:py-20 lg:py-28">
      <div className="max-w-wide mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-amber">Nuestro equipo</p>
          <h2 id="equipo-title" className="font-display text-display-lg mt-4 font-medium text-balance">
            {lawyers.length} abogados que te atienden por su nombre.
          </h2>
          <p className="text-lead text-on-ink-muted mt-5">
            Cada persona del equipo tiene su WhatsApp publicado. Pasa el cursor sobre una tarjeta y escríbele
            directo.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="self-start lg:self-auto">
          <AppLink
            href="/equipo"
            asButton
            variant="outline-on-ink"
            size="lg"
            title="Ver el listado completo de abogados con su contacto"
          >
            Ver el equipo completo
            <Icon name="arrow-right" className="size-5" />
          </AppLink>
        </Reveal>
      </div>

      <div className="max-w-wide mx-auto mt-10 lg:mt-14">
        <TeamCarousel members={members} />
      </div>
    </section>
  );
}
