import type { LegalDoc } from "@/features/legal/components/LegalDocument";

// Borrador. Debe ser revisado por un abogado antes de publicarse.
export const terminos: LegalDoc = {
  version: "2.0",
  updatedAt: "2026-09-22",
  intro:
    "Estos términos regulan el uso del sitio web igonzalez.cl, operado por González y Acuña Limitada. Al navegar el sitio o enviar un formulario aceptas estas condiciones.",
  sections: [
    {
      title: "Objeto del sitio",
      paragraphs: [
        "El sitio informa sobre los servicios legales de la oficina y ofrece canales de contacto. La información publicada es de carácter general y no constituye asesoría legal para un caso concreto. La asesoría se presta únicamente tras el contacto directo con un abogado de la oficina y bajo las condiciones que se acuerden.",
      ],
    },
    {
      title: "Relación cliente-abogado",
      paragraphs: [
        "El envío de un formulario o un mensaje por WhatsApp no crea por sí mismo una relación de patrocinio ni obliga a la oficina a asumir un caso. La relación profesional se formaliza mediante el contrato de prestación de servicios correspondiente.",
      ],
    },
    {
      title: "Uso del sitio",
      paragraphs: ["Te comprometes a usar el sitio de forma lícita y a no:"],
      list: [
        "Enviar información falsa o suplantar a otra persona.",
        "Intentar acceder a áreas o datos no autorizados, o interferir con el funcionamiento del sitio.",
        "Usar herramientas automatizadas para extraer contenido o enviar formularios.",
      ],
    },
    {
      title: "Propiedad intelectual",
      paragraphs: [
        "Los textos, la marca IGonzalez, el logotipo, las fotografías y el diseño del sitio pertenecen a González y Acuña Limitada o a sus licenciantes. No pueden reproducirse sin autorización escrita, salvo para uso personal y no comercial.",
      ],
    },
    {
      title: "Pagos",
      paragraphs: [
        "Los pagos por servicios se realizan únicamente a la cuenta bancaria de González y Acuña Limitada informada en la sección de preguntas frecuentes o a través del enlace oficial de Webpay. Ningún abogado de la oficina solicita pagos a cuentas personales. Ante cualquier duda, verifica antes de transferir llamando al número publicado.",
      ],
    },
    {
      title: "Limitación de responsabilidad",
      paragraphs: [
        "La oficina procura mantener el sitio actualizado y disponible, pero no garantiza la ausencia de errores ni la continuidad del servicio. No responde por daños derivados del uso de la información general publicada sin asesoría específica, ni por el contenido de sitios de terceros enlazados (redes sociales, Webpay).",
      ],
    },
    {
      title: "Protección de datos",
      paragraphs: [
        "El tratamiento de datos personales se rige por la política de privacidad publicada en este sitio.",
      ],
    },
    {
      title: "Modificaciones, ley aplicable y jurisdicción",
      paragraphs: [
        "Podemos modificar estos términos publicando la nueva versión con su fecha. Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia se someterá a los tribunales ordinarios de justicia de la ciudad de Concepción.",
      ],
    },
  ],
};
