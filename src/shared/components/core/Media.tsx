import Image, { type ImageProps } from "next/image";
import { cn } from "@/shared/lib/cn";

type Props = Omit<ImageProps, "alt"> & {
  // alt obligatorio y explicito; "" solo para imagenes decorativas
  alt: string;
};

// Wrapper de next/image. Con fill, sizes es obligatorio en el punto de uso.
// title siempre presente: si no se pasa, usa el alt.
export default function Media({ className, alt, title, ...rest }: Props) {
  return <Image alt={alt} title={title ?? alt} className={cn("object-cover", className)} {...rest} />;
}
