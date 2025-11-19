"use cache";

import aboutPageData from "@/data/home/about/page.json";
import { buildMetadata } from '@/lib/seo-helpers';

export async function getAboutPageData() {
  return aboutPageData;
}

/**
 * Generate metadata for About page using standardized helper
 */
export async function getAboutMetadata() {
  return buildMetadata(aboutPageData, 'hero.image.src', 'About Us');
}
