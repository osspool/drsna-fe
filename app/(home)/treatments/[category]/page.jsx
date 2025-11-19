/**
 * Category Page (Dynamic)
 *
 * Registry-driven architecture using:
 * - JSON data (data/{category}/category.json)
 * - Mapper (lib/mappers/category.js)
 * - Config (lib/configs/category.js)
 * - SectionRenderer (components/common/SectionRenderer.jsx)
 *
 * This follows the established pattern for consistency and maintainability.
 */

import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { getCategorySections, getCategoryMetadata } from "@/lib/configs/category";
import { getBaseUrl } from "@/lib/domain-helpers";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo-helpers";

// Import category data
import aestheticMedicineData from "@/data/aesthetic-medicine/category.json";
import intimateHealthData from "@/data/intimate-health/category.json";
import painManagementData from "@/data/pain-management/category.json";
import scientificEvidenceData from "@/data/scientific-evidence/category.json";

const categoryDataMap = {
  "aesthetic-medicine": aestheticMedicineData,
  "intimate-health": intimateHealthData,
  "pain-management": painManagementData,
  "scientific-evidence": scientificEvidenceData,
};

export async function generateStaticParams() {
  // Only pre-render top 2 most popular categories
  return [
    { category: "aesthetic-medicine" },
    { category: "intimate-health" },
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const categoryData = categoryDataMap[resolvedParams.category];
  return getCategoryMetadata(categoryData);
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const categoryData = categoryDataMap[resolvedParams.category];

  if (!categoryData) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  const sections = getCategorySections(categoryData, resolvedParams.category);
  const structuredData = buildCategoryStructuredData(
    categoryData,
    resolvedParams.category,
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
        <SectionRenderer sections={sections} data={categoryData} />
      </main>
    </>
  );
}

function buildCategoryStructuredData(category, slug, baseUrl) {
  if (!category || !baseUrl) return [];
  const categoryUrl = `${baseUrl}/treatments/${slug}`;

  const collectionSchema = buildCollectionPageSchema({
    name: category.title,
    description: category.description || category.hero?.subtitle,
    url: categoryUrl,
    about: category.hero?.badge || category.shortTitle,
    items: (category.subcategories || []).map((sub) => ({
      "@type": "Collection",
      name: sub.title,
      url: `${categoryUrl}/${sub.slug}`,
      description: sub.description,
    })),
  });

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: "Treatments", path: "/treatments" },
    { name: category.title, url: categoryUrl },
  ]);

  return [collectionSchema, breadcrumbSchema].filter(Boolean);
}
