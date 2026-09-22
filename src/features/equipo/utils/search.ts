import type { PublicMember } from "@/features/equipo/types/public-member";

// Normaliza para comparar sin acentos ni mayusculas: "Álvarez" == "alvarez"
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const digits = (s: string) => s.replace(/\D/g, "");

// Coincide por nombre (cualquier palabra, sin acentos) o por numero (fragmento de digitos).
// Con menos de 2 caracteres utiles no filtra: devuelve la lista completa.
export function searchMembers(members: PublicMember[], query: string): PublicMember[] {
  const q = normalize(query);
  const qDigits = digits(query);
  if (q.length < 2 && qDigits.length < 2) return members;

  return members.filter((m) => {
    const byName = q.length >= 2 && normalize(m.name).includes(q);
    const byPhone = qDigits.length >= 2 && (m.whatsapp ?? "").includes(qDigits);
    return byName || byPhone;
  });
}
