@AGENTS.md

# IGonzalez.cl - Guía del proyecto

Este archivo es la fuente de verdad para trabajar en este repo. Complementa la plantilla maestra de ingeniería frontend (Bloque 0 completado abajo). Precedencia: código real del repo > este archivo > plantilla > conocimiento previo.

## Bloque 0 - Configuración del proyecto

```
PROYECTO:              IGonzalez.cl (remaster completo)
DOMINIO:               https://www.igonzalez.cl
TIPO:                  landing corporativa multipágina con formularios
PROBLEMA DE NEGOCIO:   captar personas y empresas con deudas fiscales o comerciales y llevarlas a WhatsApp
AUDIENCIA:             adultos en Chile con deudas en cobranza judicial (TGR, bancos, casas comerciales, clínicas), llegan desde TikTok/Instagram, mayoría móvil
ESTADO:                rebuild de sitio existente (SPA Vite sin SSR)

RESTRICCIONES QUE DEFINEN EL STACK
SEO crítico:           sí
Interactividad alta:   no (header, formularios, acordeón nativo)
Volumen de datos:      bajo (26 personas, 2 servicios, 6 FAQ)
Tiempo real:           no
Autenticación:         no
Multi-idioma:          no (es-CL)
Equipo:                1 a 2 personas
Deadline duro:         no

MERCADO Y LOCALIZACIÓN
Locale principal:      es-CL
Moneda y formato:      CLP sin decimales (Intl es-CL)
Taxonomía territorial: no aplica (oficina única en Concepción, atención nacional)
Identificadores:       RUT solo en textos legales; celular chileno 569XXXXXXXX
Marco legal de datos:  Ley 21.719 (vigente 01-12-2026)

IDENTIDAD
Atributos de marca:    serio, cercano, claro, confiable, moderno
Referencias visuales:  logo actual (tinta #000055, sans condensada), fotografías reales del equipo
Restricciones de marca:logo obligatorio; libertad en paleta secundaria y tipografía

PRESUPUESTOS (medidos, ver scripts/bundle-budget.mjs)
JS cliente por ruta:   220 KB gz rutas de contenido, 225 KB gz rutas con formulario
                       (piso de Next 16.3 + React 19.2 medido: 160 KB gz; motion en modo LazyMotion +
                       domAnimation: 50 KB gz medidos con Turbopack, decisión explícita del cliente;
                       código propio: 1 a 8 KB por ruta)
LCP / INP / CLS:       2.5s / 200ms / 0.1

COMANDOS DEL REPO
dev:        npm run dev        (puerto 3210)
build:      npm run build
test:       npm run test       (Vitest, unit + integración)
lint:       npm run lint
typecheck:  npm run typecheck
e2e:        npm run e2e        (Playwright contra build de producción en :3211)
budget:     npm run budget     (con `next start -p 3211` corriendo)
verify:     npm run verify     (todo lo anterior en orden)
```

## Decisiones fijadas en este repo

