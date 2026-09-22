// Forma serializable del miembro del equipo para Client Components.
// No importa el schema: asi Zod no entra al bundle del cliente.
export type PublicMember = {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  photo?: string;
  whatsapp?: string;
  sexo?: "masculino" | "femenino";
};
