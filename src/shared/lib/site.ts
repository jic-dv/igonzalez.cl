// Datos publicos del sitio. Sin secretos: este modulo se importa desde cliente y servidor.
export const site = {
  name: "IGonzalez",
  legalName: "González y Acuña Limitada",
  rut: "77.478.255-9",
  url: "https://www.igonzalez.cl",
  locale: "es_CL",
  lang: "es-CL",
  phoneDisplay: "+56 9 8838 1428",
  whatsapp: "56988381428",
  email: "rodalvarez@igonzalez.cl",
  sacEmail: "sac@igonzalez.cl",
  address: {
    street: "Barros Arana 1098, piso 14, oficina 1402",
    city: "Concepción",
    region: "Región del Biobío",
    country: "CL",
  },
  hours: "Lunes a viernes, 9:00 a 18:00 h",
  social: {
    tiktok: { handle: "@abogadoivangonzalez", url: "https://www.tiktok.com/@abogadoivangonzalez" },
    instagram: { handle: "@abogadoivangonzalez", url: "https://www.instagram.com/abogadoivangonzalez" },
    facebook: { handle: "@ivangonzalezabogado", url: "https://www.facebook.com/ivangonzalezabogado" },
  },
  foundedYear: 2020,
  // Variantes con que la gente escribe la marca al buscar. Alimentan alternateName
  // del JSON-LD; no se usan para repetir palabras clave en el texto visible.
  alternateNames: ["IGonzález", "IGonzalez.cl", "I González Abogados", "Igonzales", "Abogados IGonzalez"],
  // El fundador es la entidad mas buscada del sitio: tiene pagina propia
  founder: {
    name: "Iván González Navarrete",
    firstName: "Iván",
    path: "/ivan-gonzalez",
    jobTitle: "Abogado",
    description:
      "Abogado chileno especialista en deudas fiscales y comerciales, conocido por sus videos sobre deudas en TikTok e Instagram. Ex abogado de la Tesorería General de la República y fundador de IGonzalez.",
    // Variantes de escritura y acentuacion con las que se le busca
    alternateNames: [
      "Iván González",
      "Ivan Gonzalez",
      "Ivan Gonzales",
      "Iván González Navarrete",
      "Abogado Iván González",
      // Apodo con el que lo busca quien lo conocio por sus videos
      "El abogado de TikTok",
      "Abogado de TikTok",
    ],
    knowsAbout: [
      "Prescripción de deudas",
      "Abandono del procedimiento",
      "Procedimientos concursales",
      "Deudas tributarias",
      "Cobranza judicial",
    ],
  },
} as const;

export const whatsappUrl = (phone: string, text?: string) =>
  `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
