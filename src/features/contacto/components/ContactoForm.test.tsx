import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FormResult } from "@/features/contacto/constants/options";

const submitContacto = vi.fn<(prev: FormResult | null, fd: FormData) => Promise<FormResult>>();

vi.mock("@/features/contacto/actions/submit", () => ({
  submitContacto: (prev: FormResult | null, fd: FormData) => submitContacto(prev, fd),
}));

// next/link fuera de un router de Next: se reemplaza por un <a> simple
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import ContactoForm from "./ContactoForm";

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Nombre/), "Camila");
  await user.type(screen.getByLabelText(/^Apellido/), "Rojas");
  await user.type(screen.getByLabelText(/^Correo electrónico/), "camila@example.cl");
  await user.type(screen.getByLabelText(/^Celular/), "912345678");
  await user.selectOptions(screen.getByLabelText(/^Tipo de deudor/), "persona");
  await user.type(
    screen.getByLabelText(/^Mensaje/),
    "Tengo deudas con dos bancos desde 2021 y no puedo pagarlas.",
  );
  await user.click(screen.getByRole("checkbox", { name: /Autorizo a IGonzalez/ }));
}

// Tras un envio con exito el formulario ofrece volver al inicio o escribir de nuevo

describe("ContactoForm", () => {
  beforeEach(() => submitContacto.mockReset());

  it("empty: react-hook-form marca los campos y no llama a la accion", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    expect(screen.getByLabelText(/País del número/)).toHaveValue("CL");
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    expect(await screen.findByText("Escribe tu nombre")).toBeInTheDocument();
    expect(screen.getByText("Escribe tu correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nombre/)).toHaveAttribute("aria-invalid", "true");
    expect(submitContacto).not.toHaveBeenCalled();
  });

  it("valida en el navegador antes de enviar: correo y monto fuera de rango", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    await fillValid(user);

    await user.clear(screen.getByLabelText(/^Correo electrónico/));
    await user.type(screen.getByLabelText(/^Correo electrónico/), "camila@ejemplo");
    await user.type(screen.getByLabelText(/^Monto aproximado/), "500");
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    expect(await screen.findByText(/correo válido/)).toBeInTheDocument();
    expect(screen.getByText(/monto mínimo/)).toBeInTheDocument();
    expect(submitContacto).not.toHaveBeenCalled();
  });

  it("success: envia FormData con los campos y muestra confirmacion", async () => {
    submitContacto.mockResolvedValue({ status: "success" });
    const user = userEvent.setup();
    render(<ContactoForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    expect(await screen.findByRole("status")).toHaveTextContent("Mensaje enviado");
    const fd = submitContacto.mock.calls[0][1];
    expect(fd.get("nombre")).toBe("Camila");
    expect(fd.get("tipoDeudor")).toBe("persona");
    // El prefijo del pais va concatenado en el valor enviado
    expect(fd.get("celular")).toBe("+56912345678");
    expect(fd.get("consentimiento")).toBe("on");
    expect(fd.get("website")).toBe("");
    expect(Number(fd.get("startedAt"))).toBeGreaterThan(0);
  });

  it("error: muestra el mensaje del servidor, el error por campo y conserva lo escrito", async () => {
    submitContacto.mockResolvedValue({
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors: { celular: "Número no válido" },
      values: { nombre: "Camila", celular: "+56912345678" },
    });
    const user = userEvent.setup();
    render(<ContactoForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Revisa los campos marcados.");
    await waitFor(() =>
      expect(screen.getByLabelText(/^Celular/)).toHaveAccessibleDescription(/Número no válido/),
    );
    expect(screen.getByLabelText(/^Celular/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/^Nombre/)).toHaveValue("Camila");
  });

  it("tras enviar ofrece volver al inicio o escribir otro mensaje, y el formulario vuelve vacio", async () => {
    submitContacto.mockResolvedValue({ status: "success" });
    const user = userEvent.setup();
    render(<ContactoForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    expect(await screen.findByRole("status")).toHaveTextContent("Mensaje enviado");
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");

    await user.click(screen.getByRole("button", { name: "Enviar otro mensaje" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Nombre/)).toHaveValue("");
  });

  it("loading: el boton queda ocupado mientras la accion responde", async () => {
    let resolve: (r: FormResult) => void = () => {};
    submitContacto.mockReturnValue(new Promise<FormResult>((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<ContactoForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/ }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Enviar mensaje/ })).toHaveAttribute("aria-busy", "true"),
    );
    resolve({ status: "success" });
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
