"use server";

import { headers } from "next/headers";
import { z } from "zod";
import {
  contactoSchema,
  postulacionSchema,
  reclamoSchema,
  type FormResult,
} from "@/features/contacto/schemas/forms";
import {
  deliverContacto,
  deliverPostulacion,
  deliverReclamo,
  type Delivery,
} from "@/features/contacto/services/deliver";
import { detectCvType } from "@/shared/lib/file-type";
import { LIMITS } from "@/features/contacto/constants/limits";
import { rateLimit } from "@/shared/lib/rate-limit";

// Las Server Actions son endpoints publicos: aqui se valida todo, siempre.
// Firma (prevState, formData) para useActionState. El consentimiento se exige en el
// schema pero no viaja al backend: su contrato es fijo y no lo contempla (ver README).

const MIN_FILL_MS = 3000;
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const GENERIC_ERROR =
  "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.";
const REVIEW_FIELDS = "Revisa los campos marcados.";

async function guard(kind: string): Promise<FormResult | null> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(`${kind}:${ip}`, LIMIT);
  if (!rl.ok) {
    return {
      status: "error",
      message: "Recibimos varios envíos seguidos. Espera unos minutos y vuelve a intentarlo.",
    };
  }
  return null;
}

function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

// Solo strings, sin archivos ni campos anti-bot, para repoblar el formulario
function stringValues(fd: FormData) {
  const values: Record<string, string> = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string" && k !== "website" && k !== "startedAt") values[k] = v;
  }
  return values;
}

function toObject(fd: FormData) {
  const obj: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) obj[k] = v;
  if (obj.consentimiento === "on") obj.consentimiento = true;
  return obj;
}

// Honeypot lleno o envio demasiado rapido: se responde exito sin procesar,
// para no darle senales al bot.
function looksAutomated(website: string | undefined, startedAt: number) {
  return Boolean(website) || Date.now() - startedAt < MIN_FILL_MS;
}

// Traduce el resultado de la entrega al estado del formulario, conservando lo escrito
function fromDelivery(result: Delivery, values: Record<string, string>): FormResult {
  if (result.ok) return { status: "success" };
  if (result.fieldErrors) {
    return {
      status: "error",
      message: result.message ?? REVIEW_FIELDS,
      fieldErrors: result.fieldErrors,
      values,
    };
  }
  return { status: "error", message: result.message ?? GENERIC_ERROR, values };
}

export async function submitContacto(_prev: FormResult | null, fd: FormData): Promise<FormResult> {
  const blocked = await guard("contacto");
  if (blocked) return blocked;

  const parsed = contactoSchema.safeParse(toObject(fd));
  if (!parsed.success) {
    return {
      status: "error",
      message: REVIEW_FIELDS,
      fieldErrors: fieldErrors(parsed.error),
      values: stringValues(fd),
    };
  }

  const { website, startedAt, ...data } = parsed.data;
  if (looksAutomated(website, startedAt)) return { status: "success" };

  return fromDelivery(await deliverContacto(data), stringValues(fd));
}

export async function submitReclamo(_prev: FormResult | null, fd: FormData): Promise<FormResult> {
  const blocked = await guard("reclamo");
  if (blocked) return blocked;

  const parsed = reclamoSchema.safeParse(toObject(fd));
  if (!parsed.success) {
    return {
      status: "error",
      message: REVIEW_FIELDS,
      fieldErrors: fieldErrors(parsed.error),
      values: stringValues(fd),
    };
  }

  const { website, startedAt, ...data } = parsed.data;
  if (looksAutomated(website, startedAt)) return { status: "success" };

  return fromDelivery(await deliverReclamo(data), stringValues(fd));
}

export async function submitPostulacion(_prev: FormResult | null, fd: FormData): Promise<FormResult> {
  const blocked = await guard("postulacion");
  if (blocked) return blocked;

  const cv = fd.get("cv");
  fd.delete("cv");
  const values = stringValues(fd);

  const parsed = postulacionSchema.safeParse(toObject(fd));
  if (!parsed.success) {
    return { status: "error", message: REVIEW_FIELDS, fieldErrors: fieldErrors(parsed.error), values };
  }

  if (!(cv instanceof File) || cv.size === 0) {
    return { status: "error", message: REVIEW_FIELDS, fieldErrors: { cv: "Adjunta tu CV" }, values };
  }
  if (cv.size > LIMITS.cvMaxBytes) {
    return {
      status: "error",
      message: REVIEW_FIELDS,
      fieldErrors: { cv: "El archivo supera los 5 MB" },
      values,
    };
  }
  const head = new Uint8Array(await cv.slice(0, 8).arrayBuffer());
  const type = detectCvType(head);
  if (!type) {
    return {
      status: "error",
      message: REVIEW_FIELDS,
      fieldErrors: { cv: "Solo aceptamos PDF, DOC o DOCX" },
      values,
    };
  }

  const { website, startedAt, ...data } = parsed.data;
  if (looksAutomated(website, startedAt)) return { status: "success" };

  // Nombre regenerado en servidor: nunca el del usuario
  const safeFile = new File([await cv.arrayBuffer()], `cv-${crypto.randomUUID()}.${type.ext}`, {
    type: type.mime,
  });

  return fromDelivery(await deliverPostulacion(data, safeFile), values);
}
