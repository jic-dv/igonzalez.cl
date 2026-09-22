import { z } from "zod";

// Schema de servidor separado del de cliente: un import accidental en un
// Client Component no puede filtrar secretos porque este modulo es server-only.
import "server-only";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Backend de la oficina (formularios y equipo). Sin barra final.
  IGONZALEZ_API_URL: z.url().default("https://api.igonzalez.cl/api"),
  // En desarrollo los formularios no se envian al backend real salvo que se active.
  API_DELIVERY_IN_DEV: z.literal("1").optional(),
  // Solo para Playwright: simula la entrega del formulario en el build de produccion.
  E2E_MOCK_DELIVERY: z.literal("1").optional(),
});

const parsed = serverSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Variables de entorno invalidas: ${z.prettifyError(parsed.error)}`);
}

export const env = parsed.data;
