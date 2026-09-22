// Opciones de los <select>. Modulo sin Zod para que el cliente no arrastre el validador.
// Los valores son los que acepta el backend (GET /contacto-choices/ y el formulario de
// postulacion del sitio anterior); se envian tal cual.
export const tipoDeudorValues = ["persona", "empresa", "ambas"] as const;
export const tipoDeudorLabels: Record<(typeof tipoDeudorValues)[number], string> = {
  persona: "Persona natural",
  empresa: "Empresa",
  ambas: "Persona y empresa",
};

export const cargoValues = ["Abogado/a", "Procurador/a"] as const;
export const cargoLabels: Record<(typeof cargoValues)[number], string> = {
  "Abogado/a": "Abogado/a",
  "Procurador/a": "Procurador/a",
};

// Estado que devuelven las Server Actions. Union discriminada: sin combinaciones imposibles.
// values: lo que la persona escribio, para repoblar el formulario tras un error
// (React reinicia los campos no controlados al terminar la accion).
export type FormResult =
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      values?: Record<string, string>;
    };
