import { describe, expect, it } from "vitest";
import { drfFieldErrors } from "./drf";

const map = { nombre: "nombre", descripcion: "mensaje", correo: "email" };

describe("drfFieldErrors", () => {
  it("traduce errores por campo al nombre del formulario propio", () => {
    const r = drfFieldErrors({ descripcion: ["Este campo es requerido."], correo: ["Correo inválido"] }, map);
    expect(r.fields).toEqual({ mensaje: "Este campo es requerido.", email: "Correo inválido" });
    expect(r.general).toBeUndefined();
  });
  it("recoge non_field_errors y detail como mensaje general e ignora claves desconocidas", () => {
    const r = drfFieldErrors({ non_field_errors: ["Duplicado"], otra: ["x"] }, map);
    expect(r.fields).toEqual({});
    expect(r.general).toBe("Duplicado");
    expect(drfFieldErrors({ detail: "No autorizado" }, map).general).toBe("No autorizado");
  });
  it("tolera cuerpos que no son objetos", () => {
    expect(drfFieldErrors("Internal error", map)).toEqual({ fields: {}, general: undefined });
    expect(drfFieldErrors(null, map)).toEqual({ fields: {}, general: undefined });
    expect(drfFieldErrors([1, 2], map)).toEqual({ fields: {}, general: undefined });
  });
});
