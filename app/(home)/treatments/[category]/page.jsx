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

  const sections = getCategorySections(categoryData, resolvedParams.category);

  return (
    <main className="min-h-screen">
      <SectionRenderer sections={sections} data={categoryData} />
    </main>
  );
}
