import AppLink from "@/shared/components/core/AppLink";
import Reveal from "@/shared/components/core/Reveal";
import Icon, { type IconName } from "@/shared/components/core/Icon";
import { cn } from "@/shared/lib/cn";
import { site, whatsappUrl } from "@/shared/lib/site";

const canales: {
  icon: IconName;
  label: string;
  handle: string;
  href: string;
  title: string;
  brand: string;
}[] = [
  {
    icon: "whatsapp",
    label: "WhatsApp",
    handle: site.phoneDisplay,
    href: whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas"),
    title: "Escríbenos por WhatsApp",
    brand: "bg-social-whatsapp",
  },
  {
    icon: "tiktok",
    label: "TikTok",
    handle: site.social.tiktok.handle,
    href: site.social.tiktok.url,
    title: "Perfil de TikTok",
    brand: "bg-social-tiktok",
  },
  {
    icon: "instagram",
    label: "Instagram",
    handle: site.social.instagram.handle,
    href: site.social.instagram.url,
    title: "Perfil de Instagram",
    brand: "bg-social-instagram",
  },
  {
    icon: "facebook",
    label: "Facebook",
    handle: site.social.facebook.handle,
    href: site.social.facebook.url,
    title: "Página de Facebook",
    brand: "bg-social-facebook",
  },
];

// Banda de canales: la oficina nacio en redes sociales y ese es su primer punto de contacto.
export default function Canales() {
  return (
    <section aria-labelledby="canales-title" className="border-line bg-paper border-b">
      <h2 id="canales-title" className="sr-only">
        Canales de contacto y redes sociales
      </h2>
      <ul className="max-w-wide divide-line mx-auto grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {canales.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i * 0.07} variant="fade">
            <AppLink
              href={c.href}
              title={c.title}
              className="group duration-fast hover:bg-paper-2 flex items-center gap-4 px-4 py-4 transition-colors sm:px-6 sm:py-5 lg:px-8 lg:py-6"
            >
              <span
                className={cn(
                  "rounded-control duration-fast flex size-11 shrink-0 items-center justify-center text-white transition-transform group-hover:-translate-y-0.5",
                  c.brand,
                )}
              >
                <Icon name={c.icon} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="text-muted block text-sm">{c.label}</span>
                <span className="block truncate font-semibold">{c.handle}</span>
              </span>
            </AppLink>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
