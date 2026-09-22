import { z } from "zod";

export const chileanMobile = z.string().regex(/^569\d{8}$/, "Número móvil chileno en formato 569XXXXXXXX");

export const teamMemberSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  // Nombre corto usado en el mensaje de WhatsApp: "Hola, quisiera contactarme con Rodrigo"
  firstName: z.string().min(2),
  role: z.enum(["Abogado", "Abogada", "Socio fundador", "Socia fundadora"]),
  whatsapp: chileanMobile.optional(),
  // Ruta bajo /public. Ausente cuando aun no hay fotografia; se muestra monograma.
  photo: z.string().startsWith("/equipo/").optional(),
  // Ancho y alto reales del archivo para reservar espacio (CLS)
  photoSize: z.tuple([z.number().int().positive(), z.number().int().positive()]).optional(),
  featured: z.boolean().default(false),
  // Dato del backend (vendedores.sexo); ausente en los datos locales
  sexo: z.enum(["masculino", "femenino"]).optional(),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberInput = z.input<typeof teamMemberSchema>;
