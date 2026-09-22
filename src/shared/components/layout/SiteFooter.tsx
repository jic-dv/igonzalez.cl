import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import Reveal from "@/shared/components/core/Reveal";
import { site, whatsappUrl } from "@/shared/lib/site";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Oficina",
    links: [
      { href: "/nosotros", label: "Nosotros", title: "Historia y socios fundadores de IGonzalez" },
      {
        href: "/ivan-gonzalez",
        label: "Iván González",
        title: "Perfil de Iván González Navarrete, abogado y fundador",
      },
      { href: "/equipo", label: "Equipo", title: "Listado de abogados con su contacto" },
      { href: "/#servicios", label: "Servicios", title: "Deudas de impuestos y deudas comerciales" },
      { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros", title: "Formulario de postulación" },
    ],
  },
  {
    title: "Atención",
    links: [
      { href: "/contacto", label: "Contacto", title: "Formulario y datos de contacto" },
      {
        href: "/preguntas-frecuentes",
        label: "Preguntas frecuentes",
        title: "Oficina, pagos, horario y reclamos",
      },
      {
        href: "/reclamos-y-sugerencias",
        label: "Reclamos y sugerencias",
        title: "Formulario de atención al cliente",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidad", label: "Política de privacidad", title: "Cómo tratamos tus datos personales" },
      { href: "/terminos", label: "Términos y condiciones", title: "Condiciones de uso del sitio" },
      { href: "/cookies", label: "Política de cookies", title: "Qué cookies usa el sitio" },
    ],
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-on-ink">
      <div className="max-w-wide mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" title="IGonzalez, ir a la página de inicio" className="inline-block">
              <Image
                src="/marca/logo-white.png"
                alt="IGonzalez"
                title="IGonzalez, abogados especialistas en deudas"
                width={800}
                height={122}
                className="h-7 w-auto lg:h-8"
              />
            </Link>
            <p className="text-on-ink-muted mt-6">
              Abogados especialistas en deudas. Atención en todo Chile, de forma remota y en nuestra oficina
              de Concepción.
            </p>
            <address className="text-on-ink-muted mt-6 flex flex-col gap-3 text-sm not-italic">
              <span className="flex gap-2.5">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0" />
                {site.address.street}, {site.address.city}
              </span>
              <span className="flex gap-2.5">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
                {site.hours}
              </span>
              <a
                href={`mailto:${site.email}`}
                title="Escribir un correo a la oficina"
                className="hover:text-on-ink flex gap-2.5"
              >
                <Icon name="mail" className="mt-0.5 size-4 shrink-0" />
                {site.email}
              </a>
            </address>
            <div className="mt-6 flex gap-2">
              <AppLink
                href={whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas")}
                className="rounded-control inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20"
                title="WhatsApp de IGonzalez"
              >
                <Icon name="whatsapp" className="size-5" />
                <span className="sr-only">WhatsApp</span>
              </AppLink>
              <AppLink
                href={site.social.tiktok.url}
                className="rounded-control inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20"
                title={`TikTok ${site.social.tiktok.handle}`}
              >
                <Icon name="tiktok" className="size-5" />
                <span className="sr-only">TikTok</span>
              </AppLink>
              <AppLink
                href={site.social.instagram.url}
                className="rounded-control inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20"
                title={`Instagram ${site.social.instagram.handle}`}
              >
                <Icon name="instagram" className="size-5" />
                <span className="sr-only">Instagram</span>
              </AppLink>
              <AppLink
                href={site.social.facebook.url}
                className="rounded-control inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20"
                title={`Facebook ${site.social.facebook.handle}`}
              >
                <Icon name="facebook" className="size-5" />
                <span className="sr-only">Facebook</span>
              </AppLink>
            </div>
          </div>

          {columns.map((col, i) => (
            <Reveal key={col.title} as="div" variant="fade" delay={0.1 + i * 0.08}>
              <nav aria-label={col.title}>
                <h2 className="eyebrow text-amber">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        title={l.title}
                        className="text-on-ink-muted duration-fast hover:text-on-ink transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}
        </div>

        <div className="text-on-ink-muted mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Credito de la agencia: discreto, con el logo apagado en reposo y a color al pasar
              el cursor, para que no compita con la marca del cliente. La opacidad se aplica
              solo al logo: sobre el texto bajaba el contraste de 4,5 a 4,06 y axe lo rechaza. */}
          <a
            href="https://podiochile.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Podio Chile, agencia que diseñó y desarrolló este sitio (se abre en una pestaña nueva)"
            className="group duration-fast inline-flex shrink-0 items-center gap-2.5 transition-colors"
          >
            <span className="text-xs">Desarrollada por: </span>
            <Image
              src="/autor/logo-podio-chile.webp"
              alt="Podio Chile"
              title="Podio Chile"
              width={1600}
              height={300}
              sizes="128px"
              className="duration-fast ease-standard h-5 w-auto opacity-70 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </a>

          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} IGonzalez.cl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
