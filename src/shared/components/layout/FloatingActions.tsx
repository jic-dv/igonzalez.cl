"use client";

import Icon from "@/shared/components/core/Icon";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/lib/cn";
import { site, whatsappUrl } from "@/shared/lib/site";

const WA_HREF = whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas");

// Acciones flotantes: WhatsApp abajo a la derecha (siempre) y volver arriba abajo a la
// izquierda (tras hacer scroll). Respetan el area segura de pantallas con notch.
export default function FloatingActions() {
  const scrolled = useScrolled(600);

  const scrollTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
        <span
          role="tooltip"
          id="wa-tooltip"
          className="rounded-control bg-ink text-on-ink shadow-elevated duration-fast ease-standard pointer-events-none translate-x-2 px-3.5 py-2 text-sm font-semibold opacity-0 transition-[opacity,transform] group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Contáctanos por WhatsApp
        </span>
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contáctanos por WhatsApp"
          title="Escribir a la oficina por WhatsApp (se abre en una pestaña nueva)"
          aria-describedby="wa-tooltip"
          className="bg-wa shadow-elevated duration-fast ease-standard hover:bg-wa-hover relative flex size-14 items-center justify-center rounded-full text-white transition-[transform,background-color] hover:scale-105 active:scale-95 sm:size-16"
        >
          <span
            aria-hidden="true"
            className="bg-wa/40 absolute inset-0 animate-ping rounded-full [animation-duration:2.4s] motion-reduce:hidden"
          />
          <Icon name="whatsapp" className="relative size-7 sm:size-8" />
        </a>
      </div>

      <button
        type="button"
        onClick={scrollTop}
        aria-label="Volver arriba"
        tabIndex={scrolled ? 0 : -1}
        className={cn(
          "border-line-strong bg-paper/90 text-ink shadow-card duration-enter ease-standard hover:bg-paper supports-[not(backdrop-filter:blur(1px))]:bg-paper fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex size-11 items-center justify-center rounded-full border backdrop-blur-md transition-[opacity,transform,background-color] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-6 sm:size-12",
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <Icon name="arrow-up" className="size-5" />
      </button>
    </>
  );
}
