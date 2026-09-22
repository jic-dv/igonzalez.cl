import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  // Retraso en ms antes de dibujar la linea, para secuenciar con el titulo
  delay?: number;
};

// Elemento firma del sitio: una linea ambar que tacha la palabra, dibujada al cargar
// con una animacion CSS (sin JavaScript). La palabra sigue legible y el lector de
// pantalla la lee normal porque el SVG es decorativo.
export default function Strike({ children, className, delay = 600 }: Props) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        className="pointer-events-none absolute top-1/2 left-[-4%] h-[0.22em] w-[108%] -translate-y-1/2 overflow-visible"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M1 6.5 C 25 3, 60 8, 99 4"
          pathLength={1}
          className="strike-path"
          style={{ animationDelay: `${delay}ms` }}
        />
      </svg>
    </span>
  );
}
