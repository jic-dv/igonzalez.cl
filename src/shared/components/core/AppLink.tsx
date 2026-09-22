import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { buttonVariants } from "@/shared/components/core/Button";
import { cn } from "@/shared/lib/cn";

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

type Props = Omit<LinkProps, "href" | "title"> &
  VariantProps<typeof buttonVariants> & {
    href: LinkProps["href"] | string;
    // Obligatorio en todo enlace del sitio: describe el destino, no repite el texto visible
    title: string;
    // Estiliza el enlace como boton usando las mismas variantes de Button
    asButton?: boolean;
  };

const isExternal = (href: string) =>
  /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

// Wrapper de next/link: rel y target para externos, sin prefetch fuera del sitio.
// Los internos quedan tipados por typedRoutes.
export default function AppLink({
  href,
  title,
  className,
  asButton,
  variant,
  size,
  children,
  ...rest
}: Props) {
  const classes = cn(asButton && buttonVariants({ variant, size }), className);

  if (typeof href === "string" && isExternal(href)) {
    const opensNewTab = !href.startsWith("mailto:") && !href.startsWith("tel:");
    return (
      <a
        href={href}
        title={opensNewTab ? `${title} (se abre en una pestaña nueva)` : title}
        className={classes}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        target={opensNewTab ? "_blank" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as LinkProps["href"]} title={title} className={classes} {...rest}>
      {children}
    </Link>
  );
}
