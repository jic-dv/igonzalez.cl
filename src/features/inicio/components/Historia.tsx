import { manifiesto, videoHistoria } from "@/features/inicio/data/textos";
import AppLink from "@/shared/components/core/AppLink";
import Icon from "@/shared/components/core/Icon";
import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";
import VideoPlayer from "@/shared/components/core/VideoPlayer";
import { site } from "@/shared/lib/site";

// La historia de la oficina en la voz de Ivan: su video de TikTok junto al texto integro.
// Va justo antes del equipo: el relato termina en "asi nacio nuestra oficina".
export default function Historia() {
  return (
    <Section labelledBy="historia-title" tone="paper-2">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal variant="fade" className="lg:sticky lg:top-28">
            <VideoPlayer
              src={videoHistoria.src}
              poster={videoHistoria.poster}
              width={videoHistoria.width}
              height={videoHistoria.height}
              title={videoHistoria.title}
              className="mx-auto w-full max-w-[20rem] lg:max-w-[22rem]"
            />
            <p className="text-muted mt-4 text-center text-sm lg:text-left">
              Del TikTok de Iván{" "}
              <AppLink
                href={site.social.tiktok.url}
                className="text-ink font-semibold underline-offset-4 hover:underline"
                title={`Perfil de TikTok ${site.social.tiktok.handle}`}
              >
                {site.social.tiktok.handle}
              </AppLink>
              , donde comparte consejos sobre deudas cada día.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-amber-deep">Nuestra historia</p>
            <h2
              id="historia-title"
              className="font-display text-display-lg text-ink mt-4 font-medium text-balance"
            >
              Un día leí que el conocimiento debía compartirse con el mundo.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="border-amber mt-8 border-l-4 pl-6 sm:pl-8">
              <div className="text-lead text-text flex flex-col gap-5">
                {manifiesto.parrafos.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
                <p className="font-display text-display-sm text-ink font-medium">{manifiesto.cierre}</p>
              </div>
              <footer className="text-muted mt-6">
                <cite className="not-italic">Iván González Navarrete, fundador</cite>
              </footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.25} className="mt-8">
            <AppLink
              href={site.social.tiktok.url}
              asButton
              variant="ink"
              title={`Seguir a Iván en TikTok ${site.social.tiktok.handle}`}
            >
              <Icon name="tiktok" className="size-4" />
              Seguir a Iván en TikTok
            </AppLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
