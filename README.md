# IGonzalez.cl - Remaster

Sitio web de IGonzalez, oficina de abogados especialistas en deudas (Concepción, Chile). Reconstrucción completa del sitio actual con foco en impacto visual, SEO técnico, seguridad y accesibilidad.

Stack: Next.js 16.3 (App Router, Turbopack, React Compiler) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · Zod 4 (servidor) · Vitest 5 · Playwright 1.63 · Vercel.

## Arranque

```bash
npm install
cp .env.example .env.local
npm run dev
```

El repo trae un `.npmrc` con `legacy-peer-deps=true`: Vitest 5 declara un peer opcional `@types/node ^22 || >=24` y el proyecto fija `^20`, que es el runtime real. Es un conflicto solo de tipos y no afecta al árbol instalado. Tiene que estar en el repo porque Vercel instala con `npm install` sin flags y si no falla con ERESOLVE.

El servidor de desarrollo corre en `http://localhost:3210`.

## Comandos

| Comando                | Qué hace                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo (Turbopack)                                                          |
| `npm run build`        | Build de producción                                                                         |
| `npm run typecheck`    | `tsc --noEmit` en modo strict                                                               |
| `npm run lint`         | ESLint (Next + TypeScript + jsx-a11y strict)                                                |
| `npm run test`         | Vitest: schemas, formatters, rate limit, magic bytes, formulario de contacto                |
| `npm run e2e`          | Playwright contra el build de producción: SEO/SSR, cabeceras, formulario, axe, teclado, CLS |
| `npm run budget`       | Mide el JS de cliente por ruta (requiere `next start -p 3211` corriendo)                    |
| `npm run verify`       | Todo lo anterior en orden                                                                   |
| `npm run assets:fetch` | Vuelve a descargar y normalizar las fotos desde el sitio actual                             |
| `npm run contrast`     | Mide el contraste WCAG de la paleta                                                         |

## Variables de entorno

| Variable              | Uso                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `IGONZALEZ_API_URL`   | Backend de la oficina. Por defecto `https://api.igonzalez.cl/api`; cambiar solo para staging       |
| `API_DELIVERY_IN_DEV` | `1` para que en desarrollo los formularios se envíen de verdad al backend (por defecto se simulan) |
| `E2E_MOCK_DELIVERY`   | `1` en Playwright y CI: simula la entrega en el build de producción                                |

Se validan con Zod al arrancar en `src/shared/lib/env.ts`. Ninguna variable lleva prefijo `NEXT_PUBLIC_`: el cliente no recibe configuración.

## Qué cambió respecto al sitio actual

| Eje                 | Sitio actual                                                                                          | Este proyecto                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Renderizado         | SPA Vite: HTML de 480 bytes, contenido solo con JavaScript                                            | Server Components: todo el contenido en el HTML inicial                                                                                  |
| Rutas               | `/about`, `/contacto`, `/faq`, `/reclamos`, `/postulacion` responden `AccessDenied` al acceso directo | Rutas reales con redirección 308 desde las antiguas                                                                                      |
| Metadata            | `title: IGonzalez`, sin description, canonical ni OG, `lang="en"`                                     | Metadata API completa por ruta, `lang="es-CL"`, OG image generada                                                                        |
| Datos estructurados | Ninguno                                                                                               | `LegalService`, `WebSite`, `BreadcrumbList`, `ItemList` de `Person`, `FAQPage`                                                           |
| Imágenes            | Logo PNG 5262x802 px; retratos JPG de 2500x3000 px sin redimensionar                                  | `next/image` con AVIF/WebP, `sizes` por contexto, retratos normalizados a 1200 px                                                        |
| Contraste           | Botones verde WhatsApp `#25D366` con texto blanco: 2.4:1                                              | Paleta OKLCH medida: mínimo 4.6:1 en texto, verde WhatsApp accesible 5.5:1                                                               |
| Seguridad           | Sin cabeceras                                                                                         | CSP con nonce, HSTS preload, nosniff, frame-ancestors none, Referrer-Policy, Permissions-Policy, COOP                                    |
| Formularios         | Sin validación en servidor visible                                                                    | Zod en Server Actions, honeypot, tiempo mínimo, rate limit, CV verificado por magic bytes, consentimiento registrado con versión y fecha |
| Legal               | Sin política de privacidad, términos ni cookies                                                       | Tres documentos versionados, enlazados en el footer, consentimiento explícito por formulario                                             |
| Accesibilidad       | Sin skip link, foco no gestionado en menú                                                             | WCAG 2.2 AA: axe en CI, teclado, foco visible, `prefers-reduced-motion`, menú móvil con foco gestionado                                  |

