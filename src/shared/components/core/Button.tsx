import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/cn";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-control font-semibold",
    "transition-[background-color,color,transform,box-shadow,filter] duration-fast ease-standard",
    "min-h-11 select-none whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-60 aria-busy:cursor-progress",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-hover shadow-card",
        ink: "bg-ink text-on-ink hover:bg-ink-2",
        amber: "bg-amber text-ink hover:brightness-95",
        whatsapp: "bg-wa text-white hover:bg-wa-hover",
        outline: "border border-line-strong bg-transparent text-text hover:bg-paper-2",
        "outline-on-ink": "border border-on-ink/30 bg-transparent text-on-ink hover:bg-white/10",
        ghost: "bg-transparent text-text hover:bg-paper-2",
      },
      size: {
        sm: "min-h-9 px-3.5 py-2 text-sm",
        md: "px-5 py-2.5 text-[0.9375rem]",
        lg: "px-6 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants> & { loading?: boolean };

export default function Button({ className, variant, size, loading, children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      aria-busy={loading || undefined}
      {...rest}
      disabled={loading || rest.disabled}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
