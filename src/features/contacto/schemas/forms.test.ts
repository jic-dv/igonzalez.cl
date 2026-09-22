import { describe, expect, it } from "vitest";
import { contactoSchema, postulacionSchema, telefono } from "./forms";

const base = {
  nombre: "Camila",
  apellido: "Rojas",
  email: "camila@example.cl",
  celular: "+56912345678",
  tipoDeudor: "persona",
  mensaje: "Tengo deudas con dos bancos desde 2021 y no puedo pagarlas.",
  consentimiento: true,
  website: "",
  startedAt: 1,
};

describe("telefono", () => {
  it("normaliza formatos chilenos comunes a +569XXXXXXXX", () => {
    expect(telefono.parse("+56 9 1234 5678")).toBe("+56912345678");
    expect(telefono.parse("912345678")).toBe("+56912345678");
    expect(telefono.parse("56912345678")).toBe("+56912345678");
  });
  it("acepta otros paises de la lista con su largo real", () => {
    expect(telefono.parse("+51 912 345 678")).toBe("+51912345678");
    expect(telefono.parse("+507 6123 4567")).toBe("+50761234567");
    expect(telefono.parse("+55 11 91234 5678")).toBe("+5511912345678");
  });
  it("rechaza numeros inventados: todos iguales o en secuencia", () => {
    expect(telefono.safeParse("+56 9 1111 1111").success).toBe(false);
    expect(telefono.safeParse("+56 987654321").success).toBe(false);
    expect(telefono.safeParse("+56 912345678").success).toBe(true);
  });
  it("rechaza numeros con largo incorrecto para el pais", () => {
    // Peru son 9 digitos: 10 debe fallar
    expect(telefono.safeParse("+51 9123456789").success).toBe(false);
    // Chile: 8 digitos no alcanza
    expect(telefono.safeParse("+56 91234567").success).toBe(false);
  });
  it("rechaza prefijos fuera de la lista y entradas vacias", () => {
    expect(telefono.safeParse("+81 90 1234 5678").success).toBe(false);
    expect(telefono.safeParse("").success).toBe(false);
    expect(telefono.safeParse("41 222 3333").success).toBe(false);
  });
});

describe("contactoSchema", () => {
  it("acepta un envio valido y deja monto indefinido si viene vacio", () => {
    const r = contactoSchema.parse({ ...base, monto: "" });
    expect(r.monto).toBeUndefined();
    expect(r.celular).toBe("+56912345678");
  });
  it("convierte monto a numero", () => {
    expect(contactoSchema.parse({ ...base, monto: "1500000" }).monto).toBe(1500000);
  });
  it("exige consentimiento explicito", () => {
    const r = contactoSchema.safeParse({ ...base, consentimiento: false });
    expect(r.success).toBe(false);
  });
  it("rechaza honeypot con contenido", () => {
    expect(contactoSchema.safeParse({ ...base, website: "http://spam" }).success).toBe(false);
  });
  it("rechaza nombres con numeros", () => {
    expect(contactoSchema.safeParse({ ...base, nombre: "R2D2" }).success).toBe(false);
  });
});

describe("postulacionSchema", () => {
  const post = {
    nombreCompleto: "Andrés Soto Pérez",
    telefono: "+56941238765",
    email: "andres@example.cl",
    fechaNacimiento: "1995-04-12",
    cargo: "Abogado/a",
    motivacion: "Me interesa el enfoque en atención al cliente y el trabajo con deudas fiscales.",
    consentimiento: true,
    website: "",
    startedAt: 1,
  };
  it("acepta un postulante mayor de edad", () => {
    expect(postulacionSchema.safeParse(post).success).toBe(true);
  });
  it("rechaza menores de 18", () => {
    const y = new Date().getFullYear() - 16;
    expect(postulacionSchema.safeParse({ ...post, fechaNacimiento: `${y}-01-01` }).success).toBe(false);
  });
});
