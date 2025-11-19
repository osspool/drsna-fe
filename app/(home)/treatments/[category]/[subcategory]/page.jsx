import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { getSubcategoryPageConfig } from "@/lib/configs/subcategory";
import { getSubcategory, getStaticSubcategoryPaths } from "@/lib/subcategories";
import { getCategories } from "@/lib/categories";
import { createMetadataGenerator, createStaticParamsGenerator, buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo-helpers";
import { getBaseUrl } from "@/lib/domain-helpers";

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
    const category = categoriesData?.find(cat => cat.id === categoryId);
    return category?.title || "Treatments";
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
  const baseUrl = await getBaseUrl();
  const structuredData = buildSubcategoryStructuredData(
    subcategoryData,
    resolvedParams,
    treatmentsArray,
    baseUrl
  );

  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="min-h-screen">
        <SectionRenderer sections={pageConfig} data={pageData} />
      </main>
    </>
  );
}

function buildSubcategoryStructuredData(subcategory, params, treatments, baseUrl) {
  if (!subcategory || !baseUrl) return [];
  const subcategoryUrl = `${baseUrl}/treatments/${params.category}/${params.subcategory}`;

  const treatmentEntities = (treatments || []).map((treatment) => ({
    "@type": "MedicalProcedure",
    name: treatment.title,
    description: treatment.summary || treatment.description,
    url: `${subcategoryUrl}/${treatment.slug || treatment.id}`,
  }));

  const collectionSchema = buildCollectionPageSchema({
    name: subcategory.title,
    description: subcategory.description || subcategory.hero?.subtitle,
    url: subcategoryUrl,
    about: subcategory.hero?.badge || subcategory.shortTitle,
    items: treatmentEntities,
  });

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: "Treatments", path: "/treatments" },
    { name: subcategory.title, url: subcategoryUrl },
  ]);

  return [collectionSchema, breadcrumbSchema].filter(Boolean);
}
