// Limites compartidos por los schemas Zod (servidor) y los atributos HTML5 de los
// formularios (cliente). Un solo lugar: si cambia aqui, cambia en ambos lados.
export const LIMITS = {
  nombre: { min: 2, max: 60 },
  nombreCompleto: { min: 5, max: 80 },
  email: { max: 120 },
  mensaje: { min: 20, max: 1500 },
  descripcion: { min: 20, max: 1500 },
  motivacion: { min: 40, max: 1200 },
  // Rango plausible para una deuda real en Chile: desde 10 mil pesos hasta 5 mil millones.
  // Un tope mas alto solo sirve para que entren cifras inventadas.
  monto: { min: 10_000, max: 5_000_000_000 },
  edad: { min: 18, max: 90 },
  cvMaxBytes: 5 * 1024 * 1024,
} as const;

// Solo letras latinas (con acentos y enie), espacios, apostrofes y guiones. Sirve para pattern= y para Zod.
// Rango explicito en vez de \p{L}: pattern= no exige modo Unicode y happy-dom no lo soporta.
export const NAME_PATTERN = "^[A-Za-zÀ-ÖØ-öø-ɏ' -]+$";

// Fecha ISO (YYYY-MM-DD) de hace N anos, para min/max del campo de nacimiento
export const isoDateYearsAgo = (years: number, now = new Date()) => {
  const d = new Date(Date.UTC(now.getUTCFullYear() - years, now.getUTCMonth(), now.getUTCDate()));
  return d.toISOString().slice(0, 10);
};
