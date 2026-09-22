import Reveal from "@/shared/components/core/Reveal";
import Media from "@/shared/components/core/Media";
import type { PublicMember } from "@/features/equipo/types/public-member";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { initials } from "@/shared/lib/format";
import { whatsappUrl } from "@/shared/lib/site";

type Props = { member: PublicMember; priority?: boolean; index?: number };

// Tarjeta de profesional: retrato a sangre, nombre y rol sobre degradado, y una
// accion unica e inequivoca: escribirle por WhatsApp. La tarjeta no se mueve al pasar el
// cursor; lo unico que responde es el retrato, que escala dentro de su marco. El numero no
// se imprime: va solo en el enlace de WhatsApp, que es quien lo necesita.
export default function MemberCard({ member, priority, index = 0 }: Props) {
  const wa = member.whatsapp
    ? whatsappUrl(member.whatsapp, `Hola, quisiera contactarme con ${member.firstName}`)
    : undefined;

  return (
    <Reveal
      as="li"
      delay={(index % 5) * 0.08}
      className="group rounded-card bg-ink text-on-ink shadow-card relative flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.photo ? (
          // Los retratos son apaisados (de 1,04 a 1,50) y el marco es 4/5, asi que object-cover
          // los amplia hasta 1,9 veces el ancho de la tarjeta, mas el zoom del hover. sizes tiene
          // que declarar ese ancho real o el navegador baja una version pequena y se ve borrosa.
          <Media
            src={member.photo}
            alt={`${member.name}, ${member.role.toLowerCase()} de IGonzalez`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 35vw, (min-width: 768px) 58vw, 88vw"
            className="duration-section ease-standard object-[center_25%] transition-transform group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-ink-2 absolute inset-0 flex items-center justify-center">
            <span
              role="img"
              aria-label={`${member.name}, sin fotografía`}
              className="font-display text-display-lg text-amber font-medium"
            >
              {initials(member.name)}
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="from-ink via-ink/60 pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
          <h3 className="text-lg leading-tight font-bold">{member.name}</h3>
          <p className="text-on-ink-muted flex items-center gap-1.5 text-sm">
            <span className="bg-amber size-1.5 rounded-full" aria-hidden="true" />
            {member.role}
          </p>
        </div>
      </div>

      {wa ? (
        <AppLink
          href={wa}
          className="bg-wa duration-fast hover:bg-wa-hover flex min-h-14 items-center justify-between gap-3 px-4 text-sm font-semibold text-white transition-colors"
          title={`Escribir a ${member.firstName} por WhatsApp`}
        >
          <span className="flex items-center gap-2.5">
            <Icon name="whatsapp" className="size-5 shrink-0" />
            <span className="leading-tight">Escribir a {member.firstName}</span>
          </span>
          <Icon
            name="arrow-up-right"
            className="duration-fast size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </AppLink>
      ) : null}
    </Reveal>
  );
}
