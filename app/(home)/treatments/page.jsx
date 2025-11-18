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

/**
 * Treatments Page - Server Component
 */
export default async function TreatmentsPage() {
  // Fetch data on the server with automatic caching
  const pageData = await getTreatmentsPageData();
  const sections = getTreatmentsSections(pageData.categories, pageData.features);

  return (
    <main className="min-h-screen">
      <SectionRenderer sections={sections} data={pageData} />
    </main>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata() {
  return getTreatmentsSEO();
}
