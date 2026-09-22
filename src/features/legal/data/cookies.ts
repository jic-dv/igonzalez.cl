import type { LegalDoc } from "@/features/legal/components/LegalDocument";

// El sitio no usa cookies de seguimiento ni carga scripts de terceros con cookies.
// Si en el futuro se agrega analitica o pixeles, esta politica y el gestor de
// consentimiento deben actualizarse antes de activarlos.
export const cookies: LegalDoc = {
  version: "2.0",
  updatedAt: "2026-09-22",
  intro:
    "Una cookie es un pequeño archivo que el navegador guarda cuando visitas un sitio. Esta política explica cuáles usa igonzalez.cl y por qué. La versión actual del sitio no usa cookies de seguimiento ni publicitarias.",
  sections: [
    {
      title: "Cookies y almacenamiento que usamos",
      paragraphs: [
        "El sitio funciona sin cookies de terceros. Lo único que puede guardarse en tu navegador es:",
      ],
      list: [
        "Cookies técnicas estrictamente necesarias que la plataforma de alojamiento (Vercel) puede emitir para servir el sitio de forma segura. No identifican a la persona ni se usan para seguimiento.",
        "Preferencias locales del sitio (por ejemplo, si cerraste un aviso). Se guardan en tu navegador y no se envían a ningún servidor.",
      ],
    },
    {
      title: "Medición de rendimiento",
      paragraphs: [
        "Usamos Vercel Speed Insights para medir la velocidad de carga del sitio. Esta herramienta no usa cookies ni identifica personas: registra métricas técnicas agregadas (tiempos de carga, tipo de conexión).",
      ],
    },
    {
      title: "Formularios y WhatsApp",
      paragraphs: [
        "Los formularios del sitio no usan cookies para funcionar: los datos que escribes viajan solo cuando pulsas enviar. Qué hacemos con ellos está detallado en la política de privacidad.",
        "Los botones de WhatsApp son enlaces: no cargan ningún script de Meta en este sitio. Al pulsarlos sales de igonzalez.cl y entras a WhatsApp, donde aplican las políticas de ese servicio.",
      ],
    },
    {
      title: "Lo que no hacemos",
      paragraphs: [
        "No cargamos píxeles de redes sociales, mapas de calor ni herramientas de publicidad. Los enlaces a TikTok, Instagram, Facebook y WhatsApp te llevan a esos servicios, donde aplican sus propias políticas, pero no incrustan sus scripts en nuestro sitio.",
      ],
    },
    {
      title: "Cómo controlar las cookies",
      paragraphs: [
        "Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Como el sitio no depende de cookies para funcionar, hacerlo no afecta tu navegación.",
      ],
    },
    {
      title: "Cambios",
      paragraphs: [
        "Si en el futuro incorporamos herramientas que usen cookies no esenciales, te pediremos consentimiento previo, por categoría, antes de activarlas, y actualizaremos esta política con la nueva versión y fecha.",
      ],
    },
  ],
};
