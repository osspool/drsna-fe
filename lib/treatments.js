import { readFileSync } from "fs";
import { join } from "path";
import { resolvePresets } from "./presets";

/**
 * Get treatment data by category, subcategory, and slug
 * Uses Next.js 16 'use cache' directive for optimal caching
 * Only loads the specific treatment needed (no bundle bloat)
 */
export async function getTreatment(category, subcategory, slug) {
  try {
    const filePath = join(
      process.cwd(),
      "data",
      category,
      subcategory,
      "treatments",
      `${slug}.json`
    );

    const fileContent = readFileSync(filePath, "utf-8");
    const treatment = JSON.parse(fileContent);

    // Resolve any preset references (CTA, FAQ templates)
    return resolvePresets(treatment);
  } catch (error) {
    console.error(`Failed to load treatment: ${category}/${subcategory}/${slug}`);
    console.error(error);
    return null;
  }
}

/**
 * Get high-priority treatments for static generation
 * In Next.js 16, everything is dynamic by default
 * Only pre-render the most important/popular treatments
 * Other treatments will be dynamically rendered on-demand
 */
export async function getStaticTreatmentPaths() {
  // Only pre-render top 6 most popular treatments to limit server load
  // Other treatments will be rendered on-demand with automatic caching
  const highPriorityTreatments = [
    // Top 3 aesthetic medicine treatments
    { category: "aesthetic-medicine", subcategory: "face", slug: "anti-wrinkle" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "dermal-fillers" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "lip-enhancement" },

    // Top 2 intimate health treatments
    { category: "intimate-health", subcategory: "male", slug: "p-shot" },
    { category: "intimate-health", subcategory: "female", slug: "ultra-femme-360" },

    // Key pain management treatment
    { category: "pain-management", subcategory: "conditions", slug: "knee-treatment" },
  ];

  return highPriorityTreatments;
}

/**
 * Get all available treatments (for reference/sitemap generation)
 * AUTOMATICALLY DISCOVERED from filesystem - no manual registration needed!
 * Just add a JSON file in data/{category}/{subcategory}/treatments/{slug}.json
 */
export async function getAllTreatmentPaths() {
  // Use automatic data scanner instead of manual list
  const { getAllTreatmentPaths: scanTreatmentPaths } = await import('./data-scanner');
  return scanTreatmentPaths();
}
