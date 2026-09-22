// Prefijos telefonicos de los paises desde los que llegan consultas a la oficina.
// Chile primero: es el caso normal y el valor por defecto.
// min/max son los digitos del numero nacional, sin el prefijo.
// Modulo sin Zod: lo importan tanto los formularios (cliente) como los schemas (servidor).

export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
  min: number;
  max: number;
  example: string;
};

export const COUNTRIES: readonly Country[] = [
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱", min: 9, max: 9, example: "9 1234 5678" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷", min: 10, max: 11, example: "11 1234 5678" },
  { code: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴", min: 8, max: 8, example: "7123 4567" },
  { code: "BR", name: "Brasil", dial: "+55", flag: "🇧🇷", min: 10, max: 11, example: "11 91234 5678" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴", min: 10, max: 10, example: "301 234 5678" },
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷", min: 8, max: 8, example: "8312 3456" },
  { code: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨", min: 9, max: 9, example: "99 123 4567" },
  { code: "SV", name: "El Salvador", dial: "+503", flag: "🇸🇻", min: 8, max: 8, example: "7123 4567" },
  { code: "GT", name: "Guatemala", dial: "+502", flag: "🇬🇹", min: 8, max: 8, example: "5123 4567" },
  { code: "HN", name: "Honduras", dial: "+504", flag: "🇭🇳", min: 8, max: 8, example: "9123 4567" },
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽", min: 10, max: 10, example: "55 1234 5678" },
  { code: "NI", name: "Nicaragua", dial: "+505", flag: "🇳🇮", min: 8, max: 8, example: "8123 4567" },
  { code: "PA", name: "Panamá", dial: "+507", flag: "🇵🇦", min: 8, max: 8, example: "6123 4567" },
  { code: "PY", name: "Paraguay", dial: "+595", flag: "🇵🇾", min: 9, max: 9, example: "981 234 567" },
  { code: "PE", name: "Perú", dial: "+51", flag: "🇵🇪", min: 9, max: 9, example: "912 345 678" },
  {
    code: "DO",
    name: "República Dominicana",
    dial: "+1809",
    flag: "🇩🇴",
    min: 7,
    max: 7,
    example: "234 5678",
  },
  { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾", min: 8, max: 9, example: "94 123 456" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪", min: 10, max: 10, example: "412 123 4567" },
  { code: "ES", name: "España", dial: "+34", flag: "🇪🇸", min: 9, max: 9, example: "612 345 678" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "🇺🇸", min: 10, max: 10, example: "305 123 4567" },
] as const;

export const DEFAULT_COUNTRY = "CL";

export const countryByCode = (code: string) => COUNTRIES.find((c) => c.code === code);

// Prefijos de mayor a menor longitud: "+1809" debe ganarle a "+1" al identificar el pais
const byDialLength = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

// Separa "+56912345678" en pais y numero nacional. Si no calza con ningun prefijo
// conocido, devuelve Chile y el resto sin tocar para que la validacion lo rechace.
export function splitPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return { code: DEFAULT_COUNTRY, national: "" };
  const match = byDialLength.find((c) => digits.startsWith(c.dial.slice(1)));
  if (!match) return { code: DEFAULT_COUNTRY, national: digits };
  return { code: match.code, national: digits.slice(match.dial.length - 1) };
}
