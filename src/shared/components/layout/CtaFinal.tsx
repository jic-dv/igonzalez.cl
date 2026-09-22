import AppLink from "@/shared/components/core/AppLink";
import Reveal from "@/shared/components/core/Reveal";
import Icon from "@/shared/components/core/Icon";
import { site, whatsappUrl } from "@/shared/lib/site";

type Props = {
  title?: string;
  text?: string;
};

// Cierre comun de las paginas publicas: una sola accion principal.
export default function CtaFinal({
  title = "Empieza hoy. Cuéntanos tu caso.",
  text = "Una conversación por WhatsApp basta para saber si tu deuda se puede eliminar y por qué vía.",
}: Props) {
  return (
    <section aria-labelledby="cta-final-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-card bg-amber text-ink relative overflow-hidden px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-[radial-gradient(closest-side,oklch(1_0_0/0.45),transparent)]"
            />
            <div className="relative max-w-xl">
              <h2 id="cta-final-title" className="font-display text-display-md font-medium text-balance">
                {title}
              </h2>
              <p className="text-lead text-ink/80 mt-4">{text}</p>
            </div>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <AppLink
                href={whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas")}
                asButton
                variant="ink"
                size="lg"
                title="Abre WhatsApp en una pestaña nueva"
              >
                <Icon name="whatsapp" className="size-5" />
                Escribir por WhatsApp
              </AppLink>
              <AppLink
                href="/contacto"
                asButton
                variant="outline"
                size="lg"
                className="border-ink/30 text-ink hover:bg-ink/10"
                title="Ir al formulario de contacto"
              >
                Usar el formulario
              </AppLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
