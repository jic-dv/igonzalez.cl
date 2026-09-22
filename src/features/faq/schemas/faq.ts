import { z } from "zod";

export const faqSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  question: z.string().min(10),
  // Parrafos de la respuesta. Texto plano: se renderiza sin HTML.
  answer: z.array(z.string().min(10)).min(1),
});

export type Faq = z.infer<typeof faqSchema>;
