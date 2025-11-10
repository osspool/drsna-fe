"use cache";

import { readFileSync } from "fs";
import { join } from "path";

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

    return treatment;
  } catch (error) {
    console.error(`Failed to load treatment: ${category}/${subcategory}/${slug}`, error);
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
  // Only pre-render these high-priority treatments at build time
  const highPriorityTreatments = [
    // Most popular aesthetic treatments
    { category: "aesthetic-medicine", subcategory: "face", slug: "anti-wrinkle" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "dermal-fillers" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "lip-enhancement" },

    // High-demand intimate health treatments
    { category: "intimate-health", subcategory: "male", slug: "p-shot" },
    { category: "intimate-health", subcategory: "female", slug: "ultra-femme-360" },

    // Key pain management treatments
    { category: "pain-management", subcategory: "conditions", slug: "knee-treatment" },
  ];

  return highPriorityTreatments;
}

/**
 * Get all available treatments (for reference/sitemap generation)
 * This is the complete list of all treatments in the system
 */
export async function getAllTreatmentPaths() {
  const allTreatments = [
    // Aesthetic Medicine - Face
    { category: "aesthetic-medicine", subcategory: "face", slug: "anti-wrinkle" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "dermal-fillers" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "prp-facelift" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "non-surgical-blepharoplasty" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "lip-enhancement" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "jawline-reduction" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "tear-trough-treatment" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "non-surgical-rhinoplasty" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "skin-boosters" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "nefertiti-neck-lift" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "cheek-augmentation" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "polynucleotide" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "double-chin-treatment" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "spot-injection" },

    // Aesthetic Medicine - Skin
    { category: "aesthetic-medicine", subcategory: "skin", slug: "skin-range" },
    { category: "aesthetic-medicine", subcategory: "skin", slug: "polynucleotide-skin" },

    // Aesthetic Medicine - Hair
    { category: "aesthetic-medicine", subcategory: "hair", slug: "prp-hair" },
    { category: "aesthetic-medicine", subcategory: "hair", slug: "exosome-treatment" },
    { category: "aesthetic-medicine", subcategory: "hair", slug: "regenera-treatment" },
    { category: "aesthetic-medicine", subcategory: "hair", slug: "polynucleotide-hair" },

    // Intimate Health - Male
    { category: "intimate-health", subcategory: "male", slug: "p-shot" },
    { category: "intimate-health", subcategory: "male", slug: "shockwave-therapy" },
    { category: "intimate-health", subcategory: "male", slug: "peyronies-disease" },
    { category: "intimate-health", subcategory: "male", slug: "lichen-sclerosis-male" },

    // Intimate Health - Female
    { category: "intimate-health", subcategory: "female", slug: "ultra-femme-360" },
    { category: "intimate-health", subcategory: "female", slug: "btl-emsella-chair" },
    { category: "intimate-health", subcategory: "female", slug: "lichen-sclerosis-female" },

    // Pain Management - Conditions
    { category: "pain-management", subcategory: "conditions", slug: "knee-treatment" },
    { category: "pain-management", subcategory: "conditions", slug: "hip-treatment" },
    { category: "pain-management", subcategory: "conditions", slug: "foot-ankle-treatment" },
    { category: "pain-management", subcategory: "conditions", slug: "elbow-treatment" },
    { category: "pain-management", subcategory: "conditions", slug: "hand-wrist-treatment" },
    { category: "pain-management", subcategory: "conditions", slug: "shoulder-treatment" },

    // Pain Management - Treatments
    { category: "pain-management", subcategory: "treatments", slug: "adipose-cell-therapy" },
    { category: "pain-management", subcategory: "treatments", slug: "platelet-rich-plasma" },
    { category: "pain-management", subcategory: "treatments", slug: "bmac-therapy" },
    { category: "pain-management", subcategory: "treatments", slug: "physiotherapy" },
    { category: "pain-management", subcategory: "treatments", slug: "arthrosamid-injection" },
  ];

  return allTreatments;
}
