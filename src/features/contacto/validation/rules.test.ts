import { describe, expect, it } from "vitest";
import { LIMITS } from "@/features/contacto/constants/limits";
import {
  amountRule,
  birthDateRule,
  emailRule,
  fullNameRule,
  nameRule,
  phoneRule,
  requiredChoice,
  textRule,
  toRhf,
} from "./rules";

const nombre = nameRule("nombre");
const mensaje = textRule(20, 1500, "Cuéntanos un poco más");

describe("nameRule", () => {
  it("acepta nombres reales con tildes, guiones y apóstrofes", () => {
    for (const value of ["Camila", "José-María", "O'Higgins", "Ñuñoa Pérez"]) {
      expect(nombre(value)).toBeNull();
    }
  });
  it("rechaza dígitos, largos fuera de rango y texto sin vocales", () => {
    expect(nombre("R2D2")).toMatch(/solo puede tener letras/);
    expect(nombre("A")).toMatch(/Escribe tu nombre/);
    expect(nombre("x".repeat(61))).toMatch(/no puede superar/);
    expect(nombre("bcdfg")).toMatch(/no parece un nombre/);
  });
  it("rechaza relleno de teclado y letras repetidas", () => {
    expect(nombre("aaaaaa")).toMatch(/no parece real/);
    expect(nombre("qwerty")).toMatch(/no parece real/);
  });
});

describe("fullNameRule", () => {
  const completo = fullNameRule("nombre completo");
  it("exige al menos dos palabras con contenido", () => {
    expect(completo("Andrés Soto")).toBeNull();
    expect(completo("Andrés")).toMatch(/al menos un apellido/);
  });
});

describe("emailRule", () => {
  it("acepta direcciones válidas", () => {
    for (const value of ["camila@example.cl", "a.b+c@sub.dominio.com"]) {
      expect(emailRule(value)).toBeNull();
    }
  });
  it("rechaza formatos inválidos", () => {
    for (const value of ["camila@ejemplo", "camila@@x.cl", "@x.cl", "camila.cl", "a b@x.cl"]) {
      expect(emailRule(value)).toMatch(/correo válido/);
    }
  });
  it("rechaza correos temporales de un solo uso", () => {
    expect(emailRule("test@mailinator.com")).toMatch(/correo permanente/);
  });
});

describe("phoneRule", () => {
  it("valida el largo real de cada país", () => {
    expect(phoneRule("56912345678")).toBeNull();
    expect(phoneRule("51912345678")).toBeNull();
    expect(phoneRule("5691234567")).toMatch(/9 dígitos/);
  });
  it("rechaza números inventados", () => {
    expect(phoneRule("56911111111")).toMatch(/no parece real/);
    expect(phoneRule("56987654321")).toMatch(/no parece real/);
  });
  it("rechaza prefijos desconocidos", () => {
    expect(phoneRule("819012345678")).toMatch(/Elige el país/);
  });
});

describe("amountRule", () => {
  it("permite dejarlo vacío", () => {
    expect(amountRule("")).toBeNull();
  });
  it("acepta montos plausibles con o sin separadores", () => {
    expect(amountRule("1.500.000")).toBeNull();
    expect(amountRule("1500000")).toBeNull();
  });
  it("rechaza cifras demasiado bajas o exageradas", () => {
    expect(amountRule("500")).toMatch(/monto mínimo/);
    expect(amountRule(String(LIMITS.monto.max + 1))).toMatch(/cuéntanoslo en el mensaje/);
    expect(amountRule("1000000000000")).toMatch(/cuéntanoslo en el mensaje/);
  });
});

describe("textRule", () => {
  it("acepta un texto escrito por una persona", () => {
    expect(mensaje("Tengo deudas con dos bancos desde 2021 y no puedo pagarlas.")).toBeNull();
  });
  it("rechaza textos cortos, repetidos o de pocas palabras", () => {
    expect(mensaje("hola")).toMatch(/Cuéntanos un poco más/);
    // Un bloque sin espacios falla antes por no tener palabras suficientes
    expect(mensaje("a".repeat(40))).toMatch(/con tus palabras/);
    expect(mensaje("aaaa aaaa aaaa aaaa aaaa aaaa")).toMatch(/no parece real/);
  });
  it("rechaza enlaces y código, que son la marca del spam", () => {
    expect(mensaje("Visita https://spam.example para ganar dinero rápido ahora")).toMatch(/enlaces/);
    expect(mensaje("Hola <script>alert(1)</script> necesito ayuda con mis deudas")).toMatch(/código/);
  });
  it("no confunde un correo dentro del mensaje con un enlace", () => {
    expect(mensaje("Escríbeme también a camila@example.cl porque reviso poco el teléfono")).toBeNull();
  });
});

describe("birthDateRule", () => {
  it("acepta una fecha real de alguien en edad de trabajar", () => {
    expect(birthDateRule("1995-04-12")).toBeNull();
  });
  it("rechaza fechas que no existen y edades fuera de rango", () => {
    expect(birthDateRule("2026-02-31")).toMatch(/no existe/);
    const menor = new Date().getFullYear() - 16;
    expect(birthDateRule(`${menor}-01-01`)).toMatch(/al menos 18 años/);
    expect(birthDateRule("1900-01-01")).toMatch(/Revisa el año/);
  });
});

describe("requiredChoice y toRhf", () => {
  it("exige un valor de la lista", () => {
    const rule = requiredChoice(["persona", "empresa"], "Elige una opción");
    expect(rule("persona")).toBeNull();
    expect(rule("")).toBe("Elige una opción");
  });
  it("toRhf traduce el contrato al que espera react-hook-form", () => {
    expect(toRhf(nombre)("Camila")).toBe(true);
    expect(toRhf(nombre)("R2D2")).toMatch(/solo puede tener letras/);
  });
});
