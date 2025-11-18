import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { TreatmentHero } from "@/components/heroes/treatments/TreatmentHero";
import { RelatedTreatmentsSection } from "@/components/treatments/RelatedTreatmentsSection";
import { TreatmentSectionRenderer } from "@/components/treatments/TreatmentSectionRenderer";
import { getTreatment, getStaticTreatmentPaths } from "@/lib/treatments";
import { createMetadataGenerator, createStaticParamsGenerator } from "@/lib/seo-helpers";

/**
 * Generate static params for high-priority treatments only
 * In Next.js 16 with Cache Components, everything is dynamic by default
 * Only pre-render the most important/popular treatments at build time
 * Other treatments will be rendered on-demand with automatic caching
 */
export const generateStaticParams = createStaticParamsGenerator(getStaticTreatmentPaths);

/**
 * Generate metadata for SEO
 * Dynamically loads only the needed treatment data
 */
export const generateMetadata = createMetadataGenerator(
  getTreatment,
  'hero.image',
  'Treatment Not Found',
  (params) => [params.category, params.subcategory, params.slug]
);

/**
 * Treatment Page Component
 * Uses Next.js 16 Server Components with 'use cache' for optimal performance
 * Only loads the specific treatment needed (no bundle bloat)
 */
export default async function TreatmentPage({ params }) {
  const resolvedParams = await params;
  const treatment = await getTreatment(
    resolvedParams.category,
    resolvedParams.subcategory,
    resolvedParams.slug
  );

  if (!treatment) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <TreatmentHero treatment={treatment} params={resolvedParams} />

      {/* All treatment sections - config-driven rendering */}
      <TreatmentSectionRenderer treatment={treatment} />

      {/* Related Treatments */}
      {treatment.relatedTreatments && treatment.relatedTreatments.length > 0 && (
        <RelatedTreatmentsSection
          treatments={treatment.relatedTreatments}
          categoryId={resolvedParams.category}
          subcategoryId={resolvedParams.subcategory}
        />
      )}

      {/* CTA Section */}
      {treatment.cta && <CTASection data={treatment.cta} variant="treatment" />}
    </main>
  );
}
