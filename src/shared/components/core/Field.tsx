import type { ComponentPropsWithoutRef, ReactNode } from "react";
import HintTooltip from "@/shared/components/core/HintTooltip";
import { cn } from "@/shared/lib/cn";

export type FieldControlProps = {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
  "aria-required": true | undefined;
};

type Props = {
  id: string;
  label: string;
  // Texto de ayuda: va en un tooltip dentro del label, no bajo el control
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: FieldControlProps) => ReactNode;
};

// Tres filas fijas (label, control, error) para que FieldRow pueda alinearlas entre
// columnas con subgrid: un error o una etiqueta de dos lineas no desplaza al vecino.
export default function Field({ id, label, hint, error, required, className, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("row-span-3 grid grid-rows-subgrid content-start gap-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-text text-sm font-semibold">
          {label}
          {required ? (
            <span className="text-muted" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
        {hint ? <HintTooltip id={hintId as string} text={hint} label={label} /> : null}
      </div>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })}
      {error ? (
        <p id={errId} className="text-error flex items-start gap-1.5 text-sm font-medium">
          <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 3.25a.9.9 0 0 1 .9.98l-.3 3.4a.6.6 0 0 1-1.2 0l-.3-3.4A.9.9 0 0 1 8 4.25M8 10.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Fila de campos: en pantallas anchas reparte columnas y alinea label, control y error
// de todas ellas gracias a subgrid.
export function FieldRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto]", className)}>{children}</div>
  );
}

const controlBase = [
  "min-h-12 w-full rounded-control border border-line-strong bg-white px-4 py-3 text-base text-text",
  "placeholder:text-muted/60 duration-fast transition-[border-color,box-shadow]",
  "hover:border-line-strong/80 focus:border-brand focus:ring-4 focus:ring-brand/20 focus:outline-none",
  "aria-invalid:border-error aria-invalid:focus:ring-error/20",
  "disabled:bg-paper-2 disabled:text-muted",
].join(" ");

export function Input({ className, ...rest }: ComponentPropsWithoutRef<"input">) {
  return <input {...rest} className={cn(controlBase, className)} />;
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea {...rest} className={cn(controlBase, "min-h-32 resize-y leading-relaxed", className)} />;
}

export function Select({ className, children, ...rest }: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select {...rest} className={cn(controlBase, "cursor-pointer appearance-none pr-11", className)}>
        {children}
      </select>
      <svg
        className="text-muted pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m4 6 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Casilla con area de toque amplia: el recuadro completo responde al clic.
export function Checkbox({ className, children, ...rest }: ComponentPropsWithoutRef<"input">) {
  return (
    <label
      className={cn(
        "rounded-control border-line has-checked:border-brand has-checked:bg-brand/5 hover:border-line-strong",
        "duration-fast flex cursor-pointer items-start gap-3 border bg-white p-4 transition-colors",
        "has-focus-visible:ring-brand/20 has-focus-visible:border-brand has-focus-visible:ring-4",
        className,
      )}
    >
      <input
        {...rest}
        type="checkbox"
        className="accent-brand mt-0.5 size-5 shrink-0 cursor-pointer rounded"
      />
      <span className="text-text text-sm leading-snug">{children}</span>
    </label>
  );
}
