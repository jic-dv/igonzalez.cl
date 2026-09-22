import type { LegalDoc } from "@/features/legal/components/LegalDocument";

// Borrador tecnico alineado con la Ley 21.719 (vigente desde el 1 de diciembre de 2026).
// Debe ser revisado por un abogado antes de publicarse: los plazos de conservacion y la
// identificacion de encargados son propuestas que la oficina tiene que confirmar.
export const privacidad: LegalDoc = {
  version: "2.0",
  updatedAt: "2026-09-22",
  intro:
    "Esta política explica qué datos personales recoge IGonzalez.cl, qué hacemos exactamente con ellos, con quién los compartimos, cuánto tiempo los guardamos y cómo puedes ejercer tus derechos. Aplica a este sitio web, a los formularios que contiene y a las conversaciones que inicias con nosotros por WhatsApp desde el sitio.",
  sections: [
    {
      title: "Quién es responsable de tus datos",
      paragraphs: [
        "El responsable del tratamiento es González y Acuña Limitada, RUT 77.478.255-9, con domicilio en Barros Arana 1098, piso 14, oficina 1402, Concepción, Chile. Es la sociedad que está detrás de igonzalez.cl.",
        "Para cualquier consulta, solicitud o reclamo sobre tus datos personales escribe a sac@igonzalez.cl. Ese correo lo revisa el Jefe de Servicio de Atención al Cliente y es el canal formal para ejercer tus derechos.",
      ],
    },
    {
      title: "Qué datos recogemos y para qué los usamos",
      paragraphs: [
        "Solo pedimos los datos necesarios para cada finalidad. Ningún campo del sitio se recoge “por si acaso”: cada uno tiene un uso declarado.",
      ],
      list: [
        "Formulario de contacto: nombre, apellido, correo electrónico, celular con su prefijo internacional, tipo de deudor, monto aproximado de deudas (opcional) y el mensaje que escribes. Finalidad: estudiar tu consulta, derivarla al abogado que corresponda y responderte por correo o WhatsApp.",
        "Formulario de reclamos y sugerencias: nombre, apellido, correo, celular y la descripción de tu reclamo o sugerencia. Finalidad: registrar, investigar y responder tu caso dentro de nuestros protocolos de atención al cliente.",
        "Formulario de postulación laboral: nombre y apellido, teléfono, correo, fecha de nacimiento, cargo al que postulas, tu motivación y el archivo de tu currículum. Finalidad: evaluar tu candidatura y contactarte durante el proceso de selección.",
        "Conversaciones por WhatsApp: el número desde el que escribes, tu nombre de perfil si lo tienes público y el contenido de los mensajes que nos envías. Finalidad: atender tu consulta y dejar constancia del caso.",
        "Datos técnicos de navegación: dirección IP, tipo de navegador y páginas visitadas, que el servidor registra de forma automática. Finalidad: seguridad del sitio, prevención de abuso automatizado y medición del rendimiento.",
      ],
    },
    {
      title: "Qué hacemos exactamente con lo que envías en un formulario",
      paragraphs: [
        "Cuando pulsas enviar, los datos viajan cifrados por HTTPS a nuestro servidor, que los valida y los reenvía a nuestro sistema interno de gestión (api.igonzalez.cl), alojado para la oficina. Desde ahí, el formulario llega al abogado o al área que corresponde según el tipo de consulta.",
        "Acceden a esos datos únicamente las personas del equipo que necesitan hacerlo para atenderte: el abogado asignado a tu caso, el área de atención al cliente cuando se trata de un reclamo, y el área administrativa cuando se trata de una postulación. No los usamos para publicidad, no elaboramos perfiles comerciales con ellos y no los vendemos ni cedemos a terceros.",
        "El envío de un formulario no crea por sí mismo una relación de patrocinio. Si decides contratar nuestros servicios, los datos de tu caso pasarán a tratarse en el marco del contrato de prestación de servicios que firmemos, con sus propios plazos legales de conservación.",
        "Tu mensaje puede contener información sensible sobre tu situación económica. Te pedimos no incluir en el formulario documentos, claves bancarias ni datos de terceros: si necesitamos antecedentes adicionales, tu abogado te indicará el canal adecuado para enviarlos.",
      ],
    },
    {
      title: "Qué pasa cuando nos escribes por WhatsApp",
      paragraphs: [
        "Los botones de WhatsApp del sitio abren una conversación en la aplicación con el número de la oficina o del abogado que elijas. Desde ese momento el intercambio ocurre dentro de WhatsApp, servicio operado por Meta Platforms, Inc., que trata los datos conforme a sus propias políticas y fuera de nuestro control.",
        "Nosotros tratamos el número desde el que escribes y el contenido de la conversación para atender tu consulta y dejar registro del caso. Si la consulta avanza, esos datos se incorporan a nuestro sistema de gestión junto con el resto de tu ficha.",
        "Si prefieres no usar WhatsApp, puedes escribirnos al correo de la oficina o usar el formulario de contacto: la atención es la misma.",
        "Ningún abogado de la oficina te pedirá claves bancarias por WhatsApp ni te solicitará transferencias a cuentas personales. Ante cualquier mensaje sospechoso, verifica el número en la sección Equipo de este sitio antes de responder.",
      ],
    },
    {
      title: "Base legal del tratamiento",
      paragraphs: [
        "Tratamos tus datos con tu consentimiento, que otorgas al marcar la casilla correspondiente en cada formulario antes de enviarlo. Ese consentimiento es libre, informado y específico para la finalidad descrita en el propio formulario.",
        "Cuando ya eres cliente, la base legal pasa a ser la ejecución del contrato de prestación de servicios y el cumplimiento de las obligaciones legales asociadas al ejercicio de la profesión.",
        "Los datos técnicos de navegación se tratan por interés legítimo en la seguridad y el correcto funcionamiento del sitio.",
        "Puedes retirar tu consentimiento en cualquier momento escribiendo a sac@igonzalez.cl. El retiro no afecta la licitud del tratamiento realizado antes de esa solicitud.",
      ],
    },
    {
      title: "Cuánto tiempo conservamos tus datos",
      paragraphs: [
        "Conservamos los datos solo mientras son necesarios para la finalidad que los justifica. Vencido el plazo, se eliminan o se anonimizan.",
      ],
      list: [
        "Consultas de contacto que no derivan en la contratación de un servicio: 12 meses desde el último contacto.",
        "Reclamos y sugerencias: 24 meses, para poder acreditar su gestión ante ti o ante la autoridad.",
        "Postulaciones laborales: 6 meses desde el cierre del proceso. Después se eliminan, salvo que nos autorices expresamente a conservarlas para futuras búsquedas.",
        "Datos de clientes con servicio contratado: durante toda la relación profesional y después por los plazos de prescripción que la ley exige para respaldar la actuación del abogado.",
        "Registros técnicos y de seguridad: 12 meses.",
      ],
    },
    {
      title: "Con quién compartimos tus datos",
      paragraphs: [
        "No vendemos ni cedemos tus datos a terceros con fines comerciales. Solo los tratan, por cuenta nuestra y bajo contrato, los proveedores que necesitamos para operar:",
      ],
      list: [
        "Alojamiento y entrega del sitio web: Vercel Inc. (Estados Unidos).",
        "Sistema interno de gestión de casos y formularios: infraestructura propia de la oficina (api.igonzalez.cl).",
        "Mensajería: WhatsApp, operado por Meta Platforms, Inc. (Estados Unidos e Irlanda), cuando eliges ese canal.",
        "Correo electrónico corporativo, para responderte por esa vía.",
      ],
    },
    {
      title: "Transferencias internacionales",
      paragraphs: [
        "Algunos de esos proveedores están fuera de Chile, principalmente en Estados Unidos. Cuando tus datos salen del país exigimos garantías contractuales que mantengan un nivel de protección equivalente al que otorga la legislación chilena, incluidas cláusulas de confidencialidad y de tratamiento limitado a nuestras instrucciones.",
        "Solo entregaremos datos a una autoridad cuando una ley o una orden judicial nos obliguen a hacerlo.",
      ],
    },
    {
      title: "Tus derechos y cómo ejercerlos",
      paragraphs: [
        "Conforme a la Ley 21.719 sobre protección y tratamiento de datos personales, tienes derecho de acceso, rectificación, supresión, oposición y portabilidad, y a no ser objeto de decisiones basadas únicamente en tratamientos automatizados.",
        "Para ejercerlos escribe a sac@igonzalez.cl indicando qué derecho ejerces y acompañando un medio que permita verificar tu identidad. Responderemos dentro de los plazos legales y de forma gratuita. Si la solicitud es manifiestamente infundada o excesiva, te lo explicaremos por escrito.",
        "Si consideras que no atendimos correctamente tu solicitud, puedes reclamar ante la Agencia de Protección de Datos Personales.",
      ],
    },
    {
      title: "Seguridad de la información",
      paragraphs: [
        "El sitio se sirve exclusivamente por HTTPS. Los formularios se validan en el servidor, cuentan con límites de envío por dirección IP y con protección contra envíos automatizados, y los archivos adjuntos se verifican por su contenido real antes de aceptarse.",
        "El acceso a los datos está restringido al personal que los necesita para atenderte, y los equipos y cuentas de la oficina están sujetos a controles de acceso internos.",
        "Si ocurriera una vulneración de seguridad que afecte tus datos personales y suponga un riesgo para tus derechos, notificaremos a la Agencia de Protección de Datos Personales y a las personas afectadas dentro de las 72 horas siguientes a que tomemos conocimiento del incidente, como exige la ley.",
      ],
    },
    {
      title: "Datos de menores de edad",
      paragraphs: [
        "Los servicios de la oficina están dirigidos a personas mayores de edad. No solicitamos ni recogemos deliberadamente datos de menores a través de este sitio. Si detectamos que hemos recibido datos de un menor sin la autorización que corresponde, los eliminaremos.",
      ],
    },
    {
      title: "Cambios en esta política",
      paragraphs: [
        "Publicaremos aquí cualquier cambio, con su número de versión y su fecha. Si el cambio es sustancial y tenemos un medio de contacto tuyo, te lo comunicaremos directamente antes de aplicarlo.",
      ],
    },
  ],
};
