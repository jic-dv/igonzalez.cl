import { z } from "zod";

export const serviceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  // Titular corto para tarjetas y navegacion
  shortTitle: z.string().min(3),
  summary: z.string().min(40),
  // Texto original del sitio, sin reescritura
  description: z.string().min(80),
  // Vias legales que la oficina declara usar para este tipo de deuda
  mechanisms: z.array(z.string().min(3)).min(1),
  // Ejemplos concretos de acreedores o tipos de deuda mencionados por la oficina
  examples: z.array(z.string().min(2)).min(1),
});

export type Service = z.infer<typeof serviceSchema>;
