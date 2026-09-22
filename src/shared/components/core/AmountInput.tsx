"use client";

import type { FieldControlProps } from "@/shared/components/core/Field";
import { Input } from "@/shared/components/core/Field";
import { cn } from "@/shared/lib/cn";
import { formatInteger } from "@/shared/lib/format";

type Props = Partial<FieldControlProps> & {
  // Solo digitos, controlado por react-hook-form
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  maxDigits?: number;
  placeholder?: string;
  className?: string;
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

// Monto en pesos con separador de miles en vivo ("1.500.000"), mas facil de leer al
// escribir. Hacia fuera expone solo los digitos, para que el schema lo lea como numero.
export default function AmountInput({
  value,
  onChange,
  onBlur,
  name,
  maxDigits = 12,
  placeholder,
  className,
  id,
  ...aria
}: Props) {
  const digits = onlyDigits(value);

  return (
    <div className="relative">
      <span
        className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
        aria-hidden="true"
      >
        $
      </span>
      <Input
        {...aria}
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={digits ? formatInteger(Number(digits)) : ""}
        onChange={(e) => onChange(onlyDigits(e.target.value).slice(0, maxDigits))}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn("pl-8 tabular-nums", className)}
      />
    </div>
  );
}
