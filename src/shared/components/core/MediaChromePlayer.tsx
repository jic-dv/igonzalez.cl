"use client";

import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
} from "media-chrome/react";
import { useEffect, useRef, type CSSProperties } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  // URL de un archivo WebVTT con subtitulos en espanol. Pendiente del cliente (README).
  captionsSrc?: string;
  autoPlay?: boolean;
};

// Controles del reproductor con media-chrome (Mux). Se importa solo tras pulsar reproducir.
// Los colores se pasan por custom properties propias de la libreria.
const theme = {
  "--media-primary-color": "#f9fafd",
  "--media-secondary-color": "rgba(6, 9, 78, 0.6)",
  "--media-accent-color": "#ffb330",
  "--media-control-background": "transparent",
  "--media-control-hover-background": "rgba(255, 255, 255, 0.12)",
  "--media-range-track-height": "4px",
  "--media-font-family": "var(--font-sans)",
} as CSSProperties;

export default function MediaChromePlayer({ src, poster, title, captionsSrc, autoPlay = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // El componente se monta tras el clic en la fachada, dentro de la activacion del usuario:
  // se pide reproducir explicitamente. Si el navegador lo rechaza, quedan los controles.
  useEffect(() => {
    if (!autoPlay) return;
    videoRef.current?.play().catch(() => undefined);
  }, [autoPlay]);

  return (
    <MediaController style={theme} className="block h-full w-full">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- el track se renderiza en cuanto exista el WebVTT; sin archivo, un track vacio seria un subtitulo falso */}
      <video
        ref={videoRef}
        slot="media"
        src={src}
        poster={poster}
        title={title}
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        className="h-full w-full object-cover"
      >
        {captionsSrc ? (
          <track kind="captions" srcLang="es" label="Español" src={captionsSrc} default />
        ) : null}
      </video>
      <MediaControlBar className="from-ink/80 bg-gradient-to-t to-transparent px-2 pt-6 pb-1">
        <MediaPlayButton title="Reproducir o pausar" />
        <MediaMuteButton title="Silenciar o activar el sonido" />
        <MediaTimeRange title="Posición del video" />
        <MediaTimeDisplay showDuration />
        <MediaFullscreenButton title="Pantalla completa" />
      </MediaControlBar>
    </MediaController>
  );
}
