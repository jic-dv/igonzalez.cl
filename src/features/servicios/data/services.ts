import type { Service } from "@/features/servicios/schemas/service";

// Contenido publicado en igonzalez.cl. Las descripciones se mantienen textuales;
// mechanisms y examples se extraen de esas mismas descripciones.
export const servicesData = [
  {
    slug: "deudas-de-impuestos",
    title: "Deudas de impuestos",
    shortTitle: "Deudas fiscales",
    summary:
      "Deudas de IVA, Renta y multas de la Inspección del Trabajo se pueden eliminar a través del abandono del procedimiento y la prescripción.",
    description:
      "Eliminamos deudas de impuestos. Día a día vemos empresas y personas que no pudieron pagar sus obligaciones tributarias quedando con deudas de IVA, Renta e incluso multas de la Inspección del Trabajo. Todas esas deudas se pueden eliminar a través del abandono y la prescripción.",
    mechanisms: ["Abandono del procedimiento", "Prescripción"],
    examples: ["IVA", "Impuesto a la Renta", "Multas de la Inspección del Trabajo"],
  },
  {
    slug: "deudas-comerciales",
    title: "Deudas comerciales",
    shortTitle: "Deudas comerciales",
    summary:
      "Deudas con bancos, casas comerciales y clínicas se pueden eliminar mediante la prescripción o un procedimiento concursal, lo que comúnmente se conoce como quiebra.",
    description:
      "Eliminamos deudas con bancos, casas comerciales, clínicas, etc. Todas las deudas se pueden eliminar a través de la prescripción o bien a través de alguno de los procedimientos concursales establecidos en la Ley, lo que comúnmente se conoce como quiebra.",
    mechanisms: ["Prescripción", "Procedimientos concursales (Ley 20.720)"],
    examples: ["Bancos", "Casas comerciales", "Clínicas"],
  },
] satisfies Service[];
