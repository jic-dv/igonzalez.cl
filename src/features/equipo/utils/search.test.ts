import { describe, expect, it } from "vitest";
import type { PublicMember } from "@/features/equipo/types/public-member";
import { normalize, searchMembers } from "./search";

const members: PublicMember[] = [
  {
    slug: "rodrigo-alvarez",
    name: "Rodrigo Álvarez",
    firstName: "Rodrigo",
    role: "Abogado",
    whatsapp: "56986098444",
  },
  {
    slug: "angeles-torres",
    name: "Angeles Torres",
    firstName: "Angeles",
    role: "Abogada",
    whatsapp: "56965191739",
  },
  { slug: "sofia-franzinetti", name: "Sofía Franzinetti", firstName: "Sofía", role: "Abogada" },
];

describe("normalize", () => {
  it("quita acentos y mayusculas", () => {
    expect(normalize("  Álvarez ")).toBe("alvarez");
  });
});

describe("searchMembers", () => {
  it("devuelve todo con consulta vacia o de un caracter", () => {
    expect(searchMembers(members, "")).toHaveLength(3);
    expect(searchMembers(members, "r")).toHaveLength(3);
  });
  it("busca por nombre sin acentos, por apellido y por fragmento", () => {
    expect(searchMembers(members, "alvarez").map((m) => m.slug)).toEqual(["rodrigo-alvarez"]);
    expect(searchMembers(members, "SOFÍA").map((m) => m.slug)).toEqual(["sofia-franzinetti"]);
    expect(searchMembers(members, "torr").map((m) => m.slug)).toEqual(["angeles-torres"]);
  });
  it("busca por numero con o sin formato", () => {
    expect(searchMembers(members, "9 6519").map((m) => m.slug)).toEqual(["angeles-torres"]);
    expect(searchMembers(members, "+56 9 8609 8444").map((m) => m.slug)).toEqual(["rodrigo-alvarez"]);
    expect(searchMembers(members, "8444").map((m) => m.slug)).toEqual(["rodrigo-alvarez"]);
  });
  it("devuelve vacio cuando nada coincide", () => {
    expect(searchMembers(members, "zzz")).toEqual([]);
    expect(searchMembers(members, "0000")).toEqual([]);
  });
});
