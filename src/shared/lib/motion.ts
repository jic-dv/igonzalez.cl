import type { Transition, Variants } from "motion/react";

// Solo transform y opacity. Curva y duraciones unicas para todo el sitio.
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const revealTransition: Transition = { duration: 0.65, ease: easeOutExpo };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Margen negativo inferior: el elemento entra cuando ya asomo un 10% en pantalla
export const viewportOnce = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;
