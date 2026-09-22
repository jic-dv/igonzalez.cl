import { describe, expect, it } from "vitest";
import { formatChileanPhone, formatClp, formatInteger, initials } from "./format";

describe("formatClp", () => {
  it("formatea pesos chilenos sin decimales", () => {
    expect(formatClp(1500000).replace(/\u00a0/g, " ")).toBe("$1.500.000");
  });
  it("acepta cero", () => {
    expect(formatClp(0).replace(/\u00a0/g, " ")).toBe("$0");
  });
});

describe("formatInteger", () => {
  it("usa punto como separador de miles", () => {
    expect(formatInteger(450000)).toBe("450.000");
  });
});

describe("formatChileanPhone", () => {
  it("formatea un movil en E.164 sin +", () => {
    expect(formatChileanPhone("56988381428")).toBe("+56 9 8838 1428");
  });
  it("devuelve la entrada si no calza", () => {
    expect(formatChileanPhone("123")).toBe("123");
  });
});

describe("initials", () => {
  it("toma las dos primeras palabras", () => {
    expect(initials("Iván González Navarrete")).toBe("IG");
  });
  it("tolera un solo nombre y espacios extra", () => {
    expect(initials("  Sofía ")).toBe("S");
  });
});
