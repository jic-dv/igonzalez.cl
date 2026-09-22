import type { Faq } from "@/features/faq/schemas/faq";

// Texto publicado en igonzalez.cl/faq. Se conserva integro; solo se corrigen
// erratas evidentes ("el servicio que esperado" -> "el servicio que esperas").
export const faqsData = [
  {
    id: "oficina-fisica",
    question: "¿Existe oficina física o sólo hay atención virtual?",
    answer: [
      "La mayor parte de nuestra atención se hace de manera remota, a través de internet o telefónicamente. No obstante, nuestros abogados trabajan de manera presencial en nuestra oficina, ubicada en la ciudad de Concepción, calle Barros Arana 1098, piso 14, oficina 1402.",
      "Si eres de Concepción y necesitas conversar con uno de nuestros abogados, o si eres de otra localidad, te invitamos a conocer nuestra oficina. ¡Siempre serás bienvenido!",
    ],
  },
  {
    id: "verificar-abogado",
    question: "¿Cómo saber si un abogado trabaja en IGonzalez.cl?",
    answer: [
      "Los abogados que integran el equipo de nuestra oficina están individualizados en la sección Equipo de este sitio. Si el abogado que buscas no se encuentra en el listado, no te alarmes: a veces la actualización demora un poco. Llama a nuestro abogado Rodrigo Álvarez al +56 9 8609 8444 y él podrá confirmar si se trata de un abogado nuestro.",
    ],
  },
  {
    id: "reclamos",
    question: "Si tengo quejas o reclamos por el servicio prestado, ¿a quién los hago llegar?",
    answer: [
      "Contamos con una sección exclusiva para recibir tus sugerencias y reclamos. Además, disponemos de un correo dedicado para atender tus comentarios de manera directa: sac@igonzalez.cl. Este correo es revisado y contestado por el Jefe de Servicio de Atención al Cliente.",
      "Tenemos protocolos de atención destinados a corregir en el menor tiempo posible todo tipo de inconveniente que pueda tener uno de nuestros clientes. Si el problema persiste, se presenta en una reunión quincenal en la cual participan nuestros Jefes de Área y nuestro Gerente General. Para nuestra oficina, la atención y satisfacción de los clientes es muy importante.",
    ],
  },
  {
    id: "no-satisfecho",
    question: "¿Qué pasa si no estoy satisfecho con los servicios ofrecidos?",
    answer: [
      "Tu satisfacción es nuestra prioridad. Si en cualquier momento no estás contento con el progreso de tu caso, te invitamos a hablar directamente con tu abogado asignado para aclarar cualquier duda o preocupación. Si no puedes resolver el problema, también contamos con un equipo de atención al cliente que puede intervenir para asegurarnos de que estés recibiendo el servicio que esperas.",
    ],
  },
  {
    id: "pagos",
    question: "¿A qué cuenta corriente debe ser efectuado el pago?",
    answer: [
      "Los pagos deben ser efectuados a la Cuenta Corriente N° 10020549 del Banco BICE, a nombre de GONZALEZ y ACUÑA LIMITADA, RUT 77.478.255-9, correo electrónico pamelamillaguir@igonzalez.cl.",
      "También puedes pagar a través de Webpay en https://www.webpay.cl/company/161563.",
    ],
  },
  {
    id: "horario",
    question: "¿Cuál es el horario de atención al cliente?",
    answer: ["Atendemos entre las 9:00 y las 18:00 horas, de lunes a viernes."],
  },
] satisfies Faq[];
