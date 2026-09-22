import { servicesData } from "@/features/servicios/data/services";
import { serviceSchema, type Service } from "@/features/servicios/schemas/service";

const services: Service[] = servicesData.map((s) => serviceSchema.parse(s));

export const getServices = () => services;

export const getService = (slug: string) => services.find((s) => s.slug === slug);
