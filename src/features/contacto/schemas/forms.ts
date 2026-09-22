import { z } from "zod";
import { LIMITS } from "@/features/contacto/constants/limits";
import { cargoValues, tipoDeudorValues } from "@/features/contacto/constants/options";
import {
  amountRule,
  birthDateRule,
  emailRule,
  fullNameRule,
  nameRule,
  phoneRule,
  textRule,
  type Rule,
} from "@/features/contacto/validation/rules";

export type { FormResult } from "@/features/contacto/constants/options";

// Schemas del servidor. El criterio de validacion no vive aqui: son las mismas reglas
// puras que react-hook-form aplica en el navegador (validation/rules.ts), para que
// cliente y servidor nunca puedan discrepar. Zod aporta el parseo, las transformaciones
// y el tipado.

// Convierte una regla compartida en un check de Zod
const check =
  <T>(rule: Rule<T>) =>
  (value: T, ctx: z.RefinementCtx) => {
    const message = rule(value);
    if (message) ctx.addIssue({ code: "custom", message });
  };

const collapse = (value: string) => value.trim().replace(/\s+/g, " ");

const nombre = (campo: string) =>
  z
    .string()
    .superRefine(check(nameRule(campo)))
    .transform(collapse);

const nombreCompleto = (campo: string) =>
  z
    .string()
    .superRefine(check(fullNameRule(campo)))
    .transform(collapse);

const textoLibre = (min: number, max: number, vacio: string) =>
  z
    .string()
    .superRefine(check(textRule(min, max, vacio)))
    .transform((value) => value.trim());

export const email = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .superRefine(check(emailRule));

// El formulario envia el numero con el prefijo del pais elegido ("+56912345678").
// Se normaliza a digitos, se valida contra la lista de paises y se devuelve con "+".
export const telefono = z
  .string()
  .transform((value) => value.replace(/\D/g, ""))
  // Un movil chileno escrito sin prefijo sigue siendo valido
  .transform((value) => (value.length === 9 && value.startsWith("9") ? `56${value}` : value))
  .superRefine(check(phoneRule))
  .transform((digits) => `+${digits}`);

// Monto opcional: vacio es valido y se traduce a undefined
export const monto = z
  .string()
  .superRefine(check(amountRule))
  .transform((value) => {
    const digits = value.replace(/\D/g, "");
    return digits ? Number(digits) : undefined;
  });

export const consentimiento = z.literal(true, {
  error: "Necesitamos tu autorización para responder a tu consulta",
});

// Campos anti-bot comunes: honeypot vacio y tiempo minimo desde que se abrio el formulario
export const antiBot = {
  website: z.string().max(0).optional().default(""),
  startedAt: z.coerce.number().int().positive(),
};

export const contactoSchema = z.object({
  nombre: nombre("nombre"),
  apellido: nombre("apellido"),
  email,
  celular: telefono,
  monto: monto.optional(),
  tipoDeudor: z.enum(tipoDeudorValues, { error: "Elige una opción" }),
  mensaje: textoLibre(
    LIMITS.mensaje.min,
    LIMITS.mensaje.max,
    `Cuéntanos un poco más: al menos ${LIMITS.mensaje.min} caracteres`,
  ),
  consentimiento,
  ...antiBot,
});

export type ContactoInput = z.input<typeof contactoSchema>;
export type Contacto = z.infer<typeof contactoSchema>;

export const reclamoSchema = z.object({
  nombre: nombre("nombre"),
  apellido: nombre("apellido"),
  email,
  celular: telefono,
  mensaje: textoLibre(
    LIMITS.descripcion.min,
    LIMITS.descripcion.max,
    `Describe tu reclamo o sugerencia: al menos ${LIMITS.descripcion.min} caracteres`,
  ),
  consentimiento,
  ...antiBot,
});

export type ReclamoInput = z.input<typeof reclamoSchema>;
export type Reclamo = z.infer<typeof reclamoSchema>;

export const fechaNacimiento = z.string().superRefine(check(birthDateRule));

export const postulacionSchema = z.object({
  nombreCompleto: nombreCompleto("nombre completo"),
  telefono,
  email,
  fechaNacimiento,
  cargo: z.enum(cargoValues, { error: "Elige el cargo al que postulas" }),
  motivacion: textoLibre(
    LIMITS.motivacion.min,
    LIMITS.motivacion.max,
    `Cuéntanos un poco más: al menos ${LIMITS.motivacion.min} caracteres`,
  ),
  consentimiento,
  ...antiBot,
});

export type PostulacionInput = z.input<typeof postulacionSchema>;
export type Postulacion = z.infer<typeof postulacionSchema>;
