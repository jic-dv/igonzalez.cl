"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import AppLink from "@/shared/components/core/AppLink";
import Button from "@/shared/components/core/Button";
import { Checkbox } from "@/shared/components/core/Field";
import Icon from "@/shared/components/core/Icon";
import type { FormResult } from "@/features/contacto/constants/options";

type StatusProps = {
  result: FormResult | null;
  successTitle: string;
  successText: string;
  // Etiqueta del boton que vuelve a mostrar el formulario vacio
  resetLabel: string;
  onReset: () => void;
  children: ReactNode;
};

// Estado de exito o error del formulario, con aria-live para lectores de pantalla.
// Tras enviar se ofrecen las dos salidas naturales: volver al inicio o escribir de nuevo.
export function FormStatus({
  result,
  successTitle,
  successText,
  resetLabel,
  onReset,
  children,
}: StatusProps) {
  if (result?.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border-success/30 shadow-card border bg-white p-6 sm:p-8"
      >
        <span className="bg-success flex size-12 items-center justify-center rounded-full text-white">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="font-display text-display-sm text-ink mt-5 font-medium">{successTitle}</h2>
        <p className="text-muted mt-3">{successText}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="primary" onClick={onReset} title={resetLabel}>
            {resetLabel}
            <Icon name="arrow-right" className="size-4" />
          </Button>
          <AppLink href="/" asButton variant="outline" title="Volver a la página de inicio">
            Volver al inicio
          </AppLink>
        </div>
      </div>
    );
  }

  return (
    <>
      {result?.status === "error" ? (
        <p
          role="alert"
          className="rounded-control border-error/30 bg-error/5 text-error mb-6 flex items-start gap-2 border px-4 py-3 text-sm font-medium"
        >
          <Icon name="close" className="mt-0.5 size-4 shrink-0" />
          {result.message}
        </p>
      ) : null}
      {children}
    </>
  );
}

// Honeypot: invisible para personas, tentador para bots. Lo registra react-hook-form
// y el servidor descarta en silencio cualquier envio que lo traiga con contenido.
// La marca de tiempo la agrega useServerForm al construir el FormData.
export function AntiBotFields({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website">No completar</label>
      <input {...register} id="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

type ConsentProps = { finalidad: string; error?: string; register: UseFormRegisterReturn };

export function ConsentField({ finalidad, error, register }: ConsentProps) {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        {...register}
        id="consentimiento"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "consentimiento-err" : undefined}
      >
        Autorizo a IGonzalez a tratar mis datos para {finalidad}, según la{" "}
        <Link
          href="/privacidad"
          title="Leer la política de privacidad"
          className="text-brand font-semibold underline-offset-4 hover:underline"
        >
          política de privacidad
        </Link>
        .
      </Checkbox>
      {error ? (
        <p id="consentimiento-err" className="text-error text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// El estado pendiente lo entrega useServerForm (transition), no el form nativo.
export function SubmitButton({ children, pending }: { children: ReactNode; pending: boolean }) {
  return (
    <Button type="submit" variant="primary" size="lg" loading={pending} className="self-start">
      {children}
    </Button>
  );
}

// Accesores tipados del estado devuelto por la accion
export const fieldError = (r: FormResult | null, name: string) =>
  r?.status === "error" ? r.fieldErrors?.[name] : undefined;

export const fieldValue = (r: FormResult | null, name: string) =>
  r?.status === "error" ? r.values?.[name] : undefined;