## Sistema de diseño

- **Paleta** (OKLCH, en `src/app/globals.css`): tinta índigo del logo (`--color-ink`, `#06094e`) como superficie de identidad, papel frío (`--color-paper`), azul interactivo (`--color-brand`) y un solo acento cálido: ámbar (`--color-amber`), reservado al elemento firma y a cifras sobre tinta.
- **Tipografía**: Source Serif 4 (display, con eje óptico) y Plus Jakarta Sans (texto), servidas con `next/font`. Escala fluida `clamp()` de 360 a 1440 px.
- **Elemento firma**: la línea ámbar que tacha la palabra "deudas" (`Strike`). Se dibuja al cargar con una animación CSS y respeta `prefers-reduced-motion`.
- **Ritmo**: `Section` centraliza el ritmo vertical y el ancho máximo. Escala de 4 px. Radios y sombras como tokens.
- **Vídeo**: `media-chrome` (Mux) como reproductor, cargado bajo demanda tras pulsar el póster de Cloudinary; 44 KB gz que no entran en el bundle inicial.
- **Animación**: solo `transform` y `opacity`. Apariciones en cascada con `motion` en modo ligero (`LazyMotion` + `domAnimation` + `m.*`) a través de un único componente `Reveal`; `prefers-reduced-motion` se respeta vía `MotionConfig`. El tachado del hero sigue siendo CSS puro.

## Rendimiento

Presupuesto medido con `scripts/bundle-budget.mjs` (JS comprimido transferido, contexto sin caché):

| Ruta                                 | Medido   | Presupuesto |
| ------------------------------------ | -------- | ----------- |
| `/`                                  | 213.8 KB | 220 KB      |
| `/ivan-gonzalez`                     | 211.4 KB | 220 KB      |
| `/equipo`                            | 210.6 KB | 220 KB      |
| `/nosotros`, `/preguntas-frecuentes` | 205.5 KB | 220 KB      |
| `/contacto`, `/trabaja-con-nosotros` | 232.9 KB | 240 KB      |

El piso de Next 16.3 + React 19.2 (react-dom 70.6 KB, runtime del App Router 44.8 KB, chunks compartidos 45 KB) es de 160 KB gz. `motion` en modo ligero (`LazyMotion` + `domAnimation`) suma 50 KB gz medidos con Turbopack: es una decisión explícita del cliente para las animaciones de aparición. React Hook Form suma 15 KB gz en las dos rutas con formulario, a petición del cliente; se usa sin `zodResolver` para que Zod (94 KB) siga viviendo solo en el servidor. El código propio pesa entre 1 y 8 KB por ruta.

Las páginas se renderizan en servidor por request (nonce de CSP). En Vercel esto significa TTFB en el rango de decenas de milisegundos; si en el futuro se prefiere HTML estático, hay que cambiar la CSP a hashes y retirar `headers()` del layout.

## Seguridad

- CSP por request con nonce (`src/proxy.ts`). `script-src 'self' 'nonce-…' 'strict-dynamic'`, sin `unsafe-eval` en producción. `style-src 'unsafe-inline'` es deliberado y está documentado en el archivo.
- Cabeceras estáticas en `next.config.ts`.
- Server Actions: validación Zod completa, honeypot, tiempo mínimo de llenado (3 s), rate limit 5 envíos / 10 min por IP y formulario, archivos verificados por magic bytes con nombre regenerado. Solo después se llama al backend (`api.igonzalez.cl`) desde el servidor; los errores de validación del backend se traducen a errores por campo y cualquier otro fallo devuelve un mensaje genérico.
- Integración con el backend: `POST /enviar-contacto/`, `POST /enviar-reclamo/` y `POST /enviar-postulacion/` con los mismos campos que usaba el sitio anterior; `GET /vendedores/` alimenta el equipo (rol según `sexo`, caché de una hora, respaldo local si la API no responde).
- Rate limit en memoria por instancia: en producción se complementa con el rate limiting del WAF de Vercel o Cloudflare.
- CI: gitleaks, `npm audit --audit-level=high`, lockfile respetado con `npm ci`.
- Fuera del repo (registrador y DNS): SPF, DKIM, DMARC, CAA, DNSSEC, bloqueo de transferencia.

