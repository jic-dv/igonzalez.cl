"use client";

import { Controller } from "react-hook-form";
import { submitReclamo } from "@/features/contacto/actions/submit";
import {
  AntiBotFields,
  ConsentField,
  FormStatus,
  SubmitButton,
} from "@/features/contacto/components/FormShell";
import { LIMITS } from "@/features/contacto/constants/limits";
import { useServerForm } from "@/features/contacto/hooks/useServerForm";
import { emailRule, nameRule, phoneRule, textRule, toRhf } from "@/features/contacto/validation/rules";
import Field, { FieldRow, Input, Textarea } from "@/shared/components/core/Field";
import PhoneField from "@/shared/components/core/PhoneField";

type Values = {
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  mensaje: string;
  consentimiento: boolean;
  website: string;
};

const defaultValues: Values = {
  nombre: "",
  apellido: "",
  email: "",
  celular: "",
  mensaje: "",
  consentimiento: false,
  website: "",
};

export default function ReclamoForm() {
  const { form, onSubmit, result, pending, reset } = useServerForm<Values>({
    action: submitReclamo,
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
      successTitle="Recibimos tu mensaje"
      successText="El Jefe de Servicio de Atención al Cliente revisa cada reclamo y sugerencia. Te responderemos por correo o WhatsApp."
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
            hint="Te contactaremos por WhatsApp si necesitamos más detalles. Elige tu país si no estás en Chile."
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

        <Field
          id="mensaje"
          label="Tu reclamo o sugerencia"
          required
          hint="Cuéntanos qué pasó, con qué abogado y cuándo. Mientras más concreto, más rápido lo resolvemos."
          error={errors.mensaje?.message}
        >
          {(a) => (
            <Textarea
              {...a}
              {...register("mensaje", {
                validate: toRhf(
                  textRule(
                    LIMITS.descripcion.min,
                    LIMITS.descripcion.max,
                    `Describe tu reclamo o sugerencia: al menos ${LIMITS.descripcion.min} caracteres`,
                  ),
                ),
              })}
              maxLength={LIMITS.descripcion.max}
              rows={6}
              placeholder="Escribe aquí tu reclamo o sugerencia."
            />
          )}
        </Field>

        <ConsentField
          finalidad="gestionar mi reclamo o sugerencia y responderme"
          error={errors.consentimiento?.message}
          register={register("consentimiento", {
            required: "Necesitamos tu autorización para responder a tu consulta",
          })}
        />

        <SubmitButton pending={pending}>Enviar formulario</SubmitButton>
      </form>
    </FormStatus>
  );
}
