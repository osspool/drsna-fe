"use cache";

import { drAbbasData } from "@/data/pages/dr-abbas/page";
import { buildMetadata } from '@/lib/seo-helpers';

export async function getDrAbbasPageData() {
  return drAbbasData;
}

/**
 * Generate metadata for Dr Abbas page
 * @param {string} baseUrl - Domain-aware base URL (from page component via getBaseUrl())
 */
export async function getDrAbbasMetadata(baseUrl) {
  return buildMetadata(drAbbasData, 'hero.image', 'Dr Syed Nadeem Abbas', baseUrl);
}

