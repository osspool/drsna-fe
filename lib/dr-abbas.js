"use cache";

import { drAbbasData } from "@/data/pages/dr-abbas/page";
import { buildMetadata } from '@/lib/seo-helpers';

export async function getDrAbbasPageData() {
  return drAbbasData;
}

/**
 * Generate metadata for Dr Abbas page using standardized helper
 */
export async function getDrAbbasMetadata() {
  return buildMetadata(drAbbasData, 'hero.image', 'Dr Syed Nadeem Abbas');
}

