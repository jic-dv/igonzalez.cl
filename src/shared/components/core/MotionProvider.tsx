"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

// LazyMotion + m.* en vez de <motion.*>: solo se incluye el subconjunto domAnimation
// (animaciones, gestos e inView; sin layout ni drag). Se carga de forma estatica para
// que las animaciones sobre el pliegue corran en la hidratacion y no dependan de un
// chunk diferido. strict: usar <motion.*> falla en desarrollo.
// reducedMotion="user" respeta la preferencia del sistema.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
