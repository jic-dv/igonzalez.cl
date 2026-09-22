"use client";

import { useState, useTransition } from "react";
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form";
import type { FormResult } from "@/features/contacto/constants/options";

type Options<T extends FieldValues> = {
  action: (prev: FormResult | null, fd: FormData) => Promise<FormResult>;
  defaultValues: DefaultValues<T>;
};

// Convierte los valores del formulario en el FormData que espera la Server Action.
// Cubre los tipos que devuelve react-hook-form: texto, numero, booleano y archivos.
function toFormData<T extends FieldValues>(values: T) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value instanceof FileList) {
      if (value[0]) fd.set(key, value[0]);
    } else if (value instanceof File) {
      fd.set(key, value);
    } else if (typeof value === "boolean") {
      // Una casilla marcada viaja como "on", igual que en un envio nativo
      if (value) fd.set(key, "on");
    } else if (value !== undefined && value !== null) {
      fd.set(key, String(value));
    }
  }
  return fd;
}

// Une react-hook-form con las Server Actions: RHF valida en el navegador con las reglas
// compartidas y, si pasa, la accion vuelve a validar en el servidor. Los errores que
// devuelve el servidor se vuelcan campo por campo en el formulario.
export function useServerForm<T extends FieldValues>({ action, defaultValues }: Options<T>) {
  const form = useForm<T>({ defaultValues, mode: "onBlur", reValidateMode: "onChange" });
  const [result, setResult] = useState<FormResult | null>(null);
  const [pending, startTransition] = useTransition();
  // Marca de apertura del formulario: el servidor descarta envios instantaneos
  const [startedAt] = useState(() => Date.now());

  const onSubmit = form.handleSubmit((values) => {
    const fd = toFormData(values);
    fd.set("startedAt", String(startedAt));

    startTransition(async () => {
      const res = await action(null, fd);
      setResult(res);
      if (res.status === "error" && res.fieldErrors) {
        const entries = Object.entries(res.fieldErrors);
        for (const [name, message] of entries) {
          form.setError(name as Path<T>, { type: "server", message });
        }
        form.setFocus(entries[0]?.[0] as Path<T>);
      }
    });
  });

  // Vuelve a mostrar el formulario vacio tras un envio con exito
  const reset = () => {
    setResult(null);
    form.reset();
  };

  return { form, onSubmit, result, pending, reset };
}
