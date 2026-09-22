"use client";

import { Controller } from "react-hook-form";
import { submitContacto } from "@/features/contacto/actions/submit";
import {
  AntiBotFields,
  ConsentField,
  FormStatus,
  SubmitButton,
} from "@/features/contacto/components/FormShell";
import { LIMITS } from "@/features/contacto/constants/limits";
import { tipoDeudorLabels, tipoDeudorValues } from "@/features/contacto/constants/options";
import { useServerForm } from "@/features/contacto/hooks/useServerForm";
import {
  amountRule,
  emailRule,
  nameRule,
  phoneRule,
  requiredChoice,
  textRule,
  toRhf,
} from "@/features/contacto/validation/rules";
import AmountInput from "@/shared/components/core/AmountInput";
import Field, { FieldRow, Input, Select, Textarea } from "@/shared/components/core/Field";
import PhoneField from "@/shared/components/core/PhoneField";

type Values = {
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  monto: string;
  tipoDeudor: string;
  mensaje: string;
  consentimiento: boolean;
  website: string;
};

const defaultValues: Values = {
  nombre: "",
  apellido: "",
  email: "",
  celular: "",
  monto: "",
  tipoDeudor: "",
  mensaje: "",
  consentimiento: false,
  website: "",
};

// react-hook-form valida en el navegador con las reglas de validation/rules.ts; la
// Server Action vuelve a aplicarlas en el servidor con los mismos mensajes.
export default function ContactoForm() {
  const { form, onSubmit, result, pending, reset } = useServerForm<Values>({
    action: submitContacto,
    defaultValues,
  });
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <FormStatus
      result={result}
      successTitle="Mensaje enviado"
      successText="Uno de nuestros abogados te responderá a la brevedad, en horario de oficina."
      resetLabel="Enviar otro mensaje"
      onReset={reset}
    >
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
        <AntiBotFields register={register("website")} />

        <FieldRow>
          <Field id="nombre" label="Nombre" required error={errors.nombre?.message}>
            {(a) => (
              <Input
                {...a}
                {...register("nombre", { validate: toRhf(nameRule("nombre")) })}
                maxLength={LIMITS.nombre.max}
                autoComplete="given-name"
                placeholder="Camila"
              />
            )}
          </Field>
          <Field id="apellido" label="Apellido" required error={errors.apellido?.message}>
            {(a) => (
              <Input
                {...a}
                {...register("apellido", { validate: toRhf(nameRule("apellido")) })}
                maxLength={LIMITS.nombre.max}
                autoComplete="family-name"
                placeholder="Rojas"
              />
            )}
          </Field>
        </FieldRow>

        <FieldRow>
          <Field id="email" label="Correo electrónico" required error={errors.email?.message}>
            {(a) => (
              <Input
                {...a}
                {...register("email", { validate: toRhf(emailRule) })}
                type="email"
                maxLength={LIMITS.email.max}
                autoComplete="email"
                inputMode="email"
                placeholder="nombre@correo.cl"
              />
            )}
          </Field>
          <Field
            id="celular"
            label="Celular"
            required
            hint="Te escribiremos por WhatsApp a este número. Elige tu país si no estás en Chile."
            error={errors.celular?.message}
          >
            {(a) => (
              <Controller
                control={control}
                name="celular"
                rules={{ validate: toRhf((v: string) => phoneRule(v.replace(/\D/g, ""))) }}
                render={({ field }) => (
                  <PhoneField
                    {...a}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            )}
          </Field>
        </FieldRow>

        <FieldRow>
          <Field
            id="monto"
            label="Monto aproximado de tus deudas"
            hint={`Suma aproximada de todo lo que debes, entre ${LIMITS.monto.min.toLocaleString("es-CL")} y ${(LIMITS.monto.max / 1_000_000).toLocaleString("es-CL")} millones. Si no lo sabes, déjalo en blanco.`}
            error={errors.monto?.message}
          >
            {(a) => (
              <Controller
                control={control}
                name="monto"
                rules={{ validate: toRhf(amountRule) }}
                render={({ field }) => (
                  <AmountInput
                    {...a}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="1.500.000"
                  />
                )}
              />
            )}
          </Field>
          <Field
            id="tipoDeudor"
            label="Tipo de deudor"
            required
            hint="Si las deudas son tuyas elige persona natural; si son de tu empresa, empresa."
            error={errors.tipoDeudor?.message}
          >
            {(a) => (
              <Select
                {...a}
                {...register("tipoDeudor", {
                  validate: toRhf(requiredChoice(tipoDeudorValues, "Elige una opción")),
                })}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {tipoDeudorValues.map((v) => (
                  <option key={v} value={v}>
                    {tipoDeudorLabels[v]}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </FieldRow>

        <Field
          id="mensaje"
          label="Mensaje"
          required
          hint="Qué deudas tienes, con quién y desde cuándo. Si te han demandado, cuéntanoslo."
          error={errors.mensaje?.message}
        >
          {(a) => (
            <Textarea
              {...a}
              {...register("mensaje", {
                validate: toRhf(
                  textRule(
                    LIMITS.mensaje.min,
                    LIMITS.mensaje.max,
                    `Cuéntanos un poco más: al menos ${LIMITS.mensaje.min} caracteres`,
                  ),
                ),
              })}
              maxLength={LIMITS.mensaje.max}
              rows={5}
              placeholder="Tengo deudas con dos bancos desde 2021 y me llegaron cartas de cobranza."
            />
          )}
        </Field>

        <ConsentField
          finalidad="responder a mi consulta y contactarme por correo o WhatsApp"
          error={errors.consentimiento?.message}
          register={register("consentimiento", {
            required: "Necesitamos tu autorización para responder a tu consulta",
          })}
        />

        <SubmitButton pending={pending}>Enviar mensaje</SubmitButton>
      </form>
    </FormStatus>
  );
}