## SEO

- Metadata única por ruta, canonical absoluta, OG y Twitter, `opengraph-image.tsx` con la fuente de display y el retrato real.
- Página de entidad para el fundador en `/ivan-gonzalez`, con `Person` + `ProfilePage` y `alternateName` con las variantes de escritura que la gente usa al buscar (con y sin tilde, "Gonzales" por "González"). Es la pieza que compite por las búsquedas del nombre propio, que en este negocio son las de mayor intención.
- Grafo de entidades con `@id` estables: la oficina (`LegalService`), el sitio (`WebSite`), el fundador (`Person`) y el catálogo de servicios (`OfferCatalog`) se referencian entre páginas en vez de repetirse sueltos.
- `sitemap.ts` con `lastModified` manual (se actualiza al cambiar contenido) e imágenes del equipo; `robots.ts` con acceso explícito a GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot y Google-Extended.
- JSON-LD generado desde los mismos datos que renderizan las páginas.
- Nota honesta: `FAQPage` se mantiene por comprensión de entidades y recuperabilidad en sistemas de IA; Google dejó de mostrar rich results de FAQ en mayo de 2026.

## Legal (Ley 21.719)

- `/privacidad`, `/terminos` y `/cookies` en HTML indexable con versión y fecha. Son borradores técnicos: deben revisarse por un abogado antes de publicarse.
- La política de privacidad detalla el recorrido real de los datos: qué campos pide cada formulario y para qué, a dónde viajan (servidor propio `api.igonzalez.cl`), quién del equipo accede, qué ocurre cuando escribes por WhatsApp (Meta como tercero fuera de nuestro control), plazos de conservación por tipo de dato, transferencias internacionales, derechos ARCO más portabilidad, y el deber de notificar brechas en 72 horas.
- Cada formulario pide consentimiento explícito con finalidad específica y lo envía al webhook con `{ aceptado, version, fecha, origen }`.
- Minimización: cada campo tiene una finalidad declarada en la política. El monto de deuda es opcional.
- El sitio no usa cookies no esenciales ni scripts de terceros con cookies; por eso no hay banner. Si se agrega analítica, primero el gestor de consentimiento.

## Pendientes que dependen del cliente

1. Fotos en alta resolución de Rodrigo Álvarez, Angeles Torres, Hans Wohlk, Daniela Pacheco, Nicolás Alonso y Sebastián Jahr (hoy 225x187 px), y fotos de Sofía Franzinetti, Emanuel Martinez y Javiera González (hoy sin foto, se muestra monograma).
2. Confirmar la cifra de comunidad (450.000 en el home actual vs. más de un millón en Nosotros). Se usa la segunda.
3. Confirmar "Abogada" para Elizabeth Mella y Macarena Torres (el sitio actual dice "Abogado") y el handle de Instagram (`@abogadoivangonzalez` según el enlace real; el texto visible del sitio actual decía `@ivangonzalezabogado`).
4. El backend no recibe el registro del consentimiento (versión y fecha aceptadas): su contrato es fijo. Conviene ampliarlo para poder demostrar el consentimiento ante la Agencia (Ley 21.719).
5. Revisión legal de los tres documentos.
6. Evaluar si mantener publicados en las FAQ la cuenta bancaria y el correo de pagos: es información útil para clientes, pero también un vector de suplantación. Si se mantiene, los términos ya advierten que ningún abogado pide pagos a cuentas personales.
7. Subtítulos en español (archivo WebVTT) para el vídeo de la historia: es un requisito de accesibilidad (WCAG 1.2.2) y el reproductor ya lo admite con `captionsSrc`.
8. Contenido adicional para páginas de servicio propias (`/servicios/deudas-de-impuestos`, `/servicios/deudas-comerciales`): con el texto actual serían páginas delgadas, por eso hoy viven como sección del home.

## Licencias

- Fotografías y logo: propiedad de González y Acuña Limitada, tomadas del sitio actual para esta propuesta.
- Source Serif 4: SIL Open Font License (`src/assets/SourceSerif4-LICENSE.md`). Plus Jakarta Sans: SIL OFL, vía `next/font`.