- **`motion` solo en modo ligero.** El cliente pidió animaciones de aparición con motion en todo el sitio. Se usa `LazyMotion` con `domAnimation` (sin layout ni drag) y componentes `m.*` con `strict`: usar `<motion.*>` falla en desarrollo. Coste medido: 50 KB gz. `Reveal` es el único punto de entrada para apariciones (cascada por `delay`, `immediate` sobre el pliegue); su máquina de estados garantiza que el HTML servido nunca lleva `opacity: 0`. `Strike` sigue siendo CSS.
- **Formularios con react-hook-form**, pedido explícitamente por el cliente (15 KB gz medidos; por eso las rutas con formulario tienen 240 KB de presupuesto). **Sin `zodResolver`**: arrastraría Zod entero al navegador (94 KB) para repetir lo que el servidor ya valida. El criterio vive una sola vez en `features/contacto/validation/rules.ts` como funciones puras `(valor) => mensaje | null`; RHF las usa vía `toRhf` y los schemas Zod vía `check()`. Añadir una validación significa tocar ese módulo, nunca los formularios ni los schemas por separado.
- **Validación anti-fraude** en esas reglas: nombres sin dígitos ni relleno de teclado, correos con formato estricto y sin dominios desechables, teléfonos con el largo real de cada país y sin secuencias, montos entre 10 mil y 5 mil millones de pesos, textos con palabras reales y sin enlaces ni HTML, fechas de calendario reales con edad 18-90.
- **`useServerForm`** (`features/contacto/hooks`) une RHF con las Server Actions: convierte los valores a `FormData`, marca los errores que devuelve el servidor campo por campo, enfoca el primero y expone `reset` para el botón "Enviar otro mensaje".
- **Backend real: `api.igonzalez.cl/api`** (Django REST). Contratos en `features/contacto/services/deliver.ts` (`/enviar-contacto/`, `/enviar-reclamo/`, `/enviar-postulacion/`) y `features/equipo/services/team.ts` (`/vendedores/`, caché de 1 h, fallback a `data/team.ts`). Solo se llama desde servidor (`shared/lib/api.ts`): la CSP no abre `connect-src`. Los valores de las opciones (`persona|empresa|ambas`, `Abogado/a|Procurador/a`) son los del backend. En desarrollo el envío se simula salvo `API_DELIVERY_IN_DEV=1`.
- **Zod nunca se importa desde un Client Component.** Las opciones de los `<select>` y el tipo `FormResult` viven en `features/contacto/constants/options.ts` por esa razón.
- **CSP con nonce en `src/proxy.ts`.** Obliga a render dinámico en todas las páginas (aceptado). `style-src 'unsafe-inline'` es deliberado: `next/image` y los retrasos de animación emiten `style=`. `script-src` es estricto.
- **Todo JSON-LD pasa por `JsonLd` con el nonce** leído de `headers()` en la página.
- **Contenido = voz de la oficina.** Los textos largos (carta, manifiesto, historia, FAQ) se reproducen íntegros desde `features/*/data`. No se reescriben sin autorización del cliente.
- **Datos de contacto** en `shared/lib/site.ts`. **Equipo**: la fuente es el backend; `features/equipo/data/team.ts` aporta fotos, socios fundadores y el rol cuando el backend no trae `sexo`, y es la lista de respaldo si la API falla.
- **Sin cookies no esenciales ni scripts de terceros.** Por eso no hay banner de consentimiento. Si se agrega analítica o píxeles, primero: gestor de consentimiento por categoría, actualizar `/cookies` y la CSP.
- **Rate limiting en memoria** por instancia. En producción se complementa con el WAF de la plataforma.
- **`title` obligatorio en todo enlace e imagen.** `AppLink` lo exige por tipo; `Media` usa el `alt` si no se pasa. El test `e2e/titles.spec.ts` bloquea cualquier `<a>` o `<img>` sin título. `cursor: pointer` es global para `a`, `button`, `summary` y `[role=button]`.
- **El recorte del fundador es `public/equipo/ivan-gonzalez-hero.webp`, con canal alfa.** El maestro sin perdida queda en el `.png` del mismo nombre; el `.webp` es lo que sirve la web (140 KB frente a 1,5 MB). Si se reexporta, tiene que conservar la transparencia: un export aplanado se ve como un bloque negro rectangular sobre el degradado del hero. Lo cubre el test `e2e/rendimiento.spec.ts`, que lee el alfa de las esquinas ya decodificadas. La base de la figura se funde con una mascara sobre la propia imagen (`mask-b-from-58%`), no con un rectangulo de tinta encima, que contra el resplandor azul se notaba.
- **La foto de escritorio (`ivan-gonzalez.webp`, 1524x1032) es apaisada y se recorta a 4/5** en la carta del home y en `/ivan-gonzalez`. Con `object-cover` el navegador la amplia ~1,85 veces el ancho de la caja, asi que `sizes` declara `70vw / 185vw` y no el ancho de la caja: si no, baja una version pequena que se ve borrosa. Los dos retratos van a `quality={90}` (la lista blanca `images.qualities` de Next 16 esta en `next.config.ts`); el resto del sitio sigue en 75.
- **La tarjeta OG usa una copia JPEG a proposito** (`ivan-gonzalez-og.jpg`, 960 px, generada del WebP). Satori no decodifica WebP y no falla: deja el hueco vacio y la tarjeta sale sin foto. Con un tipo de data URI que no corresponde al archivo, en cambio, el build cae al prerenderizar `/opengraph-image`. Ambos casos los cubre el test de `e2e/seo.spec.ts`, que cuenta colores en el panel de la foto.
- **El blur de la cabecera vive en la barra interior, no en `<header>`.** `backdrop-filter` crea un bloque contenedor y recortaría el drawer móvil (fijo) a la altura de la barra.
- **Favicons e iconos del cliente en `public/`** (favicon.ico, 16/32, apple-touch-icon, android-chrome 192/512, site.webmanifest). Se declaran en `metadata.icons` y `metadata.manifest` del layout; no hay `icon.svg` ni `manifest.ts` en `app/`. El matcher de `proxy.ts` los excluye de la CSP.
- **Los retratos del equipo son apaisados (de 1,04 a 1,50) y el marco de la tarjeta es 4/5.** Con `object-cover` el navegador amplia la foto hasta 1,9 veces el ancho de la tarjeta, asi que `sizes` declara ese ancho real (`35vw / 58vw / 88vw` en la grilla, `29rem / 58vw / 82vw` en el carrusel) y no el de la caja. Declarar el ancho de la caja hacia que bajara una version pequena y se viera borrosa. En AVIF la diferencia cuesta unos 5 KB por tarjeta.
- **La tarjeta del equipo no se mueve al pasar el cursor**: lo unico que responde es el retrato, que escala dentro de su marco. Ojo: en Tailwind 4 `scale-*` usa la propiedad `scale`, no `transform`, asi que al comprobarlo hay que leer `getComputedStyle(el).scale`.
- **El numero de cada profesional no se imprime en pantalla**, va solo en el enlace de WhatsApp. El buscador sigue filtrando por digitos, que es justo el caso de quien recibe un mensaje y quiere confirmar de quien es.
- **Carrusel del equipo** (`TeamCarousel`) y **buscador** (`TeamSearch` en `/equipo`, filtra por nombre sin acentos y por dígitos del número, `?q=` en la URL): scroll nativo con snap, sin librería. Ambos reciben `PublicMember` (tipo plano en `features/equipo/types`) serializado desde el servidor para no arrastrar Zod al cliente. En pantallas táctiles (`pointer-coarse:`) el overlay del carrusel queda visible en versión compacta.
- **Video con `media-chrome`** (`VideoPlayer` + `MediaChromePlayer`): fachada con póster de Cloudinary y botón de reproducir; el reproductor (44 KB gz) se importa dinámicamente al pulsar, así no cuenta en el bundle inicial. Cloudinary está permitido en `remotePatterns` y en la CSP (`img-src`, `media-src`). El vídeo no tiene subtítulos: `captionsSrc` acepta un WebVTT cuando el cliente lo entregue.
- **Navegación con desplegable** (`SiteHeader`): en desktop el grupo "Más información" (FAQ, Reclamos y sugerencias, Trabaja con nosotros) es un disclosure que abre con cursor o con clic; el clic no cierra lo que el hover acaba de abrir, y en táctil solo abre al tocar (`matchMedia("(hover: hover)")`). En móvil el mismo grupo es un acordeón dentro del drawer. Cada enlace lleva icono. Nota: "Trabaja con nosotros" aparece a la vez en el desplegable y como botón del header, por pedido del cliente; los tests desambiguan con `.last()` o acotando al `<nav>`.
- **Teléfonos con prefijo internacional.** `PhoneField` (selector de país LATAM + España/EE.UU., Chile por defecto) envía el número concatenado (`+56912345678`) en un campo oculto; el input visible valida por país con `setCustomValidity`. La lista vive en `features/contacto/constants/countries.ts` y el schema `telefono` valida contra ella.
- **Ayuda de campo en tooltip, no bajo el control.** `Field` recibe `hint` y lo muestra en un tooltip dentro del label (`HintTooltip`); `FieldRow` alinea label, control y error de toda la fila con `grid-rows-subgrid`. El botón de ayuda añade `aria-label="Ayuda sobre X"`, así que los selectores por label en tests deben ir anclados (`/^Celular/`).
- **Tras enviar, dos salidas**: `FormStatus` muestra "Enviar otro mensaje" (remonta el formulario con `useFormReset`, que cambia la `key`) y "Volver al inicio".
- **Página de entidad del fundador** (`/ivan-gonzalez`): concentra las búsquedas por su nombre con `Person` + `ProfilePage` JSON-LD y `alternateName` con las variantes reales de escritura. El `@id` del fundador se referencia desde `LegalService` en todo el sitio. Los datos viven en `site.founder`.
- **`.npmrc` con `legacy-peer-deps=true`, versionado.** Vitest 5 pide un peer opcional `@types/node ^22 || >=24` y el proyecto fija `^20`, que es el runtime de desarrollo; el choque es solo de tipos. El archivo tiene que estar en el repo porque Vercel instala con `npm install` sin flags: sin el, el despliegue cae con ERESOLVE. `engines.node` es un rango acotado (`20.x || 22.x`) para que Vercel no avise de que un rango abierto se actualizaria solo al salir un major nuevo.
- **Una variable de entorno declarada sin valor vale como ausente** (`vacioEsAusente` en `shared/lib/env.ts`). Un `API_DELIVERY_IN_DEV=` en un `.env` o una casilla vacia en el panel de Vercel llegan como cadena vacia, no como undefined, y tumbaban el build. `.env.example` esta versionado con una excepcion en `.gitignore` porque el README pide copiarlo al clonar.
- **Formato con Prettier** (`.prettierrc`, printWidth 110, plugin de Tailwind). Correr `npx prettier --write` antes de cerrar una tarea.

