import type { Vendedor } from "@/features/equipo/schemas/vendedor";
import type { TeamMember } from "@/features/equipo/schemas/team-member";
import { normalize } from "@/features/equipo/utils/search";

// slug estable a partir del nombre: "Rodrigo Álvarez" -> "rodrigo-alvarez"
export const slugify = (name: string) =>
  normalize(name)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// Telefono chileno en digitos: "+56 9 8443 3145" -> "56984433145". Descarta lo que no calza.
export const toWhatsapp = (raw: string | null | undefined) => {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (/^569\d{8}$/.test(digits)) return digits;
  if (/^9\d{8}$/.test(digits)) return `56${digits}`;
  return undefined;
};

// Rol segun el sexo que entrega el backend. Sin dato, se conserva el rol local si existe.
const roleFrom = (sexo: Vendedor["sexo"], fallback?: TeamMember["role"]) => {
  if (sexo === "femenino") return "Abogada" as const;
  if (sexo === "masculino") return "Abogado" as const;
  return fallback ?? ("Abogado" as const);
};

// Construye el equipo desde el backend, completando con los datos locales (foto, rol si
// falta el sexo). El orden es el del backend. Los socios fundadores no vienen de la API.
export function buildTeamFromApi(items: Vendedor[], local: TeamMember[]): TeamMember[] {
  const bySlug = new Map(local.map((m) => [m.slug, m]));
  const founders = local.filter((m) => m.featured);
  const lawyers = items.map((v) => {
    const name = v.nombre.trim().replace(/\s+/g, " ");
    const slug = slugify(name);
    const known = bySlug.get(slug);
    return {
      slug,
      name,
      firstName: name.split(" ")[0] ?? name,
      role: roleFrom(v.sexo, known?.role),
      whatsapp: toWhatsapp(v.telefono_empresa) ?? known?.whatsapp,
      photo: known?.photo,
      photoSize: known?.photoSize,
      featured: false,
      sexo: v.sexo ?? undefined,
    } satisfies TeamMember;
  });
  return [...founders, ...lawyers];
}
