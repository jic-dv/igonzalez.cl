import { LIMITS } from "@/features/contacto/constants/limits";
import type { Rule } from "@/features/contacto/validation/rules";

// Tipos aceptados para el CV. En el navegador solo se comprueban extension y peso,
// que es lo que se puede saber sin leer el archivo; el servidor verifica despues el
// contenido real por sus primeros bytes (shared/lib/file-type.ts).
export const CV_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const CV_ACCEPT = [
  ...CV_EXTENSIONS,
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

const megabytes = (bytes: number) => Math.round(bytes / (1024 * 1024));

export const cvFileRule: Rule<FileList | File | null | undefined> = (value) => {
  const file = value instanceof FileList ? value[0] : value;
  if (!file) return "Adjunta tu CV";
  if (file.size === 0) return "El archivo está vacío";
  if (file.size > LIMITS.cvMaxBytes) return `El archivo supera los ${megabytes(LIMITS.cvMaxBytes)} MB`;
  const name = file.name.toLowerCase();
  if (!CV_EXTENSIONS.some((ext) => name.endsWith(ext))) return "Solo aceptamos PDF, DOC o DOCX";
  return null;
};
