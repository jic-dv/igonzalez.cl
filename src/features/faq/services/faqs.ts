import { faqsData } from "@/features/faq/data/faqs";
import { faqSchema, type Faq } from "@/features/faq/schemas/faq";

const faqs: Faq[] = faqsData.map((f) => faqSchema.parse(f));

export const getFaqs = () => faqs;

// FAQPage ya no produce rich results en Google (mayo 2026). Se mantiene por
// comprension de entidades y recuperabilidad en sistemas de IA, no como tactica de SERP.
export const faqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
  })),
});
