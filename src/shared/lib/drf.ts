// Django REST devuelve errores de validacion como { campo: ["mensaje"], non_field_errors: [...] }.
// Se traducen a errores por campo del formulario propio segun el mapa recibido.
// Modulo puro (sin server-only) para poder probarlo en unitario.
export function drfFieldErrors(data: unknown, fieldMap: Record<string, string>) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return { fields: {}, general: undefined };
  const fields: Record<string, string> = {};
  let general: string | undefined;
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    const message = Array.isArray(value)
      ? value.map(String).join(" ")
      : typeof value === "string"
        ? value
        : undefined;
    if (!message) continue;
    const own = fieldMap[key];
    if (own) fields[own] = message;
    else if (key === "non_field_errors" || key === "detail" || key === "message") general = message;
  }
  return { fields, general };
}
