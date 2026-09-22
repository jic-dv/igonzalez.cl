"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/shared/components/core/Icon";

type Props = { id: string; text: string; label: string };

// Ayuda del campo dentro del label: el texto no ocupa alto en el formulario, asi los
// controles de una misma fila quedan alineados. Abre con cursor, foco o toque, y el
// texto sigue en el DOM para que aria-describedby lo lea siempre.
export default function HintTooltip({ id, text, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-flex align-middle"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-label={`Ayuda sobre ${label}`}
        title={text}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="text-muted hover:bg-paper-2 hover:text-ink duration-fast flex size-5 items-center justify-center rounded-full transition-colors"
      >
        <Icon name="help" className="size-4" />
      </button>
      <span
        id={id}
        role="tooltip"
        className={`rounded-control bg-ink text-on-ink shadow-elevated duration-fast ease-standard pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-60 -translate-x-1/2 px-3 py-2 text-xs leading-snug font-normal transition-opacity sm:w-64 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </span>
    </span>
  );
}
