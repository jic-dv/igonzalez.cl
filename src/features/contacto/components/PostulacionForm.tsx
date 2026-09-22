"use client";

import { Controller } from "react-hook-form";
import { submitPostulacion } from "@/features/contacto/actions/submit";
import {
  AntiBotFields,
  ConsentField,
  FormStatus,
  SubmitButton,
} from "@/features/contacto/components/FormShell";
import { LIMITS, isoDateYearsAgo } from "@/features/contacto/constants/limits";
import { cargoLabels, cargoValues } from "@/features/contacto/constants/options";
import { useServerForm } from "@/features/contacto/hooks/useServerForm";
import {
  birthDateRule,
  emailRule,
  fullNameRule,
  phoneRule,
  requiredChoice,
  textRule,
  toRhf,
} from "@/features/contacto/validation/rules";
import { CV_ACCEPT, cvFileRule } from "@/features/contacto/validation/cv";
import Field, { FieldRow, Input, Select, Textarea } from "@/shared/components/core/Field";
import PhoneField from "@/shared/components/core/PhoneField";

type Values = {
  nombreCompleto: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  cargo: string;
  motivacion: string;
  cv: FileList | null;
  consentimiento: boolean;
  website: string;
};

const defaultValues: Values = {
  nombreCompleto: "",
  telefono: "",
  email: "",
  fechaNacimiento: "",
  cargo: "",
  motivacion: "",
  cv: null,
  consentimiento: false,
  website: "",
};

export default function PostulacionForm() {
  const { form, onSubmit, result, pending, reset } = useServerForm<Values>({
    action: submitPostulacion,
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
      successTitle="Postulación recibida"
      successText="Gracias por tu interés en trabajar con nosotros. Revisaremos tu CV y te contactaremos si tu perfil calza con lo que buscamos."
      resetLabel="Enviar otra postulación"
      onReset={reset}
    >
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
        <AntiBotFields register={register("website")} />

        <Field
          id="nombreCompleto"
          label="Nombre y apellido"
          required
          hint="Como aparece en tu CV, para poder identificarte en el proceso."
          error={errors.nombreCompleto?.message}
        >
          {(a) => (
            <Input
              {...a}
              {...register("nombreCompleto", { validate: toRhf(fullNameRule("nombre completo")) })}
              maxLength={LIMITS.nombreCompleto.max}
              autoComplete="name"
              placeholder="Andrés Soto Pérez"
            />
          )}
        </Field>

        <FieldRow>
          <Field
            id="telefono"
            label="Teléfono"
            required
            hint="Te contactaremos por WhatsApp. Elige tu país si no estás en Chile."
            error={errors.telefono?.message}
          >
            {(a) => (
              <Controller
                control={control}
                name="telefono"
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
        </FieldRow>

        <FieldRow>
          <Field
            id="fechaNacimiento"
            label="Fecha de nacimiento"
            required
            hint={`Debes tener entre ${LIMITS.edad.min} y ${LIMITS.edad.max} años para postular.`}
            error={errors.fechaNacimiento?.message}
          >
            {(a) => (
              <Input
                {...a}
                {...register("fechaNacimiento", { validate: toRhf(birthDateRule) })}
                type="date"
                min={isoDateYearsAgo(LIMITS.edad.max)}
                max={isoDateYearsAgo(LIMITS.edad.min)}
                autoComplete="bday"
              />
            )}
          </Field>
          <Field id="cargo" label="Cargo al que postulas" required error={errors.cargo?.message}>
            {(a) => (
              <Select
                {...a}
                {...register("cargo", {
                  validate: toRhf(requiredChoice(cargoValues, "Elige el cargo al que postulas")),
                })}
              >
                <option value="" disabled>
                  Selecciona un cargo
                </option>
                {cargoValues.map((v) => (
                  <option key={v} value={v}>
                    {cargoLabels[v]}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </FieldRow>

        <Field
          id="motivacion"
          label="Cuéntanos por qué te llama la atención trabajar con nosotros"
          required
          hint={`Entre ${LIMITS.motivacion.min} y ${LIMITS.motivacion.max} caracteres. Tu experiencia previa y qué te interesa del trabajo con deudas.`}
          error={errors.motivacion?.message}
        >
          {(a) => (
            <Textarea
              {...a}
              {...register("motivacion", {
                validate: toRhf(
                  textRule(
                    LIMITS.motivacion.min,
                    LIMITS.motivacion.max,
                    `Cuéntanos un poco más: al menos ${LIMITS.motivacion.min} caracteres`,
                  ),
                ),
              })}
              maxLength={LIMITS.motivacion.max}
              rows={5}
              placeholder="Me interesa el enfoque en atención al cliente y el trabajo con deudas fiscales."
            />
          )}
        </Field>

        <Field
          id="cv"
          label="Adjuntar CV"
          required
          hint="PDF, DOC o DOCX, hasta 5 MB. El archivo se verifica por su contenido, no por su extensión."
          error={errors.cv?.message}
        >
          {(a) => (
            <Input
              {...a}
              {...register("cv", { validate: toRhf(cvFileRule) })}
              type="file"
              accept={CV_ACCEPT}
              className="file:bg-paper-2 file:text-ink hover:file:bg-line file:rounded-control file:mr-4 file:cursor-pointer file:border-0 file:px-4 file:py-2 file:font-semibold file:transition-colors"
            />
          )}
        </Field>

        <ConsentField
          finalidad="evaluar mi postulación y contactarme durante el proceso de selección"
          error={errors.consentimiento?.message}
          register={register("consentimiento", {
            required: "Necesitamos tu autorización para responder a tu consulta",
          })}
        />

        <SubmitButton pending={pending}>Enviar postulación</SubmitButton>
      </form>
    </FormStatus>
  );
}
