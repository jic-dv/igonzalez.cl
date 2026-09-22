"use client";

import { useState } from "react";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  countryByCode,
  splitPhone,
} from "@/features/contacto/constants/countries";
import type { FieldControlProps } from "@/shared/components/core/Field";
import { cn } from "@/shared/lib/cn";

type Props = Partial<FieldControlProps> & {
  // Numero completo con prefijo ("+56912345678"), controlado por react-hook-form
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  name?: string;
};

// Agrupa los digitos de a 4 desde la derecha, dejando el primer grupo mas corto:
// 912345678 -> "9 1234 5678". Es legible en todos los paises de la lista.
const groupDigits = (digits: string) => {
  if (digits.length <= 4) return digits;
  const groups: string[] = [];
  let rest = digits;
  while (rest.length > 4) {
    groups.unshift(rest.slice(-4));
    rest = rest.slice(0, -4);
  }
  return [rest, ...groups].join(" ");
};

// Selector de pais + numero. Hacia fuera expone un solo valor: el numero con prefijo.
// El pais vive en estado local porque no se envia por separado.
export default function PhoneField({ value, onChange, onBlur, required, id, name, ...aria }: Props) {
  const initial = splitPhone(value);
  const [code, setCode] = useState(initial.code || DEFAULT_COUNTRY);

  const country = countryByCode(code) ?? COUNTRIES[0];
  const national = splitPhone(value).national;

  // truncate solo al escribir: al cambiar de pais se conserva lo tecleado para que la
  // validacion avise si el largo ya no corresponde, en vez de perder un digito en silencio.
  const emit = (countryCode: string, digits: string, truncate = false) => {
    const target = countryByCode(countryCode) ?? COUNTRIES[0];
    const next = truncate ? digits.slice(0, target.max) : digits;
    onChange(next ? `${target.dial}${next}` : "");
  };

  return (
    <div className="flex gap-2">
      <div className="relative shrink-0">
        <select
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            emit(e.target.value, national);
          }}
          onBlur={onBlur}
          aria-label="País del número de teléfono"
          title="Elige el país de tu número"
          className={cn(
            "border-line-strong text-text focus:border-brand focus:ring-brand/20 hover:border-line-strong/80",
            "rounded-control min-h-12 w-[7.5rem] cursor-pointer appearance-none border bg-white py-3 pr-8 pl-3 text-base",
            "duration-fast transition-[border-color,box-shadow] focus:ring-4 focus:outline-none",
          )}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <svg
          className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <input
        {...aria}
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        value={groupDigits(national)}
        onChange={(e) => emit(code, e.target.value.replace(/\D/g, ""), true)}
        onBlur={onBlur}
        placeholder={country.example}
        maxLength={country.max + 4}
        className={cn(
          "border-line-strong text-text placeholder:text-muted/60 focus:border-brand focus:ring-brand/20",
          "aria-invalid:border-error aria-invalid:focus:ring-error/20 hover:border-line-strong/80",
          "rounded-control min-h-12 w-full border bg-white px-4 py-3 text-base tabular-nums",
          "duration-fast transition-[border-color,box-shadow] focus:ring-4 focus:outline-none",
        )}
      />
    </div>
  );
}
