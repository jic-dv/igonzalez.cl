const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const integer = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });

export const formatClp = (amount: number) => clp.format(amount);

export const formatInteger = (n: number) => integer.format(n);

// Telefono chileno movil en formato legible: +56 9 XXXX XXXX
export const formatChileanPhone = (digits: string) => {
  const clean = digits.replace(/\D/g, "");
  const m = /^56(9)(\d{4})(\d{4})$/.exec(clean);
  return m ? `+56 ${m[1]} ${m[2]} ${m[3]}` : digits;
};

// Iniciales para el avatar de respaldo cuando no hay fotografia.
export const initials = (fullName: string) =>
  fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
