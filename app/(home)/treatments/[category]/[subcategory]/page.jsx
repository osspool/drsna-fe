import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { getSubcategoryPageConfig } from "@/lib/configs/subcategory";
import { getSubcategory, getCategories, getStaticSubcategoryPaths } from "@/lib/subcategories";
import { createMetadataGenerator, createStaticParamsGenerator } from "@/lib/seo-helpers";

/**
 * Generate static params for high-priority subcategories only
 * In Next.js 16 with Cache Components, only pre-render most popular pages
 * Other subcategories will be rendered on-demand with automatic caching
 */
export const generateStaticParams = createStaticParamsGenerator(getStaticSubcategoryPaths);

/**
 * Generate metadata for SEO
 * Dynamically loads only the needed subcategory data
 */
export const generateMetadata = createMetadataGenerator(
  getSubcategory,
  'hero.backgroundImage',
  'Treatment Not Found',
  (params) => [params.category, params.subcategory]
);

/**
 * Subcategory Page Component
 * Uses Next.js 16 Server Components with 'use cache' for optimal performance
 * Only loads the specific subcategory needed (no bundle bloat)
 */
export default async function SubcategoryPage({ params }) {
  const resolvedParams = await params;
  const subcategoryData = await getSubcategory(
    resolvedParams.category,
    resolvedParams.subcategory
  );

  if (!subcategoryData) {
    notFound();
  }

  // Get category data for breadcrumb
  const categoriesData = await getCategories();
  const getCategoryName = (categoryId) => {
    return categoriesData?.categories?.[categoryId]?.title || "Treatments";
  };

  const treatmentsArray = subcategoryData.treatments
    ? Object.entries(subcategoryData.treatments).map(([id, treatment]) => ({ ...treatment, id }))
    : [];

  const featuredTreatments = treatmentsArray.filter((t) => t.featured);

  // Prepare data for SectionRenderer
  const pageData = {
    subcategoryData,
    categoryName: getCategoryName(resolvedParams.category),
    treatmentsArray,
    featuredTreatments,
  };

  // Get config with params
  const pageConfig = getSubcategoryPageConfig(resolvedParams);

  return (
    <main className="min-h-screen">
      <SectionRenderer sections={pageConfig} data={pageData} />
    </main>
  );
}
