import { LIMITS, NAME_PATTERN } from "@/features/contacto/constants/limits";
import { COUNTRIES } from "@/features/contacto/constants/countries";

// Reglas de validacion compartidas: react-hook-form las usa en el navegador y los
// schemas Zod las vuelven a aplicar en el servidor. Son funciones puras, sin React ni
// Zod, para que ninguna de las dos capas arrastre a la otra al bundle.
//
// Contrato: devuelven null si el valor es valido, o el mensaje de error para mostrar.
export type Rule<T = string> = (value: T) => string | null;

// Encadena reglas y devuelve el primer error
export const all =
  <T>(...rules: Rule<T>[]): Rule<T> =>
  (value) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

// Adaptador para la prop `validate` de react-hook-form, que espera true o el mensaje
export const toRhf =
  <T>(rule: Rule<T>) =>
  (value: T) =>
    rule(value) ?? true;

const collapse = (value: string) => value.trim().replace(/\s+/g, " ");

const NAME_RE = new RegExp(NAME_PATTERN);
const VOWEL_RE = /[aeiouáéíóúü]/i;
const REPEATED_RE = /(.)\1{3,}/;
const URL_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|cl|net|org|io|ru|xyz|top|info)\b)/i;
const HTML_RE = /<\s*[a-z!/]/i;
const KEYBOARD_RUNS = ["qwerty", "asdfgh", "zxcvbn", "123456", "qazwsx"];

// Dominios de correo temporal mas usados para registros basura
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "maildrop.cc",
  "dispostable.com",
]);

// Un texto escrito por una persona tiene variedad: "aaaaaaa" o "qwertyqwerty" no.
const looksTyped: Rule = (value) => {
  const clean = collapse(value).toLowerCase();
  if (!clean) return null;
  if (REPEATED_RE.test(clean)) return "Ese valor no parece real: tiene letras repetidas muchas veces";
  if (KEYBOARD_RUNS.some((run) => clean.includes(run))) return "Ese valor no parece real";
  const unique = new Set(clean.replace(/\s/g, "")).size;
  if (clean.replace(/\s/g, "").length >= 6 && unique <= 2) return "Ese valor no parece real";
  return null;
};

export const nameRule = (campo: string, limits: { min: number; max: number } = LIMITS.nombre): Rule =>
  all(
    (value) => (collapse(value).length >= limits.min ? null : `Escribe tu ${campo}`),
    (value) =>
      collapse(value).length <= limits.max ? null : `El ${campo} no puede superar ${limits.max} caracteres`,
    (value) => (NAME_RE.test(collapse(value)) ? null : `El ${campo} solo puede tener letras`),
    (value) => (VOWEL_RE.test(value) ? null : `Revisa el ${campo}: no parece un nombre`),
    looksTyped,
  );

// Nombre y apellido: al menos dos palabras con contenido
export const fullNameRule = (campo: string): Rule =>
  all(nameRule(campo, LIMITS.nombreCompleto), (value) =>
    collapse(value)
      .split(" ")
      .filter((w) => w.length >= 2).length >= 2
      ? null
      : "Escribe tu nombre y al menos un apellido",
  );

// Formato practico de correo: una arroba, dominio con punto y TLD de 2 o mas letras.
// No admite puntos consecutivos ni al inicio o final de la parte local.
const EMAIL_RE =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

export const emailRule: Rule = all(
  (value) => (value.trim() ? null : "Escribe tu correo electrónico"),
  (value) =>
    value.trim().length <= LIMITS.email.max
      ? null
      : `El correo no puede superar ${LIMITS.email.max} caracteres`,
  (value) => (EMAIL_RE.test(value.trim()) ? null : "Escribe un correo válido, por ejemplo nombre@dominio.cl"),
  (value) =>
    DISPOSABLE_DOMAINS.has(value.trim().toLowerCase().split("@")[1] ?? "")
      ? "Usa un correo permanente: a esa dirección te responderemos"
      : null,
);

