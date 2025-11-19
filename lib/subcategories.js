"use cache";

import { readFileSync } from "fs";
import { join } from "path";

/**
 * Get subcategory data by category and subcategory slug
 * Uses Next.js 16 'use cache' directive for optimal caching
 * Only loads the specific subcategory needed (no bundle bloat)
 */
export async function getSubcategory(category, subcategory) {
  try {
    const filePath = join(
      process.cwd(),
      "data",
      category,
      subcategory,
      "subcategory.json"
    );

    const fileContent = readFileSync(filePath, "utf-8");
    const subcategoryData = JSON.parse(fileContent);

    return subcategoryData;
  } catch (error) {
    console.error(`Failed to load subcategory: ${category}/${subcategory}`, error);
    return null;
  }
}

/**
 * Get high-priority subcategories for static generation
 * Only pre-render the most visited subcategory pages
 */
export async function getStaticSubcategoryPaths() {
  // Only pre-render top 2 most popular subcategories to limit server load
  // Other subcategories will be rendered on-demand with automatic caching
  const highPrioritySubcategories = [
    // Most popular aesthetic medicine subcategory
    { category: "aesthetic-medicine", subcategory: "face" },

    // Most popular intimate health subcategory
    { category: "intimate-health", subcategory: "male" },
  ];

  return highPrioritySubcategories;
}

/**
 * Get all available subcategories (for sitemap/reference)
 * AUTOMATICALLY DISCOVERED from filesystem - no manual registration needed!
 * Just add a subcategory.json file in data/{category}/{subcategory}/
 */
export async function getAllSubcategoryPaths() {
  // Use automatic data scanner instead of manual list
  const { getAllSubcategoryPaths: scanSubcategoryPaths } = await import('./data-scanner');
  return scanSubcategoryPaths();
}
