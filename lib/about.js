
import aboutPageData from "@/data/home/about/page.json";
import { buildMetadata } from "@/lib/seo-helpers";

export const getAboutPageData = async () => aboutPageData;

/**
 * Generate metadata for About page - NOT cached (uses headers() internally)
 * @param {string} baseUrl - Domain-aware base URL (from page component via getBaseUrl())
 */
export async function getAboutMetadata(baseUrl) {
  return buildMetadata(aboutPageData, "hero.image.src", "About Us", baseUrl);
}
