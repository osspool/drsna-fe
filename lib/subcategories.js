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
 * Get categories data (small file, can import directly)
 */
export async function getCategories() {
  try {
    const filePath = join(process.cwd(), "data", "categories.json");
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load categories", error);
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
 */
export async function getAllSubcategoryPaths() {
  const allSubcategories = [
    // Aesthetic Medicine
    { category: "aesthetic-medicine", subcategory: "face" },
    { category: "aesthetic-medicine", subcategory: "body" },
    { category: "aesthetic-medicine", subcategory: "skin" },
    { category: "aesthetic-medicine", subcategory: "hair" },

    // Intimate Health
    { category: "intimate-health", subcategory: "male" },
    { category: "intimate-health", subcategory: "female" },

    // Pain Management
    { category: "pain-management", subcategory: "conditions" },
    { category: "pain-management", subcategory: "treatments" },

    // Life Optimisation
    { category: "life-optimization", subcategory: "services" },

    // Private GP
    { category: "private-gp", subcategory: "services" },

    // Scientific Evidence
    { category: "scientific-evidence", subcategory: "treatments" },
  ];

  return allSubcategories;
}
