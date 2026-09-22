import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"svg"> & { name: IconName };

export type IconName =
  | "whatsapp"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-up"
  | "search"
  | "play"
  | "help"
  | "home"
  | "scale"
  | "users"
  | "chevron-down"
  | "briefcase"
  | "message"
  | "info"
  | "building"
  | "check"
  | "menu"
  | "close"
  | "pin"
  | "mail"
  | "clock"
  | "phone";

// Set propio de iconos: evita una dependencia de iconos por 25 glifos.
const paths: Record<IconName, string> = {
  whatsapp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.56 0 8.24 3.68 8.24 8.24s-3.68 8.24-8.24 8.24c-1.5 0-2.97-.41-4.25-1.18l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.56 3.68-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07s.89 2.39 1.01 2.56c.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01",
  tiktok:
    "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48",
  instagram:
    "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3",
  facebook:
    "M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7.01H7.9v-2.89h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v7.01c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02",
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  "arrow-up-right": "M7 17 17 7m-9 0h9v9",
  "arrow-up": "M12 19V5m-7 7 7-7 7 7",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16m10 2-4.35-4.35",
  play: "M7 4.5v15l12-7.5z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6m0 3h.01",
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6",
  scale: "M12 3v18M7 21h10M12 6 4 9m8-3 8 3M4 9l-2.5 6a3.5 3.5 0 0 0 5 0zm16 0-2.5 6a3.5 3.5 0 0 0 5 0z",
  users:
    "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20m7-9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M22 20v-1.5a4 4 0 0 0-3-3.87M16 3.63a4 4 0 0 1 0 7.75",
  "chevron-down": "m6 9 6 6 6-6",
  briefcase: "M3 8h18v12H3zm6 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18",
  message: "M21 12a8 8 0 0 1-8 8H8l-5 2 1.5-4.5A8 8 0 1 1 21 12",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-9v5m0-8h.01",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M9 7h2m-2 4h2m-2 4h2m5-4h3a2 2 0 0 1 2 2v7",
  check: "m5 12 5 5L20 7",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  pin: "M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11m0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  mail: "M4 6h16v12H4zm0 0 8 6 8-6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-13v5l3 2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
};

const filled: ReadonlySet<IconName> = new Set(["whatsapp", "tiktok", "instagram", "facebook", "play"]);

export default function Icon({ name, ...rest }: Props) {
  const isFilled = filled.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
