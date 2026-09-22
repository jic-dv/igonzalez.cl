"use client";

import { useDeferredValue, useEffect, useId, useState } from "react";
import MemberCard from "@/features/equipo/components/MemberCard";
import type { PublicMember } from "@/features/equipo/types/public-member";
import { searchMembers } from "@/features/equipo/utils/search";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import { Input } from "@/shared/components/core/Field";
import { site, whatsappUrl } from "@/shared/lib/site";

type Props = { members: PublicMember[]; initialQuery?: string };

// Buscador del equipo: filtra por nombre o numero. useDeferredValue mantiene el input
// fluido mientras la lista se recalcula; el termino se refleja en ?q= para compartirlo.
export default function TeamSearch({ members, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const deferred = useDeferredValue(query);
  const results = searchMembers(members, deferred);
  const inputId = useId();
  const statusId = useId();
  const active = deferred.trim().length > 0;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (deferred.trim()) url.searchParams.set("q", deferred.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  }, [deferred]);

  return (
    <div className="flex flex-col gap-8">
      <search className="rounded-card border-line shadow-card border bg-white p-4 sm:p-5">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
          <label htmlFor={inputId} className="text-text text-sm font-semibold">
            Buscar abogado o abogada
          </label>
          <div className="relative">
            <Icon
              name="search"
              className="text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
            />
            <Input
              id={inputId}
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, apellido o número de WhatsApp"
              autoComplete="off"
              enterKeyHint="search"
              aria-describedby={statusId}
              className="pr-12 pl-12"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                title="Limpiar la búsqueda"
                aria-label="Limpiar la búsqueda"
                className="text-muted hover:bg-paper-2 hover:text-ink absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors"
              >
                <Icon name="close" className="size-4" />
              </button>
            ) : null}
          </div>
          <p id={statusId} role="status" aria-live="polite" className="text-muted text-sm">
            {active
              ? results.length === 0
                ? "Sin resultados para esa búsqueda."
                : `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para “${deferred.trim()}”.`
              : `${members.length} profesionales. Escribe un nombre o un número para filtrar.`}
          </p>
        </form>
      </search>

      {results.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-5">
          {results.map((m, i) => (
            <MemberCard key={m.slug} member={m} priority={i < 5} index={i} />
          ))}
        </ul>
      ) : (
        <div className="rounded-card border-line-strong flex flex-col items-center gap-4 border border-dashed px-6 py-14 text-center">
          <p className="font-display text-display-sm text-ink font-medium">
            No encontramos a nadie con ese dato.
          </p>
          <p className="text-muted max-w-md">
            Si te contactó alguien que dice ser de IGonzalez y no aparece aquí, confírmalo antes de continuar.
            El WhatsApp de la oficina te lo verifica.
          </p>
          <AppLink
            href={whatsappUrl(site.whatsapp, "Hola, quiero confirmar si un abogado trabaja en IGonzalez")}
            asButton
            variant="whatsapp"
            title="Verificar un abogado por el WhatsApp de la oficina"
          >
            <Icon name="whatsapp" className="size-5" />
            Verificar por WhatsApp
          </AppLink>
        </div>
      )}
    </div>
  );
}
