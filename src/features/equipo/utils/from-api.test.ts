import { describe, expect, it } from "vitest";
import { teamData } from "@/features/equipo/data/team";
import { teamMemberSchema } from "@/features/equipo/schemas/team-member";
import type { Vendedor } from "@/features/equipo/schemas/vendedor";
import { buildTeamFromApi, slugify, toWhatsapp } from "./from-api";

const local = teamData.map((m) => teamMemberSchema.parse(m));

const api: Vendedor[] = [
  {
    id: 2,
    nombre: "Rodrigo Álvarez",
    nombre_corto: "Rodrigo Álvarez",
    foto: null,
    telefono_empresa: "+56986098444",
    sexo: "masculino",
  },
  {
    id: 7,
    nombre: "Elizabeth Mella",
    nombre_corto: "Elizabeth Mella",
    foto: null,
    telefono_empresa: "+56942839443",
    sexo: null,
  },
  {
    id: 26,
    nombre: "Marcela Tenorio",
    nombre_corto: null,
    foto: null,
    telefono_empresa: "+56 9 8443 3145",
    sexo: "femenino",
  },
  {
    id: 200,
    nombre: "Persona  Nueva",
    nombre_corto: null,
    foto: null,
    telefono_empresa: "12345",
    sexo: "femenino",
  },
];

describe("slugify y toWhatsapp", () => {
  it("genera slugs sin acentos y normaliza telefonos con formato", () => {
    expect(slugify("Rodrigo Álvarez")).toBe("rodrigo-alvarez");
    expect(toWhatsapp("+56 9 8443 3145")).toBe("56984433145");
    expect(toWhatsapp("912345678")).toBe("56912345678");
    expect(toWhatsapp("12345")).toBeUndefined();
  });
});

describe("buildTeamFromApi", () => {
  const team = buildTeamFromApi(api, local);

  it("antepone los socios fundadores locales y respeta el orden del backend", () => {
    expect(team.slice(0, 2).map((m) => m.slug)).toEqual(["ivan-gonzalez", "mauricio-acuna"]);
    expect(team.slice(2).map((m) => m.slug)).toEqual([
      "rodrigo-alvarez",
      "elizabeth-mella",
      "marcela-tenorio",
      "persona-nueva",
    ]);
  });

  it("deriva el rol del sexo y conserva el rol local cuando el backend no lo trae", () => {
    expect(team.find((m) => m.slug === "rodrigo-alvarez")?.role).toBe("Abogado");
    expect(team.find((m) => m.slug === "marcela-tenorio")?.role).toBe("Abogada");
    expect(team.find((m) => m.slug === "elizabeth-mella")?.role).toBe("Abogada");
  });

  it("completa la foto desde los datos locales y valida contra el schema", () => {
    const rodrigo = team.find((m) => m.slug === "rodrigo-alvarez");
    expect(rodrigo?.photo).toBe("/equipo/rodrigo-alvarez.jpg");
    expect(rodrigo?.sexo).toBe("masculino");
    for (const m of team) expect(() => teamMemberSchema.parse(m)).not.toThrow();
  });

  it("una persona nueva sin foto ni telefono valido entra con monograma y sin WhatsApp", () => {
    const nueva = team.find((m) => m.slug === "persona-nueva");
    expect(nueva?.name).toBe("Persona Nueva");
    expect(nueva?.photo).toBeUndefined();
    expect(nueva?.whatsapp).toBeUndefined();
  });
});
