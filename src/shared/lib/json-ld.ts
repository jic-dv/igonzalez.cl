import { site, absoluteUrl } from "@/shared/lib/site";

// Grafo de entidades del sitio. Cada nodo tiene @id estable para poder referenciarse
// entre paginas: la oficina, el sitio y el fundador son siempre la misma entidad.
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const FOUNDER_ID = `${site.url}${site.founder.path}#person`;

export const organizationRef = () => ({ "@id": ORG_ID });
export const founderRef = () => ({ "@id": FOUNDER_ID });

const socialProfiles = [site.social.tiktok.url, site.social.instagram.url, site.social.facebook.url];

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": ORG_ID,
  name: site.name,
  alternateName: [...site.alternateNames],
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl("/marca/logo.png"),
  image: absoluteUrl("/opengraph-image"),
  description:
    "Oficina de abogados especialistas en eliminación de deudas fiscales y comerciales en Chile. Prescripción, abandono del procedimiento y procedimientos concursales.",
  telephone: site.phoneDisplay,
  email: site.email,
  foundingDate: String(site.foundedYear),
  founder: founderRef(),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "Chile" },
  availableLanguage: "es",
  knowsAbout: [...site.founder.knowsAbout],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: socialProfiles,
});

// Catalogo de servicios: liga los dos tipos de deuda a la oficina como entidad
export const serviceCatalogJsonLd = (services: { title: string; summary: string; slug: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${site.url}/#servicios`,
  name: "Servicios legales de IGonzalez",
  provider: organizationRef(),
  itemListElement: services.map((s, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.summary,
      serviceType: s.title,
      provider: organizationRef(),
      areaServed: { "@type": "Country", name: "Chile" },
    },
    url: `${site.url}/#${s.slug}`,
  })),
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.name,
  alternateName: [...site.alternateNames],
  inLanguage: site.lang,
  publisher: organizationRef(),
});

// El fundador es la entidad por la que mas se busca a la oficina: sus variantes de
// escritura van en alternateName para que los buscadores las reconozcan como la misma persona.
export const founderJsonLd = (photoUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: site.founder.name,
  alternateName: [...site.founder.alternateNames],
  url: absoluteUrl(site.founder.path),
  image: photoUrl,
  jobTitle: site.founder.jobTitle,
  description: site.founder.description,
  worksFor: organizationRef(),
  founderOf: organizationRef(),
  knowsAbout: [...site.founder.knowsAbout],
  knowsLanguage: "es",
  nationality: { "@type": "Country", name: "Chile" },
  workLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  },
  sameAs: socialProfiles,
});

// Pagina de perfil: le dice al buscador que esta URL trata sobre esa persona
export const profilePageJsonLd = (path: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}${path}#webpage`,
  url: absoluteUrl(path),
  isPartOf: { "@id": SITE_ID },
  mainEntity: founderRef(),
  inLanguage: site.lang,
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// Pagina de contacto: expone los canales reales como parte del grafo
export const contactPageJsonLd = (path: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.url}${path}#webpage`,
  url: absoluteUrl(path),
  isPartOf: { "@id": SITE_ID },
  about: organizationRef(),
  inLanguage: site.lang,
});
