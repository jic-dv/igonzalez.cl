import type { Metadata } from "next";
import { headers } from "next/headers";
import { getServices } from "@/features/servicios/services/services";
import { JsonLd } from "@/shared/components/core/JsonLd";
import { serviceCatalogJsonLd } from "@/shared/lib/json-ld";
import Hero from "@/features/inicio/components/Hero";
import Canales from "@/features/inicio/components/Canales";
import Carta from "@/features/inicio/components/Carta";
import Proceso from "@/features/inicio/components/Proceso";
import Historia from "@/features/inicio/components/Historia";
import ServiciosSection from "@/features/servicios/components/ServiciosSection";
import MuroEquipo from "@/features/equipo/components/MuroEquipo";
import CtaFinal from "@/shared/components/layout/CtaFinal";

export const metadata: Metadata = {
  title: "IGonzalez | Abogados especialistas en deudas en Chile",
  description:
    "Eliminamos deudas de impuestos y deudas comerciales mediante prescripción, abandono del procedimiento y procedimientos concursales. Oficina de Iván González Navarrete, más de 25 abogados en todo Chile.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IGonzalez | Abogados especialistas en deudas en Chile",
    description:
      "Eliminamos deudas de impuestos y deudas comerciales. Más de 25 abogados en todo Chile, atención por WhatsApp.",
    url: "/",
  },
};

export default async function HomePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const services = getServices();

  return (
    <>
      <Hero />
      <Canales />
      <ServiciosSection />
      <Carta />
      <Proceso />
      <Historia />
      <MuroEquipo />
      <CtaFinal />
      <JsonLd nonce={nonce} data={serviceCatalogJsonLd(services)} />
    </>
  );
}
