import { z } from "zod";

// Respuesta de GET /vendedores/ del backend de la oficina. "foto" es un nombre de archivo
// de los assets del sitio anterior, no una URL: las fotos siguen siendo locales.
export const vendedorSchema = z.object({
  id: z.number().int(),
  nombre: z.string().min(1),
  nombre_corto: z.string().nullish(),
  foto: z.string().nullish(),
  telefono_empresa: z.string().nullish(),
  sexo: z.enum(["masculino", "femenino"]).nullish(),
});

export const vendedoresSchema = z.array(vendedorSchema);

export type Vendedor = z.infer<typeof vendedorSchema>;
