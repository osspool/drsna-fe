/**
 * Treatments Listing Page
 *
 * Registry-driven architecture using:
 * - JSON data (data/treatments-listing.json)
 * - Mapper (lib/mappers/treatments.js)
 * - Config (lib/configs/treatments.js)
 * - SectionRenderer (components/common/SectionRenderer.jsx)
 *
 * This follows the established pattern for consistency and maintainability.
 */

import { SectionRenderer } from "@/components/common/SectionRenderer";
import { getTreatmentsSections, getTreatmentsPageData, getTreatmentsSEO } from "@/lib/configs/treatments";
import { getBaseUrl } from "@/lib/domain-helpers";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo-helpers";

/**
 * Treatments Page - Server Component
 */
export default async function TreatmentsPage() {
  // Fetch data on the server with automatic caching
  const pageData = await getTreatmentsPageData();
  const sections = getTreatmentsSections(pageData.categories, pageData.features);
  const baseUrl = await getBaseUrl();
  const structuredData = buildTreatmentsStructuredData(pageData, baseUrl);

  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="min-h-screen">
        <SectionRenderer sections={sections} data={pageData} />
      </main>
    </>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata() {
  return getTreatmentsSEO();
}

function buildTreatmentsStructuredData(pageData, baseUrl) {
  if (!pageData || !baseUrl) return [];

  const categories = pageData.categories || [];
  const categoryEntities = categories.map((category) => ({
    "@type": "Collection",
    name: category.title,
    description: category.description,
    url: `${baseUrl}/treatments/${category.slug}`,
  }));

  const collectionSchema = buildCollectionPageSchema({
    name: pageData.hero?.title || "Treatments",
    description: pageData.hero?.subheadline || pageData.hero?.subtitle,
    url: `${baseUrl}/treatments`,
    about: pageData.hero?.tagline || "Treatment Categories",
    items: categoryEntities,
  });

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: "Treatments", path: "/treatments" },
  ]);

  return [collectionSchema, breadcrumbSchema].filter(Boolean);
}
