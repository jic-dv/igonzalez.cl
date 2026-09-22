"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import AppLink from "@/shared/components/core/AppLink";
import Icon, { type IconName } from "@/shared/components/core/Icon";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/lib/cn";
import { site, whatsappUrl } from "@/shared/lib/site";

type NavLink = { href: string; label: string; icon: IconName; title: string };
type NavGroup = { label: string; icon: IconName; title: string; items: readonly NavLink[] };
type NavItem = NavLink | NavGroup;

const isGroup = (item: NavItem): item is NavGroup => "items" in item;

// En pantallas tactiles no hay cursor: el desplegable se abre solo al tocar el boton
const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const nav: readonly NavItem[] = [
  {
    href: "/#servicios",
    label: "Servicios",
    icon: "scale",
    title: "Deudas de impuestos y deudas comerciales",
  },
  {
    href: "/nosotros",
    label: "Nosotros",
    icon: "building",
    title: "Historia y socios fundadores de IGonzalez",
  },
  { href: "/equipo", label: "Equipo", icon: "users", title: "Listado de abogados con su contacto" },
  { href: "/contacto", label: "Contacto", icon: "mail", title: "Formulario y datos de contacto" },
  {
    label: "Más información",
    icon: "info",
    title: "Preguntas frecuentes, reclamos y postulaciones",
    items: [
      {
        href: "/preguntas-frecuentes",
        label: "FAQ",
        icon: "help",
        title: "Preguntas frecuentes: oficina, pagos y horario",
      },
      {
        href: "/reclamos-y-sugerencias",
        label: "Reclamos y sugerencias",
        icon: "message",
        title: "Formulario de atención al cliente",
      },
      {
        href: "/trabaja-con-nosotros",
        label: "Trabaja con nosotros",
        icon: "briefcase",
        title: "Postula como abogado o procurador",
      },
    ],
  },
];

const WA_HREF = whatsappUrl(site.whatsapp, "Hola, quisiera una asesoría sobre mis deudas");

const navLinkClass = (active: boolean, onInk: boolean) =>
  cn(
    "group/nav relative flex items-center gap-2 rounded-control px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-fast ease-standard",
    onInk ? "text-on-ink-muted hover:text-on-ink" : "text-muted hover:text-ink",
    active && (onInk ? "text-on-ink" : "text-ink"),
  );

const underlineClass = (active: boolean) =>
  cn(
    "pointer-events-none absolute inset-x-3.5 bottom-0.5 h-0.5 origin-left rounded-full bg-amber transition-transform duration-enter ease-out-expo",
    active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100",
  );

