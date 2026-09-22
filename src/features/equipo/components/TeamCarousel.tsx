"use client";
import Reveal from "@/shared/components/core/Reveal";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/shared/components/core/Icon";
import Media from "@/shared/components/core/Media";
import { cn } from "@/shared/lib/cn";
import { initials } from "@/shared/lib/format";
import type { PublicMember } from "@/features/equipo/types/public-member";

type Props = { members: PublicMember[] };

// Carrusel de dos filas con scroll nativo y snap. Los botones desplazan el ancho visible;
// el estado de los extremos se lee del scroll para desactivarlos.
export default function TeamCarousel({ members }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const readEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    readEdges();
    el.addEventListener("scroll", readEdges, { passive: true });
    const ro = new ResizeObserver(readEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", readEdges);
      ro.disconnect();
    };
  }, [readEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={scroller}
        aria-label="Abogados y abogadas del equipo"
        className="grid snap-x snap-mandatory scroll-px-4 scrollbar-none grid-flow-col grid-rows-2 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:scroll-px-8 lg:px-8 [&>li]:snap-start"
      >
        {members.map((member, i) => (
          <Reveal
            as="li"
            key={member.slug}
            delay={Math.min(i, 9) * 0.06}
            className="w-[42vw] max-w-[15rem] sm:w-[30vw] lg:w-[15rem]"
          >
            <TeamCard member={member} />
          </Reveal>
        ))}
      </ul>

      <CarouselButton dir={-1} disabled={edge.start} onClick={() => scrollBy(-1)} />
      <CarouselButton dir={1} disabled={edge.end} onClick={() => scrollBy(1)} />
    </div>
  );
}

function CarouselButton({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  const label = dir === 1 ? "Ver más abogados" : "Ver abogados anteriores";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "bg-amber text-ink shadow-elevated duration-fast ease-standard absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full transition-[opacity,transform,background-color] hover:brightness-95 active:scale-95 disabled:cursor-default disabled:opacity-0 sm:size-12",
        dir === 1 ? "right-1 sm:right-2 lg:right-3" : "left-1 sm:left-2 lg:left-3",
      )}
    >
      <Icon name="arrow-right" className={cn("size-5", dir === -1 && "rotate-180")} />
    </button>
  );
}

// Tarjeta: retrato con overlay de tinta translucido que sube al pasar el cursor o enfocar.
// En pantallas tactiles (sin hover) el overlay queda visible en version compacta.
function TeamCard({ member }: { member: PublicMember }) {
  const href = member.whatsapp
    ? `https://wa.me/${member.whatsapp}?text=${encodeURIComponent(`Hola, quisiera contactarme con ${member.firstName}`)}`
    : undefined;
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            title: `Escribir a ${member.firstName} por WhatsApp (se abre en una pestaña nueva)`,
          }
        : {})}
      className="group rounded-card bg-ink-2 shadow-card relative block aspect-[4/5] overflow-hidden outline-offset-4"
    >
      {member.photo ? (
        // Los retratos son apaisados (de 1,04 a 1,50) y el marco es 4/5, asi que object-cover
        // los amplia hasta 1,9 veces el ancho de la tarjeta, mas el zoom del hover. sizes tiene
        // que declarar ese ancho real o el navegador baja una version pequena y se ve borrosa.
        <Media
          src={member.photo}
          alt={`${member.name}, ${member.role.toLowerCase()} de IGonzalez`}
          fill
          sizes="(min-width: 1024px) 29rem, (min-width: 640px) 58vw, 82vw"
          className="duration-section ease-out-expo object-[center_25%] transition-transform group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        />
      ) : (
        <span
          role="img"
          aria-label={`${member.name}, sin fotografía`}
          className="font-display text-display-md text-amber absolute inset-0 flex items-center justify-center font-medium"
        >
          {initials(member.name)}
        </span>
      )}

      {/* Nombre siempre visible sobre un degradado suave */}
      <span
        aria-hidden="true"
        className="from-ink/80 pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 pointer-coarse:opacity-0"
      />
      <span className="text-on-ink absolute inset-x-0 bottom-0 flex flex-col p-3 transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 pointer-coarse:opacity-0">
        <span className="truncate text-sm font-bold sm:text-base">{member.name}</span>
        <span className="text-on-ink-muted text-xs">{member.role}</span>
      </span>

      {/* Overlay de tinta translucido: aparece en fundido con un leve desplazamiento */}
      <span
        className={cn(
          "bg-ink/80 text-on-ink absolute inset-0 flex translate-y-6 flex-col justify-end p-3 opacity-0 backdrop-blur-[2px] transition-[opacity,translate] duration-500 ease-out sm:p-4 pointer-coarse:justify-start",
          "group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
          "pointer-coarse:bg-ink/90 pointer-coarse:translate-y-[calc(100%-6.25rem)] pointer-coarse:opacity-100",
        )}
      >
        <span className="truncate text-sm font-bold sm:text-base">{member.name}</span>
        <span className="text-on-ink/85 text-xs">{member.role}</span>
        {href ? (
          <span className="rounded-control bg-wa mt-3 inline-flex min-h-9 items-center justify-center gap-2 px-3 text-xs font-semibold text-white sm:text-sm">
            <Icon name="whatsapp" className="size-4 shrink-0" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Escribir a {member.firstName}</span>
          </span>
        ) : null}
      </span>
    </Wrapper>
  );
}
