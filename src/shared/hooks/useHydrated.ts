"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// false en servidor y en la primera pasada de hidratacion; true despues.
// Permite aplicar estados iniciales de animacion solo cuando hay JavaScript.
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
