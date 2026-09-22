"use client";

import { m, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHydrated } from "@/shared/hooks/useHydrated";
import { fade, fadeUp, revealTransition } from "@/shared/lib/motion";

type Props = {
  as?: "div" | "li" | "section" | "article" | "span";
  className?: string;
  // Retraso en segundos para escalonar elementos en cascada
  delay?: number;
  // "up": desplazamiento sutil hacia arriba; "fade": solo opacidad
  variant?: "up" | "fade";
  // true: anima al montar (sobre el pliegue); false: anima al entrar en pantalla
  immediate?: boolean;
  children: ReactNode;
};

const tags = { div: m.div, li: m.li, section: m.section, article: m.article, span: m.span } as const;

const instant = { duration: 0 } as const;

// Aparicion en cascada en tres pasos:
// 1. Servidor y primera pasada de hidratacion: visible, sin estilos inline de ocultacion
//    (SEO, lectores de pantalla y usuarios sin JavaScript ven todo).
// 2. Tras hidratar: salto instantaneo a oculto.
// 3. Al entrar en pantalla (o al siguiente frame si es inmediato): transicion a visible.
export default function Reveal({
  as = "div",
  className,
  delay = 0,
  variant = "up",
  immediate = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Todas las etiquetas comparten las props de motion; el tipo del ref se unifica al de div.
  const Tag = tags[as] as typeof m.div;
  const show = !hydrated || (armed && (immediate || inView));
  const transition = hydrated && armed ? { ...revealTransition, delay } : instant;

  return (
    <Tag
      ref={ref}
      className={className}
      variants={variant === "fade" ? fade : fadeUp}
      initial={false}
      animate={show ? "visible" : "hidden"}
      transition={transition}
    >
      {children}
    </Tag>
  );
}
