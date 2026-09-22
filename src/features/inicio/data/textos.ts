// Textos publicados por la oficina. Se reproducen integros: son su voz.

export const cartaIvan = {
  parrafos: [
    "Sentirse abrumado por las deudas es una de las peores experiencias que alguien puede vivir. En nuestra oficina, entendemos ese sentimiento y estamos aquí para ayudarte a salir de él. Nuestro objetivo es simple: eliminar tus deudas.",
    "Todos los días asesoramos a personas que se encuentran en situaciones similares a la tuya. Personas que han llegado a un punto en el que no pueden cumplir con sus obligaciones y necesitan una mano amiga y un consejo acertado.",
    "Durante los últimos 15 años he trabajado incansablemente para perfeccionar mis habilidades y ofrecer el mejor servicio posible. Comencé como abogado de la Tesorería General de la República. Renuncié para ser independiente, y encontré un mundo nuevo y fascinante en las redes sociales.",
    "Te ofrezco la mejor defensa en juicios de deudas, ya sean fiscales o comerciales, y el mejor asesoramiento si buscas una nueva oportunidad. Estamos aquí para apoyarte y ayudarte a comenzar de nuevo, sin las cargas que te han agobiado hasta ahora. Juntos, podemos lograrlo.",
  ],
  firma: "Iván González Navarrete",
  cargo: "Abogado, socio fundador",
};

// Video de TikTok en el que Ivan cuenta esta historia (Cloudinary)
export const videoHistoria = {
  src: "https://res.cloudinary.com/da4bpuks4/video/upload/v1789574526/tiktok_ivan_1-U9mtbd69_oconjh.mp4",
  poster:
    "https://res.cloudinary.com/da4bpuks4/video/upload/so_1,f_jpg,q_auto/v1789574526/tiktok_ivan_1-U9mtbd69_oconjh.jpg",
  width: 576,
  height: 1024,
  title: "Iván González cuenta cómo nació IGonzalez",
};

export const manifiesto = {
  parrafos: [
    "Un día leí que el conocimiento debía compartirse con el mundo, que aquello en lo que uno es experto debía contarse a todos. Durante años trabajé como abogado de la Tesorería General de la República y vi a cientos de personas y emprendedores sufrir con las deudas. Fue entonces que descubrí que las redes sociales eran el mejor medio para informar a las personas sobre sus opciones y derechos, y mi vida cambió por completo.",
    "Hoy tengo la suerte de sentir el cariño de la gente, de contar con más de 450.000 seguidores y de recibir a diario el reconocimiento por los consejos que brindo para ayudar.",
    "Cuando los clientes empezaron a llegar, me di cuenta de que necesitaba rodearme de amigos y profesionales que compartieran los mismos valores y ganas de ayudar a las personas a salir de sus problemas. Así nació nuestra oficina de abogados. Al principio no sabía qué nombre ponerle, así que decidí usar mi inicial y mi apellido: IGonzález, algo tan común en Chile pero a la vez cercano y accesible.",
    "Esa es nuestra filosofía: ofrecer un servicio de calidad de manera cercana, manteniendo siempre al cliente informado sobre el progreso de su caso. Queremos que en ningún momento nuestros clientes se sientan abandonados o ignorados, todo lo contrario. Nuestra misión siempre será apoyar y ayudar a nuestros clientes.",
  ],
  cierre:
    "Estamos aquí para ti, para brindarte el apoyo que necesitas y guiarte hacia un futuro libre de deudas. Juntos, podemos lograrlo.",
};

export const historia = {
  parrafos: [
    "En el año 2020 subí mi primer video a redes sociales, que tuvo un millón de visitas y 30.000 personas me empezaron a seguir. Mi objetivo era claro: dar conocimiento para emparejar la cancha y entregar tranquilidad en sus problemas legales a mis seguidores. Hoy somos una comunidad de más de un millón de personas en Instagram y TikTok.",
    "Con el éxito de mis videos en redes sociales los clientes empezaron a llegar y tuve que buscar a otro abogado que me ayudara, y la oficina empezó a crecer. Ya no era sólo un abogado, eran varios. En ese momento surge la necesidad de asociarme con alguien que supiera de administración y procesos, y claramente no podía ser un abogado. Y ahí nació González y Acuña Limitada, la sociedad que está detrás de igonzalez.cl, con mi gran amigo y socio, el ingeniero comercial Mauricio Acuña Agost.",
    "Nuestro foco está puesto en la atención al cliente, y en mejorar cada día la experiencia del usuario informando de manera regular el estado de tramitación de los juicios, acompañándolo en cada etapa del proceso hasta la obtención del resultado prometido: la eliminación de las deudas.",
  ],
};

// Cifras declaradas por la oficina en sus propios textos.
export const cifras = [
  { valor: "15", sufijo: "años", detalle: "de experiencia en deudas fiscales y comerciales" },
  { valor: "25", prefijo: "+", sufijo: "abogados", detalle: "atendiendo casos en todo Chile" },
  { valor: "1M", prefijo: "+", sufijo: "personas", detalle: "en nuestra comunidad de Instagram y TikTok" },
  { valor: "2020", sufijo: "", detalle: "año en que nació la oficina, a partir de un primer video" },
] as const;

export const proceso = [
  {
    paso: "01",
    titulo: "Cuéntanos tu caso",
    texto:
      "Escríbenos por WhatsApp o por el formulario. Nos cuentas qué deudas tienes, con quién y desde cuándo.",
  },
  {
    paso: "02",
    titulo: "Definimos la vía legal",
    texto:
      "Prescripción, abandono del procedimiento o un procedimiento concursal: la que corresponda a tu situación, explicada sin letra chica.",
  },
  {
    paso: "03",
    titulo: "Te informamos en cada etapa",
    texto:
      "Tu abogado te mantiene al tanto del estado del juicio hasta el resultado: la eliminación de la deuda.",
  },
] as const;
