"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Icon from "@/shared/components/core/Icon";
import Media from "@/shared/components/core/Media";
import { cn } from "@/shared/lib/cn";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  captionsSrc?: string;
  className?: string;
};

// El reproductor (media-chrome, 44 KB gz) se descarga solo al pulsar reproducir.
const Player = dynamic(() => import("@/shared/components/core/MediaChromePlayer"), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" className="bg-ink flex h-full w-full items-center justify-center">
      <span className="sr-only">Cargando el reproductor</span>
      <span
        aria-hidden="true"
        className="border-on-ink/40 border-t-amber size-10 animate-spin rounded-full border-4"
      />
    </div>
  ),
});

// Fachada: poster estatico y boton de reproducir; el reproductor real llega bajo demanda.
export default function VideoPlayer({ src, poster, width, height, title, captionsSrc, className }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn("rounded-card bg-ink shadow-elevated relative overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {active ? (
        <Player src={src} poster={poster} title={title} captionsSrc={captionsSrc} />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          title={`Reproducir: ${title}`}
          aria-label={`Reproducir video: ${title}`}
          className="group absolute inset-0 block h-full w-full"
        >
          <Media
            src={poster}
            alt={title}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 80vw"
            className="duration-section ease-out-expo transition-transform group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="from-ink/70 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent"
          />
          <span
            aria-hidden="true"
            className="bg-amber text-ink shadow-elevated duration-fast ease-standard absolute top-1/2 left-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform group-hover:scale-110 group-focus-visible:scale-110"
          >
            <Icon name="play" className="ml-1 size-8" />
          </span>
          <span className="text-on-ink absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-left text-sm font-semibold">
            <Icon name="tiktok" className="size-4" />
            Ver el video
          </span>
        </button>
      )}
    </div>
  );
}