// Cabecera sobre tinta al inicio de cada pagina; al hacer scroll pasa a barra clara con blur
// (unico uso de glass del sitio, con fallback opaco). En movil, drawer lateral.
export default function SiteHeader() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [open]);

  const onInk = !scrolled;
  const isActive = (href: string) => pathname === href;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50", onInk ? "on-ink text-on-ink" : "text-text")}>
      {/* El blur vive en la barra, no en el header: backdrop-filter crearia un bloque contenedor
          para el drawer fijo y lo dejaria recortado a la altura de la barra. */}
      <div
        className={cn(
          "duration-enter ease-standard border-b transition-[background-color,box-shadow,border-color]",
          onInk
            ? "border-white/15 bg-transparent"
            : "bg-paper/85 shadow-card supports-[not(backdrop-filter:blur(1px))]:bg-paper border-transparent backdrop-blur-md",
        )}
      >
        <div className="max-w-wide mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="IGonzalez, ir al inicio"
            title="IGonzalez, ir a la página de inicio"
          >
            <Image
              src={onInk ? "/marca/logo-white.png" : "/marca/logo.png"}
              alt="IGonzalez"
              title="IGonzalez, abogados especialistas en deudas"
              width={800}
              height={122}
              priority
              className="h-[18px] w-auto lg:h-[22px]"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              isGroup(item) ? (
                <NavDropdown key={item.label} group={item} onInk={onInk} isActive={isActive} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  title={item.title}
                  className={navLinkClass(isActive(item.href), onInk)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <Icon name={item.icon} className="size-4 opacity-70" />
                  {item.label}
                  <span aria-hidden="true" className={underlineClass(isActive(item.href))} />
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <AppLink
              href="/trabaja-con-nosotros"
              asButton
              variant={onInk ? "outline-on-ink" : "outline"}
              size="sm"
              title="Postula como abogado o procurador"
            >
              <Icon name="briefcase" className="size-4" />
              Trabaja con nosotros
            </AppLink>
            <AppLink
              href={WA_HREF}
              asButton
              variant="whatsapp"
              size="sm"
              title="Escribir a la oficina por WhatsApp"
            >
              <Icon name="whatsapp" className="size-4" />
              Escríbenos
            </AppLink>
          </div>

          <button
            ref={openRef}
            type="button"
            title="Abrir el menú de navegación"
            className={cn(
              "rounded-control duration-fast inline-flex size-11 items-center justify-center transition-colors lg:hidden",
              onInk ? "hover:bg-white/10" : "hover:bg-paper-2",
            )}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="size-6" />
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>

      {/* Drawer movil. Permanece en el DOM para animar; inert lo saca del foco y del lector cuando esta cerrado. */}
      <div
        id={drawerId}
        className={cn("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible delay-[320ms]")}
        inert={!open}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Cerrar el menú tocando fuera"
          title="Cerrar el menú tocando fuera"
          onClick={() => setOpen(false)}
          className={cn(
            "bg-ink/60 duration-section ease-standard absolute inset-0 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={cn(
            "on-ink bg-ink text-on-ink shadow-elevated duration-section ease-out-expo absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Image
              src="/marca/logo-white.png"
              alt="IGonzalez"
              title="IGonzalez, abogados especialistas en deudas"
              width={800}
              height={122}
              className="h-[18px] w-auto"
            />
            <button
              ref={closeRef}
              type="button"
              title="Cerrar el menú de navegación"
              className="rounded-control duration-fast -mr-2.5 inline-flex size-11 items-center justify-center transition-colors hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="size-6" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav aria-label="Principal móvil" className="flex-1 overflow-y-auto px-6 pt-4">
            <ul className="flex flex-col">
              {[
                { href: "/", label: "Inicio", icon: "home", title: "Página de inicio" } as NavLink,
                ...nav,
              ].map((item, i) => (
                <li
                  key={isGroup(item) ? item.label : item.href}
                  className={cn(
                    "duration-section ease-out-expo border-b border-white/10 transition-[opacity,transform]",
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  {isGroup(item) ? (
                    <MobileGroup group={item} isActive={isActive} onNavigate={() => setOpen(false)} />
                  ) : (
                    <Link
                      href={item.href as "/"}
                      title={item.title}
                      className="group/item flex items-center justify-between py-4 text-xl font-semibold"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span className={cn("flex items-center gap-3", isActive(item.href) && "text-amber")}>
                        <Icon name={item.icon} className="text-on-ink-muted size-5" />
                        {item.label}
                      </span>
                      <Icon
                        name="arrow-right"
                        className="text-on-ink-muted duration-fast size-5 transition-transform group-hover/item:translate-x-1"
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <AppLink
              href={WA_HREF}
              asButton
              variant="whatsapp"
              size="lg"
              className="w-full"
              title="Escribir a la oficina por WhatsApp"
            >
              <Icon name="whatsapp" className="size-5" />
              Escríbenos por WhatsApp
            </AppLink>
            <p className="text-on-ink-muted text-center text-sm">{site.hours}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Desplegable de escritorio. Patron "disclosure": un boton que muestra una lista de
// enlaces. Abre al pasar el cursor o al pulsar, y cierra con Escape o al salir del grupo.
function NavDropdown({
  group,
  onInk,
  isActive,
}: {
  group: NavGroup;
  onInk: boolean;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const ref = useRef<HTMLDivElement>(null);
  // El cursor ya pudo abrirlo: en ese caso el clic no debe cerrarlo de inmediato
  const openedByHover = useRef(false);
  const someActive = group.items.some((item) => isActive(item.href));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    // El hover solo adelanta la apertura: el boton y los enlaces son accesibles por teclado
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        if (!canHover()) return;
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!canHover()) return;
        openedByHover.current = false;
        setOpen(false);
      }}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        title={group.title}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        className={navLinkClass(someActive, onInk)}
      >
        <Icon name={group.icon} className="size-4 opacity-70" />
        {group.label}
        <Icon
          name="chevron-down"
          className={cn("duration-fast size-4 transition-transform", open && "rotate-180")}
        />
        <span aria-hidden="true" className={underlineClass(someActive)} />
      </button>

      <div
        id={panelId}
        className={cn(
          "rounded-card border-line bg-paper shadow-elevated duration-fast ease-standard absolute top-full right-0 z-10 w-64 origin-top-right border p-2 transition-[opacity,transform]",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href as "/"}
                title={item.title}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-control duration-fast flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-brand/10 text-brand"
                    : "text-text hover:bg-paper-2 hover:text-ink",
                )}
              >
                <Icon name={item.icon} className="text-muted size-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// En movil el grupo es un acordeon: ocupa el mismo lugar que los demas enlaces
// y despliega sus hijos sin sacar a la persona del menu.
function MobileGroup({
  group,
  isActive,
  onNavigate,
}: {
  group: NavGroup;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(() => group.items.some((item) => isActive(item.href)));
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        title={group.title}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-xl font-semibold"
      >
        <span className="flex items-center gap-3">
          <Icon name={group.icon} className="text-on-ink-muted size-5" />
          {group.label}
        </span>
        <Icon
          name="chevron-down"
          className={cn("text-on-ink-muted duration-fast size-5 transition-transform", open && "rotate-180")}
        />
      </button>
      <ul id={panelId} className={cn("flex-col gap-0.5 pb-3 pl-5", open ? "flex" : "hidden")}>
        {group.items.map((item) => (
          <li key={item.href}>
            {/* El subitem se destaca con letra mas clara y fondo un poco mas oscuro. active
                cubre el tacto, donde no hay hover, y el icono acompana el mismo aclarado. */}
            <Link
              href={item.href as "/"}
              title={item.title}
              onClick={onNavigate}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group/sub rounded-control duration-fast ease-standard flex items-center gap-3 px-3 py-2.5",
                "text-base transition-[color,background-color] hover:bg-black/25 active:bg-black/35",
                isActive(item.href)
                  ? "text-amber font-semibold"
                  : "text-on-ink-muted hover:text-on-ink active:text-on-ink",
              )}
            >
              <Icon
                name={item.icon}
                className="duration-fast group-hover/sub:text-on-ink size-4 transition-colors"
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
