import type { Metadata } from "next";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="on-ink bg-ink text-on-ink">
      <div className="max-w-content mx-auto flex min-h-[70vh] flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <p className="eyebrow text-amber">Error 404</p>
        <h1 id="nf-title" className="font-display text-display-lg mt-4 font-medium text-balance">
          Esta página no existe. Tus deudas, en cambio, sí se pueden eliminar.
        </h1>
        <p className="text-lead text-on-ink-muted mt-6 max-w-xl">
          Puede que el enlace esté mal escrito o que la página haya cambiado de lugar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <AppLink href="/" asButton variant="amber" size="lg" title="Volver a la página de inicio">
            Ir al inicio
            <Icon name="arrow-right" className="size-5" />
          </AppLink>
          <AppLink
            href="/contacto"
            asButton
            variant="outline-on-ink"
            size="lg"
            title="Ir a la página de contacto"
          >
            Contacto
          </AppLink>
        </div>
      </div>
    </section>
  );
}
