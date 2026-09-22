import "server-only";
import { teamData } from "@/features/equipo/data/team";
import { teamMemberSchema, type TeamMember } from "@/features/equipo/schemas/team-member";
import { vendedoresSchema } from "@/features/equipo/schemas/vendedor";
import type { PublicMember } from "@/features/equipo/types/public-member";
import { buildTeamFromApi } from "@/features/equipo/utils/from-api";
import { apiGet } from "@/shared/lib/api";
import { whatsappUrl } from "@/shared/lib/site";

// Unico punto de acceso al equipo. Fuente: GET /vendedores/ del backend, cacheado una hora
// en el Data Cache de Next. Si el backend falla o responde algo inesperado, se sirve la
// lista local (data/team.ts), que ademas aporta fotos y socios fundadores.

const REVALIDATE_SECONDS = 60 * 60;

const localTeam: TeamMember[] = teamData.map((m) => teamMemberSchema.parse(m));

export async function getTeam(): Promise<TeamMember[]> {
  const res = await apiGet<unknown>("/vendedores/", REVALIDATE_SECONDS);
  if (!res.ok) return localTeam;
  const parsed = vendedoresSchema.safeParse(res.data);
  if (!parsed.success || parsed.data.length === 0) return localTeam;
  return buildTeamFromApi(parsed.data, localTeam);
}

export const isLawyer = (m: TeamMember) => m.role === "Abogado" || m.role === "Abogada";

export const getLawyers = async () => (await getTeam()).filter(isLawyer);

// Los socios no vienen del backend: siempre desde los datos locales
export const getFounders = () => localTeam.filter((m) => m.featured);

export const memberWhatsappUrl = (member: TeamMember) =>
  member.whatsapp
    ? whatsappUrl(member.whatsapp, `Hola, quisiera contactarme con ${member.firstName}`)
    : undefined;

export const toPublicMember = (m: TeamMember): PublicMember => ({
  slug: m.slug,
  name: m.name,
  firstName: m.firstName,
  role: m.role,
  photo: m.photo,
  whatsapp: m.whatsapp,
  sexo: m.sexo,
});