const byDialLength = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

// Un numero real no es todo el mismo digito ni una cuenta corrida
const plausibleNumber: Rule = (digits) => {
  if ("0123456789".includes(digits) || "9876543210".includes(digits)) return "Ese número no parece real";
  // "911111111" o "999999999": nadie tiene un movil escrito con uno o dos digitos
  if (new Set(digits).size <= 2) return "Ese número no parece real";
  return null;
};

// Valida el numero ya normalizado a digitos con prefijo pais ("56912345678")
export const phoneRule: Rule = all(
  (digits) => (digits ? null : "Escribe tu número de teléfono"),
  (digits) => {
    const country = byDialLength.find((c) => digits.startsWith(c.dial.slice(1)));
    if (!country) return "Elige el país y escribe tu número";
    const national = digits.slice(country.dial.length - 1);
    if (national.length < country.min || national.length > country.max) {
      return country.min === country.max
        ? `El número de ${country.name} tiene ${country.min} dígitos`
        : `El número de ${country.name} tiene entre ${country.min} y ${country.max} dígitos`;
    }
    return plausibleNumber(national);
  },
);

// Monto opcional: si se escribe, tiene que ser plausible para una deuda real
export const amountRule: Rule = (value) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const amount = Number(digits);
  if (!Number.isSafeInteger(amount)) return "Revisa el monto";
  if (amount < LIMITS.monto.min)
    return `El monto mínimo es ${LIMITS.monto.min.toLocaleString("es-CL")} pesos`;
  if (amount > LIMITS.monto.max) {
    return `Si tu deuda supera los ${(LIMITS.monto.max / 1_000_000).toLocaleString("es-CL")} millones, cuéntanoslo en el mensaje`;
  }
  return null;
};

// Texto libre: largo, palabras reales y sin las marcas tipicas del spam
export const textRule = (min: number, max: number, vacio: string): Rule =>
  all(
    (value) => (value.trim().length >= min ? null : vacio),
    (value) => (value.trim().length <= max ? null : `Máximo ${max} caracteres`),
    (value) =>
      collapse(value)
        .split(" ")
        .filter((w) => w.length >= 2).length >= 4
        ? null
        : "Escríbelo con tus palabras para que podamos ayudarte",
    // Se descartan los correos antes de buscar enlaces: escribir el propio correo
    // dentro del mensaje es legitimo y no debe confundirse con spam
    (value) =>
      URL_RE.test(value.replace(/[\w.+-]+@[\w.-]+/g, " "))
        ? "No incluyas enlaces. Si necesitas enviarnos un documento, te diremos cómo hacerlo"
        : null,
    (value) => (HTML_RE.test(value) ? "No se permite código en el mensaje" : null),
    looksTyped,
  );

// Fecha ISO real, no solo con formato correcto (descarta 2026-02-31)
const isRealDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

export const ageAt = (birth: Date, now: Date) => {
  let age = now.getUTCFullYear() - birth.getUTCFullYear();
  const beforeBirthday =
    now.getUTCMonth() < birth.getUTCMonth() ||
    (now.getUTCMonth() === birth.getUTCMonth() && now.getUTCDate() < birth.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
};

export const birthDateRule: Rule = all(
  (value) => (/^\d{4}-\d{2}-\d{2}$/.test(value) ? null : "Indica tu fecha de nacimiento"),
  (value) => (isRealDate(value) ? null : "Esa fecha no existe en el calendario"),
  (value) => {
    const age = ageAt(new Date(`${value}T00:00:00Z`), new Date());
    if (age < LIMITS.edad.min) return `Debes tener al menos ${LIMITS.edad.min} años para postular`;
    if (age > LIMITS.edad.max) return "Revisa el año de nacimiento";
    return null;
  },
);

export const requiredChoice =
  (values: readonly string[], mensaje: string): Rule =>
  (value) =>
    values.includes(value) ? null : mensaje;