## Estructura

```
src/app/                 rutas, metadata, sitemap, robots, OG image, proxy (CSP)
src/features/inicio      secciones del home y textos de la oficina
src/features/servicios   schema, datos y tarjetas de servicios
src/features/equipo      schema, datos, servicio y componentes del equipo
src/features/faq         preguntas frecuentes + FAQPage JSON-LD
src/features/contacto    schemas Zod, Server Actions, formularios, entrega por webhook
src/features/legal       privacidad, términos, cookies (borradores para revisión legal)
src/shared/components    core (Button, AppLink, Section, Media, Field, Icon, JsonLd, Strike, Reveal) y layout
src/shared/lib           site, env, cn, format, json-ld, rate-limit, file-type
scripts/                 fetch-assets, contrast, bundle-budget, shot
e2e/                     Playwright: seo, seguridad, contacto, accesibilidad, rendimiento
```

## Flujo por tarea

1. Leer el archivo completo y los patrones existentes antes de tocar nada.
2. Plan de 3 a 6 líneas.
3. Implementar con diff mínimo.
4. `npm run typecheck && npm run lint && npm run test`, luego `npm run build && npm run e2e`.
5. Si toca UI o rutas públicas: `npm run budget`, capturas con `node scripts/shot.mjs`, revisar metadata y JSON-LD.
6. Reportar qué cambió, por qué, impacto.

## Pendientes conocidos (no inventar soluciones sin el cliente)

- Fotos de 6 abogados en 225x187 px (Rodrigo, Angeles, Hans, Daniela P., Nicolás A., Sebastián) y 3 sin foto (Sofía, Emanuel, Javiera G.): pedir originales. El resto del equipo esta en 1200 px y se ve nitido; esas seis se amplian 2,1 veces en escritorio y 3,6 en pantallas densas. No tiene arreglo por codigo: se probo reescalar con lanczos y enfoque, y la mejora no se nota. Hacen falta los archivos originales, idealmente 1200 px de ancho o mas.
- Cifra de comunidad: el home original dice 450.000 seguidores y la página Nosotros dice más de un millón. Se usa la de Nosotros; confirmar.
- El backend no recibe el registro del consentimiento (versión, fecha, origen): su contrato es fijo. Cuando se pueda ampliar, enviarlo; mientras tanto la casilla es obligatoria y queda el texto en pantalla.
- Textos legales: revisión por abogado antes de publicar.
- DNS: SPF, DKIM, DMARC, CAA y DNSSEC se configuran en el registrador, fuera de este repo.
- Subtítulos WebVTT en español para el vídeo de la historia (WCAG 1.2.2). Se pasan por `captionsSrc`.
