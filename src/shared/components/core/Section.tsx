import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Props = ComponentPropsWithoutRef<"section"> & {
  // id del heading que titula la seccion; alimenta aria-labelledby
  labelledBy: string;
  tone?: "paper" | "paper-2" | "ink";
  width?: "content" | "wide";
  children: ReactNode;
};

// Ritmo vertical y ancho maximo centralizados. Toda seccion del sitio pasa por aqui.
export default function Section({
  labelledBy,
  tone = "paper",
  width = "content",
  className,
  children,
  ...rest
}: Props) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "paper-2" && "bg-paper-2",
        tone === "ink" && "on-ink bg-ink text-on-ink",
        className,
      )}
      {...rest}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", width === "wide" ? "max-w-wide" : "max-w-content")}>
        {children}
      </div>
    </section>
  );
}
