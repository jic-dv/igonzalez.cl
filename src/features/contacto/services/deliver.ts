import "server-only";
import type { Contacto, Postulacion, Reclamo } from "@/features/contacto/schemas/forms";
import { apiPostForm, apiPostJson, drfFieldErrors } from "@/shared/lib/api";
import { env } from "@/shared/lib/env";

export type Delivery = { ok: true } | { ok: false; message?: string; fieldErrors?: Record<string, string> };

type ReclamoResponse = { success?: boolean; message?: string };

// Contratos del backend (api.igonzalez.cl), replicados del sitio anterior:
//   POST /enviar-contacto/     JSON  { nombre, apellido, email, celular, monto_deuda, tipo_deudor, mensaje }
//   POST /enviar-reclamo/      JSON  { nombre, apellido, email, celular, descripcion } -> { success, message }
//   POST /enviar-postulacion/  multipart { nombre, telefono, correo, fecha_nacimiento, cargo, motivacion, cv }
// Los nombres de campo del backend se traducen a los del formulario para marcar errores.

const contactoFields = {
  nombre: "nombre",
  apellido: "apellido",
  email: "email",
  celular: "celular",
  monto_deuda: "monto",
  tipo_deudor: "tipoDeudor",
  mensaje: "mensaje",
};

const reclamoFields = {
  nombre: "nombre",
  apellido: "apellido",
  email: "email",
  celular: "celular",
  descripcion: "mensaje",
};

const postulacionFields = {
  nombre: "nombreCompleto",
  telefono: "telefono",
  correo: "email",
  fecha_nacimiento: "fechaNacimiento",
  cargo: "cargo",
  motivacion: "motivacion",
  cv: "cv",
};

// En desarrollo y en E2E se simula el envio para no crear registros reales en el backend.
const simulated = () =>
  env.E2E_MOCK_DELIVERY === "1" || (env.NODE_ENV !== "production" && env.API_DELIVERY_IN_DEV !== "1");

function failure(status: number, data: unknown, fieldMap: Record<string, string>): Delivery {
  if (status >= 400 && status < 500) {
    const { fields, general } = drfFieldErrors(data, fieldMap);
    return { ok: false, fieldErrors: Object.keys(fields).length ? fields : undefined, message: general };
  }
  return { ok: false };
}

type ContactoData = Omit<Contacto, "website" | "startedAt">;

export async function deliverContacto(data: ContactoData): Promise<Delivery> {
  if (simulated()) return { ok: true };
  const res = await apiPostJson("/enviar-contacto/", {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    celular: data.celular,
    monto_deuda: data.monto ?? 0,
    tipo_deudor: data.tipoDeudor,
    mensaje: data.mensaje,
  });
  return res.ok ? { ok: true } : failure(res.status, res.data, contactoFields);
}

type ReclamoData = Omit<Reclamo, "website" | "startedAt">;

export async function deliverReclamo(data: ReclamoData): Promise<Delivery> {
  if (simulated()) return { ok: true };
  const res = await apiPostJson<ReclamoResponse>("/enviar-reclamo/", {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    celular: data.celular,
    descripcion: data.mensaje,
  });
  if (!res.ok) return failure(res.status, res.data, reclamoFields);
  // El backend responde 200 con success:false cuando rechaza el reclamo
  if (res.data && typeof res.data === "object" && res.data.success === false) {
    return { ok: false, message: res.data.message };
  }
  return { ok: true };
}

type PostulacionData = Omit<Postulacion, "website" | "startedAt">;

export async function deliverPostulacion(data: PostulacionData, cv: File): Promise<Delivery> {
  if (simulated()) return { ok: true };
  const fd = new FormData();
  fd.set("nombre", data.nombreCompleto);
  fd.set("telefono", data.telefono);
  fd.set("correo", data.email);
  fd.set("fecha_nacimiento", data.fechaNacimiento);
  fd.set("cargo", data.cargo);
  fd.set("motivacion", data.motivacion);
  fd.set("cv", cv, cv.name);
  const res = await apiPostForm("/enviar-postulacion/", fd);
  return res.ok ? { ok: true } : failure(res.status, res.data, postulacionFields);
}
