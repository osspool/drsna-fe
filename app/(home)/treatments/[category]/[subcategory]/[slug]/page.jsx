import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { treatmentDetailPageConfig } from "@/lib/configs/treatment-detail";
import { getTreatment, getStaticTreatmentPaths } from "@/lib/treatments";
import { createMetadataGenerator, createStaticParamsGenerator, generateTreatmentStructuredData } from "@/lib/seo-helpers";
import { getBaseUrl } from "@/lib/domain-helpers";

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

  // Enrich treatment data with params for mappers
  const treatmentData = {
    ...treatment,
    _params: resolvedParams
  };

  // Generate domain-aware structured data for SEO
  const baseUrl = await getBaseUrl();
  const structuredData = generateTreatmentStructuredData(treatment, resolvedParams, baseUrl);

  return (
    <>
      {/* Structured Data for SEO - enables rich snippets */}
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <main className="min-h-screen">
        {/* All sections via config-driven rendering */}
        <SectionRenderer sections={treatmentDetailPageConfig} data={treatmentData} />
      </main>
    </>
  );
}
